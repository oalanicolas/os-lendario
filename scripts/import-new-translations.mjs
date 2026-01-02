#!/usr/bin/env node
/**
 * Script: import-new-translations.mjs
 *
 * Importa traduções que ainda não existem no banco.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

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

const TEMP_DIR = 'scripts/temp';

function extractTitleFromMarkdown(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

async function main() {
  console.log('📥 Import New Translations');
  console.log('='.repeat(60));

  // Get project ID
  const { data: project } = await supabase
    .from('content_projects')
    .select('id')
    .eq('slug', 'biblioteca')
    .single();

  // Find all _pt.md files
  const ptFiles = readdirSync(TEMP_DIR)
    .filter(f => f.endsWith('_pt.md'));

  console.log(`📄 Found ${ptFiles.length} PT files\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const ptFile of ptFiles) {
    const ptSlug = ptFile.replace('.md', '');
    const enSlug = ptSlug.replace('_pt', '');

    // Check if PT already exists in DB
    const { data: existingPt } = await supabase
      .from('contents')
      .select('id')
      .eq('slug', ptSlug)
      .single();

    if (existingPt) {
      continue; // Already exists
    }

    // Find EN record
    const { data: enRecord } = await supabase
      .from('contents')
      .select('id, slug, title, metadata, project_id, image_url')
      .eq('slug', enSlug)
      .eq('content_type', 'book_summary')
      .single();

    if (!enRecord) {
      console.log(`⚠️  EN not found: ${enSlug}`);
      skipped++;
      continue;
    }

    // Read PT content
    const ptPath = join(TEMP_DIR, ptFile);
    const ptContent = readFileSync(ptPath, 'utf-8');
    const ptTitle = extractTitleFromMarkdown(ptContent) || enRecord.title;

    // Create PT record
    const ptMetadata = {
      ...enRecord.metadata,
      language: 'pt',
      translated_from: enRecord.id,
      translated_at: new Date().toISOString()
    };
    delete ptMetadata.needs_translation;

    try {
      const { data: newPt, error } = await supabase
        .from('contents')
        .insert({
          slug: ptSlug,
          title: ptTitle,
          content_type: 'book_summary',
          project_id: enRecord.project_id,
          status: 'published',
          content: ptContent,
          image_url: enRecord.image_url,
          ai_generated: true,
          metadata: ptMetadata
        })
        .select('id')
        .single();

      if (error) throw error;

      // Update EN with translation link
      const enMetadata = {
        ...enRecord.metadata,
        language: 'en',
        translation_id: newPt.id,
        translation_slug: ptSlug
      };

      await supabase
        .from('contents')
        .update({ metadata: enMetadata })
        .eq('id', enRecord.id);

      // Copy author links
      const { data: authorLinks } = await supabase
        .from('content_minds')
        .select('mind_id, role')
        .eq('content_id', enRecord.id);

      if (authorLinks?.length > 0) {
        await supabase
          .from('content_minds')
          .insert(authorLinks.map(link => ({
            content_id: newPt.id,
            mind_id: link.mind_id,
            role: link.role
          })));
      }

      console.log(`✓ Created: ${ptSlug}`);
      created++;
    } catch (err) {
      console.log(`❌ Error ${ptSlug}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Created: ${created}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
}

main().catch(console.error);
