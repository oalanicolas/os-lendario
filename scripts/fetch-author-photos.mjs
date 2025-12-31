#!/usr/bin/env node
/**
 * Fetches author photos from Wikipedia API and updates minds table
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Author data with Wikipedia page titles
const AUTHORS = [
  // Major authors with known Wikipedia pages
  { slug: 'james_clear', wiki: 'James_Clear', bio: 'Escritor americano, autor do best-seller "Atomic Habits". Especialista em formação de hábitos e melhoria contínua.' },
  { slug: 'cal_newport', wiki: 'Cal_Newport', bio: 'Professor de ciência da computação em Georgetown e autor de "Deep Work". Defensor do foco profundo e minimalismo digital.' },
  { slug: 'ryan_holiday', wiki: 'Ryan_Holiday', bio: 'Escritor e estrategista de marketing americano. Autor de livros sobre estoicismo como "The Obstacle Is the Way".' },
  { slug: 'ray_dalio', wiki: 'Ray_Dalio', bio: 'Bilionário e fundador da Bridgewater Associates. Autor de "Principles", sobre princípios de vida e trabalho.' },
  { slug: 'simon_sinek', wiki: 'Simon_Sinek', bio: 'Autor e palestrante motivacional britânico-americano. Conhecido por "Start With Why" e o conceito do Círculo Dourado.' },
  { slug: 'tony_robbins', wiki: 'Tony_Robbins', bio: 'Coach de vida e autor americano. Pioneiro em programação neurolinguística e desenvolvimento pessoal.' },
  { slug: 'malcolm_gladwell', wiki: 'Malcolm_Gladwell', bio: 'Jornalista e autor canadense. Conhecido por livros como "Outliers" e "The Tipping Point".' },
  { slug: 'robert_greene', wiki: 'Robert_Greene_(American_author)', bio: 'Autor americano de livros sobre estratégia e poder. Autor de "As 48 Leis do Poder" e "Maestria".' },
  { slug: 'timothy_ferriss', wiki: 'Tim_Ferriss', bio: 'Empreendedor, autor e podcaster americano. Autor de "Trabalhe 4 Horas por Semana" e apresentador do podcast mais popular do mundo.' },
  { slug: 'carol_s_dweck', wiki: 'Carol_Dweck', bio: 'Psicóloga de Stanford especializada em motivação. Autora de "Mindset" sobre mentalidade fixa vs. de crescimento.' },
  { slug: 'ben_horowitz', wiki: 'Ben_Horowitz', bio: 'Empreendedor e investidor de venture capital americano. Co-fundador da Andreessen Horowitz e autor de "The Hard Thing About Hard Things".' },
  { slug: 'dale_carnegie', wiki: 'Dale_Carnegie', bio: 'Escritor e palestrante americano (1888-1955). Autor do clássico "Como Fazer Amigos e Influenciar Pessoas".' },
  { slug: 'stephen_covey', wiki: 'Stephen_Covey', bio: 'Educador e autor americano (1932-2012). Autor de "Os 7 Hábitos das Pessoas Altamente Eficazes".' },
  { slug: 'stephen_r_covey', wiki: 'Stephen_Covey', bio: 'Educador e autor americano (1932-2012). Autor de "Os 7 Hábitos das Pessoas Altamente Eficazes".' },
  { slug: 'daniel_goleman', wiki: 'Daniel_Goleman', bio: 'Psicólogo e jornalista científico americano. Autor de "Inteligência Emocional", popularizando o conceito de QE.' },
  { slug: 'yuval_noah_harari', wiki: 'Yuval_Noah_Harari', bio: 'Historiador israelense e professor em Jerusalém. Autor de "Sapiens", "Homo Deus" e "21 Lições para o Século 21".' },
  { slug: 'nassim_nicholas_taleb', wiki: 'Nassim_Nicholas_Taleb', bio: 'Ensaísta e ex-trader libanês-americano. Autor de "A Lógica do Cisne Negro" e "Antifrágil".' },
  { slug: 'robert_b_cialdini', wiki: 'Robert_Cialdini', bio: 'Psicólogo social americano, professor emérito da ASU. Autor de "Influence: The Psychology of Persuasion".' },
  { slug: 'greg_mckeown', wiki: 'Greg_McKeown_(author)', bio: 'Autor e palestrante britânico. Autor de "Essencialismo" sobre fazer menos porém melhor.' },
  { slug: 'marco_aurelio', wiki: 'Marcus_Aurelius', bio: 'Imperador romano e filósofo estoico (121-180 d.C.). Autor de "Meditações", clássico do estoicismo.' },
  { slug: 'seneca', wiki: 'Seneca_the_Younger', bio: 'Filósofo estoico, estadista e dramaturgo romano (4 a.C.-65 d.C.). Autor de "Cartas a Lucílio".' },
  { slug: 'carl-jung', wiki: 'Carl_Jung', bio: 'Psiquiatra e psicoterapeuta suíço (1875-1961). Fundador da psicologia analítica e dos conceitos de arquétipos.' },
  { slug: 'joseph-campbell', wiki: 'Joseph_Campbell', bio: 'Mitólogo e escritor americano (1904-1987). Autor de "O Herói de Mil Faces" sobre a jornada do herói.' },
  { slug: 'paulo_coelho', wiki: 'Paulo_Coelho', bio: 'Escritor brasileiro, membro da Academia Brasileira de Letras. Autor de "O Alquimista", um dos livros mais vendidos da história.' },
  { slug: 'mihaly_csikszentmihalyi', wiki: 'Mihaly_Csikszentmihalyi', bio: 'Psicólogo húngaro-americano (1934-2021). Criador do conceito de "flow" e autor de "Flow: A Psicologia do Alto Desempenho".' },
  { slug: 'angela-duckworth', wiki: 'Angela_Duckworth', bio: 'Psicóloga americana e professora da Universidade da Pensilvânia. Autora de "Grit" sobre perseverança e paixão.' },
  { slug: 'ray_kurzweil', wiki: 'Ray_Kurzweil', bio: 'Inventor e futurista americano, diretor de engenharia do Google. Autor de "A Singularidade Está Próxima".' },
  { slug: 'peter_h_diamandis', wiki: 'Peter_Diamandis', bio: 'Empreendedor e fundador da XPRIZE. Autor de "Abundance" sobre tecnologia e futuro da humanidade.' },
  { slug: 'kai_fu_lee', wiki: 'Kai-Fu_Lee', bio: 'Cientista da computação e investidor taiwanês-americano. Ex-presidente do Google China e autor de "AI Superpowers".' },
  { slug: 'hans_rosling', wiki: 'Hans_Rosling', bio: 'Médico e estatístico sueco (1948-2017). Autor de "Factfulness" sobre como o mundo é melhor do que pensamos.' },
  { slug: 'osho', wiki: 'Rajneesh', bio: 'Líder espiritual indiano (1931-1990). Fundador do movimento Rajneesh e autor de centenas de livros sobre meditação.' },
  { slug: 'robert_t_kiyosaki', wiki: 'Robert_Kiyosaki', bio: 'Empresário e autor americano. Autor de "Pai Rico, Pai Pobre", um dos livros de finanças pessoais mais vendidos.' },
  { slug: 'henry_a_kissinger', wiki: 'Henry_Kissinger', bio: 'Diplomata e cientista político americano (1923-2023). Ex-Secretário de Estado e autor sobre geopolítica.' },
  { slug: 'jonathan-haidt', wiki: 'Jonathan_Haidt', bio: 'Psicólogo social americano, professor da NYU Stern. Autor de "The Righteous Mind" sobre psicologia moral.' },
  { slug: 'ashlee_vance', wiki: 'Ashlee_Vance', bio: 'Jornalista e autor americano. Biógrafo de Elon Musk e autor de "Elon Musk: Tesla, SpaceX e a Busca por um Futuro Fantástico".' },
  { slug: 'jim_kwik', wiki: 'Jim_Kwik', bio: 'Coach de performance cerebral e autor americano. Autor de "Limitless" sobre aprendizado acelerado e memória.' },
  { slug: 'gary_keller', wiki: 'Gary_Keller', bio: 'Empreendedor americano, fundador da Keller Williams Realty. Autor de "The One Thing" sobre foco e produtividade.' },
  { slug: 'gay_hendricks', wiki: 'Gay_Hendricks', bio: 'Psicólogo e autor americano. Autor de "The Big Leap" sobre superar auto-sabotagem e alcançar o potencial máximo.' },
  { slug: 'darren_hardy', wiki: 'Darren_Hardy', bio: 'Autor e palestrante americano, ex-editor da SUCCESS Magazine. Autor de "O Efeito Composto".' },
  { slug: 'tony_hsieh', wiki: 'Tony_Hsieh', bio: 'Empreendedor americano (1973-2020). Ex-CEO da Zappos e autor de "Delivering Happiness".' },
  { slug: 'donald_miller', wiki: 'Donald_Miller_(author)', bio: 'Autor e empresário americano. Criador do framework StoryBrand para marketing e autor de "Building a StoryBrand".' },
  { slug: 'verne_harnish', wiki: 'Verne_Harnish', bio: 'Empreendedor e autor americano. Fundador da EO e autor de "Scaling Up" sobre crescimento empresarial.' },
  { slug: 't_harv_eker', wiki: 'T._Harv_Eker', bio: 'Autor e palestrante motivacional canadense. Autor de "Os Segredos da Mente Milionária".' },
  { slug: 'chris_bailey', wiki: 'Chris_Bailey_(author)', bio: 'Autor e pesquisador de produtividade canadense. Autor de "Hyperfocus" sobre atenção e foco.' },
  { slug: 'david_deutsch', wiki: 'David_Deutsch', bio: 'Físico britânico, pioneiro da computação quântica. Autor de "The Beginning of Infinity" sobre progresso humano.' },
  { slug: 'matt_ridley', wiki: 'Matt_Ridley', bio: 'Jornalista e divulgador científico britânico. Autor de "The Rational Optimist" sobre progresso e inovação.' },
  { slug: 'emile_durkheim', wiki: 'Émile_Durkheim', bio: 'Sociólogo francês (1858-1917). Considerado um dos pais da sociologia moderna.' },
  { slug: 'ernest_becker', wiki: 'Ernest_Becker', bio: 'Antropólogo cultural americano (1924-1974). Autor de "A Negação da Morte", vencedor do Pulitzer.' },
  { slug: 'alice_schroeder', wiki: 'Alice_Schroeder', bio: 'Autora e ex-analista financeira americana. Biógrafa oficial de Warren Buffett em "The Snowball".' },
  { slug: 'william_irvine', wiki: 'William_Braxton_Irvine', bio: 'Filósofo americano, professor na Wright State University. Autor de "A Guide to the Good Life" sobre estoicismo.' },
  { slug: 'herb_cohen', wiki: 'Herb_Cohen', bio: 'Especialista em negociação americano (1932-2022). Autor de "You Can Negotiate Anything".' },
  { slug: 'claude_c_hopkins', wiki: 'Claude_C._Hopkins', bio: 'Pioneiro da publicidade americana (1866-1932). Autor de "Scientific Advertising", clássico do marketing.' },
  { slug: 'wallace_d_wattles', wiki: 'Wallace_Wattles', bio: 'Autor americano do Novo Pensamento (1860-1911). Autor de "A Ciência de Ficar Rico".' },
  { slug: 'barry_schwartz', wiki: 'Barry_Schwartz_(psychologist)', bio: 'Psicólogo americano, professor do Swarthmore College. Autor de "O Paradoxo da Escolha".' },
  { slug: 'james_p_carse', wiki: 'James_P._Carse', bio: 'Filósofo e historiador das religiões americano (1932-2020). Autor de "Finite and Infinite Games".' },
  { slug: 'avinash_k_dixit', wiki: 'Avinash_Dixit', bio: 'Economista indiano-americano, professor emérito de Princeton. Especialista em teoria dos jogos.' },
  { slug: 'peter_burke', wiki: 'Peter_Burke_(historian)', bio: 'Historiador cultural britânico, professor emérito de Cambridge. Autor de obras sobre história cultural europeia.' },
];

async function getWikipediaImage(wikiTitle) {
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
  console.log('Fetching author photos from Wikipedia API...\n');

  let updated = 0;
  let failed = 0;
  let noPhoto = 0;

  for (const author of AUTHORS) {
    process.stdout.write(`Processing ${author.slug}... `);

    const imageUrl = await getWikipediaImage(author.wiki);

    if (!imageUrl) {
      console.log('⚠️ No photo found');
      noPhoto++;

      // Still update bio if we have it
      if (author.bio) {
        const { error } = await supabase
          .from('minds')
          .update({ short_bio: author.bio })
          .eq('slug', author.slug);

        if (!error) {
          console.log(`  → Bio updated`);
        }
      }
      continue;
    }

    const updateData = {
      avatar_url: imageUrl,
      short_bio: author.bio
    };

    const { error } = await supabase
      .from('minds')
      .update(updateData)
      .eq('slug', author.slug);

    if (error) {
      console.log(`❌ ${error.message}`);
      failed++;
    } else {
      console.log(`✅`);
      updated++;
    }

    // Small delay to be nice to Wikipedia API
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated with photo: ${updated}`);
  console.log(`No photo found: ${noPhoto}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total processed: ${AUTHORS.length}`);
}

main().catch(console.error);
