"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { NavLink } from "@/components/ui/nav-link";
import { navigationLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }

    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex size-11 items-center justify-center border border-line text-ink md:hidden"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-nav-dialog"
        aria-label="Site navigation"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
      >
        <div className="flex min-h-dvh flex-col">
          <div className="border-b border-line">
            <div className="container-site flex h-18 items-center justify-between">
              <Wordmark onClick={close} />
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center border border-line text-ink"
                aria-label="Close navigation"
                onClick={close}
                autoFocus
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="container-site flex-1 py-10"
          >
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <NavLink
                    href={link.href}
                    onClick={close}
                    className="type-h2 w-full py-4"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <ButtonLink
                href="/#join"
                onClick={close}
                className="w-full"
              >
                Join the server
              </ButtonLink>
              <ButtonLink
                href={siteConfig.links.discord}
                external
                variant="secondary"
                className="w-full"
                onClick={close}
              >
                Join Discord
              </ButtonLink>
            </div>
          </nav>

          <div className="border-t border-line">
            <div className="container-site py-6">
              <p className="type-small text-muted">Server address</p>
              <p className="mt-1 break-all font-mono text-sm text-ink">
                {siteConfig.server.address}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
