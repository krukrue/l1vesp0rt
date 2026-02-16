import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchTopSearch } from "@/lib/api/search/top-search";
import { SearchList } from "./_components/search-list";
import { searchQueries } from "@/lib/queries/search/search";

export default async function Search() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: searchQueries.top.all,
    queryFn: () => fetchTopSearch(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-[2fr_4fr_2fr] gap-4 p-4">
        <SearchList />
      </div>
    </HydrationBoundary>
  );
}
