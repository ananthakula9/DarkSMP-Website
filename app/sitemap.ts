import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/world`,
    },
    {
      url: `${siteUrl}/rules`,
    },
    {
      url: `${siteUrl}/community`,
    },
  ];
}
