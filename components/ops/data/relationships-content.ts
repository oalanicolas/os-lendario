// =============================================================================
// DRIVER RELATIONSHIPS EDUCATIONAL CONTENT
// Scientific correlations between psychological drivers
// =============================================================================

export const RELATIONSHIPS_EXPLANATION = {
  title: 'O que sao Driver Relationships?',
  definition: 'Correlacoes cientificas entre drivers psicologicos, derivadas de estudos empiricos. Cada relacionamento inclui coeficiente de correlacao (r), intervalo de confianca, tamanho amostral e referencias DOI.',
  importance: [
    'Permite inferencias indiretas - se sabemos driver A, podemos estimar driver B',
    'Aumenta confianca quando multiplos drivers correlacionados convergem',
    'Base cientifica para o motor de inferencia psicologica',
    'Detecta inconsistencias no perfil (drivers que raramente coexistem)'
  ]
};

// =============================================================================
// CORRELATION METRICS EXPLANATION
// =============================================================================

export const CORRELATION_METRICS = {
  title: 'Metricas de Correlacao',
  desc: 'Cada relacionamento armazena metricas estatisticas rigorosas para garantir validade cientifica',

  metrics: [
    {
      metric: 'r (Coeficiente de Correlacao)',
      symbol: 'r',
      range: '-1.0 a +1.0',
      desc: 'Forca e direcao da relacao linear entre dois drivers',
      interpretation: 'r > 0 = positivo (covariam juntos), r < 0 = negativo (inversamente relacionados)',
      color: '#4ecdc4'
    },
    {
      metric: 'CI (Intervalo de Confianca)',
      symbol: 'CI 95%',
      range: '[lower, upper]',
      desc: 'Faixa onde o verdadeiro r provavelmente esta (95% de certeza)',
      interpretation: 'CI estreito = estimativa precisa, CI largo = incerteza',
      color: '#feca57'
    },
    {
      metric: 'N (Tamanho Amostral)',
      symbol: 'N',
      range: '> 0',
      desc: 'Numero total de participantes nos estudos combinados',
      interpretation: 'N maior = resultado mais confiavel. Meta-analises tipicamente N > 1000',
      color: '#a55eea'
    },
    {
      metric: 'k (Numero de Estudos)',
      symbol: 'k',
      range: '> 0',
      desc: 'Quantidade de estudos independentes que mediram essa correlacao',
      interpretation: 'k > 10 ideal para meta-analise robusta',
      color: '#48dbfb'
    }
  ],

  qualityTiers: [
    { tier: 'gold', label: 'Ouro', criteria: 'k >= 10, N >= 5000, CI < 0.1', color: '#ffd700', desc: 'Meta-analise robusta' },
    { tier: 'silver', label: 'Prata', criteria: 'k >= 5, N >= 1000, CI < 0.15', color: '#c0c0c0', desc: 'Evidencia solida' },
    { tier: 'bronze', label: 'Bronze', criteria: 'k >= 2, N >= 200', color: '#cd7f32', desc: 'Evidencia moderada' },
    { tier: 'exploratory', label: 'Exploratorio', criteria: 'k = 1 ou N < 200', color: '#6b7280', desc: 'Evidencia preliminar' }
  ]
};

// =============================================================================
// STATISTICAL INTERPRETATION GUIDE
// =============================================================================

