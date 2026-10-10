"use client";
import { useState } from "react";
import { Reaction } from "./Reaction";
import { invitation, interactions } from "@/config/invitation";
export function AvailabilitySelector({
  period,
  moment,
  onPeriod,
  onMoment,
}: {
  period: string;
  moment: string;
  onPeriod: (id: string) => void;
  onMoment: (id: string) => void;
}) {
  const [reaction, setReaction] = useState("");
  const [revision, setRevision] = useState(0);
  return (
    <div className="availability-panel">
      <fieldset>
        <legend className="eyebrow">{invitation.periodLabel}</legend>
        <div className="pills">
          {invitation.periods.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={period === item.id}
              className={`pill ${period === item.id ? "active" : ""}`}
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
      <fieldset>
        <legend className="eyebrow">{invitation.momentLabel}</legend>
        <div className="pills">
          {invitation.moments.map((item) => (
            <button
              type="button"
              key={item.id}
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
      <Reaction text={reaction} revision={revision} />
    </div>
  );
}
