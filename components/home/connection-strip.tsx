import { Container } from "@/components/layout/container";
import { CopyServerAddress } from "@/components/server/copy-server-address";
import { ServerStatusDisplay } from "@/components/server/server-status-display";
import { siteConfig } from "@/lib/site";

export function ConnectionStrip() {
  return (
    <section
      aria-labelledby="connection-heading"
      className="border-b border-line bg-surface"
    >
      <h2 id="connection-heading" className="sr-only">
        Server connection
      </h2>
      <Container>
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-[1.5fr_0.6fr_1fr_auto]">
          <div className="bg-surface p-5 md:p-6">
            <p className="home-eyebrow text-muted">Server address</p>
            <p className="mt-2 break-all font-mono text-[0.9375rem] tracking-[-0.02em] text-ink lg:text-base">
              {siteConfig.server.address}
            </p>
          </div>

          <div className="bg-surface p-5 md:p-6">
            <p className="home-eyebrow text-muted">Edition</p>
            <p className="mt-2 text-sm font-medium text-ink">Java Edition</p>
          </div>

          <div className="bg-surface p-5 md:p-6">
            <p className="home-eyebrow text-muted">Live status</p>
            <div className="mt-2">
              <ServerStatusDisplay />
            </div>
          </div>

          <div className="flex items-center bg-surface p-5 md:p-6">
            <CopyServerAddress
              address={siteConfig.server.address}
              buttonVariant="secondary"
              buttonClassName="uppercase tracking-[0.14em] text-[0.6875rem]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
