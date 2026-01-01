import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { BookData } from './useBooks';

// Database response type
interface DbBookContent {
  id: string;
  slug: string;
  title: string;
  content_type: string;
  status: string;
  content: string | null;
  image_url: string | null;
  metadata: {
    author?: string;
    description?: string;
    category?: string;
    pageCount?: number;
    publishedDate?: string;
    isbn?: string;
    averageRating?: number;
    duration?: string;
    hasAudio?: boolean;
    word_count?: number;
    reading_time_minutes?: number;
  } | null;
  created_at: string;
  content_tags: Array<{
    tags: { id: string; slug: string; name: string } | null;
  }>;
  content_minds: Array<{
    role: string;
    minds: { id: string; slug: string; name: string } | null;
  }>;
}

// Category info from tags table
interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  description: string | null;
}

interface UseBooksByCategoryResult {
  books: BookData[];
  category: CategoryInfo | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBooksByCategory(categorySlug: string): UseBooksByCategoryResult {
  const [books, setBooks] = useState<BookData[]>([]);
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = useCallback(async () => {
    if (!categorySlug) {
      setBooks([]);
      setCategory(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      // First, fetch the category tag info
      const { data: tagData, error: tagError } = await supabase
        .from('tags')
        .select('id, slug, name, description')
        .eq('slug', categorySlug)
        .eq('tag_type', 'category')
        .single<CategoryInfo>();

      if (tagError && tagError.code !== 'PGRST116') throw tagError;

      if (tagData) {
        setCategory(tagData);
      }

      // Fetch books with this category tag
      const { data, error: fetchError } = await supabase
        .from('contents')
        .select(
          `
          id,
          slug,
          title,
          content_type,
          status,
          content,
          image_url,
          metadata,
          created_at,
          content_tags!inner(
            tags!inner(id, slug, name)
          ),
          content_minds(
            role,
            minds(id, slug, name)
          )
        `
        )
        .eq('content_type', 'book_summary')
        .eq('content_tags.tags.slug', categorySlug);

      if (fetchError) throw fetchError;

      // Transform to BookData format
      const transformedBooks: BookData[] = ((data || []) as DbBookContent[]).map((book) => {
        const metadata = book.metadata || {};
        const authorMind = book.content_minds?.find((cm) => cm.role === 'author')?.minds;
        const author = authorMind?.name || metadata.author || 'Autor Desconhecido';

        // Extract tags
        const tags = (book.content_tags || [])
          .map((ct) => ct.tags)
          .filter((t): t is { id: string; slug: string; name: string } => t !== null);

        return {
          id: book.id,
          slug: book.slug,
          title: book.title,
          author,
          authorSlug: authorMind?.slug || null,
          coverUrl: book.image_url,
          content: book.content || null,
          summary: metadata.description || book.content?.substring(0, 300) || null,
          category: category?.name || metadata.category || null,
          categorySlug: categorySlug,
          tags,
          hasAudio: metadata.hasAudio || false,
          duration: metadata.duration || null,
          pageCount: metadata.pageCount || null,
          publishedYear: metadata.publishedDate
            ? parseInt(metadata.publishedDate.split('-')[0], 10) || null
            : null,
          isbn: metadata.isbn || null,
          rating: metadata.averageRating || null,
          status: book.status === 'published' ? 'published' : 'draft',
          createdAt: book.created_at,
          readingTime: metadata.reading_time_minutes || null,
          wordCount: metadata.word_count || null,
        };
      });

      setBooks(transformedBooks);
    } catch (err) {
      console.error('Error fetching books by category:', err);
      setError(err as Error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    category,
    loading,
    error,
    refetch: fetchBooks,
  };
}

export default useBooksByCategory;
