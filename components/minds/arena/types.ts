export type ViewState = 'lobby' | 'create' | 'live';

export interface Clone {
  id: string;
  name: string;
  role: string;
  avatar: string;
  winRate: number;
  debates: number;
  fidelity: number;
  color: string;
  personality: string; // Instructions for the AI
}

export interface DebateConfig {
  clone1Id: string;
  clone2Id: string;
  topic: string;
  frameworkId: string;
}

export interface HistoryItem {
  round: number;
  speaker: Clone;
  text: string;
}
