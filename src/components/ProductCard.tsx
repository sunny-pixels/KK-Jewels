"use client";

import Link from "next/link";
import type { Product } from "@/content/site";
import { getCollection } from "@/content/site";
import Img from "./Img";
import { useUI } from "./UIProvider";
import { CheckIcon, PlusIcon } from "./Icons";

export default function ProductCard({ product, sizes = "(min-width: 1068px) 20vw, (min-width: 768px) 33vw, 50vw" }: { product: Product; sizes?: string }) {
  const { addEnquiry, hasEnquiry, open } = useUI();
  const added = hasEnquiry(product.slug);
  const href = `/products/${product.slug}/`;
  const collection = getCollection(product.collection);

  return (
    <div className="product-card">
      <div className="product-card--image-wrapper">
        <div className="product-card--image aspect-ratio aspect-ratio--portrait">
          <Img id={product.image} alt={product.name} sizes={sizes} className="reveal-scale" />
          <div className={`hover-image${product.hover ? "" : " is-detail"}`}>
            <Img id={product.hover ?? product.image} alt="" sizes={sizes} className="img-fill" />
          </div>
          <Link href={href} className="product-card--image-link" aria-label={product.name} />
        </div>
        <div className="product-card--badges">
          <span className="badge">{product.purity.startsWith("92.5") ? "92.5 Hallmarked" : product.purity}</span>
        </div>
        <button
          className={`product-card--quickview${added ? " is-added" : ""}`}
          onClick={() => {
            if (added) open("enquiry");
            else addEnquiry(product.slug);
          }}
        >
          {added ? <CheckIcon /> : <PlusIcon />}
          <span>{added ? "In your enquiry list" : "Add to enquiry"}</span>
        </button>
      </div>
      <div className="product-card-info">
        {collection && <span className="product-card-vendor">{collection.name}</span>}
        <Link href={href} className="product-card-title">
          {product.name}
        </Link>
        <div className="labels">
          {product.highlights.map((h) => (
            <span key={h} className="label">
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
