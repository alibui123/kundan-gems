/**
 * Compress `new frames/*.png` → `public/hero-frames/*.webp` for git + Vercel.
 * Keeps quality high enough for the hero, size small enough to push.
 *
 * Usage: node scripts/compress-hero-frames.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const SRC = path.resolve("new frames");
const DEST = path.resolve("public/hero-frames");
const WIDTH = 1280;
const QUALITY = 72;

if (!fs.existsSync(SRC)) {
  console.error(`Missing source folder: ${SRC}`);
  process.exit(1);
}

fs.mkdirSync(DEST, { recursive: true });

const pngs = fs
  .readdirSync(SRC)
  .filter((f) => /^frame_\d+\.png$/i.test(f))
  .sort((a, b) => Number(a.match(/(\d+)/)[1]) - Number(b.match(/(\d+)/)[1]));

console.log(`Compressing ${pngs.length} frames → ${DEST}`);

let done = 0;
const CONCURRENCY = 4;

async function one(file) {
  const outName = file.replace(/\.png$/i, ".webp");
  const outPath = path.join(DEST, outName);
  await sharp(path.join(SRC, file))
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(outPath);
  done += 1;
  if (done % 25 === 0 || done === pngs.length) {
    console.log(`… ${done}/${pngs.length}`);
  }
  return outName;
}

const webps = [];
for (let i = 0; i < pngs.length; i += CONCURRENCY) {
  const batch = pngs.slice(i, i + CONCURRENCY);
  const names = await Promise.all(batch.map(one));
  webps.push(...names);
}

webps.sort((a, b) => Number(a.match(/(\d+)/)[1]) - Number(b.match(/(\d+)/)[1]));

const heroFramesPath = path.resolve("src/lib/heroFrames.ts");
const out = `/** Hero WebP sequence from public/hero-frames (same-origin on local + Vercel). */
export const HERO_FRAME_DIR = "/hero-frames";

export const HERO_FRAME_FILES = ${JSON.stringify(webps, null, 2)} as const;

/** First N frames play on load (no scroll). */
export const HERO_AUTOPLAY_COUNT = 72;

export const HERO_FRAME_COUNT = HERO_FRAME_FILES.length;

/** Index where scroll scrub begins (last autoplay frame). */
export const HERO_SCROLL_START = Math.min(HERO_AUTOPLAY_COUNT, HERO_FRAME_COUNT) - 1;

export const HERO_SCROLL_END = HERO_FRAME_COUNT - 1;

export function getHeroFrameSrc(index: number) {
  const file = HERO_FRAME_FILES[index];
  return HERO_FRAME_DIR + "/" + file;
}
`;

fs.writeFileSync(heroFramesPath, out);

const total = webps.reduce(
  (sum, f) => sum + fs.statSync(path.join(DEST, f)).size,
  0
);
console.log(
  `\nDone. ${webps.length} webp files, ${(total / 1e6).toFixed(1)} MB total`
);
console.log("Updated src/lib/heroFrames.ts → /hero-frames");
