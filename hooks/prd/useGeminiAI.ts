/**
 * useGeminiAI - Hook for AI-powered content generation in PRD Studio
 *
 * Uses Google Gemini API for generating:
 * - Brief fields (problem, solution)
 * - Requirements from brief
 * - Epics from requirements
 * - Stories from epics
 */

import { useState, useCallback } from 'react';
import {
  PRDBrief,
  PRDRequirement,
  PRDEpic,
  PRDStory,
  RequirementCategory,
  StoryPoints,
  generateId,
} from '../../types/prd-studio';

// ============================================
// TYPES
// ============================================

interface UseGeminiAIOptions {
  apiKey?: string;
  model?: string;
  temperature?: number;
}

interface UseGeminiAIResult {
  // State
  isGenerating: boolean;
  error: Error | null;

  // Brief generation
  generateProblem: (uploadContent: string) => Promise<string>;
  generateSolution: (problem: string, uploadContent: string) => Promise<string>;
  generateScopeItems: (brief: PRDBrief, type: 'in' | 'out') => Promise<string[]>;

  // Requirements generation
  generateRequirements: (brief: PRDBrief) => Promise<PRDRequirement[]>;

  // Plan generation
  generateEpics: (brief: PRDBrief, requirements: PRDRequirement[]) => Promise<PRDEpic[]>;
  generateStories: (
    epic: PRDEpic,
    brief: PRDBrief,
    requirements: PRDRequirement[]
  ) => Promise<PRDStory[]>;
  generateAllStories: (
    epics: PRDEpic[],
    brief: PRDBrief,
    requirements: PRDRequirement[]
  ) => Promise<PRDEpic[]>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_MODEL = 'gemini-1.5-flash';
const DEFAULT_TEMPERATURE = 0.7;
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// ============================================
// PROMPTS
// ============================================

const PROMPTS = {
  problem: (
    content: string
  ) => `Analise o seguinte contexto e identifique o PROBLEMA principal que está sendo resolvido.

CONTEXTO:
${content}

Responda em português de forma clara e objetiva (2-3 parágrafos).
Foque em:
- Qual dor ou necessidade existe
- Quem sofre com esse problema
- Qual o impacto de não resolver

Resposta:`,

  solution: (
    problem: string,
    content: string
  ) => `Dado o problema identificado, proponha uma SOLUÇÃO clara.

PROBLEMA:
${problem}

CONTEXTO ADICIONAL:
${content}

Responda em português de forma clara e objetiva (2-3 parágrafos).
Inclua:
- Abordagem geral da solução
- Principais funcionalidades
- Benefícios esperados

Resposta:`,

  scopeIn: (
    brief: PRDBrief
  ) => `Baseado no brief abaixo, liste itens que DEVEM estar DENTRO do escopo.

PROBLEMA:
${brief.problem}

SOLUÇÃO:
${brief.solution}

Liste 5-8 itens essenciais que devem ser incluídos no escopo.
Formato: uma linha por item, sem numeração ou marcadores.

Itens:`,

  scopeOut: (
    brief: PRDBrief
  ) => `Baseado no brief abaixo, liste itens que devem ficar FORA do escopo.

PROBLEMA:
${brief.problem}

SOLUÇÃO:
${brief.solution}

ESCOPO INCLUÍDO:
${brief.scopeIn}

Liste 5-8 itens que NÃO devem ser incluídos nesta versão.
Formato: uma linha por item, sem numeração ou marcadores.

Itens:`,

  requirements: (brief: PRDBrief) => `Gere requisitos funcionais categorizados usando MoSCoW.

PROBLEMA:
${brief.problem}

SOLUÇÃO:
${brief.solution}

ESCOPO INCLUÍDO:
${brief.scopeIn}

ESCOPO EXCLUÍDO:
${brief.scopeOut}

Gere requisitos no formato JSON:
{
  "must": ["requisito essencial 1", "requisito essencial 2"],
  "should": ["requisito importante 1", "requisito importante 2"],
  "nice": ["requisito desejável 1", "requisito desejável 2"]
}

REGRAS:
- MUST: Essenciais para o MVP funcionar (5-7 itens)
- SHOULD: Importantes mas não bloqueadores (4-6 itens)
- NICE: Melhorias futuras (3-5 itens)
- Cada requisito deve ser claro, específico e acionável
- Use verbos no infinitivo (Ex: "Permitir login com email")

JSON:`,

  epics: (brief: PRDBrief, requirements: PRDRequirement[]) => {
    const approved = requirements.filter((r) => r.status === 'approved');
    const mustReqs = approved.filter((r) => r.category === 'must').map((r) => r.text);
    const shouldReqs = approved.filter((r) => r.category === 'should').map((r) => r.text);

    return `Agrupe os requisitos aprovados em ÉPICOS lógicos.

PROBLEMA:
${brief.problem}

SOLUÇÃO:
${brief.solution}

REQUISITOS MUST:
${mustReqs.map((r) => `- ${r}`).join('\n')}

REQUISITOS SHOULD:
${shouldReqs.map((r) => `- ${r}`).join('\n')}

Gere épicos no formato JSON:
{
  "epics": [
    {
      "title": "Nome do Épico",
      "description": "Descrição breve do que será entregue"
    }
  ]
}

REGRAS:
- Agrupe requisitos relacionados
- 4-6 épicos no máximo
- Nomes claros e objetivos
- Ordem de prioridade (mais críticos primeiro)

JSON:`;
  },

  stories: (epic: PRDEpic, brief: PRDBrief, requirements: PRDRequirement[]) => {
    const approved = requirements.filter((r) => r.status === 'approved');

    return `Gere USER STORIES para o épico "${epic.title}".

DESCRIÇÃO DO ÉPICO:
${epic.description || 'Não especificada'}

CONTEXTO DO PROJETO:
${brief.problem}

REQUISITOS APROVADOS:
${approved.map((r) => `- [${r.category.toUpperCase()}] ${r.text}`).join('\n')}

Gere stories no formato JSON:
{
  "stories": [
    {
      "title": "Título curto da story",
      "description": "Como [persona], quero [ação], para [benefício]",
      "criteria": ["Critério de aceite 1", "Critério de aceite 2", "Critério de aceite 3"],
      "techNotes": "Notas técnicas de implementação (opcional)",
      "points": 3
    }
  ]
}

REGRAS:
- Use formato "Como... quero... para..."
- 3-5 critérios de aceite por story
- Points: 1=XS, 2=S, 3=M, 5=L, 8=XL (use Fibonacci)
- 4-7 stories por épico
- Ordem de implementação lógica

JSON:`;
  },
};

// ============================================
// API HELPER
// ============================================

async function callGemini(
  prompt: string,
  apiKey: string,
  model: string = DEFAULT_MODEL,
  temperature: number = DEFAULT_TEMPERATURE
): Promise<string> {
  const url = `${API_BASE_URL}/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data: GeminiResponse = await response.json();

  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response from Gemini API');
  }

  return data.candidates[0].content.parts[0].text;
}

function extractJSON<T>(text: string): T {
  // Try to find JSON in the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  try {
    return JSON.parse(jsonMatch[0]) as T;
  } catch (e) {
    throw new Error(`Failed to parse JSON: ${e}`);
  }
}

function extractLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith('#')) // Remove headers
    .map((line) => line.replace(/^[-•*]\s*/, '')); // Remove bullet points
}

// ============================================
// MAIN HOOK
// ============================================

export function useGeminiAI(options: UseGeminiAIOptions = {}): UseGeminiAIResult {
  const {
    apiKey = import.meta.env.VITE_GEMINI_API_KEY || '',
    model = DEFAULT_MODEL,
    temperature = DEFAULT_TEMPERATURE,
  } = options;

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ==========================================
  // BRIEF GENERATION
  // ==========================================

  const generateProblem = useCallback(
    async (uploadContent: string): Promise<string> => {
      if (!apiKey) throw new Error('Gemini API key not configured');

      setIsGenerating(true);
      setError(null);

      try {
        const result = await callGemini(PROMPTS.problem(uploadContent), apiKey, model, temperature);
        return result.trim();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate problem');
        setError(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, model, temperature]
  );

  const generateSolution = useCallback(
    async (problem: string, uploadContent: string): Promise<string> => {
      if (!apiKey) throw new Error('Gemini API key not configured');

      setIsGenerating(true);
      setError(null);

      try {
        const result = await callGemini(
          PROMPTS.solution(problem, uploadContent),
          apiKey,
          model,
          temperature
        );
        return result.trim();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate solution');
        setError(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, model, temperature]
  );

  const generateScopeItems = useCallback(
    async (brief: PRDBrief, type: 'in' | 'out'): Promise<string[]> => {
      if (!apiKey) throw new Error('Gemini API key not configured');

      setIsGenerating(true);
      setError(null);

      try {
        const prompt = type === 'in' ? PROMPTS.scopeIn(brief) : PROMPTS.scopeOut(brief);
        const result = await callGemini(prompt, apiKey, model, temperature);
        return extractLines(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate scope items');
        setError(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, model, temperature]
  );

  // ==========================================
  // REQUIREMENTS GENERATION
  // ==========================================

  const generateRequirements = useCallback(
    async (brief: PRDBrief): Promise<PRDRequirement[]> => {
      if (!apiKey) throw new Error('Gemini API key not configured');

      setIsGenerating(true);
      setError(null);

      try {
        const result = await callGemini(PROMPTS.requirements(brief), apiKey, model, temperature);

        const parsed = extractJSON<{
          must: string[];
          should: string[];
          nice: string[];
        }>(result);

        const now = new Date().toISOString();
        const requirements: PRDRequirement[] = [];

        const addReqs = (texts: string[], category: RequirementCategory) => {
          texts.forEach((text) => {
            requirements.push({
              id: generateId(),
              text,
              category,
              status: 'pending',
              createdAt: now,
              updatedAt: now,
            });
          });
        };

        addReqs(parsed.must || [], 'must');
        addReqs(parsed.should || [], 'should');
        addReqs(parsed.nice || [], 'nice');

        return requirements;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate requirements');
        setError(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, model, temperature]
  );

  // ==========================================
  // PLAN GENERATION
  // ==========================================

  const generateEpics = useCallback(
    async (brief: PRDBrief, requirements: PRDRequirement[]): Promise<PRDEpic[]> => {
      if (!apiKey) throw new Error('Gemini API key not configured');

      setIsGenerating(true);
      setError(null);

      try {
        const result = await callGemini(
          PROMPTS.epics(brief, requirements),
          apiKey,
          model,
          temperature
        );

        const parsed = extractJSON<{
          epics: Array<{ title: string; description: string }>;
        }>(result);

        const now = new Date().toISOString();

        return (parsed.epics || []).map((epic) => ({
          id: generateId(),
          title: epic.title,
          description: epic.description,
          stories: [],
          createdAt: now,
          updatedAt: now,
        }));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate epics');
        setError(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, model, temperature]
  );

  const generateStories = useCallback(
    async (epic: PRDEpic, brief: PRDBrief, requirements: PRDRequirement[]): Promise<PRDStory[]> => {
      if (!apiKey) throw new Error('Gemini API key not configured');

      setIsGenerating(true);
      setError(null);

      try {
        const result = await callGemini(
          PROMPTS.stories(epic, brief, requirements),
          apiKey,
          model,
          temperature
        );

        const parsed = extractJSON<{
          stories: Array<{
            title: string;
            description: string;
            criteria: string[];
            techNotes?: string;
            points: number;
          }>;
        }>(result);

        const now = new Date().toISOString();

        return (parsed.stories || []).map((story) => ({
          id: generateId(),
          title: story.title,
          description: story.description,
          criteria: story.criteria || [],
          techNotes: story.techNotes || '',
          points: (story.points as StoryPoints) || 3,
          createdAt: now,
          updatedAt: now,
        }));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate stories');
        setError(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, model, temperature]
  );

  const generateAllStories = useCallback(
    async (
      epics: PRDEpic[],
      brief: PRDBrief,
      requirements: PRDRequirement[]
    ): Promise<PRDEpic[]> => {
      if (!apiKey) throw new Error('Gemini API key not configured');

      setIsGenerating(true);
      setError(null);

      try {
        const updatedEpics: PRDEpic[] = [];

        for (const epic of epics) {
          const stories = await generateStories(epic, brief, requirements);
          updatedEpics.push({
            ...epic,
            stories,
            updatedAt: new Date().toISOString(),
          });
        }

        return updatedEpics;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate all stories');
        setError(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, generateStories]
  );

  // ==========================================
  // RETURN
  // ==========================================

  return {
    isGenerating,
    error,
    generateProblem,
    generateSolution,
    generateScopeItems,
    generateRequirements,
    generateEpics,
    generateStories,
    generateAllStories,
  };
}

export default useGeminiAI;
