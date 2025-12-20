'use client';

import { useState } from 'react';
import { IntegrationSetupGuide, CredentialField } from '@/types/integration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ChevronDown,
  Info,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IntegrationSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  setupGuide: IntegrationSetupGuide;
  onConnect: (credentials: Record<string, string>) => Promise<void>;
  webhookUrl?: string;
}

export function IntegrationSetupModal({
  isOpen,
  onClose,
  setupGuide,
  onConnect,
  webhookUrl,
}: IntegrationSetupModalProps) {
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1, 2, 3, 4, 5]);

  const toggleStep = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(prev => prev.filter(id => id !== stepId));
    } else {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  const toggleStepExpansion = (stepId: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setCredentials(prev => ({ ...prev, [fieldId]: value }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const validateForm = (): boolean => {
    const requiredFields = setupGuide.credentialFields.filter(field => field.required);
    return requiredFields.every(field => credentials[field.id]?.trim());
  };

  const handleConnect = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsConnecting(true);
    try {
      await onConnect(credentials);
      toast.success(`${setupGuide.platform} connected successfully!`);
      onClose();
    } catch (error) {
      toast.error('Failed to connect. Please try again.');
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const getStepColor = (stepId: number) => {
    const colors = [
      'text-blue-500 bg-blue-500/10',
      'text-green-500 bg-green-500/10',
      'text-primary bg-primary/10',
      'text-purple-500 bg-purple-500/10',
      'text-pink-500 bg-pink-500/10',
    ];
    return colors[(stepId - 1) % colors.length];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1600px] h-[90vh] p-0 gap-0 overflow-hidden" showCloseButton={true}>
        <div className="grid grid-cols-2 h-full overflow-hidden">
          {/* Left Panel - Setup Instructions */}
          <div className="border-r bg-muted/30 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b shrink-0">
              <h2 className="text-xl font-semibold">
                Setup {setupGuide.platform.charAt(0).toUpperCase() + setupGuide.platform.slice(1)}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Follow these steps to set up your integration
              </p>
            </div>

            <div className="flex-1 overflow-y-auto integration-scroll">
              <div className="p-6 space-y-4">
                {/* Progress Bar */}
                <div className={cn(
                  "rounded-xl p-4 transition-all duration-500",
                  completedSteps.length === setupGuide.steps.length
                    ? "bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50"
                    : "bg-card border"
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">
                      {completedSteps.length === setupGuide.steps.length ? (
                        <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          🎉 All steps completed!
                        </span>
                      ) : (
                        `Progress: ${completedSteps.length} of ${setupGuide.steps.length} steps`
                      )}
                    </span>
                    <span className={cn(
                      "text-sm font-semibold transition-colors",
                      completedSteps.length === setupGuide.steps.length
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    )}>
                      {Math.round((completedSteps.length / setupGuide.steps.length) * 100)}%
                    </span>
                  </div>

                  <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 transition-all duration-700",
                        completedSteps.length === setupGuide.steps.length
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : "bg-gradient-to-r from-blue-400 to-purple-500"
                      )}
                      style={{ width: `${(completedSteps.length / setupGuide.steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Setup Steps */}
                {setupGuide.steps.map((step) => (
                  <Collapsible
                    key={step.id}
                    open={expandedSteps.includes(step.id)}
                    onOpenChange={() => toggleStepExpansion(step.id)}
                  >
                    <div className={cn(
                      "rounded-xl transition-all duration-300 border",
                      completedSteps.includes(step.id)
                        ? "bg-green-500/5 border-green-500/30"
                        : "bg-card"
                    )}>
                      <div className="flex gap-4 p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStep(step.id);
                          }}
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                            completedSteps.includes(step.id)
                              ? "bg-green-500 text-white shadow-md"
                              : cn("hover:scale-110", getStepColor(step.id))
                          )}
                        >
                          {completedSteps.includes(step.id) ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-bold">{step.id}</span>
                          )}
                        </button>

                        <div className="flex-1">
                          <CollapsibleTrigger className="w-full text-left">
                            <div className="flex items-center justify-between">
                              <h4 className={cn(
                                "font-semibold text-sm transition-colors",
                                completedSteps.includes(step.id)
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-foreground"
                              )}>
                                {step.title}
                              </h4>
                              <ChevronDown className={cn(
                                "w-4 h-4 transition-transform",
                                expandedSteps.includes(step.id) && "rotate-180"
                              )} />
                            </div>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <div className="pt-2 space-y-2">
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>

                              {step.tip && (
                                <div className="bg-muted/50 rounded-lg p-3 text-xs">
                                  <p className="font-medium mb-1 flex items-center gap-1">
                                    <Info className="w-3 h-3" />
                                    Quick tip:
                                  </p>
                                  <p className="text-muted-foreground">{step.tip}</p>
                                </div>
                              )}

                              {step.externalLink && (
                                <a
                                  href={step.externalLink.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline"
                                >
                                  {step.externalLink.label}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </CollapsibleContent>
                        </div>
                      </div>
                    </div>
                  </Collapsible>
                ))}

                {/* Expand/Collapse All */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allExpanded = expandedSteps.length === setupGuide.steps.length;
                    setExpandedSteps(allExpanded ? [] : setupGuide.steps.map(s => s.id));
                  }}
                  className="w-full"
                >
                  {expandedSteps.length === setupGuide.steps.length ? '📁 Collapse All' : '📂 Expand All'}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Credential Form */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b shrink-0">
              <h2 className="text-xl font-semibold">Enter Credentials</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Fill in the required information to connect
              </p>
            </div>

            <div className="flex-1 overflow-y-auto integration-scroll">
              <div className="p-6 space-y-4">
                {/* OAuth Notice */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Coming Soon: One-Click Setup</h3>
                      <p className="text-xs text-muted-foreground">
                        We're working on seamless OAuth integration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Credential Fields */}
                {setupGuide.credentialFields.map((field) => (
                  <CredentialFieldInput
                    key={field.id}
                    field={field}
                    value={field.type === 'readonly' && field.id === 'webhookUrl' ? webhookUrl || '' : credentials[field.id] || ''}
                    onChange={(value) => handleInputChange(field.id, value)}
                    onCopy={(value) => copyToClipboard(value, field.label)}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t space-y-3 shrink-0 bg-background">
              <Button
                onClick={handleConnect}
                disabled={isConnecting || !validateForm()}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
              >
                {isConnecting ? 'Connecting...' : `Connect ${setupGuide.platform.charAt(0).toUpperCase() + setupGuide.platform.slice(1)}`}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isConnecting}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Credential Field Input Component
interface CredentialFieldInputProps {
  field: CredentialField;
  value: string;
  onChange: (value: string) => void;
  onCopy: (value: string) => void;
}

function CredentialFieldInput({ field, value, onChange, onCopy }: CredentialFieldInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id} className="flex items-center gap-2">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
        {field.stepReference && (
          <span className="text-xs text-muted-foreground">(Step {field.stepReference})</span>
        )}
        {field.helpText && (
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{field.helpText}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </Label>

      {field.type === 'readonly' ? (
        <div className="flex gap-2">
          <Input
            id={field.id}
            value={value}
            readOnly
            className="flex-1 bg-muted/50 font-mono text-sm"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => onCopy(value)}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-background"
        />
      )}
    </div>
  );
}
