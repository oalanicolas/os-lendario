// =============================================================================
// MENTAL MODELS CONTENT & DEFINITIONS
// =============================================================================

export const MENTAL_MODELS_EXPLANATION = {
  title: 'O que são Modelos Mentais?',
  definition: 'Modelos mentais são frameworks simplificados que representam como o mundo funciona. São conjuntos de crenças e ideias que formamos consciente ou inconscientemente baseados em nossas experiências. Servem como atalhos mentais que guiam nossos pensamentos e comportamentos.',

  importance: [
    'Afetam como percebemos situações complexas',
    'Moldam nossas decisões e comportamentos',
    'Funcionam como filtros da realidade',
    'Podem ser construtivos ou destrutivos'
  ],

  axes: [
    {
      name: 'Aplicabilidade',
      low: 'Contexto Específico',
      high: 'Universal',
      example: 'Pareto é universal, mas Trade-offs é altamente contextual'
    },
    {
      name: 'Complexidade',
      low: 'Simples & Intuitivo',
      high: 'Matemático & Abstrato',
      example: 'Incentivos (simples) vs Termodinâmica (complexa)'
    },
    {
      name: 'Tempo para Aprender',
      low: 'Imediato',
      high: 'Meses de Estudo',
      example: 'Inversion (1 hora) vs Seleção Natural (semanas)'
    }
  ],

  affinities: {
    desc: 'Modelos mentais criam afinidades com drivers científicos, formando a base para escolhas de ferramentas e frameworks.',
    types: [
      {
        type: 'PRIMARY_DRIVER',
        color: '#10b981',
        desc: 'O modelo mental mapeia diretamente com um driver científico',
        example: 'Incentivos = Driver de Motivação'
      },
      {
        type: 'SUPPORTING_DRIVER',
        color: '#3b82f6',
        desc: 'O modelo mental fornece contexto adicional para aplicar um driver',
        example: 'Pensamento de Primeiros Princípios = aplicar Pensamento Científico'
      },
      {
        type: 'CONFLICT_DRIVER',
        color: '#ef4444',
        desc: 'O modelo mental desafia ou complica a aplicação de um driver',
        example: 'Viés de Confirmação = dificulta Análise Racional'
      }
    ]
  }
};

// =============================================================================
// MENTAL MODELS BY CATEGORY
// =============================================================================

