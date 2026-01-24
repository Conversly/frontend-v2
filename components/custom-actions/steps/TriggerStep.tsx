import React, { useState } from 'react';
import { CustomAction } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus, Zap } from 'lucide-react';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
}

export const TriggerSection: React.FC<Props> = ({
    formData,
    updateField,
}) => {
    const [newExample, setNewExample] = useState('');
    const triggerExamples = formData.triggerExamples || [];

    const addExample = () => {
        if (newExample.trim() && !triggerExamples.includes(newExample.trim())) {
            updateField('triggerExamples', [...triggerExamples, newExample.trim()]);
            setNewExample('');

            // Auto-generate name and description if not set
            if (triggerExamples.length === 0) {
                generateMetadata(newExample.trim());
            }
        }
    };

    const removeExample = (index: number) => {
        const updated = triggerExamples.filter((_, i) => i !== index);
        updateField('triggerExamples', updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addExample();
        }
    };

    const generateMetadata = (firstExample: string) => {
        // Generate name from first example
        const firstName = firstExample
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_|_$/g, '')
            .substring(0, 30);

        if (!formData.name) {
            updateField('name', firstName || 'custom_skill');
        }

        // Generate display name from first example
        if (!formData.displayName) {
            const displayName = firstExample
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
            updateField('displayName', displayName);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Trigger</h3>
                    <p className="text-xs text-muted-foreground">
                        When should this action run?
                    </p>
                </div>
            </div>

            <div className="space-y-3 pl-10">
                {/* Existing examples as pills */}
                {triggerExamples.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {triggerExamples.map((example, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-1.5 bg-muted rounded-full pl-3 pr-1.5 py-1.5 text-xs"
                            >
                                <span>{example}</span>
                                <button
                                    onClick={() => removeExample(index)}
                                    className="h-4 w-4 rounded-full hover:bg-destructive/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-2.5 w-2.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add new example */}
                <div className="flex gap-2">
                    <Input
                        value={newExample}
                        onChange={(e) => setNewExample(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g., What's the price of iPhone 15 Pro?"
                        className="flex-1 h-9 text-sm"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addExample}
                        disabled={!newExample.trim()}
                    >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add
                    </Button>
                </div>

                {/* Empty state hint */}
                {triggerExamples.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                        💡 Add 2-3 example phrases that would trigger this action
                    </p>
                )}
            </div>
        </div>
    );
};

// Keep backward compatibility with old name
export const TriggerStep = TriggerSection;
