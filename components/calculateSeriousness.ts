import { seriousnessRules as rules } from "@/config/invitation";
import type {
  SeriousnessChoices,
  SeriousnessPercentages,
  SeriousnessWeights,
} from "@/types/invitation";
import { isAvailableDate } from "./calendarUtils";

// Largest-remainder rounding keeps the three integers at exactly 100, even
// during interpolation. Equal remainders keep their original dimension order.
export function normalizePercentages(
  values: SeriousnessPercentages,
): SeriousnessPercentages {
  const positive = values.map((value) =>
    Number.isFinite(value) ? Math.max(0, value) : 0,
  );
  const total = positive.reduce((sum, value) => sum + value, 0);
  if (!total) return [34, 33, 33];
  const exact = positive.map((value) => (value * 100) / total);
  const rounded = exact.map(Math.floor);
  const order = exact
    .map((value, index) => ({ index, remainder: value - rounded[index] }))
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  const remaining = 100 - rounded.reduce((sum, value) => sum + value, 0);
  for (let i = 0; i < remaining; i++) rounded[order[i].index]++;
  return rounded as SeriousnessPercentages;
}

export function calculateSeriousness(choices: SeriousnessChoices) {
  const points = { ...rules.base };
  function add(weights: Partial<SeriousnessWeights> | undefined) {
    if (!weights) return;
    points.organisation += weights.organisation ?? 0;
    points.idea += weights.idea ?? 0;
    points.improvisation += weights.improvisation ?? 0;
  }
  add(rules.activities[choices.activityId]);
  const preciseDate = isAvailableDate(choices.date);
  if (preciseDate) add(rules.preciseDate);
  add(rules.moments[choices.momentId]);
  for (const [questionId, answerId] of Object.entries(choices.scienceAnswers)) {
    add(rules.science[questionId]?.[answerId]);
  }
  const values = normalizePercentages([
    points.organisation,
    points.idea,
    points.improvisation,
  ]);
  const [organisation, , improvisation] = values;
  const surprise = choices.activityId === "surprise";
  const prudentCount = rules.prudentAnswers.filter(
    (answer) => choices.scienceAnswers[answer.questionId] === answer.answerId,
  ).length;
  const profile =
    surprise && improvisation >= rules.thresholds.improvisation
      ? rules.profiles.bourbier
      : organisation >= rules.thresholds.organisation
        ? prudentCount >= rules.thresholds.prudentAnswers
          ? rules.profiles.prudent
          : rules.profiles.organised
        : surprise
          ? rules.profiles.confident
          : improvisation >= rules.thresholds.improvisation
            ? rules.profiles.improvised
            : rules.profiles.balanced;
  return { values, labels: profile.labels, note: profile.note };
}
