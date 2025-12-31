#!/usr/bin/env node
/**
 * Fetches remaining author photos from Wikipedia API
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Remaining authors
const AUTHORS = [
  { slug: 'adam_l_penenberg', wiki: 'Adam_Penenberg', bio: 'Jornalista e autor americano. Professor de jornalismo na NYU e autor sobre tecnologia e mídia.' },
  { slug: 'beatrice_chestnut', wiki: 'Beatrice_Chestnut', bio: 'Psicoterapeuta e coach americana. Especialista em Eneagrama e autora de livros sobre desenvolvimento pessoal.' },
  { slug: 'bernard_suits', wiki: 'Bernard_Suits', bio: 'Filósofo canadense (1925-2007). Autor de "The Grasshopper" sobre a filosofia dos jogos.' },
  { slug: 'bill_burnett', wiki: 'Bill_Burnett_(designer)', bio: 'Designer e professor de Stanford. Co-autor de "Designing Your Life" sobre design thinking aplicado à vida.' },
  { slug: 'cal_newport', wiki: 'Cal_Newport', bio: 'Professor de ciência da computação em Georgetown e autor de "Deep Work". Defensor do foco profundo e minimalismo digital.' },
  { slug: 'catherine_hakim', wiki: 'Catherine_Hakim', bio: 'Socióloga britânica. Autora de "Erotic Capital" sobre capital erótico e atratividade social.' },
  { slug: 'dale_carnegie', wiki: 'Dale_Carnegie', bio: 'Escritor e palestrante americano (1888-1955). Autor do clássico "Como Fazer Amigos e Influenciar Pessoas".' },
  { slug: 'eric_jorgenson', wiki: null, bio: 'Autor e empreendedor americano. Autor de "The Almanack of Naval Ravikant" compilando a sabedoria de Naval.' },
  { slug: 'james_a_davies', wiki: null, bio: 'Autor especializado em estratégia e teoria dos jogos aplicada aos negócios.' },
  { slug: 'leander_kahney', wiki: 'Leander_Kahney', bio: 'Jornalista e autor americano. Autor de livros sobre Apple e Steve Jobs.' },
  { slug: 'luiz_fernando_lucas', wiki: null, bio: 'Autor brasileiro especializado em produtividade e desenvolvimento pessoal.' },
  { slug: 'michael_j_losier', wiki: null, bio: 'Autor canadense e coach. Especialista em Lei da Atração e autor de best-sellers sobre o tema.' },
  { slug: 'russ_hudson', wiki: 'Russ_Hudson', bio: 'Autor e professor americano. Co-fundador do Enneagram Institute e especialista em tipologia.' },
  { slug: 'wes_bush', wiki: null, bio: 'Autor e fundador da ProductLed. Especialista em estratégias de crescimento product-led.' },
  { slug: 'willian_walker_atkinson', wiki: 'William_Walker_Atkinson', bio: 'Autor americano do Novo Pensamento (1862-1932). Prolífico escritor sobre mente e espiritualidade.' },
  { slug: 'carina_alexandra_rondini', wiki: null, bio: 'Autora brasileira especializada em desenvolvimento pessoal e espiritualidade.' },
  { slug: 'jim_kwik', wiki: 'Jim_Kwik', bio: 'Coach de performance cerebral e autor americano. Autor de "Limitless" sobre aprendizado acelerado.' },
  { slug: 'gary_keller', wiki: 'Gary_Keller', bio: 'Empreendedor americano, fundador da Keller Williams. Autor de "The One Thing" sobre foco.' },
  { slug: 'gay_hendricks', wiki: 'Gay_Hendricks', bio: 'Psicólogo e autor americano. Autor de "The Big Leap" sobre superar auto-sabotagem.' },
  { slug: 'donald_miller', wiki: 'Donald_Miller_(author)', bio: 'Autor e empresário americano. Criador do StoryBrand e autor de livros sobre storytelling.' },
  { slug: 'ernest_becker', wiki: 'Ernest_Becker', bio: 'Antropólogo cultural americano (1924-1974). Autor de "A Negação da Morte", vencedor do Pulitzer.' },
  { slug: 'herb_cohen', wiki: 'Herb_Cohen', bio: 'Especialista em negociação americano (1932-2022). Autor de "You Can Negotiate Anything".' },
  { slug: 'james_p_carse', wiki: 'James_P._Carse', bio: 'Filósofo americano (1932-2020). Autor de "Finite and Infinite Games" sobre tipos de jogos na vida.' },
  { slug: 'william_irvine', wiki: 'William_Braxton_Irvine', bio: 'Filósofo americano, professor na Wright State. Autor de "A Guide to the Good Life" sobre estoicismo.' },
  { slug: 'claude_c_hopkins', wiki: 'Claude_C._Hopkins', bio: 'Pioneiro da publicidade americana (1866-1932). Autor de "Scientific Advertising".' },
];

async function getWikipediaImage(wikiTitle) {
  if (!wikiTitle) return null;

  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=500&origin=*`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${wikiTitle}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Fetching remaining author photos...\n');

  let updated = 0;
  let bioOnly = 0;

  for (const author of AUTHORS) {
    process.stdout.write(`Processing ${author.slug}... `);

    const imageUrl = author.wiki ? await getWikipediaImage(author.wiki) : null;

    const updateData = { short_bio: author.bio };
    if (imageUrl) {
      updateData.avatar_url = imageUrl;
    }

    const { error } = await supabase
      .from('minds')
      .update(updateData)
      .eq('slug', author.slug);

    if (error) {
      console.log(`❌ ${error.message}`);
    } else if (imageUrl) {
      console.log(`✅ photo + bio`);
      updated++;
    } else {
      console.log(`📝 bio only`);
      bioOnly++;
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated with photo: ${updated}`);
  console.log(`Bio only: ${bioOnly}`);
  console.log(`Total: ${AUTHORS.length}`);
}

main().catch(console.error);
