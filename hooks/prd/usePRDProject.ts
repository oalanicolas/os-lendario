// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import {
  PRDProject,
  PRDEpic,
  PRDStory,
  PRDStatus,
  PRDProjectMetadata,
  UpdateUploadInput,
  UpdateBriefInput,
  transformToProject,
  transformToEpic,
  transformToStory,
} from '../../types/prd';
import type { ContentProject, Content } from '../../types/database';

// =============================================================================
// TYPES
// =============================================================================

interface UsePRDProjectResult {
  project: PRDProject | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  // Updates
  updateProject: (updates: Partial<PRDProjectMetadata>) => Promise<boolean>;
  advancePhase: () => Promise<boolean>;
  // Phase-specific updates
  updateUpload: (data: UpdateUploadInput) => Promise<boolean>;
  updateBrief: (data: UpdateBriefInput) => Promise<boolean>;
  // Related content (lazy loaded)
  epics: PRDEpic[];
  stories: PRDStory[];
  loadContents: () => Promise<void>;
  contentsLoading: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const STATUS_ORDER: PRDStatus[] = ['upload', 'brief', 'prd', 'epics', 'stories', 'exported'];

// =============================================================================
// MOCK DATA
// =============================================================================

const MOCK_PROJECT: PRDProject = {
  id: 'mock-1',
  slug: 'app-fitness',
  name: 'App de Fitness',
  description: 'Aplicativo para acompanhamento de treinos e nutrição',
  project_type: 'prd',
  status: 'brief',
  target_audience_id: null,
  creator_mind_id: null,
  persona_mind_id: null,
  default_frameworks: null,
  project_metadata: {
    prdType: 'project',
    upload: {
      content: 'Quero criar um app de fitness completo...',
      completedAt: '2024-12-10T10:00:00Z',
    },
  },
  created_at: '2024-12-10T10:00:00Z',
  updated_at: '2024-12-12T14:30:00Z',
};

const MOCK_EPICS: PRDEpic[] = [
  {
    id: 'epic-1',
    slug: 'autenticacao',
    title: 'Autenticação e Onboarding',
    content_type: 'prd_epic',
    content: null,
    parent_content_id: null,
    sequence_order: 1,
    project_id: 'mock-1',
    ai_generated: false,
    generation_execution_id: null,
    fidelity_score: null,
    status: 'draft',
    published_at: null,
    published_url: null,
    file_path: null,
    metadata: {
      objective: 'Permitir que usuários criem conta e configurem perfil',
      dependencies: [],
      acceptanceCriteria: ['Login social', 'Perfil básico'],
      storiesCount: 3,
    },
    deleted_at: null,
    created_at: '2024-12-11T10:00:00Z',
    updated_at: '2024-12-11T10:00:00Z',
  },
];

const MOCK_STORIES: PRDStory[] = [
  {
    id: 'story-1',
    slug: 'login-email',
    title: 'Login com Email',
    content_type: 'prd_story',
    content: 'Como usuário, quero fazer login com email...',
    parent_content_id: 'epic-1',
    sequence_order: 1,
    project_id: 'mock-1',
    ai_generated: true,
    generation_execution_id: null,
    fidelity_score: null,
    status: 'draft',
    published_at: null,
    published_url: null,
    file_path: null,
    metadata: {
      acceptanceCriteria: ['Validar email', 'Enviar confirmação'],
      complexity: 'M',
      dependencies: [],
      isValidated: false,
    },
    deleted_at: null,
    created_at: '2024-12-11T11:00:00Z',
    updated_at: '2024-12-11T11:00:00Z',
  },
];

// =============================================================================
// HOOK
// =============================================================================

export function usePRDProject(slug: string): UsePRDProjectResult {
  const [project, setProject] = useState<PRDProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [epics, setEpics] = useState<PRDEpic[]>([]);
  const [stories, setStories] = useState<PRDStory[]>([]);
  const [contentsLoading, setContentsLoading] = useState(false);

  // Fetch project by slug
  const fetchProject = useCallback(async () => {
    if (!slug) {
      setProject(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Return mock data if slug matches
      if (slug === 'app-fitness' || slug === MOCK_PROJECT.slug) {
        setProject(MOCK_PROJECT);
      } else {
        setProject(null);
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error: queryError } = await supabase
        .from('content_projects')
        .select('*')
        .eq('slug', slug)
        .eq('project_type', 'prd')
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          // Not found
          setProject(null);
        } else {
          throw new Error(queryError.message);
        }
      } else {
        setProject(transformToProject(data as ContentProject));
      }
    } catch (err) {
      console.error('Error fetching PRD project:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch project'));
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Load epics and stories
  const loadContents = useCallback(async () => {
    if (!project) return;

    setContentsLoading(true);

    if (!isSupabaseConfigured()) {
      setEpics(MOCK_EPICS);
      setStories(MOCK_STORIES);
      setContentsLoading(false);
      return;
    }

    try {
      // Fetch epics
      const { data: epicsData } = await supabase
        .from('contents')
        .select('*')
        .eq('project_id', project.id)
        .eq('content_type', 'prd_epic')
        .is('deleted_at', null)
        .order('sequence_order');

      // Fetch stories
      const { data: storiesData } = await supabase
        .from('contents')
        .select('*')
        .eq('project_id', project.id)
        .eq('content_type', 'prd_story')
        .is('deleted_at', null)
        .order('sequence_order');

      setEpics((epicsData || []).map((e: Content) => transformToEpic(e)));
      setStories((storiesData || []).map((s: Content) => transformToStory(s)));
    } catch (err) {
      console.error('Error loading contents:', err);
    } finally {
      setContentsLoading(false);
    }
  }, [project]);

  // Update project metadata
  const updateProject = useCallback(
    async (updates: Partial<PRDProjectMetadata>): Promise<boolean> => {
      if (!project) return false;

      if (!isSupabaseConfigured()) {
        // Mock update
        setProject((prev) =>
          prev
            ? {
                ...prev,
                project_metadata: { ...prev.project_metadata, ...updates },
                updated_at: new Date().toISOString(),
              }
            : null
        );
        return true;
      }

      try {
        const newMetadata = {
          ...project.project_metadata,
          ...updates,
        };

        const updateData = {
          project_metadata: newMetadata,
          updated_at: new Date().toISOString(),
        };

        // @ts-ignore - Supabase update type inference issue
        const { error: updateError } = await (
          supabase.from('content_projects') as ReturnType<typeof supabase.from>
        )
          .update(updateData)
          .eq('id', project.id);

        if (updateError) throw new Error(updateError.message);

        await fetchProject();
        return true;
      } catch (err) {
        console.error('Error updating project:', err);
        setError(err instanceof Error ? err : new Error('Failed to update project'));
        return false;
      }
    },
    [project, fetchProject]
  );

  // Advance to next phase
  // Note: Database status uses 'planning' | 'in_progress' | 'completed'
  // PRD phase is stored in project_metadata.prdPhase
  const advancePhase = useCallback(async (): Promise<boolean> => {
    if (!project) return false;

    const currentStatus = project.status as PRDStatus;
    const currentIndex = STATUS_ORDER.indexOf(currentStatus);

    if (currentIndex < 0 || currentIndex >= STATUS_ORDER.length - 1) {
      return false;
    }

    const nextStatus = STATUS_ORDER[currentIndex + 1];

    // Map PRD status to database status
    const getDbStatus = (prdStatus: PRDStatus): string => {
      if (prdStatus === 'exported') return 'completed';
      if (prdStatus === 'upload') return 'planning';
      return 'in_progress'; // brief, prd, epics, stories
    };

    if (!isSupabaseConfigured()) {
      setProject((prev) =>
        prev
          ? {
              ...prev,
              status: nextStatus,
              project_metadata: {
                ...prev.project_metadata,
                prdPhase: nextStatus,
              },
              updated_at: new Date().toISOString(),
            }
          : null
      );
      return true;
    }

    try {
      const dbStatus = getDbStatus(nextStatus);
      const newMetadata = {
        ...project.project_metadata,
        prdPhase: nextStatus,
      };

      const updateData = {
        status: dbStatus,
        project_metadata: newMetadata,
        updated_at: new Date().toISOString(),
      };

      // @ts-ignore - Supabase update type inference issue
      const { error: updateError } = await (
        supabase.from('content_projects') as ReturnType<typeof supabase.from>
      )
        .update(updateData)
        .eq('id', project.id);

      if (updateError) throw new Error(updateError.message);

      await fetchProject();
      return true;
    } catch (err) {
      console.error('Error advancing phase:', err);
      setError(err instanceof Error ? err : new Error('Failed to advance phase'));
      return false;
    }
  }, [project, fetchProject]);

  // Update upload data (Phase 1)
  const updateUpload = useCallback(
    async (data: UpdateUploadInput): Promise<boolean> => {
      if (!project) return false;

      const uploadData = {
        ...project.project_metadata.upload,
        ...data,
        completedAt: data.content
          ? new Date().toISOString()
          : project.project_metadata.upload?.completedAt,
      };

      return updateProject({ upload: uploadData });
    },
    [project, updateProject]
  );

  // Update brief data (Phase 2)
  const updateBrief = useCallback(
    async (data: UpdateBriefInput): Promise<boolean> => {
      if (!project) return false;

      const briefData = {
        ...project.project_metadata.brief,
        ...data,
      };

      return updateProject({ brief: briefData });
    },
    [project, updateProject]
  );

  // Initial fetch
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
    updateProject,
    advancePhase,
    updateUpload,
    updateBrief,
    epics,
    stories,
    loadContents,
    contentsLoading,
  };
}

export default usePRDProject;
