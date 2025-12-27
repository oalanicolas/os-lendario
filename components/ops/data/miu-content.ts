// =============================================================================
// MIU EDUCATIONAL CONTENT
// =============================================================================

export const MIU_EXPLANATION = {
  title: 'O que e um MIU?',
  definition: 'Minimal Interpretable Unit - A menor unidade de texto que carrega significado psicologico observavel, SEM inferencia.',
  principle: 'Zero-Inference: Apenas extraimos o que esta EXPLICITAMENTE dito. Nenhuma interpretacao.',
  fields: [
    { name: 'verbatim', desc: 'Texto exato como foi dito', example: '"Eu sempre acordo cedo porque gosto de ter tempo para mim"' },
    { name: 'pronouns', desc: 'Pronomes usados (indica foco)', example: '["Eu", "mim"] - foco em si mesmo' },
    { name: 'verbs', desc: 'Verbos e formas verbais', example: '["acordo", "gosto", "ter"] - acoes habituais' },
    { name: 'modal_verbs', desc: 'Verbos modais (indicam certeza/obrigacao)', example: '["preciso", "devo", "posso"]' },
    { name: 'speaker', desc: 'Quem esta falando', example: '"self" ou "other"' },
    { name: 'has_question_mark', desc: 'Se e uma pergunta', example: 'true/false' }
  ],
  examples: [
    {
      context: 'Podcast sobre produtividade',
      verbatim: 'Eu nao consigo comecar o dia sem fazer minha lista de tarefas',
      status: 'validated' as const,
      analysis: {
        pronouns: ['Eu'],
        verbs: ['consigo', 'comecar', 'fazer'],
        modal: ['consigo'],
        pattern: 'Negacao + necessidade = indica dependencia/ritual'
      }
    },
    {
      context: 'Entrevista sobre lideranca',
      verbatim: 'A gente sempre tenta ouvir todos antes de tomar uma decisao',
      status: 'validated' as const,
      analysis: {
        pronouns: ['A gente', 'todos'],
        verbs: ['tenta', 'ouvir', 'tomar'],
        modal: [],
        pattern: 'Plural + sempre = indica valor de grupo/consenso'
      }
    },
    {
      context: 'Podcast sobre empreendedorismo',
      verbatim: 'Quando eu comecei, todo mundo dizia que nao ia dar certo, mas eu sabia que precisava tentar',
      status: 'validated' as const,
      analysis: {
        pronouns: ['eu', 'todo mundo'],
        verbs: ['comecei', 'dizia', 'ia dar', 'sabia', 'precisava', 'tentar'],
        modal: ['precisava'],
        pattern: 'Eu vs Mundo + verbo passado = narrativa de resiliencia'
      }
    },
    {
      context: 'Sessao de terapia',
      verbatim: 'Eu fico muito ansioso quando as pessoas esperam algo de mim',
      status: 'validated' as const,
      analysis: {
        pronouns: ['Eu', 'mim', 'as pessoas'],
        verbs: ['fico', 'esperam'],
        modal: [],
        pattern: 'Reacao emocional + gatilho externo = sensibilidade a expectativas'
      }
    },
    {
      context: 'Entrevista sobre lideranca',
      verbatim: 'Um bom lider deve sempre colocar a equipe em primeiro lugar',
      status: 'validated' as const,
      analysis: {
        pronouns: [],
        verbs: ['deve', 'colocar'],
        modal: ['deve'],
        pattern: 'Modal deontico + sempre = crenca normativa forte'
      }
    },
    {
      context: 'Podcast sobre empreendedorismo',
      verbatim: 'Ele disse que o mercado esta dificil',
      status: 'rejected' as const,
      rejectionReason: 'Fala de terceiro sem identificacao clara do speaker. Nao revela pensamento do sujeito principal.',
      analysis: {
        pronouns: ['Ele'],
        verbs: ['disse', 'esta'],
        modal: [],
        pattern: 'Citacao de terceiro - NAO VALIDO como MIU'
      }
    },
    {
      context: 'Entrevista sobre carreira',
      verbatim: 'Nos construimos isso juntos, mas no final das contas, quando eles precisaram decidir, eu tive que assumir a responsabilidade',
      status: 'validated' as const,
      analysis: {
        pronouns: ['Nos', 'eles', 'eu'],
        verbs: ['construimos', 'precisaram', 'decidir', 'tive', 'assumir'],
        modal: ['tive que'],
        pattern: 'Transicao nos→eles→eu = dinamica de grupo com assuncao individual'
      }
    }
  ]
};

