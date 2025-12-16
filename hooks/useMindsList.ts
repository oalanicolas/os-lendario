import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface MindListItem {
  id: string;
  slug: string;
  name: string;
  shortBio: string;
  apexScore: number | null;
  avatar: string;
}

interface UseMindListResult {
  minds: MindListItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useMindsList(): UseMindListResult {
  const [minds, setMinds] = useState<MindListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMinds = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase not configured'));
      setLoading(false);
      return;
    }

    try {
      const { data: mindsData, error: mindsError } = await supabase
        .from('minds')
        .select(`
          id,
          slug,
          name,
          short_bio,
          apex_score,
          avatar_url
        `)
        .is('deleted_at', null)
        .order('apex_score', { ascending: false, nullsLast: true });

      if (mindsError) {
        throw mindsError;
      }

      const transformedMinds = (mindsData || []).map((m: any) => ({
        id: m.id,
        slug: m.slug,
        name: m.name,
        shortBio: m.short_bio || '',
        apexScore: m.apex_score,
        avatar: m.avatar_url || `/minds-profile-images/${m.slug}.jpg`,
      }));

      setMinds(transformedMinds);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch minds'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMinds();
  }, [fetchMinds]);

  return { minds, loading, error, refetch: fetchMinds };
}
