"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Copy,
  ArrowLeft,
  MessageCircle,
  Share2,
  Hourglass,
} from "lucide-react";
import {
  invitation,
  interactions,
  journey,
  personal,
} from "@/config/invitation";
import { SnailIllustration } from "./SnailIllustration";
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
  const reduced = useReducedMotion();
  const snail = personal.verdictSnails.find(
    (item) => item.decisionId === decisionId,
  );
  const [shareStatus, setShareStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const text = selection
    ? invitation.responseText(selection)
    : invitation.decisions.find((d) => d.id === decisionId)!.response;
  useEffect(() => {
    setShareStatus("");
    setCopied(false);
    setFailed(false);
  }, [text]);
  async function share() {
    setShareStatus("");
    if (!navigator.share) {
      setShareStatus(journey.shareUnavailable);
      return;
    }
    try {
      await navigator.share({ text });
      setShareStatus(journey.sharedLabel);
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError"))
        setShareStatus(journey.shareUnavailable);
    }
  }
  async function copy() {
    setShareStatus("");
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
        {decisionId === "maybe" ? (
          <MessageCircle />
        ) : decisionId === "lawyer" ? (
          <Hourglass />
        ) : (
          <Check />
        )}
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
      {snail && (
        <motion.span
          className="summary-snail"
          role="img"
          aria-label={snail.label}
          data-mood={snail.mood}
          animate={
            !reduced && snail.mood === "happy"
              ? { y: [0, -6, 0, -3, 0] }
              : !reduced && snail.mood === "skeptical"
                ? { rotate: [0, -5, 0] }
                : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.7 }}
        >
          <SnailIllustration mood={snail.mood} size={72} />
        </motion.span>
      )}
      {selection && (
        <dl>
          {[
            selection.activity.label,
            new Intl.DateTimeFormat("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            }).format(new Date(`${selection.date}T12:00:00`)),
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
      <div className="outgoing-message">
        <span className="eyebrow">{personal.messageLabel}</span>
        <p>{text}</p>
      </div>
      <button type="button" className="primary-button" onClick={share}>
        <Share2 size={17} />
        {journey.shareLabel}
      </button>
      <p className="share-hint">{journey.shareHint}</p>
      <p role="status" className="share-status">
        {shareStatus}
      </p>
      <div className="delivery-options">
        <button type="button" className="secondary-button" onClick={copy}>
          <Copy size={17} />
          {copied ? invitation.copiedLabel : invitation.copyLabel}
        </button>
      </div>
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
