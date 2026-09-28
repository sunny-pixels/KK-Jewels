"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    // Lanes: gsap.defaults({ ease: theme.settings.animation_easing })
    gsap.defaults({ ease: "power1.out" });
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Split an element into masked lines (Lanes .line-parent > .line-child). Returns the line elements. */
export function splitLines(el: Element | null): HTMLElement[] {
  if (!el) return [];
  const { SplitText } = getGsap();
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line-child" });
  return split.lines as HTMLElement[];
}

export function headerOffset() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  return parseFloat(v) || 0;
}
