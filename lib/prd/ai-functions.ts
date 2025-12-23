// PRD Studio AI Functions
// Dedicated AI generation functions for structured outputs

// @ts-ignore - zod import may be missing
import { z } from 'zod';

// =============================================================================
// TYPES
// =============================================================================

export type BlindSpotCategory = 'technical' | 'business' | 'user' | 'legal' | 'other';

export interface BlindSpotGenerated {
  text: string;
  category: BlindSpotCategory;
}

export interface ResearchTopicGenerated {
  title: string;
  summary: string;
  content: string;
  sources: string[];
  readingTimeMinutes: number;
}

export interface BriefStructureGenerated {
  problem: string;
  solution: string;
  targetAudience: string;
  differentials: string[];
  risks: string[];
  successMetrics: string[];
  classification: 'task' | 'project';
  estimatedComplexity: 'low' | 'medium' | 'high';
}

// Type for the generate function from usePRDAI
type GenerateFn = (
  prompt: string,
  options?: {
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
  }
) => Promise<{ content: string }>;

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

const VALID_BLIND_SPOT_CATEGORIES: BlindSpotCategory[] = [
  'technical',
  'business',
  'user',
  'legal',
  'other',
];

function isValidBlindSpotCategory(category: string): category is BlindSpotCategory {
  return VALID_BLIND_SPOT_CATEGORIES.includes(category as BlindSpotCategory);
}

function validateBlindSpot(item: unknown): BlindSpotGenerated | null {
  if (!item || typeof item !== 'object') return null;
  const obj = item as Record<string, unknown>;

  if (typeof obj.text !== 'string' || obj.text.length < 10) return null;
  if (typeof obj.category !== 'string' || !isValidBlindSpotCategory(obj.category)) return null;

  return {
    text: obj.text,
    category: obj.category as BlindSpotCategory,
  };
}

function validateBlindSpotsArray(data: unknown): BlindSpotGenerated[] {
  if (!Array.isArray(data)) return [];

  const validated: BlindSpotGenerated[] = [];
  for (const item of data) {
    const valid = validateBlindSpot(item);
    if (valid) validated.push(valid);
  }

  return validated;
}

// =============================================================================
// PROMPTS - BLIND SPOTS
// =============================================================================

const BLIND_SPOTS_SYSTEM = `Você é um analista de produtos experiente que identifica pontos cegos em ideias de projeto.

Seu trabalho é analisar a descrição de um projeto e identificar 3-5 aspectos importantes que o criador pode ter esquecido de considerar.

Regras:
1. Seja específico e relevante para o projeto descrito
2. Cubra diferentes categorias (técnico, negócio, usuário, legal)
3. Formule como perguntas provocativas
4. Evite pontos óbvios demais
5. Foque em riscos reais e gaps de planejamento

Categorias:
- technical: Aspectos de implementação, infraestrutura, segurança
- business: Modelo de negócio, monetização, mercado
- user: Experiência do usuário, acessibilidade, usabilidade
- legal: Compliance, privacidade, regulamentações
- other: Outros aspectos relevantes

Responda APENAS com JSON válido no formato:
[
  { "text": "pergunta ou ponto cego", "category": "categoria" },
  ...
]`;

const BLIND_SPOTS_USER = `Analise esta ideia de projeto e identifique 3-5 pontos cegos importantes:

---
{content}
---

Responda com JSON contendo array de objetos com "text" e "category".`;

// =============================================================================
// FALLBACKS
// =============================================================================

const FALLBACK_BLIND_SPOTS: BlindSpotGenerated[] = [
  {
    text: 'Você considerou como o sistema vai se comportar offline ou com conexão instável?',
    category: 'technical',
  },
  {
    text: 'Qual é o modelo de monetização ou sustentabilidade do projeto?',
    category: 'business',
  },
  {
    text: 'Como usuários com diferentes níveis de familiaridade tecnológica vão usar isso?',
    category: 'user',
  },
  {
    text: 'Existem regulamentações específicas do setor que precisam ser consideradas?',
    category: 'legal',
  },
];

// =============================================================================
// FUNCTIONS
// =============================================================================

