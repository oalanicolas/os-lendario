// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Debate round structure
export interface DebateRound {
  number: number;
  type: string;
  mind1Argument: string;
  mind2Argument: string;
}

// Mind participant in debate
export interface DebateMind {
  id: string;
  name: string;
  role: string;
}

// Full debate data
export interface Debate {
  id: string;
  slug: string;
  topic: string;
  framework: string;
  date: string;
  mind1: DebateMind;
  mind2: DebateMind;
  rounds: DebateRound[];
  views: number;
  rating: number;
  status: string;
  createdAt: string;
}

interface UseDebatesResult {
  debates: Debate[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseDebateResult {
  debate: Debate | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Transform database record to Debate interface
const transformDebate = (record: any): Debate => {
  const metadata = record.metadata || {};

  return {
    id: record.id,
    slug: record.slug,
    topic: record.title,
    framework: metadata.framework || 'Unknown',
    date: metadata.date || record.created_at?.split('T')[0] || '',
    mind1: {
      id: metadata.mind1?.id || '',
      name: metadata.mind1?.name || 'Mind 1',
      role: metadata.mind1?.role || 'participant',
    },
    mind2: {
      id: metadata.mind2?.id || '',
      name: metadata.mind2?.name || 'Mind 2',
      role: metadata.mind2?.role || 'participant',
    },
    rounds: (metadata.rounds || []).map((r: any) => ({
      number: r.number,
      type: r.type,
      mind1Argument: r.mind1_argument || r.mind1Argument || '',
      mind2Argument: r.mind2_argument || r.mind2Argument || '',
    })),
    views: metadata.views || 0,
    rating: metadata.rating || 0,
    status: record.status || 'draft',
    createdAt: record.created_at,
  };
};

/**
 * Hook to fetch all debates
 */
export function useDebates(): UseDebatesResult {
  const [debates, setDebates] = useState<Debate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDebates = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase not configured'));
      setLoading(false);
      return;
    }

    try {
      // @ts-ignore - Supabase query type inference issue
      const { data, error: fetchError } = await supabase
        .from('contents')
        .select('*')
        .eq('content_type', 'mind_debate')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      const transformedDebates = (data || []).map(transformDebate);
      setDebates(transformedDebates);
    } catch (err) {
      console.error('Error fetching debates:', err);
      setError(err as Error);
      setDebates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDebates();
  }, [fetchDebates]);

  return {
    debates,
    loading,
    error,
    refetch: fetchDebates,
  };
}

/**
 * Hook to fetch a single debate by ID or slug
 */
export function useDebate(idOrSlug: string | null): UseDebateResult {
  const [debate, setDebate] = useState<Debate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDebate = useCallback(async () => {
    if (!idOrSlug) {
      setDebate(null);
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
      // Try to fetch by ID first, then by slug
      let query = supabase
        .from('contents')
        .select('*')
        .eq('content_type', 'mind_debate')
        .is('deleted_at', null);

      // Check if it looks like an ID (contains hyphen pattern) or slug
      if (idOrSlug.startsWith('debate-')) {
        query = query.eq('id', idOrSlug);
      } else {
        query = query.eq('slug', idOrSlug);
      }

      // @ts-ignore - Supabase query type inference issue
      const { data, error: fetchError } = await query.single();

      if (fetchError) {
        throw fetchError;
      }

      if (!data) {
        throw new Error('Debate not found');
      }

      setDebate(transformDebate(data));
    } catch (err) {
      console.error('Error fetching debate:', err);
      setError(err as Error);
      setDebate(null);
    } finally {
      setLoading(false);
    }
  }, [idOrSlug]);

  useEffect(() => {
    fetchDebate();
  }, [fetchDebate]);

  return {
    debate,
    loading,
    error,
    refetch: fetchDebate,
  };
}

/**
 * Hook to increment debate views
 */
export async function incrementDebateViews(debateId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;

  try {
    // First get current metadata
    // @ts-ignore - Supabase query type inference issue
    const { data } = await supabase.from('contents').select('metadata').eq('id', debateId).single();

    if (data?.metadata) {
      const currentViews = (data.metadata as any).views || 0;
      const newMetadata = {
        ...(data.metadata as object),
        views: currentViews + 1,
      };

      await supabase.from('contents').update({ metadata: newMetadata }).eq('id', debateId);
    }
  } catch (err) {
    console.error('Error incrementing views:', err);
  }
}

export default useDebates;
