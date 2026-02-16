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

export const MIN_SEARCH_LENGTH = 2;
