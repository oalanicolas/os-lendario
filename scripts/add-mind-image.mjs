#!/usr/bin/env node

/**
 * Add Mind Profile Image
 *
 * Usage: node app/scripts/add-mind-image.mjs <slug> <path-to-image>
 *
 * Example:
 *   node app/scripts/add-mind-image.mjs alex_hormozi ~/Downloads/alex.jpg
 */

import { copyFileSync, existsSync } from 'fs';
import { resolve, extname } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const slug = process.argv[2];
const imagePath = process.argv[3];

if (!slug || !imagePath) {
  console.error('Usage: node add-mind-image.mjs <slug> <image-path>');
  console.error('Example: node add-mind-image.mjs alex_hormozi ~/Downloads/photo.jpg');
  process.exit(1);
}

// Validate inputs
if (!existsSync(imagePath)) {
  console.error(`Error: Image file not found: ${imagePath}`);
  process.exit(1);
}

const OUTPUT_DIR = './public/minds-profile-images';
const outputPath = `${OUTPUT_DIR}/${slug}.jpg`;

// Copy image
try {
  copyFileSync(imagePath, outputPath);
  console.log(`✓ Copied image to: ${outputPath}`);
} catch (error) {
  console.error(`Error copying file: ${error.message}`);
  process.exit(1);
}

// Update MINDS_WITH_AVATAR in useMinds.ts
const hooksPath = './app/hooks/useMinds.ts';
let content = readFileSync(hooksPath, 'utf-8');

// Check if slug already in set
if (content.includes(`'${slug}'`)) {
  console.log(`✓ Slug '${slug}' already in MINDS_WITH_AVATAR`);
} else {
  // Add to set (find the last entry and add after it)
  const match = content.match(/const MINDS_WITH_AVATAR = new Set\(\[[\s\S]*?\]\);/);
  if (match) {
    const set = match[0];
    // Add slug before closing bracket
    const updated = set.replace(/\]\);$/, `  '${slug}',\n]\);`);
    content = content.replace(set, updated);

    writeFileSync(hooksPath, content);
    console.log(`✓ Added '${slug}' to MINDS_WITH_AVATAR`);
  }
}

console.log('\n✓ Image added successfully!');
console.log('Next steps:');
console.log(`  1. npm run dev       (start development server)`);
console.log(`  2. Check gallery to verify image appears`);
