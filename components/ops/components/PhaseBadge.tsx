import React from 'react';
import { getPhaseConfig } from '../ops-tokens';

interface PhaseBadgeProps {
  phase: number;
}

export const PhaseBadge: React.FC<PhaseBadgeProps> = ({ phase }) => {
  const config = getPhaseConfig(phase);
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-bold mr-2"
      style={{ backgroundColor: config.color, color: phase === 2 || phase === 3 || phase === 4 || phase === 6 ? '#000' : '#fff' }}
    >
      FASE {phase}
    </span>
  );
};
