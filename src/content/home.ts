// Homepage copy, section by section, in the order of the Lanes reference layout.
import type { MediaId } from "./media";
import type { CollectionSlug } from "./site";

export type Cta = { label: string; href: string; style?: "solid" | "outline" };

export const announcement = {
  left: { label: "Book a studio visit", href: "/#visit" },
};

export const heroSlides: {
  subheading: string;
  heading: string;
  text?: string;
  image: MediaId;
  imageMobile: MediaId;
  ctas: Cta[];
}[] = [
  {
    subheading: "Ahmedabad · Handcrafted Silver Studio",
    heading: "The Art of Living in Silver",
    image: "hero-hosting",
    imageMobile: "DbaqCgVy3cu",
    ctas: [
      { label: "Explore Collections", href: "/#collections", style: "outline" },
      { label: "Book a Studio Visit", href: "/#visit", style: "solid" },
    ],
  },
  {
    subheading: "New Collection",
    heading: "Saaj: The Art of Adornment",
    image: "hero-saaj",
    imageMobile: "DdxzJHsyurM",
    ctas: [{ label: "Discover Saaj", href: "/collections/saaj-jewellery/", style: "solid" }],
  },
  {
    subheading: "The Joy of Celebration",
    heading: "A Little More Sparkle for Every Occasion",
    image: "hero-celebration",
    imageMobile: "DcYfgglSQpU",
    ctas: [{ label: "Shop Celebration", href: "/collections/joy-of-celebration/", style: "solid" }],
  },
  {
    subheading: "The Art of Devotion",
    heading: "Sacred Forms, Crafted with Reverence",
    image: "hero-devotion",
    imageMobile: "DdY08nsyilf",
    ctas: [{ label: "Explore Devotion", href: "/collections/art-of-devotion/", style: "outline" }],
  },
];

export const collectionList = {
  subheading: "The Art of Living in Silver",
};

export const collectionTabs = {
  subheading: "Most loved pieces",
  heading: "Our Signature Pieces",
  tabs: [
    {
      collection: "art-of-hosting" as CollectionSlug,
      label: "Hosting",
      promo: { heading: "The Art of Hosting", text: "Welcome every guest with grace", image: "DbIuYb6y9-j" as MediaId },
      products: ["pure-silver-dinner-set", "peacock-pedestal-fruit-bowl", "mukhwas-box", "raas-leela-box", "radha-krishna-dry-fruit-box"],
      button: "View The Art of Hosting",
    },
    {
      collection: "art-of-devotion" as CollectionSlug,
      label: "Devotion",
      promo: { heading: "The Art of Devotion", text: "Where faith takes form in silver", image: "DdMEo_ny1Kh" as MediaId },
      products: ["silver-kalash", "ganpati-fountain", "silver-kankawati", "pooja-thali", "jain-ensemble"],
      button: "View The Art of Devotion",
    },
    {
      collection: "art-of-legacy" as CollectionSlug,
      label: "Legacy",
      promo: { heading: "The Art of Legacy", text: "Heirlooms for the generations ahead", image: "DcJBPdQy8BH" as MediaId },
      products: ["royal-elephant-lamp", "silver-seating-set", "silver-chess-set", "embossed-vase", "victorian-fruit-bowl"],
      button: "View The Art of Legacy",
    },
  ],
};

export const kapoorBanner = {
  subheading: "As seen on",
  heading: "Chosen by the Kapoor Family",
  text: "At Anshula Kapoor's mehendi, Rhea Kapoor carried a handcrafted KK silver clutch and Shanaya Kapoor wore our silver bangles.",
  image: "banner-kapoor" as MediaId,
  imageMobile: "Dafc2hVkn6__1" as MediaId,
  cta: { label: "View the Clutch", href: "/products/kapoor-silver-clutch/" },
};

export const craftGallery = {
  heading: "The Craft in Motion",
  items: [
    {
      kind: "video" as const,
      video: "/media/video/DZsERV6SXtD.mp4",
      poster: "DZsERV6SXtD_cover" as MediaId,
      play: "hover" as const,
      subheading: "Avaas",
      heading: "Raas Leela, Hand Embossed",
      look: ["krishna-ghada", "raas-urli", "ramayana-fruit-bowl"],
    },
    {
      kind: "image" as const,
      image: "DafY_2dkm_8_1" as MediaId,
      subheading: "As worn by Shanaya Kapoor",
      heading: "Silver, Stacked",
      href: "/products/kapoor-silver-bangles/",
      look: ["kapoor-silver-bangles", "kapoor-silver-clutch", "saaj-cascade-necklace-set"],
    },
    {
      kind: "video" as const,
      video: "/media/video/DdgjboWSn8M.mp4",
      poster: "DdgjboWSn8M_cover" as MediaId,
      play: "auto" as const,
      subheading: "The Art of Legacy",
      heading: "Light, in Filigree",
      look: ["royal-elephant-lamp", "embossed-vase", "silver-seating-set"],
    },
  ],
};

