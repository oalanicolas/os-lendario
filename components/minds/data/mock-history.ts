import { HistoryEvent } from '../templates/HistoryTab';

export const MOCK_HISTORY_DATA: HistoryEvent[] = [
  // === ANTES DE 2014 ===
  {
    id: 'origin-1',
    year: 'Infancia',
    title: 'Guajuviras - A Forja',
    description:
      'Cresceu em um bairro pobre e perigoso da grande Porto Alegre. Infancia marcada por dificuldades financeiras, incluindo cortes de energia e agua.',
    details: [
      '[[Contexto]] Familia de classe baixa, escassez como realidade cotidiana',
      '[[4-5 anos]] Curiosidade extrema, questionando tudo. Aprende a ler precocemente aos 5 anos',
      '[[Formacao]] A adversidade forjou resiliencia e determinacao que definiram o carater',
    ],
    type: 'origin',
  },
  {
    id: 'origin-2',
    year: 'Adolescencia',
    title: 'Forca Aerea - A Rejeicao Redentora',
    description:
      'Treinou 14 meses para servir na Forca Aerea, mas foi reprovado. O oficial que o reprovou o aconselhou a seguir outro caminho.',
    details: [
      '[[Dedicacao]] 14 meses de treinamento intenso',
      '[[Virada]] A rejeicao se tornou um ponto de virada positivo em retrospectiva',
      '[[Licao]] Nem toda porta fechada e uma derrota - algumas sao redirecionamentos',
    ],
    type: 'pivot',
  },
  {
    id: 'origin-3',
    year: 'Juventude',
    title: 'O Colecionador de Experiencias',
    description:
      'Multiplas experiencias profissionais: cabo man, iluminador, cinegrafista, professor de piano e violao, manutencao de computadores, vendedor.',
    details: [
      '[[Versatilidade]] Trabalhou em eventos, musica, tecnologia e comercio',
      '[[Busca]] Demonstracao de inquietude e busca pelo verdadeiro caminho',
      '[[Fundacao]] Cada experiencia adicionou uma camada a "salada de frutas" de habilidades',
    ],
    type: 'learning',
  },
  {
    id: 'mentor-1',
    year: '2011',
    title: 'Primeiro Mentor - A Licao da Confianca',
    description:
      'Aos 21 anos, conheceu um mentor que havia criado uma multinacional. Convidado para abrir empresa de delivery online, mas o projeto nao foi adiante.',
    details: [
      '[[Ironia]] Falaram sobre importancia da confianca, mas o mentor temeu que Alan roubasse sua ideia',
      '[[Aprendizado]] A desconfianca dos outros nao define seu valor',
      '[[Padrao]] Primeira experiencia com a contradicao entre discurso e acao',
    ],
    type: 'learning',
  },
  {
    id: 'ingles-1',
    year: '2013',
    title: 'O Despertar do Ingles',
    description:
      'Evento de JavaScript em Porto Alegre expoe a barreira do idioma. Nao consegue entender as palestras nem um video comico com uma colega.',
    details: [
      '[[Humilhacao produtiva]] A vergonha de nao entender criou urgencia para aprender',
      '[[Decisao]] Comeca a estudar ingles "para valer" em 2012',
      '[[Resultado]] Fluencia que abriu portas para conhecimento global',
    ],
    type: 'learning',
  },

  // === 2014 - O ANO DA VIRADA ===
  {
    id: 'livro-1',
    year: '2014',
    title: 'Trabalhe 4 Horas por Semana',
    description:
      'Leitura do livro de Tim Ferriss causa impacto profundo na mentalidade sobre trabalho e dinheiro. Dispara leitura de 128 livros no ano seguinte.',
    details: [
      '[[Paradigma quebrado]] Primeira exposicao a ideia de alavancagem e automacao',
      '[[Efeito cascata]] Leva ao estudo de minimalismo e Lei de Pareto',
      '[[Conexoes]] Comeca a conversar com pessoas do mercado digital como Mairo Vergara',
      '[[Metodo]] Passa a aplicar modelagem, inspirado por Anthony Robbins',
    ],
    type: 'pivot',
  },

  // === 2015 ===
  {
    id: '2015-1',
    year: '2015',
    title: 'Florianopolis - O Grande Salto',
    description:
      'Mudanca para Florianopolis marca inicio da jornada de desenvolvimento pessoal e entrada no marketing digital.',
    details: [
      '[[Quadro da Visao]] Criacao da ferramenta de visualizacao de objetivos',
      '[[Sindrome do Impostor]] Sentimento de nao ser bom o suficiente ao compartilhar conhecimento',
      '[[Superacao]] Comeca a palestrar e se torna referencia em funis de conversao',
      '[[Fundacao]] Co-funda empresa que se tornara lider em marketing direto',
    ],
    type: 'pivot',
  },

  // === 2016 ===
  {
    id: '2016-1',
    year: '2016',
    title: '"Eu Ja Sou Milionario"',
    description:
      'Declara para sua mae que ja e milionario, antecipando uma conquista que ainda nao havia materializado.',
    details: [
      '[[Principio]] "Primeiro seja, para depois ter" - identidade antes de resultados',
      '[[Premio Hotmart]] Ganha premio e viaja para conhecer a sede da empresa',
      '[[Profecia]] A declaracao se tornaria realidade 1 ano e 4 meses depois',
    ],
    type: 'milestone',
  },

  // === 2017 ===
  {
    id: '2017-1',
    year: '2017',
    title: 'El Funileiro - O Reconhecimento',
    description:
      'Torna-se referencia nacional em funis de alta conversao. Ajuda clientes a recuperarem mais de R$10 milhoes em vendas perdidas.',
    details: [
      '[[Autoridade]] Recebe livro autografado da InfusionSoft',
      '[[Essencialismo]] Leitura do livro de Greg McKeown se torna marco de vida',
      '[[Familia]] Convida a irma para trabalhar em Florianopolis, ensinando gestao de trafego',
      '[[Reflexao]] Comeca a usar "Se eu morrer hoje, pelo que gostaria de ser lembrado?"',
    ],
    type: 'milestone',
  },

  // === 2018 ===
  {
    id: '2018-1',
    year: '2018',
    title: 'O Primeiro Milhao',
    description:
      '1 ano e 4 meses apos a declaracao a mae, atinge a marca de 1 milhao de reais na conta bancaria.',
    details: [
      '[[Validacao]] A profecia autocumprida se materializa',
      '[[Estoicismo]] Comeca estudos aprofundados em filosofia estoica',
      '[[Lei do tempo]] Percebe a importancia do efeito composto para resultados duradouros',
      '[[Saude]] Questiona impacto ambiental, busca alimentacao saudavel',
    ],
    type: 'milestone',
  },

  // === 2019 ===
  {
    id: '2019-1',
    year: '2019',
    title: 'Independencia Financeira',
    description:
      'Conquista independencia financeira antes dos 30 anos. Compra casa propria em bairro nobre.',
    details: [
      '[[Liberdade]] Pode escolher projetos por significado, nao por necessidade',
      '[[Marco Aurelio, Seneca, Epicteto]] Aprofunda estudos em estoicismo',
      '[[Viagem]] Washington DC a Las Vegas, estudando ideologias e escrevendo no diario',
    ],
    type: 'milestone',
  },
  {
    id: '2019-2',
    year: '2019',
    title: 'A Crise de Proposito',
    description:
      'Apos conquistar objetivos materiais, enfrenta vazio existencial. Dezembro marca reflexao profunda e decisao de compartilhar a jornada.',
    details: [
      '[[Pergunta]] "E agora? Para que serve tudo isso?"',
      '[[Paradoxo]] Ter tudo e sentir que falta algo',
      '[[Decisao]] Compartilhar aprendizados se torna novo proposito',
    ],
    type: 'crisis',
  },

  // === 2020 ===
  {
    id: '2020-1',
    year: '2020',
    title: 'Nasce o Vida Lendaria',
    description:
      'Inicio do projeto focado em inspirar e ajudar outras pessoas. Aprofundamento em estudos sobre mente humana, proposito e valores.',
    details: [
      '[[Missao]] Transformar vidas atraves de conteudo de alto impacto',
      '[[Reflexao]] "A continua morte de versoes antigas e renascimento em direcao a proposito maior"',
      '[[Descoberta]] Procrastinacao consciente como ferramenta de criatividade',
    ],
    type: 'pivot',
  },

  // === 2021 ===
  {
    id: '2021-1',
    year: '2021',
    title: 'A Grande Renuncia',
    description:
      'Deixa sociedade em uma das maiores empresas de marketing direto do Brasil para focar em projetos pessoais.',
    details: [
      '[[Coragem]] Abandonar o certo pelo significativo',
      '[[Essencialismo aplicado]] Dizer nao ao bom para dizer sim ao excelente',
      '[[Transicao]] Inicio do periodo de introspecao',
    ],
    type: 'pivot',
  },

  // === 2021-2023 ===
  {
    id: '2022-1',
    year: '2021-2023',
    title: 'O Deserto - Introspecao Profunda',
    description:
      'Afasta-se das redes sociais e producao de conteudo. Periodo de autoconhecimento, estudos aprofundados e enfrentamento de desafios internos.',
    details: [
      '[[Estudos]] Filosofia (Nietzsche, Schopenhauer), psicologia, neurociencia, espiritualidade',
      '[[Experiencia]] Sessao xamanica com ayahuasca amplia percepcao da realidade',
      '[[Batalha]] Luta contra ansiedade e depressao atraves de autoconhecimento e meditacao',
      '[[Modelo Teorico-Cognitivo]] Contato com conceitos de Christopher Langan e leis hermeticas',
    ],
    type: 'crisis',
  },

  // === 2023 ===
  {
    id: '2023-1',
    year: '2023',
    title: 'O Retorno - 33 Anos',
    description:
      'Retorna ao Vida Lendaria com nova perspectiva. Grava "A Beira do Abismo" no dia do aniversario, compartilhando vulnerabilidades.',
    details: [
      '[[24/03/2023]] Episodio gravado aos 33 anos - idade simbolica de transformacao',
      '[[Vulnerabilidade]] Compartilha publicamente lutas com ansiedade e depressao',
      '[[Novos episodios]] "Voce e Dois", "Por que procrastinamos", "Elimine o Ruido", "Siga Sua Curiosidade"',
      '[[Mente Lendaria]] Inicia projeto de "segundo cerebro" potencializado com IA',
    ],
    type: 'milestone',
  },
  {
    id: '2023-2',
    year: '2023',
    title: 'Mente Lendaria - O Novo Capitulo',
    description:
      'Lancamento do curso para ensinar a criar um "segundo cerebro" potencializado com IA. Fusao de todas as experiencias anteriores.',
    details: [
      '[[07/05/2023]] Live sobre como monetizar a curiosidade',
      '[[Integracao]] Une tecnologia, autoconhecimento e produtividade',
      '[[Legado]] Democratizacao de frameworks mentais de alto desempenho',
      '[[500+ livros]] Base de conhecimento que sustenta o metodo',
    ],
    type: 'milestone',
  },
];

