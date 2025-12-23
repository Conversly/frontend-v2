"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Mail, Building2, Bot } from "lucide-react";
import { getInviteDetails, acceptInviteByToken, InviteDetails } from "@/lib/api/admin";
import { useAuth } from "@/store/auth";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { useQueryClient } from "@tanstack/react-query";

export default function InvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { user, authStatus } = useAuth();
  const authLoading = authStatus === 'loading';
  const { setActiveWorkspace } = useWorkspaces();
  const queryClient = useQueryClient();

  const [inviteDetails, setInviteDetails] = useState<InviteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid invite link. No token provided.");
      setLoading(false);
      return;
    }

    // Fetch invite details
    const fetchInviteDetails = async () => {
      try {
        const details = await getInviteDetails(token);
        setInviteDetails(details);
        
        // If invite is already accepted, set workspace and redirect
        if (details.status === 'accepted' && details.accountId && user) {
          setActiveWorkspace(details.accountId);
          queryClient.invalidateQueries({ queryKey: ["workspaces"] });
          queryClient.refetchQueries({ queryKey: ["workspaces"] });
          setTimeout(() => {
            router.push("/chatbot");
          }, 1000);
          return;
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load invite details");
      } finally {
        setLoading(false);
      }
    };

    fetchInviteDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  const handleAcceptInvite = async () => {
    if (!token) {
      setError("Invalid invite token");
      return;
    }

    setAccepting(true);
    setError(null);

    try {
      console.log("Accepting invite with token:", token);
      const result = await acceptInviteByToken(token);
      console.log("Invite acceptance result:", result);

      if (result.requiresAuth || result.message?.includes("sign up") || result.message?.includes("login")) {
        // User needs to authenticate first
        router.push(`/login?redirect=/invite?token=${token}`);
        return;
      }

      // Check if invite was actually accepted
      if (!result.data?.accepted) {
        console.error("Invite not accepted:", result);
        setError(result.message || "Invite was not accepted");
        setAccepting(false);
        return;
      }

      // After accepting invite, set the workspace as active and refresh data
      if (result.data?.accountId) {
        console.log("Setting workspace as active:", result.data.accountId);
        // Set the workspace as active FIRST
        setActiveWorkspace(result.data.accountId);
        
        // Wait a bit for localStorage to be set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Invalidate all queries first
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        queryClient.invalidateQueries({ queryKey: ["chatbots"] });
        queryClient.invalidateQueries({ queryKey: ["permissions"] });
        queryClient.invalidateQueries({ queryKey: ["members"] });
        queryClient.invalidateQueries({ queryKey: ["pending-invites"] });
        queryClient.invalidateQueries({ queryKey: ["workspaces-details"] });
        
        // Wait for critical queries to refetch before redirecting
        // This ensures the workspace is available and permissions are updated
        await Promise.all([
          queryClient.refetchQueries({ queryKey: ["workspaces"] }),
          queryClient.refetchQueries({ queryKey: ["permissions"] }),
        ]);
        
        // Verify the workspace is now in the list
        const workspaces = queryClient.getQueryData(["workspaces"]) as any[];
        const workspaceExists = workspaces?.some((ws: any) => ws.id === result.data.accountId);
        
        if (!workspaceExists) {
          console.warn("Workspace not found in list after refetch, waiting a bit more...");
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } else {
        console.error("No accountId in response:", result);
        setError("Failed to get workspace information after accepting invite");
        setAccepting(false);
        return;
      }

      setSuccess(true);
      setAccepting(false);
      // Redirect to chatbots page - queries are already refetched
      router.push("/chatbot");
    } catch (err: any) {
      console.error("Error accepting invite:", err);
      setAccepting(false);
      
      // Handle 403 Forbidden (email mismatch)
      if (err?.response?.status === 403 || err?.message?.includes("email") || err?.message?.includes("logged in as")) {
        const errorMsg = err?.response?.data?.message || err?.message || "Email mismatch";
        setError(errorMsg);
        return;
      }
      
      // Handle 401 Unauthorized (not logged in)
      if (err?.message?.includes("sign up") || err?.message?.includes("login") || err?.response?.status === 401) {
        // User needs to authenticate first
        router.push(`/login?redirect=/invite?token=${token}`);
        return;
      }
      
      // Handle other errors
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to accept invite";
      setError(errorMessage);
      console.error("Full error object:", err);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading invite details...</p>
        </div>
      </div>
    );
  }

  if (error && !inviteDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <XCircle className="w-6 h-6" />
              <CardTitle>Invalid Invite</CardTitle>
            </div>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")} variant="outline" className="w-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckCircle2 className="w-6 h-6" />
              <CardTitle>Invite Accepted!</CardTitle>
            </div>
            <CardDescription>
              You've been successfully added. Redirecting to chatbots...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!inviteDetails) {
    return null;
  }

  const isExpired = new Date(inviteDetails.expiresAt) < new Date();
  const needsAuth = !user && inviteDetails.isValid;
  // Check if user email matches invite email
  const emailMatches = user && inviteDetails.email && user.email === inviteDetails.email;
  const canAccept = user && inviteDetails.isValid && !isExpired && inviteDetails.status === 'pending' && emailMatches;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">You've been invited!</CardTitle>
          <CardDescription>
            {inviteDetails.inviteType === "ACCOUNT_MEMBER"
              ? "Join this account to collaborate"
              : "Become an admin for this chatbot"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Invite Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Building2 className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Account</p>
                <p className="font-medium">{inviteDetails.accountName}</p>
              </div>
            </div>

            {inviteDetails.inviteType === "CHATBOT_ADMIN" && inviteDetails.chatbotName && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Bot className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Chatbot</p>
                  <p className="font-medium">{inviteDetails.chatbotName}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{inviteDetails.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Role</span>
              <Badge variant="secondary" className="capitalize">
                {inviteDetails.role.replace("_", " ").toLowerCase()}
              </Badge>
            </div>
          </div>

          {/* Status Messages */}
          {isExpired && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                This invite has expired. Please request a new invite.
              </p>
            </div>
          )}

          {!inviteDetails.isValid && !isExpired && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-600">
                This invite is no longer valid. It may have been cancelled or already accepted.
              </p>
            </div>
          )}

          {needsAuth && inviteDetails.isValid && !isExpired && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-600">
                Please sign in or create an account to accept this invite. After signing in, you'll be able to accept the invite on this page.
              </p>
            </div>
          )}

          {canAccept && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600 font-medium">
                Ready to join! Click "Accept Invite" below to join <strong>{inviteDetails.accountName}</strong> as a <strong>{inviteDetails.role.replace("_", " ").toLowerCase()}</strong>.
              </p>
            </div>
          )}

          {user && inviteDetails.email && user.email && inviteDetails.email !== user.email && inviteDetails.isValid && !isExpired && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-600">
                ⚠️ This invite is for <strong>{inviteDetails.email}</strong>, but you are logged in as <strong>{user.email}</strong>. Please log out and sign in with the correct email to accept this invite.
              </p>
            </div>
          )}


          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {needsAuth ? (
              <Button
                onClick={() => router.push(`/login?redirect=/invite?token=${token}`)}
                className="flex-1"
              >
                Sign In to Accept
              </Button>
            ) : !canAccept ? (
              <Button
                disabled
                className="flex-1"
              >
                {!user 
                  ? "Please sign in first" 
                  : !inviteDetails.isValid 
                    ? "Invite is invalid" 
                    : isExpired 
                      ? "Invite has expired" 
                      : inviteDetails.status !== 'pending' 
                        ? "Invite already processed" 
                        : !emailMatches
                          ? `Email mismatch (invite: ${inviteDetails.email}, logged in: ${user?.email})`
                          : "Cannot accept"}
              </Button>
            ) : (
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  console.log("Accept button clicked", { 
                    token, 
                    isValid: inviteDetails.isValid, 
                    isExpired, 
                    accepting,
                    user: user?.email,
                    inviteEmail: inviteDetails.email,
                    status: inviteDetails.status,
                    canAccept,
                    emailMatches
                  });
                  
                  // Prevent multiple clicks
                  if (accepting) {
                    console.log("Already accepting, ignoring click");
                    return;
                  }
                  
                  // Check email match first
                  if (user && inviteDetails.email && user.email !== inviteDetails.email) {
                    const errorMsg = `This invite is for ${inviteDetails.email}, but you are logged in as ${user.email}. Please log out and sign in with the correct email.`;
                    console.error("Email mismatch:", errorMsg);
                    setError(errorMsg);
                    return;
                  }
                  
                  // Check if invite is valid
                  if (!inviteDetails.isValid) {
                    setError("This invite is no longer valid. It may have been cancelled or already accepted.");
                    return;
                  }
                  
                  // Check if invite is expired
                  if (isExpired) {
                    setError("This invite has expired. Please request a new invite.");
                    return;
                  }
                  
                  // Check if invite status is pending
                  if (inviteDetails.status !== 'pending') {
                    setError(`This invite has already been ${inviteDetails.status}.`);
                    return;
                  }
                  
                  // All checks passed, proceed with acceptance
                  if (canAccept) {
                    console.log("All checks passed, calling handleAcceptInvite");
                    await handleAcceptInvite();
                  } else {
                    console.warn("Cannot accept invite - canAccept is false:", { 
                      canAccept, 
                      user: !!user, 
                      isValid: inviteDetails.isValid, 
                      isExpired, 
                      status: inviteDetails.status, 
                      emailMatches 
                    });
                    setError("Cannot accept invite. Please check that you are signed in with the correct email address.");
                  }
                }}
                disabled={accepting}
                className="flex-1"
              >
                {accepting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  "Accept Invite"
                )}
              </Button>
            )}
            <Button onClick={() => router.push("/")} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

