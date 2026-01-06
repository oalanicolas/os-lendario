/**
 * HeroSection - Hero banner for Books Library
 * Displays title, book count, and CTA buttons
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroSkeleton } from '../../ui/BookSkeletons';
import type { HeroSectionProps } from '../types';

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalBookCount,
  isAuthenticated,
  currentlyReadingBook,
  recentBooks,
  popularBooks,
  onContinueReading,
  onMyLibrary,
  onExploreLibrary,
  isLoading,
}) => {
  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg transition-all duration-500 md:rounded-3xl md:p-10">
      {/* Radial gradient sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/80"></div>

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Texto */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary"
            >
              Curadoria Exclusiva
            </Badge>
            <span className="text-xs font-medium text-muted-foreground">
              {totalBookCount} obras
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-[0.9] tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Expanda sua{' '}
            <span className="font-serif font-light italic text-muted-foreground">Consciencia.</span>
          </h1>
          <p className="max-w-md font-serif text-sm leading-relaxed text-muted-foreground/70 md:text-base">
            Sabedoria secular potencializada por IA.
          </p>
        </div>

        {/* Botoes */}
        <div className="flex shrink-0 gap-3">
          {isAuthenticated && currentlyReadingBook && (
            <Button
              className="h-12 rounded-xl bg-foreground px-6 text-xs font-bold uppercase tracking-wide text-background shadow-lg transition-all hover:opacity-90 active:scale-95"
              onClick={onContinueReading}
            >
              Continuar Leitura
            </Button>
          )}
          {isAuthenticated && (
            <Button
              variant="outline"
              className="h-12 rounded-xl border-border px-6 text-xs font-bold uppercase tracking-wide text-foreground transition-all hover:bg-muted active:scale-95"
              onClick={onMyLibrary}
            >
              Minha Lista
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              className="h-12 rounded-xl bg-foreground px-6 text-xs font-bold uppercase tracking-wide text-background shadow-lg transition-all hover:opacity-90 active:scale-95"
              onClick={onExploreLibrary}
            >
              Explorar Biblioteca
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
