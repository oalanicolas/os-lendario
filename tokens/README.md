# Design Tokens

This directory contains the semantic design tokens for AIOS-FULLSTACK UI.

## Colors

### Brand Colors

- `brand.primary` (#0066CC) — Primary interactive color (buttons, links)
- `brand.secondary` (#6B7280) — Secondary actions
- `brand.accent` (#C9B298) — Emphasis, highlights (warm gold tone)

### Semantic Colors

- `semantic.success` (#10B981) — Positive actions, confirmations
- `semantic.warning` (#F59E0B) — Cautions, warnings
- `semantic.error` (#EF4444) — Errors, destructive actions
- `semantic.info` (#3B82F6) — Informational messages

### Neutral Colors

- `neutral.textPrimary` (#111827) — Main text (h1-h3, body)
- `neutral.textSecondary` (#6B7280) — Secondary text (captions)
- `neutral.textDisabled` (#D1D5DB) — Disabled text
- `neutral.background` (#FFFFFF) — Page background
- `neutral.surface` (#F9FAFB) — Cards, panels
- `neutral.border` (#E5E7EB) — Borders, dividers

### State Colors

- `state.hover` — Hover background (8% primary overlay)
- `state.focus` — Focus ring (20% primary overlay)
- `state.active` — Active state (15% primary overlay)
- `state.disabled` (#D1D5DB) — Disabled elements

### Extended Palette

- `palette.red`, `palette.orange`, `palette.yellow`, etc. — Full color spectrum for visual richness

## Typography

### Font Families

- `fontFamily.primary` — Inter (body text, default)
- `fontFamily.secondary` — JetBrains Mono (code, technical content)
- `fontFamily.serif` — Source Serif 4 (long-form reading)
- `fontFamily.display` — Rajdhani (headings, display)

### Font Sizes

All sizes use rem units (base = 16px) for accessibility:

- `xs` (0.75rem / 12px) — Captions, small text
- `sm` (0.875rem / 14px) — Labels, secondary text
- `base` (1rem / 16px) — Body text, default
- `lg` (1.125rem / 18px) — Body emphasis
- `xl` (1.25rem / 20px) — Subheadings
- `2xl` (1.5rem / 24px) — h3
- `3xl` (1.875rem / 30px) — h2
- `4xl` (2.25rem / 36px) — h1

### Font Weights

- `light` (300) — Subtle text
- `normal` (400) — Body text
- `medium` (500) — Medium emphasis
- `semibold` (600) — Headings
- `bold` (700) — Strong emphasis

### Line Heights

- `tight` (1.2) — Headings
- `normal` (1.5) — Body text (best for readability)
- `relaxed` (1.75) — Longer paragraphs

### Letter Spacing

- `tight` (-0.01em) — Tight (headings)
- `normal` (0em) — Standard
- `wide` (0.02em) — Wide (all-caps)

### Predefined Styles

- `styles.h1` — Full h1 styling (2.25rem, 700, 1.2)
- `styles.h2` — Full h2 styling (1.875rem, 700, 1.2)
- `styles.h3` — Full h3 styling (1.5rem, 600, 1.3)
- `styles.body` — Full body styling (1rem, 400, 1.5)
- `styles.caption` — Full caption styling (0.875rem, 400, 1.4)

## Usage

### In Tailwind Classes

```tsx
// Colors
<button className="bg-brand-primary text-neutral-background">
  Click me
</button>

// Typography
<h1 className="text-4xl font-bold leading-tight">Page Title</h1>
<p className="text-base leading-normal font-normal">Body text</p>
<small className="text-sm text-neutral-textSecondary">Caption</small>

// State colors
<button className="bg-brand-primary hover:opacity-90 disabled:opacity-50">
  Stateful button
</button>
```

### In TypeScript

```tsx
import { colors, typography } from '@/tokens';

const buttonColor = colors.brand.primary; // '#0066CC'
const headingSize = typography.fontSize['2xl']; // '1.5rem'
const bodyFont = typography.fontFamily.primary;
```

### In CSS (CSS Variables)

CSS variables are available in Tailwind, use Tailwind classes instead for consistency.

## Rules

1. **Never hardcode colors** — Always use semantic tokens
2. **Never hardcode font sizes** — Always use token sizes from typography
3. **Use semantic names** — `brand-primary` not `color-blue`
4. **Maintain contrast** — All text ≥ 4.5:1 contrast ratio (WCAG AA)
5. **Respect rem units** — Font sizes use rem for accessibility
6. **Update Tailwind** — If adding new token, update `tailwind.config.ts`

## Exceptions

**Studio Tokens** — Dynamic colors set via CSS variables in `App.tsx`:

- `studio-primary`, `studio-secondary`, `studio-accent`
- `studio-bg`, `studio-card-bg`, `studio-border`
- `studio-text`, `studio-text-secondary`, `studio-text-muted`
- `status-success`, `status-warning`, `status-error`, `status-info`

These are managed separately and override default colors per Studio.

## Future Enhancements

- [ ] Add dark mode tokens (`colors.dark`)
- [ ] Add spacing tokens (padding, margin, gap)
- [ ] Add shadow tokens
- [ ] Add border-radius tokens
- [ ] Add animation/transition duration tokens
- [ ] Complete migration of all hardcoded colors

## Compliance

All colors meet WCAG 2.1 AA contrast requirements:

- Text on background: ≥ 4.5:1 contrast ratio
- UI components: ≥ 3:1 contrast ratio

Font sizes use rem units to respect user font size preferences and improve accessibility.