// =============================================================================
// VALIDATION PIPELINE
// =============================================================================

export const MIU_VALIDATION = {
  title: 'Pipeline de Validacao',
  description: 'Todo MIU passa por um processo rigoroso de validacao antes de ser usado para inferencias.',
  qualityGates: [
    {
      name: 'Contagem de Palavras',
      rule: 'Minimo 5 palavras, maximo 100 palavras',
      icon: 'ruler-combined',
      reason: 'Muito curto = sem contexto. Muito longo = multiplos MIUs misturados.'
    },
    {
      name: 'Identificacao do Speaker',
      rule: 'Deve ter speaker claramente identificado (self/other)',
      icon: 'microphone',
      reason: 'Sem speaker, nao sabemos de quem e o pensamento.'
    },
    {
      name: 'Presenca de Verbo',
      rule: 'Deve conter pelo menos um verbo',
      icon: 'bolt',
      reason: 'Sem verbo = sem acao ou estado = sem significado psicologico.'
    },
    {
      name: 'Completude Semantica',
      rule: 'Deve ser uma unidade semantica completa',
      icon: 'check',
      reason: 'Fragmentos incompletos geram interpretacoes ambiguas.'
    }
  ],
  statuses: [
    { status: 'pending', color: 'yellow', desc: 'Aguardando revisao automatica ou humana' },
    { status: 'validated', color: 'green', desc: 'Passou em todos os quality gates' },
    { status: 'rejected', color: 'red', desc: 'Falhou em um ou mais gates' },
    { status: 'needs_review', color: 'orange', desc: 'Caso ambiguo, requer revisao humana' }
  ],
  commonRejections: [
    { reason: 'Citacao de terceiro', example: '"Meu pai sempre dizia que..."', fix: 'Extrair apenas se for para caracterizar relacao com o terceiro' },
    { reason: 'Frase incompleta', example: '"E tambem porque..."', fix: 'Juntar com contexto anterior para formar MIU completo' },
    { reason: 'Sem speaker claro', example: '"Alguem disse isso uma vez"', fix: 'Identificar ou descartar' },
    { reason: 'Muito generico', example: '"As coisas sao assim"', fix: 'Buscar contexto mais especifico no texto' },
    { reason: 'Pergunta retorica do entrevistador', example: '"Voce nao acha que..."', fix: 'Focar apenas nas respostas do sujeito' }
  ]
};

// =============================================================================
// LINGUISTIC MARKERS DEEP DIVE
// =============================================================================

