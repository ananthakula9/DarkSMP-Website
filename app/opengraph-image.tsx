import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = "DarkSMP — Java Survival SMP";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  const geist = await readFile(
    join(process.cwd(), "app", "fonts", "Geist-Medium.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0B0C",
          color: "#F5F5F5",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 36,
              height: 36,
              gap: 4,
            }}
          >
            <div
              style={{ width: 16, height: 16, backgroundColor: "#F5F5F5" }}
            />
            <div
              style={{ width: 16, height: 16, backgroundColor: "#F5F5F5" }}
            />
            <div
              style={{ width: 16, height: 16, backgroundColor: "#F5F5F5" }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                margin: 2,
                border: "2px solid #B8B8B8",
              }}
            />
          </div>
          <span
            style={{
              marginLeft: 16,
              fontSize: 22,
              letterSpacing: "0.08em",
            }}
          >
            DARKSMP
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              fontWeight: 500,
            }}
          >
            DarkSMP
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#929292" }}>
            Java Survival SMP
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262629",
            paddingTop: 24,
            fontSize: 20,
            color: "#929292",
          }}
        >
          <span>{siteConfig.server.address}</span>
          <span>Java Edition only</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geist,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
