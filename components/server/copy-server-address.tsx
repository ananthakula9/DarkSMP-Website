"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonVariant } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type CopyServerAddressProps = {
  address: string;
  className?: string;
  buttonClassName?: string;
  buttonVariant?: ButtonVariant;
};

type CopyFeedback = "idle" | "copied" | "error";

function copyWithFallback(text: string): boolean {
  const previousFocus =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export function CopyServerAddress({
  address,
  className,
  buttonClassName,
  buttonVariant = "primary",
}: CopyServerAddressProps) {
  const [feedback, setFeedback] = useState<CopyFeedback>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(address);
          copied = true;
        } catch {
          copied = copyWithFallback(address);
        }
      } else {
        copied = copyWithFallback(address);
      }

      if (!copied) {
        throw new Error("Clipboard API unavailable");
      }

      setFeedback("copied");
    } catch {
      setFeedback("error");
    }

    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }

    resetTimer.current = window.setTimeout(() => {
      setFeedback("idle");
    }, 2_500);
  }

  const label =
    feedback === "copied"
      ? "Copied"
      : feedback === "error"
        ? "Copy failed"
        : "Copy address";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        variant={buttonVariant}
        onClick={handleCopy}
        className={cn("w-full", buttonClassName)}
      >
        {feedback === "copied" ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}
        {label}
      </Button>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback === "copied"
          ? "Server address copied to clipboard."
          : feedback === "error"
            ? "Could not copy the server address. Please select it manually."
            : ""}
      </span>
    </div>
  );
}
