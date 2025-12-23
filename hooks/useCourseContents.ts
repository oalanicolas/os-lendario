// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Types for course content hierarchy
export interface CourseLesson {
  id: string;
  slug: string;
  title: string;
  content_type: string;
  sequence_order: number;
  duration?: string;
  status: string;
  fidelity_score?: number;
  parent_content_id: string | null;
}

export interface CourseModule {
  id: string;
  slug: string;
  title: string;
  description?: string;
  sequence_order: number;
  lessons: CourseLesson[];
}

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  content_type: string;
  status: string;
  created_at?: string;
}

export interface CourseContent {
  projectId: string;
  projectSlug: string;
  projectName: string;
  modules: CourseModule[];
  totalLessons: number;
  totalModules: number;
  research: ContentItem[];
  assessments: ContentItem[];
  resources: ContentItem[];
  reports: ContentItem[];
}

interface UseCourseContentsResult {
  content: CourseContent | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCourseContents(projectSlug: string | null): UseCourseContentsResult {
  const [content, setContent] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContents = useCallback(async () => {
    if (!projectSlug) {
      setContent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured');
      setLoading(false);
      return;
    }

    try {
      // First, get the project info
      const { data: project, error: projectError } = await supabase
        .from('content_projects')
        .select('id, slug, name')
        .eq('slug', projectSlug)
        .single();

      if (projectError) throw projectError;
      if (!project) throw new Error('Project not found');

      // Fetch all contents for this project
      // @ts-ignore - Supabase type inference with select columns
      const { data: contents, error: contentsError } = await supabase
        .from('contents')
        .select(
          'id, slug, title, content_type, sequence_order, status, fidelity_score, parent_content_id, metadata, created_at'
        )
        .eq('project_id', project.id)
        .is('deleted_at', null)
        .order('sequence_order', { ascending: true });

      if (contentsError) throw contentsError;

      // Separate modules, lessons, and other content types
      const modules: CourseModule[] = [];
      const lessonsByParent: Record<string, CourseLesson[]> = {};
      const research: ContentItem[] = [];
      const assessments: ContentItem[] = [];
      const resources: ContentItem[] = [];
      const reports: ContentItem[] = [];

      // Separate by content type first
      const modulesRaw = contents?.filter((c) => c.content_type === 'course_module') || [];
      const lessonsRaw = contents?.filter((c) => c.content_type === 'course_lesson') || [];

      // Build modules array
      modulesRaw.forEach((c) => {
        modules.push({
          id: c.id,
          slug: c.slug,
          title: c.title,
          description: (c.metadata as { description?: string })?.description,
          sequence_order: c.sequence_order || 0,
          lessons: [],
        });
      });

      // Sort modules by sequence_order
      modules.sort((a, b) => a.sequence_order - b.sequence_order);

      // Build lessons array
      const allLessons: CourseLesson[] = lessonsRaw.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        content_type: c.content_type,
        sequence_order: c.sequence_order || 0,
        status: c.status || 'draft',
        fidelity_score: c.fidelity_score ?? undefined,
        parent_content_id: c.parent_content_id,
        duration: (c.metadata as { duration?: string })?.duration,
      }));

      // Associate lessons to modules
      // Strategy 1: Try parent_content_id first
      // Strategy 2: Fall back to title prefix matching (e.g., "1.1 Título" -> Module 1)
      allLessons.forEach((lesson) => {
        let assigned = false;

        // Strategy 1: Check if parent_content_id matches a module
        if (lesson.parent_content_id) {
          const parentModule = modules.find((m) => m.id === lesson.parent_content_id);
          if (parentModule) {
            parentModule.lessons.push(lesson);
            assigned = true;
          }
        }

        // Strategy 2: Match by title prefix (e.g., "1.1", "2.3", "10.2")
        if (!assigned) {
          const titleMatch = lesson.title.match(/^(\d+)\./);
          if (titleMatch) {
            const moduleNum = parseInt(titleMatch[1], 10);
            const targetModule = modules[moduleNum - 1]; // 0-indexed
            if (targetModule) {
              targetModule.lessons.push(lesson);
              assigned = true;
            }
          }
        }

        // Strategy 3: Put in orphan bucket
        if (!assigned) {
          if (!lessonsByParent['orphan']) {
            lessonsByParent['orphan'] = [];
          }
          lessonsByParent['orphan'].push(lesson);
        }
      });

      // Sort lessons within each module
      modules.forEach((mod) => {
        mod.lessons.sort((a, b) => {
          // Try to sort by sequence_order first
          if (a.sequence_order !== b.sequence_order) {
            return a.sequence_order - b.sequence_order;
          }
          // Fall back to natural sort by title (1.1, 1.2, 1.10, etc.)
          return a.title.localeCompare(b.title, undefined, { numeric: true });
        });
      });

      // Process other content types
      contents?.forEach((c) => {
        if (c.content_type === 'course_module' || c.content_type === 'course_lesson') {
          // Already processed above
          return;
        } else if (c.content_type.startsWith('research_')) {
          research.push({
            id: c.id,
            slug: c.slug,
            title: c.title,
            content_type: c.content_type,
            status: c.status || 'draft',
            created_at: c.created_at,
          });
        } else if (c.content_type.startsWith('assessment_')) {
          assessments.push({
            id: c.id,
            slug: c.slug,
            title: c.title,
            content_type: c.content_type,
            status: c.status || 'draft',
            created_at: c.created_at,
          });
        } else if (c.content_type.startsWith('resource_')) {
          resources.push({
            id: c.id,
            slug: c.slug,
            title: c.title,
            content_type: c.content_type,
            status: c.status || 'draft',
            created_at: c.created_at,
          });
        } else if (c.content_type.startsWith('report_')) {
          reports.push({
            id: c.id,
            slug: c.slug,
            title: c.title,
            content_type: c.content_type,
            status: c.status || 'draft',
            created_at: c.created_at,
          });
        }
      });

      // Handle orphan lessons (lessons without a parent module)
      const orphanLessons = lessonsByParent['orphan'] || [];
      if (orphanLessons.length > 0) {
        modules.push({
          id: 'orphan',
          slug: 'outros',
          title: 'Outras Lições',
          sequence_order: 999,
          lessons: orphanLessons.sort((a, b) => a.sequence_order - b.sequence_order),
        });
      }

      const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

      setContent({
        projectId: project.id,
        projectSlug: project.slug,
        projectName: project.name,
        modules,
        totalLessons,
        totalModules: modules.filter((m) => m.id !== 'orphan').length,
        research,
        assessments,
        resources,
        reports,
      });
    } catch (err) {
      console.error('Error fetching course contents:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [projectSlug]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return {
    content,
    loading,
    error,
    refetch: fetchContents,
  };
}

export default useCourseContents;
