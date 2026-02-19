import { isCompetition, isTeam } from "@/lib/types/entity/entity-types";
import { SearchItem } from "@/lib/types/search/search";


/**
 * Logic for the detail page to distinguish and differentiate entities based on their type
 * and return the appropriate theme and badges
 * @param entity - The entity to get the logic from
 */
export function useDetailLogic(entity: SearchItem) {
    const isCompetitionEntity = isCompetition(entity.type.id);
    const isTeamEntity = isTeam(entity.type.id);
  
    const typeLabel = isCompetitionEntity
      ? "Competition"
      : isTeamEntity
        ? "Team"
        : "Player";
  
    const theme = isCompetitionEntity
      ? {
          border: "border-amber-200",
          gradient: "from-amber-50 to-orange-50",
          ring: "ring-amber-200",
          badge: "bg-amber-200 text-amber-800",
          badgeRing: "ring-amber-100",
        }
      : {
          border: "border-blue-200",
          gradient: "from-blue-50 to-indigo-50",
          ring: "ring-blue-200",
          badge: "bg-blue-200 text-blue-800",
          badgeRing: "ring-blue-100",
        };
  
    const badges = isCompetitionEntity
      ? [{ label: entity.sport.name }]
      : [
          { label: entity.type.name },
          { label: entity.sport.name },
          ...(entity.defaultCountry ? [{ label: entity.defaultCountry.name }] : []),
        ];
    
    return { typeLabel, theme, badges };

}