export const MENTAL_MODELS_CATEGORIES = [
  {
    name: 'Ferramentas de Pensamento Geral',
    icon: 'lightbulb',
    description: 'Frameworks fundamentais para estruturar o pensamento',
    discipline: 'General',
    models: [
      {
        name: 'Mapa vs Território',
        slug: 'map-territory',
        desc: 'A representação da realidade nunca é a realidade em si. Distinguir entre suposições e fatos reais.',
        origin: 'Filosofia',
        discipline: 'Epistemology',
        complexity: 3,
        applicability: 9,
        useCase: 'Quando você está tomando decisões baseadas em suposições não testadas',
        example: 'A descrição de um trabalho (mapa) não é o trabalho real (território)',
        driverAffinities: ['critical-thinking', 'perception', 'assumption-detection']
      },
      {
        name: 'Círculo de Competência',
        slug: 'circle-of-competence',
        desc: 'Reconhecer os limites do seu conhecimento. Saber o que você não sabe é tão importante quanto saber.',
        origin: 'Warren Buffett',
        discipline: 'Self-Awareness',
        complexity: 2,
        applicability: 8,
        useCase: 'Em qualquer contexto onde você precisa tomar decisões. Especialmente em investimentos e carreira.',
        example: 'Um desenvolvedor reconhecer que não entende economia antes de decidir sobre um investimento arriscado',
        driverAffinities: ['self-awareness', 'humility', 'risk-assessment']
      },
      {
        name: 'Pensamento em Primeiros Princípios',
        slug: 'first-principles-thinking',
        desc: 'Quebrar problemas complexos em componentes fundamentais e reconstruir do zero.',
        origin: 'Aristóteles, Elon Musk',
        discipline: 'Problem-Solving',
        complexity: 8,
        applicability: 7,
        useCase: 'Quando você enfrenta um problema que parece impossível ou quando as soluções convencionais falham',
        example: 'Tesla questionando "Por que os carros têm motores a combustão?" em vez de aceitar como dado',
        driverAffinities: ['analytical-thinking', 'innovation', 'fundamental-understanding']
      },
      {
        name: 'Inversão',
        slug: 'inversion',
        desc: 'Pensar ao contrário. Se quer X, qual é a maneira mais garantida de NÃO conseguir X?',
        origin: 'Carl Jacobi, Charlie Munger',
        discipline: 'Problem-Solving',
        complexity: 4,
        applicability: 8,
        useCase: 'Planejamento, estratégia, e identificação de riscos',
        example: 'Em vez de "Como faço um produto ótimo?", pergunte "Quais são as piores coisas que posso fazer?"',
        driverAffinities: ['strategic-thinking', 'risk-identification', 'reverse-engineering']
      }
    ]
  },
  {
    name: 'Economia & Negócios',
    icon: 'coins',
    description: 'Modelos para entender mercados e alocação de recursos',
    discipline: 'Economics',
    models: [
      {
        name: 'Escassez',
        slug: 'scarcity',
        desc: 'Recursos limitados criam escolhas. Toda decisão tem um custo de oportunidade.',
        origin: 'Economia Clássica',
        discipline: 'Economics',
        complexity: 3,
        applicability: 10,
        useCase: 'Entender porque pessoas fazem certos trade-offs',
        example: 'Se gasto tempo em reuniões, não posso gastar em codificação. O tempo é escasso.',
        driverAffinities: ['resource-optimization', 'opportunity-cost', 'decision-making']
      },
      {
        name: 'Oferta & Demanda',
        slug: 'supply-demand',
        desc: 'Preços são determinados pelo equilíbrio entre disponibilidade e desejo. Entender dinâmicas de mercado.',
        origin: 'Adam Smith',
        discipline: 'Economics',
        complexity: 5,
        applicability: 8,
        useCase: 'Previsão de preços, entrada em mercados, estratégia de precificação',
        example: 'iPhone tem preço alto pois demanda é alta mas oferta é controlada',
        driverAffinities: ['market-dynamics', 'pricing-strategy', 'value-perception']
      },
      {
        name: 'Trade-offs',
        slug: 'tradeoffs',
        desc: 'Não existem ganhos sem perdas. Melhorar em uma área frequentemente significa piorar em outra.',
        origin: 'Economia Clássica',
        discipline: 'Economics',
        complexity: 4,
        applicability: 10,
        useCase: 'Qualquer decisão estratégica',
        example: 'Velocidade vs Qualidade. Custo vs Performance. Sempre há um trade-off.',
        driverAffinities: ['strategic-choice', 'optimization', 'compromise']
      },
      {
        name: 'Vantagem Comparativa',
        slug: 'comparative-advantage',
        desc: 'Especialização em áreas onde você tem melhor eficiência relativa, mesmo que não seja a melhor absolutamente.',
        origin: 'David Ricardo',
        discipline: 'Economics',
        complexity: 6,
        applicability: 7,
        useCase: 'Alocação de pessoas em equipes, especialização profissional',
        example: 'Mesmo que um desenvolvedor seja melhor em design, se é muito melhor em código, deve focar em código',
        driverAffinities: ['specialization', 'efficiency', 'comparative-advantage']
      },
      {
        name: 'Incentivos',
        slug: 'incentives',
        desc: 'As pessoas agem baseadas em seus incentivos. Entender os incentivos revela por que as pessoas agem assim.',
        origin: 'Economia Comportamental',
        discipline: 'Psychology',
        complexity: 3,
        applicability: 9,
        useCase: 'Entender comportamento humano, design de sistemas, motivation',
        example: 'Se você pagar por bugs encontrados, encontrarão mais bugs (mesmo falsos positivos)',
        driverAffinities: ['motivation', 'behavior-understanding', 'system-design']
      }
    ]
  },
  {
    name: 'Pensamento em Sistemas',
    icon: 'network',
    description: 'Modelos para entender sistemas complexos e interconectados',
    discipline: 'Systems',
    models: [
      {
        name: 'Loops de Feedback',
        slug: 'feedback-loops',
        desc: 'Sistemas possuem ciclos de reforço (positivos) e equilíbrio (negativos) que criam dinâmicas emergentes.',
        origin: 'Cibernética, Pensamento em Sistemas',
        discipline: 'Systems',
        complexity: 7,
        applicability: 8,
        useCase: 'Entender crescimento, desaceleração, e dinâmicas de mercado',
        example: 'Mais users = mais valor = mais users atraídos (feedback positivo em redes)',
        driverAffinities: ['system-dynamics', 'emergence', 'growth-mechanics']
      },
      {
        name: 'Gargalos',
        slug: 'bottlenecks',
        desc: 'O desempenho de um sistema é limitado pelo seu componente mais fraco. Identificar e otimizar o gargalo.',
        origin: 'Teoria das Restrições (Goldratt)',
        discipline: 'Operations',
        complexity: 4,
        applicability: 9,
        useCase: 'Otimização de processos, melhoria de performance',
        example: 'Uma corrente é tão forte quanto seu elo mais fraco. Otimizar outros elos não ajuda.',
        driverAffinities: ['bottleneck-identification', 'optimization', 'constraint-management']
      },
      {
        name: 'Escala',
        slug: 'scale',
        desc: 'Incrementos pequenos na eficiência em grande escala criam resultados exponenciais. Pequenas mudanças importam.',
        origin: 'Física, Matemática',
        discipline: 'Systems',
        complexity: 5,
        applicability: 8,
        useCase: 'Negócios, produção, operações',
        example: '1% de melhoria em operações de 1 milhão de usuários = 10 mil usuários beneficiados',
        driverAffinities: ['exponential-thinking', 'leverage', 'systems-impact']
      },
      {
        name: 'Margem de Segurança',
        slug: 'margin-of-safety',
        desc: 'Deixar espaço para erro. Assumir que você não sabe tudo reduz riscos catastróficos.',
        origin: 'Benjamin Graham, Warren Buffett',
        discipline: 'Risk-Management',
        complexity: 4,
        applicability: 9,
        useCase: 'Investimento, design de sistemas, planejamento',
        example: 'Não compre uma ação pelo valor intrínseco estimado. Compre 30% abaixo para ter margem.',
        driverAffinities: ['risk-reduction', 'uncertainty-handling', 'catastrophe-prevention']
      }
    ]
  },
  {
    name: 'Psicologia & Comportamento',
    icon: 'brain',
    description: 'Modelos sobre como pensamos e tomamos decisões',
    discipline: 'Psychology',
    models: [
      {
        name: 'Viés de Confirmação',
        slug: 'confirmation-bias',
        desc: 'Tendência a buscar e interpretar informações que confirmam o que já acreditamos.',
        origin: 'Psicologia Cognitiva',
        discipline: 'Psychology',
        complexity: 3,
        applicability: 9,
        useCase: 'Reconhecer quando você está ouvindo seletivamente',
        example: 'Alguém que acredita em uma conspiração encontra "evidência" em tudo',
        driverAffinities: ['bias-awareness', 'critical-thinking', 'belief-testing']
      },
      {
        name: 'Viés de Sobrevivência',
        slug: 'survivorship-bias',
        desc: 'Focamos em sucessos visíveis e ignoramos os fracassos que não vemos. Distorce nossa percepção.',
        origin: 'Abraham Wald, Nassim Taleb',
        discipline: 'Psychology',
        complexity: 4,
        applicability: 8,
        useCase: 'Análise de risco, aprendizado de histórias de sucesso',
        example: 'Lemos sobre 10 startups bem-sucedidas mas esquecemos dos 100 que falharam',
        driverAffinities: ['sample-bias', 'success-analysis', 'hidden-failures']
      },
      {
        name: 'Prova Social',
        slug: 'social-proof',
        desc: 'Confiamos nas ações de outras pessoas para validar nossas próprias decisões. Influencia comportamento em massa.',
        origin: 'Robert Cialdini',
        discipline: 'Psychology',
        complexity: 3,
        applicability: 8,
        useCase: 'Marketing, design de produtos, compreensão de viral',
        example: 'Um restaurante vazio parece ruim. O mesmo restaurante cheio parece bom.',
        driverAffinities: ['social-dynamics', 'crowd-behavior', 'influence']
      },
      {
        name: 'Âncora',
        slug: 'anchoring',
        desc: 'O primeiro número que vemos influencia nossa percepção de números subsequentes. Poderoso na negociação.',
        origin: 'Tversky & Kahneman',
        discipline: 'Psychology',
        complexity: 3,
        applicability: 7,
        useCase: 'Negociação, precificação, persuasão',
        example: 'Se pede 1000, negocia até 700. Se pede 500, negocia até 400. A âncora muda tudo.',
        driverAffinities: ['negotiation', 'persuasion', 'perception-management']
      },
      {
        name: 'Aversão ao Risco',
        slug: 'loss-aversion',
        desc: 'Perdas parecem maiores que ganhos equivalentes. Isso afeta nossas escolhas de forma irracional.',
        origin: 'Prospect Theory, Tversky & Kahneman',
        discipline: 'Psychology',
        complexity: 4,
        applicability: 9,
        useCase: 'Entender decisões de risco, design de incentivos',
        example: 'Aversão a perder R$100 é mais forte que atração de ganhar R$100',
        driverAffinities: ['risk-perception', 'decision-making', 'motivation']
      }
    ]
  },
  {
    name: 'Biologia & Natureza',
    icon: 'leaf',
    description: 'Modelos derivados de sistemas naturais',
    discipline: 'Natural Sciences',
    models: [
      {
        name: 'Seleção Natural',
        slug: 'natural-selection',
        desc: 'Sistemas que se adaptam prosperam. Rigidez leva à extinção. Aplicável a organizações e estratégias.',
        origin: 'Charles Darwin',
        discipline: 'Biology',
        complexity: 6,
        applicability: 7,
        useCase: 'Estratégia de negócios, evolução organizacional, competição',
        example: 'Empresas que não se adaptam ao mercado desaparecem. Adaptação = sucesso.',
        driverAffinities: ['adaptation', 'evolution', 'competition']
      },
      {
        name: 'Termodinâmica',
        slug: 'thermodynamics',
        desc: 'Energia não é criada nem destruída, apenas transformada. Nada é de graça - sempre há um custo energético.',
        origin: 'Física',
        discipline: 'Physics',
        complexity: 8,
        applicability: 6,
        useCase: 'Entender custos reais, eficiência, limites de sistemas',
        example: 'Não existe almoço grátis. Toda ação tem custo em energia ou recursos.',
        driverAffinities: ['cost-reality', 'efficiency', 'resource-conservation']
      },
      {
        name: 'Alavancagem',
        slug: 'leverage',
        desc: 'Pequenas forças em sistemas com alavancagem produzem grandes resultados. Buscar pontos de alavancagem.',
        origin: 'Arquimedes, Física',
        discipline: 'Physics',
        complexity: 5,
        applicability: 8,
        useCase: 'Encontrar pontos de influência, otimização',
        example: 'Uma alavanca permite mover uma rocha pesada com pouca força',
        driverAffinities: ['leverage-points', 'system-optimization', 'force-multiplication']
      }
    ]
  }
];

