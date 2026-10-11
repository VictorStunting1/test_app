"use client";
import { useCallback, useEffect, useRef } from "react";
import { InvitationAudio } from "@/lib/invitationAudio";
import type { SoundName } from "@/config/audio";

export function useInvitationAudio(active: boolean) {
  const audio = useRef<InvitationAudio | null>(null);
  useEffect(() => {
    const controller = new InvitationAudio();
    audio.current = controller;
    controller.preload();
    const onVisibility = () => {
      if (document.hidden) controller.stopSound();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      controller.dispose();
      audio.current = null;
    };
  }, []);
  const stopSound = useCallback(() => audio.current?.stopSound(), []);
  const playSound = useCallback(
    (name: SoundName, options?: { delayMs?: number }) => {
      void audio.current?.playSound(name, options);
    },
    [],
  );
  useEffect(() => {
    if (!active) stopSound();
  }, [active, stopSound]);
  return { playSound, stopSound };
}