/**
 * Generate blind spots (pontos cegos) for a product idea
 * @param uploadContent - The raw product idea content
 * @param generate - The generate function from usePRDAI hook
 * @returns Array of generated blind spots
 */
export async function generateBlindSpots(
  uploadContent: string,
  generate: GenerateFn
): Promise<BlindSpotGenerated[]> {
  try {
    const userPrompt = BLIND_SPOTS_USER.replace('{content}', uploadContent);

    const result = await generate(userPrompt, {
      systemPrompt: BLIND_SPOTS_SYSTEM,
      temperature: 0.8,
      maxTokens: 1024,
    });

    // Parse JSON from response
    const jsonMatch = result.content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[PRD-AI] No JSON array found in blind spots response');
      return FALLBACK_BLIND_SPOTS;
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const validated = validateBlindSpotsArray(parsed);

    // Ensure we have at least 3 results
    if (validated.length < 3) {
      console.warn('[PRD-AI] Too few blind spots generated, using fallback');
      return FALLBACK_BLIND_SPOTS;
    }

    // Limit to 5 results
    return validated.slice(0, 5);
  } catch (error) {
    console.error('[PRD-AI] Failed to generate blind spots:', error);
    return FALLBACK_BLIND_SPOTS;
  }
}

// =============================================================================
// PROMPTS - RESEARCH
// =============================================================================

const RESEARCH_SYSTEM = `Você é um pesquisador especializado em análise de mercado e tendências.
Seu papel é fornecer contexto relevante sobre o domínio do produto proposto.
Seja informativo, cite fontes quando possível, e foque em informações acionáveis.`;

const RESEARCH_USER = `Analise a seguinte ideia de produto e gere 4-5 tópicos de pesquisa relevantes:

{content}

Responda APENAS com um array JSON (sem markdown, sem explicações) no seguinte formato:
[
  {
    "title": "Título do tópico",
    "summary": "Resumo em 1-2 frases",
    "content": "Conteúdo detalhado com 3-4 parágrafos informativos",
    "sources": ["Fonte 1", "Fonte 2"],
    "readingTimeMinutes": 5
  }
]

Tipos de tópicos a cobrir:
- Tendências de mercado e crescimento do setor
- Principais concorrentes e suas abordagens
- Melhores práticas de UX para o domínio
- Tecnologias emergentes relevantes
- Considerações regulatórias ou de compliance (se aplicável)`;

const FALLBACK_RESEARCH: ResearchTopicGenerated[] = [
  {
    title: 'Análise de Mercado',
    summary: 'Visão geral do mercado-alvo e tendências atuais',
    content:
      'O mercado está em constante evolução, com novas tecnologias e preferências dos consumidores surgindo regularmente. É importante entender o panorama atual antes de lançar um novo produto.',
    sources: ['Relatórios de mercado', 'Pesquisas de tendências'],
    readingTimeMinutes: 5,
  },
  {
    title: 'Competidores e Alternativas',
    summary: 'Principais players no mercado e suas estratégias',
    content:
      'Conhecer a competição é fundamental para posicionar seu produto de forma diferenciada. Analise os pontos fortes e fracos dos concorrentes.',
    sources: ['Análise competitiva'],
    readingTimeMinutes: 5,
  },
  {
    title: 'Melhores Práticas de UX',
    summary: 'Padrões de experiência do usuário no setor',
    content:
      'A experiência do usuário é crucial para o sucesso do produto. Siga as melhores práticas estabelecidas enquanto inova onde faz sentido.',
    sources: ['Guidelines de UX', 'Estudos de usabilidade'],
    readingTimeMinutes: 4,
  },
];

/**
 * Generate research topics for a product idea
 * @param uploadContent - The raw product idea content
 * @param generate - The generate function from usePRDAI hook
 * @returns Array of research topics
 */
