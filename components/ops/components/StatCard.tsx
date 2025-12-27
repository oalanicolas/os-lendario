import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { cn } from '../../../lib/utils';
import { OPS_CARD_CLASSES } from '../ops-tokens';

interface StatCardProps {
  number: number | string;
  label: string;
  critical?: boolean;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label, critical, loading }) => (
  <Card className={cn(OPS_CARD_CLASSES, critical && "border-red-500/30")}>
    <CardContent className="p-3 text-center">
      <h3 className={cn("text-xl font-mono font-bold", critical ? "text-red-400" : "text-foreground")}>
        {loading ? <span className="animate-pulse">...</span> : number}
      </h3>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{label}</p>
    </CardContent>
  </Card>
);
