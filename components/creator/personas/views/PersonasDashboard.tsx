import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import { Progress } from '../../../ui/progress';
import { cn } from '../../../../lib/utils';
import { STUDIO_CARD_CLASSES, STUDIO_KPI_CLASSES, STUDIO_GOLD_GRADIENT } from '../../studio-tokens';
import { CircularProgressScore } from '../../../shared';

export type PersonasView = 'dashboard' | 'list' | 'create' | 'detail' | 'analytics' | 'pain-editor';

interface PersonasDashboardProps {
  onViewChange: (view: PersonasView) => void;
  stats?: {
    total: number;
    active: number;
    drafts: number;
    withDisc: number;
    withEnneagram: number;
  };
}

export const PersonasDashboard: React.FC<PersonasDashboardProps> = ({
  onViewChange,
  stats = { total: 12, active: 8, drafts: 4, withDisc: 12, withEnneagram: 8 },
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-sans text-2xl font-bold">Dashboard ICP & Personas</h2>
          <p className="text-sm text-muted-foreground">
            Visão geral estratégica e psicografia avançada.
          </p>
        </div>
        <Button
          onClick={() => onViewChange('create')}
          className="gap-2 bg-studio-accent text-background shadow-lg shadow-studio-accent/20 transition-all hover:scale-105"
        >
          <Icon name="plus-circle" size="size-4" /> Nova Persona
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* KPI 1: Total Personas */}
        <Card
          className={cn(
            STUDIO_KPI_CLASSES,
            'group relative overflow-hidden transition-colors hover:border-studio-accent/30'
          )}
        >
          <div className="absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
            <Icon name="users-alt" size="size-16" />
          </div>
          <CardContent className="relative z-10 p-6">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-studio-accent/50" />
                Total Personas
              </p>
              <p className="text-4xl font-bold tracking-tight">{stats.total}</p>
              <div className="mt-1 flex w-fit items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                <Icon name="arrow-trend-up" size="size-3" />
                +2 este mês
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI 2: Active */}
        <Card
          className={cn(
            STUDIO_CARD_CLASSES,
            'group relative overflow-hidden transition-colors hover:border-studio-accent/30'
          )}
        >
          <div className="absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
            <Icon name="check-circle" size="size-16" />
          </div>
          <CardContent className="relative z-10 p-6">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-blue-500/50" />
                Personas Ativas
              </p>
              <p className="text-4xl font-bold tracking-tight">{stats.active}</p>
              <p className="mt-1 text-xs text-muted-foreground">Usadas em campanhas ativas</p>
            </div>
          </CardContent>
        </Card>

        {/* KPI 3: Drafts */}
        <Card
          className={cn(
            STUDIO_CARD_CLASSES,
            'group relative overflow-hidden transition-colors hover:border-studio-accent/30'
          )}
        >
          <div className="absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
            <Icon name="document" size="size-16" />
          </div>
          <CardContent className="relative z-10 p-6">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-orange-500/50" />
                Em Rascunho
              </p>
              <p className="text-4xl font-bold tracking-tight">{stats.drafts}</p>
              <p className="mt-1 text-xs text-muted-foreground">Precisam de revisão</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Behaviors & Triggers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Behavioral Profiles */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'relative overflow-hidden')}>
          <div className="pointer-events-none absolute right-0 top-0 p-6 opacity-5">
            <Icon name="brain" size="size-20" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Perfis Comportamentais</CardTitle>
              <p className="text-sm text-muted-foreground">Distribuição DISC e Eneagrama</p>
            </div>
            <Badge className="border-studio-accent/20 bg-studio-accent/10 text-studio-accent">
              <Icon name="magic-wand" size="size-3" className="mr-1" />
              Psicografia
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold tracking-tight">{stats.withDisc}</span>
              <span className="mb-1 text-xs text-muted-foreground">
                Personas com perfil completo
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium text-foreground">Perfil DISC Definido</span>
                  <span className="text-muted-foreground">
                    {stats.withDisc}/{stats.total} Personas
                  </span>
                </div>
                <Progress value={(stats.withDisc / stats.total) * 100} className="h-2" />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium text-foreground">Eneagrama Identificado</span>
                  <span className="text-muted-foreground">
                    {stats.withEnneagram}/{stats.total} Personas
                  </span>
                </div>
                <Progress value={(stats.withEnneagram / stats.total) * 100} className="h-2" />
              </div>
            </div>

            <div className="flex gap-2 border-t border-border/50 pt-4">
              <Badge variant="secondary" className="text-xs">
                Dominante: <span className="font-semibold text-foreground">DISC D</span>
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Recorrente:{' '}
                <span className="font-semibold text-foreground">Tipo 3 (Realizador)</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Triggers */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Gatilhos em Destaque</CardTitle>
              <p className="text-sm text-muted-foreground">Padrões de persuasão identificados</p>
            </div>
            <Button variant="ghost" size="icon" className="size-8">
              <Icon name="menu-dots" size="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 space-y-3 pt-4">
            {/* Trigger Items */}
            <TriggerItem
              icon="bolt"
              title="Foco em Resultados Rápidos"
              description="Decision makers buscam ROI imediato. Evitar longas explicações teóricas."
              tags={['DISC D', 'Tipo 3']}
              tagColors={['indigo', 'purple']}
            />
            <TriggerItem
              icon="medal"
              title="Status & Exclusividade"
              description="Valorização de acesso a recursos premium e autoridade da marca."
              tags={['Tipo 3']}
              tagColors={['purple']}
            />
            <TriggerItem
              icon="shield-check"
              title="Segurança e Garantia"
              description="Apresentar garantias, cases validados e suporte técnico robusto."
              tags={['Tipo 6']}
              tagColors={['emerald']}
            />
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Consciousness Levels */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Níveis de Consciência</CardTitle>
              <p className="text-sm text-muted-foreground">Distribuição das personas por funil</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center gap-8 pt-4">
            <CircularProgressScore score={100} size="lg" />
            <div className="flex flex-col justify-center gap-4">
              <LegendItem color="bg-studio-accent" label="Consciente da Solução" value="40%" />
              <LegendItem color="bg-white/40" label="Consciente do Problema" value="35%" />
              <LegendItem color="bg-white/20" label="Inconsciente" value="25%" />
            </div>
          </CardContent>
        </Card>

        {/* Validation Status */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Status de Validação</CardTitle>
              <p className="text-sm text-muted-foreground">Qualidade e fonte dos insights</p>
            </div>
            <Badge className="border-studio-accent/20 bg-studio-accent/10 text-studio-accent">
              Alta Confiabilidade
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-center gap-6 pt-4">
            <div>
              <p className="mb-1 text-5xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">
                Média de validação em todas as personas
              </p>
            </div>
            <div className="space-y-4">
              <ValidationBar
                icon="check-circle"
                iconColor="text-emerald-400"
                label="Dados Validados (Humano)"
                value={62}
                barColor="bg-emerald-400"
              />
              <ValidationBar
                icon="robot"
                iconColor="text-studio-accent"
                label="Gerados por IA"
                value={28}
                barColor="bg-studio-accent"
              />
              <ValidationBar
                icon="question"
                iconColor="text-muted-foreground"
                label="Não Testados"
                value={10}
                barColor="bg-muted"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Insights */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Insights e Ações Recomendadas</h3>
          <Button variant="link" className="text-studio-accent">
            Ver todos
          </Button>
        </div>
        <Card className={cn(STUDIO_CARD_CLASSES, 'divide-y divide-border/50 overflow-hidden')}>
          <InsightItem
            icon="brain"
            iconBg="bg-studio-accent/10"
            iconColor="text-studio-accent"
            title="Otimizar copy para Persona Marina"
            description="Eneagrama 3 identificado • Focar em status e prestígio profissional"
            tag="Psicografia"
            tagColor="studio-accent"
            highlighted
          />
          <InsightItem
            icon="lightbulb-alt"
            iconBg="bg-blue-500/10"
            iconColor="text-blue-400"
            title="Gerar temas para 2 personas"
            description="Persona: Gerente de Marketing • Novos interesses identificados"
            tag="Oportunidade"
            tagColor="blue-400"
          />
          <InsightItem
            icon="exclamation"
            iconBg="bg-red-500/10"
            iconColor="text-red-400"
            title="Priorizar validação de 3 dores"
            description="Persona: CEO Tech Enterprise • Baixa confiança detectada"
            tag="Alta Prioridade"
            tagColor="red-400"
          />
        </Card>
      </div>
    </div>
  );
};

