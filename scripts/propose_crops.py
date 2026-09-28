"""Propose a crop box for every KK image: the photo area inside the Instagram frame.

Frame colour = median of the four corner patches. A row/column belongs to the photo
when enough of its pixels differ from that colour. Writes scripts/crops.proposed.json
and contact sheets (with the proposed box drawn) for visual review.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
IMAGES = ROOT / "kk-assets" / "images"
OUT = Path(__file__).resolve().parent
SHEETS = Path(sys.argv[1]) if len(sys.argv) > 1 else OUT / "sheets"


def corner_colour(im):
    w, h = im.size
    s = 40
    px = []
    for x0, y0 in [(0, 0), (w - s, 0), (0, h - s), (w - s, h - s)]:
        px += list(im.crop((x0, y0, x0 + s, y0 + s)).getdata())
    px.sort(key=lambda p: sum(p))
    return px[len(px) // 2]


def runs(flags, min_len):
    best, start = None, None
    for i, f in enumerate(flags + [False]):
        if f and start is None:
            start = i
        elif not f and start is not None:
            if i - start >= min_len and (best is None or i - start > best[1] - best[0]):
                best = (start, i)
            start = None
    return best


def propose(path):
    im = Image.open(path).convert("RGB")
    small = im.resize((im.width // 4, im.height // 4)).filter(ImageFilter.MedianFilter(3))
    w, h = small.size
    bg = corner_colour(small)
    data = small.load()

    def differs(p):
        return sum(abs(a - b) for a, b in zip(p, bg)) > 60

    mask = [[differs(data[x, y]) for x in range(w)] for y in range(h)]
    rows = [sum(r) / w > 0.55 for r in mask]
    r = runs(rows, h // 8)
    if not r:
        return None
    y0, y1 = r
    cols = [sum(mask[y][x] for y in range(y0, y1)) / (y1 - y0) > 0.55 for x in range(w)]
    c = runs(cols, w // 8)
    if not c:
        return None
    x0, x1 = c
    return [x0 * 4, y0 * 4, (x1 - x0) * 4, (y1 - y0) * 4]


def main():
    files = sorted(IMAGES.rglob("*.jpg"))
    result = {}
    for f in files:
        key = f"{f.parent.name}/{f.stem}"
        result[key] = propose(f)
    (OUT / "crops.proposed.json").write_text(json.dumps(result, indent=1))

    SHEETS.mkdir(parents=True, exist_ok=True)
    tw, th, cols = 300, 375, 4
    font = ImageFont.load_default(size=13)
    per = 12
    for n in range(0, len(files), per):
        batch = files[n:n + per]
        sheet = Image.new("RGB", (tw * cols, (th + 18) * 3), "white")
        d = ImageDraw.Draw(sheet)
        for i, f in enumerate(batch):
            im = Image.open(f).convert("RGB")
            sx, sy = tw / im.width, th / im.height
            thumb = im.resize((tw, th))
            ox, oy = (i % cols) * tw, (i // cols) * (th + 18)
            sheet.paste(thumb, (ox, oy + 18))
            box = result[f"{f.parent.name}/{f.stem}"]
            if box:
                x, y, bw, bh = box
                d.rectangle([ox + x * sx, oy + 18 + y * sy, ox + (x + bw) * sx, oy + 18 + (y + bh) * sy], outline="lime", width=3)
            d.text((ox + 4, oy + 2), f"{n + i}: {f.parent.name[:10]}/{f.stem[11:]}", fill="black", font=font)
        sheet.save(SHEETS / f"sheet_{n // per:02d}.jpg", quality=85)
    print(len(files), "images;", sum(1 for v in result.values() if v is None), "without proposal")


if __name__ == "__main__":
    main()
