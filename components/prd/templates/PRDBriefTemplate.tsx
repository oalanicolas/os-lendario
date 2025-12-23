import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import {
  PRDProject,
  PRDStatus,
  BlindSpot,
  ResearchTopic,
  WOW,
  BriefStructure,
} from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import { PRD_PRIMARY, PRD_STATUS, PRD_EFFORT } from '../prd-tokens';
import PRDTopbar from '../PRDTopbar';

// Shared Studio Components
import {
  StudioLayout,
  StudioHeader,
  StudioContent,
  StudioSidebar,
  StudioSectionNav,
  StudioSectionContent,
  StudioTwoColumn,
  type PipelineStep,
  type SectionItem,
} from '../../studio';

// Brief Views
import BlindSpotsView from '../views/BlindSpotsView';
import ResearchView from '../views/ResearchView';
import WOWsInputView from '../views/WOWsInputView';
import BriefStructureView from '../views/BriefStructureView';

import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface PRDBriefTemplateProps {
  setSection: (section: Section) => void;
}

type BriefStep = 'blindspots' | 'research' | 'wows' | 'structure';

// =============================================================================
// CONSTANTS
// =============================================================================

const BRIEF_SECTIONS: SectionItem[] = [
  {
    id: 'blindspots',
    key: 'blindspots',
    title: 'Pontos Cegos',
    description: 'Identifique aspectos não considerados',
    icon: 'lightbulb',
  },
  {
    id: 'research',
    key: 'research',
    title: 'Pesquisa',
    description: 'Contexto de mercado e tendências',
    icon: 'search',
  },
  {
    id: 'wows',
    key: 'wows',
    title: 'WOWs',
    description: 'Registre seus insights',
    icon: 'chat-alt',
  },
  {
    id: 'structure',
    key: 'structure',
    title: 'Brief Estruturado',
    description: 'Estruture o brief completo',
    icon: 'document-text',
  },
];

const PRD_PIPELINE: PipelineStep[] = [
  { key: 'upload', label: 'Upload', icon: 'upload', status: 'complete' },
  { key: 'brief', label: 'Brief', icon: 'file-text', status: 'current' },
  { key: 'prd', label: 'PRD', icon: 'clipboard-list', status: 'pending' },
  { key: 'epics', label: 'Épicos', icon: 'milestone', status: 'pending' },
  { key: 'stories', label: 'Stories', icon: 'list-checks', status: 'pending' },
  { key: 'export', label: 'Exportar', icon: 'download', status: 'pending' },
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const LoadingState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <StudioLayout
    topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
  >
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="spinner" className="mx-auto size-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Carregando projeto...</p>
      </div>
    </div>
  </StudioLayout>
);

const NotFoundState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <StudioLayout
    topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
  >
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
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

