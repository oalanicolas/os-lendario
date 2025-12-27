/**
 * BORDER RADIUS SYSTEM
 *
 * Consistent roundness scale for all rounded elements.
 * Provides visual consistency and maintains brand identity.
 */

// ============================================================================
// BORDER RADIUS SCALE
// ============================================================================

export const BORDER_RADIUS = {
  // Sharp edges (0px, 2px)
  none: '0', // No rounding (sharp edges)
  xs: '0.125rem', // 2px (very subtle rounding)

  // Subtle rounding (4px, 6px)
  sm: '0.25rem', // 4px (minimal rounding)
  md: '0.375rem', // 6px (subtle)

  // Standard rounding (8px, 12px)
  base: '0.5rem', // 8px (default, standard rounding)
  lg: '0.75rem', // 12px (rounded)

  // Soft rounding (16px, 20px)
  xl: '1rem', // 16px (soft)
  '2xl': '1.25rem', // 20px (very soft)

  // Very soft rounding (24px+)
  '3xl': '1.5rem', // 24px
  '4xl': '2rem', // 32px

  // Full circle/pill shape
  full: '9999px', // Circles, pills, badges
} as const;

// ============================================================================
// SEMANTIC BORDER RADIUS (Usage intentions)
// ============================================================================

export const SEMANTIC_BORDER_RADIUS = {
  // Button shape (subtle rounding for touch targets)
  button: BORDER_RADIUS.md, // 6px

  // Card corners (more rounded for panels)
  card: BORDER_RADIUS.lg, // 12px

  // Form input rounding
  input: BORDER_RADIUS.md, // 6px (same as buttons)

  // Modal/Dialog corners (softer appearance)
  modal: BORDER_RADIUS.xl, // 16px

  // Badge/Pill shapes (semantic for labeling)
  badge: BORDER_RADIUS.sm, // 4px (minimal)

  // Avatar/Profile pictures (perfect circles)
  avatar: BORDER_RADIUS.full, // 100%

  // Dialog/Overlay corners (large modals)
  dialog: BORDER_RADIUS.xl, // 16px (same as modal)
} as const;
