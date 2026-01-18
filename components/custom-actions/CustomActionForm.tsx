import React, { useEffect, useMemo, useState } from 'react';
import { CustomAction, TestResult } from '@/types/customActions';
import { useTestCustomAction } from '@/services/actions';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { APIConfigStep } from './steps/APIConfigStep';
import { ParametersStep } from './steps/ParametersStep';
import { TestAndSaveStep } from './steps/TestAndSaveStep';
import { DataAccessStep } from './steps/DataAccessStep';
import { ActionExplainer } from './ActionExplainer';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

interface Props {
    chatbotId: string;
    existingAction?: CustomAction;
    onSave: (action: CustomAction) => Promise<void>;
    onCancel: () => void;
}

const buildDefaultAction = (chatbotId: string): CustomAction => ({
    id: '',
    chatbotId,
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
});

const buildInitialAction = (chatbotId: string, existingAction?: CustomAction): CustomAction => {
    const base = buildDefaultAction(chatbotId);
    if (!existingAction) return base;

    // Deep-merge apiConfig so optional keys (method/authType/etc) never go undefined.
    return {
        ...base,
        ...existingAction,
        chatbotId,
        apiConfig: {
            ...base.apiConfig,
            ...(existingAction.apiConfig || {}),
        },
        parameters: existingAction.parameters || [],
        triggerExamples: existingAction.triggerExamples || [],
    };
};

