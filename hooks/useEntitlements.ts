
import { useQuery } from '@tanstack/react-query';
import { getWorkspaceEntitlements } from '@/lib/api/workspaces';

export const useEntitlements = (workspaceId: string) => {
    return useQuery({
        queryKey: ['workspace', workspaceId, 'entitlements'],
        queryFn: () => getWorkspaceEntitlements(workspaceId),
        enabled: !!workspaceId,
    });
};