export async function generateResearch(
  uploadContent: string,
  generate: GenerateFn
): Promise<ResearchTopicGenerated[]> {
  try {
    const userPrompt = RESEARCH_USER.replace('{content}', uploadContent);

    const result = await generate(userPrompt, {
      systemPrompt: RESEARCH_SYSTEM,
      temperature: 0.7,
      maxTokens: 4096,
    });

    // Parse JSON from response
    const jsonMatch = result.content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[PRD-AI] No JSON array found in research response');
      return FALLBACK_RESEARCH;
    }

    const parsed = JSON.parse(jsonMatch[0]) as ResearchTopicGenerated[];

    // Basic validation
    if (!Array.isArray(parsed) || parsed.length < 3) {
      return FALLBACK_RESEARCH;
    }

    return parsed.slice(0, 5);
  } catch (error) {
    console.error('[PRD-AI] Failed to generate research:', error);
    return FALLBACK_RESEARCH;
  }
}

// =============================================================================
// PROMPTS - BRIEF STRUCTURE
// =============================================================================

const BRIEF_SYSTEM = `Você é um product manager experiente que estrutura ideias de produtos em briefs claros e acionáveis.
Seja direto, focado e use linguagem profissional.`;

const BRIEF_USER = `Analise o seguinte contexto de produto e gere um brief estruturado:

IDEIA ORIGINAL:
{uploadContent}

PONTOS CEGOS IDENTIFICADOS:
{blindSpots}

PESQUISA REALIZADA:
{research}

WOWs E INSIGHTS:
{wows}

Responda APENAS com um JSON (sem markdown, sem explicações) no seguinte formato:
{
  "problem": "Descrição clara do problema em 2-3 parágrafos",
  "solution": "Descrição da solução proposta em 2-3 parágrafos",
  "targetAudience": "Descrição do público-alvo em 1-2 parágrafos",
  "differentials": ["Diferencial 1", "Diferencial 2", "Diferencial 3"],
  "risks": ["Risco 1", "Risco 2", "Risco 3"],
  "successMetrics": ["Métrica 1", "Métrica 2", "Métrica 3"],
  "classification": "task" ou "project",
  "estimatedComplexity": "low", "medium" ou "high"
}

Classificação:
- "task": Tarefa simples que pode ser feita em horas/dias
- "project": Projeto completo que requer semanas/meses

Complexidade:
- "low": Poucas funcionalidades, tecnologia simples
- "medium": Múltiplas funcionalidades, integrações
- "high": Sistema complexo, múltiplos componentes`;

const FALLBACK_BRIEF: BriefStructureGenerated = {
  problem: 'Problema a ser definido com base na análise da ideia.',
  solution: 'Solução proposta a ser detalhada.',
  targetAudience: 'Público-alvo a ser identificado.',
  differentials: ['Diferencial único', 'Inovação tecnológica', 'Experiência superior'],
  risks: ['Risco de mercado', 'Risco técnico', 'Risco de adoção'],
  successMetrics: ['Número de usuários', 'Taxa de retenção', 'NPS'],
  classification: 'project',
  estimatedComplexity: 'medium',
};

// =============================================================================
// BRIEF CONTEXT INTERFACE
// =============================================================================

export interface BriefGenerationContext {
  uploadContent: string;
  blindSpots: Array<{
    text?: string;
    title?: string;
    description?: string;
    category: string;
    status?: string;
    selected?: boolean;
  }>;
  research: Array<{ title: string; summary: string; isRead?: boolean }>;
  wows: Array<{ text: string; category: string }>;
  projectType?: 'task' | 'project';
}

// =============================================================================
// FORMATTERS
// =============================================================================

function formatBlindSpots(blindSpots: BriefGenerationContext['blindSpots']): string {
  if (!blindSpots || blindSpots.length === 0) return 'Nenhum ponto cego identificado.';
  return blindSpots
    .filter((bs) => bs.selected !== false)
    .map((bs) => {
      const text = bs.text || bs.title || '';
      const desc = bs.description || '';
      return `- [${bs.category}] ${text}${desc ? ': ' + desc : ''}`;
    })
    .join('\n');
}

function formatResearch(research: BriefGenerationContext['research']): string {
  if (!research || research.length === 0) return 'Pesquisa não realizada.';
  return research
    .filter((r) => r.isRead !== false)
    .map((r) => `### ${r.title}\n${r.summary}`)
    .join('\n\n');
}

