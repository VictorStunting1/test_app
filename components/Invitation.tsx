"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  Target,
  Clock3,
  Heart,
} from "lucide-react";
import {
  invitation as c,
  interactions as fun,
  journey,
  personal,
  availability,
} from "@/config/invitation";
import { ActivityCard } from "./ActivityCard";
import { HeroTicket } from "./HeroTicket";
import { WhyGimmick } from "./WhyGimmick";
import { isAvailableDate, isAvailableMoment } from "./calendarUtils";
import { AvailabilitySelector } from "./AvailabilitySelector";
import {
  ActivityPrelude,
  AvailabilityBalance,
  PersonalSecrets,
} from "./PersonalSecrets";
import { MobileCompanions } from "./MobileCompanions";
import { SeriousnessGauge } from "./SeriousnessGauge";
import { CompatibilityTest } from "./CompatibilityTest";
import { Reaction } from "./Reaction";
import { useDelayedAction } from "./useDelayedAction";
import { FinalDecision } from "./FinalDecision";
import { InvitationSummary } from "./InvitationSummary";
import type {
  ResponseSelection,
  ScienceResult,
  ScienceChoices,
} from "@/types/invitation";

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
  const [step, setStep] = useState(0);
  const [unlocked, setUnlocked] = useState(1);
  const [summaryReady, setSummaryReady] = useState(false);
  const [date, setDate] = useState("");
  const journeyRef = useRef<HTMLDivElement>(null);
  const [carTrips, setCarTrips] = useState(0);
  const [activityId, setActivity] = useState("");
  const [moment, setMoment] = useState("");
  const [decision, setDecision] = useState("");
  const [error, setError] = useState("");
  const [withdrawReply, setWithdrawReply] = useState("");
  const [activityRevision, setActivityRevision] = useState(0);
  const [science, setScience] = useState<ScienceResult>();
  const [scienceAnswers, setScienceAnswers] = useState<ScienceChoices>({});
  const [footerClicks, setFooterClicks] = useState(0);
  const [decisionRevision, setDecisionRevision] = useState(0);
  const withdrawalTimer = useDelayedAction();
  const scrollTimer = useDelayedAction();
  const resultRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const activity = c.activities.find((a) => a.id === activityId);
  const hasSchedule = Boolean(
    isAvailableDate(date) && moment && isAvailableMoment(date, moment),
  );
  const selection: ResponseSelection | null =
    activity && hasSchedule
      ? {
          activity,
          decisionId: decision,
          science,
          date,
          moment: c.moments.find((m) => m.id === moment)!.label,
          decision: c.decisions.find((d) => d.id === decision)?.response ?? "",
        }
      : null;
  useEffect(() => {
    if (!step) return;
    journeyRef.current?.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "start",
    });
    journeyRef.current?.focus({ preventScroll: true });
  }, [step, reduceMotion]);
  const canContinue =
    step === 1 ? Boolean(activity) : step === 2 ? hasSchedule : true;
  const nextHint =
    step === 1 ? personal.activityHint : personal.availabilityHint;
  function showSummary() {
    setSummaryReady(true);
    scrollTimer.schedule(
      () =>
        resultRef.current?.scrollIntoView({
          behavior: reduceMotion ? "instant" : "smooth",
          block: "start",
        }),
      100,
    );
  }
  function decide(id: string) {
    if (id === "yes" && !selection) {
      setError(c.validationMessage);
      return false;
    }
    setError("");
    setDecision(id);
    setDecisionRevision((v) => v + 1);
    scrollTimer.cancel();
    setSummaryReady(false);
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
        {step === 0 && (
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
              <button
                type="button"
                className="primary-button hero-cta"
                onClick={() => setStep(1)}
              >
                {c.heroCta}
                <ArrowDown size={17} />
              </button>
              <WhyGimmick />
              <p className="hero-note">
                <Heart size={13} />
                {c.heroNote}
              </p>
            </motion.div>
            <HeroTicket />
          </section>
        )}
        {step > 0 && (
          <>
            <div ref={journeyRef} tabIndex={-1} className="journey-header">
              <span className="eyebrow">
                {step} / 4 · {journey.steps[step - 1]}
              </span>
              <div
                className="journey-progress"
                aria-label={`Étape ${step} sur 4`}
              >
                {journey.steps.map((label, i) => (
                  <span key={label} className={i < step ? "complete" : ""} />
                ))}
              </div>
            </div>
            <div className="journey-panel" hidden={step !== 1}>
              <ActivityPrelude />
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
                        if (a.id === "surprise") setCarTrips((v) => v + 1);
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
                <MobileCompanions carTrips={carTrips} />
              </Section>
            </div>
            {unlocked >= 2 && (
              <div className="journey-panel" hidden={step !== 2}>
                <Section
                  number="02"
                  title={c.availabilityHeading}
                  intro={c.availabilityIntro}
                >
                  <AvailabilityBalance />
                  <AvailabilitySelector
                    date={date}
                    onDate={(value) => {
                      if (value && !isAvailableDate(value)) return;
                      setDate(value);
                      if (value === availability.earliestDate)
                        setMoment(availability.earliestMoment);
                      setError("");
                      setDecision("");
                    }}
                    moment={moment}
                    onMoment={(id) => {
                      if (!isAvailableMoment(date, id)) return;
                      setMoment(id);
                      setError("");
                      setDecision("");
                    }}
                  />
                </Section>
              </div>
            )}
            {unlocked >= 3 && (
              <div className="journey-panel" hidden={step !== 3}>
                <Section
                  number="03"
                  title={personal.heading}
                  intro={personal.intro}
                >
                  <PersonalSecrets />
                  <details className="fine-print optional-science">
                    <summary>{personal.quizLabel}</summary>
                    <p className="optional-quiz">{journey.optionalQuiz}</p>
                    <CompatibilityTest
                      onResult={setScience}
                      onAnswersChange={setScienceAnswers}
                    />
                  </details>
                </Section>
                <details className="fine-print">
                  <summary>{journey.detailsLabel}</summary>
                  <Section
                    number="04"
                    title={c.parametersHeading}
                    intro={c.parametersIntro}
                  >
                    <div className="parameter-grid clarification-grid">
                      {c.parameters.map((p) => {
                        const Icon =
                          (
                            {
                              target: Target,
                              clock: Clock3,
                            } as Record<string, typeof Target>
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
                    <SeriousnessGauge
                      choices={{
                        activityId,
                        momentId: moment,
                        date,
                        scienceAnswers,
                      }}
                    />
                  </Section>
                </details>
              </div>
            )}
            {unlocked >= 4 && (
              <div className="journey-panel" hidden={step !== 4}>
                <section className="final-section">
                  <span className="eyebrow">{c.finalEyebrow}</span>
                  <h2>{c.finalHeading}</h2>
                  <p className="final-intro">{c.finalIntro}</p>
                  <FinalDecision
                    key="verdict"
                    decisionId={decision}
                    active={step === 4}
                    onSequenceComplete={showSummary}
                    resolved={Boolean(decision && decision !== "lawyer")}
                    onDecision={decide}
                    error={error}
                  />
                  <div ref={resultRef}>
                    <AnimatePresence>
                      {decision && summaryReady && (
                        <InvitationSummary
                          key={`${decision}-${decisionRevision}`}
                          selection={
                            decision === "no" || decision === "lawyer"
                              ? null
                              : selection
                          }
                          decisionId={decision}
                          onEdit={() => {
                            setDecision("");
                            setSummaryReady(false);
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  {decision === "yes" && !reduceMotion && (
                    <div
                      className="confetti"
                      key={decisionRevision}
                      aria-hidden="true"
                    >
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
                            background: ["#745469", "#bc9b68", "#a8b49a"][
                              i % 3
                            ],
                          }}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}
            <div className="journey-navigation">
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setDecision("");
                  setSummaryReady(false);
                  scrollTimer.cancel();
                  setError("");
                  setStep((value) => value - 1);
                }}
              >
                {journey.backLabel}
              </button>
              {step < 4 && (
                <div className="journey-next">
                  <button
                    type="button"
                    className="primary-button"
                    disabled={!canContinue}
                    aria-describedby={
                      !canContinue ? "next-step-hint" : undefined
                    }
                    onClick={() => {
                      if (!canContinue) return;
                      setUnlocked((value) => Math.max(value, step + 1));
                      setStep((value) => value + 1);
                    }}
                  >
                    {journey.continueLabels[step - 1]}
                    <ArrowUpRight size={17} />
                  </button>
                  {!canContinue && (
                    <p id="next-step-hint" className="progress-hint">
                      {nextHint}
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>
      {step === 4 && (
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
              footerClicks
                ? fun.footerSecrets[
                    (footerClicks - 1) % fun.footerSecrets.length
                  ]
                : ""
            }
            revision={footerClicks}
            className="footer-reaction"
          />
          <p className="footer-note">{c.footerNote}</p>
        </footer>
      )}
    </div>
  );
}
