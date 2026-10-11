"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { invitation, interactions } from "@/config/invitation";
import { Reaction } from "./Reaction";

export function HeroTicket() {
  const [taps, setTaps] = useState(0);
  const reduced = useReducedMotion();
  const artwork = invitation.artwork;
  return (
    <div className="hero-art">
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <motion.div
        className="ticket-float"
        animate={{ y: reduced ? 0 : [0, -5, 0] }}
        transition={{
          duration: 2.4,
          repeat: reduced ? 0 : 1,
          ease: "easeInOut",
        }}
      >
        <motion.button
          type="button"
          className="invitation-ticket"
          aria-label={interactions.starLabel}
          onClick={() => setTaps((value) => value + 1)}
          whileTap={reduced ? undefined : { scale: 0.98, rotate: -2 }}
          whileHover={reduced ? undefined : { rotate: -1 }}
          transition={{ type: "spring", stiffness: 350, damping: 24 }}
        >
          <span className="ticket-star" aria-hidden="true">
            <Sparkles size={26} strokeWidth={1.2} />
          </span>
          <span className="ticket-small">{artwork.heading}</span>
          <span className="ticket-title">
            {artwork.lines[0]}
            <br />
            {artwork.lines[1]}
            <br />
            <i>{artwork.question}</i>
          </span>
          <span className="ticket-bottom">
            {artwork.ticket} <ArrowUpRight size={18} />
          </span>
        </motion.button>
      </motion.div>
      <Reaction
        immediate
        text={taps ? interactions.starReply : ""}
        revision={taps}
        className="star-reaction"
      />
      <span className="art-caption">{artwork.caption}</span>
    </div>
  );
}
