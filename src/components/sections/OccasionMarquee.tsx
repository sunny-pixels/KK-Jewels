"use client";

import { useState } from "react";
import type { occasions as Data } from "@/content/home";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArtImg } from "../Img";

/**
 * Lanes featured-collection-list: a full-bleed Fraunces marquee. Hovering (or
 * focusing) a name pauses the marquee, swaps the background image
 * (opacity + scale 1.05 → 1 over 1s) and reveals that occasion's copy.
 */
export default function OccasionMarquee({ data }: { data: typeof Data }) {
  const [active, setActive] = useState(0);
  const seq = (copy: number) => (
    <div className="marquee__group" aria-hidden={copy > 0} key={copy}>
      {data.items.map((o, i) => (
        <button
          key={o.name}
          className={`marquee__item h1-xlarge${i === active ? " is-active" : ""}`}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          tabIndex={copy > 0 ? -1 : 0}
        >
          {o.name}
          <span className="marquee__sep" aria-hidden="true">
            —
          </span>
        </button>
      ))}
    </div>
  );
  const current = data.items[active];

  return (
    <section id={data.id} className="featured-collection-list">
      <div className="featured-collection-list__bgs">
        {data.items.map((o, i) => (
          <div key={o.name} className={`featured-collection-list__bg${i === active ? " is-active" : ""}`}>
            <ArtImg desktop={o.image} mobile={o.image} alt="" className="img-fill" />
          </div>
        ))}
        <div className="featured-collection-list__shade" />
      </div>
      <div className="featured-collection-list__inner">
        <span className="subheading featured-collection-list__subheading">{data.subheading}</span>
        <div className="marquee direction-left" style={{ ["--marquee-speed" as string]: "30s" }}>
          {[0, 1, 2].map(seq)}
        </div>
        <div className="featured-collection-list__content" aria-live="polite">
          <p key={current.name}>{current.text}</p>
          <a className="button white" href={whatsappUrl(`${data.cta.message} (${current.name})`)} target="_blank" rel="noopener">
            {data.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
