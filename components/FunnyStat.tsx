"use client";
import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
export function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const animation = animate(display, value, {
      duration: 0.45,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => animation.stop();
    // Restart only for a new target, not each rendered animation frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced]);
  return <>{display}</>;
}
export function FunnyStat({
  label,
  value,
  index,
}: {
  label: string;
  value: number;
  index: number;
}) {
  return (
    <div className="funny-stat">
      <span className={`stat-dot tone-${index}`} />
      <strong>
        <AnimatedNumber value={value} /> %
      </strong>
      <span>{label}</span>
    </div>
  );
}
