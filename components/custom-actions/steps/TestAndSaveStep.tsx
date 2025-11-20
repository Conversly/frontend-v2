import React from 'react';
import { CustomAction, TestResult } from '@/types/customActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Play, Save, ChevronLeft, Loader2 } from 'lucide-react';

interface Props {
    formData: CustomAction;
    testResult: TestResult | null;
    testing: boolean;
    saving: boolean;
    onTest: () => void;
    onSave: () => void;
    onBack: () => void;
}

export const TestAndSaveStep: React.FC<Props> = ({
    formData,
    testResult,
    testing,
    saving,
    onTest,
    onSave,
    onBack,
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Test & Save</h2>
                <p className="text-muted-foreground">
                    Verify your action works as expected before saving.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Configuration Review */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration Review</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-muted-foreground">Name:</span>
                                <span className="font-medium">{formData.displayName}</span>

                                <span className="text-muted-foreground">Method:</span>
                                <Badge variant="outline">{formData.apiConfig.method}</Badge>

                                <span className="text-muted-foreground">Auth Type:</span>
                                <span className="capitalize">{formData.apiConfig.authType}</span>
                            </div>

                            <div className="rounded-md bg-muted p-3 font-mono break-all">
                                <span className="text-primary font-semibold">
                                    {formData.apiConfig.method}
                                </span>{' '}
                                {formData.apiConfig.baseUrl}{formData.apiConfig.endpoint}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Test Parameters</CardTitle>
                            <CardDescription>
                                Enter values to test the action.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {formData.parameters.length === 0 ? (
                                <p className="text-sm text-muted-foreground italic">
                                    No parameters required.
                                </p>
                            ) : (
                                formData.parameters.map((param) => (
                                    <div key={param.name} className="space-y-2">
                                        <Label htmlFor={`test-${param.name}`}>
                                            {param.name}{' '}
                                            {param.required && (
                                                <span className="text-destructive">*</span>
                                            )}
                                        </Label>
                                        <Input
                                            id={`test-${param.name}`}
                                            placeholder={param.default || `Enter ${param.type}`}
                                            onChange={(e) => {
                                                // In a real app, you'd update a local state for test values
                                                // For now, we'll just rely on defaults or empty strings in the handleTest function
                                            }}
                                        />
                                    </div>
                                ))
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={onTest}
                                disabled={testing}
                                className="w-full"
                            >
                                {testing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Testing...
                                    </>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        Run Test
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Test Results */}
                <div className="space-y-6">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Test Results</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {!testResult ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground min-h-[300px]">
                                    <Play className="h-12 w-12 mb-4 opacity-20" />
                                    <p>Run a test to see results here.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant={testResult.success ? 'default' : 'destructive'}
                                            className="text-sm px-3 py-1"
                                        >
                                            {testResult.success ? 'Success' : 'Failed'}
                                        </Badge>
                                        {testResult.statusCode && (
                                            <span className="text-sm font-mono text-muted-foreground">
                                                Status: {testResult.statusCode}
                                            </span>
                                        )}
                                        {testResult.responseTime && (
                                            <span className="text-sm font-mono text-muted-foreground">
                                                {testResult.responseTime}ms
                                            </span>
                                        )}
                                    </div>

                                    {testResult.error && (
                                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                                            <strong>Error:</strong> {testResult.error}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label>Response Body</Label>
                                        <div className="rounded-md bg-muted p-3 font-mono text-xs overflow-auto max-h-[300px] whitespace-pre-wrap">
                                            {typeof testResult.responseBody === 'string'
                                                ? testResult.responseBody
                                                : JSON.stringify(testResult.responseBody, null, 2)}
                                        </div>
                                    </div>

                                    {testResult.extractedData && (
                                        <div className="space-y-2">
                                            <Label>Extracted Data (via JSONPath)</Label>
                                            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 font-mono text-xs overflow-auto">
                                                {JSON.stringify(testResult.extractedData, null, 2)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={onBack}>
                    ← Back
                </Button>
                <Button onClick={onSave} disabled={testing || saving}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Action
                </Button>
            </div>
        </div>
    );
};
