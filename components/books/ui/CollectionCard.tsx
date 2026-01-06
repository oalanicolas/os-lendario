import React from 'react';
import { Icon, type IconName } from '../../ui/icon';
import { cn } from '../../../lib/utils';

export interface Collection {
  id: string;
  title: string;
  bookCount: number;
  icon: IconName;
  color: string; // Tailwind bg class e.g., 'bg-yellow-500'
}

interface CollectionCardProps {
  collection: Collection;
  onClick?: () => void;
  className?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onClick, className }) => {
  return (
    <div
      className={cn(
        'group relative flex cursor-pointer items-center gap-5 overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all duration-500 hover:border-border hover:shadow-xl',
        className
      )}
      onClick={onClick}
    >
      {/* Background glow on hover */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100',
          collection.color.replace('bg-', 'bg-') + '/5'
        )}
      ></div>

      {/* Stacked Book Effect */}
      <div className="relative shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
        {/* Back cards (stack effect) */}
        <div className="absolute right-0 top-0 h-20 w-16 translate-x-1.5 rotate-6 rounded-lg border border-border bg-card shadow-sm transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-12"></div>
        <div className="absolute right-0 top-0 h-20 w-16 translate-x-0.5 -rotate-3 rounded-lg border border-border bg-card shadow-sm transition-transform duration-500 group-hover:-rotate-6"></div>

        {/* Main Cover with Icon */}
        <div
          className={cn(
            'relative flex h-20 w-16 items-center justify-center rounded-lg text-black shadow-lg transition-transform duration-500 group-hover:scale-105',
            collection.color
          )}
        >
          <Icon name={collection.icon} size="size-6" />
        </div>
      </div>

      {/* Collection Info */}
      <div className="relative min-w-0 flex-1">
        <h4 className="truncate text-base font-bold leading-tight transition-colors duration-300 group-hover:text-primary">
          {collection.title}
        </h4>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {collection.bookCount} livros
        </p>
      </div>

      {/* Arrow on hover */}
      <div className="relative -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <Icon name="chevron-right" className="text-muted-foreground" size="size-5" />
      </div>
    </div>
  );
};

export default CollectionCard;