export const saajBanner = {
  badge: "New collection",
  heading: "Saaj: The Art of Adornment",
  text: "Saaj reimagines Indian heritage jewellery in silver. Temple motifs, coloured stones, pearls and cascading detail come together in pieces made for Navratri, weddings and every festive evening.",
  image: "banner-saaj" as MediaId,
  imageMobile: "DdxzJHsyurM" as MediaId,
  cta: { label: "View Saaj", href: "/collections/saaj-jewellery/" },
};

export const featuredAvaas = {
  collection: "avaas-collection" as CollectionSlug,
  heading: "Avaas",
  text: "Where silver finds its place at home",
  promo: { heading: "Avaas", text: "Timeless silver for treasured homes.", image: "DZNMVmqyCx3" as MediaId },
  products: ["raas-urli", "royal-nakshi-bowl", "peacock-vase", "krishna-ghada", "silver-glass", "silver-water-bottle", "silver-sipper", "ramayana-fruit-bowl"],
  button: "View Avaas",
};

export const occasions = {
  id: "gifting",
  subheading: "Gifts that become heirlooms",
  items: [
    { name: "Weddings", text: "Dinner sets, clutches and pooja sets for the new home.", image: "occasion-weddings" as MediaId },
    { name: "Housewarming", text: "Urlis, kalash and fruit bowls that bless a new beginning.", image: "occasion-housewarming" as MediaId },
    { name: "Festivals", text: "Diwali, Navratri and Janmashtami gifts with meaning.", image: "occasion-festivals" as MediaId },
    { name: "Corporate", text: "Silver glasses, bottles and boxes for clients and teams.", image: "occasion-corporate" as MediaId },
  ],
  cta: { label: "Ask About Gifting", message: "Hello KK Jewels Silver Studio, I would like help choosing a silver gift." },
};

export const pillars = {
  subheading: "The KK promise",
  heading: "Why KK Silver",
  items: [
    { title: "Hallmarked Purity", text: "Articles in certified 92.5 silver, with 97% and 99% fine silver for bottles and glasses." },
    { title: "Master Craftsmanship", text: "Embossing, nakshi work, filigree and hand engraving by artisans trained in traditional techniques." },
    { title: "Made to Be Inherited", text: "Designed to be used every day and passed down, not put away." },
    { title: "Thoughtful Gifting", text: "Wedding, housewarming, festive and corporate gifts that carry real meaning." },
  ],
};

/** Real customer reviews. While empty, the reviews section shows the pillars instead. */
export const testimonials: { title: string; quote: string; name: string; context: string }[] = [];

export const story = {
  id: "story",
  images: ["DZNMmVmywB9", "DZcgcsvS_IF", "DcJBPdQy8BH"] as MediaId[],
  slides: [
    {
      subheading: "Our story",
      heading: "In Indian homes, silver has always meant more than metal.",
      text: "It welcomes guests, holds offerings at the altar, marks weddings and festivals, and is handed down with the family name.",
    },
    {
      subheading: "The craft",
      heading: "Shaped by skilled artisans using embossing, nakshi work, filigree and hand engraving.",
      text: "KK Jewels Silver Studio brings that tradition into the modern home, finishing every piece in hallmarked silver so it stays beautiful for generations.",
    },
    {
      subheading: "Made to be lived with",
      heading: "From a single silver glass to a carved seating set for a grand living room.",
      text: "We make silver that is meant to be used, admired and inherited.",
    },
  ],
  cta: { label: "Visit the Studio", href: "/#visit" },
};

export const visit = {
  id: "visit",
  subheading: "Visit the studio",
  heading: "See the Craft Up Close",
  text: "Silver is best experienced in person. Visit our studio in Ahmedabad to see the collections, feel the weight and finish, and get help choosing the right piece.",
  images: { main: "Daw8-_zSSJD" as MediaId, overlap: "Daw70niSUfM" as MediaId },
};

export const instagram = {
  subheading: "Instagram",
  heading: "Follow us @kkjewelssilverstudio",
  posts: ["DYe03NISite", "DdxzJHsyurM", "DcvlPviSZaL", "DdMEVKGyuQn", "Dafc2hVkn6__2", "DbqAFbXy1ih", "Db5eckdyadv"] as MediaId[],
};

export const trustBar = [
  { label: "Hallmarked 92.5 Silver", icon: "hallmark" },
  { label: "Handcrafted by Master Artisans", icon: "craft" },
  { label: "Worn at the Kapoor Family Wedding", icon: "star" },
  { label: "Studio on Ambli Bopal Road", icon: "pin" },
] as const;
