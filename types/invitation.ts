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
  period: string;
  moment: string;
  date?: string;
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
