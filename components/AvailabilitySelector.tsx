"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reaction } from "./Reaction";
import { DatePicker } from "./DatePicker";
import { SnailIllustration } from "./SnailIllustration";
import { getMomentLabel, isAvailableMoment } from "./calendarUtils";
import {
  availability,
  invitation,
  interactions,
  journey,
  personal,
} from "@/config/invitation";

export function AvailabilitySelector({
  moment,
  date,
  onDate,
  onMoment,
  activityId,
  showFeedback,
}: {
  moment: string;
  date: string;
  onDate: (value: string) => void;
  onMoment: (id: string) => void;
  activityId: string;
  showFeedback: boolean;
}) {
  const [reactedMoment, setReactedMoment] = useState("");
  const [revision, setRevision] = useState(0);
  const reduced = useReducedMotion();
  const firstEvening = date === availability.earliestDate;
  return (
    <div className="availability-panel">
      <div className="date-choice">
        <h3>{journey.dateLabel}</h3>
        <p className="date-hint">{journey.dateHint}</p>
        <DatePicker
          value={date}
          onChange={(value) => {
            onDate(value);
            setReactedMoment("");
          }}
        />
        {date && showFeedback && (
          <div
            className="date-feedback"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.span
              key={date}
              aria-hidden="true"
              initial={{ scale: reduced ? 1 : 0.88, x: reduced ? 0 : -5 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              <SnailIllustration mood="happy" size={42} />
            </motion.span>
            <div>
              <p>
                {firstEvening
                  ? availability.earliestReaction
                  : availability.dateReaction}
              </p>
              {firstEvening && (
                <span className="freedom-badge">
                  {availability.earliestBadge}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <fieldset className="moment-fieldset">
        <legend className="eyebrow">{invitation.momentLabel}</legend>
        <div className="pills">
          {invitation.moments.map((item) => (
            <button
              type="button"
              key={item.id}
              disabled={!isAvailableMoment(date, item.id)}
              aria-pressed={moment === item.id}
              className={`pill ${moment === item.id ? "active" : ""}`}
              onClick={() => {
                onMoment(item.id);
                setReactedMoment(item.id);
                setRevision((v) => v + 1);
              }}
            >
              {getMomentLabel(date, item.id)}
            </button>
          ))}
        </div>
      </fieldset>
      <Reaction
        immediate
        text={
          !showFeedback || !reactedMoment
            ? ""
            : activityId === "drink" && date && reactedMoment === "evening"
              ? personal.judgements.coherent
              : activityId === "surprise" && reactedMoment === "evening"
                ? personal.judgements.spontaneous
                : (interactions.momentReactions[reactedMoment] ?? "")
        }
        revision={revision}
      />
    </div>
  );
}
