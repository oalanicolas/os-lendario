// =============================================================================
// DATA TABLES
// =============================================================================

export type TableStatus = 'ok' | 'partial' | 'empty' | 'proposed';

export interface TableRecord {
  table: string;
  records: number | string;
  status: TableStatus;
  desc: string;
}

export interface GapRecord {
  gap: string;
  impact: string;
  solution: string;
  priority: 'P0' | 'P1' | 'P2';
}

export const DRIVER_TABLE: TableRecord[] = [
  { table: 'drivers', records: 945, status: 'ok', desc: 'Catalogo de drivers (traits, beliefs, values, needs, mindsets)' },
  { table: 'driver_relationships', records: 527, status: 'ok', desc: 'Correlacoes cientificas (r, CI, k, N, DOI)' },
  { table: 'mind_drivers', records: 6, status: 'partial', desc: 'Drivers atribuidos a minds - em progresso' },
  { table: 'fragment_drivers', records: 28, status: 'partial', desc: 'Rastreabilidade Fragment para Driver' }
];

export const MAPPING_TABLE: TableRecord[] = [
  { table: 'mapping_systems', records: 121, status: 'ok', desc: 'Big Five, HEXACO, MBTI, Enneagram, IFS, etc.' },
  { table: 'system_components', records: 615, status: 'ok', desc: 'Dimensoes, facetas, tipos de cada sistema' },
  { table: 'component_driver_map', records: 367, status: 'partial', desc: 'So Big Five, MBTI, DISC, Enneagram mapeados' },
  { table: 'mind_component_scores', records: 0, status: 'empty', desc: 'Scores de minds em componentes - CRITICO' },
  { table: 'mind_system_mappings', records: 0, status: 'empty', desc: 'Resultados completos de assessment' }
];

export const TOOLS_TABLE: TableRecord[] = [
  { table: 'tools', records: 294, status: 'ok', desc: 'Worldviews, frameworks, methodologies, etc.' },
  { table: 'tool_relations', records: 142, status: 'ok', desc: 'Genealogia (derived_from, complements)' },
  { table: 'tool_driver_affinities', records: 83, status: 'partial', desc: 'A PONTE - Conecta tools com drivers' },
  { table: 'mind_tools', records: 0, status: 'empty', desc: 'Ferramentas usadas por cada mind' }
];

export const GAPS_TABLE: GapRecord[] = [
  { gap: 'fragments sem drivers', impact: 'Baixa cobertura de rastreabilidade', solution: 'Expandir fragment_drivers (28 → mais)', priority: 'P1' },
  { gap: 'mind_drivers = 6', impact: 'Perfil psicologico incompleto', solution: 'Inferir de fragments + validacao', priority: 'P0' },
  { gap: 'tool_driver_affinities = 83', impact: 'Cobertura parcial (83/294 tools)', solution: 'Expandir mapeamento de afinidades', priority: 'P1' },
  { gap: 'mind_component_scores = 0', impact: 'Sem scores psicometricos', solution: 'Derivar de mind_drivers + component_driver_map', priority: 'P1' },
  { gap: 'mind_tools = 0', impact: 'Sem ferramentas atribuidas', solution: 'Popular via analise de contents', priority: 'P2' }
];

// =============================================================================
// GAP IMPACT ANALYSIS DATA
// =============================================================================

export interface GapImpactRecord {
  gap: string;
  table: string;
  currentCount: number;
  blockedBy: string[];
  blocking: string[];
  rootCause: string;
  resolutionSteps: string[];
  effortEstimate: string;
  effortHours: number;
  automatable: boolean;
  dependencies: string[];
}

