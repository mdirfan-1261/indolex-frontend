const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const folder = path.join(
  process.cwd(),
  "public/images/services/domains"
);

const images = [
  "rent-lease-recovery.jpg",
  "commercial-advances.jpg",
  "disputed-part-acknowledged.jpg",
];

(async () => {
  for (const filename of images) {
    const input = path.join(folder, filename);
    const output = path.join(
      folder,
      `${path.parse(filename).name}.webp`
    );

    if (!fs.existsSync(input)) {
      console.log(`NOT FOUND: ${filename}`);
      continue;
    }

    await sharp(input)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(output);

    const before = fs.statSync(input).size;
    const after = fs.statSync(output).size;

    console.log(`\n${filename}`);
    console.log(`Original: ${(before / 1024).toFixed(1)} KB`);
    console.log(`WebP: ${(after / 1024).toFixed(1)} KB`);
    console.log(`Saved: ${((1 - after / before) * 100).toFixed(1)}%`);
  }
})();
