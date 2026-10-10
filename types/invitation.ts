export type IconName = "glass" | "food" | "activity" | "surprise";
export type Activity = {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: IconName;
  tag: string;
  reaction: string;
};
export type Choice = { id: string; label: string };
export type ResponseSelection = {
  activity: Activity;
  period: string;
  moment: string;
  decision: string;
};
