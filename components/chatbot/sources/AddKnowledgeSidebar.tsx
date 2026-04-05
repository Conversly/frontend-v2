'use client';

import { FileText, Globe, MessageSquare, AlignLeft, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type AddKnowledgeSourceTab = 'files' | 'website' | 'qa' | 'text';

interface AddKnowledgeSidebarProps {
  activeTab: AddKnowledgeSourceTab;
  onTabChange: (tab: AddKnowledgeSourceTab) => void;
  onBack: () => void;
}

const sourceTypes = [
  {
    id: 'files' as const,
    label: 'Files',
    icon: FileText,
    activeColor: 'bg-blue-500/10 text-blue-600',
    activeBadge: 'bg-blue-500/20 text-blue-600',
  },
  {
    id: 'website' as const,
    label: 'Website',
    icon: Globe,
    activeColor: 'bg-green-500/10 text-green-600',
    activeBadge: 'bg-green-500/20 text-green-600',
  },
  {
    id: 'qa' as const,
    label: 'Q&A',
    icon: MessageSquare,
    activeColor: 'bg-purple-500/10 text-purple-600',
    activeBadge: 'bg-purple-500/20 text-purple-600',
  },
  {
    id: 'text' as const,
    label: 'Text',
    icon: AlignLeft,
    activeColor: 'bg-orange-500/10 text-orange-600',
    activeBadge: 'bg-orange-500/20 text-orange-600',
  },
];

export function AddKnowledgeSidebar({ activeTab, onTabChange, onBack }: AddKnowledgeSidebarProps) {
  return (
    <div className="w-[240px] border-r border-border bg-sidebar h-full flex flex-col overflow-hidden">
      <div className="p-2">
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-[--sidebar-accent] mb-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Back to sources</span>
        </Button>
      </div>

      <div className="border-t border-border" />

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {sourceTypes.map((type) => {
            const Icon = type.icon;
            const isActive = activeTab === type.id;

            return (
              <button
                key={type.id}
                onClick={() => onTabChange(type.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? `${type.activeColor} font-semibold`
                    : 'text-muted-foreground hover:bg-[--sidebar-accent] hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
