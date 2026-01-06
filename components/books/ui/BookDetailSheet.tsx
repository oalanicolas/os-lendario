import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../../ui/sheet';
import type { BookData } from '../../../hooks/useBooks';

/**
 * BookDetailSheet - Slide-out panel showing book details
 *
 * Extracted from: BooksLibraryTemplate.tsx
 * Features:
 * - Hero section with blurred cover background
 * - Book metadata (pages, year, rating, audiobook)
 * - Action buttons (read, bookmark)
 * - Tags display
 */

interface BookDetailSheetProps {
  book: BookData | null;
  isOpen: boolean;
  onClose: () => void;
  onReadSummary: (book: BookData) => void;
  onBookmark?: (book: BookData) => void;
  isBookmarked?: boolean;
}

const BookDetailSheet: React.FC<BookDetailSheetProps> = ({
  book,
  isOpen,
  onClose,
  onReadSummary,
  onBookmark,
  isBookmarked = false,
}) => {
  if (!book) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full overflow-y-auto border-l border-border bg-background p-0 sm:max-w-lg">
        <div className="flex h-full flex-col">
          {/* Hero with Centered Cover */}
          <div className="relative flex h-[45vh] w-full items-center justify-center overflow-hidden pt-12">
            {/* Background blur from cover */}
            {book.coverUrl && (
              <div
                className="absolute inset-0 scale-150 bg-cover bg-center opacity-20 blur-3xl"
                style={{ backgroundImage: `url(${book.coverUrl})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>

            {/* Centered Cover */}
            <div className="relative z-10 aspect-[2/3] w-40 overflow-hidden rounded-2xl border border-border/20 bg-card shadow-2xl">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  alt={book.title}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <Icon name="book" className="text-muted-foreground/30" size="size-12" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8 p-8">
            {/* Title and Author */}
            <div className="space-y-3 text-center">
              <Badge className="rounded-full border-none bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                {book.category || 'Livro'}
              </Badge>
              <SheetTitle className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {book.title}
              </SheetTitle>
              <p className="font-serif text-base italic text-muted-foreground">{book.author}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="h-14 flex-1 rounded-xl bg-foreground text-xs font-bold uppercase tracking-wide text-background shadow-lg transition-all hover:opacity-90 active:scale-95"
                onClick={() => onReadSummary(book)}
              >
                <Icon name="book-open-cover" className="mr-2" size="size-4" /> Ler Resumo
              </Button>
              {onBookmark && (
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-14 w-14 rounded-xl border-border transition-all hover:bg-muted active:scale-[0.98] ${
                    isBookmarked ? 'border-primary/30 bg-primary/5 text-primary' : 'text-foreground'
                  }`}
                  onClick={() => onBookmark(book)}
                >
                  <Icon name={isBookmarked ? 'bookmark-solid' : 'bookmark'} size="size-5" />
                </Button>
              )}
            </div>

            {/* Description */}
            <SheetDescription className="text-center font-serif text-base leading-relaxed text-muted-foreground">
              {book.summary || 'Sem descrição disponível.'}
            </SheetDescription>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {book.tags.map((tag) => (
                  <Badge
                    key={tag.slug}
                    variant="secondary"
                    className="rounded-full bg-muted/50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              {book.pageCount && (
                <div className="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Páginas
                  </p>
                  <p className="text-lg font-bold text-foreground">{book.pageCount}</p>
                </div>
              )}
              {book.publishedYear && (
                <div className="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Ano
                  </p>
                  <p className="text-lg font-bold text-foreground">{book.publishedYear}</p>
                </div>
              )}
              {book.hasAudio && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                  <Icon name="headset" size="size-5" className="mx-auto mb-1 text-primary" />
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    Audiobook
                  </p>
                </div>
              )}
              {book.rating && (
                <div className="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Avaliação
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <Icon name="star-solid" size="size-4" className="text-primary" />
                    <span className="text-lg font-bold text-foreground">
                      {book.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookDetailSheet;