// =============================================================================
// MENTAL MODELS RELATIONSHIPS & INTERACTIONS
// =============================================================================

export const MENTAL_MODELS_RELATIONSHIPS = {
  title: 'Relacionamentos entre Modelos Mentais',
  description: 'Modelos mentais não existem isolados. Eles interagem, apoiam, e às vezes conflitam uns com os outros.',

  relationTypes: [
    {
      type: 'REINFORCES',
      color: '#10b981',
      icon: 'arrow-up',
      description: 'Um modelo fortalece ou complementa outro',
      examples: [
        {
          models: ['Pensamento em Primeiros Princípios', 'Pensamento Inverso'],
          explanation: 'Primeiros Princípios quebra o problema. Inversão identifica o que evitar. Juntos = análise completa'
        },
        {
          models: ['Escassez', 'Trade-offs'],
          explanation: 'Escassez cria trade-offs. Se recursos fossem ilimitados, não haveria trade-offs'
        },
        {
          models: ['Loops de Feedback', 'Escala'],
          explanation: 'Feedback positivo cria crescimento exponencial quando em escala'
        }
      ]
    },
    {
      type: 'CONFLICTS',
      color: '#ef4444',
      icon: 'cross',
      description: 'Um modelo contradiz ou complica outro',
      examples: [
        {
          models: ['Prova Social', 'Pensamento em Primeiros Princípios'],
          explanation: 'Prova Social diz "copie todos". Primeiros Princípios diz "questione tudo"'
        },
        {
          models: ['Aversão ao Risco', 'Pensamento de Escala'],
          explanation: 'Aversão ao Risco faz você evitar. Escala requer risco para ganho exponencial'
        }
      ]
    },
    {
      type: 'DERIVED_FROM',
      color: '#3b82f6',
      icon: 'git-branch',
      description: 'Um modelo é derivado ou uma aplicação específica de outro',
      examples: [
        {
          models: ['Gargalos', 'Sistemas Complexos'],
          explanation: 'Gargalos é um conceito derivado de pensamento em sistemas'
        },
        {
          models: ['Viés de Confirmação', 'Pensamento em Primeiros Princípios'],
          explanation: 'Reconhecer viés de confirmação é o primeiro passo para aplicar primeiros princípios'
        }
      ]
    },
    {
      type: 'REQUIRES',
      color: '#f59e0b',
      icon: 'link',
      description: 'Aplicar bem um modelo requer entender outro primeiro',
      examples: [
        {
          models: ['Círculo de Competência', 'Qualquer outro modelo'],
          explanation: 'Você deve conhecer seus limites antes de aplicar qualquer modelo'
        },
        {
          models: ['Margem de Segurança', 'Entender riscos'],
          explanation: 'Requer que você primeiro identifique os riscos (qual é a downside?)'
        }
      ]
    }
  ]
};

