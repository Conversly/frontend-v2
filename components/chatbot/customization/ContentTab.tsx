"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  HelpCircle,
  Plus,
  X,
  PhoneCall,
  Bell,
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
  const attention = config.attention ?? {
    messagePopupEnabled: false,
    popupSoundEnabled: false,
    soundUrl: '',
  };
  const updateAttention = (
    updates: Partial<UIConfigInput['attention']>
  ) => {
    updateConfig({ attention: { ...attention, ...updates } });
  };

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
      <div className="customization-card">
        <SectionHeader
          title="First Chat Message"
          description="The message shown when someone opens the chat"
          icon={MessageSquare}
        />

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Tooltip>
                <TooltipContent>
                  <p className="type-body">
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
            />
          </div>
        </div>
      </div>

      {/* Starter Questions */}
      <div className="customization-card">
        <SectionHeader
          title="Buttons to Start"
          description="Short prompts users can tap to begin"
          icon={HelpCircle}
        />

        <div className="space-y-3">
          {(config.starterQuestions || []).map((question, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={question || ''}
                onChange={(e) => {
                  const newQuestions = [...(config.starterQuestions || [])];
                  newQuestions[index] = e.target.value;
                  updateConfig({ starterQuestions: newQuestions });
                }}
                className="flex-1"
                placeholder={`Question ${index + 1}`}
              />
              {(config.starterQuestions || []).length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-[var(--status-danger-fg)] hover:bg-[var(--status-danger-bg)] hover:text-[var(--status-danger-fg)]"
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
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          )}
        </div>
      </div>

      {/* Message Settings */}
      <div className="customization-card">
        <SectionHeader
          title="Chat Box Options"
          description="Control what users see when they message you"
        />

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="type-label">Message Placeholder</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="type-body">Placeholder text shown in the message input field</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              value={config.messagePlaceholder || ''}
              onChange={(e) => updateConfig({ messagePlaceholder: e.target.value })}
              placeholder="Message..."
            />
          </div>

          {/* Footer text stays disabled until its payment guard is added back. */}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <label className="type-label">Keep Showing Suggested Messages</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="type-body">
                    Continue showing suggested messages even after the user sends a message
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              checked={config.keepShowingSuggested || false}
              onChange={(e) => updateConfig({ keepShowingSuggested: e.target.checked })}
              className="customization-checkbox"
            />
          </div>
        </div>
      </div>

      {/* Calls + Attention */}
      <div className="customization-card">
        <SectionHeader
          title="Pop-ups and Alert Sound"
          description="Optional pop-up and sound (and voice calling if enabled)"
          icon={PhoneCall}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <label className="type-label">Allow Voice Calls</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="type-body">
                    Toggles call/voice entrypoints in the widget UI.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              checked={config.callEnabled || false}
              onChange={(e) => updateConfig({ callEnabled: e.target.checked })}
              className="customization-checkbox"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <label className="type-label">Message Popup</label>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="type-body">
                    Shows a small message popup when the widget is collapsed.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              checked={attention.messagePopupEnabled || false}
              onChange={(e) => updateAttention({ messagePopupEnabled: e.target.checked })}
              className="customization-checkbox"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <label className="type-label">Play Alert Sound</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="type-body">
                    Plays an optional sound when the popup shows (requires Message Popup).
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              checked={attention.popupSoundEnabled || false}
              onChange={(e) => updateAttention({ popupSoundEnabled: e.target.checked })}
              className="customization-checkbox"
              disabled={!attention.messagePopupEnabled}
            />
          </div>

          {(attention.messagePopupEnabled || attention.popupSoundEnabled) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="type-label">Custom Alert Sound Link</label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="type-body">
                      Absolute URL to an audio file. Leave empty to use default / no sound.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                value={attention.soundUrl || ''}
                onChange={(e) => updateAttention({ soundUrl: e.target.value })}
                placeholder="https://cdn.example.com/ping.mp3"
                disabled={!attention.popupSoundEnabled}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
