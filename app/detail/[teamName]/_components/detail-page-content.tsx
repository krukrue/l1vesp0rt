import type { SearchItem } from "@/lib/api/types";
import { isCompetition } from "@/lib/api/entity-types";
import { CompetitionDetail } from "./competition-detail";
import { ParticipantDetail } from "./participant-detail";

interface DetailPageContentProps {
  entity: SearchItem;
}

export function DetailPageContent({ entity }: DetailPageContentProps) {
  if (isCompetition(entity.type.id)) {
    return <CompetitionDetail entity={entity} />;
  }

  return <ParticipantDetail entity={entity} />;
}
