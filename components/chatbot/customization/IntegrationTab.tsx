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
  src="https://widget.verlyai.xyz/embed.js"
  data-chatbot-id="${chatbotId}"
  data-position="bottom-right"
  data-primary-color="${config.primaryColor || "#4F46E5"}"
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
  data-primary-color="${config.primaryColor || "#4F46E5"}"
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
      <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
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
                  className="h-8 w-8 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shadow-sm backdrop-blur-sm transition-all duration-200"
                  onClick={handleCopyEmbedCode}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border/50 min-h-[100px]">
                <code className="text-xs text-muted-foreground font-mono block whitespace-pre-wrap pr-8">
                  {getEmbedCode()}
                </code>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-muted/50 border border-border/50 rounded-lg">
              <HelpCircle className="w-4 h-4 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-sans text-xs text-foreground mb-1 font-medium">
                  Paste this code before the closing &lt;/body&gt; tag on your website.
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  The widget will automatically appear on pages matching your allowed domains.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="aspect-video w-full bg-black/5 rounded-lg border border-border/50 flex items-center justify-center overflow-hidden">
              <video
                controls
                className="w-full h-full object-cover"
                poster="/placeholder-video-poster.jpg"
              >
                <source src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/chatbot-creation-demo.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex items-start gap-2 p-3 bg-muted/50 border border-border/50 rounded-lg">
              <Play className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="font-sans text-xs text-muted-foreground">
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
                  className="h-8 w-8 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shadow-sm backdrop-blur-sm transition-all duration-200"
                  onClick={handleCopyCursorPrompt}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border/50 min-h-[100px]">
                <code className="text-xs text-muted-foreground font-mono block whitespace-pre-wrap pr-8">
                  {getCursorPrompt()}
                </code>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-muted/50 border border-border/50 rounded-lg">
              <Terminal className="w-4 h-4 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-sans text-xs text-foreground mb-1 font-medium">
                  Using Cursor or another AI editor?
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Copy this prompt and paste it into your AI assistant to automatically add the integration code.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Identity Verification */}
      <IdentityVerificationSection chatbotId={chatbotId} />

      {/* API Key
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
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <HelpCircle className="w-4 h-4 text-destructive mt-0.5" />
                <p className="font-sans text-xs text-destructive">
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
      */}

      {/* Domain Allowlist
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
      */}
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
    <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
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
        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mb-4"
      >
        Read more in the Identity Verification Docs.
        <ExternalLink className="w-3 h-3" />
      </a>

      <div className="space-y-4">
        {/* Enable / disable toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-foreground">Enable identity verification</p>
            <p className="text-xs text-muted-foreground mt-0.5">
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
          <Label className="text-sm font-medium text-foreground mb-2 block">Secret key</Label>

          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : secret ? (
            <div className="space-y-3">
              {/* Secret display + copy + rotate */}
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg border border-border/50">
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
                      className="border-border text-foreground hover:bg-muted/50 gap-1.5"
                      disabled={generateSecret.isPending}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${generateSecret.isPending ? 'animate-spin' : ''}`} />
                      Rotate
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
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
              <div className="flex items-start gap-2 p-3 bg-amber-500/10 border-l-2 border-amber-500 rounded-r-lg">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="font-sans text-xs text-amber-700 dark:text-amber-400">
                  Keep your secret key safe! Never commit it directly to your repository, client-side code, or anywhere a third party can find it.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center py-4 text-muted-foreground">
                <Shield className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="font-sans text-sm">No secret key generated</p>
                <p className="font-sans text-xs mt-1">Generate a key to enable identity verification</p>
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
                className="h-8 gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shadow-sm backdrop-blur-sm transition-all duration-200"
                onClick={handleCopyIdentityCode}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border/50 max-h-[400px] overflow-y-auto">
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
