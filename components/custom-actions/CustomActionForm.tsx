import React, { useEffect, useMemo, useState } from 'react';
import { CustomAction, TestResult } from '@/types/customActions';
import { useTestCustomAction } from '@/services/actions';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { APIConfigStep } from './steps/APIConfigStep';
import { ParametersStep } from './steps/ParametersStep';
import { TestAndSaveStep } from './steps/TestAndSaveStep';
import { DataAccessStep } from './steps/DataAccessStep';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import {
    ActionFormErrors,
    formatValidationErrors,
    validateActionForSave,
    validateActionForTest,
} from '@/utils/customActionValidation';

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
        staticHeaders: {},
        staticBody: undefined,
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
    const [errors, setErrors] = useState<ActionFormErrors>({});
    const [testValues, setTestValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        (existingAction?.parameters || []).forEach((p) => {
            initial[p.name] =
                p.default !== undefined
                    ? (typeof p.default === 'string' ? p.default : JSON.stringify(p.default))
                    : '';
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
        setErrors({});

        const initial: Record<string, string> = {};
        (existingAction?.parameters || []).forEach((p) => {
            initial[p.name] =
                p.default !== undefined
                    ? (typeof p.default === 'string' ? p.default : JSON.stringify(p.default))
                    : '';
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

        // Best-effort: clear errors for this field (and its children).
        setErrors((prev) => {
            if (!prev || Object.keys(prev).length === 0) return prev;
            const next: ActionFormErrors = {};
            const prefix = `${path}.`;
            for (const [k, v] of Object.entries(prev)) {
                if (k === path) continue;
                if (k.startsWith(prefix)) continue;
                next[k] = v;
            }
            return next;
        });
    };

    const { mutateAsync: testAction } = useTestCustomAction();

    const getParameterValidationError = (): string | null => {
        for (const p of formData.parameters) {
            if (!p.name || !p.name.trim()) return 'Parameter name is required.';
            if (!p.type) return `Parameter type is required for ${p.name}.`;
            if (!p.description || p.description.trim().length < 10) {
                return `Parameter description must be at least 10 chars (${p.name}).`;
            }
            if (!p.location) return `Parameter destination is required (${p.name}).`;
            if (p.location === 'body' && !(p.bodyPath || '').trim()) {
                return `bodyPath is required for body parameter (${p.name}).`;
            }
            if ((p.location === 'query' || p.location === 'header') && !((p.key ?? p.name ?? '').trim().length)) {
                return `key is required for ${p.location} parameter (${p.name}).`;
            }
        }
        return null;
    };

    const handleTest = async () => {
        const validation = validateActionForTest(formData, testValues);
        if (!validation.ok) {
            setErrors(validation.errors);
            toast.error('Fix required fields before testing.', {
                description: formatValidationErrors(validation.errors),
            });
            setCurrentStep(validation.step);
            return;
        }

        setTesting(true);
        setTestResult(null);

        try {
            const result = await testAction({
                chatbotId,
                apiConfig: formData.apiConfig,
                parameters: formData.parameters,
                testArgs: formData.parameters.reduce((acc, param) => {
                    const raw = testValues[param.name];
                    acc[param.name] =
                        (raw ?? '').toString().length > 0
                            ? raw
                            : (param.default !== undefined && param.default !== '' ? param.default : 'test_value');
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
        const validation = validateActionForSave(formData);
        if (!validation.ok) {
            setErrors(validation.errors);
            toast.error('Fix required fields before saving.', {
                description: formatValidationErrors(validation.errors),
            });
            setCurrentStep(validation.step);
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
                    next[p.name] =
                        p.default !== undefined
                            ? (typeof p.default === 'string' ? p.default : JSON.stringify(p.default))
                            : '';
                }
            }
            return next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.parameters]);

    return (
        <div className="h-full w-full flex flex-col space-y-6 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="type-page-title">
                        {existingAction ? 'Edit Action' : 'Create New Action'}
                    </h1>
                    <p className="type-body-muted mt-1">
                        Configure how your chatbot interacts with external services
                    </p>
                </div>
            </div>
            <div className="flex-1 min-h-0 pb-6 w-full min-w-0">
                {/* Content Panel - Left aligned with max width for form readability */}
                <div className="max-w-full flex flex-col min-h-0 min-w-0 h-full">
                    {/* Progress Steps */}
                    <div className="mb-8 flex items-center w-full max-w-2xl">
                        {[1, 2, 3, 4, 5].map((step, index) => (
                            <div key={step} className="flex-1 flex items-center">
                                {(() => {
                                    const isUnlocked = step <= maxStepUnlocked;
                                    const isCurrentOrPast = currentStep >= step;
                                    const isCompleted = currentStep > step;
                                    const isActive = currentStep === step;

                                    return (
                                        <div
                                            className={cn(
                                                "flex flex-col items-center gap-2 group",
                                                isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50",
                                                isCurrentOrPast ? "text-foreground" : "text-muted-foreground"
                                            )}
                                            onClick={() => isUnlocked && setCurrentStep(step)}
                                        >
                                            <div
                                                className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
                                                    isCompleted
                                                        ? "bg-primary text-white shadow-sm"
                                                        : isActive
                                                            ? "bg-primary text-white ring-4 ring-primary/20 shadow-sm"
                                                            : "bg-muted border border-border group-hover:border-primary/50"
                                                )}
                                            >
                                                {isCompleted ? <Check className="h-4 w-4" /> : step}
                                            </div>
                                            <span className={cn(
                                                "text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap hidden sm:block",
                                                isActive ? "text-primary" : "text-muted-foreground"
                                            )}>
                                                {step === 1 && "General"}
                                                {step === 2 && "API"}
                                                {step === 3 && "Inputs"}
                                                {step === 4 && "Test"}
                                                {step === 5 && "Access"}
                                            </span>
                                        </div>
                                    );
                                })()}
                                {index < 4 && (
                                    <div className={cn(
                                        "h-1 w-full mx-2 rounded-full transition-colors duration-300 -mt-6",
                                        maxStepUnlocked > step ? "bg-primary" : "bg-muted"
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 border border-border rounded-lg bg-card shadow-card overflow-hidden flex flex-col min-w-0">
                        <ScrollArea className="flex-1 min-w-0">
                            <div className="p-6 min-w-0">
                                {currentStep === 1 && (
                                    <BasicInfoStep
                                        formData={formData}
                                        updateField={updateField}
                                        errors={errors}
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
                                        errors={errors}
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
                                        errors={errors}
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
