import React from 'react';
import { CustomAction } from '@/types/customActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, MoreVertical, Play } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
    actions: CustomAction[];
    onCreate: () => void;
    onEdit: (action: CustomAction) => void;
    onDelete: (actionId: string) => void;
}

export const ActionList: React.FC<Props> = ({
    actions,
    onCreate,
    onEdit,
    onDelete,
}) => {
    if (actions.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
                <h3 className="text-lg font-semibold mb-2">No Actions Created</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Create custom actions to let your chatbot interact with external APIs and services.
                </p>
                <Button onClick={onCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Action
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Actions ({actions.length})</h2>
                <Button onClick={onCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Action
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {actions.map((action) => (
                    <Card key={action.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="text-base">{action.displayName}</CardTitle>
                                    <CardDescription className="font-mono text-xs">
                                        {action.name}
                                    </CardDescription>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="-mr-2">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onEdit(action)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => action.id && onDelete(action.id)}>
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                                    {action.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs font-mono bg-muted p-2 rounded">
                                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">
                                        {action.apiConfig.method}
                                    </Badge>
                                    <span className="truncate" title={action.apiConfig.endpoint}>
                                        {action.apiConfig.endpoint}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                                    <span>{action.parameters.length} params</span>
                                    <div className="flex items-center gap-1">
                                        {action.testStatus === 'passed' ? (
                                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                                                Tested
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                                                Untested
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
