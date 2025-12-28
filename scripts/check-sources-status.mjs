import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Check content_projects with type mind_sources
const { data: projects } = await supabase
  .from('content_projects')
  .select('id, slug, persona_mind_id, project_type')
  .eq('project_type', 'mind_sources');

console.log('=== Content Projects (mind_sources) ===');
console.log('Total projetos:', projects?.length || 0);

if (projects?.length > 0) {
  const { data: contents } = await supabase
    .from('contents')
    .select('project_id')
    .in('project_id', projects.map(p => p.id));

  console.log('Total contents:', contents?.length || 0);

  const byProject = {};
  contents?.forEach(c => {
    byProject[c.project_id] = (byProject[c.project_id] || 0) + 1;
  });

  console.log('\nProjetos com sources:');
  projects.forEach(p => {
    const count = byProject[p.id] || 0;
    const name = p.slug.replace('mind-sources-', '');
    console.log(`  - ${name}: ${count} arquivos`);
  });
}

// Check minds without sources project
const { data: minds } = await supabase
  .from('minds')
  .select('id, slug, name')
  .is('deleted_at', null);

const mindsWithProject = new Set(projects?.map(p => p.persona_mind_id) || []);
const mindsWithoutProject = minds?.filter(m => !mindsWithProject.has(m.id)) || [];

console.log('\n=== Minds SEM projeto mind_sources ===');
console.log('Total:', mindsWithoutProject.length);
if (mindsWithoutProject.length > 0) {
  mindsWithoutProject.slice(0, 10).forEach(m => {
    console.log('  -', m.slug);
  });
  if (mindsWithoutProject.length > 10) {
    console.log('  ... e mais', mindsWithoutProject.length - 10);
  }
}
