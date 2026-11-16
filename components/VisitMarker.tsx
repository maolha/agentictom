"use client";

import { useEffect } from "react";
import { markVisit } from "@/lib/reading";

/** Notes the start of a visit in the browser, so a later visit can show what is new. */
export default function VisitMarker() {
  useEffect(() => {
    markVisit();
  }, []);
  return null;
}
