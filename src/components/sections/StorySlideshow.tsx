"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { story as Data } from "@/content/home";
import { prefersReducedMotion } from "@/lib/motion";
import Img from "../Img";

const AUTOPLAY_MS = 4000;

/**
 * Lanes image-with-text-slideshow: a fading image slideshow (autoplay 4000ms,
 * dots) linked to a black text panel that fades in step (asNavFor).
 */
export default function StorySlideshow({ data }: { data: typeof Data }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || prefersReducedMotion()) return;
    const t = window.setTimeout(() => setCurrent((c) => (c + 1) % data.slides.length), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [current, paused, inView, data.slides.length]);

  return (
    <section
      id={data.id}
      ref={root}
      className="image-with-text-slideshow section-spacing"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="row full-width-row">
        <div className="columns">
          <div className="image-with-text-slideshow__grid">
            <div className="image-with-text-slideshow--image">
              {data.images.map((id, i) => (
                <div key={id} className={`iwts-slide${i === current ? " is-selected" : ""}`} aria-hidden={i !== current}>
                  <Img id={id} alt="" sizes="(min-width: 768px) 50vw, 100vw" className="img-fill" />
                </div>
              ))}
              <ol className="iwts-dots">
                {data.images.map((id, i) => (
                  <li key={id}>
                    <button
                      className={`iwts-dot${i === current ? " is-selected" : ""}`}
                      aria-label={`Show story ${i + 1}`}
                      aria-current={i === current}
                      onClick={() => setCurrent(i)}
                    />
                  </li>
                ))}
              </ol>
            </div>
            <div className="image-with-text-slideshow--content" aria-live="polite">
              {data.slides.map((s, i) => (
                <div key={s.heading} className={`iwts-text${i === current ? " is-selected" : ""}`} aria-hidden={i !== current}>
                  <div className="iwts-text__inner">
                    <span className="subheading">{s.subheading}</span>
                    <h2 className={i === 1 ? "h3" : "h2"}>{s.heading}</h2>
                    <p>{s.text}</p>
                    <Link href={data.cta.href} className="button white" tabIndex={i === current ? 0 : -1}>
                      {data.cta.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
