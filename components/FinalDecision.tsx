"use client";
import { useEffect, useRef, useState } from "react";
import { invitation, interactions, personal } from "@/config/invitation";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PlayfulNo } from "./PlayfulNo";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";
import { CarPass } from "./CarPass";
export function FinalDecision({
  resolved,
  decisionId,
  active,
  onSequenceComplete,
  onDecision,
  error,
}: {
  resolved: boolean;
  decisionId: string;
  active: boolean;
  onSequenceComplete: () => void;
  onDecision: (id: string) => boolean;
  error: string;
}) {
  const [lawyerStep, setLawyerStep] = useState(0);
  const [reaction, setReaction] = useState("");
  const [detail, setDetail] = useState("");
  const [revision, setRevision] = useState(0);
  const [car, setCar] = useState(false);
  const complete = useRef(onSequenceComplete);
  complete.current = onSequenceComplete;
  const { schedule, cancel } = useDelayedAction();
  useEffect(() => {
    setCar(false);
    if (!active || !decisionId) {
      cancel();
      setLawyerStep(0);
      setReaction("");
      setDetail("");
      return;
    }
    if (decisionId !== "yes" && decisionId !== "no") return;
    const sequence: readonly {
      at: number;
      text: string;
      detail: string;
      car?: boolean;
    }[] = decisionId === "yes" ? personal.yesSequence : personal.noSequence;
    const timers = sequence.map((frame) =>
      setTimeout(() => {
        setReaction(frame.text);
        setDetail(frame.detail);
        // Keep the car mounted until the sequence ends, so it finishes crossing.
        if (frame.car) setCar(true);
      }, frame.at),
    );
    timers.push(
      setTimeout(
        () => complete.current(),
        Math.max(0, ...sequence.map((frame) => frame.at)) + 600,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [decisionId, active, revision, cancel]);
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
    if (id === "maybe") setReaction(interactions.verdict.maybe);
    if (id === "lawyer") {
      setReaction(interactions.verdict.lawyer[lawyerStep]);
      setLawyerStep((step) => (step + 1) % 3);
      schedule(() => setLawyerStep(0), 6000);
    }
  }
  return (
    <>
      <div className="decision-buttons" hidden={resolved}>
        {invitation.decisions.map((decision, index) =>
          decision.id === "no" ? (
            <PlayfulNo key={decision.id} onRefuse={() => decide("no")} />
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              key={decision.id}
              onClick={() => decide(decision.id)}
              className={index === 0 ? "primary-button" : "secondary-button"}
            >
              {decision.id === "lawyer" && lawyerStep
                ? interactions.verdict.lawyerButtons[lawyerStep - 1]
                : decision.label}
              {index === 0 && <ArrowUpRight size={18} />}
            </motion.button>
          ),
        )}
      </div>
      <Reaction
        immediate
        text={reaction}
        revision={revision}
        className="verdict-reaction"
      />
      {detail && (
        <p className="verdict-detail" role="status">
          {detail}
        </p>
      )}
      {car && <CarPass trips={revision} />}
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <p className="refusal-note">{invitation.refusalNote}</p>
    </>
  );
}
