const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const slug = process.argv[2];

if (!slug) {
  console.error("Please provide tour slug.");
  console.error("Example:");
  console.error("node scripts/prepare-tour-images.js five-stans-central-asia-tour");
  process.exit(1);
}

const rootDir = process.cwd();

const rawDir = path.join(rootDir, "raw-tour-images", slug);
const outputDir = path.join(
  rootDir,
  "public",
  "assets",
  "images",
  "tours",
  slug
);

const jsonOutputDir = path.join(rootDir, "tour-image-json");

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

function cleanFileName(name) {
  return name
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeAltText(fileName) {
  return cleanFileName(fileName)
    .replace(/^hero-?/, "")
    .replace(/^card-?/, "")
    .replace(/^gallery-?/, "")
    .replace(/^\d+-?/, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getImageFiles() {
  if (!(await fileExists(rawDir))) {
    throw new Error(`Raw image folder not found: ${rawDir}`);
  }

  const files = await fs.readdir(rawDir);

  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    })
    .sort((a, b) => a.localeCompare(b));
}

async function resizeImage(inputPath, outputPath, options) {
  await sharp(inputPath)
    .rotate()
    .resize(options)
    .jpeg({
      quality: 82,
      mozjpeg: true,
    })
    .toFile(outputPath);
}

async function main() {
  const files = await getImageFiles();

  if (!files.length) {
    throw new Error(`No images found in: ${rawDir}`);
  }

  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(jsonOutputDir, { recursive: true });

  const heroFile =
    files.find((file) => cleanFileName(file).startsWith("hero")) || files[0];

  const cardFile =
    files.find((file) => cleanFileName(file).startsWith("card")) ||
    files.find((file) => file !== heroFile) ||
    heroFile;

  const galleryFiles = files.filter(
    (file) => file !== heroFile && file !== cardFile
  );

  const finalGalleryFiles = galleryFiles.length ? galleryFiles : files;

  const heroOutputPath = path.join(outputDir, "hero.jpg");
  const cardOutputPath = path.join(outputDir, "card.jpg");

  await resizeImage(path.join(rawDir, heroFile), heroOutputPath, {
    width: 1920,
    height: 700,
    fit: "cover",
    position: "center",
  });

  await resizeImage(path.join(rawDir, cardFile), cardOutputPath, {
    width: 1200,
    height: 900,
    fit: "cover",
    position: "center",
  });

  const photos = [];

  for (let index = 0; index < finalGalleryFiles.length; index++) {
    const file = finalGalleryFiles[index];
    const number = String(index + 1).padStart(2, "0");
    const cleanName = cleanFileName(file).replace(/^gallery-?/, "");
    const outputFileName = `gallery-${number}-${cleanName}.jpg`;
    const outputPath = path.join(outputDir, outputFileName);

    await resizeImage(path.join(rawDir, file), outputPath, {
      width: 1600,
      withoutEnlargement: true,
    });

    photos.push({
      alt: makeAltText(file) || `Gallery image ${index + 1}`,
      image: `/assets/images/tours/${slug}/${outputFileName}`,
    });
  }

  const imageFields = {
    hero_image: `/assets/images/tours/${slug}/hero.jpg`,
    card_image: `/assets/images/tours/${slug}/card.jpg`,
    meta_image: `/assets/images/tours/${slug}/hero.jpg`,
    photos: [
      {
        title: "Photos",
        images: photos,
      },
    ],
  };

  const jsonPath = path.join(jsonOutputDir, `${slug}-image-fields.json`);

  await fs.writeFile(jsonPath, JSON.stringify(imageFields, null, 2), "utf8");

  console.log("");
  console.log("Tour images prepared successfully.");
  console.log("");
  console.log("Output folder:");
  console.log(`/public/assets/images/tours/${slug}/`);
  console.log("");
  console.log("JSON snippet:");
  console.log(`/tour-image-json/${slug}-image-fields.json`);
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("Image preparation failed:");
  console.error(error.message);
  console.error("");
  process.exit(1);
});