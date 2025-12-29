import React, { useState, useCallback } from 'react';
import { PRDProject, WOW, WOWCategory } from '../../../types/prd';
import { PRD_PRIMARY } from '../prd-tokens';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface WOWsInputViewProps {
  project: PRDProject;
  onUpdate: (wows: WOW[]) => Promise<void>;
  onNext: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_WOWS = 10;
const MIN_WOWS = 1;

const CATEGORY_CONFIG: Record<
  WOWCategory,
  { icon: string; label: string; color: string; bgColor: string }
> = {
  insight: {
    icon: 'lightbulb',
    label: 'Insight',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  question: {
    icon: 'question',
    label: 'Dúvida',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  idea: { icon: 'chat-alt', label: 'Ideia', color: 'text-blue-600', bgColor: 'bg-blue-600/10' },
  risk: {
    icon: 'exclamation-triangle',
    label: 'Risco',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
};

const PROMPT_SUGGESTIONS = [
  'O que te surpreendeu na pesquisa?',
  'Que problema você não tinha considerado?',
  'Que oportunidade você descobriu?',
  'O que os concorrentes estão fazendo de errado?',
  'Que pergunta surgiu que você não sabe responder?',
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const CategorySelector: React.FC<{
  selected: WOWCategory;
  onSelect: (category: WOWCategory) => void;
}> = ({ selected, onSelect }) => {
  const categories: WOWCategory[] = ['insight', 'question', 'idea', 'risk'];

  return (
    <div className="flex gap-2">
      {categories.map((cat) => {
        const config = CATEGORY_CONFIG[cat];
        const isSelected = selected === cat;
        return (
          <Button
            key={cat}
            type="button"
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(cat)}
            className={cn(
              'flex items-center gap-1.5 transition-all',
              isSelected && config.bgColor,
              isSelected && config.color,
              isSelected && 'border-transparent'
            )}
          >
            <Icon name={config.icon} size="size-3" />
            <span className="hidden sm:inline">{config.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

const WOWCard: React.FC<{
  wow: WOW;
  onEdit: (text: string) => void;
  onDelete: () => void;
}> = ({ wow, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(wow.text);
  const config = CATEGORY_CONFIG[wow.category];

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(wow.text);
    setIsEditing(false);
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `há ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `há ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `há ${diffDays}d`;
  };

  return (
    <Card
      className={cn('animate-fade-in p-4 transition-all', config.bgColor, 'border-transparent')}
    >
      <div className="flex items-start gap-3">
        {/* Category Icon */}
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
            'bg-background/50'
          )}
        >
          <Icon name={config.icon} size="size-4" className={config.color} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[60px] resize-none bg-background"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} disabled={!editText.trim()}>
                  Salvar
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground">{wow.text}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className={cn('text-[10px]', config.color)}>
                  {config.label}
                </Badge>
                <span className="text-xs text-muted-foreground">{timeAgo(wow.createdAt)}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setIsEditing(true)}
              title="Editar"
            >
              <Icon name="edit" size="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
              title="Remover"
            >
              <Icon name="trash" size="size-3" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const WOWsInputView: React.FC<WOWsInputViewProps> = ({ project, onUpdate, onNext }) => {
  const [wows, setWows] = useState<WOW[]>(project.project_metadata?.brief?.wows || []);
  const [newText, setNewText] = useState('');
  const [category, setCategory] = useState<WOWCategory>('insight');

  const canAdd = wows.length < MAX_WOWS && newText.trim().length > 0;
  const canAdvance = wows.length >= MIN_WOWS;
  const isAtMax = wows.length >= MAX_WOWS;

  // Add new WOW
  const handleAdd = useCallback(async () => {
    if (!canAdd) return;

    const newWow: WOW = {
      id: `wow-${Date.now()}`,
      text: newText.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    const updated = [newWow, ...wows];
    setWows(updated);
    setNewText('');
    await onUpdate(updated);
  }, [canAdd, newText, category, wows, onUpdate]);

  // Edit WOW
  const handleEdit = useCallback(
    async (id: string, text: string) => {
      const updated = wows.map((w) => (w.id === id ? { ...w, text } : w));
      setWows(updated);
      await onUpdate(updated);
    },
    [wows, onUpdate]
  );

  // Delete WOW
  const handleDelete = useCallback(
    async (id: string) => {
      const updated = wows.filter((w) => w.id !== id);
      setWows(updated);
      await onUpdate(updated);
    },
    [wows, onUpdate]
  );

  // Use suggestion
  const handleUseSuggestion = (suggestion: string) => {
    setNewText(suggestion);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Icon name="lightbulb" className="text-studio-primary" />
          WOWs - Suas Descobertas
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Registre os insights e descobertas que você teve durante a pesquisa
        </p>
      </div>

      {/* Input Section */}
      <Card className="space-y-4 p-4">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">O que te surpreendeu?</label>
          <Textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Descreva seu insight, dúvida, ideia ou risco identificado..."
            className="min-h-[80px] resize-none"
            disabled={isAtMax}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <CategorySelector selected={category} onSelect={setCategory} />
          <Button
            onClick={handleAdd}
            disabled={!canAdd}
            className={canAdd ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
          >
            <Icon name="plus" className="mr-1.5 size-4" />
            Adicionar
          </Button>
        </div>

        {isAtMax && <p className="text-xs text-amber-500">Limite de {MAX_WOWS} WOWs atingido</p>}
      </Card>

      {/* Suggestions */}
      {wows.length === 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Precisa de inspiração?</p>
          <div className="flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleUseSuggestion(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* WOWs List */}
      {wows.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Seus WOWs ({wows.length}/{MAX_WOWS})
            </h3>
          </div>
          <div className="space-y-3">
            {wows.map((wow) => (
              <WOWCard
                key={wow.id}
                wow={wow}
                onEdit={(text) => handleEdit(wow.id, text)}
                onDelete={() => handleDelete(wow.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress & Actions */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          <span
            className={cn(
              'font-mono font-medium',
              canAdvance ? 'text-emerald-500' : 'text-amber-500'
            )}
          >
            {wows.length}/{MAX_WOWS}
          </span>{' '}
          WOWs {!canAdvance && `(mínimo ${MIN_WOWS})`}
        </div>
        <Button
          onClick={onNext}
          disabled={!canAdvance}
          className={canAdvance ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
        >
          Continuar
          <Icon name="arrow-right" className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};

export default WOWsInputView;
