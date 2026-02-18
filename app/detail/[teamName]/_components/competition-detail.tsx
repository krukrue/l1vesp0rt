import { getImageUrl } from "@/lib/api/search/top-search";
import { DefaultImage } from "@/components/default-image/default-image";
import type { SearchItem } from "@/lib/api/types";

interface CompetitionDetailProps {
  entity: SearchItem;
}

export function CompetitionDetail({ entity }: CompetitionDetailProps) {
  const imagePath = entity.images[0]?.path;
  const imageSrc = imagePath ? getImageUrl(imagePath) : "/image-placeholder.svg";

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 shadow-sm">
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="shrink-0">
          <DefaultImage
            src={imageSrc}
            alt={entity.name}
            width={120}
            height={120}
            className="rounded-xl object-contain ring-2 ring-amber-200"
          />
        </div>

        <div className="flex-1">
          <span className="mb-2 inline-block rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
            Competition
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            {entity.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-amber-100">
              {entity.sport.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
