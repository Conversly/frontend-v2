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
  Play,
  Terminal,
  Shield,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from './SectionHeader';
import { toast } from 'sonner';
import { useState } from 'react';
import type { UIConfigInput } from '@/types/customization';
import { DomainInfo } from '@/lib/api/deploy';
import { Switch } from '@/components/ui/switch';
import {
  useIdentityVerificationConfig,
  useGenerateIdentitySecret,
  useToggleIdentityVerification,
} from '@/hooks/useIdentityVerification';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getChatbotBrandColor } from '@/lib/chatbot-brand-color';

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
  const embedPrimaryColor = getChatbotBrandColor(config.primaryColor);

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
  src="https://widget.verlyai.xyz/embed.js"
  data-chatbot-id="${chatbotId}"
  data-position="bottom-right"
  data-primary-color="${embedPrimaryColor}"
></script>`;

  const getCursorPrompt = () => `Add the following chatbot embed script globally to this project.

Find the main layout file:
- Next.js (App Router) → app/layout.tsx (inside <body>)
- Next.js (Pages Router) → pages/_document.tsx (inside <body>)
- React/Vite → index.html (before </body>)

Insert the script immediately BEFORE the closing </body> tag.

Do NOT duplicate it if it already exists.
Do NOT modify any other code.
Ensure it loads on all pages.

Script:

<script
  src="https://widget.verlyai.xyz/embed.js"
  data-chatbot-id="${chatbotId}"
  data-position="bottom-right"
  data-primary-color="${embedPrimaryColor}"
></script>`;

  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
    toast.success('Embed code copied to clipboard');
  };

  const handleCopyCursorPrompt = () => {
    navigator.clipboard.writeText(getCursorPrompt());
    toast.success('Cursor prompt copied to clipboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="customization-card">
        <SectionHeader
          title="Integration Method"
          description="Choose how you want to add the chatbot to your website"
          icon={Code}
        />

        <Tabs defaultValue="manual" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="manual">Manual Integration</TabsTrigger>
            <TabsTrigger value="video">Video Tutorial</TabsTrigger>
            <TabsTrigger value="cursor">Cursor / AI Prompt</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <div className="relative group">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="customization-icon-button h-8 w-8"
                  onClick={handleCopyEmbedCode}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="customization-code-block min-h-[100px]">
                <code className="text-xs text-muted-foreground font-mono block whitespace-pre-wrap pr-8">
                  {getEmbedCode()}
                </code>
              </div>
            </div>

            <div className="customization-callout">
              <HelpCircle className="customization-callout__icon w-4 h-4 text-primary" />
              <div className="flex-1">
                <p className="type-body-strong customization-callout__title">
                  Paste this code before the closing &lt;/body&gt; tag on your website.
                </p>
                <p className="type-body-muted">
                  The widget will automatically appear on pages matching your allowed domains.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="customization-media-shell aspect-video w-full flex items-center justify-center">
              <video
                controls
                className="w-full h-full object-cover"
                poster="/placeholder-video-poster.jpg"
              >
                <source src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/chatbot-creation-demo.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="customization-callout">
              <Play className="customization-callout__icon w-4 h-4 text-muted-foreground" />
              <p className="type-body-muted">
                Watch this quick tutorial to learn how to integrate the chatbot into your website.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="cursor" className="space-y-4">
            <div className="relative group">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="customization-icon-button h-8 w-8"
                  onClick={handleCopyCursorPrompt}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="customization-code-block min-h-[100px]">
                <code className="text-xs text-muted-foreground font-mono block whitespace-pre-wrap pr-8">
                  {getCursorPrompt()}
                </code>
              </div>
            </div>

            <div className="customization-callout">
              <Terminal className="customization-callout__icon w-4 h-4 text-primary" />
              <div className="flex-1">
                <p className="type-body-strong customization-callout__title">
                  Using Cursor or another AI editor?
                </p>
                <p className="type-body-muted">
                  Copy this prompt and paste it into your AI assistant to automatically add the integration code.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Identity Verification */}
      <IdentityVerificationSection chatbotId={chatbotId} />

      {/* API key and domain allowlist sections remain intentionally hidden here until the next product pass. */}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Identity Verification Section (shown below embed code, like Chatbase)
// ─────────────────────────────────────────────────────────────────────────────

function IdentityVerificationSection({ chatbotId }: { chatbotId: string }) {
  const { data: config, isLoading } = useIdentityVerificationConfig(chatbotId);
  const generateSecret = useGenerateIdentitySecret(chatbotId);
  const toggleIdentityVerification = useToggleIdentityVerification(chatbotId);

  const [secretVisible, setSecretVisible] = useState(false);

  const secret = config?.secret ?? null;
  const enabled = config?.enabled ?? false;
  const maskedSecret = secret
    ? `${'*'.repeat(Math.max(0, secret.length - 4))}${secret.slice(-4)}`
    : null;

  const handleToggle = async (checked: boolean) => {
    try {
      await toggleIdentityVerification.mutateAsync(checked);
      toast.success(checked ? 'Identity verification enabled' : 'Identity verification disabled');
    } catch {
      toast.error('Failed to update identity verification');
    }
  };

  const handleCopySecret = () => {
    if (secret) {
      navigator.clipboard.writeText(secret);
      toast.success('Secret key copied to clipboard');
    }
  };

  const handleRotateSecret = async () => {
    try {
      await generateSecret.mutateAsync();
      toast.success('Secret key rotated. All existing tokens are now invalid.');
    } catch {
      toast.error('Failed to rotate secret key');
    }
  };

  const handleGenerateSecret = async () => {
    try {
      await generateSecret.mutateAsync();
      toast.success('Secret key generated');
    } catch {
      toast.error('Failed to generate secret key');
    }
  };

  const getIdentityCode = () => `// --- SERVER CODE ---
