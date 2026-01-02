#!/usr/bin/env node
/**
 * Script: ingest-blinkist-books.mjs
 *
 * Pipeline completo para ingestão de livros do Blinkist:
 * 1. Escaneia diretórios de livros baixados
 * 2. Verifica duplicatas no banco
 * 3. Envia para Gemini para tradução editorial
 * 4. Insere no Supabase com metadados e relacionamentos
 *
 * Usage:
 *   node scripts/ingest-blinkist-books.mjs              # Processa todos
 *   node scripts/ingest-blinkist-books.mjs --dry-run    # Simula sem inserir
 *   node scripts/ingest-blinkist-books.mjs --limit=5    # Limita a N livros
 *   node scripts/ingest-blinkist-books.mjs --book=ai-2041-en  # Processa um livro específico
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Load .env.local and root .env
const envFiles = ['.env.local', '../.env'];
for (const envFile of envFiles) {
  try {
    const envContent = readFileSync(envFile, 'utf-8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
      }
    });
  } catch (e) {}
}

// Config
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// CLI args
const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = parseInt(process.argv.find(a => a.startsWith('--limit='))?.split('=')[1] || '0');
const SPECIFIC_BOOK = process.argv.find(a => a.startsWith('--book='))?.split('=')[1];

// Directories to scan
const BOOKS_BASE = process.env.HOME + '/Code/tools/blinkist-downloader/books';
const DIRS = [
  join(BOOKS_BASE, 'saved'),
  join(BOOKS_BASE, 'collections/ai-must-reads-in-2026'),
  join(BOOKS_BASE, 'collections/personal-recommendations'),
  join(BOOKS_BASE, 'collections/technology-the-future')
];

// ============================================================================
// GEMINI TRANSLATION
// ============================================================================

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildGeminiPrompt(book) {
  const chaptersText = book.chapters.map((ch, i) => {
    const text = stripHtml(ch.text);
    return `### ${ch.name}: ${ch.title}\n\n${text}`;
  }).join('\n\n---\n\n');

  return `Crie um resumo editorial profissional em português brasileiro para o livro abaixo.

REGRAS:
- NÃO traduza palavra por palavra - adapte para o contexto brasileiro
- Tom: executivo, direto, sofisticado
- Mantenha exemplos e casos do autor
- Formatação Markdown

ESTRUTURA OBRIGATÓRIA:
1. Header com: Título, Autor, Subtítulo (se houver), Ano, Duração, Avaliação
2. Resumo Executivo (2-3 parágrafos)
3. Capítulos (manter estrutura original, adaptar títulos)
4. Conclusão com "Mensagem Nuclear" e pontos principais

REGRAS DE TRADUÇÃO:
- "disruption" → "disrupção"
- "insights" → "perspectivas" ou "aprendizados"
- "leverage" → "alavancar"
- Mantenha nomes próprios em inglês
- Adapte expressões idiomáticas

---

LIVRO: ${book.title}
AUTOR: ${book.author}
DESCRIÇÃO: ${book.description}
DURAÇÃO: ${book.duration || book.durationDetail} min
AVALIAÇÃO: ${book.rating}/5

CAPÍTULOS:

${chaptersText}`;
}

function generateEnglishMarkdown(book) {
  const chapters = book.chapters.map((ch, i) => {
    const text = stripHtml(ch.text);
    return `## ${ch.name}: ${ch.title}\n\n${text}`;
  }).join('\n\n---\n\n');

  return `# ${book.title}

**Author:** ${book.author}
**Description:** ${book.description}
**Duration:** ${book.duration || book.durationDetail} min | **Rating:** ${book.rating}/5

---

${chapters}`;
}

// ============================================================================
// SLUG HELPERS
// ============================================================================

function toSnakeCase(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s]/g, '')     // Remove special chars
    .replace(/\s+/g, '_')            // Spaces to underscores
    .replace(/_+/g, '_')             // Multiple underscores to single
    .replace(/^_|_$/g, '');          // Trim underscores
}

function generateBookSlug(bookId, title) {
  // Remove -en suffix and convert to snake_case
  const base = bookId.replace(/-en$/, '').replace(/-/g, '_');
  return base;
}

function generateAuthorSlug(authorName) {
  return toSnakeCase(authorName);
}

// ============================================================================
// DATABASE OPERATIONS
// ============================================================================

async function getOrCreateAuthor(authorName, authorDetails) {
  const slug = generateAuthorSlug(authorName);

  // Check if exists
  const { data: existing } = await supabase
    .from('minds')
    .select('id, name')
    .eq('slug', slug)
    .single();

  if (existing) {
    return { id: existing.id, name: existing.name, created: false };
  }

  if (DRY_RUN) {
    return { id: 'dry-run-id', name: authorName, created: true };
  }

  // Create new author
  const { data: newAuthor, error } = await supabase
    .from('minds')
    .insert({
      slug,
      name: authorName,
      short_bio: authorDetails || `Autor de livros sobre tecnologia e negócios.`,
      privacy_level: 'public'
    })
    .select('id, name')
    .single();

  if (error) {
    throw new Error(`Failed to create author: ${error.message}`);
  }

  return { id: newAuthor.id, name: newAuthor.name, created: true };
}

async function bookExists(slug) {
  const { data } = await supabase
    .from('contents')
    .select('id')
    .eq('slug', slug)
    .single();

  return !!data;
}

async function insertBook(book, content, authorId, projectId) {
  const slug = generateBookSlug(book.id, book.title);

  const metadata = {
    author: book.author,
    original_title: book.title,
    description: book.description,
    language: 'en',  // Original language
    needs_translation: true,  // Flag for translation agents
    blinkist: {
      id: book.id,
      url: book.url,
      duration_minutes: parseInt(book.duration) || 20,
      rating: parseFloat(book.rating) || 4.0,
      ratings_text: book.ratings,
      categories: book.categories || []
    },
    chapters: book.chapters.map(ch => ch.title),
    imported_at: new Date().toISOString(),
    source: 'blinkist-downloader'
  };

  const { data: newBook, error } = await supabase
    .from('contents')
    .insert({
      slug,
      title: book.title,
      content_type: 'book_summary',
      project_id: projectId,
      status: 'draft',  // Will be 'published' after translation
      content,
      image_url: book.img,
      ai_generated: true,
      metadata
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to insert book: ${error.message}`);
  }

  // Link author
  await supabase
    .from('content_minds')
    .insert({
      content_id: newBook.id,
      mind_id: authorId,
      role: 'author'
    });

  return newBook.id;
}

// ============================================================================
// BOOK DISCOVERY
// ============================================================================

function discoverBooks() {
  const books = [];
  const seen = new Set();

  for (const dir of DIRS) {
    if (!existsSync(dir)) continue;

    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const bookJsonPath = join(dir, entry.name, 'book.json');
      if (!existsSync(bookJsonPath)) continue;

      const bookId = entry.name;
      if (seen.has(bookId)) continue;
      seen.add(bookId);

      try {
        const bookData = JSON.parse(readFileSync(bookJsonPath, 'utf-8'));
        books.push({ ...bookData, _path: bookJsonPath });
      } catch (e) {
        console.warn(`⚠️  Failed to parse ${bookJsonPath}: ${e.message}`);
      }
    }
  }

  return books;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('📚 Blinkist Books Ingestion Pipeline');
  console.log('='.repeat(60));
  if (DRY_RUN) console.log('🔍 DRY-RUN MODE\n');

  // Get biblioteca project
  const { data: project, error: projectError } = await supabase
    .from('content_projects')
    .select('id')
    .eq('slug', 'biblioteca')
    .single();

  if (projectError || !project) {
    console.error('❌ Project "biblioteca" not found');
    process.exit(1);
  }
  console.log(`✓ Project biblioteca: ${project.id}\n`);

  // Discover books
  let books = discoverBooks();
  console.log(`📖 Found ${books.length} books in source directories\n`);

  // Filter specific book if requested
  if (SPECIFIC_BOOK) {
    books = books.filter(b => b.id === SPECIFIC_BOOK);
    if (books.length === 0) {
      console.error(`❌ Book "${SPECIFIC_BOOK}" not found`);
      process.exit(1);
    }
  }

  // Apply limit
  if (LIMIT > 0) {
    books = books.slice(0, LIMIT);
    console.log(`⚠️  Limited to ${LIMIT} books\n`);
  }

  const stats = {
    processed: 0,
    created: 0,
    skipped: 0,
    authorsCreated: 0,
    errors: []
  };

  for (const book of books) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📖 ${book.title}`);
    console.log(`   by ${book.author}`);
    console.log(`   ID: ${book.id}`);
    console.log(`${'─'.repeat(60)}`);

    const slug = generateBookSlug(book.id, book.title);

    // Check if exists
    if (await bookExists(slug)) {
      console.log(`   ⏭️  Already exists (slug: ${slug})`);
      stats.skipped++;
      continue;
    }

    stats.processed++;

    try {
      // Get or create author
      console.log(`   👤 Processing author: ${book.author}`);
      const author = await getOrCreateAuthor(book.author, book.authorDetails);
      if (author.created) {
        console.log(`   ✓ Created author: ${author.name}`);
        stats.authorsCreated++;
      } else {
        console.log(`   ✓ Author exists: ${author.name}`);
      }

      // Generate English markdown (will be translated by agents later)
      console.log(`   📝 Generating markdown...`);
      const content = generateEnglishMarkdown(book);
      console.log(`   ✓ Content ready (${content.length} chars)`);

      // Insert book
      if (!DRY_RUN) {
        const bookId = await insertBook(book, content, author.id, project.id);
        console.log(`   ✓ Inserted book: ${slug}`);
        stats.created++;
      } else {
        console.log(`   [DRY-RUN] Would insert: ${slug}`);
        stats.created++;
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      stats.errors.push({ book: book.id, error: error.message });
    }

    // Rate limiting for Gemini
    await new Promise(r => setTimeout(r, 1000));
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`   Books processed:  ${stats.processed}`);
  console.log(`   Books created:    ${stats.created}`);
  console.log(`   Books skipped:    ${stats.skipped}`);
  console.log(`   Authors created:  ${stats.authorsCreated}`);
  console.log(`   Errors:           ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    stats.errors.forEach(e => console.log(`   - ${e.book}: ${e.error}`));
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
