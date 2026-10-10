import type { SnailMood } from "@/types/invitation";

// The same shell and palette, with a small face and posture for each verdict.
export function SnailIllustration({
  mood = "neutral",
  size = 45,
}: {
  mood?: SnailMood;
  size?: number;
}) {
  const sad = mood === "sad";
  const happy = mood === "happy";
  const skeptical = mood === "skeptical";
  const hopeful = mood === "hopeful";
  const left = { x: 43, y: sad ? 24 : skeptical ? 15 : 19 };
  const right = { x: 55, y: sad ? 24 : skeptical ? 22 : 19 };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      data-mood={mood}
    >
      <path
        d="M8 49C17 43 31 45 41 42L44 30C46 26 52 27 53 32L54 44C61 44 61 51 55 52H12C7 52 5 51 8 49Z"
        fill="#d6ddcb"
        stroke="#7b806e"
        strokeWidth="1.8"
      />
      <circle
        cx="27"
        cy="34"
        r="17"
        fill="#e6d8df"
        stroke="#745469"
        strokeWidth="1.8"
      />
      <path
        d="M31 45C17 48 13 33 22 25C31 18 42 28 36 37C32 44 21 39 24 32C27 26 33 31 30 34"
        stroke="#927286"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M46 30L${left.x} ${left.y + 1}M51 30L${right.x} ${right.y + 1}`}
        stroke="#7b806e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {happy ? (
        <>
          <path
            d="M40 20Q43 15 46 20M52 20Q55 15 58 20"
            stroke="#4e3b49"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M46 38Q50 47 55 38Z" fill="#745469" />
          <path
            d="M48 39H53"
            stroke="#f8f6f1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="45" cy="35" r="2" fill="#caa5b6" />
          <circle cx="55" cy="35" r="2" fill="#caa5b6" />
          <path d="M25 12C20 8 23 4 26 7C29 4 32 8 25 12Z" fill="#bc9b68" />
          <path
            d="M8 18V24M5 21H11"
            stroke="#bc9b68"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx={left.x} cy={left.y} r="2.2" fill="#4e3b49" />
          <circle cx={right.x} cy={right.y} r="2.2" fill="#4e3b49" />
          <path
            d={
              sad
                ? "M47 42Q50 38 53 42"
                : skeptical
                  ? "M47 40L53 39"
                  : "M48 40Q50 42 52 40"
            }
            stroke="#7b806e"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      )}
      {skeptical && (
        <path
          d="M40 10L46 12M53 17H58"
          stroke="#745469"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
      {hopeful && (
        <>
          <path
            d="M12 9C12 4 21 4 21 9C21 12 16 12 16 16"
            stroke="#927286"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="16" cy="20" r="1" fill="#927286" />
          <path
            d="M55 42L58 34Q59 33 59 36V44Z"
            fill="#e6d8df"
            stroke="#745469"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M63 42L60 34Q59 33 59 36V44Z"
            fill="#e6d8df"
            stroke="#745469"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </>
      )}
      {sad && (
        <path
          d="M40 20L46 23M52 23L58 20"
          stroke="#927286"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