export const GAP_IMPACTS: GapImpactRecord[] = [
  {
    gap: 'fragments = 1292 (cobertura de drivers baixa)',
    table: 'fragment_drivers',
    currentCount: 28,
    blockedBy: ['Nenhum - processo em andamento'],
    blocking: ['mind_drivers expansion', 'full traceability'],
    rootCause: 'InnerLens extraction parcialmente executado. 28 fragment_drivers criados, mas 1292 fragments existem.',
    resolutionSteps: [
      'Identificar fragments sem driver assignment',
      'Rodar InnerLens driver inference em batch',
      'Validar inferencias (quality gate)',
      'Popular fragment_drivers com evidencias'
    ],
    effortEstimate: '2-3 dias',
    effortHours: 20,
    automatable: true,
    dependencies: ['fragments existentes', 'drivers catalog']
  },
  {
    gap: 'mind_drivers = 6 (baixa cobertura)',
    table: 'mind_drivers',
    currentCount: 6,
    blockedBy: ['fragment_drivers parcial'],
    blocking: ['mind_component_scores', 'tool recommendations', 'fit_score calculation'],
    rootCause: 'Motor de inferencia psicologica precisa de mais fragment_drivers para inferir perfis completos.',
    resolutionSteps: [
      'Expandir fragment_drivers coverage',
      'Configurar inference engine com driver_relationships',
      'Rodar inferencia em batch por mind',
      'Calcular confidence scores',
      'Popular fragment_drivers para rastreabilidade'
    ],
    effortEstimate: '3-5 dias',
    effortHours: 32,
    automatable: true,
    dependencies: ['fragment_drivers > 100', 'drivers catalog', 'driver_relationships']
  },
  {
    gap: 'tool_driver_affinities = 83 (cobertura parcial)',
    table: 'tool_driver_affinities',
    currentCount: 83,
    blockedBy: ['Nenhum - em progresso'],
    blocking: ['Recomendacoes completas de tools', 'fit_score para todas tools'],
    rootCause: '83 de 294 tools mapeadas. Precisa expandir para cobertura completa.',
    resolutionSteps: [
      'Identificar tools sem affinities (294 - ~50 com affinities)',
      'Priorizar por tool_type mais usado',
      'Mapear drivers primarios para cada tool',
      'Definir strength e rationale',
      'Popular em batches por tool_type'
    ],
    effortEstimate: '3-5 dias',
    effortHours: 40,
    automatable: false,
    dependencies: ['tools catalog completo', 'drivers catalog completo']
  },
  {
    gap: 'mind_component_scores = 0',
    table: 'mind_component_scores',
    currentCount: 0,
    blockedBy: ['mind_drivers baixo (6)'],
    blocking: ['Perfis psicometricos completos', 'mind_system_mappings'],
    rootCause: 'Scores sao derivados de mind_drivers via component_driver_map. Precisa mais mind_drivers.',
    resolutionSteps: [
      'Aguardar expansao de mind_drivers',
      'Usar component_driver_map (367 mapeamentos)',
      'Calcular score por componente via weighted average',
      'Normalizar scores por sistema (Big5, MBTI, etc)',
      'Popular confidence based on driver coverage'
    ],
    effortEstimate: '1-2 dias',
    effortHours: 12,
    automatable: true,
    dependencies: ['mind_drivers > 50', 'component_driver_map']
  }
];

// =============================================================================
// RESOLUTION ROADMAP
// =============================================================================

export interface RoadmapStep {
  step: number;
  phase: string;
  action: string;
  input: string;
  output: string;
  effort: string;
  effortHours: number;
  automatable: boolean;
  blockedBy: number[];
  status: 'blocked' | 'ready' | 'in_progress' | 'completed';
}

export const RESOLUTION_ROADMAP: RoadmapStep[] = [
  {
    step: 1,
    phase: 'Extracao',
    action: 'Expandir fragment_drivers de fragments existentes',
    input: 'fragments (1292) + drivers catalog',
    output: 'fragment_drivers expandido (28 → 500+)',
    effort: '2-3 dias',
    effortHours: 20,
    automatable: true,
    blockedBy: [],
    status: 'in_progress'
  },
  {
    step: 2,
    phase: 'Inferencia',
    action: 'Expandir mind_drivers via fragment_drivers',
    input: 'fragment_drivers + drivers + driver_relationships',
    output: 'mind_drivers expandido (6 → 100+)',
    effort: '3-5 dias',
    effortHours: 32,
    automatable: true,
    blockedBy: [1],
    status: 'blocked'
  },
  {
    step: 3,
    phase: 'Mapeamento',
    action: 'Calcular scores psicometricos',
    input: 'mind_drivers + component_driver_map',
    output: 'mind_component_scores + mind_system_mappings',
    effort: '1-2 dias',
    effortHours: 12,
    automatable: true,
    blockedBy: [2],
    status: 'blocked'
  },
  {
    step: 4,
    phase: 'Curadoria',
    action: 'Expandir tool_driver_affinities',
    input: 'tools (294) + drivers + affinities existentes (83)',
    output: 'tool_driver_affinities (83 → 200+)',
    effort: '3-5 dias',
    effortHours: 40,
    automatable: false,
    blockedBy: [],
    status: 'in_progress'
  },
  {
    step: 5,
    phase: 'Recomendacao',
    action: 'Calcular fit_scores e rankings',
    input: 'mind_drivers + tool_driver_affinities',
    output: 'Recomendacoes personalizadas',
    effort: '1 dia',
    effortHours: 8,
    automatable: true,
    blockedBy: [2, 4],
    status: 'blocked'
  }
];

