// @ts-nocheck
import React, { useState } from 'react';
import { BlindSpot, BlindSpotCategory } from '../../types/prd';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type BlindSpotStatus = 'pending' | 'considered' | 'already_thought';

export interface PRDBlindSpotCardProps {
  blindSpot: BlindSpot;
  index?: number;
  onStatusChange: (status: BlindSpotStatus) => void;
  onEdit: (title: string, description: string) => void;
  onDelete?: () => void;
}

// =============================================================================
// CATEGORY CONFIG
// =============================================================================

const CATEGORY_CONFIG: Record<BlindSpotCategory, { icon: string; label: string; color: string }> = {
  Técnico: { icon: 'code', label: 'Técnico', color: 'text-blue-500 bg-blue-500/10' },
  Mercado: { icon: 'chart-line', label: 'Mercado', color: 'text-green-500 bg-green-500/10' },
  UX: { icon: 'user', label: 'UX', color: 'text-purple-500 bg-purple-500/10' },
  Viabilidade: { icon: 'scale', label: 'Viabilidade', color: 'text-amber-500 bg-amber-500/10' },
};

// =============================================================================
// STATUS CONFIG
// =============================================================================

const STATUS_STYLES = {
  pending: 'border-border hover:border-muted-foreground/50',
  considered: 'border-emerald-500/50 bg-emerald-500/5',
  already_thought: 'border-slate-500/50 bg-slate-500/5',
};

// =============================================================================
// COMPONENT
// =============================================================================

export const PRDBlindSpotCard: React.FC<PRDBlindSpotCardProps> = ({
  blindSpot,
  index = 0,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(blindSpot.title);
  const [editDescription, setEditDescription] = useState(blindSpot.description);

  const categoryConfig = CATEGORY_CONFIG[blindSpot.category] || CATEGORY_CONFIG['Técnico'];
  const status: BlindSpotStatus = blindSpot.selected ? 'considered' : 'pending';

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(editTitle.trim(), editDescription.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(blindSpot.title);
    setEditDescription(blindSpot.description);
    setIsEditing(false);
  };

  // Edit mode
  if (isEditing) {
    return (
      <Card
        className="animate-fade-in border-dashed border-primary/50 p-4"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn('text-[10px]', categoryConfig.color)}>
              {categoryConfig.label}
            </Badge>
            <span className="text-xs text-muted-foreground">Editando</span>
          </div>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Título do ponto cego"
            className="font-semibold"
            autoFocus
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Descrição detalhada..."
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSaveEdit} disabled={!editTitle.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Normal mode
  return (
    <Card
      className={cn('p-4 transition-all duration-300', STATUS_STYLES[status], 'animate-fade-in')}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Category Icon */}
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
            categoryConfig.color
          )}
        >
          <Icon name={categoryConfig.icon} size="size-5" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold text-foreground">{blindSpot.title}</h4>
              <Badge variant="outline" className={cn('text-[10px]', categoryConfig.color)}>
                {categoryConfig.label}
              </Badge>
            </div>
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
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={onDelete}
                  title="Remover"
                >
                  <Icon name="trash" size="size-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm text-muted-foreground">{blindSpot.description}</p>

          {/* Status indicator (when addressed) */}
          {status !== 'pending' && (
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <Icon
                name={status === 'already_thought' ? 'check-double' : 'check'}
                className={status === 'already_thought' ? 'text-slate-500' : 'text-emerald-500'}
                size="size-4"
              />
              <span className="text-muted-foreground">
                {status === 'already_thought' ? 'Já havia pensado nisso' : 'Vai considerar'}
              </span>
            </div>
          )}

          {/* Actions (only when pending) */}
          {status === 'pending' && (
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => onStatusChange('considered')}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Icon name="check" className="mr-1.5 size-3" />
                Vou considerar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusChange('already_thought')}
                className="text-muted-foreground"
              >
                Já pensei nisso
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PRDBlindSpotCard;
