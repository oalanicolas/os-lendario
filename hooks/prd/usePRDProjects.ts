import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import {
  PRDProject,
  PRDStatus,
  PRDProjectMetadata,
  CreatePRDProjectInput,
  transformToProject
} from '../../types/prd';
import type { ContentProject } from '../../types/database';

// =============================================================================
// TYPES
// =============================================================================

interface UsePRDProjectsResult {
  projects: PRDProject[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isUsingMockData: boolean;
  // Actions
  createProject: (input: CreatePRDProjectInput) => Promise<PRDProject | null>;
  deleteProject: (id: string) => Promise<boolean>;
  // Aggregations
  totalProjects: number;
  projectsByStatus: Record<PRDStatus, number>;
}

// =============================================================================
// HELPERS
// =============================================================================

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const generateId = (): string => {
  return crypto.randomUUID();
};

// =============================================================================
// MOCK DATA
// =============================================================================

const MOCK_PRD_PROJECTS: PRDProject[] = [
  {
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
        content: 'Quero criar um app de fitness...',
        completedAt: '2024-12-10T10:00:00Z'
      }
    },
    created_at: '2024-12-10T10:00:00Z',
    updated_at: '2024-12-12T14:30:00Z'
  },
  {
    id: 'mock-2',
    slug: 'dashboard-vendas',
    name: 'Dashboard de Vendas',
    description: 'Painel de controle para equipe comercial',
    project_type: 'prd',
    status: 'prd',
    target_audience_id: null,
    creator_mind_id: null,
    persona_mind_id: null,
    default_frameworks: null,
    project_metadata: {
      prdType: 'project',
      upload: {
        content: 'Dashboard para visualizar métricas de vendas...',
        completedAt: '2024-12-08T09:00:00Z'
      },
      brief: {
        blindSpots: [],
        research: [],
        wows: 'Insights em tempo real',
        superProblem: 'Falta de visibilidade nas métricas',
        solution: 'Dashboard unificado com IA',
        differentials: ['Tempo real', 'Previsões IA'],
        scopeIn: ['Vendas', 'Leads', 'Conversão'],
        scopeOut: [{ item: 'RH', reason: 'Fora do escopo' }],
        successMetrics: [{ metric: 'Adoção', definition: 'Uso diário', target: '80%' }],
        completedAt: '2024-12-09T15:00:00Z'
      }
    },
    created_at: '2024-12-08T09:00:00Z',
    updated_at: '2024-12-11T16:45:00Z'
  },
  {
    id: 'mock-3',
    slug: 'chatbot-atendimento',
    name: 'Chatbot de Atendimento',
    description: 'Bot inteligente para suporte ao cliente',
    project_type: 'prd',
    status: 'epics',
    target_audience_id: null,
    creator_mind_id: null,
    persona_mind_id: null,
    default_frameworks: null,
    project_metadata: {
      prdType: 'task',
      metrics: {
        totalEpics: 4,
        totalStories: 0,
        completionPercentage: 60
      }
    },
    created_at: '2024-12-05T11:00:00Z',
    updated_at: '2024-12-13T09:20:00Z'
  },
  {
    id: 'mock-4',
    slug: 'landing-page-produto',
    name: 'Landing Page Produto X',
    description: 'Página de captura para lançamento',
    project_type: 'prd',
    status: 'upload',
    target_audience_id: null,
    creator_mind_id: null,
    persona_mind_id: null,
    default_frameworks: null,
    project_metadata: {
      prdType: 'task'
    },
    created_at: '2024-12-13T08:00:00Z',
    updated_at: '2024-12-13T08:00:00Z'
  }
];

// =============================================================================
// HOOK
// =============================================================================

export function usePRDProjects(): UsePRDProjectsResult {
  const [projects, setProjects] = useState<PRDProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  // Fetch projects from Supabase
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - using mock PRD projects');
      setProjects(MOCK_PRD_PROJECTS);
      setIsUsingMockData(true);
      setLoading(false);
      return;
    }

    try {
      const { data, error: queryError } = await supabase
        .from('content_projects')
        .select('*')
        .eq('project_type', 'prd')
        .order('updated_at', { ascending: false });

      if (queryError) {
        throw new Error(queryError.message);
      }

      const transformedProjects = (data || []).map((project: ContentProject) =>
        transformToProject(project)
      );

      setProjects(transformedProjects);
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Error fetching PRD projects:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      // Fallback to mock data on error
      setProjects(MOCK_PRD_PROJECTS);
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new project
  const createProject = useCallback(async (input: CreatePRDProjectInput): Promise<PRDProject | null> => {
    if (!isSupabaseConfigured()) {
      // Create mock project
      const newProject: PRDProject = {
        id: generateId(),
        slug: generateSlug(input.name),
        name: input.name,
        description: null,
        project_type: 'prd',
        status: 'upload',
        target_audience_id: null,
        creator_mind_id: null,
        persona_mind_id: null,
        default_frameworks: null,
        project_metadata: {
          prdType: input.prdType
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    }

    try {
      const slug = generateSlug(input.name);
      const metadata: PRDProjectMetadata = {
        prdType: input.prdType
      };

      const insertData = {
        slug,
        name: input.name,
        project_type: 'prd',
        status: 'draft',  // Use 'draft' for DB constraint; PRD phase tracked in metadata
        project_metadata: { ...metadata, prdPhase: 'upload' }
      };

      const { data, error: insertError } = await supabase
        .from('content_projects')
        .insert(insertData as any)
        .select()
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      const newProject = transformToProject(data);
      await fetchProjects(); // Refetch to ensure consistency
      return newProject;
    } catch (err) {
      console.error('Error creating PRD project:', err);
      setError(err instanceof Error ? err : new Error('Failed to create project'));
      return null;
    }
  }, [fetchProjects]);

  // Delete a project
  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      // Delete from mock data
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    }

    try {
      const { error: deleteError } = await supabase
        .from('content_projects')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      await fetchProjects(); // Refetch to ensure consistency
      return true;
    } catch (err) {
      console.error('Error deleting PRD project:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete project'));
      return false;
    }
  }, [fetchProjects]);

  // Calculate aggregations
  const totalProjects = useMemo(() => projects.length, [projects]);

  const projectsByStatus = useMemo(() => {
    const counts: Record<PRDStatus, number> = {
      upload: 0,
      brief: 0,
      prd: 0,
      epics: 0,
      stories: 0,
      exported: 0
    };

    projects.forEach(project => {
      const status = (project.status as PRDStatus) || 'upload';
      if (status in counts) {
        counts[status]++;
      }
    });

    return counts;
  }, [projects]);

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    isUsingMockData,
    createProject,
    deleteProject,
    totalProjects,
    projectsByStatus
  };
}

export default usePRDProjects;
