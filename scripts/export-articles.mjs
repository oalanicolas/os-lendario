#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync } from 'fs';

// Load env
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

const { data, error } = await supabase
  .from('contents')
  .select('slug, content')
  .eq('status', 'draft')
  .eq('content_type', 'book_summary')
  .order('created_at', { ascending: true });

if (error) {
  console.error(error);
  process.exit(1);
}

let count = 0;
for (const item of data) {
  if (item.content && item.content.length > 500) {
    writeFileSync('scripts/temp/' + item.slug + '.md', item.content);
    console.log('✓ ' + item.slug + '.md (' + item.content.length + ' chars)');
    count++;
  }
}
console.log('\n📄 Total: ' + count + ' artigos exportados para scripts/temp/');
