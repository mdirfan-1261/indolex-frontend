
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ONLY services folder
const targetDir = path.join(
  process.cwd(),
  "public",
  "images",
  "services"
);

const extensions = [".jpg", ".jpeg"];

async function getImages(directory) {
  const entries = await fs.promises.readdir(directory, {
    withFileTypes: true,
  });

  let images = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      images = images.concat(await getImages(fullPath));
    } else if (
      extensions.includes(path.extname(entry.name).toLowerCase())
    ) {
      images.push(fullPath);
    }
  }

  return images;
}

async function optimizeImages() {
  if (!fs.existsSync(targetDir)) {
    throw new Error("Services images folder not found!");
  }

  const images = await getImages(targetDir);

  let originalTotal = 0;
  let optimizedTotal = 0;
  let success = 0;

  console.log(`Found ${images.length} service images.\n`);

  for (const imagePath of images) {
    try {
      const outputPath = imagePath.replace(/\.(jpg|jpeg)$/i, ".webp");

      const originalSize = (await fs.promises.stat(imagePath)).size;

      await sharp(imagePath)
        .rotate()
        .webp({
          quality: 82,
          effort: 5,
          smartSubsample: true,
        })
        .toFile(outputPath);

      const optimizedSize = (await fs.promises.stat(outputPath)).size;

      originalTotal += originalSize;
      optimizedTotal += optimizedSize;
      success++;

      const saved = (
        (1 - optimizedSize / originalSize) * 100
      ).toFixed(1);

      console.log(
        `${path.relative(targetDir, imagePath)} | ` +
        `${(originalSize / 1024).toFixed(1)} KB → ` +
        `${(optimizedSize / 1024).toFixed(1)} KB | Saved ${saved}%`
      );
    } catch (error) {
      console.error(`Failed: ${imagePath}`, error.message);
    }
  }

  console.log("\n========== SERVICES IMAGE SUMMARY ==========");
  console.log(`Successful: ${success}/${images.length}`);
  console.log(`Original: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP: ${(optimizedTotal / 1024 / 1024).toFixed(2)} MB`);

  if (originalTotal > 0) {
    console.log(
      `Saved: ${((1 - optimizedTotal / originalTotal) * 100).toFixed(1)}%`
    );
  }

  console.log("Original JPG images have NOT been deleted.");
}

optimizeImages().catch(console.error);
