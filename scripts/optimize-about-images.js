const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const folder = path.join(process.cwd(), "public", "images", "about");

const images = [
  "about-hero.png",
  "about-resolution.jpeg",
];

(async () => {
  for (const filename of images) {
    const input = path.join(folder, filename);
    const output = path.join(
      folder,
      `${path.parse(filename).name}.webp`
    );

    if (!fs.existsSync(input)) {
      console.log(`SKIPPED: ${filename} not found`);
      continue;
    }

    await sharp(input)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(output);

    const before = fs.statSync(input).size;
    const after = fs.statSync(output).size;
    const saved = ((1 - after / before) * 100).toFixed(1);

    console.log(`${filename} -> ${path.basename(output)}`);
    console.log(`Before: ${(before / 1024).toFixed(1)} KB`);
    console.log(`After: ${(after / 1024).toFixed(1)} KB`);
    console.log(`Reduced: ${saved}%\n`);
  }
})();
