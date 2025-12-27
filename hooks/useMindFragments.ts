import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface MindFragment {
  id: string;
  mindId: string;
  contentId: string;
  contentTitle?: string;
  sourceTitle?: string;
  location: string;
  type: string;
  content: string;
  context: string;
  insight: string;
  relevance: number;
  confidence?: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export interface FragmentUpdate {
  relevance?: number;
  confidence?: number;
  type?: string;
  metadata?: Record<string, unknown>;
}

export interface FragmentCreate {
  mindId: string;
  contentId?: string;
  location: string;
  type: string;
  content: string;
  context: string;
  insight: string;
  relevance: number;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

export interface MindFragmentsResult {
  fragments: MindFragment[];
  total: number;
  byType: Record<string, number>;
  byRelevance: { high: number; medium: number; low: number };
}

interface UseMindFragmentsResult {
  data: MindFragmentsResult | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateFragment: (id: string, updates: FragmentUpdate) => Promise<boolean>;
  deleteFragment: (id: string) => Promise<boolean>;
  deleteFragmentsByContentId: (contentId: string) => Promise<{ success: boolean; count: number }>;
  createFragment: (data: FragmentCreate) => Promise<MindFragment | null>;
}

// Fragment type labels
export const FRAGMENT_TYPE_LABELS: Record<string, string> = {
  belief: 'Crença',
  value: 'Valor',
  behavior: 'Comportamento',
  opinion: 'Opinião',
  experience: 'Experiência',
  preference: 'Preferência',
  goal: 'Objetivo',
  fear: 'Medo',
  motivation: 'Motivação',
  insight: 'Insight',
  quote: 'Citação',
  other: 'Outro',
};

// Fragment type icons
export const FRAGMENT_TYPE_ICONS: Record<string, string> = {
  belief: 'lightbulb',
  value: 'heart',
  behavior: 'running',
  opinion: 'comment-alt',
  experience: 'history',
  preference: 'star',
  goal: 'target',
  fear: 'exclamation-triangle',
  motivation: 'bolt',
  insight: 'brain',
  quote: 'quote-right',
  other: 'file',
};

// Fragment type colors
export const FRAGMENT_TYPE_COLORS: Record<string, string> = {
  belief: 'text-amber-400',
  value: 'text-rose-400',
  behavior: 'text-emerald-400',
  opinion: 'text-blue-400',
  experience: 'text-purple-400',
  preference: 'text-pink-400',
  goal: 'text-green-400',
  fear: 'text-red-400',
  motivation: 'text-yellow-400',
  insight: 'text-cyan-400',
  quote: 'text-indigo-400',
  other: 'text-zinc-400',
};

export function useMindFragments(mindId: string | null): UseMindFragmentsResult {
  const [data, setData] = useState<MindFragmentsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFragments = useCallback(async () => {
    if (!mindId || !isSupabaseConfigured()) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch fragments with source content title
      const { data: fragmentsData, error: fragmentsError } = await supabase
        .from('fragments')
        .select(`
          id,
          mind_id,
          content_id,
          location,
          type,
          content,
          context,
          insight,
          relevance,
          confidence,
          metadata,
          created_at,
          updated_at,
          contents:content_id (title)
        `)
        .eq('mind_id', mindId)
        .order('relevance', { ascending: false })
        .order('created_at', { ascending: false })
        .range(0, 9999); // Supabase ignores .limit() over 1000, use .range() instead

      if (fragmentsError) {
        console.error('[useMindFragments] Query error:', fragmentsError);
        throw fragmentsError;
      }

      console.log('[useMindFragments] Fetched fragments:', fragmentsData?.length);

      const fragments: MindFragment[] = (fragmentsData || []).map((f: Record<string, unknown>) => {
        const title = (f.contents as { title?: string } | null)?.title || undefined;
        return {
          id: f.id as string,
          mindId: f.mind_id as string,
          contentId: f.content_id as string,
          contentTitle: title,
          sourceTitle: title,
          location: f.location as string,
          type: f.type as string,
          content: f.content as string,
          context: f.context as string,
          insight: f.insight as string,
          relevance: f.relevance as number,
          confidence: f.confidence as number | undefined,
          metadata: f.metadata as Record<string, unknown> | undefined,
          createdAt: f.created_at as string,
          updatedAt: f.updated_at as string | undefined,
        };
      });

      // Calculate stats
      const byType: Record<string, number> = {};
      let highRelevance = 0;
      let mediumRelevance = 0;
      let lowRelevance = 0;

      fragments.forEach(f => {
        // Count by type
        const type = f.type || 'other';
        byType[type] = (byType[type] || 0) + 1;

        // Count by relevance
        if (f.relevance >= 8) {
          highRelevance++;
        } else if (f.relevance >= 5) {
          mediumRelevance++;
        } else {
          lowRelevance++;
        }
      });

      setData({
        fragments,
        total: fragments.length,
        byType,
        byRelevance: {
          high: highRelevance,
          medium: mediumRelevance,
          low: lowRelevance,
        },
      });
    } catch (err) {
      console.error('Error fetching mind fragments:', err);
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [mindId]);

  useEffect(() => {
    fetchFragments();
  }, [fetchFragments]);

  // Update a fragment
  const updateFragment = useCallback(async (id: string, updates: FragmentUpdate): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      console.error('[useMindFragments] Supabase not configured');
      return false;
    }

    try {
      // Build update payload with explicit field mapping
      const updatePayload: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (updates.relevance !== undefined) updatePayload.relevance = updates.relevance;
      if (updates.confidence !== undefined) updatePayload.confidence = updates.confidence;
      if (updates.type !== undefined) updatePayload.type = updates.type;
      if (updates.metadata !== undefined) updatePayload.metadata = updates.metadata;

      const { error: updateError } = await (supabase
        .from('fragments') as ReturnType<typeof supabase.from>)
        .update(updatePayload)
        .eq('id', id);

      if (updateError) {
        console.error('[useMindFragments] Update error:', updateError);
        throw updateError;
      }

      // Refetch to update local state
      await fetchFragments();
      return true;
    } catch (err) {
      console.error('Error updating fragment:', err);
      return false;
    }
  }, [fetchFragments]);

  // Delete a fragment (soft delete via RPC to bypass RLS)
  const deleteFragment = useCallback(async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      console.error('[useMindFragments] Supabase not configured');
      return false;
    }

    try {
      // Use RPC function with SECURITY DEFINER to bypass RLS
      const { data: result, error: deleteError } = await supabase
        .rpc('soft_delete_fragment', { fragment_id: id });

      if (deleteError) {
        console.error('[useMindFragments] Delete error:', deleteError);
        throw deleteError;
      }

      if (!result) {
        console.warn('[useMindFragments] Fragment not found or already deleted');
      }

      // Refetch to update local state
      await fetchFragments();
      return true;
    } catch (err) {
      console.error('Error deleting fragment:', err);
      return false;
    }
  }, [fetchFragments]);

  // Delete all fragments by content ID (soft delete via RPC)
  const deleteFragmentsByContentId = useCallback(async (contentId: string): Promise<{ success: boolean; count: number }> => {
    if (!isSupabaseConfigured()) {
      console.error('[useMindFragments] Supabase not configured');
      return { success: false, count: 0 };
    }

    try {
      // Get count before deletion for UI feedback
      const expectedCount = data?.fragments.filter(f => f.contentId === contentId).length || 0;

      // Use RPC function with SECURITY DEFINER to bypass RLS
      const { data: deletedCount, error: deleteError } = await supabase
        .rpc('soft_delete_fragments_by_content', { p_content_id: contentId });

      if (deleteError) {
        console.error('[useMindFragments] Bulk delete error:', deleteError);
        throw deleteError;
      }

      console.log(`[useMindFragments] Soft deleted ${deletedCount} fragments`);

      // Refetch to update local state
      await fetchFragments();
      return { success: true, count: deletedCount || expectedCount };
    } catch (err) {
      console.error('Error deleting fragments by content:', err);
      return { success: false, count: 0 };
    }
  }, [fetchFragments, data?.fragments]);

  // Create a new fragment
  const createFragment = useCallback(async (fragmentData: FragmentCreate): Promise<MindFragment | null> => {
    if (!isSupabaseConfigured()) {
      console.error('[useMindFragments] Supabase not configured');
      return null;
    }

    try {
      // Build insert payload with explicit typing
      const insertPayload: Record<string, unknown> = {
        mind_id: fragmentData.mindId,
        content_id: fragmentData.contentId || null,
        location: fragmentData.location,
        type: fragmentData.type,
        content: fragmentData.content,
        context: fragmentData.context,
        insight: fragmentData.insight,
        relevance: fragmentData.relevance,
        confidence: fragmentData.confidence || null,
        metadata: fragmentData.metadata || {},
      };

      const { data: newFragment, error: insertError } = await (supabase
        .from('fragments') as ReturnType<typeof supabase.from>)
        .insert(insertPayload)
        .select()
        .single();

      if (insertError) {
        console.error('[useMindFragments] Insert error:', insertError);
        throw insertError;
      }

      if (!newFragment) {
        console.error('[useMindFragments] No data returned from insert');
        return null;
      }

      // Refetch to update local state
      await fetchFragments();

      // Return the created fragment with proper type casting
      const result = newFragment as Record<string, unknown>;
      return {
        id: result.id as string,
        mindId: result.mind_id as string,
        contentId: result.content_id as string,
        location: result.location as string,
        type: result.type as string,
        content: result.content as string,
        context: result.context as string,
        insight: result.insight as string,
        relevance: result.relevance as number,
        confidence: result.confidence as number | undefined,
        metadata: result.metadata as Record<string, unknown> | undefined,
        createdAt: result.created_at as string,
        updatedAt: result.updated_at as string | undefined,
      };
    } catch (err) {
      console.error('Error creating fragment:', err);
      return null;
    }
  }, [fetchFragments]);

  return {
    data,
    loading,
    error,
    refetch: fetchFragments,
    updateFragment,
    deleteFragment,
    deleteFragmentsByContentId,
    createFragment,
  };
}

export default useMindFragments;
