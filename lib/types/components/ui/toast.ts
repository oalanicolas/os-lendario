/**
 * Toast Component Types
 */

/**
 * Props for the Toast component
 */
export interface ToastProps {
  /**
   * Unique identifier for toast
   */
  id: string;

  /**
   * Toast title
   */
  title?: React.ReactNode;

  /**
   * Toast description/message
   */
  description?: React.ReactNode;

  /**
   * Action button or element
   */
  action?: React.ReactNode;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'success' | 'warning';

  /**
   * Is toast open
   * @default true
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Callback when toast closes
   */
  onClose?: () => void;

  /**
   * Auto-close duration in milliseconds
   * @default 5000
   */
  duration?: number;

  /**
   * Position on screen
   * @default 'bottom-right'
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

/**
 * Toast action configuration
 */
export interface ToastAction {
  /**
   * Action label
   */
  label: string;

  /**
   * Action callback
   */
  onClick?: () => void;
}