function formatWows(wows: BriefGenerationContext['wows']): string {
  if (!wows || wows.length === 0) return 'Nenhum insight registrado.';
  return wows.map((w) => `- [${w.category}] ${w.text}`).join('\n');
}

// =============================================================================
// GENERATE BRIEF (Full context)
// =============================================================================

/**
 * Generate structured brief from full context
 * @param context - BriefGenerationContext with all project data
 * @param generate - The generate function from usePRDAI hook
 * @returns Structured brief
 */
export async function generateBrief(
  context: BriefGenerationContext,
  generate: GenerateFn
): Promise<BriefStructureGenerated> {
  try {
    const userPrompt = BRIEF_USER.replace('{uploadContent}', context.uploadContent)
      .replace('{blindSpots}', formatBlindSpots(context.blindSpots))
      .replace('{research}', formatResearch(context.research))
      .replace('{wows}', formatWows(context.wows));

    const result = await generate(userPrompt, {
      systemPrompt: BRIEF_SYSTEM,
      temperature: 0.7,
      maxTokens: 4096,
    });

    // Parse JSON from response
    const jsonMatch = result.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[PRD-AI] No JSON object found in brief response');
      return FALLBACK_BRIEF;
    }

    const parsed = JSON.parse(jsonMatch[0]) as BriefStructureGenerated;

    // Basic validation
    if (!parsed.problem || !parsed.solution) {
      return FALLBACK_BRIEF;
    }

    return parsed;
  } catch (error) {
    console.error('[PRD-AI] Failed to generate brief:', error);
    return FALLBACK_BRIEF;
  }
}

/**
 * Generate structured brief from pre-formatted strings (legacy)
 * @deprecated Use generateBrief with BriefGenerationContext instead
 */
export async function generateBriefStructure(
  context: {
    uploadContent: string;
    blindSpots: string;
    research: string;
    wows: string;
  },
  generate: GenerateFn
): Promise<BriefStructureGenerated> {
  try {
    const userPrompt = BRIEF_USER.replace('{uploadContent}', context.uploadContent)
      .replace('{blindSpots}', context.blindSpots)
      .replace('{research}', context.research)
      .replace('{wows}', context.wows);

    const result = await generate(userPrompt, {
      systemPrompt: BRIEF_SYSTEM,
      temperature: 0.7,
      maxTokens: 4096,
    });

    // Parse JSON from response
    const jsonMatch = result.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[PRD-AI] No JSON object found in brief response');
      return FALLBACK_BRIEF;
    }

    const parsed = JSON.parse(jsonMatch[0]) as BriefStructureGenerated;

    // Basic validation
    if (!parsed.problem || !parsed.solution) {
      return FALLBACK_BRIEF;
    }

    return parsed;
  } catch (error) {
    console.error('[PRD-AI] Failed to generate brief structure:', error);
    return FALLBACK_BRIEF;
  }
}

// =============================================================================
// EPICS GENERATION
// =============================================================================

export interface EpicGenerated {
  title: string;
  description: string;
  suggestedStoryCount: number;
  dependencies?: string[];
}

// Zod schema for epic validation
export const EpicSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(500),
  suggestedStoryCount: z.number().min(2).max(10),
  dependencies: z.array(z.string()).optional(),
});

export const EpicsArraySchema = z.array(EpicSchema).min(3).max(7);

const EPICS_SYSTEM = `Você é um product manager experiente que quebra PRDs em épicos bem definidos.
Cada épico deve ser um bloco lógico de trabalho que pode ser desenvolvido de forma independente.
Seja claro e objetivo nas descrições.
Estime quantas user stories cada épico vai precisar (entre 2 e 10).`;

const EPICS_USER = `Analise o seguinte PRD e gere 3-7 épicos bem estruturados:

## Objetivos
{objectives}

## Escopo
{scope}

## User Stories
{userStories}

## Requisitos
{requirements}

---

Responda APENAS com JSON válido no formato:
[
  {
    "title": "Nome curto do épico (5-100 caracteres)",
    "description": "Descrição em 2-3 frases do que este épico abrange (20-500 caracteres)",
    "suggestedStoryCount": 5,
    "dependencies": ["Nome de outro épico que precisa ser feito antes"]
  }
]

Regras:
- Cada épico deve ser um bloco lógico de funcionalidade
- Ordene do mais fundamental ao mais avançado
- O primeiro épico geralmente é setup/infraestrutura (sem dependências)
- suggestedStoryCount: estimativa de quantas stories esse épico terá (2-10)
- dependencies: lista de títulos de épicos que precisam ser completados antes
- Os épicos devem cobrir todo o escopo do PRD`;

