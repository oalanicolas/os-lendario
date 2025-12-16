import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface RecentActivity {
  id: string;
  title: string;
  slug: string;
  content_type: string;
  tipo_label: string;
  project_id: string;
  project_slug: string;
  project_name: string;
  created_at: string;
  updated_at: string;
}

interface UseRecentActivitiesResult {
  activities: RecentActivity[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useRecentActivities(limit: number = 10): UseRecentActivitiesResult {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using empty activities');
      setActivities([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('v_recent_activities')
        .select('*')
        .limit(limit);

      if (queryError) throw queryError;

      setActivities(data || []);
    } catch (err) {
      console.error('Error fetching recent activities:', err);
      setError(err as Error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
  };
}

// Helper to format relative time in Portuguese
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'agora';
  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays === 1) return 'ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

// Helper to get action type from content_type
export function getActionFromContentType(contentType: string): 'created' | 'edited' | 'published' {
  // For now, we assume all are "edited" since we're using updated_at
  // In the future, we could compare created_at vs updated_at to determine action
  return 'edited';
}

// Helper to get icon for content type - matching pipeline icons
export function getIconForContentType(contentType: string): string {
  const icons: Record<string, string> = {
    'course_lesson': 'play-alt',
    'course_module': 'folder',
    'default': 'document',
  };

  return icons[contentType] || icons.default;
}

// Helper to get icon based on tipo_label (Portuguese labels from the view)
export function getIconForTipoLabel(tipoLabel: string): string {
  const icons: Record<string, string> = {
    // Pipeline stages - Portuguese labels
    'Briefing': 'file-edit',
    'Brief': 'file-edit',
    'Pesquisa': 'search',
    'Currículo': 'list',
    'Planejamento': 'list',
    'Geração': 'magic-wand',
    'Validação': 'check-circle',
    'Produção': 'video-camera',
    'Publicado': 'rocket',
    'Entrega': 'rocket',
    // Content types
    'Aula': 'play-alt',
    'Módulo': 'folder',
    'Quiz': 'list-check',
    'Recurso': 'copy',
    'Relatório': 'chart-pie',
    'Report': 'chart-pie',
  };

  // Try exact match first
  if (icons[tipoLabel]) return icons[tipoLabel];

  // Try partial match (case insensitive)
  const lowerLabel = tipoLabel.toLowerCase();
  for (const [key, icon] of Object.entries(icons)) {
    if (lowerLabel.includes(key.toLowerCase())) return icon;
  }

  return 'document';
}

// Helper to get color for action type
export function getColorForAction(action: string): { bg: string; text: string } {
  const colors: Record<string, { bg: string; text: string }> = {
    'edited': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    'created': { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
    'published': { bg: 'bg-purple-500/20', text: 'text-purple-400' },
    'reviewed': { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  };
  return colors[action] || colors.edited;
}

export default useRecentActivities;
