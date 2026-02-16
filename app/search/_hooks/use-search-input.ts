import { useCallback, useState } from "react";

export function useSearchInput() {
    const [searchValue, setSearchValue] = useState("");
    const [isDebouncing, setIsDebouncing] = useState(false);
    const onDebouncingChange = useCallback((isDebouncing: boolean) => {
      setIsDebouncing(isDebouncing);
    }, []);
  
    const onDebouncedChange = useCallback((searchValue: string) => {
      setSearchValue(searchValue);
    }, []);

    return { searchValue, isDebouncing, onDebouncingChange, onDebouncedChange };
}