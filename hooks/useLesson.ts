import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface LessonData {
  id: string;
  slug: string;
  title: string;
  content_type: string;
  status: string;
  fidelity_score: number | null;
  project_id: string;
  parent_content_id: string | null;
  content: string | null;  // Main content field (markdown)
  metadata: {
    duration?: string;
    description?: string;
    video_url?: string;
    script?: string;
    materials?: Array<{
      name: string;
      url: string;
      size: string;
      type: string;
    }>;
    [key: string]: unknown;
  } | null;
  created_at: string;
  updated_at: string;
  // Relations
  project?: {
    id: string;
    slug: string;
    name: string;
  };
  parent_module?: {
    id: string;
    slug: string;
    title: string;
  };
}

export interface LessonModule {
  id: string;
  title: string;
  lessons: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
}

interface UseLessonResult {
  lesson: LessonData | null;
  modules: LessonModule[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateLesson: (updates: Partial<LessonData>) => Promise<void>;
}

export function useLesson(lessonId: string | undefined): UseLessonResult {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [modules, setModules] = useState<LessonModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLesson = useCallback(async () => {
    if (!lessonId) {
      setLesson(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - lesson not available');
      setLesson(null);
      setModules([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch lesson data with project relation
      const { data: lessonData, error: lessonError } = await supabase
        .from('contents')
        .select(`
          *,
          project:content_projects(id, slug, name)
        `)
        .eq('id', lessonId)
        .single();

      if (lessonError) throw lessonError;

      // If lesson has a parent, fetch parent module separately
      let parentModule = null;
      if (lessonData?.parent_content_id) {
        const { data: parentData } = await supabase
          .from('contents')
          .select('id, slug, title')
          .eq('id', lessonData.parent_content_id)
          .single();
        parentModule = parentData;
      }

      setLesson({ ...lessonData, parent_module: parentModule });

      // Fetch all modules and lessons for the same project (for sidebar navigation)
      if (lessonData?.project_id) {
        const { data: modulesData, error: modulesError } = await supabase
          .from('contents')
          .select('id, slug, title, content_type, parent_content_id')
          .eq('project_id', lessonData.project_id)
          .in('content_type', ['course_module', 'course_lesson'])
          .order('created_at', { ascending: true });

        if (!modulesError && modulesData) {
          // Organize into modules with lessons
          const modulesMap = new Map<string, LessonModule>();
          const orphanLessons: Array<{ id: string; title: string; slug: string }> = [];

          // First pass: create modules
          modulesData
            .filter((c) => c.content_type === 'course_module')
            .forEach((mod) => {
              modulesMap.set(mod.id, {
                id: mod.id,
                title: mod.title,
                lessons: [],
              });
            });

          // Second pass: assign lessons to modules
          modulesData
            .filter((c) => c.content_type === 'course_lesson')
            .forEach((les) => {
              if (les.parent_content_id && modulesMap.has(les.parent_content_id)) {
                modulesMap.get(les.parent_content_id)!.lessons.push({
                  id: les.id,
                  title: les.title,
                  slug: les.slug,
                });
              } else {
                orphanLessons.push({
                  id: les.id,
                  title: les.title,
                  slug: les.slug,
                });
              }
            });

          const modulesList = Array.from(modulesMap.values());

          // Add orphan lessons as a separate "module" if any exist
          if (orphanLessons.length > 0) {
            modulesList.push({
              id: 'orphan',
              title: 'Outras Lições',
              lessons: orphanLessons,
            });
          }

          setModules(modulesList);
        }
      }
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  const updateLesson = useCallback(async (updates: Partial<LessonData>) => {
    if (!lessonId || !isSupabaseConfigured()) {
      // Local update for mock data
      setLesson((prev) => prev ? { ...prev, ...updates } : null);
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('contents')
        .update({
          title: updates.title,
          content: updates.content,
          status: updates.status,
          metadata: updates.metadata,
          updated_at: new Date().toISOString(),
        })
        .eq('id', lessonId);

      if (updateError) throw updateError;

      // Refresh data
      await fetchLesson();
    } catch (err) {
      console.error('Error updating lesson:', err);
      throw err;
    }
  }, [lessonId, fetchLesson]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return { lesson, modules, loading, error, refetch: fetchLesson, updateLesson };
}

export default useLesson;
