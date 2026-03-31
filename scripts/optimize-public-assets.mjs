import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { optimize as optimizeSvg } from "svgo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const ARCHIVE_DATE = "2026-04-01";
const ARCHIVE_DIR = path.join(
  ROOT_DIR,
  "asset-archive",
  "public-unused",
  ARCHIVE_DATE,
);

const CODE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".scss",
  ".sass",
  ".html",
  ".txt",
]);

const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const VECTOR_EXTENSIONS = new Set([".svg"]);
const ASSET_EXTENSIONS = new Set([
  ...RASTER_EXTENSIONS,
  ...VECTOR_EXTENSIONS,
  ".mp4",
  ".mov",
  ".webm",
  ".avif",
  ".gif",
]);

const HOW_IT_WORKS_SCREENSHOTS = new Set([
  "create_chatbot.png",
  "data_sources.png",
  "customise_apperances.png",
  "embeded_web.png",
  "create_meta_app.png",
  "get_phone_id.png",
  "generate_access_token.png",
  "embeed.png",
  "create_chatbot_voice.png",
  "voice_config.png",
  "set_up_voice.png",
  "deploy_voice.png",
]);

const FULL_WIDTH_SCREENSHOTS = new Set([
  "helpdesk-showcase-reference.png",
  "reporting.png",
  "take_action.png",
  "compare_model.png",
  "escalation.png",
]);

const ARCHIVE_CANDIDATES = new Set([
  "WhatsApp Video 2026-03-28 at 11.42.48 PM.mp4",
  "reporting-v2-cropped.png",
  "reporting-v2.png",
  "bot.jpeg",
  "code-snippet.png",
  "images/crisp/hero-landscape.png",
  "images/crisp/dashboard-mockup.png",
  "images/crisp/ai-workflow.png",
  "images/crisp/omnichannel-hub.png",
  "broadcast-1.webp",
  "broadcast-2.webp",
  "broadcast-3.webp",
  "next.svg",
  "globe.svg",
  "google.svg",
  "default-avatar.svg",
  "icons/archive.svg",
  "icons/check_circle.svg",
  "icons/mark_chat_unread.svg",
  "icons/reply.svg",
  "icons/schedule.svg",
  "icons/smart_toy.svg",
  "icons/star.svg",
  "why-verly/why-verly-promo.mp4",
]);

const DYNAMIC_REVIEWED_ASSETS = new Set([
  "icons/electric_bolt.svg",
  "icons/priority_high.svg",
  "icons/person.svg",
  "icons/schedule_send.svg",
  "icons/more_horiz.svg",
  "icons/check.svg",
  "icons/inventory_2.svg",
]);

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toPosixRelative(filePath) {
  return path.relative(PUBLIC_DIR, filePath).split(path.sep).join("/");
}

function unique(values) {
  return [...new Set(values)];
}

async function collectCodeFiles(dir) {
  const files = await walkFiles(dir);
  return files.filter((filePath) => {
    const relative = path.relative(ROOT_DIR, filePath).split(path.sep).join("/");
    if (
      relative.startsWith("public/") ||
      relative.startsWith("node_modules/") ||
      relative.startsWith(".next/") ||
      relative.startsWith("asset-archive/") ||
      relative.startsWith("scripts/")
    ) {
      return false;
    }
    return CODE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
  });
}

async function loadCodeIndex() {
  const codeFiles = await collectCodeFiles(ROOT_DIR);
  const entries = [];
  for (const filePath of codeFiles) {
    const content = await fs.readFile(filePath, "utf8");
    entries.push({
      relative: path.relative(ROOT_DIR, filePath).split(path.sep).join("/"),
      content,
    });
  }
  return entries;
}

function collectReferences(relativePath, codeIndex) {
  const basename = path.basename(relativePath);
  const encodedRelative = `/${relativePath
    .split("/")
    .map((segment, index) =>
      index === 0 ? segment : encodeURIComponent(segment),
    )
    .join("/")}`;
  const exactPath = `/${relativePath}`;
  const matches = [];

  for (const entry of codeIndex) {
    if (
      entry.content.includes(exactPath) ||
      entry.content.includes(encodedRelative) ||
      entry.content.includes(basename)
    ) {
      matches.push(entry.relative);
    }
  }

  return unique(matches);
}

