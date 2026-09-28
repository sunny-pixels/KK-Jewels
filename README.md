# KK Jewels Silver Studio website

A static Next.js site for KK Jewels Silver Studio. Its layout, typography, colours and animations follow the Lanes Jewellery reference (`../Reference website - Lanes`). Its content and photography come from `../kk-assets`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/ (then flattens Next's prefetch files)
npm start          # serve out/ locally
```

`out/` is a plain static site. It can be deployed to any static host, such as Netlify, Vercel, Cloudflare Pages or S3.

## Before launch: replace the placeholders

| What | Where |
|---|---|
| Phone number, WhatsApp number, email | `src/content/config.ts` |
| Site URL for link previews (WhatsApp, Facebook, X need an absolute image URL) | Set the `NEXT_PUBLIC_SITE_URL` env var, e.g. `https://kkjewels.vercel.app`. On Vercel it falls back to the production domain automatically. |

## Where things live

- `src/content/site.ts` holds collections and products, with names, descriptions, highlights, purity and image ids.
- `src/content/home.ts` holds the homepage copy, section by section, in Lanes order.
- `src/components/sections/*` has one component per Lanes section, with styles in `src/styles/sections.css`.
- `src/lib/motion.ts` and `src/components/Motion.tsx` hold the GSAP animations: scroll reveals, split-line headings and parallax.

## Link preview image

`public/og-image.jpg` (1200×630) is the preview card shown when the site is shared on WhatsApp, Facebook or X. It is set for every page in `src/lib/seo.ts`.

## Images

The Instagram photos in `kk-assets` have beige frames and burned-in logos, and some are text-only cards. `scripts/process_images.py` turns them into clean web images:

- It crops each photo to the product using the boxes in `scripts/crops.json`, in percent of the source image. Photos not listed there are text cards and are never used.
- It extends landscape crops to portrait, so the whole piece shows in product cards.
- It builds the wide hero and banner composites, listed in `COMPOSITES`.
- It writes responsive WebP files to `public/media/` and the typed manifest `src/content/media.ts`.

To add a new photo, add its crop box to `crops.json`, then run:

```bash
npm run images
```

`scripts/propose_crops.py` can suggest starting crop boxes and contact sheets for new photos.
