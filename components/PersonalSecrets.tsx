"use client";
import { useState } from "react";
import { Compass, Wine } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { invitation, personal } from "@/config/invitation";
import { Reaction } from "./Reaction";

export function ActivityPrelude({
  activityId,
  onSelect,
  reply,
  revision,
}: {
  activityId: string;
  onSelect: (id: string) => void;
  reply: string;
  revision: number;
}) {
  return (
    <div className="personal-prelude">
      <p className="personal-greeting">{personal.arrival[0]}</p>
      <p>{personal.arrival[1]}</p>
      <div className="personal-badges">
        <button
          type="button"
          className="personal-badge"
          aria-pressed={activityId === "drink"}
          onClick={() => onSelect("drink")}
        >
          <span className="badge-visual" aria-hidden="true">
            <Wine size={18} />
          </span>
          <span>{personal.glassLabel}</span>
        </button>
        <button
          type="button"
          className="personal-badge"
          aria-pressed={activityId === "surprise"}
          onClick={() => onSelect("surprise")}
        >
          <span className="badge-visual" aria-hidden="true">
            <Compass size={18} />
          </span>
          <span>{personal.bourbierLabel}</span>
        </button>
      </div>
      <Reaction immediate text={reply} revision={revision} />
    </div>
  );
}

export function AvailabilityBalance({
  active,
  onInspect,
}: {
  active: boolean;
  onInspect: () => void;
}) {
  const [analysis, setAnalysis] = useState(0);
  const c = personal.agenda;
  return (
    <div className="agenda-balance">
      <span className="eyebrow">{c.heading}</span>
      <div className="agenda-comparison">
        <div>
          <strong>{invitation.recipientName}</strong>
          <span>{c.recipient}</span>
          <b>{c.recipientValue}</b>
        </div>
        <div>
          <strong>{invitation.senderName}</strong>
          <span>{c.sender}</span>
          <b>{c.senderValue}</b>
        </div>
      </div>
      <p>{c.note}</p>
      <button
        type="button"
        className="text-button"
        onClick={() => {
          onInspect();
          setAnalysis((v) => v + 1);
        }}
      >
        {c.analysisLabel}
      </button>
      <Reaction
        immediate
        text={active && analysis ? (analysis % 2 ? c.analysis : c.aside) : ""}
        revision={analysis}
      />
    </div>
  );
}

export function PersonalSecrets({ showLyon }: { showLyon: boolean }) {
  const [demon, setDemon] = useState(0);
  const [math, setMath] = useState(0);
  const [lyon, setLyon] = useState(0);
  const [activeSecret, setActiveSecret] = useState<
    "demon" | "math" | "lyon" | null
  >(null);
  const reduced = useReducedMotion();
  const demonIndex = (demon - 1) % personal.demonReplies.length;
  return (
    <div className="personal-secrets">
      <div className="secret-grid">
        <div className="secret-card demon-card">
          <motion.button
            type="button"
            aria-label={personal.demonLabel}
            className="demon-button"
            whileTap={{ scale: reduced ? 1 : 0.93 }}
            onClick={() => {
              setActiveSecret("demon");
              setDemon((v) => v + 1);
            }}
          >
            <motion.svg
              key={demon}
              animate={
                demon && !reduced
                  ? { rotate: [0, -9, 9, 0], y: [0, -4, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              width="52"
              height="52"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 24C12 22 12 12 14 8L25 18M45 24C52 22 52 12 50 8L39 18"
                fill="#bc9b68"
                stroke="#745469"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M48 45C58 48 55 56 60 51"
                stroke="#745469"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 44C11 31 16 18 32 18C48 18 53 31 47 44L43 54H21L17 44Z"
                fill="#e6d8df"
                stroke="#745469"
                strokeWidth="1.5"
              />
              <path
                d="M24 34L27 35M37 35L40 34M28 43Q32 47 36 43"
                stroke="#745469"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.button>
          <p className="demon-caption">{personal.demonCaption}</p>
          <p className="demon-intro">{personal.demonIntro}</p>
          <Reaction
            immediate
            text={
              activeSecret === "demon" ? personal.demonReplies[demonIndex] : ""
            }
            revision={demon}
          />
        </div>
        <div className="secret-card math-card">
          <span className="eyebrow">{personal.mathHeading}</span>
          <button
            type="button"
            className="text-button"
            aria-expanded={math > 0}
            onClick={() => {
              setActiveSecret("math");
              setMath((v) => v + 1);
            }}
          >
            {personal.mathLabel}
          </button>
          {math > 0 && (
            <motion.div
              className="dubious-equation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {personal.mathTerms.map((term, i) => (
                <span key={term}>
                  {i > 0 && <i> + </i>}
                  {term}
                </span>
              ))}
              <strong>= {personal.mathResult}</strong>
            </motion.div>
          )}
          <Reaction
            immediate
            text={activeSecret === "math" && math > 1 ? personal.mathReply : ""}
            revision={math}
          />
        </div>
      </div>
      {showLyon && (
        <div className="lyon-archive">
          <button
            type="button"
            className="text-button lyon-context"
            onClick={() => {
              setActiveSecret("lyon");
              setLyon((v) => v + 1);
            }}
          >
            {activeSecret === null ? personal.lyonIntro : personal.lyonLabel}
          </button>
          <Reaction
            immediate
            text={
              activeSecret === "lyon"
                ? personal.lyonReplies[(lyon - 1) % personal.lyonReplies.length]
                : ""
            }
            revision={lyon}
          />
        </div>
      )}
    </div>
  );
}
