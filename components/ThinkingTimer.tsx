"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Hourglass } from "lucide-react";
import { personal } from "@/config/invitation";

export function ThinkingTimer() {
  const reduced = useReducedMotion();
  return (
    <div className="thinking-timer">
      <motion.span
        aria-hidden="true"
        animate={{ rotate: reduced ? 0 : [0, 0, 180, 180] }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <Hourglass size={16} />
      </motion.span>
      <strong aria-hidden="true">{personal.thinkingTimerDisplay}</strong>
      <span>{personal.thinkingTimerLabel}</span>
    </div>
  );
}
