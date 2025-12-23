// Semantic Color System
// Based on AIOS-FULLSTACK design system in /docs/ux/

export const colors = {
  // ===== BRAND COLORS =====
  brand: {
    primary: '#0066CC', // Blue (interactive, buttons, links)
    secondary: '#6B7280', // Gray (supporting actions)
    accent: '#C9B298', // Warm (highlights, emphasis)
    gold: '#C9B298', // Warm gold tone
  },

  // ===== SEMANTIC COLORS =====
  semantic: {
    success: '#10B981', // Green (confirmations, positive)
    warning: '#F59E0B', // Amber (cautions, warnings)
    error: '#EF4444', // Red (errors, destructive)
    info: '#3B82F6', // Blue (informational)
  },

  // ===== NEUTRAL COLORS =====
  neutral: {
    background: '#FFFFFF', // Page background
    surface: '#F9FAFB', // Card/component background
    border: '#E5E7EB', // Borders, dividers
    textPrimary: '#111827', // Main text (h1-h3, body)
    textSecondary: '#6B7280', // Secondary text (captions, meta)
    textDisabled: '#D1D5DB', // Disabled text
  },

  // ===== STATE COLORS =====
  state: {
    hover: 'rgba(0, 102, 204, 0.08)', // Hover background
    focus: 'rgba(0, 102, 204, 0.2)', // Focus ring
    disabled: '#D1D5DB', // Disabled state
    active: 'rgba(0, 102, 204, 0.15)', // Active state
  },

  // ===== EXTENDED BRAND PALETTE =====
  // Apple-style extended palette for visual richness
  palette: {
    red: { DEFAULT: '#FF3B30', dark: '#FF453A' },
    orange: { DEFAULT: '#FF9500', dark: '#FF9F0A' },
    yellow: { DEFAULT: '#FFCC00', dark: '#FFD60A' },
    green: { DEFAULT: '#34C759', dark: '#30D158' },
    mint: { DEFAULT: '#00C7BE', dark: '#63E6E2' },
    teal: { DEFAULT: '#30B0C7', dark: '#40C8E0' },
    cyan: { DEFAULT: '#32ADE6', dark: '#64D2FF' },
    blue: { DEFAULT: '#007AFF', dark: '#0A84FF' },
    indigo: { DEFAULT: '#5856D6', dark: '#5E5CE6' },
    pink: { DEFAULT: '#FF2D55', dark: '#FF375F' },
    brown: { DEFAULT: '#A2845E', dark: '#AC8E68' },
  },

  // ===== DARK MODE =====
  dark: {
    background: '#1F2937',
    surface: '#111827',
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
  },
} as const;

// ===== TAILWIND COMPATIBLE =====
// Use in tailwind.config.ts:
// colors: {
//   brand: colors.brand,
//   semantic: colors.semantic,
//   neutral: colors.neutral,
//   state: colors.state,
// }
