"use client";
import { motion } from "framer-motion";
import {
  Wine,
  Utensils,
  CircleDot,
  Dices,
  Check,
  ArrowUpRight,
} from "lucide-react";
import type { Activity } from "@/types/invitation";
import { invitation } from "@/config/invitation";
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
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      className={`activity-card ${selected ? "selected" : ""}`}
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
  );
}
