import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import { Select } from '../../../ui/select';
import { cn } from '../../../../lib/utils';
import { CourseCard } from '../ui/CourseCard';
import { CourseSidebar } from '../ui/CourseSidebar';
import { Course } from '../types';
import { RecentActivity } from '../../../../hooks/useRecentActivities';

export interface CoursesListViewProps {
  courses: Course[];
  isLoading: boolean;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  filterStatus: string;
  onFilterChange: (status: string) => void;
  onNewCourse: () => void;
  onSelectCourse: (slug: string) => void;
  recentActivities: RecentActivity[];
  activitiesLoading: boolean;
}

// Stats Card Component
interface StatsMetric {
  label: string;
  value: string | number;
  icon: string;
  change: string;
  changeLabel: string;
  trendUp: boolean;
  sparkline: string;
}

const StatsCard: React.FC<{ metric: StatsMetric }> = ({ metric }) => (
  <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-studio-primary/50">
    {/* Sparkline Background */}
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-10 transition-opacity group-hover:opacity-20">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
        <path d={`M0,30 L${metric.sparkline} L100,30 Z`} fill="hsl(var(--primary-color))" />
      </svg>
    </div>
    <CardContent className="relative z-10 flex items-start justify-between p-5">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {metric.label}
        </p>
        <h3 className="font-mono text-3xl font-medium text-foreground">{metric.value}</h3>
        <div className="mt-2 flex items-center gap-1">
          {metric.trendUp ? (
            <Icon name="trend-up" className="text-emerald-500" size="size-3" />
          ) : (
            <Icon name="minus" className="text-muted-foreground" size="size-3" />
          )}
          <span
            className={cn(
              'text-[10px] font-bold',
              metric.trendUp ? 'text-emerald-600' : 'text-muted-foreground'
            )}
          >
            {metric.change}
          </span>
          <span className="ml-1 text-[10px] text-muted-foreground">{metric.changeLabel}</span>
        </div>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-studio-accent text-studio-primary transition-colors">
        <Icon name={metric.icon} size="size-5" />
      </div>
    </CardContent>
  </Card>
);

// Pipeline Stage Component
interface PipelineStage {
  id: string;
  label: string;
  icon: string;
  count: number;
  status: 'active' | 'done' | 'pending';
}

const PipelineStageItem: React.FC<{ stage: PipelineStage }> = ({ stage }) => (
  <div className="group/step relative z-10 flex flex-col items-center gap-3">
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
        stage.status === 'active'
          ? 'scale-110 border-studio-primary bg-studio-primary text-white shadow-[0_0_20px_hsl(var(--primary-color)/.4)]'
          : stage.status === 'done'
            ? 'border-studio-primary bg-card text-studio-primary'
            : 'border-border bg-card text-muted-foreground group-hover/step:text-foreground'
      )}
    >
      {stage.status === 'done' ? (
        <Icon name="check" size="size-4" />
      ) : (
        <Icon name={stage.icon} size="size-4" />
      )}
    </div>
    <div className="text-center">
      <p
        className={cn(
          'mb-0.5 text-xs font-bold uppercase tracking-wider',
          stage.status === 'active' || stage.status === 'done'
            ? 'text-studio-primary'
            : 'text-muted-foreground'
        )}
      >
        {stage.label}
      </p>
      <p className="font-mono text-sm text-muted-foreground">{stage.count}</p>
    </div>
  </div>
);

