// @ts-nocheck
/**
 * useCuratorStorage - Hook especializado para persistência do Curador[IA]
 *
 * Estende useMarketingStorage com:
 * - Mapeamento específico de NewsItem e AngleData para metadata
 * - Conversão de formato para content_type
 * - Listagem filtrada por tipos do Curator
 *
 * @example
 * const { saveCuratorContent, listCuratorContents, curatorContents } = useCuratorStorage();
 *
 * await saveCuratorContent({
 *   title: 'Roteiro sobre IA',
 *   content: 'HOOK: Você sabia que...',
 *   format: 'reels',
 *   sourceNews: selectedNews,
 *   angleUsed: selectedAngle,
 *   generationParams: { niche: 'IA', audience: 'Empreendedores' }
 * });
 */

import { useCallback, useEffect } from 'react';
import { useMarketingStorage, MarketingContent, MarketingContentType } from './useMarketingStorage';

// ============================================================================
// Types (importados do Curator)
// ============================================================================

export type Platform = 'Instagram Reels' | 'LinkedIn' | 'YouTube' | 'TikTok' | 'Blog' | 'Twitter/X';

export interface AnalysisData {
  whyItMatters: string;
  opportunity: string;
  risk: string;
}

export interface AngleData {
  title: string;
  description: string;
  bestPlatform: Platform;
  successRate: number;
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  minutesAgo: number;
  fullDate: string;
  relevance: number;
  category: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  url: string;
  analysis: AnalysisData;
  angles: AngleData[];
}

export type CuratorFormat = 'reels' | 'youtube' | 'carousel' | 'twitter' | 'email' | 'linkedin';

export interface CuratorGenerationParams {
  niche: string;
  audience: string;
}

// ============================================================================
// Content Type Mapping
// ============================================================================

const FORMAT_TO_CONTENT_TYPE: Record<CuratorFormat, MarketingContentType> = {
  reels: 'video_script',
  youtube: 'video_script',
  carousel: 'social_post',
  twitter: 'social_post',
  linkedin: 'social_post',
  email: 'email_sequence',
};

const CURATOR_CONTENT_TYPES: MarketingContentType[] = [
  'video_script',
  'social_post',
  'email_sequence',
];

// ============================================================================
// Metadata Interface
// ============================================================================

export interface CuratorContentMetadata {
  source: 'curator';
  format: CuratorFormat;
  sourceNews: {
    title: string;
    source: string;
    url: string;
    category: string;
    relevance: number;
    impact: 'high' | 'medium' | 'low';
    fetchedAt: string;
  };
  analysis: AnalysisData;
  angleUsed: {
    title: string;
    platform: Platform;
    successRate: number;
  };
  generationParams: CuratorGenerationParams;
}

// ============================================================================
// Extended Content Interface
// ============================================================================

export interface CuratorContent extends MarketingContent {
  curatorMetadata: CuratorContentMetadata;
}

// ============================================================================
// Save Params
// ============================================================================

export interface SaveCuratorContentParams {
  /** Título do conteúdo */
  title: string;
  /** Conteúdo gerado (roteiro, post, etc.) */
  content: string;
  /** Formato de saída */
  format: CuratorFormat;
  /** Notícia fonte */
  sourceNews: NewsItem;
  /** Ângulo utilizado na geração */
  angleUsed: AngleData;
  /** Parâmetros da busca */
  generationParams: CuratorGenerationParams;
  /** ID do job de geração (opcional) */
  generationExecutionId?: string | null;
}

// ============================================================================
// Hook Result Interface
// ============================================================================

interface UseCuratorStorageResult {
  /** Lista de conteúdos do Curator */
  curatorContents: CuratorContent[];
  /** Estado de carregamento */
  loading: boolean;
  /** Erro, se houver */
  error: Error | null;
  /** Salvar conteúdo do Curator */
  saveCuratorContent: (params: SaveCuratorContentParams) => Promise<string | null>;
  /** Listar conteúdos do Curator */
  listCuratorContents: () => Promise<void>;
  /** Deletar conteúdo */
  deleteCuratorContent: (id: string) => Promise<boolean>;
  /** Recarregar lista */
  refetch: () => Promise<void>;
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Transforma MarketingContent em CuratorContent
 */
function toCuratorContent(content: MarketingContent): CuratorContent {
  const metadata = content.metadata as CuratorContentMetadata;
  return {
    ...content,
    curatorMetadata: metadata,
  };
}

/**
 * Verifica se é conteúdo do Curator
 */
function isCuratorContent(content: MarketingContent): boolean {
  return (
    content.metadata &&
    (content.metadata as Record<string, unknown>).source === 'curator' &&
    CURATOR_CONTENT_TYPES.includes(content.contentType as MarketingContentType)
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useCuratorStorage(): UseCuratorStorageResult {
  const { contents, loading, error, saveContent, listContents, deleteContent } =
    useMarketingStorage();

  /**
   * Salva conteúdo gerado pelo Curator
   */
  const saveCuratorContent = useCallback(
    async (params: SaveCuratorContentParams): Promise<string | null> => {
      const contentType = FORMAT_TO_CONTENT_TYPE[params.format];

      const metadata: CuratorContentMetadata = {
        source: 'curator',
        format: params.format,
        sourceNews: {
          title: params.sourceNews.title,
          source: params.sourceNews.source,
          url: params.sourceNews.url,
          category: params.sourceNews.category,
          relevance: params.sourceNews.relevance,
          impact: params.sourceNews.impact,
          fetchedAt: new Date().toISOString(),
        },
        analysis: params.sourceNews.analysis,
        angleUsed: {
          title: params.angleUsed.title,
          platform: params.angleUsed.bestPlatform,
          successRate: params.angleUsed.successRate,
        },
        generationParams: params.generationParams,
      };

      return saveContent({
        title: params.title,
        content: params.content,
        contentType,
        metadata,
        generationExecutionId: params.generationExecutionId,
      });
    },
    [saveContent]
  );

  /**
   * Lista apenas conteúdos do Curator
   */
  const listCuratorContents = useCallback(async (): Promise<void> => {
    await listContents(CURATOR_CONTENT_TYPES);
  }, [listContents]);

  /**
   * Filtra e transforma conteúdos para CuratorContent
   */
  const curatorContents: CuratorContent[] = contents.filter(isCuratorContent).map(toCuratorContent);

  /**
   * Deleta conteúdo do Curator
   */
  const deleteCuratorContent = useCallback(
    async (id: string): Promise<boolean> => {
      return deleteContent(id);
    },
    [deleteContent]
  );

  /**
   * Recarrega lista
   */
  const refetch = useCallback(async (): Promise<void> => {
    await listCuratorContents();
  }, [listCuratorContents]);

  return {
    curatorContents,
    loading,
    error,
    saveCuratorContent,
    listCuratorContents,
    deleteCuratorContent,
    refetch,
  };
}

export default useCuratorStorage;
