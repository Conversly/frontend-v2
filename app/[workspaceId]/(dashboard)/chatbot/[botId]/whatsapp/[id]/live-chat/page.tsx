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
import { getWhatsAppChats, getWhatsAppContactMessages } from '@/lib/api/whatsapp';
import type { WhatsAppContact, WhatsAppContactMessageItem } from "@/types/whatsapp";
import { WhatsAppMessageSender } from '@/components/chatbot/integration/whatsapp/WhatsAppMessageSender';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function LiveChatPage() {
    const routeParams = useParams<{ workspaceId: string; botId: string; id: string }>();
    const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

    const [activeTab, setActiveTab] = useState('active');
    const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(null);
    const [contacts, setContacts] = useState<WhatsAppContact[]>([]);
    const [messages, setMessages] = useState<WhatsAppContactMessageItem[]>([]);
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
        <div className="flex h-full bg-[#f0f2f5] overflow-hidden w-full relative font-sans">
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
                "w-full md:w-[400px] border-r flex flex-col bg-white flex-shrink-0 transition-all duration-300 min-h-0",
                selectedContact ? "hidden md:flex" : "flex"
            )}>
                {/* Header */}
                <div className="h-16 bg-[#f0f2f5] border-r border-[#d1d7db] flex items-center justify-between px-4 shrink-0">
                    <Avatar className="cursor-pointer">
                        {/* Placeholder for current user avatar */}
                        <AvatarFallback className="bg-[#dfe5e7] text-gray-500">ME</AvatarFallback>
                    </Avatar>
                    <div className="flex gap-3 text-[#54656f]">
                        <Button variant="ghost" size="icon" className="hover:bg-transparent">
                            <span className="sr-only">New Chat</span>
                            <div className="w-6 h-6 border-2 border-[#54656f] rounded-full flex items-center justify-center border-dashed">
                                <span className="text-lg leading-none">+</span>
                            </div>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-transparent">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-2 border-b bg-white">
                    <div className="relative bg-[#f0f2f5] rounded-lg h-9 flex items-center px-3">
                        <Search className="w-5 h-5 text-[#54656f] mr-4 cursor-pointer" />
                        <Input
                            placeholder="Search or start new chat"
                            className="border-0 bg-transparent h-full p-0 focus-visible:ring-0 placeholder:text-[#54656f] text-sm"
                        />
                    </div>
                    {/* Tabs could go here if needed, keeping simple for now to match WA */}
                    <div className="flex gap-2 mt-2 px-1">
                        <span
                            onClick={() => setActiveTab('all')}
                            className={cn(
                                "px-3 py-1 rounded-full text-sm cursor-pointer transition-colors",
                                activeTab === 'all' ? "bg-[#e7fce3] text-[#008069]" : "bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]"
                            )}
                        >
                            All
                        </span>
                        <span
                            onClick={() => setActiveTab('unread')}
                            className={cn(
                                "px-3 py-1 rounded-full text-sm cursor-pointer transition-colors",
                                activeTab === 'unread' ? "bg-[#e7fce3] text-[#008069]" : "bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]"
                            )}
                        >
                            Unread
                        </span>
                    </div>
                </div>

                {/* Contacts List */}
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth bg-white">
                    {isLoadingContacts ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="w-6 h-6 animate-spin text-[#00a884]" />
                        </div>
                    ) : (
                        <div className="divide-y-0">
                            {contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => setSelectedContact(contact)}
                                    className={cn(
                                        "px-3 py-3 cursor-pointer hover:bg-[#f5f6f6] transition-colors flex gap-3 items-center group relative",
                                        selectedContact?.id === contact.id && "bg-[#f0f2f5] hover:bg-[#f0f2f5]"
                                    )}
                                >
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-[#dfe5e7] text-gray-500 font-medium text-lg">
                                            {contact.displayName?.[0] || contact.phoneNumber[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden border-b border-[#f0f2f5] pb-3 group-hover:border-transparent">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-[#111b21] font-normal text-[15px] truncate">
                                                {contact.displayName || contact.phoneNumber}
                                            </span>
                                            <span className="text-xs text-[#667781] whitespace-nowrap">
                                                {/* TODO: Add timestamps from API */}
                                                Yesterday
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-[13px] text-[#667781] truncate">
                                                {/* TODO: Add last message preview from API */}
                                                Tap to view messages
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
                "flex-1 flex flex-col min-w-0 bg-[#efeae2] relative transition-all duration-300",
                !selectedContact ? "hidden md:flex" : "flex"
            )}>
                {/* WhatsApp Background Pattern */}
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                    backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '400px'
                }} />

                {selectedContact ? (
                    <>
                        {/* Header */}
                        <div className="h-16 px-4 py-2 flex items-center justify-between bg-[#f0f2f5] border-l border-[#d1d7db] z-10 shrink-0">
                            <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                {/* Back Button (Mobile Only) */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden shrink-0 -ml-2 text-[#54656f]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedContact(null);
                                    }}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>

                                <Avatar className="shrink-0 w-10 h-10">
                                    <AvatarFallback className="bg-[#dfe5e7] text-gray-500">
                                        {selectedContact.displayName?.[0] || selectedContact.phoneNumber[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex flex-col justify-center">
                                    <h3 className="font-normal text-[#111b21] text-base truncate leading-tight">
                                        {selectedContact.displayName || selectedContact.phoneNumber}
                                    </h3>
                                    <p className="text-xs text-[#667781] truncate leading-tight mt-0.5">
                                        click here for contact info
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button variant="ghost" size="icon" className="text-[#54656f]">
                                    <Search className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-[#54656f]">
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 relative overflow-hidden flex flex-col z-0">
                            <div
                                ref={scrollAreaRef}
                                className="flex-1 overflow-y-auto p-4 md:px-[5%] py-2 scroll-smooth"
                                onScroll={handleScroll}
                            >
                                <div className="space-y-1 pb-4 flex flex-col">
                                    {isLoadingMessages ? (
                                        <div className="flex justify-center py-8">
                                            <Loader2 className="w-8 h-8 animate-spin text-[#00a884]" />
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center min-h-[400px]">
                                            <div className="bg-[#ffffff] px-4 py-2 rounded-lg shadow-sm text-xs text-[#54656f]">
                                                Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                                            </div>
                                            <div className="mt-8 text-center text-[#54656f]">
                                                <h3 className="font-normal text-lg mb-2">No messages here yet...</h3>
                                                <p className="text-sm">Send a message to start the conversation.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {messages.map((msg) => {
                                                const isUser = msg.type === 'user';
                                                return (
                                                    <div
                                                        key={msg.id}
                                                        className={cn(
                                                            "mb-1 flex w-full",
                                                            isUser ? "justify-start" : "justify-end"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "relative max-w-[85%] sm:max-w-[65%] px-2 py-1.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] text-sm leading-relaxed",
                                                            isUser
                                                                ? "bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg text-[#111b21] origin-top-left" // User bubble (Left)
                                                                : "bg-[#d9fdd3] rounded-tl-lg rounded-bl-lg rounded-br-lg text-[#111b21] origin-top-right" // Bot bubble (Right)
                                                        )}
                                                            style={{
                                                                borderTopLeftRadius: isUser ? 0 : 8,
                                                                borderTopRightRadius: isUser ? 8 : 0,
                                                            }}
                                                        >
                                                            {/* Tail CSS would go here, simplified with rounded corners for now */}

                                                            <div className="px-1 pt-1 break-words whitespace-pre-wrap">
                                                                {isUser || !msg.type ? (
                                                                    <span>{msg.content}</span>
                                                                ) : (
                                                                    /* Markdown Renderer for AI messages */
                                                                    <div className="markdown-content">
                                                                        <ReactMarkdown
                                                                            remarkPlugins={[remarkGfm]}
                                                                            components={{
                                                                                h1: ({ node, ...props }) => <h1 className="text-lg font-bold my-2" {...props} />,
                                                                                h2: ({ node, ...props }) => <h2 className="text-base font-bold my-1" {...props} />,
                                                                                ul: ({ node, ...props }) => <ul className="list-disc ml-4 my-1" {...props} />,
                                                                                ol: ({ node, ...props }) => <ol className="list-decimal ml-4 my-1" {...props} />,
                                                                                li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
                                                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                                                a: ({ node, ...props }) => <a className="text-[#027eb5] hover:underline" {...props} />,
                                                                                code: ({ node, ...props }) => <code className="bg-black/10 rounded px-1 text-xs font-mono" {...props} />,
                                                                                pre: ({ node, ...props }) => <pre className="bg-black/10 rounded p-2 overflow-x-auto text-xs font-mono my-2" {...props} />
                                                                            }}
                                                                        >
                                                                            {msg.content}
                                                                        </ReactMarkdown>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex justify-end items-center gap-1 mt-0.5 select-none float-right relative top-1">
                                                                <span className="text-[11px] text-[#667781] min-w-fit">
                                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                                </span>
                                                                {!isUser && (
                                                                    <CheckCheck className={cn(
                                                                        "w-4 h-4",
                                                                        (msg as any).status === 'read' ? "text-[#53bdeb]" : "text-[#667781]"
                                                                    )} />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
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
                                        "rounded-full shadow-md bg-[#25d366] hover:bg-[#20bd5a] text-white",
                                        "animate-in fade-in slide-in-from-bottom-4 duration-200",
                                        "h-10 w-10 border-none"
                                    )}
                                    aria-label="Scroll to bottom"
                                >
                                    <ChevronDown className="w-6 h-6" />
                                </Button>
                            )}
                        </div>

                        <div className="p-2 bg-[#f0f2f5] border-l border-[#d1d7db] z-10">
                            <WhatsAppMessageSender
                                chatbotId={botId}
                                recipientPhone={selectedContact.phoneNumber}
                                onMessageSent={(msg) => setMessages(prev => [...prev, msg])}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6 text-center border-b-[6px] border-[#43c485]">
                        <div className="max-w-[560px] text-center">
                            <h1 className="text-[#41525d] text-[32px] font-light mb-5">WhatsApp Web</h1>
                            <div className="text-[#667781] text-sm leading-6">
                                Send and receive messages without keeping your phone online.<br />
                                Use WhatsApp on up to 4 linked devices and 1 phone.
                            </div>
                        </div>
                        <div className="fixed bottom-10 flex gap-2 items-center text-[#8696a0] text-sm">
                            <span className="w-4 h-4 rounded-full bg-current opacity-50"></span>
                            End-to-end encrypted
                        </div>
                    </div>
                )}
            </div>

            {/* 4. Smart Profile Panel (Right) */}
            {selectedContact && isProfileOpen && (
                <>
                    {/* Panel */}
                    <div className="w-full md:w-[350px] bg-[#f0f2f5] border-l border-[#d1d7db] flex flex-col animate-in slide-in-from-right duration-200 shadow-xl z-20">
                        {/* Header */}
                        <div className="h-16 px-6 flex items-center bg-[#f0f2f5] shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsProfileOpen(false)}
                                className="mr-4 hover:bg-transparent text-[#54656f]"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                            <span className="text-[#111b21] font-medium text-base">Contact Info</span>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-[#f0f2f5]">
                            {/* Profile Card */}
                            <div className="bg-white p-6 shadow-sm mb-3 flex flex-col items-center">
                                <Avatar className="w-48 h-48 mb-4">
                                    <AvatarFallback className="bg-[#dfe5e7] text-gray-500 text-6xl">
                                        {selectedContact.displayName?.[0] || selectedContact.phoneNumber[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-normal text-[#111b21] mb-1">
                                    {selectedContact.displayName || selectedContact.phoneNumber}
                                </h2>
                                <p className="text-[#667781] text-lg font-light">
                                    {selectedContact.phoneNumber}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="bg-white p-4 shadow-sm mb-3">
                                <div className="mb-4">
                                    <h3 className="text-[#667781] text-sm mb-2">About</h3>
                                    <p className="text-[#111b21] text-sm">Busy</p>
                                </div>
                            </div>

                            {/* Accordion Attributes - Keeping logic but styling roughly */}
                            <div className="bg-white p-4 shadow-sm mb-3">
                                <Accordion type="single" collapsible defaultValue="attributes" className="w-full">
                                    <AccordionItem value="tags" className="border-b-0">
                                        <AccordionTrigger className="text-[#111b21] hover:no-underline py-3">Tags</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                <Button variant="outline" size="sm" className="h-6 text-xs px-2 border-dashed">+ Add</Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="attributes" className="border-b-0">
                                        <AccordionTrigger className="text-[#111b21] hover:no-underline py-3">User Attributes</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-3 pt-2">
                                                <span className="text-sm text-[#667781]">No attributes found.</span>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="campaigns" className="border-b-0">
                                        <AccordionTrigger className="text-[#111b21] hover:no-underline py-3">Campaign History</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-3 pt-2">
                                                <span className="text-sm text-[#667781]">No campaigns found.</span>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    );
}