const FALLBACK_EPICS: EpicGenerated[] = [
  {
    title: 'Infraestrutura Base',
    description:
      'Setup inicial do projeto, configuração de ambiente, estrutura de pastas e dependências principais.',
    suggestedStoryCount: 4,
    dependencies: [],
  },
  {
    title: 'Funcionalidades Core',
    description:
      'Implementação das funcionalidades principais que definem o valor central do produto.',
    suggestedStoryCount: 6,
    dependencies: ['Infraestrutura Base'],
  },
  {
    title: 'Interface e UX',
    description:
      'Desenvolvimento da interface de usuário, fluxos de navegação e experiência do usuário.',
    suggestedStoryCount: 5,
    dependencies: ['Funcionalidades Core'],
  },
  {
    title: 'Integrações e APIs',
    description: 'Conexão com serviços externos, APIs de terceiros e integrações necessárias.',
    suggestedStoryCount: 4,
    dependencies: ['Funcionalidades Core'],
  },
];

/**
 * Generate epics from PRD document sections
 * @param prdDocument - Object with PRD sections (objectives, scope, userStories, requirements)
 * @param generate - The generate function from usePRDAI hook
 * @returns Array of generated epics with Zod validation
 */
export async function generateEpics(
  prdDocument: {
    objectives?: string;
    scope?: string;
    userStories?: string;
    requirements?: string;
  },
  generate: GenerateFn
): Promise<EpicGenerated[]> {
  try {
    const userPrompt = EPICS_USER.replace('{objectives}', prdDocument.objectives || 'Não definido')
      .replace('{scope}', prdDocument.scope || 'Não definido')
      .replace('{userStories}', prdDocument.userStories || 'Não definido')
      .replace('{requirements}', prdDocument.requirements || 'Não definido');

    const result = await generate(userPrompt, {
      systemPrompt: EPICS_SYSTEM,
      temperature: 0.7,
      maxTokens: 2048,
    });

    // Parse JSON from response
    const jsonMatch = result.content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[PRD-AI] No JSON array found in epics response');
      return FALLBACK_EPICS;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate with Zod schema
    const validationResult = EpicsArraySchema.safeParse(parsed);

    if (!validationResult.success) {
      console.warn('[PRD-AI] Zod validation failed:', validationResult.error.errors);

      // Try to salvage valid epics with basic validation
      if (Array.isArray(parsed) && parsed.length >= 2) {
        const salvaged = parsed
          .filter((epic: unknown) => {
            if (!epic || typeof epic !== 'object') return false;
            const e = epic as Record<string, unknown>;
            return (
              typeof e.title === 'string' &&
              typeof e.description === 'string' &&
              e.title.length >= 5
            );
          })
          .map((epic: Record<string, unknown>) => ({
            title: String(epic.title).slice(0, 100),
            description: String(epic.description).slice(0, 500),
            suggestedStoryCount:
              typeof epic.suggestedStoryCount === 'number'
                ? Math.min(10, Math.max(2, epic.suggestedStoryCount))
                : 5,
            dependencies: Array.isArray(epic.dependencies)
              ? epic.dependencies.filter((d): d is string => typeof d === 'string')
              : [],
          }));

        if (salvaged.length >= 3) {
          return salvaged.slice(0, 7);
        }
      }

      return FALLBACK_EPICS;
    }

    return validationResult.data;
  } catch (error) {
    console.error('[PRD-AI] Failed to generate epics:', error);
    return FALLBACK_EPICS;
  }
}

// =============================================================================
// STORIES GENERATION
// =============================================================================

export type StoryComplexity = 'P' | 'M' | 'G';

export interface StoryGenerated {
  title: string;
  userStory: string;
  acceptanceCriteria: string[];
  complexity: StoryComplexity;
}

