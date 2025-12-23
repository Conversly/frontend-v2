import { useEffect, useMemo, useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorkspaces, Workspace } from "@/lib/api/admin";

const ACTIVE_KEY = "activeAccountId";

export const useWorkspaces = () => {
  const queryClient = useQueryClient();
  const [activeWorkspaceId, setActiveWorkspaceIdState] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ACTIVE_KEY);
    }
    return null;
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
    staleTime: 60_000,
  });

  // Sync state with localStorage and validate workspace
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const current = typeof window !== "undefined" ? localStorage.getItem(ACTIVE_KEY) : null;
    
    // Validate that the stored activeAccountId is valid for the current user
    const isValidWorkspace = current && data.some((ws) => ws.id === current);
    
    if (!current || !isValidWorkspace) {
      // If no active workspace or invalid workspace, set to first available
      const firstWorkspaceId = data[0].id;
      localStorage.setItem(ACTIVE_KEY, firstWorkspaceId);
      setActiveWorkspaceIdState(firstWorkspaceId);
      // Trigger event to notify components of the change
      window.dispatchEvent(new CustomEvent("workspace-changed", { detail: { workspaceId: firstWorkspaceId } }));
    } else if (current !== activeWorkspaceId) {
      // Sync state with localStorage if they differ
      setActiveWorkspaceIdState(current);
    }
  }, [data, activeWorkspaceId]);

  // Listen for workspace-changed events (from other components)
  useEffect(() => {
    const handleWorkspaceChange = (event: CustomEvent) => {
      const newWorkspaceId = event.detail.workspaceId;
      if (newWorkspaceId !== activeWorkspaceId) {
        setActiveWorkspaceIdState(newWorkspaceId);
      }
    };

    window.addEventListener("workspace-changed", handleWorkspaceChange as EventListener);
    return () => {
      window.removeEventListener("workspace-changed", handleWorkspaceChange as EventListener);
    };
  }, [activeWorkspaceId]);

  const setActiveWorkspace = useCallback((id: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_KEY, id);
      setActiveWorkspaceIdState(id);
      // Trigger a custom event so components can listen for workspace changes
      window.dispatchEvent(new CustomEvent("workspace-changed", { detail: { workspaceId: id } }));
    }
    // Invalidate all workspace-dependent queries and force refetch
    queryClient.invalidateQueries({ queryKey: ["chatbots"] });
    queryClient.invalidateQueries({ queryKey: ["billing"] });
    queryClient.invalidateQueries({ queryKey: ["analytics"] });
    queryClient.invalidateQueries({ queryKey: ["members"] });
    queryClient.invalidateQueries({ queryKey: ["permissions"] });
    queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
    // Force refetch to ensure immediate update with new workspace context
    queryClient.refetchQueries({ queryKey: ["permissions"] });
    queryClient.refetchQueries({ queryKey: ["chatbots"] });
  }, [queryClient]);

  // Compute final activeWorkspaceId: use state value if valid, otherwise default to first workspace
  const finalActiveWorkspaceId = useMemo(() => {
    if (!data || data.length === 0) {
      return activeWorkspaceId;
    }
    
    const isValidWorkspace = activeWorkspaceId && data.some((ws) => ws.id === activeWorkspaceId);
    
    // If state value is valid, use it; otherwise default to first workspace
    return isValidWorkspace ? activeWorkspaceId : data[0].id;
  }, [data, activeWorkspaceId]);

  return {
    workspaces: data || [],
    activeWorkspaceId: finalActiveWorkspaceId,
    isLoading,
    error,
    setActiveWorkspace,
  };
};

