import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xs border px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-accent text-canvas hover:bg-ink",
  secondary:
    "border-line bg-transparent text-ink hover:border-muted hover:bg-surface",
};

function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, className)}
      {...props}
    />
  );
}

type ButtonLinkBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type InternalButtonLinkProps = ButtonLinkBaseProps & {
  href: LinkProps["href"];
  external?: false;
};

type ExternalButtonLinkProps = ButtonLinkBaseProps & {
  href: string;
  external: true;
};

export type ButtonLinkProps = InternalButtonLinkProps | ExternalButtonLinkProps;

export function ButtonLink(props: ButtonLinkProps) {
  const { children, variant = "primary", className, onClick } = props;

  if (props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles(variant, className)}
        onClick={onClick}
      >
        {children}
        <ExternalLinkIcon className="size-3.5" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link
      href={props.href}
      className={buttonStyles(variant, className)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
