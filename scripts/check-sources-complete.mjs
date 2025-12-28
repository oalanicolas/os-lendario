import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Get all projects
const { data: projects } = await supabase
  .from('content_projects')
  .select('id, slug, persona_mind_id')
  .eq('project_type', 'mind_sources');

console.log('=== Content Projects (mind_sources) ===');
console.log('Total projetos:', projects?.length || 0);

// Count contents for each project individually
let totalContents = 0;
const results = [];

for (const p of projects || []) {
  const { count } = await supabase
    .from('contents')
    .select('*', { count: 'exact', head: true })
    .eq('project_id', p.id);

  const name = p.slug.replace('mind-sources-', '');
  results.push({ name, count: count || 0 });
  totalContents += count || 0;
}

console.log('\nTotal contents (soma real):', totalContents);

console.log('\nPor projeto:');
results.sort((a, b) => b.count - a.count).forEach(r => {
  console.log(`  - ${r.name}: ${r.count}`);
});

// Projects with 0 contents
const empty = results.filter(r => r.count === 0);
if (empty.length > 0) {
  console.log('\n⚠️  Projetos VAZIOS:', empty.length);
  empty.forEach(r => console.log(`   - ${r.name}`));
}
