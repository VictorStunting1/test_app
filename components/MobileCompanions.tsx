"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { mobilePlay } from "@/config/invitation";
import { CarPass } from "./CarPass";
import { SnailIllustration } from "./SnailIllustration";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";

export function MobileCompanions({
  carTrips,
  activityId,
}: {
  carTrips: number;
  activityId: string;
}) {
  const [paused, setPaused] = useState(false);
  const [snailClicks, setSnailClicks] = useState(0);
  const [snailTrip, setSnailTrip] = useState(-1);
  const reduced = useReducedMotion();
  const { schedule } = useDelayedAction();
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
            setSnailTrip(carTrips);
            schedule(() => setPaused(false), 1400);
          }}
        >
          <SnailIllustration />
        </motion.button>
      </div>
      <Reaction
        immediate
        text={
          snailClicks && snailTrip === carTrips
            ? mobilePlay.snailReply
            : activityId === "surprise" && carTrips
              ? mobilePlay.carReply
              : ""
        }
        revision={snailClicks + carTrips}
      />
      {carTrips > 0 && <CarPass trips={carTrips} />}
    </div>
  );
}
