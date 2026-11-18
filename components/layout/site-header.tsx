import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Wordmark />

        <div className="hidden items-center gap-8 md:flex">
          <PrimaryNav />
          <ButtonLink href="/#join" className="px-4">
            Join
          </ButtonLink>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
