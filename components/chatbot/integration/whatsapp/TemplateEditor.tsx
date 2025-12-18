import React, { useState, useEffect } from 'react';
import { getWhatsAppTemplates, updateWhatsAppTemplate } from '@/lib/api/whatsapp';


interface TemplateEditorProps {
    chatbotId: string;
    templateId: string;
    onTemplateUpdated?: () => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
    chatbotId,
    templateId,
    onTemplateUpdated,
}) => {
    const [template, setTemplate] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        language: '',
        bodyText: '',
        allowCategoryChange: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTemplate();
    }, [templateId]);

    const loadTemplate = async () => {
        try {
            const templates = await getWhatsAppTemplates(chatbotId);
            const found = templates.find((t: any) => t.id === templateId);
            if (found) {
                setTemplate(found);
                const bodyComponent = found.components?.find(
                    (c: any) => c.type === 'BODY'
                );
                setFormData({
                    name: found.name,
                    category: found.category,
                    language: found.language,
                    bodyText: bodyComponent?.text || '',
                    allowCategoryChange: true,
                });
            }
        } catch (err) {
            setError('Failed to load template');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const components = [
                {
                    type: 'BODY',
                    text: formData.bodyText,
                },
            ];

            await updateWhatsAppTemplate(chatbotId, {
                templateId,
                name: formData.name,
                category: formData.category,
                language: formData.language,
                components,
                allowCategoryChange: formData.allowCategoryChange,
            });

            alert(
                template.metaTemplateId
                    ? 'Template updated! A new version has been created in Meta.'
                    : 'Draft template updated!'
            );
            onTemplateUpdated?.();
        } catch (err: any) {
            setError(err.message || 'Failed to update template');
        } finally {
            setLoading(false);
        }
    };

    if (!template) {
        return <div>Loading template...</div>;
    }

    return (

        <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
            <h2 className="text-xl font-semibold mb-6">Edit Template: {template.name}</h2>

            {template.isDraft && (
                <div className="p-3 bg-muted mb-4 rounded text-sm text-muted-foreground">
                    This is a draft template. Changes will be saved locally only.
                </div>
            )}

            {template.metaTemplateId && (
                <div className="p-3 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200 mb-4 rounded text-sm">
                    This template is submitted to Meta. Updating will create a new
                    version.
                </div>
            )}

            <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm">Template Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    // Name usually shouldn't be changed for existing template to avoid confusion, but API allows it for drafts
                    disabled={!!template.metaTemplateId}
                    required
                    className="w-full p-2 rounded-md border text-sm bg-background disabled:opacity-50 disabled:bg-muted"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm">Category</label>
                <select
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
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
                <label className="block mb-1.5 font-medium text-sm">Language</label>
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
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1.5 font-medium text-sm">Body Text</label>
                <textarea
                    value={formData.bodyText}
                    onChange={(e) =>
                        setFormData({ ...formData, bodyText: e.target.value })
                    }
                    rows={6}
                    required
                    className="w-full p-2 rounded-md border text-sm bg-background"
                />
                <small className="text-muted-foreground text-xs mt-1 block">
                    Use {'{{1}}'}, {'{{2}}'}, etc. for variables
                </small>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <input
                    type="checkbox"
                    id="allowCategoryChange"
                    checked={formData.allowCategoryChange}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            allowCategoryChange: e.target.checked,
                        })
                    }
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="allowCategoryChange" className="text-sm font-medium">
                    Allow Category Change
                </label>
            </div>

            {error && <div className="text-destructive text-sm mb-4">{error}</div>}

            <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-70 font-medium transition-colors text-sm"
            >
                {loading ? 'Updating...' : 'Update Template'}
            </button>
        </form>
    );
};
