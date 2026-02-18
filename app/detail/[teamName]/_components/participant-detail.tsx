import { getImageUrl } from "@/lib/api/search/top-search";
import { DefaultImage } from "@/components/default-image/default-image";
import type { SearchItem } from "@/lib/api/types";
import { isTeam } from "@/lib/api/entity-types";

interface ParticipantDetailProps {
  entity: SearchItem;
}

export function ParticipantDetail({ entity }: ParticipantDetailProps) {
  const imagePath = entity.images[0]?.path;
  const imageSrc = imagePath ? getImageUrl(imagePath) : "/image-placeholder.svg";

  const isTeamEntity = isTeam(entity.type.id);

  return (
    <div className="overflow-hidden rounded-2xl border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 shadow-sm">
      <div className="flex flex-col items-center gap-6 p-8 ">
        <div className="shrink-0">
          <DefaultImage
            src={imageSrc}
            alt={entity.name}
            width={120}
            height={120}
            className="rounded-xl object-contain ring-2 ring-blue-200"
          />
        </div>

        <div className="flex-1 text-center ">
          <span className="mb-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            {isTeamEntity ? "Team" : "Player"}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            {entity.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-blue-100">
              {entity.type.name}
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-blue-100">
              {entity.sport.name}
            </span>
            {entity.defaultCountry && (
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-blue-100">
                {entity.defaultCountry.name}
              </span>
            )}
          </div>

          {entity.defaultCountry && (
            <p className="mt-4 text-sm text-gray-600">
              {isTeamEntity ? "Location" : "Nationality"}: {entity.defaultCountry.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
