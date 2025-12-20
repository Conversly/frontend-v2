import React from 'react';
import { CustomAction } from '@/types/customActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Globe, Lock, Database, MessageSquare } from 'lucide-react';

interface Props {
    action: CustomAction;
}

export const ActionExplainer: React.FC<Props> = ({ action }) => {
    return (
        <div className="space-y-6 h-full overflow-y-auto p-1">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">How this action works</h3>
                <p className="text-sm text-muted-foreground">
                    This is a preview of how the AI understands and uses your action.
                </p>
            </div>

            {/* 1. Identity (What) */}
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        1. The Trigger (What)
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <p className="mb-2">
                        When a user asks something like:
                    </p>
                    <div className="bg-muted p-3 rounded-md italic text-muted-foreground mb-3">
                        "Can you {action.displayName || 'do this action'}?"
                    </div>
                    <p>
                        The AI will identify this as the <strong>{action.name || '...'}</strong> action.
                    </p>
                </CardContent>
            </Card>

            {/* 2. Connection (Where) */}
            <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-purple-500" />
                        2. The Destination (Where)
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <p className="mb-2">
                        It will send a request to:
                    </p>
                    <div className="flex items-center gap-2 font-mono bg-muted p-2 rounded text-xs break-all">
                        <Badge variant={action.apiConfig.method === 'GET' ? 'default' : 'secondary'}>
                            {action.apiConfig.method}
                        </Badge>
                        <span>
                            {action.apiConfig.baseUrl}
                            <span className="text-purple-600 font-bold">{action.apiConfig.endpoint}</span>
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* 3. Security (How) */}
            <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        3. Security (How)
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    {action.apiConfig.authType === 'none' ? (
                        <p className="text-muted-foreground">No authentication required. This is a public API.</p>
                    ) : (
                        <p>
                            Using <strong>{action.apiConfig.authType}</strong> authentication to securely access the data.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* 4. Data (Payload) */}
            <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Database className="h-4 w-4 text-green-500" />
                        4. The Data (Payload)
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                    <div>
                        <p className="mb-2 font-medium text-xs uppercase text-muted-foreground">Parameters extracted from chat:</p>
                        {action.parameters.length === 0 ? (
                            <p className="text-muted-foreground italic text-xs">No parameters defined yet.</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {action.parameters.map(param => (
                                    <Badge key={param.name} variant="outline" className="font-mono">
                                        {param.name}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {action.apiConfig.method !== 'GET' && (
                        <div>
                            <p className="mb-2 font-medium text-xs uppercase text-muted-foreground">Body sent to API:</p>
                            <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                                {action.apiConfig.bodyTemplate || '{}'}
                            </pre>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
