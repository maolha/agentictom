import Link from "next/link";
import { pageMetadata, LINKEDIN_URL } from "@/lib/site";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = pageMetadata({
  title: "Privacy and legal notice",
  description: "Who runs agentictom.com, what personal data the site processes, and the rights you have under the Swiss Federal Act on Data Protection.",
  path: "/privacy",
});

const h2 = "font-[family-name:var(--font-cormorant)] font-light mt-12 mb-4";
const h2Style = { fontSize: "clamp(22px, 3.5vw, 32px)", color: "#2B3A52" } as const;
const p = { color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" } as const;

export default function PrivacyPage() {
  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <SiteNav />

      <article className="px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            Legal
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-8"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.2, color: "#1A1A1A" }}
          >
            Privacy and legal notice
          </h1>
          <p className="mb-6" style={p}>
            This page states who is responsible for agentictom.com, what personal data the site processes, and the rights
            you have under the Swiss Federal Act on Data Protection (FADP) of 25 September 2020, in force since 1 September 2023.
          </p>

          <h2 className={h2} style={h2Style}>Responsible party</h2>
          <p className="mb-6" style={p}>
            Marc Hauser, Zürich, Switzerland, operates this site in a personal capacity. It is not a publication of any
            employer. For questions about this notice or about your data, use the{" "}
            <Link href="/#contact" className="underline underline-offset-4">contact form</Link> or write to Marc on{" "}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>.
          </p>

          <h2 className={h2} style={h2Style}>What the site processes</h2>
          <p className="mb-4" style={p}>
            <strong style={{ fontWeight: 700 }}>Contact form.</strong> When you send a message, the site transmits your name,
            organisation, email address, chosen topic and message to Marc by email. The data is used only to answer you and is
            kept as long as the correspondence is relevant. The legal basis is your request. Delivery runs through Google
            (Gmail), whose servers may be located outside Switzerland; Google is bound by the EU standard contractual clauses
            and the Swiss addendum to them. A rate limit on the form keeps a short-lived record of the requesting IP address
            in server memory; it is not stored.
          </p>
          <p className="mb-4" style={p}>
            <strong style={{ fontWeight: 700 }}>Assessment.</strong> Your answers to the readiness assessment stay in your
            browser. They are not sent to the server. When you complete it, the resulting level and total score are recorded
            anonymously, without your answers and without an identifier, to understand how the market is distributed. The PDF
            export is generated in your browser; the name and company you type into it are not transmitted.
          </p>
          <p className="mb-4" style={p}>
            <strong style={{ fontWeight: 700 }}>Usage statistics.</strong> The site uses Vercel Web Analytics to count page
            views. It sets no cookies and does not identify visitors: the visitor hash it derives from the request is discarded
            within 24 hours and is never linked to a person.
          </p>
          <p className="mb-6" style={p}>
            <strong style={{ fontWeight: 700 }}>Hosting.</strong> The site is hosted by Vercel Inc., USA. Like any web
            server, Vercel processes the IP address and request headers needed to deliver pages and to protect the
            service, and keeps short-lived technical logs. Vercel is bound by the EU standard contractual clauses and the
            Swiss addendum to them.
          </p>

          <h2 className={h2} style={h2Style}>What the site does not do</h2>
          <p className="mb-6" style={p}>
            No advertising, no tracking across sites, no newsletter list, no sale or sharing of data with third parties
            beyond the processors named above. External links, for example to LinkedIn or to cited sources, lead to sites
            with their own privacy terms.
          </p>

          <h2 className={h2} style={h2Style}>Your rights</h2>
          <p className="mb-6" style={p}>
            Under the FADP you may ask what personal data about you is processed, have it corrected or deleted, and object
            to its processing. Requests can be made through the contact form. You may also lodge a complaint with the
            Federal Data Protection and Information Commissioner (FDPIC).
          </p>

          <h2 className={h2} style={h2Style}>Content and liability</h2>
          <p className="mb-6" style={p}>
            The essays on this site are the author&apos;s own views. Figures are sourced where a source exists and labelled as
            estimates where they are modelled. Nothing here is investment, legal or regulatory advice. The text may be quoted
            with attribution and a link.
          </p>

          <p className="text-xs mt-12" style={{ color: "#6B6B6B" }}>
            Last updated 23 September 2026.
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
