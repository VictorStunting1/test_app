import { availability } from "@/config/invitation";

// ISO dates compare chronologically and stay independent of the phone's timezone.
export function calendarDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

export function parseCalendarDate(value: string) {
  return new Date(`${value}T12:00:00Z`);
}

export function isAvailableDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = parseCalendarDate(value);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value &&
    value >= availability.earliestDate
  );
}

export function isAvailableMoment(date: string, moment: string) {
  return (
    date !== availability.earliestDate || moment === availability.earliestMoment
  );
}
