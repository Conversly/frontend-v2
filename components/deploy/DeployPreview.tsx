import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Search, ArrowRight, MessageSquare, Mail, Phone, ExternalLink, Globe, Twitter, Linkedin, Instagram } from "lucide-react";

interface DeployConfig {
    title: string;
    description: string;
    logoUrl: string;
    supportEmail: string;
    channels: {
        chatbot: boolean;
        email: boolean;
        voice: boolean;
    };
    theme: {
        primaryColor: string;
        backgroundColor: string;
    };
    isLive: boolean;
    socials: {
        twitter: string;
        linkedin: string;
        website: string;
        instagram: string;
    };
    announcement: {
        enabled: boolean;
        text: string;
        link: string;
    };
}

interface DeployPreviewProps {
    config: DeployConfig;
}

export function DeployPreview({ config }: DeployPreviewProps) {
    const socials = config.socials || {};
    const announcement = config.announcement || {};

    return (
        <div className="h-full bg-slate-100 dark:bg-zinc-900 p-8 overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white dark:bg-black rounded-xl shadow-2xl border overflow-hidden min-h-[600px] flex flex-col relative transition-all duration-300">

                {/* Announcement Bar */}
                {announcement.enabled && (
                    <div className="bg-primary px-4 py-2 text-primary-foreground text-center text-sm font-medium relative animate-in slide-in-from-top duration-500" style={{ backgroundColor: config.theme.primaryColor }}>
                        {announcement.text}
                        {announcement.link && (
                            <a href={announcement.link} target="_blank" className="underline ml-2 hover:text-white/80 transition-colors">
                                Learn more &rarr;
                            </a>
                        )}
                    </div>
                )}

                {/* Header */}
                <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {config.logoUrl ? (
                            <img src={config.logoUrl} alt="Logo" className="w-8 h-8 rounded object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-primary" />
                            </div>
                        )}
                        <h1 className="font-bold text-xl">{config.title || "Support Page"}</h1>
                    </div>
                    {config.isLive && (
                        <div className="flex items-center gap-2 text-xs font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            Live
                        </div>
                    )}
                </header>

                <main className="flex-1 p-8 md:p-12 flex flex-col items-center max-w-3xl mx-auto w-full">
                    {/* Hero */}
                    <div className="text-center space-y-6 mb-12">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 shadow-sm">
                            <img
                                src={config.logoUrl || "https://github.com/shadcn.png"}
                                alt="Bot"
                                className="w-12 h-12 rounded-xl object-cover"
                            />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {config.description || "How can we help you today?"}
                        </h2>

                        <div className="relative max-w-lg mx-auto w-full group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center bg-muted/50 border rounded-full px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                                <input
                                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                                    placeholder="Ask for help..."
                                    readOnly
                                />
                                <Button size="sm" className="rounded-full h-8 w-8 p-0 ml-2" style={{ backgroundColor: config.theme.primaryColor }}>
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Support Channels Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {config.channels.chatbot && (
                            <Card className="hover:border-primary/50 transition-colors group cursor-pointer border-dashed border-2">
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">AI Assistant</h3>
                                        <p className="text-sm text-muted-foreground">Get instant answers 24/7</p>
                                    </div>
                                    <Button variant="outline" className="w-full">Chat Now</Button>
                                </CardContent>
                            </Card>
                        )}

                        {config.channels.email && (
                            <Card className="hover:border-primary/50 transition-colors group cursor-pointer">
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">Email Support</h3>
                                        <p className="text-sm text-muted-foreground">Submit a ticket for complex issues</p>
                                    </div>
                                    <Button variant="outline" className="w-full">Open Ticket</Button>
                                </CardContent>
                            </Card>
                        )}

                        {config.channels.voice && (
                            <Card className="hover:border-primary/50 transition-colors group cursor-pointer">
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">Voice Support</h3>
                                        <p className="text-sm text-muted-foreground">Talk to our AI agent</p>
                                    </div>
                                    <Button variant="outline" className="w-full">Call Now</Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>

                <footer className="p-8 text-center border-t bg-muted/20">
                    <div className="flex items-center justify-center gap-6 mb-4">
                        {socials.website && (
                            <a href={socials.website} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Globe className="w-5 h-5" />
                            </a>
                        )}
                        {socials.twitter && (
                            <a href={`https://twitter.com/${socials.twitter.replace('@', '')}`} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        )}
                        {socials.linkedin && (
                            <a href={socials.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                        {socials.instagram && (
                            <a href={`https://instagram.com/${socials.instagram.replace('@', '')}`} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Powered by Conversly
                    </div>
                </footer>

                {/* Floating Widget Mockup */}
                {config.channels.chatbot && (
                    <div className="absolute bottom-6 right-6">
                        <div
                            className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer"
                            style={{ backgroundColor: config.theme.primaryColor }}
                        >
                            <MessageSquare className="w-7 h-7" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
