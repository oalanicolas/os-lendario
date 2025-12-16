import React, { useState, useCallback, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PRDProject, EpicData } from '../../../types/prd';
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

// Re-export EpicData for convenience
export type { EpicData } from '../../../types/prd';

interface PRDEpicsTemplateProps {
  project: PRDProject;
  initialEpics?: EpicData[];  // Épicos carregados do banco
  onUpdateEpics: (epics: EpicData[]) => Promise<void>;
  onGenerateStories: (epicId: string) => void;
  onGenerateAllStories: () => void;
  onNext: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const STATUS_CONFIG: Record<EpicData['status'], { label: string; color: string; icon: string }> = {
  pending: { label: 'Pendente', color: 'text-muted-foreground', icon: 'circle' },
  stories_generated: { label: 'Stories Geradas', color: 'text-cyan-500', icon: 'check-circle' },
  complete: { label: 'Completo', color: 'text-emerald-500', icon: 'check-circle-2' },
};

// =============================================================================
// PROMPTS
// =============================================================================

const EPICS_SYSTEM = `Você é um product manager experiente que quebra PRDs em épicos bem definidos.
Cada épico deve ser um bloco lógico de trabalho que pode ser desenvolvido de forma independente.
Seja claro e objetivo nas descrições.`;

const EPICS_PROMPT = `Analise o seguinte PRD e gere 3-6 épicos bem estruturados:

## Objetivos
{objectives}

## Escopo
{scope}

## User Stories
{userStories}

## Requisitos
{requirements}

---

Gere épicos no formato JSON:
[
  {
    "title": "Nome curto do épico",
    "description": "Descrição em 2-3 frases do que este épico abrange"
  }
]

Regras:
- Cada épico deve ser um bloco lógico de funcionalidade
- Ordene do mais fundamental ao mais avançado
- O primeiro épico geralmente é setup/infraestrutura
- Os épicos devem cobrir todo o escopo do PRD`;

// =============================================================================
// SORTABLE EPIC CARD
// =============================================================================

interface SortableEpicCardProps {
  epic: EpicData;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
  onDelete: () => void;
  onGenerateStories: () => void;
}

const SortableEpicCard: React.FC<SortableEpicCardProps> = ({
  epic,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onGenerateStories,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: epic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  const [editTitle, setEditTitle] = useState(epic.title);
  const [editDescription, setEditDescription] = useState(epic.description);
  const statusConfig = STATUS_CONFIG[epic.status];

  const handleSave = () => {
    if (editTitle.trim()) {
      onSave(editTitle.trim(), editDescription.trim());
    }
  };

  if (isEditing) {
    return (
      <div ref={setNodeRef} style={style}>
        <Card className="p-4 border-primary/50">
          <div className="space-y-3">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título do épico"
              className="font-semibold"
              autoFocus
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descrição do épico..."
              className="min-h-[80px] resize-none"
            />
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
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={cn(
        "p-4 hover:border-primary/30 transition-colors group",
        isDragging && "shadow-lg border-primary/50"
      )}>
        <div className="flex items-start gap-4">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="mt-1 p-1.5 rounded hover:bg-muted cursor-grab active:cursor-grabbing touch-none"
            aria-label="Arrastar para reordenar"
          >
            <Icon name="grip-vertical" className="size-4 text-muted-foreground" />
          </button>

          {/* Epic Number */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-lg"
            style={{ backgroundColor: `${PRD_PRIMARY}20`, color: PRD_PRIMARY }}
          >
            {epic.sequence_order}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base truncate">{epic.title}</h3>
              <Badge variant="outline" className={cn("text-xs", statusConfig.color)}>
                <Icon name={statusConfig.icon} className="mr-1 size-3" />
                {statusConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{epic.description}</p>
            {epic.storiesCount > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                <Icon name="list-checks" className="inline mr-1 size-3" />
                {epic.storiesCount} stories
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0">
              <Icon name="edit" className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0 text-destructive">
              <Icon name="trash" className="size-4" />
            </Button>
            {epic.status === 'pending' && (
              <Button
                variant="outline"
                size="sm"
                onClick={onGenerateStories}
                className="ml-2"
              >
                <Icon name="sparkles" className="mr-1.5 size-3" />
                Gerar Stories
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// =============================================================================
// ADD EPIC CARD
// =============================================================================

const AddEpicCard: React.FC<{
  onAdd: (title: string, description: string) => void;
}> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full p-4 border-2 border-dashed border-muted-foreground/30 rounded-xl text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors flex items-center justify-center gap-2"
      >
        <Icon name="plus" className="size-5" />
        Adicionar Épico
      </button>
    );
  }

  return (
    <Card className="p-4 border-primary/50">
      <div className="space-y-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do novo épico"
          className="font-semibold"
          autoFocus
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição do épico..."
          className="min-h-[80px] resize-none"
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleAdd} disabled={!title.trim()}>
            <Icon name="plus" className="mr-1.5 size-3" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDEpicsTemplate: React.FC<PRDEpicsTemplateProps> = ({
  project,
  initialEpics,
  onUpdateEpics,
  onGenerateStories,
  onGenerateAllStories,
  onNext
}) => {
  const { generate, isGenerating, progress } = usePRDAI();
  const [epics, setEpics] = useState<EpicData[]>(() => {
    // Prioritize initialEpics (from database), fallback to metadata
    if (initialEpics && initialEpics.length > 0) {
      return initialEpics;
    }
    const existingEpics = project.project_metadata?.epics as EpicData[] | undefined;
    return existingEpics || [];
  });

  // Update epics when initialEpics changes (e.g., after loadContents)
  React.useEffect(() => {
    if (initialEpics && initialEpics.length > 0) {
      setEpics(initialEpics);
    }
  }, [initialEpics]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const prdDocument = project.project_metadata?.prdDocument?.document;

  // DnD sensors for pointer, touch, and keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Check if all epics have stories generated
  const allStoriesGenerated = useMemo(() => {
    return epics.length > 0 && epics.every(e => e.status !== 'pending');
  }, [epics]);

  const hasEpics = epics.length > 0;
  const pendingEpics = epics.filter(e => e.status === 'pending').length;

  // Handle drag end - reorder epics
  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = epics.findIndex(e => e.id === active.id);
      const newIndex = epics.findIndex(e => e.id === over.id);

      const reordered = arrayMove(epics, oldIndex, newIndex).map((epic, index) => ({
        ...epic,
        sequence_order: index + 1,
      }));

      setEpics(reordered);
      await onUpdateEpics(reordered);
    }
  }, [epics, onUpdateEpics]);

  // Generate epics from PRD
  const handleGenerateEpics = useCallback(async () => {
    if (!prdDocument) return;

    try {
      const prompt = EPICS_PROMPT
        .replace('{objectives}', prdDocument.objectives?.content || '')
        .replace('{scope}', prdDocument.scope?.content || '')
        .replace('{userStories}', prdDocument.userStories?.content || '')
        .replace('{requirements}', prdDocument.requirements?.content || '');

      const result = await generate(prompt, {
        systemPrompt: EPICS_SYSTEM,
        temperature: 0.7,
        maxTokens: 2048,
      });

      const jsonMatch = result.content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error('[PRD-Epics] No JSON found in response');
        return;
      }

      const parsed = JSON.parse(jsonMatch[0]) as Array<{ title: string; description: string }>;

      const newEpics: EpicData[] = parsed.map((item, index) => ({
        id: `epic-${Date.now()}-${index}`,
        sequence_order: index + 1,
        title: item.title,
        description: item.description,
        storiesCount: 0,
        status: 'pending' as const,
      }));

      setEpics(newEpics);
      await onUpdateEpics(newEpics);
    } catch (err) {
      console.error('[PRD-Epics] Failed to generate epics:', err);
    }
  }, [prdDocument, generate, onUpdateEpics]);

  // Add new epic
  const handleAddEpic = useCallback(async (title: string, description: string) => {
    const newEpic: EpicData = {
      id: `epic-${Date.now()}`,
      sequence_order: epics.length + 1,
      title,
      description,
      storiesCount: 0,
      status: 'pending',
    };

    const updated = [...epics, newEpic];
    setEpics(updated);
    await onUpdateEpics(updated);
  }, [epics, onUpdateEpics]);

  // Edit epic
  const handleEditEpic = useCallback(async (id: string, title: string, description: string) => {
    const updated = epics.map(e =>
      e.id === id ? { ...e, title, description } : e
    );
    setEpics(updated);
    setEditingId(null);
    await onUpdateEpics(updated);
  }, [epics, onUpdateEpics]);

  // Delete epic
  const handleDeleteEpic = useCallback(async (id: string) => {
    const filtered = epics.filter(e => e.id !== id);
    const reordered = filtered.map((e, i) => ({
      ...e,
      sequence_order: i + 1,
    }));
    setEpics(reordered);
    setShowDeleteConfirm(null);
    await onUpdateEpics(reordered);
  }, [epics, onUpdateEpics]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b p-4 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge className={cn(PRD_STATUS.epics.bg, PRD_STATUS.epics.text)}>
              Épicos
            </Badge>
            <PRDEffortIndicator human={30} ai={70} size="md" />
          </div>
          <div className="flex items-center gap-2">
            {hasEpics && pendingEpics > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onGenerateAllStories}
              >
                <Icon name="sparkles" className="mr-1.5 size-4" />
                Gerar Todas Stories ({pendingEpics})
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        {!hasEpics && !isGenerating ? (
          <Card className="p-12 text-center max-w-xl mx-auto">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${PRD_PRIMARY}20` }}
            >
              <Icon name="milestone" size="size-8" style={{ color: PRD_PRIMARY }} />
            </div>
            <h3 className="text-lg font-bold mb-2">Gerar Épicos</h3>
            <p className="text-muted-foreground mb-6">
              A IA vai analisar o PRD e dividir o projeto em épicos lógicos
            </p>
            <Button
              onClick={handleGenerateEpics}
              style={{ backgroundColor: PRD_PRIMARY }}
              disabled={!prdDocument}
            >
              <Icon name="sparkles" className="mr-2 size-4" />
              Gerar Épicos
            </Button>
            {!prdDocument && (
              <p className="text-xs text-destructive mt-4">
                Complete o PRD antes de gerar épicos
              </p>
            )}
          </Card>
        ) : isGenerating && !hasEpics ? (
          <Card className="p-12 text-center max-w-xl mx-auto">
            <Icon
              name="spinner"
              className="animate-spin mx-auto size-12 mb-4"
              style={{ color: PRD_PRIMARY }}
            />
            <h3 className="text-lg font-bold mb-2">Gerando Épicos...</h3>
            <p className="text-muted-foreground">Analisando o PRD e criando blocos de trabalho</p>
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
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Épicos do Projeto</h2>
                <p className="text-sm text-muted-foreground">
                  {epics.length} épico{epics.length !== 1 ? 's' : ''} • {pendingEpics} pendente{pendingEpics !== 1 ? 's' : ''} • Arraste para reordenar
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateEpics}
                disabled={isGenerating}
              >
                <Icon name="refresh" className={cn("mr-1.5 size-4", isGenerating && "animate-spin")} />
                Regenerar
              </Button>
            </div>

            {/* Sortable Epic Cards */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={epics.map(e => e.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {epics.map((epic) => (
                    <SortableEpicCard
                      key={epic.id}
                      epic={epic}
                      isEditing={editingId === epic.id}
                      onEdit={() => setEditingId(epic.id)}
                      onSave={(title, description) => handleEditEpic(epic.id, title, description)}
                      onCancel={() => setEditingId(null)}
                      onDelete={() => setShowDeleteConfirm(epic.id)}
                      onGenerateStories={() => onGenerateStories(epic.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Add Epic */}
            <AddEpicCard onAdd={handleAddEpic} />
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      {hasEpics && (
        <footer className="border-t p-4 bg-background">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <div className="text-sm text-muted-foreground">
              {allStoriesGenerated ? (
                <span className="text-emerald-500">
                  <Icon name="check-circle" className="inline mr-1.5 size-4" />
                  Todas as stories geradas
                </span>
              ) : (
                <span>Gere as stories para cada épico antes de avançar</span>
              )}
            </div>
            <Button
              onClick={onNext}
              disabled={!allStoriesGenerated}
              style={{ backgroundColor: allStoriesGenerated ? PRD_PRIMARY : undefined }}
            >
              Avançar para Stories
              <Icon name="arrow-right" className="ml-2 size-4" />
            </Button>
          </div>
        </footer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent onClose={() => setShowDeleteConfirm(null)}>
          <DialogHeader>
            <DialogTitle>Deletar Épico?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Esta ação não pode ser desfeita. O épico e todas as suas stories serão removidos.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => showDeleteConfirm && handleDeleteEpic(showDeleteConfirm)}
            >
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PRDEpicsTemplate;
