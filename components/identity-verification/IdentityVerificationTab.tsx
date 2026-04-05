"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  Shield,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  Key,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  FlaskConical,
} from "lucide-react";
import {
  useIdentityVerificationConfig,
  useToggleIdentityVerification,
  useGenerateIdentitySecret,
  useRevokeIdentitySecret,
  useTestIdentityToken,
} from "@/hooks/useIdentityVerification";

// ─────────────────────────────────────────────────────────────────────────────
// Code Snippets
// ─────────────────────────────────────────────────────────────────────────────

const CODE_SNIPPETS = {
  node: `const jwt = require("jsonwebtoken");

// Sign the token on your server — never expose the secret to the client
const token = jwt.sign(
  {
    sub: user.id,          // required: unique user identifier
    name: user.name,       // optional: display name
    email: user.email,     // optional: user email
  },
  process.env.CONVERSLY_IDENTITY_SECRET,
  { expiresIn: "1h" }
);

// Return the token to your frontend
res.json({ identityToken: token });`,

  python: `import jwt, os, time

# Sign the token on your server — never expose the secret to the client
token = jwt.encode(
    {
        "sub": user.id,          # required: unique user identifier
        "name": user.name,       # optional: display name
        "email": user.email,     # optional: user email
        "exp": int(time.time()) + 3600,
    },
    os.environ["CONVERSLY_IDENTITY_SECRET"],
    algorithm="HS256",
)

# Return the token to your frontend
return {"identityToken": token}`,

  php: `use Firebase\\JWT\\JWT;

// Sign the token on your server — never expose the secret to the client
$payload = [
    "sub"  => $user->id,          // required: unique user identifier
    "name" => $user->name,        // optional: display name
    "email"=> $user->email,       // optional: user email
    "exp"  => time() + 3600,
];

$token = JWT::encode(
    $payload,
    getenv("CONVERSLY_IDENTITY_SECRET"),
    "HS256"
);

// Return the token to your frontend
echo json_encode(["identityToken" => $token]);`,

  frontend: `// After fetching the signed token from your server:
window.conversly("identify", {
  token: identityToken,     // the JWT from your server
  name: "Jane Doe",         // optional: shown in dashboard
});

// On logout — clears the identified user session:
window.conversly("resetUser");`,
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="relative group rounded-lg border border-border bg-muted/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted">
        <span className="text-2xs uppercase font-semibold tracking-wider text-muted-foreground">
          {language}
        </span>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-background/50"
          aria-label={`Copy ${language} code`}
        >
          {copied ? (
            <Check className="w-3 h-3 text-primary" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <pre className="p-3 text-xs font-mono leading-relaxed text-foreground whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Secret Display
// ─────────────────────────────────────────────────────────────────────────────

interface SecretDisplayProps {
  secret: string;
}

function SecretDisplay({ secret }: SecretDisplayProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const masked = secret.slice(0, 8) + "\u2022".repeat(32) + secret.slice(-4);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Secret copied to clipboard");
    } catch {
      toast.error("Failed to copy secret");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-md border bg-muted/50 px-3 py-2 font-mono text-xs break-all select-all">
        {revealed ? secret : masked}
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setRevealed(!revealed)}
        className="h-8 w-8 shrink-0"
        aria-label={revealed ? "Hide secret" : "Reveal secret"}
      >
        {revealed ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleCopy}
        className="h-8 w-8 shrink-0"
        aria-label="Copy secret"
      >
        {copied ? (
          <Check className="w-4 h-4 text-primary" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Token Tester
// ─────────────────────────────────────────────────────────────────────────────

interface TokenTesterProps {
  chatbotId: string;
}

function TokenTester({ chatbotId }: TokenTesterProps) {
  const [token, setToken] = useState("");
  const testMutation = useTestIdentityToken(chatbotId);

  const handleTest = () => {
    if (!token.trim()) {
      toast.error("Paste a JWT token to test");
      return;
    }

    testMutation.mutate(token.trim(), {
      onSuccess: (result) => {
        if (result.valid) {
          toast.success("Token is valid");
        } else {
          toast.error(result.error || "Token is invalid");
        }
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Failed to test token"
        );
      },
    });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="font-medium text-sm flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-primary" />
          Token Tester
        </h3>
        <p className="text-xs text-muted-foreground">
          Paste a signed JWT to verify it against your secret.
        </p>
      </div>

      <Textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIs..."
        rows={3}
        className="font-mono text-xs"
        aria-label="JWT token to test"
      />

      <Button
        size="sm"
        variant="outline"
        onClick={handleTest}
        disabled={testMutation.isPending || !token.trim()}
        className="w-full text-xs h-8"
      >
        {testMutation.isPending ? (
          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
        ) : (
          <FlaskConical className="w-3 h-3 mr-2" />
        )}
        Verify Token
      </Button>

      {testMutation.data && (
        <div
          className={`rounded-lg border p-3 text-xs ${
            testMutation.data.valid
              ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
              : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-2 font-medium">
            {testMutation.data.valid ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">
                  Valid token
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300">
                  Invalid token
                </span>
              </>
            )}
          </div>

          {testMutation.data.valid && testMutation.data.payload && (
            <div className="rounded-md border bg-background/80 p-2 overflow-x-auto custom-scrollbar">
              <pre className="font-mono text-2xs leading-relaxed whitespace-pre">
                {JSON.stringify(testMutation.data.payload, null, 2)}
              </pre>
            </div>
          )}

          {!testMutation.data.valid && testMutation.data.error && (
            <p className="text-red-600 dark:text-red-400">
              {testMutation.data.error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function IdentityVerificationTab() {
  const params = useParams();
  const chatbotId = params.botId as string;

  const { data: config, isLoading, isError } = useIdentityVerificationConfig(chatbotId);
  const toggleMutation = useToggleIdentityVerification(chatbotId);
  const generateMutation = useGenerateIdentitySecret(chatbotId);
  const revokeMutation = useRevokeIdentitySecret(chatbotId);

  // ── Loading state ──────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────

  if (isError || !config) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950 p-4 text-sm text-red-700 dark:text-red-300" role="alert">
        <p className="font-medium">Failed to load identity verification settings.</p>
        <p className="text-xs mt-1 text-red-600 dark:text-red-400">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleToggle = (enabled: boolean) => {
    // If enabling without a secret, generate one first
    if (enabled && !config.hasSecret) {
      generateMutation.mutate(undefined, {
        onSuccess: () => {
          toggleMutation.mutate(true, {
            onSuccess: () => toast.success("Identity verification enabled"),
            onError: (err) =>
              toast.error(err instanceof Error ? err.message : "Failed to enable"),
          });
        },
        onError: (err) =>
          toast.error(
            err instanceof Error ? err.message : "Failed to generate secret"
          ),
      });
      return;
    }

    toggleMutation.mutate(enabled, {
      onSuccess: () =>
        toast.success(
          enabled
            ? "Identity verification enabled"
            : "Identity verification disabled"
        ),
      onError: (err) =>
        toast.error(err instanceof Error ? err.message : "Failed to update"),
    });
  };

  const handleGenerate = () => {
    generateMutation.mutate(undefined, {
      onSuccess: () => toast.success("New secret generated"),
      onError: (err) =>
        toast.error(
          err instanceof Error ? err.message : "Failed to generate secret"
        ),
    });
  };

  const handleRevoke = () => {
    revokeMutation.mutate(undefined, {
      onSuccess: () => toast.success("Secret revoked"),
      onError: (err) =>
        toast.error(
          err instanceof Error ? err.message : "Failed to revoke secret"
        ),
    });
  };

  const isMutating =
    toggleMutation.isPending ||
    generateMutation.isPending ||
    revokeMutation.isPending;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Enable / Disable Toggle ─────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
        <div className="space-y-0.5">
          <Label className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Identity Verification
          </Label>
          <p className="text-xs text-muted-foreground">
            Require signed JWTs to identify end users in your chatbot.
          </p>
        </div>
        <Switch
          checked={config.enabled}
          onCheckedChange={handleToggle}
          disabled={isMutating}
          aria-label="Toggle identity verification"
        />
      </div>

      {/* ── Secret Management ───────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" />
            Signing Secret
          </h3>
          <p className="text-xs text-muted-foreground">
            Use this secret on your server to sign JWTs. It is never sent to end users.
          </p>
        </div>

        {config.hasSecret && config.secret ? (
          <div className="space-y-3">
            <SecretDisplay secret={config.secret} />

            {config.secretRotatedAt && (
              <p className="text-2xs text-muted-foreground">
                Last rotated:{" "}
                {new Date(config.secretRotatedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}

            <div className="flex gap-2">
              {/* Rotate secret with confirmation */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8"
                    disabled={isMutating}
                  >
                    {generateMutation.isPending ? (
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3 h-3 mr-2" />
                    )}
                    Rotate Secret
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Rotate signing secret?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This generates a new secret and immediately invalidates the
                      current one. All existing tokens signed with the old secret
                      will fail verification. Your server must be updated with the
                      new secret before users can be identified again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleGenerate}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Rotate Secret
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Revoke secret with confirmation */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    disabled={isMutating}
                  >
                    {revokeMutation.isPending ? (
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="w-3 h-3 mr-2" />
                    )}
                    Revoke Secret
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Revoke signing secret?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently deletes the secret and disables identity
                      verification. All existing tokens will become invalid
                      immediately. You will need to generate a new secret and
                      update your server to re-enable this feature.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRevoke}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Revoke Secret
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleGenerate}
            disabled={isMutating}
            className="text-xs h-8"
          >
            {generateMutation.isPending ? (
              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
            ) : (
              <Key className="w-3 h-3 mr-2" />
            )}
            Generate Secret
          </Button>
        )}
      </div>

      <Separator />

      {/* ── Integration Guide ───────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-sm">Integration Guide</h3>
          <p className="text-xs text-muted-foreground">
            Sign a JWT on your server, then pass it to the Conversly widget on
            your frontend.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950 p-3 text-xs text-amber-800 dark:text-amber-200" role="note">
          <p className="font-medium flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Privacy note
          </p>
          <p>
            The JWT payload is used only for user identification. It is{" "}
            <strong>not</strong> visible to the AI agent. To pass metadata the
            agent can see, use{" "}
            <code className="rounded bg-amber-100 dark:bg-amber-900 px-1 py-0.5">
              publicMeta
            </code>{" "}
            in the identify call instead.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground font-medium">
            Step 1: Sign a JWT on your server
          </Label>
          <Tabs defaultValue="node" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-8">
              <TabsTrigger value="node" className="text-xs">
                Node.js
              </TabsTrigger>
              <TabsTrigger value="python" className="text-xs">
                Python
              </TabsTrigger>
              <TabsTrigger value="php" className="text-xs">
                PHP
              </TabsTrigger>
            </TabsList>
            <TabsContent value="node" className="mt-2">
              <CodeBlock code={CODE_SNIPPETS.node} language="JavaScript" />
            </TabsContent>
            <TabsContent value="python" className="mt-2">
              <CodeBlock code={CODE_SNIPPETS.python} language="Python" />
            </TabsContent>
            <TabsContent value="php" className="mt-2">
              <CodeBlock code={CODE_SNIPPETS.php} language="PHP" />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground font-medium">
            Step 2: Identify the user on your frontend
          </Label>
          <CodeBlock code={CODE_SNIPPETS.frontend} language="JavaScript" />
        </div>
      </div>

      <Separator />

      {/* ── Token Tester ────────────────────────────────────────────────── */}
      {config.hasSecret && <TokenTester chatbotId={chatbotId} />}
    </div>
  );
}
