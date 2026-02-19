import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  /**
   * Extensible value, styles can be added and expanded as required by the business
   * "custom" - for custom badges, no default styles are applied, use className prop for custom styles
   */
  variant: "type" | "info" | "custom";
  className?: string;
}

/**
 * Badge component to show entity labels.
 */
export function Badge({
  children,
  variant,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1",
        variant === "type" &&
          "text-xs font-semibold uppercase",
        variant === "info" &&
          "bg-white text-sm font-medium text-gray-700 shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
