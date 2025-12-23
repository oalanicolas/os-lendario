// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus, PRDProject } from '../../../types/prd';
import { usePRDProjects } from '../../../hooks/prd/usePRDProjects';
import {
  PRD_PRIMARY,
  PRD_ACCENT,
  PRD_STATUS,
  PRD_PIPELINE_STAGES,
  getProgressPercentage,
} from '../prd-tokens';
import PRDTopbar from '../PRDTopbar';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Select } from '../../ui/select';
import { Progress } from '../../ui/progress';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface PRDDashboardTemplateProps {
  setSection: (section: Section) => void;
}

// =============================================================================
// HELPERS
// =============================================================================

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;
  return date.toLocaleDateString('pt-BR');
};

const getStatusLabel = (status: PRDStatus): string => {
  const labels: Record<PRDStatus, string> = {
    upload: 'Upload',
    brief: 'Brief',
    prd: 'PRD',
    epics: 'Épicos',
    stories: 'Stories',
    exported: 'Exportado',
  };
  return labels[status] || status;
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

// Loading Skeleton
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
    <div className="space-y-3">
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
);

// Empty State
const EmptyState: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => (
  <div className="flex min-h-[50vh] animate-fade-in flex-col items-center justify-center space-y-6 text-center">
    <div
      className="flex h-24 w-24 items-center justify-center rounded-2xl"
      style={{ backgroundColor: `${PRD_PRIMARY}20` }}
    >
      <Icon name="clipboard-list" size="size-12" style={{ color: PRD_PRIMARY }} />
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-foreground">Nenhum projeto PRD ainda</h2>
      <p className="max-w-md text-muted-foreground">
        Comece criando seu primeiro documento de requisitos. O PRD Studio vai te guiar em cada
        etapa.
      </p>
    </div>
    <Button onClick={onCreateClick} className="shadow-lg" style={{ backgroundColor: PRD_PRIMARY }}>
      <Icon name="plus" className="mr-2 size-4" />
      Criar Primeiro Projeto
    </Button>
  </div>
);

