"use client";

import { useEffect, useRef } from "react";
import { getGsap, headerOffset } from "@/lib/motion";

const GAP = 30;

/**
 * Product page two-column layout. On two-column screens (≥768px) the media
 * column is pinned with ScrollTrigger while the info column scrolls, releasing
 * when the info column's last line (the Instagram link) meets the media's bottom.
 */
export default function ProductLayout({ media, info, single }: { media: React.ReactNode; info: React.ReactNode; single: boolean }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaEl = mediaRef.current;
    const infoEl = infoRef.current;
    if (!mediaEl || !infoEl) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const endEl = infoEl.querySelector<HTMLElement>("[data-pin-end]") ?? infoEl;
      const top = () => headerOffset() + GAP;
      ScrollTrigger.create({
        trigger: mediaEl,
        pin: mediaEl,
        pinSpacing: false, // the taller info column already provides the scroll height
        start: () => `top top+=${top()}`,
        endTrigger: endEl,
        end: () => `bottom top+=${top() + mediaEl.offsetHeight}`,
        invalidateOnRefresh: true,
      });
    });

    // Images and fonts change column heights after mount.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <div className="product-page__grid">
      <div className="product-page__media-col">
        <div ref={mediaRef} className={`product-page__media${single ? " is-single" : ""}`}>
          {media}
        </div>
      </div>
      <div ref={infoRef} className="product-page__info">
        {info}
      </div>
    </div>
  );
}
