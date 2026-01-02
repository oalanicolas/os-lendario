import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { BookData } from './useBooks';

// Normalize title for deduplication
const normalizeTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[_\-,.:;!?'"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

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
    language?: string;
    original_title?: string;
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

// Deduplicate books by original_title or normalized title, prioritizing PT
const deduplicateBooks = (books: DbBookContent[]): DbBookContent[] => {
  const groups = new Map<string, DbBookContent[]>();

  for (const book of books) {
    const metadata = book.metadata || {};
    const originalTitle = metadata.original_title;
    const key = normalizeTitle(originalTitle || book.title);

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(book);
  }

  const deduplicated: DbBookContent[] = [];
  for (const [, versions] of groups) {
    if (versions.length === 1) {
      deduplicated.push(versions[0]);
    } else {
      versions.sort((a, b) => {
        const langA = a.metadata?.language || 'en';
        const langB = b.metadata?.language || 'en';
        const priorityA = langA === 'pt' ? 1 : langA === 'en' ? 2 : 3;
        const priorityB = langB === 'pt' ? 1 : langB === 'en' ? 2 : 3;
        if (priorityA !== priorityB) return priorityA - priorityB;
        return (b.content || '').length - (a.content || '').length;
      });
      deduplicated.push(versions[0]);
    }
  }

  return deduplicated;
};

interface UseBooksByAuthorResult {
  books: BookData[];
  authorName: string | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBooksByAuthor(authorSlug: string): UseBooksByAuthorResult {
  const [books, setBooks] = useState<BookData[]>([]);
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = useCallback(async () => {
    if (!authorSlug) {
      setBooks([]);
      setAuthorName(null);
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
      // Fetch books where the author (via content_minds) matches the slug
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
          content_tags(
            tags(id, slug, name)
          ),
          content_minds!inner(
            role,
            minds!inner(id, slug, name)
          )
        `
        )
        .eq('content_type', 'book_summary')
        .eq('content_minds.role', 'author')
        .eq('content_minds.minds.slug', authorSlug);

      if (fetchError) throw fetchError;

      // Deduplicate books (prioritize PT over EN) then transform
      const deduplicatedData = deduplicateBooks((data || []) as DbBookContent[]);

      // Transform to BookData format
      const transformedBooks: BookData[] = deduplicatedData.map((book) => {
        const metadata = book.metadata || {};
        const authorMind = book.content_minds?.find((cm) => cm.role === 'author')?.minds;
        const author = authorMind?.name || metadata.author || 'Autor Desconhecido';

        // Set author name from first book
        if (authorMind?.name && !authorName) {
          setAuthorName(authorMind.name);
        }

        // Extract tags
        const tags = (book.content_tags || [])
          .map((ct) => ct.tags)
          .filter((t): t is { id: string; slug: string; name: string } => t !== null);

        // Find category tag
        const categoryTag = tags.find((t) => !t.slug.startsWith('collection_'));

        return {
          id: book.id,
          slug: book.slug,
          title: book.title,
          author,
          authorSlug: authorMind?.slug || null,
          coverUrl: book.image_url,
          content: book.content || null,
          summary: metadata.description || book.content?.substring(0, 300) || null,
          category: categoryTag?.name || metadata.category || null,
          categorySlug: categoryTag?.slug || null,
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

      // Get author name if we have books
      if (transformedBooks.length > 0 && transformedBooks[0].author) {
        setAuthorName(transformedBooks[0].author);
      }

      setBooks(transformedBooks);
    } catch (err) {
      console.error('Error fetching books by author:', err);
      setError(err as Error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [authorSlug]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    authorName,
    loading,
    error,
    refetch: fetchBooks,
  };
}

export default useBooksByAuthor;
