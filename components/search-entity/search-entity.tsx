"use client";

import { getImageUrl } from "@/lib/api/search/top-search";
import { DefaultImage } from "@/components/default-image/default-image";
import type { SearchItem } from "@/lib/api/types";
import Link from "next/link";

interface SearchEntityProps {
  item: SearchItem;
}

function buildUrlWithId(url: string, id: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `/detail/${url}${separator}id=${id}`;
}

export function SearchEntity({ item }: SearchEntityProps) {
  const imagePath = item.images[0]?.path;
  const url = imagePath ? getImageUrl(imagePath) : "/image-placeholder.svg" ;
  
  const href = buildUrlWithId(item.url, item.id);

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

