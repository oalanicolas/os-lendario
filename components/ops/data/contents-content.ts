// =============================================================================
// CONTENTS & CONTENT PIPELINE EDUCATIONAL CONTENT
// =============================================================================

export interface ContentTypeInfo {
  type: string;
  category: 'mind' | 'course' | 'media' | 'other';
  description: string;
  example: string;
  miuDensity: 'high' | 'medium' | 'low';
}

export interface ContentStatusInfo {
  status: string;
  color: 'gray' | 'yellow' | 'green' | 'red';
  description: string;
  nextAction: string;
}

export interface IngestionStepInfo {
  step: number;
  name: string;
  description: string;
  input: string;
  output: string;
  tables: string[];
}

// =============================================================================
// CONTENTS TABLE EXPLANATION
// =============================================================================

export const CONTENTS_EXPLANATION = {
  title: 'Tabela contents - Universal Content Store',
  definition: 'Tabela central que armazena todo conteudo coletado ou gerado. Fonte primaria de material para extracao de MIUs.',
  principle: 'Single Source of Truth: Todo conteudo passa por contents antes de ser processado.',

  keyColumns: [
    { name: 'id', type: 'UUID', desc: 'Primary key' },
    { name: 'slug', type: 'TEXT', desc: 'Identificador unico legivel (ex: podcast-ep-42)' },
    { name: 'title', type: 'TEXT', desc: 'Titulo do conteudo' },
    { name: 'content_type', type: 'TEXT', desc: 'Tipo semantico (podcast, interview, article, etc.)' },
    { name: 'content', type: 'TEXT', desc: 'Texto completo - fonte para extracao de MIUs' },
    { name: 'project_id', type: 'UUID FK', desc: 'Agrupa conteudos relacionados (serie de podcast, livro, etc.)' },
    { name: 'parent_content_id', type: 'UUID FK', desc: 'Hierarquia (capitulo -> secao -> subsecao)' },
    { name: 'status', type: 'TEXT', desc: 'Workflow: draft -> reviewed -> published -> archived' },
    { name: 'ai_generated', type: 'BOOLEAN', desc: 'Distingue conteudo coletado de conteudo gerado' },
    { name: 'fidelity_score', type: 'NUMERIC', desc: 'Qualidade da transcricao (0.0 a 1.0)' },
  ],

  relationships: {
    belongsTo: [
      { table: 'content_projects', via: 'project_id', desc: 'Projeto pai que agrupa este conteudo' },
      { table: 'contents', via: 'parent_content_id', desc: 'Hierarquia de conteudos (self-reference)' },
    ],
    hasMany: [
      { table: 'fragments', via: 'source_id', desc: 'Fragmentos extraidos (legado)' },
      { table: 'mius', via: 'source_id', desc: 'MIUs extraidos (zero-inference)' },
    ],
    manyToMany: [
      { table: 'minds', via: 'content_minds', desc: 'Quem criou/participou do conteudo' },
      { table: 'tags', via: 'content_tags', desc: 'Categorizacao por tags' },
    ],
  },
};

// =============================================================================
// CONTENT PROJECTS EXPLANATION
// =============================================================================

export const CONTENT_PROJECTS_EXPLANATION = {
  title: 'Tabela content_projects - Agrupamento Logico',
  definition: 'Agrupa conteudos relacionados em projetos. Um podcast inteiro, uma serie de entrevistas, um livro.',

  keyColumns: [
    { name: 'slug', type: 'TEXT', desc: 'Identificador unico (ex: joao-podcasts-2024)' },
    { name: 'project_type', type: 'TEXT', desc: 'Tipo: mind_artifacts, course, blog_series, etc.' },
    { name: 'status', type: 'TEXT', desc: 'planning -> in_progress -> completed' },
    { name: 'creator_mind_id', type: 'UUID FK', desc: 'Quem criou o projeto' },
    { name: 'persona_mind_id', type: 'UUID FK', desc: 'Mind que sera usado como voz/persona' },
    { name: 'target_audience_id', type: 'UUID FK', desc: 'Perfil de audiencia-alvo' },
  ],

  projectTypes: {
    mind: ['mind_artifacts', 'mind_prompts', 'mind_sources', 'mind_debate'],
    educational: ['course', 'webinar_series', 'ebook', 'book', 'documentation'],
    media: ['blog_series', 'video_series', 'podcast_series', 'newsletter_series'],
    marketing: ['landing_page', 'sales_page', 'email_sequence', 'ad_campaign'],
  },

  example: {
    projectName: 'naval-podcast-collection',
    projectType: 'mind_sources',
    contents: [
      { title: 'Tim Ferriss Podcast #473', contentType: 'podcast' },
      { title: 'Joe Rogan Experience #1309', contentType: 'podcast' },
      { title: 'Naval Almanack - Full Book', contentType: 'book' },
      { title: 'How to Get Rich Tweetstorm', contentType: 'social_post' },
    ],
  },
};

