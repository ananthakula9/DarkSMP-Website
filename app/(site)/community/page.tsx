import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Community",
  description:
    "Join the DarkSMP Discord to ask questions, appeal a punishment, or talk with other players.",
  path: "/community",
});

const discordSteps = [
  {
    title: "Open the invite.",
    description: "Use the Join Discord button on this page.",
  },
  {
    title: "Accept it in Discord.",
    description: "Sign in if Discord asks, then accept the DarkSMP invite.",
  },
  {
    title: "Join the conversation.",
    description:
      "Ask a question, appeal a punishment, or talk with other players.",
  },
] as const;

export default function CommunityPage() {
  return (
    <>
      <PageIntro
        title="Community"
        description="DarkSMP's community is on Discord. Use the invite to ask questions, appeal a punishment, or talk with other players."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <TextLink href="/rules" className="type-small">
            Read the server rules
          </TextLink>
          <TextLink href="/world" className="type-small">
            Server details
          </TextLink>
        </div>
      </PageIntro>

      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-10">
            <div className="min-w-0 md:col-span-6">
              <h2 className="type-h2">Discord</h2>
              <p className="mt-4 max-w-md type-lead text-muted">
                The DarkSMP Discord is the community space outside the game.
              </p>
              <p className="mt-4 max-w-md type-body text-muted">
                Use it to ask a question, appeal a punishment, or talk with
                other players.
              </p>
            </div>

            <div className="min-w-0 md:col-span-6">
              <div className="border border-line bg-surface p-6">
                <p className="type-small text-muted">Discord invite</p>
                <p className="mt-3 break-all font-mono text-sm tracking-[-0.02em] text-ink">
                  {siteConfig.links.discord}
                </p>
                <ButtonLink
                  href={siteConfig.links.discord}
                  external
                  className="mt-6 w-full sm:w-auto"
                >
                  Join Discord
                </ButtonLink>
                <p className="mt-3 type-small text-muted">
                  Opens Discord in a new tab.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section divider>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <h2 className="type-h2">Joining Discord</h2>
              <p className="mt-4 max-w-xs type-body text-muted">
                Three steps from the invite to the conversation.
              </p>
            </div>

            <div className="md:col-span-8">
              <ol className="border-t border-line">
                {discordSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-5 sm:gap-6 sm:py-6"
                  >
                    <span
                      aria-hidden="true"
                      className="type-data text-muted"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="type-h3">{step.title}</h3>
                      <p className="mt-2 type-body text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
