import React, { useState } from 'react';
import { CustomAction, ToolParameter, TestResult, CustomActionConfig } from '@/types/customActions';
import { useTestCustomAction } from '@/services/actions';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { APIConfigStep } from './steps/APIConfigStep';
import { ParametersStep } from './steps/ParametersStep';
import { TestAndSaveStep } from './steps/TestAndSaveStep';
import { ActionExplainer } from './ActionExplainer';
import { CurlImportDialog } from './CurlImportDialog';
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

    const handleCurlImport = (config: Partial<CustomActionConfig>) => {
        setFormData(prev => ({
            ...prev,
            apiConfig: {
                ...prev.apiConfig,
                ...config
            }
        }));
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
        <div className="h-[calc(100vh-120px)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-lg font-semibold">
                            {existingAction ? 'Edit Action' : 'Create New Action'}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Configure how your chatbot interacts with external services
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <CurlImportDialog onImport={handleCurlImport} />
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                {/* Left Panel - Form (Scrollable) */}
                <div className="lg:col-span-7 flex flex-col min-h-0 border rounded-lg bg-background shadow-sm">
                    {/* Progress Steps */}
                    <div className="p-4 border-b bg-muted/30">
                        <div className="flex items-center justify-between relative max-w-md mx-auto">
                            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -z-10" />
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={cn(
                                        "flex flex-col items-center gap-2 bg-background px-2 cursor-pointer",
                                        currentStep >= step ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => step < currentStep && setCurrentStep(step)}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors text-sm font-medium",
                                            currentStep >= step
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-muted-foreground bg-background"
                                        )}
                                    >
                                        {currentStep > step ? <Check className="h-4 w-4" /> : step}
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-wider">
                                        {step === 1 && "Identity"}
                                        {step === 2 && "Connection"}
                                        {step === 3 && "Inputs"}
                                        {step === 4 && "Test"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
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

                {/* Right Panel - Visual Explainer (Hidden on mobile) */}
                <div className="hidden lg:block lg:col-span-5 flex flex-col min-h-0 border rounded-lg bg-muted/30">
                    <div className="p-4 border-b bg-background/50 backdrop-blur">
                        <h3 className="font-semibold flex items-center gap-2">
                            <span className="text-xl">💡</span>
                            Live Preview
                        </h3>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                        <ActionExplainer action={formData} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};
