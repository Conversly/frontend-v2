"use client";

import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  BrainCircuit,
  HelpCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SectionHeader } from './SectionHeader';
import { useUpsertChannelPrompt } from '@/services/prompt';
import { PromptAIHelper } from '@/components/shared/PromptAIHelper';
import { toast } from 'sonner';
import type { UIConfigInput } from '@/types/customization';

interface AITabProps {
  config: UIConfigInput;
  updateConfig: (updates: Partial<UIConfigInput>) => void;
  systemPrompt: string;
  onSystemPromptChange: (prompt: string) => void;
  chatbotId?: string;
}

export function AITab({ config, updateConfig, systemPrompt, onSystemPromptChange, chatbotId }: AITabProps) {
  const { mutate: upsertPrompt, isPending: isSaving } = useUpsertChannelPrompt();

  const handleSavePrompt = () => {
    if (!chatbotId) {
      toast.error('Chatbot ID is required');
      return;
    }
    upsertPrompt(
      { chatbotId, channel: 'WIDGET', systemPrompt },
      {
        onSuccess: () => toast.success('System prompt saved successfully'),
        onError: (error: any) => toast.error(error?.message || 'Failed to save prompt'),
      }
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* System Prompt */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="System Prompt" 
          description="Define how your AI assistant behaves and responds"
          icon={BrainCircuit}
        />
        
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-sans text-base text-foreground">Prompt Instructions</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">
                    Instructions that define the AI's personality, tone, and behavior
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Textarea
              value={systemPrompt || ''}
              onChange={(e) => onSystemPromptChange(e.target.value)}
              className="bg-muted/50 border-border/50 text-foreground min-h-[200px] font-mono text-sm"
              placeholder="You are a helpful assistant..."
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {(systemPrompt || '').length} characters
            </p>
          </div>

          {/* AI Prompt Helper */}
          {chatbotId && (
            <PromptAIHelper
              chatbotId={chatbotId}
              channel="WIDGET"
              onPromptGenerated={onSystemPromptChange}
            />
          )}

          {chatbotId && (
            <Button 
              onClick={handleSavePrompt}
              disabled={isSaving}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSaving ? 'Saving...' : 'Save System Prompt'}
            </Button>
          )}
        </div>
      </div>

      {/* AI Behavior Settings */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="AI Behavior" 
          description="Configure how the AI interacts with users"
        />
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="font-sans text-base text-foreground">Collect User Feedback</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">
                    Allow users to rate responses with thumbs up/down
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              id="collectFeedback"
              checked={config.collectFeedback || false}
              onChange={(e) => updateConfig({ collectFeedback: e.target.checked })}
              className="w-5 h-5 rounded border-border bg-muted/50 accent-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="font-sans text-base text-foreground">Allow Message Regeneration</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">
                    Let users regenerate AI responses to get alternative answers
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              id="allowRegenerate"
              checked={config.allowRegenerate || false}
              onChange={(e) => updateConfig({ allowRegenerate: e.target.checked })}
              className="w-5 h-5 rounded border-border bg-muted/50 accent-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
