import React, { useState } from 'react';
import { CustomAction, ToolParameter, TestResult } from '@/types/customActions';
import { useTestCustomAction } from '@/services/actions';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { APIConfigStep } from './steps/APIConfigStep';
import { ParametersStep } from './steps/ParametersStep';
import { TestAndSaveStep } from './steps/TestAndSaveStep';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

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

    const { mutateAsync: testAction } = useTestCustomAction();

    const handleTest = async () => {
        setTesting(true);
        setTestResult(null);

        try {
            const result = await testAction({
                chatbotId,
                config: formData.apiConfig,
                testParameters: formData.parameters.reduce((acc, param) => {
                    // This is a simplified way to generate test parameters.
                    // In a real app, you might want to ask the user for input values.
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
        <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -z-10" />
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={cn(
                                "flex flex-col items-center gap-2 bg-background px-2",
                                currentStep >= step ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                                    currentStep >= step
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-muted-foreground bg-background"
                                )}
                            >
                                {currentStep > step ? <Check className="h-4 w-4" /> : step}
                            </div>
                            <span className="text-xs font-medium">
                                {step === 1 && "Basic Info"}
                                {step === 2 && "API Config"}
                                {step === 3 && "Parameters"}
                                {step === 4 && "Test & Save"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
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
        </div>
    );
};
