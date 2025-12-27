// =============================================================================
// DRIVER EDUCATIONAL CONTENT
// =============================================================================

export const DRIVER_EXPLANATION = {
  title: 'O que e um Driver?',
  definition: 'Uma caracteristica psicologica inferida que influencia comportamento, decisoes e preferencias.',
  types: [
    {
      type: 'trait',
      desc: 'Caracteristica estavel de personalidade (Big Five e facetas)',
      examples: [
        'openness_to_experience', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism',
        'assertiveness', 'warmth', 'fantasy', 'trust', 'competence', 'deliberation', 'gregariousness'
      ],
      color: '#4ecdc4'
    },
    {
      type: 'belief',
      desc: 'Crenca sobre como o mundo funciona (limitantes e empoderadoras)',
      examples: [
        'growth_mindset', 'internal_locus_of_control', 'meritocracy_belief',
        'self_efficacy', 'learned_helplessness', 'imposter_syndrome', 'world_is_just',
        'effort_leads_to_success', 'talent_is_fixed', 'failure_is_learning'
      ],
      color: '#feca57'
    },
    {
      type: 'value',
      desc: 'O que a pessoa considera importante (Schwartz Values)',
      examples: [
        'autonomy', 'achievement', 'security', 'benevolence',
        'power', 'hedonism', 'tradition', 'conformity', 'universalism',
        'stimulation', 'self_direction', 'spirituality'
      ],
      color: '#a55eea'
    },
    {
      type: 'need',
      desc: 'Necessidade psicologica (Maslow e SDT)',
      examples: [
        'need_for_structure', 'need_for_recognition', 'need_for_closure',
        'need_for_safety', 'need_for_belonging', 'need_for_esteem',
        'need_for_self_actualization', 'need_for_autonomy', 'need_for_competence',
        'need_for_relatedness', 'need_for_novelty', 'need_for_meaning'
      ],
      color: '#ff6b6b'
    },
    {
      type: 'mindset',
      desc: 'Orientacao mental/atitude (Dweck, Abundance, Systems)',
      examples: [
        'abundance_mindset', 'systems_thinking', 'long_term_orientation',
        'growth_mindset', 'fixed_mindset', 'scarcity_mindset',
        'learner_mindset', 'judger_mindset', 'experimental_mindset',
        'perfectionist_mindset', 'resilient_mindset', 'victim_mindset'
      ],
      color: '#48dbfb'
    }
  ],
  spectrum: {
    desc: 'Todo driver tem um espectro bipolar - ninguem e 100% de um lado',
    examples: [
      { driver: 'risk_tolerance', low: 'Avesso a risco', high: 'Busca risco' },
      { driver: 'structure_preference', low: 'Flexivel/Improvisador', high: 'Estruturado/Planejador' },
      { driver: 'social_orientation', low: 'Introvertido', high: 'Extrovertido' },
      { driver: 'time_orientation', low: 'Presente/Imediato', high: 'Futuro/Longo prazo' },
      { driver: 'thinking_style', low: 'Intuitivo/Holistico', high: 'Analitico/Sequencial' },
      { driver: 'decision_style', low: 'Emocional/Valores', high: 'Racional/Logica' },
      { driver: 'change_orientation', low: 'Tradicional/Conservador', high: 'Inovador/Disruptivo' }
    ]
  },
  relationships: {
    desc: 'Drivers se correlacionam entre si - entender um ajuda a prever outros',
    types: [
      { type: 'correlates', desc: 'Coexistem frequentemente', symbol: '↔', color: '#4ecdc4' },
      { type: 'predicts', desc: 'Um prediz o outro', symbol: '→', color: '#feca57' },
      { type: 'contradicts', desc: 'Raramente coexistem', symbol: '⊗', color: '#ff6b6b' },
      { type: 'moderates', desc: 'Um modifica o efeito do outro', symbol: '⊕', color: '#a55eea' }
    ],
    examples: [
      { a: 'conscientiousness', b: 'need_for_structure', r: 0.72, type: 'positive' as const, meaning: 'Pessoas organizadas precisam de estrutura' },
      { a: 'openness', b: 'risk_tolerance', r: 0.45, type: 'positive' as const, meaning: 'Abertura a experiencias aumenta tolerancia a risco' },
      { a: 'neuroticism', b: 'internal_locus_of_control', r: -0.38, type: 'negative' as const, meaning: 'Ansiedade diminui senso de controle' },
      { a: 'growth_mindset', b: 'resilience', r: 0.68, type: 'positive' as const, meaning: 'Crenca em crescimento aumenta resiliencia' },
      { a: 'need_for_closure', b: 'openness', r: -0.52, type: 'negative' as const, meaning: 'Necessidade de certeza diminui abertura' },
      { a: 'extraversion', b: 'need_for_stimulation', r: 0.61, type: 'positive' as const, meaning: 'Extrovertidos buscam mais estimulos' },
      { a: 'self_efficacy', b: 'achievement', r: 0.55, type: 'positive' as const, meaning: 'Confianca propria prediz realizacao' },
      { a: 'perfectionism', b: 'procrastination', r: 0.42, type: 'positive' as const, meaning: 'Perfeccionismo pode causar procrastinacao' }
    ]
  }
};

