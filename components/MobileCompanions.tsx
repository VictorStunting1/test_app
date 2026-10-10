"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CarFront } from "lucide-react";
import { mobilePlay } from "@/config/invitation";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";

export function MobileCompanions() {
  const [paused, setPaused] = useState(false);
  const [birdClicks, setBirdClicks] = useState(0);
  const [carTrips, setCarTrips] = useState(0);
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
          aria-label={mobilePlay.birdLabel}
          className="cagou-button"
          animate={
            paused || reduced ? { x: 0, y: 0 } : { x: [0, 6, 0], y: [0, -2, 0] }
          }
          transition={{
            duration: paused || reduced ? 0 : 2,
            repeat: paused || reduced ? 0 : 1,
          }}
          onClick={() => {
            setPaused(true);
            setBirdClicks((v) => v + 1);
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
              d="M21 45C10 44 7 35 13 30L30 24C26 14 34 10 39 15L44 24L40 37C36 45 29 46 21 45Z"
              fill="#e7e0d7"
              stroke="#877880"
              strokeWidth="1.5"
            />
            <path
              d="M31 16L27 7M34 14L34 5M37 14L40 7M42 20L54 24L42 27"
              stroke="#9d7763"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="37" cy="20" r="1.5" fill="#4e3b49" />
            <path
              d="M24 45L22 55L17 56M33 44L36 54L42 55M17 34L30 30L27 40"
              stroke="#9d7763"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
        <button
          type="button"
          className="car-trigger text-button"
          onClick={() => setCarTrips((v) => v + 1)}
        >
          <CarFront size={18} />
          {mobilePlay.carLabel}
        </button>
      </div>
      <Reaction
        text={birdClicks ? mobilePlay.birdReply : ""}
        revision={birdClicks}
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
