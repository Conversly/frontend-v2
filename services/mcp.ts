import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createMcpConnection,
  deleteMcpConnection,
  getMcpConnection,
  getMcpConnections,
  toggleMcpConnection,
  updateMcpConnection,
  updateMcpToolConfig,
  verifyMcpConnection,
} from "@/lib/api/mcp";
import {
  CreateMcpConnectionInput,
  DeleteMcpConnectionInput,
  GetMcpConnectionInput,
  GetMcpConnectionsQuery,
  ToggleMcpConnectionInput,
  UpdateMcpConnectionInput,
  UpdateMcpToolConfigInput,
  VerifyMcpConnectionInput,
} from "@/types/mcp";

export const useMcpConnections = (query: GetMcpConnectionsQuery) => {
  return useQuery({
    queryKey: ["mcp-connections", query],
    queryFn: () => getMcpConnections(query),
  });
};

export const useMcpConnection = (query: GetMcpConnectionInput, enabled = true) => {
  return useQuery({
    queryKey: ["mcp-connection", query.chatbotId, query.connectionId],
    queryFn: () => getMcpConnection(query),
    enabled: enabled && !!query.connectionId,
  });
};

export const useVerifyMcpConnection = () => {
  return useMutation({
    mutationFn: (data: VerifyMcpConnectionInput) => verifyMcpConnection(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateMcpConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMcpConnectionInput) => createMcpConnection(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mcp-connections", { chatbotId: variables.chatbotId }],
      });
      toast.success("MCP server connected successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateMcpConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMcpConnectionInput) => updateMcpConnection(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mcp-connections", { chatbotId: variables.chatbotId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["mcp-connection", variables.chatbotId, variables.connectionId],
      });
      toast.success("MCP server updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteMcpConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteMcpConnectionInput) => deleteMcpConnection(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mcp-connections", { chatbotId: variables.chatbotId }],
      });
      toast.success("MCP server deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useToggleMcpConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ToggleMcpConnectionInput) => toggleMcpConnection(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mcp-connections", { chatbotId: variables.chatbotId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["mcp-connection", variables.chatbotId, variables.connectionId],
      });
      toast.success(`MCP server ${variables.isEnabled ? "enabled" : "disabled"} successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateMcpToolConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMcpToolConfigInput) => updateMcpToolConfig(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mcp-connections", { chatbotId: variables.chatbotId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["mcp-connection", variables.chatbotId, variables.connectionId],
      });
      toast.success("MCP tool updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
