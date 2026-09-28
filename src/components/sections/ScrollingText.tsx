import { trustBar } from "@/content/home";
import { TrustIcon } from "../Icons";

/** Lanes scrolling-text: USP marquee with icons, 30s linear loop; hovered items skew. */
export default function ScrollingText() {
  const group = (copy: number) => (
    <div className="scrolling-text__group" aria-hidden={copy > 0} key={copy}>
      {trustBar.map((t) => (
        <span key={t.label} className="scrolling-text__item">
          <TrustIcon name={t.icon} className="scrolling-text__icon" />
          <span className="scrolling-text__label">{t.label}</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="scrolling-text" aria-label="Why KK Silver">
      <div className="marquee direction-left" style={{ ["--marquee-speed" as string]: "30s" }}>
        {[0, 1, 2].map(group)}
      </div>
    </section>
  );
}
