'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import {
    Search,
    Filter,
    MoreVertical,
    CheckCheck,
    Phone,
    Video,
    Info,
    Send,
    Loader2,
    User,
    Tag,
    History,
    MapPin,
    Mail,
    Calendar,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { getWhatsAppChats, getWhatsAppContactMessages, sendWhatsAppMessage, WhatsAppContact, WhatsAppMessage } from '@/lib/api/whatsapp';

export default function LiveChatPage() {
    const routeParams = useParams<{ botId: string; id: string }>();
    const router = useRouter();
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

    const [activeTab, setActiveTab] = useState('active');
    const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(null);
    const [contacts, setContacts] = useState<WhatsAppContact[]>([]);
    const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoadingContacts, setIsLoadingContacts] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

    // Fetch contacts
    useEffect(() => {
        const fetchContacts = async () => {
            if (!botId || !integrationId) return;
            setIsLoadingContacts(true);
            try {
                const data = await getWhatsAppChats(botId, integrationId);
                setContacts(data);
            } catch (error) {
                console.error('Failed to fetch contacts', error);
            } finally {
                setIsLoadingContacts(false);
            }
        };
        fetchContacts();
    }, [botId, integrationId]);

    // Fetch messages when contact is selected
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedContact || !botId || !integrationId) return;
            setIsLoadingMessages(true);
            try {
                const contactId = selectedContact.id || selectedContact.phoneNumber;
                const data = await getWhatsAppContactMessages(botId, integrationId, contactId);
                setMessages(data);
            } catch (error) {
                console.error('Failed to fetch messages', error);
            } finally {
                setIsLoadingMessages(false);
            }
        };
        fetchMessages();
    }, [selectedContact, botId, integrationId]);

    // Send message handler
    const handleSendMessage = async () => {
        if (!inputMessage.trim() || !selectedContact || !botId) return;

        const currentInput = inputMessage;
        setInputMessage(''); // Optimistic clear

        try {
            // Optimistic update
            const newMessage: WhatsAppMessage = {
                id: `temp-${Date.now()}`,
                content: currentInput,
                type: 'agent',
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, newMessage]);

            // API Call
            await sendWhatsAppMessage(botId, {
                to: selectedContact.phoneNumber,
                message: currentInput,
            });

            // In a real app, you might refetch or wait for the socket/webhook to confirm
        } catch (error) {
            console.error('Failed to send message', error);
            // Revert input on failure
            setInputMessage(currentInput);
        }
    };

    return (
        <div className="flex h-full bg-background overflow-hidden w-full">
            {/* 1. Sidebar (Navigation) */}
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
                onClose={() => router.push(`/chatbot/${botId}/integration`)}
            />

            {/* 2. Contact List Panel (Left) */}
            <div className="w-80 border-r flex flex-col bg-card/50 flex-shrink-0">
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">Chats</h2>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full grid grid-cols-3">
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="requesting">Waiting</TabsTrigger>
                            <TabsTrigger value="intervened">Closed</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search or start new chat" className="pl-9" />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    {isLoadingContacts ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="divide-y">
                            {contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => setSelectedContact(contact)}
                                    className={cn(
                                        "p-4 cursor-pointer hover:bg-muted/50 transition-colors flex gap-3",
                                        selectedContact?.id === contact.id && "bg-muted"
                                    )}
                                >
                                    <Avatar>
                                        <AvatarFallback>{contact.displayName?.[0] || contact.phoneNumber[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-medium truncate">{contact.displayName || contact.phoneNumber}</span>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {/* TODO: Add timestamps from API */}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-muted-foreground truncate">
                                                {/* TODO: Add last message preview from API */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </div>

            {/* 3. Chat Area (Middle) */}
            <div className="flex-1 flex flex-col min-w-0 bg-background border-r">
                {selectedContact ? (
                    <>
                        {/* Header */}
                        <div className="h-16 border-b px-6 flex items-center justify-between bg-card/30">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>{selectedContact.displayName?.[0] || selectedContact.phoneNumber[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{selectedContact.displayName || selectedContact.phoneNumber}</h3>
                                    {/* API NEEDED: Contact status (online/offline) */}
                                    {/* <p className="text-xs text-green-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        Online
                                    </p> */}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">Resolve</Button>
                                <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                            </div>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex gap-3",
                                            msg.type === 'user' ? "justify-start" : "justify-end"
                                        )}
                                    >
                                        {msg.type === 'user' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn(
                                            "max-w-[70%] rounded-2xl p-4 shadow-sm",
                                            msg.type === 'user'
                                                ? "bg-card border rounded-tl-sm"
                                                : "bg-primary text-primary-foreground rounded-tr-sm"
                                        )}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                            <span className={cn(
                                                "text-[10px] opacity-70 mt-1 block text-right",
                                                msg.type !== 'user' && "text-primary-foreground/80"
                                            )}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                {msg.type !== 'user' && <CheckCheck className="inline w-3 h-3 ml-1" />}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-4 border-t bg-card/30">
                            <div className="bg-background border rounded-xl flex items-center p-2 shadow-sm">
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                    <span className="text-lg">😊</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                    <span className="text-lg">📎</span>
                                </Button>
                                <Input
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 bg-transparent"
                                />
                                <Button
                                    size="icon"
                                    className="bg-primary text-primary-foreground rounded-lg ml-2"
                                    onClick={handleSendMessage}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex justify-between items-center mt-2 px-1">
                                <p className="text-xs text-muted-foreground">Press Enter to send</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Intervention Mode:</span>
                                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">Off</Badge>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <span className="text-2xl">👋</span>
                        </div>
                        <h3 className="font-semibold text-lg">Detailed Live Chat</h3>
                        <p className="text-sm max-w-sm text-center mt-2">Select a conversation from the left to view details, history, and manage the customer profile.</p>
                    </div>
                )}
            </div>

            {/* 4. Smart Profile Panel (Right) */}
            {selectedContact && (
                <div className="w-72 bg-card/50 overflow-y-auto hidden xl:block flex-shrink-0">
                    <div className="p-6 border-b text-center">
                        <Avatar className="w-20 h-20 mx-auto mb-4">
                            <AvatarFallback className="text-xl">{selectedContact.displayName?.[0] || selectedContact.phoneNumber[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">{selectedContact.displayName || 'Unknown User'}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{selectedContact.phoneNumber}</p>

                        <div className="flex gap-2 justify-center mt-4">
                            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                                <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                                <Mail className="w-3.5 h-3.5 mr-1.5" /> Email
                            </Button>
                        </div>
                    </div>

                    <div className="p-4">
                        <Accordion type="single" collapsible defaultValue="attributes" className="w-full">
                            <AccordionItem value="tags">
                                <AccordionTrigger>Tags</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {/* API NEEDED: Fetch tags for contact */}
                                        {/* <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200">Hot Lead</Badge> */}
                                        <Button variant="outline" size="sm" className="h-6 text-xs px-2 border-dashed">+ Add</Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="attributes">
                                <AccordionTrigger>User Attributes</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pt-2">
                                        {/* API NEEDED: Fetch user attributes (location, created at, etc) */}
                                        <span className="text-sm text-muted-foreground">No attributes found.</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="campaigns">
                                <AccordionTrigger>Campaign History</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pt-2">
                                        {/* API NEEDED: Fetch campaign history */}
                                        <span className="text-sm text-muted-foreground">No campaigns found.</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            )}
        </div>
    );
}
