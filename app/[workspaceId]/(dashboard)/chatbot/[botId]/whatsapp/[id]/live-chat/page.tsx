'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import {
    Search,
    MoreVertical,
    CheckCheck,
    Phone,
    Loader2,
    Mail,
    ArrowLeft,
    X,
    PanelRight,
    ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { getWhatsAppChats, getWhatsAppContactMessages, WhatsAppContact, WhatsAppMessage } from '@/lib/api/whatsapp';
import { WhatsAppMessageSender } from '@/components/chatbot/integration/whatsapp/WhatsAppMessageSender';

export default function LiveChatPage() {
    const routeParams = useParams<{ workspaceId: string; botId: string; id: string }>();
    const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

    const [activeTab, setActiveTab] = useState('active');
    const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(null);
    const [contacts, setContacts] = useState<WhatsAppContact[]>([]);
    const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
    const [isLoadingContacts, setIsLoadingContacts] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/${workspaceId}/chatbot/${botId}/whatsapp/${integrationId}`;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

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

    // Fetch messages when contact is selected, and poll so inbound WhatsApp messages appear
    useEffect(() => {
        if (!selectedContact || !botId || !integrationId) return;

        const fetchMessages = async (showLoading = true) => {
            if (showLoading) setIsLoadingMessages(true);
            try {
                const contactId = selectedContact.id || selectedContact.phoneNumber;
                const data = await getWhatsAppContactMessages(botId, integrationId, contactId);
                setMessages(data);
            } catch (error) {
                console.error('Failed to fetch messages', error);
            } finally {
                if (showLoading) setIsLoadingMessages(false);
            }
        };

        fetchMessages(true);

        const pollInterval = setInterval(() => fetchMessages(false), 5000);
        return () => clearInterval(pollInterval);
    }, [selectedContact, botId, integrationId]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messages.length > 0 && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Handle scroll detection to show/hide scroll button
    const handleScroll = () => {
        if (scrollAreaRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setShowScrollButton(!isNearBottom);
        }
    };

    // Scroll to bottom function
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className="flex h-full bg-background overflow-hidden w-full relative">
            {/* 1. Sidebar (Navigation) - Hidden on mobile during chat focus, or use rail */}
            <div className="hidden md:block">
                <IntegrationSidebar
                    platform="whatsapp"
                    items={sidebarItems}
                    basePath={basePath}
                />
            </div>

            {/* 2. Contact List Panel (Left) */}
            <div className={cn(
                "w-full md:w-80 border-r flex flex-col bg-card/50 flex-shrink-0 transition-all duration-300 min-h-0",
                selectedContact ? "hidden md:flex" : "flex"
            )}>
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">Chats</h2>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="unread">Unread</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search or start new chat" className="pl-9" />
                    </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
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
                </div>
            </div>

            {/* 3. Chat Area (Middle) */}
            <div className={cn(
                "flex-1 flex flex-col min-w-0 bg-background md:border-r transition-all duration-300",
                !selectedContact ? "hidden md:flex" : "flex"
            )}>
                {selectedContact ? (
                    <>
                        {/* Header */}
                        <div className="h-16 border-b px-4 md:px-6 flex items-center justify-between bg-card/30">
                            <div className="flex items-center gap-3 overflow-hidden">
                                {/* Back Button (Mobile Only) */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden shrink-0 -ml-2"
                                    onClick={() => setSelectedContact(null)}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>

                                <div className="flex items-center gap-3 min-w-0">
                                    <Avatar className="shrink-0">
                                        <AvatarFallback>{selectedContact.displayName?.[0] || selectedContact.phoneNumber[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold truncate">{selectedContact.displayName || selectedContact.phoneNumber}</h3>
                                        {/* API NEEDED: Contact status (online/offline) */}
                                        {/* <p className="text-xs text-green-500 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            Online
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 shrink-0">
                                <Button variant="outline" size="sm" className="hidden sm:flex">Resolve</Button>
                                <Button variant="ghost" size="icon" className="sm:hidden"><CheckCheck className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={cn(isProfileOpen && "bg-muted")}
                                >
                                    <PanelRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 relative overflow-hidden flex flex-col">
                            <div 
                                ref={scrollAreaRef}
                                className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth"
                                onScroll={handleScroll}
                            >
                                <div className="space-y-6 max-w-3xl mx-auto pb-4">
                                    {isLoadingMessages ? (
                                        <div className="flex justify-center py-8">
                                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center min-h-[400px]">
                                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                                <Mail className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2">No messages yet</h3>
                                            <p className="text-sm text-muted-foreground max-w-sm">
                                                Start a conversation by sending a message below.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={cn(
                                                        "flex gap-3",
                                                        msg.type === 'user' ? "justify-start" : "justify-end"
                                                    )}
                                                >
                                                    {msg.type === 'user' && (
                                                        <Avatar className="w-8 h-8 hidden sm:block shrink-0">
                                                            <AvatarFallback>U</AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <div className={cn(
                                                        "max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 sm:p-4 shadow-sm",
                                                        msg.type === 'user'
                                                            ? "bg-card border rounded-tl-sm"
                                                            : "bg-primary text-primary-foreground rounded-tr-sm"
                                                    )}>
                                                        <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                                                        <span
                                                            className={cn(
                                                                "text-xs opacity-70 mt-1 block text-right",
                                                                msg.type !== 'user' && "text-primary-foreground/80"
                                                            )}
                                                        >
                                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            {msg.type !== 'user' && <CheckCheck className="inline w-3 h-3 ml-1" />}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Scroll anchor */}
                                            <div ref={messagesEndRef} />
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Scroll to Bottom Button */}
                            {showScrollButton && (
                                <Button
                                    onClick={scrollToBottom}
                                    size="icon"
                                    className={cn(
                                        "absolute bottom-20 right-4 md:right-6 z-10",
                                        "rounded-full shadow-lg bg-primary hover:bg-primary/90",
                                        "animate-in fade-in slide-in-from-bottom-4 duration-200",
                                        "h-10 w-10"
                                    )}
                                    aria-label="Scroll to bottom"
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </Button>
                            )}
                        </div>

                        <div className="p-4 border-t bg-card/30">
                            <WhatsAppMessageSender
                                chatbotId={botId}
                                recipientPhone={selectedContact.phoneNumber}
                                onMessageSent={(msg) => setMessages(prev => [...prev, msg])}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <span className="text-2xl">👋</span>
                        </div>
                        <h3 className="font-semibold text-lg">Detailed Live Chat</h3>
                        <p className="text-sm max-w-sm mt-2">Select a conversation from the left to view details, history, and manage the customer profile.</p>
                    </div>
                )}
            </div>

            {/* 4. Smart Profile Panel (Right) */}
            {selectedContact && isProfileOpen && (
                <>
                    {/* Backdrop for mobile */}
                    <div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 xl:hidden"
                        onClick={() => setIsProfileOpen(false)}
                    />

                    {/* Panel */}
                    <div className="absolute right-0 top-0 h-full z-30 xl:static xl:z-0 w-[85%] sm:w-80 xl:w-72 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-l animate-in slide-in-from-right duration-300 shadow-2xl xl:shadow-none overflow-y-auto">
                        {/* Mobile Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 xl:hidden z-50"
                            onClick={() => setIsProfileOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>

                        <div className="p-6 border-b text-center relative">
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
                </>
            )}
        </div >
    );
}
