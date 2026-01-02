import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useAuthors, type Author } from '../../../hooks/useAuthors';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Icon } from '../../ui/icon';
import BooksTopbar from '../BooksTopbar';
import AuthorCard from '../ui/AuthorCard';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface BooksAuthorsProps {
  setSection: (s: Section) => void;
}

const BooksAuthorsTemplate: React.FC<BooksAuthorsProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  const { authors, loading, error } = useAuthors();

  usePageTitle('Autores');

  // Navigate to library when searching for books
  const handleBookSearch = (query: string) => {
    setBookSearchQuery(query);
    if (query.trim()) {
      navigate(`/books?search=${encodeURIComponent(query)}`);
    }
  };

  // Filter authors by search
  const filteredAuthors = useMemo(() => {
    return authors
      .filter((author) => author.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [authors, searchTerm]);

  // Group authors by first letter
  const authorsByLetter = useMemo(() => {
    const groups: Record<string, Author[]> = {};
    filteredAuthors.forEach((author) => {
      const firstLetter = author.name[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(author);
    });
    return groups;
  }, [filteredAuthors]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAuthorClick = (slug: string) => {
    navigate(`/books/author/${slug}`);
  };

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <BooksTopbar
          currentSection={Section.APP_BOOKS_AUTHORS}
          setSection={setSection}
          searchQuery={bookSearchQuery}
          onSearchChange={handleBookSearch}
        />
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <Icon name="exclamation" className="text-destructive" size="size-12" />
          <h2 className="mt-4 font-serif text-xl font-bold">Erro ao carregar autores</h2>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <BooksTopbar
        currentSection={Section.APP_BOOKS_AUTHORS}
        setSection={setSection}
        searchQuery={bookSearchQuery}
        onSearchChange={handleBookSearch}
      />

      <div className="mx-auto max-w-[1400px] space-y-8 px-6 py-8">
        {/* Title Section */}
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <h1 className="font-serif text-3xl font-bold uppercase tracking-tight">Autores</h1>
            <p className="mt-1 text-muted-foreground">
              Descubra os pensadores por trás dos resumos
            </p>
          </div>
          {!loading && (
            <span className="font-mono text-sm text-muted-foreground">
              {filteredAuthors.length} {filteredAuthors.length === 1 ? 'autor' : 'autores'}
            </span>
          )}
        </div>

        {/* Search + Alphabet Filter Bar */}
        <div className="sticky top-16 z-30 -mx-6 flex items-center gap-4 bg-background/80 px-6 py-2 backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-48 shrink-0">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size="size-4"
            />
            <Input
              placeholder="Buscar autor..."
              className="h-9 rounded-full border-border bg-muted/30 pl-9 pr-8 text-sm focus:border-brand-gold/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="x" size="size-3" />
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px shrink-0 bg-border" />

          {/* Alphabet */}
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
            {ALPHABET.map((letter) => {
              const hasAuthors = !!authorsByLetter[letter];
              return (
                <button
                  key={letter}
                  disabled={!hasAuthors && !loading}
                  onClick={() => scrollToLetter(letter)}
                  className={cn(
                    'min-w-[32px] rounded-full px-3 py-1.5 text-sm transition-all',
                    hasAuthors
                      ? 'font-medium text-foreground hover:bg-muted'
                      : 'cursor-not-allowed text-muted-foreground/30',
                    'focus:outline-none focus:ring-2 focus:ring-brand-gold/50'
                  )}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse flex-col items-center space-y-4 rounded-xl border border-border p-4"
              >
                <div className="h-20 w-20 rounded-full bg-muted" />
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-2 w-16 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : filteredAuthors.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-4 text-center">
            <Icon name="users" className="text-muted-foreground/30" size="size-16" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold">
                {searchTerm
                  ? `Nenhum autor corresponde a "${searchTerm}"`
                  : 'Nenhum autor encontrado'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'Tente buscar por outro nome'
                  : 'Os autores aparecerão aqui quando houver livros na biblioteca'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {ALPHABET.map((letter) => {
              const letterAuthors = authorsByLetter[letter];
              if (!letterAuthors) return null;

              return (
                <section key={letter} id={`letter-${letter}`} className="scroll-mt-32 space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="font-serif text-2xl font-bold text-brand-gold">{letter}</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {letterAuthors.map((author) => (
                      <AuthorCard key={author.id} author={author} onClick={handleAuthorClick} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksAuthorsTemplate;
