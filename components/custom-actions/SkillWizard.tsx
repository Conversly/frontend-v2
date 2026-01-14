import React, { useState } from 'react';
import { CustomAction, ToolParameter, CustomActionConfig } from '@/types/customActions';
import { useTestCustomAction } from '@/services/actions';
import { TriggerStep } from './steps/TriggerStep';
import { ExtractDataStep } from './steps/ExtractDataStep';
import { APIConfigStep } from './steps/APIConfigStep';
import { TestAndSaveStep } from './steps/TestAndSaveStep';
import { cn } from '@/lib/utils';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
    chatbotId: string;
    existingAction?: CustomAction;
    onSave: (action: CustomAction) => Promise<void>;
    onCancel: () => void;
}

type WizardStep = 'trigger' | 'extract' | 'api' | 'test';

const STEP_CONFIG: { key: WizardStep; label: string; number: number }[] = [
    { key: 'trigger', label: 'Trigger', number: 1 },
    { key: 'extract', label: 'Variables', number: 2 },
    { key: 'api', label: 'API', number: 3 },
    { key: 'test', label: 'Test', number: 4 },
];

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
                headers: {},
                queryParams: {},
                bodyTemplate: '',
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

    const [currentStep, setCurrentStep] = useState<WizardStep>('trigger');

    const [testResult, setTestResult] = useState<any>(null);
    const [testing, setTesting] = useState(false);
    const [saving, setSaving] = useState(false);

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
                config: formData.apiConfig,
                testParameters: formData.parameters.reduce((acc, param) => {
                    acc[param.name] = param.default || "test_value";
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

    const getStepNumber = (step: WizardStep): number => {
        const config = STEP_CONFIG.find(s => s.key === step);
        return config?.number || 0;
    };

    const currentStepNumber = getStepNumber(currentStep);



    return (
        <div className="h-[calc(100vh-120px)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-lg font-semibold">
                            {existingAction ? 'Edit Skill' : 'Teach New Skill'}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Configure your bot to call external APIs
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                {/* Left Panel - Form (Scrollable) */}
                <div className="lg:col-span-8 flex flex-col min-h-0 border rounded-lg bg-background shadow-sm">
                    {/* Progress Steps */}
                    <div className="p-4 border-b bg-muted/30">
                        <div className="flex items-center justify-between relative max-w-lg mx-auto">
                            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -z-10" />
                            {STEP_CONFIG.map((step) => (
                                <div
                                    key={step.key}
                                    className={cn(
                                        "flex flex-col items-center gap-2 bg-background px-2 cursor-pointer",
                                        currentStepNumber >= step.number ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => step.number < currentStepNumber && setCurrentStep(step.key)}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors text-sm font-medium",
                                            currentStepNumber >= step.number
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-muted-foreground bg-background"
                                        )}
                                    >
                                        {currentStepNumber > step.number ? <Check className="h-4 w-4" /> : step.number}
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-wider">
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <ScrollArea className="flex-1">
                        <div className="p-6">
                            {currentStep === 'trigger' && (
                                <TriggerStep
                                    formData={formData}
                                    updateField={updateField}
                                    onNext={() => setCurrentStep('extract')}
                                    onBack={onCancel}
                                />
                            )}

                            {currentStep === 'extract' && (
                                <ExtractDataStep
                                    formData={formData}
                                    updateField={updateField}
                                    onNext={() => setCurrentStep('api')}
                                    onBack={() => setCurrentStep('trigger')}
                                />
                            )}

                            {currentStep === 'api' && (
                                <APIConfigStep
                                    formData={formData}
                                    updateField={updateField}
                                    onNext={() => setCurrentStep('test')}
                                    onBack={() => setCurrentStep('extract')}
                                />
                            )}

                            {currentStep === 'test' && (
                                <TestAndSaveStep
                                    formData={formData}
                                    testResult={testResult}
                                    testing={testing}
                                    saving={saving}
                                    onTest={handleTest}
                                    onSave={handleSave}
                                    onBack={() => setCurrentStep('api')}
                                />
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Panel - Preview */}
                <div className="hidden lg:block lg:col-span-4 flex flex-col min-h-0 border rounded-lg bg-muted/30">
                    <div className="p-4 border-b bg-background/50 backdrop-blur">
                        <h3 className="font-semibold flex items-center gap-2">
                            <span className="text-xl">💡</span>
                            Skill Preview
                        </h3>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4 text-sm">
                            {/* Trigger Examples */}
                            {formData.triggerExamples && formData.triggerExamples.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-muted-foreground mb-2">Triggers when user says:</h4>
                                    <div className="space-y-1">
                                        {formData.triggerExamples.map((ex, i) => (
                                            <div key={i} className="text-xs bg-background rounded px-2 py-1">
                                                "{ex}"
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Variables */}
                            {formData.parameters.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-muted-foreground mb-2">Extracts:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {formData.parameters.map((p, i) => (
                                            <span key={i} className="text-xs bg-primary/10 text-primary rounded px-2 py-0.5 font-mono">
                                                {`{{${p.name}}}`}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* API */}
                            {formData.apiConfig.baseUrl && (
                                <div>
                                    <h4 className="font-medium text-muted-foreground mb-2">Calls:</h4>
                                    <div className="text-xs bg-background rounded px-2 py-1 font-mono break-all">
                                        <span className="font-semibold text-primary">{formData.apiConfig.method}</span>{' '}
                                        {formData.apiConfig.baseUrl}{formData.apiConfig.endpoint}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};
