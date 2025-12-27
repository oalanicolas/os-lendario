/**
 * SHADOW SYSTEM
 *
 * Elevation system for creating depth and hierarchy in the UI.
 * Each level represents a visual depth layer.
 *
 * Based on Apple design patterns (iOS elevation system)
 */

// ============================================================================
// SHADOW ELEVATION LEVELS
// ============================================================================

export const SHADOWS = {
  // No shadow (default, flat elements)
  none: 'none',

  // Level 1: Subtle elevation (hover states, slight UI enhancement)
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  // Level 2: Raised (cards, modals in default state)
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',

  // Level 3: Floating (floating panels, dropdowns, tooltips)
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

  // Level 4: Elevated (modals, popovers, important components)
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  // Level 5: High elevation (deep modals, overlays)
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Level 6: Maximum elevation (fullscreen modals, maximum depth)
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Special: Inner shadow (inset, for depressed elements)
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const;

// ============================================================================
// SEMANTIC SHADOWS (Usage intentions)
// ============================================================================

export const SEMANTIC_SHADOWS = {
  // Default state shadows
  default: SHADOWS.base, // Cards, panels, normal UI elements

  // Interactive state shadows
  hover: SHADOWS.md, // Hover states (slightly elevated)
  focus: SHADOWS.lg, // Focus states (clearly elevated for accessibility)
  active: SHADOWS.base, // Active states (same as default)

  // Disabled state (no elevation)
  disabled: SHADOWS.none,
} as const;
