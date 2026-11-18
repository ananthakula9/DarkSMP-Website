export const SERVER_STATUS_REFRESH_MS = 60_000;

export type ServerStatusState =
  | "online"
  | "offline"
  | "unavailable"
  | "unconfigured";

export type ServerPlayerCount = {
  online: number;
  max: number | null;
};

export type ServerStatus = {
  state: ServerStatusState;
  players: ServerPlayerCount | null;
  version: string | null;
  checkedAt: string | null;
};

const serverStatusStates: readonly ServerStatusState[] = [
  "online",
  "offline",
  "unavailable",
  "unconfigured",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPlayerCount(value: unknown): value is ServerPlayerCount {
  if (!isRecord(value)) {
    return false;
  }

  const { online, max } = value;

  if (
    typeof online !== "number" ||
    !Number.isInteger(online) ||
    online < 0
  ) {
    return false;
  }

  return (
    max === null ||
    (typeof max === "number" && Number.isInteger(max) && max >= online)
  );
}

export function isServerStatus(value: unknown): value is ServerStatus {
  if (!isRecord(value)) {
    return false;
  }

  const { state, players, version, checkedAt } = value;

  if (
    typeof state !== "string" ||
    !serverStatusStates.includes(state as ServerStatusState)
  ) {
    return false;
  }

  if (players !== null && !isPlayerCount(players)) {
    return false;
  }

  if (version !== null && typeof version !== "string") {
    return false;
  }

  if (
    checkedAt !== null &&
    (typeof checkedAt !== "string" || Number.isNaN(Date.parse(checkedAt)))
  ) {
    return false;
  }

  if (state !== "online" && (players !== null || version !== null)) {
    return false;
  }

  return true;
}
