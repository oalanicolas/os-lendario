import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CLONES, FRAMEWORKS } from './data';
import { DebateConfig, HistoryItem } from './types';
import { useToast } from '../../../hooks/use-toast';
import { DebateTranscript } from './DebateTranscript';
import { DebateSidebar } from './DebateSidebar';
import { DebateHeader } from './DebateHeader';
import { DebateFooter } from './DebateFooter';

interface ArenaLiveProps {
  config: DebateConfig;
  onExit: () => void;
}

export const ArenaLive: React.FC<ArenaLiveProps> = ({ config, onExit }) => {
  const { toast } = useToast();

  // Live State
  const [currentRound, setCurrentRound] = useState(1);
  const [turnIndex, setTurnIndex] = useState<0 | 1>(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [pollVotes, setPollVotes] = useState({ c1: 45, c2: 55 });
  const [userVoted, setUserVoted] = useState(false);
  const [debateFinished, setDebateFinished] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const processingRef = useRef(false);

  // Helpers
  const c1 = CLONES.find((c) => c.id === config.clone1Id);
  const c2 = CLONES.find((c) => c.id === config.clone2Id);
  const frameworkData = FRAMEWORKS.find((f) => f.id === config.frameworkId);
  const maxRounds = frameworkData?.rounds || 5;

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, streamedText]);

  // --- GEMINI CORE ---
  const runDebateTurn = async () => {
    if (processingRef.current || debateFinished || !c1 || !c2) return;

    processingRef.current = true;
    setIsStreaming(true);
    setStreamedText('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const activeClone = turnIndex === 0 ? c1 : c2;
      const opponentClone = turnIndex === 0 ? c2 : c1;

      const conversationContext = history.map((h) => `${h.speaker.name}: ${h.text}`).join('\n\n');

      const prompt = `
                Você está participando de um debate ao vivo.
                
                SUA IDENTIDADE:
                Nome: ${activeClone.name}
                Personalidade/Diretrizes: ${activeClone.personality}
                
                O CONTEXTO:
                Tópico do Debate: "${config.topic}"
                Framework: ${frameworkData?.name}
                Round Atual: ${currentRound} de ${maxRounds}
                
                SEU OPONENTE:
                Nome: ${opponentClone.name}
                
                HISTÓRICO DO DEBATE ATÉ AGORA:
                ${conversationContext}
                
                SUA MISSÃO AGORA:
                Responda ao seu oponente (ou inicie o argumento se for o primeiro turno).
                Mantenha-se estritamente no personagem. Use os maneirismos, vocabulário e visão de mundo de ${activeClone.name}.
                Seja incisivo, inteligente e persuasivo.
                Responda em PORTUGUÊS.
                Mantenha a resposta concisa (máximo 3 parágrafos curtos) para manter o dinamismo.
            `;

      const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 0.8 },
      });

      let fullResponse = '';
      for await (const chunk of response) {
        if (chunk.text) {
          fullResponse += chunk.text;
          setStreamedText((prev) => prev + chunk.text);
        }
      }

      setHistory((prev) => [
        ...prev,
        {
          round: currentRound,
          speaker: activeClone,
          text: fullResponse,
        },
      ]);

      setStreamedText('');
      setIsStreaming(false);
      processingRef.current = false;

      // Next Turn Logic
      if (turnIndex === 0) {
        setTurnIndex(1);
      } else {
        if (currentRound < maxRounds) {
          setTurnIndex(0);
          setCurrentRound((prev) => prev + 1);
        } else {
          setDebateFinished(true);
          toast({
            title: 'Debate Encerrado!',
            description: 'Votação final aberta.',
            variant: 'default',
          });
        }
      }
    } catch (error) {
      console.error('Gemini Error:', error);
      toast({
        title: 'Erro na IA',
        description: 'Falha ao gerar resposta.',
        variant: 'destructive',
      });
      setIsStreaming(false);
      processingRef.current = false;
    }
  };

  // Auto-trigger
  useEffect(() => {
    if (!isStreaming && !debateFinished) {
      const timer = setTimeout(() => {
        runDebateTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, debateFinished, turnIndex, currentRound]);

  const handleVote = (clone: 'c1' | 'c2') => {
    if (userVoted) return;
    setUserVoted(true);
    setPollVotes((prev) => ({
      ...prev,
      [clone]: prev[clone] + 1,
    }));
    toast({ title: 'Voto Registrado', variant: 'success' });
  };

  if (!c1 || !c2) return <div>Erro ao carregar clones.</div>;

  const activeSpeaker = isStreaming ? (turnIndex === 0 ? c1 : c2) : null;

  return (
    <div className="flex h-[calc(100vh-200px)] animate-fade-in flex-col gap-6 lg:flex-row">
      {/* Main Stage */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <DebateHeader
          topic={config.topic}
          currentRound={currentRound}
          maxRounds={maxRounds}
          frameworkName={frameworkData?.name || 'Oxford Debate'}
          pollVotes={pollVotes}
          debateFinished={debateFinished}
        />

        <DebateTranscript
          history={history}
          clone1={c1}
          clone2={c2}
          isStreaming={isStreaming}
          streamedText={streamedText}
          activeSpeaker={activeSpeaker}
          maxRounds={maxRounds}
          currentRound={currentRound}
        />

        <DebateFooter
          clone1Name={c1.name}
          clone2Name={c2.name}
          userVoted={userVoted}
          onVote={handleVote}
          onExit={onExit}
        />
      </div>

      {/* Sidebar */}
      <DebateSidebar clone1={c1} clone2={c2} />
    </div>
  );
};
