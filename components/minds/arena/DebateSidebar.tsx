import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { Clone } from './types';
import { ChatMessage } from './ChatMessage';

interface DebateSidebarProps {
  clone1: Clone;
  clone2: Clone;
}

export const DebateSidebar: React.FC<DebateSidebarProps> = ({ clone1, clone2 }) => {
  return (
    <div className="w-full lg:w-80 flex flex-col gap-6">
      {/* Fidelity Score Card */}
      <Card className="bg-card border-border">
        <CardHeader className="py-3 border-b border-border">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Fidelity Score (Live)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-foreground">
              <span>{clone1.name}</span>
              <span>{clone1.fidelity}%</span>
            </div>
            <Progress value={clone1.fidelity} className="h-1.5 bg-muted" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-foreground">
              <span>{clone2.name}</span>
              <span>{clone2.fidelity}%</span>
            </div>
            <Progress value={clone2.fidelity} className="h-1.5 bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Community Chat Card */}
      <Card className="bg-card border-border flex-1 flex flex-col min-h-[300px]">
        <CardHeader className="py-3 border-b border-border flex flex-row justify-between items-center">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Chat da Comunidade
          </CardTitle>
          <Badge variant="outline" className="text-[9px] border-border text-muted-foreground">
            234 online
          </Badge>
        </CardHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            <ChatMessage user="CryptoKing" text="Elon está destruindo nesse round!" time="14:02" />
            <ChatMessage user="Sarah_AI" text="O argumento sobre segurança do Sam é muito sólido." time="14:03" />
            <ChatMessage user="Dev_Junior" text="Alguém mais notou a referência ao paper de 2019?" time="14:03" />
            <ChatMessage user="Anon" text="Team Open Source sempre!" time="14:04" />
            <ChatMessage user="Mod_Bot" text="Votação para o próximo round aberta." time="14:05" />
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-border">
          <Input
            placeholder="Comente algo..."
            className="bg-input border-border h-9 text-xs"
          />
        </div>
      </Card>
    </div>
  );
};
