"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "./Icons";

type Props = {
  children: React.ReactNode;
  /** Columns at desktop (≥1068), tablet (≥768) and mobile. */
  cols?: [number, number, number];
  gap?: [number, number];
  className?: string;
  label?: string;
};

/** Lanes theme-scroll: scroll-snap grid with round arrows and a 1px accent scrollbar. */
export default function ThemeScroll({ children, cols = [5, 3, 2], gap = [20, 4], className = "", label }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ ratio: 1, progress: 0, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      ratio: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      progress: max > 0 ? el.scrollLeft / max : 0,
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const w = item ? item.getBoundingClientRect().width + gap[0] : el.clientWidth;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const isStatic = state.ratio >= 0.999;
  const handleW = Math.max(state.ratio * 100, 4);

  return (
    <div className={`theme-scroll${isStatic ? " is-static" : ""} ${className}`.trim()}>
      <div
        ref={track}
        className="theme-scroll__track"
        role={label ? "region" : undefined}
        aria-label={label}
        style={
          {
            "--d-cols": cols[0],
            "--t-cols": cols[1],
            "--m-cols": cols[2],
            "--gap-d": `${gap[0]}px`,
            "--gap-m": `${gap[1]}px`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
      <div className="theme-scroll__bar" aria-hidden="true">
        <div className="theme-scroll__handle" style={{ width: `${handleW}%`, left: `${state.progress * (100 - handleW)}%` }} />
      </div>
      <div className="theme-scroll__nav">
        <button className="flickity-nav flickity-prev" onClick={() => step(-1)} disabled={state.atStart} aria-label="Previous">
          <ArrowLeft />
        </button>
        <button className="flickity-nav flickity-next" onClick={() => step(1)} disabled={state.atEnd} aria-label="Next">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
