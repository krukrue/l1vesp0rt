import {
  SearchTypeFilterKey,
  getTypeIdsForFilter,
} from "@/lib/api/search/common";
import {
  fetchSearch,
} from "@/lib/api/search/search";
import { fetchTopSearch } from "@/lib/api/search/top-search";
import { searchQueries } from "@/lib/queries/search/search";
import { useQuery } from "@tanstack/react-query";

export function useSearchList(qValue: string, typeFilter: SearchTypeFilterKey) {
  const isSearchMode = qValue.length > 1;

  const topSearchQuery = useQuery({
    queryKey: searchQueries.top.withParams(typeFilter),
    queryFn: () => fetchTopSearch({ typeIds: getTypeIdsForFilter(typeFilter) }),
  });

  const searchQuery = useQuery({
    queryKey: searchQueries.search.withParams(qValue, typeFilter),
    queryFn: () =>
      fetchSearch({ q: qValue, typeIds: getTypeIdsForFilter(typeFilter) }),
    enabled: isSearchMode,
  });

  const activeQuery = isSearchMode ? searchQuery : topSearchQuery;

  return {
    data: activeQuery.data ?? [],
    error: activeQuery.error,
    refetch: activeQuery.refetch,
  };
}