import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus } from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import { PRD_PRIMARY, PRD_EFFORT } from '../prd-tokens';
import PRDTopbar from '../PRDTopbar';
import PRDTimer from '../PRDTimer';
import PRDAudioUpload from '../PRDAudioUpload';

// Shared Studio Components
import {
  StudioLayout,
  StudioHeader,
  StudioContent,
  StudioSidebar,
  type PipelineStep
} from '../../studio';

import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Textarea } from '../../ui/textarea';
import { cn } from '../../../lib/utils';

// =============================================================================
// CONSTANTS
// =============================================================================

const MIN_CHARS = 200;

const UPLOAD_PLACEHOLDER = `Me conte sobre sua ideia...

- O que você quer criar?
- Qual problema isso resolve?
- Para quem é isso?
- O que te inspirou?
- Quais funcionalidades são essenciais?
- Tem alguma referência visual ou funcional?

Despeje tudo aqui, sem filtro. Quanto mais contexto, melhor!
A IA vai ajudar a estruturar depois.`;

const PRD_PIPELINE: PipelineStep[] = [
  { key: 'upload', label: 'Upload', icon: 'upload', status: 'current' },
  { key: 'brief', label: 'Brief', icon: 'file-text', status: 'pending' },
  { key: 'prd', label: 'PRD', icon: 'clipboard-list', status: 'pending' },
  { key: 'epics', label: 'Épicos', icon: 'milestone', status: 'pending' },
  { key: 'stories', label: 'Stories', icon: 'list-checks', status: 'pending' },
  { key: 'export', label: 'Exportar', icon: 'download', status: 'pending' },
];

// =============================================================================
// TYPES
// =============================================================================

interface PRDUploadTemplateProps {
  setSection: (section: Section) => void;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const LoadingState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <StudioLayout
    topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
  >
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Icon name="spinner" className="animate-spin mx-auto size-8 text-muted-foreground" />
        <p className="text-muted-foreground">Carregando projeto...</p>
      </div>
    </div>
  </StudioLayout>
);

