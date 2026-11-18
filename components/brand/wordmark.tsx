import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  className?: string;
  onClick?: () => void;
};

export function Wordmark({ className, onClick }: WordmarkProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="DarkSMP home"
      className={cn(
        "inline-flex shrink-0 items-center gap-3 text-ink",
        className,
      )}
    >
      <Image
        src="/images/darksmp-logo.png"
        alt=""
        width={49}
        height={43}
        className="h-9 w-auto rounded-md"
      />
      <span
        aria-hidden="true"
        className="text-[0.9375rem] font-medium tracking-[0.08em]"
      >
        DARKSMP
      </span>
    </Link>
  );
}
