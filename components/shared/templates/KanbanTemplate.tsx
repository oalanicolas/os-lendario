import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { AvatarGroup } from '../../ui/avatar-group';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';

const KanbanTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  // Mock Data
  const columns = [
    {
      id: 'backlog',
      title: 'Backlog',
      count: 4,
      items: [
        {
          id: 1,
          title: 'Pesquisa de Keywords',
          tag: 'Marketing',
          priority: 'low',
          members: ['AN'],
        },
        {
          id: 2,
          title: 'Definir Paleta de Cores',
          tag: 'Design',
          priority: 'medium',
          members: ['JD'],
        },
        {
          id: 3,
          title: 'Escrever Copy da LP',
          tag: 'Copywriting',
          priority: 'high',
          members: ['AN', 'JD'],
        },
        { id: 4, title: 'Configurar DNS', tag: 'Dev', priority: 'high', members: ['TR'] },
      ],
    },
    {
      id: 'doing',
      title: 'Em Produção',
      count: 2,
      items: [
        {
          id: 5,
          title: 'Criar wireframes do Dashboard',
          tag: 'Design',
          priority: 'high',
          members: ['JD'],
          image:
            'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&auto=format&fit=crop',
        },
        { id: 6, title: 'Integração com Stripe', tag: 'Dev', priority: 'medium', members: ['TR'] },
      ],
    },
    {
      id: 'review',
      title: 'Revisão',
      count: 1,
      items: [
        { id: 7, title: 'Vídeo de Vendas (V1)', tag: 'Video', priority: 'high', members: ['AN'] },
      ],
    },
    {
      id: 'done',
      title: 'Concluído',
      count: 3,
      items: [
        { id: 8, title: 'Setup Inicial do Repo', tag: 'Dev', priority: 'medium', members: ['TR'] },
        {
          id: 9,
          title: 'Briefing com Cliente',
          tag: 'Gestão',
          priority: 'medium',
          members: ['AN'],
        },
        { id: 10, title: 'Compra de Domínio', tag: 'Infra', priority: 'low', members: ['TR'] },
      ],
    },
  ];

  const priorityColors: Record<string, string> = {
    low: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    medium: 'bg-brand-yellow/10 text-brand-yellow-dark border-brand-yellow/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="flex h-[calc(100vh-140px)] animate-fade-in flex-col font-sans">
      {/* --- HEADER --- */}
      <header className="mb-6 flex shrink-0 flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Projetos</span>
            <Icon name="angle-small-right" size="size-3" />
            <span className="text-foreground">Lançamento Q4</span>
          </div>
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
            Board de Tarefas
            <Badge variant="outline" className="text-xs font-normal">
              Sprint 42
            </Badge>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <AvatarGroup limit={3} size="sm">
            <Avatar>
              <AvatarImage src={alanAvatar} />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>TR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>+2</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <div className="mx-2 h-8 w-px bg-border"></div>
          <Button variant="outline" size="icon">
            <Icon name="filter" />
          </Button>
          <Button className="gap-2 shadow-md shadow-primary/20">
            <Icon name="plus" size="size-4" /> Nova Tarefa
          </Button>
        </div>
      </header>

      {/* --- KANBAN BOARD --- */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex h-full min-w-[1000px] gap-6">
          {columns.map((col) => (
            <div key={col.id} className="flex h-full w-[380px] min-w-[380px] flex-col rounded-xl">
              {/* Column Header (Minimalist) */}
              <div className="mb-2 flex shrink-0 items-center justify-between px-1 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-foreground">
                    {col.title}
                  </span>
                  <span className="rounded-full bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {col.count}
                  </span>
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity hover:opacity-100">
                  <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Icon name="plus" size="size-3" />
                  </button>
                  <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Icon name="menu-dots" size="size-3" />
                  </button>
                </div>
              </div>

              {/* Cards Container */}
              <ScrollArea className="-mr-2 flex-1 px-1 pb-3 pr-2">
                <div className="space-y-3">
                  {col.items.map((item) => (
                    <div
                      key={item.id}
                      className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      {/* Hover Indicator Line */}
                      <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100"></div>

                      {/* Tags & Priority */}
                      <div className="mb-3 flex items-start justify-between pl-2">
                        <Badge
                          variant="secondary"
                          className="border border-border bg-muted px-2 py-0.5 text-[10px] font-normal text-muted-foreground"
                        >
                          {item.tag}
                        </Badge>
                        <div
                          className={`h-2 w-2 rounded-full ${priorityColors[item.priority].replace('text-', 'bg-').split(' ')[0]}`}
                          title={`Prioridade: ${item.priority}`}
                        ></div>
                      </div>

                      {/* Optional Image */}
                      {item.image && (
                        <div className="relative mb-4 h-36 w-full overflow-hidden rounded-lg transition-transform duration-500 group-hover:scale-[1.02]">
                          <img
                            src={item.image}
                            className="h-full w-full object-cover"
                            alt="Task attachment"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent"></div>
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="mb-4 pl-2 text-sm font-semibold leading-relaxed text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </h4>

                      {/* Footer: Members & Meta */}
                      <div className="flex items-center justify-between border-t border-border/50 pl-2 pt-3">
                        <div className="flex -space-x-2">
                          {item.members.map((m, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-card text-[9px]">
                              {/* If member is AN, show real photo, else fallback */}
                              {m === 'AN' ? <AvatarImage src={alanAvatar} /> : null}
                              <AvatarFallback className="bg-muted font-bold text-muted-foreground">
                                {m}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground">
                          <span className="flex items-center gap-1 transition-colors hover:text-foreground">
                            <Icon name="clip" size="size-3" /> 2
                          </span>
                          <span className="flex items-center gap-1 transition-colors hover:text-foreground">
                            <Icon name="comment-alt" size="size-3" /> 4
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Button at bottom of list */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-transparent py-3 text-sm text-muted-foreground opacity-60 transition-all hover:border-border/50 hover:bg-muted/30 hover:text-primary hover:opacity-100">
                    <Icon name="plus" size="size-3" /> Criar nova tarefa
                  </button>
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanTemplate;
