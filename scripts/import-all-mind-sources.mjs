/**
 * Import ALL Mind Sources to Supabase
 *
 * Scans outputs/minds/ for all minds with sources/ directory
 * and imports them to the database
 *
 * Usage: node app/scripts/import-all-mind-sources.mjs [--dry-run]
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Content type mapping
const getContentType = (relativePath, filename) => {
  const lowerPath = relativePath.toLowerCase();
  const lowerName = filename.toLowerCase();

  if (lowerPath.includes('cursos/')) {
    if (lowerName.includes('q&a') || lowerName.includes('qa')) return 'course_qa';
    if (lowerName.includes('módulos') || lowerName.includes('modulos') || lowerName.includes('aulas')) return 'course_lesson';
    if (lowerName.includes('glossário') || lowerName.includes('glossario')) return 'resource_guide';
    if (lowerName.includes('resumo')) return 'course_outline';
    if (lowerName.includes('material')) return 'resource_reading';
    return 'course_module';
  }

  if (lowerPath.includes('newsletter/')) return 'newsletter';
  if (lowerPath.includes('podcast/')) return 'podcast_episode';
  if (lowerPath.includes('videos/')) return 'video_transcript';
  if (lowerPath.includes('interviews/')) return 'interview';
  if (lowerPath.includes('articles/')) return 'article';
  if (lowerPath.includes('self-analysis/') || lowerPath.includes('self_analysis/')) return 'essay';
  if (lowerName.includes('profile') && lowerName.endsWith('.json')) return 'other';

  return 'other';
};

const generateSlug = (filename, parentDir) => {
  const base = filename
    .replace(/\.(md|yaml|json|srt|txt)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  const prefix = parentDir
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 20);

  return prefix ? `${prefix}-${base}` : base;
};

const generateTitle = (filename) => {
  return filename
    .replace(/\.(md|yaml|json|srt|txt)$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200);
};

const readFileContent = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
};

const getCategoryFromPath = (relativePath) => {
  const parts = relativePath.split('/');
  return parts[0] || 'other';
};

const getSourceFiles = (dir, baseDir = dir) => {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      if (/\.(md|yaml|json|srt|txt)$/i.test(entry.name)) {
        if (entry.name.startsWith('.') || entry.name.startsWith('!')) continue;
        if (entry.name === 'sources_master.yaml') continue;
        if (entry.name.includes('inventory')) continue;

        const relativePath = path.relative(baseDir, fullPath);
        const parentDir = path.dirname(relativePath).split('/').pop() || '';

        files.push({ fullPath, relativePath, filename: entry.name, parentDir });
      }
    }
  }

  return files;
};

async function importMindSources(mindSlug, dryRun = false) {
  // Get mind from database
  const { data: mind, error: mindError } = await supabase
    .from('minds')
    .select('id, slug, name')
    .eq('slug', mindSlug)
    .is('deleted_at', null)
    .single();

  if (mindError || !mind) {
    return { slug: mindSlug, status: 'not_in_db', imported: 0, skipped: 0, errors: 0 };
  }

  // Get or create content_project
  let { data: project } = await supabase
    .from('content_projects')
    .select('id, slug')
    .eq('persona_mind_id', mind.id)
    .eq('project_type', 'mind_sources')
    .maybeSingle();

  if (!project && !dryRun) {
    const { data: newProject, error: createError } = await supabase
      .from('content_projects')
      .insert({
        persona_mind_id: mind.id,
        project_type: 'mind_sources',
        slug: `mind-sources-${mindSlug}`,
        name: `${mind.name} - Original Sources`,
        status: 'completed',
      })
      .select('id, slug')
      .single();

    if (createError) {
      return { slug: mindSlug, status: 'project_error', imported: 0, skipped: 0, errors: 1 };
    }
    project = newProject;
  }

  if (!project) {
    project = { id: 'dry-run-id', slug: `mind-sources-${mindSlug}` };
  }

  // Get source files
  const sourcesDir = path.resolve(__dirname, '../../outputs/minds', mindSlug, 'sources');
  if (!fs.existsSync(sourcesDir)) {
    return { slug: mindSlug, status: 'no_sources_dir', imported: 0, skipped: 0, errors: 0 };
  }

  const allFiles = getSourceFiles(sourcesDir);
  if (allFiles.length === 0) {
    return { slug: mindSlug, status: 'empty_sources', imported: 0, skipped: 0, errors: 0 };
  }

  let imported = 0, skipped = 0, errors = 0;

  for (const file of allFiles) {
    const content = readFileContent(file.fullPath);
    if (!content) { errors++; continue; }

    const slug = generateSlug(file.filename, file.parentDir);
    const title = generateTitle(file.filename);
    const contentType = getContentType(file.relativePath, file.filename);
    const category = getCategoryFromPath(file.relativePath);

    if (dryRun) { imported++; continue; }

    // Check if exists
    const { data: existing } = await supabase
      .from('contents')
      .select('id')
      .eq('project_id', project.id)
      .eq('slug', slug)
      .maybeSingle();

    if (existing) { skipped++; continue; }

    // Insert
    const { error: insertError } = await supabase
      .from('contents')
      .insert({
        project_id: project.id,
        slug,
        title,
        content,
        content_type: contentType,
        ai_generated: false,
        status: 'published',
        metadata: {
          category,
          source_file: file.relativePath,
          source_type: 'original',
          imported_at: new Date().toISOString(),
          file_extension: path.extname(file.filename),
        },
      });

    if (insertError) { errors++; } else { imported++; }
  }

  return {
    slug: mindSlug,
    status: 'ok',
    imported,
    skipped,
    errors,
    total: allFiles.length
  };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧠 IMPORT ALL MIND SOURCES ${dryRun ? '(DRY RUN)' : ''}`);
  console.log(`${'='.repeat(60)}\n`);

  // Find all minds with sources directories
  const mindsDir = path.resolve(__dirname, '../../outputs/minds');
  const mindDirs = fs.readdirSync(mindsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .filter(d => fs.existsSync(path.join(mindsDir, d.name, 'sources')))
    .map(d => d.name)
    .sort();

  console.log(`📁 Found ${mindDirs.length} minds with sources/ directory\n`);

  const results = [];
  let totalImported = 0, totalSkipped = 0, totalErrors = 0;

  for (let i = 0; i < mindDirs.length; i++) {
    const slug = mindDirs[i];
    process.stdout.write(`[${i + 1}/${mindDirs.length}] ${slug}... `);

    const result = await importMindSources(slug, dryRun);
    results.push(result);

    totalImported += result.imported;
    totalSkipped += result.skipped;
    totalErrors += result.errors;

    if (result.status === 'ok') {
      console.log(`✅ +${result.imported} (skip: ${result.skipped}, err: ${result.errors})`);
    } else {
      console.log(`⚠️  ${result.status}`);
    }
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 FINAL SUMMARY`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Total Imported: ${totalImported}`);
  console.log(`⏭️  Total Skipped:  ${totalSkipped}`);
  console.log(`❌ Total Errors:   ${totalErrors}`);
  console.log(`📁 Minds processed: ${mindDirs.length}`);

  const notInDb = results.filter(r => r.status === 'not_in_db');
  if (notInDb.length > 0) {
    console.log(`\n⚠️  Minds not in database (${notInDb.length}):`);
    notInDb.forEach(r => console.log(`   - ${r.slug}`));
  }

  console.log(`${'='.repeat(60)}\n`);
}

main().catch(console.error);
