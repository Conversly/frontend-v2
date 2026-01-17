'use client';

import { 
  Globe, 
  FileText, 
  MessageSquare, 
  AlignLeft, 
  Plus,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';

// Integration icons (using simple divs with letters for now)
const ConfluenceIcon = () => (
  <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">C</div>
);
const ZendeskIcon = () => (
  <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">Z</div>
);
const SalesforceIcon = () => (
  <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">S</div>
);
const ServiceNowIcon = () => (
  <div className="w-5 h-5 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">SN</div>
);
const SharePointIcon = () => (
  <div className="w-5 h-5 rounded bg-teal-600 flex items-center justify-center text-white text-xs font-bold">SP</div>
);

export type SourceCategory = 'all' | 'URL' | 'DOCUMENT' | 'QNA' | 'TXT';

interface SourcesCategorySidebarProps {
  selectedCategory: SourceCategory;
  onCategoryChange: (category: SourceCategory) => void;
  onAddKnowledge: () => void;
  sourceCounts?: {
    all: number;
    URL: number;
    DOCUMENT: number;
    QNA: number;
    TXT: number;
  };
}

const categories = [
  { id: 'all' as const, label: 'All Sources', icon: FileText },
  { id: 'URL' as const, label: 'Websites', icon: Globe },
  { id: 'DOCUMENT' as const, label: 'Documents', icon: FileText },
  { id: 'QNA' as const, label: 'Q&A', icon: MessageSquare },
  { id: 'TXT' as const, label: 'Text', icon: AlignLeft },
];

const integrations = [
  { id: 'confluence', label: 'Confluence', icon: ConfluenceIcon },
  { id: 'zendesk', label: 'Zendesk', icon: ZendeskIcon },
  { id: 'salesforce', label: 'Salesforce', icon: SalesforceIcon },
  { id: 'servicenow', label: 'ServiceNow', icon: ServiceNowIcon },
  { id: 'sharepoint', label: 'SharePoint', icon: SharePointIcon },
];

export function SourcesCategorySidebar({
  selectedCategory,
  onCategoryChange,
  onAddKnowledge,
  sourceCounts = { all: 0, URL: 0, DOCUMENT: 0, QNA: 0, TXT: 0 }
}: SourcesCategorySidebarProps) {
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(true);

  const handleIntegrationClick = (integrationLabel: string) => {
    toast.info(`${integrationLabel} integration coming soon!`, {
      description: 'We are working on adding this integration.',
    });
  };

  return (
    <div className="w-[240px] border-r border-border bg-card h-full flex flex-col overflow-hidden">
      {/* Add Knowledge Button */}
      <div className="p-4 border-b border-border">
        <Button 
          onClick={onAddKnowledge}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Knowledge
        </Button>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Source Categories */}
        <div className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = sourceCounts[category.id];
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isSelected
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{category.label}</span>
                {count > 0 && (
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Integrations Section */}
        <div className="mt-6">
          <button
            onClick={() => setIsIntegrationsOpen(!isIntegrationsOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
          >
            {isIntegrationsOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            Integrations
          </button>
          
          {isIntegrationsOpen && (
            <div className="space-y-1 mt-1">
              {integrations.map((integration) => {
                const Icon = integration.icon;
                
                return (
                  <button
                    key={integration.id}
                    onClick={() => handleIntegrationClick(integration.label)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Icon />
                    <span className="flex-1 text-left">{integration.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      Soon
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
