import React, { useState, useEffect } from 'react';
import { sendWhatsAppMessage, SendWhatsAppMessageInput, getWhatsAppTemplates } from '@/lib/api/whatsapp';

import { Loader2, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <div className="w-full bg-card border rounded-lg p-4 shadow-sm">
            {!initialRecipientPhone && (
                <div className="mb-4">
                    <label className="text-sm font-medium mb-1 block">Recipient Phone</label>
                    <Input
                        type="text"
                        placeholder="e.g. 15551234567"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                    />
                </div>
            )}

            <div className="flex items-center gap-4 mb-4">
                <div className="flex bg-muted p-1 rounded-lg">
                    <button
                        className={`px-3 py-1 text-sm rounded-md transition-all ${messageType === 'text' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setMessageType('text')}
                    >
                        Text Message
                    </button>
                    <button
                        className={`px-3 py-1 text-sm rounded-md transition-all ${messageType === 'template' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setMessageType('template')}
                    >
                        Template Message
                    </button>
                </div>
            </div>

            {messageType === 'text' ? (
                <div className="flex gap-2">
                    <Textarea
                        placeholder="Type your message..."
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        className="min-h-[80px]"
                    />
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium mb-1.5 block text-muted-foreground">Select Template</label>
                        <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent>
                                {templates.map((t) => (
                                    <SelectItem key={t.id} value={t.id}>
                                        {t.name} ({t.language})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedTemplate && (
                        <div className="bg-muted/50 p-3 rounded-md text-sm">
                            <p className="font-medium text-xs mb-2 text-muted-foreground">Preview:</p>
                            <p className="whitespace-pre-wrap text-muted-foreground/80">
                                {selectedTemplate.components?.find((c: any) => c.type === 'BODY')?.text || ''}
                            </p>
                        </div>
                    )}

                    {Object.keys(templateParams).length > 0 && (
                        <div className="space-y-3 border-t pt-3">
                            <p className="text-xs font-medium">Variables</p>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.keys(templateParams).map((key) => (
                                    <div key={key}>
                                        <label className="text-xs text-muted-foreground block mb-1">Variable {key}</label>
                                        <Input
                                            type="text"
                                            placeholder={`Value for {{${key}}}`}
                                            value={templateParams[key]}
                                            onChange={(e) =>
                                                setTemplateParams({ ...templateParams, [key]: e.target.value })
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {error && <div className="text-destructive text-sm mt-2">{error}</div>}
            {success && <div className="text-green-500 text-sm mt-2">Message sent successfully!</div>}

            <div className="mt-4 flex justify-end">
                <Button
                    onClick={handleSend}
                    disabled={loading || (messageType === 'template' && !selectedTemplate)}
                    className="gap-2"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Send Message
                </Button>
            </div>
        </div>
    );
};
