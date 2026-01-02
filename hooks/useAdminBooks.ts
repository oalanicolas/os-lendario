import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Language type
export type BookLanguage = 'pt' | 'en' | 'es';

// Single book version (one language)
export interface AdminBookVersion {
  id: string;
  slug: string;
  title: string;
  language: BookLanguage;
  status: 'published' | 'draft' | 'archived';
  content: string | null;
  summary: string | null;
  coverUrl: string | null;
  pageCount: number | null;
  readingTime: number | null;
  isbn: string | null;
  year: string | null;
  hasAudio: boolean;
  createdAt: string;
  updatedAt: string;
}

// Grouped book (all language versions)
export interface AdminBook {
  originalTitle: string;
  author: {
    id: string;
    slug: string;
    name: string;
  } | null;
  category: {
    slug: string;
    name: string;
  } | null;
  collections: Array<{ slug: string; name: string }>;
  coverUrl: string | null;
  languages: {
    pt: AdminBookVersion | null;
    en: AdminBookVersion | null;
    es: AdminBookVersion | null;
  };
  // Computed from best version
  status: 'published' | 'draft' | 'archived';
  updatedAt: string;
  views: number;
}

// Stats for dashboard
export interface AdminBooksStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  collectionsCount: number;
}

// Database types
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
  updated_at: string;
  content_tags?: Array<{
    tags: { id: string; slug: string; name: string; tag_type: string } | null;
  }>;
  content_minds?: Array<{
    role: string;
    minds: { id: string; slug: string; name: string } | null;
  }>;
}

