import { CommunitySection } from "@/components/content/community-section";
import { FactList } from "@/components/content/fact-list";
import { WorldPlate } from "@/components/content/world-plate";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Section } from "@/components/layout/section";
import { JoinPanel } from "@/components/server/join-panel";
import { JoinSteps } from "@/components/server/join-steps";
import { createPageMetadata } from "@/lib/metadata";
import { serverFacts, siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "World",
  description: `DarkSMP is a Java Edition Survival SMP. Connect at ${siteConfig.server.address}, follow the join steps, and find the community on Discord.`,
  path: "/world",
});

export default function WorldPage() {
  return (
    <>
      <PageIntro
        title="World"
        description="A Java Survival SMP. The connection details and join steps are below."
      >
        <p className="type-small text-muted">
          Only confirmed details are published on this page.
        </p>
      </PageIntro>

      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
            <div className="md:col-span-6 lg:col-span-7">
              <WorldPlate />
            </div>
            <div className="md:col-span-6 lg:col-span-5">
              <h2 className="type-h2">The world</h2>
              <p className="mt-4 max-w-md type-lead text-muted">
                DarkSMP is a Java Edition Survival SMP. The world is shared by
                everyone who connects.
              </p>
              <p className="mt-4 max-w-md type-body text-muted">
                This page collects the confirmed server details and the steps to
                join.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section divider>
        <Container>
          <h2 className="type-h2">Connection</h2>
          <p className="mt-4 max-w-xl type-body text-muted">
            Use this address in Minecraft: Java Edition. The live status is read
            from the server.
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="order-2 md:order-1 md:col-span-7">
              <FactList items={serverFacts} />
            </div>
            <div className="order-1 min-w-0 md:order-2 md:col-span-5">
              <JoinPanel headingLevel="h3" />
            </div>
          </div>
        </Container>
      </Section>

      <Section divider>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <h2 className="type-h2">How to join</h2>
              <p className="mt-4 max-w-xs type-body text-muted">
                Three steps from the launcher to the server.
              </p>
            </div>
            <div className="md:col-span-8">
              <JoinSteps />
            </div>
          </div>
        </Container>
      </Section>

      <CommunitySection />
    </>
  );
}
