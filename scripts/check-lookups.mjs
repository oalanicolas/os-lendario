import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Check skills
const { data: skills, count: skillsCount } = await supabase
  .from('skills')
  .select('*', { count: 'exact' })
  .limit(20);

console.log('SKILLS (' + (skillsCount || 0) + ' total):');
if (skills?.length) {
  skills.forEach(s => console.log('  ' + s.id + ' | ' + s.code + ' | ' + s.name));
} else {
  console.log('  (empty)');
}

// Check traits
const { data: traits, count: traitsCount } = await supabase
  .from('traits')
  .select('*', { count: 'exact' })
  .limit(20);

console.log('\nTRAITS (' + (traitsCount || 0) + ' total):');
if (traits?.length) {
  traits.forEach(t => console.log('  ' + t.id + ' | ' + t.code + ' | ' + t.name));
} else {
  console.log('  (empty)');
}

// Check existing mind_obsessions
const { count: obsCount } = await supabase
  .from('mind_obsessions')
  .select('*', { count: 'exact', head: true });

console.log('\nEXISTING DATA:');
console.log('  mind_obsessions: ' + (obsCount || 0));

const { count: valCount } = await supabase
  .from('mind_values')
  .select('*', { count: 'exact', head: true });
console.log('  mind_values: ' + (valCount || 0));

const { count: profCount } = await supabase
  .from('mind_proficiencies')
  .select('*', { count: 'exact', head: true });
console.log('  mind_proficiencies: ' + (profCount || 0));
