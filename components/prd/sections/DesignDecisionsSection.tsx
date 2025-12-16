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

export type DesignCategory = 'ux' | 'tech' | 'business';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface DesignDecision {
  id: string;
  title: string;
  description: string;
  alternatives: string[];
  justification: string;
  category: DesignCategory;
  referenceImages?: string[];
  status: ApprovalStatus;
}

export interface DesignDecisionsContent {
  decisions: DesignDecision[];
  notes?: string;
}

interface DesignDecisionsSectionProps {
  content: DesignDecisionsContent | null;
  briefSolution: string;
  onUpdate: (content: DesignDecisionsContent) => Promise<void>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const CATEGORY_CONFIG: Record<DesignCategory, { label: string; icon: string; color: string }> = {
  ux: { label: 'UX', icon: 'palette', color: '#8B5CF6' },
  tech: { label: 'Tech', icon: 'code', color: '#3B82F6' },
  business: { label: 'Business', icon: 'chart-line', color: '#10B981' },
};

const STATUS_CONFIG: Record<ApprovalStatus, { label: string; icon: string; color: string }> = {
  pending: { label: 'Pendente', icon: 'clock', color: 'text-muted-foreground' },
  approved: { label: 'Aprovado', icon: 'check', color: 'text-emerald-500' },
  rejected: { label: 'Rejeitado', icon: 'cross', color: 'text-red-500' },
};

const EMPTY_CONTENT: DesignDecisionsContent = { decisions: [], notes: '' };

// =============================================================================
// PROMPTS
// =============================================================================

const DESIGN_SYSTEM = `Você é um designer e arquiteto de software experiente.
Documente decisões de design claras com justificativas e alternativas consideradas.`;

const DESIGN_PROMPT = `Baseado na seguinte solução, gere 4-5 decisões de design importantes:

SOLUÇÃO:
{solution}

Responda em JSON:
{
  "decisions": [
    {
      "title": "Nome da decisão",
      "description": "O que foi decidido",
      "alternatives": ["Alternativa 1 considerada", "Alternativa 2 considerada"],
      "justification": "Por que esta decisão foi tomada",
      "category": "ux" | "tech" | "business"
    }
  ]
}`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const DecisionCard: React.FC<{
  decision: DesignDecision;
  onUpdate: (decision: DesignDecision) => void;
  onDelete: () => void;
}> = ({ decision, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(decision);

  const categoryConfig = CATEGORY_CONFIG[decision.category];
  const statusConfig = STATUS_CONFIG[decision.status];

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  return (
    <Card className={cn(
      "p-4 transition-all",
      decision.status === 'approved' && "border-emerald-500/30 bg-emerald-500/5",
      decision.status === 'rejected' && "border-red-500/30 bg-red-500/5"
    )}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${categoryConfig.color}20` }}
        >
          <Icon name={categoryConfig.icon} size="size-5" style={{ color: categoryConfig.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" style={{ borderColor: categoryConfig.color, color: categoryConfig.color }} className="text-[10px]">
              {categoryConfig.label}
            </Badge>
            <Icon name={statusConfig.icon} size="size-3" className={statusConfig.color} />
          </div>

          {isEditing ? (
            <Input
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="font-bold mb-2"
            />
          ) : (
            <h4 className="font-bold text-foreground">{decision.title}</h4>
          )}

          {isEditing ? (
            <Textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="mt-2 min-h-[60px]"
            />
          ) : (
            <p className="text-sm text-muted-foreground mt-1">{decision.description}</p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "angle-small-up" : "angle-small-down"} size="size-4" />
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t space-y-4">
          {/* Alternatives */}
          <div>
            <h5 className="text-xs font-medium text-muted-foreground uppercase mb-2">Alternativas Consideradas</h5>
            <ul className="space-y-1">
              {decision.alternatives.map((alt, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span className="text-muted-foreground">•</span>
                  {alt}
                </li>
              ))}
            </ul>
          </div>

          {/* Justification */}
          <div>
            <h5 className="text-xs font-medium text-muted-foreground uppercase mb-2">Justificativa</h5>
            <p className="text-sm">{decision.justification}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>Salvar</Button>
                <Button size="sm" variant="ghost" onClick={() => {
                  setEditData(decision);
                  setIsEditing(false);
                }}>Cancelar</Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant={decision.status === 'approved' ? "default" : "outline"}
                  className={cn(decision.status === 'approved' && "bg-emerald-600")}
                  onClick={() => onUpdate({ ...decision, status: 'approved' })}
                >
                  <Icon name="check" className="mr-1 size-3" />
                  Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                >
                  <Icon name="edit" className="mr-1 size-3" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={onDelete}
                >
                  <Icon name="trash" className="mr-1 size-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const DesignDecisionsSection: React.FC<DesignDecisionsSectionProps> = ({
  content,
  briefSolution,
  onUpdate
}) => {
  const { generate, isGenerating } = usePRDAI();
  const [decisions, setDecisions] = useState<DesignDecisionsContent>(content || EMPTY_CONTENT);

  const handleGenerate = useCallback(async () => {
    try {
      const prompt = DESIGN_PROMPT.replace('{solution}', briefSolution);
      const result = await generate(prompt, {
        systemPrompt: DESIGN_SYSTEM,
        temperature: 0.7,
      });

      let parsed: { decisions: Omit<DesignDecision, 'id' | 'status'>[] };
      try {
        const jsonMatch = result.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
        else throw new Error('No JSON');
      } catch {
        return;
      }

      const withIds: DesignDecision[] = parsed.decisions.map((d, i) => ({
        ...d,
        id: `decision-${Date.now()}-${i}`,
        status: 'pending' as ApprovalStatus,
      }));

      const updated = { ...decisions, decisions: withIds };
      setDecisions(updated);
      await onUpdate(updated);
    } catch (err) {
      console.error('Failed to generate design decisions:', err);
    }
  }, [briefSolution, generate, decisions, onUpdate]);

  const handleUpdateDecision = useCallback(async (index: number, decision: DesignDecision) => {
    const updated = {
      ...decisions,
      decisions: decisions.decisions.map((d, i) => i === index ? decision : d)
    };
    setDecisions(updated);
    await onUpdate(updated);
  }, [decisions, onUpdate]);

  const handleDeleteDecision = useCallback(async (index: number) => {
    const updated = {
      ...decisions,
      decisions: decisions.decisions.filter((_, i) => i !== index)
    };
    setDecisions(updated);
    await onUpdate(updated);
  }, [decisions, onUpdate]);

  const handleAddDecision = useCallback(async () => {
    const newDecision: DesignDecision = {
      id: `decision-${Date.now()}`,
      title: 'Nova Decisão',
      description: '',
      alternatives: [],
      justification: '',
      category: 'tech',
      status: 'pending',
    };
    const updated = { ...decisions, decisions: [...decisions.decisions, newDecision] };
    setDecisions(updated);
    await onUpdate(updated);
  }, [decisions, onUpdate]);

  const hasContent = decisions.decisions.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Icon name="palette" style={{ color: PRD_PRIMARY }} />
            Decisões de Design
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Documente escolhas arquiteturais e de UX com justificativas
          </p>
        </div>
        {hasContent && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAddDecision}>
              <Icon name="plus" className="mr-1.5 size-4" />
              Adicionar
            </Button>
            <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
              <Icon name="refresh" className="mr-1.5 size-4" />
              Regenerar
            </Button>
          </div>
        )}
      </div>

      {!hasContent && !isGenerating && (
        <Card className="p-8 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${PRD_PRIMARY}20` }}>
            <Icon name="palette" size="size-6" style={{ color: PRD_PRIMARY }} />
          </div>
          <h4 className="font-bold mb-2">Gerar Decisões de Design</h4>
          <p className="text-sm text-muted-foreground mb-4">A IA vai sugerir decisões baseadas na solução</p>
          <Button onClick={handleGenerate} style={{ backgroundColor: PRD_PRIMARY }}>
            <Icon name="sparkles" className="mr-2 size-4" />
            Gerar Decisões
          </Button>
        </Card>
      )}

      {isGenerating && !hasContent && (
        <Card className="p-8 text-center">
          <Icon name="spinner" className="animate-spin mx-auto size-8 mb-3" style={{ color: PRD_PRIMARY }} />
          <p className="text-sm text-muted-foreground">Gerando decisões...</p>
        </Card>
      )}

      {hasContent && (
        <div className="space-y-4">
          {decisions.decisions.map((decision, index) => (
            <DecisionCard
              key={decision.id}
              decision={decision}
              onUpdate={(d) => handleUpdateDecision(index, d)}
              onDelete={() => handleDeleteDecision(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignDecisionsSection;
