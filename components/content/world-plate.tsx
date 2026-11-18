import { ChunkMark } from "@/components/brand/chunk-mark";
import { cn } from "@/lib/cn";

type WorldPlateProps = {
  className?: string;
};

/**
 * A text-led brand plate standing in for authentic world imagery. The plate is
 * decorative, so the surrounding copy carries the meaning for assistive tech.
 */
export function WorldPlate({ className }: WorldPlateProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border border-line bg-surface",
        className,
      )}
    >
      <div className="flex aspect-[4/3] flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="type-data text-muted">DarkSMP / Java</p>
          <ChunkMark className="size-4 shrink-0 text-muted" />
        </div>

        <div className="relative my-6 flex flex-1 items-center justify-center">
          <ChunkMark className="size-24 text-muted/30 sm:size-32 lg:size-40" />
          <ChunkMark className="absolute size-10 translate-x-14 translate-y-14 text-accent sm:size-12 sm:translate-x-16 sm:translate-y-16 lg:size-14" />
        </div>

        <div className="border-t border-line pt-4">
          <p className="type-small text-muted">Java Survival SMP</p>
          <p className="mt-1 type-h3">One shared world.</p>
        </div>
      </div>
    </div>
  );
}
