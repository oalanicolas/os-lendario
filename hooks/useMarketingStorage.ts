// @ts-nocheck
/**
 * useMarketingStorage - Hook genérico para persistência de conteúdos de marketing
 *
 * Base para useCuratorStorage e useEbookStorage.
 * Gerencia CRUD na tabela `contents` com suporte a autoria via `content_minds`.
 *
 * @example
 * const { saveContent, listContents, deleteContent } = useMarketingStorage();
 *
 * // Salvar conteúdo
 * const id = await saveContent({
 *   title: 'Meu Roteiro',
 *   content: '...',
 *   contentType: 'video_script',
 *   metadata: { source: 'curator' }
 * });
 *
 * // Listar conteúdos
 * await listContents(['video_script', 'social_post']);
 */

import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './useAuth';

// ============================================================================
// Types
// ============================================================================

export type ContentStatus = 'draft' | 'reviewed' | 'published' | 'archived';

export type MarketingContentType =
  // Curator types
  | 'video_script'
  | 'social_post'
  | 'email_sequence'
  // Ebook types
  | 'ebook'
  | 'ebook_chapter'
  | 'ebook_section'
  | 'ebook_conclusion';

export interface MarketingContent {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  contentType: MarketingContentType | string;
  status: ContentStatus;
  aiGenerated: boolean;
  imageUrl: string | null;
  metadata: Record<string, unknown>;
  parentContentId: string | null;
  sequenceOrder: number | null;
  projectId: string | null;
  generationExecutionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SaveContentParams {
  /** Título do conteúdo */
  title: string;
  /** Conteúdo em texto (pode ser null para containers) */
  content?: string | null;
  /** Tipo de conteúdo */
  contentType: MarketingContentType | string;
  /** Status inicial (default: draft) */
  status?: ContentStatus;
  /** URL de imagem (capa, thumbnail) */
  imageUrl?: string | null;
  /** Metadados específicos (JSONB) */
  metadata?: Record<string, unknown>;
  /** ID do conteúdo pai (para hierarquia) */
  parentContentId?: string | null;
  /** Ordem na sequência */
  sequenceOrder?: number | null;
  /** ID do projeto associado */
  projectId?: string | null;
  /** ID do job de geração (tracking LLM) */
  generationExecutionId?: string | null;
  /** Slug customizado (auto-gerado se não informado) */
  slug?: string;
}

export interface UpdateContentParams {
  title?: string;
  content?: string | null;
  status?: ContentStatus;
  imageUrl?: string | null;
  metadata?: Record<string, unknown>;
  sequenceOrder?: number | null;
}

interface UseMarketingStorageResult {
  /** Lista de conteúdos carregados */
  contents: MarketingContent[];
  /** Estado de carregamento */
  loading: boolean;
  /** Erro, se houver */
  error: Error | null;
  /** Salvar novo conteúdo */
  saveContent: (params: SaveContentParams) => Promise<string | null>;
  /** Listar conteúdos por tipo */
  listContents: (contentTypes?: MarketingContentType[]) => Promise<void>;
  /** Buscar um conteúdo específico */
  getContent: (id: string) => Promise<MarketingContent | null>;
  /** Atualizar conteúdo */
  updateContent: (id: string, updates: UpdateContentParams) => Promise<boolean>;
  /** Deletar conteúdo (soft delete) */
  deleteContent: (id: string) => Promise<boolean>;
  /** Recarregar lista */
  refetch: () => Promise<void>;
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Gera slug único baseado no título e timestamp
 */
function generateSlug(title: string, contentType: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 40);

