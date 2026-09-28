import { pillars, testimonials } from "@/content/home";
import ThemeScroll from "../ThemeScroll";

/**
 * Lanes customer-reviews layout. Until real testimonials are added in
 * content/home.ts, the same bordered cards present the studio's four pillars.
 */
export default function Reviews() {
  const hasReviews = testimonials.length > 0;
  return (
    <section className="section-customer-reviews section-spacing-padding">
      <div className="row">
        <div className="columns">
          <div className="section-header">
            <span className="subheading">{hasReviews ? "Happy customers" : pillars.subheading}</span>
            <h2 className="h3">{hasReviews ? "KK Silver Experiences" : pillars.heading}</h2>
          </div>
          <ThemeScroll cols={[4, 3, 2]} gap={[20, 10]} label={hasReviews ? "Customer reviews" : "Why KK Silver"}>
            {hasReviews
              ? testimonials.map((t) => (
                  <div key={t.name + t.title} className="customer-review">
                    <div className="star-rating" aria-label="5 out of 5 stars">★★★★★</div>
                    <h3 className="customer-review__title">{t.title}</h3>
                    <p className="customer-review__text">{t.quote}</p>
                    <span className="customer-review__author">
                      {t.name} · {t.context}
                    </span>
                  </div>
                ))
              : pillars.items.map((p, i) => (
                  <div key={p.title} className="customer-review">
                    <span className="customer-review__num heading-font">0{i + 1}</span>
                    <h3 className="customer-review__title">{p.title}</h3>
                    <p className="customer-review__text">{p.text}</p>
                  </div>
                ))}
          </ThemeScroll>
        </div>
      </div>
    </section>
  );
}
