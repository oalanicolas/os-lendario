import { useState, useEffect, useCallback } from 'react';
import YAML from 'yaml';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// History event type (matches HistoryTab interface)
export interface HistoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  details?: string[];
  type: 'origin' | 'milestone' | 'pivot' | 'crisis' | 'learning';
  relevance?: number;
  source_ref?: string;
}

// YAML structure stored in database
export interface HistoryYAMLData {
  version?: string;
  quote?: string;
  events: HistoryEvent[];
  achievements?: {
    title: string;
    period: string;
    description: string;
  }[];
}

// Result returned by the hook
export interface MindHistoryResult {
  quote: string | null;
  events: HistoryEvent[];
  achievements: HistoryYAMLData['achievements'];
  contentId: string | null;
  projectId: string | null;
}

interface UseMindHistoryResult {
  data: MindHistoryResult | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function parseHistoryYAML(content: string): HistoryYAMLData | null {
  try {
    const parsed = YAML.parse(content) as HistoryYAMLData;

    // Validate basic structure
    if (!parsed || !Array.isArray(parsed.events)) {
      console.warn('Invalid history YAML: missing events array');
      return null;
    }

    return parsed;
  } catch (err) {
    console.error('Error parsing history YAML:', err);
    return null;
  }
}

export function useMindHistory(mindId: string | null): UseMindHistoryResult {
  const [data, setData] = useState<MindHistoryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = useCallback(async () => {
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
      // Query content_projects linked to this mind, then get contents with mind_history type
      const { data: projectData, error: projectError } = await supabase
        .from('content_projects')
        .select(`
          id,
          contents!inner (
            id,
            content,
            content_type
          )
        `)
        .eq('persona_mind_id', mindId)
        .eq('contents.content_type', 'mind_history')
        .single();

      if (projectError) {
        // No data found is not an error
        if (projectError.code === 'PGRST116') {
          setData({
            quote: null,
            events: [],
            achievements: [],
            contentId: null,
            projectId: null
          });
          return;
        }
        throw projectError;
      }

      // Get the content from the nested result
      const contents = (projectData as any)?.contents;
      const historyContent = Array.isArray(contents) ? contents[0] : contents;

      if (!historyContent?.content) {
        setData({
          quote: null,
          events: [],
          achievements: [],
          contentId: null,
          projectId: (projectData as any)?.id || null
        });
        return;
      }

      // Parse YAML content
      const parsed = parseHistoryYAML(historyContent.content);

      if (!parsed) {
        setData({
          quote: null,
          events: [],
          achievements: [],
          contentId: historyContent.id,
          projectId: (projectData as any)?.id || null
        });
        return;
      }

      setData({
        quote: parsed.quote || null,
        events: parsed.events,
        achievements: parsed.achievements || [],
        contentId: historyContent.id,
        projectId: (projectData as any)?.id || null
      });
    } catch (err) {
      console.error('Error fetching mind history:', err);
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [mindId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    data,
    loading,
    error,
    refetch: fetchHistory
  };
}

export default useMindHistory;
