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

    // Horizontal rule
    if (line.trim() === "---" || line.trim() === "***") {
      nodes.push(
        <hr key={key++} style={{ border: "none", borderTop: "1px solid #D8D3CB", margin: "2rem 0" }} />
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Table
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableRows: string[][] = [];
      let hasHeader = false;

      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        const row = lines[i]
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => cell.trim());

        // Skip separator row (|---|---|)
        if (row.every((cell) => /^[-:\s]+$/.test(cell))) {
          hasHeader = true;
          i++;
          continue;
        }

        tableRows.push(row);
        i++;
      }

      if (tableRows.length > 0) {
        const headerRow = hasHeader ? tableRows[0] : null;
        const bodyRows = hasHeader ? tableRows.slice(1) : tableRows;

        nodes.push(
          <div key={key++} className="overflow-x-auto mb-6 -mx-5 px-5 md:mx-0 md:px-0">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              {headerRow && (
                <thead>
                  <tr>
                    {headerRow.map((cell, ci) => (
                      <th
                        key={ci}
                        className="text-left text-xs uppercase tracking-widest py-3 pr-4"
                        style={{
                          borderBottom: "2px solid #2B3A52",
                          color: "#2B3A52",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="py-3 pr-4"
                        style={{
                          borderBottom: "1px solid #D8D3CB",
                          color: "#1A1A1A",
                          lineHeight: 1.6,
                          verticalAlign: "top",
                        }}
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul key={key++} className="mb-6 flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
          {items.map((item, ii) => (
            <li
              key={ii}
              style={{
                listStyleType: "disc",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "#1A1A1A",
              }}
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      nodes.push(
        <ol key={key++} className="mb-6 flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
          {items.map((item, ii) => (
            <li
              key={ii}
              style={{
                listStyleType: "decimal",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "#1A1A1A",
              }}
            >
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph (collect consecutive non-empty, non-special lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i]) &&
      !(lines[i].includes("|") && lines[i].trim().startsWith("|")) &&
      lines[i].trim() !== "---" &&
      lines[i].trim() !== "***"
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      const text = paraLines.join(" ");
      // Reduce bottom margin if a list follows immediately
      const nextLine = i < lines.length ? lines[i] : "";
      const nextNonEmpty = lines.slice(i).find((l) => l.trim() !== "");
      const listFollows = nextNonEmpty && (nextNonEmpty.startsWith("- ") || /^\d+\.\s/.test(nextNonEmpty));
      nodes.push(
        <p key={key++} className={listFollows ? "mb-2" : "mb-6"}>
          {renderInline(text)}
        </p>
      );
    }
  }

  return nodes;
}

function renderLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={key++}
        href={match[2]}
        style={{ color: "#2B3A52", textDecoration: "underline", textUnderlineOffset: "3px" }}
      >
        {match[1]}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match bold (**text**)
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...renderLinks(text.slice(lastIndex, match.index)));
    }
    // Parse links inside bold text too
    parts.push(
      <strong key={key++} style={{ fontWeight: 700 }}>
        {renderLinks(match[1])}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(...renderLinks(text.slice(lastIndex)));
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
