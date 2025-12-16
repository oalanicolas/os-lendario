import React, { useState, useCallback } from 'react';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY } from '../prd-tokens';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export interface ObjectivesContent {
  mainObjective: string;
  secondaryObjectives: string[];
  nonObjectives: string[];
  notes?: string;
}

type ApprovalStatus = 'pending' | 'approved' | 'adjust' | 'rejected';

interface ObjectiveItem {
  id: string;
  text: string;
  status: ApprovalStatus;
}

interface ObjectivesSectionProps {
  content: ObjectivesContent | null;
  briefProblem: string;
  briefSolution: string;
  onUpdate: (content: ObjectivesContent) => Promise<void>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const APPROVAL_CONFIG: Record<ApprovalStatus, { label: string; icon: string; color: string; bgColor: string }> = {
  pending: { label: 'Pendente', icon: 'clock', color: 'text-muted-foreground', bgColor: 'bg-muted' },
  approved: { label: 'Aprovado', icon: 'check', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  adjust: { label: 'Ajustar', icon: 'edit', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  rejected: { label: 'Rejeitado', icon: 'cross', color: 'text-red-500', bgColor: 'bg-red-500/10' },
};

const EMPTY_CONTENT: ObjectivesContent = {
  mainObjective: '',
  secondaryObjectives: [],
  nonObjectives: [],
  notes: '',
};

// =============================================================================
// PROMPTS
// =============================================================================

const OBJECTIVES_SYSTEM = `Você é um product manager experiente definindo objetivos claros e mensuráveis.
Objetivos devem ser SMART: Específicos, Mensuráveis, Alcançáveis, Relevantes e com Prazo definido.`;

const OBJECTIVES_PROMPT = `Baseado no seguinte problema e solução, defina os objetivos do projeto:

PROBLEMA:
{problem}

SOLUÇÃO:
{solution}

Responda em JSON:
{
  "mainObjective": "Objetivo principal claro e mensurável",
  "secondaryObjectives": ["Objetivo secundário 1", "Objetivo secundário 2", "Objetivo secundário 3"],
  "nonObjectives": ["O que NÃO é objetivo deste projeto 1", "O que NÃO é objetivo 2"]
}`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const ObjectiveItemCard: React.FC<{
  item: ObjectiveItem;
  type: 'main' | 'secondary' | 'non';
  onUpdate: (text: string) => void;
  onStatusChange: (status: ApprovalStatus) => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}> = ({ item, type, onUpdate, onStatusChange, onDelete, onRegenerate, isRegenerating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const statusConfig = APPROVAL_CONFIG[item.status];

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(editText.trim());
      setIsEditing(false);
    }
  };

  const typeConfig = {
    main: { label: 'Principal', color: PRD_PRIMARY, icon: 'bullseye' },
    secondary: { label: 'Secundário', color: '#3B82F6', icon: 'target' },
    non: { label: 'Não-Objetivo', color: '#6B7280', icon: 'ban' },
  };

  const config = typeConfig[type];

  return (
    <Card className={cn(
      "p-4 transition-all",
      statusConfig.bgColor,
      "border-l-4"
    )} style={{ borderLeftColor: config.color }}>
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon name={config.icon} size="size-4" style={{ color: config.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {type === 'main' && (
            <Badge variant="outline" className="mb-2 text-[10px]" style={{ borderColor: config.color, color: config.color }}>
              {config.label}
            </Badge>
          )}

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[60px] resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>Salvar</Button>
                <Button size="sm" variant="ghost" onClick={() => {
                  setEditText(item.text);
                  setIsEditing(false);
                }}>Cancelar</Button>
              </div>
            </div>
          ) : (
            <p
              className="text-sm cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsEditing(true)}
            >
              {item.text || <span className="text-muted-foreground italic">Clique para editar...</span>}
            </p>
          )}

          {/* Status & Actions */}
          {!isEditing && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {/* Approval Buttons */}
              <div className="flex gap-1">
                {(['approved', 'adjust', 'rejected'] as ApprovalStatus[]).map((status) => {
                  const cfg = APPROVAL_CONFIG[status];
                  const isActive = item.status === status;
                  return (
                    <Button
                      key={status}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "h-7 px-2",
                        isActive && cfg.bgColor,
                        isActive && cfg.color
                      )}
                      onClick={() => onStatusChange(status)}
                    >
                      <Icon name={cfg.icon} size="size-3" className="mr-1" />
                      <span className="text-xs">{cfg.label}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-1 ml-auto">
                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground"
                    onClick={onRegenerate}
                    disabled={isRegenerating}
                  >
                    <Icon name={isRegenerating ? "spinner" : "refresh"} size="size-3" className={cn(isRegenerating && "animate-spin")} />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground hover:text-destructive"
                    onClick={onDelete}
                  >
                    <Icon name="trash" size="size-3" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({
  content,
  briefProblem,
  briefSolution,
  onUpdate
}) => {
  const { generate, isGenerating, progress } = usePRDAI();
  const [objectives, setObjectives] = useState<ObjectivesContent>(content || EMPTY_CONTENT);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  // Convert to items with status
  const [mainStatus, setMainStatus] = useState<ApprovalStatus>('pending');
  const [secondaryStatuses, setSecondaryStatuses] = useState<Record<string, ApprovalStatus>>({});
  const [nonStatuses, setNonStatuses] = useState<Record<string, ApprovalStatus>>({});

  // Generate objectives
  const handleGenerate = useCallback(async () => {
    try {
      const prompt = OBJECTIVES_PROMPT
        .replace('{problem}', briefProblem)
        .replace('{solution}', briefSolution);

      const result = await generate(prompt, {
        systemPrompt: OBJECTIVES_SYSTEM,
        temperature: 0.7,
      });

      let parsed: ObjectivesContent;
      try {
        const jsonMatch = result.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch {
        console.error('Failed to parse objectives');
        return;
      }

      setObjectives(parsed);
      await onUpdate(parsed);
    } catch (err) {
      console.error('Failed to generate objectives:', err);
    }
  }, [briefProblem, briefSolution, generate, onUpdate]);

  // Update handlers
  const handleUpdateMain = useCallback(async (text: string) => {
    const updated = { ...objectives, mainObjective: text };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleUpdateSecondary = useCallback(async (index: number, text: string) => {
    const updated = {
      ...objectives,
      secondaryObjectives: objectives.secondaryObjectives.map((o, i) => i === index ? text : o)
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleDeleteSecondary = useCallback(async (index: number) => {
    const updated = {
      ...objectives,
      secondaryObjectives: objectives.secondaryObjectives.filter((_, i) => i !== index)
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleAddSecondary = useCallback(async () => {
    const updated = {
      ...objectives,
      secondaryObjectives: [...objectives.secondaryObjectives, '']
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleUpdateNon = useCallback(async (index: number, text: string) => {
    const updated = {
      ...objectives,
      nonObjectives: objectives.nonObjectives.map((o, i) => i === index ? text : o)
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleDeleteNon = useCallback(async (index: number) => {
    const updated = {
      ...objectives,
      nonObjectives: objectives.nonObjectives.filter((_, i) => i !== index)
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleAddNon = useCallback(async () => {
    const updated = {
      ...objectives,
      nonObjectives: [...objectives.nonObjectives, '']
    };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const handleUpdateNotes = useCallback(async (notes: string) => {
    const updated = { ...objectives, notes };
    setObjectives(updated);
    await onUpdate(updated);
  }, [objectives, onUpdate]);

  const hasContent = objectives.mainObjective || objectives.secondaryObjectives.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Icon name="bullseye" style={{ color: PRD_PRIMARY }} />
            Objetivos do Projeto
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Defina o que o projeto deve alcançar e o que não faz parte do escopo
          </p>
        </div>
        {hasContent && (
          <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
            <Icon name="refresh" className="mr-1.5 size-4" />
            Regenerar
          </Button>
        )}
      </div>

      {/* Initial State */}
      {!hasContent && !isGenerating && (
        <Card className="p-8 text-center">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: `${PRD_PRIMARY}20` }}
          >
            <Icon name="bullseye" size="size-6" style={{ color: PRD_PRIMARY }} />
          </div>
          <h4 className="font-bold mb-2">Gerar Objetivos</h4>
          <p className="text-sm text-muted-foreground mb-4">
            A IA vai definir objetivos baseados no brief
          </p>
          <Button onClick={handleGenerate} style={{ backgroundColor: PRD_PRIMARY }}>
            <Icon name="sparkles" className="mr-2 size-4" />
            Gerar Objetivos
          </Button>
        </Card>
      )}

      {/* Loading */}
      {isGenerating && !hasContent && (
        <Card className="p-8 text-center">
          <Icon name="spinner" className="animate-spin mx-auto size-8 mb-3" style={{ color: PRD_PRIMARY }} />
          <p className="text-sm text-muted-foreground">Gerando objetivos...</p>
        </Card>
      )}

      {/* Content */}
      {hasContent && (
        <div className="space-y-6">
          {/* Main Objective */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Objetivo Principal
            </h4>
            <ObjectiveItemCard
              item={{ id: 'main', text: objectives.mainObjective, status: mainStatus }}
              type="main"
              onUpdate={handleUpdateMain}
              onStatusChange={setMainStatus}
            />
          </div>

          {/* Secondary Objectives */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Objetivos Secundários
              </h4>
              <Button variant="ghost" size="sm" onClick={handleAddSecondary}>
                <Icon name="plus" className="mr-1 size-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {objectives.secondaryObjectives.map((obj, index) => (
                <ObjectiveItemCard
                  key={index}
                  item={{
                    id: `secondary-${index}`,
                    text: obj,
                    status: secondaryStatuses[index] || 'pending'
                  }}
                  type="secondary"
                  onUpdate={(text) => handleUpdateSecondary(index, text)}
                  onStatusChange={(status) => setSecondaryStatuses(prev => ({ ...prev, [index]: status }))}
                  onDelete={() => handleDeleteSecondary(index)}
                />
              ))}
            </div>
          </div>

          {/* Non-Objectives */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Não-Objetivos (Fora do Escopo)
              </h4>
              <Button variant="ghost" size="sm" onClick={handleAddNon}>
                <Icon name="plus" className="mr-1 size-3" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {objectives.nonObjectives.map((obj, index) => (
                <ObjectiveItemCard
                  key={index}
                  item={{
                    id: `non-${index}`,
                    text: obj,
                    status: nonStatuses[index] || 'pending'
                  }}
                  type="non"
                  onUpdate={(text) => handleUpdateNon(index, text)}
                  onStatusChange={(status) => setNonStatuses(prev => ({ ...prev, [index]: status }))}
                  onDelete={() => handleDeleteNon(index)}
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Notas e Feedback
            </h4>
            <Textarea
              value={objectives.notes || ''}
              onChange={(e) => handleUpdateNotes(e.target.value)}
              placeholder="Adicione notas ou feedback sobre os objetivos..."
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectivesSection;
