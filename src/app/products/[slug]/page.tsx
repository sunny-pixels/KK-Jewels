import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollection, getProduct, products } from "@/content/site";
import { media } from "@/content/media";
import { SITE_URL } from "@/content/config";
import Img from "@/components/Img";
import ProductCard from "@/components/ProductCard";
import ThemeScroll from "@/components/ThemeScroll";
import ProductActions from "@/components/ProductActions";
import ProductLayout from "@/components/ProductLayout";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    openGraph: { images: [{ url: media[p.image].src }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const c = getCollection(p.collection)!;
  const gallery = p.hover ? [p.image, p.hover] : [p.image];
  const related = [
    ...products.filter((o) => o.collection === p.collection && o.slug !== p.slug),
    ...products.filter((o) => o.collection !== p.collection),
  ].slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${SITE_URL}${media[p.image].src}`,
    brand: { "@type": "Brand", name: "KK Jewels Silver Studio" },
    material: p.purity,
    category: c.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="product-page section-spacing">
        <div className="row">
          <div className="columns">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/collections/${c.slug}/`}>{c.name}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{p.name}</span>
            </nav>
            <ProductLayout
              single={gallery.length === 1}
              media={gallery.map((id, i) => (
                <div key={id} className="product-page__image">
                  <div className="aspect-ratio" style={{ ["--ratio-percent" as string]: "125%" }}>
                    <Img id={id} alt={i === 0 ? p.name : `${p.name}, another view`} sizes="(min-width: 1068px) 30vw, (min-width: 768px) 50vw, 100vw" priority={i === 0} />
                  </div>
                </div>
              ))}
              info={
                <>
                  <Link href={`/collections/${c.slug}/`} className="product-card-vendor">
                    {c.name}
                  </Link>
                  <h1 className="h2 product-page__title">{p.name}</h1>
                  <div className="product-page__badges">
                    <span className="badge">{p.purity}</span>
                  </div>
                  <p className="product-page__desc">{p.description}</p>
                  <div className="labels">
                    {p.highlights.map((h) => (
                      <span key={h} className="label">
                        {h}
                      </span>
                    ))}
                  </div>
                  <ProductActions slug={p.slug} name={p.name} />
                  <dl className="product-page__details">
                    <div>
                      <dt>Purity</dt>
                      <dd>{p.purity}</dd>
                    </div>
                    <div>
                      <dt>Collection</dt>
                      <dd>{c.name}</dd>
                    </div>
                    <div>
                      <dt>Craft</dt>
                      <dd>Handcrafted by master artisans</dd>
                    </div>
                    <div>
                      <dt>Pricing</dt>
                      <dd>Priced by weight. Ask us on WhatsApp for today&apos;s price.</dd>
                    </div>
                  </dl>
                  <a href={p.instagram} target="_blank" rel="noopener" className="text-button" data-pin-end>
                    See this piece on Instagram
                  </a>
                </>
              }
            />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="row">
          <div className="columns">
            <div className="section-header">
              <span className="subheading">{c.tagline}</span>
              <h2 className="h3">You may also like</h2>
            </div>
            <ThemeScroll cols={[4, 3, 2]} gap={[20, 4]}>
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} sizes="(min-width: 1068px) 25vw, (min-width: 768px) 33vw, 50vw" />
              ))}
            </ThemeScroll>
          </div>
        </div>
      </section>
    </>
  );
}
