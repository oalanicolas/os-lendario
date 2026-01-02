// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { Switch } from '../../ui/switch';
import { cn } from '../../../lib/utils';
import { useCourse } from '../../../hooks/useCourse';
import { useLesson } from '../../../hooks/useLesson';
import { STUDIO_PRIMARY, STUDIO_GOLD } from '../studio-tokens';
import CreatorTopbar from '../CreatorTopbar';
import { TiptapEditor } from '../ui';
import LessonExercisesTab from './LessonExercisesTab';
import LessonMediaTab from './LessonMediaTab';
import LessonSettingsTab from './LessonSettingsTab';
import LessonSidebar from './LessonSidebar';

interface CourseLessonProps {
  setSection: (s: Section) => void;
}

const CourseLesson: React.FC<CourseLessonProps> = ({ setSection }) => {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourse(slug);
  const { lesson, modules, loading: lessonLoading, updateLesson } = useLesson(lessonId);

  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'index' | 'audit'>('index');

  // Local state for editing
  const [editorTab, setEditorTab] = useState<'script' | 'media' | 'exercises' | 'settings'>(
    'script'
  );
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync lesson data to local state
  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title || '');
      setScript(lesson.metadata?.script || lesson.content || '');
      setVideoUrl(lesson.metadata?.video_url || null);
      setIsPublished(lesson.status === 'published');
      setHasChanges(false);
    }
  }, [lesson]);

  // Track changes
  useEffect(() => {
    if (lesson) {
      const titleChanged = title !== (lesson.title || '');
      const scriptChanged = script !== (lesson.metadata?.script || lesson.content || '');
      const statusChanged = isPublished !== (lesson.status === 'published');
      setHasChanges(titleChanged || scriptChanged || statusChanged);
    }
  }, [title, script, isPublished, lesson]);

  const handleSave = async () => {
    if (!lesson) return;
    setIsSaving(true);
    try {
      await updateLesson({
        title,
        content: script,
        status: isPublished ? 'published' : 'draft',
        metadata: {
          ...lesson.metadata,
          script,
          video_url: videoUrl,
        },
      });
      setHasChanges(false);
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const loading = courseLoading || lessonLoading;

  if (loading) {
    return (
      <div className="flex h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-72 space-y-4 border-r border-border bg-card/50 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted/40" />
                <div className="h-8 w-full animate-pulse rounded bg-muted/60" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-8">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-96 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div className="flex h-screen flex-col bg-background font-sans">
        <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
        <main className="flex flex-1 flex-col items-center justify-center">
          <Icon name="exclamation" className="mb-4 text-destructive" size="size-10" />
          <h2 className="mb-2 text-xl font-bold">Lição não encontrada</h2>
          <Button size="sm" onClick={() => navigate(`/creator/cursos/${slug}`)}>
            Voltar para o Curso
          </Button>
        </main>
      </div>
    );
  }

  // Find current module and lesson index
  const currentModule = modules.find((mod) => mod.lessons.some((l) => l.id === lessonId));
  const moduleIndex = modules.findIndex((mod) => mod.id === currentModule?.id);
  const lessonIndex = currentModule?.lessons.findIndex((l) => l.id === lessonId) ?? -1;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      {/* SUB-HEADER */}
      <div className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/creator/cursos/${slug}`)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="arrow-left" size="size-4" /> Voltar
          </Button>
          <div className="h-5 w-px bg-border" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Editando Aula {moduleIndex + 1}.{lessonIndex + 1}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {currentModule?.title || 'Módulo'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5">
            <span className="text-xs text-muted-foreground">
              {isPublished ? 'Publicado' : 'Rascunho'}
            </span>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} className="scale-90" />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="eye" size="size-4" /> Preview
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="gap-2 font-semibold text-[#0A0A0F]"
            style={{
              backgroundColor: hasChanges ? STUDIO_GOLD : STUDIO_PRIMARY,
              color: hasChanges ? '#0A0A0F' : 'white',
            }}
          >
            {isSaving ? (
              <Icon name="refresh" className="animate-spin" size="size-4" />
            ) : (
              <Icon name="check" size="size-4" />
            )}
            Salvar
          </Button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        {/* UNIFIED LEFT SIDEBAR (Index + Audit) */}
        <LessonSidebar
          modules={modules}
          currentLessonId={lessonId!}
          courseSlug={slug!}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          activeTab={sidebarTab}
          onTabChange={setSidebarTab}
          fidelityScore={lesson.fidelity_score ?? null}
        />

        {/* CENTER - Editor */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* TOP TABS BAR */}
          <div className="shrink-0 border-b border-border bg-card/30 px-8">
            <div className="mx-auto flex max-w-4xl items-center gap-1">
              <button
                onClick={() => setEditorTab('script')}
                className={cn(
                  '-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  editorTab === 'script'
                    ? 'border-b-2 text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon name="document" size="size-4" />
                Roteiro
              </button>
              <button
                onClick={() => setEditorTab('media')}
                className={cn(
                  '-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  editorTab === 'media'
                    ? 'border-[#538096] text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon name="play" size="size-4" />
                Mídia
              </button>
              <button
                onClick={() => setEditorTab('exercises')}
                className={cn(
                  '-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  editorTab === 'exercises'
                    ? 'border-[#538096] text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon name="check-square" size="size-4" />
                Exercícios
              </button>
              <button
                onClick={() => setEditorTab('settings')}
                className={cn(
                  '-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  editorTab === 'settings'
                    ? 'border-[#538096] text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon name="settings-sliders" size="size-4" />
                Configurações
              </button>
            </div>
          </div>

          {/* TAB CONTENT */}
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-4xl p-8">
              {/* ROTEIRO TAB */}
              {editorTab === 'script' && (
                <div className="space-y-6">
                  {/* Title */}
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-auto border-none bg-transparent px-0 text-3xl font-bold shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
                    placeholder="Título da Aula"
                  />

                  {/* Main Editor */}
                  <TiptapEditor
                    content={script}
                    onChange={setScript}
                    placeholder="Comece a escrever o roteiro da sua aula..."
                  />
                </div>
              )}

              {/* MÍDIA TAB */}
              {editorTab === 'media' && (
                <LessonMediaTab videoUrl={videoUrl} onVideoUrlChange={setVideoUrl} />
              )}

              {/* EXERCÍCIOS TAB */}
              {editorTab === 'exercises' && <LessonExercisesTab />}

              {/* CONFIGURAÇÕES TAB */}
              {editorTab === 'settings' && <LessonSettingsTab lesson={lesson} />}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
