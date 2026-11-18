import { ChunkMark } from "@/components/brand/chunk-mark";
import { CopyServerAddress } from "@/components/server/copy-server-address";
import { ServerStatusDisplay } from "@/components/server/server-status-display";
import { Divider } from "@/components/ui/divider";
import { siteConfig } from "@/lib/site";

type JoinPanelProps = {
  headingLevel?: "h2" | "h3";
};

export function JoinPanel({ headingLevel = "h2" }: JoinPanelProps) {
  const Heading = headingLevel;

  return (
    <div id="join" className="border border-line bg-surface p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Heading className="type-h3">Server address</Heading>
          <p className="mt-2 type-small text-muted">
            {siteConfig.server.edition}
          </p>
        </div>
        <ChunkMark className="size-8 shrink-0 text-muted" />
      </div>

      <p className="mt-8 break-all font-mono text-sm tracking-[-0.02em] text-ink lg:text-xl">
        {siteConfig.server.address}
      </p>

      <div className="mt-5">
        <CopyServerAddress address={siteConfig.server.address} />
      </div>

      <Divider className="my-6" />

      <p className="type-small text-muted">Live status</p>
      <div className="mt-3">
        <ServerStatusDisplay />
      </div>
    </div>
  );
}
