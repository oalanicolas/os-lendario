import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Separator } from '../../ui/separator';
import { AutosizeTextarea } from '../../ui/autosize-textarea';

interface LessonSettingsTabProps {
  lesson: {
    id: string;
    slug: string;
    status: string;
    sequence_order?: number;
    fidelity_score?: number | null;
    metadata?: {
      duration?: string;
      description?: string;
    };
  };
}

const LessonSettingsTab: React.FC<LessonSettingsTabProps> = ({ lesson }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-1 text-xl font-semibold">Configurações da Aula</h2>
        <p className="text-sm text-muted-foreground">Metadados e opções avançadas.</p>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Duração estimada</Label>
              <Input placeholder="Ex: 15 min" defaultValue={lesson.metadata?.duration || ''} />
              <p className="text-xs text-muted-foreground">
                Tempo aproximado para completar a aula
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sequência</Label>
              <Input type="number" placeholder="1" defaultValue={lesson.sequence_order || ''} />
              <p className="text-xs text-muted-foreground">Ordem dentro do módulo</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Descrição curta</Label>
            <AutosizeTextarea
              placeholder="Breve descrição para exibição em listas e previews..."
              defaultValue={lesson.metadata?.description || ''}
              className="min-h-[100px]"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Informações do Sistema</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-muted/30 p-3">
                <span className="text-muted-foreground">ID da lição</span>
                <p className="mt-1 font-mono text-xs">{lesson.id}</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <span className="text-muted-foreground">Slug</span>
                <p className="mt-1 font-mono text-xs">{lesson.slug}</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <span className="text-muted-foreground">Status</span>
                <p className="mt-1 text-xs">{lesson.status}</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <span className="text-muted-foreground">Fidelidade</span>
                <p className="mt-1 text-xs">
                  {lesson.fidelity_score ? `${Math.round(lesson.fidelity_score * 100)}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonSettingsTab;
