import React from 'react';
import { cn } from '../../lib/utils';

interface AudioVisualizerProps {
  state?: 'idle' | 'listening' | 'speaking' | 'processing';
  barCount?: number;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  state = 'idle', 
  barCount = 5,
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-1 h-12", className)}>
      {Array.from({ length: barCount }).map((_, i) => {
        // Animation delay staggered from center outward
        const centerIndex = Math.floor(barCount / 2);
        const dist = Math.abs(i - centerIndex);
        const delay = dist * 0.1;

        return (
          <div
            key={i}
            className={cn(
              "w-1.5 rounded-full bg-primary transition-all duration-300 ease-in-out",
              state === 'idle' && "h-1.5 opacity-50",
              state === 'listening' && "h-3 animate-pulse opacity-80",
              state === 'speaking' && "animate-[shimmer_0.5s_infinite_alternate] h-8",
              state === 'processing' && "animate-spin-slow h-1.5 w-1.5 rounded-sm"
            )}
            style={{
              animationDelay: state === 'speaking' ? `${i * 0.1}s` : undefined,
              height: state === 'speaking' ? undefined : undefined // Let class handle it or random
            }}
          >
             {state === 'speaking' && (
                 <style dangerouslySetInnerHTML={{__html: `
                    @keyframes visualizer-${i} {
                        0% { height: 10%; opacity: 0.5; }
                        50% { height: ${50 + Math.random() * 50}%; opacity: 1; }
                        100% { height: 10%; opacity: 0.5; }
                    }
                 `}} />
             )}
             <div 
                className={cn("w-full h-full rounded-full", state === 'speaking' ? `animate-[visualizer-${i}_${0.4 + Math.random() * 0.2}s_ease-in-out_infinite]` : "")}
                style={{ backgroundColor: 'currentColor' }}
             />
          </div>
        );
      })}
    </div>
  );
};
