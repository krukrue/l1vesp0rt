import { SearchItem } from "@/lib/types/search/search";
import {
  buildBaseSearchParams,
  DEFAULT_BASE_PARAMS,
  getImageUrl,
  SearchParams,
} from "./common";

export { getImageUrl };

export type TopSearchParams = Omit<SearchParams, "q">

const TOP_SEARCH_DEFAULT_PROJECT_ID = 2;
const DEFAULT_LIMIT = 10;

export function buildTopSearchUrl(params: TopSearchParams = {}): string {
  const {
    langId = DEFAULT_BASE_PARAMS.langId,
    projectId = TOP_SEARCH_DEFAULT_PROJECT_ID,
    projectTypeId = DEFAULT_BASE_PARAMS.projectTypeId,
    sportIds = DEFAULT_BASE_PARAMS.sportIds,
    typeIds = DEFAULT_BASE_PARAMS.typeIds,
    limit = DEFAULT_LIMIT,
  } = params;

  const searchParams = buildBaseSearchParams({
    langId,
    projectId,
    projectTypeId,
    sportIds,
    typeIds,
    limit,
  });

  return `${process.env.NEXT_PUBLIC_API_BASE}/top-search/?${searchParams.toString()}`;
}

export async function fetchTopSearch(
  params: TopSearchParams = {}
): Promise<SearchItem[]> {
  const url = buildTopSearchUrl(params);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch top search");
  return res.json();
}
