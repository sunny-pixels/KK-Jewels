"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { collections, getProduct, products } from "@/content/site";
import { enquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import Img from "./Img";
import { useUI } from "./UIProvider";
import { BagIcon, CheckIcon, CloseIcon, PlusIcon, SearchIcon, WhatsAppIcon } from "./Icons";

function SidePanel({ id, title, count, children, footer }: { id: string; title: string; count?: number; children: React.ReactNode; footer?: React.ReactNode }) {
  const { panel, close } = useUI();
  const isOpen = panel === id;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) ref.current?.querySelector<HTMLElement>(".side-panel-close")?.focus();
  }, [isOpen]);
  return (
    <aside ref={ref} className={`side-panel${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen} aria-label={title} role="dialog" aria-modal="true">
      <div className="side-panel-header">
        <h4>
          {title}
          {count !== undefined && <span className="side-panel-count">{count}</span>}
        </h4>
        <button className="side-panel-close" onClick={close} aria-label="Close">
          <CloseIcon />
        </button>
      </div>
      <div className="side-panel-content">{children}</div>
      {footer && <div className="side-panel-footer">{footer}</div>}
    </aside>
  );
}

function MiniCard({ slug, action }: { slug: string; action: React.ReactNode }) {
  const { close } = useUI();
  const p = getProduct(slug);
  if (!p) return null;
  return (
    <div className="mini-card">
      <Link href={`/products/${p.slug}/`} className="mini-card__image" onClick={close}>
        <div className="aspect-ratio aspect-ratio--portrait">
          <Img id={p.image} alt={p.name} sizes="90px" />
        </div>
      </Link>
      <div className="mini-card__info">
        <Link href={`/products/${p.slug}/`} className="mini-card__title" onClick={close}>
          {p.name}
        </Link>
        <span className="mini-card__meta">{p.purity}</span>
        {action}
      </div>
    </div>
  );
}

function EnquiryDrawer() {
  const { enquiry, removeEnquiry, close } = useUI();
  const names = enquiry.map((s) => getProduct(s)?.name).filter(Boolean) as string[];
  return (
    <SidePanel
      id="enquiry"
      title="Enquiry list"
      count={enquiry.length}
      footer={
        enquiry.length > 0 ? (
          <>
            <p className="side-panel-note">We reply on WhatsApp with availability, weight and pricing for each piece.</p>
            <a className="button full" href={whatsappUrl(enquiryMessage(names))} target="_blank" rel="noopener">
              <WhatsAppIcon /> Send enquiry on WhatsApp
            </a>
          </>
        ) : null
      }
    >
      {enquiry.length === 0 ? (
        <div className="side-panel-empty">
          <BagIcon className="side-panel-empty__icon" />
          <h4 className="body-font">Your enquiry list is empty.</h4>
          <p>Add pieces you love and send them to us in one WhatsApp message. We will share availability, weight and pricing.</p>
          <div className="side-panel-empty__links">
            {collections.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}/`} className="text-button" onClick={close}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mini-card-list">
          {enquiry.map((s) => (
            <MiniCard
              key={s}
              slug={s}
              action={
                <button className="text-button mini-card__remove" onClick={() => removeEnquiry(s)}>
                  Remove
                </button>
              }
            />
          ))}
        </div>
      )}
    </SidePanel>
  );
}

function LookDrawer() {
  const { look, addEnquiry, hasEnquiry } = useUI();
  return (
    <SidePanel id="look" title="Shop the look">
      {look && (
        <div className="mini-card-list">
          {look.products.map((s) => (
            <MiniCard
              key={s}
              slug={s}
              action={
                <button className="text-button mini-card__add" onClick={() => addEnquiry(s)} disabled={hasEnquiry(s)}>
                  {hasEnquiry(s) ? (
                    <>
                      <CheckIcon /> Added
                    </>
                  ) : (
                    <>
                      <PlusIcon /> Add to enquiry
                    </>
                  )}
                </button>
              }
            />
          ))}
        </div>
      )}
    </SidePanel>
  );
}

function SearchDrawer() {
  const { panel, close } = useUI();
  const isOpen = panel === "search";
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen) setTimeout(() => input.current?.focus(), 250);
    else setQ("");
  }, [isOpen]);
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return products
      .filter((p) =>
        [p.name, p.description, p.highlights.join(" "), collections.find((c) => c.slug === p.collection)?.name ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 8);
  }, [q]);
  return (
    <div className={`search-drawer${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen} role="dialog" aria-label="Search">
      <div className="search-drawer__inner row">
        <form className="search-drawer__form" onSubmit={(e) => e.preventDefault()} role="search">
          <SearchIcon />
          <input
            ref={input}
            type="search"
            placeholder="Search silver: urli, thali, clutch…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search products"
          />
          <button type="button" className="search-drawer__close" onClick={close} aria-label="Close search">
            <CloseIcon />
          </button>
        </form>
        {q.trim().length >= 2 && (
          <div className="search-drawer__results">
            {results.length === 0 ? (
              <p className="search-drawer__none">No pieces match “{q}”. Try urli, bowl, pooja or clutch.</p>
            ) : (
              <div className="search-drawer__grid">
                {results.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}/`} className="search-result" onClick={close}>
                    <div className="aspect-ratio aspect-ratio--portrait">
                      <Img id={p.image} alt={p.name} sizes="150px" />
                    </div>
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Drawers() {
  const { panel, close } = useUI();
  return (
    <>
      <div className={`click-capture${panel && panel !== "menu" ? " is-active" : ""}`} onClick={close} aria-hidden="true" />
      <EnquiryDrawer />
      <LookDrawer />
      <SearchDrawer />
    </>
  );
}
