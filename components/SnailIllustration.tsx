export function SnailIllustration({ sad = false }: { sad?: boolean }) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
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
        d="M46 30L43 20M51 30L55 20"
        stroke="#7b806e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="43" cy="19" r="2.2" fill="#4e3b49" />
      <circle cx="55" cy="19" r="2.2" fill="#4e3b49" />
      <path
        d={sad ? "M48 42Q50 39 52 42" : "M48 40Q50 42 52 40"}
        stroke="#7b806e"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
