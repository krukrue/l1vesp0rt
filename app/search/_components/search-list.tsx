"use client";

import { useSearchList } from "../_hooks/use-search-list";
import { SearchInput } from "@/components/search-input/search-input";
import { useState } from "react";
import { SkeletonSearch } from "./search-content/skeleton/skeleton-search";
import { ToggleButton, ToggleGroup } from "@/components/toggle";
import { EmptySearch } from "./search-content/empty-search/empty-search";
import { SearchError } from "./search-content/error/search-error";
import { useSearchInput } from "../_hooks/use-search-input";
import { SearchGrid } from "./search-content/search-grid/search-grid";
import { SearchTypeFilterKey, SEARCH_TYPE_FILTER } from "@/lib/api/search/common";
import { InfoHolder } from "./search-content/info-holder/info-holder";

export function SearchList() {
  const [typeFilter, setTypeFilter] = useState<SearchTypeFilterKey>("ALL");
  const { searchValue, isDebouncing, onDebouncingChange, onDebouncedChange } =
    useSearchInput();
  const { data: topSearch, error, refetch } = useSearchList(
    searchValue,
    typeFilter
  );

  const renderContent = () => {
    if (isDebouncing) return <SkeletonSearch />;
    if (error) return <SearchError error={error} onRetry={refetch} />;
    if (topSearch.length === 0) return <EmptySearch />;
    return <SearchGrid data={topSearch} />;
  };

  return (
    <div className="col-start-2 space-y-2">
      <SearchInput
        onDebouncedChange={onDebouncedChange}
        onDebouncingChange={onDebouncingChange}
      />
      <ToggleGroup
        value={typeFilter}
        onValueChange={(v) => setTypeFilter(v as SearchTypeFilterKey)}
      >
        {(Object.keys(SEARCH_TYPE_FILTER) as SearchTypeFilterKey[]).map(
          (key) => (
            <ToggleButton key={key} value={key}>
              {SEARCH_TYPE_FILTER[key].label}
            </ToggleButton>
          )
        )}
      </ToggleGroup>
      <InfoHolder searchLength={searchValue.length} isDebouncing={isDebouncing} />
      <main className="flex flex-col gap-2">{renderContent()}</main>
    </div>
  );
}
