"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { interactions as c } from "@/config/invitation";
import type { ScienceResult, ScienceChoices } from "@/types/invitation";
import { Reaction } from "./Reaction";
import { AnimatedNumber } from "./FunnyStat";

export function CompatibilityTest({
  onResult,
  onAnswersChange,
}: {
  onResult: (result: ScienceResult | undefined) => void;
  onAnswersChange: (answers: ScienceChoices) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revisions, setRevisions] = useState<Record<string, number>>({});
  const [activeQuestion, setActiveQuestion] = useState("");
  const reduced = useReducedMotion();
  function choose(questionId: string, answerId: string) {
    const next = { ...answers, [questionId]: answerId };
    setActiveQuestion(questionId);
    setAnswers(next);
    onAnswersChange(next);
    setRevisions((current) => ({
      ...current,
      [questionId]: (current[questionId] ?? 0) + 1,
    }));
    const chosen = c.science.questions.map((q) =>
      q.answers.find((a) => a.id === next[q.id]),
    );
    if (chosen.every((a) => a !== undefined)) {
      onResult({
        score: 80 + chosen.reduce((total, a) => total + a!.weight, 0),
        answers: c.science.questions.map((q, i) => ({
          question: q.question,
          answer: chosen[i]!.label,
        })),
        risk:
          chosen.find((a) => a && "risk" in a)?.risk ?? c.science.defaultRisk,
      });
    } else onResult(undefined);
  }
  const complete = c.science.questions.every((q) => answers[q.id]);
  const score =
    80 +
    c.science.questions.reduce(
      (total, q) =>
        total + (q.answers.find((a) => a.id === answers[q.id])?.weight ?? 0),
      0,
    );
  return (
    <div className="science-panel">
      <p className="eyebrow">{c.science.optional}</p>
      {c.science.questions.map((q, i) => (
        <fieldset key={q.id}>
          <legend>
            <span className="question-index">0{i + 1}</span>
            {q.question}
          </legend>
          <div className="science-answers">
            {q.answers.map((a) => (
              <motion.button
                whileTap={reduced ? undefined : { scale: 0.97 }}
                animate={{
                  scale: !reduced && answers[q.id] === a.id ? [1, 1.02, 1] : 1,
                }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                key={a.id}
                type="button"
                aria-pressed={answers[q.id] === a.id}
                className={`pill ${answers[q.id] === a.id ? "active" : ""}`}
                onClick={() => choose(q.id, a.id)}
              >
                {a.label}
              </motion.button>
            ))}
          </div>
          <Reaction
            immediate
            className="science-reaction"
            text={
              activeQuestion === q.id
                ? (q.answers.find((a) => a.id === answers[q.id])?.reaction ??
                  "")
                : ""
            }
            revision={revisions[q.id] ?? 0}
          />
        </fieldset>
      ))}
      {complete && (
        <motion.div
          className="science-score"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>
            {c.science.scoreLabel} :{" "}
            <strong>
              <AnimatedNumber value={score} /> %
            </strong>
          </span>
          <p>{c.science.methodology}</p>
        </motion.div>
      )}
    </div>
  );
}
