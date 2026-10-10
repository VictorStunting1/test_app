"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  Shirt,
  Wallet,
  Clock3,
  Heart,
} from "lucide-react";
import { invitation as c } from "@/config/invitation";
import { ActivityCard } from "./ActivityCard";
import { AvailabilitySelector } from "./AvailabilitySelector";
import { FunnyStat } from "./FunnyStat";
import { FinalDecision } from "./FinalDecision";
import { InvitationSummary } from "./InvitationSummary";
import type { ResponseSelection } from "@/types/invitation";

function Section({
  number,
  title,
  intro,
  children,
  id,
}: {
  number: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="section"
    >
      <div className="section-heading">
        <span className="section-number">{number}</span>
        <div>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}
export function Invitation() {
  const [activityId, setActivity] = useState("");
  const [period, setPeriod] = useState("");
  const [moment, setMoment] = useState(
    c.moments.find((item) => item.id === "any")?.id ?? c.moments[0]?.id ?? "",
  );
  const [decision, setDecision] = useState("");
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const activity = c.activities.find((a) => a.id === activityId);
  const selection: ResponseSelection | null =
    activity && period
      ? {
          activity,
          period: c.periods.find((p) => p.id === period)!.label,
          moment: c.moments.find((m) => m.id === moment)!.label,
          decision: c.decisions.find((d) => d.id === decision)?.response ?? "",
        }
      : null;
  function decide(id: string) {
    if ((id === "yes" || id === "maybe") && !selection) {
      setError(c.validationMessage);
      return;
    }
    setError("");
    setDecision(id);
    setTimeout(
      () =>
        resultRef.current?.scrollIntoView({
          behavior: reduceMotion ? "instant" : "smooth",
          block: "center",
        }),
      100,
    );
  }
  return (
    <div className="site">
      <header className="masthead">
        <a href="#" className="brand">
          <span className="brand-mark">
            <Sparkles size={15} />
          </span>
          {c.brand}
        </a>
        <span className="header-note">
          {c.senderName} <ArrowUpRight size={12} /> {c.recipientName}
        </span>
      </header>
      <main>
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="dossier">
              <span className="live-dot" />
              {c.dossier}
              <span className="dossier-line" />
            </div>
            <p className="recipient">
              {c.badge} <span>{c.recipientName}</span>
            </p>
            <h1>{c.title}</h1>
            <p className="hero-intro">{c.intro}</p>
            <a className="primary-button hero-cta" href="#activities">
              {c.heroCta}
              <ArrowDown size={17} />
            </a>
            <p className="hero-note">
              <Heart size={13} />
              {c.heroNote}
            </p>
          </motion.div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="invitation-ticket">
              <span className="ticket-star">
                <Sparkles size={32} strokeWidth={1.2} />
              </span>
              <span className="ticket-small">{c.artwork.heading}</span>
              <span className="ticket-title">
                {c.artwork.lines[0]}
                <br />
                {c.artwork.lines[1]}
                <br />
                <i>{c.artwork.question}</i>
              </span>
              <span className="ticket-bottom">
                {c.artwork.ticket} <ArrowUpRight size={18} />
              </span>
            </div>
            <span className="art-caption">{c.artwork.caption}</span>
          </div>
        </section>
        <Section
          number="01"
          title={c.activityHeading}
          intro={c.activityIntro}
          id="activities"
        >
          <div className="activity-grid">
            {c.activities.map((a, i) => (
              <ActivityCard
                key={a.id}
                activity={a}
                index={i}
                selected={a.id === activityId}
                onSelect={() => {
                  setActivity(a.id);
                  setDecision("");
                }}
              />
            ))}
          </div>
          <div className="reaction" aria-live="polite">
            <AnimatePresence mode="wait">
              {activity && (
                <motion.p
                  key={activity.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Sparkles size={15} />
                  {activity.reaction}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </Section>
        <Section
          number="02"
          title={c.availabilityHeading}
          intro={c.availabilityIntro}
        >
          <AvailabilitySelector
            period={period}
            moment={moment}
            onPeriod={(id) => {
              setPeriod(id);
              setDecision("");
            }}
            onMoment={(id) => {
              setMoment(id);
              setDecision("");
            }}
          />
        </Section>
        <Section
          number="03"
          title={c.parametersHeading}
          intro={c.parametersIntro}
        >
          <div className="parameter-grid">
            {c.parameters.map((p) => {
              const Icon =
                (
                  { shirt: Shirt, wallet: Wallet, clock: Clock3 } as Record<
                    string,
                    typeof Shirt
                  >
                )[p.icon] ?? Sparkles;
              return (
                <div className="parameter" key={p.title}>
                  <Icon size={20} strokeWidth={1.5} />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              );
            })}
          </div>
          <div className="seriousness">
            <span className="eyebrow">{c.seriousnessLabel}</span>
            <div className="stat-bar" aria-hidden="true">
              {c.stats.map((s, i) => (
                <span
                  key={s.label}
                  className={`tone-${i}`}
                  style={{ flex: s.value }}
                />
              ))}
            </div>
            <div className="stat-labels">
              {c.stats.map((s, i) => (
                <FunnyStat key={s.label} {...s} index={i} />
              ))}
            </div>
          </div>
        </Section>
        <section className="final-section">
          <span className="eyebrow">{c.finalEyebrow}</span>
          <h2>{c.finalHeading}</h2>
          <p className="final-intro">{c.finalIntro}</p>
          <FinalDecision onDecision={decide} error={error} />
          <div ref={resultRef}>
            <AnimatePresence>
              {decision && (
                <InvitationSummary
                  key={decision}
                  selection={
                    decision === "no" || decision === "lawyer"
                      ? null
                      : selection
                  }
                  decisionId={decision}
                  onEdit={() => setDecision("")}
                />
              )}
            </AnimatePresence>
          </div>
          {decision === "yes" && !reduceMotion && (
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 18 }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    x: (i - 8.5) * 28,
                    y: -160 - (i % 4) * 35,
                    opacity: 0,
                    rotate: i * 45,
                  }}
                  transition={{ duration: 1.5, delay: (i % 3) * 0.05 }}
                  style={{
                    background: ["#745469", "#bc9b68", "#a8b49a"][i % 3],
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <footer>
        <span className="brand footer-brand">
          <Sparkles size={14} />
          {c.brand}
        </span>
        <p>{c.footer}</p>
        <p className="footer-note">{c.footerNote}</p>
      </footer>
    </div>
  );
}