// =============================================================================
// HOW TO USE MENTAL MODELS
// =============================================================================

export const MENTAL_MODELS_FRAMEWORK = {
  title: 'Como Usar Modelos Mentais Efetivamente',
  description: 'Modelos mentais não são para memorizar, são ferramentas para pensar melhor.',

  steps: [
    {
      step: 1,
      title: 'Identificar',
      description: 'Qual modelo você está usando inconscientemente? Reconheça seus vieses e padrões de pensamento.',
      icon: 'eye',
      action: 'Refletir sobre decisões passadas. Que suposições foram feitas?'
    },
    {
      step: 2,
      title: 'Desafiar',
      description: 'Questione suas suposições. Faça perguntas críticas que exponham brechas no seu modelo mental.',
      icon: 'exclamation',
      action: 'Use Pensamento em Primeiros Princípios ou Inversão para questionar'
    },
    {
      step: 3,
      title: 'Observar',
      description: 'Veja como outras pessoas fazem decisões. Aprenda novos modelos observando diferentes perspectivas.',
      icon: 'eye-open',
      action: 'Procure por contra-exemplos. Quando esse modelo falha?'
    },
    {
      step: 4,
      title: 'Resistir',
      description: 'Resista ao pensamento automático. Escolha conscientemente qual modelo aplicar à situação.',
      icon: 'shield',
      action: 'Pause antes de decidir. Escolha um modelo apropriado conscientemente'
    },
    {
      step: 5,
      title: 'Combinar',
      description: 'Use múltiplos modelos juntos. A força está em saltar entre disciplinas para visões mais ricas.',
      icon: 'git-branch',
      action: 'Aplique 3-5 modelos mentais diferentes ao mesmo problema'
    }
  ],

  principles: [
    {
      principle: 'Conhecimento Interdisciplinar',
      desc: 'Os melhores pensadores combinam ideias de várias disciplinas. Não fique preso em uma área.',
      icon: 'git-branch'
    },
    {
      principle: 'Reconheça Limitações',
      desc: 'Todo modelo é uma simplificação. Conhecer as limitações do modelo é tão importante quanto conhecer suas aplicações.',
      icon: 'exclamation'
    },
    {
      principle: 'Contexto Importa',
      desc: 'O mesmo modelo funciona diferentemente em contextos diferentes. Adapte o modelo à situação real.',
      icon: 'compass'
    },
    {
      principle: 'Atualize Constantemente',
      desc: 'Quando nova informação emerge, atualize seus modelos mentais. Seja intelectualmente flexível.',
      icon: 'refresh'
    }
  ]
};

