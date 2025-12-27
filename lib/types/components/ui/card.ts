/**
 * Card Component Types
 */

/**
 * Props for the Card component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Add elevation shadow
   * @default false
   */
  elevated?: boolean;

  /**
   * Make card interactive with hover state
   * @default false
   */
  interactive?: boolean;
}

/**
 * Props for the CardHeader component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding mode: compact, normal, or relaxed
   * @default 'normal'
   */
  padding?: 'compact' | 'normal' | 'relaxed';
}

/**
 * Props for the CardTitle component
 *
 * @extends React.HTMLAttributes<HTMLHeadingElement>
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic HTML heading level
   * @default 'h3'
   */
  level?: 'h2' | 'h3' | 'h4' | 'h5';
}

/**
 * Props for the CardDescription component
 *
 * @extends React.HTMLAttributes<HTMLParagraphElement>
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Props for the CardContent component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding mode: compact, normal, or relaxed
   * @default 'normal'
   */
  padding?: 'compact' | 'normal' | 'relaxed';
}

/**
 * Props for the CardFooter component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
