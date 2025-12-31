#!/usr/bin/env node
/**
 * Script: insert-darwinismo-digital.mjs
 * Inserts the book "Darwinismo Digital" by Tom Goodwin into the database
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Try to load .env.local if exists
try {
  const envLocal = readFileSync('.env.local', 'utf-8');
  envLocal.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  });
} catch (e) {
  // .env.local not found, continue with default .env
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Check .env.local');
  console.error('   VITE_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
  console.error('   VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'SET' : 'MISSING');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DRY_RUN = process.argv.includes('--dry-run');

// Book content (truncated for script, full content in SQL seed)
const BOOK_CONTENT = `# Darwinismo Digital

**Autor:** Tom Goodwin
**Subtitulo:** A Sobrevivencia do Mais Apto na Era da Disrupcao Digital
**Ano:** 2018 | **Editora:** Kogan Page

---

## Resumo Executivo

Digital Darwinism oferece uma perspectiva transformadora sobre o que realmente diferencia as empresas disruptivas das corporacoes meramente atualizadas. Tom Goodwin argumenta que nao se trata de ter a tecnologia mais avancada ou os maiores recursos financeiros, mas sim de uma disposicao fundamental para reimaginar operacoes empresariais em seus alicerces, integrando a transformacao digital no DNA corporativo em vez de simplesmente agregar solucoes tecnologicas as estruturas existentes.

---

## Capitulo 1: A Essencia do Darwinismo Digital

**Conceito Fundamental:** Darwinismo Digital consiste em adaptar-se a um mundo em transformacao e demonstrar disposicao para implementar mudancas de natureza estrutural e radical.

### Exemplo: Sony e a Disrupcao do MP3

A Sony realizou investimentos vultosos no desenvolvimento de aparelhos como o Walkman e o Discman, mas quando os formatos MP3 emergiram, a empresa nao conseguiu fazer a transicao. Perdeu sua posicao dominante para concorrentes mais ousados e disruptivos.

### A Abordagem "Aderencia Externa"

Muitas empresas optam por uma abordagem superficial: simplesmente colam tecnologia sobre processos antigos. Para empresas legadas, e imperativo aceitar e executar mudancas de raiz.

---

## Capitulo 2: Licoes Historicas das Eras Tecnologicas

A historia das transformacoes causadas pela eletricidade, computadores e digitalizacao nos oferece perspectivas valiosas. Em cada ocasiao, a sociedade inicialmente resistiu a integracao da nova tecnologia.

### Padrao Discernivel

O ciclo de adocao se acelera a cada geracao - de cem anos (eletricidade) para cinquenta anos (computadores) ate aproximadamente vinte e cinco anos (internet).

---

## Capitulo 3: Transcendendo as Camadas Superficiais

O que os verdadeiros disruptores fazem e reimaginar radicalmente o modo de operacao. Uber e Airbnb removeram o pressuposto de que uma empresa deveria possuir ativos fisicos para conectar clientes.

---

## Capitulo 4: Quatro Estrategias Para Transformacao Empresarial

1. **Autossabotagem Estrategica** - Netflix e a transicao para streaming
2. **Reinvencao Continua** - Facebook evoluiu de rede social para corporacao de midia
3. **Apostas Medidas** - BMW com a serie BMWi de veiculos eletricos
4. **Protecao Diversificada** - Google Ventures e investimentos em startups

---

## Capitulo 5: Antecipando o Futuro

A Internet das Coisas e 5G permitirao transacoes continuas e fluidas. Empresas inovadoras devem perseguir tecnologia se tornando parte natural e invisivel da vida.

---

## Capitulo 6: Superando Decepcoes Digitais

A mensagem nuclear: Darwinismo Digital nao se reduz a ser a corporacao mais forte. Trata-se de agilidade e capacidade de adaptacao acelerada ao mercado global em transformacao.`;

const BOOK_METADATA = {
  author: 'Tom Goodwin',
  original_title: 'Digital Darwinism',
  subtitle: 'Survival of the Fittest in the Age of Digital Disruption',
  subtitle_pt: 'A Sobrevivencia do Mais Apto na Era da Disrupcao Digital',
  publish_year: 2018,
  publisher: 'Kogan Page',
  language: 'en',
  translation_language: 'pt-BR',
  genre: 'Tecnologia e Negocios',
  blinkist: {
    duration_minutes: 18,
    key_ideas_count: 6,
    rating: 4.3,
    total_ratings: 187,
    categories: ['Tecnologia & Futuro', 'Empreendedorismo', 'Gestao & Lideranca']
  },
  categories: ['Business & Economics', 'Technology & Engineering', 'Self-Help'],
  keywords: [
    'Disrupcao Digital',
    'Transformacao Empresarial',
    'Inovacao',
    'Adaptacao ao Mercado',
    'Estrategia Corporativa',
    'Tecnologia',
    'Empreendedorismo'
  ],
  links: {
    blinkist: 'https://www.blinkist.com/en/app/books/digital-darwinism-en',
    amazon: 'https://www.amazon.com/Digital-Darwinism-Survival-Fittest-Disruption/dp/0749480505',
    kogan_page: 'https://www.koganpage.com/product/digital-darwinism-9780749480500'
  },
  chapters: [
    'A Essencia do Darwinismo Digital',
    'Licoes Historicas das Eras Tecnologicas',
    'Transcendendo as Camadas Superficiais',
    'Quatro Estrategias de Transformacao',
    'Antecipando o Futuro',
    'Superando Decepcoes Digitais'
  ],
  summary_brief: 'Digital Darwinism oferece uma perspectiva transformadora sobre o que realmente diferencia as empresas disruptivas das corporacoes meramente atualizadas.',
  imported_at: new Date().toISOString()
};

async function main() {
  console.log('📚 Insert Darwinismo Digital');
  console.log('='.repeat(50));
  if (DRY_RUN) console.log('🔍 DRY-RUN MODE\n');

  // 1. Get biblioteca project
  console.log('1️⃣ Getting biblioteca project...');
  const { data: project, error: projectError } = await supabase
    .from('content_projects')
    .select('id')
    .eq('slug', 'biblioteca')
    .single();

  if (projectError || !project) {
    console.error('❌ Project "biblioteca" not found:', projectError?.message);
    process.exit(1);
  }
  console.log(`   ✓ Project ID: ${project.id}\n`);

  // 2. Create or get author mind
  console.log('2️⃣ Creating/getting author mind...');
  let authorId;

  const { data: existingAuthor } = await supabase
    .from('minds')
    .select('id, name')
    .eq('slug', 'tom_goodwin')
    .single();

  if (existingAuthor) {
    authorId = existingAuthor.id;
    console.log(`   ✓ Author exists: ${existingAuthor.name} (${authorId})\n`);
  } else if (!DRY_RUN) {
    // Note: mmos_metadata column excluded due to schema cache issue
    const { data: newAuthor, error: authorError } = await supabase
      .from('minds')
      .insert({
        slug: 'tom_goodwin',
        name: 'Tom Goodwin',
        short_bio: 'Autor de "Digital Darwinism". Diretor de Inovacao na Zenith Media. Colaborador da TechCrunch, Forbes, New York Times e The Economist. Especialista em transformacao digital e estrategia corporativa.',
        privacy_level: 'public'
      })
      .select('id, name')
      .single();

    if (authorError) {
      console.error('❌ Failed to create author:', authorError.message);
      process.exit(1);
    }
    authorId = newAuthor.id;
    console.log(`   ✓ Created author: ${newAuthor.name} (${authorId})\n`);
  } else {
    console.log('   [DRY-RUN] Would create author: Tom Goodwin\n');
  }

  // 3. Check if book exists
  console.log('3️⃣ Checking if book exists...');
  const { data: existingBook } = await supabase
    .from('contents')
    .select('id, title')
    .eq('slug', 'darwinismo_digital')
    .single();

  if (existingBook) {
    console.log(`   ⏭️  Book already exists: ${existingBook.title} (${existingBook.id})\n`);
    console.log('Done! No changes needed.');
    return;
  }

  // 4. Create book content
  console.log('4️⃣ Creating book content...');
  if (!DRY_RUN) {
    const { data: newBook, error: bookError } = await supabase
      .from('contents')
      .insert({
        slug: 'darwinismo_digital',
        title: 'Darwinismo Digital',
        content_type: 'book_summary',
        project_id: project.id,
        status: 'published',
        content: BOOK_CONTENT,
        metadata: BOOK_METADATA
      })
      .select('id')
      .single();

    if (bookError) {
      console.error('❌ Failed to create book:', bookError.message);
      process.exit(1);
    }
    console.log(`   ✓ Created book: Darwinismo Digital (${newBook.id})\n`);

    // 5. Link author to book
    console.log('5️⃣ Linking author to book...');
    const { error: linkError } = await supabase
      .from('content_minds')
      .insert({
        content_id: newBook.id,
        mind_id: authorId,
        role: 'author'
      });

    if (linkError) {
      console.log(`   ⚠️  Link error: ${linkError.message}`);
    } else {
      console.log('   ✓ Author linked\n');
    }

    // 6. Link book to category tags
    console.log('6️⃣ Linking to category tags...');
    const categories = ['business', 'technology', 'entrepreneurship'];

    for (const categorySlug of categories) {
      const { data: tag } = await supabase
        .from('tags')
        .select('id, name')
        .eq('slug', categorySlug)
        .eq('tag_type', 'book_category')
        .single();

      if (tag) {
        const { error: tagError } = await supabase
          .from('content_tags')
          .insert({ content_id: newBook.id, tag_id: tag.id });

        if (tagError && !tagError.message.includes('duplicate')) {
          console.log(`   ⚠️  Tag ${categorySlug}: ${tagError.message}`);
        } else {
          console.log(`   ✓ Tagged: ${tag.name}`);
        }
      } else {
        console.log(`   ⚠️  Tag not found: ${categorySlug}`);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ DONE! Book inserted successfully.');
    console.log('   Book ID:', newBook.id);
    console.log('   Author ID:', authorId);
    console.log('='.repeat(50));
  } else {
    console.log('   [DRY-RUN] Would create book: Darwinismo Digital\n');
    console.log('Run without --dry-run to apply changes.');
  }
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
