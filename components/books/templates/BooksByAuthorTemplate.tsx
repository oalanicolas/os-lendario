import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Section } from '../../../types';
import { useBooksByAuthor } from '../../../hooks/useBooksByAuthor';
import { useAuthor } from '../../../hooks/useAuthor';
import { useBooks } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import BookCard from '../ui/BookCard';
import SectionHeader from '../ui/SectionHeader';

interface BooksByAuthorProps {
  setSection: (s: Section) => void;
}

type SortOption = 'recent' | 'title' | 'rating';

const SORT_OPTIONS: Record<SortOption, string> = {
  recent: 'Mais Recentes',
  title: 'Título (A-Z)',
  rating: 'Melhor Avaliados',
};

const BooksByAuthorTemplate: React.FC<BooksByAuthorProps> = ({ setSection: _setSection }) => {
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const { books, authorName, loading, error } = useBooksByAuthor(authorSlug || '');
  const { author, loading: authorLoading } = useAuthor(authorSlug || null);
  const { books: allBooks } = useBooks();

  usePageTitle(authorName ? `Livros de ${authorName}` : 'Livros do Autor');

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

  // Calculate total reading time
  const totalReadingTime = books.reduce((acc, b) => acc + (b.readingTime || 0), 0);

  // Get related books (same category as author's books, excluding author's books)
  const authorBookIds = new Set(books.map((b) => b.id));
  const authorCategories = new Set(books.map((b) => b.categorySlug).filter(Boolean));

  const relatedBooks = allBooks
    .filter((b) => !authorBookIds.has(b.id)) // Exclude author's books
    .filter((b) => authorCategories.has(b.categorySlug)) // Same category
    .slice(0, 4);

  // If not enough related by category, get popular books
  const popularBooks =
    relatedBooks.length < 4
      ? allBooks
          .filter((b) => !authorBookIds.has(b.id))
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4)
      : relatedBooks;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Autor não encontrado</h2>
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
          {/* Author Avatar with decorative ring */}
          {loading || authorLoading ? (
            <Skeleton className="h-36 w-36 rounded-full" />
          ) : (
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 h-36 w-36 animate-pulse rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5"></div>
              <div className="absolute -inset-1 h-[152px] w-[152px] rounded-full border border-brand-gold/20"></div>
              <div className="absolute -inset-3 h-[168px] w-[168px] rounded-full border border-brand-gold/10"></div>
              {/* Main avatar */}
              <Avatar className="relative h-36 w-36 border-4 border-background shadow-2xl ring-2 ring-brand-gold/30">
                {author?.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
                <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-900 text-4xl font-bold text-white">
                  {(authorName || 'A').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Author Info */}
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
                  Autor
                </Badge>
                <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  {author?.name || authorName || 'Autor'}
                </h1>
                {author?.metadata?.occupation && author.metadata.occupation.length > 0 && (
                  <p className="text-base text-muted-foreground">
                    {author.metadata.occupation.join(' • ')}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="book" className="text-brand-gold" size="size-4" />
                    <span className="font-medium">{books.length} livros na biblioteca</span>
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
              {author?.metadata?.wikipedia && (
                <Button
                  variant="outline"
                  className="font-bold"
                  onClick={() => window.open(author.metadata?.wikipedia, '_blank')}
                >
                  <Icon name="globe" className="mr-2" size="size-4" /> Wikipedia
                </Button>
              )}
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

        {/* Author Bio Section */}
        {!loading && author?.shortBio && (
          <div className="mb-12 rounded-xl border border-border/50 bg-card/50 p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <Icon name="user" size="size-4" /> Sobre o Autor
            </h3>
            <p className="font-serif text-lg leading-relaxed text-foreground/80">
              {author.shortBio}
            </p>
            {author.metadata && (
              <div className="mt-4 flex flex-wrap gap-3">
                {author.metadata.wikipedia && (
                  <a
                    href={author.metadata.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                  >
                    <Icon name="globe" size="size-4" /> Wikipedia
                  </a>
                )}
                {author.metadata.website && (
                  <a
                    href={author.metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                  >
                    <Icon name="globe" size="size-4" /> Website
                  </a>
                )}
                {author.metadata.twitter && (
                  <a
                    href={`https://twitter.com/${author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                  >
                    <Icon name="x" size="size-4" /> @{author.metadata.twitter}
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Books Grid */}
        <div className="space-y-8">
          <SectionHeader title={`Livros de ${authorName || 'este autor'}`} />

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
                Este autor ainda não tem livros cadastrados na biblioteca.
              </p>
            </div>
          )}
        </div>

        {/* Related Books Section */}
        {!loading && popularBooks.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <SectionHeader title="Você também pode gostar" onViewAll={() => navigate('/books')} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {popularBooks.map((book) => (
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

export default BooksByAuthorTemplate;
