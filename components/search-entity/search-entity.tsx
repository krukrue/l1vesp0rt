"use client";

import { getImageUrl } from "@/lib/api/search/top-search";
import { DefaultImage } from "@/components/default-image/default-image";
import Link from "next/link";
import { SearchItem } from "@/lib/types/search/search";

interface SearchEntityProps {
  item: SearchItem;
  href: string;
}

export function SearchEntity({ item, href }: SearchEntityProps) {
  const imagePath = item.images[0]?.path;
  const url = imagePath ? getImageUrl(imagePath) : "/image-placeholder.svg" ;  

  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      className="flex w-full items-center gap-3 rounded-lg border p-3 text-left hover:bg-gray-50"
    >
      <DefaultImage
        height={32}
        width={32}
        src={url}
        alt={item.name}
        className="rounded object-contain"
      />
      <span className="font-medium">{item.name}</span>
      <span className="text-sm text-gray-500">
        {item.type.name} · {item.sport.name}
      </span>
    </Link>
  );
}

