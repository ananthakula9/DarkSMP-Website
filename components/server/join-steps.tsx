import { siteConfig } from "@/lib/site";

export function JoinSteps() {
  return (
    <ol className="border-t border-line">
      <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-5 sm:gap-6 sm:py-6">
        <span aria-hidden="true" className="type-data text-muted">
          01
        </span>
        <div>
          <h3 className="type-h3">Open Minecraft: Java Edition.</h3>
          <p className="mt-2 type-body text-muted">
            DarkSMP is a Java Edition server.
          </p>
        </div>
      </li>

      <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-5 sm:gap-6 sm:py-6">
        <span aria-hidden="true" className="type-data text-muted">
          02
        </span>
        <div>
          <h3 className="type-h3">Add the server address.</h3>
          <p className="mt-2 type-body text-muted">Enter it in Minecraft:</p>
          <p className="mt-3 break-words type-data text-ink">
            {siteConfig.server.host}
            <wbr />:{siteConfig.server.port}
          </p>
        </div>
      </li>

      <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-5 sm:gap-6 sm:py-6">
        <span aria-hidden="true" className="type-data text-muted">
          03
        </span>
        <div>
          <h3 className="type-h3">Connect.</h3>
          <p className="mt-2 type-body text-muted">
            {siteConfig.server.hosting} servers can sleep when empty. If DarkSMP
            is offline, try again later or check the Discord.
          </p>
        </div>
      </li>
    </ol>
  );
}
