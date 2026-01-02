#!/usr/bin/env node
/**
 * Script: link-translations.mjs
 *
 * Links English articles to Portuguese versions via metadata.translation_id
 *
 * Usage:
 *   node scripts/link-translations.mjs
 *   node scripts/link-translations.mjs --dry-run
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Load .env.local
try {
  const envLocal = readFileSync('.env.local', 'utf-8');
  envLocal.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  });
} catch (e) {}

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const DRY_RUN = process.argv.includes('--dry-run');

async function main() {
  console.log('🔗 Link Translations');
  console.log('='.repeat(60));
  if (DRY_RUN) console.log('🔍 DRY-RUN MODE\n');

  // Get all PT articles
  const { data: ptArticles, error } = await supabase
    .from('contents')
    .select('id, slug, metadata')
    .eq('content_type', 'book_summary')
    .like('slug', '%_pt');

  if (error) {
    console.error('❌ Error fetching PT articles:', error.message);
    process.exit(1);
  }

  console.log(`📄 Found ${ptArticles.length} PT articles\n`);

  let updated = 0;
  let errors = 0;

  for (const ptArticle of ptArticles) {
    const enSlug = ptArticle.slug.replace('_pt', '');

    // Find English version
    const { data: enArticle } = await supabase
      .from('contents')
      .select('id, slug, metadata')
      .eq('slug', enSlug)
      .eq('content_type', 'book_summary')
      .single();

    if (!enArticle) {
      console.log(`⚠️  EN not found for: ${enSlug}`);
      continue;
    }

    // Update EN metadata with translation link
    const enMetadata = {
      ...enArticle.metadata,
      language: 'en',
      translation_id: ptArticle.id,
      translation_slug: ptArticle.slug
    };

    if (!DRY_RUN) {
      const { error: updateError } = await supabase
        .from('contents')
        .update({ metadata: enMetadata })
        .eq('id', enArticle.id);

      if (updateError) {
        console.log(`❌ Failed to update ${enSlug}: ${updateError.message}`);
        errors++;
        continue;
      }
    }

    console.log(`✓ Linked ${enSlug} -> ${ptArticle.slug}`);
    updated++;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Updated: ${updated}`);
  console.log(`❌ Errors: ${errors}`);
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
