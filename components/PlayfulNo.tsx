"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { mobilePlay } from "@/config/invitation";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";

export function PlayfulNo({ onRefuse }: { onRefuse: () => void }) {
  const zone = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const suppressClick = useRef(false);
  const [attempts, setAttempts] = useState(0);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [finished, setFinished] = useState(false);
  const reduced = useReducedMotion();
  const { schedule } = useDelayedAction();
  useEffect(() => {
    const measure = () => {
      if (zone.current && button.current)
        setBounds({
          width: Math.max(
            0,
            zone.current.clientWidth - button.current.offsetWidth,
          ),
          height: Math.max(
            0,
            zone.current.clientHeight - button.current.offsetHeight,
          ),
        });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (zone.current) observer.observe(zone.current);
    return () => observer.disconnect();
  }, []);
  const positions = [
    { x: bounds.width / 2, y: 0 },
    { x: bounds.width, y: bounds.height },
    { x: 0, y: bounds.height / 2 },
    { x: bounds.width, y: 0 },
  ];
  function evade() {
    if (attempts >= 3) return;
    suppressClick.current = true;
    const next = attempts + 1;
    setAttempts(next);
    if (next === 3) schedule(() => setFinished(true), 900);
  }
  return (
    <div className="playful-no">
      <p className="play-hint">{mobilePlay.noHint}</p>
      <div ref={zone} className="no-playground">
        <motion.button
          ref={button}
          type="button"
          className="secondary-button playful-no-button"
          animate={positions[attempts]}
          transition={{ duration: reduced ? 0 : 0.12 }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") evade();
          }}
          onPointerDown={(event) => {
            if (attempts >= 3) suppressClick.current = false;
            else if (event.pointerType !== "mouse") {
              event.preventDefault();
              evade();
            }
          }}
          onClick={(event) => {
            if (event.detail === 0 || !suppressClick.current) onRefuse();
            suppressClick.current = false;
          }}
        >
          {mobilePlay.noLabel}
        </motion.button>
      </div>
      <Reaction
        text={
          finished
            ? mobilePlay.noFinished
            : attempts
              ? mobilePlay.noReplies[attempts - 1]
              : ""
        }
        revision={attempts}
      />
    </div>
  );
}
