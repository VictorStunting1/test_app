"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { invitation, interactions } from "@/config/invitation";
import { FunnyStat } from "./FunnyStat";

export function SeriousnessGauge() {
  const reduced = useReducedMotion();
  const [variant, setVariant] = useState(0);
  const stats = interactions.statsVariants[variant];
  function recalculate() {
    // Choose a different distribution every time, without an unbounded retry loop.
    setVariant(
      (current) =>
        (current +
          1 +
          Math.floor(Math.random() * (interactions.statsVariants.length - 1))) %
        interactions.statsVariants.length,
    );
  }
  return (
    <div className="seriousness">
      <button
        type="button"
        className="gauge-button"
        aria-label={interactions.statsAction}
        onClick={recalculate}
      >
        <span className="eyebrow">
          {invitation.seriousnessLabel}
          <span className="recalculate-hint">↻</span>
        </span>
        <div className="stat-bar" aria-hidden="true">
          {stats.map((s, i) => (
            <motion.span
              key={i}
              className={`tone-${i}`}
              animate={{ flexGrow: s.value }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 120, damping: 22 }
              }
            />
          ))}
        </div>
        <div className="stat-labels">
          {stats.map((s, i) => (
            <FunnyStat key={i} {...s} index={i} />
          ))}
        </div>
      </button>
      <span className="sr-only" role="status">
        {stats.map((s) => `${s.value} % ${s.label}`).join(", ")}
      </span>
      <p className="stats-note">{interactions.statsNote}</p>
    </div>
  );
}
