import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, FileEdit, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HttpMethod } from '@/types/customActions';

export type SkillType = 'fetch' | 'submit' | 'advanced';

interface SkillTypeConfig {
    type: SkillType;
    icon: React.ReactNode;
    emoji: string;
    title: string;
    description: string;
    defaultMethod: HttpMethod;
    triggerHints: string[];
}

const SKILL_TYPES: SkillTypeConfig[] = [
    {
        type: 'fetch',
        icon: <Search className="h-6 w-6" />,
        emoji: '🔍',
        title: 'Fetch data from my API',
        description: 'Look up information like prices, availability, order status',
        defaultMethod: 'GET',
        triggerHints: ['get price of {{product}}', 'check order status {{order_id}}'],
    },
    {
        type: 'submit',
        icon: <FileEdit className="h-6 w-6" />,
        emoji: '📝',
        title: 'Submit info to my API',
        description: 'Send data like form submissions, orders, or bookings',
        defaultMethod: 'POST',
        triggerHints: ['submit my details', 'place order for {{product}}'],
    },
    {
        type: 'advanced',
        icon: <Code className="h-6 w-6" />,
        emoji: '🔗',
        title: 'Advanced API call',
        description: 'Full control over method, headers, body, and response',
        defaultMethod: 'GET',
        triggerHints: [],
    },
];

interface Props {
    onSelect: (skillType: SkillType, defaultMethod: HttpMethod) => void;
    onCancel: () => void;
}

export const SkillTypeSelector: React.FC<Props> = ({ onSelect, onCancel }) => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        What should your bot be able to do?
                    </h2>
                    <p className="text-muted-foreground">
                        Pick a skill type to teach your bot
                    </p>
                </div>
            </div>

            {/* Skill Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SKILL_TYPES.map((skill) => (
                    <Card
                        key={skill.type}
                        className={cn(
                            "relative cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
                            "group"
                        )}
                        onClick={() => onSelect(skill.type, skill.defaultMethod)}
                    >
                        <CardContent className="pt-6 pb-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <span className="text-3xl">{skill.emoji}</span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-lg">{skill.title}</h3>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground">
                                    {skill.description}
                                </p>

                                {/* Method badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-mono">
                                    <span className={cn(
                                        "font-semibold",
                                        skill.defaultMethod === 'GET' ? 'text-green-600' : 'text-blue-600'
                                    )}>
                                        {skill.defaultMethod}
                                    </span>
                                    <span className="text-muted-foreground">request</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Helper text */}
            <p className="text-center text-sm text-muted-foreground">
                Don't worry, you can customize everything in the next steps
            </p>
        </div>
    );
};

export { SKILL_TYPES };
export type { SkillTypeConfig };
