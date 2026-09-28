import Link from "next/link";
import type { MediaId } from "@/content/media";
import { productsBySlug, type CollectionSlug } from "@/content/site";
import ProductCard from "../ProductCard";
import PromoCard from "../PromoCard";
import ThemeScroll from "../ThemeScroll";

/** Lanes featured-collection: heading + gold promo card + product carousel + outline button. */
export default function FeaturedCollection({
  data,
}: {
  data: {
    collection: CollectionSlug;
    heading: string;
    text: string;
    promo: { heading: string; text: string; image: MediaId };
    products: string[];
    button: string;
  };
}) {
  const href = `/collections/${data.collection}/`;
  return (
    <section className="section-featured-collection section-spacing">
      <div className="row">
        <div className="columns">
          <div className="section-header">
            <h2 className="h3">{data.heading}</h2>
            <p>{data.text}</p>
          </div>
          <ThemeScroll cols={[5, 3, 2]} gap={[20, 4]}>
            <PromoCard heading={data.promo.heading} text={data.promo.text} image={data.promo.image} href={href} accent />
            {productsBySlug(data.products).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </ThemeScroll>
          <div className="collection-tabs__button">
            <Link href={href} className="button outline">
              {data.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
