// Contact details. PLACEHOLDERS: replace phone, WhatsApp number and email before launch.
export const contact = {
  phoneDisplay: "+91 XXXXX XXXXX",
  phoneHref: "tel:+910000000000",
  /** WhatsApp number in international format, digits only (e.g. 919876543210). */
  whatsappNumber: "910000000000",
  email: "email@example.com",
  instagram: "https://www.instagram.com/kkjewelssilverstudio/",
  handle: "@kkjewelssilverstudio",
  address: "One42, 104/A First Floor, Ashok Vatika, Ambli Bopal Road, Ahmedabad, Gujarat 380054",
  addressLines: ["One42, 104/A First Floor", "Ashok Vatika, Ambli Bopal Road", "Ahmedabad, Gujarat 380054"],
  hours: "Open daily until 8:00 pm",
  mapsHref: "https://maps.google.com/?q=KK+Jewels+Silver+Studio+One42+Ambli+Bopal+Road+Ahmedabad",
};

/**
 * Public site address, used for absolute link-preview (Open Graph) URLs.
 * Set NEXT_PUBLIC_SITE_URL when deploying (e.g. https://kkjewels.vercel.app). On Vercel
 * the production domain is picked up automatically if the variable is not set.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://kkjewelssilverstudio.com")
).replace(/\/$/, "");
