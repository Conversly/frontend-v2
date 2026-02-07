import { getLeads } from "@/lib/api/leads";
import { QUERY_KEY } from "@/utils/query-key";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetLeadsQuery } from "@/types/leads";

export const useGetLeadsInfinite = (query: GetLeadsQuery) => {
    return useInfiniteQuery({
        queryKey: [
            QUERY_KEY.GET_LEADS,
            query.chatbotId,
            query.topicId,
            query.source,
            query.startDate,
            query.endDate,
            query.search,
            query.limit
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
