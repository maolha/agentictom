import type { Metadata } from "next";

export const SITE_URL = "https://agentictom.com";
export const SITE_NAME = "Agentic TOM";
export const AUTHOR = "Marc Hauser";
export const AUTHOR_TITLE = "Head of Banking & Financial Services, UiPath Switzerland";
export const LINKEDIN_URL = "https://linkedin.com/in/marcoliverhauser";
export const X_URL = "https://x.com/marc_hauser";
export const X_HANDLE = "@marc_hauser";

export const RSS_ALTERNATE = { "application/rss+xml": "/feed.xml" };

/**
 * Metadata for a top-level page. Nested metadata objects are replaced, not
 * merged, when a page defines them, so every page sets its own canonical,
 * Open Graph and Twitter fields here instead of inheriting the root layout's.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogDescription,
}: {
  title: string;
  description: string;
  path: string;
  ogDescription?: string;
}): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
      types: RSS_ALTERNATE,
    },
    openGraph: {
      title: fullTitle,
      description: ogDescription ?? description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: ogDescription ?? description,
      creator: X_HANDLE,
      site: X_HANDLE,
    },
  };
}
