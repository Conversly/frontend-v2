import React from 'react';
import { CustomAction } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
    onNext: () => void;
    onCancel: () => void;
}

export const BasicInfoStep: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onCancel,
}) => {
    const isValid = () => {
        return (
            formData.name.length >= 3 &&
            formData.displayName.length >= 3 &&
            formData.description.length >= 20
        );
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight">Basic Information</h2>
                <p className="text-sm text-muted-foreground">
                    Provide a name and description for your custom action.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Action Details</CardTitle>
                    <CardDescription>
                        Define the core identity of your action.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Action Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Action Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value.toLowerCase())}
                            placeholder="e.g., get_product_price"
                            pattern="^[a-z0-9_]+$"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Lowercase letters, numbers, and underscores only. This is the internal identifier.
                        </p>
                    </div>

                    {/* Display Name */}
                    <div className="space-y-2">
                        <Label htmlFor="display_name">
                            Display Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="display_name"
                            value={formData.displayName}
                            onChange={(e) => updateField('displayName', e.target.value)}
                            placeholder="e.g., Get Product Price"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            A human-readable name shown in the dashboard.
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            placeholder="Describe when and how this action should be used. The AI will use this to decide when to call this action."
                            rows={4}
                            required
                            minLength={20}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>The AI uses this to understand when to use this action.</span>
                            <span>{formData.description.length} / 1000</span>
                        </div>
                    </div>

                    {/* Example Good Description */}
                    <div className="rounded-md bg-muted p-4 text-sm">
                        <div className="flex items-center gap-2 font-medium mb-1">
                            <span>💡</span> Example of a good description:
                        </div>
                        <p className="text-muted-foreground">
                            "Use this action when the user asks about product prices, availability,
                            or inventory. It fetches real-time pricing data from our e-commerce API.
                            Requires a product ID or product name."
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={onNext} disabled={!isValid()}>
                    Next: API Configuration →
                </Button>
            </div>
        </div>
    );
};
