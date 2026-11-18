import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { TextLink } from "@/components/ui/text-link";
import { navigationLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-4 max-w-sm type-small text-muted">
              {siteConfig.tagline}
            </p>
            <p className="mt-2 type-small text-muted">
              {siteConfig.server.compatibility}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="type-small font-medium text-ink">Explore</p>
            <ul className="mt-4 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <TextLink
                    href={link.href}
                    variant="quiet"
                    className="type-small"
                  >
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="type-small font-medium text-ink">Server</p>
            <p className="mt-4 break-all font-mono text-sm text-muted">
              {siteConfig.server.address}
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <ButtonLink href="/#join" variant="secondary" className="w-full sm:w-auto">
                Join the server
              </ButtonLink>
              <TextLink
                href={siteConfig.links.discord}
                external
                variant="quiet"
                className="type-small"
              >
                Discord
              </TextLink>
            </div>
          </div>
        </div>

        <Divider className="my-8" />

        <div className="flex flex-col gap-3 type-caption text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DarkSMP. All rights reserved.</p>
          <p>Not affiliated with Mojang Studios or Microsoft.</p>
        </div>
      </Container>
    </footer>
  );
}