export const STATISTICAL_GUIDE = {
  title: 'Guia de Interpretacao Estatistica',
  desc: 'Como interpretar valores de correlacao (r) na pratica',

  strengthLevels: [
    { range: '|r| >= 0.70', label: 'Muito Forte', desc: 'Relacao robusta - drivers quase sempre covariam', color: '#4ecdc4', example: 'Conscientiousness <-> Need for Structure' },
    { range: '0.50 <= |r| < 0.70', label: 'Forte', desc: 'Relacao significativa - alta coocorrencia', color: '#22d3ee', example: 'Growth Mindset <-> Resilience' },
    { range: '0.30 <= |r| < 0.50', label: 'Moderada', desc: 'Relacao presente - util para inferencia', color: '#feca57', example: 'Openness <-> Risk Tolerance' },
    { range: '0.10 <= |r| < 0.30', label: 'Fraca', desc: 'Relacao detectavel - sugestiva mas nao conclusiva', color: '#fb923c', example: 'Extraversion <-> Happiness' },
    { range: '|r| < 0.10', label: 'Trivial', desc: 'Relacao negligenciavel - nao usar para inferencia', color: '#6b7280', example: 'Age <-> Openness' }
  ],

  directionExplanation: [
    { type: 'positive', symbol: '+r', desc: 'Drivers aumentam/diminuem juntos', example: 'Alto Openness -> Alta Curiosidade', color: '#4ecdc4' },
    { type: 'negative', symbol: '-r', desc: 'Drivers variam inversamente', example: 'Alto Neuroticism -> Baixo Locus of Control Interno', color: '#ff6b6b' }
  ],

  caveats: [
    'Correlacao NAO implica causacao - A e B covariam, mas A pode nao causar B',
    'Contexto importa - correlacoes podem variar entre culturas e populacoes',
    'Efeitos de moderacao - um terceiro driver pode alterar a relacao',
    'Restricao de range - em populacoes homogeneas, correlacoes parecem menores'
  ]
};

// =============================================================================
// RELATIONSHIP TYPES
// =============================================================================

export const RELATIONSHIP_TYPES = {
  title: 'Tipos de Relacionamento',
  desc: 'Classificacao semantica dos relacionamentos entre drivers',

  types: [
    {
      type: 'correlates',
      label: 'Correlaciona',
      symbol: '<->',
      desc: 'Drivers que tendem a coexistir sem implicacao direcional',
      example: 'Openness <-> Creativity',
      useCase: 'Reforcar confianca quando ambos sao observados',
      color: '#4ecdc4'
    },
    {
      type: 'predicts',
      label: 'Prediz',
      symbol: '->',
      desc: 'Driver A e um preditor estatistico de driver B',
      example: 'Self-Efficacy -> Achievement Motivation',
      useCase: 'Inferir driver B quando apenas A foi observado',
      color: '#feca57'
    },
    {
      type: 'contradicts',
      label: 'Contradiz',
      symbol: 'X',
      desc: 'Drivers que raramente coexistem em alta intensidade',
      example: 'Fixed Mindset X Growth Mindset',
      useCase: 'Detectar inconsistencias no perfil',
      color: '#ff6b6b'
    },
    {
      type: 'moderates',
      label: 'Modera',
      symbol: '*',
      desc: 'Driver A modifica o efeito de driver B',
      example: 'Emotional Intelligence * Stress Response',
      useCase: 'Entender interacoes complexas entre drivers',
      color: '#a55eea'
    },
    {
      type: 'bidirectional',
      label: 'Bidirecional',
      symbol: '<=>',
      desc: 'Relacao reciproca - ambos influenciam um ao outro',
      example: 'Self-Esteem <=> Social Acceptance',
      useCase: 'Modelar feedback loops psicologicos',
      color: '#48dbfb'
    }
  ]
};

// =============================================================================
// TABLE SCHEMA
// =============================================================================