// =============================================================================
// INFERENCE PROCESS - Como drivers sao inferidos de MIUs
// =============================================================================

export const DRIVER_INFERENCE = {
  title: 'Processo de Inferencia',
  overview: 'Drivers sao inferidos a partir de Minimum Information Units (MIUs) atraves de pattern matching e acumulacao de evidencias.',

  formula: {
    title: 'Formula de Forca do Driver',
    equation: 'driver_strength = f(miu_count, pattern_match, linguistic_intensity)',
    components: [
      { var: 'miu_count', desc: 'Quantidade de MIUs que indicam o driver', weight: '0.4' },
      { var: 'pattern_match', desc: 'Qualidade do match com padroes conhecidos', weight: '0.35' },
      { var: 'linguistic_intensity', desc: 'Intensidade linguistica (sempre, nunca, extremamente)', weight: '0.25' }
    ]
  },

  confidenceScoring: {
    title: 'Scoring de Confianca',
    desc: 'A confianca aumenta com multiplas MIUs convergentes',
    levels: [
      { level: 'Baixa', range: '1-2 MIUs', confidence: '0.3-0.5', color: '#ff6b6b' },
      { level: 'Media', range: '3-5 MIUs', confidence: '0.5-0.7', color: '#feca57' },
      { level: 'Alta', range: '6-10 MIUs', confidence: '0.7-0.85', color: '#4ecdc4' },
      { level: 'Muito Alta', range: '10+ MIUs', confidence: '0.85-0.95', color: '#a55eea' }
    ]
  },

  evidenceAccumulation: {
    title: 'Acumulacao de Evidencias',
    process: [
      { step: 1, action: 'Extrair MIU do texto', example: '"Eu sempre planejo tudo com antecedencia"' },
      { step: 2, action: 'Identificar padroes linguisticos', example: '"sempre" = intensificador temporal' },
      { step: 3, action: 'Mapear para drivers candidatos', example: 'conscientiousness, need_for_structure' },
      { step: 4, action: 'Calcular match score', example: 'pattern_match = 0.85' },
      { step: 5, action: 'Acumular com evidencias anteriores', example: 'confidence += weighted_score' },
      { step: 6, action: 'Normalizar e rankear', example: 'conscientiousness: 0.78 (high confidence)' }
    ]
  }
};

// =============================================================================
// DRIVER DOMAINS - Categorias de dominio
// =============================================================================

export const DRIVER_DOMAINS = {
  title: 'Dominios de Drivers',
  desc: 'Drivers sao organizados em dominios que representam diferentes aspectos do funcionamento psicologico',

  domains: [
    {
      id: 'cognitive',
      name: 'Cognitivo',
      desc: 'Como a pessoa processa informacao e toma decisoes',
      color: '#4ecdc4',
      examples: ['analytical_thinking', 'systems_thinking', 'need_for_cognition', 'intuitive_processing'],
      questions: ['Como eles pensam?', 'Qual o estilo de raciocinio?', 'Como processam complexidade?']
    },
    {
      id: 'emotional',
      name: 'Emocional',
      desc: 'Como a pessoa experiencia e regula emocoes',
      color: '#ff6b6b',
      examples: ['emotional_intelligence', 'neuroticism', 'emotional_stability', 'affect_intensity'],
      questions: ['Como eles sentem?', 'Qual a intensidade emocional?', 'Como regulam emocoes?']
    },
    {
      id: 'social',
      name: 'Social',
      desc: 'Como a pessoa se relaciona com outros',
      color: '#feca57',
      examples: ['extraversion', 'agreeableness', 'trust', 'social_dominance', 'empathy'],
      questions: ['Como eles se relacionam?', 'Qual o estilo interpessoal?', 'Como colaboram?']
    },
    {
      id: 'motivational',
      name: 'Motivacional',
      desc: 'O que impulsiona a pessoa a agir',
      color: '#a55eea',
      examples: ['achievement_motivation', 'power_motivation', 'affiliation_motivation', 'intrinsic_motivation'],
      questions: ['O que os move?', 'Quais sao os objetivos?', 'O que os energiza?']
    },
    {
      id: 'behavioral',
      name: 'Comportamental',
      desc: 'Padroes de acao e habitos',
      color: '#48dbfb',
      examples: ['conscientiousness', 'impulsivity', 'risk_taking', 'persistence', 'self_discipline'],
      questions: ['Como eles agem?', 'Quais sao os padroes?', 'Como se comportam sob pressao?']
    }
  ]
};

// =============================================================================
// LINGUISTIC INDICATORS - Padroes de texto que mapeiam para drivers
// =============================================================================

