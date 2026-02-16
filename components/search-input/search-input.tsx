"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDebounce } from "use-debounce";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  debounceMs?: number;
  onDebouncedChange: (value: string) => void;
  /** Called when the debouncing state changes
   * true = user is typing, waiting for the value to stabilize
   * false = value has stabilized 
   */
  onDebouncingChange?: (isDebouncing: boolean) => void;
  className?: string;
}

export function SearchInput({
  debounceMs = 300,
  onDebouncedChange,
  onDebouncingChange,
  className,
  ...props
}: SearchInputProps) {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, debounceMs);

  useEffect(() => {
    onDebouncedChange(value);
  }, [value, onDebouncedChange]);

  useEffect(() => {
    onDebouncingChange?.(text !== value);
  }, [text, value, onDebouncingChange]);

  return (
    <div className="relative">
      <HiSearch
        className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400"
        aria-hidden
      />
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search..."
        className={cn(`w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3
           outline-none transition-colors placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500`, 
           className)}
        aria-label="Search"
        {...props}
      />
    </div>
  );
}