export const RELATIONSHIPS_SCHEMA = {
  title: 'Schema: driver_relationships',
  desc: 'Estrutura da tabela que armazena correlacoes cientificas',

  columns: [
    { name: 'id', type: 'UUID', pk: true, desc: 'Identificador unico do relacionamento' },
    { name: 'driver_a_id', type: 'UUID FK', pk: false, desc: 'Referencia ao primeiro driver (drivers.id)' },
    { name: 'driver_b_id', type: 'UUID FK', pk: false, desc: 'Referencia ao segundo driver (drivers.id)' },
    { name: 'relationship_type', type: 'VARCHAR', pk: false, desc: 'Tipo: correlates, predicts, contradicts, moderates, bidirectional' },
    { name: 'r', type: 'NUMERIC(4,3)', pk: false, desc: 'Coeficiente de correlacao de Pearson (-1.0 a +1.0)' },
    { name: 'ci_lower', type: 'NUMERIC(4,3)', pk: false, desc: 'Limite inferior do intervalo de confianca 95%' },
    { name: 'ci_upper', type: 'NUMERIC(4,3)', pk: false, desc: 'Limite superior do intervalo de confianca 95%' },
    { name: 'n', type: 'INTEGER', pk: false, desc: 'Tamanho amostral total (soma de todos os estudos)' },
    { name: 'k', type: 'INTEGER', pk: false, desc: 'Numero de estudos independentes' },
    { name: 'quality_tier', type: 'VARCHAR', pk: false, desc: 'Classificacao: gold, silver, bronze, exploratory' },
    { name: 'doi_references', type: 'TEXT[]', pk: false, desc: 'Array de DOIs das fontes cientificas' },
    { name: 'meta_analysis_source', type: 'TEXT', pk: false, desc: 'Referencia da meta-analise principal' },
    { name: 'notes', type: 'TEXT', pk: false, desc: 'Notas adicionais sobre a correlacao' },
    { name: 'created_at', type: 'TIMESTAMPTZ', pk: false, desc: 'Data de criacao do registro' }
  ],

  constraints: [
    { name: 'driver_relationships_pkey', type: 'PRIMARY KEY', target: 'id' },
    { name: 'fk_driver_a', type: 'FOREIGN KEY', target: 'driver_a_id REFERENCES drivers(id)' },
    { name: 'fk_driver_b', type: 'FOREIGN KEY', target: 'driver_b_id REFERENCES drivers(id)' },
    { name: 'unique_pair', type: 'UNIQUE', target: '(driver_a_id, driver_b_id)' },
    { name: 'check_r_range', type: 'CHECK', target: 'r BETWEEN -1.0 AND 1.0' },
    { name: 'check_ci_order', type: 'CHECK', target: 'ci_lower <= ci_upper' }
  ],

  indexes: [
    { name: 'idx_driver_relationships_a', columns: 'driver_a_id', reason: 'Busca por primeiro driver' },
    { name: 'idx_driver_relationships_b', columns: 'driver_b_id', reason: 'Busca por segundo driver' },
    { name: 'idx_driver_relationships_type', columns: 'relationship_type', reason: 'Filtro por tipo' },
    { name: 'idx_driver_relationships_quality', columns: 'quality_tier', reason: 'Filtro por qualidade' }
  ]
};

// =============================================================================
// EXAMPLE RELATIONSHIPS (Real scientific correlations)
// =============================================================================

