import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Palette, MessageSquare, Mail, Phone, Globe, Save, Megaphone, Code, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

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

interface DeploySidebarProps {
    config: DeployConfig;
    setConfig: (config: DeployConfig) => void;
    onSave: () => void;
    isSaving: boolean;
}

export function DeploySidebar({ config, setConfig, onSave, isSaving }: DeploySidebarProps) {
    const params = useParams();
    const botId = params.botId as string;
    const [copiedIframe, setCopiedIframe] = useState(false);

    const handleChange = (field: string, value: any) => {
        setConfig({ ...config, [field]: value });
    };

    const handleNestedChange = (parent: keyof DeployConfig, field: string, value: any) => {
        // @ts-ignore
        setConfig({
            ...config,
            [parent]: {
                ...(config[parent] as object),
                [field]: value
            }
        });
    };

    const handleChannelToggle = (channel: 'chatbot' | 'email' | 'voice') => {
        setConfig({
            ...config,
            channels: { ...config.channels, [channel]: !config.channels[channel] }
        });
    };

    const handleThemeChange = (color: string) => {
        setConfig({
            ...config,
            theme: { ...config.theme, primaryColor: color }
        });
    };

    const iframeCode = `<iframe 
  src="https://verlyai.xyz/deploy/${botId}" 
  width="100%" 
  height="700px" 
  frameborder="0"
></iframe>`;

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIframe(true);
            setTimeout(() => setCopiedIframe(false), 2000);
            toast.success("Copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    // Helper to safely access nested properties if they start undefined (though initial state handles this)
    const socials = config.socials || { twitter: '', linkedin: '', website: '', instagram: '' };
    const announcement = config.announcement || { enabled: false, text: '', link: '' };

    return (
        <div className="flex flex-col h-full border-r bg-background/50 backdrop-blur-sm">
            <div className="p-4 border-b flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-lg">Configuration</h2>
                    <p className="text-xs text-muted-foreground">Customize your support page</p>
                </div>
                <Button size="sm" onClick={onSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save</>}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <Tabs defaultValue="general" className="w-full">
                    <div className="p-4 bg-muted/20 border-b">
                        <TabsList className="w-full grid grid-cols-4">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="channels">Channels</TabsTrigger>
                            <TabsTrigger value="style">Style</TabsTrigger>
                            <TabsTrigger value="deploy">Deploy</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-4 space-y-6">
                        <TabsContent value="general" className="space-y-6 mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Page Title</Label>
                                    <Input
                                        value={config.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g. Acme Support"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={config.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="How can we help you today?"
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Logo URL</Label>
                                    <Input
                                        value={config.logoUrl}
                                        onChange={(e) => handleChange('logoUrl', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Support Email</Label>
                                    <Input
                                        value={config.supportEmail}
                                        onChange={(e) => handleChange('supportEmail', e.target.value)}
                                        placeholder="support@example.com"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="font-medium text-sm text-foreground flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> Social Media
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground">Website</Label>
                                        <Input
                                            value={socials.website}
                                            onChange={(e) => handleNestedChange('socials', 'website', e.target.value)}
                                            placeholder="https://..."
                                            className="h-8 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground">Twitter</Label>
                                        <Input
                                            value={socials.twitter}
                                            onChange={(e) => handleNestedChange('socials', 'twitter', e.target.value)}
                                            placeholder="@handle"
                                            className="h-8 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground">LinkedIn</Label>
                                        <Input
                                            value={socials.linkedin}
                                            onChange={(e) => handleNestedChange('socials', 'linkedin', e.target.value)}
                                            placeholder="URL"
                                            className="h-8 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground">Instagram</Label>
                                        <Input
                                            value={socials.instagram}
                                            onChange={(e) => handleNestedChange('socials', 'instagram', e.target.value)}
                                            placeholder="@handle"
                                            className="h-8 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Publicly Accessible</Label>
                                    <div className="text-xs text-muted-foreground">
                                        Make this page visible to customers
                                    </div>
                                </div>
                                <Switch
                                    checked={config.isLive}
                                    onCheckedChange={(checked) => handleChange('isLive', checked)}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="channels" className="space-y-4 mt-0">
                            <Card>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-blue-500" />
                                            AI Chatbot
                                        </CardTitle>
                                        <Switch
                                            checked={config.channels.chatbot}
                                            onCheckedChange={() => handleChannelToggle('chatbot')}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <CardDescription>
                                        Enable the conversational AI agent to answer FAQs instantly.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-purple-500" />
                                            Email Ticketing
                                        </CardTitle>
                                        <Switch
                                            checked={config.channels.email}
                                            onCheckedChange={() => handleChannelToggle('email')}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <CardDescription>
                                        Allow users to submit tickets via email. AI will draft responses.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-green-500" />
                                            Voice Agent
                                        </CardTitle>
                                        <Switch
                                            checked={config.channels.voice}
                                            onCheckedChange={() => handleChannelToggle('voice')}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <CardDescription>
                                        Enable AI voice support for phone calls.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="style" className="space-y-6 mt-0">
                            <div className="space-y-4">
                                <Label>Primary Color</Label>
                                <div className="grid grid-cols-5 gap-2">
                                    {['#000000', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#e11d48', '#0891b2', '#4f46e5', '#ca8a04'].map((color) => (
                                        <button
                                            key={color}
                                            className={`w-full aspect-square rounded-full border-2 transition-all ${config.theme.primaryColor === color ? 'border-foreground scale-110' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleThemeChange(color)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-sm text-foreground flex items-center gap-2">
                                        <Megaphone className="w-4 h-4" /> Announcement Bar
                                    </h3>
                                    <Switch
                                        checked={announcement.enabled}
                                        onCheckedChange={(c) => handleNestedChange('announcement', 'enabled', c)}
                                    />
                                </div>

                                {announcement.enabled && (
                                    <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-300">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Banner Text</Label>
                                            <Input
                                                value={announcement.text}
                                                onChange={(e) => handleNestedChange('announcement', 'text', e.target.value)}
                                                placeholder="e.g. We are undergoing maintenance..."
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Link (Optional)</Label>
                                            <Input
                                                value={announcement.link}
                                                onChange={(e) => handleNestedChange('announcement', 'link', e.target.value)}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="deploy" className="space-y-6 mt-0">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="font-medium text-sm flex items-center gap-2">
                                        <Code className="w-4 h-4 text-primary" />
                                        Iframe Embed
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Embed the chatbot directly into your website.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="relative group rounded-lg border border-border bg-muted/50 shadow-sm overflow-hidden">
                                        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted">
                                            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">HTML</span>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => copyToClipboard(iframeCode)}
                                                className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-background/50"
                                            >
                                                {copiedIframe ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                                            </Button>
                                        </div>
                                        <div className="overflow-x-auto custom-scrollbar">
                                            <pre className="p-3 text-[11px] font-mono leading-relaxed text-foreground whitespace-pre">
                                                {iframeCode}
                                            </pre>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs h-8"
                                        onClick={() => window.open(`https://verlyai.xyz/deploy/${botId}`, '_blank')}
                                    >
                                        <ExternalLink className="w-3 h-3 mr-2" />
                                        Test Public URL
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
