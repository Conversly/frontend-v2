'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, ArrowLeft, Check, CheckCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  getWhatsAppChats, 
  getWhatsAppContactMessages, 
  sendWhatsAppMessage, 
  WhatsAppContact, 
  WhatsAppMessage 
} from '@/lib/api/whatsapp';
import { toast } from 'sonner';

export default function WhatsAppChatPage() {
  const routeParams = useParams<{ botId: string; id: string; contactId: string }>();
  const router = useRouter();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;
  const contactId = Array.isArray(routeParams.contactId) ? routeParams.contactId[0] : routeParams.contactId;

  const [contact, setContact] = useState<WhatsAppContact | null>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoadingContact, setIsLoadingContact] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sidebarItems = getIntegrationSidebarItems('whatsapp');
  const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

  useEffect(() => {
    const fetchContact = async () => {
      if (!botId || !integrationId || !contactId) return;
      
      setIsLoadingContact(true);
      try {
        const contactsData = await getWhatsAppChats(botId, integrationId);
        const foundContact = contactsData.find(c => c.id === contactId);
        if (foundContact) {
          setContact(foundContact);
        } else {
          toast.error('Contact not found');
          router.push(`${basePath}/chats`);
        }
      } catch (error: any) {
        toast.error('Failed to load contact: ' + (error.message || 'Unknown error'));
        console.error('Error fetching contact:', error);
      } finally {
        setIsLoadingContact(false);
      }
    };

    fetchContact();
  }, [botId, integrationId, contactId, router, basePath]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!contact || !botId || !integrationId) return;
      
      setIsLoadingMessages(true);
      try {
        // Use contact.id or contact.phoneNumber as contactId
        const contactId = contact.id || contact.phoneNumber;
        const messagesData = await getWhatsAppContactMessages(
          botId,
          integrationId,
          contactId
        );
        // Sort messages by timestamp (oldest first)
        const sortedMessages = messagesData
          .map(msg => ({
            ...msg,
            timestamp: typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp,
          }))
          .sort((a, b) => {
            const timeA = typeof a.timestamp === 'string' ? new Date(a.timestamp).getTime() : a.timestamp.getTime();
            const timeB = typeof b.timestamp === 'string' ? new Date(b.timestamp).getTime() : b.timestamp.getTime();
            return timeA - timeB;
          });
        setMessages(sortedMessages);
      } catch (error: any) {
        toast.error('Failed to load messages: ' + (error.message || 'Unknown error'));
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [contact, botId, integrationId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !contact || !botId) return;

    const messageContent = inputMessage;
    setInputMessage('');
    setIsSending(true);

    // Optimistically add message to UI
    const tempMessage: WhatsAppMessage = {
      id: Date.now().toString(),
      content: messageContent,
      type: 'agent',
      timestamp: new Date(),
      channelMessageMetadata: {
        status: 'sent',
      },
    };
    setMessages(prev => [...prev, tempMessage]);

    try {
      const result = await sendWhatsAppMessage(botId, {
        to: contact.phoneNumber,
        message: messageContent,
      });
      
      // Update message status if messageId is returned
      if (result.messageId) {
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, channelMessageMetadata: { ...msg.channelMessageMetadata, messageId: result.messageId, status: 'delivered' } }
            : msg
        ));
      }
      
      toast.success('Message sent successfully');
      
      // Refresh messages to get the actual message from server
      const contactId = contact.id || contact.phoneNumber;
      const messagesData = await getWhatsAppContactMessages(botId, integrationId, contactId);
      setMessages(messagesData.map(msg => ({
        ...msg,
        timestamp: typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp,
      })));
    } catch (error: any) {
      toast.error('Failed to send message: ' + (error.message || 'Unknown error'));
      // Update message status to failed
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, channelMessageMetadata: { ...msg.channelMessageMetadata, status: 'failed' } }
          : msg
      ));
      setInputMessage(messageContent);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    // For recent messages, show relative time
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    
    // For older messages, show date and time
    const isToday = dateObj.toDateString() === now.toDateString();
    if (isToday) {
      return dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStatusIcon = (message: WhatsAppMessage) => {
    if (message.type === 'user') {
      // User messages don't have status
      return null;
    }
    
    const status = message.channelMessageMetadata?.status;
    if (!status) return null;
    
    switch (status) {
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary-foreground opacity-80" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-primary-foreground opacity-60" />;
      case 'sent':
        return <Check className="w-3 h-3 text-primary-foreground opacity-60" />;
      case 'failed':
        return <Clock className="w-3 h-3 text-destructive" />;
      default:
        return null;
    }
  };

  const getSenderLabel = (message: WhatsAppMessage) => {
    switch (message.type) {
      case 'user':
        // End customer - show contact name or phone number
        return contact?.displayName || contact?.phoneNumber || 'User';
      case 'assistant':
        // AI agent - show "AI Assistant"
        return 'AI Assistant';
      case 'agent':
        // Human support agent - show "You"
        return 'You';
      default:
        return 'Unknown';
    }
  };

  const shouldShowSenderLabel = (message: WhatsAppMessage, index: number) => {
    if (index === 0) return true;
    const prevMessage = messages[index - 1];
    return prevMessage.type !== message.type;
  };

  if (isLoadingContact) {
    return (
      <div className="flex h-full">
        <IntegrationSidebar
          platform="whatsapp"
          items={sidebarItems}
          basePath={basePath}
          onClose={() => router.push(`/chatbot/${botId}/integration`)}
        />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!contact) {
    return null;
  }

  return (
    <div className="flex h-full">
      {/* WhatsApp Sidebar - Left Side */}
      <IntegrationSidebar
        platform="whatsapp"
        items={sidebarItems}
        basePath={basePath}
        onClose={() => router.push(`/chatbot/${botId}/integration`)}
      />

      {/* Main Content - Chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b flex items-center gap-3 px-6 bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`${basePath}/chats`)}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold shadow-sm">
            {contact.displayName?.[0] || contact.phoneNumber[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {contact.displayName || contact.phoneNumber}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {contact.phoneNumber}
            </p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-background">
          <div className="space-y-4 max-w-4xl mx-auto pb-4">
            {isLoadingMessages ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">No messages yet</p>
                <p className="text-sm text-muted-foreground mt-1">Start the conversation!</p>
              </div>
            ) : (
              messages.map((message, index) => {
                // Message types: 'user' (end customer), 'assistant' (AI agent), 'agent' (human support agent)
                const isOutgoing = message.type === 'agent'; // Human agent messages (outgoing)
                const isIncoming = message.type === 'user'; // End customer messages (incoming)
                const isAI = message.type === 'assistant'; // AI assistant messages (incoming)
                
                // Check if we should show sender label (first message or different sender)
                const showSender = shouldShowSenderLabel(message, index);
                
                // Check if previous message is from same sender
                const prevMessage = index > 0 ? messages[index - 1] : null;
                const isSameSender = prevMessage && prevMessage.type === message.type;
                
                // Calculate time difference for grouping
                const timeDiff = prevMessage ? 
                  (typeof message.timestamp === 'string' ? new Date(message.timestamp) : message.timestamp).getTime() - 
                  (typeof prevMessage.timestamp === 'string' ? new Date(prevMessage.timestamp) : prevMessage.timestamp).getTime() 
                  : Infinity;
                const shouldGroup = isSameSender && timeDiff < 300000; // 5 minutes

                return (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-end gap-2',
                      isOutgoing ? 'justify-end flex-row-reverse' : 'justify-start',
                      !shouldGroup && 'mt-2' // Add spacing when sender changes
                    )}
                  >
                    {/* Avatar for incoming messages */}
                    {isIncoming && (
                      <div className={cn(
                        'w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold flex-shrink-0 shadow-sm',
                        shouldGroup && 'opacity-0' // Hide avatar for grouped messages
                      )}>
                        {contact?.displayName?.[0] || contact?.phoneNumber?.[0] || 'U'}
                      </div>
                    )}
                    
                    {/* Message bubble */}
                    <div className={cn(
                      'flex flex-col max-w-[70%]',
                      isOutgoing && 'items-end',
                      isIncoming && 'items-start',
                      isAI && 'items-start'
                    )}>
                      {/* Sender label - only show when sender changes */}
                      {showSender && (
                        <span className={cn(
                          'text-xs font-semibold mb-1.5 px-2 text-muted-foreground',
                          isOutgoing ? 'text-right' : 'text-left'
                        )}>
                          {getSenderLabel(message)}
                        </span>
                      )}
                      
                      {/* Message bubble */}
                      <div
                        className={cn(
                          'rounded-2xl px-4 py-2.5 shadow-sm',
                          isOutgoing && 'bg-primary text-primary-foreground rounded-tr-sm',
                          isIncoming && 'bg-card text-card-foreground border border-border rounded-tl-sm',
                          isAI && 'bg-muted text-muted-foreground border border-border rounded-tl-sm',
                          shouldGroup && isIncoming && 'rounded-tl-2xl', // Less rounded when grouped
                          shouldGroup && isAI && 'rounded-tl-2xl' // Less rounded when grouped
                        )}
                      >
                        <p className={cn(
                          'text-sm whitespace-pre-wrap break-words leading-relaxed',
                          isOutgoing ? 'text-primary-foreground' : 'text-foreground'
                        )}>
                          {message.content}
                        </p>
                        <div className={cn(
                          'flex items-center gap-1.5 mt-1.5',
                          isOutgoing ? 'justify-end' : 'justify-start'
                        )}>
                          <span
                            className={cn(
                              'text-xs opacity-70',
                              isOutgoing ? 'text-primary-foreground' : 'text-muted-foreground'
                            )}
                          >
                            {formatTime(message.timestamp)}
                          </span>
                          {isOutgoing && getMessageStatusIcon(message)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Avatar for outgoing messages */}
                    {isOutgoing && (
                      <div className={cn(
                        'w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold flex-shrink-0 shadow-sm',
                        shouldGroup && 'opacity-0' // Hide avatar for grouped messages
                      )}>
                        A
                      </div>
                    )}
                    
                    {/* Avatar for AI messages */}
                    {isAI && (
                      <div className={cn(
                        'w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-semibold flex-shrink-0 shadow-sm border border-border',
                        shouldGroup && 'opacity-0' // Hide avatar for grouped messages
                      )}>
                        AI
                      </div>
                    )}
                  </div>
                );
              })
            )}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="h-20 border-t flex items-center gap-4 px-6 bg-card">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isSending}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim() || isSending}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

