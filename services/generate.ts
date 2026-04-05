import { useMutation } from "@tanstack/react-query";
import { improveMessage } from "@/lib/api/generate";
import type { ImproveMessageInput } from "@/lib/api/generate";

export const useImproveMessage = () => {
    return useMutation({
        mutationFn: (input: ImproveMessageInput) => improveMessage(input),
    });
};
