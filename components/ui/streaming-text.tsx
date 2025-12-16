import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface StreamingTextProps {
  text: string;
  speed?: number; // ms per char
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

export const StreamingText: React.FC<StreamingTextProps> = ({ 
  text, 
  speed = 20, 
  className, 
  onComplete,
  startDelay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let startTimeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    startTimeout = setTimeout(() => {
        setStarted(true);
        let i = 0;
        interval = setInterval(() => {
            setDisplayedText((prev) => {
                if (i >= text.length) {
                    clearInterval(interval);
                    if(onComplete) onComplete();
                    return text;
                }
                const nextChar = text.charAt(i);
                i++;
                return prev + nextChar;
            });
        }, speed);
    }, startDelay);

    return () => {
        clearTimeout(startTimeout);
        clearInterval(interval);
    };
  }, [text, speed, startDelay, onComplete]);

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary align-middle animate-pulse" />
      )}
    </span>
  );
};
