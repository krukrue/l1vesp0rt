
export const DEFAULT_BASE_PARAMS = {
  langId: 1,
  projectTypeId: 1,
  sportIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  typeIds: [1, 2, 3, 4],
  limit: 15,
} as const;

export interface BaseParams {
  langId?: number;
  projectId?: number;
  projectTypeId?: number;
  sportIds?: number[];
  typeIds?: number[];
}

export function buildBaseSearchParams(params: {
  langId?: number;
  projectId?: number;
  projectTypeId?: number;
  sportIds?: readonly number[];
  typeIds?: readonly number[];
  limit?: number;
}): URLSearchParams {
  const {
    langId = DEFAULT_BASE_PARAMS.langId,
    projectId,
    projectTypeId = DEFAULT_BASE_PARAMS.projectTypeId,
    sportIds = DEFAULT_BASE_PARAMS.sportIds,
    typeIds = DEFAULT_BASE_PARAMS.typeIds,
  } = params;

  const searchParams = new URLSearchParams({
    "lang-id": String(langId),
    "project-type-id": String(projectTypeId),
    "sport-ids": sportIds.join(","),
    "type-ids": typeIds.join(","),
    "project-id": String(projectId),
  });

  return searchParams;
}

export function getImageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_IMAGE_BASE;
  return `${base}/${path}`;
}

/** Filter type entity: key for UI (toggle) + value for API (type-ids) */
export const SEARCH_TYPE_FILTER = {
  ALL: { typeIds: [1, 2, 3, 4], label: "All" },
  COMPETITIONS: { typeIds: [1], label: "Competitions" },
  PARTICIPANTS: { typeIds: [2, 3, 4], label: "Participants" },
} as const;

export type SearchTypeFilterKey = keyof typeof SEARCH_TYPE_FILTER;

export function getTypeIdsForFilter(key: SearchTypeFilterKey): number[] {
  return [...SEARCH_TYPE_FILTER[key].typeIds];
}

export interface SearchParams {
  q: string;
  langId?: number;
  projectId?: number;
  projectTypeId?: number;
  sportIds?: number[];
  typeIds?: number[];
  limit?: number;
}