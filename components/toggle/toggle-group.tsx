"use client";

import { createContext } from "react";
import { cn } from "@/lib/utils";

export interface ToggleGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(
  null
);

interface ToggleGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function ToggleGroup({
  value,
  onValueChange,
  children,
  className = "",
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange }}>
      <div
        role="radiogroup"
        className={cn("flex flex-wrap gap-2", className)}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}
