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
      <div className="p-4 border-b border-border flex justify-between items-center bg-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {debateFinished ? (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                FINALIZADO
              </Badge>
            ) : (
              <Badge variant="destructive" className="animate-pulse">
                AO VIVO
              </Badge>
            )}
            <span className="text-xs font-mono text-muted-foreground">
              Round {currentRound}/{maxRounds} • {frameworkName}
            </span>
          </div>
          <h2 className="text-lg font-bold text-foreground leading-tight">{topic}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-black text-foreground">
              {pollVotes.c1} <span className="text-muted-foreground text-sm font-normal">vs</span> {pollVotes.c2}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Votos da Comunidade</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="h-1 w-full bg-muted flex">
        {Array.from({ length: maxRounds }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 border-r border-background",
              i + 1 < currentRound ? "bg-muted-foreground" : i + 1 === currentRound ? "bg-primary animate-pulse" : "bg-transparent"
            )}
          ></div>
        ))}
      </div>
    </>
  );
};
