"""Build the site's image set from kk-assets.

- Crops every photo listed in crops.json (removes the Instagram frame / burned-in logo)
- Exports WebP at several widths + a tiny blurred placeholder
- Builds landscape composites for the full-bleed hero / banner sections (the
  source photos are portrait, the Lanes layout needs ~2.2:1)
- Copies the videos
- Writes src/content/media.ts (typed manifest)

Run from kk-web/:  python scripts/process_images.py
"""
import base64
import io
import json
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

HERE = Path(__file__).resolve().parent
WEB = HERE.parent
ASSETS = WEB.parent / "kk-assets"
OUT = WEB / "public" / "media"
MANIFEST = WEB / "src" / "content" / "media.ts"
WIDTHS = [480, 960, 1600]
QUALITY = 80

# Landscape composites: id -> (layout, [source ids], size)
#   right  : photo on the right, backdrop extended to the left (text sits left)
#   center : photo centred, backdrop extended both sides
#   tri    : three photos side by side
COMPOSITES = {
    "hero-hosting": ("right", ["DbaqCgVy3cu"], (2400, 1100)),
    "hero-saaj": ("right", ["DdxzbO-SsHW"], (2400, 1100)),
    "hero-celebration": ("right", ["DcfiRvJScte"], (2400, 1100)),
    "hero-devotion": ("right", ["DdY08nsyilf"], (2400, 1100)),
    "banner-kapoor": ("tri", ["Dafc2hVkn6__1", "Dafc2hVkn6__2", "DafY_2dkm_8_1"], (2400, 1000)),
    "banner-saaj": ("center", ["DdxzJHsyurM"], (2400, 1030)),
    "banner-legacy": ("right", ["DcAuN-5yNBx"], (2400, 1100)),
    "banner-avaas": ("right", ["DZCPhYQIBaS"], (2400, 1100)),
    "occasion-weddings": ("center", ["Dbar4DVyW5u"], (2400, 860)),
    "occasion-housewarming": ("center", ["DZCO2WPoBcn"], (2400, 860)),
    "occasion-festivals": ("center", ["DdY1DqZSVR3"], (2400, 860)),
    "occasion-corporate": ("center", ["DYq2OdsSRwT"], (2400, 860)),
}


def media_id(stem: str) -> str:
    return stem.split("_", 1)[1] if "_" in stem else stem


def placeholder(im: Image.Image) -> str:
    t = im.copy()
    t.thumbnail((16, 16))
    buf = io.BytesIO()
    t.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def export(im: Image.Image, mid: str, widths=WIDTHS):
    """Save im at each width (never upscaling). Returns manifest entry."""
    files = []
    # Requested widths up to the source width, plus the full source width itself
    # (so a 1440px crop is exported at 480/960/1440, never capped at 960).
    targets = sorted({w for w in widths if w < im.width} | {min(max(widths), im.width)})
    for w in targets:
        h = round(im.height * w / im.width)
        name = f"{mid}-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(OUT / name, "WEBP", quality=QUALITY, method=6)
        files.append((w, name))
    return {
        "src": f"/media/{files[-1][1]}",
        "srcSet": ", ".join(f"/media/{n} {w}w" for w, n in files),
        "width": im.width,
        "height": im.height,
        "blur": placeholder(im),
    }