// =============================================================================
// MENTAL MODELS RECOMMENDATIONS
// =============================================================================

export const MENTAL_MODELS_RECOMMENDATIONS = {
  title: 'Modelos Mentais Recomendados por Situação',

  situations: [
    {
      situation: 'Tomar Decisão Estratégica',
      models: ['Pensamento em Primeiros Princípios', 'Pensamento Inverso', 'Trade-offs', 'Margem de Segurança'],
      reason: 'Quebra a complexidade, identifica riscos, e cria espaço para incerteza'
    },
    {
      situation: 'Entender Comportamento Humano',
      models: ['Incentivos', 'Viés de Confirmação', 'Prova Social', 'Aversão ao Risco'],
      reason: 'Revela motivações reais, vieses, e dinâmicas sociais'
    },
    {
      situation: 'Analisar Mercado ou Concorrência',
      models: ['Oferta & Demanda', 'Escassez', 'Vantagem Comparativa', 'Seleção Natural'],
      reason: 'Entende dinâmicas de mercado, posicionamento, e sobrevivência'
    },
    {
      situation: 'Otimizar Processo ou Sistema',
      models: ['Gargalos', 'Loops de Feedback', 'Escala', 'Alavancagem'],
      reason: 'Identifica onde focar esforço para máximo impacto'
    },
    {
      situation: 'Aprender Coisa Nova',
      models: ['Pensamento em Primeiros Princípios', 'Círculo de Competência', 'Mapa vs Território'],
      reason: 'Questiona suposições, reconhece limites, distingue realidade de representação'
    }
  ]
};

