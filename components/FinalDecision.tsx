"use client";
import { invitation } from "@/config/invitation";
import { ArrowUpRight } from "lucide-react";
export function FinalDecision({
  onDecision,
  error,
}: {
  onDecision: (id: string) => void;
  error: string;
}) {
  return (
    <>
      <div className="decision-buttons">
        {invitation.decisions.map((decision, index) => (
          <button
            type="button"
            key={decision.id}
            onClick={() => onDecision(decision.id)}
            className={index === 0 ? "primary-button" : "secondary-button"}
          >
            {decision.label}
            {index === 0 && <ArrowUpRight size={18} />}
          </button>
        ))}
      </div>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <p className="refusal-note">{invitation.refusalNote}</p>
    </>
  );
}
