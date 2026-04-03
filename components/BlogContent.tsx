"use client";

import React from "react";

function parseMarkdown(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip the h1 title (already rendered by the page)
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      i++;
      continue;
    }

    // h2
    if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={key++}
          className="font-[family-name:var(--font-cormorant)] font-light mt-12 mb-4"
          style={{ fontSize: "clamp(22px, 3.5vw, 32px)", color: "#2B3A52" }}
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // h3
    if (line.startsWith("### ")) {
      nodes.push(
        <h3
          key={key++}
          className="font-[family-name:var(--font-cormorant)] font-light mt-8 mb-3"
          style={{ fontSize: "1.3rem", color: "#2B3A52" }}
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph (collect consecutive non-empty, non-heading lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#")
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      const text = paraLines.join(" ");
      nodes.push(
        <p key={key++} className="mb-6">
          {renderInline(text)}
        </p>
      );
    }
  }

  return nodes;
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} style={{ fontWeight: 500 }}>
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function BlogContent({ content }: { content: string }) {
  return (
    <div
      className="font-[family-name:var(--font-dm-sans)]"
      style={{ lineHeight: 1.8, color: "#1A1A1A", fontSize: "1rem" }}
    >
      {parseMarkdown(content)}
    </div>
  );
}
