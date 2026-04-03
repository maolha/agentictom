import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}
      className="flex flex-col"
    >
      <nav
        className="px-5 md:px-8 py-4 md:py-5"
        style={{ borderBottom: "1px solid #D8D3CB" }}
      >
        <div className="max-w-[900px] mx-auto">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agenticTOM
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-8">
        <p
          className="font-[family-name:var(--font-cormorant)] font-light select-none"
          style={{ fontSize: "clamp(80px, 16vw, 160px)", lineHeight: 0.85, color: "#2B3A52", opacity: 0.12 }}
          aria-hidden="true"
        >
          404
        </p>
        <h1
          className="font-[family-name:var(--font-cormorant)] font-light mt-8 mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1A1A1A" }}
        >
          Page not found.
        </h1>
        <p className="mb-10 text-center" style={{ color: "#6B6B6B", maxWidth: 420 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-outline-slate">
          Back to home
        </Link>
      </div>
    </main>
  );
}
