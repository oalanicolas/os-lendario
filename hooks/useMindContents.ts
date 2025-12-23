// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MindArtifact } from './useMindArtifacts';

export interface MindContent extends MindArtifact {
  // Add any content-specific fields here if needed
  status?: string;
  format?: string;
}

export interface MindContentsResult {
  projectId: string | null;
  projectSlug: string | null;
  contents: MindContent[];
  total: number;
}

interface UseMindContentsResult {
  data: MindContentsResult | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Categorize content based on its content_type from the import script
export const categorizeContent = (content: MindContent): string => {
  const type = content.contentType || 'other';

  if (type.startsWith('course_') || type.startsWith('resource_')) return 'courses';
  if (type === 'newsletter') return 'newsletter';
  if (type === 'podcast_episode' || type === 'video_transcript' || type === 'interview')
    return 'multimedia';
  if (type === 'article' || type === 'essay') return 'articles';

  return 'other';
};

export const CONTENT_CATEGORY_LABELS: Record<string, string> = {
  courses: 'Cursos & Material',
  newsletter: 'Newsletters',
  multimedia: 'Multimídia (Áudio/Vídeo)',
  articles: 'Artigos & Ensaios',
  other: 'Outras Fontes',
};

export const CONTENT_CATEGORY_ICONS: Record<string, string> = {
  courses: 'book',
  newsletter: 'envelope-open',
  multimedia: 'play-circle',
  articles: 'align-left',
  other: 'folder-open',
};

export function useMindContents(mindId: string | null): UseMindContentsResult {
  const [data, setData] = useState<MindContentsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContents = useCallback(async () => {
    if (!mindId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase not configured'));
      setLoading(false);
      return;
    }

    try {
      // Fetch 'mind_sources' project
      let { data: projectData, error: projectError } = await supabase
        .from('content_projects')
        .select(
          `
          id,
          slug,
          contents (
            id,
            slug,
            title,
            content,
            content_type,
            metadata
          )
        `
        )
        .eq('persona_mind_id', mindId)
        .eq('project_type', 'mind_sources') // Querying Sources
        .single();

      if (projectError) {
        if (projectError.code === 'PGRST116') {
          // No rows found for .single()
          setData({ projectId: null, projectSlug: null, contents: [], total: 0 });
          setLoading(false);
          return;
        }
        throw projectError;
      }

      const contentsList = ((projectData as any)?.contents || []) as any[];

      const contents: MindContent[] = contentsList
        .map((c: any) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          content: c.content,
          contentType: c.content_type,
          sourceFile: c.metadata?.source_file || null,
          importedAt: c.metadata?.imported_at || null,
          status: c.metadata?.status,
          format: c.metadata?.format || c.metadata?.file_extension?.replace('.', ''),
        }))
        .sort((a, b) => a.title.localeCompare(b.title));

      setData({
        projectId: (projectData as any)?.id || null,
        projectSlug: (projectData as any)?.slug || null,
        contents,
        total: contents.length,
      });
    } catch (err) {
      console.error('Error fetching mind contents:', err);
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [mindId]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return {
    data,
    loading,
    error,
    refetch: fetchContents,
  };
}
