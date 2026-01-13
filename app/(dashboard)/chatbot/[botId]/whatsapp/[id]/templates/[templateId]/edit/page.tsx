'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { X, Plus, Image, Globe, ChevronLeft } from 'lucide-react';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { getWhatsAppTemplates, updateWhatsAppTemplate } from '@/lib/api/whatsapp';
import { toast } from 'sonner';

export default function EditTemplatePage() {
    const router = useRouter();
    const params = useParams();
    const botId = params.botId as string;
    const integrationId = params.id as string;
    const templateId = params.templateId as string;

    const [templateName, setTemplateName] = useState('');
    const [language, setLanguage] = useState('en_US');
    const [category, setCategory] = useState('UTILITY');

    const [headerType, setHeaderType] = useState('NONE'); // NONE, TEXT, MEDIA
    const [headerText, setHeaderText] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [footerText, setFooterText] = useState('');

    const [buttons, setButtons] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [template, setTemplate] = useState<any>(null);

    useEffect(() => {
        loadTemplate();
    }, [botId, templateId]);

    const loadTemplate = async () => {
        try {
            const templates = await getWhatsAppTemplates(botId);
            const found = templates.find((t: any) => t.id === templateId);
            if (found) {
                setTemplate(found);
                setTemplateName(found.name);
                setCategory(found.category);
                setLanguage(found.language);

                // Parse components
                const components = found.components || [];
                const header = components.find((c: any) => c.type === 'HEADER');
                if (header) {
                    setHeaderType(header.format);
                    if (header.format === 'TEXT') {
                        setHeaderText(header.text || '');
                    }
                }

                const body = components.find((c: any) => c.type === 'BODY');
                if (body) {
                    setBodyText(body.text || '');
                }

                const footer = components.find((c: any) => c.type === 'FOOTER');
                if (footer) {
                    setFooterText(footer.text || '');
                }

                const buttonsComp = components.find((c: any) => c.type === 'BUTTONS');
                if (buttonsComp && buttonsComp.buttons) {
                    setButtons(buttonsComp.buttons.map((b: any) => ({
                        type: b.type,
                        text: b.text,
                        url: b.url,
                        phoneNumber: b.phone_number
                    })));
                }
            } else {
                toast.error("Template not found");
                router.push(`/chatbot/${botId}/whatsapp/${integrationId}/templates`);
            }
        } catch (error) {
            console.error("Failed to load template", error);
            toast.error("Failed to load template");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!templateName) {
            toast.error("Template name is required");
            return;
        }
        if (!bodyText) {
            toast.error("Body text is required");
            return;
        }

        setIsLoading(true);
        try {
            const components: any[] = [];

            // Header
            if (headerType !== 'NONE') {
                components.push({
                    type: 'HEADER',
                    format: headerType,
                    text: headerType === 'TEXT' ? headerText : undefined,
                });
            }

            // Body
            components.push({
                type: 'BODY',
                text: bodyText,
            });

            // Footer
            if (footerText) {
                components.push({
                    type: 'FOOTER',
                    text: footerText,
                });
            }

            // Buttons
            if (buttons.length > 0) {
                components.push({
                    type: 'BUTTONS',
                    buttons: buttons.map(b => ({
                        type: b.type,
                        text: b.text || 'Button',
                        url: b.type === 'URL' ? (b.url || 'https://example.com') : undefined,
                        phone_number: b.type === 'PHONE' ? (b.phoneNumber || '15551234567') : undefined,
                    }))
                });
            }

            await updateWhatsAppTemplate(botId, {
                templateId,
                name: templateName,
                category: category as any,
                language,
                components,
                allowCategoryChange: true,
            });

            toast.success("Template updated successfully");
            router.push(`/chatbot/${botId}/whatsapp/${integrationId}/templates`);
        } catch (error: any) {
            console.error("Failed to update template", error);
            toast.error(error.message || "Failed to update template");
        } finally {
            setIsLoading(false);
        }
    };

    // Preview Logic
    const getPreviewBody = () => {
        let text = bodyText || '';
        // Simple regex to bold variables for preview
        text = text.replace(/{{(\d+)}}/g, '{{$1}}');
        return text;
    };

    const addButton = () => {
        if (buttons.length < 3) {
            setButtons([...buttons, { type: 'QUICK_REPLY', text: '' }]);
        }
    };

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/chatbot/${botId}/whatsapp/${integrationId}`;

    if (isLoading && !template) {
        return <div className="p-8 text-center">Loading template...</div>;
    }

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
            />

            <div className="flex-1 overflow-y-auto bg-background">
                {/* Header */}
                <div className="h-16 border-b bg-card flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-lg font-semibold">Edit Message Template</h1>
                            <p className="text-xs text-muted-foreground">{category} • {language}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => router.back()}>Discard</Button>
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Template'}
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Form */}
                    <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                        <div className="max-w-3xl space-y-8">

                            {template?.metaTemplateId && (
                                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md text-sm">
                                    This template has been submitted to Meta. Updating it will create a new version.
                                </div>
                            )}

                            {/* Template Details */}
                            <div className="space-y-4 bg-card p-6 rounded-lg border shadow-sm">
                                <div>
                                    <h2 className="text-lg font-medium mb-1">Template name and language</h2>
                                    <p className="text-sm text-muted-foreground mb-4">Name your template and select the language.</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Name</Label>
                                            <Input
                                                placeholder="e.g. order_confirmation"
                                                value={templateName}
                                                onChange={(e) => setTemplateName(e.target.value)}
                                            />
                                            <p className="text-xs text-muted-foreground">Lowercase, underscores only.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Language</Label>
                                            <Select value={language} onValueChange={setLanguage}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="en_US">English (US)</SelectItem>
                                                    <SelectItem value="es">Spanish</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Form */}
                            <div className="space-y-6 bg-card p-6 rounded-lg border shadow-sm">
                                <div>
                                    <h2 className="text-lg font-medium mb-1">Content</h2>
                                    <p className="text-sm text-muted-foreground mb-4">Design the message structure.</p>
                                </div>

                                {/* Header */}
                                <div className="space-y-3">
                                    <Label>Header <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                    <Select value={headerType} onValueChange={setHeaderType}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NONE">None</SelectItem>
                                            <SelectItem value="TEXT">Text</SelectItem>
                                            <SelectItem value="IMAGE">Image</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {headerType === 'TEXT' && (
                                        <Input
                                            placeholder="Enter header text..."
                                            value={headerText}
                                            onChange={(e) => setHeaderText(e.target.value)}
                                            maxLength={60}
                                        />
                                    )}
                                </div>

                                {/* Body */}
                                <div className="space-y-3">
                                    <Label>Body</Label>
                                    <p className="text-xs text-muted-foreground">
                                        To add a variable, type {'{{1}}'}, {'{{2}}'}, etc.
                                    </p>
                                    <Textarea
                                        className="h-32 font-mono text-sm"
                                        value={bodyText}
                                        onChange={(e) => setBodyText(e.target.value)}
                                    />
                                </div>

                                {/* Footer */}
                                <div className="space-y-3">
                                    <Label>Footer <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                    <Input
                                        placeholder="Enter footer text..."
                                        value={footerText}
                                        onChange={(e) => setFooterText(e.target.value)}
                                        maxLength={60}
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="space-y-3">
                                    <Label>Buttons <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                    <div className="space-y-2">
                                        {buttons.map((btn, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Select defaultValue={btn.type}>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="QUICK_REPLY">Quick Reply</SelectItem>
                                                        <SelectItem value="URL">Visit Website</SelectItem>
                                                        <SelectItem value="PHONE">Call Phone</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    placeholder="Button text"
                                                    className="flex-1"
                                                    value={btn.text || ''}
                                                    onChange={(e) => {
                                                        const newButtons = [...buttons];
                                                        newButtons[idx].text = e.target.value;
                                                        setButtons(newButtons);
                                                    }}
                                                />
                                                <Button variant="ghost" size="icon" onClick={() => {
                                                    const newButtons = [...buttons];
                                                    newButtons.splice(idx, 1);
                                                    setButtons(newButtons);
                                                }}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}

                                        {buttons.length < 3 && (
                                            <Button variant="outline" size="sm" onClick={addButton} className="w-full border-dashed">
                                                <Plus className="w-4 h-4 mr-2" /> Add Button
                                            </Button>
                                        )}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div className="w-[400px] bg-slate-100 border-l flex items-center justify-center p-6 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat flex-shrink-0">
                        <div className="w-[300px] h-[580px] bg-white rounded-[30px] border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                            {/* Phone Status Bar */}
                            <div className="h-16 bg-[#075E54] flex items-end px-4 pb-2">
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                                    <div>
                                        <p className="text-xs font-semibold">Your Business</p>
                                        <p className="text-xs opacity-80">Online</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 bg-[#E5DDD5] p-3 relative font-sans overflow-y-auto">
                                {/* Message Bubble */}
                                <div className="bg-white rounded-lg p-1 shadow-sm max-w-[90%] rounded-tl-none">
                                    {/* Header Image */}
                                    {headerType === 'IMAGE' && (
                                        <div className="h-28 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-slate-400">
                                            <Image className="w-8 h-8" />
                                        </div>
                                    )}

                                    <div className="p-2">
                                        {/* Header Text */}
                                        {headerType === 'TEXT' && headerText && (
                                            <p className="font-bold text-xs mb-1">{headerText}</p>
                                        )}

                                        {/* Body Text */}
                                        <p className="text-xs whitespace-pre-wrap leading-relaxed text-gray-800">
                                            {getPreviewBody() || 'Start typing to preview...'}
                                        </p>

                                        {/* Footer Text */}
                                        {footerText && (
                                            <p className="text-xs text-gray-500 mt-1">{footerText}</p>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <div className="flex justify-end px-2 pb-1">
                                        <span className="text-xs text-gray-400">12:00 PM</span>
                                    </div>

                                    {/* Buttons (Native Look) */}
                                    {buttons.length > 0 && (
                                        <div className="border-t mt-1">
                                            {buttons.map((btn, idx) => (
                                                <div key={idx} className="h-9 text-cyan-500 text-center flex items-center justify-center text-xs font-medium border-b last:border-b-0 cursor-pointer">
                                                    {btn.type === 'URL' && <Globe className="w-3 h-3 mr-2" />}
                                                    {btn.text || 'Button'}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Input Area (Fake) */}
                            <div className="h-12 bg-[#F0F2F5] flex items-center px-2 gap-2">
                                <div className="w-6 h-6 text-gray-400 flex items-center justify-center">+</div>
                                <div className="flex-1 h-8 bg-white rounded-full"></div>
                                <div className="w-6 h-6 text-gray-400 flex items-center justify-center">🎤</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
