export const ENTITY_TYPE_ID = {
  COMPETITION: 1,
  TEAM: 2,
  /** id 3 - unknown */
  PLAYER: 4,
} as const;

export function isCompetition(typeId: number): boolean {
  return typeId === ENTITY_TYPE_ID.COMPETITION;
}

export function isTeam(typeId: number): boolean {
  return typeId === ENTITY_TYPE_ID.TEAM;
}

export function isPlayer(typeId: number): boolean {
  return typeId === ENTITY_TYPE_ID.PLAYER;
}
