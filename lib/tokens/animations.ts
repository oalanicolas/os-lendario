/**
 * ANIMATION SYSTEM
 *
 * Standardized animation durations, easing functions, and keyframes.
 * Ensures consistent, polished motion throughout the application.
 */

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const ANIMATION_DURATIONS = {
  // Instant (no visible animation, for accessibility)
  instant: '0ms',

  // Quick feedback (button clicks, immediate feedback)
  fast: '100ms',

  // Standard transition (default motion)
  normal: '200ms',

  // Deliberate motion (noticeable but not slow)
  slow: '300ms',

  // Emphasis (slow enough to notice, creates impact)
  slower: '500ms',

  // Very slow (attention-grabbing, loading spinners)
  slowest: '1000ms',
} as const;

// ============================================================================
// ANIMATION EASING FUNCTIONS
// ============================================================================

export const ANIMATION_EASING = {
  // No acceleration/deceleration (mechanical)
  linear: 'cubic-bezier(0, 0, 1, 1)',

  // Start slow, accelerate (natural entrance)
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',

  // Start fast, decelerate (natural exit)
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',

  // Both acceleration and deceleration (smooth transitions)
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Smooth, polished curve (Apple-like)
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

// ============================================================================
// ANIMATION KEYFRAMES (Reference definitions)
// ============================================================================

export const ANIMATION_KEYFRAMES = {
  // Fade in entrance
  fadeIn: {
    duration: ANIMATION_DURATIONS.normal,
    easing: ANIMATION_EASING.easeIn,
  },

  // Fade out exit
  fadeOut: {
    duration: ANIMATION_DURATIONS.normal,
    easing: ANIMATION_EASING.easeOut,
  },

  // Scale in (growing entrance)
  scaleIn: {
    duration: ANIMATION_DURATIONS.fast,
    easing: ANIMATION_EASING.easeOut,
  },

  // Slide in from right
  slideInRight: {
    duration: ANIMATION_DURATIONS.normal,
    easing: ANIMATION_EASING.easeOut,
  },

  // Pulse/heartbeat animation
  pulse: {
    duration: ANIMATION_DURATIONS.slowest,
    easing: ANIMATION_EASING.linear,
  },
} as const;

// ============================================================================
// SEMANTIC ANIMATIONS (Usage intentions)
// ============================================================================

export const SEMANTIC_ANIMATIONS = {
  // User interaction feedback (clicks, hovers)
  feedback: {
    duration: ANIMATION_DURATIONS.fast,
    easing: ANIMATION_EASING.easeOut,
  },

  // Regular transitions between states
  transition: {
    duration: ANIMATION_DURATIONS.normal,
    easing: ANIMATION_EASING.easeInOut,
  },

  // Component entrance animations
  entrance: {
    duration: ANIMATION_DURATIONS.normal,
    easing: ANIMATION_EASING.easeOut,
  },

  // Loading spinners, continuous motion
  loading: {
    duration: ANIMATION_DURATIONS.slowest,
    easing: ANIMATION_EASING.linear,
  },
} as const;
