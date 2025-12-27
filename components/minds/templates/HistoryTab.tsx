import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

// Re-export HistoryEvent from hook for external use
export type { HistoryEvent } from '../../../hooks/useMindHistory';
import type { HistoryEvent } from '../../../hooks/useMindHistory';

export interface Achievement {
  title: string;
  period: string;
  description: string;
}

interface HistoryTabProps {
  history: HistoryEvent[];
  quote?: string | null;
  achievements?: Achievement[];
  loading?: boolean;
}

const DEFAULT_QUOTE =
  'A continua morte de versoes antigas e o renascimento em direcao a um proposito maior.';

export const HistoryTab: React.FC<HistoryTabProps> = ({
  history,
  quote,
  achievements = [],
  loading = false,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayQuote = quote || DEFAULT_QUOTE;

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Empty state
  if (!history || history.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Icon name="clock" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Nenhum evento de historia disponivel para esta mente.</p>
        <p className="mt-2 text-xs opacity-50">
          Importe dados de historia para popular a timeline.
        </p>
      </div>
    );
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'origin':
        return { bg: 'bg-zinc-600', border: 'border-zinc-600', label: 'Origem', icon: 'home' };
      case 'milestone':
        return {
          bg: 'bg-studio-secondary',
          border: 'border-studio-secondary',
          label: 'Conquista',
          icon: 'trophy',
        };
      case 'pivot':
        return {
          bg: 'bg-brand-cyan',
          border: 'border-brand-cyan',
          label: 'Mudanca',
          icon: 'refresh',
        };
      case 'crisis':
        return {
          bg: 'bg-red-500',
          border: 'border-red-500',
          label: 'Crise',
          icon: 'exclamation-triangle',
        };
      case 'learning':
        return {
          bg: 'bg-blue-600',
          border: 'border-blue-600',
          label: 'Estudo',
          icon: 'book-open',
        };
      default:
        return { bg: 'bg-zinc-500', border: 'border-zinc-500', label: 'Evento', icon: 'circle' };
    }
  };

  const uniqueYears = Array.from(new Set(history.map((h) => h.year)));

  const groupedEvents = uniqueYears.reduce(
    (acc, year) => {
      acc[year] = history.filter((h) => h.year === year);
      return acc;
    },
    {} as Record<string, HistoryEvent[]>
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-4xl animate-fade-in py-8">
      {/* Introduction Quote */}
      <div className="mb-16 text-center">
        <p className="mx-auto max-w-2xl font-serif text-xl italic leading-relaxed text-zinc-400">
          "{displayQuote}"
        </p>
        <div className="mx-auto mt-8 h-px w-12 bg-zinc-800"></div>

        {/* LEGEND - Minimalist */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {['origin', 'milestone', 'pivot', 'crisis', 'learning'].map((type) => {
            const style = getTypeStyles(type);
            return (
              <div key={type} className="flex items-center gap-2">
                <div className={cn('h-2 w-2 rounded-full', style.bg)}></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {style.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative ml-4 space-y-12 pb-12 md:ml-24">
        {/* Continuous Line */}
        <div className="absolute bottom-0 left-[3px] top-2 z-0 w-px bg-zinc-800 md:-left-[21px]"></div>

        {uniqueYears.map((year) => {
          const events = groupedEvents[year];

          return (
            <div key={year} className="relative">
              {/* Year Label (Sticky visual anchor) */}
              <div className="absolute -left-36 top-1 hidden w-24 text-right md:block">
                <span className="font-mono text-sm font-bold text-zinc-500">{year}</span>
              </div>

              {/* Mobile Year Label */}
              <div className="relative mb-4 pl-6 md:hidden">
                <div className="absolute left-[3px] top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-700"></div>
                <span className="font-mono text-xs font-bold text-zinc-500">{year}</span>
              </div>

              {/* Events for this Year */}
              <div className="space-y-6">
                {events.map((event) => {
                  const style = getTypeStyles(event.type);
                  const isExpanded = expandedId === event.id;

                  return (
                    <div key={event.id} className="group relative pl-6 md:pl-0">
                      {/* Semantic Dot (The "Ball") */}
                      <div
                        className={cn(
                          'border-studio-card absolute left-[3px] top-5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 shadow-lg transition-transform duration-300 md:-left-[21px]',
                          style.bg,
                          isExpanded ? 'scale-125' : 'group-hover:scale-110'
                        )}
                      ></div>

                      <Card
                        className={cn(
                          'bg-studio-card relative cursor-pointer overflow-hidden border border-white/5 transition-all duration-300',
                          'hover:border-white/10 hover:bg-zinc-900/30',
                          isExpanded && 'border-white/10 bg-zinc-900/40 ring-1 ring-white/5'
                        )}
                        onClick={() => toggleExpand(event.id)}
                      >
                        {/* Subtle highlight based on type when expanded */}
                        {isExpanded && (
                          <div
                            className={cn('absolute bottom-0 left-0 top-0 w-0.5', style.bg)}
                          ></div>
                        )}

                        <CardContent className="p-5">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                  {/* Minimalist Icon - Always neutral */}
                                  <Icon name={style.icon} size="size-3" className="text-zinc-600" />

                                  {/* Uniform Title Color */}
                                  <h4
                                    className={cn(
                                      'text-base font-bold text-zinc-200 transition-colors group-hover:text-white'
                                    )}
                                  >
                                    {event.title}
                                  </h4>
                                </div>
                                <p className="pl-6 font-serif text-sm leading-relaxed text-zinc-500">
                                  {event.description}
                                </p>
                              </div>
                              <div className="pt-1 text-zinc-700">
                                <Icon
                                  name="angle-small-down"
                                  className={cn(
                                    'transition-transform duration-300',
                                    isExpanded && 'rotate-180 text-zinc-500'
                                  )}
                                  size="size-3"
                                />
                              </div>
                            </div>

                            {/* Expanded Content */}
                            <div
                              className={cn(
                                'grid pl-6 transition-[grid-template-rows] duration-500 ease-in-out',
                                isExpanded
                                  ? 'mt-4 grid-rows-[1fr] border-t border-white/5 pt-4 opacity-100'
                                  : 'grid-rows-[0fr] opacity-0'
                              )}
                            >
                              <div className="overflow-hidden">
                                {event.details && event.details.length > 0 ? (
                                  <ul className="space-y-3">
                                    {event.details.map((detail, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start gap-3 font-serif text-sm leading-relaxed text-zinc-400"
                                      >
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700"></span>
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: detail.replace(
                                              /\[\[(.*?)\]\]/g,
                                              '<strong class="text-zinc-200 font-sans text-xs uppercase tracking-wide">$1</strong>'
                                            ),
                                          }}
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm italic text-zinc-600">
                                    Sem detalhes adicionais.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* End Point */}
        <div className="relative pl-6 pt-8 md:pl-0">
          <div className="absolute left-[3px] top-8 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-800 md:-left-[21px]"></div>
          <p className="pl-1 font-mono text-[10px] uppercase tracking-widest text-zinc-700">
            Continuum
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      {achievements && achievements.length > 0 && (
        <div className="mt-16 border-t border-zinc-800/50 pt-12">
          <div className="mb-12 text-center">
            <h3 className="mb-2 text-lg font-bold uppercase tracking-widest text-zinc-300">
              Conquistas Profissionais
            </h3>
            <div className="mx-auto h-px w-12 bg-zinc-800"></div>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, idx) => (
              <Card
                key={idx}
                className="bg-studio-card border border-white/5 transition-all duration-300 hover:border-white/10"
              >
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-studio-primary/10">
                      <Icon name="trophy" size="size-4" className="text-studio-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight text-zinc-200">
                        {achievement.title}
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                        {achievement.period}
                      </span>
                    </div>
                  </div>
                  <p className="font-serif text-xs leading-relaxed text-zinc-500">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
