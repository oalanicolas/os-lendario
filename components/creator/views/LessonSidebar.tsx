import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { cn } from '../../../lib/utils';
import { STUDIO_PRIMARY } from '../studio-tokens';
import { CircularProgressScore } from '../../shared';

interface Module {
  id: string;
  title: string;
  lessons: Array<{
    id: string;
    title: string;
  }>;
}

interface LessonSidebarProps {
  modules: Module[];
  currentLessonId: string;
  courseSlug: string;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  activeTab: 'index' | 'audit';
  onTabChange: (tab: 'index' | 'audit') => void;
  fidelityScore: number | null;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({
  modules,
  currentLessonId,
  courseSlug,
  collapsed,
  onCollapsedChange,
  activeTab,
  onTabChange,
  fidelityScore,
}) => {
  const sidebarWidth = collapsed ? 'w-12' : 'w-72';
  const hasAuditData = fidelityScore !== null && fidelityScore !== undefined;
  const overallScore = hasAuditData ? Math.round(fidelityScore * 100) : null;

  return (
    <div
      className={cn(
        'flex shrink-0 flex-col border-r border-border bg-card/50 transition-all duration-300 ease-in-out',
        sidebarWidth
      )}
    >
      {!collapsed ? (
        <>
          {/* Tab Switcher */}
          <div className="flex border-b border-border">
            <button
              onClick={() => onTabChange('index')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                activeTab === 'index'
                  ? 'border-b-2 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              style={activeTab === 'index' ? { borderColor: STUDIO_PRIMARY } : {}}
            >
              <Icon name="list" size="size-3" />
              Índice
            </button>
            <button
              onClick={() => onTabChange('audit')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                activeTab === 'audit'
                  ? 'border-b-2 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              style={activeTab === 'audit' ? { borderColor: STUDIO_PRIMARY } : {}}
            >
              <Icon name="star" size="size-3" />
              Auditoria
            </button>
            <button
              onClick={() => onCollapsedChange(true)}
              className="border-l border-border px-3 py-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="angle-double-left" size="size-4" />
            </button>
          </div>

          {/* Sidebar Content */}
          <ScrollArea className="flex-1">
            {activeTab === 'index' ? (
              /* INDEX TAB */
              <div className="space-y-3 p-3">
                {modules.map((mod) => (
                  <div key={mod.id} className="space-y-1">
                    <div
                      className="flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: STUDIO_PRIMARY }}
                    >
                      <span className="truncate">{mod.title}</span>
                      <span className="font-mono text-[10px] font-normal text-muted-foreground">
                        /{mod.lessons.length}
                      </span>
                    </div>
                    {mod.lessons.map((les) => (
                      <Link
                        key={les.id}
                        to={`/creator/cursos/${courseSlug}/licoes/${les.id}`}
                        className={cn(
                          'flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-xs transition-all',
                          les.id === currentLessonId
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                            les.id === currentLessonId ? '' : 'border-muted-foreground/30'
                          )}
                        >
                          {les.id === currentLessonId && (
                            <Icon name="check" size="size-2" className="text-white" />
                          )}
                        </span>
                        <span className="line-clamp-2 leading-tight">{les.title}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              /* AUDIT TAB */
              <div className="space-y-6 p-4">
                {!hasAuditData ? (
                  /* No Analysis State */
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
                      <Icon name="magic-wand" size="size-7" className="text-muted-foreground" />
                    </div>
                    <h4 className="mb-2 text-sm font-semibold">Sem análise</h4>
                    <p className="mb-6 px-4 text-xs text-muted-foreground">
                      Esta lição ainda não foi analisada pelo sistema de auditoria didática.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      style={{ borderColor: `${STUDIO_PRIMARY}40`, color: STUDIO_PRIMARY }}
                      disabled
                    >
                      <Icon name="magic-wand" size="size-3" />
                      Analisar Conteúdo
                    </Button>
                    <p className="mt-4 text-[10px] text-muted-foreground">
                      Funcionalidade em desenvolvimento
                    </p>
                  </div>
                ) : (
                  /* Has Analysis */
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="rounded-xl border border-border bg-muted/20 p-4">
                      <CircularProgressScore
                        score={overallScore!}
                        size="lg"
                        label="Score de Fidelidade"
                      />
                    </div>

                    <Separator />

                    <div className="text-center">
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Icon name="magic-wand" size="size-4" className="mr-2" />
                        Re-analisar Conteúdo
                      </Button>
                      <p className="mt-2 text-[10px] text-muted-foreground">
                        Análise detalhada em breve
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </>
      ) : (
        /* COLLAPSED STATE */
        <div className="flex flex-col items-center gap-2 py-3">
          <button
            onClick={() => onCollapsedChange(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon name="angle-double-right" size="size-4" />
          </button>
          <div className="my-1 h-px w-6 bg-border" />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  onCollapsedChange(false);
                  onTabChange('index');
                }}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                  activeTab === 'index' ? 'text-white' : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Icon name="list" size="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Índice do Curso</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  onCollapsedChange(false);
                  onTabChange('audit');
                }}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                  activeTab === 'audit' ? 'text-white' : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Icon name="magic-wand" size="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Auditoria Didática</TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default LessonSidebar;
