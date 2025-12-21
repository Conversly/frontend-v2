import React, { useState, useEffect } from 'react';
import { sendWhatsAppMessage, SendWhatsAppMessageInput, getWhatsAppTemplates } from '@/lib/api/whatsapp';

import { Loader2, Send, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WhatsAppMessageSenderProps {
    chatbotId: string;
    recipientPhone?: string; // Optional: if provided, hides phone input
    onMessageSent?: (message: any) => void;
}

export const WhatsAppMessageSender: React.FC<WhatsAppMessageSenderProps> = ({
    chatbotId,
    recipientPhone: initialRecipientPhone,
    onMessageSent,
}) => {
    const [recipientPhone, setRecipientPhone] = useState(initialRecipientPhone || '');
    const [messageType, setMessageType] = useState<'text' | 'template'>('text');
    const [messageBody, setMessageBody] = useState('');
    const [templates, setTemplates] = useState<any[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState('');
    const [templateParams, setTemplateParams] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (initialRecipientPhone) {
            setRecipientPhone(initialRecipientPhone);
        }
    }, [initialRecipientPhone]);

    useEffect(() => {
        if (messageType === 'template') {
            loadTemplates();
        }
    }, [messageType]);

    const loadTemplates = async () => {
        try {
            const data = await getWhatsAppTemplates(chatbotId);
            // Filter only approved templates
            setTemplates(data.filter((t: any) => t.status === 'APPROVED'));
        } catch (err) {
            console.error('Failed to load templates', err);
        }
    };

    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

    // Parse template variables (e.g., {{1}}, {{2}})
    useEffect(() => {
        if (selectedTemplate) {
            const bodyComponent = selectedTemplate.components?.find((c: any) => c.type === 'BODY');
            if (bodyComponent && bodyComponent.text) {
                const matches = bodyComponent.text.match(/{{\d+}}/g) || [];
                // Initialize params for placeholders
                const initialParams: any = {};
                matches.forEach((match: string) => {
                    const key = match.replace(/{{|}}/g, '');
                    initialParams[key] = '';
                });
                setTemplateParams(initialParams);
            } else {
                setTemplateParams({});
            }
        }
    }, [selectedTemplateId]);

    const handleSend = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            let response;
            if (messageType === 'text') {
                if (!messageBody.trim()) {
                    throw new Error("Message body is empty");
                }
                response = await sendWhatsAppMessage(chatbotId, {
                    to: recipientPhone,
                    message: messageBody,
                });
            } else {
                if (!selectedTemplate) {
                    throw new Error("No template selected");
                }

                // Construct components for template
                const components: any[] = [];

                // Body parameters
                const bodyParams = Object.keys(templateParams).map(key => ({
                    type: 'text',
                    text: templateParams[key]
                }));

                if (bodyParams.length > 0) {
                    components.push({
                        type: 'body',
                        parameters: bodyParams
                    });
                }

                response = await sendWhatsAppMessage(chatbotId, {
                    to: recipientPhone,
                    type: 'template',
                    template: {
                        name: selectedTemplate.name,
                        language: { code: selectedTemplate.language },
                        components,
                    },
                });
            }

            setSuccess(true);
            setMessageBody('');
            setTemplateParams({});
            if (onMessageSent) {
                onMessageSent({
                    id: response.messageId || `temp-${Date.now()}`,
                    content: messageType === 'text' ? messageBody : `Template: ${selectedTemplate?.name}`,
                    type: 'agent',
                    timestamp: new Date().toISOString()
                });
            }
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-background relative">
            {!initialRecipientPhone && (
                <div className="mb-2 px-1">
                    <Input
                        type="text"
                        placeholder="Recipient Phone (e.g. 15551234567)"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        className="text-sm"
                    />
                </div>
            )}

            {/* Template Selection Area (Collapsible/Conditional) */}
            {messageType === 'template' && (
                <div className="mb-3 p-3 bg-muted/30 rounded-lg border space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground">Select Template</label>
                        <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setMessageType('text')}>
                            <X className="w-3 h-3 mr-1" /> Cancel
                        </Button>
                    </div>
                    <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                        <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Choose a template..." />
                        </SelectTrigger>
                        <SelectContent>
                            {templates.map((t) => (
                                <SelectItem key={t.id} value={t.id}>
                                    {t.name} ({t.language})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedTemplate && (
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                            {selectedTemplate.components?.find((c: any) => c.type === 'BODY')?.text || ''}
                        </div>
                    )}

                    {Object.keys(templateParams).length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                            {Object.keys(templateParams).map((key) => (
                                <Input
                                    key={key}
                                    className="h-7 text-xs"
                                    placeholder={`{{${key}}}`}
                                    value={templateParams[key]}
                                    onChange={(e) => setTemplateParams({ ...templateParams, [key]: e.target.value })}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-end gap-2">
                {/* Mode Toggle as Icon */}
                {messageType === 'text' && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mb-1 shrink-0 text-muted-foreground hover:text-primary"
                        onClick={() => setMessageType('template')}
                        title="Send Template"
                    >
                        <FileText className="w-5 h-5" />
                    </Button>
                )}

                {/* Input Area */}
                <div className="flex-1 relative">
                    {messageType === 'text' ? (
                        <Textarea
                            placeholder="Type a message..."
                            value={messageBody}
                            onChange={(e) => setMessageBody(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="min-h-[44px] max-h-[120px] py-3 resize-none rounded-2xl bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 pr-12"
                            rows={1}
                        />
                    ) : (
                        <div className="h-11 flex items-center px-4 rounded-2xl bg-primary/5 border border-primary/20 text-sm text-primary font-medium">
                            Template: {selectedTemplate?.name || 'Select a template above'}
                        </div>
                    )}

                    {/* Send Button Absolute in Input (for Text) or Inline */}
                    <div className={cn(
                        "absolute right-1 bottom-1",
                        messageType === 'template' && "static ml-2"
                    )}>
                        <Button
                            size="icon"
                            onClick={handleSend}
                            disabled={loading || (messageType === 'template' && !selectedTemplate) || (messageType === 'text' && !messageBody.trim())}
                            className={cn(
                                "h-9 w-9 rounded-full transition-all",
                                (messageBody.trim() || (messageType === 'template' && selectedTemplate))
                                    ? "bg-primary hover:bg-primary/90"
                                    : "bg-muted text-muted-foreground hover:bg-muted"
                            )}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {(error || success) && (
                <div className="text-xs mt-1 text-center">
                    {error && <span className="text-destructive">{error}</span>}
                    {success && <span className="text-green-500">Sent!</span>}
                </div>
            )}
        </div>
    );
};
