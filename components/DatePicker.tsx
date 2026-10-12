"use client";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { availability } from "@/config/invitation";
import {
  calendarDate,
  getDateAvailability,
  isAvailableDate,
  parseCalendarDate,
} from "./calendarUtils";

const monthFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const dayFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (date: string) => void;
}) {
  const [month, setMonth] = useState(() =>
    (value || availability.earliestDate).slice(0, 7),
  );
  const [direction, setDirection] = useState(1);
  const [focusDate, setFocusDate] = useState("");
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());
  const monthId = useId();
  const noteId = useId();
  const partialNoteId = useId();
  const reduced = useReducedMotion();
  const [year, monthNumber] = month.split("-").map(Number);
  const monthIndex = monthNumber - 1;
  const firstDay = parseCalendarDate(`${month}-01`);
  const offset = (firstDay.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const slots = Math.ceil((offset + days) / 7) * 7;
  const selectedException = availability.dateExceptions[value];
  const showFirstEvening = availability.earliestDate.startsWith(month);
  const blockedNotes = Object.entries(availability.dateExceptions).filter(
    ([date, exception]) =>
      date.startsWith(month) && exception.status === "unavailable",
  );

  useEffect(() => {
    if (value) setMonth(value.slice(0, 7));
  }, [value]);
  useEffect(() => {
    if (focusDate) dayRefs.current.get(focusDate)?.focus();
  }, [focusDate, month]);

  function changeMonth(delta: number) {
    const next = calendarDate(year, monthIndex + delta, 1).slice(0, 7);
    if (next < availability.earliestDate.slice(0, 7)) return;
    setDirection(delta);
    setMonth(next);
  }
  function moveFocus(
    event: React.KeyboardEvent<HTMLButtonElement>,
    date: string,
  ) {
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    const delta = deltas[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const day = parseCalendarDate(date);
    let next = calendarDate(
      day.getUTCFullYear(),
      day.getUTCMonth(),
      day.getUTCDate() + delta,
    );
    // Arrow navigation skips blocked days without selecting them.
    while (next >= availability.earliestDate && !isAvailableDate(next)) {
      const blocked = parseCalendarDate(next);
      next = calendarDate(
        blocked.getUTCFullYear(),
        blocked.getUTCMonth(),
        blocked.getUTCDate() + delta,
      );
    }
    if (!isAvailableDate(next)) return;
    setDirection(delta < 0 ? -1 : 1);
    setMonth(next.slice(0, 7));
    setFocusDate(next);
  }
  return (
    <>
      <div
        className="calendar"
        role="group"
        aria-label={availability.calendarLabel}
      >
        <div className="calendar-header">
          <button
            type="button"
            className="calendar-nav"
            aria-label={availability.previousMonth}
            disabled={month <= availability.earliestDate.slice(0, 7)}
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft size={19} />
          </button>
          <span id={monthId} className="calendar-month" aria-live="polite">
            {monthFormatter.format(firstDay)}
          </span>
          <button
            type="button"
            className="calendar-nav"
            aria-label={availability.nextMonth}
            onClick={() => changeMonth(1)}
          >
            <ChevronRight size={19} />
          </button>
        </div>
        <div className="calendar-weekdays" aria-hidden="true">
          {availability.weekdays.map((label, index) => (
            <span key={index} title={availability.weekdayNames[index]}>
              {label}
            </span>
          ))}
        </div>
        <motion.div
          key={month}
          className="calendar-days"
          aria-labelledby={monthId}
          initial={{
            opacity: reduced ? 1 : 0.6,
            x: reduced ? 0 : direction * 8,
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          {Array.from({ length: slots }, (_, index) => {
            const day = index - offset + 1;
            if (day < 1 || day > days)
              return <span key={index} aria-hidden="true" />;
            const date = calendarDate(year, monthIndex, day);
            const status = getDateAvailability(date);
            const available = status !== "unavailable";
            const eveningOnly = date === availability.earliestDate;
            return (
              <motion.button
                key={date}
                ref={(element) => {
                  if (element) dayRefs.current.set(date, element);
                  else dayRefs.current.delete(date);
                }}
                type="button"
                className={`calendar-day ${status === "tentative" ? "tentative" : ""} ${eveningOnly ? "evening-only" : ""} ${value === date ? "selected" : ""}`}
                data-date={date}
                data-availability={status}
                disabled={!available}
                aria-pressed={value === date}
                aria-label={`${dayFormatter.format(parseCalendarDate(date))}${status !== "available" ? ` · ${availability.legend[status]}` : eveningOnly ? ` · ${availability.eveningOnly}` : ""}`}
                aria-describedby={
                  eveningOnly
                    ? partialNoteId
                    : value === date &&
                        selectedException?.status === "tentative"
                      ? noteId
                      : undefined
                }
                whileTap={available && !reduced ? { scale: 0.92 } : undefined}
                transition={{ duration: 0.15 }}
                onClick={() => onChange(date)}
                onKeyDown={(event) => moveFocus(event, date)}
              >
                {day}
                {status === "tentative" && (
                  <span className="calendar-tentative-dot" aria-hidden="true" />
                )}
                {eveningOnly && (
                  <span className="calendar-evening-dot" aria-hidden="true" />
                )}
              </motion.button>
            );
          })}
        </motion.div>
        <ul className="calendar-legend">
          <li>
            <span className="legend-dot available" />
            {availability.legend.available}
          </li>
          <li>
            <span className="legend-dot tentative" />
            {availability.legend.tentative}
          </li>
          <li>
            <span className="legend-dot busy" />
            {availability.legend.unavailable}
          </li>
          {showFirstEvening && (
            <li>
              <span className="legend-dot partial" aria-hidden="true" />
              {availability.legend.partial}
            </li>
          )}
        </ul>
      </div>
      {selectedException?.status === "tentative" && (
        <div
          id={noteId}
          className="calendar-date-note"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="calendar-note-badge">
            {availability.legend.tentative}
          </span>
          <p>{selectedException.note}</p>
        </div>
      )}
      {showFirstEvening && (
        <div id={partialNoteId} className="calendar-partial-note">
          <strong>
            <span className="legend-dot partial" aria-hidden="true" />
            {dayFormatter.format(parseCalendarDate(availability.earliestDate))}
            {" · "}
            {availability.legend.partial}
          </strong>
          <p>{availability.earliestHint}</p>
        </div>
      )}
      {blockedNotes.map(([date, exception]) => (
        <div className="calendar-blocked-note" key={date}>
          <strong>
            {dayFormatter.format(parseCalendarDate(date))} ·{" "}
            {availability.legend.unavailable}
          </strong>
          <p>{exception.note}</p>
        </div>
      ))}
    </>
  );
}
