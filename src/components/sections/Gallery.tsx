"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { craftGallery as Data } from "@/content/home";
import { media } from "@/content/media";
import { prefersReducedMotion } from "@/lib/motion";
import Img from "../Img";
import { useUI } from "../UIProvider";
import { BagIcon } from "../Icons";

type Item = (typeof Data.items)[number];

function Tile({ item }: { item: Item }) {
  const { open } = useUI();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || item.kind !== "video" || item.play !== "auto") return;
    if (prefersReducedMotion()) return;
    // Autoplay only while on screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [item]);

  const hoverPlay = item.kind === "video" && item.play === "hover";

  return (
    <figure
      className="gallery-item"
      onMouseEnter={() => hoverPlay && video.current?.play().catch(() => {})}
      onMouseLeave={() => hoverPlay && video.current?.pause()}
    >
      <div className="gallery-item--image aspect-ratio aspect-ratio--portrait reveal-fade">
        {item.kind === "video" ? (
          <video
            ref={video}
            src={item.video}
            poster={media[item.poster].src}
            muted
            loop
            playsInline
            preload="none"
            aria-label={item.heading}
          />
        ) : (
          <Img id={item.image} alt={item.heading} sizes="(min-width: 768px) 33vw, 90vw" />
        )}
      </div>
      <div className="gallery-item--overlay" />
      {"href" in item && item.href ? <Link href={item.href} className="gallery-item--link" aria-label={item.heading} /> : null}
      <figcaption className="gallery-item--content">
        <span className="subheading">{item.subheading}</span>
        <h3 className="h2">{item.heading}</h3>
      </figcaption>
      <button className="gallery-item--look" onClick={() => open("look", { title: item.heading, products: [...item.look] })}>
        <span className="gallery-item--look-text">Shop the look</span>
        <BagIcon />
      </button>
    </figure>
  );
}

/** Lanes gallery: three 3:4 tiles (hover-play video, image, autoplay video) with a "Shop the look" pill. */
export default function Gallery({ data }: { data: typeof Data }) {
  return (
    <section className="section-gallery section-spacing">
      <div className="row">
        <div className="columns">
          <div className="rich-text">
            <h2 className="h3">{data.heading}</h2>
          </div>
          <div className="gallery">
            {data.items.map((item) => (
              <Tile key={item.heading} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
