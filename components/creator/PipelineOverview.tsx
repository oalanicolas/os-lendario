import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

type PipelineStage = 'brief' | 'research' | 'curriculum' | 'generation' | 'validation' | 'production' | 'published';

interface StageConfig {
  id: PipelineStage;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const STAGES: StageConfig[] = [
  { id: 'brief', label: 'Brief', icon: 'clipboard', color: 'text-gray-500', bgColor: 'bg-gray-500' },
  { id: 'research', label: 'Pesquisa', icon: 'search', color: 'text-blue-500', bgColor: 'bg-blue-500' },
  { id: 'curriculum', label: 'Curriculo', icon: 'list-ul', color: 'text-violet-500', bgColor: 'bg-violet-500' },
  { id: 'generation', label: 'Geracao', icon: 'magic-wand', color: 'text-purple-500', bgColor: 'bg-purple-500' },
  { id: 'validation', label: 'Validacao', icon: 'check-double', color: 'text-amber-500', bgColor: 'bg-amber-500' },
  { id: 'production', label: 'Producao', icon: 'video', color: 'text-orange-500', bgColor: 'bg-orange-500' },
  { id: 'published', label: 'Publicado', icon: 'rocket', color: 'text-emerald-500', bgColor: 'bg-emerald-500' },
];

interface PipelineStageProps {
  stage: StageConfig;
  count: number;
  isLast?: boolean;
}

const PipelineStageItem: React.FC<PipelineStageProps> = ({ stage, count, isLast }) => (
  <div className="flex items-center">
    <div className={cn(
      "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all cursor-default",
      count > 0 ? "bg-muted/50 hover:bg-muted" : "opacity-50"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        count > 0 ? stage.bgColor : "bg-muted"
      )}>
        <Icon
          name={stage.icon}
          className={cn("size-4", count > 0 ? "text-white" : "text-muted-foreground")}
        />
      </div>
      <span className={cn(
        "text-[10px] font-medium uppercase tracking-wide",
        count > 0 ? stage.color : "text-muted-foreground"
      )}>
        {stage.label}
      </span>
      <span className={cn(
        "text-sm font-bold font-mono",
        count > 0 ? "text-foreground" : "text-muted-foreground"
      )}>
        {count}
      </span>
    </div>
    {!isLast && (
      <div className="w-6 h-0.5 bg-border mx-1" />
    )}
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
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Icon name="sitemap" className="size-4 text-primary" />
            Pipeline de Producao
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {total} cursos no pipeline
          </span>
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
