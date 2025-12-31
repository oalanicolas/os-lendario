#!/usr/bin/env node
/**
 * Updates book author minds with avatar_url and short_bio
 * Data collected from Wikipedia and official sources
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Author data collected from research
const AUTHORS = [
  // === BATCH 1: Major Authors ===
  // Data will be populated from agent results
];

async function main() {
  console.log('Updating author minds with photos and bios...\n');

  let updated = 0;
  let failed = 0;

  for (const author of AUTHORS) {
    if (!author.avatar_url && !author.short_bio) {
      console.log(`⏭️  Skipping ${author.slug} - no data`);
      continue;
    }

    const updateData = {};
    if (author.avatar_url) updateData.avatar_url = author.avatar_url;
    if (author.short_bio) updateData.short_bio = author.short_bio;

    const { error } = await supabase
      .from('minds')
      .update(updateData)
      .eq('slug', author.slug);

    if (error) {
      console.error(`❌ ${author.slug}: ${error.message}`);
      failed++;
    } else {
      console.log(`✅ ${author.slug}`);
      updated++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${AUTHORS.length}`);
}

main().catch(console.error);
