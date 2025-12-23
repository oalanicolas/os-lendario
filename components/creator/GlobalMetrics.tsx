import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  icon: string;
  value: number | string;
  label: string;
  color: string;
  trend?: { value: number; isPositive: boolean };
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color, trend }) => (
  <Card className="transition-colors hover:border-primary/30">
    <CardContent className="flex items-center gap-3 p-4">
      <div className={cn('rounded-md p-2', color)}>
        <Icon name={icon} className="size-5 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold tracking-tight">{value}</span>
          {trend && (
            <span
              className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </span>
          )}
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
    </CardContent>
  </Card>
);

interface GlobalMetricsProps {
  coursesCount: number;
  lessonsCount: number;
  totalHours: number | string;
  mindsCount: number;
  className?: string;
}

const GlobalMetrics: React.FC<GlobalMetricsProps> = ({
  coursesCount,
  lessonsCount,
  totalHours,
  mindsCount,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>
      <MetricCard icon="graduation-cap" value={coursesCount} label="Cursos" color="bg-blue-500" />
      <MetricCard icon="document" value={lessonsCount} label="Licoes" color="bg-purple-500" />
      <MetricCard
        icon="clock"
        value={typeof totalHours === 'number' ? `${totalHours}h` : totalHours}
        label="Conteudo"
        color="bg-amber-500"
      />
      <MetricCard icon="user-circle" value={mindsCount} label="MMOS Minds" color="bg-emerald-500" />
    </div>
  );
};

export default GlobalMetrics;
