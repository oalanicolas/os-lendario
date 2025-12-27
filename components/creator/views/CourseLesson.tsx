// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { marked } from 'marked';
import TurndownService from 'turndown';
import { Section } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { Progress } from '../../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { FileUpload } from '../../ui/file-upload';
import { cn } from '../../../lib/utils';
import { useCourse } from '../../../hooks/useCourse';
import { useLesson } from '../../../hooks/useLesson';
import { STUDIO_PRIMARY, STUDIO_GOLD } from '../studio-tokens';
import CreatorTopbar from '../CreatorTopbar';

// Initialize turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

// Helper: Convert markdown to HTML
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  try {
    return marked.parse(markdown, { async: false }) as string;
  } catch {
    return markdown;
  }
};

// Helper: Convert HTML to markdown
const htmlToMarkdown = (html: string): string => {
  if (!html) return '';
  try {
    return turndownService.turndown(html);
  } catch {
    return html;
  }
};

// Tiptap WYSIWYG Editor Component with Markdown Toggle
interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const [mode, setMode] = useState<'visual' | 'markdown'>('visual');
  const [markdownContent, setMarkdownContent] = useState(content || '');

  const initialHtml = useMemo(() => markdownToHtml(content || ''), []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Comece a escrever o roteiro da sua aula...',
      }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      if (mode === 'visual') {
        const html = editor.getHTML();
        const md = htmlToMarkdown(html);
        setMarkdownContent(md);
        onChange(md);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[450px] p-6',
      },
    },
  });

  const handleModeSwitch = (newMode: 'visual' | 'markdown') => {
    if (newMode === mode) return;

    if (newMode === 'markdown' && editor) {
      const html = editor.getHTML();
      const md = htmlToMarkdown(html);
      setMarkdownContent(md);
    } else if (newMode === 'visual' && editor) {
      const html = markdownToHtml(markdownContent);
      editor.commands.setContent(html);
    }

    setMode(newMode);
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const md = e.target.value;
    setMarkdownContent(md);
    onChange(md);
  };

  if (!editor) return null;

  return (
    <div className="tiptap-wrapper overflow-hidden rounded-lg border border-border bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 p-2">
        {mode === 'visual' && (
          <>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('bold') && 'bg-accent text-primary'
              )}
              title="Negrito (Ctrl+B)"
            >
              <Icon name="bold" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('italic') && 'bg-accent text-primary'
              )}
              title="Itálico (Ctrl+I)"
            >
              <Icon name="italic" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('strike') && 'bg-accent text-primary'
              )}
              title="Tachado"
            >
              <Icon name="strikethrough" size="size-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={cn(
                'rounded p-2 text-sm font-bold transition-colors hover:bg-accent',
                editor.isActive('heading', { level: 2 }) && 'bg-accent text-primary'
              )}
              title="Título H2"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={cn(
                'rounded p-2 text-sm font-bold transition-colors hover:bg-accent',
                editor.isActive('heading', { level: 3 }) && 'bg-accent text-primary'
              )}
              title="Título H3"
            >
              H3
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('bulletList') && 'bg-accent text-primary'
              )}
              title="Lista com marcadores"
            >
              <Icon name="list" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('orderedList') && 'bg-accent text-primary'
              )}
              title="Lista numerada"
            >
              <Icon name="list-ol" size="size-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('blockquote') && 'bg-accent text-primary'
              )}
              title="Citação"
            >
              <Icon name="quote-right" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={cn(
                'rounded p-2 transition-colors hover:bg-accent',
                editor.isActive('codeBlock') && 'bg-accent text-primary'
              )}
              title="Bloco de código"
            >
              <Icon name="code" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="rounded p-2 transition-colors hover:bg-accent"
              title="Linha horizontal"
            >
              <Icon name="minus" size="size-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-border" />

            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="rounded p-2 transition-colors hover:bg-accent disabled:opacity-30"
              title="Desfazer (Ctrl+Z)"
            >
              <Icon name="rotate-left" size="size-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="rounded p-2 transition-colors hover:bg-accent disabled:opacity-30"
              title="Refazer (Ctrl+Y)"
            >
              <Icon name="rotate-right" size="size-4" />
            </button>
          </>
        )}

        {/* Mode Toggle */}
        <div className="flex-1" />
        <div className="flex items-center gap-1 rounded-md bg-muted p-1">
          <button
            onClick={() => handleModeSwitch('visual')}
            className={cn(
              'rounded px-3 py-1 text-sm transition-colors',
              mode === 'visual'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon name="eye" size="size-4" className="mr-1.5 inline" />
            Visual
          </button>
          <button
            onClick={() => handleModeSwitch('markdown')}
            className={cn(
              'rounded px-3 py-1 text-sm transition-colors',
              mode === 'markdown'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Markdown
          </button>
        </div>
      </div>

      {/* Editor Content */}
      {mode === 'visual' ? (
        <EditorContent editor={editor} className="tiptap-content" />
      ) : (
        <textarea
          value={markdownContent}
          onChange={handleMarkdownChange}
          className="min-h-[450px] w-full resize-none bg-transparent p-6 font-mono text-sm leading-relaxed text-foreground focus:outline-none"
          placeholder="Escreva em markdown..."
          spellCheck={false}
        />
      )}

      <style>{`
        .tiptap-content .ProseMirror {
          min-height: 450px;
          padding: 24px;
          color: hsl(var(--foreground));
          font-size: 15px;
          line-height: 1.75;
        }
        .tiptap-content .ProseMirror:focus {
          outline: none;
        }
        .tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
        .tiptap-content .ProseMirror h1,
        .tiptap-content .ProseMirror h2,
        .tiptap-content .ProseMirror h3 {
          color: hsl(var(--foreground));
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .tiptap-content .ProseMirror h1 { font-size: 1.875rem; }
        .tiptap-content .ProseMirror h2 { font-size: 1.5rem; }
        .tiptap-content .ProseMirror h3 { font-size: 1.25rem; }
        .tiptap-content .ProseMirror strong { font-weight: 600; }
        .tiptap-content .ProseMirror a { color: hsl(var(--primary)); text-decoration: underline; }
        .tiptap-content .ProseMirror blockquote {
          border-left: 3px solid hsl(var(--primary));
          padding-left: 1rem;
          margin-left: 0;
          color: hsl(var(--muted-foreground));
          font-style: italic;
        }
        .tiptap-content .ProseMirror ul,
        .tiptap-content .ProseMirror ol {
          padding-left: 1.5rem;
        }
        .tiptap-content .ProseMirror li { margin: 0.25em 0; }
        .tiptap-content .ProseMirror code {
          background-color: hsl(var(--muted));
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .tiptap-content .ProseMirror pre {
          background-color: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
        }
        .tiptap-content .ProseMirror pre code {
          background: none;
          padding: 0;
        }
        .tiptap-content .ProseMirror hr {
          border: none;
          border-top: 1px solid hsl(var(--border));
          margin: 2em 0;
        }
      `}</style>
    </div>
  );
};

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

  // Sidebar width
  const sidebarWidth = sidebarCollapsed ? 'w-12' : 'w-72';

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
          <Icon name="exclamation-circle" className="mb-4 text-destructive" size="size-10" />
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

  // AI Audit
  const hasAuditData = lesson.fidelity_score !== null && lesson.fidelity_score !== undefined;
  const overallScore = hasAuditData ? Math.round(lesson.fidelity_score! * 100) : null;

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
              <Icon name="spinner" className="animate-spin" size="size-4" />
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
        <div
          className={cn(
            'flex shrink-0 flex-col border-r border-border bg-card/50 transition-all duration-300 ease-in-out',
            sidebarWidth
          )}
        >
          {!sidebarCollapsed ? (
            <>
              {/* Tab Switcher */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setSidebarTab('index')}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                    sidebarTab === 'index'
                      ? 'border-b-2 text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  style={sidebarTab === 'index' ? { borderColor: STUDIO_PRIMARY } : {}}
                >
                  <Icon name="list" size="size-3" />
                  Índice
                </button>
                <button
                  onClick={() => setSidebarTab('audit')}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                    sidebarTab === 'audit'
                      ? 'border-b-2 text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  style={sidebarTab === 'audit' ? { borderColor: STUDIO_PRIMARY } : {}}
                >
                  <Icon name="star" size="size-3" />
                  Auditoria
                </button>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="border-l border-border px-3 py-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon name="angle-double-left" size="size-4" />
                </button>
              </div>

              {/* Sidebar Content */}
              <ScrollArea className="flex-1">
                {sidebarTab === 'index' ? (
                  /* INDEX TAB */
                  <div className="space-y-3 p-3">
                    {modules.map((mod, modIdx) => (
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
                            to={`/creator/cursos/${slug}/licoes/${les.id}`}
                            className={cn(
                              'flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-xs transition-all',
                              les.id === lessonId
                                ? 'font-medium text-foreground'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                            )}
                          >
                            <span
                              className={cn(
                                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                                les.id === lessonId
                                  ? ''
                                  : 'border-muted-foreground/30'
                              )}
                            >
                              {les.id === lessonId && (
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
                          <Icon name="sparkles" size="size-7" className="text-muted-foreground" />
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
                          <Icon name="sparkles" size="size-3" />
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
                        <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
                          <div className="relative mx-auto mb-2 flex h-20 w-20 items-center justify-center">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-muted"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              />
                              <path
                                className={cn(
                                  overallScore! >= 80
                                    ? 'text-emerald-500'
                                    : overallScore! >= 60
                                      ? 'text-amber-500'
                                      : 'text-orange-500'
                                )}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${overallScore}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span
                                className={cn(
                                  'text-2xl font-bold',
                                  overallScore! >= 80
                                    ? 'text-emerald-500'
                                    : overallScore! >= 60
                                      ? 'text-amber-500'
                                      : 'text-orange-500'
                                )}
                              >
                                {overallScore}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Score de Fidelidade</p>
                        </div>

                        <Separator />

                        <div className="text-center">
                          <Button variant="outline" size="sm" className="w-full" disabled>
                            <Icon name="sparkles" size="size-4" className="mr-2" />
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
                onClick={() => setSidebarCollapsed(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon name="angle-double-right" size="size-4" />
              </button>
              <div className="my-1 h-px w-6 bg-border" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setSidebarCollapsed(false);
                      setSidebarTab('index');
                    }}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                      sidebarTab === 'index'
                        ? 'text-white'
                        : 'text-muted-foreground hover:bg-muted'
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
                      setSidebarCollapsed(false);
                      setSidebarTab('audit');
                    }}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                      sidebarTab === 'audit'
                        ? 'text-white'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <Icon name="sparkles" size="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Auditoria Didática</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

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
                <Icon name="play-alt" size="size-4" />
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
                <Icon name="list-check" size="size-4" />
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
                  <TiptapEditor content={script} onChange={setScript} />
                </div>
              )}

              {/* MÍDIA TAB */}
              {editorTab === 'media' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-1 text-xl font-semibold">Mídia & Materiais</h2>
                    <p className="text-sm text-muted-foreground">
                      Adicione vídeos e materiais de apoio para esta aula.
                    </p>
                  </div>

                  {/* Video Section */}
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-opacity-10">
                          <Icon name="video" size="size-5" style={{ color: STUDIO_PRIMARY }} />
                        </div>
                        <div>
                          <h4 className="font-medium">Vídeo da Aula</h4>
                          <p className="text-xs text-muted-foreground">
                            YouTube, Vimeo ou upload direto
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          placeholder="Cole o link do YouTube ou Vimeo..."
                          value={videoUrl || ''}
                          onChange={(e) => setVideoUrl(e.target.value || null)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm" className="shrink-0">
                          <Icon name="upload" className="mr-2" size="size-4" /> Upload
                        </Button>
                      </div>
                      {videoUrl && (
                        <div className="flex aspect-video items-center justify-center rounded-lg border border-border bg-muted">
                          <div className="text-center">
                            <Icon
                              name="play-circle"
                              size="size-12"
                              className="mb-2 text-muted-foreground"
                            />
                            <p className="text-sm text-muted-foreground">Preview do vídeo</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Materials Section */}
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-opacity-10">
                          <Icon
                            name="folder-open"
                            size="size-5"
                            style={{ color: STUDIO_PRIMARY }}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Materiais de Apoio</h4>
                          <p className="text-xs text-muted-foreground">
                            PDFs, documentos, templates, etc.
                          </p>
                        </div>
                      </div>
                      <FileUpload className="h-32" accept=".pdf,.doc,.docx,.zip,.xlsx,.pptx" />
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        <Icon name="inbox" size="size-6" className="mx-auto mb-2 opacity-50" />
                        Nenhum material anexado
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* EXERCÍCIOS TAB */}
              {editorTab === 'exercises' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-1 text-xl font-semibold">Exercícios & Avaliações</h2>
                    <p className="text-sm text-muted-foreground">
                      Crie quizzes, assessments e atividades práticas para esta aula.
                    </p>
                  </div>

                  {/* Quiz Section */}
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                            <Icon name="circle-question" size="size-5" className="text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Quiz de Fixação</h4>
                            <p className="text-xs text-muted-foreground">
                              Perguntas de múltipla escolha
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="plus" size="size-4" />
                          Adicionar Quiz
                        </Button>
                      </div>
                      <div className="rounded-lg border border-dashed border-border p-6 text-center">
                        <Icon
                          name="circle-question"
                          size="size-8"
                          className="mx-auto mb-3 text-muted-foreground/50"
                        />
                        <p className="mb-2 text-sm text-muted-foreground">Nenhum quiz criado</p>
                        <p className="text-xs text-muted-foreground">
                          Quizzes ajudam a fixar o conteúdo e medir compreensão
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assessment Section */}
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                            <Icon
                              name="clipboard-check"
                              size="size-5"
                              className="text-emerald-500"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">Assessment</h4>
                            <p className="text-xs text-muted-foreground">
                              Avaliação completa com pontuação
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="plus" size="size-4" />
                          Criar Assessment
                        </Button>
                      </div>
                      <div className="rounded-lg border border-dashed border-border p-6 text-center">
                        <Icon
                          name="clipboard-check"
                          size="size-8"
                          className="mx-auto mb-3 text-muted-foreground/50"
                        />
                        <p className="mb-2 text-sm text-muted-foreground">
                          Nenhum assessment criado
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Assessments avaliam o domínio completo do conteúdo
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Practical Exercise Section */}
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10">
                            <Icon name="laptop-code" size="size-5" style={{color: STUDIO_PRIMARY}} />
                          </div>
                          <div>
                            <h4 className="font-medium">Exercício Prático</h4>
                            <p className="text-xs text-muted-foreground">
                              Atividade hands-on para aplicar o conhecimento
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="plus" size="size-4" />
                          Adicionar Exercício
                        </Button>
                      </div>
                      <div className="rounded-lg border border-dashed border-border p-6 text-center">
                        <Icon
                          name="laptop-code"
                          size="size-8"
                          className="mx-auto mb-3 text-muted-foreground/50"
                        />
                        <p className="mb-2 text-sm text-muted-foreground">
                          Nenhum exercício prático
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Exercícios práticos consolidam o aprendizado através da ação
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reflection Section */}
                  <Card>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                            <Icon name="lightbulb" size="size-5" className="text-sky-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Pergunta de Reflexão</h4>
                            <p className="text-xs text-muted-foreground">
                              Questão aberta para reflexão do aluno
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="plus" size="size-4" />
                          Adicionar Reflexão
                        </Button>
                      </div>
                      <div className="rounded-lg border border-dashed border-border p-6 text-center">
                        <Icon
                          name="lightbulb"
                          size="size-8"
                          className="mx-auto mb-3 text-muted-foreground/50"
                        />
                        <p className="mb-2 text-sm text-muted-foreground">
                          Nenhuma pergunta de reflexão
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Perguntas abertas estimulam pensamento crítico
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* CONFIGURAÇÕES TAB */}
              {editorTab === 'settings' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-1 text-xl font-semibold">Configurações da Aula</h2>
                    <p className="text-sm text-muted-foreground">Metadados e opções avançadas.</p>
                  </div>

                  <Card>
                    <CardContent className="space-y-6 p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Duração estimada</Label>
                          <Input
                            placeholder="Ex: 15 min"
                            defaultValue={lesson.metadata?.duration || ''}
                          />
                          <p className="text-xs text-muted-foreground">
                            Tempo aproximado para completar a aula
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Sequência</Label>
                          <Input
                            type="number"
                            placeholder="1"
                            defaultValue={lesson.sequence_order || ''}
                          />
                          <p className="text-xs text-muted-foreground">Ordem dentro do módulo</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Descrição curta</Label>
                        <AutosizeTextarea
                          placeholder="Breve descrição para exibição em listas e previews..."
                          defaultValue={lesson.metadata?.description || ''}
                          className="min-h-[100px]"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Informações do Sistema</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="rounded-lg bg-muted/30 p-3">
                            <span className="text-muted-foreground">ID da lição</span>
                            <p className="mt-1 font-mono text-xs">{lesson.id}</p>
                          </div>
                          <div className="rounded-lg bg-muted/30 p-3">
                            <span className="text-muted-foreground">Slug</span>
                            <p className="mt-1 font-mono text-xs">{lesson.slug}</p>
                          </div>
                          <div className="rounded-lg bg-muted/30 p-3">
                            <span className="text-muted-foreground">Status</span>
                            <p className="mt-1 text-xs">{lesson.status}</p>
                          </div>
                          <div className="rounded-lg bg-muted/30 p-3">
                            <span className="text-muted-foreground">Fidelidade</span>
                            <p className="mt-1 text-xs">
                              {lesson.fidelity_score
                                ? `${Math.round(lesson.fidelity_score * 100)}%`
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
