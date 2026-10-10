"use client";
import { useCallback, useEffect, useRef } from "react";

// One replaceable timer per interaction: stale callbacks never overwrite a new choice.
export function useDelayedAction() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  useEffect(() => cancel, [cancel]);
  const schedule = useCallback(
    (action: () => void, delay: number) => {
      cancel();
      timer.current = setTimeout(() => {
        timer.current = null;
        action();
      }, delay);
    },
    [cancel],
  );
  return { schedule, cancel };
}
