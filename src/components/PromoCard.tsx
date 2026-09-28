import Link from "next/link";
import type { MediaId } from "@/content/media";
import Img from "./Img";

/** Lanes product-card-promotion: image card that sits first in a product carousel. */
export default function PromoCard({
  heading,
  text,
  image,
  href,
  cta = "Shop Now",
  accent = false,
}: {
  heading: string;
  text: string;
  image: MediaId;
  href: string;
  cta?: string;
  accent?: boolean;
}) {
  return (
    <div className="promo-cell">
      <Link href={href} className={`product-card-promotion${accent ? " accent" : ""}`}>
        <div className="aspect-ratio">
          <Img id={image} alt="" sizes="(min-width: 1068px) 20vw, (min-width: 768px) 33vw, 50vw" className="reveal-scale" />
        </div>
        <div className="product-card-promotion--content">
          <h3 className="h5">{heading}</h3>
          <p>{text}</p>
          <span className="button white">{cta}</span>
        </div>
      </Link>
    </div>
  );
}
