"use client";
import { useState } from "react";
import { invitation, interactions } from "@/config/invitation";
import { ArrowUpRight } from "lucide-react";
import { PlayfulNo } from "./PlayfulNo";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";
export function FinalDecision({
  onDecision,
  error,
}: {
  onDecision: (id: string) => boolean;
  error: string;
}) {
  const [lawyerStep, setLawyerStep] = useState(0);
  const [reaction, setReaction] = useState("");
  const [detail, setDetail] = useState("");
  const [revision, setRevision] = useState(0);
  const { schedule, cancel } = useDelayedAction();
  function decide(id: string) {
    if (!onDecision(id)) {
      cancel();
      setReaction("");
      setDetail("");
      return;
    }
    cancel();
    setRevision((v) => v + 1);
    setDetail("");
    if (id !== "lawyer") setLawyerStep(0);
    if (id === "yes") {
      setReaction(interactions.verdict.yes[0]);
      schedule(() => setDetail(interactions.verdict.yes[1]), 450);
    }
    if (id === "maybe") setReaction(interactions.verdict.maybe);
    if (id === "no") {
      setReaction(interactions.verdict.no[0]);
      setDetail(interactions.verdict.no[1]);
    }
    if (id === "lawyer") {
      setReaction(interactions.verdict.lawyer[lawyerStep]);
      setLawyerStep((step) => (step + 1) % 3);
      schedule(() => setLawyerStep(0), 6000);
    }
  }
  return (
    <>
      <div className="decision-buttons">
        {invitation.decisions.map((decision, index) => (
          <button
            type="button"
            key={decision.id}
            onClick={() => decide(decision.id)}
            className={index === 0 ? "primary-button" : "secondary-button"}
          >
            {decision.id === "lawyer" && lawyerStep
              ? interactions.verdict.lawyerButtons[lawyerStep - 1]
              : decision.label}
            {index === 0 && <ArrowUpRight size={18} />}
          </button>
        ))}
      </div>
      <PlayfulNo onRefuse={() => decide("no")} />
      <Reaction
        text={reaction}
        revision={revision}
        className="verdict-reaction"
      />
      {detail && (
        <p className="verdict-detail" role="status">
          {detail}
        </p>
      )}
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <p className="refusal-note">{invitation.refusalNote}</p>
    </>
  );
}
