"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const HEADER_HEIGHT = 72;

export function HomeHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-home-hero]");

    function update() {
      const threshold = hero
        ? hero.offsetTop + hero.offsetHeight - HEADER_HEIGHT
        : HEADER_HEIGHT;

      setSolid(window.scrollY >= threshold);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-line bg-canvas"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Wordmark />

        <div className="hidden items-center gap-8 md:flex">
          <PrimaryNav />
          <ButtonLink
            href="/#join"
            className="px-4 text-[0.6875rem] tracking-[0.14em] uppercase"
          >
            Join server
          </ButtonLink>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
