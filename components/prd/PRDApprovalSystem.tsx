import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Textarea } from '../ui/textarea';
import { cn } from '../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type ApprovalStatus = 'pending' | 'approved' | 'needs_adjustment' | 'rejected';

export interface PRDApprovalSystemProps {
  currentStatus: ApprovalStatus;
  onApprove: () => void;
  onAdjust: (feedback: string) => void;
  onReject: (feedback: string) => void;
  disabled?: boolean;
  showKeyboardHints?: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const APPROVAL_OPTIONS = [
  {
    key: '1',
    action: 'approve' as const,
    label: 'Aprovar',
    icon: 'check',
    color: 'bg-emerald-600 hover:bg-emerald-700',
    textColor: 'text-emerald-500',
    description: 'Conteúdo está correto e completo',
  },
  {
    key: '2',
    action: 'adjust' as const,
    label: 'Ajustar',
    icon: 'edit',
    color: 'bg-amber-600 hover:bg-amber-700',
    textColor: 'text-amber-500',
    description: 'Precisa de pequenas modificações',
  },
  {
    key: '3',
    action: 'reject' as const,
    label: 'Rejeitar',
    icon: 'cross',
    color: 'bg-red-600 hover:bg-red-700',
    textColor: 'text-red-500',
    description: 'Regenerar completamente',
  },
];

const STATUS_DISPLAY: Record<ApprovalStatus, { label: string; icon: string; color: string }> = {
  pending: { label: 'Pendente', icon: 'clock', color: 'text-muted-foreground' },
  approved: { label: 'Aprovado', icon: 'check-circle', color: 'text-emerald-500' },
  needs_adjustment: { label: 'Ajuste Necessário', icon: 'edit', color: 'text-amber-500' },
  rejected: { label: 'Rejeitado', icon: 'x-circle', color: 'text-red-500' },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDApprovalSystem: React.FC<PRDApprovalSystemProps> = ({
  currentStatus,
  onApprove,
  onAdjust,
  onReject,
  disabled = false,
  showKeyboardHints = true,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'adjust' | 'reject' | null>(null);
  const [feedback, setFeedback] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '1':
          handleApprove();
          break;
        case '2':
          handleStartAdjust();
          break;
        case '3':
          handleStartReject();
          break;
        case 'Escape':
          setShowFeedback(false);
          setFeedbackType(null);
          setFeedback('');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled]);

  const handleApprove = useCallback(() => {
    if (disabled) return;
    onApprove();
  }, [disabled, onApprove]);

  const handleStartAdjust = useCallback(() => {
    if (disabled) return;
    setFeedbackType('adjust');
    setShowFeedback(true);
  }, [disabled]);

  const handleStartReject = useCallback(() => {
    if (disabled) return;
    setFeedbackType('reject');
    setShowFeedback(true);
  }, [disabled]);

  const handleSubmitFeedback = useCallback(() => {
    if (!feedback.trim()) return;

    if (feedbackType === 'adjust') {
      onAdjust(feedback);
    } else if (feedbackType === 'reject') {
      onReject(feedback);
    }

    setShowFeedback(false);
    setFeedbackType(null);
    setFeedback('');
  }, [feedback, feedbackType, onAdjust, onReject]);

  const handleCancelFeedback = useCallback(() => {
    setShowFeedback(false);
    setFeedbackType(null);
    setFeedback('');
  }, []);

  const statusDisplay = STATUS_DISPLAY[currentStatus];

  return (
    <div className="space-y-4">
      {/* Current Status */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Status atual:</span>
        <div className={cn('flex items-center gap-1.5', statusDisplay.color)}>
          <Icon name={statusDisplay.icon} size="size-4" />
          <span className="font-medium">{statusDisplay.label}</span>
        </div>
      </div>

      {/* Feedback Form */}
      {showFeedback && feedbackType && (
        <Card
          className={cn(
            'animate-fade-in border-l-4 p-4',
            feedbackType === 'adjust' && 'border-l-amber-500 bg-amber-500/5',
            feedbackType === 'reject' && 'border-l-red-500 bg-red-500/5'
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon
                name={feedbackType === 'adjust' ? 'edit' : 'cross'}
                size="size-4"
                className={feedbackType === 'adjust' ? 'text-amber-500' : 'text-red-500'}
              />
              <span className="font-medium">
                {feedbackType === 'adjust'
                  ? 'Descreva os ajustes necessários'
                  : 'Motivo da rejeição'}
              </span>
            </div>

            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                feedbackType === 'adjust'
                  ? 'O que precisa ser modificado?'
                  : 'Por que este conteúdo deve ser regenerado?'
              }
              className="min-h-[80px] resize-none"
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={handleCancelFeedback}>
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitFeedback}
                disabled={!feedback.trim()}
                className={cn(
                  feedbackType === 'adjust' && 'bg-amber-600 hover:bg-amber-700',
                  feedbackType === 'reject' && 'bg-red-600 hover:bg-red-700'
                )}
              >
                {feedbackType === 'adjust' ? 'Solicitar Ajuste' : 'Rejeitar'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {!showFeedback && (
        <div className="flex flex-wrap gap-2">
          {APPROVAL_OPTIONS.map((option) => {
            const isActive =
              (option.action === 'approve' && currentStatus === 'approved') ||
              (option.action === 'adjust' && currentStatus === 'needs_adjustment') ||
              (option.action === 'reject' && currentStatus === 'rejected');

            return (
              <Button
                key={option.key}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                disabled={disabled}
                onClick={() => {
                  if (option.action === 'approve') handleApprove();
                  else if (option.action === 'adjust') handleStartAdjust();
                  else if (option.action === 'reject') handleStartReject();
                }}
                className={cn('min-w-[120px] flex-1 transition-all', isActive && option.color)}
              >
                <Icon name={option.icon} className="mr-1.5 size-4" />
                {option.label}
                {showKeyboardHints && (
                  <kbd className="ml-2 rounded bg-background/50 px-1.5 py-0.5 font-mono text-[10px]">
                    {option.key}
                  </kbd>
                )}
              </Button>
            );
          })}
        </div>
      )}

      {/* Descriptions */}
      {!showFeedback && (
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          {APPROVAL_OPTIONS.map((option) => (
            <div key={option.key} className="text-center">
              <span className={cn('font-medium', option.textColor)}>{option.label}:</span>
              <span className="ml-1">{option.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PRDApprovalSystem;
