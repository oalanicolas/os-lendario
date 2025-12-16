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
  const { hasResearch, hasModules, hasLessons, publishedLessons, totalLessons, courseStatus } = data;

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
    status: idx < currentIndex ? 'completed' as const : idx === currentIndex ? 'current' as const : 'pending' as const
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
    setExpandedModules(prev => {
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
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="w-full mx-auto p-6 md:p-8 max-w-[1400px]">
          <div className="space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted/30 rounded" />
                <div className="h-8 w-64 bg-muted/30 rounded" />
              </div>
              <div className="h-10 w-32 bg-muted/30 rounded" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-muted/20 rounded-xl" />
              ))}
            </div>
            <div className="h-32 bg-muted/20 rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="w-full mx-auto p-6 md:p-8 max-w-[1400px]">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: STUDIO_ACCENT }}>
              <Icon name="exclamation-triangle" style={{ color: STUDIO_PRIMARY }} size="size-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Curso não encontrado</h2>
            <p className="text-muted-foreground mb-6">O curso "{slug}" não existe ou foi removido.</p>
            <Button onClick={() => navigate('/creator/cursos')} style={{ backgroundColor: STUDIO_PRIMARY }} className="text-white">
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
  const allLessons = modules.flatMap(m => m.lessons);

  const publishedLessons = allLessons.filter(l => l.status === 'published').length;
  const draftLessons = allLessons.filter(l => l.status === 'draft').length;
  const researchCount = content?.research?.length || 0;

  const lessonsWithScore = allLessons.filter(l => l.fidelity_score !== null && l.fidelity_score !== undefined);
  const avgFidelity = lessonsWithScore.length > 0
    ? lessonsWithScore.reduce((sum, l) => sum + (l.fidelity_score || 0), 0) / lessonsWithScore.length
    : null;

  const metadata = course.project_metadata || {};

  const pipelineStages = getPipelineStages({
    hasResearch: researchCount > 0,
    hasModules: totalModules > 0,
    hasLessons: totalLessons > 0,
    publishedLessons,
    totalLessons,
    courseStatus: course.status || ''
  });

  const progressPercent = totalLessons > 0 ? Math.round((publishedLessons / totalLessons) * 100) : 0;
  const currentStage = pipelineStages.find(s => s.status === 'current')?.label || 'BRIEFING';

  // KPI stats
  const stats = [
    {
      label: 'Módulos',
      value: totalModules,
      icon: 'folder',
      detail: totalModules > 0 ? 'Todos com conteúdo' : 'Nenhum criado',
      sparkline: '0,20 10,15 20,25 30,18 40,22 50,10 60,15 70,5 80,10 90,0'
    },
    {
      label: 'Lições',
      value: totalLessons,
      icon: 'play-alt',
      detail: `${publishedLessons} publicadas · ${draftLessons} rascunhos`,
      sparkline: '0,25 10,22 20,20 30,15 40,18 50,12 60,10 70,8 80,5 90,2'
    },
    {
      label: 'Pesquisas',
      value: researchCount,
      icon: 'search',
      detail: 'documentos de apoio',
      sparkline: '0,15 10,15 20,15 30,15 40,15 50,15 60,15 70,15 80,15 90,15'
    },
    {
      label: 'Fidelidade Média',
      value: avgFidelity !== null ? `${Math.round(avgFidelity * 100)}%` : '--',
      icon: 'shield-check',
      detail: lessonsWithScore.length > 0 ? `${lessonsWithScore.length} lições avaliadas` : 'sem avaliações',
      sparkline: '0,28 10,25 20,22 30,20 40,15 50,10 60,12 70,8 80,5 90,0'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <main className="w-full mx-auto p-6 md:p-8 max-w-[1400px]">
        <div className="space-y-6 animate-fade-in">

          {/* === HEADER === */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link to="/creator/cursos" className="hover:text-foreground transition-colors">Cursos</Link>
                <Icon name="angle-right" size="size-3" />
                <span className="text-foreground font-medium">{course.name}</span>
              </div>

              {/* Title + Status */}
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{course.name}</h1>
                <Badge variant="outline" className="text-xs uppercase tracking-wider border-[#538096]/30" style={{ color: STUDIO_PRIMARY }}>
                  {currentStage}
                </Badge>
              </div>

              {course.description && (
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{course.description}</p>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-card border-border hover:border-[#538096]/50 transition-all group relative overflow-hidden">
                {/* Sparkline Background */}
                <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                    <path d={`M0,30 L${stat.sparkline} L100,30 Z`} fill={STUDIO_PRIMARY} />
                  </svg>
                </div>
                <CardContent className="p-5 flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-mono font-medium text-foreground">{stat.value}</h3>
                    <p className="text-[10px] text-muted-foreground mt-2">{stat.detail}</p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}
                  >
                    <Icon name={stat.icon} size="size-5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* === PIPELINE DE PRODUÇÃO === */}
          <Card className="bg-card border-border hover:border-[#538096]/50 transition-colors group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 group-hover:text-[#538096] transition-colors">
                  <Icon name="sitemap" size="size-4" /> Pipeline de Produção
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{progressPercent}% completo</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%`, backgroundColor: STUDIO_PRIMARY }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between relative min-w-[700px]">
                {/* Connecting line with progress */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-0">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{
                      width: `${(pipelineStages.filter(s => s.status === 'completed').length / (pipelineStages.length - 1)) * 100}%`,
                      backgroundColor: STUDIO_PRIMARY
                    }}
                  />
                </div>

                {pipelineStages.map((stage) => (
                  <div key={stage.id} className="flex flex-col items-center gap-3 relative z-10 group/step">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                        stage.status === 'current'
                          ? "text-white scale-110 shadow-lg"
                          : stage.status === 'completed'
                          ? "bg-card text-foreground"
                          : "bg-card border-border text-muted-foreground group-hover/step:text-foreground"
                      )}
                      style={{
                        backgroundColor: stage.status === 'current' ? STUDIO_PRIMARY : undefined,
                        borderColor: stage.status === 'current' || stage.status === 'completed' ? STUDIO_PRIMARY : undefined,
                        boxShadow: stage.status === 'current' ? `0 0 20px ${STUDIO_PRIMARY}40` : undefined
                      }}
                    >
                      {stage.status === 'completed' ? <Icon name="check" size="size-4" /> : <Icon name={stage.icon} size="size-4" />}
                    </div>
                    <div className="text-center">
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-0.5"
                        style={stage.status === 'current' || stage.status === 'completed' ? { color: STUDIO_PRIMARY } : {}}
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
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

            {/* LEFT: Curriculum Structure */}
            <div className="xl:col-span-3 space-y-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
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
                    <div className="text-center py-12">
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: STUDIO_ACCENT }}>
                        <Icon name="folder-open" style={{ color: STUDIO_PRIMARY }} size="size-6" />
                      </div>
                      <p className="text-muted-foreground mb-4">Nenhum módulo criado ainda</p>
                      <Button onClick={() => navigate(`/creator/cursos/${slug}/curriculo`)} style={{ backgroundColor: STUDIO_PRIMARY }} className="text-white">
                        <Icon name="plus" size="size-4" className="mr-2" />
                        Criar Currículo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {modules.map((module, idx) => {
                        const isExpanded = expandedModules.has(module.id);
                        const moduleProgress = module.lessons.length > 0
                          ? Math.round((module.lessons.filter(l => l.status === 'published').length / module.lessons.length) * 100)
                          : 0;

                        return (
                          <div key={module.id} className="border border-border rounded-lg overflow-hidden">
                            {/* Module Header */}
                            <div
                              className="flex items-center justify-between p-4 bg-card hover:bg-muted/20 cursor-pointer transition-colors"
                              onClick={() => toggleModule(module.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}
                                >
                                  <span className="text-sm font-bold">M{idx + 1}</span>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-sm">{module.title}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    {module.lessons.length} lições · {moduleProgress}% completo
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${moduleProgress}%`, backgroundColor: STUDIO_PRIMARY }}
                                  />
                                </div>
                                <Icon
                                  name={isExpanded ? "angle-up" : "angle-down"}
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
                                    className="flex items-center justify-between p-3 pl-6 hover:bg-muted/10 transition-colors group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="text-xs font-mono text-muted-foreground w-8">
                                        {idx + 1}.{lessonIdx + 1}
                                      </span>
                                      <span className="text-sm group-hover:text-[#538096] transition-colors">
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {lesson.fidelity_score !== null && lesson.fidelity_score !== undefined && (
                                        <span className="text-[10px] font-mono text-muted-foreground">
                                          {Math.round(lesson.fidelity_score * 100)}%
                                        </span>
                                      )}
                                      <Badge className={cn(
                                        "text-[10px] border-0",
                                        lesson.status === 'published'
                                          ? "bg-emerald-500/10 text-emerald-500"
                                          : "bg-muted text-muted-foreground"
                                      )}>
                                        {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
                                      </Badge>
                                      <Icon name="angle-right" size="size-4" className="text-muted-foreground group-hover:text-[#538096]" />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}

                            {/* Empty module */}
                            {isExpanded && module.lessons.length === 0 && (
                              <div className="p-6 text-center">
                                <p className="text-sm text-muted-foreground mb-3">Este módulo ainda não tem lições</p>
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
            <div className="space-y-6 lg:sticky lg:top-24 h-fit">
              {/* Quick Actions */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-3 border-b border-border">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Icon name="bolt" size="size-4" /> Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-2">
                  {[
                    { label: 'Editar Brief', icon: 'file-edit', path: `/creator/cursos/${slug}/brief` },
                    { label: 'Ver Pesquisa', icon: 'search', path: `/creator/cursos/${slug}/research` },
                    { label: 'Editar Currículo', icon: 'list', path: `/creator/cursos/${slug}/curriculo` },
                    { label: 'Validação de QA', icon: 'check-circle', path: `/creator/cursos/${slug}/validacao` },
                  ].map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="w-full justify-start h-10 hover:border-[#538096]/50 hover:text-[#538096] transition-colors"
                      onClick={() => navigate(action.path)}
                    >
                      <Icon name={action.icon} size="size-4" className="mr-3 text-muted-foreground" />
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Course Info */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-3 border-b border-border">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Icon name="info-circle" size="size-4" /> Informações
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">{course.status?.replace('_', ' ') || 'Em progresso'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Tipo</span>
                    <span className="font-medium capitalize">{course.project_type || 'Curso'}</span>
                  </div>
                  {metadata.metodologia && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Metodologia</span>
                      <span className="font-medium" style={{ color: STUDIO_PRIMARY }}>{String(metadata.metodologia)}</span>
                    </div>
                  )}
                  {metadata.duracao_estimada && (
                    <div className="flex justify-between items-center text-sm">
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
