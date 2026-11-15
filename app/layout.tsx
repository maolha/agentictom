import type { Metadata } from "next";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, SITE_NAME, RSS_ALTERNATE, X_HANDLE } from "@/lib/site";
import "./fonts.css";
import "./globals.css";

// The fonts are files in public/fonts, declared in app/fonts.css. Only the latin
// files are preloaded: they cover every page, the other subsets load on demand.
const PRELOADED_FONTS = [
  "/fonts/cormorant-garamond-v21-latin.woff2",
  "/fonts/dm-sans-v17-latin.woff2",
];

const description =
  "The operating model for banks where AI is a first-class participant. Framework, thinking, and speaking by Marc Hauser.";

// Pages set their own canonical URL, Open Graph and Twitter fields (see lib/site.ts).
// Nothing page-specific belongs here: nested metadata objects defined in the root
// layout are inherited verbatim by any page that does not override them.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — Marc Hauser`,
  description,
  alternates: {
    types: RSS_ALTERNATE,
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: X_HANDLE,
    site: X_HANDLE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  for (const href of PRELOADED_FONTS) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }

  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
