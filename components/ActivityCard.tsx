"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Wine,
  Utensils,
  CircleDot,
  Dices,
  Check,
  ArrowUpRight,
  LockKeyhole,
} from "lucide-react";
import type { Activity } from "@/types/invitation";
import { invitation, interactions } from "@/config/invitation";
import { useDelayedAction } from "./useDelayedAction";
const icons = {
  glass: Wine,
  food: Utensils,
  activity: CircleDot,
  surprise: Dices,
};
export function ActivityCard({
  activity,
  index,
  selected,
  onSelect,
}: {
  activity: Activity;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = icons[activity.icon];
  const [riskOpen, setRiskOpen] = useState(false);
  const [classifiedClicks, setClassifiedClicks] = useState(0);
  const { schedule } = useDelayedAction();
  const reduced = useReducedMotion();
  function inspect() {
    setClassifiedClicks(
      (current) => (current % interactions.classifiedAnswers.length) + 1,
    );
    schedule(() => setClassifiedClicks(0), 3500);
  }
  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4, rotate: selected ? 0 : 0.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className={`activity-card ${selected ? "selected" : ""}`}
    >
      <motion.button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        whileTap={reduced ? undefined : { scale: 0.985 }}
        className="activity-select"
      >
        <div className="card-top">
          <span className={`activity-icon icon-${activity.icon}`}>
            <Icon size={25} strokeWidth={1.5} />
          </span>
          <span className="option-number">0{index + 1}</span>
        </div>
        <span className="eyebrow card-tag">{activity.tag}</span>
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
        <span className="vote">
          {selected ? invitation.selectedLabel : invitation.voteLabel}
          {selected ? <Check size={17} /> : <ArrowUpRight size={17} />}
        </span>
      </motion.button>
      {activity.classified ? (
        <button
          type="button"
          className="risk-indicator classified"
          onClick={inspect}
        >
          <LockKeyhole size={12} />
          <span aria-live="polite">
            {classifiedClicks
              ? interactions.classifiedAnswers[classifiedClicks - 1]
              : activity.risk}
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="risk-indicator risk-detail"
          onClick={() => {
            setRiskOpen((current) => !current);
            schedule(() => setRiskOpen(false), 3500);
          }}
        >
          <span aria-live="polite">
            {riskOpen
              ? (interactions.riskReplies[activity.id] ?? activity.risk)
              : activity.risk}
          </span>
        </button>
      )}
    </motion.article>
  );
}
