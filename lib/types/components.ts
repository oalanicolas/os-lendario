/**
 * COMPONENT TYPES - MAIN BARREL EXPORT
 *
 * Central export point for all component prop types.
 * Prevents scattered Props interfaces and provides single source of truth.
 */

// UI Components
export type { ButtonProps } from './components/ui/button';
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './components/ui/card';
export type { InputProps } from './components/ui/input';
export type { LabelProps } from './components/ui/label';
export type { SelectProps, SelectOption } from './components/ui/select';
export type { CheckboxProps } from './components/ui/checkbox';
export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from './components/ui/dialog';
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from './components/ui/avatar';
export type { BadgeProps } from './components/ui/badge';
export type { ToastProps, ToastAction } from './components/ui/toast';

// Re-export all UI types barrel
export type * from './components/ui';
