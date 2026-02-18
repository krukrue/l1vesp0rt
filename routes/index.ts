export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  DETAIL: "/detail",
} as const;

/**
 * Builds URL for entity detail page.
 * @param entityName - Entity name 
 * @param entityId - Entity ID
 */
export function buildDetailRoute(
  entityName: string,
  entityId: string,
): string {
  const path = `${ROUTES.DETAIL}/${entityName}`;
  const params = new URLSearchParams();
  params.set("id", entityId);
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}