export const LINGUISTIC_MARKERS = {
  title: 'Marcadores Linguisticos - Deep Dive',
  description: 'Cada campo do MIU revela informacoes especificas sobre a psicologia do sujeito.',

  pronounPatterns: {
    title: 'Padroes de Pronomes',
    subtitle: 'Pronomes revelam onde o sujeito posiciona sua atencao e agencia.',
    patterns: [
      {
        pronoun: 'Eu / Mim / Me',
        indicates: 'Foco individual, agencia pessoal',
        example: '"Eu decido quando trabalhar"',
        insight: 'Alta frequencia = individualism, autonomia, ou egocentrismo'
      },
      {
        pronoun: 'Nos / A gente',
        indicates: 'Pensamento coletivo, identidade de grupo',
        example: '"A gente sempre resolve junto"',
        insight: 'Alta frequencia = orientacao coletivista, necessidade de pertencimento'
      },
      {
        pronoun: 'Eles / As pessoas',
        indicates: 'Distanciamento, out-group',
        example: '"Eles nao entendem como funciona"',
        insight: 'Alta frequencia = divisao nos-vs-eles, possivel desconfianca'
      },
      {
        pronoun: 'Voce (generico)',
        indicates: 'Generalizacao, distanciamento da experiencia pessoal',
        example: '"Voce tem que fazer o que precisa"',
        insight: 'Uso quando fala de si = defesa, dificuldade de ownership'
      },
      {
        pronoun: 'Meu / Minha',
        indicates: 'Posse, territorializacao',
        example: '"Minha equipe, meu projeto, minha responsabilidade"',
        insight: 'Alta frequencia = senso forte de propriedade e controle'
      }
    ]
  },

  verbTenses: {
    title: 'Tempos Verbais',
    subtitle: 'Onde o sujeito ancora sua narrativa no tempo.',
    patterns: [
      {
        tense: 'Presente Habitual',
        example: '"Eu acordo cedo", "Eu trabalho muito"',
        indicates: 'Identidade estabelecida, padroes estaveis',
        insight: 'Revela como a pessoa se ve no dia-a-dia'
      },
      {
        tense: 'Passado Simples',
        example: '"Eu fiz", "Eu consegui"',
        indicates: 'Eventos concretos, realizacoes',
        insight: 'Orientacao para resultados, foco em conquistas'
      },
      {
        tense: 'Passado Imperfeito',
        example: '"Eu sempre fazia", "Eu costumava"',
        indicates: 'Nostalgia, padroes abandonados',
        insight: 'Possivel saudade ou arrependimento, contraste com presente'
      },
      {
        tense: 'Futuro',
        example: '"Eu vou fazer", "Eu pretendo"',
        indicates: 'Intencao, planejamento',
        insight: 'Orientacao futura, pode indicar fuga do presente'
      },
      {
        tense: 'Condicional',
        example: '"Eu faria", "Eu poderia"',
        indicates: 'Hipotetico, desejo ou hesitacao',
        insight: 'Distancia entre desejo e acao, possivel evitacao'
      }
    ]
  },

  modalVerbs: {
    title: 'Verbos Modais',
    subtitle: 'Revelam niveis de certeza, obrigacao e possibilidade.',
    patterns: [
      {
        modal: 'Devo / Preciso / Tenho que',
        category: 'Deontico - Obrigacao',
        example: '"Eu tenho que entregar resultados"',
        insight: 'Pressao interna ou externa, senso de dever, possivel rigidez'
      },
      {
        modal: 'Posso / Consigo',
        category: 'Dinamico - Capacidade',
        example: '"Eu consigo lidar com pressao"',
        insight: 'Autoconfianca, percepcao de competencia'
      },
      {
        modal: 'Quero / Gostaria',
        category: 'Volitivo - Desejo',
        example: '"Eu quero construir algo grande"',
        insight: 'Motivacao intrinseca, direcao de valores'
      },
      {
        modal: 'Poderia / Deveria',
        category: 'Condicional',
        example: '"Eu deveria estar mais avancado"',
        insight: 'Gap entre real e ideal, autocritica'
      },
      {
        modal: 'Sei / Acredito / Acho',
        category: 'Epistemico - Certeza',
        example: '"Eu sei que funciona" vs "Eu acho que pode funcionar"',
        insight: '"Sei" = certeza. "Acho" = incerteza. Revela nivel de confianca.'
      }
    ]
  },

  negationPatterns: {
    title: 'Padroes de Negacao',
    subtitle: 'Negacoes revelam limites, resistencias e crencas limitantes.',
    patterns: [
      {
        pattern: '"Eu nao consigo"',
        indicates: 'Percepcao de incapacidade',
        contrast: 'vs "Eu nao quero" (escolha)',
        insight: 'Crenca limitante ou realidade? Frequencia importa.'
      },
      {
        pattern: '"Eu nao faco"',
        indicates: 'Escolha deliberada, principio',
        contrast: 'vs "Eu nao consegui" (resultado)',
        insight: 'Pode indicar valor ou evitacao'
      },
      {
        pattern: '"Nunca / Jamais"',
        indicates: 'Absoluto, rigidez',
        contrast: 'vs "Raramente" (flexibilidade)',
        insight: 'Absolutos frequentes = pensamento rigido'
      },
      {
        pattern: '"Nao e que..."',
        indicates: 'Negacao qualificada, defesa',
        contrast: 'Geralmente seguido de justificativa',
        insight: 'Antecipacao de julgamento, necessidade de explicar'
      },
      {
        pattern: 'Dupla negacao',
        indicates: 'Afirmacao hesitante',
        contrast: '"Nao e impossivel" vs "E possivel"',
        insight: 'Dificuldade de afirmar diretamente, cautela'
      }
    ]
  }
};

// =============================================================================
// MIU VS FRAGMENT COMPARISON
// =============================================================================

