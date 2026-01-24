import React, { useState, useEffect } from 'react';
import {
    getWhatsAppTemplates,
    getDefaultWhatsAppTemplates,
    syncWhatsAppTemplates,
    deleteWhatsAppTemplate
} from '@/lib/api/whatsapp';


interface TemplateManagerProps {
    chatbotId: string;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({ chatbotId }) => {
    const [templates, setTemplates] = useState<any[]>([]);
    const [defaultTemplates, setDefaultTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'saved' | 'defaults'>('saved');

    useEffect(() => {
        loadTemplates();
    }, [chatbotId]);

    const loadTemplates = async () => {
        setLoading(true);
        try {
            const [savedResponse, defaultsResponse] = await Promise.all([
                getWhatsAppTemplates(chatbotId),
                getDefaultWhatsAppTemplates(chatbotId),
            ]);

            setTemplates(savedResponse); // API returns array directly

            // defaultsResponse returns { all: [], defaults: [] } based on my implementation
            setDefaultTemplates(defaultsResponse.defaults || []);

        } catch (error) {
            console.error('Failed to load templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setLoading(true);
        try {
            const synced = await syncWhatsAppTemplates(chatbotId);
            await loadTemplates();
            alert(`Synced templates successfully`);
        } catch (error) {
            alert('Failed to sync templates');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (templateId: string) => {
        if (!confirm('Are you sure you want to delete this template?')) return;

        try {
            const response = await deleteWhatsAppTemplate(chatbotId, templateId);
            if (response.success) {
                await loadTemplates();
            }
        } catch (error) {
            alert('Failed to delete template');
        }
    };

    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            APPROVED: 'green',
            PENDING: 'yellow',
            REJECTED: 'red',
            DRAFT: 'gray',
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-bold ${colors[status] === 'green' ? 'bg-green-500 text-white' : colors[status] === 'yellow' ? 'bg-yellow-500 text-white' : colors[status] === 'red' ? 'bg-destructive text-destructive-foreground' : 'bg-gray-500 text-white'}`}>{status}</span>
        );
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold">WhatsApp Templates</h2>
                <button
                    onClick={handleSync}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-70 transition-colors text-sm font-medium"
                >
                    Sync from Meta
                </button>
            </div>

            <div className="flex gap-2 mb-5">
                <button
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${activeTab === 'saved'
                            ? 'bg-secondary text-secondary-foreground border-transparent'
                            : 'bg-background hover:bg-muted text-muted-foreground border-border'
                        }`}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved Templates ({templates.length})
                </button>
                <button
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${activeTab === 'defaults'
                            ? 'bg-secondary text-secondary-foreground border-transparent'
                            : 'bg-background hover:bg-muted text-muted-foreground border-border'
                        }`}
                    onClick={() => setActiveTab('defaults')}
                >
                    Meta Templates ({defaultTemplates.length})
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8 text-muted-foreground">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {activeTab === 'saved' ? (
                        templates.length > 0 ? templates.map((template) => (
                            <div key={template.id} className="border rounded-lg p-4 shadow-sm bg-card text-card-foreground">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-lg">{template.name}</h3>
                                    {getStatusBadge(template.status)}
                                </div>
                                <div className="flex gap-4 mb-3 text-sm text-muted-foreground">
                                    <span>Category: {template.category}</span>
                                    <span>Language: {template.language}</span>
                                    {template.metaTemplateId === null && <span className="bg-muted px-1.5 py-0.5 rounded text-2xs font-medium uppercase">DRAFT</span>}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(template.id)}
                                        className="px-3 py-1.5 bg-background border border-destructive text-destructive rounded hover:bg-destructive/10 text-sm font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )) : <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">No saved templates found. Sync from Meta to get started.</div>
                    ) : (
                        defaultTemplates.length > 0 ? defaultTemplates.map((template) => (
                            <div key={template.id} className="border rounded-lg p-4 shadow-sm bg-card text-card-foreground">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-lg">{template.name}</h3>
                                    {getStatusBadge(template.status)}
                                </div>
                                <div className="flex gap-4 mb-3 text-sm text-muted-foreground">
                                    <span>Category: {template.category}</span>
                                    <span>Language: {template.language}</span>
                                </div>
                                <div className="bg-muted/50 p-3 rounded-md mb-2 text-sm text-muted-foreground">
                                    {template.components?.map((comp: any, idx: number) => (
                                        <div key={idx}>
                                            {comp.type === 'BODY' && <p className="whitespace-pre-wrap">{comp.text}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )) : <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">No default templates found from Meta.</div>
                    )}
                </div>
            )}
        </div>
    );
};
