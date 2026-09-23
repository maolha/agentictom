import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, SITE_NAME, RSS_ALTERNATE, X_HANDLE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

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
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
