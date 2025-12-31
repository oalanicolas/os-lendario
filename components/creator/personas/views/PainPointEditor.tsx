import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Slider } from '../../../ui/slider';
import { Label } from '../../../ui/label';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import { cn } from '../../../../lib/utils';
import { STUDIO_CARD_CLASSES, INPUT_CLASSES, TEXTAREA_CLASSES } from '../../studio-tokens';

export interface PainPoint {
  id: string;
  superficial: string;
  deep: string;
  relevance: number;
}

interface PainPointEditorProps {
  personaId: string;
  personaName?: string;
  initialPainPoints?: PainPoint[];
  onBack: () => void;
  onSave: (painPoints: PainPoint[]) => void;
}

const generateId = () => `pain-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const PainPointEditor: React.FC<PainPointEditorProps> = ({
  personaId,
  personaName = 'Persona',
  initialPainPoints = [],
  onBack,
  onSave,
}) => {
  const [painPoints, setPainPoints] = useState<PainPoint[]>(initialPainPoints);
  const [isAdding, setIsAdding] = useState(false);
  const [newPainPoint, setNewPainPoint] = useState<Omit<PainPoint, 'id'>>({
    superficial: '',
    deep: '',
    relevance: 50,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  const handleAddPainPoint = useCallback(() => {
    if (!newPainPoint.superficial.trim()) return;

    const painPoint: PainPoint = {
      id: generateId(),
      ...newPainPoint,
    };

    setPainPoints((prev) => [...prev, painPoint]);
    setNewPainPoint({ superficial: '', deep: '', relevance: 50 });
    setIsAdding(false);
  }, [newPainPoint]);

  const handleUpdatePainPoint = useCallback((id: string, updates: Partial<PainPoint>) => {
    setPainPoints((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const handleDeletePainPoint = useCallback(
    (id: string) => {
      setPainPoints((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) setEditingId(null);
    },
    [editingId]
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(painPoints);
    } finally {
      setIsSaving(false);
    }
  }, [painPoints, onSave]);

  const handleAiSuggest = useCallback(() => {
    setShowAiSuggestion(true);
    // In a real implementation, this would call an AI service
  }, []);

  const getRelevanceColor = (value: number) => {
    if (value >= 75) return 'text-red-400';
    if (value >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getRelevanceLabel = (value: number) => {
    if (value >= 75) return 'Critica';
    if (value >= 50) return 'Moderada';
    return 'Baixa';
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <header className="z-20 flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-md lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={onBack}
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Icon name="angle-left" size="size-4" />
            <span>Personas</span>
          </button>
          <Icon name="chevron-right" size="size-3" />
          <span className="font-medium text-foreground">Dores: {personaName}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleAiSuggest} className="gap-2">
            <Icon name="magic-wand" size="size-4" className="text-studio-accent" />
            Sugestao IA
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-studio-accent text-background shadow-lg shadow-studio-accent/20"
          >
            {isSaving ? (
              <Icon name="spinner" size="size-4" className="animate-spin" />
            ) : (
              <Icon name="save" size="size-4" />
            )}
            Salvar
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="relative flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 pb-32">
          {/* Title Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-studio-accent shadow-[0_0_8px_rgba(242,208,13,0.8)]" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Definicao de Dor e Necessidade
              </h2>
            </div>
            <p className="max-w-2xl pl-5 text-base text-muted-foreground">
              Ajuste os detalhes psicograficos do seu cliente ideal. Nossa IA analisa padroes de
              busca para sugerir melhorias em tempo real.
            </p>
          </div>

          {/* AI Suggestion Panel */}
          {showAiSuggestion && (
            <Card
              className={cn(
                STUDIO_CARD_CLASSES,
                'animate-in fade-in slide-in-from-top-4 overflow-hidden duration-500'
              )}
            >
              <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-studio-accent/50 to-transparent" />
              <CardContent className="p-5">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg border border-studio-accent/10 bg-gradient-to-br from-studio-accent/20 to-studio-accent/5 text-studio-accent">
                        <Icon name="magic-wand" size="size-4" />
                      </div>
                      <span className="text-sm font-bold tracking-wide text-foreground">
                        Sugestao de Melhoria da IA
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => setShowAiSuggestion(false)}
                    >
                      <Icon name="cross" size="size-4" />
                    </Button>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-3">
                    <Icon name="lightbulb" size="size-4" className="mt-0.5 text-muted-foreground" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-foreground">Dica</span>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Adicione dores especificas com prazos e objetivos mensuraveis para
                        qualificar melhor o lead desde a busca.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <Button variant="ghost" size="sm" onClick={() => setShowAiSuggestion(false)}>
                      Dispensar
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 bg-studio-accent text-background"
                      onClick={() => {
                        setIsAdding(true);
                        setShowAiSuggestion(false);
                      }}
                    >
                      <Icon name="plus" size="size-4" />
                      Adicionar Dor Sugerida
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pain Points List */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Dores Identificadas ({painPoints.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(true)}
                className="gap-2"
                disabled={isAdding}
              >
                <Icon name="plus" size="size-4" />
                Adicionar Dor
              </Button>
            </div>

            {/* Empty State */}
            {painPoints.length === 0 && !isAdding && (
              <Card className={cn(STUDIO_CARD_CLASSES, 'border-dashed')}>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted/30">
                    <Icon name="exclamation" size="size-6" className="text-muted-foreground" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">Nenhuma dor cadastrada</h4>
                  <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                    Adicione dores para entender melhor os problemas do seu cliente ideal.
                  </p>
                  <Button
                    onClick={() => setIsAdding(true)}
                    className="gap-2 bg-studio-accent text-background"
                  >
                    <Icon name="plus" size="size-4" />
                    Adicionar Primeira Dor
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Pain Points */}
            {painPoints.map((painPoint, index) => (
              <PainPointItem
                key={painPoint.id}
                painPoint={painPoint}
                index={index + 1}
                isEditing={editingId === painPoint.id}
                onEdit={() => setEditingId(editingId === painPoint.id ? null : painPoint.id)}
                onUpdate={(updates) => handleUpdatePainPoint(painPoint.id, updates)}
                onDelete={() => handleDeletePainPoint(painPoint.id)}
                getRelevanceColor={getRelevanceColor}
                getRelevanceLabel={getRelevanceLabel}
              />
            ))}

            {/* Add New Form */}
            {isAdding && (
              <Card
                className={cn(
                  STUDIO_CARD_CLASSES,
                  'animate-in fade-in slide-in-from-top-2 border-studio-accent/30 duration-300'
                )}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon name="plus-circle" size="size-4" className="text-studio-accent" />
                      Nova Dor
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => {
                        setIsAdding(false);
                        setNewPainPoint({ superficial: '', deep: '', relevance: 50 });
                      }}
                    >
                      <Icon name="cross" size="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Dor Superficial
                    </Label>
                    <Input
                      className={INPUT_CLASSES}
                      placeholder="O que o cliente diz que e o problema..."
                      value={newPainPoint.superficial}
                      onChange={(e) =>
                        setNewPainPoint((prev) => ({ ...prev, superficial: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      A dor que o cliente expressa verbalmente ou em buscas.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Dor Profunda
                    </Label>
                    <Textarea
                      className={TEXTAREA_CLASSES}
                      placeholder="O que ele realmente sente por baixo..."
                      value={newPainPoint.deep}
                      onChange={(e) =>
                        setNewPainPoint((prev) => ({ ...prev, deep: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      A dor emocional ou psicologica real por tras da superficial.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Relevancia
                      </Label>
                      <Badge
                        variant="outline"
                        className={cn('text-xs', getRelevanceColor(newPainPoint.relevance))}
                      >
                        {newPainPoint.relevance}% - {getRelevanceLabel(newPainPoint.relevance)}
                      </Badge>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={newPainPoint.relevance}
                      onChange={(e) =>
                        setNewPainPoint((prev) => ({
                          ...prev,
                          relevance: parseInt(e.target.value, 10),
                        }))
                      }
                      className="accent-studio-accent"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Baixa Prioridade</span>
                      <span>Alta Prioridade</span>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsAdding(false);
                        setNewPainPoint({ superficial: '', deep: '', relevance: 50 });
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAddPainPoint}
                      disabled={!newPainPoint.superficial.trim()}
                      className="gap-2 bg-studio-accent text-background"
                    >
                      <Icon name="check" size="size-4" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual pain point items
interface PainPointItemProps {
  painPoint: PainPoint;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Partial<PainPoint>) => void;
  onDelete: () => void;
  getRelevanceColor: (value: number) => string;
  getRelevanceLabel: (value: number) => string;
}

const PainPointItem: React.FC<PainPointItemProps> = ({
  painPoint,
  index,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  getRelevanceColor,
  getRelevanceLabel,
}) => {
  return (
    <Card
      className={cn(
        STUDIO_CARD_CLASSES,
        'group transition-all duration-200',
        isEditing && 'border-studio-accent/30 ring-1 ring-studio-accent/20'
      )}
    >
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted/30 text-sm font-bold text-muted-foreground">
                {index}
              </div>
              <div className="flex flex-col">
                <Badge
                  variant="outline"
                  className={cn('w-fit text-xs', getRelevanceColor(painPoint.relevance))}
                >
                  {painPoint.relevance}% - {getRelevanceLabel(painPoint.relevance)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="size-8" onClick={onEdit}>
                <Icon
                  name={isEditing ? 'check' : 'edit'}
                  size="size-4"
                  className={isEditing ? 'text-studio-accent' : ''}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-red-400 hover:text-red-500"
                onClick={onDelete}
              >
                <Icon name="trash" size="size-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">Dor Superficial</Label>
                <Input
                  className={INPUT_CLASSES}
                  value={painPoint.superficial}
                  onChange={(e) => onUpdate({ superficial: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">Dor Profunda</Label>
                <Textarea
                  className={TEXTAREA_CLASSES}
                  value={painPoint.deep}
                  onChange={(e) => onUpdate({ deep: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">Relevancia</Label>
                  <span
                    className={cn('text-xs font-medium', getRelevanceColor(painPoint.relevance))}
                  >
                    {painPoint.relevance}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={painPoint.relevance}
                  onChange={(e) => onUpdate({ relevance: parseInt(e.target.value, 10) })}
                  className="accent-studio-accent"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pl-11">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  O que dizem
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {painPoint.superficial || '-'}
                </p>
              </div>
              {painPoint.deep && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    O que sentem
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {painPoint.deep}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PainPointEditor;
