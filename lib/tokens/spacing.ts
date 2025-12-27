/**
 * SPACING SYSTEM
 *
 * Complete spacing scale based on 0.5rem (8px) base unit.
 * Use for gaps, padding, margins throughout the application.
 *
 * Base unit: 1rem = 16px
 */

// ============================================================================
// PRIMITIVE SCALE (Direct rem values)
// ============================================================================

export const SPACING = {
  // Micro (2px, 4px)
  xs: '0.125rem', // 2px
  sm: '0.25rem', // 4px

  // Small (8px, 12px)
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px

  // Base (16px, 24px)
  base: '1rem', // 16px
  xl: '1.5rem', // 24px

  // Large (32px, 40px, 48px)
  '2xl': '2rem', // 32px
  '3xl': '2.5rem', // 40px
  '4xl': '3rem', // 48px

  // Extra Large (64px+)
  '5xl': '4rem', // 64px
  '6xl': '5rem', // 80px
  '7xl': '6rem', // 96px
  '8xl': '8rem', // 128px
} as const;

// ============================================================================
// SEMANTIC SPACING (Usage intentions)
// ============================================================================

export const SEMANTIC_SPACING = {
  // Gap between sibling elements
  gap: {
    compact: SPACING.xs, // Tight grouping (2px)
    normal: SPACING.md, // Default spacing (8px)
    relaxed: SPACING.lg, // Generous spacing (12px)
    loose: SPACING.xl, // Very open (24px)
  },

  // Padding inside components
  padding: {
    compact: SPACING.md, // Tight padding for buttons (8px)
    normal: SPACING.base, // Default padding for cards (16px)
    relaxed: SPACING.xl, // Generous padding for sections (24px)
  },

  // Margin around components
  margin: {
    compact: SPACING.md,
    normal: SPACING.base,
    relaxed: SPACING.xl,
  },
} as const;