// =============================================================================
// CONTENT TYPES - Detailed breakdown
// =============================================================================

export const CONTENT_TYPES: ContentTypeInfo[] = [
  // Mind Sources - High MIU density (first-person accounts)
  {
    type: 'interview',
    category: 'mind',
    description: 'Entrevista com o sujeito - respostas em primeira pessoa',
    example: 'Lex Fridman entrevista Naval Ravikant',
    miuDensity: 'high',
  },
  {
    type: 'podcast',
    category: 'mind',
    description: 'Podcast onde o sujeito fala extensivamente',
    example: 'Episodio completo do Tim Ferriss Show',
    miuDensity: 'high',
  },
  {
    type: 'book',
    category: 'mind',
    description: 'Livro escrito pelo sujeito ou sobre ele',
    example: 'The Almanack of Naval Ravikant',
    miuDensity: 'high',
  },
  {
    type: 'essay',
    category: 'mind',
    description: 'Texto longo escrito pelo sujeito',
    example: 'Ensaio publicado em blog pessoal',
    miuDensity: 'high',
  },
  {
    type: 'social_post',
    category: 'mind',
    description: 'Posts de redes sociais (Twitter threads, LinkedIn)',
    example: 'Tweetstorm "How to Get Rich"',
    miuDensity: 'medium',
  },
  {
    type: 'video_transcript',
    category: 'mind',
    description: 'Transcricao de video (palestra, keynote)',
    example: 'TED Talk transcrito',
    miuDensity: 'medium',
  },

  // Course Content - Medium MIU density (teaching mode)
  {
    type: 'course_module',
    category: 'course',
    description: 'Modulo de curso estruturado',
    example: 'Modulo 3: Mental Models',
    miuDensity: 'medium',
  },
  {
    type: 'course_lesson',
    category: 'course',
    description: 'Aula individual dentro de modulo',
    example: 'Lesson 3.2: First Principles Thinking',
    miuDensity: 'low',
  },

  // Generated Content - Low MIU density (AI-generated, not authentic)
  {
    type: 'article',
    category: 'media',
    description: 'Artigo gerado ou curado',
    example: 'Post de blog sobre o sujeito',
    miuDensity: 'low',
  },
  {
    type: 'blog_post',
    category: 'media',
    description: 'Post de blog',
    example: 'Analise de ideias do sujeito',
    miuDensity: 'low',
  },
];

// =============================================================================
// STATUS WORKFLOW
// =============================================================================

export const CONTENT_STATUSES: ContentStatusInfo[] = [
  {
    status: 'draft',
    color: 'gray',
    description: 'Conteudo importado mas nao revisado',
    nextAction: 'Revisar qualidade da transcricao, completude, metadados',
  },
  {
    status: 'reviewed',
    color: 'yellow',
    description: 'Revisado, pronto para processamento',
    nextAction: 'Rodar InnerLens para extracao de MIUs',
  },
  {
    status: 'published',
    color: 'green',
    description: 'Processado, MIUs extraidos, pronto para uso',
    nextAction: 'Usar em inferencia de drivers e geracao de perfil',
  },
  {
    status: 'archived',
    color: 'red',
    description: 'Conteudo arquivado (duplicado, baixa qualidade)',
    nextAction: 'Nenhum - nao sera processado',
  },
];

// =============================================================================
// FRAGMENTS TABLE (LEGACY)
// =============================================================================

export const FRAGMENTS_EXPLANATION = {
  title: 'Tabela fragments - Sistema Legado',
  definition: 'Chunks de conhecimento extraidos de contents. Inclui campo "insight" que mistura observacao com inferencia.',

  problem: 'O campo "insight" faz inferencias no momento da extracao, tornando dificil rastrear a origem das conclusoes.',

  keyColumns: [
    { name: 'source_id', type: 'UUID FK', desc: 'Referencia ao content de origem' },
    { name: 'mind_id', type: 'UUID FK', desc: 'Mind relacionado' },
    { name: 'type', type: 'TEXT', desc: 'Categoria do fragmento' },
    { name: 'content', type: 'TEXT', desc: 'Texto extraido' },
    { name: 'context', type: 'TEXT', desc: 'Contexto do trecho' },
    { name: 'insight', type: 'TEXT', desc: 'PROBLEMA: inferencia misturada com extracao' },
    { name: 'relevance', type: 'SMALLINT', desc: 'Score de relevancia (0-10)' },
  ],

  comparison: {
    fragments: {
      approach: 'Extracao + Inferencia juntas',
      traceability: 'Baixa - nao sabemos como chegou ao insight',
      reproducibility: 'Baixa - diferentes analistas geram insights diferentes',
    },
    mius: {
      approach: 'Extracao pura, Zero-Inference',
      traceability: 'Alta - cada inferencia rastreavel ao verbatim',
      reproducibility: 'Alta - observaveis sao objetivos',
    },
  },
};

