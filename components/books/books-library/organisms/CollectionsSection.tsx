/**
 * CollectionsSection - Curated book collections
 */

import React from 'react';
import CollectionCard from '../../ui/CollectionCard';
import { getCollectionStyle } from '../../constants';
import type { CollectionsSectionProps } from '../types';

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  collections,
  onCollectionClick,
  onViewAll,
  isLoading,
}) => {
  if (collections.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Curadoria
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Colecoes
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent md:block"></div>
        <button
          onClick={onViewAll}
          className="shrink-0 text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground active:scale-95"
        >
          Ver todas &rarr;
        </button>
      </div>

      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-36 min-w-[300px] shrink-0 animate-pulse snap-start rounded-2xl bg-muted/50 md:h-40 md:min-w-0"
              ></div>
            ))
          : collections.slice(0, 3).map((col) => {
              const style = getCollectionStyle(col.slug);
              return (
                <div key={col.id} className="min-w-[300px] shrink-0 snap-start md:min-w-0">
                  <CollectionCard
                    collection={{
                      id: col.id,
                      title: col.name,
                      bookCount: col.bookCount,
                      icon: style.icon,
                      color: style.color,
                    }}
                    onClick={() => onCollectionClick(col.slug)}
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
};