// Normalize title for grouping
const normalizeTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[_\-,.:;!?'"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Get language from metadata or detect from slug/title
const detectLanguage = (book: DbBookContent): BookLanguage => {
  const lang = book.metadata?.language;
  if (lang === 'pt' || lang === 'en' || lang === 'es') return lang;

  // Fallback: detect from slug suffix
  if (book.slug.endsWith('_pt')) return 'pt';
  if (book.slug.endsWith('_en')) return 'en';
  if (book.slug.endsWith('_es')) return 'es';

  // Default to pt for Portuguese content
  return 'pt';
};

// Transform DB book to AdminBookVersion
const toBookVersion = (dbBook: DbBookContent): AdminBookVersion => {
  const metadata = dbBook.metadata || {};

  return {
    id: dbBook.id,
    slug: dbBook.slug,
    title: dbBook.title,
    language: detectLanguage(dbBook),
    status:
      dbBook.status === 'published'
        ? 'published'
        : dbBook.status === 'archived'
          ? 'archived'
          : 'draft',
    content: dbBook.content,
    summary: metadata.description || null,
    coverUrl: dbBook.image_url,
    pageCount: metadata.pageCount || null,
    readingTime: metadata.reading_time_minutes || null,
    isbn: metadata.isbn || null,
    year: metadata.publishedDate ? metadata.publishedDate.split('-')[0] : null,
    hasAudio: metadata.hasAudio || false,
    createdAt: dbBook.created_at,
    updatedAt: dbBook.updated_at,
  };
};

// Group books by original_title
const groupBooksByOriginalTitle = (books: DbBookContent[]): AdminBook[] => {
  const groups = new Map<string, DbBookContent[]>();

  for (const book of books) {
    const originalTitle = book.metadata?.original_title || book.title;
    const key = normalizeTitle(originalTitle);

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(book);
  }

  const result: AdminBook[] = [];

  for (const [, versions] of groups) {
    // Get the first book for shared data
    const firstBook = versions[0];
    const metadata = firstBook.metadata || {};

    // Extract author
    const authorMind = firstBook.content_minds?.find((cm) => cm.role === 'author')?.minds;

    // Extract categories and collections from tags
    const allTags = firstBook.content_tags || [];
    const categoryTag = allTags.find((ct) => ct.tags?.tag_type === 'book_category')?.tags;
    const collectionTags = allTags
      .filter((ct) => ct.tags?.tag_type === 'collection')
      .map((ct) => ({ slug: ct.tags!.slug, name: ct.tags!.name }));

    // Build language versions map
    const languages: AdminBook['languages'] = {
      pt: null,
      en: null,
      es: null,
    };

    for (const book of versions) {
      const version = toBookVersion(book);
      languages[version.language] = version;
    }

    // Determine best status and latest update
    const allVersions = [languages.pt, languages.en, languages.es].filter(
      Boolean
    ) as AdminBookVersion[];
    const bestStatus = allVersions.some((v) => v.status === 'published')
      ? 'published'
      : allVersions.some((v) => v.status === 'draft')
        ? 'draft'
        : 'archived';
    const latestUpdate = allVersions
      .map((v) => v.updatedAt)
      .sort()
      .reverse()[0];

    // Use PT cover first, then EN, then ES
    const coverUrl =
      languages.pt?.coverUrl || languages.en?.coverUrl || languages.es?.coverUrl || null;

    result.push({
      originalTitle: metadata.original_title || firstBook.title,
      author: authorMind
        ? { id: authorMind.id, slug: authorMind.slug, name: authorMind.name }
        : null,
      category: categoryTag ? { slug: categoryTag.slug, name: categoryTag.name } : null,
      collections: collectionTags,
      coverUrl,
      languages,
      status: bestStatus,
      updatedAt: latestUpdate,
      views: 0, // TODO: Implement views tracking
    });
  }

  // Sort by latest update
  result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return result;
};

// Save book data structure
export interface SaveBookData {
  originalTitle: string;
  authorId: string | null;
  categorySlug: string | null;
  collectionSlugs: string[];
  coverUrl: string | null;
  versions: {
    pt?: SaveBookVersionData;
    en?: SaveBookVersionData;
    es?: SaveBookVersionData;
  };
  metadata: {
    isbn: string | null;
    year: string | null;
    pageCount: number | null;
    readingTime: number | null;
    hasAudio: boolean;
  };
}

export interface SaveBookVersionData {
  id?: string; // undefined = create new
  title: string;
  slug: string;
  content: string | null;
  summary: string | null;
  status: 'published' | 'draft' | 'archived';
}

// Hook result type
interface UseAdminBooksResult {
  books: AdminBook[];
  stats: AdminBooksStats;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  // Mutations
  deleteBook: (bookId: string) => Promise<void>;
  updateBookStatus: (bookId: string, status: 'published' | 'draft' | 'archived') => Promise<void>;
  saveBook: (data: SaveBookData) => Promise<void>;
  uploadCover: (file: File, slug: string) => Promise<string>;
}

export function useAdminBooks(): UseAdminBooksResult {
  const [rawBooks, setRawBooks] = useState<DbBookContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - no books available');
      setRawBooks([]);
      setLoading(false);
      return;
    }

    try {
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
          updated_at,
          content_tags(
            tags(id, slug, name, tag_type)
          ),
          content_minds(
            role,
            minds(id, slug, name)
          )
        `
        )
        .eq('content_type', 'book_summary')
        .order('updated_at', { ascending: false });

      if (fetchError) throw fetchError;

      setRawBooks((data || []) as DbBookContent[]);
    } catch (err) {
      console.error('Error fetching admin books:', err);
      setError(err as Error);
      setRawBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Compute grouped books
  const books = useMemo(() => groupBooksByOriginalTitle(rawBooks), [rawBooks]);

  // Compute stats
  const stats = useMemo<AdminBooksStats>(() => {
    const published = rawBooks.filter((b) => b.status === 'published').length;
    const draft = rawBooks.filter((b) => b.status === 'draft').length;
    const archived = rawBooks.filter((b) => b.status === 'archived').length;

    // Count unique collections
    const collectionsSet = new Set<string>();
    for (const book of rawBooks) {
      for (const ct of book.content_tags || []) {
        if (ct.tags?.tag_type === 'collection') {
          collectionsSet.add(ct.tags.slug);
        }
      }
    }

    return {
      total: books.length, // Grouped count (unique titles)
      published,
      draft,
      archived,
      collectionsCount: collectionsSet.size,
    };
  }, [rawBooks, books]);

  // Delete a book version
  const deleteBook = useCallback(
    async (bookId: string) => {
      if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

      const { error: deleteError } = await supabase.from('contents').delete().eq('id', bookId);

      if (deleteError) throw deleteError;

      // Refetch to update the list
      await fetchBooks();
    },
    [fetchBooks]
  );

  // Update book status
  const updateBookStatus = useCallback(
    async (bookId: string, status: 'published' | 'draft' | 'archived') => {
      if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from('contents')
        .update({ status })
        .eq('id', bookId);

      if (updateError) throw updateError;

      // Refetch to update the list
      await fetchBooks();
    },
    [fetchBooks]
  );

  // Upload book cover to Supabase Storage
  const uploadCover = useCallback(async (file: File, slug: string): Promise<string> => {
    if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${slug}.${ext}`;

    // Upload file (upsert to allow replacement)
    const { error: uploadError } = await supabase.storage
      .from('book_covers')
      .upload(path, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from('book_covers').getPublicUrl(path);

    return data.publicUrl;
  }, []);

  // Save book (create or update)
  const saveBook = useCallback(
    async (data: SaveBookData) => {
      if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

      const languages: BookLanguage[] = ['pt', 'en', 'es'];

      for (const lang of languages) {
        const version = data.versions[lang];
        if (!version) continue;

        const contentData = {
          title: version.title,
          slug: version.slug,
          content_type: 'book_summary',
          status: version.status,
          content: version.content,
          image_url: data.coverUrl,
          metadata: {
            original_title: data.originalTitle,
            language: lang,
            description: version.summary,
            category: data.categorySlug,
            pageCount: data.metadata.pageCount,
            isbn: data.metadata.isbn,
            publishedDate: data.metadata.year ? `${data.metadata.year}-01-01` : null,
            reading_time_minutes: data.metadata.readingTime,
            hasAudio: data.metadata.hasAudio,
          },
          updated_at: new Date().toISOString(),
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = supabase as any;

        if (version.id) {
          // UPDATE existing version
          const { error: updateError } = await sb
            .from('contents')
            .update(contentData)
            .eq('id', version.id);

          if (updateError) throw updateError;

          // Update author relationship if changed
          if (data.authorId) {
            // Remove existing author relationship
            await sb
              .from('content_minds')
              .delete()
              .eq('content_id', version.id)
              .eq('role', 'author');

            // Add new author relationship
            await sb.from('content_minds').insert({
              content_id: version.id,
              mind_id: data.authorId,
              role: 'author',
            });
          }

          // Update tags (category + collections)
          await updateContentTags(version.id, data.categorySlug, data.collectionSlugs);
        } else {
          // INSERT new version
          const { data: newContent, error: insertError } = await sb
            .from('contents')
            .insert({
              ...contentData,
              created_at: new Date().toISOString(),
            })
            .select('id')
            .single();

          if (insertError) throw insertError;
          if (!newContent) throw new Error('Failed to create content');

          // Create author relationship
          if (data.authorId) {
            await sb.from('content_minds').insert({
              content_id: newContent.id,
              mind_id: data.authorId,
              role: 'author',
            });
          }

          // Create tags (category + collections)
          await updateContentTags(newContent.id, data.categorySlug, data.collectionSlugs);
        }
      }

      // Refetch to update the list
      await fetchBooks();
    },
    [fetchBooks]
  );

  return {
    books,
    stats,
    loading,
    error,
    refetch: fetchBooks,
    deleteBook,
    updateBookStatus,
    saveBook,
    uploadCover,
  };
}

// Helper function to update content tags
async function updateContentTags(
  contentId: string,
  categorySlug: string | null,
  collectionSlugs: string[]
) {
  if (!isSupabaseConfigured()) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as any;

  // Remove existing tags for this content
  await sb.from('content_tags').delete().eq('content_id', contentId);

  // Get tag IDs for category and collections
  const allSlugs = [categorySlug, ...collectionSlugs].filter(Boolean) as string[];
  if (allSlugs.length === 0) return;

  const { data: tags } = await sb.from('tags').select('id, slug').in('slug', allSlugs);

  if (!tags || tags.length === 0) return;

  // Insert new content_tags
  const contentTags = tags.map((tag: { id: string; slug: string }) => ({
    content_id: contentId,
    tag_id: tag.id,
  }));

  await sb.from('content_tags').insert(contentTags);
}

// Hook for admin collections
export interface AdminCollection {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  bookCount: number;
}

interface UseAdminCollectionsResult {
  collections: AdminCollection[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  createCollection: (data: { name: string; slug: string; description?: string }) => Promise<void>;
  updateCollection: (id: string, data: { name?: string; description?: string }) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
}

export function useAdminCollections(): UseAdminCollectionsResult {
  const [collections, setCollections] = useState<AdminCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setCollections([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('tags')
        .select(
          `
          id,
          slug,
          name,
          description,
          content_tags(count)
        `
        )
        .eq('tag_type', 'collection')
        .order('name');

      if (fetchError) throw fetchError;

      type DbCollection = {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        content_tags: Array<{ count: number }>;
      };

      const transformed: AdminCollection[] = ((data || []) as DbCollection[]).map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        description: c.description,
        bookCount: c.content_tags?.[0]?.count || 0,
      }));

      setCollections(transformed);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const createCollection = useCallback(
    async (data: { name: string; slug: string; description?: string }) => {
      if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any).from('tags').insert({
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        tag_type: 'collection',
      });

      if (insertError) throw insertError;
      await fetchCollections();
    },
    [fetchCollections]
  );

  const updateCollection = useCallback(
    async (id: string, data: { name?: string; description?: string }) => {
      if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any).from('tags').update(data).eq('id', id);

      if (updateError) throw updateError;
      await fetchCollections();
    },
    [fetchCollections]
  );

  const deleteCollection = useCallback(
    async (id: string) => {
      if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

      const { error: deleteError } = await supabase.from('tags').delete().eq('id', id);

      if (deleteError) throw deleteError;
      await fetchCollections();
    },
    [fetchCollections]
  );

  return {
    collections,
    loading,
    error,
    refetch: fetchCollections,
    createCollection,
    updateCollection,
    deleteCollection,
  };
}

