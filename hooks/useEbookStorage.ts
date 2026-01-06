// @ts-nocheck
/**
 * useEbookStorage - Hook especializado para persistência do Gu[IA] Ebook
 *
 * Gerencia estrutura hierárquica de ebooks:
 * - content_projects (projeto do ebook)
 * - contents (root → chapters → sections → conclusion)
 *
 * @example
 * const { saveEbookProject, listEbookProjects, ebookProjects } = useEbookStorage();
 *
 * await saveEbookProject({
 *   ebookData,
 *   coverImageUrl,
 *   generationParams: { targetPages: 30, youtubeUrl: '...' }
 * });
 */

import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './useAuth';

// ============================================================================
// Types (re-export do guia-ebook/types.ts)
// ============================================================================

export interface EbookSection {
  id: string;
  title: string;
  content: string;
  pageNumber: string;
  insight: string;
  checklist: string[];
  script: string;
  ideas: string[];
  technicalSpec: { label: string; value: string }[];
}

export interface EbookChapter {
  number: string;
  title: string;
  sections: EbookSection[];
}

export interface EbookData {
  title: string;
  subtitle: string;
  footerText: string;
  summary: { chapter: string; page: string }[];
  chapters: EbookChapter[];
  conclusion: {
    title: string;
    content: string;
  };
  coverPrompt: string;
}

// ============================================================================
// Storage Types
// ============================================================================

export interface EbookGenerationParams {
  targetPages: number;
  youtubeUrl?: string;
  inputText?: string;
  systemPrompt?: string;
}

export interface SaveEbookProjectParams {
  /** Dados do ebook gerado */
  ebookData: EbookData;
  /** URL da capa (base64 ou URL) */
  coverImageUrl: string | null;
  /** Parâmetros de geração */
  generationParams: EbookGenerationParams;
  /** ID do job de geração do conteúdo */
  contentGenerationJobId?: string | null;
  /** ID do job de geração da capa */
  coverGenerationJobId?: string | null;
}

export interface EbookProject {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: 'planning' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  // Dados derivados
  coverUrl: string | null;
  pdfPath: string | null;
  chapterCount: number;
  metadata: EbookProjectMetadata;
}

export interface EbookProjectMetadata {
  source: 'guia_ebook';
  targetPages: number;
  youtubeUrl?: string;
  inputText?: string;
  hasCustomPrompt: boolean;
  coverPrompt: string;
  summary: { chapter: string; page: string }[];
  generatedAt: string;
}

// ============================================================================
// Hook Result
// ============================================================================

interface UseEbookStorageResult {
  /** Lista de projetos de ebook */
  ebookProjects: EbookProject[];
  /** Estado de carregamento */
  loading: boolean;
  /** Erro, se houver */
  error: Error | null;
  /** Salvar projeto de ebook (cria project + hierarquia de contents) */
  saveEbookProject: (params: SaveEbookProjectParams) => Promise<string | null>;
  /** Listar projetos de ebook do usuário */
  listEbookProjects: () => Promise<void>;
  /** Buscar ebook completo com hierarquia */
  getEbookWithHierarchy: (projectId: string) => Promise<EbookData | null>;
  /** Atualizar seção específica */
  updateEbookSection: (contentId: string, newContent: string) => Promise<boolean>;
  /** Atualizar path do PDF após exportação */
  updatePdfPath: (projectId: string, pdfPath: string) => Promise<boolean>;
  /** Deletar projeto de ebook */
  deleteEbookProject: (projectId: string) => Promise<boolean>;
  /** Recarregar lista */
  refetch: () => Promise<void>;
}

// ============================================================================
// Utilities
// ============================================================================

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 40);

  const timestamp = Date.now().toString(36);
  return `ebook_${base}_${timestamp}`;
}

// ============================================================================
// Hook
// ============================================================================

