import {
  collectionList,
  collectionTabs,
  craftGallery,
  featuredAvaas,
  heroSlides,
  kapoorBanner,
  occasions,
  saajBanner,
  story,
  visit,
} from "@/content/home";
import HeroSlideshow from "@/components/sections/HeroSlideshow";
import CollectionList from "@/components/sections/CollectionList";
import CollectionTabs from "@/components/sections/CollectionTabs";
import ImageWithTextOverlay from "@/components/sections/ImageWithTextOverlay";
import Gallery from "@/components/sections/Gallery";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import OccasionMarquee from "@/components/sections/OccasionMarquee";
import StorySlideshow from "@/components/sections/StorySlideshow";
import LayeredImages from "@/components/sections/LayeredImages";
import InstagramStrip from "@/components/sections/InstagramStrip";

// Section order follows the Lanes homepage one-to-one.
export default function Home() {
  return (
    <>
      <HeroSlideshow slides={heroSlides} />
      <CollectionList subheading={collectionList.subheading} />
      <CollectionTabs data={collectionTabs} />
      <ImageWithTextOverlay
        image={kapoorBanner.image}
        imageMobile={kapoorBanner.imageMobile}
        alt="Rhea Kapoor and Shanaya Kapoor in KK silver"
        subheading={kapoorBanner.subheading}
        heading={kapoorBanner.heading}
        text={kapoorBanner.text}
        cta={kapoorBanner.cta}
        layout="box"
        className="section-spacing section-spacing--disable-bottom"
      />
      <Gallery data={craftGallery} />
      <ImageWithTextOverlay
        image={saajBanner.image}
        imageMobile={saajBanner.imageMobile}
        alt="Saaj heritage silver necklace"
        badge={saajBanner.badge}
        heading={saajBanner.heading}
        headingClass="h1"
        text={saajBanner.text}
        cta={saajBanner.cta}
        layout="bottom"
        parallax
        overlay={0.1}
        size="large"
      />
      <FeaturedCollection data={featuredAvaas} />
      <OccasionMarquee data={occasions} />
      <StorySlideshow data={story} />
      <LayeredImages data={visit} />
      <InstagramStrip />
    </>
  );
}
