#!/usr/bin/env node
/**
 * Script: import-translations.mjs
 *
 * Importa traduções para o banco de dados:
 * 1. Cria novo registro em português (pai)
 * 2. Atualiza registro em inglês com parent_id apontando para o português
 *
 * Usage:
 *   node scripts/import-translations.mjs              # Processa todos
 *   node scripts/import-translations.mjs --dry-run    # Simula sem inserir
 *   node scripts/import-translations.mjs --limit=5    # Limita a N arquivos
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';

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

// CLI args
const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = parseInt(process.argv.find(a => a.startsWith('--limit='))?.split('=')[1] || '0');

const TEMP_DIR = 'scripts/temp';

// ============================================================================
// HELPERS
// ============================================================================

function extractTitleFromMarkdown(content) {
  // Extrai o título do primeiro heading H1
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('📥 Import Translations to Database');
  console.log('='.repeat(60));
  if (DRY_RUN) console.log('🔍 DRY-RUN MODE\n');

  // Get project ID for biblioteca
  const { data: project } = await supabase
    .from('content_projects')
    .select('id')
    .eq('slug', 'biblioteca')
    .single();

  if (!project) {
    console.error('❌ Project "biblioteca" not found');
    process.exit(1);
  }
  console.log(`✓ Project biblioteca: ${project.id}\n`);

  // Find all translated files (*_pt.md)
  const files = readdirSync(TEMP_DIR)
    .filter(f => f.endsWith('_pt.md'))
    .map(f => ({
      ptFile: f,
      slug: f.replace('_pt.md', ''),
      enFile: f.replace('_pt.md', '.md')
    }));

  console.log(`📄 Found ${files.length} translated files\n`);

  let toProcess = files;
  if (LIMIT > 0) {
    toProcess = files.slice(0, LIMIT);
    console.log(`⚠️  Limited to ${LIMIT} files\n`);
  }

  const stats = {
    processed: 0,
    ptCreated: 0,
    enUpdated: 0,
    skipped: 0,
    errors: []
  };

  for (const file of toProcess) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📄 ${file.slug}`);

    // Read Portuguese content
    const ptPath = join(TEMP_DIR, file.ptFile);
    if (!existsSync(ptPath)) {
      console.log(`   ⚠️  PT file not found: ${file.ptFile}`);
      stats.skipped++;
      continue;
    }
    const ptContent = readFileSync(ptPath, 'utf-8');
    const ptTitle = extractTitleFromMarkdown(ptContent) || file.slug;

    // Find existing English record
    const { data: enRecord, error: findError } = await supabase
      .from('contents')
      .select('id, slug, title, metadata, project_id')
      .eq('slug', file.slug)
      .eq('content_type', 'book_summary')
      .single();

    if (findError || !enRecord) {
      console.log(`   ⚠️  EN record not found for slug: ${file.slug}`);
      stats.skipped++;
      continue;
    }

    console.log(`   ✓ Found EN record: ${enRecord.id}`);

    // Check if PT version already exists
    const ptSlug = `${file.slug}_pt`;
    const { data: existingPt } = await supabase
      .from('contents')
      .select('id')
      .eq('slug', ptSlug)
      .single();

    if (existingPt) {
      console.log(`   ⏭️  PT version already exists: ${ptSlug}`);
      stats.skipped++;
      continue;
    }

    stats.processed++;

    try {
      if (!DRY_RUN) {
        // 1. Create Portuguese record (parent)
        const ptMetadata = {
          ...enRecord.metadata,
          language: 'pt',
          translated_from: enRecord.id,
          translated_at: new Date().toISOString()
        };
        delete ptMetadata.needs_translation;

        const { data: newPt, error: ptError } = await supabase
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

        if (ptError) {
          throw new Error(`Failed to create PT: ${ptError.message}`);
        }
        console.log(`   ✓ Created PT record: ${newPt.id}`);
        stats.ptCreated++;

        // 2. Update English record with parent_id
        const enMetadata = {
          ...enRecord.metadata,
          language: 'en'
        };

        const { error: updateError } = await supabase
          .from('contents')
          .update({
            parent_id: newPt.id,
            metadata: enMetadata
          })
          .eq('id', enRecord.id);

        if (updateError) {
          throw new Error(`Failed to update EN: ${updateError.message}`);
        }
        console.log(`   ✓ Updated EN parent_id -> ${newPt.id}`);
        stats.enUpdated++;

        // 3. Copy author relationships to PT version
        const { data: authorLinks } = await supabase
          .from('content_minds')
          .select('mind_id, role')
          .eq('content_id', enRecord.id);

        if (authorLinks && authorLinks.length > 0) {
          await supabase
            .from('content_minds')
            .insert(authorLinks.map(link => ({
              content_id: newPt.id,
              mind_id: link.mind_id,
              role: link.role
            })));
          console.log(`   ✓ Copied ${authorLinks.length} author link(s)`);
        }

      } else {
        console.log(`   [DRY-RUN] Would create PT: ${ptSlug}`);
        console.log(`   [DRY-RUN] Would update EN parent_id`);
        stats.ptCreated++;
        stats.enUpdated++;
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      stats.errors.push({ slug: file.slug, error: error.message });
    }
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`   Files processed:    ${stats.processed}`);
  console.log(`   PT records created: ${stats.ptCreated}`);
  console.log(`   EN records updated: ${stats.enUpdated}`);
  console.log(`   Skipped:            ${stats.skipped}`);
  console.log(`   Errors:             ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    stats.errors.forEach(e => console.log(`   - ${e.slug}: ${e.error}`));
  }

  if (DRY_RUN) {
    console.log('\n🔍 Run without --dry-run to apply changes');
  } else {
    console.log('\n✅ DONE!');
  }
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
