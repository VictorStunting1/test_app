"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { mobilePlay } from "@/config/invitation";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";

export function MobileCompanions({ carTrips }: { carTrips: number }) {
  const [paused, setPaused] = useState(false);
  const [snailClicks, setSnailClicks] = useState(0);
  const lane = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const reduced = useReducedMotion();
  const { schedule } = useDelayedAction();
  useEffect(() => {
    const measure = () => setWidth(lane.current?.clientWidth ?? 0);
    measure();
    const observer = new ResizeObserver(measure);
    if (lane.current) observer.observe(lane.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="mobile-companions">
      <div className="companion-controls">
        <motion.button
          type="button"
          aria-label={mobilePlay.snailLabel}
          className="snail-button"
          animate={
            paused || reduced ? { x: 0, y: 0 } : { x: [0, 6, 0], y: [0, -2, 0] }
          }
          transition={{
            duration: paused || reduced ? 0 : 2,
            repeat: paused || reduced ? 0 : 1,
          }}
          onClick={() => {
            setPaused(true);
            setSnailClicks((v) => v + 1);
            schedule(() => setPaused(false), 1400);
          }}
        >
          <svg
            width="45"
            height="45"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 49C17 43 31 45 41 42L44 30C46 26 52 27 53 32L54 44C61 44 61 51 55 52H12C7 52 5 51 8 49Z"
              fill="#d6ddcb"
              stroke="#7b806e"
              strokeWidth="1.8"
            />
            <circle
              cx="27"
              cy="34"
              r="17"
              fill="#e6d8df"
              stroke="#745469"
              strokeWidth="1.8"
            />
            <path
              d="M31 45C17 48 13 33 22 25C31 18 42 28 36 37C32 44 21 39 24 32C27 26 33 31 30 34"
              stroke="#927286"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M46 30L43 20M51 30L55 20"
              stroke="#7b806e"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="43" cy="19" r="2.2" fill="#4e3b49" />
            <circle cx="55" cy="19" r="2.2" fill="#4e3b49" />
            <path
              d="M48 40Q50 42 52 40"
              stroke="#7b806e"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </div>
      <Reaction
        text={snailClicks ? mobilePlay.snailReply : ""}
        revision={snailClicks}
      />
      <div className="car-lane" ref={lane} aria-hidden="true">
        {carTrips > 0 && (
          <motion.div
            className="red-car"
            key={`${carTrips}-${width}`}
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
      <Reaction
        text={carTrips ? mobilePlay.carReply : ""}
        revision={carTrips}
      />
    </div>
  );
}
