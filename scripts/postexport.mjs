// Next 16 static export writes per-segment prefetch payloads as nested folders
// (e.g. __next.collections/$d$slug/__PAGE__.txt) while the client router requests
// the flattened name (__next.collections.$d$slug.__PAGE__.txt). Write flattened
// copies next to them so prefetches resolve on any static host.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));
let count = 0;

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const f of files(p)) {
        const flat = join(dir, `${name}.${relative(p, f).split(sep).join(".")}`);
        if (!existsSync(flat)) {
          copyFileSync(f, flat);
          count++;
        }
      }
    } else {
      walk(p);
    }
  }
}

walk(OUT);
console.log(`postexport: wrote ${count} flattened segment files`);
