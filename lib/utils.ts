import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strip markdown syntax from text to get plain text
 * Used for summaries and descriptions that should display as plain text
 */
export function stripMarkdown(text: string): string {
  return (
    text
      // Remove headers (## Header)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic (**text** or *text* or __text__ or _text_)
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove strikethrough (~~text~~)
      .replace(/~~(.*?)~~/g, '$1')
      // Remove inline code (`code`)
      .replace(/`([^`]+)`/g, '$1')
      // Remove links [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove images ![alt](url)
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      // Remove blockquotes (> text)
      .replace(/^>\s+/gm, '')
      // Remove horizontal rules (---, ***, ___)
      .replace(/^[-*_]{3,}\s*$/gm, '')
      // Remove list markers (- item, * item, 1. item)
      .replace(/^[\s]*[-*+]\s+/gm, '')
      .replace(/^[\s]*\d+\.\s+/gm, '')
      // Clean up extra whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}
