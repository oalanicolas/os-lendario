import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useToast } from './use-toast';
import { debateService } from '../services/debateService';
import { useDebates, type Debate, incrementDebateViews } from './useDebates';

export type ViewState = 'lobby' | 'create' | 'live' | 'replay' | 'frameworks';

export interface Mind {
  id: string;
  name: string;
  role: string;
  avatar: string;
  winRate: number;
  debates: number;
  fidelity: number;
  color: string;
}

export interface Framework {
  id: string;
  name: string;
  rounds: number;
  desc: string;
}

export interface HistoryItem {
  round: number;
  speaker: Mind;
  text: string;
}

export interface SavedDebate {
  id: string;
  topic: string;
  framework: string;
  date: string;
  mind1: Mind;
  mind2: Mind;
  views: number;
  rating: number;
  rounds: Array<{
    number: number;
    type: string;
    mind1Argument: string;
    mind2Argument: string;
  }>;
}

export interface DebateMind {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface DebateRound {
  number: number;
  type: string;
  mind1Argument: string;
  mind2Argument: string;
}

export interface ArenaState {
  // View Management
  view: ViewState;
  setView: (view: ViewState) => void;

  // Create State
  selectedMind1: string | null;
  setSelectedMind1: (id: string | null) => void;
  selectedMind2: string | null;
  setSelectedMind2: (id: string | null) => void;
  topic: string;
  setTopic: (topic: string) => void;
  framework: string;
  setFramework: (framework: string) => void;
  visibility: string;
  setVisibility: (visibility: string) => void;

  // Live State
  currentRound: number;
  setCurrentRound: (round: number) => void;
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
  streamedText: string;
  setStreamedText: (text: string) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  pollVotes: { c1: number; c2: number };
  setPollVotes: (votes: { c1: number; c2: number }) => void;
  userVoted: boolean;
  setUserVoted: (voted: boolean) => void;
  totalRounds: number;

  // Data State
  minds: Mind[];
  setMinds: (minds: Mind[]) => void;
  activeDebateId: string | null;
  setActiveDebateId: (id: string | null) => void;

  // Replay State
  selectedReplay: Debate | SavedDebate | null;
  setSelectedReplay: (debate: Debate | SavedDebate | null) => void;
  replayRoundIndex: number;
  setReplayRoundIndex: (index: number) => void;

  // Debates
  allDebates: (Debate | SavedDebate)[];
  debatesLoading: boolean;

  // Refs
  messagesEndRef: React.RefObject<HTMLDivElement>;

  // Handlers
  handleStartDebate: () => Promise<void>;
  handleVote: (mind: 'c1' | 'c2') => void;
  resetAndGoToLobby: () => void;
  handleWatchReplay: (debate: SavedDebate | Debate) => void;
}

export const useArena = (initialMinds: Mind[]): ArenaState => {
  const { toast } = useToast();
  const { debates: dbDebates, loading: debatesLoading } = useDebates();

  // View Management
  const [view, setView] = useState<ViewState>('lobby');

  // Create State
  const [selectedMind1, setSelectedMind1] = useState<string | null>(null);
  const [selectedMind2, setSelectedMind2] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [framework, setFramework] = useState('oxford');
  const [visibility, setVisibility] = useState('public');

  // Live State
  const [currentRound, setCurrentRound] = useState(1);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [pollVotes, setPollVotes] = useState({ c1: 45, c2: 55 });
  const [userVoted, setUserVoted] = useState(false);
  const [totalRounds] = useState(5);

  // Data State
  const [minds, setMinds] = useState<Mind[]>(initialMinds);
  const [activeDebateId, setActiveDebateId] = useState<string | null>(null);

  // Replay State
  const [selectedReplay, setSelectedReplay] = useState<Debate | SavedDebate | null>(null);
  const [replayRoundIndex, setReplayRoundIndex] = useState(0);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load minds on mount
  useEffect(() => {
    async function loadMinds() {
      try {
        const realMinds = await debateService.getMinds();
        if (realMinds.length > 0) {
          setMinds(realMinds);
        }
      } catch (e) {
        console.error('Failed to load minds:', e);
      }
    }
    loadMinds();
  }, []);

  // Combine DB debates with initial data
  const allDebates = useMemo(() => {
    if (dbDebates.length > 0) {
      return dbDebates;
    }
    return [];
  }, [dbDebates]);

  // Handlers
  const handleStartDebate = useCallback(async () => {
    if (!selectedMind1 || !selectedMind2 || !topic) {
      toast({
        title: 'Configuracao incompleta',
        description: 'Selecione duas mentes e um topico.',
        variant: 'destructive',
      });
      return;
    }
    if (selectedMind1 === selectedMind2) {
      toast({
        title: 'Erro',
        description: 'Uma mente nao pode debater consigo mesma.',
        variant: 'destructive',
      });
      return;
    }

    try {
      toast({ title: 'Iniciando debate...', description: 'Conectando ao Debate Engine...' });

      const result = await debateService.createDebate({
        mind1_id: selectedMind1,
        mind2_id: selectedMind2,
        topic: topic,
        framework: framework,
        rounds: 3,
      });

      setActiveDebateId(result.debate_id);
      setView('live');
      setHistory([]);
      setCurrentRound(1);
      setUserVoted(false);
      setPollVotes({ c1: 45, c2: 55 });
      setIsStreaming(true);
    } catch (e) {
      toast({
        title: 'Erro ao iniciar',
        description: String(e),
        variant: 'destructive',
      });
    }
  }, [selectedMind1, selectedMind2, topic, framework, toast]);

  const handleVote = useCallback((mind: 'c1' | 'c2') => {
    setUserVoted((prev) => {
      if (prev) return prev;
      setPollVotes((prevVotes) => ({
        ...prevVotes,
        [mind]: prevVotes[mind] + 1,
      }));
      toast({ title: 'Voto registrado!' });
      return true;
    });
  }, [toast]);

  const resetAndGoToLobby = useCallback(() => {
    setView('lobby');
    setSelectedMind1(null);
    setSelectedMind2(null);
    setTopic('');
    setHistory([]);
    setCurrentRound(1);
    setIsStreaming(false);
    setUserVoted(false);
    setSelectedReplay(null);
    setReplayRoundIndex(0);
  }, []);

  const handleWatchReplay = useCallback(
    (debate: SavedDebate | Debate) => {
      setSelectedReplay(debate);
      setReplayRoundIndex(0);
      setView('replay');
      if ('slug' in debate) {
        incrementDebateViews(debate.id);
      }
    },
    [],
  );

  return {
    view,
    setView,
    selectedMind1,
    setSelectedMind1,
    selectedMind2,
    setSelectedMind2,
    topic,
    setTopic,
    framework,
    setFramework,
    visibility,
    setVisibility,
    currentRound,
    setCurrentRound,
    isStreaming,
    setIsStreaming,
    streamedText,
    setStreamedText,
    history,
    setHistory,
    pollVotes,
    setPollVotes,
    userVoted,
    setUserVoted,
    totalRounds,
    minds,
    setMinds,
    activeDebateId,
    setActiveDebateId,
    selectedReplay,
    setSelectedReplay,
    replayRoundIndex,
    setReplayRoundIndex,
    allDebates,
    debatesLoading,
    messagesEndRef,
    handleStartDebate,
    handleVote,
    resetAndGoToLobby,
    handleWatchReplay,
  };
};
