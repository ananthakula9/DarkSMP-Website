import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Fact = {
  label: string;
  value: ReactNode;
  mono?: boolean;
};

type FactListProps = {
  items: readonly Fact[];
  className?: string;
};

export function FactList({ items, className }: FactListProps) {
  return (
    <dl className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 border-b border-line py-5 sm:grid-cols-12 sm:gap-6"
        >
          <dt className="type-small text-muted sm:col-span-4">{item.label}</dt>
          <dd
            className={cn(
              "type-body sm:col-span-8",
              item.mono && "type-data break-all",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
