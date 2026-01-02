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

// Type for the Supabase query result
interface AuthorQueryResult {
  id: string;
  slug: string;
  name: string;
  avatar_url: string | null;
  short_bio: string | null;
  content_minds: Array<{
    role: string;
    contents: {
      id: string;
      content_type: string;
    } | null;
  }>;
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
      // Fetch minds that are linked as authors to book_summary contents
      // Using a join through content_minds
      const { data, error: fetchError } = await supabase
        .from('minds')
        .select(
          `
          id,
          slug,
          name,
          avatar_url,
          short_bio,
          content_minds!inner(
            role,
            contents!inner(
              id,
              content_type
            )
          )
        `
        )
        .eq('content_minds.role', 'author')
        .eq('content_minds.contents.content_type', 'book_summary')
        .is('deleted_at', null);

      if (fetchError) throw fetchError;

      // Transform and count books per author
      const authorMap = new Map<string, Author>();
      const minds = (data || []) as AuthorQueryResult[];

      for (const mind of minds) {
        if (!authorMap.has(mind.id)) {
          // Count unique book contents
          const bookIds = new Set<string>();
          for (const cm of mind.content_minds || []) {
            if (cm.contents?.id) {
              bookIds.add(cm.contents.id);
            }
          }

          authorMap.set(mind.id, {
            id: mind.id,
            slug: mind.slug,
            name: mind.name,
            avatar_url: mind.avatar_url,
            short_bio: mind.short_bio,
            book_count: bookIds.size,
          });
        }
      }

      // Convert to array and sort by name
      const authorsList = Array.from(authorMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR')
      );

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
