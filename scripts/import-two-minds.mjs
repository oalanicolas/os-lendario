/**
 * Import sources for cadu_souza and roger_medke
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const getContentType = (relativePath, filename) => {
  const lowerPath = relativePath.toLowerCase();
  if (lowerPath.includes('cursos/')) return 'course_module';
  if (lowerPath.includes('newsletter/')) return 'newsletter';
  if (lowerPath.includes('podcast/')) return 'podcast_episode';
  if (lowerPath.includes('videos/')) return 'video_transcript';
  if (lowerPath.includes('articles/')) return 'article';
  if (lowerPath.includes('substack')) return 'blog_post';
  return 'other';
};

const generateSlug = (filename, parentDir) => {
  const base = filename
    .replace(/\.(md|yaml|json|srt|txt)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  const prefix = parentDir.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 20);
  return prefix ? `${prefix}-${base}` : base;
};

const getSourceFiles = (dir, baseDir = dir) => {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath, baseDir));
    } else if (entry.isFile() && /\.(md|yaml|json|srt|txt)$/i.test(entry.name)) {
      if (entry.name.startsWith('.') || entry.name.startsWith('!')) continue;
      if (entry.name === 'sources_master.yaml' || entry.name.includes('inventory')) continue;
      const relativePath = path.relative(baseDir, fullPath);
      const parentDir = path.dirname(relativePath).split('/').pop() || '';
      files.push({ fullPath, relativePath, filename: entry.name, parentDir });
    }
  }
  return files;
};

async function importMind(mindSlug) {
  console.log(`\n=== Importing: ${mindSlug} ===`);

  const { data: mind } = await supabase
    .from('minds')
    .select('id, slug, name')
    .eq('slug', mindSlug)
    .is('deleted_at', null)
    .single();

  if (!mind) {
    console.log(`❌ Mind not found: ${mindSlug}`);
    return;
  }

  console.log(`✓ Found: ${mind.name}`);

  // Get or create project
  let { data: project } = await supabase
    .from('content_projects')
    .select('id, slug')
    .eq('persona_mind_id', mind.id)
    .eq('project_type', 'mind_sources')
    .maybeSingle();

  if (!project) {
    const { data: newProject } = await supabase
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
    project = newProject;
    console.log(`✓ Created project: ${project.slug}`);
  } else {
    console.log(`✓ Using project: ${project.slug}`);
  }

  const sourcesDir = path.resolve(__dirname, '../../outputs/minds', mindSlug, 'sources');
  const allFiles = getSourceFiles(sourcesDir);
  console.log(`📁 Found ${allFiles.length} source files`);

  let imported = 0, skipped = 0, errors = 0;

  for (const file of allFiles) {
    const content = fs.readFileSync(file.fullPath, 'utf-8');
    const slug = generateSlug(file.filename, file.parentDir);
    const title = file.filename.replace(/\.(md|yaml|json|srt|txt)$/i, '').replace(/[_-]/g, ' ');
    const contentType = getContentType(file.relativePath, file.filename);

    const { data: existing } = await supabase
      .from('contents')
      .select('id')
      .eq('project_id', project.id)
      .eq('slug', slug)
      .maybeSingle();

    if (existing) { skipped++; continue; }

    const { error } = await supabase.from('contents').insert({
      project_id: project.id,
      slug,
      title,
      content,
      content_type: contentType,
      ai_generated: false,
      status: 'published',
      metadata: { source_file: file.relativePath, source_type: 'original' },
    });

    if (error) { errors++; } else { imported++; }
  }

  console.log(`✅ Imported: ${imported}, Skipped: ${skipped}, Errors: ${errors}`);
}

async function main() {
  await importMind('cadu_souza');
  await importMind('roger_medke');
  console.log('\nDone!');
}

main().catch(console.error);