// Conquistas Profissionais - dados complementares
export const PROFESSIONAL_ACHIEVEMENTS = [
  {
    title: 'Referencia em Marketing Direto e Funis de Alta Conversao',
    period: '2017 - Presente',
    description:
      'Conhecido como "El Funileiro". Palestras pelo Brasil, consultorias que ajudaram clientes a recuperar mais de R$10 milhoes em vendas perdidas.',
  },
  {
    title: 'Fundador de Empresa Lider em Marketing Direto',
    period: '2015 - 2021',
    description:
      'Co-fundou e atuou como CEO de uma das empresas mais premiadas do Brasil na area, faturando multiplos 7 digitos.',
  },
  {
    title: 'Independencia Financeira',
    period: '2019',
    description:
      'Alcancou independencia financeira antes dos 30 anos, permitindo foco em projetos alinhados com proposito.',
  },
  {
    title: 'Palestrante Internacional',
    period: '2015-2019',
    description:
      'Palestras em eventos de marketing digital pelo Brasil. Convidado para eventos internacionais. Livro autografado da InfusionSoft.',
  },
  {
    title: '500+ Livros Lidos',
    period: 'Desde 2014',
    description:
      'Leitura assiduada incluindo Trabalhe 4h por Semana, O Poder do Habito, Antifragil, Essencialismo e centenas de outros.',
  },
  {
    title: 'Criador do Vida Lendaria e Mente Lendaria',
    period: '2020 - Presente',
    description:
      'Podcast e curso para ajudar pessoas a viverem com mais significado, proposito e realizacao.',
  },
];
