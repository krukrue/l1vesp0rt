import { SearchItem } from "@/lib/api/types";
import { SearchEntity } from "@/components/search-entity/search-entity";

interface SearchGridProps {
  data: SearchItem[];
}

interface SportGroup {
  sport: { id: number; name: string };
  items: SearchItem[];
}

function groupBySport(data: SearchItem[]): SportGroup[] {
  const groups = new Map<number, SportGroup>();

  for (const item of data) {
    const existing = groups.get(item.sport.id);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.set(item.sport.id, {
        sport: item.sport,
        items: [item],
      });
    }
  }

  return Array.from(groups.values()).sort((a, b) => b.items.length - a.items.length);
}

export function SearchGrid({ data }: SearchGridProps) {
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
                <SearchEntity item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}