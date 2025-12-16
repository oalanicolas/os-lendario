import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus, PRDDocument, PRDSection, PRDSectionStatus } from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY, PRD_EFFORT, PRD_STATUS } from '../prd-tokens';
import PRDTopbar from '../PRDTopbar';

// Shared Studio Components
import {
  StudioLayout,
  StudioHeader,
  StudioContent,
  StudioSidebar,
  StudioSectionNav,
  StudioTwoColumn,
  type PipelineStep,
  type SectionItem
} from '../../studio';

import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Textarea } from '../../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface PRDDocumentTemplateProps {
  setSection: (section: Section) => void;
}

type SectionKey = keyof PRDDocument;

// =============================================================================
// CONSTANTS
// =============================================================================

const PRD_SECTIONS: SectionItem[] = [
  { id: 'objectives', key: 'objectives', title: 'Objetivos', icon: 'bullseye' },
  { id: 'scope', key: 'scope', title: 'Escopo', icon: 'box' },
  { id: 'userStories', key: 'userStories', title: 'User Stories', icon: 'users' },
  { id: 'designDecisions', key: 'designDecisions', title: 'Decisões de Design', icon: 'palette' },
  { id: 'requirements', key: 'requirements', title: 'Requisitos', icon: 'list-check' },
  { id: 'architecture', key: 'architecture', title: 'Arquitetura', icon: 'sitemap' },
];

const EMPTY_SECTION: PRDSection = {
  content: '',
  status: 'incomplete',
  lineCount: 0,
};

const EMPTY_DOCUMENT: PRDDocument = {
  objectives: { ...EMPTY_SECTION },
  scope: { ...EMPTY_SECTION },
  userStories: { ...EMPTY_SECTION },
  designDecisions: { ...EMPTY_SECTION },
  requirements: { ...EMPTY_SECTION },
  architecture: { ...EMPTY_SECTION },
};

const STATUS_CONFIG: Record<PRDSectionStatus, { label: string; color: string; icon: string }> = {
  incomplete: { label: 'Incompleto', color: 'text-muted-foreground', icon: 'circle' },
  reviewing: { label: 'Em Revisão', color: 'text-amber-500', icon: 'clock' },
  approved: { label: 'Aprovado', color: 'text-emerald-500', icon: 'check-circle' },
};

const PRD_PIPELINE: PipelineStep[] = [
  { key: 'upload', label: 'Upload', icon: 'upload', status: 'complete' },
  { key: 'brief', label: 'Brief', icon: 'file-text', status: 'complete' },
  { key: 'prd', label: 'PRD', icon: 'clipboard-list', status: 'current' },
  { key: 'epics', label: 'Épicos', icon: 'milestone', status: 'pending' },
  { key: 'stories', label: 'Stories', icon: 'list-checks', status: 'pending' },
  { key: 'export', label: 'Exportar', icon: 'download', status: 'pending' },
];

// =============================================================================
// PROMPTS
// =============================================================================

const PRD_SYSTEM = `Você é um product manager experiente criando PRDs (Product Requirements Documents) detalhados.
Escreva cada seção de forma clara, objetiva e acionável.
Use listas e formatação quando apropriado.`;

const PRD_PROMPT = `Gere um PRD completo baseado no seguinte brief:

PROBLEMA:
{problem}

SOLUÇÃO:
{solution}

PÚBLICO-ALVO:
{targetAudience}

DIFERENCIAIS:
{differentials}

MÉTRICAS DE SUCESSO:
{successMetrics}

---

Gere o PRD completo com as seguintes seções (em JSON):
{
  "objectives": "Objetivos claros e mensuráveis do projeto...",
  "scope": "Escopo do projeto incluindo o que está dentro e fora...",
  "userStories": "User stories no formato 'Como [persona], quero [ação], para [benefício]'...",
  "designDecisions": "Decisões de design, fluxos de usuário, padrões visuais...",
  "requirements": "Requisitos funcionais e não-funcionais detalhados...",
  "architecture": "Arquitetura técnica, stack, integrações..."
}

Cada seção deve ter 3-5 parágrafos detalhados.`;

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

