"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MessageSquare,
  HelpCircle,
  Plus,
  X,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SectionHeader } from './SectionHeader';
import type { UIConfigInput } from '@/types/customization';

interface ContentTabProps {
  config: UIConfigInput;
  updateConfig: (updates: Partial<UIConfigInput>) => void;
}

export function ContentTab({ config, updateConfig }: ContentTabProps) {
  const handleAddQuestion = () => {
    const questions = [...(config.starterQuestions || [])];
    if (questions.length < 4) {
      questions.push('');
      updateConfig({ starterQuestions: questions });
    }
  };

  const handleRemoveQuestion = (index: number) => {
    const questions = [...(config.starterQuestions || [])];
    questions.splice(index, 1);
    // Ensure we always have at least 2 slots
    while (questions.length < 2) {
      questions.push('');
    }
    updateConfig({ starterQuestions: questions });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Initial Message */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="Initial Message" 
          description="The first message users see when they open the chat"
          icon={MessageSquare}
        />
        
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-sans text-base text-foreground">Welcome Message</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">
                    This message appears when users first open the chat widget
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Textarea
              value={config.InitialMessage || ''}
              onChange={(e) => updateConfig({ InitialMessage: e.target.value })}
              placeholder="Hi! How can I help you today? 👋"
              rows={3}
              className="bg-muted/50 border-border/50 text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Starter Questions */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="Starter Questions" 
          description="Quick action buttons to help users get started"
          icon={HelpCircle}
        />
        
        <div className="mt-4 space-y-3">
          {(config.starterQuestions || []).map((question, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={question || ''}
                onChange={(e) => {
                  const newQuestions = [...(config.starterQuestions || [])];
                  newQuestions[index] = e.target.value;
                  updateConfig({ starterQuestions: newQuestions });
                }}
                className="flex-1 bg-muted/50 border-border/50 text-foreground"
                placeholder={`Question ${index + 1}`}
              />
              {(config.starterQuestions || []).length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          
          {(config.starterQuestions || []).length < 4 && (
            <Button
              variant="outline"
              onClick={handleAddQuestion}
              className="w-full border-border text-foreground hover:bg-muted/50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          )}
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="w-4 h-4" />
            <p className="font-sans text-sm">
              Add up to 4 starter questions. Empty questions will be hidden.
            </p>
          </div>
        </div>
      </div>

      {/* Message Settings */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="Message Settings" 
          description="Customize message input and display options"
        />
        
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-sans text-base text-foreground">Message Placeholder</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">Placeholder text shown in the message input field</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              value={config.messagePlaceholder || ''}
              onChange={(e) => updateConfig({ messagePlaceholder: e.target.value })}
              placeholder="Message..."
              className="bg-muted/50 border-border/50 text-foreground"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-sans text-base text-foreground">Footer Text</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">Optional text displayed at the bottom of the chat widget</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              value={config.footerText || ''}
              onChange={(e) => updateConfig({ footerText: e.target.value })}
              placeholder="Powered by VerlyAI"
              className="bg-muted/50 border-border/50 text-foreground"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <label className="font-sans text-base text-foreground">Keep Showing Suggested Messages</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">
                    Continue showing suggested messages even after the user sends a message
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              checked={config.keepShowingSuggested || false}
              onChange={(e) => updateConfig({ keepShowingSuggested: e.target.checked })}
              className="w-5 h-5 rounded border-border bg-muted/50 accent-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
