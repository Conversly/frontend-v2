import React from 'react';
import { CustomAction, TestResult } from '@/types/customActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play } from 'lucide-react';

interface Props {
    formData: CustomAction;
    testResult: TestResult | null;
    testing: boolean;
    onTest: () => void;
    testValues?: Record<string, string>;
    onChangeTestValue?: (name: string, value: string) => void;
}

export const TestSection: React.FC<Props> = ({
    formData,
    testResult,
    testing,
    onTest,
    testValues,
    onChangeTestValue,
}) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Play className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Test</h3>
                    <p className="text-xs text-muted-foreground">
                        Verify your action works correctly
                    </p>
                </div>
            </div>

            <div className="space-y-4 pl-10">
                {/* Configuration Summary */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs p-3 rounded-md bg-muted/50">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{formData.displayName || formData.name || '—'}</span>

                    <span className="text-muted-foreground">Method:</span>
                    <Badge variant="outline" className="w-fit text-2xs h-5">{formData.apiConfig.method}</Badge>

                    <span className="text-muted-foreground">Auth:</span>
                    <span className="capitalize">{formData.apiConfig.authType}</span>
                </div>

                {/* Full URL Preview */}
                {formData.apiConfig.baseUrl && (
                    <div className="rounded-md bg-muted p-2 font-mono text-xs break-all max-w-full">
                        <span className="text-primary font-semibold">{formData.apiConfig.method}</span>{' '}
                        <span className="text-muted-foreground">{formData.apiConfig.baseUrl}</span>
                        <span>{formData.apiConfig.endpoint}</span>
                    </div>
                )}

                {/* Test Parameters */}
                {formData.parameters.length > 0 && (
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Test Values</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {formData.parameters.map((param) => (
                                <div key={param.name} className="flex items-center gap-2">
                                    <Label className="text-xs font-mono w-24 truncate">{param.name}</Label>
                                    <Input
                                        value={
                                            testValues && Object.prototype.hasOwnProperty.call(testValues, param.name)
                                                ? testValues[param.name] ?? ''
                                                : ''
                                        }
                                        onChange={(e) => onChangeTestValue?.(param.name, e.target.value)}
                                        placeholder={param.default || 'test_value'}
                                        className="h-8 text-xs flex-1"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Test Button */}
                <Button
                    onClick={onTest}
                    disabled={testing || !formData.apiConfig.baseUrl}
                    size="sm"
                    variant="outline"
                    className="w-full"
                >
                    {testing ? (
                        <>
                            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            Testing...
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-3.5 w-3.5" />
                            Run Test
                        </>
                    )}
                </Button>

                {/* Test Results */}
                {testResult && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Badge
                                variant={testResult.success ? 'default' : 'destructive'}
                                className="text-xs"
                            >
                                {testResult.success ? 'Success' : 'Failed'}
                            </Badge>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                                {testResult.statusCode && <span>Status: {testResult.statusCode}</span>}
                                {testResult.responseTime && <span>{testResult.responseTime}ms</span>}
                            </div>
                        </div>

                        {testResult.error && (
                            <div className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                                <strong>Error:</strong> {testResult.error}
                            </div>
                        )}

                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Response</Label>
                            <div className="rounded-md bg-muted p-2 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-all max-w-full">
                                {typeof testResult.responseBody === 'string'
                                    ? testResult.responseBody
                                    : JSON.stringify(testResult.responseBody, null, 2)}
                            </div>
                        </div>

                        {testResult.extractedData && (
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Extracted Data</Label>
                                <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-2 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-all max-w-full">
                                    {JSON.stringify(testResult.extractedData, null, 2)}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Keep backward compatibility with old interface
interface OldProps {
    formData: CustomAction;
    testResult: TestResult | null;
    testing: boolean;
    saving: boolean;
    onTest: () => void;
    onBack: () => void;
    onNext?: () => void;
    onSave?: () => void;
    testValues?: Record<string, string>;
    onChangeTestValue?: (name: string, value: string) => void;
}

export const TestAndSaveStep: React.FC<OldProps> = (props) => {
    return (
        <div className="space-y-6">
            <TestSection
                formData={props.formData}
                testResult={props.testResult}
                testing={props.testing}
                onTest={props.onTest}
                testValues={props.testValues}
                onChangeTestValue={props.onChangeTestValue}
            />

            <div className="flex justify-between">
                <Button variant="outline" onClick={props.onBack}>
                    ← Back
                </Button>

                {props.onSave ? (
                    <Button
                        onClick={props.onSave}
                        disabled={props.saving || (props.testResult !== null && !props.testResult.success)}
                    >
                        {props.saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Action'
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={props.onNext}
                        disabled={!props.onNext || props.testing || !props.formData.apiConfig.baseUrl}
                    >
                        Next: Data access →
                    </Button>
                )}
            </div>
        </div>
    );
};
