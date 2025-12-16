import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';

interface RatingProps {
  max?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  className?: string;
  readOnly?: boolean;
}

const Rating: React.FC<RatingProps> = ({ max = 5, value = 0, onValueChange, className, readOnly = false }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={cn("flex items-center gap-1", className)} onMouseLeave={() => setHoverValue(null)}>
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        const isFilled = index <= displayValue;
        
        return (
          <button
            key={index}
            type="button"
            className={cn(
              "focus:outline-none transition-transform hover:scale-110",
              readOnly ? "cursor-default hover:scale-100" : "cursor-pointer"
            )}
            onClick={() => !readOnly && onValueChange?.(index)}
            onMouseEnter={() => !readOnly && setHoverValue(index)}
            disabled={readOnly}
          >
            <Icon 
                name="star" 
                size="size-5" 
                className={cn(
                    "transition-colors",
                    isFilled ? "text-brand-yellow dark:text-brand-yellow-dark fill-current" : "text-muted-foreground/30"
                )} 
            />
          </button>
        );
      })}
    </div>
  );
};

export { Rating };