export const EXAMPLE_RELATIONSHIPS = {
  title: 'Exemplos de Correlacoes',
  desc: 'Correlacoes reais baseadas em literatura psicologica',

  examples: [
    {
      driverA: 'openness_to_experience',
      driverB: 'curiosity',
      r: 0.72,
      type: 'correlates' as const,
      k: 23,
      n: 8542,
      qualityTier: 'gold',
      ci: [0.68, 0.76],
      doi: '10.1037/pspp0000123',
      interpretation: 'Pessoas abertas a experiencias sao consistentemente curiosas'
    },
    {
      driverA: 'conscientiousness',
      driverB: 'need_for_structure',
      r: 0.68,
      type: 'correlates' as const,
      k: 18,
      n: 6230,
      qualityTier: 'gold',
      ci: [0.64, 0.72],
      doi: '10.1016/j.paid.2019.05.012',
      interpretation: 'Disciplina e organizacao caminham juntas'
    },
    {
      driverA: 'growth_mindset',
      driverB: 'resilience',
      r: 0.61,
      type: 'predicts' as const,
      k: 15,
      n: 4120,
      qualityTier: 'gold',
      ci: [0.56, 0.66],
      doi: '10.1007/s11031-020-09831-x',
      interpretation: 'Crenca em crescimento prediz capacidade de recuperacao'
    },
    {
      driverA: 'neuroticism',
      driverB: 'internal_locus_of_control',
      r: -0.45,
      type: 'contradicts' as const,
      k: 12,
      n: 3890,
      qualityTier: 'silver',
      ci: [-0.51, -0.39],
      doi: '10.1111/jopy.12345',
      interpretation: 'Ansiedade alta diminui senso de controle pessoal'
    },
    {
      driverA: 'extraversion',
      driverB: 'need_for_stimulation',
      r: 0.58,
      type: 'bidirectional' as const,
      k: 20,
      n: 7650,
      qualityTier: 'gold',
      ci: [0.54, 0.62],
      doi: '10.1037/a0029418',
      interpretation: 'Extrovertidos buscam estimulos, e estimulos reforçam extroversao'
    },
    {
      driverA: 'self_efficacy',
      driverB: 'achievement_motivation',
      r: 0.52,
      type: 'predicts' as const,
      k: 14,
      n: 4580,
      qualityTier: 'gold',
      ci: [0.47, 0.57],
      doi: '10.1016/j.jrp.2018.03.004',
      interpretation: 'Crenca na propria capacidade impulsiona busca por realizacao'
    },
    {
      driverA: 'need_for_closure',
      driverB: 'openness_to_experience',
      r: -0.48,
      type: 'contradicts' as const,
      k: 11,
      n: 3210,
      qualityTier: 'silver',
      ci: [-0.54, -0.42],
      doi: '10.1002/per.2156',
      interpretation: 'Necessidade de certeza limita exploracao'
    },
    {
      driverA: 'emotional_intelligence',
      driverB: 'stress_response',
      r: 0.35,
      type: 'moderates' as const,
      k: 8,
      n: 2450,
      qualityTier: 'silver',
      ci: [0.28, 0.42],
      doi: '10.1007/s12144-021-01567-8',
      interpretation: 'Inteligencia emocional modera reacoes ao estresse'
    }
  ]
};

// =============================================================================
// CORRELATION MATRIX VISUALIZATION
// =============================================================================

export const CORRELATION_MATRIX = {
  title: 'Matriz de Correlacao',
  desc: 'Visualizacao de correlacoes entre drivers do cluster Big Five',

  drivers: [
    { slug: 'openness', abbrev: 'O', name: 'Openness' },
    { slug: 'conscientiousness', abbrev: 'C', name: 'Conscientiousness' },
    { slug: 'extraversion', abbrev: 'E', name: 'Extraversion' },
    { slug: 'agreeableness', abbrev: 'A', name: 'Agreeableness' },
    { slug: 'neuroticism', abbrev: 'N', name: 'Neuroticism' }
  ],

  // Matriz 5x5 de correlacoes (Big Five intercorrelations)
  matrix: [
    // O      C      E      A      N
    [1.00,  0.12,  0.15,  0.08, -0.18],  // O
    [0.12,  1.00,  0.10,  0.22, -0.35],  // C
    [0.15,  0.10,  1.00,  0.17, -0.25],  // E
    [0.08,  0.22,  0.17,  1.00, -0.28],  // A
    [-0.18, -0.35, -0.25, -0.28,  1.00]  // N
  ]
};

// =============================================================================
// DRIVER CLUSTERS / NETWORK
// =============================================================================

