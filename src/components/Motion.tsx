"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Global scroll reveals (Lanes app.js createThemeAnimations):
 * card images start at scale 1.15 / opacity 0 and settle in batches as they
 * reach 90% of the viewport, staggered by 0.15s.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("motion-ready");
      return;
    }
    const { gsap, ScrollTrigger } = getGsap();
    let ctx: gsap.Context | undefined;
    const refresh = () => ScrollTrigger.refresh();

    // Build the triggers once the route's DOM has committed and painted
    // (on client navigations the effect can run before the new page mounts).
    const build = window.setTimeout(() => {
      ctx = gsap.context(() => {
        if (document.querySelector(".reveal-scale")) ScrollTrigger.batch(".reveal-scale", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { scale: 1, opacity: 1, stagger: 0.15, duration: 0.5, overwrite: true }),
        });
        if (document.querySelector(".reveal-fade")) ScrollTrigger.batch(".reveal-fade", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, stagger: 0.15, duration: 0.5, overwrite: true }),
        });
      });
      refresh();
    }, 60);
    const late = window.setTimeout(refresh, 700);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(build);
      window.clearTimeout(late);
      window.removeEventListener("load", refresh);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
