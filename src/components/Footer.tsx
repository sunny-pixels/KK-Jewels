"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { brand, collections } from "@/content/site";
import { contact } from "@/content/config";
import { enquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import Logo from "./Logo";
import { ChevronDown, ClockIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";

function Column({ title, wide, children }: { title: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`footer-col${wide ? " footer-col--wide" : ""}`}>
      <details open>
        <summary>
          {title}
          <ChevronDown />
        </summary>
        {children}
      </details>
    </div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  // Lanes: accordions forced open from 768px, closed below.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => ref.current?.querySelectorAll("details").forEach((d) => (d.open = mq.matches));
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <footer ref={ref} className="footer">
      <div className="row">
        <div className="columns">
          <div className="footer-top">
            <Link href="/" className="footer-logo" aria-label={`${brand.name} home`}>
              <Logo variant="light" />
            </Link>
            <h4>- {brand.tagline}</h4>
          </div>
          <div className="footer-columns">
            <Column title="Collections">
              <ul>
                {collections.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/collections/${c.slug}/`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </Column>
            <Column title="The Studio">
              <ul>
                <li><Link href="/#story">Our Story</Link></li>
                <li><Link href="/collections/saaj-jewellery/">Saaj Jewellery</Link></li>
                <li><Link href="/#gifting">Gifting</Link></li>
                <li><Link href="/#visit">Visit the Studio</Link></li>
              </ul>
            </Column>
            <Column title="Visit" wide>
              <ul className="footer-contact">
                <li><PinIcon /><a href={contact.mapsHref} target="_blank" rel="noopener">{contact.address}</a></li>
                <li><ClockIcon /><span>{contact.hours}</span></li>
                <li><PhoneIcon /><a href={contact.phoneHref}>{contact.phoneDisplay}</a></li>
              </ul>
            </Column>
            <Column title="Stay in touch" wide>
              <p className="footer-text">
                Handcrafted, hallmarked silver for the home, the prayer room and every celebration. Follow new pieces as they leave the workshop.
              </p>
              <div className="footer-buttons">
                <a className="button outline" href={contact.instagram} target="_blank" rel="noopener">
                  <InstagramIcon /> Instagram
                </a>
                <a className="button outline" href={whatsappUrl(enquiryMessage([]))} target="_blank" rel="noopener">
                  <WhatsAppIcon /> WhatsApp
                </a>
              </div>
            </Column>
          </div>
          <div className="sub-footer">
            <span>© 2026 {brand.name}. All rights reserved.</span>
            <span>
              Hallmarked 92.5 silver · <a href={contact.instagram} target="_blank" rel="noopener">{contact.handle}</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
