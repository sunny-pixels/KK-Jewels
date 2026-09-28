"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-to-top${active ? " is-active" : ""}`}
      aria-label="Back to top"
      tabIndex={active ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
        <path className="handle" d="M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <path className="bar" d="M6 1v12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </button>
  );
}
