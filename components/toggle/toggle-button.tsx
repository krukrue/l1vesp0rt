"use client";

import { useContext } from "react";
import { ToggleGroupContext } from "./toggle-group";
import { cn } from "@/lib/utils";

interface ToggleButtonProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function ToggleButton({ value, children, className = "" }: ToggleButtonProps) {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error("ToggleButton have to be used with ToggleGroup component");
  }

  const { value: selectedValue, onValueChange } = context;
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onValueChange(value)}
      className={cn("rounded-lg border px-3 py-2 text-sm font-medium transition-colors", isSelected ?
         "border-gray-300 bg-white text-gray-700 hover:bg-gray-100" : 
         "border-gray-900 bg-gray-900 text-white", className)}
    >
      {children}
    </button>
  );
}
