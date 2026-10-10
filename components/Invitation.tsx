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
import { invitation as c, interactions as fun } from "@/config/invitation";
import { ActivityCard } from "./ActivityCard";
import { AvailabilitySelector } from "./AvailabilitySelector";
import { MobileCompanions } from "./MobileCompanions";
import { SeriousnessGauge } from "./SeriousnessGauge";
import { CompatibilityTest } from "./CompatibilityTest";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";
import { FinalDecision } from "./FinalDecision";
import { InvitationSummary } from "./InvitationSummary";
import type { ResponseSelection, ScienceResult } from "@/types/invitation";

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
          <motion.h2
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {title}
          </motion.h2>
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
  const [whyClicks, setWhyClicks] = useState(0);
  const [withdrawReply, setWithdrawReply] = useState("");
  const [activityRevision, setActivityRevision] = useState(0);
  const [agendaTitle, setAgendaTitle] = useState(c.availabilityHeading);
  const [science, setScience] = useState<ScienceResult>();
  const [footerClicks, setFooterClicks] = useState(0);
  const [starClicks, setStarClicks] = useState(0);
  const [decisionRevision, setDecisionRevision] = useState(0);
  const withdrawalTimer = useDelayedAction();
  const agendaTimer = useDelayedAction();
  const scrollTimer = useDelayedAction();
  const resultRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const activity = c.activities.find((a) => a.id === activityId);
  const selection: ResponseSelection | null =
    activity && period
      ? {
          activity,
          science,
          period: c.periods.find((p) => p.id === period)!.label,
          moment: c.moments.find((m) => m.id === moment)!.label,
          decision: c.decisions.find((d) => d.id === decision)?.response ?? "",
        }
      : null;
  function decide(id: string) {
    if ((id === "yes" || id === "maybe") && !selection) {
      setError(c.validationMessage);
      return false;
    }
    setError("");
    setDecision(id);
    setDecisionRevision((v) => v + 1);
    scrollTimer.schedule(
      () =>
        resultRef.current?.scrollIntoView({
          behavior: reduceMotion ? "instant" : "smooth",
          block: "center",
        }),
      100,
    );
    return true;
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
            <button
              type="button"
              className="text-button why-button"
              onClick={() => setWhyClicks((v) => v + 1)}
            >
              {fun.whyLabel}
            </button>
            <Reaction
              text={
                whyClicks
                  ? fun.whyAnswers[(whyClicks - 1) % fun.whyAnswers.length]
                  : ""
              }
              revision={whyClicks}
            />
            <p className="hero-note">
              <Heart size={13} />
              {c.heroNote}
            </p>
          </motion.div>
          <div className="hero-art">
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="invitation-ticket">
              <button
                type="button"
                aria-label={fun.starLabel}
                className="ticket-star secret-star"
                onClick={() => setStarClicks((v) => v + 1)}
              >
                <Sparkles size={32} strokeWidth={1.2} />
              </button>
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
            <Reaction
              text={starClicks ? fun.starReply : ""}
              revision={starClicks}
              className="star-reaction"
            />
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
                  withdrawalTimer.cancel();
                  setWithdrawReply("");
                  setActivityRevision((v) => v + 1);
                  setError("");
                  setActivity(a.id);
                  setDecision("");
                }}
              />
            ))}
          </div>
          <div className="activity-comment">
            <Reaction
              text={withdrawReply || activity?.reaction || ""}
              revision={activityRevision}
            />
            {activity?.id === "surprise" && (
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setWithdrawReply(fun.withdrawReplies[0]);
                  setActivityRevision((v) => v + 1);
                  withdrawalTimer.schedule(
                    () => setWithdrawReply(fun.withdrawReplies[1]),
                    1000,
                  );
                }}
              >
                {fun.withdrawLabel}
              </button>
            )}
          </div>
        </Section>
        <Section number="02" title={agendaTitle} intro={c.availabilityIntro}>
          <AvailabilitySelector
            period={period}
            moment={moment}
            onPeriod={(id) => {
              setPeriod(id);
              setError("");
              agendaTimer.cancel();
              setAgendaTitle(
                id === "improvise"
                  ? fun.improvisedHeading
                  : c.availabilityHeading,
              );
              if (id === "improvise")
                agendaTimer.schedule(
                  () => setAgendaTitle(c.availabilityHeading),
                  4000,
                );
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
          title={fun.science.heading}
          intro={fun.science.intro}
        >
          <CompatibilityTest onResult={setScience} />
        </Section>
        <Section
          number="04"
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
          <SeriousnessGauge />
          <MobileCompanions />
        </Section>
        <section className="final-section">
          <span className="eyebrow">{c.finalEyebrow}</span>
          <h2>{c.finalHeading}</h2>
          <p className="final-intro">{c.finalIntro}</p>
          <FinalDecision
            key={`${activityId}-${period}-${moment}`}
            onDecision={decide}
            error={error}
          />
          <div ref={resultRef}>
            <AnimatePresence>
              {decision && (
                <InvitationSummary
                  key={`${decision}-${decisionRevision}`}
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
            <div className="confetti" key={decisionRevision} aria-hidden="true">
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
        <button
          type="button"
          className="footer-secret"
          onClick={() => setFooterClicks((v) => v + 1)}
        >
          {c.footer}
        </button>
        <Reaction
          text={
            footerClicks >= 3
              ? fun.footerSecrets[footerClicks === 3 ? 0 : 1]
              : ""
          }
          revision={footerClicks}
          className="footer-reaction"
        />
        <p className="footer-note">{c.footerNote}</p>
      </footer>
    </div>
  );
}
