// ! As was mentioned in interview FLASHSCORE portal is about fresh data and it's pointless to use SSR for this page

"use client";

import {
  getTypeIdsForFilter,
  type SearchTypeFilterKey,
} from "@/lib/api/search/common";
import { getImageUrl } from "@/lib/api/search/top-search";
import { searchQueries } from "@/lib/queries/search/search";
import { DefaultImage } from "@/components/default-image/default-image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { fetchSearch } from "@/lib/api/search/search";

export default function DetailPage() {
  const params = useParams<{ teamName: string }>();
  const teamName = params.teamName;

  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const filter = searchParams.get("filter") as SearchTypeFilterKey | null;
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

  const team = searchQuery.data?.find((item) => item.id === teamId);

  if (searchQuery.isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      </div>
    );
  }

  if (!team || !teamId) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <p className="text-gray-600">Entity not found</p>
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Back to search
        </Link>
      </div>
    );
  }

  const imagePath = team.images[0]?.path;
  const imageSrc = imagePath ? getImageUrl(imagePath) : "/image-placeholder.svg";

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to search
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <DefaultImage
              src={imageSrc}
              alt={team.name}
              width={120}
              height={120}
              className="rounded-xl object-contain ring-2 ring-gray-100"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {team.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {team.type.name}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {team.sport.name}
              </span>
              {team.defaultCountry && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  {team.defaultCountry.name}
                </span>
              )}
            </div>

            {team.defaultCountry && (
              <p className="mt-4 text-sm text-gray-500">
                Based in {team.defaultCountry.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}