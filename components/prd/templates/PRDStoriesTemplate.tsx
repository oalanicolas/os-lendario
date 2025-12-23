// @ts-nocheck
import React, { useState, useCallback, useMemo } from 'react';
import { PRDProject, EpicData, StoryData, Complexity } from '../../../types/prd';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY, PRD_STATUS } from '../prd-tokens';
import PRDEffortIndicator from '../PRDEffortIndicator';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { cn } from '../../../lib/utils';

// Re-export types for convenience
export type { StoryData } from '../../../types/prd';

interface PRDStoriesTemplateProps {
  project: PRDProject;
  initialEpics?: EpicData[]; // Épicos carregados do banco
  initialStories?: StoryData[]; // Stories carregadas do banco
  onUpdateStories: (stories: StoryData[]) => Promise<void>;
  onUpdateEpics: (epics: EpicData[]) => Promise<void>;
  onNext: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const COMPLEXITY_CONFIG: Record<Complexity, { label: string; color: string }> = {
  P: { label: 'P', color: 'bg-emerald-500/20 text-emerald-400' },
  M: { label: 'M', color: 'bg-amber-500/20 text-amber-400' },
  G: { label: 'G', color: 'bg-red-500/20 text-red-400' },
};

// =============================================================================
// PROMPTS
// =============================================================================

const STORIES_SYSTEM = `Você é um product manager experiente que cria user stories detalhadas.
Cada story deve seguir o formato "Como [persona], quero [ação], para [benefício]".
Gere critérios de aceite claros e testáveis.`;

const STORIES_USER = `Gere user stories para o seguinte épico:

## Épico
**Título:** {epicTitle}
**Descrição:** {epicDescription}

## Contexto do PRD
**Problema:** {problem}
**Solução:** {solution}

---

Gere {count} user stories no formato JSON:
[
  {
    "title": "Título curto da story",
    "userStory": "Como [persona], quero [ação], para [benefício]",
    "acceptanceCriteria": ["Critério 1", "Critério 2", "Critério 3"],
    "complexity": "P" | "M" | "G"
  }
]

Complexidade:
- P (Pequena): até 2h de trabalho
- M (Média): 2-8h de trabalho
- G (Grande): mais de 8h de trabalho`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface StoryCardProps {
  story: StoryData;
  isExpanded: boolean;
  isEditing: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  onSave: (updates: Partial<StoryData>) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isExpanded,
  isEditing,
  onToggleExpand,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [editTitle, setEditTitle] = useState(story.title);
  const [editUserStory, setEditUserStory] = useState(story.userStory);
  const [editCriteria, setEditCriteria] = useState(story.acceptanceCriteria.join('\n'));
  const [editComplexity, setEditComplexity] = useState(story.complexity);

  const handleSave = () => {
    onSave({
      title: editTitle.trim(),
      userStory: editUserStory.trim(),
      acceptanceCriteria: editCriteria.split('\n').filter((c) => c.trim()),
      complexity: editComplexity,
    });
  };

  if (isEditing) {
    return (
      <Card className="border-primary/50 p-4">
        <div className="space-y-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Título da story"
            className="font-semibold"
          />
          <Textarea
            value={editUserStory}
            onChange={(e) => setEditUserStory(e.target.value)}
            placeholder="Como [persona], quero [ação], para [benefício]"
            className="min-h-[60px] resize-none"
          />
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Critérios de Aceite (um por linha)
            </label>
            <Textarea
              value={editCriteria}
              onChange={(e) => setEditCriteria(e.target.value)}
              placeholder="- Critério 1&#10;- Critério 2"
              className="min-h-[80px] resize-none font-mono text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Complexidade:</span>
            {(['P', 'M', 'G'] as Complexity[]).map((c) => (
              <Button
                key={c}
                variant={editComplexity === c ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEditComplexity(c)}
                className={cn('h-7 w-7 p-0', editComplexity === c && COMPLEXITY_CONFIG[c].color)}
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!editTitle.trim()}>
              <Icon name="check" className="mr-1.5 size-3" />
              Salvar
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'transition-all',
        isExpanded ? 'p-4' : 'p-3',
        !story.isValid && 'border-red-500/30'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Story ID */}
        <button
          onClick={onToggleExpand}
          className="mt-0.5 shrink-0 font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          #{story.sequence_order}
        </button>

        <div className="min-w-0 flex-1">
          {/* Header Row */}
          <div className="mb-1 flex items-center gap-2">
            <h4 className="flex-1 truncate text-sm font-medium">{story.title}</h4>
            <Badge className={cn('text-xs', COMPLEXITY_CONFIG[story.complexity].color)}>
              {story.complexity}
            </Badge>
            {!story.isValid && (
              <Badge variant="outline" className="border-red-500/30 text-xs text-red-400">
                <Icon name="alert-circle" className="mr-1 size-3" />
                Inválida
              </Badge>
            )}
          </div>

          {/* User Story */}
          <p className="line-clamp-1 text-xs text-muted-foreground">{story.userStory}</p>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-3 space-y-3 border-t pt-3">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  User Story
                </p>
                <p className="text-sm">{story.userStory}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Critérios de Aceite ({story.acceptanceCriteria.length})
                </p>
                <ul className="space-y-1">
                  {story.acceptanceCriteria.map((criterion, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Icon name="check" className="mt-1 size-3 shrink-0 text-emerald-500" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {story.validationErrors && story.validationErrors.length > 0 && (
                <div className="rounded-lg bg-red-500/10 p-3">
                  <p className="mb-1 text-xs uppercase tracking-wider text-red-400">
                    Erros de Validação
                  </p>
                  <ul className="space-y-1">
                    {story.validationErrors.map((error, i) => (
                      <li key={i} className="text-xs text-red-400">
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onToggleExpand} className="h-7 w-7 p-0">
            <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onEdit} className="h-7 w-7 p-0">
            <Icon name="edit" className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-7 w-7 p-0 text-destructive"
          >
            <Icon name="trash" className="size-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface EpicAccordionProps {
  epic: EpicData;
  stories: StoryData[];
  isOpen: boolean;
  isGenerating: boolean;
  expandedStoryId: string | null;
  editingStoryId: string | null;
  onToggle: () => void;
  onGenerateStories: () => void;
  onToggleStoryExpand: (storyId: string) => void;
  onEditStory: (storyId: string) => void;
  onSaveStory: (storyId: string, updates: Partial<StoryData>) => void;
  onCancelEdit: () => void;
  onDeleteStory: (storyId: string) => void;
  onAddStory: () => void;
}

const EpicAccordion: React.FC<EpicAccordionProps> = ({
  epic,
  stories,
  isOpen,
  isGenerating,
  expandedStoryId,
  editingStoryId,
  onToggle,
  onGenerateStories,
  onToggleStoryExpand,
  onEditStory,
  onSaveStory,
  onCancelEdit,
  onDeleteStory,
  onAddStory,
}) => {
  const validCount = stories.filter((s) => s.isValid).length;
  const invalidCount = stories.length - validCount;

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full items-center gap-4 p-4 text-left transition-colors',
          isOpen ? 'bg-muted/50' : 'hover:bg-muted/30'
        )}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold"
          style={{ backgroundColor: `${PRD_PRIMARY}20`, color: PRD_PRIMARY }}
        >
          {epic.sequence_order}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{epic.title}</h3>
          <p className="text-xs text-muted-foreground">
            {stories.length} stories
            {invalidCount > 0 && (
              <span className="ml-2 text-red-400">
                ({invalidCount} inválida{invalidCount > 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          className="size-5 text-muted-foreground"
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="space-y-3 p-4 pt-0">
          {stories.length === 0 ? (
            <div className="py-8 text-center">
              <p className="mb-4 text-muted-foreground">Nenhuma story gerada para este épico</p>
              <Button
                onClick={onGenerateStories}
                disabled={isGenerating}
                style={{ backgroundColor: PRD_PRIMARY }}
              >
                {isGenerating ? (
                  <>
                    <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Icon name="sparkles" className="mr-2 size-4" />
                    Gerar Stories
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  isExpanded={expandedStoryId === story.id}
                  isEditing={editingStoryId === story.id}
                  onToggleExpand={() => onToggleStoryExpand(story.id)}
                  onEdit={() => onEditStory(story.id)}
                  onSave={(updates) => onSaveStory(story.id, updates)}
                  onCancel={onCancelEdit}
                  onDelete={() => onDeleteStory(story.id)}
                />
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={onAddStory}>
                  <Icon name="plus" className="mr-1.5 size-3" />
                  Adicionar Story
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGenerateStories}
                  disabled={isGenerating}
                >
                  <Icon
                    name={isGenerating ? 'spinner' : 'sparkles'}
                    className={cn('mr-1.5 size-3', isGenerating && 'animate-spin')}
                  />
                  Regenerar
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDStoriesTemplate: React.FC<PRDStoriesTemplateProps> = ({
  project,
  initialEpics,
  initialStories,
  onUpdateStories,
  onUpdateEpics,
  onNext,
}) => {
  const { generate, isGenerating } = usePRDAI();
  const [stories, setStories] = useState<StoryData[]>(() => {
    // Prioritize initialStories (from database), fallback to metadata
    if (initialStories && initialStories.length > 0) return initialStories;
    return project.project_metadata?.stories || [];
  });
  const [epics, setEpics] = useState<EpicData[]>(() => {
    // Prioritize initialEpics (from database), fallback to metadata
    if (initialEpics && initialEpics.length > 0) return initialEpics;
    return project.project_metadata?.epics || [];
  });

  // Update when initialEpics/initialStories change (after loadContents)
  React.useEffect(() => {
    if (initialEpics && initialEpics.length > 0) {
      setEpics(initialEpics);
    }
  }, [initialEpics]);

  React.useEffect(() => {
    if (initialStories && initialStories.length > 0) {
      setStories(initialStories);
    }
  }, [initialStories]);

  const [openEpicId, setOpenEpicId] = useState<string | null>(null);

  // Initialize openEpicId when epics are available
  React.useEffect(() => {
    if (epics.length > 0 && !openEpicId) {
      setOpenEpicId(epics[0].id);
    }
  }, [epics, openEpicId]);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [generatingEpicId, setGeneratingEpicId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const brief = project.project_metadata?.brief?.structure;

  // Group stories by epic
  const storiesByEpic = useMemo(() => {
    const grouped: Record<string, StoryData[]> = {};
    epics.forEach((epic) => {
      grouped[epic.id] = stories
        .filter((s) => s.epic_id === epic.id)
        .sort((a, b) => a.sequence_order - b.sequence_order);
    });
    return grouped;
  }, [stories, epics]);

  // Stats
  const totalStories = stories.length;
  const validStories = stories.filter((s) => s.isValid).length;
  const allValid = totalStories > 0 && validStories === totalStories;

  // Generate stories for an epic
  const handleGenerateStories = useCallback(
    async (epicId: string) => {
      const epic = epics.find((e) => e.id === epicId);
      if (!epic || !brief) return;

      setGeneratingEpicId(epicId);
      try {
        const prompt = STORIES_USER.replace('{epicTitle}', epic.title)
          .replace('{epicDescription}', epic.description)
          .replace('{problem}', brief.problem || '')
          .replace('{solution}', brief.solution || '')
          .replace('{count}', String(epic.storiesCount || 5));

        const result = await generate(prompt, {
          systemPrompt: STORIES_SYSTEM,
          temperature: 0.7,
          maxTokens: 4096,
        });

        const jsonMatch = result.content.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
          console.error('[PRD-Stories] No JSON found in response');
          return;
        }

        const parsed = JSON.parse(jsonMatch[0]) as Array<{
          title: string;
          userStory: string;
          acceptanceCriteria: string[];
          complexity: Complexity;
        }>;

        // Transform to StoryData
        const newStories: StoryData[] = parsed.map((item, index) => ({
          id: `story-${Date.now()}-${index}`,
          epic_id: epicId,
          sequence_order: index + 1,
          title: item.title,
          userStory: item.userStory,
          acceptanceCriteria: item.acceptanceCriteria || [],
          complexity: item.complexity || 'M',
          isValid: true,
        }));

        // Replace stories for this epic
        const otherStories = stories.filter((s) => s.epic_id !== epicId);
        const updated = [...otherStories, ...newStories];
        setStories(updated);
        await onUpdateStories(updated);

        // Update epic status
        const updatedEpics = epics.map((e) =>
          e.id === epicId
            ? { ...e, storiesCount: newStories.length, status: 'stories_generated' as const }
            : e
        );
        await onUpdateEpics(updatedEpics);
      } catch (err) {
        console.error('[PRD-Stories] Failed to generate stories:', err);
      } finally {
        setGeneratingEpicId(null);
      }
    },
    [epics, brief, stories, generate, onUpdateStories, onUpdateEpics]
  );

  // Add new story
  const handleAddStory = useCallback(
    (epicId: string) => {
      const epicStories = storiesByEpic[epicId] || [];
      const newStory: StoryData = {
        id: `story-${Date.now()}`,
        epic_id: epicId,
        sequence_order: epicStories.length + 1,
        title: 'Nova Story',
        userStory: 'Como usuário, quero ..., para ...',
        acceptanceCriteria: ['Critério 1'],
        complexity: 'M',
        isValid: false,
        validationErrors: ['Story precisa ser preenchida'],
      };

      const updated = [...stories, newStory];
      setStories(updated);
      setEditingStoryId(newStory.id);
      onUpdateStories(updated);
    },
    [stories, storiesByEpic, onUpdateStories]
  );

  // Save story
  const handleSaveStory = useCallback(
    async (storyId: string, updates: Partial<StoryData>) => {
      const updated = stories.map((s) =>
        s.id === storyId ? { ...s, ...updates, isValid: true, validationErrors: undefined } : s
      );
      setStories(updated);
      setEditingStoryId(null);
      await onUpdateStories(updated);
    },
    [stories, onUpdateStories]
  );

  // Delete story
  const handleDeleteStory = useCallback(
    async (storyId: string) => {
      const story = stories.find((s) => s.id === storyId);
      if (!story) return;

      const filtered = stories.filter((s) => s.id !== storyId);
      // Reorder within epic
      const epicStories = filtered.filter((s) => s.epic_id === story.epic_id);
      const reordered = filtered.map((s) => {
        if (s.epic_id === story.epic_id) {
          const newOrder = epicStories.findIndex((es) => es.id === s.id) + 1;
          return { ...s, sequence_order: newOrder };
        }
        return s;
      });

      setStories(reordered);
      setShowDeleteConfirm(null);
      await onUpdateStories(reordered);
    },
    [stories, onUpdateStories]
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge className={cn(PRD_STATUS.stories.bg, PRD_STATUS.stories.text)}>Stories</Badge>
            <PRDEffortIndicator human={10} ai={90} size="md" />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              {totalStories} stories • {validStories} válidas
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">User Stories</h2>
              <p className="text-sm text-muted-foreground">
                Clique em um épico para expandir e gerenciar suas stories
              </p>
            </div>
          </div>

          {epics.length === 0 ? (
            <Card className="p-12 text-center">
              <Icon name="folder-open" className="mx-auto mb-4 size-12 text-muted-foreground/30" />
              <h3 className="mb-2 text-lg font-bold">Nenhum Épico</h3>
              <p className="text-muted-foreground">Crie épicos primeiro para poder gerar stories</p>
            </Card>
          ) : (
            epics.map((epic) => (
              <EpicAccordion
                key={epic.id}
                epic={epic}
                stories={storiesByEpic[epic.id] || []}
                isOpen={openEpicId === epic.id}
                isGenerating={generatingEpicId === epic.id}
                expandedStoryId={expandedStoryId}
                editingStoryId={editingStoryId}
                onToggle={() => setOpenEpicId(openEpicId === epic.id ? null : epic.id)}
                onGenerateStories={() => handleGenerateStories(epic.id)}
                onToggleStoryExpand={(id) => setExpandedStoryId(expandedStoryId === id ? null : id)}
                onEditStory={(id) => setEditingStoryId(id)}
                onSaveStory={handleSaveStory}
                onCancelEdit={() => setEditingStoryId(null)}
                onDeleteStory={(id) => setShowDeleteConfirm(id)}
                onAddStory={() => handleAddStory(epic.id)}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      {totalStories > 0 && (
        <footer className="border-t bg-background p-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {allValid ? (
                <span className="text-emerald-500">
                  <Icon name="check-circle" className="mr-1.5 inline size-4" />
                  Todas as stories estão válidas
                </span>
              ) : (
                <span className="text-amber-500">
                  <Icon name="alert-circle" className="mr-1.5 inline size-4" />
                  {totalStories - validStories} stories precisam de atenção
                </span>
              )}
            </div>
            <Button
              onClick={onNext}
              disabled={!allValid}
              style={{ backgroundColor: allValid ? PRD_PRIMARY : undefined }}
            >
              Avançar para Exportar
              <Icon name="arrow-right" className="ml-2 size-4" />
            </Button>
          </div>
        </footer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent onClose={() => setShowDeleteConfirm(null)}>
          <DialogHeader>
            <DialogTitle>Deletar Story?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Esta ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => showDeleteConfirm && handleDeleteStory(showDeleteConfirm)}
            >
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PRDStoriesTemplate;
