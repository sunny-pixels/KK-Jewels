import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import { brand, seo } from "@/content/site";
import { contact, SITE_URL } from "@/content/config";
import { media } from "@/content/media";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Drawers from "@/components/Drawers";
import BackToTop from "@/components/BackToTop";
import Motion from "@/components/Motion";
import { UIProvider } from "@/components/UIProvider";
import "@/styles/base.css";
import "@/styles/header.css";
import "@/styles/chrome.css";
import "@/styles/sections.css";
import "@/styles/pages.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.title, template: `%s | ${brand.name}` },
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: media["hero-hosting"].src, width: 1200, height: 550 }],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#efebe7" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: brand.name,
  slogan: brand.tagline,
  url: SITE_URL,
  image: `${SITE_URL}${media["hero-hosting"].src}`,
  telephone: contact.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: "One42, 104/A First Floor, Ashok Vatika, Ambli Bopal Road",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380054",
    addressCountry: "IN",
  },
  sameAs: [contact.instagram],
};

// Scroll-reveal start states apply only when JS runs and motion is allowed.
const motionBoot = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ready')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline motionBoot script adds "motion-ready" to <html>
    // before hydration (so reveal start states apply without a flash). Only affects this element's attributes.
    <html lang="en-IN" className={`${fraunces.variable} ${jost.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <UIProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Drawers />
          <BackToTop />
          <Motion />
        </UIProvider>
      </body>
    </html>
  );
}
