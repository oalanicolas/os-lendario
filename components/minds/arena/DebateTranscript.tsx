import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';
import { Clone, HistoryItem } from './types';

interface DebateTranscriptProps {
  history: HistoryItem[];
  clone1: Clone;
  clone2: Clone;
  isStreaming: boolean;
  streamedText: string;
  activeSpeaker: Clone | null;
  maxRounds: number;
  currentRound: number;
}

export const DebateTranscript: React.FC<DebateTranscriptProps> = ({
  history,
  clone1,
  clone2,
  isStreaming,
  streamedText,
  activeSpeaker,
  maxRounds,
  currentRound,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, streamedText]);

  return (
    <ScrollArea className="flex-1 space-y-8 p-6">
      <div className="mx-auto max-w-3xl space-y-8 pb-20">
        {history.map((turn, i) => (
          <div
            key={i}
            className={cn(
              'flex animate-fade-in gap-6',
              turn.speaker.id === clone1.id ? 'flex-row' : 'flex-row-reverse'
            )}
          >
            <Avatar className="h-12 w-12 shrink-0 border-2 border-border">
              <AvatarFallback className="bg-card font-bold">{turn.speaker.avatar}</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'flex-1 space-y-2',
                turn.speaker.id === clone1.id ? 'text-left' : 'text-right'
              )}
            >
              <div
                className="flex items-baseline justify-start gap-2"
                style={{ flexDirection: turn.speaker.id === clone1.id ? 'row' : 'row-reverse' }}
              >
                <span className="font-bold text-foreground">{turn.speaker.name}</span>
                <span className="font-mono text-xs text-muted-foreground">Round {turn.round}</span>
              </div>
              <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-muted-foreground">
                {turn.text}
              </p>
            </div>
          </div>
        ))}

        {isStreaming && activeSpeaker && (
          <div
            className={cn(
              'flex gap-6',
              activeSpeaker.id === clone1.id ? 'flex-row' : 'flex-row-reverse'
            )}
          >
            <Avatar className="h-12 w-12 shrink-0 animate-pulse border-2 border-primary shadow-[0_0_15px_-3px_var(--primary)]">
              <AvatarFallback className="bg-card font-bold text-foreground">
                {activeSpeaker.avatar}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'flex-1 space-y-2',
                activeSpeaker.id === clone1.id ? 'text-left' : 'text-right'
              )}
            >
              <div
                className="flex items-baseline justify-start gap-2"
                style={{ flexDirection: activeSpeaker.id === clone1.id ? 'row' : 'row-reverse' }}
              >
                <span className="font-bold text-primary">{activeSpeaker.name}</span>
                <span className="animate-pulse font-mono text-xs text-muted-foreground">
                  Pensando...
                </span>
              </div>
              <p className="font-serif text-lg leading-relaxed text-foreground">
                {streamedText}
                <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-primary align-middle"></span>
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
