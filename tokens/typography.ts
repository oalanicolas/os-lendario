// Typography System
// Based on AIOS-FULLSTACK design system

export const typography = {
  // ===== FONT FAMILIES =====
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    secondary: '"JetBrains Mono", "Courier New", monospace',
    serif: '"Source Serif 4", serif',
    display: 'Rajdhani, sans-serif',
  },

  // ===== FONT SIZES (in rem, base = 16px) =====
  fontSize: {
    xs: '0.75rem', // 12px (captions, small text)
    sm: '0.875rem', // 14px (labels, secondary text)
    base: '1rem', // 16px (body text, default)
    lg: '1.125rem', // 18px (body emphasis)
    xl: '1.25rem', // 20px (subheadings)
    '2xl': '1.5rem', // 24px (headings, h3)
    '3xl': '1.875rem', // 30px (section heading, h2)
    '4xl': '2.25rem', // 36px (page heading, h1)
  },

  // ===== FONT WEIGHTS =====
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // ===== LINE HEIGHTS (unitless) =====
  lineHeight: {
    tight: 1.2, // Headings
    normal: 1.5, // Body text (best for readability)
    relaxed: 1.75, // Longer paragraphs
  },

  // ===== LETTER SPACING (in em) =====
  letterSpacing: {
    tight: '-0.01em', // Tight (headings)
    normal: '0em', // Standard
    wide: '0.02em', // Wide (all-caps)
  },

  // ===== PREDEFINED STYLES (utility) =====
  styles: {
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
} as const;

// ===== TAILWIND COMPATIBLE =====
// Use in tailwind.config.ts:
// fontFamily: typography.fontFamily,
// fontSize: typography.fontSize,
// fontWeight: typography.fontWeight,
// lineHeight: typography.lineHeight,
// letterSpacing: typography.letterSpacing,
