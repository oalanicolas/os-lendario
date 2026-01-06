// Curator[IA] Type Definitions

export type Platform = 'Instagram Reels' | 'LinkedIn' | 'YouTube' | 'TikTok' | 'Blog' | 'Twitter/X';

export interface AnalysisData {
  whyItMatters: string;
  opportunity: string;
  risk: string;
}

export interface AngleData {
  title: string;
  description: string;
  bestPlatform: Platform;
  successRate: number; // 0 to 100
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  minutesAgo: number;
  fullDate: string;
  relevance: number;
  category: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  url: string;
  analysis: AnalysisData;
  angles: AngleData[];
}

export type DateRange = 'all' | '24h' | '3d' | '7d';

export interface ContentFormat {
  id: string;
  label: string;
  icon: string;
  type?: 'brands';
}
