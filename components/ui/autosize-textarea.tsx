import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface AutosizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
}

export const AutosizeTextarea = React.forwardRef<HTMLTextAreaElement, AutosizeTextareaProps>(
  ({ className, maxHeight = 200, value, onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Combine refs
    const setRef = (element: HTMLTextAreaElement) => {
      textareaRef.current = element;
      if (typeof ref === 'function') ref(element);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = element;
    };

    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;
      }
    };

    useEffect(() => {
      adjustHeight();
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (onChange) onChange(e);
    };

    return (
      <textarea
        ref={setRef}
        onChange={handleChange}
        value={value}
        className={cn(
          'flex w-full resize-none overflow-hidden rounded-md border border-input bg-background px-3 py-2 font-sans text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        rows={1}
        {...props}
      />
    );
  }
);

AutosizeTextarea.displayName = 'AutosizeTextarea';
