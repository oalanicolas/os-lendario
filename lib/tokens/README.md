# Design Token System

Complete design token system for consistent, maintainable UI development.

## Overview

The token system provides a single source of truth for all design values:
- **Colors**: Brand palette, studio themes, semantic colors
- **Spacing**: Consistent scale for gaps, padding, margins
- **Shadows**: Elevation system for depth and hierarchy
- **Border Radius**: Roundness scale for all rounded elements
- **Animations**: Durations, easing functions, and keyframes

All tokens are available as:
- TypeScript constants (for direct use)
- Tailwind CSS classes (for styling)
- CSS variables (for advanced customization)

## Directory Structure

```
lib/tokens/
├── colors.ts          # Studio palettes, brand colors, semantic colors
├── spacing.ts         # Spacing scale (xs-8xl) + semantic gaps/padding/margin
├── shadows.ts         # Elevation system (sm-2xl) + semantic shadows
├── borderRadius.ts    # Roundness scale (none-full) + semantic border radius
├── animations.ts      # Animation durations, easing, keyframes
├── index.ts           # Barrel export - import all tokens here
└── README.md          # This file
```

## Token Files

### colors.ts

**Studio Palettes** (Dynamic per active studio)
- `STUDIO_TOKENS` - 6 complete themes (design-system, app_creator, studio_prd, template_sales, app_minds, template_marketing)
- `applyStudioTokens()` - Apply palette as CSS variables

**Semantic Colors** (Fixed, brand-wide)
- `colors` - Brand palette, semantic colors (success/warning/error/info), neutral colors, state colors
- `typography` - Font families, sizes, weights, line heights

### spacing.ts

**Primitive Scale**
```typescript
SPACING = {
  xs: '0.125rem',  // 2px
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  base: '1rem',    // 16px
  xl: '1.5rem',    // 24px
  // ... up to 8xl (128px)
}
```

**Semantic Usage**
```typescript
SEMANTIC_SPACING = {
  gap: { compact, normal, relaxed, loose },
  padding: { compact, normal, relaxed },
  margin: { compact, normal, relaxed },
}
```

### shadows.ts

**Elevation Levels**
```typescript
SHADOWS = {
  none: 'none',           // No shadow
  sm: '0 1px 2px ...',    // Level 1: Subtle
  base: '...',            // Level 2: Default (cards)
  md: '...',              // Level 3: Floating
  lg: '...',              // Level 4: Elevated
  xl: '...',              // Level 5: High
  '2xl': '...',           // Level 6: Maximum
  inner: 'inset ...',     // Special: Inset
}
```

**Semantic Usage**
```typescript
SEMANTIC_SHADOWS = {
  default: SHADOWS.base,  // Normal UI elements
  hover: SHADOWS.md,      // Hover states
  focus: SHADOWS.lg,      // Focus states
  active: SHADOWS.base,
  disabled: SHADOWS.none,
}
```

### borderRadius.ts

**Roundness Scale**
```typescript
BORDER_RADIUS = {
  none: '0',           // 0px (sharp)
  xs: '0.125rem',      // 2px
  sm: '0.25rem',       // 4px
  md: '0.375rem',      // 6px
  base: '0.5rem',      // 8px (default)
  lg: '0.75rem',       // 12px
  xl: '1rem',          // 16px
  '2xl': '1.25rem',    // 20px
  '3xl': '1.5rem',     // 24px
  '4xl': '2rem',       // 32px
  full: '9999px',      // Circles/pills
}
```

**Semantic Usage**
```typescript
SEMANTIC_BORDER_RADIUS = {
  button: BORDER_RADIUS.md,      // 6px
  card: BORDER_RADIUS.lg,        // 12px
  input: BORDER_RADIUS.md,       // 6px
  modal: BORDER_RADIUS.xl,       // 16px
  badge: BORDER_RADIUS.sm,       // 4px
  avatar: BORDER_RADIUS.full,    // 100%
  dialog: BORDER_RADIUS.xl,      // 16px
}
```

