import React from 'react';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import type { TableStatus } from '../data/tables';

interface StatusBadgeProps {
  status: TableStatus;
}

const configs = {
  ok: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'OK' },
  partial: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'PARCIAL' },
  empty: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'VAZIO' },
  proposed: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'PROPOSTO' }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const c = configs[status];
  return <Badge className={cn(c.bg, c.text, "text-[10px]")}>{c.label}</Badge>;
};
