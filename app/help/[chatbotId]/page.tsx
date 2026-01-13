"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
    Send,
    Bot,
    User,
    ThumbsUp,
    ThumbsDown,
    Loader2,
    Menu,
    Mail,
    RefreshCw,
    MessageCircle,
    BookOpen
} from "lucide-react";
import { getChatbot } from "@/lib/api/chatbot";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getChatbotResponse, submitFeedback } from "@/lib/api/chat-response";
import { UIConfigInput } from "@/types/customization";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
    responseId?: string; // For feedback
    citations?: string[];
}

export default function ChatGPTHelpPage() {
    const params = useParams();
    const chatbotId = params.chatbotId as string;

    // Config State
    const [config, setConfig] = useState<UIConfigInput | null>(null);
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);

    // Chat State
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Citations State
    const [activeCitations, setActiveCitations] = useState<string[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Refs
    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Load Configuration
    useEffect(() => {
        const loadData = async () => {
            if (!chatbotId) return;
            try {
                const [widgetData, chatbotData] = await Promise.all([
                    getWidgetConfig(chatbotId),
                    getChatbot(chatbotId),
                ]);

                const partial = widgetData.partial;
                const styles = partial.styles || {};

                // Construct UI Config
                const uiConfig: UIConfigInput = {
                    DisplayName: styles.displayName || "Support Assistant",
                    InitialMessage: (partial.initialMessage as string) || "Hello! How can I help you today?",
                    starterQuestions: partial.suggestedMessages || [],
                    messagePlaceholder: styles.messagePlaceholder || "Message...",
                    primaryColor: styles.primaryColor || "#000000",
                    widgetBubbleColour: styles.widgetBubbleColour || styles.primaryColor || "#000000",
                    PrimaryIcon: styles.PrimaryIcon || "",
                    appearance: styles.appearance || "light",
                    converslyWebId: chatbotData.apiKey || chatbotId,
                    uniqueClientId: "", // Will generate
                    // ... other required fields with defaults
                    widgeticon: "",
                    buttonAlignment: "right",
                    showButtonText: false,
                    buttonText: "",
                    widgetButtonText: "",
                    chatWidth: "",
                    chatHeight: "",
                    autoShowInitial: false,
                    autoShowDelaySec: 0,
                    keepShowingSuggested: false,
                    collectFeedback: true,
                    allowRegenerate: true,
                    dismissibleNoticeText: "",
                    footerText: "",
                    widgetEnabled: true
                };

                setConfig(uiConfig);

                // generate client id if needed
                let clientId = localStorage.getItem("conversly_client_id");
                if (!clientId) {
                    // Generate a random 32-character hex string
                    const randomHex = Array.from({ length: 16 }, () =>
                        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
                    ).join('');
                    clientId = `client_${randomHex}`;
                    localStorage.setItem("conversly_client_id", clientId);
                }
                uiConfig.uniqueClientId = clientId;

                // Set initial message
                if (uiConfig.InitialMessage) {
                    setMessages([{
                        id: "init",
                        role: "assistant",
                        content: uiConfig.InitialMessage,
                        createdAt: new Date()
                    }]);
                }

            } catch (error) {
                console.error("Failed to load config", error);
            } finally {
                setIsLoadingConfig(false);
            }
        };
        loadData();
    }, [chatbotId]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    // Adjust textarea height
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    const handleSendMessage = async () => {
        if (!input.trim() || !config || isTyping) return;

        const userContent = input.trim();
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: userContent,
            createdAt: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            // Convert to format expect by API helper
            const historyForApi = messages.map(m => ({
                role: m.role as "user" | "assistant",
                content: m.content
            }));
            historyForApi.push({ role: "user", content: userContent });

            const user = {
                uniqueClientId: config.uniqueClientId,
                converslyWebId: config.converslyWebId,
                metadata: {}
            };

            const response = await getChatbotResponse(
                historyForApi,
                user,
                "default",
                { originUrl: typeof window !== "undefined" ? window.location.href : undefined }
            );

            const botMsg: ChatMessage = {
                id: response.responseId || Date.now().toString(),
                role: "assistant",
                content: response.response,
                createdAt: new Date(),
                responseId: response.responseId,
                citations: response.citations
            };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "assistant",
                content: "I apologize, but I encountered an error. Please try again.",
                createdAt: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleVote = async (id: string, type: "like" | "dislike") => {
        const msg = messages.find(m => m.id === id);
        if (!msg?.responseId) return;
        try {
            await submitFeedback(msg.responseId, type);
        } catch (e) {
            console.error(e);
        }
    };

    const handleViewCitations = (citations: string[]) => {
        setActiveCitations(citations);
        setIsSheetOpen(true);
    };

    if (isLoadingConfig) {
        return <div className="h-screen w-full flex items-center justify-center bg-background"><Loader2 className="animate-spin" /></div>;
    }

    if (!config) {
        return <div className="h-screen w-full flex items-center justify-center">Failed to load configuration</div>;
    }

    // Placeholder Data for Support Channels
    const supportEmail = "support@verlyai.xyz";
    const whatsappLink = "https://wa.me/1234567890";

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans">

            {/* Sidebar */}
            <div className={cn(
                "bg-zinc-50 dark:bg-zinc-900 border-r transition-all duration-300 ease-in-out md:flex flex-col z-20 absolute md:static h-full",
                isSidebarOpen ? "w-[280px] translate-x-0" : "w-0 -translate-x-full md:w-0 md:translate-x-0 overflow-hidden opacity-0 md:opacity-100"
            )}>
                {/* Header (Branding Removed) */}
                <div className="p-4 border-b flex items-center justify-between">
                    <span className="font-semibold text-lg">Support</span>

                    {/* Close button for mobile */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <Menu className="w-4 h-4" />
                    </Button>
                </div>

                {/* Support Options */}
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Support Channels</h3>

                        <a href={`mailto:${supportEmail}`} className="flex items-center gap-3 p-2 text-sm rounded-md hover:bg-muted transition-colors text-foreground/80 hover:text-foreground">
                            <Mail className="w-4 h-4" />
                            <span>Email Support</span>
                        </a>

                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 text-sm rounded-md hover:bg-muted transition-colors text-foreground/80 hover:text-foreground">
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    <div className="space-y-1 pt-4 border-t">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Actions</h3>
                        <button onClick={() => setMessages([])} className="w-full flex items-center gap-3 p-2 text-sm rounded-md hover:bg-muted transition-colors text-left text-foreground/80 hover:text-foreground">
                            <RefreshCw className="w-4 h-4" />
                            <span>Reset Conversation</span>
                        </button>
                    </div>
                </div>

                {/* Powered By Footer Removed */}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative h-full w-full">

                {/* Header (Mobile / Desktop Toggle) */}
                <header className="absolute top-2 left-2 z-10">
                    {!isSidebarOpen && (
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="bg-background/50 backdrop-blur-sm border shadow-sm">
                            <Menu className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    )}
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto w-full">
                    <div className="flex flex-col items-center w-full min-h-full py-10 md:py-16">

                        {/* Messages List */}
                        <div className="w-full max-w-3xl px-4 md:px-0 space-y-6">
                            {messages.map((msg, idx) => (
                                <div key={msg.id} className="group w-full text-foreground border-b border-transparent">
                                    <div className="flex gap-4 p-4 md:p-6 text-base">
                                        <div className="flex-shrink-0 flex flex-col relative items-end">
                                            {msg.role === "assistant" ? (
                                                <div className="h-8 w-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: msg.role === 'assistant' ? config.primaryColor : 'transparent' }}>
                                                    {config.PrimaryIcon ? (
                                                        <img src={config.PrimaryIcon} alt="Bot" className="h-full w-full object-cover rounded-sm" />
                                                    ) : (
                                                        <Bot className="h-5 w-5 text-white" />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="h-8 w-8 rounded-sm bg-muted flex items-center justify-center">
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative flex-1 overflow-hidden">
                                            <div className="font-semibold mb-1 opacity-90">
                                                {msg.role === "user" ? "You" : config.DisplayName}
                                            </div>
                                            <div className="prose dark:prose-invert max-w-none leading-7 break-words">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>

                                            {/* Citations Button */}
                                            {msg.role === "assistant" && msg.citations && msg.citations.length > 0 && (
                                                <div className="mt-3">
                                                    <Button variant="outline" size="sm" className="gap-2 h-8 text-xs rounded-full" onClick={() => handleViewCitations(msg.citations!)}>
                                                        <BookOpen className="w-3 h-3" />
                                                        {msg.citations.length} Sources
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Footer / Feedback */}
                                            {msg.role === "assistant" && (
                                                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => handleVote(msg.id, "like")}>
                                                        <ThumbsUp className="h-3 w-3" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => handleVote(msg.id, "dislike")}>
                                                        <ThumbsDown className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="w-full text-foreground">
                                    <div className="flex gap-4 p-4 md:p-6 text-base">
                                        <div className="h-8 w-8 rounded-sm flex items-center justify-center bg-transparent border">
                                            <Bot className="h-5 w-5 text-muted-foreground animate-pulse" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-75" />
                                            <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={scrollRef} className="h-12" />
                        </div>

                    </div>
                </div>


                {/* Input Area */}
                <div className="w-full bg-background border-t md:border-t-0 p-4 pb-6 md:pb-8">
                    <div className="max-w-3xl mx-auto relative">
                        {messages.length === 1 && config.starterQuestions && config.starterQuestions.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                {config.starterQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        className="text-left text-sm p-3 border rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                        onClick={() => {
                                            setInput(q);
                                        }}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative flex items-end w-full p-3 bg-muted/20 border border-input rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-ring">
                            <Textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={config.messagePlaceholder || "Message " + config.DisplayName + "..."}
                                className="min-h-[24px] max-h-[200px] w-full resize-none bg-transparent border-none focus-visible:ring-0 p-0 shadow-none text-base"
                                rows={1}
                            />
                            <Button
                                size="icon"
                                className={cn("ml-2 h-8 w-8 shrink-0 transition-all", input.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
                                disabled={!input.trim() || isTyping}
                                onClick={handleSendMessage}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                            Chat can make mistakes. Consider checking important information.
                        </p>
                    </div>
                </div>

            </div>

            {/* Citations Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right" className="w-full sm:w-[400px] sm:max-w-none overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle>Sources</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-6">
                        {activeCitations.map((citation, idx) => (
                            <div key={idx} className="space-y-2">
                                <h4 className="font-semibold text-sm text-foreground">Source {idx + 1}</h4>
                                <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground leading-relaxed">
                                    {citation}
                                </div>
                            </div>
                        ))}
                        {activeCitations.length === 0 && (
                            <div className="text-center text-muted-foreground py-10">
                                No sources available.
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    );
}
