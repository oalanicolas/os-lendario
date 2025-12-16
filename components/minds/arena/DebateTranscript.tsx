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
    <ScrollArea className="flex-1 p-6 space-y-8">
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        {history.map((turn, i) => (
          <div
            key={i}
            className={cn("flex gap-6 animate-fade-in", turn.speaker.id === clone1.id ? "flex-row" : "flex-row-reverse")}
          >
            <Avatar className="w-12 h-12 border-2 border-border shrink-0">
              <AvatarFallback className="bg-card font-bold">{turn.speaker.avatar}</AvatarFallback>
            </Avatar>
            <div className={cn("flex-1 space-y-2", turn.speaker.id === clone1.id ? "text-left" : "text-right")}>
              <div
                className="flex items-baseline gap-2 justify-start"
                style={{ flexDirection: turn.speaker.id === clone1.id ? 'row' : 'row-reverse' }}
              >
                <span className="font-bold text-foreground">{turn.speaker.name}</span>
                <span className="text-xs text-muted-foreground font-mono">Round {turn.round}</span>
              </div>
              <p className="text-muted-foreground font-serif text-lg leading-relaxed whitespace-pre-wrap">
                {turn.text}
              </p>
            </div>
          </div>
        ))}

        {isStreaming && activeSpeaker && (
          <div
            className={cn("flex gap-6", activeSpeaker.id === clone1.id ? "flex-row" : "flex-row-reverse")}
          >
            <Avatar className="w-12 h-12 border-2 border-primary shadow-[0_0_15px_-3px_var(--primary)] shrink-0 animate-pulse">
              <AvatarFallback className="bg-card font-bold text-foreground">{activeSpeaker.avatar}</AvatarFallback>
            </Avatar>
            <div className={cn("flex-1 space-y-2", activeSpeaker.id === clone1.id ? "text-left" : "text-right")}>
              <div
                className="flex items-baseline gap-2 justify-start"
                style={{ flexDirection: activeSpeaker.id === clone1.id ? 'row' : 'row-reverse' }}
              >
                <span className="font-bold text-primary">{activeSpeaker.name}</span>
                <span className="text-xs text-muted-foreground font-mono animate-pulse">Pensando...</span>
              </div>
              <p className="text-foreground font-serif text-lg leading-relaxed">
                {streamedText}
                <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse align-middle"></span>
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
