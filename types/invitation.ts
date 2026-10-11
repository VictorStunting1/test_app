export type IconName = "glass" | "food" | "activity" | "surprise";
export type Activity = {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: IconName;
  tag: string;
  reaction: string;
  risk: string;
  classified?: boolean;
};
export type Choice = { id: string; label: string };
export type ResponseSelection = {
  activity: Activity;
  moment: string;
  date: string;
  decision: string;
  decisionId: string;
  science?: ScienceResult;
};

export type ScienceAnswer = {
  id: string;
  label: string;
  reaction: string;
  weight: number;
  risk?: string;
};
export type ScienceQuestion = {
  id: string;
  question: string;
  answers: ScienceAnswer[];
};
export type ScienceResult = {
  score: number;
  answers: { question: string; answer: string }[];
  risk: string;
};

export type SnailMood = "neutral" | "happy" | "skeptical" | "hopeful" | "sad";

export type VerdictFrame = {
  at: number;
  text: string;
  detail: string;
  car?: boolean;
  thinkingTimer?: boolean;
};

export type ScienceChoices = Record<string, string>;
export type SeriousnessChoices = {
  activityId: string;
  momentId: string;
  date: string;
  scienceAnswers: ScienceChoices;
};
export type SeriousnessWeights = {
  organisation: number;
  idea: number;
  improvisation: number;
};
export type SeriousnessPercentages = [number, number, number];
export type SeriousnessProfile = {
  labels: [string, string, string];
  note: string;
};
export type SeriousnessRules = {
  base: SeriousnessWeights;
  preciseDate: Partial<SeriousnessWeights>;
  activities: Record<string, Partial<SeriousnessWeights>>;
  moments: Record<string, Partial<SeriousnessWeights>>;
  science: Record<string, Record<string, Partial<SeriousnessWeights>>>;
  prudentAnswers: { questionId: string; answerId: string }[];
  thresholds: {
    organisation: number;
    improvisation: number;
    prudentAnswers: number;
  };
  profiles: Record<
    | "balanced"
    | "organised"
    | "improvised"
    | "bourbier"
    | "confident"
    | "prudent",
    SeriousnessProfile
  >;
};
