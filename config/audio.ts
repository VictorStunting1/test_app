// Extraits locaux, volumes de 0 à 1. null laisse la piste jouer jusqu’à stopSound().
export const sounds = {
  "why-not": {
    src: "/assets/audio/why-not.mp3",
    volume: 0.22,
    maxSeconds: 8,
    loop: false,
  },
  "three-minutes": {
    src: "/assets/audio/three-minutes.mp3",
    volume: 0.16,
    maxSeconds: null,
    loop: true,
  },
  nope: {
    src: "/assets/audio/nope.mp3",
    volume: 0.32,
    maxSeconds: 6,
    loop: false,
  },
  success: {
    src: "/assets/audio/success.mp3",
    volume: 0.32,
    maxSeconds: 8,
    loop: false,
  },
} as const;

export type SoundName = keyof typeof sounds;

export const decisionSounds: Record<string, SoundName> = {
  maybe: "why-not",
  lawyer: "three-minutes",
  no: "nope",
  yes: "success",
};
