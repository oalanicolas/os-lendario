import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface MindArtifact {
  id: string;
  slug: string;
  title: string;
  content: string;
  contentType: 'mind_artifacts' | 'mind_prompts';
  sourceFile: string | null;
  importedAt: string | null;
  category?: string;
}

// Categorize artifacts by title/slug patterns
export const categorizeArtifact = (artifact: MindArtifact): string => {
  const title = (artifact.title || '').toLowerCase();
  const slug = (artifact.slug || '').toLowerCase();
  const combined = `${title} ${slug}`;

  if (
    combined.includes('identity') ||
    combined.includes('core') ||
    combined.includes('bio') ||
    combined.includes('formacao') ||
    combined.includes('infancia') ||
    combined.includes('biografia')
  ) {
    return 'identity';
  }
  if (
    combined.includes('framework') ||
    combined.includes('metodologia') ||
    combined.includes('principios') ||
    combined.includes('principles') ||
    combined.includes('mental')
  ) {
    return 'frameworks';
  }
  if (
    combined.includes('analise') ||
    combined.includes('analysis') ||
    combined.includes('psicolog') ||
    combined.includes('cognitiv') ||
    combined.includes('forensic') ||
    combined.includes('arqueologia')
  ) {
    return 'analysis';
  }
  if (
    combined.includes('estilo') ||
    combined.includes('comunicacao') ||
    combined.includes('aparencia') ||
    combined.includes('maneirismo') ||
    combined.includes('language')
  ) {
    return 'style';
  }
  if (
    combined.includes('case') ||
    combined.includes('exemplo') ||
    combined.includes('decisoes') ||
    combined.includes('temas') ||
    combined.includes('relatorio') ||
    combined.includes('abrangente')
  ) {
    return 'cases';
  }
  if (
    combined.includes('architecture') ||
    combined.includes('arquitetura') ||
    combined.includes('spec') ||
    combined.includes('technical') ||
    combined.includes('implementation') ||
    combined.includes('implementa')
  ) {
    return 'architecture';
  }
  if (
    combined.includes('influencia') ||
    combined.includes('espiritual') ||
    combined.includes('valores') ||
    combined.includes('values')
  ) {
    return 'influences';
  }
  return 'other';
};

export const CATEGORY_LABELS: Record<string, string> = {
  identity: 'Identidade & Origem',
  frameworks: 'Frameworks Mentais',
  analysis: 'Análises Profundas',
  style: 'Estilo & Comunicação',
  cases: 'Cases & Relatórios',
  architecture: 'Arquitetura Cognitiva',
  influences: 'Influências & Valores',
  other: 'Outros Documentos',
};

export const CATEGORY_ICONS: Record<string, string> = {
  identity: 'user',
  frameworks: 'structure',
  analysis: 'brain',
  style: 'comment-alt',
  cases: 'document',
  architecture: 'settings',
  influences: 'star',
  other: 'folder',
};

export interface MindArtifactsResult {
  projectId: string | null;
  projectSlug: string | null;
  artifacts: MindArtifact[];
  prompts: MindArtifact[];
  total: number;
}

interface UseMindArtifactsResult {
  data: MindArtifactsResult | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useMindArtifacts(mindId: string | null): UseMindArtifactsResult {
  const [data, setData] = useState<MindArtifactsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchArtifacts = useCallback(async () => {
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
      // Fetch content_project with its contents
      const { data: projectData, error: projectError } = await supabase
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
        .eq('project_type', 'mind_artifacts')
        .single();

      if (projectError) {
        // No project found is not an error, just empty data
        if (projectError.code === 'PGRST116') {
          setData({
            projectId: null,
            projectSlug: null,
            artifacts: [],
            prompts: [],
            total: 0,
          });
          return;
        }
        throw projectError;
      }

      // Transform contents
      const contents = ((projectData as any)?.contents || []) as any[];

      const allItems: MindArtifact[] = contents.map((c: any) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        content: c.content,
        contentType: c.content_type,
        sourceFile: c.metadata?.source_file || null,
        importedAt: c.metadata?.imported_at || null,
      }));

      // Separate by type
      const artifacts = allItems
        .filter((a) => a.contentType === 'mind_artifacts')
        .sort((a, b) => a.title.localeCompare(b.title));

      const prompts = allItems
        .filter((a) => a.contentType === 'mind_prompts')
        .sort((a, b) => a.title.localeCompare(b.title));

      setData({
        projectId: (projectData as any)?.id || null,
        projectSlug: (projectData as any)?.slug || null,
        artifacts,
        prompts,
        total: allItems.length,
      });
    } catch (err) {
      console.error('Error fetching mind artifacts:', err);
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [mindId]);

  useEffect(() => {
    fetchArtifacts();
  }, [fetchArtifacts]);

  return {
    data,
    loading,
    error,
    refetch: fetchArtifacts,
  };
}

export default useMindArtifacts;
