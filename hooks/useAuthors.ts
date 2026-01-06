import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface Author {
  id: string;
  slug: string;
  name: string;
  avatar_url: string | null;
  short_bio: string | null;
  book_count: number;
}

interface UseAuthorsResult {
  authors: Author[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAuthors(): UseAuthorsResult {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setAuthors([]);
      setLoading(false);
      return;
    }

    try {
      // Use optimized view (already has book counts for PT books)
      // Cast as any since view types are not auto-generated
      const { data, error: fetchError } = await (supabase as any)
        .from('v_authors_with_books')
        .select('*');

      if (fetchError) throw fetchError;

      // Transform to Author interface (view already has all fields)
      interface AuthorRow {
        id: string;
        slug: string;
        name: string;
        avatar_url: string | null;
        short_bio: string | null;
        book_count: number;
      }
      const authorsList: Author[] = ((data || []) as AuthorRow[]).map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        avatar_url: row.avatar_url,
        short_bio: row.short_bio,
        book_count: row.book_count,
      }));

      setAuthors(authorsList);
    } catch (err) {
      console.error('Error fetching authors:', err);
      setError(err as Error);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return {
    authors,
    loading,
    error,
    refetch: fetchAuthors,
  };
}

export default useAuthors;
