// @ts-nocheck
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { cn } from '../../../lib/utils';
import CreatorTopbar from '../CreatorTopbar';
import { useCourse } from '../../../hooks/useCourse';
import { useCourseContents } from '../../../hooks/useCourseContents';
import { STUDIO_PRIMARY, STUDIO_GOLD, STUDIO_ACCENT } from '../studio-tokens';

interface CourseOverviewProps {
  setSection: (s: Section) => void;
}

// Helper to get pipeline stage
function getPipelineStages(data: {
  hasResearch: boolean;
  hasModules: boolean;
  hasLessons: boolean;
  publishedLessons: number;
  totalLessons: number;
  courseStatus: string;
}) {
  const { hasResearch, hasModules, hasLessons, publishedLessons, totalLessons, courseStatus } =
    data;

  const stages = [
    { id: 'brief', label: 'BRIEFING', icon: 'file-edit', status: 'pending' as const },
    { id: 'research', label: 'PESQUISA', icon: 'search', status: 'pending' as const },
    { id: 'curriculum', label: 'CURRÍCULO', icon: 'list', status: 'pending' as const },
    { id: 'generation', label: 'GERAÇÃO', icon: 'magic-wand', status: 'pending' as const },
    { id: 'validation', label: 'VALIDAÇÃO', icon: 'check-circle', status: 'pending' as const },
    { id: 'production', label: 'PRODUÇÃO', icon: 'video-camera', status: 'pending' as const },
    { id: 'published', label: 'PUBLICADO', icon: 'rocket', status: 'pending' as const },
  ];

  let currentIndex = 0;

  if (courseStatus === 'published' || courseStatus === 'completed') {
    currentIndex = 6;
  } else if (courseStatus === 'review' || courseStatus === 'in_review') {
    currentIndex = 5;
  } else if (publishedLessons > 0 && publishedLessons < totalLessons) {
    currentIndex = 5;
  } else if (hasLessons && publishedLessons === 0) {
    currentIndex = 4;
  } else if (hasModules && !hasLessons) {
    currentIndex = 3;
  } else if (hasResearch && !hasModules) {
    currentIndex = 2;
  } else if (hasResearch) {
    currentIndex = 1;
  }

  return stages.map((stage, idx) => ({
    ...stage,
    status:
      idx < currentIndex
        ? ('completed' as const)
        : idx === currentIndex
          ? ('current' as const)
          : ('pending' as const),
  }));
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourse(slug);
  const { content, loading: contentLoading } = useCourseContents(slug);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const loading = courseLoading || contentLoading;

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] p-6 md:p-8">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-muted/30" />
                <div className="h-8 w-64 rounded bg-muted/30" />
              </div>
              <div className="h-10 w-32 rounded bg-muted/30" />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-muted/20" />
              ))}
            </div>
            <div className="h-32 rounded-xl bg-muted/20" />
          </div>
        </main>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="mx-auto w-full max-w-[1400px] p-6 md:p-8">
          <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg"
              style={{ backgroundColor: STUDIO_ACCENT }}
            >
              <Icon name="exclamation-triangle" style={{ color: STUDIO_PRIMARY }} size="size-8" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Curso não encontrado</h2>
            <p className="mb-6 text-muted-foreground">
              O curso "{slug}" não existe ou foi removido.
            </p>
            <Button
              onClick={() => navigate('/creator/cursos')}
              style={{ backgroundColor: STUDIO_PRIMARY }}
              className="text-white"
            >
              <Icon name="arrow-left" className="mr-2" size="size-4" />
              Voltar para Cursos
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Extract real data
  const modules = content?.modules || [];
  const totalModules = content?.totalModules || 0;
  const totalLessons = content?.totalLessons || 0;
  const allLessons = modules.flatMap((m) => m.lessons);

  const publishedLessons = allLessons.filter((l) => l.status === 'published').length;
  const draftLessons = allLessons.filter((l) => l.status === 'draft').length;
  const researchCount = content?.research?.length || 0;

  const lessonsWithScore = allLessons.filter(
    (l) => l.fidelity_score !== null && l.fidelity_score !== undefined
  );
  const avgFidelity =
    lessonsWithScore.length > 0
      ? lessonsWithScore.reduce((sum, l) => sum + (l.fidelity_score || 0), 0) /
        lessonsWithScore.length
      : null;

  const metadata = course.project_metadata || {};

  const pipelineStages = getPipelineStages({
    hasResearch: researchCount > 0,
    hasModules: totalModules > 0,
    hasLessons: totalLessons > 0,
    publishedLessons,
    totalLessons,
    courseStatus: course.status || '',
  });

  const progressPercent =
    totalLessons > 0 ? Math.round((publishedLessons / totalLessons) * 100) : 0;
  const currentStage = pipelineStages.find((s) => s.status === 'current')?.label || 'BRIEFING';

  // KPI stats
  const stats = [
    {
      label: 'Módulos',
      value: totalModules,
      icon: 'folder',
      detail: totalModules > 0 ? 'Todos com conteúdo' : 'Nenhum criado',
      sparkline: '0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0',
    },
    {
      label: 'Lições',
      value: totalLessons,
      icon: 'play-alt',
      detail: `${publishedLessons} publicadas · ${draftLessons} rascunhos`,
      sparkline: '0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2',
    },
    {
      label: 'Pesquisas',
      value: researchCount,
      icon: 'search',
      detail: 'documentos de apoio',
      sparkline: '0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15',
    },
    {
      label: 'Fidelidade Média',
      value: avgFidelity !== null ? `${Math.round(avgFidelity * 100)}%` : '--',
      icon: 'shield-check',
      detail:
        lessonsWithScore.length > 0
          ? `${lessonsWithScore.length} lições avaliadas`
          : 'sem avaliações',
      sparkline: '0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-8">
        <div className="animate-fade-in space-y-6">
          {/* === HEADER === */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              {/* Breadcrumb */}
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/creator/cursos" className="transition-colors hover:text-foreground">
                  Cursos
                </Link>
                <Icon name="angle-right" size="size-3" />
                <span className="font-medium text-foreground">{course.name}</span>
              </div>

              {/* Title + Status */}
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{course.name}</h1>
                <Badge
                  variant="outline"
                  className="border-studio-primary/30 text-xs uppercase tracking-wider text-studio-primary"
                >
                  {currentStage}
                </Badge>
              </div>

              {course.description && (
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{course.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/creator/cursos')}>
                <Icon name="arrow-left" size="size-4" className="mr-2" />
                Voltar
              </Button>
              <Button
                size="sm"
                className="text-white"
                style={{ backgroundColor: STUDIO_PRIMARY }}
                onClick={() => navigate(`/creator/cursos/${slug}/licoes`)}
              >
                <Icon name="play" size="size-4" className="mr-2" />
                Continuar Produção
              </Button>
            </div>
          </div>

          {/* === KPI CARDS === */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden border-border bg-card transition-all hover:border-studio-primary/50"
              >
                {/* Sparkline Background */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-10 transition-opacity group-hover:opacity-20">
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
                    <path d={`M0,30 L${stat.sparkline} L100,30 Z`} fill={STUDIO_PRIMARY} />
                  </svg>
                </div>
                <CardContent className="relative z-10 flex items-start justify-between p-5">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                    <h3 className="font-mono text-3xl font-medium text-foreground">{stat.value}</h3>
                    <p className="mt-2 text-[10px] text-muted-foreground">{stat.detail}</p>
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                    style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}
                  >
                    <Icon name={stat.icon} size="size-5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* === PIPELINE DE PRODUÇÃO === */}
          <Card className="group border-border bg-card transition-colors hover:border-studio-primary/50">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-studio-primary">
                  <Icon name="sitemap" size="size-4" /> Pipeline de Produção
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{progressPercent}% completo</span>
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%`, backgroundColor: STUDIO_PRIMARY }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative flex min-w-[700px] items-center justify-between">
                {/* Connecting line with progress */}
                <div className="absolute left-0 top-5 -z-0 h-0.5 w-full bg-muted">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{
                      width: `${(pipelineStages.filter((s) => s.status === 'completed').length / (pipelineStages.length - 1)) * 100}%`,
                      backgroundColor: STUDIO_PRIMARY,
                    }}
                  />
                </div>

                {pipelineStages.map((stage) => (
                  <div
                    key={stage.id}
                    className="group/step relative z-10 flex flex-col items-center gap-3"
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                        stage.status === 'current'
                          ? 'scale-110 text-white shadow-lg'
                          : stage.status === 'completed'
                            ? 'bg-card text-foreground'
                            : 'border-border bg-card text-muted-foreground group-hover/step:text-foreground'
                      )}
                      style={{
                        backgroundColor: stage.status === 'current' ? STUDIO_PRIMARY : undefined,
                        borderColor:
                          stage.status === 'current' || stage.status === 'completed'
                            ? STUDIO_PRIMARY
                            : undefined,
                        boxShadow:
                          stage.status === 'current' ? `0 0 20px ${STUDIO_PRIMARY}40` : undefined,
                      }}
                    >
                      {stage.status === 'completed' ? (
                        <Icon name="check" size="size-4" />
                      ) : (
                        <Icon name={stage.icon} size="size-4" />
                      )}
                    </div>
                    <div className="text-center">
                      <p
                        className="mb-0.5 text-xs font-bold uppercase tracking-wider"
                        style={
                          stage.status === 'current' || stage.status === 'completed'
                            ? { color: STUDIO_PRIMARY }
                            : {}
                        }
                      >
                        {stage.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* === MAIN CONTENT GRID === */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
            {/* LEFT: Curriculum Structure */}
            <div className="space-y-4 xl:col-span-3">
              <Card className="border-border bg-card">
                <CardHeader className="border-b border-border pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                      <Icon name="list" size="size-4" /> Estrutura do Currículo
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {totalModules} módulos · {totalLessons} lições
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/creator/cursos/${slug}/curriculo`)}
                      >
                        <Icon name="pencil" size="size-3" className="mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {modules.length === 0 ? (
                    <div className="py-12 text-center">
                      <div
                        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg"
                        style={{ backgroundColor: STUDIO_ACCENT }}
                      >
                        <Icon name="folder-open" style={{ color: STUDIO_PRIMARY }} size="size-6" />
                      </div>
                      <p className="mb-4 text-muted-foreground">Nenhum módulo criado ainda</p>
                      <Button
                        onClick={() => navigate(`/creator/cursos/${slug}/curriculo`)}
                        style={{ backgroundColor: STUDIO_PRIMARY }}
                        className="text-white"
                      >
                        <Icon name="plus" size="size-4" className="mr-2" />
                        Criar Currículo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {modules.map((module, idx) => {
                        const isExpanded = expandedModules.has(module.id);
                        const moduleProgress =
                          module.lessons.length > 0
                            ? Math.round(
                                (module.lessons.filter((l) => l.status === 'published').length /
                                  module.lessons.length) *
                                  100
                              )
                            : 0;

                        return (
                          <div
                            key={module.id}
                            className="overflow-hidden rounded-lg border border-border"
                          >
                            {/* Module Header */}
                            <div
                              className="flex cursor-pointer items-center justify-between bg-card p-4 transition-colors hover:bg-muted/20"
                              onClick={() => toggleModule(module.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                                  style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}
                                >
                                  <span className="text-sm font-bold">M{idx + 1}</span>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold">{module.title}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    {module.lessons.length} lições · {moduleProgress}% completo
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${moduleProgress}%`,
                                      backgroundColor: STUDIO_PRIMARY,
                                    }}
                                  />
                                </div>
                                <Icon
                                  name={isExpanded ? 'angle-up' : 'angle-down'}
                                  size="size-4"
                                  className="text-muted-foreground"
                                />
                              </div>
                            </div>

                            {/* Lessons List */}
                            {isExpanded && module.lessons.length > 0 && (
                              <div className="divide-y divide-border/50">
                                {module.lessons.map((lesson, lessonIdx) => (
                                  <Link
                                    key={lesson.id}
                                    to={`/creator/cursos/${slug}/licoes/${lesson.id}`}
                                    className="group flex items-center justify-between p-3 pl-6 transition-colors hover:bg-muted/10"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="w-8 font-mono text-xs text-muted-foreground">
                                        {idx + 1}.{lessonIdx + 1}
                                      </span>
                                      <span className="text-sm transition-colors group-hover:text-studio-primary">
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {lesson.fidelity_score !== null &&
                                        lesson.fidelity_score !== undefined && (
                                          <span className="font-mono text-[10px] text-muted-foreground">
                                            {Math.round(lesson.fidelity_score * 100)}%
                                          </span>
                                        )}
                                      <Badge
                                        className={cn(
                                          'border-0 text-[10px]',
                                          lesson.status === 'published'
                                            ? 'bg-emerald-500/10 text-emerald-500'
                                            : 'bg-muted text-muted-foreground'
                                        )}
                                      >
                                        {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
                                      </Badge>
                                      <Icon
                                        name="angle-right"
                                        size="size-4"
                                        className="text-muted-foreground group-hover:text-studio-primary"
                                      />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}

                            {/* Empty module */}
                            {isExpanded && module.lessons.length === 0 && (
                              <div className="p-6 text-center">
                                <p className="mb-3 text-sm text-muted-foreground">
                                  Este módulo ainda não tem lições
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/creator/cursos/${slug}/curriculo`);
                                  }}
                                >
                                  <Icon name="plus" size="size-3" className="mr-1" />
                                  Adicionar Lições
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="h-fit space-y-6 lg:sticky lg:top-24">
              {/* Quick Actions */}
              <Card className="border-border bg-card shadow-sm">
                <CardHeader className="border-b border-border pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                    <Icon name="bolt" size="size-4" /> Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  {[
                    {
                      label: 'Editar Brief',
                      icon: 'file-edit',
                      path: `/creator/cursos/${slug}/brief`,
                    },
                    {
                      label: 'Ver Pesquisa',
                      icon: 'search',
                      path: `/creator/cursos/${slug}/research`,
                    },
                    {
                      label: 'Editar Currículo',
                      icon: 'list',
                      path: `/creator/cursos/${slug}/curriculo`,
                    },
                    {
                      label: 'Validação de QA',
                      icon: 'check-circle',
                      path: `/creator/cursos/${slug}/validacao`,
                    },
                  ].map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="h-10 w-full justify-start transition-colors hover:border-studio-primary/50 hover:text-studio-primary"
                      onClick={() => navigate(action.path)}
                    >
                      <Icon
                        name={action.icon}
                        size="size-4"
                        className="mr-3 text-muted-foreground"
                      />
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Course Info */}
              <Card className="border-border bg-card shadow-sm">
                <CardHeader className="border-b border-border pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                    <Icon name="info-circle" size="size-4" /> Informações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">
                      {course.status?.replace('_', ' ') || 'Em progresso'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tipo</span>
                    <span className="font-medium capitalize">{course.project_type || 'Curso'}</span>
                  </div>
                  {metadata.metodologia && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Metodologia</span>
                      <span className="font-medium" style={{ color: STUDIO_PRIMARY }}>
                        {String(metadata.metodologia)}
                      </span>
                    </div>
                  )}
                  {metadata.duracao_estimada && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duração</span>
                      <span className="font-medium">{String(metadata.duracao_estimada)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseOverview;
