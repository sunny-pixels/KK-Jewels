import { instagram } from "@/content/home";
import { instagramPostUrl } from "@/lib/instagram";
import Img from "../Img";
import ThemeScroll from "../ThemeScroll";

/** Lanes multicolumn: square Instagram tiles in a horizontal scroller. */
export default function InstagramStrip() {
  return (
    <section className="section-multicolumn section-spacing">
      <div className="row">
        <div className="columns">
          <div className="section-header">
            <span className="subheading">{instagram.subheading}</span>
            <h2 className="h3">{instagram.heading}</h2>
          </div>
          <ThemeScroll cols={[6, 3, 2]} gap={[10, 10]} label="Instagram posts">
            {instagram.posts.map((id) => (
              <a key={id} href={instagramPostUrl(id)} target="_blank" rel="noopener" className="multicolumn-item" aria-label="View on Instagram">
                <div className="aspect-ratio aspect-ratio--square">
                  <Img id={id} alt="" sizes="(min-width: 1068px) 16vw, (min-width: 768px) 33vw, 50vw" className="reveal-scale" />
                </div>
              </a>
            ))}
          </ThemeScroll>
        </div>
      </div>
    </section>
  );
}
