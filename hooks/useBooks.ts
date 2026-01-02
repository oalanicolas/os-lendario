import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { stripMarkdown } from '../lib/utils';

// Book data structure for UI
export interface BookData {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorSlug: string | null;
  coverUrl: string | null;
  content: string | null;
  summary: string | null;
  category: string | null;
  categorySlug: string | null;
  tags: Array<{ slug: string; name: string }>;
  hasAudio: boolean;
  duration: string | null;
  pageCount: number | null;
  publishedYear: number | null;
  isbn: string | null;
  rating: number | null;
  status: 'draft' | 'published';
  createdAt: string;
  readingTime: number | null;
  wordCount: number | null;
}

// Database content record for books
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
    categories?: string[];
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
  updated_at: string;
  content_tags?: Array<{
    tags: { id: string; slug: string; name: string } | null;
  }>;
  content_minds?: Array<{
    role: string;
    minds: { id: string; slug: string; name: string } | null;
  }>;
}

// Normalize title for deduplication (remove punctuation, underscores, lowercase)
const normalizeTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[_\-,.:;!?'"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Deduplicate books by original_title or normalized title, prioritizing PT
const deduplicateBooks = (books: DbBookContent[]): DbBookContent[] => {
  const groups = new Map<string, DbBookContent[]>();

  for (const book of books) {
    const metadata = book.metadata || {};
    const originalTitle = metadata.original_title as string | undefined;
    const key = normalizeTitle(originalTitle || book.title);

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(book);
  }

  // Select best version per group: pt > es > en, then by content length
  const deduplicated: DbBookContent[] = [];
  for (const [, versions] of groups) {
    if (versions.length === 1) {
      deduplicated.push(versions[0]);
    } else {
      // Sort by language priority (pt=1, en=2, es=3) then by content length
      versions.sort((a, b) => {
        const langA = (a.metadata?.language as string) || 'en';
        const langB = (b.metadata?.language as string) || 'en';
        const priorityA = langA === 'pt' ? 1 : langA === 'en' ? 2 : 3;
        const priorityB = langB === 'pt' ? 1 : langB === 'en' ? 2 : 3;

        if (priorityA !== priorityB) return priorityA - priorityB;

        // Tie-breaker: longer content
        const lenA = (a.content || '').length;
        const lenB = (b.content || '').length;
        return lenB - lenA;
      });
      deduplicated.push(versions[0]);
    }
  }

  return deduplicated;
};

// Transform database book to UI BookData
const transformToBookData = (dbBook: DbBookContent): BookData => {
  const metadata = dbBook.metadata || {};

  // Extract author from content_minds (role = 'author') or metadata
  const authorMind = dbBook.content_minds?.find((cm) => cm.role === 'author')?.minds;
  const author = authorMind?.name || metadata.author || 'Autor Desconhecido';
  const authorSlug = authorMind?.slug || null;

  // Extract tags
  const tags = (dbBook.content_tags || [])
    .filter((ct) => ct.tags?.slug)
    .map((ct) => ({
      slug: ct.tags!.slug,
      name: ct.tags!.name,
    }));

  // Get primary category (first tag or from metadata)
  const primaryTag = tags[0];
  const category = primaryTag?.name || metadata.category || metadata.categories?.[0] || null;
  const categorySlug = primaryTag?.slug || null;

  // Extract year from publishedDate
  const publishedYear = metadata.publishedDate
    ? parseInt(metadata.publishedDate.split('-')[0], 10) || null
    : null;

  return {
    id: dbBook.id,
    slug: dbBook.slug,
    title: dbBook.title,
    author,
    authorSlug,
    coverUrl: dbBook.image_url,
    content: dbBook.content || null,
    summary: metadata.description
      ? stripMarkdown(metadata.description)
      : dbBook.content
        ? stripMarkdown(dbBook.content.substring(0, 300))
        : null,
    category,
    categorySlug,
    tags,
    hasAudio: metadata.hasAudio || false,
    duration: metadata.duration || null,
    pageCount: metadata.pageCount || null,
    publishedYear,
    isbn: metadata.isbn || null,
    rating: metadata.averageRating || null,
    status: dbBook.status === 'published' ? 'published' : 'draft',
    createdAt: dbBook.created_at,
    readingTime: metadata.reading_time_minutes || null,
    wordCount: metadata.word_count || null,
  };
};

interface UseBooksResult {
  books: BookData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  totalBooks: number;
}

export function useBooks(): UseBooksResult {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - no books available');
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      const { data: booksData, error: booksError } = await supabase
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
          updated_at,
          content_tags(
            tags(id, slug, name)
          ),
          content_minds(
            role,
            minds(id, slug, name)
          )
        `
        )
        .eq('content_type', 'book_summary')
        .order('created_at', { ascending: false });

      if (booksError) {
        throw booksError;
      }

      // Deduplicate books (prioritize PT over EN) then transform
      const deduplicatedBooks = deduplicateBooks(booksData || []);
      const transformedBooks = deduplicatedBooks.map(transformToBookData);
      setBooks(transformedBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err as Error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    refetch: fetchBooks,
    totalBooks: books.length,
  };
}

// Hook for single book details
interface UseBookResult {
  book: BookData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBook(slug: string): UseBookResult {
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBook = useCallback(async () => {
    if (!slug) {
      setBook(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setBook(null);
      setLoading(false);
      return;
    }

    try {
      const { data: bookData, error: bookError } = await supabase
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
          updated_at,
          content_tags(
            tags(id, slug, name)
          ),
          content_minds(
            role,
            minds(id, slug, name)
          )
        `
        )
        .eq('slug', slug)
        .eq('content_type', 'book_summary')
        .single();

      if (bookError) {
        throw bookError;
      }

      setBook(bookData ? transformToBookData(bookData) : null);
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err as Error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return {
    book,
    loading,
    error,
    refetch: fetchBook,
  };
}

// Hook for book categories (tags with type book_category)
interface UseBookCategoriesResult {
  categories: Array<{ slug: string; name: string; count: number }>;
  loading: boolean;
  error: Error | null;
}

export function useBookCategories(): UseBookCategoriesResult {
  const [categories, setCategories] = useState<
    Array<{ slug: string; name: string; count: number }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isSupabaseConfigured()) {
        setCategories([]);
        setLoading(false);
        return;
      }

      try {
        // Get categories with book count
        const { data, error: catError } = await supabase
          .from('tags')
          .select(
            `
            slug,
            name,
            content_tags(count)
          `
          )
          .eq('tag_type', 'book_category');

        if (catError) throw catError;

        // Type assertion for the query result
        type TagWithCount = {
          slug: string;
          name: string;
          content_tags: Array<{ count: number }>;
        };

        const categoriesWithCount = ((data || []) as TagWithCount[])
          .map((cat) => ({
            slug: cat.slug,
            name: cat.name,
            count: cat.content_tags?.[0]?.count || 0,
          }))
          .filter((c) => c.count > 0)
          .sort((a, b) => b.count - a.count);

        setCategories(categoriesWithCount);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export default useBooks;
