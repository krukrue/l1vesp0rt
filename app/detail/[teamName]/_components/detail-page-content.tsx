import { getImageUrl } from "@/lib/api/search/top-search";
import { DefaultImage } from "@/components/default-image/default-image";
import { Badge } from "@/components/badge/badge";
import { SearchItem } from "@/lib/types/search/search";
import { useDetailLogic } from "./use-detail-logic";

interface DetailPageContentProps {
  entity: SearchItem;
}

export function DetailPageContent({ entity }: DetailPageContentProps) {
  const imagePath = entity.images[0]?.path;
  const imageSrc = imagePath ? getImageUrl(imagePath) : "/image-placeholder.svg";

  const { typeLabel, theme, badges } = useDetailLogic(entity);

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-linear-to-br shadow-sm ${theme.border} ${theme.gradient}`}
    >
      <div className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-start">
        <div className="shrink-0">
          <DefaultImage
            src={imageSrc}
            alt={entity.name}
            width={120}
            height={120}
            className={`rounded-xl object-contain ring-2 ${theme.ring}`}
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <Badge variant="type" className={`mb-2 inline-block ${theme.badge}`}>
            {typeLabel}
          </Badge>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {entity.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge.label} variant="info" className={theme.badgeRing}>
                {badge.label}
              </Badge>
            ))}
          </div>

          {entity.defaultCountry && (
            <p className="mt-4 text-sm text-gray-600">
              Country: {entity.defaultCountry.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