// Metrics Row
const MetricsRow: React.FC<{
  totalProjects: number;
  projectsByStatus: Record<PRDStatus, number>;
}> = ({ totalProjects, projectsByStatus }) => {
  const inProgress =
    projectsByStatus.upload +
    projectsByStatus.brief +
    projectsByStatus.prd +
    projectsByStatus.epics +
    projectsByStatus.stories;
  const exported = projectsByStatus.exported;

  const metrics = [
    { label: 'Total de Projetos', value: totalProjects, icon: 'folder', color: PRD_PRIMARY },
    { label: 'Em Progresso', value: inProgress, icon: 'clock', color: '#3B82F6' },
    { label: 'Exportados', value: exported, icon: 'check-circle', color: '#10B981' },
    {
      label: 'Taxa de Conclusão',
      value: totalProjects > 0 ? `${Math.round((exported / totalProjects) * 100)}%` : '0%',
      icon: 'chart-pie',
      color: PRD_ACCENT,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric, idx) => (
        <Card
          key={idx}
          className="group border-border bg-card transition-all hover:border-[#538096]/50"
        >
          <CardContent className="flex items-start justify-between p-5">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {metric.label}
              </p>
              <h3 className="font-mono text-3xl font-medium text-foreground">{metric.value}</h3>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
            >
              <Icon name={metric.icon} size="size-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Pipeline Visual
const PipelineVisual: React.FC<{ projectsByStatus: Record<PRDStatus, number> }> = ({
  projectsByStatus,
}) => (
  <Card className="border-border bg-card transition-colors hover:border-[#538096]/50">
    <CardContent className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Icon name="sitemap" size="size-4" /> Pipeline de Produção PRD
        </h3>
      </div>

      <div className="relative flex items-center justify-between">
        {/* Connecting line */}
        <div className="absolute left-0 top-5 -z-0 h-0.5 w-full bg-muted" />

        {PRD_PIPELINE_STAGES.map((stage) => {
          const count = projectsByStatus[stage.key] || 0;
          const hasProjects = count > 0;
          const statusConfig = PRD_STATUS[stage.key];

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                  hasProjects
                    ? 'scale-110 text-white shadow-lg'
                    : 'border-border bg-card text-muted-foreground'
                )}
                style={
                  hasProjects
                    ? {
                        backgroundColor: PRD_PRIMARY,
                        borderColor: PRD_PRIMARY,
                        boxShadow: `0 0 20px ${PRD_PRIMARY}40`,
                      }
                    : undefined
                }
              >
                <Icon name={stage.icon} size="size-4" />
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    'mb-0.5 text-xs font-bold uppercase tracking-wider',
                    hasProjects ? '' : 'text-muted-foreground'
                  )}
                  style={hasProjects ? { color: PRD_PRIMARY } : undefined}
                >
                  {stage.label}
                </p>
                <p className="font-mono text-sm text-muted-foreground">{count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

// Project Card
const ProjectCard: React.FC<{ project: PRDProject; viewMode: 'list' | 'grid' }> = ({
  project,
  viewMode,
}) => {
  const navigate = useNavigate();
  const status = project.status as PRDStatus;
  const statusConfig = PRD_STATUS[status] || PRD_STATUS.upload;
  const progress = getProgressPercentage(status);
  const prdType = project.project_metadata?.prdType || 'project';

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden border-border bg-card transition-all hover:shadow-md"
      onClick={() => navigate(`/prd/${project.slug}`)}
    >
      {/* Hover Border Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors group-hover:border-[#538096]/30" />

      <CardContent className={cn('p-4', viewMode === 'grid' && 'p-5')}>
        <div className={cn('flex gap-4', viewMode === 'grid' ? 'flex-col' : 'items-center')}>
          {/* Icon Box */}
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-[#538096] group-hover:text-white',
              viewMode === 'grid' ? 'h-14 w-14' : 'h-12 w-12'
            )}
            style={{ backgroundColor: PRD_ACCENT, color: PRD_PRIMARY }}
          >
            <Icon name={prdType === 'task' ? 'check-square' : 'folder'} size="size-5" />
          </div>

          {/* Title + Meta */}
          <div className={cn('min-w-0 flex-1', viewMode === 'grid' && 'w-full')}>
            <div
              className={cn(
                'mb-1.5 flex gap-2',
                viewMode === 'grid' ? 'items-start justify-between' : 'items-center'
              )}
            >
              <h4 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-[#538096]">
                {project.name}
              </h4>
            </div>

            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="h-4 border-[#538096]/30 bg-[#538096]/5 px-1.5 text-[9px] text-[#538096]"
              >
                {prdType === 'task' ? 'Task' : 'Projeto'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(project.updated_at)}
              </span>
            </div>

            {viewMode === 'list' && (
              <div className="hidden md:block">
                <Progress value={progress} className="h-1.5 w-32 bg-muted" />
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div
            className={cn(
              'flex shrink-0 items-center gap-2',
              viewMode === 'grid'
                ? 'mt-auto w-full justify-between border-t border-border pt-3'
                : ''
            )}
          >
            <Badge
              className={cn(
                statusConfig.bg,
                statusConfig.text,
                'text-[10px] uppercase tracking-wider'
              )}
            >
              <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', statusConfig.dot)} />
              {getStatusLabel(status)}
            </Badge>

            {viewMode === 'list' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon name="menu-dots-vertical" size="size-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Filters Bar
const FiltersBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterStatus: PRDStatus | 'all';
  setFilterStatus: (s: PRDStatus | 'all') => void;
  viewMode: 'list' | 'grid';
  setViewMode: (m: 'list' | 'grid') => void;
}> = ({ searchQuery, setSearchQuery, filterStatus, setFilterStatus, viewMode, setViewMode }) => (
  <Card className="border-border/30 bg-card/50">
    <CardContent className="flex flex-col items-stretch gap-3 p-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size="size-4"
        />
        <Input
          placeholder="Buscar projetos..."
          className="h-10 rounded-lg border-border/30 bg-muted/20 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select
        placeholder="Todos"
        value={filterStatus}
        onValueChange={(val) => setFilterStatus(val as PRDStatus | 'all')}
        options={[
          { label: 'Todos', value: 'all' },
          { label: 'Em Progresso', value: 'in_progress' },
          { label: 'Exportados', value: 'exported' },
        ]}
        className="h-10 w-full sm:w-[140px]"
      />
      <div className="flex rounded-lg border border-border/30 bg-muted/20 p-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-8 w-8',
            viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          )}
          onClick={() => setViewMode('list')}
        >
          <Icon name="list" size="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-8 w-8',
            viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          )}
          onClick={() => setViewMode('grid')}
        >
          <Icon name="grid" size="size-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDDashboardTemplate: React.FC<PRDDashboardTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { projects, loading, error, totalProjects, projectsByStatus, isUsingMockData } =
    usePRDProjects();

  // Filter state
  const [filterStatus, setFilterStatus] = useState<PRDStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (filterStatus === 'all') return true;
        if (filterStatus === ('in_progress' as any)) {
          return ['upload', 'brief', 'prd', 'epics', 'stories'].includes(p.status);
        }
        return p.status === filterStatus;
      })
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [projects, filterStatus, searchQuery]);

  const handleCreateClick = () => {
    navigate('/prd/novo');
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
          <LoadingSkeleton />
        </main>
      </div>
    );
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
          <EmptyState onCreateClick={handleCreateClick} />
        </main>
      </div>
    );
  }

  // Main render
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
        <div className="animate-fade-in space-y-6">
          {/* Mock data indicator */}
          {isUsingMockData && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-500">
              <Icon name="info" size="size-4" />
              <span>Usando dados de demonstração (Supabase não configurado)</span>
            </div>
          )}

          {/* Metrics Row */}
          <MetricsRow totalProjects={totalProjects} projectsByStatus={projectsByStatus} />

          {/* Pipeline Visual */}
          <PipelineVisual projectsByStatus={projectsByStatus} />

          {/* Filters */}
          <FiltersBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Project List */}
          <div
            className={cn(
              'transition-all duration-300',
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-3'
            )}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} viewMode={viewMode} />
            ))}
          </div>

          {/* No results */}
          {filteredProjects.length === 0 && projects.length > 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <Icon name="search" size="size-8" className="mx-auto mb-4 opacity-50" />
              <p>Nenhum projeto encontrado com os filtros atuais</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PRDDashboardTemplate;
