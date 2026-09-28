"use client";

import { useEffect, useRef } from "react";
import type { visit as Data } from "@/content/home";
import { contact } from "@/content/config";
import { whatsappUrl } from "@/lib/whatsapp";
import { getGsap, headerOffset, prefersReducedMotion } from "@/lib/motion";
import Img from "../Img";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "../Icons";

const VISIT_MESSAGE = "Hello KK Jewels Silver Studio, I would like to book a visit to the studio.";

/**
 * Lanes layered-images-with-text (text first): copy on the left, two
 * overlapping images on the right drifting at different parallax rates.
 */
export default function LayeredImages({ data }: { data: typeof Data }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const st = {
        trigger: root.current,
        scrub: 1,
        start: "top 90%",
        end: () => `bottom top+=${headerOffset()}`,
      };
      gsap.to(".layered-images-media--1", { yPercent: -8, scrollTrigger: st });
      gsap.to(".layered-images-media--2", { yPercent: -30, scrollTrigger: { ...st } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id={data.id} ref={root} className="layered-images-with-text section-spacing">
      <div className="row">
        <div className="columns">
          <div className="layered-images-with-text__grid">
            <div className="layered-images-with-text__content">
              <span className="subheading">{data.subheading}</span>
              <h2 className="h1">{data.heading}</h2>
              <p>{data.text}</p>
              <ul className="visit-details">
                <li>
                  <PinIcon />
                  <span>
                    {contact.addressLines.map((l) => (
                      <span key={l} className="visit-details__line">
                        {l}
                      </span>
                    ))}
                  </span>
                </li>
                <li>
                  <ClockIcon />
                  <span>{contact.hours}</span>
                </li>
                <li>
                  <PhoneIcon />
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </li>
              </ul>
              <div className="buttons">
                <a className="button" href={contact.mapsHref} target="_blank" rel="noopener">
                  Get Directions
                </a>
                <a className="button outline" href={whatsappUrl(VISIT_MESSAGE)} target="_blank" rel="noopener">
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="layered-images-with-text__images">
              <div className="layered-images-media layered-images-media--1 reveal-scale">
                <div className="aspect-ratio" style={{ ["--ratio-percent" as string]: "123.75%" }}>
                  <Img id={data.images.main} alt="Inside the KK Jewels Silver Studio" sizes="(min-width: 768px) 35vw, 80vw" />
                </div>
              </div>
              <div className="layered-images-media layered-images-media--2 reveal-scale">
                <div className="aspect-ratio aspect-ratio--square">
                  <Img id={data.images.overlap} alt="Silver displayed at the studio" sizes="(min-width: 768px) 22vw, 50vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