export const CustomActionForm: React.FC<Props> = ({
    chatbotId,
    existingAction,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<CustomAction>(() =>
        buildInitialAction(chatbotId, existingAction)
    );

    const [testResult, setTestResult] = useState<TestResult | null>(null);
    const [testing, setTesting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [maxStepUnlocked, setMaxStepUnlocked] = useState(() => (existingAction ? 5 : 1));
    const [testValues, setTestValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        (existingAction?.parameters || []).forEach((p) => {
            initial[p.name] = p.default || '';
        });
        return initial;
    });

    // If `existingAction` is loaded async, keep local state in sync.
    useEffect(() => {
        setFormData(buildInitialAction(chatbotId, existingAction));
        setMaxStepUnlocked(existingAction ? 5 : 1);
        setCurrentStep(1);
        setTestResult(null);
        setTesting(false);

        const initial: Record<string, string> = {};
        (existingAction?.parameters || []).forEach((p) => {
            initial[p.name] = p.default || '';
        });
        setTestValues(initial);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatbotId, existingAction?.id]);

    const isStep1Valid = useMemo(() => {
        return formData.name.trim().length >= 3 && formData.description.trim().length >= 20;
    }, [formData.name, formData.description]);

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

    const { mutateAsync: testAction } = useTestCustomAction();

    const handleTest = async () => {
        setTesting(true);
        setTestResult(null);

        try {
            const result = await testAction({
                chatbotId,
                config: formData.apiConfig,
                testParameters: formData.parameters.reduce((acc, param) => {
                    const raw = testValues[param.name];
                    acc[param.name] = (raw ?? '').toString().length > 0 ? raw : (param.default || "test_value");
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
        if (!isStep1Valid) {
            toast.error('Action name + description are required before saving.');
            setCurrentStep(1);
            return;
        }

        setSaving(true);
        try {
            await onSave(formData);
        } finally {
            setSaving(false);
        }
    };

    const handleChangeTestValue = (name: string, value: string) => {
        setTestValues((prev) => ({ ...prev, [name]: value }));
    };

    // Keep test values stable as parameters are added/removed.
    useEffect(() => {
        setTestValues((prev) => {
            const next: Record<string, string> = {};
            for (const p of formData.parameters) {
                if (Object.prototype.hasOwnProperty.call(prev, p.name)) {
                    next[p.name] = prev[p.name] ?? '';
                } else {
                    next[p.name] = p.default || '';
                }
            }
            return next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.parameters]);

    return (
        <div className="h-full w-full max-w-6xl mx-auto flex flex-col space-y-6 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="page-title">
                        {existingAction ? 'Edit Action' : 'Create New Action'}
                    </h2>
                    <p className="page-subtitle mt-1">
                        Configure how your chatbot interacts with external services
                    </p>
                </div>
            </div>
            <Separator />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 pb-6 w-full min-w-0">
                {/* Left Panel - Form */}
                <div className="lg:col-span-7 flex flex-col min-h-0 min-w-0">
                    {/* Progress Steps - Clean Horizontal Design */}
                    <div className="mb-6 flex items-center w-full max-w-2xl">
                        {[1, 2, 3, 4, 5].map((step, index) => (
                            <div key={step} className="flex-1 flex items-center">
                                {(() => {
                                    const isUnlocked = step <= maxStepUnlocked;
                                    const isCurrentOrPast = currentStep >= step;
                                    return (
                                <div
                                    className={cn(
                                        "flex items-center gap-2 group",
                                        isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50",
                                        isCurrentOrPast ? "text-foreground" : "text-muted-foreground"
                                    )}
                                    onClick={() => isUnlocked && setCurrentStep(step)}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                                            currentStep > step
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : currentStep === step
                                                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-sm"
                                                    : "bg-muted border border-border group-hover:border-primary/50"
                                        )}
                                    >
                                        {currentStep > step ? <Check className="h-4 w-4" /> : step}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-medium whitespace-nowrap hidden sm:block",
                                        currentStep === step && "text-primary"
                                    )}>
                                        {step === 1 && "General"}
                                        {step === 2 && "API"}
                                        {step === 3 && "Inputs"}
                                        {step === 4 && "Test response"}
                                        {step === 5 && "Data access"}
                                    </span>
                                </div>
                                    );
                                })()}
                                {index < 4 && (
                                    <div className={cn(
                                        "h-[2px] w-full mx-4 rounded-full transition-colors duration-300",
                                        maxStepUnlocked > step ? "bg-primary" : "bg-muted"
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 border rounded-xl bg-background shadow-sm overflow-hidden flex flex-col min-w-0">
                        <ScrollArea className="flex-1 min-w-0">
                            <div className="p-6 min-w-0">
                                {currentStep === 1 && (
                                    <BasicInfoStep
                                        formData={formData}
                                        updateField={updateField}
                                        onNext={() => {
                                            setMaxStepUnlocked((prev) => Math.max(prev, 2));
                                            setCurrentStep(2);
                                        }}
                                        onCancel={onCancel}
                                    />
                                )}

                                {currentStep === 2 && (
                                    <APIConfigStep
                                        formData={formData}
                                        updateField={updateField}
                                        onNext={() => {
                                            setMaxStepUnlocked((prev) => Math.max(prev, 3));
                                            setCurrentStep(3);
                                        }}
                                        onBack={() => setCurrentStep(1)}
                                    />
                                )}

                                {currentStep === 3 && (
                                    <ParametersStep
                                        formData={formData}
                                        updateField={updateField}
                                        onNext={() => {
                                            setMaxStepUnlocked((prev) => Math.max(prev, 4));
                                            setCurrentStep(4);
                                        }}
                                        onBack={() => setCurrentStep(2)}
                                    />
                                )}

                                {currentStep === 4 && (
                                    <TestAndSaveStep
                                        formData={formData}
                                        testResult={testResult}
                                        testing={testing}
                                        saving={saving}
                                        onTest={handleTest}
                                        onBack={() => setCurrentStep(3)}
                                        onNext={() => {
                                            setMaxStepUnlocked((prev) => Math.max(prev, 5));
                                            setCurrentStep(5);
                                        }}
                                        testValues={testValues}
                                        onChangeTestValue={handleChangeTestValue}
                                    />
                                )}

                                {currentStep === 5 && (
                                    <DataAccessStep
                                        formData={formData}
                                        updateField={updateField}
                                        testResult={testResult}
                                        saving={saving}
                                        onBack={() => setCurrentStep(4)}
                                        onSave={handleSave}
                                    />
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
};
