"use client";

import { useEffect, useState } from "react";
import {
  SERVER_STATUS_REFRESH_MS,
  isServerStatus,
  type ServerStatus,
} from "@/lib/server-status-types";
import { cn } from "@/lib/cn";

const STATUS_REQUEST_TIMEOUT_MS = 10_000;

const stateLabels = {
  online: "Online",
  offline: "Offline",
  unavailable: "Status unavailable",
  unconfigured: "Status not configured",
} as const;

const stateDots = {
  online: "bg-accent",
  offline: "bg-muted",
  unavailable: "bg-line",
  unconfigured: "bg-line",
} as const;

type ServerStatusDisplayProps = {
  compact?: boolean;
};

export function ServerStatusDisplay({
  compact = false,
}: ServerStatusDisplayProps) {
  const [status, setStatus] = useState<ServerStatus | null>(null);

  useEffect(() => {
    let active = true;
    let timer: number | undefined;
    let controller: AbortController | undefined;

    const schedule = () => {
      if (!active) {
        return;
      }

      if (timer !== undefined) {
        window.clearTimeout(timer);
      }

      timer = window.setTimeout(() => {
        void load();
      }, SERVER_STATUS_REFRESH_MS);
    };

    async function load() {
      if (!active) {
        return;
      }

      if (timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }

      controller?.abort();
      const requestController = new AbortController();
      controller = requestController;
      let timedOut = false;
      const requestTimeout = window.setTimeout(() => {
        timedOut = true;
        requestController.abort();
      }, STATUS_REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch("/api/status", {
          cache: "no-store",
          signal: requestController.signal,
        });

        if (!response.ok) {
          throw new Error("Status request failed");
        }

        const nextStatus: unknown = await response.json();

        if (!isServerStatus(nextStatus)) {
          throw new Error("Status response was invalid");
        }

        if (active) {
          setStatus(nextStatus);
        }
      } catch (error) {
        if (
          active &&
          (timedOut ||
            !(error instanceof DOMException && error.name === "AbortError"))
        ) {
          setStatus({
            state: "unavailable",
            players: null,
            version: null,
            checkedAt: null,
          });
        }
      } finally {
        window.clearTimeout(requestTimeout);
        schedule();
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void load();
      }
    }

    void load();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      controller?.abort();
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const state = status?.state ?? null;
  const label = state ? stateLabels[state] : "Checking status";
  const dot = state ? stateDots[state] : "bg-muted";
  const playerCount = status?.players?.online ?? null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-busy={status === null}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn("size-1.5 shrink-0 rounded-full", dot)}
        />
        <span className="text-sm font-medium text-ink">{label}</span>
      </div>
      {" "}
      {!compact && state === "online" && playerCount !== null ? (
        <p className="type-small text-muted">
          {playerCount === 1 ? "1 player online" : `${playerCount} players online`}
        </p>
      ) : null}

      {!compact && state === "offline" ? (
        <p className="type-small text-muted">
          The server may be sleeping. Aternos servers can sleep when no one is
          online.
        </p>
      ) : null}

      {!compact && state === "unavailable" ? (
        <p className="type-small text-muted">
          Live status could not be loaded right now.
        </p>
      ) : null}

      {!compact && state === "unconfigured" ? (
        <p className="type-small text-muted">
          Live status has not been configured.
        </p>
      ) : null}
    </div>
  );
}
