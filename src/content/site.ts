// Site content for KK Jewels Silver Studio.
// Copy comes from kk-assets/siteContent.ts and the Instagram captions in kk-assets/catalog.json.
// Images reference ids in ./media.ts (cropped by scripts/process_images.py). Text-only
// Instagram cards referenced by the original siteContent were replaced with real photos.
import type { MediaId } from "./media";

export type CollectionSlug =
  | "art-of-hosting"
  | "art-of-devotion"
  | "joy-of-celebration"
  | "art-of-legacy"
  | "avaas-collection"
  | "saaj-jewellery";

export type Collection = {
  slug: CollectionSlug;
  name: string;
  short: string;
  tagline: string;
  description: string;
  card: MediaId;
  banner: MediaId;
  bannerMobile: MediaId;
};

export type Product = {
  slug: string;
  name: string;
  collection: CollectionSlug;
  description: string;
  highlights: string[];
  purity: string;
  image: MediaId;
  /** Second image shown on hover. When omitted, a zoomed detail of `image` is used. */
  hover?: MediaId;
  instagram: string;
};

export const brand = {
  name: "KK Jewels Silver Studio",
  shortName: "KK Silver Studio",
  tagline: "The Art of Living in Silver",
};

export const seo = {
  title: "KK Jewels Silver Studio | Handcrafted Silver for Home, Devotion & Celebration, Ahmedabad",
  description:
    "Hallmarked 92.5 silver serveware, pooja articles, heirloom décor and the Saaj heritage jewellery collection. Visit our studio on Ambli Bopal Road, Ahmedabad.",
  keywords: [
    "silver articles Ahmedabad",
    "silver pooja items",
    "silver gifting",
    "silver urli",
    "silver dinner set",
    "92.5 silver",
    "silver jewellery Ahmedabad",
    "wedding silver gifts",
  ],
};

export const collections: Collection[] = [
  {
    slug: "art-of-hosting",
    name: "The Art of Hosting",
    short: "Hosting",
    tagline: "Welcome every guest with grace",
    description:
      "Dinner sets, fruit bowls, mukhwas boxes and serveware that turn every meal and gathering into an occasion.",
    card: "DbIvJ7tyfJq",
    banner: "hero-hosting",
    bannerMobile: "DbaqCgVy3cu",
  },
  {
    slug: "art-of-devotion",
    name: "The Art of Devotion",
    short: "Devotion",
    tagline: "Sacred forms, crafted with reverence",
    description: "Pooja thalis, kalash, kankawati, idols, bajot and Jain devotional artefacts for the prayer room.",
    card: "DdY1DqZSVR3",
    banner: "hero-devotion",
    bannerMobile: "DdY08nsyilf",
  },
  {
    slug: "joy-of-celebration",
    name: "The Joy of Celebration",
    short: "Celebration",
    tagline: "A little more sparkle for every occasion",
    description: "Statement clutches, peacock urlis and festive décor that become part of your celebrations.",
    card: "DcYfgglSQpU",
    banner: "hero-celebration",
    bannerMobile: "DcYfgglSQpU",
  },
  {
    slug: "art-of-legacy",
    name: "The Art of Legacy",
    short: "Legacy",
    tagline: "Heirlooms for the generations ahead",
    description: "Carved silver furniture, royal lamps, embossed vases and collector pieces made to outlast trends.",
    card: "Db5d1szy5Ho",
    banner: "banner-legacy",
    bannerMobile: "Db5d1szy5Ho",
  },
  {
    slug: "avaas-collection",
    name: "Avaas",
    short: "Avaas",
    tagline: "Where silver finds its place at home",
    description:
      "Silver for everyday living: fruit bowls, vases, urlis, glasses and bottles with a quiet sense of luxury.",
    card: "DYezz9_y6zT",
    banner: "banner-avaas",
    bannerMobile: "DYezz9_y6zT",
  },
  {
    slug: "saaj-jewellery",
    name: "Saaj",
    short: "Saaj",
    tagline: "Heritage silver jewellery",
    description: "Our jewellery line, an ode to the art of adornment with intricate, festive statement pieces.",
    card: "DdxzPDWS50t",
    banner: "hero-saaj",
    bannerMobile: "DdxzJHsyurM",
  },
];

