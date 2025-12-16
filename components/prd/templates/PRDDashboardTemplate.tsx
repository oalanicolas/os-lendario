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
  getProgressPercentage
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
    exported: 'Exportado'
  };
  return labels[status] || status;
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

// Loading Skeleton
const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Stats skeleton */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-5">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            <div className="h-3 w-20 bg-muted/60 rounded animate-pulse" />
          </div>
        </Card>
      ))}
    </div>
    {/* Pipeline skeleton */}
    <Card className="p-6">
      <div className="h-5 w-40 bg-muted rounded animate-pulse mb-4" />
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            <div className="h-3 w-16 bg-muted/60 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </Card>
    {/* Course cards skeleton */}
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-48 bg-muted rounded animate-pulse" />
              <div className="h-3 w-32 bg-muted/60 rounded animate-pulse" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// Empty State
const EmptyState: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-fade-in">
    <div
      className="w-24 h-24 rounded-2xl flex items-center justify-center"
      style={{ backgroundColor: `${PRD_PRIMARY}20` }}
    >
      <Icon name="clipboard-list" size="size-12" style={{ color: PRD_PRIMARY }} />
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-foreground">Nenhum projeto PRD ainda</h2>
      <p className="text-muted-foreground max-w-md">
        Comece criando seu primeiro documento de requisitos. O PRD Studio vai te guiar em cada etapa.
      </p>
    </div>
    <Button
      onClick={onCreateClick}
      className="shadow-lg"
      style={{ backgroundColor: PRD_PRIMARY }}
    >
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
  const inProgress = projectsByStatus.upload + projectsByStatus.brief + projectsByStatus.prd + projectsByStatus.epics + projectsByStatus.stories;
  const exported = projectsByStatus.exported;

  const metrics = [
    { label: 'Total de Projetos', value: totalProjects, icon: 'folder', color: PRD_PRIMARY },
    { label: 'Em Progresso', value: inProgress, icon: 'clock', color: '#3B82F6' },
    { label: 'Exportados', value: exported, icon: 'check-circle', color: '#10B981' },
    { label: 'Taxa de Conclusão', value: totalProjects > 0 ? `${Math.round((exported / totalProjects) * 100)}%` : '0%', icon: 'chart-pie', color: PRD_ACCENT },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="bg-card border-border hover:border-[#538096]/50 transition-all group">
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                {metric.label}
              </p>
              <h3 className="text-3xl font-mono font-medium text-foreground">{metric.value}</h3>
            </div>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
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
const PipelineVisual: React.FC<{ projectsByStatus: Record<PRDStatus, number> }> = ({ projectsByStatus }) => (
  <Card className="bg-card border-border hover:border-[#538096]/50 transition-colors">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <Icon name="sitemap" size="size-4" /> Pipeline de Produção PRD
        </h3>
      </div>

      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-0" />

        {PRD_PIPELINE_STAGES.map((stage) => {
          const count = projectsByStatus[stage.key] || 0;
          const hasProjects = count > 0;
          const statusConfig = PRD_STATUS[stage.key];

          return (
            <div key={stage.key} className="flex flex-col items-center gap-3 relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  hasProjects
                    ? "text-white scale-110 shadow-lg"
                    : "bg-card border-border text-muted-foreground"
                )}
                style={hasProjects ? {
                  backgroundColor: PRD_PRIMARY,
                  borderColor: PRD_PRIMARY,
                  boxShadow: `0 0 20px ${PRD_PRIMARY}40`
                } : undefined}
              >
                <Icon name={stage.icon} size="size-4" />
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-0.5",
                    hasProjects ? "" : "text-muted-foreground"
                  )}
                  style={hasProjects ? { color: PRD_PRIMARY } : undefined}
                >
                  {stage.label}
                </p>
                <p className="text-sm font-mono text-muted-foreground">{count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

// Project Card
const ProjectCard: React.FC<{ project: PRDProject; viewMode: 'list' | 'grid' }> = ({ project, viewMode }) => {
  const navigate = useNavigate();
  const status = project.status as PRDStatus;
  const statusConfig = PRD_STATUS[status] || PRD_STATUS.upload;
  const progress = getProgressPercentage(status);
  const prdType = project.project_metadata?.prdType || 'project';

  return (
    <Card
      className="bg-card border-border hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
      onClick={() => navigate(`/prd/${project.slug}`)}
    >
      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#538096]/30 rounded-xl pointer-events-none transition-colors" />

      <CardContent className={cn("p-4", viewMode === 'grid' && "p-5")}>
        <div className={cn(
          "flex gap-4",
          viewMode === 'grid' ? "flex-col" : "items-center"
        )}>
          {/* Icon Box */}
          <div
            className={cn(
              "rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#538096] group-hover:text-white",
              viewMode === 'grid' ? "w-14 h-14" : "w-12 h-12"
            )}
            style={{ backgroundColor: PRD_ACCENT, color: PRD_PRIMARY }}
          >
            <Icon name={prdType === 'task' ? 'check-square' : 'folder'} size="size-5" />
          </div>

          {/* Title + Meta */}
          <div className={cn("flex-1 min-w-0", viewMode === 'grid' && "w-full")}>
            <div className={cn("flex gap-2 mb-1.5", viewMode === 'grid' ? "items-start justify-between" : "items-center")}>
              <h4 className="text-base font-bold text-foreground group-hover:text-[#538096] transition-colors truncate">
                {project.name}
              </h4>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-[#538096]/30 text-[#538096] bg-[#538096]/5">
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
          <div className={cn(
            "flex items-center gap-2 shrink-0",
            viewMode === 'grid' ? "w-full justify-between border-t border-border pt-3 mt-auto" : ""
          )}>
            <Badge className={cn(statusConfig.bg, statusConfig.text, "text-[10px] uppercase tracking-wider")}>
              <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", statusConfig.dot)} />
              {getStatusLabel(status)}
            </Badge>

            {viewMode === 'list' && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0" onClick={(e) => e.stopPropagation()}>
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
  <Card className="bg-card/50 border-border/30">
    <CardContent className="p-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <div className="relative flex-1">
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
        <Input
          placeholder="Buscar projetos..."
          className="pl-10 h-10 bg-muted/20 border-border/30 rounded-lg"
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
        className="w-full sm:w-[140px] h-10"
      />
      <div className="flex bg-muted/20 p-1 rounded-lg border border-border/30">
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", viewMode === 'list' ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}
          onClick={() => setViewMode('list')}
        >
          <Icon name="list" size="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", viewMode === 'grid' ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}
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
  const {
    projects,
    loading,
    error,
    totalProjects,
    projectsByStatus,
    isUsingMockData
  } = usePRDProjects();

  // Filter state
  const [filterStatus, setFilterStatus] = useState<PRDStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'in_progress' as any) {
          return ['upload', 'brief', 'prd', 'epics', 'stories'].includes(p.status);
        }
        return p.status === filterStatus;
      })
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [projects, filterStatus, searchQuery]);

  const handleCreateClick = () => {
    navigate('/prd/novo');
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-12">
          <LoadingSkeleton />
        </main>
      </div>
    );
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-12">
          <EmptyState onCreateClick={handleCreateClick} />
        </main>
      </div>
    );
  }

  // Main render
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <PRDTopbar currentSection={Section.STUDIO_PRD_DASHBOARD} setSection={setSection} />
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-12">
        <div className="space-y-6 animate-fade-in">
          {/* Mock data indicator */}
          {isUsingMockData && (
            <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 px-3 py-2 rounded-lg">
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
          <div className={cn(
            "transition-all duration-300",
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-3"
          )}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} viewMode={viewMode} />
            ))}
          </div>

          {/* No results */}
          {filteredProjects.length === 0 && projects.length > 0 && (
            <div className="text-center py-12 text-muted-foreground">
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
