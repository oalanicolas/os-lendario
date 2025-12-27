/**
 * Dialog Component Types
 */

/**
 * Props for the Dialog component (container)
 */
export interface DialogProps {
  /**
   * Is dialog open
   * @default false
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Close dialog on ESC key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Close dialog on background click
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Dialog title for accessibility
   */
  title?: string;

  /**
   * Dialog description for accessibility
   */
  description?: string;

  /**
   * Children content
   */
  children?: React.ReactNode;
}

/**
 * Props for the DialogTrigger component
 *
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Render as child element instead of button
   * @default false
   */
  asChild?: boolean;
}

/**
 * Props for the DialogContent component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dialog title for accessibility
   */
  title?: string;

  /**
   * Dialog description for accessibility
   */
  description?: string;

  /**
   * Close button visibility
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Children content
   */
  children?: React.ReactNode;

  /**
   * Close dialog callback
   */
  onClose?: () => void;
}

/**
 * Props for the DialogHeader component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the DialogTitle component
 *
 * @extends React.HTMLAttributes<HTMLHeadingElement>
 */
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Props for the DialogDescription component
 *
 * @extends React.HTMLAttributes<HTMLParagraphElement>
 */
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Props for the DialogFooter component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the DialogClose component
 *
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Render as child element instead of button
   * @default false
   */
  asChild?: boolean;
}
