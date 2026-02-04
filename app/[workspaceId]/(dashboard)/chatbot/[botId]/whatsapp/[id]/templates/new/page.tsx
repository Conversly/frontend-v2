'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
import {
    ChevronLeft,
    MousePointer2,
    X,
    Plus,
} from 'lucide-react';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { useCreateTemplate } from '@/services/template';
import { toast } from 'sonner';
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { AIGenerator } from './components/ai-generator';
import { PhonePreview } from '@/components/whatsapp/phone-preview';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from "@/lib/utils";

// Define Validation Schema
const formSchema = z.object({
    templateName: z.string()
        .min(1, "Template name is required")
        .regex(/^[a-z0-9_]+$/, "Name can only contain lowercase alphanumeric characters and underscores"),
    category: z.enum(["MARKETING", "UTILITY", "AUTHENTICATION"]),
    language: z.string().min(1, "Language is required"),
    templateType: z.enum(["TEXT", "IMAGE", "VIDEO", "DOCUMENT"]),
    headerText: z.string().max(60, "Header text cannot exceed 60 characters").optional(),
    bodyText: z.string()
        .min(1, "Body text is required")
        .max(1024, "Body text cannot exceed 1024 characters"),
    footerText: z.string().max(60, "Footer text cannot exceed 60 characters").optional(),
    buttons: z.array(z.object({
        type: z.enum(["URL", "PHONE", "QUICK_REPLY"]),
        text: z.string().min(1, "Button title required").max(25, "Max 25 chars"),
        url: z.string().url("Invalid URL").optional().or(z.literal('')),
        phoneNumber: z.string().optional(),
    })).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateTemplatePage() {
    const router = useRouter();
    const params = useParams<{ workspaceId: string; botId: string; id: string }>();
    const searchParams = useSearchParams();
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const integrationId = Array.isArray(params.id) ? params.id[0] : params.id;


    // Sample Values State (Dynamic)
    const [cachedParams, setCachedParams] = useState<Record<string, string>>({});
    const [clickTracking, setClickTracking] = useState(false);
    const [interactiveActionType, setInteractiveActionType] = useState('All');

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Initialize Form
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            templateName: '',
            category: 'MARKETING',
            language: 'en_GB',
            templateType: 'TEXT',
            headerText: '',
            bodyText: '',
            footerText: '',
            buttons: [],
        }
    });

    // Watch values for Preview and Logic
    const watchedValues = watch();
    const {
        templateName,
        category,
        language,
        templateType,
        headerText,
        bodyText,
        footerText,
        buttons = []
    } = watchedValues;

    useEffect(() => {
        // Initialize from source if copy
        const sourceName = searchParams.get('source_template_name');
        if (sourceName) {
            setValue('templateName', `${sourceName}_copy`);
        }

        // Reset parent scroll if it shifted
        const pageContainer = document.querySelector('.page-container');
        if (pageContainer) {
            pageContainer.scrollTop = 0;
        }
    }, [searchParams, setValue]);

    // Parse params from body text, e.g. {{1}}
    const paramMatches = useMemo(() => {
        const matches = bodyText?.match(/{{(\d+)}}/g) || [];
        // Unique numbers
        const unique = Array.from(new Set(matches.map(m => m.replace(/{{|}}/g, '')))).sort((a, b) => parseInt(a) - parseInt(b));
        return unique;
    }, [bodyText]);

    const applyGeneratedOption = (option: any) => {
        setValue('bodyText', option.body);

        // Auto-fill sample params
        const newParams = { ...cachedParams };
        option.params.forEach((p: string, i: number) => {
            newParams[(i + 1).toString()] = p;
        });
        setCachedParams(newParams);

        // Mock buttons
        const newButtons: any = [
            { type: 'URL', text: 'Request a Demo', url: 'https://' },
            { type: 'URL', text: 'Get Started Now', url: 'https://' }
        ];
        setValue('buttons', newButtons);

        setValue('templateName', `marketing_english_uk_${new Date().toISOString().slice(0, 10).replace(/-/g, '_')}_${Math.floor(Math.random() * 10000)}`);
        setValue('category', 'MARKETING');
        setValue('language', 'en_GB');

        setValue('language', 'en_GB');

        // Scroll to top of form
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const { mutateAsync: createTemplate, isPending: isCreating } = useCreateTemplate();

    const onSubmit = async (data: FormValues) => {
        // Validate Sample Params
        if (paramMatches.length > 0) {
            const missingParams = paramMatches.filter(p => !cachedParams[p]?.trim());
            if (missingParams.length > 0) {
                toast.error(`Please provide sample values for: ${missingParams.map(p => `{{${p}}}`).join(', ')}`);
                return;
            }
        }

        // Validate Buttons specific logic
        if (data.buttons && data.buttons.length > 0) {
            for (const btn of data.buttons) {
                if (btn.type === 'URL' && !btn.url) {
                    toast.error(`URL is required for button "${btn.text}"`);
                    return;
                }
                if (btn.type === 'PHONE' && !btn.phoneNumber) {
                    toast.error(`Phone number is required for button "${btn.text}"`);
                    return;
                }
            }
        }

        // Prepare Components
        const components: any[] = [];
        // Header
        if (data.headerText) {
            components.push({ type: 'HEADER', format: 'TEXT', text: data.headerText });
        }
        // Body
        components.push({ type: 'BODY', text: data.bodyText });
        // Footer
        if (data.footerText) {
            components.push({ type: 'FOOTER', text: data.footerText });
        }
        // Buttons
        if (data.buttons && data.buttons.length > 0) {
            components.push({
                type: 'BUTTONS',
                buttons: data.buttons.map(b => ({
                    type: b.type,
                    text: b.text,
                    url: b.type === 'URL' ? b.url : undefined,
                    phone_number: b.type === 'PHONE' ? b.phoneNumber : undefined,
                }))
            });
        }

        try {
            await createTemplate({
                chatbotId: botId,
                name: data.templateName,
                category: data.category as any,
                language: data.language,
                content: data.bodyText, // Fallback/Required field
                components,
                // These fields are not in CreateTemplateInput but were in the old call. 
                // However, CreateTemplateInput provided by user has 'components'.
                // If extra fields are needed for 'createDefaultWhatsAppTemplate' equivalent, they might be implicit or handled by backend.
                // Re-checking CreateTemplateInput in types/templates.ts: it has components?.
            });
            toast.success("Template submitted successfully");
            router.push(`/${workspaceId}/chatbot/${botId}/whatsapp/${integrationId}/templates`);
        } catch (e: any) {
            console.error("Template creation failed", e);
            toast.error(e.message || "Failed to submit template");
        }
    };

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/${workspaceId}/chatbot/${botId}/whatsapp/${integrationId}`;

    return (
        <div className="flex w-full h-[calc(100svh-3rem)] bg-[#f9fafb] min-h-0">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
            />

            <div className="flex-1 flex flex-col h-full overflow-hidden min-h-0">
                {/* Top Navigation Bar */}
                <div className="h-16 border-b bg-white flex items-center justify-between px-6 flex-shrink-0 z-20">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-semibold text-gray-800">New Template Message</h3>
                            <div className="h-4 w-[1px] bg-gray-300"></div>
                            <h4 className="text-sm font-medium text-gray-600">WCC Credits: ₹50</h4>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0" ref={scrollContainerRef}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center p-6 pb-20">
                        <div className="w-full max-w-[1200px] grid grid-cols-12 gap-8">

                            {/* Left Column: Form */}
                            <div className="col-span-12 lg:col-span-8 space-y-6" id="template-form-container">

                                {/* 1. Category and Language */}
                                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="mb-2">
                                                <h4 className="text-base font-medium text-gray-900">Template Category</h4>
                                                <p className="text-xs text-gray-500">Your template should fall under one of these categories.</p>
                                            </div>
                                            <Controller
                                                name="category"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className={cn("bg-gray-50", errors.category && "border-red-500 ring-red-500")}>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="MARKETING">MARKETING</SelectItem>
                                                            <SelectItem value="UTILITY">UTILITY</SelectItem>
                                                            <SelectItem value="AUTHENTICATION">AUTHENTICATION</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="mb-2">
                                                <h4 className="text-base font-medium text-gray-900">Template Language</h4>
                                                <p className="text-xs text-gray-500">You will need to specify the language in which message template is submitted.</p>
                                            </div>
                                            <Controller
                                                name="language"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className={cn("bg-gray-50", errors.language && "border-red-500 ring-red-500")}>
                                                            <SelectValue placeholder="Select language" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="en_US">English (US)</SelectItem>
                                                            <SelectItem value="en_GB">English (UK)</SelectItem>
                                                            <SelectItem value="es">Spanish</SelectItem>
                                                            <SelectItem value="hi">Hindi</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors.language && <p className="text-xs text-red-500 mt-1">{errors.language.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Generate with AI */}
                                <AIGenerator
                                    onGenerate={applyGeneratedOption}
                                    category={category}
                                    language={language}
                                />

                                {/* 3. Template Name */}
                                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                                    <div className="mb-2">
                                        <h4 className="text-base font-medium text-gray-900">Template Name</h4>
                                        <p className="text-xs text-gray-500">Name can only be in lowercase alphanumeric characters and underscores.</p>
                                    </div>
                                    <Input
                                        placeholder="Enter name"
                                        {...register('templateName')}
                                        className={cn("bg-gray-50", errors.templateName && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    {errors.templateName && <p className="text-xs text-red-500">{errors.templateName.message}</p>}
                                </div>

                                {/* 4. Template Type & Header */}
                                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6">
                                    <div className="mb-2">
                                        <h4 className="text-base font-medium text-gray-900">Template Type</h4>
                                        <p className="text-xs text-gray-500">Your template type should fall under one of these categories.</p>
                                    </div>

                                    <Controller
                                        name="templateType"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TEXT">TEXT</SelectItem>
                                                    <SelectItem value="IMAGE">IMAGE</SelectItem>
                                                    <SelectItem value="VIDEO">VIDEO</SelectItem>
                                                    <SelectItem value="DOCUMENT">DOCUMENT</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {templateType === 'TEXT' && (
                                        <div className="space-y-2 mt-4">
                                            <div className="mb-2">
                                                <h4 className="text-base font-medium text-gray-900">Template Header Text <span className="text-gray-400 font-normal">(Optional)</span></h4>
                                                <p className="text-xs text-gray-500">Header text is optional and only upto 60 characters are allowed.</p>
                                            </div>
                                            <Input
                                                placeholder="Enter header text here"
                                                {...register('headerText')}
                                                maxLength={60}
                                                className={cn("bg-gray-50", errors.headerText && "border-red-500 focus-visible:ring-red-500")}
                                            />
                                            {errors.headerText && <p className="text-xs text-red-500">{errors.headerText.message}</p>}
                                        </div>
                                    )}
                                </div>

                                {/* 5. Template Body (Format) */}
                                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                                    <div className="mb-2">
                                        <h4 className="text-base font-medium text-gray-900">Template Format</h4>
                                        <p className="text-xs text-gray-500">Use text formatting - *bold* , _italic_ & ~strikethrough~</p>
                                    </div>
                                    <div>
                                        <Textarea
                                            placeholder="Enter your message in here..."
                                            {...register('bodyText')}
                                            className={cn("min-h-[200px] bg-gray-50 font-mono text-sm", errors.bodyText && "border-red-500 focus-visible:ring-red-500")}
                                            maxLength={1024}
                                        />
                                        <div className="flex justify-between items-start mt-1">
                                            <div className="flex-1">
                                                {errors.bodyText && <p className="text-xs text-red-500">{errors.bodyText.message}</p>}
                                            </div>
                                            <p className="text-xs text-right text-gray-400">{bodyText?.length || 0}/1024</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 6. Sample Values */}
                                {paramMatches.length > 0 && (
                                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                                        <div className="mb-2">
                                            <h4 className="text-base font-medium text-gray-900">Sample Values</h4>
                                            <p className="text-xs text-gray-500">Specify sample values for your parameters. These values can be changed at the time of sending.</p>
                                        </div>
                                        <div className="space-y-3">
                                            {paramMatches.map((param) => (
                                                <div key={param} className="flex items-center gap-4">
                                                    <div className="w-16 flex-shrink-0">
                                                        <span className="text-sm font-semibold bg-gray-100 px-2 py-1 rounded">{`{{${param}}}`}</span>
                                                    </div>
                                                    <Input
                                                        placeholder="Sample value"
                                                        value={cachedParams[param] || ''}
                                                        onChange={(e) => setCachedParams({ ...cachedParams, [param]: e.target.value })}
                                                        className="bg-gray-50"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 7. Footer */}
                                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
                                    <div className="mb-2">
                                        <h4 className="text-base font-medium text-gray-900">Template Footer <span className="text-gray-400 font-normal">(Optional)</span></h4>
                                        <p className="text-xs text-gray-500">Your message content. Upto 60 characters are allowed.</p>
                                    </div>
                                    <Input
                                        placeholder="Enter footer text here"
                                        {...register('footerText')}
                                        maxLength={60}
                                        className={cn("bg-gray-50", errors.footerText && "border-red-500 focus-visible:ring-red-500")}
                                    />
                                    {errors.footerText && <p className="text-xs text-red-500">{errors.footerText.message}</p>}
                                </div>

                                {/* 8. Interactive Actions */}
                                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6">
                                    <div className="mb-2">
                                        <h4 className="text-base font-medium text-gray-900">Interactive Actions</h4>
                                        <p className="text-xs text-gray-500">In addition to your message, you can send actions with your message.</p>
                                    </div>

                                    <RadioGroup
                                        value={interactiveActionType}
                                        onValueChange={setInteractiveActionType}
                                        className="flex space-x-4 mb-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="None" id="r1" />
                                            <Label htmlFor="r1">None</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="CAT" id="r2" />
                                            <Label htmlFor="r2">Call to Actions</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="QuickReplies" id="r3" />
                                            <Label htmlFor="r3">Quick Replies</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="All" id="r4" />
                                            <Label htmlFor="r4">All</Label>
                                        </div>
                                    </RadioGroup>

                                    {(interactiveActionType === 'CAT' || interactiveActionType === 'All') && (
                                        <div className="space-y-4">
                                            {/* Action 1 */}
                                            {buttons.filter((b: any) => b.type === 'URL' || b.type === 'PHONE').map((btn: any, idx: number) => (
                                                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                                                    <div className="col-span-12 md:col-span-2">
                                                        <span className="text-sm font-medium">Call to Action {idx + 1}:</span>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-3">
                                                        {/* For Buttons, because they are dynamic and mixed type, complex to map to Zod directly with useFieldArray strictly in this quick refactor. 
                                                               I'll keep them as controlled state but validate them in onSubmit for simplicity in this specific user request context, 
                                                               OR map them to form 'buttons' field.
                                                               BETTER: Map them to form buttons.
                                                           */}
                                                        <Select value={btn.type} onValueChange={(val) => {
                                                            const newButtons = [...buttons];
                                                            newButtons[idx].type = val as any;
                                                            setValue('buttons', newButtons);
                                                        }}>
                                                            <SelectTrigger className="bg-gray-50">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="URL">URL</SelectItem>
                                                                <SelectItem value="PHONE">Phone Number</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-3">
                                                        <Input
                                                            placeholder="Button title"
                                                            value={btn.text}
                                                            onChange={(e) => {
                                                                const newButtons = [...buttons];
                                                                newButtons[idx].text = e.target.value;
                                                                setValue('buttons', newButtons);
                                                            }}
                                                            maxLength={25}
                                                            className="bg-gray-50"
                                                        />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-3">
                                                        <Input
                                                            placeholder={btn.type === 'URL' ? 'https://example.com' : '+123456789'}
                                                            value={btn.type === 'URL' ? btn.url : btn.phoneNumber}
                                                            onChange={(e) => {
                                                                const newButtons = [...buttons];
                                                                if (btn.type === 'URL') newButtons[idx].url = e.target.value;
                                                                else newButtons[idx].phoneNumber = e.target.value;
                                                                setValue('buttons', newButtons);
                                                            }}
                                                            className="bg-gray-50"
                                                        />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-1 flex justify-end">
                                                        <Button variant="ghost" size="icon" type="button" onClick={() => {
                                                            const newButtons = buttons.filter((_: any, i: number) => i !== idx);
                                                            setValue('buttons', newButtons);
                                                        }}>
                                                            <X className="w-4 h-4 text-gray-400" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                type="button"
                                                onClick={() => {
                                                    const currentButtons = buttons || [];
                                                    setValue('buttons', [...currentButtons, { type: 'URL', text: '', url: '' }]);
                                                }}
                                                disabled={buttons.filter((b: any) => b.type !== 'QUICK_REPLY').length >= 2}
                                            >
                                                <Plus className="w-4 h-4 mr-2" /> Add Call to Action
                                            </Button>
                                        </div>
                                    )}

                                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-700">Enable Click Tracking</span>
                                            <MousePointer2 className="w-4 h-4 text-gray-400" />
                                            <Switch checked={clickTracking} onCheckedChange={setClickTracking} disabled />
                                            <Badge className="bg-[#713ce2] hover:bg-[#713ce2]">PRO ✨</Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        className="bg-[#0a474c] hover:bg-[#083a3e] text-white px-8"
                                        disabled={isCreating}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>

                            {/* Right Column: Preview */}
                            <div className="col-span-12 lg:col-span-4 pl-4 hidden lg:block">
                                <PhonePreview
                                    headerText={headerText || ''}
                                    bodyText={bodyText || ''}
                                    footerText={footerText || ''}
                                    buttons={buttons || []}
                                    templateType={templateType}
                                    cachedParams={cachedParams}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
