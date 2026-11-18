import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

// Setting page-level Open Graph metadata replaces the root object, so nested
// pages reference the generated image explicitly. The route is served by
// `app/opengraph-image.tsx`.
const ogImage = {
  url: "/opengraph-image",
  type: "image/png",
  width: 1200,
  height: 630,
  alt: "DarkSMP — Java Survival SMP",
} as const;

/**
 * Builds page metadata whose title, canonical URL, and social copy match the
 * page, including the generated share image.
 */
export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage.url,
          type: ogImage.type,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
    },
  };
}
