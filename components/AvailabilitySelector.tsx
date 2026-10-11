"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reaction } from "./Reaction";
import { DatePicker } from "./DatePicker";
import { SnailIllustration } from "./SnailIllustration";
import { isAvailableMoment } from "./calendarUtils";
import {
  availability,
  invitation,
  interactions,
  journey,
} from "@/config/invitation";

export function AvailabilitySelector({
  period,
  moment,
  date,
  onDate,
  onPeriod,
  onMoment,
}: {
  period: string;
  moment: string;
  date: string;
  onDate: (value: string) => void;
  onPeriod: (id: string) => void;
  onMoment: (id: string) => void;
}) {
  const [reaction, setReaction] = useState("");
  const [revision, setRevision] = useState(0);
  const reduced = useReducedMotion();
  const flexible = period === availability.flexibleId && !date;
  const firstEvening = date === availability.earliestDate;
  return (
    <div className="availability-panel">
      <fieldset>
        <legend className="eyebrow">{invitation.periodLabel}</legend>
        <div className="pills">
          {invitation.periods.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={period === item.id && !date}
              className={`pill ${period === item.id && !date ? "active" : ""}`}
              onClick={() => {
                onPeriod(item.id);
                setReaction(interactions.periodReactions[item.id] ?? "");
                setRevision((v) => v + 1);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="date-choice">
        <h3>{journey.dateLabel}</h3>
        <p className="date-hint">{journey.dateHint}</p>
        <DatePicker
          value={date}
          onChange={(value) => {
            onDate(value);
            setReaction("");
          }}
        />
        <motion.button
          type="button"
          className={`pill flexible-day ${flexible ? "active" : ""}`}
          aria-pressed={flexible}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          onClick={() => {
            onPeriod(availability.flexibleId);
            setReaction("");
          }}
        >
          {journey.dateClear}
        </motion.button>
        <p className="calendar-hint">{availability.earliestHint}</p>
        {(date || flexible) && (
          <div
            className="date-feedback"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.span
              key={date || period}
              aria-hidden="true"
              initial={{ scale: reduced ? 1 : 0.88, x: reduced ? 0 : -5 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              <SnailIllustration
                mood={flexible ? "neutral" : "happy"}
                size={42}
              />
            </motion.span>
            <div>
              <p>
                {firstEvening
                  ? availability.earliestReaction
                  : flexible
                    ? availability.flexibleReaction
                    : availability.dateReaction}
              </p>
              {firstEvening && (
                <span className="freedom-badge">
                  {availability.earliestBadge}
                </span>
              )}
              {flexible && <small>{availability.flexibleAside}</small>}
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
                setReaction(interactions.momentReactions[item.id] ?? "");
                setRevision((v) => v + 1);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <Reaction immediate text={reaction} revision={revision} />
    </div>
  );
}