// Zod schema for story validation
export const StorySchema = z.object({
  title: z.string().min(5).max(100),
  userStory: z.string().min(20).max(500),
  acceptanceCriteria: z.array(z.string().min(5)).min(2).max(5),
  complexity: z.enum(['P', 'M', 'G']),
});

export const StoriesArraySchema = z.array(StorySchema).min(2).max(10);

const STORIES_SYSTEM = `Você é um product manager experiente que cria user stories detalhadas e bem estruturadas.

Regras para User Stories:
1. SEMPRE use o formato: "Como [persona], quero [ação], para [benefício]"
2. A persona deve ser específica (usuário, admin, visitante, etc.)
3. A ação deve ser clara e verificável
4. O benefício deve explicar o valor entregue

Regras para Critérios de Aceite:
1. Comece cada critério com um verbo de ação (Dado, Quando, Então, Deve, Pode)
2. Seja específico e testável
3. Inclua condições de sucesso e edge cases importantes

Complexidade:
- P (Pequena): Tarefas simples, até 2h de trabalho
- M (Média): Tarefas moderadas, 2-8h de trabalho
- G (Grande): Tarefas complexas, mais de 8h de trabalho`;

const STORIES_USER = `Gere user stories para o seguinte épico:

## Épico
**Título:** {epicTitle}
**Descrição:** {epicDescription}

## Contexto do Projeto
**Problema:** {problem}
**Solução:** {solution}
**Público-alvo:** {targetAudience}

---

Gere {count} user stories no formato JSON:
[
  {
    "title": "Título curto e descritivo (5-100 chars)",
    "userStory": "Como [persona], quero [ação], para [benefício]",
    "acceptanceCriteria": [
      "Dado X, quando Y, então Z",
      "Deve permitir...",
      "Não deve permitir..."
    ],
    "complexity": "P" | "M" | "G"
  }
]

Importante:
- Cada story deve ser independente e entregável
- Critérios devem ser testáveis
- Distribua complexidades de forma realista`;

const FALLBACK_STORIES: StoryGenerated[] = [
  {
    title: 'Configuração Inicial',
    userStory:
      'Como desenvolvedor, quero configurar o ambiente de desenvolvimento, para poder iniciar a implementação.',
    acceptanceCriteria: [
      'Deve ter todas as dependências instaladas',
      'Deve ter o ambiente de desenvolvimento funcionando',
      'Deve ter acesso ao repositório configurado',
    ],
    complexity: 'P',
  },
  {
    title: 'Funcionalidade Principal',
    userStory:
      'Como usuário, quero acessar a funcionalidade principal, para resolver meu problema.',
    acceptanceCriteria: [
      'Deve exibir a interface principal',
      'Deve permitir interação básica',
      'Deve salvar o estado corretamente',
    ],
    complexity: 'M',
  },
];

/**
 * Generate stories for a specific epic
 * @param epic - Epic title and description
 * @param context - PRD context (problem, solution, targetAudience)
 * @param count - Number of stories to generate (default: 5)
 * @param generate - The generate function from usePRDAI hook
 * @returns Array of generated stories with Zod validation
 */
