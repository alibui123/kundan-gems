import fs from "fs";
import path from "path";

const src = path.resolve("new frames");
const dest = path.resolve("public/new-frames");

if (!fs.existsSync(dest)) {
  try {
    fs.symlinkSync(src, dest, "junction");
    console.log("Created junction public/new-frames -> new frames");
  } catch (e) {
    console.warn("Junction failed, copying…", e.message);
    fs.mkdirSync(dest, { recursive: true });
    for (const f of fs.readdirSync(src)) {
      fs.copyFileSync(path.join(src, f), path.join(dest, f));
    }
    console.log("Copied frames to public/new-frames");
  }
} else {
  console.log("public/new-frames already exists");
}

const files = fs
  .readdirSync(src)
  .filter((f) => /^frame_\d+\.png$/i.test(f))
  .sort((a, b) => {
    const na = Number(a.match(/(\d+)/)[1]);
    const nb = Number(b.match(/(\d+)/)[1]);
    return na - nb;
  });

const out = `/** Hero PNG sequence from public/new-frames (synced from /new frames). */
export const HERO_FRAME_DIR = "/new-frames";

export const HERO_FRAME_FILES = ${JSON.stringify(files, null, 2)} as const;

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

fs.writeFileSync(path.resolve("src/lib/heroFrames.ts"), out);
console.log(`Wrote heroFrames.ts — ${files.length} frames, autoplay ${Math.min(72, files.length)}`);
