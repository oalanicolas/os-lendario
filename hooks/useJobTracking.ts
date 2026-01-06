// @ts-nocheck
/**
 * useJobTracking - Hook para rastrear execuções de LLM
 *
 * Registra chamadas de IA na tabela job_executions para:
 * - Tracking de custos (tokens, USD)
 * - Auditoria de uso
 * - Debugging e análise de performance
 *
 * @example
 * const { trackJob } = useJobTracking();
 *
 * const jobId = await trackJob({
 *   name: 'curator_generate',
 *   model: 'gemini-2.5-flash',
 *   inputParams: { prompt: '...' },
 *   outputResult: { content: '...' },
 *   tokensUsed: 1500,
 *   latencyMs: 2300
 * });
 */

import { useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Job names para as ferramentas de marketing
export type MarketingJobName =
  | 'curator_search' // Busca de notícias com grounding
  | 'curator_generate' // Geração de roteiro/post
  | 'ebook_generate' // Geração do conteúdo do ebook
  | 'ebook_cover'; // Geração da capa do ebook

// LLM Models usados
export type LLMModel =
  | 'gemini-3-pro-preview'
  | 'imagen-3.0-generate-002'
  | 'imagen-3.0-fast-generate-001';

export interface JobTrackingParams {
  /** Nome do job (ex: 'curator_generate') */
  name: MarketingJobName | string;
  /** Modelo LLM usado */
  model: LLMModel | string;
  /** Parâmetros de entrada (prompt, config) */
  inputParams: Record<string, unknown>;
  /** Resultado da execução */
  outputResult: Record<string, unknown>;
  /** Total de tokens usados (se disponível) */
  tokensUsed?: number;
  /** Tokens de prompt */
  tokensPrompt?: number;
  /** Tokens de completion */
  tokensCompletion?: number;
  /** Latência em milissegundos */
  latencyMs?: number;
  /** Custo em USD (se calculado) */
  costUsd?: number;
  /** Erro (se houver) */
  error?: string;
}

interface UseJobTrackingResult {
  /**
   * Registra uma execução de LLM no banco
   * @returns ID do job criado ou null em caso de erro
   */
  trackJob: (params: JobTrackingParams) => Promise<string | null>;

  /**
   * Wrapper para medir latência automaticamente
   * @param name Nome do job
   * @param model Modelo usado
   * @param fn Função async a executar
   * @returns Resultado da função
   */
  trackWithLatency: <T>(
    name: MarketingJobName | string,
    model: LLMModel | string,
    inputParams: Record<string, unknown>,
    fn: () => Promise<T>
  ) => Promise<{ result: T; jobId: string | null }>;
}

export function useJobTracking(): UseJobTrackingResult {
  const trackJob = useCallback(async (params: JobTrackingParams): Promise<string | null> => {
    if (!isSupabaseConfigured()) {
      console.warn('[useJobTracking] Supabase não configurado');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('job_executions')
        .insert({
          name: params.name,
          llm_provider: 'google',
          llm_model: params.model,
          params: params.inputParams,
          result: params.outputResult,
          tokens_prompt: params.tokensPrompt ?? null,
          tokens_completion: params.tokensCompletion ?? null,
          tokens_total: params.tokensUsed ?? null,
          latency_ms: params.latencyMs ?? null,
          cost_usd: params.costUsd ?? null,
          error: params.error ?? null,
          status: params.error ? 'failed' : 'completed',
          executed_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (error) {
        console.error('[useJobTracking] Erro ao registrar job:', error);
        return null;
      }

      return data?.id ?? null;
    } catch (err) {
      console.error('[useJobTracking] Exceção ao registrar job:', err);
      return null;
    }
  }, []);

  const trackWithLatency = useCallback(
    async <T>(
      name: MarketingJobName | string,
      model: LLMModel | string,
      inputParams: Record<string, unknown>,
      fn: () => Promise<T>
    ): Promise<{ result: T; jobId: string | null }> => {
      const startTime = Date.now();
      let result: T;
      let error: string | undefined;

      try {
        result = await fn();
      } catch (err) {
        error = err instanceof Error ? err.message : String(err);
        const latencyMs = Date.now() - startTime;
        await trackJob({
          name,
          model,
          inputParams,
          outputResult: { error },
          latencyMs,
          error,
        });
        throw err;
      }

      const latencyMs = Date.now() - startTime;
      const jobId = await trackJob({
        name,
        model,
        inputParams,
        outputResult: { success: true },
        latencyMs,
      });

      return { result, jobId };
    },
    [trackJob]
  );

  return {
    trackJob,
    trackWithLatency,
  };
}

export default useJobTracking;