// =============================================================================
// REFERENCES & FURTHER LEARNING
// =============================================================================

export const MENTAL_MODELS_REFERENCES = {
  books: [
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      focus: 'Cognitive biases, decision making',
      relevance: 'Fundamental para entender viés de confirmação, aversão ao risco, anchoring'
    },
    {
      title: 'The Great Mental Models (Volume 1-3)',
      author: 'Charlie Munger & Farnam Street',
      focus: 'Applied mental models',
      relevance: 'Aplicações práticas de modelos mentais em negócios e vida'
    },
    {
      title: 'First Principles Thinking',
      author: 'Elon Musk (concept), Stephen Hawking (original)',
      focus: 'Breaking down complexity',
      relevance: 'Como questionar suposições e reconstruir do zero'
    }
  ],

  websites: [
    {
      name: 'Farnam Street Mental Models',
      url: 'https://fs.blog/mental-models/',
      focus: 'Comprehensive library of models'
    },
    {
      name: 'Ness Labs Mental Models',
      url: 'https://nesslabs.com/mental-models',
      focus: 'Applied thinking & decision-making'
    }
  ],

  key_thinkers: [
    { name: 'Charlie Munger', specialty: 'Applied mental models in business', model: 'Multidisciplinary thinking' },
    { name: 'Daniel Kahneman', specialty: 'Cognitive biases & decision theory', model: 'Behavioral economics' },
    { name: 'Nassim Taleb', specialty: 'Risk & uncertainty', model: 'Black Swan thinking' },
    { name: 'Richard Feynman', specialty: 'Thinking from first principles', model: 'Curious questioning' }
  ]
};
