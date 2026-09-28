import type { Metadata } from "next";
import { brand, seo } from "@/content/site";

/** Branded 1200×630 link-preview image (JPEG: WhatsApp does not reliably render WebP). */
export const shareImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${brand.name}: ${brand.tagline}`,
  type: "image/jpeg",
};

/**
 * Open Graph + Twitter tags for a page. Next.js replaces (not merges) a parent's
 * openGraph object, so every page passes the full set.
 */
export function shareMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: brand.name,
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}

export const defaultShare = shareMetadata({ title: seo.title, description: seo.description, path: "/" });
