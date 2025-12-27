/**
 * Select Component Types
 */

/**
 * Option for Select component
 */
export interface SelectOption {
  /**
   * Display label for the option
   */
  label: string;

  /**
   * Internal value of the option
   */
  value: string;

  /**
   * Mark option as disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Props for the Select component
 */
export interface SelectProps {
  /**
   * Available options to select from
   */
  options: SelectOption[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Callback when selection changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Placeholder text when nothing selected
   * @default 'Selecione...'
   */
  placeholder?: string;

  /**
   * Disable the select
   * @default false
   */
  disabled?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Allow search in options
   * @default true
   */
  searchable?: boolean;

  /**
   * Allow multiple selections
   * @default false
   */
  multiple?: boolean;

  /**
   * Clear button visibility
   * @default false
   */
  clearable?: boolean;
}