export async function generateStories(
  epic: { title: string; description: string },
  context: { problem?: string; solution?: string; targetAudience?: string },
  count: number = 5,
  generate: GenerateFn
): Promise<StoryGenerated[]> {
  try {
    const userPrompt = STORIES_USER.replace('{epicTitle}', epic.title)
      .replace('{epicDescription}', epic.description)
      .replace('{problem}', context.problem || 'Não definido')
      .replace('{solution}', context.solution || 'Não definido')
      .replace('{targetAudience}', context.targetAudience || 'Não definido')
      .replace('{count}', String(Math.min(10, Math.max(3, count))));

    const result = await generate(userPrompt, {
      systemPrompt: STORIES_SYSTEM,
      temperature: 0.7,
      maxTokens: 4096,
    });

    // Parse JSON from response
    const jsonMatch = result.content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[PRD-AI] No JSON array found in stories response');
      return FALLBACK_STORIES;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate with Zod schema
    const validationResult = StoriesArraySchema.safeParse(parsed);

    if (!validationResult.success) {
      console.warn('[PRD-AI] Zod validation failed for stories:', validationResult.error.errors);

      // Try to salvage valid stories
      if (Array.isArray(parsed) && parsed.length >= 2) {
        const salvaged = parsed
          .filter((story: unknown) => {
            if (!story || typeof story !== 'object') return false;
            const s = story as Record<string, unknown>;
            return (
              typeof s.title === 'string' &&
              typeof s.userStory === 'string' &&
              Array.isArray(s.acceptanceCriteria)
            );
          })
          .map((story: Record<string, unknown>) => ({
            title: String(story.title).slice(0, 100),
            userStory: String(story.userStory).slice(0, 500),
            acceptanceCriteria: (story.acceptanceCriteria as string[])
              .filter((c): c is string => typeof c === 'string' && c.length >= 5)
              .slice(0, 5),
            complexity: (['P', 'M', 'G'].includes(String(story.complexity))
              ? story.complexity
              : 'M') as StoryComplexity,
          }))
          .filter((s) => s.acceptanceCriteria.length >= 2);

        if (salvaged.length >= 2) {
          return salvaged.slice(0, 10);
        }
      }

      return FALLBACK_STORIES;
    }

    return validationResult.data;
  } catch (error) {
    console.error('[PRD-AI] Failed to generate stories:', error);
    return FALLBACK_STORIES;
  }
}

// =============================================================================
// REGENERATE SECTION
// =============================================================================

type BriefSectionKey =
  | 'problem'
  | 'solution'
  | 'targetAudience'
  | 'differentials'
  | 'risks'
  | 'successMetrics';

const SECTION_PROMPTS: Record<BriefSectionKey, string> = {
  problem:
    'Reescreva a seção PROBLEMA do brief, focando em ser mais específico sobre a dor do usuário.',
  solution: 'Reescreva a seção SOLUÇÃO do brief, deixando mais claro o valor entregue.',
  targetAudience:
    'Reescreva a seção PÚBLICO-ALVO, sendo mais específico sobre quem é o usuário ideal.',
  differentials: 'Liste novos DIFERENCIAIS (3-5 itens) que tornam esta solução única no mercado.',
  risks: 'Identifique novos RISCOS (3-5 itens) que precisam ser considerados.',
  successMetrics: 'Defina novas MÉTRICAS DE SUCESSO (3-5 itens) mensuráveis e relevantes.',
};

/**
 * Regenerate a specific section of the brief
 * @param sectionKey - The section to regenerate
 * @param currentBrief - The current brief structure
 * @param uploadContent - Original upload content for context
 * @param generate - The generate function from usePRDAI hook
 * @returns New value for the section (string or string[])
 */
export async function regenerateSection(
  sectionKey: BriefSectionKey,
  currentBrief: BriefStructureGenerated,
  uploadContent: string,
  generate: GenerateFn
): Promise<string | string[]> {
  try {
    const isArraySection = ['differentials', 'risks', 'successMetrics'].includes(sectionKey);

    const prompt = `Brief atual:
${JSON.stringify(currentBrief, null, 2)}

Contexto original:
${uploadContent}

Tarefa: ${SECTION_PROMPTS[sectionKey]}

Responda APENAS com ${isArraySection ? 'um array JSON de strings' : 'o texto da seção, sem aspas extras'}.`;

    const result = await generate(prompt, {
      systemPrompt: BRIEF_SYSTEM,
      temperature: 0.8,
      maxTokens: 1024,
    });

    // Parse based on expected type
    if (isArraySection) {
      const jsonMatch = result.content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as string[];
      }
      // Fallback: split by newlines
      return result.content
        .split('\n')
        .map((line) => line.replace(/^[-•*]\s*/, '').trim())
        .filter((line) => line.length > 0);
    }

    // String section - clean up quotes
    return result.content.replace(/^["']|["']$/g, '').trim();
  } catch (error) {
    console.error(`[PRD-AI] Failed to regenerate section ${sectionKey}:`, error);

    // Return current value as fallback
    return currentBrief[sectionKey];
  }
}