export const DRIVER_INDICATORS = {
  title: 'Indicadores Linguisticos',
  desc: 'Padroes de texto que sinalizam drivers especificos',

  patterns: [
    {
      pattern: '"Eu sempre..."',
      examples: ['"Eu sempre planejo antes"', '"Eu sempre chego cedo"'],
      drivers: ['conscientiousness', 'need_for_structure'],
      domain: 'behavioral',
      strength: 'high',
      interpretation: 'Indica consistencia e padroes estabelecidos'
    },
    {
      pattern: '"Eu nunca..."',
      examples: ['"Eu nunca desisto"', '"Eu nunca me atraso"'],
      drivers: ['persistence', 'conscientiousness'],
      domain: 'behavioral',
      strength: 'high',
      interpretation: 'Indica limites rigidos e autodisciplina'
    },
    {
      pattern: '"Eu sinto que..."',
      examples: ['"Eu sinto que preciso ajudar"', '"Eu sinto uma conexao"'],
      drivers: ['emotional_awareness', 'empathy', 'intuitive_processing'],
      domain: 'emotional',
      strength: 'medium',
      interpretation: 'Indica processamento emocional e intuicao'
    },
    {
      pattern: '"Por que...?" (frequente)',
      examples: ['"Por que funciona assim?"', '"Por que fazemos isso?"'],
      drivers: ['curiosity', 'openness', 'need_for_cognition'],
      domain: 'cognitive',
      strength: 'medium',
      interpretation: 'Indica curiosidade e busca por entendimento'
    },
    {
      pattern: '"Eu acredito que..."',
      examples: ['"Eu acredito que posso mudar"', '"Eu acredito em meritocracia"'],
      drivers: ['growth_mindset', 'self_efficacy', 'optimism'],
      domain: 'cognitive',
      strength: 'high',
      interpretation: 'Revela crencas centrais e worldview'
    },
    {
      pattern: '"O mais importante e..."',
      examples: ['"O mais importante e a familia"', '"O mais importante e ser honesto"'],
      drivers: ['value_clarity', 'prioritization'],
      domain: 'motivational',
      strength: 'high',
      interpretation: 'Indica valores hierarquizados'
    },
    {
      pattern: '"Eu preciso de..."',
      examples: ['"Eu preciso de tempo sozinho"', '"Eu preciso de feedback"'],
      drivers: ['need_awareness', 'introversion', 'need_for_recognition'],
      domain: 'emotional',
      strength: 'high',
      interpretation: 'Revela necessidades psicologicas explicitas'
    },
    {
      pattern: 'Intensificadores (muito, extremamente)',
      examples: ['"Sou muito perfeccionista"', '"Extremamente dedicado"'],
      drivers: ['trait_intensity', 'self_awareness'],
      domain: 'behavioral',
      strength: 'high',
      interpretation: 'Sugere tracos fortes e auto-percepcao clara'
    },
    {
      pattern: '"Quando X, eu Y..."',
      examples: ['"Quando estressado, eu me isolo"', '"Quando motivado, trabalho 12h"'],
      drivers: ['emotional_regulation', 'coping_style', 'stress_response'],
      domain: 'behavioral',
      strength: 'high',
      interpretation: 'Revela padroes condicionais de comportamento'
    },
    {
      pattern: '"As pessoas dizem que eu..."',
      examples: ['"As pessoas dizem que sou teimoso"', '"Dizem que sou bom ouvinte"'],
      drivers: ['social_perception', 'feedback_receptivity'],
      domain: 'social',
      strength: 'medium',
      interpretation: 'Indica consciencia da percepcao externa'
    }
  ]
};

// =============================================================================
// DRIVER NETWORK - Clusters de drivers relacionados
// =============================================================================

export const DRIVER_NETWORK = {
  title: 'Rede de Drivers',
  desc: 'Drivers formam clusters interconectados que se influenciam mutuamente',

  clusters: [
    {
      name: 'Cluster de Realizacao',
      color: '#4ecdc4',
      drivers: ['achievement_motivation', 'conscientiousness', 'self_efficacy', 'persistence', 'growth_mindset'],
      core: 'achievement_motivation',
      desc: 'Relacionado a metas, produtividade e sucesso'
    },
    {
      name: 'Cluster de Abertura',
      color: '#a55eea',
      drivers: ['openness', 'curiosity', 'creativity', 'risk_tolerance', 'need_for_novelty'],
      core: 'openness',
      desc: 'Relacionado a exploracao, aprendizado e inovacao'
    },
    {
      name: 'Cluster Social',
      color: '#feca57',
      drivers: ['extraversion', 'agreeableness', 'empathy', 'need_for_belonging', 'trust'],
      core: 'extraversion',
      desc: 'Relacionado a relacionamentos e conexao'
    },
    {
      name: 'Cluster de Estabilidade',
      color: '#48dbfb',
      drivers: ['emotional_stability', 'internal_locus_of_control', 'resilience', 'self_regulation'],
      core: 'emotional_stability',
      desc: 'Relacionado a equilibrio emocional e adaptacao'
    },
    {
      name: 'Cluster de Seguranca',
      color: '#ff6b6b',
      drivers: ['need_for_security', 'risk_aversion', 'need_for_structure', 'need_for_closure', 'tradition'],
      core: 'need_for_security',
      desc: 'Relacionado a previsibilidade e conservacao'
    }
  ]
};
