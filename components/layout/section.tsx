import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  divider?: boolean;
};

export function Section({
  divider = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "section-space",
        divider && "border-t border-line",
        className,
      )}
      {...props}
    />
  );
}
