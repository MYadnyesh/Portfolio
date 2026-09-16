const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function convertSvgToPng(svgPath, pngPath, width, height) {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    await sharp(svgBuffer)
      .resize(width, height)
      .png()
      .toFile(pngPath);
    console.log(`✅ Converted ${path.basename(svgPath)} → ${path.basename(pngPath)} (${width}x${height})`);
  } catch (err) {
    console.error(`❌ Failed to convert ${svgPath}:`, err.message);
  }
}

async function main() {
  // Convert OG image (1200x630)
  await convertSvgToPng(
    path.join(imagesDir, 'og-image.svg'),
    path.join(imagesDir, 'og-image.png'),
    1200, 630
  );

  // Convert apple touch icon (180x180)
  await convertSvgToPng(
    path.join(imagesDir, 'apple-touch-icon.svg'),
    path.join(imagesDir, 'apple-touch-icon.png'),
    180, 180
  );

  // Convert manifest icons
  await convertSvgToPng(
    path.join(imagesDir, 'icon-192.svg'),
    path.join(imagesDir, 'icon-192.png'),
    192, 192
  );

  await convertSvgToPng(
    path.join(imagesDir, 'icon-512.svg'),
    path.join(imagesDir, 'icon-512.png'),
    512, 512
  );

  // Create favicon.ico (32x32)
  await convertSvgToPng(
    path.join(imagesDir, 'apple-touch-icon.svg'),
    path.join(imagesDir, 'favicon.ico'),
    32, 32
  );

  console.log('\n✅ All images converted successfully!');
}

main().catch(console.error);