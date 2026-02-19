import { SearchItem } from "@/lib/types/search/search";
import {
  buildBaseSearchParams,
  DEFAULT_BASE_PARAMS,
  SearchParams,
} from "./common";

const SEARCH_DEFAULT_PROJECT_ID = 602;

export function buildSearchUrl(params: SearchParams): string {
  const {
    q,
    langId = DEFAULT_BASE_PARAMS.langId,
    projectId = SEARCH_DEFAULT_PROJECT_ID,
    projectTypeId = DEFAULT_BASE_PARAMS.projectTypeId,
    sportIds = DEFAULT_BASE_PARAMS.sportIds,
    typeIds = DEFAULT_BASE_PARAMS.typeIds,
    limit = DEFAULT_BASE_PARAMS.limit,
  } = params;

  const searchParams = buildBaseSearchParams({
    langId,
    projectId,
    projectTypeId,
    sportIds,
    typeIds,
    limit
  });
  searchParams.set("q", q);

  return `${process.env.NEXT_PUBLIC_API_BASE}/search/?${searchParams.toString()}`;
}

export async function fetchSearch(
  params: SearchParams
): Promise<SearchItem[]> {
  const url = buildSearchUrl(params);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch search");
  return res.json();
}