// Sub-components
const TriggerItem: React.FC<{
  icon: string;
  title: string;
  description: string;
  tags: string[];
  tagColors: string[];
}> = ({ icon, title, description, tags, tagColors }) => (
  <div className="group cursor-pointer rounded-lg border border-transparent bg-muted/20 p-3 transition-all hover:border-border hover:bg-muted/30">
    <div className="mb-1 flex items-start justify-between">
      <div className="flex items-center gap-2">
        <Icon name={icon as any} size="size-4" className="text-studio-accent" />
        <h4 className="text-sm font-bold text-foreground">{title}</h4>
      </div>
      <div className="flex gap-1">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className={cn(
              'rounded border px-1.5 py-0.5 text-[10px] font-medium',
              tagColors[i] === 'indigo' && 'border-indigo-500/20 bg-indigo-500/20 text-indigo-300',
              tagColors[i] === 'purple' && 'border-purple-500/20 bg-purple-500/20 text-purple-300',
              tagColors[i] === 'emerald' &&
                'border-emerald-500/20 bg-emerald-500/20 text-emerald-300'
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <p className="pl-6 text-xs leading-relaxed text-muted-foreground">{description}</p>
  </div>
);

const LegendItem: React.FC<{ color: string; label: string; value: string }> = ({
  color,
  label,
  value,
}) => (
  <div className="flex items-center gap-3">
    <div className={cn('size-3 shrink-0 rounded-full', color)} />
    <div className="flex flex-col">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{value} das personas</span>
    </div>
  </div>
);

const ValidationBar: React.FC<{
  icon: string;
  iconColor: string;
  label: string;
  value: number;
  barColor: string;
}> = ({ icon, iconColor, label, value, barColor }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-2 font-medium text-foreground">
        <Icon name={icon as any} size="size-4" className={iconColor} />
        {label}
      </span>
      <span className="text-muted-foreground">{value}%</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
      <div className={cn('h-full rounded-full', barColor)} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const InsightItem: React.FC<{
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  highlighted?: boolean;
}> = ({ icon, iconBg, iconColor, title, description, tag, tagColor, highlighted }) => (
  <div
    className={cn(
      'group flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/20',
      highlighted && 'bg-studio-accent/5'
    )}
  >
    <div
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all',
        iconBg,
        `border-${tagColor}/20`,
        `group-hover:bg-${tagColor.split('-')[0]}-500 group-hover:text-background`
      )}
    >
      <Icon name={icon as any} size="size-5" className={iconColor} />
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="truncate text-sm font-bold text-foreground">{title}</h4>
      <p className="truncate text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="flex shrink-0 items-center gap-3">
      <Badge
        variant="outline"
        className={cn(
          'text-xs',
          `border-${tagColor}/20 bg-${tagColor.split('-')[0]}-500/10 text-${tagColor}`
        )}
      >
        {tag}
      </Badge>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-foreground"
      >
        <Icon name="angle-right" size="size-4" />
      </Button>
    </div>
  </div>
);

export default PersonasDashboard;
