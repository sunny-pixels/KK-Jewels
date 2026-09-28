// SVG recreation of the KK Jewels Silver Studio wordmark: a gold octagon enclosing
// a diamond, "KK JEWELS" set in a serif, and "SILVER STUDIO" letter-spaced below.
type Props = { variant?: "dark" | "light"; className?: string };

export default function Logo({ variant = "dark", className }: Props) {
  const text = variant === "dark" ? "#5c1a1b" : "#efebe7";
  const gold = "#c2a36b";
  return (
    <svg className={className} viewBox="0 0 260 134" role="img" aria-label="KK Jewels Silver Studio">
      <g transform="translate(130 26)" fill="none" stroke={gold} strokeWidth="2.2" strokeLinejoin="round">
        <path d="M-8.3 -20 L8.3 -20 L20 -8.3 L20 8.3 L8.3 20 L-8.3 20 L-20 8.3 L-20 -8.3 Z" />
        <path d="M0 -17.5 L17.5 0 L0 17.5 L-17.5 0 Z" />
      </g>
      <text
        x="130"
        y="92"
        textAnchor="middle"
        fill={text}
        style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: 44, letterSpacing: "0.01em" }}
      >
        KK JEWELS
      </text>
      <text
        x="131"
        y="121"
        textAnchor="middle"
        fill={text}
        style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 17.5, letterSpacing: "0.3em" }}
      >
        SILVER STUDIO
      </text>
    </svg>
  );
}
