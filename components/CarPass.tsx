"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

// The car stays inside a measured lane, including narrow phones.
export function CarPass({ trips }: { trips: number }) {
  const lane = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const measure = () => setWidth(lane.current?.clientWidth ?? 0);
    measure();
    const observer = new ResizeObserver(measure);
    if (lane.current) observer.observe(lane.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="car-lane" ref={lane} aria-hidden="true">
      {trips > 0 && (
        <motion.div
          className="red-car"
          key={`${trips}-${width}`}
          initial={{ x: -65 }}
          animate={{ x: reduced ? width / 2 - 25 : width + 65 }}
          transition={{
            duration: reduced ? 0 : width < 600 ? 1.6 : 2.8,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 90 44" width="64" height="32" fill="none">
            <path
              d="M6 31V23L24 20L35 8H58L70 21L81 24L85 31V36H6Z"
              fill="#a95151"
            />
            <path d="M30 20L38 11H55L63 20Z" fill="#e5dfd9" />
            <path d="M47 11V20" stroke="#a95151" strokeWidth="3" />
            <circle cx="24" cy="35" r="7" fill="#53474d" />
            <circle cx="69" cy="35" r="7" fill="#53474d" />
            <circle cx="24" cy="35" r="3" fill="#d7cbc8" />
            <circle cx="69" cy="35" r="3" fill="#d7cbc8" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
