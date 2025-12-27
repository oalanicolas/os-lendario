import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { STUDIO_PRIMARY, STUDIO_ACCENT } from './studio-tokens';

type PipelineStage =
  | 'brief'
  | 'research'
  | 'curriculum'
  | 'generation'
  | 'validation'
  | 'production'
  | 'published';

interface StageConfig {
  id: PipelineStage;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const STAGES: StageConfig[] = [
  {
    id: 'brief',
    label: 'Brief',
    icon: 'clipboard',
    color: 'text-gray-500',
    bgColor: 'bg-gray-500',
  },
  {
    id: 'research',
    label: 'Pesquisa',
    icon: 'search',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
  },
  {
    id: 'curriculum',
    label: 'Curriculo',
    icon: 'list-ul',
    color: STUDIO_PRIMARY,
    bgColor: STUDIO_PRIMARY,
  },
  {
    id: 'generation',
    label: 'Geracao',
    icon: 'magic-wand',
    color: STUDIO_ACCENT,
    bgColor: STUDIO_ACCENT,
  },
  {
    id: 'validation',
    label: 'Validacao',
    icon: 'check-double',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
  },
  {
    id: 'production',
    label: 'Producao',
    icon: 'video',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500',
  },
  {
    id: 'published',
    label: 'Publicado',
    icon: 'rocket',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500',
  },
];

interface PipelineStageProps {
  stage: StageConfig;
  count: number;
  isLast?: boolean;
}

const PipelineStageItem: React.FC<PipelineStageProps> = ({ stage, count, isLast }) => (
  <div className="flex items-center">
    <div
      className={cn(
        'flex cursor-default flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all',
        count > 0 ? 'bg-muted/50 hover:bg-muted' : 'opacity-50'
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full',
          count > 0 ? 'text-white' : 'bg-muted'
        )}
        style={{
          backgroundColor: count > 0 ? stage.bgColor : undefined,
        }}
      >
        <Icon
          name={stage.icon}
          className={cn('size-4', count > 0 ? 'text-white' : 'text-muted-foreground')}
        />
      </div>
      <span
        className={cn(
          'text-[10px] font-medium uppercase tracking-wide',
          count > 0 ? 'text-white' : 'text-muted-foreground'
        )}
        style={{
          color: count > 0 && typeof stage.color === 'string' && stage.color.startsWith('#') ? stage.color : undefined,
        }}
      >
        {stage.label}
      </span>
      <span
        className={cn(
          'font-mono text-sm font-bold',
          count > 0 ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {count}
      </span>
    </div>
    {!isLast && <div className="mx-1 h-0.5 w-6 bg-border" />}
  </div>
);

interface PipelineOverviewProps {
  stageCounts: Record<PipelineStage, number>;
  className?: string;
}

const PipelineOverview: React.FC<PipelineOverviewProps> = ({ stageCounts, className }) => {
  const total = Object.values(stageCounts).reduce((a, b) => a + b, 0);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Icon name="sitemap" className="size-4 " style={color: STUDIO_PRIMARY} />
            Pipeline de Producao
          </CardTitle>
          <span className="text-xs text-muted-foreground">{total} cursos no pipeline</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {STAGES.map((stage, idx) => (
            <PipelineStageItem
              key={stage.id}
              stage={stage}
              count={stageCounts[stage.id] || 0}
              isLast={idx === STAGES.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineOverview;
export type { PipelineStage };