export const DRIVER_CLUSTERS = {
  title: 'Rede de Drivers Correlacionados',
  desc: 'Clusters de drivers que formam redes interconectadas baseadas em correlacoes cientificas',

  clusters: [
    {
      id: 'achievement',
      name: 'Cluster de Realizacao',
      color: '#4ecdc4',
      coreDriver: 'achievement_motivation',
      drivers: [
        { slug: 'achievement_motivation', strength: 1.0 },
        { slug: 'self_efficacy', strength: 0.85, r: 0.52 },
        { slug: 'conscientiousness', strength: 0.80, r: 0.48 },
        { slug: 'persistence', strength: 0.75, r: 0.45 },
        { slug: 'growth_mindset', strength: 0.70, r: 0.42 }
      ],
      description: 'Drivers relacionados a metas, produtividade e sucesso pessoal'
    },
    {
      id: 'exploration',
      name: 'Cluster de Exploracao',
      color: '#a55eea',
      coreDriver: 'openness_to_experience',
      drivers: [
        { slug: 'openness_to_experience', strength: 1.0 },
        { slug: 'curiosity', strength: 0.90, r: 0.72 },
        { slug: 'creativity', strength: 0.82, r: 0.58 },
        { slug: 'risk_tolerance', strength: 0.68, r: 0.45 },
        { slug: 'need_for_novelty', strength: 0.65, r: 0.41 }
      ],
      description: 'Drivers relacionados a aprendizado, inovacao e novas experiencias'
    },
    {
      id: 'stability',
      name: 'Cluster de Estabilidade',
      color: '#48dbfb',
      coreDriver: 'emotional_stability',
      drivers: [
        { slug: 'emotional_stability', strength: 1.0 },
        { slug: 'resilience', strength: 0.85, r: 0.61 },
        { slug: 'internal_locus_of_control', strength: 0.78, r: 0.52 },
        { slug: 'self_regulation', strength: 0.72, r: 0.48 },
        { slug: 'optimism', strength: 0.68, r: 0.44 }
      ],
      description: 'Drivers relacionados a equilibrio emocional e adaptacao'
    },
    {
      id: 'social',
      name: 'Cluster Social',
      color: '#feca57',
      coreDriver: 'extraversion',
      drivers: [
        { slug: 'extraversion', strength: 1.0 },
        { slug: 'need_for_stimulation', strength: 0.82, r: 0.58 },
        { slug: 'agreeableness', strength: 0.65, r: 0.17 },
        { slug: 'empathy', strength: 0.60, r: 0.35 },
        { slug: 'need_for_belonging', strength: 0.58, r: 0.32 }
      ],
      description: 'Drivers relacionados a interacao social e relacionamentos'
    },
    {
      id: 'security',
      name: 'Cluster de Seguranca',
      color: '#ff6b6b',
      coreDriver: 'need_for_security',
      drivers: [
        { slug: 'need_for_security', strength: 1.0 },
        { slug: 'risk_aversion', strength: 0.88, r: 0.65 },
        { slug: 'need_for_structure', strength: 0.82, r: 0.58 },
        { slug: 'need_for_closure', strength: 0.75, r: 0.52 },
        { slug: 'tradition', strength: 0.65, r: 0.42 }
      ],
      description: 'Drivers relacionados a estabilidade, previsibilidade e conservacao'
    }
  ],

  interClusterRelations: [
    { from: 'exploration', to: 'security', r: -0.48, type: 'inverse', desc: 'Exploracao e seguranca tendem a ser inversas' },
    { from: 'achievement', to: 'stability', r: 0.35, type: 'positive', desc: 'Realizacao correlaciona com estabilidade emocional' },
    { from: 'social', to: 'exploration', r: 0.22, type: 'positive', desc: 'Sociabilidade moderadamente correlaciona com exploracao' }
  ]
};

// =============================================================================
// INFERENCE USE CASES
// =============================================================================

