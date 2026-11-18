import { CommunitySection } from "@/components/content/community-section";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Section } from "@/components/layout/section";
import { createPageMetadata } from "@/lib/metadata";
import { punishmentLevels, serverRules } from "@/lib/rules";

export const metadata = createPageMetadata({
  title: "Rules",
  description:
    "Read the DarkSMP rules on respect, cheating, griefing, PvP, server stability, chat, staff decisions, and punishments.",
  path: "/rules",
});

type ContentEntry = {
  id: string;
  label: string;
  number?: string;
};

const contents: readonly ContentEntry[] = [
  ...serverRules.map((rule) => ({
    id: rule.id,
    label: rule.title,
    number: rule.number,
  })),
  { id: "punishments", label: "Punishments" },
  { id: "final-rule", label: "Final rule" },
  { id: "appeals", label: "Appeals and contact" },
];

export default function RulesPage() {
  return (
    <>
      <PageIntro
        title="Rules"
        description="DarkSMP is a shared survival world. These rules keep it fair, respectful, and playable. Read them before you connect."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:sticky lg:top-8 lg:col-span-3 lg:self-start">
              <nav aria-labelledby="contents-heading">
                <h2
                  id="contents-heading"
                  className="type-small font-medium text-ink"
                >
                  Contents
                </h2>
                <ul className="mt-4 border-t border-line">
                  {contents.map((item) => (
                    <li key={item.id} className="border-b border-line">
                      <a
                        href={`#${item.id}`}
                        className="group flex min-h-11 items-start gap-3 py-2.5 text-muted transition-colors duration-150 hover:text-ink"
                      >
                        <span
                          aria-hidden="true"
                          className="type-data w-6 shrink-0"
                        >
                          {item.number ?? ""}
                        </span>
                        <span className="type-small pt-1">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <ol className="border-t border-line">
                {serverRules.map((rule) => (
                  <li key={rule.id} className="border-b border-line">
                    <section
                      id={rule.id}
                      aria-labelledby={`${rule.id}-title`}
                      className="scroll-mt-8 py-9 sm:py-11"
                    >
                      <div className="grid gap-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-5">
                        <span
                          aria-hidden="true"
                          className="type-data text-muted sm:pt-1.5"
                        >
                          {rule.number}
                        </span>
                        <div className="min-w-0">
                          <h2
                            id={`${rule.id}-title`}
                            className="type-h2 max-w-xl"
                          >
                            {rule.title}
                          </h2>
                          <ul className="mt-5 max-w-xl list-disc space-y-2.5 pl-5 type-body text-muted marker:text-muted">
                            {rule.points.map((point) => (
                              <li key={point} className="pl-1">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section divider className="bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <h2 id="punishments" className="scroll-mt-8 type-h2">
                Punishments
              </h2>
            </div>

            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <p className="max-w-2xl type-lead text-muted">
                Depending on the severity and frequency of the violation, staff
                may issue:
              </p>

              <ol className="mt-8 max-w-2xl border-t border-line">
                {punishmentLevels.map((level, index) => (
                  <li
                    key={level}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="type-data text-muted"
                    >
                      {index + 1}
                    </span>
                    <span className="type-body text-ink">{level}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-6 max-w-2xl type-body text-muted">
                Serious cheating, exploitation, harassment, or repeated
                rule-breaking may result in stronger punishment. Staff should
                consider the evidence and circumstances.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section divider>
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <h2 id="final-rule" className="scroll-mt-8 type-h2">
                Final rule
              </h2>
            </div>

            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <p className="max-w-2xl type-lead text-ink">
                Use common sense, respect others, and help keep DarkSMP
                enjoyable for everyone.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CommunitySection
        headingId="appeals"
        heading="Appeals and contact"
        description="If you disagree with a punishment, appeal respectfully through Discord. Use the invite for questions about the rules or the server."
      />
    </>
  );
}
