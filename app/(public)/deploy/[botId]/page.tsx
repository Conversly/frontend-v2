"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, MessageSquare, Mail, Phone, Globe, Twitter, Linkedin, Instagram } from "lucide-react";
import { getChatbotPublic } from "@/lib/api/chatbot";
import { getWidgetConfig } from "@/lib/api/deploy";
import { UIConfigInput } from "@/types/customization";

export default function HelpPage() {
    const params = useParams();
    const botId = params.botId as string;
    const [isLoading, setIsLoading] = useState(true);
    const [chatConfig, setChatConfig] = useState<UIConfigInput | null>(null);
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);

    // Mock Config for Public Page (Ideally fetched from backend)
    const pageConfig = {
        title: "Help Center",
        description: "How can we help you today?",
        logoUrl: "",
        supportEmail: "support@example.com",
        channels: {
            chatbot: true,
            email: true,
            voice: true,
        },
        theme: {
            primaryColor: "#000000",
            backgroundColor: "#ffffff",
        },
        isLive: true,
        socials: {
            twitter: "conversly_ai",
            linkedin: "https://linkedin.com/company/conversly",
            website: "https://conversly.ai",
            instagram: ""
        },
        announcement: {
            enabled: true,
            text: "🎉 We are launching our new AI Agent platform soon!",
            link: "#"
        }
    };

    useEffect(() => {
        const loadChatbot = async () => {
            if (!botId) return;
            try {
                const [widgetData, chatbotData] = await Promise.all([
                    getWidgetConfig(botId),
                    getChatbotPublic(botId),
                ]);

                const partial = widgetData.partial;
                const styles = partial.styles || {};

                const uiConfig: UIConfigInput = {
                    DisplayName: styles.displayName || "Support Bot",
                    InitialMessage: (partial.initialMessage as string) || "Hi! How can I help you today? 👋",
                    starterQuestions: partial.suggestedMessages || [],
                    messagePlaceholder: styles.messagePlaceholder || "Message...",
                    keepShowingSuggested: !!styles.continueShowingSuggestedMessages,
                    collectFeedback: !!styles.collectUserFeedback,
                    allowRegenerate: !!styles.regenerateMessages,
                    dismissibleNoticeText: styles.dismissableNoticeText || "",
                    footerText: styles.footerText || "",
                    autoShowInitial: true,
                    autoShowDelaySec: 2,
                    widgetEnabled: true,
                    callEnabled: !!partial.callEnabled,
                    attention: {
                        messagePopupEnabled: !!partial.attention?.messagePopupEnabled,
                        popupSoundEnabled: !!partial.attention?.popupSoundEnabled,
                        soundUrl: partial.attention?.soundUrl || "",
                    },
                    primaryColor: styles.primaryColor || pageConfig.theme.primaryColor,
                    // Added missing required properties with default/mock values
                    widgetBubbleColour: styles.widgetBubbleColour || styles.primaryColor || "#000000",
                    PrimaryIcon: styles.PrimaryIcon || "",
                    widgeticon: styles.widgeticon || "",
                    buttonAlignment: styles.alignChatButton || "right",
                    showButtonText: !!styles.showButtonText,
                    buttonText: styles.buttonText || "Chat",
                    appearance: styles.appearance || "light",
                    widgetButtonText: styles.buttonText || "Chat",
                    chatWidth: styles.chatWidth || "350px",
                    chatHeight: styles.chatHeight || "500px",
                    converslyWebId: botId,
                    uniqueClientId: "", // Generated inside widget if empty
                    callEnabled: !!partial.callEnabled,
                    attention: {
                        messagePopupEnabled: !!partial.attention?.messagePopupEnabled,
                        popupSoundEnabled: !!partial.attention?.popupSoundEnabled,
                        soundUrl: partial.attention?.soundUrl || "",
                    },
                };

                setChatConfig(uiConfig);
            } catch (error) {
                console.error("Failed to load chatbot config", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadChatbot();
    }, [botId]);

    const socials = pageConfig.socials || {};
    const announcement = pageConfig.announcement || {};

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col">
            {/* Announcement Bar */}
            {announcement.enabled && (
                <div className="px-4 py-2 text-primary-foreground text-center text-sm font-medium relative animate-in slide-in-from-top duration-500" style={{ backgroundColor: pageConfig.theme.primaryColor }}>
                    {announcement.text}
                    {announcement.link && (
                        <a href={announcement.link} target="_blank" className="underline ml-2 hover:text-white/80 transition-colors">
                            Learn more &rarr;
                        </a>
                    )}
                </div>
            )}

            <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {pageConfig.logoUrl ? (
                            <img src={pageConfig.logoUrl} alt="Logo" className="w-8 h-8 rounded object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-primary" />
                            </div>
                        )}
                        <h1 className="font-bold text-xl">{pageConfig.title}</h1>
                    </div>
                    <nav className="flex items-center gap-6">
                        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Documentation</a>
                        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Status</a>
                        <Button variant="default" size="sm">Login</Button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center">
                {/* Hero */}
                <div className="text-center space-y-8 mb-16 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        {pageConfig.description}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Find answers, chat with our AI, or connect with our support team. We're here to help you succeed.
                    </p>

                    <div className="relative max-w-xl mx-auto w-full group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-white dark:bg-zinc-900 border rounded-full px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10">
                            <Search className="w-5 h-5 text-muted-foreground mr-4" />
                            <input
                                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
                                placeholder="Search for articles, guides, and help..."
                            />
                            <Button size="sm" className="rounded-full h-10 w-10 p-0 ml-2 shadow-sm" style={{ backgroundColor: pageConfig.theme.primaryColor }}>
                                <ArrowRight className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Support Channels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                    {pageConfig.channels.chatbot && (
                        <Card className="hover:border-primary/50 transition-all duration-300 group cursor-pointer border-dashed border-2 hover:shadow-lg bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">AI Assistant</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Chat with our intelligent bot for instant answers to common questions, available 24/7.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full mt-auto font-medium"
                                    onClick={() => setIsWidgetOpen(true)}
                                >
                                    Start Chat
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {pageConfig.channels.email && (
                        <Card className="hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">Email Configuration</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Submit a detailed ticket for complex issues. Our team will get back to you shortly.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full mt-auto font-medium"
                                    onClick={() => window.location.href = `mailto:${pageConfig.supportEmail}`}
                                >
                                    Open Ticket
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {pageConfig.channels.voice && (
                        <Card className="hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <Phone className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">Voice Agent</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Prefer to talk? Speak directly with our advanced AI voice assistant.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full mt-auto font-medium"
                                    onClick={() => alert("Voice support call functionality (mock)")}
                                >
                                    Call Support
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>

            <footer className="border-t bg-white dark:bg-zinc-900">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {socials.website && (
                                <a href={socials.website} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                                    <Globe className="w-5 h-5" />
                                </a>
                            )}
                            {socials.twitter && (
                                <a href={`https://twitter.com/${socials.twitter.replace('@', '')}`} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {socials.linkedin && (
                                <a href={socials.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {socials.instagram && (
                                <a href={`https://instagram.com/${socials.instagram.replace('@', '')}`} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} {pageConfig.title}. Powered by Conversly.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