// Author search result
export interface AuthorResult {
  id: string;
  slug: string;
  name: string;
  avatarUrl: string | null;
}

// Hook for searching authors (minds)
interface UseAuthorSearchResult {
  authors: AuthorResult[];
  loading: boolean;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function useAuthorSearch(): UseAuthorSearchResult {
  const [authors, setAuthors] = useState<AuthorResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setAuthors([]);
      return;
    }

    if (!isSupabaseConfigured()) {
      setAuthors([]);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('minds')
        .select('id, slug, name, avatar_url')
        .ilike('name', `%${query}%`)
        .is('deleted_at', null)
        .order('name')
        .limit(10);

      if (error) throw error;

      setAuthors(
        (data || []).map(
          (m: { id: string; slug: string; name: string; avatar_url: string | null }) => ({
            id: m.id,
            slug: m.slug,
            name: m.name,
            avatarUrl: m.avatar_url,
          })
        )
      );
    } catch (err) {
      console.error('Error searching authors:', err);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setAuthors([]);
  }, []);

  return {
    authors,
    loading,
    search,
    clear,
  };
}

// Hook for fetching all categories (for multi-select)
export interface CategoryOption {
  slug: string;
  name: string;
}

interface UseCategoryOptionsResult {
  categories: CategoryOption[];
  loading: boolean;
}

export function useCategoryOptions(): UseCategoryOptionsResult {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isSupabaseConfigured()) {
        setCategories([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('tags')
          .select('slug, name')
          .eq('tag_type', 'book_category')
          .order('name');

        if (error) throw error;

        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}

export default useAdminBooks;
