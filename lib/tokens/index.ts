/**
 * TOKEN SYSTEM - BARREL EXPORT
 *
 * Central export point for all design tokens.
 * Includes: colors, spacing, shadows, border radius, and animations.
 */

// Colors & Studio Tokens
export { colors, typography, STUDIO_TOKENS, applyStudioTokens, getStudioTokensForSection } from './colors';
export type { StudioPalette } from './colors';

// Spacing Tokens
export { SPACING, SEMANTIC_SPACING } from './spacing';

// Shadow Tokens
export { SHADOWS, SEMANTIC_SHADOWS } from './shadows';

// Border Radius Tokens
export { BORDER_RADIUS, SEMANTIC_BORDER_RADIUS } from './borderRadius';

// Animation Tokens
export { ANIMATION_DURATIONS, ANIMATION_EASING, ANIMATION_KEYFRAMES, SEMANTIC_ANIMATIONS } from './animations';