const jwt = require('jsonwebtoken');

const secret = process.env.VERLY_IDENTITY_SECRET; // Your chatbot's identity secret

const user = await getSignedInUser(); // Get the current user signed in on your platform

const token = jwt.sign(
    {
        user_id: user.id, // Your user's id
        email: user.email, // User's email
        name: user.name, // User's name
        // ... other custom attributes
    },
    secret,
    { expiresIn: '1h' }
);

// --- CLIENT CODE ---
const token = await getUserToken(); // Get the token from your server
window.verly('identify', { token }); // Identify the user with Verly AI`;

  const handleCopyIdentityCode = () => {
    navigator.clipboard.writeText(getIdentityCode());
    toast.success('Identity verification code copied to clipboard');
  };

  return (
    <div className="customization-card">
      <SectionHeader
        title="Identity verification"
        description="Secure your AI Agent by generating a JWT for each logged-in user and sending it to Verly AI. This enables secure identity verification for your AI Agent with various actions."
        icon={Shield}
      />

      {/* Read more link */}
      <a
        href="/docs/identity-verification"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 inline-flex items-center gap-1 text-primary hover:underline"
      >
        Read more in the Identity Verification Docs.
        <ExternalLink className="w-3 h-3" />
      </a>

      <div className="space-y-4">
        {/* Enable / disable toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="type-body-strong">Enable identity verification</p>
            <p className="type-body-muted mt-0.5">
              Takes effect on the live widget after you deploy.
              {!secret && ' Generate a secret key first.'}
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={handleToggle}
            disabled={!secret || toggleIdentityVerification.isPending || isLoading}
            aria-label="Enable identity verification"
          />
        </div>

        {/* Secret key section */}
        <div>
          <Label className="type-label mb-2 block">Secret key</Label>

          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : secret ? (
            <div className="space-y-3">
              {/* Secret display + copy + rotate */}
              <div className="flex gap-2">
                <div className="customization-secret-shell flex-1">
                  <code className="text-sm font-mono text-foreground flex-1 select-all">
                    {secretVisible ? secret : maskedSecret}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => setSecretVisible(!secretVisible)}
                    aria-label={secretVisible ? "Hide secret" : "Show secret"}
                  >
                    {secretVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={handleCopySecret}
                    aria-label="Copy secret key"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-1.5"
                      disabled={generateSecret.isPending}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${generateSecret.isPending ? 'animate-spin' : ''}`} />
                      Rotate
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-[var(--status-warning-fg)]" />
                        Rotate secret key?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will generate a new secret key. All existing JWT tokens signed with the current secret will immediately become invalid. Your users will need to re-authenticate.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRotateSecret}>
                        Rotate secret
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Warning callout */}
              <div className="customization-callout customization-callout--warning">
                <AlertTriangle className="customization-callout__icon w-4 h-4" />
                <p className="type-body-muted text-[inherit]">
                  Keep your secret key safe! Never commit it directly to your repository, client-side code, or anywhere a third party can find it.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center py-4 text-muted-foreground">
                <Shield className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="type-body">No secret key generated</p>
                <p className="type-body-muted mt-1">Generate a key to enable identity verification</p>
              </div>
              <Button
                onClick={handleGenerateSecret}
                disabled={generateSecret.isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {generateSecret.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Secret Key'
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Code snippet */}
        {secret && (
          <div className="relative group">
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="ghost"
                size="sm"
                className="customization-icon-button h-8 gap-1.5"
                onClick={handleCopyIdentityCode}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>
            <div className="customization-code-block max-h-[400px] overflow-y-auto">
              <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap pr-20">
                {getIdentityCode()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
