'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, RefreshCw, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useGeneratePrompt, useGenerateChannelPrompt } from '@/services/prompt';
import type { ChannelType } from '@/types/prompt';
import { toast } from 'sonner';

type AIMode = 'generate' | 'modify';

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'empathetic', label: 'Empathetic' },
];

const MODIFY_SUGGESTIONS = [
  'Make it more friendly and conversational',
  'Add information about business hours',
  'Make responses shorter and more concise',
  'Add multilingual support instructions',
  'Include escalation to human agent rules',
  'Make it more sales-focused',
];

interface PromptAIHelperProps {
  chatbotId?: string; // Optional - if not provided, only "Generate New" mode works
  channel: ChannelType;
  onPromptGenerated: (prompt: string) => void;
  disabled?: boolean;
  className?: string;
  compact?: boolean; // For smaller spaces like voice config
}

export function PromptAIHelper({
  chatbotId,
  channel,
  onPromptGenerated,
  disabled = false,
  className,
  compact = false,
}: PromptAIHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Default to 'generate' if no chatbotId (can't modify without existing prompt)
  const [mode, setMode] = useState<AIMode>(chatbotId ? 'modify' : 'generate');
  const canModify = !!chatbotId; // Can only modify if we have a chatbot with existing prompt

  // Generate from scratch state
  const [businessDescription, setBusinessDescription] = useState('');
  const [tone, setTone] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState('');

  // Modify existing state
  const [modifyDescription, setModifyDescription] = useState('');

  const { mutate: generateFromScratch, isPending: isGenerating } = useGeneratePrompt();
  const { mutate: modifyExisting, isPending: isModifying } = useGenerateChannelPrompt();

  const isLoading = isGenerating || isModifying;

  const handleGenerateFromScratch = () => {
    if (!businessDescription.trim()) {
      toast.error('Please describe your business');
      return;
    }

    generateFromScratch(
      {
        chatbotId,
        channel,
        businessDescription: businessDescription.trim(),
        tone: tone || undefined,
        targetAudience: targetAudience.trim() || undefined,
      },
      {
        onSuccess: (data: any) => {
          const prompt = data?.systemPrompt || (typeof data === 'string' ? data : '');

          if (prompt) {
            onPromptGenerated(prompt);
            toast.success('New prompt generated!');
            setIsOpen(false);
            // Reset form
            setBusinessDescription('');
            setTone('');
            setTargetAudience('');
          } else {
            toast.error('Generated prompt format was invalid');
          }
        },
        onError: (error: any) => {
          toast.error(error?.message || 'Failed to generate prompt');
        },
      }
    );
  };

  const handleModifyExisting = () => {
    if (!canModify || !chatbotId) {
      toast.error('Cannot modify - no existing prompt');
      return;
    }
    if (!modifyDescription.trim()) {
      toast.error('Please describe what you want to change');
      return;
    }

    modifyExisting(
      {
        chatbotId,
        channel,
        userDescription: modifyDescription.trim(),
      },
      {
        onSuccess: (data) => {
          onPromptGenerated(data.systemPrompt);
          toast.success('Prompt modified!');
          setIsOpen(false);
          setModifyDescription('');
        },
        onError: (error: any) => {
          toast.error(error?.message || 'Failed to modify prompt');
        },
      }
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    setModifyDescription(suggestion);
  };

  if (compact) {
    return (
      <div className={cn('space-y-3', className)}>
        {/* Compact mode: inline buttons and input */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={mode === 'modify' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMode('modify')}
            disabled={!canModify}
            className="text-xs"
            title={!canModify ? 'Save chatbot first to modify existing prompt' : undefined}
          >
            <Wand2 className="h-3 w-3 mr-1" />
            Modify
          </Button>
          <Button
            type="button"
            variant={mode === 'generate' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMode('generate')}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            New
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'modify' ? (
            <motion.div
              key="modify"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Make it more friendly..."
                  value={modifyDescription}
                  onChange={(e) => setModifyDescription(e.target.value)}
                  disabled={disabled || isLoading}
                  onKeyDown={(e) => e.key === 'Enter' && handleModifyExisting()}
                  className="flex-1 text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleModifyExisting}
                  disabled={disabled || isLoading || !modifyDescription.trim()}
                >
                  {isModifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="generate"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <Input
                placeholder="Describe your business..."
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                disabled={disabled || isLoading}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Select value={tone} onValueChange={setTone} disabled={disabled || isLoading}>
                  <SelectTrigger className="flex-1 text-sm h-9">
                    <SelectValue placeholder="Tone (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={handleGenerateFromScratch}
                  disabled={disabled || isLoading || !businessDescription.trim()}
                >
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-full justify-between bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-violet-500/20 hover:border-violet-500/40',
            isOpen && 'border-violet-500/40'
          )}
          disabled={disabled}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <span className="font-medium">AI Prompt Assistant</span>
          </span>
          <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 space-y-4"
        >
          {/* Mode Tabs */}
          <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
            <button
              type="button"
              onClick={() => canModify && setMode('modify')}
              disabled={!canModify}
              title={!canModify ? 'Save chatbot first to modify existing prompt' : undefined}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
                mode === 'modify'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
                !canModify && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Wand2 className="h-4 w-4" />
              Modify Current
            </button>
            <button
              type="button"
              onClick={() => setMode('generate')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
                mode === 'generate'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <RefreshCw className="h-4 w-4" />
              Generate New
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'modify' ? (
              <motion.div
                key="modify"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label className="text-sm">What would you like to change?</Label>
                  <Input
                    placeholder="e.g., Make it more friendly and add info about returns policy"
                    value={modifyDescription}
                    onChange={(e) => setModifyDescription(e.target.value)}
                    disabled={disabled || isLoading}
                    onKeyDown={(e) => e.key === 'Enter' && handleModifyExisting()}
                  />
                </div>

                {/* Quick suggestions */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MODIFY_SUGGESTIONS.slice(0, 4).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={disabled || isLoading}
                        className="px-2.5 py-1 text-xs rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleModifyExisting}
                  disabled={disabled || isLoading || !modifyDescription.trim()}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
                >
                  {isModifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Modifying...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Apply Changes
                    </>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="generate"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label className="text-sm">
                    Describe your business <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g., We're an e-commerce store selling organic skincare products"
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    disabled={disabled || isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Tone</Label>
                    <Select value={tone} onValueChange={setTone} disabled={disabled || isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {TONE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Target Audience</Label>
                    <Input
                      placeholder="e.g., Young professionals"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      disabled={disabled || isLoading}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleGenerateFromScratch}
                  disabled={disabled || isLoading || !businessDescription.trim()}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate New Prompt
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  This will replace your current prompt with a brand new one
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
}

