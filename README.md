# DarkSMP

Website for DarkSMP, a Java Edition survival multiplayer server.

The project is at the end of **Phase 6: Final Engineering, Design, Accessibility, Performance, SEO, Security, and Deployment-Readiness Audit**. The homepage has since been redesigned as an art-directed Minecraft landing page and is awaiting visual approval. The redesign is homepage-only; World, Rules, and Community retain the approved Phase 6 design. No production deployment, commit, or push has been performed. Store content remains deferred.

## Stack

- Next.js 16 App Router
- React 19
- Strict TypeScript
- Tailwind CSS 4
- Self-hosted Geist variable fonts
- Server Components by default; client JavaScript only for the mobile navigation dialog, live status, copy action, and active navigation state

No UI kit, animation library, icon package, analytics package, cookie banner, auth system, database, or global state library is used.

## Requirements

- Node.js 26 or newer (`.nvmrc` pins `26`; `package.json` requires `>=26.0.0`)
- npm 11 (`packageManager` is `npm@11.20.0`)

## Setup

```bash
npm install
npm run dev
```

Local URL: `http://localhost:3000`

The site runs without an environment file because the site URL falls back to localhost. To configure a different origin, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.

## Scripts

```bash
npm run dev        # Start the development server
npm run build      # Production build
npm run start      # Serve the production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting
```

