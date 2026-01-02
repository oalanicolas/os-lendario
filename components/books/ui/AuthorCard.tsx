import React from 'react';
import { cn } from '../../../lib/utils';

interface Author {
  id: string;
  slug: string;
  name: string;
  avatar_url: string | null;
  book_count: number;
}

interface AuthorCardProps {
  author: Author;
  onClick: (slug: string) => void;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, onClick }) => {
  // Generate a consistent gradient based on the author's name hash
  const getGradient = (name: string) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${h1}, 70%, 60%), hsl(${h2}, 80%, 40%))`;
  };

  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div
      onClick={() => onClick(author.slug)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(author.slug);
        }
      }}
      className={cn(
        'group flex flex-col items-center p-4 text-center',
        'cursor-pointer rounded-xl border border-border bg-card',
        'hover:scale-[1.02] hover:border-brand-gold/30',
        'shadow-sm transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-brand-gold/50'
      )}
      role="button"
      tabIndex={0}
      aria-label={`Ver livros de ${author.name}`}
    >
      {/* Avatar Container */}
      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full ring-2 ring-border transition-all group-hover:ring-brand-gold/50">
        {author.avatar_url ? (
          <img src={author.avatar_url} alt={author.name} className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-xl font-bold text-white"
            style={{ background: getGradient(author.name) }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name */}
      <h4 className="mt-3 line-clamp-2 font-serif text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-brand-gold">
        {author.name}
      </h4>

      {/* Book Count */}
      <p className="mt-1 font-sans text-xs text-muted-foreground">
        {author.book_count} {author.book_count === 1 ? 'livro' : 'livros'}
      </p>
    </div>
  );
};

export default AuthorCard;