function classifyAsset(relativePath, references) {
  if (DYNAMIC_REVIEWED_ASSETS.has(relativePath)) {
    return "dynamic-reviewed";
  }
  if (references.length > 0) {
    return "used";
  }
  return "unused";
}

function maxWidthFor(relativePath) {
  if (relativePath.startsWith("images/features/")) {
    return 1600;
  }
  if (relativePath.startsWith("images/blog/")) {
    return 1024;
  }
  if (relativePath.startsWith("why-verly/")) {
    return 1800;
  }
  if (HOW_IT_WORKS_SCREENSHOTS.has(relativePath)) {
    return 1600;
  }
  if (FULL_WIDTH_SCREENSHOTS.has(relativePath)) {
    return 1800;
  }
  if (relativePath === "love_wall.png") {
    return 1024;
  }
  return 1800;
}

async function ensureDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function optimizeRaster(filePath, relativePath) {
  const originalBuffer = await fs.readFile(filePath);
  const metadata = await sharp(originalBuffer).metadata();
  const widthCap = maxWidthFor(relativePath);
  const shouldResize =
    typeof metadata.width === "number" && metadata.width > widthCap;

  const base = sharp(originalBuffer, { animated: false }).rotate();
  const transformed = shouldResize
    ? base.resize({ width: widthCap, withoutEnlargement: true })
    : base;
  const extension = path.extname(relativePath).toLowerCase();

  let outputBuffer = originalBuffer;

  if (extension === ".png") {
    const fullColorBuffer = await transformed
      .clone()
      .png({ compressionLevel: 9, effort: 10, palette: false })
      .toBuffer();
    outputBuffer = fullColorBuffer;

    const paletteBuffer = await transformed
      .clone()
      .png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
      .toBuffer();
    if (paletteBuffer.length < fullColorBuffer.length * 0.85) {
      outputBuffer = paletteBuffer;
    }
  } else if (extension === ".jpg" || extension === ".jpeg") {
    outputBuffer = await transformed
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
  } else if (extension === ".webp") {
    outputBuffer = await transformed.webp({ quality: 80, effort: 6 }).toBuffer();
  }

  const shouldWrite =
    shouldResize || outputBuffer.length < originalBuffer.length * 0.99;

  if (shouldWrite) {
    await fs.writeFile(filePath, outputBuffer);
  }

  return {
    beforeSize: originalBuffer.length,
    afterSize: shouldWrite ? outputBuffer.length : originalBuffer.length,
    resized: shouldResize,
    rewritten: shouldWrite,
  };
}

async function optimizeVector(filePath) {
  const original = await fs.readFile(filePath, "utf8");
  const optimized = optimizeSvg(original, {
    multipass: true,
    path: filePath,
  });

  if ("data" in optimized && optimized.data.length < original.length) {
    await fs.writeFile(filePath, optimized.data, "utf8");
    return {
      beforeSize: Buffer.byteLength(original),
      afterSize: Buffer.byteLength(optimized.data),
      rewritten: true,
    };
  }

  return {
    beforeSize: Buffer.byteLength(original),
    afterSize: Buffer.byteLength(original),
    rewritten: false,
  };
}

async function archiveAsset(relativePath, reason, manifestEntries) {
  const sourcePath = path.join(PUBLIC_DIR, relativePath);
  if (!(await exists(sourcePath))) {
    return false;
  }

  const archivePath = path.join(ARCHIVE_DIR, relativePath);
  await ensureDirectory(archivePath);
  await fs.rename(sourcePath, archivePath);
  manifestEntries.push({
    originalPath: `/${relativePath}`,
    archivedPath: path.relative(ROOT_DIR, archivePath).split(path.sep).join("/"),
    reason,
  });
  return true;
}

