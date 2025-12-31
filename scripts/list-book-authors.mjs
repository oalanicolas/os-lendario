#!/usr/bin/env node
/**
 * Lists all book authors and their current status (avatar, bio)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  console.log('Fetching book authors...\n');

  // Get all minds that are authors of book_summary content
  const { data: authors, error } = await supabase
    .from('content_minds')
    .select(`
      minds!inner(
        id,
        slug,
        name,
        short_bio,
        avatar_url
      ),
      contents!inner(
        id,
        title,
        content_type
      )
    `)
    .eq('role', 'author')
    .eq('contents.content_type', 'book_summary');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  // Deduplicate by mind id
  const uniqueAuthors = new Map();
  for (const row of authors) {
    const mind = row.minds;
    if (!uniqueAuthors.has(mind.id)) {
      uniqueAuthors.set(mind.id, {
        ...mind,
        books: []
      });
    }
    uniqueAuthors.get(mind.id).books.push(row.contents.title);
  }

  // Sort by name
  const authorList = Array.from(uniqueAuthors.values())
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(`Found ${authorList.length} unique authors\n`);

  // Separate complete vs incomplete
  const complete = [];
  const incomplete = [];

  for (const author of authorList) {
    const hasAvatar = !!author.avatar_url;
    const hasBio = !!author.short_bio;

    if (hasAvatar && hasBio) {
      complete.push(author);
    } else {
      incomplete.push({
        ...author,
        missing: [
          !hasAvatar && 'avatar',
          !hasBio && 'bio'
        ].filter(Boolean)
      });
    }
  }

  console.log('=== INCOMPLETE AUTHORS ===\n');
  for (const author of incomplete) {
    console.log(`${author.name} (${author.slug})`);
    console.log(`  Missing: ${author.missing.join(', ')}`);
    console.log(`  Books: ${author.books.length}`);
    console.log('');
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Complete: ${complete.length}`);
  console.log(`Incomplete: ${incomplete.length}`);
  console.log(`Total: ${authorList.length}`);

  // Output slugs for incomplete authors (for script use)
  console.log('\n=== INCOMPLETE SLUGS (for script) ===');
  console.log(incomplete.map(a => a.slug).join('\n'));
}

main().catch(console.error);
