import { SearchEntity } from "@/components/search-entity/search-entity";
import { groupBySport } from "./utils/utils";
import { buildDetailRoute } from "@/routes";
import { SearchItem } from "@/lib/types/search/search";

interface SearchGridProps {
  data: SearchItem[];
}

export function SearchGrid({ data }: SearchGridProps) {
  // Function is lightweight and can be tested separately
  const sportGroups = groupBySport(data);
  return (
    <div className="flex flex-col gap-4">
      {sportGroups.map(({ sport, items }) => (
        <section key={sport.id}>
          <h3 className="mb-2 text-sm font-semibold text-white w-full border rounded p-2 text-center">
            {sport.name}
          </h3>
          <ul className="flex flex-col gap-2 pl-4">
            {items.map((item) => (
              <li key={item.id}>
                <SearchEntity item={item} href={buildDetailRoute(item.url, item.id)}/>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}