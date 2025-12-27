/**
 * Label Component Types
 */

/**
 * Props for the Label component
 *
 * @extends React.LabelHTMLAttributes<HTMLLabelElement>
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Associated input element ID
   */
  htmlFor?: string;

  /**
   * Mark field as required
   * @default false
   */
  required?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'default' | 'secondary';
}
