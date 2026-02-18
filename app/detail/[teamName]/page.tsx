// ! As was mentioned in interview FLASHSCORE portal is about fresh data and it's pointless to use SSR for this page

"use client";

import {
  getTypeIdsForFilter,
} from "@/lib/api/search/common";
import { searchQueries } from "@/lib/queries/search/search";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchSearch } from "@/lib/api/search/search";
import { useDetailPageSearchParams } from "./_hooks/use-detail-page-search-params";
import { Loading } from "@/components/loading/loading";
import { DetailPageContent } from "./_components/detail-page-content";
import { ROUTES } from "@/routes";

export default function DetailPage() {
  const { teamName, teamId, filter } = useDetailPageSearchParams();

  // Must be EP for getting team by ID, but in this case we use search
  // PS: There is no SAFE WAY to get team. Any storage is dependent on previous page. Ofc we could use EP from your website, but now I'm gonna show way to get team.
  // Name is optimistic scenario, because it's has to be unique, at least in case when we search by full name
  // Also there is possibility to get it by searchPhrase, but it's less likely to be unique and be found
  const searchQuery = useQuery({
    queryKey: searchQueries.search.withParams(teamName, "ALL"),
    queryFn: () =>
      fetchSearch({
        q: teamName,
        typeIds: getTypeIdsForFilter(filter ?? "ALL"),
      }),
  });

  const entity = searchQuery.data?.find((item) => item.id === teamId);

  if (searchQuery.isPending) {
    return <Loading />;
  }

  if (!entity || !teamId) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <p className="text-gray-600">Entity not found</p>
        <Link
          href={ROUTES.SEARCH}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href={ROUTES.SEARCH}
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to search
      </Link>

      <DetailPageContent entity={entity} />
    </article>
  );
}
