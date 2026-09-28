"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { collections } from "@/content/site";
import { contact } from "@/content/config";
import { announcement } from "@/content/home";
import { whatsappUrl, enquiryMessage } from "@/lib/whatsapp";
import Img from "./Img";
import Logo from "./Logo";
import { useUI } from "./UIProvider";
import { ArrowLeft, BagIcon, ChevronDown, InstagramIcon, PhoneIcon, SearchIcon, WhatsAppIcon } from "./Icons";

const nav = [
  { label: "Collections", href: "/#collections", mega: true },
  { label: "Saaj", href: "/collections/saaj-jewellery/" },
  { label: "Gifting", href: "/#gifting" },
  { label: "Our Story", href: "/#story" },
  { label: "Visit", href: "/#visit" },
];

export function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-bar__inner">
        <div className="announcement-bar__left">
          <Link href={announcement.left.href}>{announcement.left.label}</Link>
        </div>
        <div className="announcement-bar__right">
          <a href={contact.instagram} target="_blank" rel="noopener" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href={whatsappUrl(enquiryMessage([]))} target="_blank" rel="noopener" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
          <a href={contact.phoneHref} className="announcement-bar__phone">
            T. {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { enquiry, open, close, panel } = useUI();
  const wrap = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const menuOpen = panel === "menu";

  // Lanes sticky header: hide on scroll down, slide back in on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const y = window.scrollY;
      const bottom = el.offsetTop + el.offsetHeight;
      if (y <= el.offsetTop) {
        setHidden(false);
        setAnimate(false);
      } else if (y > last && y > bottom) {
        setHidden(true);
        setAnimate(true);
      } else if (y < last) {
        setHidden(false);
      }
      last = y;
    };
    const setVars = () => {
      const el = wrap.current;
      if (el) document.documentElement.style.setProperty("--header-height", `${el.offsetHeight}px`);
    };
    setVars();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setVars);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setVars);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) setSubMenu(false);
  }, [menuOpen]);

  const count = enquiry.length;

  return (
    <div
      ref={wrap}
      className={`header-section${hidden && !menuOpen ? " is-hidden" : ""}${animate ? " is-animated" : ""}`}
    >
      <header className={`header${megaOpen ? " menu-item-hover" : ""}`} onMouseLeave={() => setMegaOpen(false)}>
        <div className="header--inner">
          <div className="header__left">
            <button
              className={`mobile-toggle${menuOpen ? " is-active" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => (menuOpen ? close() : open("menu"))}
            >
              <span />
              <span />
              <span />
            </button>
            <button className="header-icon header-icon--mobile-search" aria-label="Search" onClick={() => open("search")}>
              <SearchIcon />
            </button>
            <nav className="thb-full-menu" aria-label="Main">
              <ul>
                {nav.map((item) => (
                  <li
                    key={item.label}
                    className={item.mega ? "menu-item-has-children" : ""}
                    onMouseEnter={() => setMegaOpen(!!item.mega)}
                  >
                    <Link
                      href={item.href}
                      className="thb-full-menu--link"
                      aria-haspopup={item.mega ? "true" : undefined}
                      aria-expanded={item.mega ? megaOpen : undefined}
                      onFocus={() => setMegaOpen(!!item.mega)}
                      onClick={() => setMegaOpen(false)}
                    >
                      {item.label}
                      {item.mega && <ChevronDown />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link href="/" className="logolink" aria-label="KK Jewels Silver Studio home" onClick={close}>
            <Logo className="logoimg" />
          </Link>

          <div className="thb-secondary-area">
            <button className="header-icon header-icon--search" aria-label="Search" onClick={() => open("search")}>
              <SearchIcon />
            </button>
            <a
              className="header-icon header-icon--whatsapp"
              href={whatsappUrl(enquiryMessage([]))}
              target="_blank"
              rel="noopener"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <button className="header-icon header-icon--bag" aria-label={`Enquiry list, ${count} items`} onClick={() => open("enquiry")}>
              <BagIcon />
              <span className="thb-item-count">{count}</span>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div className={`mega-menu${megaOpen ? " is-open" : ""}`} onMouseEnter={() => setMegaOpen(true)}>
          <div className="mega-menu__inner">
            <div className="mega-menu__links">
              <span className="mega-menu__title">Our Collections</span>
              <ul>
                {collections.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/collections/${c.slug}/`} onClick={() => setMegaOpen(false)}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mega-menu__promos">
              {collections.map((c) => (
                <Link key={c.slug} href={`/collections/${c.slug}/`} className="mega-menu__promo" onClick={() => setMegaOpen(false)}>
                  <div className="aspect-ratio" style={{ ["--ratio-percent" as string]: "120%" }}>
                    <Img id={c.card} alt={c.name} sizes="200px" />
                  </div>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
          <div className={`mobile-menu__levels${subMenu ? " is-sub" : ""}`}>
            <ul className="mobile-menu__level">
              <li>
                <button className="mobile-menu__row" onClick={() => setSubMenu(true)}>
                  Collections <ChevronDown className="mobile-menu__chev" />
                </button>
              </li>
              {nav.slice(1).map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="mobile-menu__row" onClick={close}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-menu__level mobile-menu__level--sub">
              <button className="mobile-menu__back" onClick={() => setSubMenu(false)}>
                <ArrowLeft /> Collections
              </button>
              <div className="mobile-menu__promos">
                {collections.map((c) => (
                  <Link key={c.slug} href={`/collections/${c.slug}/`} className="mega-menu__promo" onClick={close}>
                    <div className="aspect-ratio" style={{ ["--ratio-percent" as string]: "120%" }}>
                      <Img id={c.card} alt={c.name} sizes="50vw" />
                    </div>
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mobile-menu__footer">
            <a href={contact.phoneHref}>
              <PhoneIcon /> {contact.phoneDisplay}
            </a>
            <a href={contact.instagram} target="_blank" rel="noopener">
              <InstagramIcon /> {contact.handle}
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
