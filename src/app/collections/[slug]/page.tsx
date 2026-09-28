import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand, collections, getCollection, products, productsIn } from "@/content/site";
import { shareMetadata } from "@/lib/seo";
import { media, type MediaId } from "@/content/media";
import ImageWithTextOverlay from "@/components/sections/ImageWithTextOverlay";
import ProductCard from "@/components/ProductCard";
import Img from "@/components/Img";
import { InstagramIcon } from "@/components/Icons";
import { instagramPostUrl } from "@/lib/instagram";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  const description = `${c.tagline}. ${c.description}`;
  return {
    title: c.name,
    description,
    ...shareMetadata({ title: `${c.name} | ${brand.name}`, description, path: `/collections/${c.slug}/` }),
  };
}

/** Photos from this collection's Instagram posts that are not already product images. */
function studioPhotos(slug: string): MediaId[] {
  const used = new Set<string>(products.flatMap((p) => [p.image, p.hover ?? ""]));
  const folders = slug === "saaj-jewellery" ? [slug, "celebrity"] : [slug];
  return (Object.keys(media) as MediaId[]).filter((id) => folders.includes(media[id].collection) && !used.has(id));
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const photos = studioPhotos(c.slug);

  return (
    <>
      <ImageWithTextOverlay
        image={c.banner}
        imageMobile={c.bannerMobile}
        alt={c.name}
        subheading={c.tagline}
        heading={c.name}
        headingTag="h1"
        headingClass="h1-large"
        text={c.description}
        layout="left"
        className="collection-banner"
      />

      <section className="section-spacing">
        <div className="row">
          <div className="columns">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#collections">Collections</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{c.name}</span>
            </nav>
            <div className="collection-toolbar">
              <span>
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </span>
              <div className="collection-toolbar__links">
                {collections
                  .filter((o) => o.slug !== c.slug)
                  .map((o) => (
                    <Link key={o.slug} href={`/collections/${o.slug}/`} className="text-button">
                      {o.short}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="product-grid">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} sizes="(min-width: 1068px) 25vw, (min-width: 768px) 33vw, 50vw" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="section-spacing studio-photos">
          <div className="row">
            <div className="columns">
              <div className="section-header">
                <span className="subheading">From the studio</span>
                <h2 className="h3">More from {c.name}</h2>
                <p>Every piece is made in small numbers. Ask us about anything you see here.</p>
              </div>
              <div className="studio-grid">
                {photos.map((id) => (
                  <a key={id} href={instagramPostUrl(id)} target="_blank" rel="noopener" className="studio-grid__item" aria-label="View on Instagram">
                    <div className="aspect-ratio aspect-ratio--portrait">
                      <Img id={id} alt="" sizes="(min-width: 1068px) 25vw, 50vw" className="reveal-scale" />
                    </div>
                    <span className="studio-grid__ig">
                      <InstagramIcon />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
