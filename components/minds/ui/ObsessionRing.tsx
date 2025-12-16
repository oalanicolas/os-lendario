import React from 'react';
import { cn } from '../../../lib/utils';

interface ObsessionRingProps {
  name: string;
  intensity: number; // 1-10
}

export const ObsessionRing: React.FC<ObsessionRingProps> = ({ name, intensity }) => {
  // Normalize intensity to percentage (1-10 -> 10-100%)
  const percentage = Math.min(Math.max(intensity, 1), 10) * 10;

  // Calculate stroke dasharray for the progress ring
  const circumference = 2 * Math.PI * 36; // radius = 36
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color based on intensity
  const getColor = (intensity: number) => {
    if (intensity >= 8) return 'text-red-500';
    if (intensity >= 6) return 'text-orange-500';
    if (intensity >= 4) return 'text-yellow-500';
    return 'text-blue-500';
  };

  const getStrokeColor = (intensity: number) => {
    if (intensity >= 8) return '#ef4444';
    if (intensity >= 6) return '#f97316';
    if (intensity >= 4) return '#eab308';
    return '#3b82f6';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        {/* Background ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-white/5"
          />
          {/* Progress ring */}
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={getStrokeColor(intensity)}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-lg font-bold font-mono", getColor(intensity))}>
            {intensity}
          </span>
        </div>
      </div>
      <span className="text-xs text-zinc-400 text-center max-w-[80px] truncate" title={name}>
        {name}
      </span>
    </div>
  );
};

export default ObsessionRing;
