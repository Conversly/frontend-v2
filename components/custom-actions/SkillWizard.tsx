import React, { useState, useRef, useEffect } from 'react';
import { CustomAction } from '@/types/customActions';
import { useTestCustomAction } from '@/services/actions';
import { TriggerSection } from './steps/TriggerStep';
import { DataExtractionSection } from './steps/ExtractDataStep';
import { APIConfigSection } from './steps/APIConfigStep';
import { TestSection } from './steps/TestAndSaveStep';
import { cn } from '@/lib/utils';
import { ArrowLeft, Zap, Database, Globe, Play, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Props {
    chatbotId: string;
    existingAction?: CustomAction;
    onSave: (action: CustomAction) => Promise<void>;
    onCancel: () => void;
}

const SECTIONS = [
    { id: 'trigger', label: 'Trigger', icon: Zap },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'api', label: 'API', icon: Globe },
    { id: 'test', label: 'Test', icon: Play },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export const SkillWizard: React.FC<Props> = ({
    chatbotId,
    existingAction,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<CustomAction>(
        existingAction || {
            id: '',
            chatbotId: chatbotId,
            name: '',
            displayName: '',
            description: '',
            isEnabled: true,
            apiConfig: {
                method: 'GET',
                baseUrl: '',
                endpoint: '',
                responseMapping: '',
                successCodes: [200],
                timeoutSeconds: 30,
                retryCount: 0,
                authType: 'none',
                authValue: '',
                followRedirects: true,
                verifySsl: true,
            },
            parameters: [],
            triggerExamples: [],
            version: 1,
            createdAt: null,
            updatedAt: null,
            lastTestedAt: null,
            testStatus: null,
        }
    );

    const [activeSection, setActiveSection] = useState<SectionId>('trigger');
    const [testResult, setTestResult] = useState<any>(null);
    const [testing, setTesting] = useState(false);
    const [saving, setSaving] = useState(false);

    const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
        trigger: null,
        data: null,
        api: null,
        test: null,
    });

    const { mutateAsync: testAction } = useTestCustomAction();

    const updateField = (path: string, value: any) => {
        setFormData((prev) => {
            const keys = path.split('.');
            if (keys.length === 1) {
                return { ...prev, [keys[0]]: value };
            }

            const updated = { ...prev };
            let current: any = updated;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return updated;
        });
    };

    const handleTest = async () => {
        setTesting(true);
        setTestResult(null);

        try {
            const result = await testAction({
                chatbotId,
                apiConfig: formData.apiConfig,
                parameters: formData.parameters,
                testArgs: formData.parameters.reduce((acc, param) => {
                    acc[param.name] = param.default ?? "test_value";
                    return acc;
                }, {} as Record<string, any>),
            });

            setTestResult({
                success: result.success,
                statusCode: result.statusCode,
                responseBody: result.responseBody,
                responseTime: result.responseTime,
                error: result.error,
                requestUrl: result.requestUrl,
                extractedData: result.extractedData,
            });
        } catch (error: any) {
            setTestResult({ success: false, error: error.message });
        } finally {
            setTesting(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(formData);
        } finally {
            setSaving(false);
        }
    };

    const scrollToSection = (sectionId: SectionId) => {
        const element = sectionRefs.current[sectionId];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    // Intersection Observer to track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('data-section') as SectionId;
                        if (sectionId) {
                            setActiveSection(sectionId);
                        }
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        );

        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={onCancel} className="h-9 w-9">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="type-section-title">
                            {existingAction ? 'Edit Skill' : 'Create Custom Action'}
                        </h1>
                        <p className="type-body-muted">
                            Configure how your bot calls external APIs
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-8 min-h-0">
                {/* Left Sidebar */}
                <div className="w-52 flex-shrink-0 flex flex-col">
                    <div className="flex-1 space-y-1">
                        {SECTIONS.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    {section.label}
                                </button>
                            );
                        })}
                    </div>

                    <Separator className="my-6" />

                    <Button
                        onClick={handleSave}
                        disabled={saving || !formData.apiConfig.baseUrl}
                        className="w-full"
                        size="lg"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Action
                            </>
                        )}
                    </Button>
                </div>

                {/* Main Content */}
                <div className="flex-1 border border-border rounded-lg bg-card shadow-card overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-8">
                            {/* Trigger Section */}
                            <div
                                ref={(el) => { sectionRefs.current.trigger = el; }}
                                data-section="trigger"
                            >
                                <TriggerSection
                                    formData={formData}
                                    updateField={updateField}
                                />
                            </div>

                            <Separator />

                            {/* Data Extraction Section */}
                            <div
                                ref={(el) => { sectionRefs.current.data = el; }}
                                data-section="data"
                            >
                                <DataExtractionSection
                                    formData={formData}
                                    updateField={updateField}
                                />
                            </div>

                            <Separator />

                            {/* API Config Section */}
                            <div
                                ref={(el) => { sectionRefs.current.api = el; }}
                                data-section="api"
                            >
                                <APIConfigSection
                                    formData={formData}
                                    updateField={updateField}
                                />
                            </div>

                            <Separator />

                            {/* Test Section */}
                            <div
                                ref={(el) => { sectionRefs.current.test = el; }}
                                data-section="test"
                            >
                                <TestSection
                                    formData={formData}
                                    testResult={testResult}
                                    testing={testing}
                                    onTest={handleTest}
                                />
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};
