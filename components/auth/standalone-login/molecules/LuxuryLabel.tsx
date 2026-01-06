/**
 * LuxuryLabel - Premium styled label component
 */

import React from 'react';
import type { LuxuryLabelProps } from '../types';

export const LuxuryLabel: React.FC<LuxuryLabelProps> = ({ children, htmlFor, extra }) => (
  <div className="mb-3 flex items-center justify-between">
    <label
      htmlFor={htmlFor}
      className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground sm:text-[11px]"
    >
      {children}
    </label>
    {extra}
  </div>
);
