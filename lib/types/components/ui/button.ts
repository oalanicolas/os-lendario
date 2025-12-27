/**
 * Button Component Types
 */

/**
 * Props for the Button component
 *
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Render as child element instead of button
   * @default false
   */
  asChild?: boolean;

  /**
   * Visual variant style
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glowing' | null | undefined;

  /**
   * Button size
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;

  /**
   * Show loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Loading text to display
   */
  loadingText?: string;
}
