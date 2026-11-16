"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  // The server cannot know the reader's motion preference, so the markup is the
  // same either way and only the animation differs. With reduced motion the
  // content is shown at once: no offset, no delay, no waiting for the scroll.
  const show = reduced || isInView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
