import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

// =============================================================================
// TYPES
// =============================================================================

export interface AIGenerationResult<T = string> {
  content: T;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
  model: string;
  finishReason: 'end_turn' | 'max_tokens' | 'stop_sequence';
}

export interface UsePRDAIOptions {
  /** System prompt */
  systemPrompt?: string;
  /** Maximum tokens in response */
  maxTokens?: number;
  /** Temperature (0-1) */
  temperature?: number;
  /** Skip cache */
  skipCache?: boolean;
  /** Callback for streaming chunks */
  onChunk?: (chunk: string) => void;
}

export interface UsePRDAIResult {
  /** Generate content with Claude */
  generate: (prompt: string, options?: UsePRDAIOptions) => Promise<AIGenerationResult>;
  /** Generate with typed response (JSON) */
  generateTyped: <T>(prompt: string, options?: UsePRDAIOptions) => Promise<T>;
  /** Is generating */
  isGenerating: boolean;
  /** Error from last generation */
  error: Error | null;
  /** Streaming progress (0-100) */
  progress: number;
  /** Cancel ongoing generation */
  abort: () => void;
  /** Clear error */
  clearError: () => void;
  /** Is using mock mode */
  isUsingMock: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const RETRY_DELAYS = [1000, 2000, 4000]; // Exponential backoff
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// =============================================================================
// CACHE
// =============================================================================

interface CacheEntry {
  data: AIGenerationResult;
  timestamp: number;
}

const responseCache = new Map<string, CacheEntry>();

// Hash function for cache key
const hashPrompt = (prompt: string): string => {
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    const char = prompt.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

// Get from cache
const getCached = (key: string): AIGenerationResult | null => {
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  responseCache.delete(key);
  return null;
};

// Set cache
const setCache = (key: string, data: AIGenerationResult): void => {
  responseCache.set(key, { data, timestamp: Date.now() });
};

// =============================================================================
// MOCK RESPONSES
// =============================================================================

const MOCK_RESPONSES: Record<string, string> = {
  blindspots: JSON.stringify({
    blindSpots: [
      {
        id: '1',
        title: 'Escalabilidade',
        description: 'Como o sistema vai escalar com milhares de usuários?',
        category: 'Técnico',
        selected: false,
      },
      {
        id: '2',
        title: 'Monetização',
        description: 'Qual o modelo de receita do produto?',
        category: 'Mercado',
        selected: false,
      },
      {
        id: '3',
        title: 'Acessibilidade',
        description: 'O produto é acessível para pessoas com deficiência?',
        category: 'UX',
        selected: false,
      },
    ],
  }),
  default:
    'Esta é uma resposta mock. Configure a Supabase Edge Function para usar a Claude API real.',
};

const getMockResponse = (prompt: string): string => {
  if (prompt.toLowerCase().includes('blind') || prompt.toLowerCase().includes('ponto cego')) {
    return MOCK_RESPONSES.blindspots;
  }
  return MOCK_RESPONSES.default;
};

// =============================================================================
// HOOK
// =============================================================================

export function usePRDAI(): UsePRDAIResult {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUsingMock, setIsUsingMock] = useState(!isSupabaseConfigured());

  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  // Main generate function
  const generate = useCallback(
    async (prompt: string, options: UsePRDAIOptions = {}): Promise<AIGenerationResult> => {
      const {
        systemPrompt,
        maxTokens = 4096,
        temperature = 0.7,
        skipCache = false,
        onChunk,
      } = options;

      // Check cache first
      const cacheKey = hashPrompt(prompt + (systemPrompt || '') + maxTokens + temperature);
      if (!skipCache) {
        const cached = getCached(cacheKey);
        if (cached) {
          console.log('[PRD-AI] Cache hit');
          return cached;
        }
      }

      setIsGenerating(true);
      setError(null);
      setProgress(0);

      // Create abort controller
      abortControllerRef.current = new AbortController();

      try {
        // Mock mode
        if (!isSupabaseConfigured()) {
          setIsUsingMock(true);
          console.warn('[PRD-AI] Supabase not configured - using mock response');

          // Simulate delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setProgress(50);
          await new Promise((resolve) => setTimeout(resolve, 500));
          setProgress(100);

          const mockContent = getMockResponse(prompt);

          const result: AIGenerationResult = {
            content: mockContent,
            usage: {
              inputTokens: Math.floor(prompt.length / 4),
              outputTokens: Math.floor(mockContent.length / 4),
            },
            model: 'mock-model',
            finishReason: 'end_turn',
          };

          if (!skipCache) {
            setCache(cacheKey, result);
          }

          return result;
        }

        // Real API call with retry
        let lastError: Error | null = null;
        const startTime = Date.now();

        for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
          try {
            setProgress(10 + attempt * 10);

            const { data, error: invokeError } = await supabase.functions.invoke('prd-generate', {
              body: {
                prompt,
                systemPrompt,
                maxTokens,
                temperature,
                stream: !!onChunk,
              },
            });

            if (invokeError) {
              throw new Error(invokeError.message || 'Edge function error');
            }

            if (!data) {
              throw new Error('No data returned from edge function');
            }

            const result: AIGenerationResult = {
              content: data.content,
              usage: data.usage || { inputTokens: 0, outputTokens: 0 },
              model: data.model || 'claude-sonnet-4-20250514',
              finishReason: data.finishReason || 'end_turn',
            };

            // Log usage
            console.log('[PRD-AI] Generation complete', {
              promptLength: prompt.length,
              inputTokens: result.usage.inputTokens,
              outputTokens: result.usage.outputTokens,
              duration: Date.now() - startTime,
              attempt: attempt + 1,
            });

            // Cache result
            if (!skipCache) {
              setCache(cacheKey, result);
            }

            setProgress(100);
            return result;
          } catch (err) {
            lastError = err as Error;
            console.warn(`[PRD-AI] Attempt ${attempt + 1} failed:`, err);

            // Don't retry on 4xx errors (client errors)
            const status = (err as any)?.status || (err as any)?.code;
            if (status >= 400 && status < 500) {
              console.error('[PRD-AI] Client error, not retrying');
              break;
            }

            // Wait before retry
            if (attempt < RETRY_DELAYS.length) {
              console.log(`[PRD-AI] Retrying in ${RETRY_DELAYS[attempt]}ms...`);
              await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS[attempt]));
            }
          }
        }

        // All retries failed
        setError(lastError);
        throw lastError;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  // Generate with typed response
  const generateTyped = useCallback(
    async <T>(prompt: string, options?: UsePRDAIOptions): Promise<T> => {
      const enhancedSystemPrompt = `${options?.systemPrompt || ''}

IMPORTANT: Respond ONLY with valid JSON. No explanations, no markdown, no code blocks. Just pure JSON.`;

      const result = await generate(prompt, {
        ...options,
        systemPrompt: enhancedSystemPrompt,
      });

      try {
        // Try to extract JSON from response
        let jsonContent = result.content;

        // Remove potential markdown code blocks
        const jsonMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
          jsonContent = jsonMatch[1];
        }

        // Trim whitespace
        jsonContent = jsonContent.trim();

        return JSON.parse(jsonContent) as T;
      } catch (parseError) {
        console.error('[PRD-AI] Failed to parse JSON response:', result.content);
        throw new Error('Failed to parse AI response as JSON');
      }
    },
    [generate]
  );

  // Abort function
  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setProgress(0);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    generate,
    generateTyped,
    isGenerating,
    error,
    progress,
    abort,
    clearError,
    isUsingMock,
  };
}

export default usePRDAI;