def backdrop(photo: Image.Image, size):
    """Cover the canvas with a heavily blurred, slightly darkened copy of the photo."""
    W, H = size
    s = max(W / photo.width, H / photo.height)
    bg = photo.resize((round(photo.width * s), round(photo.height * s)), Image.LANCZOS)
    bg = bg.crop(((bg.width - W) // 2, (bg.height - H) // 2, (bg.width - W) // 2 + W, (bg.height - H) // 2 + H))
    bg = bg.filter(ImageFilter.GaussianBlur(70))
    return bg


def side_fill(strip_img, w, H, outward_right):
    """Stretch a thin edge strip to width w, blur it, and ease it toward the strip's
    mean colour away from the photo so the far side is calm (text sits there)."""
    fill = strip_img.resize((w, H), Image.BILINEAR).filter(ImageFilter.GaussianBlur(60))
    mean = strip_img.resize((1, 1), Image.BOX).resize((w, H))
    ramp = Image.linear_gradient("L").rotate(90 if outward_right else -90, expand=True).resize((w, H))
    ramp = ramp.point(lambda v: round(v * 0.85))
    return Image.composite(mean, fill, ramp)


def edge_extend(fg, size, x, fade):
    """Fill the canvas left/right of the photo from its own edge pixels (no ghost shapes).
    The fill reaches `fade` px under the photo so the feathered edge blends into it."""
    W, H = size
    canvas = backdrop(fg, size)
    strip = max(8, round(fg.width * 0.03))
    if x > 0:
        w = x + fade
        canvas.paste(side_fill(fg.crop((0, 0, strip, fg.height)), w, H, outward_right=False), (0, 0))
    right_x = x + fg.width
    if right_x < W:
        w = W - right_x + fade
        canvas.paste(side_fill(fg.crop((fg.width - strip, 0, fg.width, fg.height)), w, H, outward_right=True), (right_x - fade, 0))
    return canvas


def pad_to_portrait(im, ratio=1.25):
    """Landscape crops sit in portrait (3:4 / 4:5) cards. Extend the backdrop above and
    below from the photo's own edge rows so the whole piece stays visible when covered."""
    W, H = im.width, round(im.width * ratio)
    pad_top = (H - im.height) // 2
    fade = round(im.height * 0.1)
    canvas = Image.new("RGB", (W, H))
    for top in (True, False):
        strip_h = max(8, round(im.height * 0.03))
        strip = im.crop((0, 0, W, strip_h)) if top else im.crop((0, im.height - strip_h, W, im.height))
        h = pad_top + fade if top else H - (pad_top + im.height) + fade
        fill = strip.resize((W, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(40))
        mean = strip.resize((1, 1), Image.BOX).resize((W, h))
        ramp = Image.linear_gradient("L").resize((W, h))  # 0 at top → 255 at bottom
        if top:
            ramp = ramp.transpose(Image.FLIP_TOP_BOTTOM)
        fill = Image.composite(mean, fill, ramp.point(lambda v: round(v * 0.7)))
        canvas.paste(fill, (0, 0) if top else (0, H - h))
    mask = Image.new("L", im.size, 255)
    d = ImageDraw.Draw(mask)
    for i in range(fade):
        d.line([(0, i), (W, i)], fill=round(255 * i / fade))
        d.line([(0, im.height - 1 - i), (W, im.height - 1 - i)], fill=round(255 * i / fade))
    canvas.paste(im, (0, pad_top), mask)
    return canvas


def feather_mask(w, h, left, right):
    """Horizontal alpha ramp: 0 → 255 over `left` px, 255 → 0 over `right` px."""
    mask = Image.new("L", (w, h), 255)
    d = ImageDraw.Draw(mask)
    for i in range(left):
        d.line([(i, 0), (i, h)], fill=round(255 * i / left))
    for i in range(right):
        d.line([(w - 1 - i, 0), (w - 1 - i, h)], fill=round(255 * i / right))
    return mask


def composite(layout, photos, size):
    W, H = size
    if layout == "tri":
        canvas = Image.new("RGB", size)
        cw = W // len(photos)
        for i, p in enumerate(photos):
            s = max(cw / p.width, H / p.height)
            r = p.resize((round(p.width * s), round(p.height * s)), Image.LANCZOS)
            top = max(0, round((r.height - H) * 0.3))
            left = (r.width - cw) // 2
            canvas.paste(r.crop((left, top, left + cw, top + H)), (i * cw, 0))
        return canvas

    photo = photos[0]
    s = H / photo.height
    if photo.width * s > W * 0.78:  # very wide source: keep room to fade
        s = W * 0.78 / photo.width
    fg = photo.resize((round(photo.width * s), round(photo.height * s)), Image.LANCZOS)
    x = W - fg.width if layout == "right" else (W - fg.width) // 2
    y = (H - fg.height) // 2
    fade = round(fg.width * 0.12)
    canvas = edge_extend(fg, size, x, fade)
    mask = feather_mask(fg.width, fg.height, fade, 0 if layout == "right" else fade)
    if fg.height < H:
        vm = Image.new("L", fg.size, 255)
        d = ImageDraw.Draw(vm)
        f = round(fg.height * 0.08)
        for i in range(f):
            d.line([(0, i), (fg.width, i)], fill=round(255 * i / f))
            d.line([(0, fg.height - 1 - i), (fg.width, fg.height - 1 - i)], fill=round(255 * i / f))
        mask = ImageChops.darker(mask, vm)
    canvas.paste(fg, (x, y), mask)
    return canvas


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.webp"):
        old.unlink()
    crops = json.loads((HERE / "crops.json").read_text())
    crops.pop("_doc", None)

    manifest = {}
    cropped = {}
    for key, spec in crops.items():
        folder, stem = key.split("/")
        src = (ASSETS / "images" / folder / f"{stem}.jpg")
        if folder == "videos":
            src = ASSETS / "videos" / f"{stem}.jpg"
        im = Image.open(src).convert("RGB")
        x0, y0, x1, y1 = spec["box"]
        im = im.crop((round(im.width * x0 / 100), round(im.height * y0 / 100),
                      round(im.width * x1 / 100), round(im.height * y1 / 100)))
        mid = media_id(stem)
        cropped[mid] = im  # composites use the tight crop
        if im.width > im.height * 1.02:
            im = pad_to_portrait(im)
        entry = export(im, mid)
        entry["focus"] = spec.get("focus", [50, 50])
        entry["collection"] = folder
        manifest[mid] = entry

    for cid, (layout, ids, size) in COMPOSITES.items():
        im = composite(layout, [cropped[i] for i in ids], size)
        entry = export(im, cid, [1200, 2400])
        entry["focus"] = [50, 50]
        entry["collection"] = "composite"
        manifest[cid] = entry

    vids = OUT / "video"
    vids.mkdir(exist_ok=True)
    for mp4 in (ASSETS / "videos").glob("*.mp4"):
        shutil.copy2(mp4, vids / f"{media_id(mp4.stem)}.mp4")

    lines = [
        "// Generated by scripts/process_images.py. Do not edit by hand.",
        "export type MediaEntry = { src: string; srcSet: string; width: number; height: number; blur: string; focus: number[]; collection: string };",
        "export const media = {",
    ]
    for mid, e in manifest.items():
        lines.append(f"  {json.dumps(mid)}: {json.dumps(e)},")
    lines += ["} satisfies Record<string, MediaEntry>;", "", "export type MediaId = keyof typeof media;", ""]
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text("\n".join(lines), encoding="utf-8")
    print(f"{len(manifest)} media entries, {len(list(OUT.glob('*.webp')))} webp files")


if __name__ == "__main__":
    main()
