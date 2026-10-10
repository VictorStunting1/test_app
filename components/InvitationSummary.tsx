"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ArrowLeft } from "lucide-react";
import { invitation } from "@/config/invitation";
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
        <Check />
      </span>
      <h2>
        {decisionId === "no"
          ? invitation.refusedTitle
          : decisionId === "lawyer"
            ? invitation.pendingTitle
            : invitation.summaryTitle}
      </h2>
      <p>{invitation.summaryIntro}</p>
      {selection && (
        <dl>
          {[selection.activity.label, selection.period, selection.moment].map(
            (value, i) => (
              <div key={i}>
                <dt>{invitation.summaryLabels[i]}</dt>
                <dd>{value}</dd>
              </div>
            ),
          )}
        </dl>
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
