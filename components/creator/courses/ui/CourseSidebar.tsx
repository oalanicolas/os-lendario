import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import {
  RecentActivity,
  formatRelativeTime,
  getIconForTipoLabel,
} from '../../../../hooks/useRecentActivities';

export interface ContentTypeStats {
  label: string;
  count: number;
  percent: number;
  icon: string;
}

export interface CourseSidebarProps {
  recentActivities: RecentActivity[];
  activitiesLoading: boolean;
  contentTypeStats?: ContentTypeStats[];
}

const DEFAULT_CONTENT_STATS: ContentTypeStats[] = [
  { label: 'Aulas', count: 161, percent: 55, icon: 'video-camera' },
  { label: 'Planejamento', count: 35, percent: 12, icon: 'calendar' },
  { label: 'Recursos', count: 28, percent: 10, icon: 'folder' },
  { label: 'Quizzes', count: 20, percent: 7, icon: 'list-check' },
  { label: 'Pesquisas', count: 17, percent: 6, icon: 'search' },
  { label: 'Relatorios', count: 14, percent: 5, icon: 'chart-pie' },
  { label: 'Projetos', count: 12, percent: 4, icon: 'rocket' },
  { label: 'Validacoes', count: 4, percent: 1, icon: 'shield-check' },
];

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  recentActivities,
  activitiesLoading,
  contentTypeStats = DEFAULT_CONTENT_STATS,
}) => {
  const navigate = useNavigate();

  return (
    <div className="h-fit space-y-6 lg:sticky lg:top-24">
      {/* Activity Feed */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
            <Icon name="bell" size="size-4" /> Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-0 pt-4">
          <div className="relative space-y-0">
            {/* Timeline vertical line */}
            <div className="absolute bottom-6 left-4 top-2 w-px bg-border" />

            {activitiesLoading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="relative flex gap-4 pb-6">
                  <div className="z-10 h-8 w-8 shrink-0 animate-pulse rounded-lg bg-muted/30" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 w-24 animate-pulse rounded bg-muted/30" />
                    <div className="h-4 w-32 animate-pulse rounded bg-muted/20" />
                  </div>
                </div>
              ))
            ) : recentActivities.length === 0 ? (
              // Empty state
              <div className="py-4 text-center">
                <Icon
                  name="inbox"
                  size="size-6"
                  className="mx-auto mb-2 text-muted-foreground/40"
                />
                <p className="text-xs text-muted-foreground">Nenhuma atividade recente</p>
              </div>
            ) : (
              // Real activities with timeline
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="group relative flex cursor-pointer gap-4 pb-6 last:pb-4"
                  onClick={() => navigate(`/creator/cursos/${activity.project_slug}`)}
                >
                  <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-studio-accent text-studio-primary shadow-sm">
                    <Icon name={getIconForTipoLabel(activity.tipo_label)} size="size-4" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {activity.tipo_label}
                    </p>
                    <p
                      className="truncate text-sm font-medium text-foreground"
                      title={activity.title}
                    >
                      {activity.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className="text-studio-accent">{activity.project_name}</span>
                      <span className="text-border">.</span>
                      <span className="font-mono">{formatRelativeTime(activity.updated_at)}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content by Type */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
            <Icon name="layers" size="size-4" /> Conteudos por Tipo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-4">
          {contentTypeStats.map((type, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <Icon name={type.icon} size="size-3" className="text-muted-foreground" />
                  {type.label}
                </span>
                <span className="font-mono text-muted-foreground">{type.count}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-studio-primary"
                  style={{ width: `${type.percent}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSidebar;
