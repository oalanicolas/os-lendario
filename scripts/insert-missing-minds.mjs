/**
 * Insert missing minds: cadu_souza and roger_medke
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const minds = [
  {
    slug: 'cadu_souza',
    name: 'Cadu Souza',
    short_bio: 'CEO & Co-Founder at Pactto, Stanford GSB 2024 Sloan Fellow, AI Implementation Advisor. 2x founder with exits (last to PagSeguro). First Brazilian at The Residency (Sam Altman-backed).',
    primary_language: 'pt',
    privacy_level: 'public'
  },
  {
    slug: 'roger_medke',
    name: 'Roger Medke',
    short_bio: 'Especialista em Transformação Digital Disruptiva, empreendedorismo e inovação exponencial. Autor e palestrante focado em antifragilidade e customer centricity.',
    primary_language: 'pt',
    privacy_level: 'public'
  }
];

async function insertMinds() {
  console.log('Inserting missing minds...\n');

  for (const mind of minds) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('minds')
      .select('id, slug')
      .eq('slug', mind.slug)
      .maybeSingle();

    if (existing) {
      console.log(`⏭️  ${mind.name} (${mind.slug}) already exists`);
      continue;
    }

    // Insert
    const { data, error } = await supabase
      .from('minds')
      .insert(mind)
      .select('id, slug, name')
      .single();

    if (error) {
      console.error(`❌ Error inserting ${mind.name}:`, error.message);
    } else {
      console.log(`✅ Inserted: ${data.name} (${data.slug}) - ID: ${data.id}`);
    }
  }

  console.log('\nDone!');
}

insertMinds().catch(console.error);