// Loading Skeleton Component
const LoadingSkeleton: React.FC = () => (
  <div className="animate-fade-in space-y-6">
    {/* Stats skeleton */}
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-5">
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            <div className="h-3 w-20 animate-pulse rounded bg-muted/60" />
          </div>
        </Card>
      ))}
    </div>
    {/* Pipeline skeleton */}
    <Card className="p-6">
      <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" />
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            <div className="h-3 w-16 animate-pulse rounded bg-muted/60" />
          </div>
        ))}
      </div>
    </Card>
    {/* Course cards skeleton */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
      <div className="space-y-3 xl:col-span-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 animate-pulse rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                <div className="h-3 w-32 animate-pulse rounded bg-muted/60" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export const CoursesListView: React.FC<CoursesListViewProps> = ({
  courses,
  isLoading,
  viewMode,
  onViewModeChange,
  filterStatus,
  onFilterChange,
  onNewCourse: _onNewCourse,
  onSelectCourse: _onSelectCourse,
  recentActivities,
  activitiesLoading,
}) => {
  const navigate = useNavigate();

  // Calculate aggregated stats
  const totalLessons = courses.reduce((acc, c) => acc + c.lessonsCount, 0);
  // totalModules available for future use: courses.reduce((acc, c) => acc + c.modulesCount, 0)

  // Calculate pipeline counts
  const pipelineCounts = {
    briefing: courses.filter((c) => c.pipeline.brief === 'current').length,
    research: courses.filter((c) => c.pipeline.research === 'current').length,
    curriculum: courses.filter((c) => c.pipeline.curriculum === 'current').length,
    generation: courses.filter((c) => c.pipeline.lessons === 'current').length,
    validation: courses.filter((c) => c.pipeline.validation === 'current').length,
    published: courses.filter((c) => c.progress === 100).length,
  };

  // Stats metrics
  const statsMetrics: StatsMetric[] = [
    {
      label: 'Cursos Ativos',
      value: courses.length,
      icon: 'graduation-cap',
      change: '+12%',
      changeLabel: 'vs mes anterior',
      trendUp: true,
      sparkline: '0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0',
    },
    {
      label: 'Total de Licoes',
      value: totalLessons,
      icon: 'document',
      change: '+5',
      changeLabel: 'novas esta semana',
      trendUp: true,
      sparkline: '0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2',
    },
    {
      label: 'Horas de Conteudo',
      value: '28.8h',
      icon: 'clock',
      change: '--',
      changeLabel: '0% atualizado hoje',
      trendUp: false,
      sparkline: '0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15',
    },
    {
      label: 'Alunos Impactados',
      value: '3.2k',
      icon: 'users',
      change: '+15%',
      changeLabel: 'vs mes anterior',
      trendUp: true,
      sparkline: '0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0',
    },
  ];

  // Pipeline stages
  const pipelineStages: PipelineStage[] = [
    {
      id: 'briefing',
      label: 'BRIEFING',
      icon: 'file-edit',
      count: pipelineCounts.briefing || 8,
      status: 'active',
    },
    {
      id: 'research',
      label: 'PESQUISA',
      icon: 'search',
      count: pipelineCounts.research || 3,
      status: 'pending',
    },
    {
      id: 'curriculum',
      label: 'CURRICULO',
      icon: 'list',
      count: pipelineCounts.curriculum || 1,
      status: 'pending',
    },
    {
      id: 'generation',
      label: 'GERACAO',
      icon: 'magic-wand',
      count: pipelineCounts.generation || 2,
      status: 'pending',
    },
    {
      id: 'validation',
      label: 'VALIDACAO',
      icon: 'check-circle',
      count: pipelineCounts.validation || 0,
      status: 'pending',
    },
    {
      id: 'production',
      label: 'PRODUCAO',
      icon: 'video-camera',
      count: 4,
      status: 'pending',
    },
    {
      id: 'published',
      label: 'PUBLICADO',
      icon: 'rocket',
      count: pipelineCounts.published || 12,
      status: 'done',
    },
  ];

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Global Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsMetrics.map((metric, idx) => (
          <StatsCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Pipeline de Producao */}
      <Card className="group cursor-pointer border-border bg-card transition-colors hover:border-studio-primary/50">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-studio-primary">
              <Icon name="sitemap" size="size-4" /> Pipeline de Producao
            </h3>
            <Badge
              variant="outline"
              className="border-border text-muted-foreground transition-colors group-hover:border-studio-primary group-hover:text-studio-primary"
            >
              Clique para Gerenciar <Icon name="arrow-right" size="size-3" className="ml-2" />
            </Badge>
          </div>

          <div className="relative flex min-w-[700px] items-center justify-between">
            {/* Connecting line with progress */}
            <div className="absolute left-0 top-5 -z-0 h-0.5 w-full bg-muted">
              <div
                className="h-full bg-studio-primary transition-all duration-1000"
                style={{ width: '15%' }}
              />
            </div>

            {pipelineStages.map((stage) => (
              <PipelineStageItem key={stage.id} stage={stage} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        {/* Left: Course List */}
        <div className="space-y-4 xl:col-span-3">
          {/* Search + Filters */}
          <Card className="border-border/30 bg-card/50">
            <CardContent className="flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size="size-4"
                />
                <Input
                  placeholder="Buscar cursos..."
                  className="h-10 rounded-lg border-border/30 bg-muted/20 pl-10"
                />
              </div>
              <Select
                placeholder="Todos"
                value={filterStatus}
                onValueChange={onFilterChange}
                options={[
                  { label: 'Todos', value: 'all' },
                  { label: 'Publicados', value: 'published' },
                  { label: 'Em Producao', value: 'production' },
                ]}
                className="h-10 w-full sm:w-[120px]"
              />
              <div className="flex rounded-lg border border-border/30 bg-muted/20 p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8',
                    viewMode === 'list'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => onViewModeChange('list')}
                >
                  <Icon name="list" size="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8',
                    viewMode === 'grid'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => onViewModeChange('grid')}
                >
                  <Icon name="grid" size="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Course Cards - List or Grid */}
          <div
            className={cn(
              'transition-all duration-300',
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-3'
            )}
          >
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                viewMode={viewMode}
                onClick={(slug) => navigate(`/creator/cursos/${slug}`)}
              />
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <CourseSidebar recentActivities={recentActivities} activitiesLoading={activitiesLoading} />
      </div>
    </div>
  );
};

export default CoursesListView;
