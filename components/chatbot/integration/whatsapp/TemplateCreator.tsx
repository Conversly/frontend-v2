import React, { useState } from 'react';
import { createDefaultWhatsAppTemplate } from '@/lib/api/whatsapp';


interface TemplateCreatorProps {
    chatbotId: string;
    onTemplateCreated?: () => void;
}

export const TemplateCreator: React.FC<TemplateCreatorProps> = ({
    chatbotId,
    onTemplateCreated,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'TRANSACTIONAL' as const,
        language: 'en_US',
        bodyText: '',
        saveAsDraft: false,
        allowCategoryChange: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Build components array
            const components = [
                {
                    type: 'BODY',
                    text: formData.bodyText,
                },
            ];

            await createDefaultWhatsAppTemplate(chatbotId, {
                name: formData.name,
                category: formData.category,
                language: formData.language,
                components,
                saveAsDraft: formData.saveAsDraft,
                allowCategoryChange: formData.allowCategoryChange,
            });

            alert(
                formData.saveAsDraft
                    ? 'Template saved as draft!'
                    : 'Template submitted for approval!'
            );
            onTemplateCreated?.();
            // Reset form
            setFormData({
                name: '',
                category: 'TRANSACTIONAL',
                language: 'en_US',
                bodyText: '',
                saveAsDraft: false,
                allowCategoryChange: true,
            });

        } catch (err: any) {
            setError(err.message || 'Failed to create template');
        } finally {
            setLoading(false);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
            <h2 className="text-xl font-semibold mb-6">Create WhatsApp Template</h2>

            <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm">Template Name *</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="order_update"
                    required
                    pattern="[a-z0-9_]+"
                    title="Lowercase letters, numbers, and underscores only"
                    className="w-full p-2 rounded-md border text-sm bg-background"
                />
                <small className="text-muted-foreground text-xs mt-1 block">Lowercase letters, numbers, and underscores only</small>
            </div>

            <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm">Category *</label>
                <select
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as any })
                    }
                    required
                    className="w-full p-2 rounded-md border text-sm bg-background"
                >
                    <option value="TRANSACTIONAL">Transactional</option>
                    <option value="MARKETING">Marketing</option>
                    <option value="AUTHENTICATION">Authentication</option>
                    <option value="UTILITY">Utility</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm">Language *</label>
                <select
                    value={formData.language}
                    onChange={(e) =>
                        setFormData({ ...formData, language: e.target.value })
                    }
                    required
                    className="w-full p-2 rounded-md border text-sm bg-background"
                >
                    <option value="en_US">English (US)</option>
                    <option value="en_GB">English (UK)</option>
                    <option value="hi_IN">Hindi</option>
                    <option value="es_ES">Spanish</option>
                    {/* Add more languages as needed */}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm">Body Text *</label>
                <textarea
                    value={formData.bodyText}
                    onChange={(e) =>
                        setFormData({ ...formData, bodyText: e.target.value })
                    }
                    placeholder="Hi {{1}}, your order {{2}} has been shipped."
                    rows={6}
                    required
                    className="w-full p-2 rounded-md border text-sm bg-background"
                />
                <small className="text-muted-foreground text-xs mt-1 block">
                    Use {'{{1}}'}, {'{{2}}'}, etc. for variables
                </small>
            </div>

            <div className="mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.saveAsDraft}
                        onChange={(e) =>
                            setFormData({ ...formData, saveAsDraft: e.target.checked })
                        }
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-sm font-medium">Save as Draft (Don't submit to Meta)</span>
                </label>
                <small className="text-muted-foreground text-xs block ml-6 mt-1">
                    Drafts can be edited freely and submitted later. Submitted templates
                    need Meta approval.
                </small>
            </div>

            <div className="mb-6">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.allowCategoryChange}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                allowCategoryChange: e.target.checked,
                            })
                        }
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-sm font-medium">Allow Category Change</span>
                </label>
                <small className="text-muted-foreground text-xs block ml-6 mt-1">Allow Meta to suggest category changes during review</small>
            </div>

            {error && <div className="text-destructive text-sm mb-4">{error}</div>}

            <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-70 font-medium transition-colors text-sm"
            >
                {loading
                    ? 'Creating...'
                    : formData.saveAsDraft
                        ? 'Save as Draft'
                        : 'Submit for Approval'}
            </button>
        </form>
    );
};