export const PRDDocumentTemplate: React.FC<PRDDocumentTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');
  const { generate, isGenerating, progress } = usePRDAI();

  // Local state
  const [document, setDocument] = useState<PRDDocument>(EMPTY_DOCUMENT);
  const [activeSection, setActiveSection] = useState<SectionKey>('objectives');
  const [regeneratingSection, setRegeneratingSection] = useState<SectionKey | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Initialize document from project
  React.useEffect(() => {
    if (project?.project_metadata?.prdDocument?.document) {
      setDocument(project.project_metadata.prdDocument.document);
    }
  }, [project]);

  const brief = project?.project_metadata?.brief?.structure;

  // Calculate progress
  const sectionsWithStatus = useMemo((): SectionItem[] => {
    return PRD_SECTIONS.map(section => ({
      ...section,
      isComplete: document[section.key as SectionKey]?.status === 'approved'
    }));
  }, [document]);

  const totalLines = useMemo(() => {
    return PRD_SECTIONS.reduce((sum, s) => sum + (document[s.key as SectionKey]?.lineCount || 0), 0);
  }, [document]);

  const allApproved = useMemo(() => {
    return PRD_SECTIONS.every(s => document[s.key as SectionKey]?.status === 'approved');
  }, [document]);

  const hasContent = useMemo(() => {
    return PRD_SECTIONS.some(s => document[s.key as SectionKey]?.content?.trim());
  }, [document]);

  const approvedCount = sectionsWithStatus.filter(s => s.isComplete).length;
  const progressPercent = Math.round((approvedCount / PRD_SECTIONS.length) * 100);

  // Helper to create section
  const createSection = useCallback((content: string): PRDSection => ({
    content,
    status: content.trim() ? 'reviewing' : 'incomplete',
    lineCount: content.split('\n').length,
    lastModified: new Date().toISOString(),
  }), []);

  // Save document
  const handleSaveDocument = useCallback(async (doc: PRDDocument) => {
    if (!project) return;
    setIsSaving(true);
    await updateProject({
      prdDocument: {
        ...project.project_metadata?.prdDocument,
        document: doc,
        lineCount: PRD_SECTIONS.reduce((sum, s) => sum + (doc[s.key as SectionKey]?.lineCount || 0), 0)
      }
    });
    setIsSaving(false);
    setLastSaved(new Date());
  }, [project, updateProject]);

  // Generate full PRD
  const handleGeneratePRD = useCallback(async () => {
    if (!brief) return;

    try {
      const prompt = PRD_PROMPT
        .replace('{problem}', brief.problem)
        .replace('{solution}', brief.solution)
        .replace('{targetAudience}', brief.targetAudience)
        .replace('{differentials}', brief.differentials.join('\n- '))
        .replace('{successMetrics}', brief.successMetrics.join('\n- '));

      const result = await generate(prompt, {
        systemPrompt: PRD_SYSTEM,
        temperature: 0.7,
        maxTokens: 8192,
      });

      let parsed: Record<string, string>;
      try {
        const jsonMatch = result.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch {
        console.error('Failed to parse PRD response');
        return;
      }

      const newDocument: PRDDocument = {
        objectives: createSection(parsed.objectives || ''),
        scope: createSection(parsed.scope || ''),
        userStories: createSection(parsed.userStories || ''),
        designDecisions: createSection(parsed.designDecisions || ''),
        requirements: createSection(parsed.requirements || ''),
        architecture: createSection(parsed.architecture || ''),
      };

      setDocument(newDocument);
      await handleSaveDocument(newDocument);
    } catch (err) {
      console.error('Failed to generate PRD:', err);
    }
  }, [brief, generate, createSection, handleSaveDocument]);

  // Update section content
  const handleUpdateSection = useCallback(async (content: string) => {
    const updated = {
      ...document,
      [activeSection]: {
        ...document[activeSection],
        content,
        lineCount: content.split('\n').length,
        lastModified: new Date().toISOString(),
      },
    };
    setDocument(updated);
    await handleSaveDocument(updated);
  }, [document, activeSection, handleSaveDocument]);

  // Update section status
  const handleStatusChange = useCallback(async (status: PRDSectionStatus) => {
    const updated = {
      ...document,
      [activeSection]: {
        ...document[activeSection],
        status,
        lastModified: new Date().toISOString(),
      },
    };
    setDocument(updated);
    await handleSaveDocument(updated);
  }, [document, activeSection, handleSaveDocument]);

  // Regenerate section
  const handleRegenerateSection = useCallback(async () => {
    if (!brief) return;

    setRegeneratingSection(activeSection);
    try {
      const sectionConfig = PRD_SECTIONS.find(s => s.key === activeSection);
      const prompt = `Reescreva a seção "${sectionConfig?.title}" do PRD de forma mais detalhada.

Contexto do projeto:
Problema: ${brief.problem}
Solução: ${brief.solution}

Conteúdo atual:
${document[activeSection]?.content || 'Vazio'}

Escreva uma versão melhorada e mais completa desta seção.`;

      const result = await generate(prompt, {
        systemPrompt: PRD_SYSTEM,
        temperature: 0.8,
        maxTokens: 2048,
      });

      const updated = {
        ...document,
        [activeSection]: createSection(result.content),
      };
      setDocument(updated);
      await handleSaveDocument(updated);
    } catch (err) {
      console.error('Failed to regenerate section:', err);
    } finally {
      setRegeneratingSection(null);
    }
  }, [brief, document, activeSection, generate, createSection, handleSaveDocument]);

  // Navigation
  const handleSectionClick = useCallback((sectionId: string | number) => {
    setActiveSection(sectionId as SectionKey);
  }, []);

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

  const handleAdvanceToEpics = useCallback(async () => {
    if (!project || !allApproved) return;

    setIsAdvancing(true);
    const success = await advancePhase();
    setIsAdvancing(false);

    if (success) {
      navigate(`/prd/${slug}/epicos`);
    }
  }, [project, allApproved, advancePhase, navigate, slug]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Not found state
  if (!project) {
    return <NotFoundState setSection={setSection} />;
  }

  // Wrong phase redirect
  if (project.status !== 'prd') {
    const status = project.status as PRDStatus;
    return (
      <StudioLayout
        topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Badge className={cn(PRD_STATUS[status]?.bg, PRD_STATUS[status]?.text)}>
              {status}
            </Badge>
            <h2 className="text-xl font-bold">
              {['upload', 'brief'].includes(status) ? 'Complete as fases anteriores' : 'Fase PRD concluída'}
            </h2>
            <Button variant="outline" onClick={() => handlePipelineClick(status)}>
              Ir para fase {status}
            </Button>
          </div>
        </div>
      </StudioLayout>
    );
  }

  const activeIndex = PRD_SECTIONS.findIndex(s => s.key === activeSection);
  const isFirstSection = activeIndex === 0;
  const isLastSection = activeIndex === PRD_SECTIONS.length - 1;
  const activeSectionData = document[activeSection] || EMPTY_SECTION;
  const activeSectionConfig = PRD_SECTIONS.find(s => s.key === activeSection)!;
  const activeStatusConfig = STATUS_CONFIG[activeSectionData.status];

  return (
    <StudioLayout
      topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
      sidebar={
        <StudioSidebar
          title={project.name}
          subtitle="PRD Document"
          pipeline={PRD_PIPELINE}
          currentStep="prd"
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
        title="PRD Document"
        description={`${totalLines} linhas geradas`}
        progress={progressPercent}
        showSave={false}
        primaryColor={PRD_PRIMARY}
        actions={
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} disabled={!hasContent}>
              <Icon name="eye" className="mr-1.5 size-4" />
              Preview
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="user" size="size-3" />
              <span>{PRD_EFFORT.prd.human}% humano</span>
              <span className="text-muted-foreground/30">|</span>
              <Icon name="sparkles" size="size-3" />
              <span>{PRD_EFFORT.prd.ai}% IA</span>
            </div>
          </div>
        }
      />

      {/* Content */}
      <StudioContent maxWidth="max-w-5xl" padding="p-8">
        {!hasContent && !isGenerating ? (
          <Card className="p-12 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${PRD_PRIMARY}20` }}
            >
              <Icon name="document-text" size="size-8" style={{ color: PRD_PRIMARY }} />
            </div>
            <h3 className="text-lg font-bold mb-2">Gerar PRD Completo</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              A IA vai gerar todas as seções do PRD baseado no brief estruturado
            </p>
            <Button onClick={handleGeneratePRD} style={{ backgroundColor: PRD_PRIMARY }}>
              <Icon name="sparkles" className="mr-2 size-4" />
              Gerar PRD
            </Button>
          </Card>
        ) : isGenerating && !hasContent ? (
          <Card className="p-12 text-center">
            <Icon name="spinner" className="animate-spin mx-auto size-12 mb-4" style={{ color: PRD_PRIMARY }} />
            <h3 className="text-lg font-bold mb-2">Gerando PRD...</h3>
            <p className="text-muted-foreground">Criando todas as seções do documento</p>
            {progress > 0 && (
              <div className="w-48 h-1.5 bg-muted rounded-full mx-auto mt-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, backgroundColor: PRD_PRIMARY }}
                />
              </div>
            )}
          </Card>
        ) : (
          <StudioTwoColumn
            navigation={
              <StudioSectionNav
                title="Seções do PRD"
                sections={sectionsWithStatus}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
                showCompletedIcon={true}
                primaryColor={PRD_PRIMARY}
              />
            }
          >
            <div className="space-y-6">
              {/* Section Editor */}
              <Card className="p-6">
                <div className="space-y-4">
                  {/* Section Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${PRD_PRIMARY}20` }}
                      >
                        <Icon name={activeSectionConfig.icon} size="size-5" style={{ color: PRD_PRIMARY }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{activeSectionConfig.title}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name={activeStatusConfig.icon} size="size-3" className={activeStatusConfig.color} />
                          <span className={activeStatusConfig.color}>{activeStatusConfig.label}</span>
                          <span className="text-muted-foreground">• {activeSectionData.lineCount} linhas</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRegenerateSection}
                      disabled={regeneratingSection === activeSection}
                    >
                      <Icon
                        name={regeneratingSection === activeSection ? "spinner" : "refresh"}
                        className={cn("mr-1.5 size-3", regeneratingSection === activeSection && "animate-spin")}
                      />
                      Regenerar
                    </Button>
                  </div>

                  {/* Content Editor */}
                  <Textarea
                    value={activeSectionData.content}
                    onChange={(e) => handleUpdateSection(e.target.value)}
                    className="min-h-[350px] resize-none font-mono text-sm"
                    placeholder={`Conteúdo da seção ${activeSectionConfig.title}...`}
                  />

                  {/* Status Actions */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Status:</span>
                    {(['incomplete', 'reviewing', 'approved'] as PRDSectionStatus[]).map((status) => {
                      const config = STATUS_CONFIG[status];
                      return (
                        <Button
                          key={status}
                          variant={activeSectionData.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleStatusChange(status)}
                          className={cn(
                            activeSectionData.status === status && status === 'approved' && "bg-emerald-600 hover:bg-emerald-700",
                            activeSectionData.status === status && status === 'reviewing' && "bg-amber-600 hover:bg-amber-700"
                          )}
                        >
                          <Icon name={config.icon} className="mr-1.5 size-3" />
                          {config.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => isFirstSection ? navigate(`/prd/${slug}/brief`) : setActiveSection(PRD_SECTIONS[activeIndex - 1].key as SectionKey)}
                >
                  <Icon name="arrow-left" className="mr-2 size-4" />
                  {isFirstSection ? 'Voltar ao Brief' : 'Anterior'}
                </Button>

                <span className="text-sm text-muted-foreground">
                  {activeIndex + 1} de {PRD_SECTIONS.length}
                </span>

                {isLastSection ? (
                  <Button
                    onClick={handleAdvanceToEpics}
                    disabled={!allApproved || isAdvancing}
                    style={{ backgroundColor: allApproved && !isAdvancing ? PRD_PRIMARY : undefined }}
                  >
                    {isAdvancing ? (
                      <>
                        <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                        Avançando...
                      </>
                    ) : (
                      <>
                        Gerar Épicos
                        <Icon name="arrow-right" className="ml-2 size-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setActiveSection(PRD_SECTIONS[activeIndex + 1].key as SectionKey)}
                    style={{ backgroundColor: PRD_PRIMARY }}
                  >
                    Próxima
                    <Icon name="arrow-right" className="ml-2 size-4" />
                  </Button>
                )}
              </div>
            </div>
          </StudioTwoColumn>
        )}
      </StudioContent>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent onClose={() => setShowPreview(false)} className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview do PRD</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-x-auto">
              {PRD_SECTIONS.map(s => {
                const section = document[s.key as SectionKey];
                return `## ${s.title}\n\n${section?.content || '_Não gerado_'}\n`;
              }).join('\n---\n\n')}
            </pre>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                const preview = PRD_SECTIONS.map(s => {
                  const section = document[s.key as SectionKey];
                  return `## ${s.title}\n\n${section?.content || '_Não gerado_'}\n`;
                }).join('\n---\n\n');
                navigator.clipboard.writeText(preview);
              }}
            >
              <Icon name="clipboard" className="mr-2 size-4" />
              Copiar
            </Button>
            <Button onClick={() => setShowPreview(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudioLayout>
  );
};

export default PRDDocumentTemplate;
