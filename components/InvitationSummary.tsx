"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ArrowLeft, MessageCircle } from "lucide-react";
import { invitation, interactions } from "@/config/invitation";
import type { ResponseSelection } from "@/types/invitation";
export function InvitationSummary({
  selection,
  decisionId,
  onEdit,
}: {
  selection: ResponseSelection | null;
  decisionId: string;
  onEdit: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const text = selection
    ? invitation.responseText(selection)
    : invitation.decisions.find((d) => d.id === decisionId)!.response;
  useEffect(() => {
    setCopied(false);
    setFailed(false);
  }, [text]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="summary"
      aria-live="polite"
    >
      <span className="summary-check">
        {decisionId === "maybe" ? <MessageCircle /> : <Check />}
      </span>
      <h2>
        {decisionId === "no"
          ? invitation.refusedTitle
          : decisionId === "lawyer"
            ? invitation.pendingTitle
            : decisionId === "maybe"
              ? interactions.tentativeTitle
              : invitation.summaryTitle}
      </h2>
      <p>
        {decisionId === "no"
          ? interactions.refusalIntro
          : decisionId === "lawyer"
            ? interactions.pendingIntro
            : decisionId === "maybe"
              ? interactions.tentativeIntro
              : invitation.summaryIntro}
      </p>
      {selection && (
        <dl>
          {[
            selection.activity.label,
            selection.period ===
            invitation.periods.find((p) => p.id === "improvise")?.label
              ? interactions.summary.improvise
              : selection.period,
            selection.moment,
          ].map((value, i) => (
            <div key={i}>
              <dt>
                {
                  [
                    decisionId === "maybe"
                      ? interactions.tentativePlan
                      : interactions.summary.plan,
                    decisionId === "maybe"
                      ? interactions.tentativeOrganisation
                      : interactions.summary.organisation,
                    interactions.summary.moment,
                  ][i]
                }
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
          {selection.science && (
            <>
              <div>
                <dt>{interactions.summary.science}</dt>
                <dd>
                  {selection.science.score} % {interactions.summary.compatible}
                </dd>
              </div>
              <div>
                <dt>{interactions.summary.risk}</dt>
                <dd>{selection.science.risk}</dd>
              </div>
            </>
          )}
        </dl>
      )}
      {selection?.science && (
        <div className="science-evidence">
          <h3 className="eyebrow">{interactions.summary.answers}</h3>
          {selection.science.answers.map((a) => (
            <p key={a.question}>
              <span>{a.question}</span>
              <strong>{a.answer}</strong>
            </p>
          ))}
        </div>
      )}
      <button className="primary-button" onClick={copy}>
        <Copy size={17} />
        {copied ? invitation.copiedLabel : invitation.copyLabel}
      </button>
      <p className="copy-status" role="status">
        {failed ? invitation.copyError : copied ? invitation.copiedLabel : ""}
      </p>
      {failed && (
        <textarea
          aria-label={invitation.copyLabel}
          readOnly
          value={text}
          onFocus={(event) => event.target.select()}
        />
      )}
      <button className="edit-button" onClick={onEdit}>
        <ArrowLeft size={15} />
        {invitation.editLabel}
      </button>
    </motion.div>
  );
}