const NotFoundState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <StudioLayout
    topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
  >
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Icon name="folder-open" size="size-16" className="mx-auto text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Projeto não encontrado</h2>
        <p className="text-muted-foreground">O projeto que você está procurando não existe.</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          <Icon name="arrow-left" className="mr-2 size-4" />
          Voltar
        </Button>
      </div>
    </div>
  </StudioLayout>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDUploadTemplate: React.FC<PRDUploadTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const {
    project,
    loading,
    updateUpload,
    advancePhase
  } = usePRDProject(slug || '');

  // Local state
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Initialize content from project
  useEffect(() => {
    if (project?.project_metadata?.upload?.content) {
      setContent(project.project_metadata.upload.content);
    }
  }, [project]);

  // Auto-save with debounce (30 seconds)
  useEffect(() => {
    if (!project || content === (project.project_metadata?.upload?.content || '')) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsSaving(true);
      await updateUpload({ content });
      setIsSaving(false);
      setLastSaved(new Date());
    }, 30000);

    return () => clearTimeout(timer);
  }, [content, project, updateUpload]);

  // Auto-redirect if project is not in upload phase
  useEffect(() => {
    if (project && project.status !== 'upload') {
      const rawStatus = project.status;
      const status: PRDStatus = rawStatus === 'completed' ? 'exported' : (rawStatus as PRDStatus);

      const phaseRoutes: Record<PRDStatus, string> = {
        'upload': `/prd/${slug}`,
        'brief': `/prd/${slug}/brief`,
        'prd': `/prd/${slug}/prd`,
        'epics': `/prd/${slug}/epicos`,
        'stories': `/prd/${slug}/stories`,
        'exported': `/prd/${slug}/exportar`
      };

      const targetRoute = phaseRoutes[status] || `/prd/${slug}/brief`;
      navigate(targetRoute, { replace: true });
    }
  }, [project, slug, navigate]);

  // Computed
  const isValid = content.length >= MIN_CHARS;
  const progressPercent = Math.min(Math.round((content.length / MIN_CHARS) * 100), 100);

  // Handlers
  const handleSaveNow = useCallback(async () => {
    if (!project) return;
    setIsSaving(true);
    await updateUpload({ content });
    setIsSaving(false);
    setLastSaved(new Date());
  }, [project, content, updateUpload]);

  const handleAdvance = useCallback(async () => {
    if (!isValid || !project) return;

    setIsAdvancing(true);
    await updateUpload({ content });
    const success = await advancePhase();
    setIsAdvancing(false);

    if (success) {
      navigate(`/prd/${slug}/brief`);
    }
  }, [isValid, project, content, updateUpload, advancePhase, navigate, slug]);

  const handlePipelineClick = useCallback((stepKey: string) => {
    const routes: Record<string, string> = {
      'upload': `/prd/${slug}`,
      'brief': `/prd/${slug}/brief`,
      'prd': `/prd/${slug}/prd`,
      'epics': `/prd/${slug}/epicos`,
      'stories': `/prd/${slug}/stories`,
      'export': `/prd/${slug}/exportar`,
    };
    if (routes[stepKey]) {
      navigate(routes[stepKey]);
    }
  }, [navigate, slug]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Not found state
  if (!project) {
    return <NotFoundState setSection={setSection} />;
  }

  // Redirecting state
  if (project.status !== 'upload') {
    return (
      <StudioLayout
        topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Icon name="spinner" className="animate-spin mx-auto size-8 text-muted-foreground" />
            <p className="text-muted-foreground">Redirecionando para a fase atual...</p>
          </div>
        </div>
      </StudioLayout>
    );
  }

  return (
    <StudioLayout
      topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
      sidebar={
        <StudioSidebar
          title={project.name}
          subtitle="Upload"
          pipeline={PRD_PIPELINE}
          currentStep="upload"
          onStepClick={handlePipelineClick}
          onBack={() => navigate('/prd')}
          backLabel="Voltar aos Projetos"
          showAutoSave={true}
          lastSaved={lastSaved}
          isSaving={isSaving}
          primaryColor={PRD_PRIMARY}
        />
      }
    >
      {/* Header */}
      <StudioHeader
        title="Upload da Ideia"
        description="Descreva sua ideia em detalhes"
        progress={progressPercent}
        showSave={true}
        isSaving={isSaving}
        onSave={handleSaveNow}
        primaryColor={PRD_PRIMARY}
        actions={
          <div className="flex items-center gap-4">
            <PRDTimer />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="user" size="size-3" />
              <span>{PRD_EFFORT.upload.human}% humano</span>
            </div>
          </div>
        }
      />

      {/* Content */}
      <StudioContent maxWidth="max-w-4xl" padding="p-8">
        <div className="space-y-6">
          {/* Main Editor */}
          <Card className="p-6 space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={UPLOAD_PLACEHOLDER}
              className={cn(
                "min-h-[300px] resize-none text-base leading-relaxed",
                !isValid && content.length > 0 && "border-amber-500/50 focus:border-amber-500"
              )}
            />

            {/* Character Counter */}
            <div className="flex items-center justify-between text-sm">
              <div className={cn(
                "flex items-center gap-2",
                isValid ? "text-emerald-500" : "text-muted-foreground"
              )}>
                {isValid && <Icon name="check-circle" className="size-4" />}
                <span className="font-mono">{content.length}/{MIN_CHARS}</span>
                <span>caracteres mínimos</span>
              </div>

              {lastSaved && !isSaving && (
                <span className="text-xs text-muted-foreground">
                  Salvo às {lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </Card>

          {/* Audio Upload */}
          <PRDAudioUpload
            audioUrl={project.project_metadata?.upload?.audioUrl}
            audioDuration={project.project_metadata?.upload?.audioDurationSeconds}
            projectId={project.id}
            onAudioChange={async (data) => {
              await updateUpload({
                audioUrl: data?.url,
                audioDurationSeconds: data?.duration
              });
            }}
          />

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <Button variant="outline" onClick={() => navigate('/prd')}>
              <Icon name="arrow-left" className="mr-2 size-4" />
              Voltar
            </Button>

            <span className="text-sm text-muted-foreground">
              Fase 1 de 6
            </span>

            <Button
              onClick={handleAdvance}
              disabled={!isValid || isAdvancing}
              style={{ backgroundColor: isValid && !isAdvancing ? PRD_PRIMARY : undefined }}
            >
              {isAdvancing ? (
                <>
                  <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                  Avançando...
                </>
              ) : (
                <>
                  Próxima Fase
                  <Icon name="arrow-right" className="ml-2 size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </StudioContent>
    </StudioLayout>
  );
};

export default PRDUploadTemplate;
