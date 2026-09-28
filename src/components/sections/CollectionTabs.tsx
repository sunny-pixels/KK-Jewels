"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { collectionTabs as Tabs } from "@/content/home";
import { productsBySlug } from "@/content/site";
import { getGsap } from "@/lib/motion";
import ProductCard from "../ProductCard";
import PromoCard from "../PromoCard";
import ThemeScroll from "../ThemeScroll";

/** Lanes collection-tabs: underline tabs switching a promo + product carousel. */
export default function CollectionTabs({ data }: { data: typeof Tabs }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Newly shown cards need their scroll-reveal triggers re-measured.
    const { ScrollTrigger } = getGsap();
    ScrollTrigger.refresh();
  }, [active]);

  return (
    <section className="section-collection-tabs section-spacing">
      <div className="row">
        <div className="columns">
          <div className="section-header">
            <span className="subheading">{data.subheading}</span>
            <h2 className="h3">{data.heading}</h2>
          </div>
          <div className="collection-tabs__list" role="tablist">
            {data.tabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                id={`tab-${t.collection}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.collection}`}
                className={`collection-tabs__tab${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {data.tabs.map((t, i) => (
            <div
              key={t.label}
              id={`panel-${t.collection}`}
              role="tabpanel"
              aria-labelledby={`tab-${t.collection}`}
              hidden={i !== active}
              className="collection-tabs__panel"
            >
              <ThemeScroll cols={[5, 3, 2]} gap={[20, 4]}>
                <PromoCard heading={t.promo.heading} text={t.promo.text} image={t.promo.image} href={`/collections/${t.collection}/`} />
                {productsBySlug(t.products).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </ThemeScroll>
              <div className="collection-tabs__button">
                <Link href={`/collections/${t.collection}/`} className="button outline">
                  {t.button}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
