import Link from "next/link";
import { collections } from "@/content/site";
import Img from "../Img";
import ThemeScroll from "../ThemeScroll";

/** Lanes collection-list (style2): 2:3 cards, bottom gradient, white uppercase label. */
export default function CollectionList({ subheading }: { subheading: string }) {
  return (
    <section id="collections" className="section-collection-list section-spacing">
      <div className="row">
        <div className="columns">
          <div className="section-header">
            <span className="subheading">{subheading}</span>
          </div>
          <ThemeScroll cols={[5, 3, 2]} gap={[20, 4]} label="Collections">
            {collections.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}/`} className="collection-card">
                <div className="collection-card--link aspect-ratio aspect-ratio--tall reveal-scale">
                  <Img id={c.card} alt="" sizes="(min-width: 1068px) 20vw, (min-width: 768px) 33vw, 50vw" />
                </div>
                <div className="collection-card--content">
                  <span className="collection-card--title">{c.name}</span>
                  <span className="collection-card--tagline">{c.tagline}</span>
                </div>
              </Link>
            ))}
          </ThemeScroll>
        </div>
      </div>
    </section>
  );
}
