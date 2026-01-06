import React, { useState, useCallback } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Slider } from '../../ui/slider';
import { Select } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Spinner } from '../../ui/spinner';
import { cn } from '../../../lib/utils';
import {
  getRelevanceTextColor,
  getConfidenceTextColor,
  percentToConfidence,
} from '../../../lib/fragment-utils';
import { FRAGMENT_TYPE_LABELS } from '../../../hooks/useMindFragments';
import type { FragmentCreateSheetProps, FragmentCreate } from './types';

// Build type options from FRAGMENT_TYPE_LABELS
const typeOptions = Object.entries(FRAGMENT_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

/**
 * FragmentCreateSheet - Create fragment form in a side sheet
 */
export const FragmentCreateSheet: React.FC<FragmentCreateSheetProps> = ({
  open,
  onOpenChange,
  mindId,
  onCreate,
}) => {
  // === FORM STATE ===
  const [type, setType] = useState('belief');
  const [content, setContent] = useState('');
  const [context, setContext] = useState('');
  const [insight, setInsight] = useState('');
  const [location, setLocation] = useState('manual');
  const [relevance, setRelevance] = useState(5);
  const [confidence, setConfidence] = useState(50);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // === TAGS STATE ===
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // === FORM ACTIONS ===
  const resetForm = useCallback(() => {
    setType('belief');
    setContent('');
    setContext('');
    setInsight('');
    setLocation('manual');
    setRelevance(5);
    setConfidence(50);
    setError(null);
    setTags([]);
    setNewTag('');
  }, []);

  const validateForm = useCallback((): boolean => {
    if (!content.trim()) {
      setError('O conteudo e obrigatorio');
      return false;
    }
    if (!context.trim()) {
      setError('O contexto e obrigatorio');
      return false;
    }
    if (!insight.trim()) {
      setError('O insight e obrigatorio');
      return false;
    }
    return true;
  }, [content, context, insight]);

  // === TAGS ACTIONS ===
  const addTag = useCallback(() => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prev) => [...prev, trimmedTag]);
      setNewTag('');
    }
  }, [newTag, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  }, []);

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTag();
      }
    },
    [addTag]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsCreating(true);

    const fragmentData: FragmentCreate = {
      mindId,
      location: location || 'manual',
      type,
      content: content.trim(),
      context: context.trim(),
      insight: insight.trim(),
      relevance,
      confidence: percentToConfidence(confidence),
      metadata: { tags, source: 'manual' },
    };

    const result = await onCreate(fragmentData);

    setIsCreating(false);

    if (result) {
      resetForm();
      onOpenChange(false);
    } else {
      setError('Erro ao criar fragmento. Tente novamente.');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="plus-circle" size="size-5" className="text-brand-gold" />
            Novo Fragmento
          </SheetTitle>
          <SheetDescription>
            Adicione um fragmento manualmente ao perfil desta mente.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="-mx-6 flex-1 px-6">
          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                <div className="flex items-center gap-2">
                  <Icon name="exclamation" size="size-4" />
                  {error}
                </div>
              </div>
            )}

            {/* Type select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Tipo do Fragmento *
              </label>
              <Select
                value={type}
                onValueChange={setType}
                options={typeOptions}
                placeholder="Selecione um tipo"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Conteudo *</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="A citacao ou declaracao exata extraida..."
                className="min-h-[80px] text-sm"
              />
            </div>

            {/* Context */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Contexto *</label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Em que situacao foi dito, quando, com quem..."
                className="min-h-[60px] text-sm"
              />
            </div>

            {/* Insight */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Insight *</label>
              <Textarea
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                placeholder="O que isso revela sobre a pessoa..."
                className="min-h-[60px] text-sm"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Localizacao / Fonte
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="manual, entrevista, etc."
                className="text-sm"
              />
            </div>

            {/* Relevance slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Relevancia</label>
                <span
                  className={cn('font-mono text-sm font-bold', getRelevanceTextColor(relevance))}
                >
                  {relevance}/10
                </span>
              </div>
              <Slider
                min={1}
                max={10}
                step={1}
                value={relevance}
                onChange={(e) => setRelevance(Number(e.target.value))}
                className="accent-brand-gold"
              />
            </div>

            {/* Confidence slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Confianca</label>
                <span
                  className={cn('font-mono text-sm font-bold', getConfidenceTextColor(confidence))}
                >
                  {confidence}%
                </span>
              </div>
              <Slider
                min={0}
                max={100}
                step={5}
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="accent-brand-gold"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Tags (opcional)</label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="h-6 gap-1 bg-muted/20 px-2 text-xs hover:bg-muted/30"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-400"
                    >
                      <Icon name="times" size="size-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Adicionar tag..."
                  className="h-8 text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addTag}
                  disabled={!newTag.trim()}
                  className="h-8 px-3"
                >
                  <Icon name="plus" size="size-3" />
                </Button>
              </div>
            </div>
          </form>
        </ScrollArea>

        <SheetFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isCreating}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isCreating || !content.trim() || !context.trim() || !insight.trim()}
            className="bg-brand-gold text-black hover:bg-brand-gold/90"
          >
            {isCreating ? (
              <>
                <Spinner size="sm" variant="dark" className="mr-2" />
                Criando...
              </>
            ) : (
              <>
                <Icon name="plus" size="size-3" className="mr-1.5" />
                Criar Fragmento
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FragmentCreateSheet;
