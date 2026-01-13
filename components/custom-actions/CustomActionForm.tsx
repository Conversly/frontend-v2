import React, { useState } from 'react';
import { CustomAction, ToolParameter, TestResult, CustomActionConfig } from '@/types/customActions';
import { useTestCustomAction } from '@/services/actions';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { APIConfigStep } from './steps/APIConfigStep';
import { ParametersStep } from './steps/ParametersStep';
import { TestAndSaveStep } from './steps/TestAndSaveStep';
import { ActionExplainer } from './ActionExplainer';
import { CurlImportDialog } from './CurlImportDialog';
import { ClassifiedHeader } from '@/utils/curlParser';
import { cn } from '@/lib/utils';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '../ui/separator';

interface Props {
    chatbotId: string;
    existingAction?: CustomAction;
    onSave: (action: CustomAction) => Promise<void>;
    onCancel: () => void;
}

export const CustomActionForm: React.FC<Props> = ({
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
            version: 1,
            createdAt: null,
            updatedAt: null,
            lastTestedAt: null,
            testStatus: null,
        }
    );

    const [testResult, setTestResult] = useState<TestResult | null>(null);
    const [testing, setTesting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    // Store classified headers for reference in API config step
    const [classifiedHeaders, setClassifiedHeaders] = useState<ClassifiedHeader[]>([]);

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

    const handleCurlImport = (config: Partial<CustomActionConfig>, headers: ClassifiedHeader[]) => {
        setFormData(prev => ({
            ...prev,
            apiConfig: {
                ...prev.apiConfig,
                ...config
            }
        }));
        // Store classified headers for reference
        setClassifiedHeaders(headers);
        // Jump to API Config step to review
        setCurrentStep(2);
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

    return (
        <div className="h-full flex flex-col space-y-6">
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
                <div className="flex items-center gap-2">
                    <CurlImportDialog onImport={handleCurlImport} />
                </div>
            </div>
            <Separator />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 pb-6">
                {/* Left Panel - Form */}
                <div className="lg:col-span-7 flex flex-col min-h-0">
                    {/* Progress Steps - Clean Horizontal Design */}
                    <div className="mb-6 flex items-center w-full max-w-2xl">
                        {[1, 2, 3, 4].map((step, index) => (
                            <div key={step} className="flex-1 flex items-center">
                                <div
                                    className={cn(
                                        "flex items-center gap-2 cursor-pointer group",
                                        currentStep >= step ? "text-foreground" : "text-muted-foreground"
                                    )}
                                    onClick={() => step < currentStep && setCurrentStep(step)}
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
                                        {step === 1 && "Identity"}
                                        {step === 2 && "Connection"}
                                        {step === 3 && "Inputs"}
                                        {step === 4 && "Test"}
                                    </span>
                                </div>
                                {index < 3 && (
                                    <div className={cn(
                                        "h-[2px] w-full mx-4 rounded-full transition-colors duration-300",
                                        currentStep > step + 1 ? "bg-primary" : "bg-muted"
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 border rounded-xl bg-background shadow-sm overflow-hidden flex flex-col">
                        <ScrollArea className="flex-1">
                            <div className="p-6">
                                {currentStep === 1 && (
                                    <BasicInfoStep
                                        formData={formData}
                                        updateField={updateField}
                                        onNext={() => setCurrentStep(2)}
                                        onCancel={onCancel}
                                    />
                                )}

                                {currentStep === 2 && (
                                    <APIConfigStep
                                        formData={formData}
                                        updateField={updateField}
                                        onNext={() => setCurrentStep(3)}
                                        onBack={() => setCurrentStep(1)}
                                    />
                                )}

                                {currentStep === 3 && (
                                    <ParametersStep
                                        formData={formData}
                                        updateField={updateField}
                                        onNext={() => setCurrentStep(4)}
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
                                        onSave={handleSave}
                                        onBack={() => setCurrentStep(3)}
                                    />
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                {/* Right Panel - Visual Explainer */}
                <div className="hidden lg:col-span-5 lg:flex flex-col min-h-0">
                    <div className="sticky top-0 h-full max-h-[calc(100vh-200px)]">
                        <div className="bg-muted/30 border rounded-xl overflow-hidden h-full flex flex-col">
                            <div className="p-4 border-b bg-background/50 backdrop-blur">
                                <h3 className="font-semibold flex items-center gap-2 text-foreground">
                                    <span className="text-xl">💡</span>
                                    Live Preview
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Real-time preview of how the AI interprets this action
                                </p>
                            </div>
                            <ScrollArea className="flex-1 p-6 overflow-y-auto">
                                <ActionExplainer action={formData} />
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
