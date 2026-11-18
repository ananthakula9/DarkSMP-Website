import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConnectionStrip } from "@/components/home/connection-strip";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CopyServerAddress } from "@/components/server/copy-server-address";
import { ServerStatusDisplay } from "@/components/server/server-status-display";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const heroImage = {
  src: "/images/minecraft-night-lanterns.jpg",
  alt: "A Minecraft build at night, with glowing lanterns, vines, and a pond",
} as const;

const joinSteps = [
  {
    number: "01",
    title: "Open Minecraft Java Edition.",
    description:
      "DarkSMP is Java Edition only. Launch the game and open Multiplayer.",
  },
  {
    number: "02",
    title: "Add the server address.",
    description:
      "Paste it into Add Server in Minecraft: Java Edition.",
  },
  {
    number: "03",
    title: "Connect when the server is online.",
    description:
      "Aternos servers can sleep when empty. Check the live status before you connect.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section
        data-home-hero
        className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-canvas pt-28 pb-12 md:min-h-[700px] md:pt-32 md:pb-16 lg:min-h-[740px] lg:pb-20 xl:min-h-[760px]"
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[62%_50%] md:object-[56%_46%]"
        />
        <div aria-hidden="true" className="home-hero-scrim absolute inset-0" />

        <Container className="relative">
          <div className="max-w-[54rem]">
            <p className="home-eyebrow flex items-center gap-3 text-ink/70">
              <span aria-hidden="true" className="h-px w-8 bg-torch" />
              Java Edition · Survival SMP
            </p>

            <h1 className="home-display mt-6 text-ink">
              <span className="block">Your next world</span>
              <span className="block text-torch">starts here.</span>
            </h1>

            <p className="mt-7 max-w-lg type-lead text-ink/75">
              A Java Edition Survival SMP. Find your place in the world and make
              it your own.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#join" className="home-cta">
                Join server
              </ButtonLink>
              <ButtonLink
                href={siteConfig.links.discord}
                external
                variant="secondary"
                className="home-cta border-ink/30 bg-canvas/25 hover:border-ink/60 hover:bg-surface"
              >
                Join Discord
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-wrap items-start gap-x-10 gap-y-5 border-t border-ink/15 pt-5 lg:mt-14">
              <div>
                <p className="home-eyebrow text-ink/50">Server address</p>
                <p className="mt-2 break-all font-mono text-sm tracking-[-0.02em] text-ink sm:text-base">
                  {siteConfig.server.address}
                </p>
              </div>

              <div className="border-ink/15 sm:border-l sm:pl-10">
                <p className="home-eyebrow text-ink/50">Live status</p>
                <div className="mt-2">
                  <ServerStatusDisplay compact />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <p className="pointer-events-none absolute right-6 bottom-4 z-10 hidden text-[0.625rem] tracking-[0.18em] text-ink/35 uppercase lg:block">
          Minecraft imagery supplied by the server owner
        </p>
      </section>

      <ConnectionStrip />

      <Section className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <figure className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden bg-raised">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-[58%_56%]"
                />
              </div>
              <figcaption className="mt-4 flex flex-col gap-1 border-b border-line pb-4 text-[0.6875rem] tracking-[0.12em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between">
                <span>Owner-supplied Minecraft imagery</span>
                <span>Not a screenshot of the DarkSMP world</span>
              </figcaption>
            </figure>

            <div className="lg:col-span-5">
              <p className="home-eyebrow flex items-center gap-3 text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-torch" />
                The world
              </p>
              <h2 className="home-h2 mt-5">A world worth coming back to.</h2>
              <p className="mt-6 max-w-md type-body text-muted">
                DarkSMP is a Java Edition Survival SMP. Connect, explore, and
                build your place in the world.
              </p>
              <Link
                href="/world"
                className="group mt-9 inline-flex items-center gap-3 border-b border-line pb-2 text-xs font-medium tracking-[0.18em] text-ink uppercase transition-colors duration-150 hover:border-torch"
              >
                Explore the world
                <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="home-eyebrow flex items-center gap-3 text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-torch" />
                How to join
              </p>
              <h2 className="home-h2 mt-5">Three steps into the world.</h2>
            </div>
            <p className="max-w-sm type-body text-muted lg:col-span-4 lg:col-start-9">
              Java Edition only. The server can sleep when no one is online, so
              check its status before connecting.
            </p>
          </div>

          <ol className="mt-14 grid border-t border-line md:mt-16 md:grid-cols-3">
            {joinSteps.map((step, index) => (
              <li
                key={step.number}
                className="border-b border-line py-8 md:border-r md:border-b-0 md:px-7 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:px-9"
              >
                <span
                  aria-hidden="true"
                  className="home-step-number block text-muted/60"
                >
                  {step.number}
                </span>
                {index === 1 ? (
                  <h3 className="mt-10 max-w-xs text-[1.35rem] leading-tight font-medium tracking-[-0.02em] md:mt-14">
                    Add{" "}
                    <span className="font-mono text-[0.8em] tracking-[-0.04em] break-all">
                      {siteConfig.server.address}
                    </span>
                    .
                  </h3>
                ) : (
                  <h3 className="mt-10 max-w-xs text-[1.35rem] leading-tight font-medium tracking-[-0.02em] md:mt-14">
                    {step.title}
                  </h3>
                )}
                <p className="mt-3 max-w-xs type-small text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <section className="bg-forest py-20 md:py-28 lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <p className="home-eyebrow flex items-center gap-3 text-ink/65">
                <span aria-hidden="true" className="h-px w-8 bg-torch" />
                Community · Discord
              </p>
              <h2 className="home-h2 mt-5 max-w-4xl text-ink">
                The world doesn&rsquo;t end when you log out.
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="max-w-sm type-body text-ink/75">
                Join the DarkSMP Discord to connect with the server community
                and keep in touch.
              </p>
              <ButtonLink
                href={siteConfig.links.discord}
                external
                className="home-cta mt-8"
              >
                Join Discord
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section id="join" className="scroll-mt-24 bg-canvas">
        <Container className="py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="home-eyebrow text-muted">Ready when you are</p>
            <h2 className="home-final mt-6">Your adventure starts here.</h2>

            <div className="mt-12 border-y border-line py-7 sm:py-8">
              <p className="home-eyebrow text-muted">Server address</p>
              <p className="mt-3 font-mono text-lg tracking-[-0.03em] text-ink sm:text-2xl lg:text-3xl">
                <span className="whitespace-nowrap">{siteConfig.server.host}:</span><wbr /><span className="whitespace-nowrap">{siteConfig.server.port}</span>
              </p>
              <CopyServerAddress
                address={siteConfig.server.address}
                className="mt-6 items-center"
                buttonClassName="w-full sm:w-auto home-cta"
              />
            </div>

            <p className="mt-6 type-small text-muted">
              Java Edition only. Aternos servers may sleep when empty.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