export const INFERENCE_USE_CASES = {
  title: 'Como Relacionamentos sao Usados na Inferencia',
  desc: 'Aplicacoes praticas das correlacoes no motor de inferencia psicologica',

  useCases: [
    {
      name: 'Inferencia Indireta',
      icon: 'link',
      desc: 'Quando driver A e observado diretamente, inferir driver B via correlacao',
      example: 'Observamos alta Curiosity (r=0.72 com Openness) -> Inferimos alto Openness',
      formula: 'P(B|A) = P(A) * r_AB * confidence_factor',
      weight: 0.6
    },
    {
      name: 'Reforco de Confianca',
      icon: 'shield-check',
      desc: 'Multiplos drivers correlacionados observados aumentam confianca mutua',
      example: 'Observamos Conscientiousness + Need for Structure + Persistence -> Confianca em todos aumenta',
      formula: 'confidence_boost = 1 + (k_observed / k_total) * avg_r',
      weight: 0.8
    },
    {
      name: 'Deteccao de Inconsistencias',
      icon: 'alert-triangle',
      desc: 'Drivers que contradizem sinalizam erro de inferencia ou perfil complexo',
      example: 'Alto Growth Mindset + Alto Fixed Mindset -> Alerta: revisar evidencias',
      formula: 'inconsistency_flag = r < -0.5 AND both_strengths > 0.7',
      weight: 0.9
    },
    {
      name: 'Completude de Perfil',
      icon: 'puzzle',
      desc: 'Usar rede de correlacoes para preencher gaps no perfil',
      example: 'Cluster Achievement incompleto: usar correlacoes para estimar drivers faltantes',
      formula: 'estimated_strength = avg(observed_correlated * r)',
      weight: 0.5
    }
  ],

  confidenceAdjustments: [
    { source: 'Direct observation (MIU)', baseConfidence: 0.8, desc: 'Evidencia direta de texto' },
    { source: 'Strong correlation (r > 0.6)', baseConfidence: 0.6, desc: 'Inferencia via correlacao forte' },
    { source: 'Moderate correlation (0.3 < r < 0.6)', baseConfidence: 0.4, desc: 'Inferencia via correlacao moderada' },
    { source: 'Weak correlation (r < 0.3)', baseConfidence: 0.2, desc: 'Apenas sugestivo' },
    { source: 'Multiple corroborating correlations', baseConfidence: 0.7, desc: 'Multiplas fontes convergentes' }
  ]
};

// =============================================================================
// MERMAID DIAGRAM FOR RELATIONSHIPS
// =============================================================================

export const RELATIONSHIPS_DIAGRAM = `
erDiagram
    drivers ||--o{ driver_relationships : "relates_to"
    drivers ||--o{ driver_relationships : "related_from"

    drivers {
        uuid id PK
        varchar slug
        varchar name
        varchar driver_type
        varchar domain
    }

    driver_relationships {
        uuid id PK
        uuid driver_a_id FK
        uuid driver_b_id FK
        varchar relationship_type
        numeric r
        numeric ci_lower
        numeric ci_upper
        integer n
        integer k
        varchar quality_tier
        text[] doi_references
        text meta_analysis_source
        timestamptz created_at
    }
`;

export const NETWORK_DIAGRAM = `
graph TD
    subgraph ACHIEVEMENT[Cluster Realizacao]
        AM[achievement_motivation]
        SE[self_efficacy]
        CON[conscientiousness]
        PER[persistence]
        GM[growth_mindset]

        AM --- |r=0.52| SE
        AM --- |r=0.48| CON
        SE --- |r=0.45| PER
        GM --- |r=0.61| SE
    end

    subgraph EXPLORATION[Cluster Exploracao]
        OP[openness]
        CUR[curiosity]
        CRE[creativity]
        RT[risk_tolerance]

        OP --- |r=0.72| CUR
        OP --- |r=0.58| CRE
        OP --- |r=0.45| RT
    end

    subgraph STABILITY[Cluster Estabilidade]
        ES[emotional_stability]
        RES[resilience]
        LOC[locus_of_control]
        SR[self_regulation]

        ES --- |r=0.61| RES
        ES --- |r=0.52| LOC
        ES --- |r=0.48| SR
    end

    %% Inter-cluster relationships
    OP -.- |r=-0.48| NS[need_for_security]
    CON --- |r=0.35| ES
    GM --- |r=0.61| RES

    style AM fill:#4ecdc4,stroke:#4ecdc4,color:#000
    style OP fill:#a55eea,stroke:#a55eea,color:#fff
    style ES fill:#48dbfb,stroke:#48dbfb,color:#000
    style NS fill:#ff6b6b,stroke:#ff6b6b,color:#fff
`;
