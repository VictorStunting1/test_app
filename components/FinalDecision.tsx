"use client";
import { useEffect, useRef, useState } from "react";
import { invitation, personal } from "@/config/invitation";
import type { VerdictFrame } from "@/types/invitation";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PlayfulNo } from "./PlayfulNo";
import { Reaction } from "./Reaction";
import { CarPass } from "./CarPass";
import { ThinkingTimer } from "./ThinkingTimer";

const sequences: Record<string, readonly VerdictFrame[]> = {
  yes: personal.yesSequence,
  maybe: personal.maybeSequence,
  lawyer: personal.thinkingSequence,
  no: personal.noSequence,
};
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
  const [reaction, setReaction] = useState("");
  const [detail, setDetail] = useState("");
  const [revision, setRevision] = useState(0);
  const [car, setCar] = useState(false);
  const [thinkingTimer, setThinkingTimer] = useState(false);
  const complete = useRef(onSequenceComplete);
  complete.current = onSequenceComplete;
  useEffect(() => {
    setCar(false);
    setThinkingTimer(false);
    setReaction("");
    setDetail("");
    if (!active || !decisionId) {
      return;
    }
    const sequence = sequences[decisionId];
    if (!sequence) return;
    const timers = sequence.map((frame) =>
      setTimeout(() => {
        setReaction(frame.text);
        setDetail(frame.detail);
        setThinkingTimer(Boolean(frame.thinkingTimer));
        // Keep the car mounted until the sequence ends, so it finishes crossing.
        if (frame.car) setCar(true);
      }, frame.at),
    );
    timers.push(
      setTimeout(
        () => {
          setThinkingTimer(false);
          complete.current();
        },
        Math.max(0, ...sequence.map((frame) => frame.at)) + personal.readingMs,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [decisionId, active, revision]);
  function decide(id: string) {
    if (!onDecision(id)) {
      setReaction("");
      setDetail("");
      return;
    }
    setRevision((v) => v + 1);
    setReaction("");
    setDetail("");
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
              {decision.label}
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
      {thinkingTimer && <ThinkingTimer key={revision} />}
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
