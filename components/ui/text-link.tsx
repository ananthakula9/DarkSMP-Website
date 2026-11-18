import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type TextLinkVariant = "default" | "quiet";

type TextLinkBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: TextLinkVariant;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type InternalTextLinkProps = TextLinkBaseProps & {
  href: LinkProps["href"];
  external?: false;
};

type ExternalTextLinkProps = TextLinkBaseProps & {
  href: string;
  external: true;
};

type TextLinkProps = InternalTextLinkProps | ExternalTextLinkProps;

const textLinkBase =
  "inline-flex items-center gap-1.5 transition-colors duration-150";

const textLinkVariants: Record<TextLinkVariant, string> = {
  default:
    "text-ink underline decoration-line underline-offset-4 hover:decoration-muted",
  quiet: "text-muted no-underline hover:text-ink hover:underline",
};

export function TextLink(props: TextLinkProps) {
  const { children, className, variant = "default", onClick } = props;

  if (props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(textLinkBase, textLinkVariants[variant], className)}
        onClick={onClick}
      >
        {children}
        <ExternalLinkIcon className="size-3.5 shrink-0" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link
      href={props.href}
      className={cn(textLinkBase, textLinkVariants[variant], className)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
