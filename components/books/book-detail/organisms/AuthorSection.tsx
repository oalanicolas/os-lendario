import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AuthorSectionProps {
  book: {
    author: string;
    authorSlug?: string | null;
  };
  author: {
    name?: string;
    avatarUrl?: string | null;
    shortBio?: string | null;
    bookCount?: number;
  } | null;
  authorLoading: boolean;
  displayedAuthorBio: string;
  shouldTruncateAuthorBio: boolean;
  isAuthorBioExpanded: boolean;
  onToggleBio: () => void;
  onNavigateToAuthor: () => void;
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({
  book,
  author,
  authorLoading,
  displayedAuthorBio,
  shouldTruncateAuthorBio,
  isAuthorBioExpanded,
  onToggleBio,
  onNavigateToAuthor,
}) => {
  return (
    <section className="space-y-8">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        A Mente por Trás da Obra
      </p>

      <div className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/40 p-8 shadow-xl transition-all duration-500 hover:border-border/80 hover:shadow-2xl md:p-10">
        {/* Decorative Icon */}
        <div className="pointer-events-none absolute right-0 top-0 p-8 text-[12rem] text-foreground opacity-[0.03] transition-transform duration-[2000ms] group-hover:scale-110">
          <Icon name="brain" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
          {/* Author Avatar */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
              <Avatar
                className={cn(
                  'relative h-28 w-28 border-4 border-background shadow-2xl ring-2 ring-primary/20 transition-all duration-500',
                  book.authorSlug && 'cursor-pointer'
                )}
                onClick={onNavigateToAuthor}
              >
                {author?.avatarUrl && (
                  <AvatarImage
                    src={author.avatarUrl}
                    alt={author.name}
                    className="grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                )}
                <AvatarFallback className="bg-muted text-2xl font-bold">
                  {book.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Badge className="border-none bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-lg">
              Verified Mind
            </Badge>
          </div>

          {/* Author Info */}
          <div className="min-w-0 flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <button
                  className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 hover:text-primary md:text-3xl"
                  onClick={onNavigateToAuthor}
                >
                  {author?.name || book.author}
                </button>
                {author && author.bookCount && author.bookCount > 0 && (
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary">
                    {author.bookCount}{' '}
                    {author.bookCount === 1 ? 'obra na biblioteca' : 'obras na biblioteca'}
                  </p>
                )}
              </div>

              {/* View Author Button - Desktop */}
              {book.authorSlug && (
                <Button
                  className="hidden h-12 shrink-0 rounded-full bg-foreground px-8 text-xs font-bold uppercase tracking-wide text-background shadow-lg transition-all hover:opacity-90 active:scale-95 md:flex"
                  onClick={onNavigateToAuthor}
                >
                  Ver Perfil Completo
                </Button>
              )}
            </div>

            {/* Author bio */}
            {authorLoading ? (
              <Skeleton className="h-20 w-full rounded-xl" />
            ) : displayedAuthorBio ? (
              <div>
                <p className="font-serif text-base italic leading-relaxed text-muted-foreground md:text-lg">
                  {displayedAuthorBio}
                  {shouldTruncateAuthorBio && !isAuthorBioExpanded && '...'}
                </p>
                {shouldTruncateAuthorBio && (
                  <button
                    onClick={onToggleBio}
                    className="mx-auto mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground transition-colors duration-300 hover:text-primary active:scale-95 md:mx-0"
                  >
                    {isAuthorBioExpanded ? 'Mostrar menos' : 'Ler mais'}
                    <Icon
                      name="chevron-down"
                      size="size-3"
                      className={cn(
                        'transition-transform duration-300',
                        isAuthorBioExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                )}
              </div>
            ) : (
              <p className="font-serif text-sm italic text-muted-foreground/60">
                Biografia nao disponivel.
              </p>
            )}

            {/* View Author Button - Mobile */}
            {book.authorSlug && (
              <Button
                className="h-12 w-full rounded-full bg-foreground text-xs font-bold uppercase tracking-wide text-background shadow-lg transition-all hover:opacity-90 active:scale-95 md:hidden"
                onClick={onNavigateToAuthor}
              >
                Ver Perfil Completo
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
