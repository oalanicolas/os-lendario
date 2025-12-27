/**
 * Fragment Utilities
 * Shared helper functions for fragment components
 * Following Design System patterns from design-system/
 */

// Relevance thresholds
const RELEVANCE_HIGH = 8;
const RELEVANCE_MEDIUM = 5;

// Confidence thresholds
const CONFIDENCE_HIGH = 0.7;
const CONFIDENCE_MEDIUM = 0.4;

/**
 * Get color classes for relevance badge
 * Uses Design System semantic colors: emerald (success), amber (warning), zinc (neutral)
 */
export const getRelevanceColor = (relevance: number): string => {
  if (relevance >= RELEVANCE_HIGH) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
  if (relevance >= RELEVANCE_MEDIUM) return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
  return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/30';
};

/**
 * Get color classes for relevance text only
 */
export const getRelevanceTextColor = (relevance: number): string => {
  if (relevance >= RELEVANCE_HIGH) return 'text-emerald-400';
  if (relevance >= RELEVANCE_MEDIUM) return 'text-amber-400';
  return 'text-zinc-400';
};

/**
 * Get color classes for confidence progress bar
 * Uses Design System semantic colors
 */
export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= CONFIDENCE_HIGH) return 'bg-emerald-500';
  if (confidence >= CONFIDENCE_MEDIUM) return 'bg-amber-500';
  return 'bg-zinc-500';
};

/**
 * Get color classes for confidence text (when using percentage 0-100)
 */
export const getConfidenceTextColor = (confidencePercent: number): string => {
  if (confidencePercent >= 70) return 'text-emerald-400';
  if (confidencePercent >= 40) return 'text-amber-400';
  return 'text-zinc-400';
};

/**
 * Get relevance label in Portuguese
 */
export const getRelevanceLabel = (relevance: number): string => {
  if (relevance >= RELEVANCE_HIGH) return 'Alta';
  if (relevance >= RELEVANCE_MEDIUM) return 'Média';
  return 'Baixa';
};

/**
 * Convert confidence from 0-1 to percentage
 */
export const confidenceToPercent = (confidence: number | undefined): number => {
  return Math.round((confidence || 0) * 100);
};

/**
 * Convert percentage to confidence 0-1
 */
export const percentToConfidence = (percent: number): number => {
  return percent / 100;
};
