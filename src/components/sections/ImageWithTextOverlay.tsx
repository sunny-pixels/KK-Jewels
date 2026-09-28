"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { MediaId } from "@/content/media";
import { getGsap, headerOffset, prefersReducedMotion, splitLines } from "@/lib/motion";
import { ArtImg } from "../Img";

type Props = {
  id?: string;
  image: MediaId;
  imageMobile: MediaId;
  alt: string;
  badge?: string;
  subheading?: string;
  heading: string;
  headingClass?: string;
  headingTag?: "h1" | "h2";
  text?: string;
  cta?: { label: string; href: string };
  /** "box": centred white box (Lanes List). "bottom": bottom-centre white text (Clover Bracelet). "left": middle-left white text. */
  layout?: "box" | "bottom" | "left";
  parallax?: boolean;
  overlay?: number;
  size?: "medium" | "large";
  className?: string;
};

/**
 * Lanes image-with-text-overlay. On reaching the viewport centre the background
 * settles from scale 1.2, then badge/subheading fade, heading and paragraph lines
 * rise, and the button fades in. Optional scrubbed parallax (-8% → 8%).
 */
export default function ImageWithTextOverlay({
  id,
  image,
  imageMobile,
  alt,
  badge,
  subheading,
  heading,
  headingClass = "h1-large",
  headingTag = "h2",
  text,
  cta,
  layout = "box",
  parallax = false,
  overlay = 0,
  size = "medium",
  className = "",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const H = headingTag;

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const { gsap } = getGsap();
    let ctx: gsap.Context | undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !root.current) return;
      ctx = gsap.context(() => {
        const el = root.current!;
        const headingLines = splitLines(el.querySelector(".overlay__heading"));
        const textLines = splitLines(el.querySelector(".overlay__text"));
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", once: true } });
        // Not every overlay has a badge / subheading / paragraph: skip empty targets.
        const step = (targets: Element | ArrayLike<Element> | null, from: gsap.TweenVars, to: gsap.TweenVars, pos: gsap.Position) => {
          const exists = targets && ("length" in targets ? targets.length > 0 : true);
          if (exists) tl.fromTo(targets, from, to, pos);
        };
        // fromTo with explicit end states: survives ScrollTrigger.refresh() mid-play.
        // Text runs alongside the background zoom rather than after it (~1.1s total).
        step(el.querySelector(".overlay__bg-inner"), { scale: 1.2 }, { scale: 1, duration: 1 }, 0);
        step(el.querySelectorAll(".inline-badge"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
        step(el.querySelectorAll(".subheading"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
        tl.addLabel("heading", 0.2);
        step(headingLines, { yPercent: 100, rotation: 2 }, { yPercent: 0, rotation: 0, duration: 0.6, stagger: 0.05 }, "heading");
        step(textLines, { yPercent: 100, rotation: 2 }, { yPercent: 0, rotation: 0, duration: 0.45, stagger: 0.02 }, "heading+=0.25");
        step(el.querySelectorAll(".button"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "heading+=0.45");
        if (parallax) {
          gsap.fromTo(
            el.querySelector(".overlay__bg"),
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: el, scrub: 1, start: "top bottom", end: () => `bottom top+=${headerOffset()}` },
            },
          );
        }
      }, root);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [parallax]);

  return (
    <section
      id={id}
      ref={root}
      className={`image-with-text-overlay layout--${layout} size--${size}${parallax ? " is-parallax" : ""} ${className}`.trim()}
    >
      <div className="overlay__bg">
        <div className="overlay__bg-inner">
          <ArtImg desktop={image} mobile={imageMobile} alt={alt} className="img-fill" />
        </div>
      </div>
      <div className="overlay__shade" style={{ opacity: overlay }} />
      <div className="overlay__content-wrap row full-width-row">
        <div className="overlay__content">
          {badge && <span className="inline-badge">{badge}</span>}
          {subheading && <span className="subheading">{subheading}</span>}
          <H className={`${headingClass} overlay__heading`}>{heading}</H>
          {text && <p className="overlay__text">{text}</p>}
          {cta && (
            <Link href={cta.href} className={`button${layout === "box" ? "" : " white"}`}>
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
