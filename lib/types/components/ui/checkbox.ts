/**
 * Checkbox Component Types
 */

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Is checkbox checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Show indeterminate state (partially checked)
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Default checked state
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Associated label ID
   */
  id?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}
