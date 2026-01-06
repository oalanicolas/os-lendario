import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Textarea } from '../../ui/textarea';

interface LessonContextTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const LessonContextTabs: React.FC<LessonContextTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="h-auto w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="overview"
          className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Visão Geral
        </TabsTrigger>
        <TabsTrigger
          value="materials"
          className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Materiais (2)
        </TabsTrigger>
        <TabsTrigger
          value="comments"
          className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Comentários (12)
        </TabsTrigger>
      </TabsList>

      <div className="min-h-[300px] pt-6">
        {/* Overview Tab */}
        <TabsContent value="overview" className="animate-fade-in space-y-6">
          <div className="prose dark:prose-invert max-w-none font-serif text-muted-foreground">
            <h3>Resumo da Aula</h3>
            <p>
              Nesta unidade, focamos nos conceitos essenciais de banco de dados para aplicações
              modernas. A compreensão de chaves primárias e estrangeiras é fundamental para criar
              relações escaláveis.
            </p>
            <h3>O que você vai aprender</h3>
            <ul>
              <li>Conceitos fundamentais de banco de dados relacional</li>
              <li>Diferença entre Primary Key e Foreign Key</li>
              <li>Como modelar dados para escala (1M+ registros)</li>
            </ul>
          </div>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="animate-fade-in space-y-4">
          <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors group-hover:text-primary">
                <Icon name="file-pdf" size="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Slide_Deck_v2.pdf</p>
                <p className="text-xs text-muted-foreground">2.4 MB</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground group-hover:text-foreground"
            >
              <Icon name="download" />
            </Button>
          </div>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments" className="animate-fade-in space-y-6">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Adicione um comentário ou dúvida..."
                className="mb-2 min-h-[80px] border-border bg-card text-sm"
              />
              <div className="flex justify-end">
                <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                  Comentar
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="group flex gap-4">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                  JP
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">João Pedro</span>
                  <span className="text-xs text-muted-foreground">5h atrás</span>
                </div>
                <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                  Excelente explicação sobre normalização. Ficou muito mais claro.
                </p>
                <div className="flex items-center gap-4 pt-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Icon name="thumbs-up" size="size-3" /> Curtir
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    Responder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default LessonContextTabs;
