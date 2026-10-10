"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Reaction({
  text,
  revision = 0,
  className = "",
}: {
  text: string;
  revision?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      className={`interactive-reaction ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        {text && (
          <motion.p
            key={`${text}-${revision}`}
            initial={{ opacity: 0, y: reduced ? 0 : 4 }}
            animate={{ opacity: 1, y: 0, x: reduced ? 0 : [0, -2, 2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
