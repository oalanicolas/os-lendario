#!/usr/bin/env node
/**
 * Script: update-books-content.mjs
 * Updates existing book summaries with new content
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Load .env.local
try {
  const envLocal = readFileSync('.env.local', 'utf-8');
  envLocal.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  });
} catch (e) {}

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// BOOKS TO UPDATE
// ============================================================================

const BOOKS_TO_UPDATE = [
  {
    slug: 'habitos_atomicos',
    title: 'Hábitos Atômicos',
    metadata: {
      author: 'James Clear',
      original_title: 'Atomic Habits',
      subtitle: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      subtitle_pt: 'Um Metodo Facil e Comprovado para Construir Bons Habitos e Abandonar os Ruins',
      publish_year: 2018,
      publisher: 'Avery',
      language: 'en',
      translation_language: 'pt-BR',
      genre: 'Autoajuda e Produtividade',
      blinkist: {
        duration_minutes: 25,
        key_ideas_count: 7,
        rating: 4.6,
        total_ratings: 500,
        categories: ['Produtividade', 'Psicologia', 'Motivacao']
      },
      categories: ['Self-Help', 'Psychology', 'Business & Economics'],
      keywords: ['Habitos', 'Produtividade', 'Mudanca Comportamental', 'Autodesenvolvimento', 'Rotinas', 'Disciplina'],
      links: {
        blinkist: 'https://www.blinkist.com/en/app/books/atomic-habits-en',
        amazon: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299'
      },
      chapters: [
        'O Poder Surpreendente dos Pequenos Habitos',
        'Como os Habitos sao Formados',
        'Construindo Novos Habitos',
        'Tornando Habitos Atraentes',
        'Tornando Habitos Faceis',
        'Tornando Habitos Satisfatorios',
        'Rastreamento e Contratos'
      ],
      summary_brief: 'Atomic Habits revela que a chave para grandes mudancas na vida nao exige revolucoes comportamentais. Atraves de alteracoes minusculas no comportamento, repetidas consistentemente, formam-se habitos que conduzem a resultados extraordinarios.',
      updated_at: new Date().toISOString()
    },
    content: `# Hábitos Atômicos

**Autor:** James Clear
**Subtítulo:** Um Método Fácil e Comprovado para Construir Bons Hábitos e Abandonar os Ruins
**Ano:** 2018 | **Duração:** 25 min | **Avaliação:** 4.6/5

## Resumo Executivo

Atomic Habits revela que a chave para grandes mudanças na vida não exige revoluções comportamentais ou reinvenção pessoal. Através de alterações minúsculas no comportamento, repetidas consistentemente, formam-se hábitos que conduzem a resultados extraordinários.

## Introdução

Que mudança positiva você gostaria de fazer na sua vida? Talvez comer mais saudável, ler mais livros, aprender um novo idioma ou dominar um instrumento musical. Qualquer que seja a mudança desejada, efetivamente realizá-la e mantê-la é mais fácil na teoria do que na prática.

## Capítulo 1: O Poder Surpreendente dos Pequenos Hábitos

Imagine um avião decolando de Los Angeles com destino a Nova York. O piloto insere todas as informações corretas, e o avião decola na direção certa. Mas imagine que, pouco após a decolagem, o piloto acidentalmente altera a rota em apenas 3,5 graus—quase nada. Ao final da viagem, os passageiros confusos desembarcariam em Washington DC, não em Nova York.

**A lição:** Não percebemos mudanças minúsculas em nossas vidas. Pequenas mudanças deixam impacto imediato negligenciável. Se você está fora de forma hoje e faz uma corrida de 20 minutos, ainda estará fora de forma amanhã. Se come uma pizza família no jantar, não ficará acima do peso da noite para o dia.

**Porém:** Se repetirmos esses pequenos comportamentos dia após dia, nossas escolhas se acumulam em resultados significativos. Coma pizza todos os dias, e provavelmente terá ganho peso considerável após um ano. Corra 20 minutos diariamente, e eventualmente estará mais magro e em forma.

**Foque na trajetória, não nos resultados atuais.** Se você tem pouco dinheiro no banco mas está poupando algo mensalmente, sua trajetória está correta.

## Capítulo 2: Como os Hábitos são Formados

No século XIX, o psicólogo Edward Thorndike colocou gatos dentro de caixas pretas e cronometrou quanto tempo levavam para escapar. Inicialmente, cada gato se comportava exatamente como esperado—procurando desesperadamente uma saída. Eventualmente, o gato encontrava uma alavanca que abria uma porta.

Após ser colocado na caixa algumas vezes, cada gato aprendia o truque. Após 20 ou 30 tentativas, o gato médio conseguia escapar em apenas seis segundos. **O processo de sair da caixa havia se tornado habitual.**

**Descoberta de Thorndike:** Comportamentos que geram consequências satisfatórias tendem a ser repetidos até se tornarem automáticos.

**Os 4 elementos de um hábito:**
1. **Gatilho (Cue):** Estímulo que desencadeia ação
2. **Desejo (Craving):** Vontade de mudança de estado
3. **Resposta (Response):** A ação do hábito em si
4. **Recompensa (Reward):** Sentimento positivo ao completar

**Exemplo:** Beber café toda manhã. Acordar é o gatilho, despertando desejo de se sentir alerta. A resposta é levantar e fazer café. A recompensa é sentir-se acordado e pronto para o dia.

## Capítulo 3: Construindo Novos Hábitos

**Torne seu gatilho visível e impossível de perder.** Se você quer aprender violão, não guarde o instrumento no armário—deixe-o no meio da sala de estar.

**Intenções de Implementação:** Em vez de dizer "vou praticar violão esta semana," diga: "Na segunda, quarta e sexta, quando o alarme tocar, a primeira coisa que farei é pegar meu violão e praticar por uma hora."

**Estudo de Anne Thorndike:** Médica em Boston rearranjou a cafeteria do hospital—substituiu refrigerantes por água mineral nas geladeiras próximas aos caixas e colocou cestas de água por toda a cafeteria. Resultado: vendas de refrigerante caíram 11%, vendas de água subiram mais de 25%. Simplesmente criando mais gatilhos para beber água, pessoas fizeram escolhas mais saudáveis sem decisão consciente.

## Capítulo 4: Tornando Hábitos Atraentes

Em 1954, neurocientistas James Olds e Peter Milner bloquearam a liberação de dopamina em ratos. Resultado: os ratos simplesmente perderam a vontade de viver. Sem dopamina, não tinham desejo de comer, beber, reproduzir ou fazer qualquer outra coisa. Em poucos dias, morreram de sede.

**Dopamina é motivador crucial.** Quando fazemos algo benéfico para sobrevivência, dopamina é liberada e nos sentimos bem. Mas não precisamos realizar a atividade prazerosa para obter a dopamina—**a mera antecipação já é suficiente.**

**Agrupamento de Tentações (Temptation Bundling):** Vincule comportamento importante mas desagradável a comportamento pelo qual você é naturalmente atraído.

**Exemplo: Ronan Byrne**, estudante de engenharia irlandês, conectou uma bicicleta ergométrica ao laptop com código que só permitia Netflix se estivesse pedalando em certa velocidade. Transformou atividade detestável em prazerosa.

## Capítulo 5: Tornando Hábitos Fáceis

Comportamentos fáceis dominam nossas vidas. Rolamos redes sociais ou comemos salgadinhos porque são coisas fáceis. Fazer cem flexões ou estudar mandarim são difíceis e exigem muito esforço.

**Reduza a fricção:** A esposa de James Clear nunca perde ocasião de enviar cartões porque mantém uma caixa em casa, pré-organizada por ocasião. Isso reduz a fricção envolvida em enviar um.

**Aumente a fricção para maus hábitos:** Se quer perder menos tempo na TV, desconecte-a e tire as pilhas do controle remoto.

**Regra dos Dois Minutos:** Qualquer comportamento pode ser destilado em hábito realizável em dois minutos. Se quer ler mais, não se comprometa a ler um livro por semana—crie o hábito de ler duas páginas por noite. Se quer correr uma maratona, comprometa-se apenas a vestir sua roupa de corrida após o trabalho.

## Capítulo 6: Tornando Hábitos Satisfatórios

**História de Stephen Luby:** Pesquisador de saúde pública trabalhando em bairro de Karachi, Paquistão, reduziu diarreia infantil em 52%, pneumonia em 48% e infecções de pele em 35%. Seu segredo? **Sabonete agradável.**

Luby sabia que lavar as mãos era essencial para reduzir doenças. Os moradores também sabiam. Mas não transformavam conhecimento em hábito. Tudo mudou quando introduziu sabonete premium gratuito. O novo sabonete fazia espuma fácil e tinha aroma delicioso. De repente, todos lavavam as mãos porque era atividade prazerosa.

**Vivemos em ambiente de retorno atrasado:** Você vai à academia de manhã, mas não perde peso da noite para o dia. Nossos cérebros evoluíram para ambiente de retorno imediato—nossos ancestrais focavam em preocupações imediatas como encontrar próxima refeição.

**Solução:** Anexe gratificação imediata a hábitos com retorno atrasado. Um casal queria comer fora menos e economizar. Abriram conta poupança chamada "Viagem à Europa." Cada vez que evitavam refeição fora, transferiam $50 para a conta. A satisfação de ver $50 entrando fornecia gratificação imediata necessária.

## Capítulo 7: Rastreamento e Contratos

**Rastreamento de Hábitos:** Benjamin Franklin mantinha caderno onde registrava adesão a 13 virtudes pessoais. Toda noite, registrava seu progresso. Use calendário ou diário, marcando cada dia que mantém comportamentos escolhidos.

**Contrato de Hábitos:** Bryan Harris, empreendedor de Nashville, assinou contrato com esposa e personal trainer comprometendo-se a atingir 200 libras. Definiu penalidades: se não rastreasse ingestão alimentar, pagaria $100 ao trainer; se não se pesasse, deveria $500 à esposa.

**A estratégia funcionou**—não apenas pelo medo de perder dinheiro, mas pelo medo de perder credibilidade perante duas pessoas importantes.

## Conclusão

**Mensagem Nuclear:** Uma mudança minúscula no comportamento não transformará sua vida da noite para o dia. Mas transforme esse comportamento em hábito diário, e absolutamente pode levar a grandes mudanças.

**Empilhamento de Hábitos:** Se quer começar a meditar mas tem dificuldade em encontrar tempo, empilhe sobre hábito existente. Comprometa-se a meditar toda manhã quando terminar seu café.`
  },
  {
    slug: 'pai_rico_pai_pobre',
    title: 'Pai Rico, Pai Pobre',
    metadata: {
      author: 'Robert T. Kiyosaki',
      original_title: 'Rich Dad, Poor Dad',
      subtitle: 'What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!',
      subtitle_pt: 'O Que os Ricos Ensinam a Seus Filhos Sobre Dinheiro',
      publish_year: 1997,
      publisher: 'Plata Publishing',
      language: 'en',
      translation_language: 'pt-BR',
      genre: 'Financas Pessoais',
      blinkist: {
        duration_minutes: 29,
        key_ideas_count: 9,
        rating: 4.5,
        total_ratings: 600,
        categories: ['Financas', 'Empreendedorismo', 'Negocios']
      },
      categories: ['Business & Economics', 'Self-Help', 'Finance'],
      keywords: ['Financas Pessoais', 'Investimentos', 'Ativos', 'Passivos', 'Empreendedorismo', 'Educacao Financeira', 'Riqueza'],
      links: {
        blinkist: 'https://www.blinkist.com/en/app/books/rich-dad-poor-dad-en',
        amazon: 'https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194'
      },
      chapters: [
        'Pessoas Ricas Nao Trabalham Por Dinheiro',
        'Identifique Ativos Reais e Invista Neles',
        'Cuide do Seu Proprio Negocio',
        'Entenda o Sistema Tributario',
        'A Maioria Nao Recebe Educacao Financeira',
        'Obtenha Educacao Financeira',
        'Inteligencia Financeira e Coragem',
        'Invista em Vez de Jogar Seguro',
        'Trabalhe Para Aprender Nao Para Ganhar'
      ],
      summary_brief: 'Rich Dad Poor Dad contrasta os conselhos financeiros de dois pais: o "pai pobre" que dizia "estude e consiga um bom emprego" e o "pai rico" que ensinou os segredos da riqueza—fazer seu dinheiro trabalhar para voce.',
      updated_at: new Date().toISOString()
    },
    content: `# Pai Rico, Pai Pobre

**Autor:** Robert T. Kiyosaki
**Subtítulo:** O Que os Ricos Ensinam a Seus Filhos Sobre Dinheiro—Que a Classe Pobre e Média Não Ensinam!
**Ano:** 1997 | **Duração:** 29 min | **Avaliação:** 4.5/5

## Resumo Executivo

Rich Dad, Poor Dad contrasta os conselhos financeiros de dois pais: o "pai pobre" (bem-educado mas financeiramente ingênuo) que dizia "estude muito e consiga um bom emprego," e o "pai rico" (pai de um amigo) que ensinou os verdadeiros segredos da riqueza—fazer seu dinheiro trabalhar para você.

## Introdução

O que seus pais lhe ensinaram sobre vida, dinheiro e carreira? Provavelmente disseram para ir à escola, estudar muito e conseguir um bom emprego depois. Acredite ou não, esse não é realmente um bom conselho—mas é o que a maioria dos pais diz aos filhos.

E na escola—o que você aprendeu sobre ganhar dinheiro? Provavelmente nada. Nunca nos ensinam o que precisamos saber para ficar e permanecer ricos. Mas essa informação existe: famílias ricas a passam de geração em geração.

## Lição 1: Pessoas Ricas Não Trabalham Por Dinheiro

Quando Robert tinha 9 anos e queria ficar rico, perguntou a seus pais como fazer. Seu "pai pobre" bem-educado respondeu: "Vá à escola, estude e encontre um bom emprego." Conselho familiar—mas equivocado.

Se você seguir essa orientação, passará a vida inteira quebrando as costas para aumentar seu salário, enquanto outros—governo, cobradores de contas e seus chefes—ficam com a maior parte da recompensa.

**Vida de trabalho por salário = Corrida dos Ratos**—a rotina interminável de trabalhar para todos menos para si mesmo.

**Pai rico** (pai de Mike, amigo de Robert) fez um acordo: ofereceu ensinar o que sabia sobre dinheiro se Robert trabalhasse para ele pelo mísero valor de 10 centavos por hora. Após semanas sendo mal pago, Robert voltou ao pai rico furioso e pronto para desistir.

"Você me explorou tempo suficiente, e não cumpriu sua promessa. Não me ensinou nada sobre dinheiro!"

Mas aí estava: **sua primeira lição.** Robert aprendeu que a vida frequentemente te empurra. E aprendeu que trabalhar por dinheiro não te torna rico.

## Lição 2: Identifique Ativos Reais e Invista Neles

**Os ricos ficam ricos fazendo seu dinheiro trabalhar para eles.** Em vez de gastar toda sua renda em futilidades e luxos, investem parte em ativos de vários tipos.

Pai rico explicou: **os ricos compram ativos, enquanto os menos abastados compram passivos**—frequentemente na crença equivocada de que são ativos.

**Ativo:** Qualquer coisa que adiciona dinheiro à sua carteira
**Passivo:** Qualquer coisa que retira dinheiro

**Exemplo: Casa própria** é frequentemente considerada ativo, certo? Na verdade, é um dos maiores passivos que você pode ter. Comprar casa frequentemente significa trabalhar a vida inteira para pagar hipoteca de 30 anos e impostos—retirando dinheiro da sua carteira.

**Fluxo de renda por perfil:**
- **Pessoa pobre:** Salário vai direto para despesas imediatas (aluguel, impostos, comida)
- **Pessoa de classe média:** Salário cobre despesas similares + passivos (hipoteca, empréstimos estudantis, cartões de crédito)
- **Pessoa rica:** Ativos geram dinheiro suficiente para prover e ainda sobra para reinvestir (ações, títulos, imóveis para alugar)

**Resultado:** Os ricos continuam ficando mais ricos.

## Lição 3: Cuide do Seu Próprio Negócio

Ninguém está dizendo para largar seu emprego. O que Kiyosaki enfatiza é a importância de "cuidar do seu próprio negócio"—zelar por suas próprias finanças e ganhar dinheiro também para si, não apenas para seu empregador.

**Diferença crucial:**
- **Sua profissão:** O que você faz 40 horas por semana para pagar contas
- **Seu negócio:** O que você investe tempo e dinheiro para crescer seus ativos

Pai pobre aconselhou Robert a focar em encontrar emprego seguro e bem-pago. Pai rico disse para começar a comprar ativos. Robert abriu seu primeiro negócio aos 9 anos—pagou a irmã de um amigo para alugar gibis para crianças do bairro. Outros faziam o trabalho, ele apenas coletava o dinheiro.

Quando mais velho, trabalhou longas horas como funcionário de grandes empresas como Xerox e Standard Oil—mas o tempo todo mantinha despesas e passivos baixos, investindo o que restava do salário em ativos geradores de renda.

## Lição 4: Entenda o Sistema Tributário

Pai rico culpava a fantasia de Robin Hood por inspirar o sistema tributário que desprezava. Assim como Robin Hood tirava dos ricos para dar aos pobres, o governo tenta tirar dos ricos para dar aos necessitados.

**Mas na visão de pai rico, não funciona.** É a classe média que acaba arcando com o fardo da tributação, não os ricos. Os ricos são espertos demais e bem-equipados demais para isso.

**Ferramenta dos ricos: Corporação.** Uma corporação pode gastar dólares pré-impostos e só é tributada sobre o que resta após despesas. Indivíduos, por outro lado, são tributados primeiro—e só então podem gastar o restante.

**Outra vantagem:** Se você forma uma corporação e ela falir, os proprietários perdem seu investimento—mas é só isso. Ninguém vem tomar seus pertences pessoais.

## Lição 5: A Maioria Não Recebe Educação Financeira

Crianças não são ensinadas sobre assuntos como poupança ou investimento, e consequentemente não entendem nada sobre juros compostos. Prova clara disso é que, hoje, até estudantes do ensino médio frequentemente estourou seus cartões de crédito.

Essa falta de treinamento em inteligência financeira é problema não apenas para jovens de hoje mas também para adultos altamente educados, muitos dos quais tomam decisões ruins com seu dinheiro.

**Nos Estados Unidos, 50% da força de trabalho não tem previdência.** E dos demais, quase 75 a 80% têm previdência ineficaz.

## Lição 6: Obtenha Educação Financeira

Você pode começar a jornada rumo à riqueza pessoal em qualquer ponto da vida—mas quanto mais cedo começar, melhor.

**Três passos:**

1. **Avalie suas finanças:** Olhe honestamente para seu estado financeiro atual. Com seu emprego atual, que tipo de renda pode esperar agora e no futuro?

2. **Defina metas financeiras:** Você pode dizer que quer aquela Mercedes ao seu alcance em cinco anos. A esposa de Kiyosaki, Kim, esperou quatro anos e eventualmente comprou sua Mercedes com ganhos de seus prédios de apartamentos.

3. **Construa inteligência financeira:** Considere isso investimento no maior ativo disponível: sua mente. Matricule-se em cursos e seminários de finanças, leia livros sobre o tema, e tente fazer networking com especialistas.

## Lição 7: Inteligência Financeira e Coragem

**A maior mudança que você provavelmente precisa fazer é aprender a assumir riscos.** No mundo real, frequentemente não são os inteligentes que avançam—são os ousados.

Por que pessoas estudiosas e inteligentes frequentemente lutam financeiramente? Seu medo da desaprovação social os impede de deixar a "corrida dos ratos" e enriquecer. E seu medo de perder dinheiro é tão poderoso que os impede de investir em ações ou outros ativos.

**Inteligência financeira = Conhecimento + Coragem**

Ao sentarem nas reuniões de negócios de pai rico, Robert e Mike aprenderam lição que a escola não poderia ensinar: no mundo real, sucesso exige coragem, não apenas trabalho duro.

## Lição 8: Invista em Vez de Jogar Seguro

Assumir riscos significa não ser sempre equilibrado e seguro com seu dinheiro—como quando você o coloca em contas correntes e poupanças básicas no banco.

**Em vez de jogar seguro, experimente investir em ações ou títulos.** Embora sejam considerados mais arriscados que contas bancárias típicas, têm chance de gerar muito, muito mais riqueza.

**Certificados de garantia tributária:** Taxas de juros variam entre 8% e 30%—muito mais altas que 0,21%, que era a taxa média de poupança nos EUA em 2013.

**Claro:** Quanto maior o potencial de retorno, maior o risco. Com ações, sempre há pequena chance de perder todo o investimento. Mas se você não assumir o risco inicialmente, está garantido que não terá grandes retornos.

## Lição 9: Trabalhe Para Aprender, Não Para Ganhar

Quando Robert se formou na faculdade, conseguiu emprego estável e bem-pago quase imediatamente. Para a maioria das pessoas, seria um sonho realizado. Após cerca de seis meses, ele pediu demissão e entrou no Corpo de Fuzileiros Navais para aprender a pilotar.

Pai pobre ficou perplexo—mas pai rico o parabenizou. Por quê? Porque entendia exatamente o que Robert estava fazendo. Ele não estava tentando ganhar um salário estável—**estava tentando aprender.**

**Pai rico havia incutido nele:** Saber um pouco sobre muita coisa é importante para quem quer ganhar dinheiro.

No mundo acadêmico, quanto mais alto você vai, mais estreito seu tema de estudo se torna. Médicos frequentemente se especializam em único campo escolhido assim que se formam.

Pai rico, por outro lado, tinha ampla base de conhecimento—mas nunca terminou a oitava série. Por isso encorajou Robert e Mike a passar tempo em departamentos variados de seu império empresarial: restaurantes, construção, vendas, marketing, contabilidade.

## Conclusão

**As 6 Lições de Pai Rico:**

1. **Os ricos não trabalham por dinheiro** — Fazem o dinheiro trabalhar para eles
2. **Eduque-se sobre finanças** — Identifique ativos reais e invista neles
3. **Cuide do seu próprio negócio** — Mantenha despesas baixas, tenha negócio paralelo
4. **Conheça o sistema tributário** — É o que pessoas ricas fazem
5. **Fazer dinheiro exige ousadia** — Aproveite oportunidades da vida
6. **Trabalhe para aprender** — Deixe especialização para PhDs e médicos`
  }
];

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main() {
  console.log('📚 Update Books Content');
  console.log('='.repeat(60));
  console.log(`   Books to update: ${BOOKS_TO_UPDATE.length}\n`);

  const stats = { updated: 0, notFound: 0, errors: [] };

  for (const book of BOOKS_TO_UPDATE) {
    console.log(`\n📖 ${book.title}`);
    console.log(`   slug: ${book.slug}`);

    // Find existing book
    const { data: existingBook, error: findError } = await supabase
      .from('contents')
      .select('id, slug, title, metadata')
      .eq('slug', book.slug)
      .single();

    if (findError || !existingBook) {
      console.log(`   ❌ Book not found`);
      stats.notFound++;
      continue;
    }

    console.log(`   📍 Found: ${existingBook.id}`);

    // Merge existing metadata with new metadata
    const mergedMetadata = {
      ...existingBook.metadata,
      ...book.metadata,
      previous_version: existingBook.metadata?.updated_at || existingBook.metadata?.imported_at,
      updated_at: new Date().toISOString()
    };

    // Update book
    const { error: updateError } = await supabase
      .from('contents')
      .update({
        content: book.content,
        metadata: mergedMetadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingBook.id);

    if (updateError) {
      console.log(`   ❌ Update failed: ${updateError.message}`);
      stats.errors.push({ book: book.slug, error: updateError.message });
      continue;
    }

    console.log(`   ✅ Updated successfully`);
    console.log(`   📝 Content length: ${book.content.length} chars`);
    stats.updated++;
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`   Updated:   ${stats.updated}`);
  console.log(`   Not found: ${stats.notFound}`);
  console.log(`   Errors:    ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    stats.errors.forEach(e => console.log(`   - ${e.book}: ${e.error}`));
  }

  console.log('\n✅ DONE!');
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
