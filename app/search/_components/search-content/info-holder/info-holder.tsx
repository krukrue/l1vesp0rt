import { MIN_SEARCH_LENGTH } from "@/lib/consts/search";

interface InfoHolderProps {
  searchLength: number;
  isDebouncing: boolean;
}

export function InfoHolder({ searchLength, isDebouncing }: InfoHolderProps) {
  if (searchLength >= MIN_SEARCH_LENGTH || isDebouncing) return null;

  return (
    <>
      <h2 className="text-sm font-medium text-gray-500">
        Please type at least {MIN_SEARCH_LENGTH} characters. The results will
        start displaying here immediately.
      </h2>
      <h2>Most popular searches</h2>
    </>
  );
}
