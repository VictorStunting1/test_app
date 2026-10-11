"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { interactions as c } from "@/config/invitation";
import type {
  ScienceAnswer,
  ScienceResult,
  ScienceChoices,
} from "@/types/invitation";
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
  const [questionIndex, setQuestionIndex] = useState(0);
  const questionRef = useRef<HTMLFieldSetElement>(null);
  const navigationRequested = useRef(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!navigationRequested.current) return;
    navigationRequested.current = false;
    questionRef.current?.focus({ preventScroll: true });
    questionRef.current?.scrollIntoView({
      block: "nearest",
      behavior: reduced ? "instant" : "smooth",
    });
  }, [questionIndex, reduced]);
  function moveQuestion(index: number) {
    navigationRequested.current = true;
    setActiveQuestion("");
    setQuestionIndex(index);
  }
  function choose(questionId: string, answerId: string) {
    const next = { ...answers, [questionId]: answerId };
    setActiveQuestion(questionId);
    setAnswers(next);
    onAnswersChange(next);
    setRevisions((current) => ({
      ...current,
      [questionId]: (current[questionId] ?? 0) + 1,
    }));
    const chosen: (ScienceAnswer | undefined)[] = c.science.questions.map((q) =>
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
        highlights: chosen
          .flatMap((answer) => (answer?.shareText ? [answer.shareText] : []))
          .slice(0, 2),
      });
    } else onResult(undefined);
  }
  const complete = c.science.questions.every((q) => answers[q.id]);
  const currentAnswered = Boolean(
    answers[c.science.questions[questionIndex].id],
  );
  const score =
    80 +
    c.science.questions.reduce(
      (total, q) =>
        total + (q.answers.find((a) => a.id === answers[q.id])?.weight ?? 0),
      0,
    );
  return (
    <div className="science-panel">
      <p className="eyebrow">{c.science.disclaimer}</p>
      <p className="science-progress" role="status">
        {c.science.progressLabel} {questionIndex + 1} /{" "}
        {c.science.questions.length}
      </p>
      {c.science.questions.slice(questionIndex, questionIndex + 1).map((q) => (
        <fieldset key={q.id} ref={questionRef} tabIndex={-1}>
          <legend>
            <span className="question-index">0{questionIndex + 1}</span>
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
      <div className="science-navigation">
        {questionIndex > 0 && (
          <button
            type="button"
            className="secondary-button"
            onClick={() => moveQuestion(questionIndex - 1)}
          >
            {c.science.previousLabel}
          </button>
        )}
        {questionIndex < c.science.questions.length - 1 && (
          <button
            type="button"
            className="secondary-button quiz-next"
            disabled={!currentAnswered}
            onClick={() => {
              if (currentAnswered) moveQuestion(questionIndex + 1);
            }}
          >
            {c.science.nextLabel}
          </button>
        )}
      </div>
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
