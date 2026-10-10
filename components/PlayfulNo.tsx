"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { invitation, journey } from "@/config/invitation";
import { useDelayedAction } from "./useDelayedAction";

export function PlayfulNo({ onRefuse }: { onRefuse: () => void }) {
  const slot = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bounds, setBounds] = useState({ x: 0, y: 0 });
  const suppress = useRef(false);
  const lastDodge = useRef(-Infinity);
  const reduced = useReducedMotion();
  const { schedule, cancel } = useDelayedAction();
  const label = invitation.decisions.find((d) => d.id === "no")!.label;
  useEffect(() => {
    const measure = () => {
      if (slot.current && button.current)
        setBounds({
          x: Math.max(0, slot.current.clientWidth - button.current.offsetWidth),
          y: Math.max(
            0,
            slot.current.clientHeight - button.current.offsetHeight,
          ),
        });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (slot.current) observer.observe(slot.current);
    if (button.current) observer.observe(button.current);
    return () => observer.disconnect();
  }, []);
  const positions = [
    { x: bounds.x / 2, y: 0 },
    { x: bounds.x, y: bounds.y },
    { x: 0, y: bounds.y / 2 },
    { x: bounds.x / 2, y: 0 },
  ];
  function evade(touch = false) {
    const now = performance.now();
    if (attempts >= 3 || (!touch && now - lastDodge.current < 180)) return;
    lastDodge.current = now;
    suppress.current = true;
    const next = attempts + 1;
    setAttempts(next);
    if (next === 3) schedule(() => setFinished(true), 900);
  }
  return (
    <div ref={slot} className="dodge-slot">
      <motion.button
        ref={button}
        type="button"
        className="secondary-button dodge-button"
        aria-label={label}
        animate={positions[attempts]}
        transition={{ duration: reduced ? 0 : 0.12 }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") evade();
        }}
        onPointerMove={(event) => {
          // A transformed element may remain the browser's hovered target.
          // A new mouse approach must still count even without another enter event.
          if (
            event.pointerType === "mouse" &&
            (event.movementX || event.movementY)
          )
            evade();
        }}
        onPointerDown={(event) => {
          if (attempts >= 3) suppress.current = false;
          else {
            event.preventDefault();
            suppress.current = true;
            evade(event.pointerType !== "mouse");
          }
        }}
        onClick={(event) => {
          if (event.detail === 0 || !suppress.current) {
            cancel();
            setAttempts(3);
            setFinished(true);
            onRefuse();
          }
          suppress.current = false;
        }}
      >
        <span>{label}</span>
        <small aria-live="polite">
          {finished
            ? journey.noFinished
            : attempts
              ? journey.noTeases[attempts - 1]
              : journey.noInitial}
        </small>
      </motion.button>
    </div>
  );
}
