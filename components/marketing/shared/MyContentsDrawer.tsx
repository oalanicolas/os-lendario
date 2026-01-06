// @ts-nocheck
/**
 * MyContentsDrawer - Drawer lateral para listar conteúdos salvos
 *
 * Componente compartilhado entre Curador[IA] e Gu[IA] Ebook.
 * Permite visualizar, copiar e deletar conteúdos salvos.
 */

import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

export type ContentMode = 'curator' | 'ebook';

interface ContentItem {
  id: string;
  title: string;
  contentType: string;
  status: string;
  createdAt: string;
  content?: string | null;
  metadata?: Record<string, unknown>;
  // Ebook specific
  chapterCount?: number;
  coverUrl?: string | null;
}

interface MyContentsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: ContentMode;
  // Data
  contents: ContentItem[];
  loading: boolean;
  error: Error | null;
  // Actions
  onRefresh: () => Promise<void>;
  onDelete: (id: string) => Promise<boolean>;
  onSelect?: (item: ContentItem) => void;
}

// ============================================================================
// Constants
// ============================================================================

const CONTENT_TYPE_LABELS: Record<string, string> = {
  video_script: 'Roteiro de Vídeo',
  social_post: 'Post Social',
  email_sequence: 'Email/Newsletter',
  ebook: 'Ebook',
};

const CONTENT_TYPE_ICONS: Record<string, string> = {
  video_script: 'video-camera',
  social_post: 'image',
  email_sequence: 'envelope',
  ebook: 'book-open',
};

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  reviewed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  published: 'bg-green-500/10 text-green-500 border-green-500/20',
  in_progress: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
};

// ============================================================================
// Utils
// ============================================================================

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

// ============================================================================
// Component
// ============================================================================

export const MyContentsDrawer: React.FC<MyContentsDrawerProps> = ({
  open,
  onOpenChange,
  mode,
  contents,
  loading,
  error,
  onRefresh,
  onDelete,
  onSelect,
}) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Refresh on open
  useEffect(() => {
    if (open) {
      onRefresh();
    }
  }, [open, onRefresh]);

  const handleCopyContent = async (item: ContentItem) => {
    if (!item.content) {
      toast({
        title: 'Sem conteúdo',
        description: 'Este item não possui conteúdo para copiar.',
        variant: 'warning',
      });
      return;
    }

    await navigator.clipboard.writeText(item.content);
    toast({
      title: 'Copiado!',
      description: 'Conteúdo copiado para a área de transferência.',
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
      return;
    }

    setDeletingId(id);
    try {
      const success = await onDelete(id);
      if (success) {
        toast({
          title: 'Excluído',
          description: 'Conteúdo removido com sucesso.',
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o conteúdo.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const title = mode === 'curator' ? 'Meus Conteúdos' : 'Meus Ebooks';
  const description =
    mode === 'curator'
      ? 'Roteiros e posts salvos pelo Curador[IA]'
      : 'Ebooks gerados pelo Gu[IA] Ebook';
  const emptyMessage =
    mode === 'curator'
      ? 'Nenhum conteúdo salvo ainda. Gere um roteiro e clique em "Salvar Rascunho".'
      : 'Nenhum ebook salvo ainda. Gere um ebook e clique em "Salvar".';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-[450px] flex-col p-0 sm:w-[500px]">
        <SheetHeader className="border-b border-border p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center gap-2">
                <Icon
                  name={mode === 'curator' ? 'folder-open' : 'book-open'}
                  className="size-5 text-primary"
                />
                {title}
              </SheetTitle>
              <SheetDescription className="mt-1">{description}</SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRefresh()}
              disabled={loading}
              className="h-8 w-8"
            >
              <Icon name="refresh" className={cn('size-4', loading && 'animate-spin')} />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          {loading && contents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Icon name="spinner" className="mb-4 size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Carregando...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <Icon name="circle-exclamation" className="mb-4 size-10 text-destructive" />
              <p className="text-sm text-muted-foreground">Erro ao carregar conteúdos.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => onRefresh()}>
                Tentar novamente
              </Button>
            </div>
          ) : contents.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <Icon
                name={mode === 'curator' ? 'file-lines' : 'book'}
                className="mb-4 size-12 text-muted-foreground/30"
              />
              <p className="max-w-[280px] text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {contents.map((item) => (
                <div key={item.id} className="group p-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-start gap-3">
                    {/* Icon/Cover */}
                    <div className="shrink-0">
                      {mode === 'ebook' && item.coverUrl ? (
                        <div className="h-16 w-12 overflow-hidden rounded-md border border-border bg-muted">
                          <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon
                            name={CONTENT_TYPE_ICONS[item.contentType] || 'file'}
                            className="size-5 text-primary"
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate pr-2 text-sm font-medium text-foreground">
                        {item.title}
                      </h4>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[9px] font-medium',
                            STATUS_COLORS[item.status] || 'bg-muted text-muted-foreground'
                          )}
                        >
                          {item.status === 'draft'
                            ? 'Rascunho'
                            : item.status === 'in_progress'
                              ? 'Em progresso'
                              : item.status === 'completed'
                                ? 'Concluído'
                                : item.status}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {CONTENT_TYPE_LABELS[item.contentType] || item.contentType}
                        </span>
                        {mode === 'ebook' && item.chapterCount !== undefined && (
                          <span className="text-[10px] text-muted-foreground">
                            • {item.chapterCount} cap.
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[10px] text-muted-foreground/60">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {mode === 'curator' && item.content && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyContent(item)}
                          title="Copiar conteúdo"
                        >
                          <Icon name="copy" className="size-3.5" />
                        </Button>
                      )}
                      {onSelect && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onSelect(item)}
                          title="Visualizar"
                        >
                          <Icon name="eye" className="size-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        title="Excluir"
                      >
                        {deletingId === item.id ? (
                          <Icon name="spinner" className="size-3.5 animate-spin" />
                        ) : (
                          <Icon name="trash" className="size-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border bg-muted/30 p-4">
          <p className="text-center text-[10px] text-muted-foreground">
            {contents.length} {contents.length === 1 ? 'item' : 'itens'} salvos
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MyContentsDrawer;