### animations.ts

**Durations**
```typescript
ANIMATION_DURATIONS = {
  instant: '0ms',      // No animation
  fast: '100ms',       // Quick feedback
  normal: '200ms',     // Standard (default)
  slow: '300ms',       // Deliberate
  slower: '500ms',     // Emphasis
  slowest: '1000ms',   // Very slow (loading)
}
```

**Easing Functions**
```typescript
ANIMATION_EASING = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}
```

**Semantic Usage**
```typescript
SEMANTIC_ANIMATIONS = {
  feedback: { duration: fast, easing: easeOut },
  transition: { duration: normal, easing: easeInOut },
  entrance: { duration: normal, easing: easeOut },
  loading: { duration: slowest, easing: linear },
}
```

## Usage Examples

### TypeScript (Direct Import)

```typescript
import {
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
  ANIMATION_DURATIONS,
} from 'lib/tokens';

// Use directly in styles
const styles = {
  gap: SPACING.md,           // '0.5rem' (8px)
  padding: SPACING.base,     // '1rem' (16px)
  boxShadow: SHADOWS.lg,     // Elevated shadow
  borderRadius: BORDER_RADIUS.lg, // 12px
  transition: `all ${ANIMATION_DURATIONS.normal} ease-in-out`,
};
```

### Tailwind CSS (Classes)

```tsx
// Spacing
<div className="p-base gap-md">...</div>  // padding: 1rem, gap: 0.5rem
<div className="m-xl">...</div>           // margin: 1.5rem

// Shadows
<div className="shadow-md hover:shadow-lg">...</div>  // Hover elevation

// Border Radius
<button className="rounded-md">Button</button>      // 6px
<div className="rounded-lg">Card</div>              // 12px
<div className="rounded-full">Avatar</div>          // Circle

// Animations
<div className="transition-all duration-normal ease-in-out">...</div>
<div className="animate-pulse-slow">Loading...</div>
```

### CSS Variables (Advanced)

For custom styling when Tailwind isn't sufficient:

```css
.custom-element {
  padding: var(--padding-normal, 1rem);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-lg);
  transition: all var(--duration-normal) var(--easing-smooth);
}
```

## Design Principles

### Spacing
- **Purpose**: Create visual rhythm and alignment
- **Scale**: Fibonacci-based for natural progression
- **Usage**: Use semantic names (gap, padding, margin) when possible

### Shadows
- **Purpose**: Communicate depth and hierarchy
- **Elevation**: 6 levels (sm-2xl) + special inner shadow
- **Usage**: Match shadow to component importance/state

### Border Radius
- **Purpose**: Soften appearance and guide user attention
- **Consistency**: Use semantic names (button, card, modal, avatar)
- **Balance**: Sharp for technical, rounded for friendly

### Animations
- **Purpose**: Provide feedback and guide user attention
- **Duration**: Fast (100ms) for feedback, normal (200ms) for transitions
- **Easing**: easeOut for entrances, easeInOut for transitions

## Integration

All tokens are automatically integrated with:
- ✅ **TypeScript** - Full type support
- ✅ **Tailwind CSS** - Available as utilities in `extend`
- ✅ **CSS Variables** - Applied to `:root` when studio theme changes

## Adding New Tokens

1. Create new token file in `lib/tokens/` following existing structure
2. Export from `lib/tokens/index.ts`
3. Add to `tailwind.config.ts` extend section
4. Document in this README
5. Update story 3.2 completion notes

## Backward Compatibility

- Old imports from `lib/tokens.ts` still work (re-exports from `lib/tokens/index.ts`)
- Migration path is gradual - both old and new imports supported
- No breaking changes to existing components

## Related Documentation

- **Architecture**: See `docs/architecture/` for system design
- **Components**: See component Storybook for usage examples
- **Design System**: See design-system studio for visual reference
