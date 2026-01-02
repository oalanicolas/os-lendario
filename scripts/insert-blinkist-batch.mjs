#!/usr/bin/env node
/**
 * Script: insert-blinkist-batch.mjs
 * Inserts multiple Blinkist book summaries into the database
 *
 * Books in this batch:
 * 1. Atomic Habits - James Clear
 * 2. Mindset - Carol Dweck
 * 3. Rich Dad, Poor Dad - Robert T. Kiyosaki
 * 4. Influence - Robert B. Cialdini
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
const DRY_RUN = process.argv.includes('--dry-run');

// ============================================================================
// BOOK DATA
// ============================================================================

const BOOKS = [
  {
    slug: 'habitos_atomicos',
    title: 'Hábitos Atômicos',
    author: {
      slug: 'james_clear',
      name: 'James Clear',
      bio: 'Autor de "Atomic Habits". Escritor e palestrante focado em habitos, tomada de decisao e melhoria continua. Seu trabalho apareceu no New York Times, Time e Entrepreneur.'
    },
    categories: ['productivity', 'psychology', 'motivation'],
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
      summary_brief: 'Atomic Habits revela que a chave para grandes mudancas na vida nao exige revolucoes comportamentais. Atraves de alteracoes minusculas no comportamento, repetidas consistentemente, formam-se habitos que conduzem a resultados extraordinarios.'
    },
    content: `# Hábitos Atômicos

**Autor:** James Clear
**Subtítulo:** Um Método Fácil e Comprovado para Construir Bons Hábitos e Abandonar os Ruins
**Ano:** 2018 | **Duração:** 25 min | **Avaliação:** 4.6/5

## Resumo Executivo

Atomic Habits revela que a chave para grandes mudanças na vida não exige revoluções comportamentais ou reinvenção pessoal. Através de alterações minúsculas no comportamento, repetidas consistentemente, formam-se hábitos que conduzem a resultados extraordinários.

## Capítulo 1: O Poder Surpreendente dos Pequenos Hábitos

Imagine um avião decolando de Los Angeles com destino a Nova York. O piloto insere todas as informações corretas, e o avião decola na direção certa. Mas imagine que, pouco após a decolagem, o piloto acidentalmente altera a rota em apenas 3,5 graus—quase nada. Ao final da viagem, os passageiros confusos desembarcariam em Washington DC, não em Nova York.

**A lição:** Não percebemos mudanças minúsculas em nossas vidas. Pequenas mudanças deixam impacto imediato negligenciável. Se você está fora de forma hoje e faz uma corrida de 20 minutos, ainda estará fora de forma amanhã. Se come uma pizza família no jantar, não ficará acima do peso da noite para o dia.

**Porém:** Se repetirmos esses pequenos comportamentos dia após dia, nossas escolhas se acumulam em resultados significativos. Coma pizza todos os dias, e provavelmente terá ganho peso considerável após um ano. Corra 20 minutos diariamente, e eventualmente estará mais magro e em forma.

**Foque na trajetória, não nos resultados atuais.**

## Capítulo 2: Como os Hábitos são Formados

No século XIX, o psicólogo Edward Thorndike colocou gatos dentro de caixas pretas e cronometrou quanto tempo levavam para escapar. Após ser colocado na caixa algumas vezes, cada gato aprendia o truque. O processo de sair da caixa havia se tornado habitual.

**Descoberta de Thorndike:** Comportamentos que geram consequências satisfatórias tendem a ser repetidos até se tornarem automáticos.

**Os 4 elementos de um hábito:**
1. **Gatilho (Cue):** Estímulo que desencadeia ação
2. **Desejo (Craving):** Vontade de mudança de estado
3. **Resposta (Response):** A ação do hábito em si
4. **Recompensa (Reward):** Sentimento positivo ao completar

## Capítulo 3: Construindo Novos Hábitos

**Torne seu gatilho visível e impossível de perder.** Se você quer aprender violão, não guarde o instrumento no armário—deixe-o no meio da sala de estar.

**Intenções de Implementação:** Em vez de dizer "vou praticar violão esta semana," diga: "Na segunda, quarta e sexta, quando o alarme tocar, a primeira coisa que farei é pegar meu violão e praticar por uma hora."

## Capítulo 4: Tornando Hábitos Atraentes

**Dopamina é motivador crucial.** A mera antecipação de algo prazeroso já é suficiente para liberar dopamina.

**Agrupamento de Tentações (Temptation Bundling):** Vincule comportamento importante mas desagradável a comportamento pelo qual você é naturalmente atraído. Exemplo: Ronan Byrne conectou bicicleta ergométrica ao laptop com código que só permitia Netflix se estivesse pedalando.

## Capítulo 5: Tornando Hábitos Fáceis

**Reduza a fricção:** A esposa de James Clear mantém caixa de cartões pré-organizada por ocasião.

**Aumente a fricção para maus hábitos:** Desconecte a TV e tire as pilhas do controle remoto.

**Regra dos Dois Minutos:** Qualquer comportamento pode ser destilado em hábito realizável em dois minutos. Se quer ler mais, crie o hábito de ler duas páginas por noite.

## Capítulo 6: Tornando Hábitos Satisfatórios

**História de Stephen Luby:** Reduziu diarreia infantil em 52% em Karachi introduzindo sabonete premium que fazia espuma fácil e tinha aroma delicioso. Lavar as mãos tornou-se atividade prazerosa.

**Solução para retorno atrasado:** Anexe gratificação imediata a hábitos. Um casal transferia $50 para conta "Viagem à Europa" cada vez que evitavam comer fora.

## Capítulo 7: Rastreamento e Contratos

**Rastreamento de Hábitos:** Benjamin Franklin registrava adesão a 13 virtudes pessoais toda noite.

**Contrato de Hábitos:** Bryan Harris assinou contrato com esposa e personal trainer com penalidades financeiras.

## Conclusão

**Mensagem Nuclear:** Uma mudança minúscula no comportamento não transformará sua vida da noite para o dia. Mas transforme esse comportamento em hábito diário, e absolutamente pode levar a grandes mudanças.

**Empilhamento de Hábitos:** Comprometa-se a meditar toda manhã quando terminar seu café.`
  },
  {
    slug: 'mindset_a_nova_psicologia_do_sucesso',
    title: 'Mindset: A Nova Psicologia do Sucesso',
    author: {
      slug: 'carol_dweck',
      name: 'Carol Dweck',
      bio: 'Psicologa da Universidade Stanford, pioneira na pesquisa sobre mentalidade e motivacao. Seu trabalho transformou a compreensao sobre como pessoas aprendem e desenvolvem suas habilidades.'
    },
    categories: ['psychology', 'education', 'motivation'],
    metadata: {
      author: 'Carol Dweck',
      original_title: 'Mindset',
      subtitle: 'The New Psychology of Success',
      subtitle_pt: 'A Nova Psicologia do Sucesso',
      publish_year: 2006,
      publisher: 'Ballantine Books',
      language: 'en',
      translation_language: 'pt-BR',
      genre: 'Psicologia e Autodesenvolvimento',
      blinkist: {
        duration_minutes: 15,
        key_ideas_count: 7,
        rating: 4.4,
        total_ratings: 350,
        categories: ['Psicologia', 'Educacao', 'Motivacao']
      },
      categories: ['Psychology', 'Self-Help', 'Education'],
      keywords: ['Mentalidade', 'Crescimento', 'Aprendizado', 'Sucesso', 'Psicologia', 'Desenvolvimento Pessoal'],
      links: {
        blinkist: 'https://www.blinkist.com/en/app/books/mindset-en',
        amazon: 'https://www.amazon.com/Mindset-Psychology-Carol-S-Dweck/dp/0345472322'
      },
      chapters: [
        'A Mentalidade Fixa',
        'A Mentalidade de Crescimento',
        'Busca por Aprovacao vs Desenvolvimento',
        'Fracassos como Desastres vs Oportunidades',
        'Evitar vs Abracar Dificuldades',
        'A Influencia dos Modelos',
        'Qualquer Um Pode Adotar Mentalidade de Crescimento'
      ],
      summary_brief: 'Nossa mentalidade molda se acreditamos que podemos aprender, mudar e crescer. Pessoas com mentalidade de crescimento acreditam que podem se tornar virtuosos em qualquer coisa se se esforcarem suficientemente.'
    },
    content: `# Mindset: A Nova Psicologia do Sucesso

**Autor:** Carol Dweck
**Subtítulo:** A Nova Psicologia do Sucesso
**Ano:** 2006 | **Duração:** 15 min | **Avaliação:** 4.4/5

## Resumo Executivo

Nossa mentalidade molda se acreditamos que podemos aprender, mudar e crescer—ou não. Pessoas com mentalidade fixa acreditam que são naturalmente talentosas em algumas coisas mas completamente incapazes em outras. Pessoas com mentalidade de crescimento acreditam que podem se tornar virtuosos em qualquer coisa se se esforçarem suficientemente.

## Capítulo 1: A Mentalidade Fixa

Pessoas com mentalidade fixa acreditam que **talento é rei**. As habilidades de uma pessoa são definidas desde o início; uma pessoa é, por natureza, inteligente e talentosa ou estúpida e incompetente, e permanecerá assim.

**Exemplo: Grandes empresas** como Enron e McKinsey investem muito dinheiro em recrutar "talentos naturais" nas universidades. Os graduados contratados recebem pouco treinamento e não se espera que progridam—afinal, são tão talentosos que não precisam.

Pessoas com mentalidade fixa só acreditam poder fazer coisas para as quais mostram aptidão natural.

## Capítulo 2: A Mentalidade de Crescimento

Quando crianças com mentalidade de crescimento recebem problema de matemática difícil, **abraçam o desafio** e querem fazer mais problemas como aquele em casa.

O céu é o limite para crianças com mentalidade de crescimento. Suas notas refletem status em um momento no tempo, mas acreditam que podem aprender mais com trabalho árduo.

**Querem sentir a satisfação de se empurrar aos limites de seu potencial de crescimento.**

## Capítulo 3: Busca por Aprovação vs. Desenvolvimento

**Lee Iacocca** tornou-se CEO da Chrysler quando estava à beira do colapso. Conseguiu trazer a empresa de volta à vida. Mas depois começou a descansar sobre seus louros, exibindo superioridade. Mentalidade fixa em ação.

**Lou Gerstner** assumiu a IBM quando estava prestes a falir. Quebrou hierarquias, enfatizou trabalho em equipe, criou ambiente baseado em desenvolvimento compartilhado. Mentalidade de crescimento.

## Capítulo 4: Fracassos como Desastres vs. Oportunidades

**Sergio García**, golfista, demitiu caddies em acessos de raiva durante má fase. Pessoas com mentalidade fixa veem um único fracasso como evidência de que serão perdedores para sempre.

**Michael Jordan** praticou os arremessos que errou repetidamente. Ao final da carreira, tinha as melhores técnicas de arremesso da quadra.

## Capítulo 5: Evitar vs. Abraçar Dificuldades

**Nadja Salerno-Sonnenberg**, violinista aclamada, aos 18 anos parava de trazer violino às aulas por medo de falhar.

**Christopher Reeve**, após acidente que o deixou paralisado, passou por programa de treinamento rigoroso e conseguiu mover mãos, pernas e parte superior do corpo.

## Capítulo 6: A Influência dos Modelos

**Pais com mentalidade de crescimento** encorajam filhos a continuar aprendendo.
**Pais com mentalidade fixa** estão sempre julgando, dizendo o que é certo ou errado.

**Professores** que acreditam firmemente que alunos são capazes de aprender qualquer coisa mostram diferentes maneiras de resolver problemas.

## Capítulo 7: Qualquer Um Pode Adotar Mentalidade de Crescimento

**O cérebro pode ser treinado como qualquer outro músculo.**

Você deixa um prato cair. Primeiro pensamento—fixo: "Sou tão desajeitado!" Perspectiva de crescimento: "Essas coisas acontecem. Vou ser mais cuidadoso da próxima vez."

**Importante:** Mentalidade fixa provavelmente se tornou muleta emocional. Não é necessário abandoná-la completamente—desde que adotemos perspectiva de crescimento em certas situações.

## Conclusão

**Mensagem Nuclear:** Pessoas com mentalidade fixa obstruem seu próprio desenvolvimento através de crença em talento inato e medo de fracasso. Pessoas com mentalidade de crescimento trabalham e treinam arduamente para realizar plenamente seu potencial.`
  },
  {
    slug: 'pai_rico_pai_pobre',
    title: 'Pai Rico, Pai Pobre',
    author: {
      slug: 'robert_t_kiyosaki',
      name: 'Robert T. Kiyosaki',
      bio: 'Empresario, investidor e autor best-seller. Fundador da Rich Dad Company, empresa de educacao financeira. Defensor da educacao financeira e do empreendedorismo como caminho para liberdade financeira.'
    },
    categories: ['finance', 'entrepreneurship', 'business'],
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
      summary_brief: 'Rich Dad Poor Dad contrasta os conselhos financeiros de dois pais: o "pai pobre" que dizia "estude e consiga um bom emprego" e o "pai rico" que ensinou os segredos da riqueza—fazer seu dinheiro trabalhar para voce.'
    },
    content: `# Pai Rico, Pai Pobre

**Autor:** Robert T. Kiyosaki
**Subtítulo:** O Que os Ricos Ensinam a Seus Filhos Sobre Dinheiro
**Ano:** 1997 | **Duração:** 29 min | **Avaliação:** 4.5/5

## Resumo Executivo

Rich Dad, Poor Dad contrasta os conselhos financeiros de dois pais: o "pai pobre" (bem-educado mas financeiramente ingênuo) que dizia "estude muito e consiga um bom emprego," e o "pai rico" (pai de um amigo) que ensinou os verdadeiros segredos da riqueza—fazer seu dinheiro trabalhar para você.

## Lição 1: Pessoas Ricas Não Trabalham Por Dinheiro

Quando Robert tinha 9 anos e queria ficar rico, seu "pai pobre" respondeu: "Vá à escola, estude e encontre um bom emprego." Conselho familiar—mas equivocado.

Se você seguir essa orientação, passará a vida inteira na **Corrida dos Ratos**—a rotina interminável de trabalhar para todos menos para si mesmo.

**Pai rico** ofereceu ensinar sobre dinheiro se Robert trabalhasse por 10 centavos por hora. Após semanas sendo mal pago, Robert aprendeu sua primeira lição: **trabalhar por dinheiro não te torna rico.**

## Lição 2: Identifique Ativos Reais e Invista Neles

**Os ricos ficam ricos fazendo seu dinheiro trabalhar para eles.** Os ricos compram ativos, enquanto os menos abastados compram passivos.

**Ativo:** Qualquer coisa que adiciona dinheiro à sua carteira
**Passivo:** Qualquer coisa que retira dinheiro

**Exemplo: Casa própria** é frequentemente considerada ativo—mas é um dos maiores passivos. Comprar casa significa trabalhar a vida inteira para pagar hipoteca de 30 anos.

**Fluxo de renda:**
- **Pessoa pobre:** Salário vai para despesas imediatas
- **Pessoa de classe média:** Salário cobre despesas + passivos (hipoteca, empréstimos)
- **Pessoa rica:** Ativos geram dinheiro para prover e reinvestir

## Lição 3: Cuide do Seu Próprio Negócio

**Diferença crucial:**
- **Sua profissão:** O que você faz 40 horas por semana
- **Seu negócio:** O que você investe para crescer seus ativos

Robert abriu primeiro negócio aos 9 anos—pagou irmã de um amigo para alugar gibis para crianças. Outros faziam o trabalho, ele coletava o dinheiro.

## Lição 4: Entenda o Sistema Tributário

É a classe média que arca com o fardo da tributação, não os ricos.

**Ferramenta dos ricos: Corporação.** Uma corporação gasta dólares pré-impostos e só é tributada sobre o que resta. Indivíduos são tributados primeiro.

## Lição 5: A Maioria Não Recebe Educação Financeira

Crianças não são ensinadas sobre poupança ou investimento. Prova: estudantes do ensino médio frequentemente estouram cartões de crédito.

**Nos EUA, 50% da força de trabalho não tem previdência.**

## Lição 6: Obtenha Educação Financeira

**Três passos:**
1. **Avalie suas finanças:** Olhe honestamente para seu estado atual
2. **Defina metas financeiras:** A esposa de Kiyosaki esperou 4 anos e comprou Mercedes com ganhos de prédios de apartamentos
3. **Construa inteligência financeira:** Cursos, seminários, livros, networking

## Lição 7: Inteligência Financeira e Coragem

No mundo real, frequentemente não são os inteligentes que avançam—**são os ousados.**

Medo de desaprovação social impede pessoas de deixar a "corrida dos ratos". Medo de perder dinheiro impede de investir.

**Inteligência financeira = Conhecimento + Coragem**

## Lição 8: Invista em Vez de Jogar Seguro

**Experimente investir em ações ou títulos.** Embora mais arriscados que contas bancárias, têm chance de gerar muito mais riqueza.

**Certificados de garantia tributária:** Juros de 8% a 30%—muito mais que 0,21% da poupança média.

Quanto maior o potencial de retorno, maior o risco. Mas se não assumir risco, está garantido que não terá grandes retornos.

## Lição 9: Trabalhe Para Aprender, Não Para Ganhar

Após faculdade, Robert conseguiu emprego estável e bem-pago. Após seis meses, pediu demissão e entrou nos Fuzileiros Navais para aprender a pilotar.

**Pai rico entendia:** Saber um pouco sobre muita coisa é importante para quem quer ganhar dinheiro.

No mundo acadêmico, quanto mais alto, mais estreito o tema. Pai rico encorajou Robert a trabalhar em departamentos variados de seu império: restaurantes, construção, vendas, marketing, contabilidade.

## Conclusão

**As 6 Lições de Pai Rico:**
1. Os ricos não trabalham por dinheiro—fazem dinheiro trabalhar para eles
2. Eduque-se sobre finanças—identifique ativos reais
3. Cuide do seu próprio negócio
4. Conheça o sistema tributário
5. Fazer dinheiro exige ousadia
6. Trabalhe para aprender—deixe especialização para PhDs`
  },
  {
    slug: 'as_armas_da_persuasao',
    title: 'As Armas da Persuasão',
    author: {
      slug: 'robert_b_cialdini',
      name: 'Robert B. Cialdini',
      bio: 'Professor emerito de Psicologia e Marketing na Arizona State University. Considerado o principal especialista mundial em influencia e persuasao. Seu livro "Influence" vendeu mais de 5 milhoes de copias.'
    },
    categories: ['psychology', 'marketing', 'communication'],
    metadata: {
      author: 'Robert B. Cialdini',
      original_title: 'Influence',
      subtitle: 'The Psychology of Persuasion',
      subtitle_pt: 'A Psicologia da Persuasao',
      publish_year: 1984,
      publisher: 'Harper Business',
      language: 'en',
      translation_language: 'pt-BR',
      genre: 'Psicologia e Marketing',
      blinkist: {
        duration_minutes: 33,
        key_ideas_count: 11,
        rating: 4.5,
        total_ratings: 450,
        categories: ['Psicologia', 'Marketing', 'Comunicacao']
      },
      categories: ['Psychology', 'Business & Economics', 'Self-Help'],
      keywords: ['Persuasao', 'Influencia', 'Psicologia', 'Marketing', 'Vendas', 'Comportamento Humano', 'Manipulacao'],
      links: {
        blinkist: 'https://www.blinkist.com/en/app/books/influence-en',
        amazon: 'https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X'
      },
      chapters: [
        'Atalhos Mentais',
        'Reciprocidade',
        'Rejeicao-Entao-Recuo',
        'Escassez',
        'Proibicao Torna Desejavel',
        'Consistencia',
        'Quanto Mais Dificil Mais Valorizamos',
        'Prova Social',
        'Similaridade Influencia Escolhas',
        'Cumprimos Pedidos de Pessoas Que Gostamos',
        'Obedecemos Autoridades Sem Questionar'
      ],
      summary_brief: 'Influence revela os seis principios fundamentais de persuasao que profissionais de conformidade empregam para nos fazer cumprir seus pedidos. Apos compreende-los, voce podera se defender do engano.'
    },
    content: `# As Armas da Persuasão

**Autor:** Robert B. Cialdini
**Subtítulo:** A Psicologia da Persuasão
**Ano:** 1984 | **Duração:** 33 min | **Avaliação:** 4.5/5

## Resumo Executivo

Influence revela os seis princípios fundamentais de manipulação que profissionais de conformidade—como publicitários, vendedores e vigaristas—empregam para nos fazer cumprir seus pedidos. Após compreendê-los, você não apenas será capaz de se defender do engano, mas também poderá colocar essas técnicas em uso você mesmo.

**Os 6 princípios fundamentais de persuasão:**
1. Reciprocidade
2. Escassez
3. Consistência
4. Prova Social
5. Afinidade
6. Autoridade

## Capítulo 1: Atalhos Mentais

Mães peru cuidam de filhotes que emitem "piu-piu." Se o filhote não emitir, a mãe o ignorará ou matará!

**Nós humanos usamos atalhos psicológicos similares.** O mundo é complexo demais para refletir sobre cada decisão.

**Experimento da copiadora:** "Posso furar a fila porque estou com pressa?"—94% concordaram. Sem razão: 60%. Com razão sem sentido ("porque preciso fazer cópias"): 93% ainda concordaram!

Profissionais de conformidade nos enganam a usar nossos atalhos contra nossos interesses.

## Capítulo 2: Reciprocidade - A Necessidade de Retribuir Favores

**Regra da reciprocidade:** Sentimos obrigação de retribuir favores. Essa regra forma a fundação de todas as sociedades.

**Estudo de Dennis Regan:** Pesquisador "Joe" comprou Coca-Cola de 10 centavos para participantes. Depois, Joe vendia rifas. Participantes que receberam Coca compraram o **dobro** de rifas.

**Os Hare Krishna** presenteavam flores a pedestres e, embora irritadas, pessoas frequentemente faziam doações para reciprocar.

**Defesa:** Pergunte-se se favores são genuínos ou tentativas de manipulação.

## Capítulo 3: Rejeição-Então-Recuo

Quando alguém faz concessão, sentimos obrigação de reciprocá-la.

**Experiência do escoteiro:** Menino queria vender ingressos de $5. Autor recusou. Menino perguntou se compraria barras de chocolate de $1. Resultado: autor comprou duas para igualar a "concessão."

**Princípio do contraste:** Quando dois itens são apresentados em sequência, a diferença do segundo para o primeiro é ampliada.

## Capítulo 4: Escassez - Quanto Mais Raro, Mais Desejado

"Por tempo limitado!" "Última chance!" "Promoção termina em dois dias!"

**Princípio da escassez:** Quando algo é difícil de obter, ficamos mais inclinados a comprá-lo. Odiamos perder oportunidades.

**Estudo de 1982:** Informados de promoção por tempo limitado, compradores compraram 3x mais carne. Se informados que apenas poucos sabiam: **6x mais!**

**Duas condições:**
1. Queremos mais se disponibilidade diminuiu recentemente
2. Competição acelera nossos corações

## Capítulo 5: Proibição Torna Desejável

**Censura é faca de dois gumes:** Quando informação é banida, é percebida como mais valiosa.

**Estudo na Carolina do Norte:** Quando estudantes souberam que discurso seria banido, tornaram-se simpáticos à ideia—**sem ter ouvido uma palavra!**

**Efeito Romeu e Julieta:** Pais que erguem barreiras frequentemente intensificam a atração dos amantes.

## Capítulo 6: Consistência - Queremos Manter Nossa Palavra

**Estudo na praia:** Quando dono da toalha pediu "vigie minhas coisas," **95%** dos vizinhos perseguiram o ladrão encenado—vs. 20% sem o pedido.

**Compromisso público é o mais poderoso.** Interrogadores chineses faziam prisioneiros americanos escrever declarações inocentes, lê-las publicamente, e gradualmente os prisioneiros começavam a se ver como "colaboradores."

**Técnica "pé na porta":** Pequena compra muda autopercepção para "cliente," tornando receptivo ao negócio maior.

## Capítulo 7: Quanto Mais Difícil, Mais Valorizamos

De tribos africanas a fraternidades universitárias, rituais de iniciação envolvem dor e degradação.

**Por quê?** Se pessoas passam por muito trabalho para obter algo, tendem a valorizá-lo mais.

**Truque "lowball":** Concessionário oferece preço surpreendentemente barato. Durante test drive, construímos outras razões para comprar. No último minuto, preço sobe—mas ainda compramos por causa das razões que inventamos.

**Defesa:** Pergunte-se se compraria pelo preço verdadeiro desde o início.

## Capítulo 8: Prova Social - Olhamos Para Outros Quando Incertos

Por que sitcoms têm risadas gravadas? Nos fazem rir mais, especialmente de piadas ruins.

**Princípio da prova social:** Decidimos qual curso de ação é correto olhando para comportamento de outros.

**Caso Kitty Genovese:** Mulher esfaqueada em Nova York, vizinhos não ajudaram.

**Efeito espectador:** Pessoas são menos propensas a ajudar vítima se outras pessoas estão presentes.

**Se entrar em emergência:** Escolha um indivíduo e direcione pedido claro: "Você, de camisa verde, chame uma ambulância."

## Capítulo 9: Similaridade Influencia Escolhas

**Efeito Werther:** Quando suicídio é divulgado na mídia, número de pessoas que morrem em acidentes aumenta na semana seguinte.

O efeito é mais forte para pessoas similares à vítima: jovens reagem a suicídios de jovens.

Por isso marqueteiros usam "pessoas comuns na rua" que endossam produtos.

## Capítulo 10: Cumprimos Pedidos de Pessoas Que Gostamos

Festas Tupperware alavancam isso: convite vem de um amigo, não do apresentador.

**Fatores que nos fazem gostar:**
1. **Elogios:** Somos otários por bajulação
2. **Similaridade:** Gostamos de pessoas similares
3. **Atratividade física:** Produz "efeito halo"
4. **Cooperação:** Ver alguém como "do mesmo time"

**Técnica policial bom/mau:** Policial "bom" defende suspeito, parecendo confidente—provocando confissão.

## Capítulo 11: Obedecemos Autoridades Sem Questionar

Desde o nascimento, somos ensinados a obedecer figuras de autoridade.

**Estudo de Stanley Milgram:** Voluntários administrariam choques potencialmente letais simplesmente porque foram mandados por figura de autoridade.

**Símbolos de autoridade são poderosos:**
- **Títulos:** Vemos professores como fisicamente mais altos!
- **Roupas:** Jaleco branco e prancheta convenceram participantes

**Defesa:**
1. Essa pessoa é realmente autoridade? Credenciais válidas para essa situação?
2. Quão honesta podemos esperar que seja? Tem nossos ou seus interesses em mente?

## Conclusão

**Mensagem Nuclear:** Humanos usam atalhos previsíveis para guiar decisões. Profissionais de conformidade se aproveitam dessas reações pré-programadas.

**Os 6 Princípios:**
1. **Reciprocidade:** Retribuir favores
2. **Escassez:** Quanto mais raro, mais desejado
3. **Consistência:** Manter nossa palavra
4. **Prova Social:** Olhar para outros
5. **Afinidade:** Atender pessoas que gostamos
6. **Autoridade:** Obedecer autoridades

Como não podemos parar de usar esses atalhos, devemos aprender a nos defender dos manipuladores.`
  }
];

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main() {
  console.log('📚 Insert Blinkist Books Batch');
  console.log('='.repeat(60));
  console.log(`   Books to insert: ${BOOKS.length}`);
  if (DRY_RUN) console.log('   🔍 DRY-RUN MODE\n');
  console.log('');

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

  const stats = {
    booksCreated: 0,
    booksSkipped: 0,
    authorsCreated: 0,
    authorsExisting: 0,
    tagsLinked: 0,
    errors: []
  };

  for (const book of BOOKS) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📖 ${book.title}`);
    console.log(`   by ${book.author.name}`);
    console.log(`${'─'.repeat(60)}`);

    // Check if book exists
    const { data: existingBook } = await supabase
      .from('contents')
      .select('id')
      .eq('slug', book.slug)
      .single();

    if (existingBook) {
      console.log(`   ⏭️  Book already exists, skipping`);
      stats.booksSkipped++;
      continue;
    }

    // Get or create author
    let authorId;
    const { data: existingAuthor } = await supabase
      .from('minds')
      .select('id, name')
      .eq('slug', book.author.slug)
      .single();

    if (existingAuthor) {
      authorId = existingAuthor.id;
      console.log(`   👤 Author exists: ${existingAuthor.name}`);
      stats.authorsExisting++;
    } else if (!DRY_RUN) {
      const { data: newAuthor, error: authorError } = await supabase
        .from('minds')
        .insert({
          slug: book.author.slug,
          name: book.author.name,
          short_bio: book.author.bio,
          privacy_level: 'public'
        })
        .select('id, name')
        .single();

      if (authorError) {
        console.log(`   ❌ Failed to create author: ${authorError.message}`);
        stats.errors.push({ book: book.slug, error: authorError.message });
        continue;
      }
      authorId = newAuthor.id;
      console.log(`   👤 Created author: ${newAuthor.name}`);
      stats.authorsCreated++;
    } else {
      console.log(`   [DRY-RUN] Would create author: ${book.author.name}`);
      stats.authorsCreated++;
    }

    // Create book content
    if (!DRY_RUN) {
      const { data: newBook, error: bookError } = await supabase
        .from('contents')
        .insert({
          slug: book.slug,
          title: book.title,
          content_type: 'book_summary',
          project_id: project.id,
          status: 'published',
          content: book.content,
          metadata: { ...book.metadata, imported_at: new Date().toISOString() }
        })
        .select('id')
        .single();

      if (bookError) {
        console.log(`   ❌ Failed to create book: ${bookError.message}`);
        stats.errors.push({ book: book.slug, error: bookError.message });
        continue;
      }
      console.log(`   📗 Created book: ${book.title}`);
      stats.booksCreated++;

      // Link author to book
      const { error: linkError } = await supabase
        .from('content_minds')
        .insert({
          content_id: newBook.id,
          mind_id: authorId,
          role: 'author'
        });

      if (linkError && !linkError.message.includes('duplicate')) {
        console.log(`   ⚠️  Author link error: ${linkError.message}`);
      } else {
        console.log(`   🔗 Linked author`);
      }

      // Link to category tags
      for (const categorySlug of book.categories) {
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
            console.log(`   🏷️  Tagged: ${tag.name}`);
            stats.tagsLinked++;
          }
        } else {
          console.log(`   ⚠️  Tag not found: ${categorySlug}`);
        }
      }
    } else {
      console.log(`   [DRY-RUN] Would create book: ${book.title}`);
      stats.booksCreated++;
    }
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`   Books created:    ${stats.booksCreated}`);
  console.log(`   Books skipped:    ${stats.booksSkipped}`);
  console.log(`   Authors created:  ${stats.authorsCreated}`);
  console.log(`   Authors existing: ${stats.authorsExisting}`);
  console.log(`   Tags linked:      ${stats.tagsLinked}`);
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
