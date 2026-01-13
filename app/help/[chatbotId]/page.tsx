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
    BookOpen,
    Copy,
    Check,
    ArrowUpRight
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
                "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r transition-all duration-300 ease-in-out md:flex flex-col z-20 absolute md:static h-full shadow-lg md:shadow-none",
                isSidebarOpen ? "w-[320px] translate-x-0" : "w-0 -translate-x-full md:w-0 md:translate-x-0 opacity-0 md:opacity-100"
            )}>
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-semibold text-lg tracking-tight">Help Center</span>
                    </div>

                    {/* Close button for mobile */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <Menu className="w-4 h-4" />
                    </Button>
                </div>

                {/* Support Options */}
                <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider px-2">Support Channels</h3>

                        <a href={`mailto:${supportEmail}`} className="flex items-start gap-4 p-3 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all group shadow-sm hover:shadow-md">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-sm text-foreground">Email Support</div>
                                <div className="text-xs text-muted-foreground mt-0.5">Get a response within 24h</div>
                            </div>
                        </a>

                        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                                    <MessageCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">WhatsApp</div>
                                    <div className="text-[10px] text-muted-foreground leading-tight">Scan to chat instantly</div>
                                </div>
                            </div>

                            <div className="bg-white p-2 rounded-xl w-fit mx-auto mb-4 border shadow-sm">
                                <img src="/whatsapp-qr.png" alt="WhatsApp QR" className="w-36 h-36 object-contain" />
                            </div>

                            <a
                                href="https://wa.me/message/LPVQIB5P4ZTHM1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#25D366]/90 transition-all shadow-sm hover:shadow active:scale-95"
                            >
                                <span>Start Chat</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t">
                        <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider px-2">Session</h3>
                        <button
                            onClick={() => {
                                setMessages([]);
                                setInput("");
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors text-left text-sm font-medium text-muted-foreground group"
                        >
                            <div className="h-8 w-8 shrink-0 rounded-lg bg-muted group-hover:bg-destructive/10 flex items-center justify-center transition-colors">
                                <RefreshCw className="w-4 h-4" />
                            </div>
                            <span>Reset Conversation</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative h-full w-full bg-gradient-to-b from-background via-background to-muted/20">

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto w-full scroll-smooth">
                    <div className="flex flex-col items-center w-full min-h-full py-8 md:py-12">

                        <div className="w-full max-w-4xl px-4 md:px-0 space-y-6">
                            {messages.map((msg, idx) => (
                                <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                                    <div className={cn("flex max-w-[85%] md:max-w-[75%] gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>

                                        {/* Avatar - Only for Assistant */}
                                        {msg.role === "assistant" && (
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden bg-primary shadow-sm" style={{ backgroundColor: config.primaryColor }}>
                                                    {config.PrimaryIcon ? (
                                                        <img src={config.PrimaryIcon} alt="Bot" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <Bot className="h-4 w-4 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Content Wrapper (Bubble + Actions) */}
                                        <div className="flex flex-col gap-1 min-w-0 max-w-full">
                                            {/* Message Bubble */}
                                            <div className={cn(
                                                "relative px-5 py-3.5 shadow-sm text-sm md:text-base selection:bg-background/20",
                                                msg.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                                                    : "bg-muted/80 text-foreground rounded-2xl rounded-tl-sm border"
                                            )}>
                                                <div className={cn("prose max-w-none break-words leading-relaxed", msg.role === "user" ? "prose-invert" : "dark:prose-invert")}>
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                                                        p: ({ node, ...props }) => <p className="mb-1 last:mb-0" {...props} />,
                                                        a: ({ node, ...props }) => <a className={cn("underline underline-offset-2", msg.role === "user" ? "text-primary-foreground" : "text-primary")} {...props} />,
                                                        code: ({ node, ...props }) => <code className={cn("px-1 py-0.5 rounded", msg.role === "user" ? "bg-primary-foreground/20" : "bg-muted-foreground/20")} {...props} />
                                                    }}>
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>

                                            {/* Actions (Outside) - Only for Assistant */}
                                            {msg.role === "assistant" && (
                                                <div className="flex items-center gap-1 pl-1 pt-1">
                                                    {msg.citations && msg.citations.length > 0 && (
                                                        <Button variant="outline" size="sm" className="h-6 text-[10px] rounded-full gap-1 bg-background/50 hover:bg-background border-border/50 mr-2" onClick={() => handleViewCitations(msg.citations!)}>
                                                            <BookOpen className="w-3 h-3" />
                                                            {msg.citations.length} Sources
                                                        </Button>
                                                    )}

                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => navigator.clipboard.writeText(msg.content)}>
                                                        <Copy className="h-3.5 w-3.5" />
                                                    </Button>

                                                    <div className="h-3 w-[1px] bg-border mx-1" />

                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => handleVote(msg.id, "like")}>
                                                        <ThumbsUp className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => handleVote(msg.id, "dislike")}>
                                                        <ThumbsDown className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="w-full flex justify-start">
                                    <div className="flex gap-3 max-w-[85%] md:max-w-[75%]">
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-muted border shrink-0">
                                            <Bot className="h-4 w-4 text-muted-foreground animate-pulse" />
                                        </div>
                                        <div className="flex items-center gap-1 bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 h-12">
                                            <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce delay-75" />
                                            <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={scrollRef} className="h-4" />
                        </div>

                    </div>
                </div>

                {/* Floating Input Area */}
                <div className="w-full p-4 pb-6 md:pb-8 shrink-0 z-10">
                    <div className="max-w-3xl mx-auto relative">
                        {messages.length === 1 && config.starterQuestions && config.starterQuestions.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                {config.starterQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        className="text-left text-sm p-3 border rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground bg-background/50 backdrop-blur"
                                        onClick={() => {
                                            setInput(q);
                                        }}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative flex items-end w-full p-2 bg-background border shadow-xl shadow-primary/5 rounded-[24px] ring-offset-2 focus-within:ring-2 focus-within:ring-ring/20 transition-all">
                            <Textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={config.messagePlaceholder || "Message " + config.DisplayName + "..."}
                                className="min-h-[48px] max-h-[200px] w-full resize-none bg-transparent border-none focus-visible:ring-0 py-3 px-4 shadow-none text-base"
                                rows={1}
                            />
                            <Button
                                size="icon"
                                className={cn("ml-2 h-10 w-10 shrink-0 rounded-full transition-all mb-1 mr-1", input.trim() ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground")}
                                disabled={!input.trim() || isTyping}
                                onClick={handleSendMessage}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-[10px] text-center text-muted-foreground mt-3 opacity-50">
                            Powered by VerlyAI
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