// =============================================================================
// INGESTION PIPELINE - Step by step
// =============================================================================

export const INGESTION_PIPELINE: IngestionStepInfo[] = [
  {
    step: 1,
    name: 'Importacao',
    description: 'Conteudo bruto e importado de fontes externas (URLs, arquivos, APIs)',
    input: 'URL de podcast, arquivo PDF, thread do Twitter',
    output: 'Registro em contents com status="draft"',
    tables: ['contents', 'ingestion_batches'],
  },
  {
    step: 2,
    name: 'Transcricao',
    description: 'Audio/video e convertido em texto via Whisper ou similar',
    input: 'Arquivo de audio/video',
    output: 'Campo content preenchido, fidelity_score calculado',
    tables: ['contents', 'job_executions'],
  },
  {
    step: 3,
    name: 'Normalizacao',
    description: 'Limpeza: remove timestamps, marcadores, normaliza formatacao',
    input: 'Texto bruto com artefatos',
    output: 'Texto limpo e segmentado',
    tables: ['contents'],
  },
  {
    step: 4,
    name: 'Associacao',
    description: 'Vincula conteudo a minds (quem participou) e project',
    input: 'Conteudo normalizado',
    output: 'Registros em content_minds, project_id preenchido',
    tables: ['contents', 'content_minds', 'content_projects'],
  },
  {
    step: 5,
    name: 'Revisao',
    description: 'QA manual ou automatico - valida qualidade minima',
    input: 'Conteudo associado',
    output: 'status atualizado para "reviewed"',
    tables: ['contents'],
  },
  {
    step: 6,
    name: 'Extracao',
    description: 'InnerLens extrai MIUs aplicando zero-inference',
    input: 'Conteudo reviewed',
    output: 'MIUs em tabela mius, status="published"',
    tables: ['contents', 'mius'],
  },
];

// =============================================================================
// CONTENT TO FRAGMENT EXAMPLE
// =============================================================================

export const EXTRACTION_EXAMPLE = {
  title: 'Exemplo: Content -> Fragments/MIUs',

  sourceContent: {
    title: 'Naval on Wealth',
    contentType: 'podcast',
    status: 'published',
    excerpt: 'Eu acredito que a riqueza e uma habilidade que pode ser aprendida. Nao e sobre trabalhar duro - todo mundo trabalha duro. E sobre trabalhar de forma inteligente, entender alavancagem, e jogar jogos de longo prazo com pessoas de longo prazo.',
  },

  asFragment: {
    type: 'philosophy',
    content: 'Eu acredito que a riqueza e uma habilidade que pode ser aprendida...',
    context: 'Naval falando sobre sua filosofia de riqueza',
    insight: 'Naval acredita em wealth como skill, foco em alavancagem, long-term thinking. Demonstra mentalidade de crescimento.',
    relevance: 9,
    problem: 'O insight ja contem interpretacoes (mentalidade de crescimento) nao explicitas no texto',
  },

  asMIUs: [
    {
      verbatim: 'Eu acredito que a riqueza e uma habilidade que pode ser aprendida',
      pronouns: ['Eu'],
      verbs: ['acredito', 'e', 'pode ser aprendida'],
      modal_verbs: ['pode'],
      speaker: 'self',
      pattern: 'Crenca explicita sobre habilidade',
    },
    {
      verbatim: 'Nao e sobre trabalhar duro - todo mundo trabalha duro',
      pronouns: ['todo mundo'],
      verbs: ['e', 'trabalha'],
      modal_verbs: [],
      speaker: 'self',
      pattern: 'Negacao + generalizacao = diferenciacao',
    },
    {
      verbatim: 'E sobre trabalhar de forma inteligente, entender alavancagem, e jogar jogos de longo prazo com pessoas de longo prazo',
      pronouns: [],
      verbs: ['trabalhar', 'entender', 'jogar'],
      modal_verbs: [],
      speaker: 'self',
      pattern: 'Prescricao tripartida - indica valores claros',
    },
  ],

  advantage: 'Com MIUs, podemos depois inferir "growth mindset" na fase de INFERENCIA, e rastrear que essa conclusao veio especificamente do MIU sobre "habilidade que pode ser aprendida".',
};

// =============================================================================
// CONTENT STATISTICS
// =============================================================================

