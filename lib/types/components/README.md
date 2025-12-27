# Component Types

Centralized location for all component prop interfaces. This prevents duplication and provides a single source of truth for component props.

## Directory Structure

```
types/components/
├── ui/                    # UI primitive components
│   ├── button.ts          # Button, ButtonProps
│   ├── card.ts            # Card, CardHeader, CardContent, etc.
│   ├── input.ts           # Input component props
│   ├── label.ts           # Label component props
│   ├── select.ts          # Select, SelectOption, SelectProps
│   ├── checkbox.ts        # Checkbox component props
│   ├── dialog.ts          # Dialog and Dialog sub-components
│   ├── avatar.ts          # Avatar, AvatarImage, AvatarFallback
│   ├── badge.ts           # Badge component props
│   ├── toast.ts           # Toast component props
│   └── index.ts           # UI components barrel export
├── forms/                 # Form-specific components (future)
├── features/              # Feature components (future)
├── components.ts          # Main barrel export
└── README.md              # This file
```

## Usage

### Import from main barrel

```typescript
import type { ButtonProps, CardProps, InputProps } from '@/lib/types/components';

// Use in component
function MyButton(props: ButtonProps) {
  // ...
}
```

### Import from specific component type file

```typescript
import type { ButtonProps } from '@/lib/types/components/ui/button';

function MyButton(props: ButtonProps) {
  // ...
}
```

### Import UI types barrel

```typescript
import type { ButtonProps, CardProps } from '@/lib/types/components/ui';
```

## Component Props Documentation

Each component type file includes:
- **Interface definition** with JSDoc comments
- **Property descriptions** with defaults
- **Type information** for all props
- **Extended interfaces** clearly documented

### Example: ButtonProps

```typescript
import type { ButtonProps } from '@/lib/types/components/ui/button';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Show loading spinner
   * @default false
   */
  isLoading?: boolean;

  /**
   * Visual variant style
   * @default 'default'
   */
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link' | 'glowing';

  /**
   * Button size
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
```

## Benefits

### For Developers
- Single source of truth for component props
- No need to search through component files
- Better IDE autocomplete and type hints
- Easy to discover available props

### For AI/LLMs
- Clear visibility of all component props
- No hallucination about non-existent props
- Structured documentation
- Consistent patterns across all components

### For Code Generation
- Type-safe prop generation
- Prevents invalid prop combinations
- Enables tooling (code generators, linters)

## Adding New Component Types

1. Create new file: `types/components/ui/your-component.ts`
2. Export interface(s):
   ```typescript
   export interface YourComponentProps extends React.HTMLAttributes<HTMLDivElement> {
     // Props with JSDoc comments
   }
   ```
3. Add to `types/components/ui/index.ts` barrel export
4. Add to `types/components.ts` main barrel export

## Naming Conventions

- Component types: `ComponentNameProps`
- Sub-component types: `ComponentNameSubComponentProps`
- Standalone interfaces: Clear, descriptive names
- Always export as `type`, never as `interface` from barrels

## Examples

### Button Component
```typescript
import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/lib/types/components/ui/button';

function MyButton(props: ButtonProps) {
  return <Button {...props} />;
}
```

### Card Component (Compound)
```typescript
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { CardProps, CardHeaderProps, CardContentProps } from '@/lib/types/components/ui/card';

function MyCard({ header, content }: { header: CardHeaderProps; content: CardContentProps }) {
  return (
    <Card>
      <CardHeader {...header} />
      <CardContent {...content} />
    </Card>
  );
}
```

### Dialog Component (Complex)
```typescript
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import type { DialogProps, DialogContentProps } from '@/lib/types/components/ui/dialog';

function MyDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent>
        {/* content */}
      </DialogContent>
    </Dialog>
  );
}
```

## Future Expansions

- [ ] Forms components (FormField, FormInput, etc.)
- [ ] Feature components (CourseCard, UserProfile, etc.)
- [ ] Template components
- [ ] Layout components

## Maintenance

- Keep types synchronized with component implementations
- Update JSDoc when props change
- Add new types for new components
- Review quarterly for duplicates
