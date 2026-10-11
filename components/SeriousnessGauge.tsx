"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { invitation } from "@/config/invitation";
import { FunnyStat } from "./FunnyStat";
import {
  calculateSeriousness,
  normalizePercentages,
} from "./calculateSeriousness";
import type {
  SeriousnessChoices,
  SeriousnessPercentages,
} from "@/types/invitation";

export function SeriousnessGauge({ choices }: { choices: SeriousnessChoices }) {
  const reduced = useReducedMotion();
  const result = calculateSeriousness(choices);
  const target = result.values.join(",");
  const [display, setDisplay] = useState(result.values);
  const current = useRef(display);
  useEffect(() => {
    const to = target.split(",").map(Number) as SeriousnessPercentages;
    const from = current.current;
    function update(values: SeriousnessPercentages) {
      current.current = values;
      setDisplay(values);
    }
    if (reduced) {
      update(to);
      return;
    }
    // One shared animation preserves the total while all segments change.
    const animation = animate(0, 1, {
      duration: 0.32,
      ease: "easeOut",
      onUpdate: (progress) =>
        update(
          normalizePercentages(
            from.map(
              (value, index) => value + (to[index] - value) * progress,
            ) as SeriousnessPercentages,
          ),
        ),
    });
    return () => animation.stop();
  }, [target, reduced]);
  return (
    <div className="seriousness">
      <span className="eyebrow">{invitation.seriousnessLabel}</span>
      <div className="stat-bar" aria-hidden="true">
        {display.map((value, index) => (
          <span
            key={index}
            className={`tone-${index}`}
            style={{ flexGrow: value }}
          />
        ))}
      </div>
      <div className="stat-labels" aria-hidden="true">
        {result.labels.map((label, index) => (
          <FunnyStat
            key={index}
            label={label}
            value={display[index]}
            index={index}
            animated={false}
          />
        ))}
      </div>
      <span
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {result.labels
          .map((label, index) => `${result.values[index]} % ${label}`)
          .join(", ")}
      </span>
      <p className="stats-note">{result.note}</p>
    </div>
  );
}
