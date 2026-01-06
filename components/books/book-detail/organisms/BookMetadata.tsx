import React from 'react';
import { Icon } from '@/components/ui/icon';

interface BookMetadataProps {
  pageCount?: number | null;
  publishedYear?: number | null;
  hasAudio?: boolean;
}

export const BookMetadata: React.FC<BookMetadataProps> = ({
  pageCount,
  publishedYear,
  hasAudio,
}) => {
  if (!pageCount && !publishedYear && !hasAudio) return null;

  return (
    <div className="flex flex-wrap items-center gap-6 border-y border-border/30 py-4">
      {pageCount && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Páginas
          </span>
          <span className="font-mono text-sm font-bold text-foreground">{pageCount}</span>
        </div>
      )}
      {publishedYear && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Ano
          </span>
          <span className="font-mono text-sm font-bold text-foreground">{publishedYear}</span>
        </div>
      )}
      {hasAudio && (
        <div className="flex items-center gap-2">
          <Icon name="headset" size="size-3" className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-wide text-primary">Audiobook</span>
        </div>
      )}
    </div>
  );
};
