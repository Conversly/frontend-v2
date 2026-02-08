"use client";

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Code,
  Globe,
  Key,
  Copy,
  Trash2,
  Loader2,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SectionHeader } from './SectionHeader';
import { toast } from 'sonner';
import { useState } from 'react';
import type { UIConfigInput } from '@/types/customization';
import { DomainInfo } from '@/lib/api/deploy';

interface IntegrationTabProps {
  config: UIConfigInput;
  chatbotId: string;
  systemPrompt: string;
  domains: DomainInfo[];
  isLoadingDomains: boolean;
  isSavingDomain: boolean;
  onAddDomain: (domain: string) => Promise<void>;
  apiKey: string | null;
  isLoadingApiKey: boolean;
  isCreatingApiKey: boolean;
  onGenerateApiKey: () => Promise<void>;
}

export function IntegrationTab({
  config,
  chatbotId,
  domains,
  isLoadingDomains,
  isSavingDomain,
  onAddDomain,
  apiKey,
  isLoadingApiKey,
  isCreatingApiKey,
  onGenerateApiKey,
}: IntegrationTabProps) {
  const [newDomain, setNewDomain] = useState('');

  const handleAddDomain = async () => {
    if (!newDomain.trim()) {
      toast.error('Please enter a domain');
      return;
    }
    // Basic domain validation
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    if (!domainRegex.test(newDomain.trim())) {
      toast.error('Please enter a valid domain (e.g., example.com)');
      return;
    }
    await onAddDomain(newDomain.trim());
    setNewDomain('');
  };

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast.success('API key copied to clipboard');
    }
  };

  const getEmbedCode = () => `<script
  src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/embed.js"
  data-chatbot-id="${chatbotId}"
  data-primary-color="${config.primaryColor || "#4F46E5"}"
  async
></script>`;

  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
    toast.success('Embed code copied to clipboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Embed Code */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-4">
        <SectionHeader
          title="Embed Code"
          description="Add this code to your website to display the chat widget"
          icon={Code}
        />

        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
            <code className="text-xs text-muted-foreground font-mono block whitespace-pre-wrap">
              {getEmbedCode()}
            </code>
          </div>

          <Button
            variant="outline"
            onClick={handleCopyEmbedCode}
            className="w-full border-border text-foreground hover:bg-muted/50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Embed Code
          </Button>

          <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-sans text-xs text-blue-900 mb-1 font-medium">
                Paste this code before the closing &lt;/body&gt; tag on your website.
              </p>
              <p className="font-sans text-xs text-blue-700">
                The widget will automatically appear on pages matching your allowed domains.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* API Key */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-4">
        <SectionHeader
          title="API Key"
          description="Use this key to authenticate API requests"
          icon={Key}
        />

        <div className="space-y-4">
          {isLoadingApiKey ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : apiKey ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={apiKey}
                  readOnly
                  className="flex-1 bg-muted/50 border-border/50 text-foreground font-mono text-sm"
                />
                <Button
                  variant="outline"
                  onClick={handleCopyApiKey}
                  className="border-border text-foreground hover:bg-muted/50"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-start gap-2 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                <HelpCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <p className="font-sans text-xs text-yellow-200">
                  Keep this key secret. Do not share it publicly or commit it to version control.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center py-6 text-muted-foreground">
                <Key className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-sans text-sm">No API key generated</p>
                <p className="font-sans text-xs mt-1">Generate a key to start using the API</p>
              </div>
              <Button
                onClick={onGenerateApiKey}
                disabled={isCreatingApiKey}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isCreatingApiKey ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate API Key'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Domain Allowlist */}
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-4">
        <SectionHeader
          title="Domain Allowlist"
          description="Restrict widget access to specific domains"
          icon={Globe}
        />

        <div className="space-y-4">
          {isLoadingDomains ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : domains.length > 0 ? (
            <div className="space-y-2">
              {domains.map((domain) => (
                <div
                  key={domain.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="font-sans text-sm text-foreground">{domain.domain}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-sans text-sm">No domains added yet</p>
              <p className="font-sans text-xs mt-1">Add domains to restrict widget access</p>
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isSavingDomain && handleAddDomain()}
              className="flex-1 bg-muted/50 border-border/50 text-foreground"
              placeholder="example.com"
              disabled={isSavingDomain}
            />
            <Button
              onClick={handleAddDomain}
              disabled={isSavingDomain || !newDomain.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSavingDomain ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Add'
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="w-4 h-4" />
            <p className="font-sans text-xs">
              Enter domains without protocol (e.g., example.com, not https://example.com)
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