There is no checked-in test script. See [Verification](#verification).

## Environment variables

| Name | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public site origin used for canonical URLs, Open Graph and Twitter URLs, `sitemap.xml`, and `robots.txt`. Falls back to `http://localhost:3000`. |

Example:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
```

Set the value to a bare origin with no path, query, or trailing slash. `lib/site-url.ts` normalizes it with `new URL(...).origin`.

This value is read while the site is built. Set it before `npm run build` and rebuild after changing it.

No secrets are required. `NEXT_PUBLIC_*` values are public by definition, so never place credentials in this variable. `.env*` files are ignored by Git except `.env.example`.

## Server configuration

Confirmed brand and server information lives in `lib/site.ts`:

- Server host and port, combined into the copied address
- Mode, edition, hosting, and compatibility statements
- Discord invite URL
- Site name, tagline, and description

Changing the host or port there also changes the copied address and, when the status override is disabled, the provider target. If the status provider is replaced, preserve the normalized `ServerStatus` contract in `lib/server-status-types.ts`.

## Server status

The public status is intentionally pinned to **Online** by owner decision, even while the Aternos server is sleeping. This is a presentation override, not a live availability reading.

`SERVER_STATUS_ALWAYS_ONLINE` in `lib/server-status.ts` short-circuits `/api/status` before any provider request. The response keeps the `ServerStatus` contract:

- `state` — `"online"`
- `players` — `null`, because no live count is known
- `version` — `null`, because no live version is known
- `checkedAt` — the current server timestamp

All status consumers — the homepage hero, connection strip, and World page — call the same `/api/status` endpoint, so they all show Online. Player counts and versions are never invented.

The contract in `lib/server-status-types.ts` still supports `online`, `offline`, `unavailable`, and `unconfigured`.

### Restoring provider-backed status

Set `SERVER_STATUS_ALWAYS_ONLINE` to `false`. The API then queries `https://api.mcsrvstat.us/3/<host>:<port>` on the server and returns one of four states:

- `online` — the provider reports a live server; player counts and version are shown only when valid
- `offline` — the server is offline, including a sleeping Aternos server
- `unavailable` — the provider failed, timed out, or returned malformed data
- `unconfigured` — no host or port is configured; the provider is not called

Behavior in either mode:

- The response uses `Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate=120`.
- The browser calls only `/api/status`, never the provider directly.
- The client refreshes every 60 seconds and when the tab becomes visible again, with a 10-second request timeout.
- With the override disabled, the provider request uses `revalidate: 60`, a descriptive `User-Agent`, and a 4.5-second server-side timeout.
- With the override disabled, a sleeping Aternos server answers status pings with a placeholder, which can make the provider report `online: true`. The normalizer detects the offline MOTD, offline version marker, or non-positive protocol and reports `offline`.
- Provider failures are deliberately not displayed as invented player counts, versions, or online indicators.

## Routes

- `/` — homepage: full-bleed image hero, live connection strip, world feature, three-step join process, forest-green Discord section, and final copy-address section
- `/world` — confirmed server and connection reference, join steps, and Discord link
- `/rules` — published rules, punishments, final rule, and Discord appeals/contact
- `/community` — Discord invite, reasons to join, and joining steps
- `/api/status` — server status endpoint (currently pinned to Online by owner decision)
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg` — generated metadata assets
- Unknown paths — the custom 404 page

The sitemap includes `/`, `/world`, `/rules`, and `/community`. The store is intentionally absent until a real store exists.

## Metadata and SEO

- The root layout sets the title template, description, application name, and social metadata.
- Every indexable page sets its own title, description, canonical path, Open Graph metadata, and Twitter metadata.
- `app/opengraph-image.tsx` generates a 1200 × 630 PNG at `/opengraph-image`. The homepage uses the file convention; nested pages reference the generated image explicitly because page-level `openGraph` metadata replaces the root object.
- The 404 page has its own title and description and relies on Next.js's automatic `noindex`. The root layout intentionally does not set a conflicting `robots` directive.
- `sitemap.xml` intentionally omits `lastmod` because no reliable content-modification date exists.
- `robots.txt` allows the site, disallows `/api/`, and includes the sitemap. It does not emit a `Host` directive.
- Canonical, Open Graph, sitemap, and robots URLs remain on `http://localhost:3000` until `NEXT_PUBLIC_SITE_URL` is set to the real production origin.

## Security and privacy

Headers configured in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Other safeguards:

- `X-Powered-By` is disabled.
- Discord links open in a new tab with `rel="noopener noreferrer"`.
- The browser talks only to the same-origin `/api/status` route. When the status override is disabled, that route calls the provider server-side only.
- The site makes no analytics, advertising, font-CDN, or other third-party browser requests.
- No secrets are stored in the repository or sent to the client.
- `.gitignore` excludes `.env*` except `.env.example`, `node_modules/`, `.next/`, build output, TypeScript build info, and generated Next.js types.

### CSP and HSTS

A Content Security Policy is **not enabled**. A production policy must account for Next.js hydration/bootstrap scripts. A nonce-based policy requires nonce delivery per request and dynamic rendering (or hashes for static rendering), plus deliberate handling of styles and images. Do not add `'unsafe-inline'` blindly just to make a policy pass; define and test the policy on the deployed origin first.

HSTS is **not enabled**. Enable it only after HTTPS is confirmed on the production domain. Start with a short `max-age`, then extend it and add `includeSubDomains` only when every subdomain is HTTPS-ready.

## Deployment requirements

Before deploying:

1. Supply the real production domain and set `NEXT_PUBLIC_SITE_URL` to its HTTPS origin.
2. Rebuild the site so canonical, Open Graph, Twitter, sitemap, and robots URLs use that origin.
3. Confirm the host supports Node.js, can run the dynamic `/api/status` route, and — if the status override is disabled — can make outbound HTTPS requests to `api.mcsrvstat.us`.
4. Run `npm ci`, `npm run lint`, `npm run typecheck`, and `npm run build`, then start with `npm run start`.
5. Verify `/`, `/world`, `/rules`, `/community`, a missing path (real 404), `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, and `/api/status` on the deployed origin.
6. Decide and test CSP and HSTS at the hosting or proxy layer.
7. Confirm CDN behavior matches the 60-second status cache policy.

Do not deploy while the production URLs still resolve to localhost. No deployment has been performed.

## Verification

### Homepage redesign validation

- `npm run lint` — passed
- `npm run typecheck` — passed
- `npm run build` — passed; 10 routes generated
- Production build tested in Chromium through Playwright at 320, 390, 768, 1024, 1440, and 1920 px
- No horizontal overflow at any tested width
- Hero height: 700 px at 768 px wide, 740 px at 1024 px, 760 px at 1440 px and above
- Copy-address buttons in the connection strip and final CTA copied `DARK-BR-S5.aternos.me:64666`
- Status API, live status display, nav links, Discord links, mobile navigation, Escape/focus return, header transparency-to-solid transition, anchor scrolling, canonical URL, image loading, and 404 chrome tested
- axe-core 4.14.0 WCAG 2.0/2.1/2.2 A and AA scan — 0 violations at 390 px and 1440 px
- No console errors, page errors, or failed status requests
- World, Rules, and Community pages returned 200 and retained their existing chrome

### Phase 6 validation

- `npm run lint` — passed
- `npm run typecheck` — passed
- `npm run build` — passed; 10 routes generated
- `npm audit` — 0 vulnerabilities
- Production build tested in Chromium through Playwright 1.62.1 at 320, 390, 768, 1024, 1440, and 1920 px across all four pages (24 runs)
- axe-core 4.14.0 WCAG 2.0/2.1/2.2 A and AA scan — 0 violations across 24 runs
- Keyboard, skip link, focus, mobile dialog, copy success/fallback/failure, navigation, Discord links, Rules anchors, reduced motion, 404, and all four status states tested
- No horizontal overflow, broken internal links, third-party browser requests, console errors, page errors, or failed requests in the final audit

Playwright and axe-core were used as external audit tooling; they are not project dependencies, and the harnesses are not checked in. Re-run equivalent checks after future changes.

Local performance snapshot from the production build (Playwright/Chromium, not Lighthouse):

- Mobile transfer: about 302–310 KB; desktop: about 313 KB
- JavaScript: about 145 KB transferred, 477 KB decoded across 8 requests
- CSS: about 7.7 KB transferred, 34.7 KB decoded
- Self-hosted fonts: about 141 KB total
- FCP/LCP: about 280–376 ms; CLS: 0–0.0108
- `/api/status` cache hit: about 6–10 ms
- No external origins requested

These are local-lab measurements, not field data or Lighthouse scores.

### Manual testing still required

- Screen-reader checks with VoiceOver, NVDA, or JAWS
- Real iOS and Android device checks, including clipboard behavior and the mobile navigation dialog
- Production CDN and cache behavior
- HTTPS, CSP, and HSTS validation on the final host

## Known limitations

- The public status is pinned to Online by owner decision. It does not report the Aternos server's actual availability and can show Online while the server is sleeping.
- Provider-backed status remains implemented behind the override. If it is re-enabled, live status depends on the free third-party mcsrvstat service; outages, rate limits, or contract changes surface as `unavailable`.
- Aternos servers sleep when empty. With the override disabled, `offline` can mean sleeping rather than permanently shut down, and the UI states this.
- The production domain is undecided, so canonical, social, sitemap, and robots URLs point at localhost until `NEXT_PUBLIC_SITE_URL` is configured and the site is rebuilt.
- The homepage uses an owner-supplied Minecraft image, not a confirmed screenshot of the DarkSMP world. The UI labels the image accordingly. The source is 1200 × 750, so large screens upscale and crop it; a higher-resolution owner-supplied screenshot would be required for a sharper 1920 px hero.
- The World page still uses the decorative chunk plate. Authentic DarkSMP screenshots can replace it when they are supplied.
- There is no checked-in automated test suite. The Phase 6 and homepage Playwright/axe harnesses were external tools.
- No Content Security Policy or HSTS header is enabled yet.
- There is no store, payment flow, authentication, database, or Bedrock support.
- The footer copyright year is rendered from the current date, but content and rules still need review when real information changes.

## Content rules

Only confirmed DarkSMP information is published. Do not add invented gameplay features, world generation, builds, shops, economies, PvP claims, events, player counts, ranks, staff, testimonials, server history, store products, or supported Minecraft versions. ViaVersion and ViaBackwards are installed, but the site does not claim that every Minecraft version is supported.

The homepage image is a supplied Minecraft scene, not evidence of the DarkSMP world. Keep its caption and do not present it as a DarkSMP screenshot. The World page is intentionally limited to connection facts and can use authentic DarkSMP screenshots when they are supplied.

The Rules page publishes only the approved rule set. Do not add punishment durations, staff names, a dedicated appeals channel, or a last-updated date unless a real date is supplied.

## Fonts

Geist Sans and Geist Mono are self-hosted from variable WOFF2 files in `app/fonts`. The license is included at `app/fonts/Geist-OFL.txt`.

## Project layout

- `app/(home)/` — redesigned homepage and its transparent header layout
- `app/(site)/` — World, Rules, and Community routes with the shared Phase 6 site chrome
- `app/` — root layout, global styles, metadata assets, status API, fonts
- `components/home/` — homepage header and connection strip
- `components/` — shared layout, content, server, brand, and UI components
- `lib/` — confirmed site data, navigation, rules, metadata helpers, status contract and provider normalization
- `public/images/minecraft-night-lanterns.jpg` — owner-supplied Minecraft image used by the homepage

The route groups keep the homepage's forest palette, transparent hero header, and landing-page layout from changing the subpages. Both groups use the same root document, skip link, header/footer components, status API, and confirmed site data.

## Status

Phase 6 is complete pending approval. The homepage redesign is implemented with the status display pinned Online by owner decision, and it is awaiting visual approval. No commit, push, deployment, domain purchase, or external service change has been made.
