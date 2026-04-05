'use client';

import { AddKnowledgeSidebar, type AddKnowledgeSourceTab } from './AddKnowledgeSidebar';
import { AddKnowledgeCenterContent } from './AddKnowledgeCenterContent';
import { DataSourcesSummaryPanel } from './DataSourcesSummaryPanel';
import { PendingSourcesPanel } from './PendingSourcesPanel';

interface AddKnowledgeViewProps {
  chatbotId: string;
  activeTab: AddKnowledgeSourceTab;
  onTabChange: (tab: AddKnowledgeSourceTab) => void;
  onBack: () => void;
}

export function AddKnowledgeView({ chatbotId, activeTab, onTabChange, onBack }: AddKnowledgeViewProps) {
  return (
    <div className="h-[calc(100vh-48px)] flex bg-background overflow-hidden">
      {/* Left Sidebar */}
      <div className="flex-shrink-0 h-full">
        <AddKnowledgeSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          onBack={onBack}
        />
      </div>

      {/* Center Content — white card surface, elevated over base */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-card">
        <AddKnowledgeCenterContent
          chatbotId={chatbotId}
          activeTab={activeTab}
        />
      </div>

      {/* Right Panel - visible on lg+ */}
      <div className="hidden lg:flex w-[300px] flex-shrink-0 border-l border-border bg-card h-full flex-col overflow-y-auto p-6">
        <DataSourcesSummaryPanel
          chatbotId={chatbotId}
          onProcessSuccess={onBack}
        />
      </div>

      {/* Floating trigger on smaller screens */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <PendingSourcesPanel chatbotId={chatbotId} mode="sheet" />
      </div>
    </div>
  );
}
