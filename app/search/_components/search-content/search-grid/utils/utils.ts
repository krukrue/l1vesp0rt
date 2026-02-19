import { SearchItem } from "@/lib/types";

interface SportGroup {
  sport: { id: number; name: string };
  items: SearchItem[];
}
  
export function groupBySport(data: SearchItem[]): SportGroup[] {
  const groups = new Map<number, SportGroup>();

  for (const item of data) {
      const existing = groups.get(item.sport.id);
      if (existing) {
        existing.items.push(item);
      }
      else {
        groups.set(item.sport.id, {
            sport: item.sport,
            items: [item],
        });
      }
  }

  return Array.from(groups.values()).sort((a, b) => b.items.length - a.items.length);
}