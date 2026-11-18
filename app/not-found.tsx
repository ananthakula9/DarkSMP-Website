import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <PageIntro
          title="Page not found"
          description="The page you were looking for does not exist or has moved."
        />

        <Section>
          <Container>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/">Back to home</ButtonLink>
              <TextLink href="/community" className="type-small">
                Community
              </TextLink>
              <TextLink href="/rules" className="type-small">
                Rules
              </TextLink>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
