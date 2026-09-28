"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { heroSlides as Slides } from "@/content/home";
import { getGsap, prefersReducedMotion, splitLines } from "@/lib/motion";
import { ArtImg } from "../Img";

const AUTOPLAY_MS = 7000;

/**
 * Lanes main slideshow ("transition--swipe"): each slide is revealed by a
 * clip-path wipe from the left while its background eases from scale 1.1 to 1,
 * then subheading, split heading lines and buttons rise in. The outgoing
 * slide's timeline reverses at 4x speed after 700ms.
 */
export default function HeroSlideshow({ slides }: { slides: typeof Slides }) {
  const root = useRef<HTMLDivElement>(null);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [motion, setMotion] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = prefersReducedMotion();
    if (reduced.current) {
      setReady(true);
      return;
    }
    const { gsap } = getGsap();
    let ctx: gsap.Context | undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !root.current) return;
      ctx = gsap.context(() => {
        const els = root.current!.querySelectorAll<HTMLElement>(".slideshow__slide");
        timelines.current = Array.from(els).map((slide) => {
          const heading = splitLines(slide.querySelector(".slideshow__slide-content--heading"));
          const tl = gsap.timeline({ paused: true });
          tl.fromTo(
            slide,
            { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
            { duration: 0.7, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
            "start",
          )
            .fromTo(slide.querySelector(".slideshow__slide-bg"), { scale: 1.1 }, { duration: 1, scale: 1 }, "start")
            .fromTo(slide.querySelector(".subheading"), { opacity: 0 }, { duration: 0.25, opacity: 1 }, ">-=0.3")
            .fromTo(heading, { yPercent: 120, rotation: 2 }, { duration: 0.75, yPercent: 0, rotation: 0, stagger: 0.1 }, ">-=0.3")
            .fromTo(
              slide.querySelectorAll(".button"),
              { yPercent: 120, rotation: 2 },
              { duration: 0.5, yPercent: 0, rotation: 0, stagger: 0.1 },
              ">-=0.3",
            );
          return tl;
        });
        timelines.current[0]?.play();
      }, root);
      setMotion(true);
      setReady(true);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const go = useCallback(
    (next: number) => {
      const prev = currentRef.current;
      const n = (next + slides.length) % slides.length;
      if (n === prev) return;
      currentRef.current = n;
      setCurrent(n);
      if (reduced.current) return;
      const tls = timelines.current;
      tls[n]?.timeScale(1).restart();
      window.setTimeout(() => {
        if (currentRef.current !== prev) tls[prev]?.timeScale(4).reverse();
      }, 700);
    },
    [slides.length],
  );

  // Autoplay with the dot progress bar; pauses on hover / focus.
  useEffect(() => {
    if (paused || !ready) return;
    const t = window.setTimeout(() => go(currentRef.current + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [current, paused, ready, go]);

  // Swipe
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => (startX.current = e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(currentRef.current + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="slideshow-section" aria-roledescription="carousel" aria-label="Featured collections">
      <div
        ref={root}
        className={`main-slideshow${ready ? " is-ready" : ""}${motion ? " has-motion" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {slides.map((s, i) => (
          <div
            key={s.heading}
            className={`slideshow__slide${i === current ? " is-selected" : ""}`}
            aria-hidden={i !== current}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <div className="slideshow__slide-bg">
              <ArtImg desktop={s.image} mobile={s.imageMobile} alt={s.heading} priority={i === 0} className="img-fill" />
            </div>
            <div className="slideshow__slide-overlay" />
            <div className="slideshow__slide-inner">
              <div className="slideshow__slide-content">
                <span className="subheading">{s.subheading}</span>
                {i === 0 ? (
                  <h1 className="h1-xlarge slideshow__slide-content--heading">{s.heading}</h1>
                ) : (
                  <h2 className="h1-xlarge slideshow__slide-content--heading">{s.heading}</h2>
                )}
                <div className="buttons">
                  {s.ctas.map((c) => (
                    <span key={c.label} className="button-overflow-container">
                      <Link href={c.href} className={`button white${c.style === "outline" ? " outline" : ""}`} tabIndex={i === current ? 0 : -1}>
                        {c.label}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <ol className="flickity-page-dots" style={{ ["--dot-speed" as string]: paused ? "0s" : `${AUTOPLAY_MS}ms` }}>
          {slides.map((s, i) => (
            <li key={s.heading}>
              <button
                className={`dot${i === current ? " is-selected" : ""}${paused ? " is-paused" : ""}`}
                aria-label={`Show slide ${i + 1}: ${s.heading}`}
                aria-current={i === current}
                onClick={() => go(i)}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