export const MIU_VS_FRAGMENT = {
  title: 'MIU vs Fragment - Comparacao Visual',
  description: 'O mesmo conteudo pode ser processado de duas formas. MIU e mais rigoroso.',

  comparisonExample: {
    sourceText: '"Eu sempre me cobro demais, acho que herdei isso do meu pai que era muito exigente."',

    asMIU: {
      label: 'Como MIU (Zero-Inference)',
      data: {
        verbatim: 'Eu sempre me cobro demais, acho que herdei isso do meu pai que era muito exigente',
        pronouns: ['Eu', 'me', 'meu'],
        verbs: ['cobro', 'acho', 'herdei', 'era'],
        modal_verbs: [],
        temporal_markers: ['sempre'],
        speaker: 'self',
        has_negation: false,
        has_question: false
      },
      whatsIncluded: [
        'Texto exato (verbatim)',
        'Pronomes observaveis',
        'Verbos presentes',
        'Marcadores temporais',
        'Caracteristicas sintaticas'
      ],
      whatsExcluded: [
        'Interpretacao de "se cobra demais"',
        'Julgamento sobre heranca paterna',
        'Inferencia sobre perfeccionismo'
      ]
    },

    asFragment: {
      label: 'Como Fragment (Com Inferencia)',
      data: {
        content: 'Eu sempre me cobro demais, acho que herdei isso do meu pai que era muito exigente',
        insight: 'Demonstra perfeccionismo herdado do pai, possivel critica interna intensa. Padrao intergeracional de autocobranca.',
        driver_connection: 'Perfeccionismo, Auto-critica',
        evidence_strength: 'high'
      },
      whatsIncluded: [
        'Texto original',
        'Interpretacao psicologica',
        'Conexao com drivers',
        'Forca da evidencia (subjetivo)'
      ],
      problems: [
        'Insight mistura observacao com inferencia',
        'Nao e rastreavel - de onde veio "perfeccionismo"?',
        'Diferentes analistas = diferentes insights'
      ]
    }
  },

  advantages: [
    {
      aspect: 'Rastreabilidade',
      miu: 'Cada inferencia posterior e rastreavel ao verbatim exato',
      fragment: 'Insight ja e misturado, dificil rastrear origem'
    },
    {
      aspect: 'Reproducibilidade',
      miu: 'Dois analistas extraem os mesmos dados observaveis',
      fragment: 'Dois analistas geram insights diferentes'
    },
    {
      aspect: 'Separacao de Conceitos',
      miu: 'Coleta (MIU) separada de Analise (miu_driver_evidence)',
      fragment: 'Coleta e analise misturadas no mesmo registro'
    },
    {
      aspect: 'Validacao',
      miu: 'Facil validar - o verbatim esta no audio/texto?',
      fragment: 'Dificil validar - o insight e correto?'
    },
    {
      aspect: 'Auditoria',
      miu: 'Terceiro pode verificar a cadeia completa',
      fragment: 'Terceiro so ve conclusao, nao o caminho'
    }
  ],

  bottomLine: 'MIUs sao mais trabalhosos na extracao, mas geram uma base de dados muito mais confiavel e auditavel. O custo extra na coleta compensa na qualidade das analises.'
};

// =============================================================================
// EXTRACTION STATISTICS
// =============================================================================

export const MIU_STATISTICS = {
  title: 'Estatisticas de Extracao',
  description: 'Numeros tipicos de um processo de extracao de MIUs.',

  perHour: {
    title: 'MIUs por Hora de Conteudo',
    data: [
      { source: 'Podcast (entrevista)', avgMIUs: '45-70', notes: 'Depende da profundidade das respostas' },
      { source: 'Sessao de terapia', avgMIUs: '80-120', notes: 'Alta densidade de auto-revelacao' },
      { source: 'Palestra/Keynote', avgMIUs: '25-40', notes: 'Mais generico, menos pessoal' },
      { source: 'Video casual (vlogs)', avgMIUs: '30-50', notes: 'Variavel, depende do estilo' },
      { source: 'Entrevista de emprego', avgMIUs: '50-80', notes: 'Estruturada, foco em competencias' }
    ]
  },

  validationRates: {
    title: 'Taxas de Validacao',
    data: [
      { metric: 'Taxa de aprovacao inicial', value: '72%', color: 'green' },
      { metric: 'Taxa de rejeicao', value: '18%', color: 'red' },
      { metric: 'Encaminhados para revisao', value: '10%', color: 'yellow' }
    ]
  },

  commonPatterns: {
    title: 'Padroes Mais Frequentes',
    data: [
      { pattern: 'Pronome "Eu" presente', frequency: '78%' },
      { pattern: 'Verbo no presente', frequency: '52%' },
      { pattern: 'Contem modal', frequency: '34%' },
      { pattern: 'Contem negacao', frequency: '28%' },
      { pattern: 'Referencia a outros', frequency: '45%' },
      { pattern: 'Marcador temporal', frequency: '41%' }
    ]
  },

  processingTime: {
    title: 'Tempo de Processamento',
    manual: '15-20 MIUs/hora (analista humano)',
    assisted: '60-80 MIUs/hora (AI + revisao humana)',
    automated: '200+ MIUs/hora (AI puro, requer validacao posterior)'
  }
};
