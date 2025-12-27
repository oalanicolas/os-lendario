/**
 * Input Component Types
 */

/**
 * Props for the Input component
 *
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Show error state
   * @default false
   */
  error?: boolean;

  /**
   * Error message text
   */
  errorMessage?: string;

  /**
   * Show success state
   * @default false
   */
  success?: boolean;

  /**
   * Input size variant
   * @default 'md'
   */
  inputSize?: 'sm' | 'md' | 'lg';
}