export const PRDBriefTemplate: React.FC<PRDBriefTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateBrief, advancePhase } = usePRDProject(slug || '');

  // Local state
  const [activeSection, setActiveSection] = useState<BriefStep>('blindspots');
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Determine completed sections based on data
  const getSectionsWithStatus = useCallback((): SectionItem[] => {
    const brief = project?.project_metadata?.brief;

    return BRIEF_SECTIONS.map((section) => {
      let isComplete = false;

      switch (section.key) {
        case 'blindspots':
          isComplete = (brief?.blindSpots?.filter((bs) => bs.selected).length ?? 0) >= 2;
          break;
        case 'research':
          isComplete =
            brief?.researchSkipped ||
            (brief?.researchTopics?.filter((t) => t.isRead).length ?? 0) >=
              (brief?.researchTopics?.length ?? 1) * 0.5;
          break;
        case 'wows':
          isComplete = (brief?.wows?.length ?? 0) >= 1;
          break;
        case 'structure':
          isComplete = !!(
            brief?.structure?.problem &&
            brief?.structure?.solution &&
            brief?.structure?.targetAudience
          );
          break;
      }

      return { ...section, isComplete };
    });
  }, [project]);

  const sectionsWithStatus = getSectionsWithStatus();
  const completedCount = sectionsWithStatus.filter((s) => s.isComplete).length;
  const progressPercent = Math.round((completedCount / sectionsWithStatus.length) * 100);

  // Update handlers for each view
  const handleBlindSpotsUpdate = useCallback(
    async (blindSpots: BlindSpot[]) => {
      setIsSaving(true);
      await updateBrief({ blindSpots });
      setIsSaving(false);
      setLastSaved(new Date());
    },
    [updateBrief]
  );

  const handleResearchUpdate = useCallback(
    async (topics: ResearchTopic[], skipped?: boolean) => {
      setIsSaving(true);
      await updateBrief({
        researchTopics: topics,
        researchSkipped: skipped,
      });
      setIsSaving(false);
      setLastSaved(new Date());
    },
    [updateBrief]
  );

  const handleWOWsUpdate = useCallback(
    async (wows: WOW[]) => {
      setIsSaving(true);
      await updateBrief({ wows });
      setIsSaving(false);
      setLastSaved(new Date());
    },
    [updateBrief]
  );

  const handleStructureUpdate = useCallback(
    async (structure: BriefStructure) => {
      setIsSaving(true);
      await updateBrief({ structure });
      setIsSaving(false);
      setLastSaved(new Date());
    },
    [updateBrief]
  );

  // Navigation
  const handleSectionClick = useCallback((sectionId: string | number) => {
    setActiveSection(sectionId as BriefStep);
  }, []);

  const handleNextSection = useCallback(() => {
    const currentIndex = BRIEF_SECTIONS.findIndex((s) => s.key === activeSection);
    if (currentIndex < BRIEF_SECTIONS.length - 1) {
      setActiveSection(BRIEF_SECTIONS[currentIndex + 1].key as BriefStep);
    }
  }, [activeSection]);

  const handlePreviousSection = useCallback(() => {
    const currentIndex = BRIEF_SECTIONS.findIndex((s) => s.key === activeSection);
    if (currentIndex > 0) {
      setActiveSection(BRIEF_SECTIONS[currentIndex - 1].key as BriefStep);
    }
  }, [activeSection]);

  // Pipeline navigation
  const handlePipelineClick = useCallback(
    (stepKey: string) => {
      const routes: Record<string, string> = {
        upload: `/prd/${slug}`,
        brief: `/prd/${slug}/brief`,
        prd: `/prd/${slug}/prd`,
        epics: `/prd/${slug}/epicos`,
        stories: `/prd/${slug}/stories`,
        export: `/prd/${slug}/exportar`,
      };
      if (routes[stepKey]) {
        navigate(routes[stepKey]);
      }
    },
    [navigate, slug]
  );

  // Final advance to PRD phase
  const handleAdvanceToPRD = useCallback(async () => {
    if (!project) return;

    setIsAdvancing(true);
    const success = await advancePhase();
    setIsAdvancing(false);

    if (success) {
      navigate(`/prd/${slug}/prd`);
    }
  }, [project, advancePhase, navigate, slug]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Not found state
  if (!project) {
    return <NotFoundState setSection={setSection} />;
  }

  // Wrong phase redirect
  if (project.status !== 'brief') {
    const status = project.status as PRDStatus;
    return (
      <StudioLayout
        topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
      >
        <div className="flex flex-1 items-center justify-center">
          <div className="space-y-4 text-center">
            <Badge className={cn(PRD_STATUS[status]?.bg, PRD_STATUS[status]?.text)}>{status}</Badge>
            <h2 className="text-xl font-bold">
              {status === 'upload' ? 'Complete o Upload primeiro' : 'Fase Brief concluída'}
            </h2>
            <p className="text-muted-foreground">
              {status === 'upload'
                ? 'Você precisa completar a fase de Upload antes de avançar.'
                : 'Este projeto já avançou para a próxima fase.'}
            </p>
            <Button
              variant="outline"
              onClick={() => navigate(status === 'upload' ? `/prd/${slug}` : `/prd/${slug}/prd`)}
            >
              {status === 'upload' ? 'Ir para Upload' : 'Ir para PRD'}
            </Button>
          </div>
        </div>
      </StudioLayout>
    );
  }

  const currentSectionData = BRIEF_SECTIONS.find((s) => s.key === activeSection);
  const isFirstSection = activeSection === BRIEF_SECTIONS[0].key;
  const isLastSection = activeSection === BRIEF_SECTIONS[BRIEF_SECTIONS.length - 1].key;
  const allSectionsComplete = sectionsWithStatus.every((s) => s.isComplete);

  return (
    <StudioLayout
      topbar={<PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />}
      sidebar={
        <StudioSidebar
          title={project.name}
          subtitle="Brief"
          pipeline={PRD_PIPELINE}
          currentStep="brief"
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
        title="Briefing Estratégico"
        description="Defina a base do seu PRD"
        progress={progressPercent}
        showSave={false}
        primaryColor={PRD_PRIMARY}
        actions={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="user" size="size-3" />
            <span>{PRD_EFFORT.brief.human}% humano</span>
            <span className="text-muted-foreground/30">|</span>
            <Icon name="sparkles" size="size-3" />
            <span>{PRD_EFFORT.brief.ai}% IA</span>
          </div>
        }
      />

      {/* Content */}
      <StudioContent maxWidth="max-w-5xl" padding="p-8">
        <StudioTwoColumn
          navigation={
            <StudioSectionNav
              title="Seções do Brief"
              sections={sectionsWithStatus}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
              showCompletedIcon={true}
              primaryColor={PRD_PRIMARY}
            />
          }
        >
          {/* Active Section Content */}
          <div className="space-y-6">
            {activeSection === 'blindspots' && (
              <BlindSpotsView
                project={project}
                onUpdate={handleBlindSpotsUpdate}
                onNext={handleNextSection}
              />
            )}

            {activeSection === 'research' && (
              <ResearchView
                project={project}
                onUpdate={handleResearchUpdate}
                onNext={handleNextSection}
              />
            )}

            {activeSection === 'wows' && (
              <WOWsInputView
                project={project}
                onUpdate={handleWOWsUpdate}
                onNext={handleNextSection}
              />
            )}

            {activeSection === 'structure' && (
              <BriefStructureView
                project={project}
                onUpdate={handleStructureUpdate}
                onNext={handleAdvanceToPRD}
              />
            )}

            {/* Section Navigation */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={isFirstSection ? () => navigate(`/prd/${slug}`) : handlePreviousSection}
              >
                <Icon name="arrow-left" className="mr-2 size-4" />
                {isFirstSection ? 'Voltar ao Upload' : 'Anterior'}
              </Button>

              <span className="text-sm text-muted-foreground">
                {BRIEF_SECTIONS.findIndex((s) => s.key === activeSection) + 1} de{' '}
                {BRIEF_SECTIONS.length}
              </span>

              {isLastSection && allSectionsComplete ? (
                <Button
                  onClick={handleAdvanceToPRD}
                  disabled={isAdvancing}
                  style={{ backgroundColor: PRD_PRIMARY }}
                >
                  {isAdvancing ? (
                    <>
                      <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                      Avançando...
                    </>
                  ) : (
                    <>
                      Gerar PRD
                      <Icon name="arrow-right" className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              ) : !isLastSection ? (
                <Button onClick={handleNextSection} style={{ backgroundColor: PRD_PRIMARY }}>
                  Próxima
                  <Icon name="arrow-right" className="ml-2 size-4" />
                </Button>
              ) : (
                <Button disabled variant="outline">
                  Complete as seções
                </Button>
              )}
            </div>
          </div>
        </StudioTwoColumn>
      </StudioContent>
    </StudioLayout>
  );
};

export default PRDBriefTemplate;
