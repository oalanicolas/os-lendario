import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { STUDIO_PRIMARY } from '../studio-tokens';

const LessonExercisesTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-1 text-xl font-semibold">Exercícios & Avaliações</h2>
        <p className="text-sm text-muted-foreground">
          Crie quizzes, assessments e atividades práticas para esta aula.
        </p>
      </div>

      {/* Quiz Section */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Icon name="circle-question" size="size-5" className="text-amber-500" />
              </div>
              <div>
                <h4 className="font-medium">Quiz de Fixação</h4>
                <p className="text-xs text-muted-foreground">Perguntas de múltipla escolha</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="plus" size="size-4" />
              Adicionar Quiz
            </Button>
          </div>
          <div className="rounded-lg border border-dashed border-border p-6 text-center">
            <Icon
              name="circle-question"
              size="size-8"
              className="mx-auto mb-3 text-muted-foreground/50"
            />
            <p className="mb-2 text-sm text-muted-foreground">Nenhum quiz criado</p>
            <p className="text-xs text-muted-foreground">
              Quizzes ajudam a fixar o conteúdo e medir compreensão
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Section */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Icon name="clipboard-check" size="size-5" className="text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium">Assessment</h4>
                <p className="text-xs text-muted-foreground">Avaliação completa com pontuação</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="plus" size="size-4" />
              Criar Assessment
            </Button>
          </div>
          <div className="rounded-lg border border-dashed border-border p-6 text-center">
            <Icon
              name="clipboard-check"
              size="size-8"
              className="mx-auto mb-3 text-muted-foreground/50"
            />
            <p className="mb-2 text-sm text-muted-foreground">Nenhum assessment criado</p>
            <p className="text-xs text-muted-foreground">
              Assessments avaliam o domínio completo do conteúdo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Practical Exercise Section */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10">
                <Icon name="laptop-code" size="size-5" style={{ color: STUDIO_PRIMARY }} />
              </div>
              <div>
                <h4 className="font-medium">Exercício Prático</h4>
                <p className="text-xs text-muted-foreground">
                  Atividade hands-on para aplicar o conhecimento
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="plus" size="size-4" />
              Adicionar Exercício
            </Button>
          </div>
          <div className="rounded-lg border border-dashed border-border p-6 text-center">
            <Icon
              name="laptop-code"
              size="size-8"
              className="mx-auto mb-3 text-muted-foreground/50"
            />
            <p className="mb-2 text-sm text-muted-foreground">Nenhum exercício prático</p>
            <p className="text-xs text-muted-foreground">
              Exercícios práticos consolidam o aprendizado através da ação
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reflection Section */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                <Icon name="lightbulb" size="size-5" className="text-sky-500" />
              </div>
              <div>
                <h4 className="font-medium">Pergunta de Reflexão</h4>
                <p className="text-xs text-muted-foreground">
                  Questão aberta para reflexão do aluno
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="plus" size="size-4" />
              Adicionar Reflexão
            </Button>
          </div>
          <div className="rounded-lg border border-dashed border-border p-6 text-center">
            <Icon
              name="lightbulb"
              size="size-8"
              className="mx-auto mb-3 text-muted-foreground/50"
            />
            <p className="mb-2 text-sm text-muted-foreground">Nenhuma pergunta de reflexão</p>
            <p className="text-xs text-muted-foreground">
              Perguntas abertas estimulam pensamento crítico
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonExercisesTab;