  const timestamp = Date.now().toString(36);
  return `${contentType}_${base}_${timestamp}`;
}

/**
 * Transforma row do banco para interface MarketingContent
 */
function transformContent(row: Record<string, unknown>): MarketingContent {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    content: row.content as string | null,
    contentType: row.content_type as string,
    status: (row.status as ContentStatus) || 'draft',
    aiGenerated: row.ai_generated as boolean,
    imageUrl: row.image_url as string | null,
    metadata: (row.metadata as Record<string, unknown>) || {},
    parentContentId: row.parent_content_id as string | null,
    sequenceOrder: row.sequence_order as number | null,
    projectId: row.project_id as string | null,
    generationExecutionId: row.generation_execution_id as string | null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// ============================================================================
// Hook
// ============================================================================

export function useMarketingStorage(): UseMarketingStorageResult {
  const { user } = useAuth();
  const [contents, setContents] = useState<MarketingContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastContentTypes, setLastContentTypes] = useState<MarketingContentType[]>([]);

  /**
   * Salva novo conteúdo na tabela contents
   * Também cria entrada em content_minds para autoria
   */
  const saveContent = useCallback(
    async (params: SaveContentParams): Promise<string | null> => {
      if (!isSupabaseConfigured()) {
        console.error('[useMarketingStorage] Supabase não configurado');
        return null;
      }

      try {
        const slug = params.slug || generateSlug(params.title, params.contentType);

        // 1. Inserir conteúdo
        const { data: contentData, error: contentError } = await supabase
          .from('contents')
          .insert({
            slug,
            title: params.title,
            content: params.content ?? null,
            content_type: params.contentType,
            status: params.status || 'draft',
            ai_generated: true,
            image_url: params.imageUrl ?? null,
            metadata: params.metadata ?? {},
            parent_content_id: params.parentContentId ?? null,
            sequence_order: params.sequenceOrder ?? null,
            project_id: params.projectId ?? null,
            generation_execution_id: params.generationExecutionId ?? null,
          })
          .select('id')
          .single();

        if (contentError) {
          console.error('[useMarketingStorage] Erro ao salvar conteúdo:', contentError);
          throw contentError;
        }

        const contentId = contentData.id;

        // 2. Registrar autoria se usuário logado tiver mindId
        if (user?.mindId) {
          const { error: authorError } = await supabase.from('content_minds').insert({
            content_id: contentId,
            mind_id: user.mindId,
            role: 'creator',
          });

          if (authorError) {
            // Log mas não falha - autoria é importante mas não crítica
            console.warn('[useMarketingStorage] Erro ao registrar autoria:', authorError);
          }
        }

        return contentId;
      } catch (err) {
        console.error('[useMarketingStorage] Exceção ao salvar:', err);
        setError(err as Error);
        return null;
      }
    },
    [user?.mindId]
  );

  /**
   * Lista conteúdos do usuário filtrados por tipo
   */
  const listContents = useCallback(
    async (contentTypes?: MarketingContentType[]): Promise<void> => {
      if (!isSupabaseConfigured()) {
        setError(new Error('Supabase não configurado'));
        return;
      }

      setLoading(true);
      setError(null);
      setLastContentTypes(contentTypes || []);

      try {
        let query = supabase
          .from('contents')
          .select('*')
          .eq('ai_generated', true)
          .is('deleted_at', null)
          .order('created_at', { ascending: false });

        // Filtrar por tipos se especificado
        if (contentTypes && contentTypes.length > 0) {
          query = query.in('content_type', contentTypes);
        }

        // Se usuário tem mindId, filtrar por autoria
        if (user?.mindId) {
          // Buscar IDs de conteúdos que o usuário criou
          const { data: authoredIds } = await supabase
            .from('content_minds')
            .select('content_id')
            .eq('mind_id', user.mindId)
            .eq('role', 'creator');

          if (authoredIds && authoredIds.length > 0) {
            const ids = authoredIds.map((a) => a.content_id);
            query = query.in('id', ids);
          } else {
            // Usuário não tem conteúdos criados
            setContents([]);
            setLoading(false);
            return;
          }
        }

        const { data, error: fetchError } = await query.limit(100);

        if (fetchError) {
          throw fetchError;
        }

        const transformed = (data || []).map(transformContent);
        setContents(transformed);
      } catch (err) {
        console.error('[useMarketingStorage] Erro ao listar:', err);
        setError(err as Error);
        setContents([]);
      } finally {
        setLoading(false);
      }
    },
    [user?.mindId]
  );

  /**
   * Busca um conteúdo específico por ID
   */
  const getContent = useCallback(async (id: string): Promise<MarketingContent | null> => {
    if (!isSupabaseConfigured()) {
      return null;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('contents')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      return transformContent(data);
    } catch (err) {
      console.error('[useMarketingStorage] Erro ao buscar conteúdo:', err);
      return null;
    }
  }, []);

  /**
   * Atualiza um conteúdo existente
   */
  const updateContent = useCallback(
    async (id: string, updates: UpdateContentParams): Promise<boolean> => {
      if (!isSupabaseConfigured()) {
        return false;
      }

      try {
        const updateData: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        };

        if (updates.title !== undefined) updateData.title = updates.title;
        if (updates.content !== undefined) updateData.content = updates.content;
        if (updates.status !== undefined) updateData.status = updates.status;
        if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
        if (updates.metadata !== undefined) updateData.metadata = updates.metadata;
        if (updates.sequenceOrder !== undefined) updateData.sequence_order = updates.sequenceOrder;

        const { error: updateError } = await supabase
          .from('contents')
          .update(updateData)
          .eq('id', id);

        if (updateError) {
          throw updateError;
        }

        // Atualizar lista local
        setContents((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  ...(updates.title && { title: updates.title }),
                  ...(updates.content !== undefined && { content: updates.content }),
                  ...(updates.status && { status: updates.status }),
                  ...(updates.imageUrl !== undefined && { imageUrl: updates.imageUrl }),
                  ...(updates.metadata && { metadata: updates.metadata }),
                  ...(updates.sequenceOrder !== undefined && {
                    sequenceOrder: updates.sequenceOrder,
                  }),
                  updatedAt: updateData.updated_at as string,
                }
              : c
          )
        );

        return true;
      } catch (err) {
        console.error('[useMarketingStorage] Erro ao atualizar:', err);
        setError(err as Error);
        return false;
      }
    },
    []
  );

  /**
   * Soft delete de um conteúdo
   */
  const deleteContent = useCallback(async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      return false;
    }

    try {
      const { error: deleteError } = await supabase
        .from('contents')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Remover da lista local
      setContents((prev) => prev.filter((c) => c.id !== id));

      return true;
    } catch (err) {
      console.error('[useMarketingStorage] Erro ao deletar:', err);
      setError(err as Error);
      return false;
    }
  }, []);

  /**
   * Recarrega a lista com os últimos filtros
   */
  const refetch = useCallback(async (): Promise<void> => {
    await listContents(lastContentTypes);
  }, [listContents, lastContentTypes]);

  return {
    contents,
    loading,
    error,
    saveContent,
    listContents,
    getContent,
    updateContent,
    deleteContent,
    refetch,
  };
}

export default useMarketingStorage;
