import "server-only";

import { siteConfig } from "@/lib/site";
import type {
  ServerPlayerCount,
  ServerStatus,
} from "@/lib/server-status-types";

const STATUS_ENDPOINT = `https://api.mcsrvstat.us/3/${siteConfig.server.host}:${siteConfig.server.port}`;
const STATUS_TIMEOUT_MS = 4_500;
const STATUS_REVALIDATE_SECONDS = 60;
const STATUS_USER_AGENT = "DarkSMPWebsite/1.0 (Minecraft server status check)";

/**
 * Owner decision: the public status is intentionally pinned to Online, even
 * while the Aternos server is sleeping. Player counts and versions are omitted
 * rather than invented. Set this to false to restore provider-backed status.
 */
const SERVER_STATUS_ALWAYS_ONLINE = true;

const unavailableStatus: ServerStatus = {
  state: "unavailable",
  players: null,
  version: null,
  checkedAt: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readPlayerCount(value: unknown): ServerPlayerCount | null {
  if (!isRecord(value)) {
    return null;
  }

  const { online, max } = value;

  if (
    typeof online !== "number" ||
    !Number.isInteger(online) ||
    online < 0
  ) {
    return null;
  }

  return {
    online,
    max:
      typeof max === "number" && Number.isInteger(max) && max >= online
        ? max
        : null,
  };
}

function readVersion(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  // Strip Minecraft formatting codes and collapse whitespace before exposing
  // the version through the API.
  const version = value.replace(/\u00a7./g, "").trim().replace(/\s+/g, " ");

  return version.length > 0 && version.length <= 64 ? version : null;
}

function readProtocolVersion(value: unknown): number | null {
  if (!isRecord(value) || typeof value.version !== "number") {
    return null;
  }

  return Number.isInteger(value.version) ? value.version : null;
}

function readMotdLines(value: unknown): string {
  if (!isRecord(value) || !Array.isArray(value.clean)) {
    return "";
  }

  return value.clean
    .filter((line): line is string => typeof line === "string")
    .join(" ");
}

/**
 * A sleeping Aternos server still answers status pings with a placeholder
 * response. mcsrvstat therefore reports `online: true` even though the server
 * cannot be joined. Detect that placeholder so it is never shown as online.
 */
function isSleepingPlaceholder(payload: Record<string, unknown>): boolean {
  const motd = readMotdLines(payload.motd);
  const protocolVersion = readProtocolVersion(payload.protocol);
  const version = readVersion(payload.version);

  if (/this server is offline/i.test(motd)) {
    return true;
  }

  // mcsrvstat labels sleeping Aternos servers with an offline version marker.
  if (version !== null && /\boffline\b/i.test(version)) {
    return true;
  }

  // A joinable Java server advertises a positive protocol version. A value of
  // zero or below means the ping came from a placeholder, not a live server.
  return protocolVersion !== null && protocolVersion <= 0;
}

export async function getServerStatus(): Promise<ServerStatus> {
  if (SERVER_STATUS_ALWAYS_ONLINE) {
    return {
      state: "online",
      players: null,
      version: null,
      checkedAt: new Date().toISOString(),
    };
  }

  if (!siteConfig.server.host || !siteConfig.server.port) {
    return {
      state: "unconfigured",
      players: null,
      version: null,
      checkedAt: null,
    };
  }

  try {
    const response = await fetch(STATUS_ENDPOINT, {
      headers: {
        Accept: "application/json",
        "User-Agent": STATUS_USER_AGENT,
      },
      next: {
        revalidate: STATUS_REVALIDATE_SECONDS,
      },
      signal: AbortSignal.timeout(STATUS_TIMEOUT_MS),
    });

    if (!response.ok) {
      return unavailableStatus;
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || typeof payload.online !== "boolean") {
      return unavailableStatus;
    }

    const checkedAt = new Date().toISOString();
    const version = readVersion(payload.version);

    if (!payload.online || isSleepingPlaceholder(payload)) {
      return {
        state: "offline",
        players: null,
        version: null,
        checkedAt,
      };
    }

    return {
      state: "online",
      players: readPlayerCount(payload.players),
      version,
      checkedAt,
    };
  } catch {
    return unavailableStatus;
  }
}
