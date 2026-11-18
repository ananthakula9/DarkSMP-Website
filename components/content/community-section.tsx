import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type CommunitySectionProps = {
  id?: string;
  headingId?: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
};

export function CommunitySection({
  id,
  headingId,
  heading = "Community",
  description = "DarkSMP's community is on Discord. Use the invite to join.",
  buttonLabel = "Join Discord",
}: CommunitySectionProps) {
  return (
    <Section id={id} divider className="scroll-mt-8 bg-surface">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <h2 id={headingId} className="scroll-mt-8 type-h2">
              {heading}
            </h2>
            <p className="mt-4 max-w-xl type-body text-muted">
              {description}
            </p>
          </div>
          <div className="md:col-span-5 md:flex md:justify-end">
            <ButtonLink href={siteConfig.links.discord} external>
              {buttonLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
