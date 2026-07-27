/**
 * Upload local `new frames/` PNGs to a public Supabase Storage bucket.
 * Usage: node --env-file=.env.local scripts/upload-hero-frames.mjs
 */
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "hero-frames";
const SOURCE_DIR = path.resolve("new frames");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`Source folder not found: ${SOURCE_DIR}`);
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const files = fs
  .readdirSync(SOURCE_DIR)
  .filter((f) => /^frame_\d+\.png$/i.test(f))
  .sort((a, b) => Number(a.match(/(\d+)/)[1]) - Number(b.match(/(\d+)/)[1]));

console.log(`Uploading ${files.length} frames → bucket "${BUCKET}"…`);

const { data: existing } = await supabase.storage.getBucket(BUCKET);
if (!existing) {
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: "10MB",
    allowedMimeTypes: ["image/png"],
  });
  if (error && !/already exists/i.test(error.message)) {
    console.error("createBucket failed:", error.message);
    process.exit(1);
  }
  console.log(`Created public bucket: ${BUCKET}`);
} else {
  console.log(`Bucket exists: ${BUCKET}`);
}

const CONCURRENCY = 4;
let uploaded = 0;
let failed = 0;

async function uploadOne(file) {
  const full = path.join(SOURCE_DIR, file);
  const body = fs.readFileSync(full);
  const { error } = await supabase.storage.from(BUCKET).upload(file, body, {
    contentType: "image/png",
    upsert: true,
    cacheControl: "31536000",
  });
  if (error) {
    failed += 1;
    console.error(`✗ ${file}: ${error.message}`);
    return;
  }
  uploaded += 1;
  if (uploaded % 20 === 0 || uploaded === files.length) {
    console.log(`… ${uploaded}/${files.length}`);
  }
}

for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY);
  await Promise.all(batch.map(uploadOne));
}

const base = `${url.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}`;
console.log("\nDone.");
console.log(`Uploaded: ${uploaded}  Failed: ${failed}`);
console.log(`\nPublic base URL:\n${base}`);
console.log(`\nAdd to .env.local and Vercel:\nNEXT_PUBLIC_HERO_FRAMES_BASE_URL=${base}`);

if (failed > 0) process.exit(1);
