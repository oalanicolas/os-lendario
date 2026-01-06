// Curator[IA] Helper Functions

import { Platform } from './types';

// Base date for simulation
const SIMULATION_BASE_DATE = new Date();

/**
 * Generates a formatted date string based on minutes ago
 */
export const getDynamicDate = (minutesAgo: number): string => {
  const date = new Date(SIMULATION_BASE_DATE);
  date.setMinutes(date.getMinutes() - minutesAgo);

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const day = parts.find((p) => p.type === 'day')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const hour = parts.find((p) => p.type === 'hour')?.value;
  const minute = parts.find((p) => p.type === 'minute')?.value;

  return `${day} ${month ? month.charAt(0).toUpperCase() + month.slice(1) : ''}, ${hour}:${minute}`;
};

/**
 * Formats time as relative string (e.g., "há 15 min", "há 2h")
 */
export const formatRelativeTime = (minutesAgo: number): string => {
  if (!minutesAgo || minutesAgo < 1) return 'agora';

  if (minutesAgo < 60) {
    return `há ${Math.round(minutesAgo)} min`;
  }

  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) {
    return `há ${hours}h`;
  }

  const days = Math.floor(hours / 24);
  return `${days} dia${days > 1 ? 's' : ''}`;
};

/**
 * Cleans URL by removing Google redirects and Markdown formatting
 */
export const cleanUrl = (url: string): string => {
  if (!url) return '#';
  let cleaned = url.trim();

  // Remove Markdown formatting if present [text](url)
  const markdownMatch = cleaned.match(/\[.*\]\((.*)\)/);
  if (markdownMatch && markdownMatch[1]) {
    cleaned = markdownMatch[1];
  }

  // Attempt to extract direct URL if it's a Google Search redirect
  if (cleaned.includes('google.com/url?')) {
    try {
      const urlObj = new URL(cleaned);
      const directUrl = urlObj.searchParams.get('q') || urlObj.searchParams.get('url');
      if (directUrl) cleaned = directUrl;
    } catch {
      // fallback if URL is invalid
    }
  }

  if (cleaned !== '#' && !cleaned.startsWith('http')) {
    return `https://${cleaned}`;
  }
  return cleaned;
};

/**
 * Returns Tailwind classes for category styling (Lendário Luxe)
 */
export const getCategoryStyles = (category: string): string => {
  const cat = category.toLowerCase();
  if (cat.includes('investimento') || cat.includes('finance') || cat.includes('dinheiro')) {
    return 'bg-green-500/10 text-green-500 border-green-500/20';
  }
  if (
    cat.includes('tecnologia') ||
    cat.includes('tech') ||
    cat.includes('ia') ||
    cat.includes('ai')
  ) {
    return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
  }
  if (cat.includes('mercado') || cat.includes('negócio') || cat.includes('business')) {
    return 'bg-primary/10 text-primary border-primary/20';
  }
  return 'bg-white/5 text-muted-foreground border-white/10';
};

/**
 * Returns icon name for platform
 */
export const getPlatformIcon = (platform: Platform): string => {
  switch (platform) {
    case 'Instagram Reels':
      return 'instagram';
    case 'LinkedIn':
      return 'linkedin';
    case 'YouTube':
      return 'youtube';
    case 'TikTok':
      return 'tiktok';
    case 'Twitter/X':
      return 'twitter';
    default:
      return 'document';
  }
};

/**
 * Returns Tailwind classes for platform styling (Lendário Luxe)
 */
export const getPlatformColor = (platform: Platform): string => {
  switch (platform) {
    case 'Instagram Reels':
      return 'text-pink-500 border-pink-500/20 bg-pink-500/10';
    case 'LinkedIn':
      return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
    case 'YouTube':
      return 'text-red-500 border-red-500/20 bg-red-500/10';
    case 'TikTok':
      return 'text-foreground border-white/20 bg-white/5';
    case 'Twitter/X':
      return 'text-foreground border-white/20 bg-white/5';
    default:
      return 'text-muted-foreground border-white/10 bg-white/5';
  }
};

/**
 * Get current date for display
 */
export const getCurrentDate = (): string => {
  return SIMULATION_BASE_DATE.toLocaleDateString('pt-BR');
};

/**
 * Check if URL is a direct link (not a Google search redirect)
 */
export const isDirectLink = (url: string): boolean => {
  return Boolean(url && url !== '#' && !url.includes('google.com/search'));
};
