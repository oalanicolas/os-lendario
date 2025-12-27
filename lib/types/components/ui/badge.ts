/**
 * Badge Component Types
 */

/**
 * Props for the Badge component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant style
   * @default 'default'
   */
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Badge content/text
   */
  children?: React.ReactNode;

  /**
   * Make badge dismissible (with close button)
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
