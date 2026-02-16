import { SearchTypeFilterKey } from "@/lib/api/search/common";

/**
 * Example version of how I'd prefer use queries
 */
export const searchQueries = {
    search: {
        all: ['search'] as const,
        withParams: (q: string, type: SearchTypeFilterKey) => [...searchQueries.search.all, q, type] as const,
    },
    top: {
        all: ['top'] as const,
        withParams: (type: SearchTypeFilterKey) => [...searchQueries.top.all, type] as const,
    },
} as const;