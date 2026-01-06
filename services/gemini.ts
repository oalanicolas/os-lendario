/**
 * Gemini Service - Client para as Edge Functions do Gemini/Imagen
 *
 * Chama as Edge Functions do Supabase ao invés da API diretamente,
 * mantendo a chave de API segura no servidor.
 */

import { supabase } from '../lib/supabase';

// ============================================================================
// Types
// ============================================================================

export interface GeminiGenerateOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  useGrounding?: boolean;
  responseMimeType?: string;
  thinkingBudget?: number;
}

export interface GeminiResponse {
  text: string;
  latencyMs: number;
}

export interface ImagenGenerateOptions {
  prompt: string;
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
}

export interface ImagenResponse {
  imageDataUrl: string;
  latencyMs: number;
}

// ============================================================================
// Edge Function URLs
// ============================================================================

function getEdgeFunctionUrl(functionName: string): string {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('VITE_SUPABASE_URL não configurada');
  }
  return `${supabaseUrl}/functions/v1/${functionName}`;
}

// ============================================================================
// Gemini Text Generation
// ============================================================================

/**
 * Gera texto usando Gemini via Edge Function
 */
export async function generateText(options: GeminiGenerateOptions): Promise<GeminiResponse> {
  const url = getEdgeFunctionUrl('gemini-generate');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ''}`,
    },
    body: JSON.stringify({
      action: 'generate',
      prompt: options.prompt,
      systemInstruction: options.systemInstruction,
      config: {
        temperature: options.temperature,
        useGrounding: options.useGrounding,
        responseMimeType: options.responseMimeType,
        thinkingBudget: options.thinkingBudget,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na Edge Function: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Erro desconhecido na geração');
  }

  return {
    text: data.text,
    latencyMs: data.latencyMs,
  };
}

/**
 * Busca notícias usando Gemini com Google Search grounding
 */
export async function searchWithGrounding(options: GeminiGenerateOptions): Promise<GeminiResponse> {
  return generateText({
    ...options,
    useGrounding: true,
    temperature: options.temperature ?? 0.1,
  });
}

/**
 * Gera conteúdo estruturado (JSON) usando Gemini
 */
export async function generateStructuredContent(
  options: GeminiGenerateOptions
): Promise<GeminiResponse> {
  return generateText({
    ...options,
    responseMimeType: 'application/json',
  });
}

// ============================================================================
// Imagen Image Generation
// ============================================================================

/**
 * Gera imagem usando Imagen via Edge Function
 */
export async function generateImage(options: ImagenGenerateOptions): Promise<ImagenResponse> {
  const url = getEdgeFunctionUrl('imagen-generate');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ''}`,
    },
    body: JSON.stringify({
      prompt: options.prompt,
      aspectRatio: options.aspectRatio || '3:4',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na Edge Function: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Erro desconhecido na geração de imagem');
  }

  // Convert base64 to data URL
  const imageDataUrl = `data:${data.mimeType};base64,${data.imageBase64}`;

  return {
    imageDataUrl,
    latencyMs: data.latencyMs,
  };
}

// ============================================================================
// Convenience Functions for Marketing Tools
// ============================================================================

/**
 * Busca notícias para o Curador[IA]
 */
export async function curatorSearch(niche: string, audience: string): Promise<string> {
  const prompt = `
Você é um Curador de Notícias de Elite da Academia Lendária.
Tarefa: Busque na internet as 12 notícias mais recentes e impactantes sobre o nicho: "${niche}".

Contexto da Audiência: A análise e os ângulos de conteúdo devem ser focados especificamente para impactar: "${audience}".

Requisitos Obrigatórios:
1. Use a ferramenta de busca do Google para encontrar notícias REAIS e ATUAIS (preferencialmente últimas 48h).
2. Classifique cada notícia prioritariamente entre estas 3 categorias: "Investimento", "Mercado" ou "Tecnologia".
3. EXTRAIA A URL DIRETA: O campo "url" deve conter obrigatoriamente o link direto do site da notícia (ex: g1.globo.com, exame.com, techcrunch.com).
4. IMPORTANTE: NÃO retorne links de redirecionamento do Google (google.com/url?q=...). Busque o link canônico final.
5. Analise o impacto especificamente para a audiência citada.
6. Gere pelo menos 4 ângulos de conteúdo (ideias de posts) para essa audiência por notícia.

Retorne APENAS um JSON válido com esta estrutura:
[
  {
    "title": "Título da Notícia",
    "source": "Nome do Veículo",
    "minutesAgo": numero,
    "relevance": numero,
    "category": "Investimento" | "Mercado" | "Tecnologia",
    "summary": "Resumo curto.",
    "impact": "high" | "medium" | "low",
    "url": "https://link-direto-da-fonte",
    "analysis": {
       "whyItMatters": "Por que importa para ${audience}?",
       "opportunity": "Oportunidade para ${audience}",
       "risk": "Risco para ${audience}"
    },
    "angles": [
       { "title": "Titulo do post", "description": "Breve descrição", "bestPlatform": "LinkedIn" | "Instagram Reels" | "YouTube" | "Twitter/X", "successRate": 80-99 }
    ]
  }
]
`;

  const response = await searchWithGrounding({ prompt });
  return response.text;
}

/**
 * Gera roteiro/post para o Curador[IA]
 */
export async function curatorGenerate(
  newsTitle: string,
  audience: string,
  format: string
): Promise<string> {
  let formatInstruction = '';
  if (format === 'carousel' || format.includes('Carrossel') || format.includes('LinkedIn')) {
    formatInstruction = `Crie um ROTEIRO PARA CARROSSEL (Slide a Slide) otimizado para retenção.`;
  } else if (format === 'reels' || format.includes('TikTok') || format.includes('Shorts')) {
    formatInstruction = `Crie um ROTEIRO DE VÍDEO CURTO (Reels/TikTok) de 60 segundos com hooks visuais.`;
  } else if (format === 'twitter' || format.includes('Thread')) {
    formatInstruction = `Crie uma THREAD viral para o Twitter/X.`;
  } else if (format === 'email' || format.includes('Newsletter')) {
    formatInstruction = `Escreva uma NEWSLETTER de alta conversão.`;
  } else {
    formatInstruction = `Crie um ROTEIRO PARA YOUTUBE (Deep Dive).`;
  }

  const prompt = `
Atue como um Copywriter Expert da Academia Lendária.
DADOS DA NOTÍCIA: ${newsTitle}.
PÚBLICO: ${audience}.
MISSÃO: ${formatInstruction}

REGRAS OBRIGATÓRIAS DE OUTPUT:
1. Retorne APENAS o texto final do conteúdo/roteiro.
2. NÃO inclua saudações, introduções (como "Com certeza!", "Aqui está seu roteiro") ou qualquer explicação meta-conversacional.
3. O texto deve começar diretamente no conteúdo.
`;

  const response = await generateText({ prompt, temperature: 0.7 });
  return response.text;
}

/**
 * Gera capa de ebook
 */
export async function generateEbookCover(coverPrompt: string): Promise<string> {
  const fullPrompt = `High-end luxury industrial book cover: ${coverPrompt}. Obsidian black matte, 3D liquid gold elements, cinematic shadows, 8k.`;

  const response = await generateImage({
    prompt: fullPrompt,
    aspectRatio: '3:4',
  });

  return response.imageDataUrl;
}
