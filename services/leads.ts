import { getLeads, exportLeadsCsv } from "@/lib/api/leads";
import { QUERY_KEY } from "@/utils/query-key";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { GetLeadsQuery, ExportLeadsQuery } from "@/types/leads";

export const useGetLeadsInfinite = (query: GetLeadsQuery) => {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEY.GET_LEADS,
            query.chatbotId,
            query.source,
            query.startDate,
            query.endDate,
            query.search,
            query.limit,
            query.topicId
        ],
        queryFn: async ({ pageParam = undefined }) => {
            const res = await getLeads({
                ...query,
                cursor: pageParam as string | undefined, // Cast since pageParam is unknown
            });
            return res.data;
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        enabled: !!query.chatbotId,
    });
};

export const useExportLeads = () => {
    return useMutation({
        mutationFn: async (query: ExportLeadsQuery) => {
            const blob = await exportLeadsCsv(query);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const timestamp = new Date().toISOString().slice(0, 10);
            a.download = `leads-export-${timestamp}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        },
    });
};
