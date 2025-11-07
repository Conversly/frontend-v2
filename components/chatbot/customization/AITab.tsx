"use client";

import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BrainCircuit,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SectionHeader } from './SectionHeader';
import { useGetInstructions } from '@/services/chatbot';
import { updateInstructions } from '@/lib/api/chatbot';
import { toast } from 'sonner';
import { useState } from 'react';
import type { UIConfigInput } from '@/types/customization';

interface AITabProps {
  config: UIConfigInput;
  updateConfig: (updates: Partial<UIConfigInput>) => void;
  systemPrompt: string;
  chatbotId?: string;
}

export function AITab({ config, updateConfig, systemPrompt, chatbotId }: AITabProps) {
  const [promptTopic, setPromptTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { mutate: generatePrompt } = useGetInstructions();

  const handleGeneratePrompt = () => {
    if (!promptTopic.trim()) {
      toast.error('Please enter a topic');
      return;
    }
    setIsGenerating(true);
    generatePrompt(
      promptTopic,
      {
        onSuccess: (data) => {
          updateConfig({ systemPrompt: data.systemPrompt });
          toast.success('System prompt generated successfully');
          setIsGenerating(false);
        },
        onError: (error: any) => {
          toast.error(error?.message || 'Failed to generate prompt');
          setIsGenerating(false);
        },
      }
    );
  };

  const handleSavePrompt = async () => {
    if (!chatbotId) {
      toast.error('Chatbot ID is required');
      return;
    }
    try {
      await updateInstructions(chatbotId, config.systemPrompt || systemPrompt);
      toast.success('System prompt saved successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save prompt');
    }
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
              value={config.systemPrompt || systemPrompt || ''}
              onChange={(e) => updateConfig({ systemPrompt: e.target.value })}
              className="bg-muted/50 border-border/50 text-foreground min-h-[200px] font-mono text-sm"
              placeholder="You are a helpful assistant..."
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {(config.systemPrompt || systemPrompt || '').length} characters
            </p>
          </div>

          {/* Generate Prompt */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <label className="font-sans text-base text-foreground">Generate Prompt with AI</label>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleGeneratePrompt()}
                className="flex-1 bg-muted/50 border-border/50 text-foreground"
                placeholder="e.g., customer support, sales assistant, technical help"
                disabled={isGenerating}
              />
              <Button 
                onClick={handleGeneratePrompt}
                disabled={isGenerating || !promptTopic.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </div>

          {chatbotId && (
            <Button 
              onClick={handleSavePrompt} 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
            >
              Save System Prompt
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