export const CONTENT_STATISTICS = {
  title: 'Estatisticas de Conteudo',

  avgPerMind: {
    title: 'Media por Mind',
    data: [
      { metric: 'Contents por mind', value: '15-30', notes: 'Depende de quao prolifica a pessoa e' },
      { metric: 'Palavras totais', value: '50k-200k', notes: 'Varia muito com tipo de fonte' },
      { metric: 'MIUs extraidos', value: '200-800', notes: 'Taxa de ~3-5 MIUs por 1000 palavras' },
      { metric: 'Fragments (legado)', value: '50-150', notes: 'Granularidade maior que MIUs' },
    ],
  },

  byContentType: {
    title: 'Por Tipo de Conteudo',
    data: [
      { type: 'Podcast (1h)', words: '8k-12k', mius: '40-70', quality: 'Alta' },
      { type: 'Interview (1h)', words: '10k-15k', mius: '60-100', quality: 'Alta' },
      { type: 'Book', words: '50k-80k', mius: '200-400', quality: 'Variavel' },
      { type: 'Twitter thread', words: '500-2k', mius: '5-15', quality: 'Alta (conciso)' },
      { type: 'Blog post', words: '1k-3k', mius: '10-25', quality: 'Media' },
    ],
  },

  processingMetrics: {
    title: 'Metricas de Processamento',
    data: [
      { metric: 'Tempo de transcricao', value: '~0.1x realtime', notes: 'Whisper large' },
      { metric: 'Tempo de extracao MIU', value: '~30s/1000 palavras', notes: 'Com LLM' },
      { metric: 'Taxa de validacao MIU', value: '72%', notes: 'Passam nos quality gates' },
      { metric: 'Custo medio por content', value: '$0.05-0.20', notes: 'Tokens de LLM' },
    ],
  },
};

// =============================================================================
// MERMAID DIAGRAM - Content Flow
// =============================================================================

export const CONTENT_FLOW_DIAGRAM = `
flowchart TB
    subgraph SOURCES[FONTES EXTERNAS]
        S1[/Podcasts/]
        S2[/Artigos/]
        S3[/Livros/]
        S4[/Tweets/]
        S5[/Entrevistas/]
    end

    subgraph INGESTION[INGESTAO]
        I1[Importacao]
        I2[Transcricao]
        I3[Normalizacao]
    end

    subgraph STORAGE[ARMAZENAMENTO]
        CP[(content_projects)]
        C[(contents)]
        CM[(content_minds)]
    end

    subgraph EXTRACTION[EXTRACAO]
        E1[InnerLens]
        E2{Validacao}
    end

    subgraph OUTPUT[SAIDAS]
        M[(mius)]
        F[(fragments)]
    end

    S1 --> I1
    S2 --> I1
    S3 --> I1
    S4 --> I1
    S5 --> I1

    I1 --> I2
    I2 --> I3
    I3 --> C

    CP --> C
    C <--> CM

    C --> E1
    E1 --> E2
    E2 -->|validated| M
    E2 -->|legacy| F

    style M fill:#22c55e,stroke:#22c55e,color:#fff
    style F fill:#f59e0b,stroke:#f59e0b,color:#000
    style C fill:#22D3EE,stroke:#22D3EE,color:#000
    style CP fill:#64748B,stroke:#64748B,color:#fff
`;

// =============================================================================
// ER DIAGRAM - Content Tables
// =============================================================================

export const CONTENT_ER_DIAGRAM = `
erDiagram
    content_projects ||--o{ contents : contains
    content_projects ||--o{ project_minds : has_participants
    contents ||--o{ contents : parent_child
    contents ||--o{ content_minds : has_participants
    contents ||--o{ content_tags : tagged_with
    contents ||--o{ fragments : extracted_to
    contents ||--o{ mius : extracted_to
    minds ||--o{ content_minds : participates_in
    minds ||--o{ project_minds : participates_in
    minds ||--o{ fragments : about
    minds ||--o{ mius : about
    tags ||--o{ content_tags : applied_to

    content_projects {
        uuid id PK
        text slug UK
        text project_type
        text status
        uuid creator_mind_id FK
        uuid persona_mind_id FK
    }

    contents {
        uuid id PK
        text slug UK
        text title
        text content_type
        text content
        uuid project_id FK
        uuid parent_content_id FK
        text status
        boolean ai_generated
        numeric fidelity_score
    }

    content_minds {
        uuid content_id PK,FK
        uuid mind_id PK,FK
        text role
    }

    fragments {
        uuid id PK
        uuid source_id FK
        uuid mind_id FK
        text type
        text content
        text insight
        smallint relevance
    }

    mius {
        uuid id PK
        uuid source_id FK
        uuid mind_id FK
        text verbatim
        array pronouns
        array verbs
        varchar validation_status
    }
`;
