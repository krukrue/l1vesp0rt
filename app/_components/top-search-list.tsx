"use client";

import { SearchEntity } from "@/components/search-entity/search-entity";
import { useSearchList } from "../_hooks/use-search-list";
import { SearchInput } from "@/components/search-input/search-input";
import { useState } from "react";
import { SkeletonSearch } from "./search-content/skeleton/skeleton-search";
import { ToggleButton, ToggleGroup } from "@/components/toggle";
import {
} from "@/lib/api/search/search";
import { EmptySearch } from "./search-content/empty-search/empty-search";
import { SearchError } from "./search-content/error/search-error";
import { useSearchInput } from "../_hooks/use-search-input";
import { SearchGrid } from "./search-content/search-grid/search-grid";
import { SearchTypeFilterKey, SEARCH_TYPE_FILTER } from "@/lib/api/search/common";

export function TopSearchList() {

  const [typeFilter, setTypeFilter] = useState<SearchTypeFilterKey>("ALL");
  const { searchValue, isDebouncing, onDebouncingChange, onDebouncedChange } = useSearchInput();
  const { data: topSearch, error, refetch } = useSearchList(searchValue, typeFilter);

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
      {searchValue.length < 2 && !isDebouncing && <>
        <h2 className="font-medium text-sm text-gray-500">Please type at least 2 characters. The results will start displaying here immediately.</h2>
        <h2>Most popular searches</h2>
      </>}
      <main className="flex flex-col gap-2">
        {isDebouncing ? (
          <SkeletonSearch />
        ) : error ? (
          <SearchError
            error={error}
            onRetry={refetch}
          />
        ) : topSearch.length === 0 ? (
          <EmptySearch />
        ) : (
          <SearchGrid data={topSearch} />
        )}
      </main>
    </div>
  );
}