// =============================================================================
// QUICK WINS
// =============================================================================

export interface QuickWin {
  rank: number;
  action: string;
  gap: string;
  roi: 'Alto' | 'Medio' | 'Baixo';
  effort: string;
  effortHours: number;
  impact: string;
  reasoning: string;
}

export const QUICK_WINS: QuickWin[] = [
  {
    rank: 1,
    action: 'Rodar batch de fragment_drivers para 100 fragments',
    gap: 'fragment_drivers = 28',
    roi: 'Alto',
    effort: '4 horas',
    effortHours: 4,
    impact: 'Aumenta cobertura de 2% para 10% dos fragments',
    reasoning: 'Priorizar fragments de minds com mais conteudo. Base para expandir mind_drivers.'
  },
  {
    rank: 2,
    action: 'Expandir tool_driver_affinities para 50 tools',
    gap: 'tool_driver_affinities = 83',
    roi: 'Medio',
    effort: '3 horas',
    effortHours: 3,
    impact: 'Aumenta cobertura de affinities para ~45% das tools',
    reasoning: 'Ja temos 83 affinities. Adicionar mais 50 tools de alto impacto.'
  },
  {
    rank: 3,
    action: 'Script de calculo de mind_component_scores',
    gap: 'mind_component_scores = 0',
    roi: 'Alto',
    effort: '4 horas',
    effortHours: 4,
    impact: 'Automatiza derivacao de scores psicometricos',
    reasoning: 'Com 6 mind_drivers ja e possivel gerar scores parciais. Preparar automacao.'
  }
];

// =============================================================================
// PROPOSED TABLES
// =============================================================================

export interface ProposedTable {
  name: string;
  purpose: string;
  enablesWhat: string[];
  schema: { column: string; type: string; description: string }[];
  priority: 'Alta' | 'Media' | 'Baixa';
}

export const PROPOSED_TABLES: ProposedTable[] = [
  {
    name: 'fragment_component_evidence',
    purpose: 'Rastreabilidade: conecta fragments a scores de componentes psicometricos',
    enablesWhat: [
      'Explicar por que um mind tem score X em Openness',
      'Permitir contestacao e refinamento de scores',
      'Base para validation workflows',
      'Historico de evolucao de perfil'
    ],
    schema: [
      { column: 'id', type: 'UUID', description: 'Primary key' },
      { column: 'fragment_id', type: 'UUID FK', description: 'Referencia ao fragment fonte' },
      { column: 'component_score_id', type: 'UUID FK', description: 'Referencia ao score' },
      { column: 'evidence_type', type: 'VARCHAR', description: 'Tipo: behavioral, linguistic, stated' },
      { column: 'contribution_weight', type: 'DECIMAL', description: 'Peso 0.0-1.0' },
      { column: 'extracted_indicator', type: 'TEXT', description: 'Indicador linguistico extraido' }
    ],
    priority: 'Media'
  },
  {
    name: 'mind_tool_recommendations',
    purpose: 'Cache de recomendacoes de tools calculadas para cada mind',
    enablesWhat: [
      'Recomendacoes pre-calculadas para performance',
      'Historico de recomendacoes',
      'A/B testing de algoritmos de recomendacao',
      'Explicabilidade ("por que essa tool?")'
    ],
    schema: [
      { column: 'id', type: 'UUID', description: 'Primary key' },
      { column: 'mind_id', type: 'UUID FK', description: 'Referencia ao mind' },
      { column: 'tool_id', type: 'UUID FK', description: 'Referencia a tool recomendada' },
      { column: 'fit_score', type: 'DECIMAL', description: 'Score de fit 0.0-1.0' },
      { column: 'ranking', type: 'INTEGER', description: 'Posicao no ranking' },
      { column: 'reasoning', type: 'JSONB', description: 'Explicacao do calculo' },
      { column: 'calculated_at', type: 'TIMESTAMP', description: 'Data do calculo' }
    ],
    priority: 'Baixa'
  }
];

// =============================================================================
// NOTE: Real-time data status is now fetched via useOpsStats hook
// See: app/hooks/useOpsStats.ts
// =============================================================================