function archiveReason(relativePath) {
  if (relativePath.endsWith(".mp4")) {
    return "Replaced by optimized WebM asset.";
  }
  return "Unused after static search and manual-reviewed archive allowlist.";
}

async function removeEmptyDirectories(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    await removeEmptyDirectories(fullPath);
  }

  const remaining = await fs.readdir(dir);
  if (dir !== PUBLIC_DIR && remaining.length === 0) {
    await fs.rmdir(dir);
  }
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

async function main() {
  await fs.mkdir(ARCHIVE_DIR, { recursive: true });

  const codeIndex = await loadCodeIndex();
  const publicFiles = await walkFiles(PUBLIC_DIR);
  const assetFiles = publicFiles.filter((filePath) =>
    ASSET_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  );

  const assetReport = [];
  for (const filePath of assetFiles) {
    const relativePath = toPosixRelative(filePath);
    const references = collectReferences(relativePath, codeIndex);
    const classification = classifyAsset(relativePath, references);
    assetReport.push({
      relativePath,
      filePath,
      references,
      classification,
      ext: path.extname(relativePath).toLowerCase(),
      size: (await fs.stat(filePath)).size,
    });
  }

  const manifestEntries = [];
  for (const asset of assetReport) {
    if (!ARCHIVE_CANDIDATES.has(asset.relativePath)) {
      continue;
    }
    if (asset.classification !== "unused") {
      continue;
    }
    await archiveAsset(
      asset.relativePath,
      archiveReason(asset.relativePath),
      manifestEntries,
    );
  }

  const shippedAssets = (await walkFiles(PUBLIC_DIR))
    .filter((filePath) => ASSET_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
    .map((filePath) => ({
      filePath,
      relativePath: toPosixRelative(filePath),
      ext: path.extname(filePath).toLowerCase(),
    }));

  const optimizationResults = [];
  for (const asset of shippedAssets) {
    if (RASTER_EXTENSIONS.has(asset.ext)) {
      const result = await optimizeRaster(asset.filePath, asset.relativePath);
      optimizationResults.push({ relativePath: asset.relativePath, ...result });
      continue;
    }

    if (VECTOR_EXTENSIONS.has(asset.ext)) {
      const result = await optimizeVector(asset.filePath);
      optimizationResults.push({ relativePath: asset.relativePath, ...result });
    }
  }

  await removeEmptyDirectories(PUBLIC_DIR);

  const summary = {
    archiveDate: ARCHIVE_DATE,
    archivedAssets: manifestEntries,
    optimizedAssets: optimizationResults
      .filter((entry) => entry.beforeSize !== entry.afterSize)
      .sort((a, b) => b.beforeSize - b.afterSize)
      .map((entry) => ({
        path: `/${entry.relativePath}`,
        beforeSize: entry.beforeSize,
        afterSize: entry.afterSize,
        savedBytes: entry.beforeSize - entry.afterSize,
      })),
  };

  await fs.writeFile(
    path.join(ARCHIVE_DIR, "manifest.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
    "utf8",
  );

  const totalBefore = optimizationResults.reduce(
    (sum, entry) => sum + entry.beforeSize,
    0,
  );
  const totalAfter = optimizationResults.reduce(
    (sum, entry) => sum + entry.afterSize,
    0,
  );

  console.log("Asset optimization complete.");
  console.log(`Archived assets: ${manifestEntries.length}`);
  console.log(`Optimized assets: ${optimizationResults.length}`);
  console.log(`Raster/SVG size delta: ${formatKb(totalBefore)} -> ${formatKb(totalAfter)}`);

  const biggestSavings = optimizationResults
    .filter((entry) => entry.beforeSize > entry.afterSize)
    .sort((a, b) => b.beforeSize - b.afterSize)
    .slice(0, 12);

  if (biggestSavings.length > 0) {
    console.log("Top savings:");
    for (const entry of biggestSavings) {
      console.log(
        `${entry.relativePath}: ${formatKb(entry.beforeSize)} -> ${formatKb(entry.afterSize)}`,
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
