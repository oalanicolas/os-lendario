// =============================================================================
// MAPPING SYSTEMS EDUCATIONAL CONTENT
// =============================================================================

export interface MappingSystem {
  name: string;
  shortName: string;
  color: string;
  icon: string;
  scientificValidity: 'alta' | 'media' | 'baixa';
  dimensions: number | string;
  granularity: string;
  desc: string;
  components: string[];
  useCases: string[];
  driverOverlap: string;
}

export interface ComponentDriverMapExample {
  driver: string;
  driverType: string;
  mappings: {
    system: string;
    component: string;
    relevance: 'primary' | 'secondary' | 'inverse';
    weight: number;
  }[];
}

export interface ScoringStep {
  step: number;
  title: string;
  desc: string;
  formula?: string;
  example?: string;
}

export interface SystemComparison {
  system: string;
  scientificValidity: number; // 1-5
  practicalUtility: number; // 1-5
  granularity: 'tipos' | 'dimensoes' | 'facetas' | 'partes';
  replicability: 'alta' | 'media' | 'baixa';
  driverCoverage: number; // percentual
}

// =============================================================================
// MAIN CONTENT EXPORT
// =============================================================================

export const MAPPING_EXPLANATION = {
  title: 'Sistemas de Mapeamento Psicometrico',
  definition: 'Frameworks cientificos e clinicos que categorizam caracteristicas psicologicas humanas. No MMOS, drivers sao mapeados para esses sistemas, permitindo gerar perfis compativeis com instrumentos tradicionais.',

  // -------------------------------------------------------------------------
  // MAPPING SYSTEMS OVERVIEW
  // -------------------------------------------------------------------------
  systems: [
    {
      name: 'Big Five (OCEAN)',
      shortName: 'Big Five',
      color: '#10b981',
      icon: 'pentagon',
      scientificValidity: 'alta',
      dimensions: 5,
      granularity: '5 dimensoes + 30 facetas',
      desc: 'O padrao-ouro da psicologia de personalidade. Modelo empirico com decadas de pesquisa cross-cultural. Cada dimensao tem 6 facetas (total 30).',
      components: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
      useCases: ['Pesquisa academica', 'Selecao profissional', 'Desenvolvimento pessoal'],
      driverOverlap: 'Alto - maioria dos traits mapeiam diretamente'
    },
    {
      name: 'HEXACO',
      shortName: 'HEXACO',
      color: '#8b5cf6',
      icon: 'hexagon',
      scientificValidity: 'alta',
      dimensions: 6,
      granularity: '6 dimensoes + 24 facetas',
      desc: 'Extensao do Big Five que adiciona Honesty-Humility. Melhor predicao de comportamentos eticos e manipulativos.',
      components: ['Honesty-Humility', 'Emotionality', 'eXtraversion', 'Agreeableness', 'Conscientiousness', 'Openness'],
      useCases: ['Etica corporativa', 'Predicao de fraudes', 'Lideranca'],
      driverOverlap: 'Alto - similar ao Big Five + valores'
    },
    {
      name: 'MBTI (Myers-Briggs)',
      shortName: 'MBTI',
      color: '#f59e0b',
      icon: 'grid',
      scientificValidity: 'baixa',
      dimensions: '16 tipos',
      granularity: '4 dicotomias + 8 funcoes cognitivas',
      desc: 'Sistema tipologico popular baseado em Jung. Util para autoconhecimento inicial, mas baixa validade test-retest. 16 tipos (ex: INTJ, ENFP).',
      components: ['E/I (Extraversion)', 'S/N (Sensing/Intuition)', 'T/F (Thinking/Feeling)', 'J/P (Judging/Perceiving)'],
      useCases: ['Desenvolvimento pessoal', 'Team building', 'Comunicacao'],
      driverOverlap: 'Medio - preferencias cognitivas + alguns traits'
    },
    {
      name: 'Enneagram',
      shortName: 'Enneagram',
      color: '#ec4899',
      icon: 'circle',
      scientificValidity: 'baixa',
      dimensions: '9 tipos',
      granularity: '9 tipos + asas + linhas de integracao',
      desc: 'Sistema de 9 tipos com dinamicas de estresse e crescimento. Rico em motivacoes e medos centrais. Popular em coaching.',
      components: ['Type 1-9', 'Wings', 'Stress/Growth Lines', 'Instinctual Variants'],
      useCases: ['Coaching', 'Relacionamentos', 'Espiritualidade'],
      driverOverlap: 'Medio - foca em motivacoes e valores'
    },
    {
      name: 'DISC',
      shortName: 'DISC',
      color: '#06b6d4',
      icon: 'pie-chart',
      scientificValidity: 'media',
      dimensions: 4,
      granularity: '4 estilos comportamentais',
      desc: 'Modelo de 4 estilos comportamentais focado em ambiente de trabalho. Simples e pratico, mas menos profundo.',
      components: ['Dominance', 'Influence', 'Steadiness', 'Conscientiousness'],
      useCases: ['Vendas', 'Gestao de equipes', 'Comunicacao corporativa'],
      driverOverlap: 'Baixo - apenas comportamentos observaveis'
    },
    {
      name: 'IFS (Internal Family Systems)',
      shortName: 'IFS',
      color: '#f97316',
      icon: 'users',
      scientificValidity: 'media',
      dimensions: '4 categorias',
      granularity: 'Self + 3 tipos de partes',
      desc: 'Modelo terapeutico que ve a psique como sistema de partes. Managers protegem, Exiles guardam dor, Firefighters apagam incendios.',
      components: ['Self', 'Managers', 'Exiles', 'Firefighters'],
      useCases: ['Terapia', 'Coaching profundo', 'Autoterapia'],
      driverOverlap: 'Baixo - foca em partes, nao traits'
    },
    {
      name: 'Valores (Schwartz/Rokeach)',
      shortName: 'Values',
      color: '#84cc16',
      icon: 'heart',
      scientificValidity: 'alta',
      dimensions: '10-19 valores',
      granularity: '10 valores basicos (Schwartz) ou 36 (Rokeach)',
      desc: 'Sistemas de valores humanos universais. Schwartz identifica 10 valores basicos organizados em 4 dimensoes superiores.',
      components: ['Self-Direction', 'Stimulation', 'Hedonism', 'Achievement', 'Power', 'Security', 'Conformity', 'Tradition', 'Benevolence', 'Universalism'],
      useCases: ['Cultura organizacional', 'Pesquisa cross-cultural', 'Alinhamento de proposito'],
      driverOverlap: 'Alto - mapeamento direto com value drivers'
    }
  ] as MappingSystem[],

  // -------------------------------------------------------------------------
  // COMPONENT DRIVER MAP EXPLAINED
  // -------------------------------------------------------------------------
  componentDriverMap: {
    title: 'Mapeamento Driver -> Componente',
    desc: 'Cada driver pode ter relacao com multiplos componentes de diferentes sistemas. A relevancia indica a forca da conexao.',
    relevanceTypes: [
      { type: 'primary', color: '#10b981', desc: 'Mapeamento direto e forte. O driver e a expressao principal deste componente.' },
      { type: 'secondary', color: '#f59e0b', desc: 'Correlacao significativa. O driver influencia este componente, mas nao e o unico fator.' },
      { type: 'inverse', color: '#ef4444', desc: 'Relacao inversa. Alto score no driver implica baixo score no componente.' }
    ],
    examples: [
      {
        driver: 'conscientiousness',
        driverType: 'trait',
        mappings: [
          { system: 'Big Five', component: 'Conscientiousness', relevance: 'primary', weight: 1.0 },
          { system: 'HEXACO', component: 'Conscientiousness', relevance: 'primary', weight: 0.95 },
          { system: 'MBTI', component: 'Judging (J)', relevance: 'secondary', weight: 0.65 },
          { system: 'DISC', component: 'Conscientiousness', relevance: 'secondary', weight: 0.70 }
        ]
      },
      {
        driver: 'need_for_structure',
        driverType: 'need',
        mappings: [
          { system: 'Big Five', component: 'Conscientiousness (Order facet)', relevance: 'primary', weight: 0.80 },
          { system: 'MBTI', component: 'Judging (J)', relevance: 'primary', weight: 0.85 },
          { system: 'Big Five', component: 'Openness', relevance: 'inverse', weight: -0.40 }
        ]
      },
      {
        driver: 'risk_tolerance',
        driverType: 'trait',
        mappings: [
          { system: 'Big Five', component: 'Openness (Adventurousness)', relevance: 'primary', weight: 0.75 },
          { system: 'Big Five', component: 'Neuroticism', relevance: 'inverse', weight: -0.55 },
          { system: 'Enneagram', component: 'Type 7 (Enthusiast)', relevance: 'secondary', weight: 0.60 }
        ]
      },
      {
        driver: 'achievement_orientation',
        driverType: 'value',
        mappings: [
          { system: 'Schwartz Values', component: 'Achievement', relevance: 'primary', weight: 0.95 },
          { system: 'Big Five', component: 'Conscientiousness (Achievement-striving)', relevance: 'secondary', weight: 0.70 },
          { system: 'Enneagram', component: 'Type 3 (Achiever)', relevance: 'primary', weight: 0.85 },
          { system: 'DISC', component: 'Dominance', relevance: 'secondary', weight: 0.55 }
        ]
      }
    ] as ComponentDriverMapExample[]
  },

  // -------------------------------------------------------------------------
  // SCORING ALGORITHM
  // -------------------------------------------------------------------------
  scoring: {
    title: 'Algoritmo de Score',
    desc: 'Como calculamos mind_component_scores a partir de mind_drivers + component_driver_map',
    steps: [
      {
        step: 1,
        title: 'Coleta de Drivers',
        desc: 'Para cada mind, buscamos todos os drivers atribuidos em mind_drivers com seus scores (-1 a +1) e confidence (0 a 1).',
        example: 'mind_drivers: [{driver: "conscientiousness", score: 0.8, confidence: 0.9}, ...]'
      },
      {
        step: 2,
        title: 'Busca de Mapeamentos',
        desc: 'Para cada driver, buscamos em component_driver_map todos os componentes relacionados com seus pesos.',
        example: 'conscientiousness -> [{component: "Big Five Conscientiousness", weight: 1.0}, {component: "MBTI J", weight: 0.65}]'
      },
      {
        step: 3,
        title: 'Calculo Ponderado',
        desc: 'Multiplicamos o score do driver pelo peso do mapeamento e pela confidence.',
        formula: 'contribution = driver_score * mapping_weight * confidence',
        example: 'contribution = 0.8 * 1.0 * 0.9 = 0.72'
      },
      {
        step: 4,
        title: 'Agregacao',
        desc: 'Somamos todas as contribuicoes para cada componente e normalizamos.',
        formula: 'component_score = sum(contributions) / sum(abs(weights))'
      },
      {
        step: 5,
        title: 'Confidence do Score',
        desc: 'A confidence do score final e a media ponderada das confidences dos drivers contribuintes.',
        formula: 'score_confidence = sum(driver_confidence * abs(weight)) / sum(abs(weights))'
      }
    ] as ScoringStep[]
  },

  // -------------------------------------------------------------------------
  // SYSTEM COMPARISON
  // -------------------------------------------------------------------------
  comparison: {
    title: 'Comparacao de Sistemas',
    desc: 'Avaliacao comparativa dos sistemas de mapeamento',
    headers: ['Sistema', 'Validade Cientifica', 'Utilidade Pratica', 'Granularidade', 'Replicabilidade', 'Cobertura de Drivers'],
    systems: [
      { system: 'Big Five', scientificValidity: 5, practicalUtility: 4, granularity: 'facetas', replicability: 'alta', driverCoverage: 75 },
      { system: 'HEXACO', scientificValidity: 5, practicalUtility: 3, granularity: 'facetas', replicability: 'alta', driverCoverage: 80 },
      { system: 'MBTI', scientificValidity: 2, practicalUtility: 4, granularity: 'tipos', replicability: 'baixa', driverCoverage: 40 },
      { system: 'Enneagram', scientificValidity: 2, practicalUtility: 4, granularity: 'tipos', replicability: 'baixa', driverCoverage: 45 },
      { system: 'DISC', scientificValidity: 3, practicalUtility: 5, granularity: 'dimensoes', replicability: 'media', driverCoverage: 25 },
      { system: 'IFS', scientificValidity: 3, practicalUtility: 4, granularity: 'partes', replicability: 'media', driverCoverage: 15 },
      { system: 'Schwartz', scientificValidity: 5, practicalUtility: 3, granularity: 'dimensoes', replicability: 'alta', driverCoverage: 60 }
    ] as SystemComparison[]
  },

  // -------------------------------------------------------------------------
  // VISUAL EXAMPLE
  // -------------------------------------------------------------------------
  visualExample: {
    title: 'Exemplo: Perfil de um Mind',
    desc: 'Veja como os drivers de um mind sao transformados em scores de diferentes sistemas',
    mindName: 'charlie_munger',
    drivers: [
      { driver: 'conscientiousness', score: 0.85, confidence: 0.9, type: 'trait' },
      { driver: 'openness_to_experience', score: 0.75, confidence: 0.85, type: 'trait' },
      { driver: 'analytical_thinking', score: 0.90, confidence: 0.95, type: 'mindset' },
      { driver: 'need_for_structure', score: 0.70, confidence: 0.8, type: 'need' },
      { driver: 'long_term_orientation', score: 0.95, confidence: 0.9, type: 'value' },
      { driver: 'risk_tolerance', score: 0.35, confidence: 0.85, type: 'trait' },
      { driver: 'internal_locus_of_control', score: 0.80, confidence: 0.9, type: 'belief' }
    ],
    bigFiveResult: {
      O: { score: 0.75, label: 'Alto' },
      C: { score: 0.85, label: 'Muito Alto' },
      E: { score: 0.45, label: 'Medio' },
      A: { score: 0.55, label: 'Medio' },
      N: { score: 0.25, label: 'Baixo' }
    },
    mbtiResult: {
      type: 'INTJ',
      confidence: 0.78,
      breakdown: {
        I: 0.65,
        N: 0.75,
        T: 0.85,
        J: 0.80
      }
    },
    enneagramResult: {
      primaryType: 5,
      wing: 6,
      label: '5w6 (The Problem Solver)',
      confidence: 0.72
    }
  }
};
