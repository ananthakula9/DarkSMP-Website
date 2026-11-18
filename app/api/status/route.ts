import { NextResponse } from "next/server";
import { getServerStatus } from "@/lib/server-status";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getServerStatus();

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
