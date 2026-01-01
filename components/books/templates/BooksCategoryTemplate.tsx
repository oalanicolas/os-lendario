import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon, type IconName } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBooksByCategory } from '../../../hooks/useBooksByCategory';
import { useBooks } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import BookCard from '../ui/BookCard';
import SectionHeader from '../ui/SectionHeader';

interface BooksCategoryProps {
  setSection: (s: Section) => void;
}

// Map category slugs to icons and colors
const CATEGORY_STYLES: Record<string, { icon: IconName; color: string }> = {
  negocios: { icon: 'chart-line', color: 'bg-emerald-500' },
  psicologia: { icon: 'brain', color: 'bg-purple-500' },
  filosofia: { icon: 'bulb', color: 'bg-amber-500' },
  tecnologia: { icon: 'code', color: 'bg-blue-500' },
  biografias: { icon: 'user', color: 'bg-rose-500' },
  autoajuda: { icon: 'heart', color: 'bg-pink-500' },
  default: { icon: 'book', color: 'bg-brand-gold' },
};

const getCategoryStyle = (slug: string) => CATEGORY_STYLES[slug] || CATEGORY_STYLES.default;

type SortOption = 'recent' | 'title' | 'rating';

const SORT_OPTIONS: Record<SortOption, string> = {
  recent: 'Mais Recentes',
  title: 'Título (A-Z)',
  rating: 'Melhor Avaliados',
};

const BooksCategoryTemplate: React.FC<BooksCategoryProps> = ({ setSection: _setSection }) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const { books, category, loading, error } = useBooksByCategory(categorySlug || '');
  const { books: allBooks } = useBooks();

  usePageTitle(category?.name || 'Categoria');

  // Sort books
  const sortedBooks = useMemo(() => {
    const sorted = [...books];
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'recent':
      default:
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [books, sortBy]);

  // Get related books from other categories
  const categoryBookIds = new Set(books.map((b) => b.id));
  const relatedBooks = allBooks
    .filter((b) => !categoryBookIds.has(b.id))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  // Calculate total reading time
  const totalReadingTime = books.reduce((acc, b) => acc + (b.readingTime || 0), 0);

  // Get category style
  const style = getCategoryStyle(categorySlug || '');

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Categoria não encontrada</h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => navigate('/books')}>Voltar à Biblioteca</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in bg-background pb-20 font-sans text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/books')}
          >
            <Icon name="arrow-left" size="size-4" /> Voltar à Biblioteca
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="share" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12 flex flex-col items-start gap-8 md:flex-row md:items-center">
          {/* Category Icon */}
          {loading ? (
            <Skeleton className="h-32 w-28 rounded-xl" />
          ) : (
            <div className="relative">
              {/* Stack effect */}
              <div className="absolute right-0 top-0 h-32 w-28 translate-x-3 rotate-6 rounded-xl border border-border bg-card shadow-sm"></div>
              <div className="absolute right-0 top-0 h-32 w-28 translate-x-1.5 -rotate-3 rounded-xl border border-border bg-card shadow-sm"></div>
              {/* Main icon */}
              <div
                className={cn(
                  'relative flex h-32 w-28 items-center justify-center rounded-xl text-black shadow-xl',
                  style.color
                )}
              >
                <Icon name={style.icon} size="size-12" />
              </div>
            </div>
          )}

          {/* Category Info */}
          <div className="flex-1 space-y-4">
            {loading ? (
              <>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : (
              <>
                <Badge
                  variant="outline"
                  className="border-brand-gold/30 bg-brand-gold/10 text-[10px] uppercase tracking-wider text-brand-gold"
                >
                  Categoria
                </Badge>
                <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  {category?.name || categorySlug}
                </h1>
                {category?.description && (
                  <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="book" className="text-brand-gold" size="size-4" />
                    <span className="font-medium">{books.length} livros</span>
                  </div>
                  {totalReadingTime > 0 && (
                    <div className="flex items-center gap-2">
                      <Icon name="clock" className="text-muted-foreground" size="size-4" />
                      <span className="font-medium">~{totalReadingTime} min de leitura</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Bar */}
        {!loading && books.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-4">
              <Button
                className="bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                onClick={() => books[0] && navigate(`/books/${books[0].slug}`)}
              >
                <Icon name="book-open-cover" className="mr-2" size="size-4" /> Começar a Ler
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Ordenar por:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-medium">
                    {SORT_OPTIONS[sortBy]}{' '}
                    <Icon name="chevron-down" className="ml-1" size="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {(Object.keys(SORT_OPTIONS) as SortOption[]).map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={sortBy === option ? 'bg-muted' : ''}
                    >
                      {SORT_OPTIONS[option]}
                      {sortBy === option && <Icon name="check" className="ml-auto" size="size-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {/* Books Grid */}
        <div className="space-y-8">
          <SectionHeader title={`Livros de ${category?.name || 'esta categoria'}`} />

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : sortedBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sortedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant="grid"
                  onClick={() => navigate(`/books/${book.slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Icon name="book" className="mx-auto mb-4 text-muted-foreground" size="size-12" />
              <h3 className="text-lg font-bold">Nenhum livro encontrado</h3>
              <p className="text-muted-foreground">
                Esta categoria ainda não tem livros cadastrados na biblioteca.
              </p>
            </div>
          )}
        </div>

        {/* Related Books Section */}
        {!loading && relatedBooks.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <SectionHeader title="Você também pode gostar" onViewAll={() => navigate('/books')} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {relatedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant="grid"
                  onClick={() => navigate(`/books/${book.slug}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BooksCategoryTemplate;