const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

export const products: Product[] = [
  // The Art of Hosting
  {
    slug: "pure-silver-dinner-set",
    name: "Pure Silver Dinner Set",
    collection: "art-of-hosting",
    description: "A complete silver thali set that brings everyday luxury and traditional wellness to your dining table.",
    highlights: ["Handcrafted", "Ideal wedding gift", "Everyday use"],
    purity: "92.5 hallmarked silver",
    image: "DbaqCgVy3cu",
    hover: "Dbar4DVyW5u",
    instagram: ig("DbaqCgVy3cu"),
  },
  {
    slug: "peacock-fruit-bowl",
    name: "Peacock Handle Fruit Bowl",
    collection: "art-of-hosting",
    description:
      "A woven silver basket crowned with a sculpted peacock handle. A centrepiece on its own, generous when filled.",
    highlights: ["Woven basket design", "Sculpted peacock"],
    purity: "92.5 hallmarked silver",
    image: "DbaqT-BSH7L",
    instagram: ig("DbaqT-BSH7L"),
  },
  {
    slug: "peacock-pedestal-fruit-bowl",
    name: "Peacock Pedestal Fruit Bowl",
    collection: "art-of-hosting",
    description: "Peacocks, floral carving and fine mesh detailing on a sculpted pedestal.",
    highlights: ["Mesh detailing", "Pedestal base"],
    purity: "92.5 hallmarked silver",
    image: "DbIvJ7tyfJq",
    instagram: ig("DbIvJ7tyfJq"),
  },
  {
    slug: "mukhwas-box",
    name: "Silver Mukhwas Box with Spoons",
    collection: "art-of-hosting",
    description: "An elegant finish to every meal: a handcrafted mukhwas box with matching silver spoons.",
    highlights: ["Includes spoons", "Hosting essential"],
    purity: "92.5 hallmarked silver",
    image: "Da7stgqy1fW",
    hover: "Da7s3SPS7yY",
    instagram: ig("Da7stgqy1fW"),
  },
  {
    slug: "raas-leela-box",
    name: "Radha Krishna Raas Leela Box",
    collection: "art-of-hosting",
    description: "A hand-engraved keepsake box showing the Raas Leela framed by peacocks and floral borders.",
    highlights: ["Hand engraved", "Collector piece"],
    purity: "92.5 hallmarked silver",
    image: "DbIwqLtSr_N",
    hover: "DbIuYb6y9-j",
    instagram: ig("DbIwqLtSr_N"),
  },
  {
    slug: "radha-krishna-dry-fruit-box",
    name: "Radha Krishna Dry Fruit Box",
    collection: "art-of-hosting",
    description: "A devotional dry fruit box for festive hosting and heartfelt gifting.",
    highlights: ["Festive gifting", "Housewarming"],
    purity: "92.5 hallmarked silver",
    image: "DbqAOk3SGF-",
    hover: "DbqAW5Fyckg",
    instagram: ig("DbqAOk3SGF-"),
  },

  // The Art of Devotion
  {
    slug: "pooja-thali",
    name: "Silver Pooja Thali",
    collection: "art-of-devotion",
    description: "An ornate thali for daily prayer, aarti and sacred offerings.",
    highlights: ["Daily pooja", "Ornate detailing"],
    purity: "92.5 hallmarked silver",
    image: "Ddgj3a_SSbY",
    instagram: ig("Ddgj3a_SSbY"),
  },
  {
    slug: "silver-kalash",
    name: "Silver Kalash",
    collection: "art-of-devotion",
    description: "The auspicious kalash, symbol of prosperity, finely crafted in silver.",
    highlights: ["Auspicious", "Pooja essential"],
    purity: "92.5 hallmarked silver",
    image: "DdY1DqZSVR3",
    instagram: ig("DdY1DqZSVR3"),
  },
  {
    slug: "silver-kankawati",
    name: "Silver Kankawati",
    collection: "art-of-devotion",
    description: "A kumkum holder for daily rituals, made to be cherished through generations.",
    highlights: ["Kumkum holder", "Daily ritual"],
    purity: "92.5 hallmarked silver",
    image: "DdMEVKGyuQn",
    hover: "DdMEz1MSv6c",
    instagram: ig("DdMEVKGyuQn"),
  },
  {
    slug: "ganpati-fountain",
    name: "Ganpati Silver Water Fountain",
    collection: "art-of-devotion",
    description: "Flowing water and the grace of Ganpati, bringing calm and positivity to your home.",
    highlights: ["Statement décor", "Working fountain"],
    purity: "92.5 hallmarked silver",
    image: "DdY08nsyilf",
    hover: "DdY1LWVSSCF",
    instagram: ig("DdY08nsyilf"),
  },
  {
    slug: "silver-bajot",
    name: "Silver Bajot",
    collection: "art-of-devotion",
    description: "A traditional seat for idols and offerings, detailed with ornate silver work.",
    highlights: ["Idol seat", "Ornate work"],
    purity: "92.5 hallmarked silver",
    image: "DdgjUtpSALA",
    instagram: ig("DdgjUtpSALA"),
  },
  {
    slug: "navkar-mantra",
    name: "Silver Navkar Mantra Path",
    collection: "art-of-devotion",
    description: "The Navkar Mantra etched in silver for the Jain prayer space.",
    highlights: ["Jain devotion", "Etched mantra"],
    purity: "92.5 hallmarked silver",
    image: "DdBn69YSEqq",
    instagram: ig("DdBn69YSEqq"),
  },
  {
    slug: "jain-ensemble",
    name: "Jain Devotional Ensemble",
    collection: "art-of-devotion",
    description: "Shankheshwar Bhagwan idol, Navkar Mantra path, sthapnacharya and bajot, crafted as one set.",
    highlights: ["Complete set", "Jain temple essentials"],
    purity: "92.5 hallmarked silver",
    image: "DdBnN0dS_ez",
    instagram: ig("DdBnN0dS_ez"),
  },

  // The Joy of Celebration
  {
    slug: "kapoor-silver-clutch",
    name: "Handcrafted Silver Clutch",
    collection: "joy-of-celebration",
    description:
      "The regal silver clutch carried by Rhea Kapoor at Anshula Kapoor's mehendi. A statement for any wedding or festive look.",
    highlights: ["As carried by Rhea Kapoor", "Statement accessory"],
    purity: "92.5 hallmarked silver",
    image: "Dafc2hVkn6__2",
    hover: "Dafc2hVkn6__1",
    instagram: ig("Dafc2hVkn6_"),
  },
  {
    slug: "silver-clutch",
    name: "Filigree Silver Clutch",
    collection: "joy-of-celebration",
    description:
      "A celebration of Indian artistry: pierced silver, peacocks and coloured stones in a regal form made to make a statement.",
    highlights: ["Pierced filigree", "Tasselled strap"],
    purity: "92.5 hallmarked silver",
    image: "DcYfgglSQpU",
    hover: "DcYebiRyiKb",
    instagram: ig("DcYfgglSQpU"),
  },
  {
    slug: "heritage-gold-clutch",
    name: "Heritage Gilded Clutch",
    collection: "joy-of-celebration",
    description:
      "Crafted in silver and enriched with intricate artistry, a little more sparkle for the occasions you will remember.",
    highlights: ["Gilded finish", "Beaded strap"],
    purity: "92.5 hallmarked silver",
    image: "DcfiRvJScte",
    hover: "Dcfh3_ByEjx",
    instagram: ig("DcfiRvJScte"),
  },
  {
    slug: "peacock-urli",
    name: "Silver Peacock Urli",
    collection: "joy-of-celebration",
    description: "Style it with floating diyas or fresh flowers for a festive centrepiece.",
    highlights: ["Festive décor", "Peacock motif"],
    purity: "92.5 hallmarked silver",
    image: "DcvlWN7SdnH",
    hover: "DcvlPviSZaL",
    instagram: ig("DcvlWN7SdnH"),
  },
  {
    slug: "peacock-pedestal-urli",
    name: "Peacock Pedestal Urli",
    collection: "joy-of-celebration",
    description:
      "An exquisite urli on a carved pedestal with graceful peacock motifs, for flowers, floating diyas or delicate petals.",
    highlights: ["Pedestal base", "Festive centrepiece"],
    purity: "92.5 hallmarked silver",
    image: "Dc0sfmMy9I1",
    hover: "Dc0sMA1ymAT",
    instagram: ig("Dc0sfmMy9I1"),
  },

  // The Art of Legacy
  {
    slug: "silver-seating-set",
    name: "Silver Chairs & Centre Table",
    collection: "art-of-legacy",
    description: "A pair of carved statement chairs with a matching centre table, made for grand spaces.",
    highlights: ["Statement furniture", "Made to order"],
    purity: "92.5 hallmarked silver",
    image: "DcAuN-5yNBx",
    hover: "DcJBPdQy8BH",
    instagram: ig("DcAuN-5yNBx"),
  },
  {
    slug: "silver-chess-set",
    name: "Silver Chess Set",
    collection: "art-of-legacy",
    description: "A game of strategy crafted as an heirloom, every piece in silver.",
    highlights: ["Collector piece", "Gift for him"],
    purity: "92.5 hallmarked silver",
    image: "DcJBkMEyjkE",
    hover: "DcJBZdhS8gy",
    instagram: ig("DcJBkMEyjkE"),
  },
  {
    slug: "royal-elephant-lamp",
    name: "Royal Elephant Lamp",
    collection: "art-of-legacy",
    description: "Carved canopy, filigree and majestic elephants in a lamp built to be inherited.",
    highlights: ["Filigree", "Elephant motif"],
    purity: "92.5 hallmarked silver",
    image: "Db5d1szy5Ho",
    hover: "DdgjboWSn8M_cover",
    instagram: ig("Db5d1szy5Ho"),
  },
  {
    slug: "embossed-vase",
    name: "Embossed Heritage Vase",
    collection: "art-of-legacy",
    description: "A richly embossed vase on a graceful pedestal, inspired by royal Indian craft.",
    highlights: ["Embossed body", "Pedestal"],
    purity: "92.5 hallmarked silver",
    image: "Db5eckdyadv",
    instagram: ig("Db5eckdyadv"),
  },

  // Avaas
  {
    slug: "victorian-fruit-bowl",
    name: "Victorian Fruit Bowl",
    collection: "avaas-collection",
    description: "Elephant-leg detailing inspired by regal Victorian design.",
    highlights: ["Elephant legs", "Centrepiece"],
    purity: "92.5 hallmarked silver",
    image: "DYe0LIUSqg0",
    hover: "DZcgcsvS_IF",
    instagram: ig("DYe0LIUSqg0"),
  },
  {
    slug: "royal-nakshi-bowl",
    name: "Royal Nakshi Fruit Bowl",
    collection: "avaas-collection",
    description: "Emboss nakshi work inspired by the treasures of royal courts.",
    highlights: ["Nakshi work", "Heirloom"],
    purity: "92.5 hallmarked silver",
    image: "DZcgQYZyOv1",
    hover: "DZcg4dZSYun",
    instagram: ig("DZcgQYZyOv1"),
  },
  {
    slug: "ramayana-fruit-bowl",
    name: "Ramayana Fruit Bowl",
    collection: "avaas-collection",
    description: "Carvings of Ram, Sita and Lakshman on a devotional serving piece.",
    highlights: ["Carved scenes", "Devotional"],
    purity: "92.5 hallmarked silver",
    image: "DYRceGRyN9N",
    instagram: ig("DYRceGRyN9N"),
  },
  {
    slug: "raas-urli",
    name: "Radha Krishna Raas Urli",
    collection: "avaas-collection",
    description: "Raas Leela at the centre with peacock handles, for flowers and floating candles.",
    highlights: ["Peacock handles", "Festive"],
    purity: "92.5 hallmarked silver",
    image: "DZCPhYQIBaS",
    hover: "DZCO2WPoBcn",
    instagram: ig("DZCPhYQIBaS"),
  },
  {
    slug: "krishna-ghada",
    name: "Shree Krishna Raas Leela Ghada",
    collection: "avaas-collection",
    description: "A silver ghada for the pooja room, for décor, or for storing water.",
    highlights: ["Multi-use", "Devotional"],
    purity: "92.5 hallmarked silver",
    image: "DZNMmVmywB9",
    hover: "DZsERV6SXtD_cover",
    instagram: ig("DZNMmVmywB9"),
  },
  {
    slug: "peacock-vase",
    name: "Peacock Flower Vase",
    collection: "avaas-collection",
    description: "Peacock feather detailing for festive settings and elegant interiors.",
    highlights: ["Peacock detailing", "Décor"],
    purity: "92.5 hallmarked silver",
    image: "DYezz9_y6zT",
    instagram: ig("DYezz9_y6zT"),
  },
  {
    slug: "silver-glass",
    name: "Pure Silver Glass",
    collection: "avaas-collection",
    description: "For water and milk every day, in the tradition of drinking from silver.",
    highlights: ["Daily wellness", "Gifting"],
    purity: "99% fine silver",
    image: "DYq2OdsSRwT",
    hover: "DYq1a_-ylNG",
    instagram: ig("DYq2OdsSRwT"),
  },
  {
    slug: "silver-water-bottle",
    name: "Silver Water Bottle",
    collection: "avaas-collection",
    description: "A fine silver bottle with a matching cap, for home or on the go.",
    highlights: ["Matching cap", "Travel friendly"],
    purity: "97% fine silver",
    image: "DZNMVmqyCx3",
    instagram: ig("DZNMVmqyCx3"),
  },
  {
    slug: "silver-sipper",
    name: "Silver Sipper Bottle",
    collection: "avaas-collection",
    description: "A sleek sipper for work, travel and home.",
    highlights: ["Sleek design", "Everyday luxury"],
    purity: "97% fine silver",
    image: "DZNMvbZS9MS",
    instagram: ig("DZNMvbZS9MS"),
  },

  // Saaj
  {
    slug: "saaj-cascade-necklace-set",
    name: "Saaj Cascade Necklace Set",
    collection: "saaj-jewellery",
    description:
      "Silver meets a symphony of colour: cascading drops, intricate artistry and matching earrings in a statement that is regal and refined.",
    highlights: ["Necklace & earrings", "Festive statement"],
    purity: "92.5 silver",
    image: "DdxzPDWS50t",
    hover: "DdxzJHsyurM",
    instagram: ig("DdxzPDWS50t"),
  },
  {
    slug: "saaj-shrinathji-necklace",
    name: "Shrinathji Long Necklace",
    collection: "saaj-jewellery",
    description:
      "Adorned in divinity: Shrinathji takes centre stage, framed by sparkling stones, rich green accents and cascading pearls.",
    highlights: ["Temple motif", "Pearl drops"],
    purity: "92.5 silver",
    image: "DdoIzD0SuL2",
    instagram: ig("DdoIzD0SuL2"),
  },
  {
    slug: "kapoor-silver-bangles",
    name: "Handcrafted Silver Bangles",
    collection: "saaj-jewellery",
    description:
      "The handcrafted silver bangles Shanaya Kapoor wore at Anshula Kapoor's mehendi, where timeless craft meets contemporary style.",
    highlights: ["As worn by Shanaya Kapoor", "Stackable"],
    purity: "92.5 silver",
    image: "DafY_2dkm_8_1",
    hover: "DafY_2dkm_8_3",
    instagram: ig("DafY_2dkm_8"),
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function productsIn(slug: CollectionSlug) {
  return products.filter((p) => p.collection === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsBySlug(slugs: string[]) {
  return slugs.map((s) => {
    const p = getProduct(s);
    if (!p) throw new Error(`Unknown product ${s}`);
    return p;
  });
}
