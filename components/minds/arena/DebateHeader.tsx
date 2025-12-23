import React from 'react';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

interface DebateHeaderProps {
  topic: string;
  currentRound: number;
  maxRounds: number;
  frameworkName: string;
  pollVotes: { c1: number; c2: number };
  debateFinished: boolean;
}

export const DebateHeader: React.FC<DebateHeaderProps> = ({
  topic,
  currentRound,
  maxRounds,
  frameworkName,
  pollVotes,
  debateFinished,
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card p-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            {debateFinished ? (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                FINALIZADO
              </Badge>
            ) : (
              <Badge variant="destructive" className="animate-pulse">
                AO VIVO
              </Badge>
            )}
            <span className="font-mono text-xs text-muted-foreground">
              Round {currentRound}/{maxRounds} • {frameworkName}
            </span>
          </div>
          <h2 className="text-lg font-bold leading-tight text-foreground">{topic}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-black text-foreground">
              {pollVotes.c1} <span className="text-sm font-normal text-muted-foreground">vs</span>{' '}
              {pollVotes.c2}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Votos da Comunidade
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex h-1 w-full bg-muted">
        {Array.from({ length: maxRounds }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 border-r border-background',
              i + 1 < currentRound
                ? 'bg-muted-foreground'
                : i + 1 === currentRound
                  ? 'animate-pulse bg-primary'
                  : 'bg-transparent'
            )}
          ></div>
        ))}
      </div>
    </>
  );
};
