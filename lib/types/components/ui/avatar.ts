/**
 * Avatar Component Types
 */

/**
 * Props for the Avatar component
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of avatar
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Avatar shape
   * @default 'circle'
   */
  shape?: 'circle' | 'square';

  /**
   * Children content (image or fallback)
   */
  children?: React.ReactNode;
}

/**
 * Props for the AvatarImage component
 *
 * @extends React.ImgHTMLAttributes<HTMLImageElement>
 */
export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for image
   */
  alt?: string;

  /**
   * Callback when image fails to load
   */
  onError?: () => void;

  /**
   * Callback when image loads
   */
  onLoad?: () => void;
}

/**
 * Props for the AvatarFallback component
 *
 * @extends React.HTMLAttributes<HTMLSpanElement>
 */
export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Fallback content (initials, text, etc)
   */
  children?: React.ReactNode;

  /**
   * Background color class
   */
  className?: string;
}
