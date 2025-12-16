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
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  // Mock Data
  const columns = [
    {
        id: 'backlog',
        title: 'Backlog',
        count: 4,
        items: [
            { id: 1, title: 'Pesquisa de Keywords', tag: 'Marketing', priority: 'low', members: ['AN'] },
            { id: 2, title: 'Definir Paleta de Cores', tag: 'Design', priority: 'medium', members: ['JD'] },
            { id: 3, title: 'Escrever Copy da LP', tag: 'Copywriting', priority: 'high', members: ['AN', 'JD'] },
            { id: 4, title: 'Configurar DNS', tag: 'Dev', priority: 'high', members: ['TR'] },
        ]
    },
    {
        id: 'doing',
        title: 'Em Produção',
        count: 2,
        items: [
            { id: 5, title: 'Criar wireframes do Dashboard', tag: 'Design', priority: 'high', members: ['JD'], image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&auto=format&fit=crop' },
            { id: 6, title: 'Integração com Stripe', tag: 'Dev', priority: 'medium', members: ['TR'] },
        ]
    },
    {
        id: 'review',
        title: 'Revisão',
        count: 1,
        items: [
            { id: 7, title: 'Vídeo de Vendas (V1)', tag: 'Video', priority: 'high', members: ['AN'] },
        ]
    },
    {
        id: 'done',
        title: 'Concluído',
        count: 3,
        items: [
            { id: 8, title: 'Setup Inicial do Repo', tag: 'Dev', priority: 'medium', members: ['TR'] },
            { id: 9, title: 'Briefing com Cliente', tag: 'Gestão', priority: 'medium', members: ['AN'] },
            { id: 10, title: 'Compra de Domínio', tag: 'Infra', priority: 'low', members: ['TR'] },
        ]
    }
  ];

  const priorityColors: Record<string, string> = {
      low: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      medium: 'bg-brand-yellow/10 text-brand-yellow-dark border-brand-yellow/20',
      high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in font-sans">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>Projetos</span>
                  <Icon name="angle-small-right" size="size-3" />
                  <span className="text-foreground">Lançamento Q4</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                  Board de Tarefas
                  <Badge variant="outline" className="font-normal text-xs">Sprint 42</Badge>
              </h1>
          </div>
          
          <div className="flex items-center gap-4">
              <AvatarGroup limit={3} size="sm">
                  <Avatar>
                      <AvatarImage src={alanAvatar} />
                      <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>TR</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>+2</AvatarFallback></Avatar>
              </AvatarGroup>
              <div className="h-8 w-px bg-border mx-2"></div>
              <Button variant="outline" size="icon"><Icon name="filter" /></Button>
              <Button className="gap-2 shadow-md shadow-primary/20">
                  <Icon name="plus" size="size-4" /> Nova Tarefa
              </Button>
          </div>
      </header>

      {/* --- KANBAN BOARD --- */}
      <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-[1000px] h-full">
              
              {columns.map((col) => (
                  <div key={col.id} className="min-w-[380px] w-[380px] flex flex-col h-full rounded-xl">
                      
                      {/* Column Header (Minimalist) */}
                      <div className="flex items-center justify-between py-3 px-1 shrink-0 mb-2">
                          <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-foreground uppercase tracking-wider">{col.title}</span>
                              <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded-full">{col.count}</span>
                          </div>
                          <div className="flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                              <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted"><Icon name="plus" size="size-3" /></button>
                              <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted"><Icon name="menu-dots" size="size-3" /></button>
                          </div>
                      </div>

                      {/* Cards Container */}
                      <ScrollArea className="flex-1 px-1 pb-3 -mr-2 pr-2">
                          <div className="space-y-3">
                              {col.items.map((item) => (
                                  <div 
                                    key={item.id} 
                                    className="bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
                                  >
                                      {/* Hover Indicator Line */}
                                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                      {/* Tags & Priority */}
                                      <div className="flex justify-between items-start mb-3 pl-2">
                                          <Badge variant="secondary" className="text-[10px] font-normal text-muted-foreground bg-muted border border-border px-2 py-0.5">{item.tag}</Badge>
                                          <div className={`w-2 h-2 rounded-full ${priorityColors[item.priority].replace('text-', 'bg-').split(' ')[0]}`} title={`Prioridade: ${item.priority}`}></div>
                                      </div>

                                      {/* Optional Image */}
                                      {item.image && (
                                          <div className="mb-4 rounded-lg overflow-hidden h-36 w-full relative group-hover:scale-[1.02] transition-transform duration-500">
                                              <img src={item.image} className="w-full h-full object-cover" alt="Task attachment" />
                                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                          </div>
                                      )}

                                      {/* Title */}
                                      <h4 className="text-sm font-semibold text-foreground mb-4 leading-relaxed group-hover:text-primary transition-colors pl-2">
                                          {item.title}
                                      </h4>

                                      {/* Footer: Members & Meta */}
                                      <div className="flex items-center justify-between pt-3 border-t border-border/50 pl-2">
                                          <div className="flex -space-x-2">
                                              {item.members.map((m, i) => (
                                                  <Avatar key={i} className="h-6 w-6 border-2 border-card text-[9px]">
                                                       {/* If member is AN, show real photo, else fallback */}
                                                      {m === 'AN' ? <AvatarImage src={alanAvatar} /> : null}
                                                      <AvatarFallback className="bg-muted text-muted-foreground font-bold">{m}</AvatarFallback>
                                                  </Avatar>
                                              ))}
                                          </div>
                                          <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-medium">
                                              <span className="flex items-center gap-1 hover:text-foreground transition-colors"><Icon name="clip" size="size-3" /> 2</span>
                                              <span className="flex items-center gap-1 hover:text-foreground transition-colors"><Icon name="comment-alt" size="size-3" /> 4</span>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                              
                              {/* Add Button at bottom of list */}
                              <button className="w-full py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/30 rounded-xl border border-transparent hover:border-border/50 border-dashed transition-all opacity-60 hover:opacity-100">
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