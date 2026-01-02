import React, { useState, useMemo, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { FileUpload } from '../../ui/file-upload';
import { Select } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from '../../ui/dropdown-menu';
import { Separator } from '../../ui/separator';
import { Skeleton } from '../../ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { cn } from '../../../lib/utils';
import { useToast } from '../../../hooks/use-toast';
import {
  useAdminBooks,
  useAdminCollections,
  useAuthorSearch,
  useCategoryOptions,
  type AdminBook,
  type SaveBookData,
  type SaveBookVersionData,
  type BookLanguage,
} from '../../../hooks/useAdminBooks';
import { useBookCategories } from '../../../hooks/useBooks';

interface BooksAdminTemplateProps {
  onBack?: () => void;
}

// Format relative date
const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} sem atrás`;

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Form state interface for editor
interface BookFormState {
  originalTitle: string;
  authorId: string | null;
  authorName: string;
  categorySlug: string | null;
  collectionSlugs: string[];
  coverUrl: string | null;
  coverFile: File | null;
  versions: {
    pt: VersionFormState | null;
    en: VersionFormState | null;
    es: VersionFormState | null;
  };
  metadata: {
    isbn: string;
    year: string;
    pageCount: string;
    readingTime: string;
    hasAudio: boolean;
  };
  isPublished: boolean;
  isFeatured: boolean;
}

interface VersionFormState {
  id?: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  status: 'published' | 'draft' | 'archived';
}

// Initialize empty form state
const createEmptyFormState = (): BookFormState => ({
  originalTitle: '',
  authorId: null,
  authorName: '',
  categorySlug: null,
  collectionSlugs: [],
  coverUrl: null,
  coverFile: null,
  versions: { pt: null, en: null, es: null },
  metadata: { isbn: '', year: '', pageCount: '', readingTime: '', hasAudio: false },
  isPublished: false,
  isFeatured: false,
});

// Initialize form from existing book
const createFormStateFromBook = (book: AdminBook): BookFormState => ({
  originalTitle: book.originalTitle,
  authorId: book.author?.id || null,
  authorName: book.author?.name || '',
  categorySlug: book.category?.slug || null,
  collectionSlugs: book.collections.map((c) => c.slug),
  coverUrl: book.coverUrl,
  coverFile: null,
  versions: {
    pt: book.languages.pt
      ? {
          id: book.languages.pt.id,
          title: book.languages.pt.title,
          slug: book.languages.pt.slug,
          content: book.languages.pt.content || '',
          summary: book.languages.pt.summary || '',
          status: book.languages.pt.status,
        }
      : null,
    en: book.languages.en
      ? {
          id: book.languages.en.id,
          title: book.languages.en.title,
          slug: book.languages.en.slug,
          content: book.languages.en.content || '',
          summary: book.languages.en.summary || '',
          status: book.languages.en.status,
        }
      : null,
    es: book.languages.es
      ? {
          id: book.languages.es.id,
          title: book.languages.es.title,
          slug: book.languages.es.slug,
          content: book.languages.es.content || '',
          summary: book.languages.es.summary || '',
          status: book.languages.es.status,
        }
      : null,
  },
  metadata: {
    isbn: book.languages.pt?.isbn || book.languages.en?.isbn || '',
    year: book.languages.pt?.year || book.languages.en?.year || '',
    pageCount: String(book.languages.pt?.pageCount || book.languages.en?.pageCount || ''),
    readingTime: String(book.languages.pt?.readingTime || book.languages.en?.readingTime || ''),
    hasAudio: book.languages.pt?.hasAudio || book.languages.en?.hasAudio || false,
  },
  isPublished: book.status === 'published',
  isFeatured: false,
});

const BooksAdminTemplate: React.FC<BooksAdminTemplateProps> = ({ onBack }) => {
  const { toast } = useToast();

  // Data hooks
  const {
    books,
    stats,
    loading,
    error,
    refetch,
    deleteBook,
    updateBookStatus,
    saveBook,
    uploadCover,
  } = useAdminBooks();
  const { collections, loading: collectionsLoading } = useAdminCollections();
  const { categories } = useBookCategories();
  const { categories: categoryOptions } = useCategoryOptions();
  const {
    authors: authorResults,
    loading: authorSearchLoading,
    search: searchAuthors,
    clear: clearAuthorSearch,
  } = useAuthorSearch();

  // UI state
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeLangTab, setActiveLangTab] = useState<BookLanguage>('pt');
  const [editorPreview, setEditorPreview] = useState(false);
  const [selectedBook, setSelectedBook] = useState<AdminBook | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form state
  const [formState, setFormState] = useState<BookFormState>(createEmptyFormState());
  const [saving, setSaving] = useState(false);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  // Form validation errors
  const [formErrors, setFormErrors] = useState<{
    originalTitle?: string;
    authorName?: string;
    versions?: string;
    versionTitle?: { [key in BookLanguage]?: string };
    versionSlug?: { [key in BookLanguage]?: string };
  }>({});

  // Initialize form when selectedBook changes
  useEffect(() => {
    if (selectedBook) {
      setFormState(createFormStateFromBook(selectedBook));
    } else {
      setFormState(createEmptyFormState());
    }
  }, [selectedBook]);

  // Debounced author search
  const handleAuthorSearch = useCallback(
    (query: string) => {
      setFormState((prev) => ({ ...prev, authorName: query, authorId: null }));
      if (query.length >= 2) {
        searchAuthors(query);
        setShowAuthorDropdown(true);
      } else {
        clearAuthorSearch();
        setShowAuthorDropdown(false);
      }
    },
    [searchAuthors, clearAuthorSearch]
  );

  // Select author from search results
  const handleSelectAuthor = useCallback(
    (author: { id: string; name: string }) => {
      setFormState((prev) => ({ ...prev, authorId: author.id, authorName: author.name }));
      setShowAuthorDropdown(false);
      clearAuthorSearch();
    },
    [clearAuthorSearch]
  );

  // Update form field
  const updateFormField = useCallback(
    <K extends keyof BookFormState>(field: K, value: BookFormState[K]) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Update version field
  const updateVersionField = useCallback(
    (lang: BookLanguage, field: keyof VersionFormState, value: string) => {
      setFormState((prev) => {
        const currentVersion = prev.versions[lang] || {
          title: '',
          slug: '',
          content: '',
          summary: '',
          status: 'draft' as const,
        };
        return {
          ...prev,
          versions: {
            ...prev.versions,
            [lang]: { ...currentVersion, [field]: value },
          },
        };
      });
    },
    []
  );

  // Update metadata field
  const updateMetadataField = useCallback(
    <K extends keyof BookFormState['metadata']>(field: K, value: BookFormState['metadata'][K]) => {
      setFormState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, [field]: value },
      }));
    },
    []
  );

  // Add/remove category
  const toggleCategory = useCallback((slug: string) => {
    setFormState((prev) => ({
      ...prev,
      categorySlug: prev.categorySlug === slug ? null : slug,
    }));
  }, []);

  // Add/remove collection
  const toggleCollection = useCallback((slug: string) => {
    setFormState((prev) => ({
      ...prev,
      collectionSlugs: prev.collectionSlugs.includes(slug)
        ? prev.collectionSlugs.filter((s) => s !== slug)
        : [...prev.collectionSlugs, slug],
    }));
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const errors: typeof formErrors = {};
    let isValid = true;

    // Validate original title
    if (!formState.originalTitle.trim()) {
      errors.originalTitle = 'Título original é obrigatório';
      isValid = false;
    }

    // Check if at least one version exists
    const hasVersion = formState.versions.pt || formState.versions.en || formState.versions.es;
    if (!hasVersion) {
      errors.versions = 'Adicione pelo menos uma versão de idioma';
      isValid = false;
    }

    // Validate each version
    const versionTitleErrors: { [key in BookLanguage]?: string } = {};
    const versionSlugErrors: { [key in BookLanguage]?: string } = {};

    (['pt', 'en', 'es'] as BookLanguage[]).forEach((lang) => {
      const version = formState.versions[lang];
      if (version) {
        if (!version.title.trim()) {
          versionTitleErrors[lang] = 'Título é obrigatório';
          isValid = false;
        }
        if (!version.slug.trim()) {
          versionSlugErrors[lang] = 'Slug é obrigatório';
          isValid = false;
        } else if (!/^[a-z0-9_-]+$/.test(version.slug)) {
          versionSlugErrors[lang] =
            'Slug deve conter apenas letras minúsculas, números, hífens e underscores';
          isValid = false;
        }
      }
    });

    if (Object.keys(versionTitleErrors).length > 0) {
      errors.versionTitle = versionTitleErrors;
    }
    if (Object.keys(versionSlugErrors).length > 0) {
      errors.versionSlug = versionSlugErrors;
    }

    setFormErrors(errors);
    return isValid;
  }, [formState]);

  // Clear error when field changes
  const clearFieldError = useCallback((field: keyof typeof formErrors) => {
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = book.originalTitle.toLowerCase().includes(query);
        const matchesAuthor = book.author?.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && book.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && book.category?.slug !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [books, searchQuery, statusFilter, categoryFilter]);

  const handleCreate = () => {
    setSelectedBook(null);
    setView('editor');
  };

  const handleEdit = (book: AdminBook) => {
    setSelectedBook(book);
    // Set active lang tab to first available language
    if (book.languages.pt) setActiveLangTab('pt');
    else if (book.languages.en) setActiveLangTab('en');
    else if (book.languages.es) setActiveLangTab('es');
    setView('editor');
  };

  const handleSave = async () => {
    // Validate form
    if (!validateForm()) {
      toast({ title: 'Corrija os erros no formulário', variant: 'destructive' });
      return;
    }

    setSaving(true);

    try {
      // Upload cover if a new file was selected
      let coverUrl = formState.coverUrl;
      if (formState.coverFile) {
        const slug =
          formState.versions.pt?.slug ||
          formState.versions.en?.slug ||
          formState.originalTitle.toLowerCase().replace(/\s+/g, '_');
        coverUrl = await uploadCover(formState.coverFile, slug);
      }

      // Build save data
      const saveData: SaveBookData = {
        originalTitle: formState.originalTitle,
        authorId: formState.authorId,
        categorySlug: formState.categorySlug,
        collectionSlugs: formState.collectionSlugs,
        coverUrl,
        versions: {
          pt: formState.versions.pt
            ? {
                id: formState.versions.pt.id,
                title: formState.versions.pt.title,
                slug: formState.versions.pt.slug,
                content: formState.versions.pt.content,
                summary: formState.versions.pt.summary,
                status: formState.isPublished ? 'published' : 'draft',
              }
            : undefined,
          en: formState.versions.en
            ? {
                id: formState.versions.en.id,
                title: formState.versions.en.title,
                slug: formState.versions.en.slug,
                content: formState.versions.en.content,
                summary: formState.versions.en.summary,
                status: formState.isPublished ? 'published' : 'draft',
              }
            : undefined,
          es: formState.versions.es
            ? {
                id: formState.versions.es.id,
                title: formState.versions.es.title,
                slug: formState.versions.es.slug,
                content: formState.versions.es.content,
                summary: formState.versions.es.summary,
                status: formState.isPublished ? 'published' : 'draft',
              }
            : undefined,
        },
        metadata: {
          isbn: formState.metadata.isbn || null,
          year: formState.metadata.year || null,
          pageCount: formState.metadata.pageCount
            ? parseInt(formState.metadata.pageCount, 10)
            : null,
          readingTime: formState.metadata.readingTime
            ? parseInt(formState.metadata.readingTime, 10)
            : null,
          hasAudio: formState.metadata.hasAudio,
        },
      };

      await saveBook(saveData);

      toast({
        title: 'Acervo Atualizado',
        description: 'As alterações foram salvas com sucesso.',
        variant: 'success',
      });
      setView('list');
      setSelectedBook(null);
    } catch (err) {
      console.error('Error saving book:', err);
      toast({
        title: 'Erro ao salvar',
        description: (err as Error).message || 'Não foi possível salvar o livro.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteBook(deleteTarget.id);
      toast({
        title: 'Livro Excluído',
        description: 'O livro foi removido permanentemente.',
        variant: 'success',
      });
      setShowDeleteDialog(false);
      setDeleteTarget(null);
      // If we deleted the currently edited book, go back to list
      if (view === 'editor') {
        setView('list');
        setSelectedBook(null);
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o livro.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (bookId: string, bookTitle: string) => {
    setDeleteTarget({ id: bookId, title: bookTitle });
    setShowDeleteDialog(true);
  };

  // Handle cover file selection
  const handleCoverUpload = useCallback((file: File | null) => {
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormState((prev) => ({
        ...prev,
        coverFile: file,
        coverUrl: previewUrl,
      }));
    }
  }, []);

  const handleBulkPublish = async () => {
    // Get all book version IDs from selected books
    for (const book of filteredBooks) {
      const firstVersion = book.languages.pt || book.languages.en || book.languages.es;
      if (firstVersion && selectedIds.includes(firstVersion.id)) {
        await updateBookStatus(firstVersion.id, 'published');
      }
    }
    setSelectedIds([]);
    refetch();
    toast({ title: 'Livros Publicados', variant: 'success' });
  };

  const handleBulkArchive = async () => {
    for (const book of filteredBooks) {
      const firstVersion = book.languages.pt || book.languages.en || book.languages.es;
      if (firstVersion && selectedIds.includes(firstVersion.id)) {
        await updateBookStatus(firstVersion.id, 'archived');
      }
    }
    setSelectedIds([]);
    refetch();
    toast({ title: 'Livros Arquivados', variant: 'success' });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBooks.length) {
      setSelectedIds([]);
    } else {
      // Select first version ID of each book
      const ids = filteredBooks
        .map((b) => b.languages.pt?.id || b.languages.en?.id || b.languages.es?.id)
        .filter(Boolean) as string[];
      setSelectedIds(ids);
    }
  };

  const LanguageIndicator = ({ book }: { book: AdminBook }) => (
    <div className="flex items-center gap-1">
      <Badge
        variant={book.languages.pt ? 'success' : 'outline'}
        size="sm"
        className={cn('px-1.5 text-[9px]', !book.languages.pt && 'opacity-30')}
      >
        PT
      </Badge>
      <Badge
        variant={book.languages.en ? 'info' : 'outline'}
        size="sm"
        className={cn('px-1.5 text-[9px]', !book.languages.en && 'opacity-30')}
      >
        EN
      </Badge>
      <Badge
        variant={book.languages.es ? 'warning' : 'outline'}
        size="sm"
        className={cn('px-1.5 text-[9px]', !book.languages.es && 'opacity-30')}
      >
        ES
      </Badge>
    </div>
  );

  // Loading skeleton
  if (loading && view === 'list') {
    return (
      <div className="min-h-screen bg-background p-6 font-sans text-foreground">
        <div className="container mx-auto max-w-7xl space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background font-sans text-foreground">
        <Card className="max-w-md">
          <CardContent className="space-y-4 p-6 text-center">
            <Icon name="exclamation-triangle" size="size-12" className="mx-auto text-destructive" />
            <h2 className="text-lg font-bold">Erro ao carregar livros</h2>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <Button onClick={() => refetch()}>Tentar Novamente</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {view === 'editor' ? (
              <Button variant="ghost" size="icon" onClick={() => setView('list')}>
                <Icon name="arrow-left" />
              </Button>
            ) : (
              onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <Icon name="arrow-left" />
                </Button>
              )
            )}
            <h1 className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <Icon name="settings-sliders" className="text-brand-gold" />
              {view === 'list'
                ? 'Gestão de Acervo'
                : selectedBook
                  ? 'Editor de Livro'
                  : 'Novo Livro'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {view === 'list' ? (
              <div className="flex gap-2">
                <Button variant="outline" className="hidden gap-2 border-dashed sm:flex">
                  <Icon name="layers" size="size-3" /> Nova Coleção
                </Button>
                <Button
                  className="bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                  onClick={handleCreate}
                >
                  <Icon name="plus" size="size-3" /> Novo Livro
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setView('list')} disabled={saving}>
                  Cancelar
                </Button>
                <Button
                  className="gap-2 bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Icon name="spinner" size="size-3" className="animate-spin" /> Salvando...
                    </>
                  ) : (
                    <>
                      <Icon name="check" size="size-3" /> Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl flex-1 px-6 py-8 pb-32">
        {view === 'list' && (
          <div className="animate-fade-in space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card/50">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Total de Livros
                    </p>
                    <h3 className="font-mono text-2xl font-bold">{stats.total}</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
                    <Icon name="book" size="size-5" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Publicados
                    </p>
                    <h3 className="font-mono text-2xl font-bold text-brand-green">
                      {stats.published}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <Icon name="check-circle" size="size-5" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Rascunhos
                    </p>
                    <h3 className="font-mono text-2xl font-bold text-brand-orange">
                      {stats.draft}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
                    <Icon name="pencil" size="size-5" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Coleções
                    </p>
                    <h3 className="font-mono text-2xl font-bold text-brand-blue">
                      {stats.collectionsCount}
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <Icon name="layers" size="size-5" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-3 shadow-sm md:flex-row">
              <div className="relative w-full md:w-96">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size="size-4"
                />
                <Input
                  placeholder="Buscar por título ou autor..."
                  className="h-10 border-transparent bg-muted/20 pl-10 focus:border-brand-gold/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex w-full items-center gap-3 md:w-auto">
                <Select
                  placeholder="Status"
                  value={statusFilter}
                  onValueChange={(val) => setStatusFilter(val)}
                  options={[
                    { label: 'Todos', value: 'all' },
                    { label: 'Publicados', value: 'published' },
                    { label: 'Rascunhos', value: 'draft' },
                    { label: 'Arquivados', value: 'archived' },
                  ]}
                  className="h-10 w-full md:w-36"
                />

                <Select
                  placeholder="Categoria"
                  value={categoryFilter}
                  onValueChange={(val) => setCategoryFilter(val)}
                  options={[
                    { label: 'Todas', value: 'all' },
                    ...categories.map((c) => ({ label: c.name, value: c.slug })),
                  ]}
                  className="h-10 w-full md:w-44"
                />

                <Separator orientation="vertical" className="hidden h-8 md:block" />

                <div className="flex rounded-lg border border-border bg-muted/50 p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-8 w-8 transition-all',
                      layoutMode === 'grid'
                        ? 'bg-background text-brand-gold shadow-sm'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setLayoutMode('grid')}
                  >
                    <Icon name="grid" size="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-8 w-8 transition-all',
                      layoutMode === 'list'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setLayoutMode('list')}
                  >
                    <Icon name="list" size="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <Icon
                    name="book"
                    size="size-12"
                    className="mx-auto mb-4 text-muted-foreground/50"
                  />
                  <h3 className="mb-2 text-lg font-bold">Nenhum livro encontrado</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                      ? 'Tente ajustar os filtros de busca.'
                      : 'Comece adicionando seu primeiro livro ao acervo.'}
                  </p>
                  <Button onClick={handleCreate}>
                    <Icon name="plus" size="size-3" /> Adicionar Livro
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Table View */}
            {layoutMode === 'list' && filteredBooks.length > 0 && (
              <div className="relative animate-fade-in overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={
                            selectedIds.length === filteredBooks.length && filteredBooks.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">Capa</TableHead>
                      <TableHead>Título & Autor</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Idiomas</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Atualizado</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.map((book) => {
                      const firstVersion =
                        book.languages.pt || book.languages.en || book.languages.es;
                      const bookId = firstVersion?.id || '';

                      return (
                        <TableRow
                          key={bookId}
                          className={cn(
                            'group transition-colors hover:bg-muted/20',
                            selectedIds.includes(bookId) && 'bg-brand-gold/5'
                          )}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(bookId)}
                              onCheckedChange={() => toggleSelect(bookId)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="h-14 w-10 overflow-hidden rounded border border-border bg-muted shadow-sm transition-transform group-hover:scale-105">
                              {book.coverUrl ? (
                                <img
                                  src={book.coverUrl}
                                  className="h-full w-full object-cover"
                                  alt={book.originalTitle}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted">
                                  <Icon
                                    name="book"
                                    size="size-4"
                                    className="text-muted-foreground"
                                  />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span
                                className="cursor-pointer text-sm font-bold text-foreground transition-colors hover:text-brand-gold"
                                onClick={() => handleEdit(book)}
                              >
                                {book.originalTitle}
                              </span>
                              <span className="font-serif text-xs text-muted-foreground">
                                {book.author?.name || 'Autor Desconhecido'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {book.category ? (
                              <Badge
                                variant="outline"
                                className="text-[10px] font-normal uppercase tracking-wider"
                              >
                                {book.category.name}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <LanguageIndicator book={book} />
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                book.status === 'published'
                                  ? 'success'
                                  : book.status === 'draft'
                                    ? 'warning'
                                    : 'secondary'
                              }
                              className="text-[9px] font-bold uppercase"
                            >
                              {book.status === 'published'
                                ? 'No Ar'
                                : book.status === 'draft'
                                  ? 'Rascunho'
                                  : 'Arquivado'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatRelativeDate(book.updatedAt)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu
                              align="right"
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                  <Icon name="menu-dots-vertical" />
                                </Button>
                              }
                            >
                              <DropdownMenuItem onClick={() => handleEdit(book)}>
                                <Icon name="pencil" className="mr-2 h-4 w-4" /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Icon name="eye" className="mr-2 h-4 w-4" /> Ver no Site
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                destructive
                                onClick={() => handleDelete(bookId, book.originalTitle)}
                              >
                                <Icon name="trash" className="mr-2 h-4 w-4" /> Excluir
                              </DropdownMenuItem>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Grid View */}
            {layoutMode === 'grid' && filteredBooks.length > 0 && (
              <div className="grid animate-fade-in grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredBooks.map((book) => {
                  const firstVersion = book.languages.pt || book.languages.en || book.languages.es;
                  const bookId = firstVersion?.id || '';

                  return (
                    <Card
                      key={bookId}
                      className={cn(
                        'group flex cursor-pointer flex-col overflow-hidden border-border transition-all hover:border-brand-gold/50 hover:shadow-lg',
                        selectedIds.includes(bookId) && 'ring-2 ring-brand-gold'
                      )}
                      onClick={() => handleEdit(book)}
                    >
                      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                        {book.coverUrl ? (
                          <img
                            src={book.coverUrl}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={book.originalTitle}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Icon name="book" size="size-8" className="text-muted-foreground/50" />
                          </div>
                        )}
                        <div className="absolute left-2 top-2" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedIds.includes(bookId)}
                            onCheckedChange={() => toggleSelect(bookId)}
                            className="border-white/50 bg-black/50"
                          />
                        </div>
                        <div className="absolute right-2 top-2">
                          <Badge
                            variant={book.status === 'published' ? 'success' : 'warning'}
                            className="text-[9px] uppercase opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100"
                          >
                            {book.status}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button size="sm" className="h-8 bg-brand-gold font-bold text-black">
                            Editar
                          </Button>
                        </div>
                      </div>
                      <CardContent className="flex flex-1 flex-col space-y-1 p-4">
                        <div className="flex items-start justify-between">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                            {book.category?.name || '—'}
                          </p>
                          <LanguageIndicator book={book} />
                        </div>
                        <h4 className="mt-1 line-clamp-2 text-sm font-bold leading-tight">
                          {book.originalTitle}
                        </h4>
                        <p className="mt-auto pt-2 font-serif text-xs text-muted-foreground">
                          {book.author?.name || 'Autor Desconhecido'}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Results count */}
            {filteredBooks.length > 0 && (
              <p className="text-center text-xs text-muted-foreground">
                Mostrando {filteredBooks.length} de {stats.total} livros
              </p>
            )}
          </div>
        )}

        {/* EDITOR VIEW */}
        {view === 'editor' && (
          <div className="grid animate-fade-in grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              {/* General Info Card */}
              <Card className="border-border">
                <CardHeader className="border-b border-border/50 pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="info" size="size-4" className="text-primary" /> Informações Gerais
                  </CardTitle>
                  <CardDescription>
                    Dados compartilhados entre todas as versões de idioma.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        Título Original <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="The Psychology of Money"
                        value={formState.originalTitle}
                        onChange={(e) => {
                          updateFormField('originalTitle', e.target.value);
                          if (formErrors.originalTitle) clearFieldError('originalTitle');
                        }}
                        className={cn(
                          formErrors.originalTitle &&
                            'border-destructive focus-visible:ring-destructive'
                        )}
                      />
                      {formErrors.originalTitle ? (
                        <p className="text-[10px] font-medium text-destructive">
                          {formErrors.originalTitle}
                        </p>
                      ) : (
                        <p className="text-[10px] text-muted-foreground">
                          Utilizado para vincular traduções automaticamente.
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        Autor <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Icon
                          name="search"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size="size-4"
                        />
                        <Input
                          className="pl-10"
                          placeholder="Buscar ou adicionar autor..."
                          value={formState.authorName}
                          onChange={(e) => handleAuthorSearch(e.target.value)}
                          onFocus={() =>
                            formState.authorName.length >= 2 && setShowAuthorDropdown(true)
                          }
                          onBlur={() => setTimeout(() => setShowAuthorDropdown(false), 200)}
                        />
                        {/* Author search dropdown */}
                        {showAuthorDropdown && authorResults.length > 0 && (
                          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-auto rounded-md border border-border bg-popover shadow-lg">
                            {authorResults.map((author) => (
                              <button
                                key={author.id}
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted/50"
                                onMouseDown={() => handleSelectAuthor(author)}
                              >
                                {author.avatarUrl ? (
                                  <img
                                    src={author.avatarUrl}
                                    className="h-6 w-6 rounded-full"
                                    alt=""
                                  />
                                ) : (
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                                    <Icon name="user" size="size-3" />
                                  </div>
                                )}
                                {author.name}
                              </button>
                            ))}
                          </div>
                        )}
                        {authorSearchLoading && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Icon
                              name="spinner"
                              size="size-4"
                              className="animate-spin text-muted-foreground"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <div className="flex min-h-10 flex-wrap gap-2 rounded-md border border-input bg-muted/10 p-2">
                        {formState.categorySlug && (
                          <Badge
                            variant="secondary"
                            className="cursor-pointer gap-1"
                            onClick={() => toggleCategory(formState.categorySlug!)}
                          >
                            {categoryOptions.find((c) => c.slug === formState.categorySlug)?.name ||
                              formState.categorySlug}
                            <Icon name="cross" size="size-2" />
                          </Badge>
                        )}
                        <DropdownMenu
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-[10px] font-bold uppercase text-primary hover:bg-primary/5"
                            >
                              + Adicionar
                            </Button>
                          }
                        >
                          {categoryOptions.map((cat) => (
                            <DropdownMenuItem
                              key={cat.slug}
                              onClick={() => toggleCategory(cat.slug)}
                              className={cn(formState.categorySlug === cat.slug && 'bg-primary/10')}
                            >
                              {formState.categorySlug === cat.slug && (
                                <Icon name="check" size="size-3" className="mr-2" />
                              )}
                              {cat.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Coleções</Label>
                      <div className="flex min-h-10 flex-wrap gap-2 rounded-md border border-input bg-muted/10 p-2">
                        {formState.collectionSlugs.map((slug) => {
                          const col = collections.find((c) => c.slug === slug);
                          return (
                            <Badge
                              key={slug}
                              variant="outline"
                              className="cursor-pointer gap-1 border-brand-gold/30 bg-brand-gold/5 text-brand-gold"
                              onClick={() => toggleCollection(slug)}
                            >
                              {col?.name || slug} <Icon name="cross" size="size-2" />
                            </Badge>
                          );
                        })}
                        <DropdownMenu
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-[10px] font-bold uppercase text-primary hover:bg-primary/5"
                            >
                              + Adicionar
                            </Button>
                          }
                        >
                          {collections.map((col) => (
                            <DropdownMenuItem
                              key={col.slug}
                              onClick={() => toggleCollection(col.slug)}
                              className={cn(
                                formState.collectionSlugs.includes(col.slug) && 'bg-primary/10'
                              )}
                            >
                              {formState.collectionSlugs.includes(col.slug) && (
                                <Icon name="check" size="size-3" className="mr-2" />
                              )}
                              {col.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Language Tabs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Conteúdo Traduzido
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[10px] font-bold uppercase text-primary"
                  >
                    + Adicionar Idioma
                  </Button>
                </div>

                <Tabs
                  value={activeLangTab}
                  onValueChange={(v) => setActiveLangTab(v as BookLanguage)}
                  className="w-full"
                >
                  <TabsList className="mb-6 h-12 w-full justify-start gap-2 rounded-xl bg-muted/50 p-1">
                    <TabsTrigger
                      value="pt"
                      className="flex items-center gap-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      disabled={!selectedBook?.languages.pt && !!selectedBook}
                    >
                      <Badge variant="success" size="sm">
                        PT
                      </Badge>{' '}
                      Português{' '}
                      {selectedBook?.languages.pt && (
                        <Icon name="check-circle" size="size-3" className="text-brand-green" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="en"
                      className="flex items-center gap-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      disabled={!selectedBook?.languages.en && !!selectedBook}
                    >
                      <Badge variant="info" size="sm">
                        EN
                      </Badge>{' '}
                      English{' '}
                      {selectedBook?.languages.en && (
                        <Icon name="check-circle" size="size-3" className="text-brand-green" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="es"
                      className={cn(
                        'flex items-center gap-2 px-6',
                        !selectedBook?.languages.es && 'text-muted-foreground/50 opacity-60'
                      )}
                      disabled={!selectedBook?.languages.es && !!selectedBook}
                    >
                      <Badge variant="outline" size="sm">
                        ES
                      </Badge>{' '}
                      Español{' '}
                      {!selectedBook?.languages.es && (
                        <div className="h-2 w-2 rounded-full border border-border bg-muted"></div>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  {(['pt', 'en', 'es'] as const).map((lang) => {
                    const version = formState.versions[lang];
                    return (
                      <TabsContent key={lang} value={lang} className="animate-fade-in space-y-6">
                        <Card>
                          <CardContent className="space-y-6 p-6">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <Label className="flex items-center gap-1">
                                  Título da Versão ({lang.toUpperCase()}){' '}
                                  <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                  value={version?.title || ''}
                                  onChange={(e) => {
                                    updateVersionField(lang, 'title', e.target.value);
                                    if (formErrors.versionTitle?.[lang]) {
                                      setFormErrors((prev) => ({
                                        ...prev,
                                        versionTitle: { ...prev.versionTitle, [lang]: undefined },
                                      }));
                                    }
                                  }}
                                  placeholder={`Título em ${lang === 'pt' ? 'Português' : lang === 'en' ? 'Inglês' : 'Espanhol'}`}
                                  className={cn(
                                    formErrors.versionTitle?.[lang] &&
                                      'border-destructive focus-visible:ring-destructive'
                                  )}
                                />
                                {formErrors.versionTitle?.[lang] && (
                                  <p className="text-[10px] font-medium text-destructive">
                                    {formErrors.versionTitle[lang]}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label className="flex items-center gap-1">
                                  Slug da URL <span className="text-destructive">*</span>
                                </Label>
                                <div className="flex">
                                  <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 font-mono text-xs text-muted-foreground">
                                    /resumo/{lang}/
                                  </span>
                                  <Input
                                    className={cn(
                                      'rounded-l-none font-mono text-xs',
                                      formErrors.versionSlug?.[lang] &&
                                        'border-destructive focus-visible:ring-destructive'
                                    )}
                                    value={version?.slug || ''}
                                    onChange={(e) => {
                                      updateVersionField(lang, 'slug', e.target.value);
                                      if (formErrors.versionSlug?.[lang]) {
                                        setFormErrors((prev) => ({
                                          ...prev,
                                          versionSlug: { ...prev.versionSlug, [lang]: undefined },
                                        }));
                                      }
                                    }}
                                  />
                                </div>
                                {formErrors.versionSlug?.[lang] && (
                                  <p className="text-[10px] font-medium text-destructive">
                                    {formErrors.versionSlug[lang]}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label>Resumo Editorial</Label>
                                <AutosizeTextarea
                                  placeholder="Breve descrição para o catálogo..."
                                  className="min-h-[80px]"
                                  value={version?.summary || ''}
                                  onChange={(e) =>
                                    updateVersionField(lang, 'summary', e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label className="text-base font-bold">
                                  Conteúdo do Resumo (Markdown)
                                </Label>
                                <div className="flex rounded-lg bg-muted/50 p-0.5">
                                  <Button
                                    size="sm"
                                    variant={!editorPreview ? 'secondary' : 'ghost'}
                                    className="h-7 text-[10px] font-bold uppercase"
                                    onClick={() => setEditorPreview(false)}
                                  >
                                    Editor
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={editorPreview ? 'secondary' : 'ghost'}
                                    className="h-7 text-[10px] font-bold uppercase"
                                    onClick={() => setEditorPreview(true)}
                                  >
                                    Preview
                                  </Button>
                                </div>
                              </div>
                              {!editorPreview ? (
                                <Textarea
                                  className="min-h-[400px] border-border bg-muted/5 font-mono text-sm leading-relaxed"
                                  placeholder="# Introdução..."
                                  value={version?.content || ''}
                                  onChange={(e) =>
                                    updateVersionField(lang, 'content', e.target.value)
                                  }
                                />
                              ) : (
                                <div className="prose dark:prose-invert min-h-[400px] max-w-none overflow-auto rounded-md border border-border p-6">
                                  {version?.content ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {version.content}
                                    </ReactMarkdown>
                                  ) : (
                                    <p className="text-center italic text-muted-foreground">
                                      Nenhum conteúdo para visualizar
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-4">
              {/* Cover Upload */}
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="picture" size="size-4" /> Capa do Livro (2:3)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="group relative mx-auto flex aspect-[2/3] w-full max-w-[200px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted">
                      {formState.coverUrl ? (
                        <>
                          <img
                            src={formState.coverUrl}
                            className="h-full w-full object-cover transition-all group-hover:blur-sm"
                            alt="Capa"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button size="sm" variant="secondary" className="font-bold">
                              Alterar
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center">
                          <Icon
                            name="cloud-upload"
                            size="size-8"
                            className="mx-auto mb-2 text-muted-foreground"
                          />
                          <p className="text-[10px] font-bold text-muted-foreground">
                            400x600px recomendado
                          </p>
                        </div>
                      )}
                    </div>
                    <FileUpload
                      className="h-10 min-h-0"
                      accept="image/*"
                      onFileSelect={handleCoverUpload}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Technical Metadata */}
              <Card className="border-border">
                <CardHeader className="border-b border-border/50 pb-3">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Metadados Técnicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                      ISBN-13
                    </Label>
                    <Input
                      value={formState.metadata.isbn}
                      onChange={(e) => updateMetadataField('isbn', e.target.value)}
                      className="h-8 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                      Ano Lançamento
                    </Label>
                    <Input
                      value={formState.metadata.year}
                      onChange={(e) => updateMetadataField('year', e.target.value)}
                      className="h-8 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                      Páginas
                    </Label>
                    <Input
                      type="number"
                      value={formState.metadata.pageCount}
                      onChange={(e) => updateMetadataField('pageCount', e.target.value)}
                      className="h-8 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">
                      Tempo Leitura
                    </Label>
                    <div className="relative">
                      <Input
                        value={formState.metadata.readingTime}
                        onChange={(e) => updateMetadataField('readingTime', e.target.value)}
                        className="h-8 pr-8 font-mono text-xs"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground">
                        min
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card className="border-border">
                <CardHeader className="border-b border-border/50 pb-3">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Configurações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Status: No Ar</Label>
                      <p className="font-serif text-[10px] italic text-muted-foreground">
                        Visível para todos os assinantes.
                      </p>
                    </div>
                    <Switch
                      checked={formState.isPublished}
                      onCheckedChange={(checked) => updateFormField('isPublished', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Destaque Editorial</Label>
                      <p className="font-serif text-[10px] italic text-muted-foreground">
                        Exibir na seção de lançamentos.
                      </p>
                    </div>
                    <Switch
                      checked={formState.isFeatured}
                      onCheckedChange={(checked) => updateFormField('isFeatured', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Audiobook Ativo</Label>
                      <p className="font-serif text-[10px] italic text-muted-foreground">
                        Habilitar player de áudio IA.
                      </p>
                    </div>
                    <Switch
                      checked={formState.metadata.hasAudio}
                      onCheckedChange={(checked) => updateMetadataField('hasAudio', checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 border-t border-border bg-muted/10 p-4">
                  {selectedBook && (
                    <div className="flex w-full justify-between font-mono text-xs text-muted-foreground">
                      <span>Última Edição:</span>
                      <span>{formatRelativeDate(selectedBook.updatedAt)}</span>
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    className="h-9 w-full gap-2 text-xs font-bold"
                    onClick={() => {
                      const firstVersion =
                        selectedBook?.languages.pt ||
                        selectedBook?.languages.en ||
                        selectedBook?.languages.es;
                      if (firstVersion) {
                        handleDelete(firstVersion.id, selectedBook?.originalTitle || 'Este livro');
                      }
                    }}
                    disabled={!selectedBook}
                  >
                    <Icon name="trash" size="size-3" /> Excluir permanentemente
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Bulk Actions Bar */}
      {view === 'list' && selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-slide-in-right">
          <div className="flex items-center gap-6 rounded-full bg-foreground px-6 py-3 text-background shadow-2xl ring-4 ring-primary/20">
            <div className="flex items-center gap-3 border-r border-background/20 pr-6">
              <Badge className="flex h-6 w-6 items-center justify-center rounded-full bg-primary p-0 font-bold text-black">
                {selectedIds.length}
              </Badge>
              <span className="text-sm font-bold uppercase tracking-widest">Selecionados</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-9 gap-2 font-bold text-background hover:bg-background/10"
                onClick={handleBulkPublish}
              >
                <Icon name="check-circle" size="size-4" /> Publicar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 gap-2 font-bold text-background hover:bg-background/10"
                onClick={handleBulkArchive}
              >
                <Icon name="archive" size="size-4" /> Arquivar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 gap-2 font-bold text-destructive hover:bg-destructive/10"
              >
                <Icon name="trash" size="size-4" /> Excluir
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-background/50 hover:text-background"
              onClick={() => setSelectedIds([])}
            >
              <Icon name="cross" size="size-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="exclamation-triangle" className="text-destructive" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir <strong>"{deleteTarget?.title}"</strong>?
              <br />
              <span className="text-destructive">Esta ação não pode ser desfeita.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              <Icon name="trash" size="size-3" className="mr-2" />
              Excluir Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BooksAdminTemplate;
