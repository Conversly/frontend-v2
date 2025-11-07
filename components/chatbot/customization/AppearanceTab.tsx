"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bot,
  MessageCircle,
  HelpCircle,
  MessageSquare,
  BrainCircuit,
  Upload,
  Frame,
  Palette,
  Layout,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';
import { SectionHeader } from './SectionHeader';
import type { UIConfigInput } from '@/types/customization';

interface AppearanceTabProps {
  config: UIConfigInput;
  updateConfig: (updates: Partial<UIConfigInput>) => void;
  icons: Array<{ id: string; component: React.ReactNode }>;
  onIconUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function AppearanceTab({ config, updateConfig, icons, onIconUpload }: AppearanceTabProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Theme Settings */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="Theme Settings" 
          description="Customize the visual appearance of your widget"
          icon={Palette}
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Color Picker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-sans text-base text-foreground">Theme Color</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">
                    This color will be used for the widget's header, buttons, and accents
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex gap-4">
              <Input
                type="color"
                value={config.primaryColor}
                onChange={(e) => updateConfig({ primaryColor: e.target.value, widgetBubbleColour: e.target.value })}
                className="w-16 h-10 p-1 rounded-lg cursor-pointer bg-muted/50 border-border/50"
              />
              <Input
                value={config.primaryColor}
                onChange={(e) => updateConfig({ primaryColor: e.target.value, widgetBubbleColour: e.target.value })}
                placeholder="#000000"
                className="flex-1 bg-muted/50 border-border/50 text-foreground"
              />
            </div>
          </div>
          {/* Header Text */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-sans text-base text-foreground">Widget Header</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">
                    The title shown at the top of your chat widget
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              value={config.DisplayName}
              onChange={(e) => updateConfig({ DisplayName: e.target.value })}
              placeholder="Support Bot"
              className="bg-muted/50 border-border/50 text-foreground"
            />
          </div>
        </div>
      </div>
      {/* Icon Settings */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="Icon Settings" 
          description="Choose or upload a custom icon for your chat widget"
          icon={Layout}
        />
        
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            {icons.map((icon) => (
              <Button
                key={icon.id}
                variant={config.widgeticon === icon.id && !config.PrimaryIcon ? 'default' : 'outline'}
                onClick={() => updateConfig({ widgeticon: icon.id, PrimaryIcon: '' })}
                className="p-3 bg-muted/50 border-border/50 hover:bg-muted"
              >
                {icon.component}
              </Button>
            ))}
            <div className="flex items-center gap-2">
              <label 
                htmlFor="customIconUpload" 
                className="cursor-pointer p-3 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
              </label>
              <input
                id="customIconUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onIconUpload}
              />
              {config.PrimaryIcon && (
                <img src={config.PrimaryIcon} alt="Custom Icon" className="w-10 h-10 rounded-lg object-contain" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="w-4 h-4" />
            <p className="font-sans text-sm">
              Select a preset icon or upload your own. Custom icons will override presets.
            </p>
          </div>
        </div>
      </div>
      {/* Size & Position */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="Size & Position" 
          description="Configure the dimensions and placement of your widget"
          icon={Frame}
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="font-sans text-base text-foreground mb-2 block">Widget Width</label>
              <Input
                value={config.chatWidth}
                onChange={(e) => updateConfig({ chatWidth: e.target.value })}
                placeholder="e.g., 350px"
                className="bg-muted/50 border-border/50 text-foreground"
              />
            </div>
            <div>
              <label className="font-sans text-base text-foreground mb-2 block">Widget Height</label>
              <Input
                value={config.chatHeight}
                onChange={(e) => updateConfig({ chatHeight: e.target.value })}
                placeholder="e.g., 500px"
                className="bg-muted/50 border-border/50 text-foreground"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="font-sans text-base text-foreground mb-2 block">Display Style</label>
            <div className="flex items-center gap-4">
              <Button
                variant={config.displayStyle === 'corner' ? 'default' : 'outline'}
                onClick={() => updateConfig({ displayStyle: 'corner' })}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
              >
                Corner
              </Button>
              <Button
                variant={config.displayStyle === 'overlay' ? 'default' : 'outline'}
                onClick={() => updateConfig({ displayStyle: 'overlay' })}
                className="border-border text-foreground hover:bg-muted/50"
              >
                Overlay
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Button Settings */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
        <SectionHeader 
          title="Button Settings" 
          description="Customize the chat button appearance"
          icon={MessageSquare}
        />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="font-sans text-base text-foreground">Button Alignment</label>
            <div className="flex items-center gap-4">
              <Button
                variant={config.buttonAlignment === 'left' ? 'default' : 'outline'}
                onClick={() => updateConfig({ buttonAlignment: 'left' })}
                className={config.buttonAlignment === 'left' 
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                  : "border-border text-foreground hover:bg-muted/50"
                }
              >
                Left
              </Button>
              <Button
                variant={config.buttonAlignment === 'right' ? 'default' : 'outline'}
                onClick={() => updateConfig({ buttonAlignment: 'right' })}
                className={config.buttonAlignment === 'right' 
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                  : "border-border text-foreground hover:bg-muted/50"
                }
              >
                Right
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="font-sans text-base text-foreground">Show Button Text</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-sans text-sm">Display text next to the chat button</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="checkbox"
              checked={config.showButtonText}
              onChange={(e) => updateConfig({ showButtonText: e.target.checked })}
              className="w-5 h-5 rounded border-border bg-muted/50 accent-primary"
            />
          </div>
          {config.showButtonText && (
            <div className="space-y-2">
              <label className="font-sans text-base text-foreground">Button Text</label>
              <Input
                value={config.widgetButtonText}
                onChange={(e) => updateConfig({ widgetButtonText: e.target.value })}
                placeholder="Chat with us"
                className="bg-muted/50 border-border/50 text-foreground"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
