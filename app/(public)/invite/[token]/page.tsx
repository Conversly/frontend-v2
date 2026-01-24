"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, Building2, User, Mail } from "lucide-react";
import { getInvitationByToken, acceptInvitation, type InvitationDetails } from "@/lib/api/workspaces";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { Badge } from "@/components/ui/badge";

export default function InviteAcceptancePage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = params.token as string;

  const [invitation, setInvitation] = useState<InvitationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const loadInvitation = async () => {
      if (!token) {
        setError("Invalid invitation link");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getInvitationByToken(token);
        setInvitation(data);
      } catch (err: any) {
        setError(err.message || "Failed to load invitation");
      } finally {
        setIsLoading(false);
      }
    };

    loadInvitation();
  }, [token]);

  const handleAccept = async () => {
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";

    if (!isLoggedIn) {
      // Store token in localStorage and redirect to login
      localStorage.setItem("pending_invite_token", token);
      router.push("/login?redirect=/invite/" + token);
      return;
    }

    setIsAccepting(true);
    try {
      const result = await acceptInvitation(token);
      setIsAccepted(true);
      toast.success("Invitation accepted! Redirecting to workspace...");
      
      // Clear pending invite token if exists
      localStorage.removeItem("pending_invite_token");
      
      // Redirect to workspace after a short delay
      setTimeout(() => {
        router.push(`/${result.workspaceId}/chatbot`);
      }, 2000);
    } catch (err: any) {
      // Handle user not found or auth required errors
      if (err.response?.data?.code === 'USER_NOT_FOUND' || err.response?.data?.code === 'AUTH_REQUIRED') {
        toast.error(err.response?.data?.message || "Please log in to accept this invitation");
        // Clear auth state and redirect to login
        localStorage.removeItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN);
        // localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        // localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
        localStorage.setItem("pending_invite_token", token);
        setTimeout(() => {
          router.push("/login?redirect=/invite/" + token);
        }, 1500);
        return;
      }
      
      // Handle email mismatch
      if (err.message?.includes("email does not match")) {
        toast.error("The invitation email doesn't match your account email. Please log in with the correct account.");
        localStorage.setItem("pending_invite_token", token);
        setTimeout(() => {
          router.push("/login?redirect=/invite/" + token);
        }, 2000);
        return;
      }
      
      toast.error(err.message || "Failed to accept invitation");
    } finally {
      setIsAccepting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      OWNER: "default",
      ADMIN: "secondary",
      MEMBER: "outline",
    };
    return <Badge variant={variants[role] || "outline"}>{role}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <XCircle className="h-12 w-12 text-destructive" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Invalid Invitation</h2>
              <p className="text-sm text-muted-foreground">
                {error || "This invitation link is invalid or has expired."}
              </p>
            </div>
            <Button onClick={() => router.push("/")} variant="outline">
              Go to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isAccepted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Invitation Accepted!</h2>
              <p className="text-sm text-muted-foreground">
                You've been added to {invitation.workspaceName}. Redirecting...
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const isExpired = new Date(invitation.expiresAt) < new Date();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="max-w-lg w-full p-8 shadow-lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">You've been invited!</h1>
            <p className="text-muted-foreground">
              {invitation.inviterName} has invited you to join a workspace
            </p>
          </div>

          {/* Invitation Details */}
          <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Workspace</span>
              </div>
              <span className="font-semibold">{invitation.workspaceName}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <span className="text-sm">{invitation.email}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Role</span>
              </div>
              {getRoleBadge(invitation.role)}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Expires</span>
              <span className="text-sm">{formatDate(invitation.expiresAt)}</span>
            </div>
          </div>

          {/* Error Message */}
          {isExpired && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                This invitation has expired. Please contact {invitation.inviterName} for a new invitation.
              </p>
            </div>
          )}

          {/* Actions */}
          {!isExpired && (
            <div className="space-y-2">
              <Button
                onClick={handleAccept}
                disabled={isAccepting}
                className="w-full"
                size="lg"
              >
                {isAccepting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  "Accept Invitation"
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By accepting, you'll be added to the workspace and gain access based on your role.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
