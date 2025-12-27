// =============================================================================
// EXAMPLE DATA (Maria Silva)
// =============================================================================

export const EXAMPLE_PIPELINE = [
  { phase: 1, label: 'COLETA', input: '10 reunioes gravadas', output: '10 transcricoes em contents', detail: 'ETL processa audio para texto' },
  { phase: 2, label: 'EXTRACAO', input: '10 transcricoes', output: '847 MIUs extraidos', detail: 'InnerLens identifica unidades minimas' },
  { phase: 3, label: 'INFERENCIA', input: '847 MIUs validados', output: '23 mind_drivers', detail: 'Motor psicologico infere drivers' },
  { phase: 4, label: 'MAPEAMENTO', input: '23 drivers', output: 'Scores Big Five + MBTI', detail: 'Drivers mapeados para sistemas' },
  { phase: 5, label: 'PERFIL', input: 'Scores + drivers', output: 'Perfil Maria Silva', detail: 'Agregacao em minds' },
  { phase: 6, label: 'RECOMENDACAO', input: 'Perfil + affinities', output: '15 tools recomendados', detail: 'Match via tool_driver_affinities' }
];

export const EXAMPLE_MIUS = [
  { verbatim: 'Eu sempre preciso ter um plano antes de comecar qualquer projeto', pronouns: ['Eu'], verbs: ['preciso', 'ter', 'comecar'], driver: 'need_for_structure', strength: 8 },
  { verbatim: 'Nao consigo trabalhar bem quando nao sei o objetivo final', pronouns: ['Eu'], verbs: ['consigo', 'trabalhar', 'sei'], driver: 'goal_orientation', strength: 9 },
  { verbatim: 'Prefiro analisar todas as opcoes antes de decidir', pronouns: ['Eu'], verbs: ['Prefiro', 'analisar', 'decidir'], driver: 'analytical_thinking', strength: 7 }
];

export const EXAMPLE_TOOLS = [
  { tool: 'GTD (Getting Things Done)', type: 'methodology', fit: 0.92, reason: 'Alta need_for_structure + goal_orientation' },
  { tool: 'Eisenhower Matrix', type: 'framework', fit: 0.88, reason: 'Match com analytical_thinking + prioritization' },
  { tool: 'SMART Goals', type: 'framework', fit: 0.85, reason: 'Alinha com goal_orientation' },
  { tool: 'Second Brain (Tiago Forte)', type: 'methodology', fit: 0.82, reason: 'Complementa need_for_structure' }
];
