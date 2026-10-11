"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { interactions } from "@/config/invitation";

export function WhyGimmick() {
  const [taps, setTaps] = useState(0);
  const answerId = useId();
  const reduced = useReducedMotion();
  return (
    <div className="why-gimmick">
      <motion.button
        type="button"
        className="why-pill"
        aria-expanded={taps > 0}
        aria-controls={answerId}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        onClick={() => setTaps((value) => value + 1)}
      >
        {interactions.whyLabel}
      </motion.button>
      <div id={answerId} role="status" aria-live="polite" aria-atomic="true">
        <AnimatePresence initial={false}>
          {taps > 0 && (
            <motion.p
              key={taps}
              className="why-answer"
              initial={{
                opacity: 0,
                y: reduced ? 0 : 8,
                rotate: reduced ? 0 : -0.5,
              }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 380, damping: 28 }
              }
            >
              {
                interactions.whyAnswers[
                  (taps - 1) % interactions.whyAnswers.length
                ]
              }
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