export function useEbookStorage(): UseEbookStorageResult {
  const { user } = useAuth();
  const [ebookProjects, setEbookProjects] = useState<EbookProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Salva projeto completo de ebook
   * Cria: content_project + content root + chapters + sections + conclusion
   */
  const saveEbookProject = useCallback(
    async (params: SaveEbookProjectParams): Promise<string | null> => {
      if (!isSupabaseConfigured()) {
        console.error('[useEbookStorage] Supabase não configurado');
        return null;
      }

      const { ebookData, coverImageUrl, generationParams } = params;
      const projectSlug = generateSlug(ebookData.title);

      try {
        // 1. Criar content_project
        const projectMetadata: EbookProjectMetadata = {
          source: 'guia_ebook',
          targetPages: generationParams.targetPages,
          youtubeUrl: generationParams.youtubeUrl,
          inputText: generationParams.inputText,
          hasCustomPrompt: !!generationParams.systemPrompt,
          coverPrompt: ebookData.coverPrompt,
          summary: ebookData.summary,
          generatedAt: new Date().toISOString(),
        };

        const { data: projectData, error: projectError } = await supabase
          .from('content_projects')
          .insert({
            slug: projectSlug,
            name: ebookData.title,
            description: ebookData.subtitle,
            project_type: 'ebook',
            status: 'in_progress',
            creator_mind_id: user?.mindId ?? null,
            project_metadata: projectMetadata,
          })
          .select('id')
          .single();

        if (projectError) {
          console.error('[useEbookStorage] Erro ao criar projeto:', projectError);
          throw projectError;
        }

        const projectId = projectData.id;

        // 2. Criar content ROOT (ebook)
        const { data: rootData, error: rootError } = await supabase
          .from('contents')
          .insert({
            slug: `${projectSlug}_root`,
            title: ebookData.title,
            content: null, // Root não tem conteúdo direto
            content_type: 'ebook',
            status: 'draft',
            ai_generated: true,
            image_url: coverImageUrl,
            project_id: projectId,
            generation_execution_id: params.contentGenerationJobId ?? null,
            metadata: {
              subtitle: ebookData.subtitle,
              footerText: ebookData.footerText,
              coverPrompt: ebookData.coverPrompt,
              summary: ebookData.summary,
            },
          })
          .select('id')
          .single();

        if (rootError) {
          console.error('[useEbookStorage] Erro ao criar root:', rootError);
          throw rootError;
        }

        const rootId = rootData.id;

        // 3. Registrar autoria do root
        if (user?.mindId) {
          await supabase.from('content_minds').insert({
            content_id: rootId,
            mind_id: user.mindId,
            role: 'creator',
          });
        }

        // 4. Criar capítulos e seções
        for (let chapterIdx = 0; chapterIdx < ebookData.chapters.length; chapterIdx++) {
          const chapter = ebookData.chapters[chapterIdx];

          // Criar capítulo
          const { data: chapterData, error: chapterError } = await supabase
            .from('contents')
            .insert({
              slug: `${projectSlug}_cap_${chapter.number}`,
              title: `Capítulo ${chapter.number}: ${chapter.title}`,
              content: null,
              content_type: 'ebook_chapter',
              status: 'draft',
              ai_generated: true,
              parent_content_id: rootId,
              sequence_order: chapterIdx + 1,
              project_id: projectId,
              metadata: {
                chapterNumber: chapter.number,
              },
            })
            .select('id')
            .single();

          if (chapterError) {
            console.error(
              `[useEbookStorage] Erro ao criar capítulo ${chapter.number}:`,
              chapterError
            );
            continue;
          }

          const chapterId = chapterData.id;

          // Criar seções do capítulo
          for (let sectionIdx = 0; sectionIdx < chapter.sections.length; sectionIdx++) {
            const section = chapter.sections[sectionIdx];

            const { error: sectionError } = await supabase.from('contents').insert({
              slug: `${projectSlug}_cap_${chapter.number}_sec_${sectionIdx + 1}`,
              title: section.title,
              content: section.content,
              content_type: 'ebook_section',
              status: 'draft',
              ai_generated: true,
              parent_content_id: chapterId,
              sequence_order: sectionIdx + 1,
              project_id: projectId,
              metadata: {
                pageNumber: section.pageNumber,
                insight: section.insight,
                checklist: section.checklist,
                script: section.script,
                ideas: section.ideas,
                technicalSpec: section.technicalSpec,
                originalId: section.id,
              },
            });

            if (sectionError) {
              console.error(
                `[useEbookStorage] Erro ao criar seção ${section.title}:`,
                sectionError
              );
            }
          }
        }

        // 5. Criar conclusão
        if (ebookData.conclusion) {
          const { error: conclusionError } = await supabase.from('contents').insert({
            slug: `${projectSlug}_conclusion`,
            title: ebookData.conclusion.title,
            content: ebookData.conclusion.content,
            content_type: 'ebook_conclusion',
            status: 'draft',
            ai_generated: true,
            parent_content_id: rootId,
            sequence_order: 999, // Sempre no final
            project_id: projectId,
            metadata: {},
          });

          if (conclusionError) {
            console.error('[useEbookStorage] Erro ao criar conclusão:', conclusionError);
          }
        }

        return projectId;
      } catch (err) {
        console.error('[useEbookStorage] Exceção ao salvar projeto:', err);
        setError(err as Error);
        return null;
      }
    },
    [user?.mindId]
  );

  /**
   * Lista projetos de ebook do usuário
   */
  const listEbookProjects = useCallback(async (): Promise<void> => {
    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase não configurado'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('content_projects')
        .select(
          `
          id,
          slug,
          name,
          description,
          status,
          project_metadata,
          created_at,
          updated_at,
          contents!contents_project_id_fkey (
            id,
            image_url,
            file_path,
            content_type
          )
        `
        )
        .eq('project_type', 'ebook')
        .order('created_at', { ascending: false });

      // Filtrar por usuário se autenticado
      if (user?.mindId) {
        query = query.eq('creator_mind_id', user.mindId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      const projects: EbookProject[] = (data || []).map((p: Record<string, unknown>) => {
        const contents = (p.contents as Record<string, unknown>[]) || [];
        const rootContent = contents.find(
          (c: Record<string, unknown>) => c.content_type === 'ebook'
        );
        const chapterCount = contents.filter(
          (c: Record<string, unknown>) => c.content_type === 'ebook_chapter'
        ).length;

        return {
          id: p.id as string,
          slug: p.slug as string,
          name: p.name as string,
          description: p.description as string | null,
          status: p.status as 'planning' | 'in_progress' | 'completed',
          createdAt: p.created_at as string,
          updatedAt: p.updated_at as string,
          coverUrl: (rootContent?.image_url as string) ?? null,
          pdfPath: (rootContent?.file_path as string) ?? null,
          chapterCount,
          metadata: p.project_metadata as EbookProjectMetadata,
        };
      });

      setEbookProjects(projects);
    } catch (err) {
      console.error('[useEbookStorage] Erro ao listar projetos:', err);
      setError(err as Error);
      setEbookProjects([]);
    } finally {
      setLoading(false);
    }
  }, [user?.mindId]);

  /**
   * Busca ebook completo reconstruindo a hierarquia
   */
  const getEbookWithHierarchy = useCallback(
    async (projectId: string): Promise<EbookData | null> => {
      if (!isSupabaseConfigured()) {
        return null;
      }

      try {
        // Buscar todos os contents do projeto
        const { data, error: fetchError } = await supabase
          .from('contents')
          .select('*')
          .eq('project_id', projectId)
          .is('deleted_at', null)
          .order('sequence_order', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        if (!data || data.length === 0) {
          return null;
        }

        // Encontrar root
        const root = data.find((c) => c.content_type === 'ebook');
        if (!root) {
          return null;
        }

        const rootMetadata = root.metadata as Record<string, unknown>;

        // Encontrar capítulos
        const chapterContents = data.filter(
          (c) => c.content_type === 'ebook_chapter' && c.parent_content_id === root.id
        );

        // Montar estrutura de capítulos com seções
        const chapters: EbookChapter[] = chapterContents.map((chapterContent) => {
          const chapterMeta = chapterContent.metadata as Record<string, unknown>;

          // Encontrar seções deste capítulo
          const sectionContents = data.filter(
            (c) => c.content_type === 'ebook_section' && c.parent_content_id === chapterContent.id
          );

          const sections: EbookSection[] = sectionContents.map((s) => {
            const sMeta = s.metadata as Record<string, unknown>;
            return {
              id: (sMeta.originalId as string) || s.id,
              title: s.title,
              content: s.content || '',
              pageNumber: (sMeta.pageNumber as string) || '',
              insight: (sMeta.insight as string) || '',
              checklist: (sMeta.checklist as string[]) || [],
              script: (sMeta.script as string) || '',
              ideas: (sMeta.ideas as string[]) || [],
              technicalSpec: (sMeta.technicalSpec as { label: string; value: string }[]) || [],
            };
          });

          return {
            number: (chapterMeta.chapterNumber as string) || '',
            title: chapterContent.title.replace(/^Capítulo \d+:\s*/, ''),
            sections,
          };
        });

        // Encontrar conclusão
        const conclusionContent = data.find(
          (c) => c.content_type === 'ebook_conclusion' && c.parent_content_id === root.id
        );

        const ebookData: EbookData = {
          title: root.title,
          subtitle: (rootMetadata.subtitle as string) || '',
          footerText: (rootMetadata.footerText as string) || '',
          summary: (rootMetadata.summary as { chapter: string; page: string }[]) || [],
          chapters,
          conclusion: conclusionContent
            ? {
                title: conclusionContent.title,
                content: conclusionContent.content || '',
              }
            : { title: '', content: '' },
          coverPrompt: (rootMetadata.coverPrompt as string) || '',
        };

        return ebookData;
      } catch (err) {
        console.error('[useEbookStorage] Erro ao buscar hierarquia:', err);
        return null;
      }
    },
    []
  );

  /**
   * Atualiza conteúdo de uma seção específica
   */
  const updateEbookSection = useCallback(
    async (contentId: string, newContent: string): Promise<boolean> => {
      if (!isSupabaseConfigured()) {
        return false;
      }

      try {
        const { error: updateError } = await supabase
          .from('contents')
          .update({
            content: newContent,
            updated_at: new Date().toISOString(),
          })
          .eq('id', contentId);

        if (updateError) {
          throw updateError;
        }

        return true;
      } catch (err) {
        console.error('[useEbookStorage] Erro ao atualizar seção:', err);
        setError(err as Error);
        return false;
      }
    },
    []
  );

  /**
   * Atualiza path do PDF após exportação
   */
  const updatePdfPath = useCallback(
    async (projectId: string, pdfPath: string): Promise<boolean> => {
      if (!isSupabaseConfigured()) {
        return false;
      }

      try {
        // Atualizar no content root do ebook
        const { error: updateError } = await supabase
          .from('contents')
          .update({
            file_path: pdfPath,
            updated_at: new Date().toISOString(),
          })
          .eq('project_id', projectId)
          .eq('content_type', 'ebook')
          .is('parent_content_id', null);

        if (updateError) {
          throw updateError;
        }

        // Atualizar status do projeto para completed
        await supabase
          .from('content_projects')
          .update({
            status: 'completed',
            updated_at: new Date().toISOString(),
          })
          .eq('id', projectId);

        return true;
      } catch (err) {
        console.error('[useEbookStorage] Erro ao atualizar PDF path:', err);
        setError(err as Error);
        return false;
      }
    },
    []
  );

  /**
   * Deleta projeto de ebook (soft delete)
   */
  const deleteEbookProject = useCallback(async (projectId: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      return false;
    }

    try {
      const now = new Date().toISOString();

      // Soft delete de todos os contents do projeto
      await supabase.from('contents').update({ deleted_at: now }).eq('project_id', projectId);

      // Soft delete do projeto (se a tabela suportar)
      await supabase
        .from('content_projects')
        .update({ status: 'archived', updated_at: now })
        .eq('id', projectId);

      // Remover da lista local
      setEbookProjects((prev) => prev.filter((p) => p.id !== projectId));

      return true;
    } catch (err) {
      console.error('[useEbookStorage] Erro ao deletar projeto:', err);
      setError(err as Error);
      return false;
    }
  }, []);

  /**
   * Recarregar lista
   */
  const refetch = useCallback(async (): Promise<void> => {
    await listEbookProjects();
  }, [listEbookProjects]);

  return {
    ebookProjects,
    loading,
    error,
    saveEbookProject,
    listEbookProjects,
    getEbookWithHierarchy,
    updateEbookSection,
    updatePdfPath,
    deleteEbookProject,
    refetch,
  };
}

export default useEbookStorage;
