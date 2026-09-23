"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveals text word by word with a staggered fade-in and slight upward motion.
 * Used on the homepage hero headline. Respects the reduced-motion preference.
 */
export default function TextReveal({
  text,
  className,
  style,
  delay = 0.3,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  const words = text.split(" ");

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
