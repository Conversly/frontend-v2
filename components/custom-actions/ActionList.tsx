import React from 'react';
import dynamic from 'next/dynamic';
import { CustomAction } from '@/types/customActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, MoreVertical, Play, Zap, Globe, Database } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Dynamic import to prevent SSR issues with framer-motion
const ActionsVisual = dynamic(() => import('./ActionsVisual'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="animate-pulse flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-slate-200" />
                <div className="w-24 h-3 bg-slate-200 rounded" />
            </div>
        </div>
    )
});

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
            <div className="flex items-center justify-center p-6 h-full">
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-dashed rounded-xl bg-card overflow-hidden min-h-[600px] shadow-sm">
                    {/* Left side - Content */}
                    <div className="flex flex-col items-center justify-center p-8 lg:p-12 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                            <Zap className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            Your bot doesn't have any skills yet
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
                            Teach your bot new skills to fetch data, submit forms, or call your APIs during conversations.
                        </p>

                        {/* Feature highlights */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {[
                                { icon: Globe, label: "Call APIs" },
                                { icon: Database, label: "Query Databases" },
                                { icon: Zap, label: "Trigger Actions" },
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm"
                                >
                                    <feature.icon className="h-3.5 w-3.5" />
                                    {feature.label}
                                </div>
                            ))}
                        </div>

                        <Button size="lg" onClick={onCreate} className="shadow-lg">
                            <Plus className="h-4 w-4 mr-2" />
                            Teach Your First Skill
                        </Button>
                    </div>

                    {/* Right side - Visualization */}
                    <div className="hidden lg:block border-l border-border bg-gradient-to-br from-muted/30 to-background">
                        <ActionsVisual />
                    </div>
                </div>
            </div>
        );

    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Skills ({actions.length})</h2>
                <Button onClick={onCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Teach New Skill
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
                                    <Badge variant="outline" className="text-2xs px-1 py-0 h-5">
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
