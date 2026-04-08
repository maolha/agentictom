import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://agentictom.com"),
  title: "Agentic TOM — Marc Hauser",
  description: "The operating model for banks where AI is a first-class participant. Framework, thinking, and speaking by Marc Hauser.",
  openGraph: {
    title: "Agentic TOM — Marc Hauser",
    description: "The operating model for banks where AI is a first-class participant. Framework, thinking, and speaking by Marc Hauser.",
    url: "https://agentictom.com",
    siteName: "Agentic TOM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic TOM — Marc Hauser",
    description: "The operating model for banks where AI is a first-class participant.",
    creator: "@marc_hauser",
    site: "@marc_hauser",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
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
