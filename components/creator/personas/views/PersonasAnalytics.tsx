import React, { useState, useMemo } from 'react';
import { Card } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { Persona } from '../../../../hooks/useAudienceProfiles';
import type { PersonasView } from './PersonasDashboard';

// =============================================================================
// TYPES
// =============================================================================

interface PersonasAnalyticsProps {
  onViewChange: (view: PersonasView) => void;
  personas: Persona[];
}

interface SelectedPersona {
  id: string;
  name: string;
  color: string;
}

// Matrix cell type with optional properties
interface MatrixCell {
  value: string;
  highlight?: 'green' | 'red' | null;
  icon?: string;
  iconColor?: string;
  isQuote?: boolean;
}

// Color palette for personas
const PERSONA_COLORS = [
  {
    bg: 'bg-studio-accent',
    bgLight: 'bg-studio-accent/10',
    border: 'border-studio-accent/20',
    text: 'text-studio-accent',
  },
  {
    bg: 'bg-[#C9B298]',
    bgLight: 'bg-[#C9B298]/10',
    border: 'border-[#C9B298]/20',
    text: 'text-[#C9B298]',
  },
  {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-500',
  },
  {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-500',
  },
  {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-500',
  },
];

// Period options
const PERIOD_OPTIONS = [
  { value: '30d', label: 'Ultimos 30 dias' },
  { value: 'quarter', label: 'Este Trimestre' },
  { value: 'year', label: 'Este Ano' },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PersonasAnalytics: React.FC<PersonasAnalyticsProps> = ({ onViewChange, personas }) => {
  // State
  const [selectedPersonas, setSelectedPersonas] = useState<SelectedPersona[]>(() => {
    // Initialize with first 3 personas
    return personas.slice(0, 3).map((p, i) => ({
      id: p.id,
      name: p.name,
      color: PERSONA_COLORS[i % PERSONA_COLORS.length].bg,
    }));
  });
  const [period, setPeriod] = useState('30d');
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);

  // Get color info for a persona by index
  const getPersonaColor = (index: number) => PERSONA_COLORS[index % PERSONA_COLORS.length];

  // Get selected persona objects with full data
  const selectedPersonaData = useMemo(() => {
    return selectedPersonas.map((sp, index) => {
      const persona = personas.find((p) => p.id === sp.id);
      return { ...sp, data: persona, colorInfo: getPersonaColor(index) };
    });
  }, [selectedPersonas, personas]);

  // Toggle persona selection
  const togglePersona = (persona: Persona) => {
    const exists = selectedPersonas.find((sp) => sp.id === persona.id);
    if (exists) {
      setSelectedPersonas((prev) => prev.filter((sp) => sp.id !== persona.id));
    } else if (selectedPersonas.length < 5) {
      const newIndex = selectedPersonas.length;
      setSelectedPersonas((prev) => [
        ...prev,
        {
          id: persona.id,
          name: persona.name,
          color: PERSONA_COLORS[newIndex % PERSONA_COLORS.length].bg,
        },
      ]);
    }
  };

  // Remove persona from selection
  const removePersona = (id: string) => {
    setSelectedPersonas((prev) => prev.filter((sp) => sp.id !== id));
  };

  // Mock analytics data (in production, would come from backend)
  const analyticsData = useMemo(
    () => ({
      ltv: selectedPersonaData.map((sp, i) => ({
        name: sp.name,
        value: [2400, 1100, 3800, 1900, 2200][i] || 1500,
        color: sp.colorInfo.bg,
      })),
      channelEngagement: {
        email: selectedPersonaData.map((sp, i) => ({
          name: sp.name,
          value: [45, 20, 35, 28, 32][i] || 25,
          color: sp.colorInfo.bg,
        })),
        social: selectedPersonaData.map((sp, i) => ({
          name: sp.name,
          value: [60, 15, 25, 40, 18][i] || 20,
          color: sp.colorInfo.bg,
        })),
        blog: selectedPersonaData.map((sp, i) => ({
          name: sp.name,
          value: [20, 50, 30, 25, 55][i] || 30,
          color: sp.colorInfo.bg,
        })),
      },
      consciousness: selectedPersonaData.map((sp, i) => ({
        name: sp.name,
        level: ['Alta', 'Media', 'Baixa', 'Alta', 'Media'][i] || 'Media',
        distribution: {
          unaware: [10, 40, 60, 15, 35][i] || 30,
          problem: [20, 30, 20, 25, 30][i] || 25,
          solution: [30, 20, 15, 25, 20][i] || 25,
          product: [40, 10, 5, 35, 15][i] || 20,
        },
      })),
      journeys: selectedPersonaData.slice(0, 2).map((sp, i) => ({
        name: sp.name,
        type: ['B2C', 'Enterprise'][i] || 'B2C',
        cycle: ['3 dias', '45 dias'][i] || '15 dias',
        color: sp.colorInfo,
        steps:
          i === 0
            ? [
                { step: 1, label: 'Anuncio Instagram (Reels)' },
                { step: 2, label: 'Visita Landing Page' },
                { step: 3, label: 'Compra no WhatsApp', final: true },
              ]
            : [
                { step: 1, label: 'Artigo LinkedIn / Blog' },
                { step: 2, label: 'Download E-book (Lead)' },
                { step: 3, label: 'Reuniao Demo', final: true },
              ],
      })),
      matrix: [
        {
          metric: 'Custo por Lead (CPL)',
          values: selectedPersonaData.map(
            (sp, i): MatrixCell => ({
              value: ['R$ 4.50', 'R$ 8.20', 'R$ 45.00', 'R$ 12.00', 'R$ 6.80'][i] || 'R$ 10.00',
              highlight: ['green', null, 'red', null, null][i] as 'green' | 'red' | null,
            })
          ),
        },
        {
          metric: 'Ticket Medio',
          values: selectedPersonaData.map(
            (sp, i): MatrixCell => ({
              value: ['R$ 197', 'R$ 97', 'R$ 5,000+', 'R$ 350', 'R$ 150'][i] || 'R$ 200',
              highlight: [null, null, 'green', null, null][i] as 'green' | 'red' | null,
            })
          ),
        },
        {
          metric: 'Canal Principal',
          values: selectedPersonaData.map(
            (sp, i): MatrixCell => ({
              value: ['Instagram', 'Youtube', 'LinkedIn', 'Email', 'Blog'][i] || 'Social',
              icon: ['camera', 'play', 'linkedin', 'envelope', 'document'][i] || 'globe',
              iconColor:
                [
                  'text-pink-500',
                  'text-red-500',
                  'text-blue-600',
                  'text-amber-500',
                  'text-emerald-500',
                ][i] || 'text-muted-foreground',
            })
          ),
        },
        {
          metric: 'Dor Principal',
          values: selectedPersonaData.map(
            (sp): MatrixCell => ({
              value: sp.data?.painPoints?.[0]?.superficial || 'Nao identificada',
              isQuote: true,
            })
          ),
        },
      ],
    }),
    [selectedPersonaData]
  );

  // Find max LTV for bar scaling
  const maxLtv = Math.max(...analyticsData.ltv.map((l) => l.value));

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <button
              onClick={() => onViewChange('dashboard')}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-studio-accent"
            >
              <Icon name="arrow-left" size="size-5" />
              <span>Voltar para o Hub</span>
            </button>
            <div className="h-4 w-px bg-border" />
            <nav className="flex items-center text-sm">
              <span className="text-muted-foreground">Persona Studio</span>
              <span className="mx-2 text-muted-foreground/50">/</span>
              <span className="text-muted-foreground">Personas</span>
              <span className="mx-2 text-muted-foreground/50">/</span>
              <span className="font-medium text-foreground">Comparativo de Perfis</span>
            </nav>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Comparativo de Personas</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground md:text-base">
            Analise metricas cruzadas, jornadas e comportamentos para identificar qual perfil gera
            mais valor.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-border bg-card hover:bg-muted/50"
        >
          <Icon name="download" size="size-4" />
          Exportar Relatorio
        </Button>
      </header>

      {/* Filter Bar */}
      <Card className={cn(STUDIO_CARD_CLASSES, 'p-4')}>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Persona Selector */}
          <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
            <span className="whitespace-nowrap text-sm font-bold text-foreground">
              Selecionar Personas:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {selectedPersonas.map((sp, index) => {
                const colorInfo = getPersonaColor(index);
                return (
                  <div
                    key={sp.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 transition-colors',
                      colorInfo.bgLight,
                      colorInfo.border,
                      'border'
                    )}
                  >
                    <div className={cn('size-2 rounded-full', colorInfo.bg)} />
                    <span className="text-sm font-bold text-foreground">{sp.name}</span>
                    <button
                      onClick={() => removePersona(sp.id)}
                      className="text-muted-foreground transition-colors hover:text-red-400"
                    >
                      <Icon name="xmark" size="size-4" />
                    </button>
                  </div>
                );
              })}
              <div className="relative">
                <button
                  onClick={() => setShowPersonaSelector(!showPersonaSelector)}
                  className="ml-1 flex size-8 items-center justify-center rounded-full border border-dashed border-muted-foreground/50 text-muted-foreground transition-colors hover:border-studio-accent hover:text-studio-accent"
                >
                  <Icon name="plus" size="size-4" />
                </button>
                {/* Dropdown */}
                {showPersonaSelector && (
                  <div className="absolute left-0 top-10 z-50 min-w-[200px] rounded-lg border border-border bg-card p-2 shadow-xl">
                    <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Adicionar Persona
                    </div>
                    {personas
                      .filter((p) => !selectedPersonas.find((sp) => sp.id === p.id))
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            togglePersona(p);
                            setShowPersonaSelector(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/50"
                        >
                          <Icon
                            name={p.icon as any}
                            size="size-4"
                            className="text-muted-foreground"
                          />
                          {p.name}
                        </button>
                      ))}
                    {personas.filter((p) => !selectedPersonas.find((sp) => sp.id === p.id))
                      .length === 0 && (
                      <p className="px-2 py-1.5 text-sm text-muted-foreground">
                        Todas as personas selecionadas
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Period Filter */}
          <div className="flex w-full items-center justify-end gap-3 md:w-auto">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Periodo:
            </span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-studio-accent"
            >
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Grid Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Card 1: LTV Comparison */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Icon name="coins" size="size-5" className="text-[#C9B298]" />
              Qual Perfil Mais Compra?
            </h3>
            <span className="text-xs font-semibold text-muted-foreground">LTV Medio</span>
          </div>
          <div className="flex min-h-[200px] flex-1 items-end justify-around gap-4 border-b border-white/5 px-4 pb-4">
            {analyticsData.ltv.map((item, index) => {
              const height = (item.value / maxLtv) * 100;
              const colorInfo = getPersonaColor(index);
              return (
                <div key={item.name} className="group flex w-1/4 flex-col items-center gap-2">
                  <span className="mb-1 text-sm font-bold text-foreground">
                    R$ {(item.value / 1000).toFixed(1)}k
                  </span>
                  <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-white/5 transition-opacity group-hover:opacity-90">
                    <div
                      className={cn('absolute bottom-0 w-full', colorInfo.bg, 'opacity-80')}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className={cn('size-2 rounded-full', colorInfo.bg)} />
                    <span className="text-xs font-bold text-muted-foreground">{item.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 pt-4 text-xs text-muted-foreground">
            <Icon name="info" size="size-4" />
            <span>Compare LTV para identificar personas de maior valor.</span>
          </div>
        </Card>

        {/* Card 2: Interaction by Channel */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Icon name="cursor-finger" size="size-5" className="text-[#C9B298]" />
              Qual Perfil Mais Interage?
            </h3>
            <span className="text-xs font-semibold text-muted-foreground">Taxa de Engajamento</span>
          </div>
          <div className="space-y-5">
            {/* Email Marketing */}
            <ChannelBar
              icon="envelope"
              label="Email Marketing"
              benchmark="Media setor: 12%"
              segments={analyticsData.channelEngagement.email.map((s, i) => ({
                ...s,
                colorInfo: getPersonaColor(i),
              }))}
            />
            {/* Instagram / Social */}
            <ChannelBar
              icon="camera"
              label="Instagram / Social"
              benchmark="Media setor: 4.5%"
              segments={analyticsData.channelEngagement.social.map((s, i) => ({
                ...s,
                colorInfo: getPersonaColor(i),
              }))}
            />
            {/* Blog / Content */}
            <ChannelBar
              icon="document"
              label="Blog / Conteudo"
              benchmark="Media setor: 2%"
              segments={analyticsData.channelEngagement.blog.map((s, i) => ({
                ...s,
                colorInfo: getPersonaColor(i),
              }))}
            />
          </div>
        </Card>

        {/* Card 3: Consciousness Levels */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Icon name="brain" size="size-5" className="text-[#C9B298]" />
              Niveis de Consciencia
            </h3>
          </div>
          <div className="space-y-6">
            {analyticsData.consciousness.map((item, index) => (
              <div key={item.name} className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <span>{item.name}</span>
                  <span>{item.level} Consciencia</span>
                </div>
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-background">
                  <div className="bg-red-500" style={{ width: `${item.distribution.unaware}%` }} />
                  <div
                    className="bg-orange-500"
                    style={{ width: `${item.distribution.problem}%` }}
                  />
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${item.distribution.solution}%` }}
                  />
                  <div
                    className="bg-green-500"
                    style={{ width: `${item.distribution.product}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span className="text-red-400">Inconsciente: {item.distribution.unaware}%</span>
                  <span className="text-green-400">
                    Pronto para compra: {item.distribution.product}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <LegendDot color="bg-red-500" label="Inconsciente" />
            <LegendDot color="bg-orange-500" label="Problema" />
            <LegendDot color="bg-yellow-500" label="Solucao" />
            <LegendDot color="bg-green-500" label="Produto" />
          </div>
        </Card>

        {/* Card 4: Journeys */}
        <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Icon name="route" size="size-5" className="text-[#C9B298]" />
              Jornadas de Compra Comuns
            </h3>
          </div>
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
            {analyticsData.journeys.map((journey, index) => (
              <JourneyCard key={journey.name} journey={journey} />
            ))}
          </div>
        </Card>
      </div>

      {/* Matrix Table */}
      <Card className={cn(STUDIO_CARD_CLASSES, 'overflow-hidden')}>
        <div className="flex items-center justify-between border-b border-border p-6">
          <h3 className="text-lg font-bold text-foreground">Matriz de Comparacao Detalhada</h3>
          <Button variant="link" className="text-sm text-studio-accent hover:text-studio-accent/80">
            Ver todos os dados
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-xs font-semibold uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Metrica / KPI</th>
                {selectedPersonaData.map((sp, index) => (
                  <th key={sp.id} className="border-l border-border/50 px-6 py-4 text-center">
                    <span className={cn('mb-1 block', sp.colorInfo.text)}>{sp.name}</span>
                    <span className="text-[10px] font-normal normal-case opacity-60">
                      {sp.data?.demographics?.role || 'Persona'}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {analyticsData.matrix.map((row, rowIndex) => (
                <tr key={row.metric} className="transition-colors hover:bg-background/50">
                  <td className="px-6 py-4 font-medium text-foreground">{row.metric}</td>
                  {row.values.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        'border-l border-border/50 px-6 py-4 text-center',
                        cell.highlight === 'green' && 'font-bold text-green-500',
                        cell.highlight === 'red' && 'font-bold text-red-400',
                        cell.isQuote && 'text-xs text-muted-foreground'
                      )}
                    >
                      {cell.icon ? (
                        <div className="flex flex-col items-center gap-1">
                          <Icon name={cell.icon as any} size="size-5" className={cell.iconColor} />
                          <span className="text-muted-foreground">{cell.value}</span>
                        </div>
                      ) : cell.isQuote ? (
                        `"${cell.value}"`
                      ) : (
                        cell.value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface ChannelBarProps {
  icon: string;
  label: string;
  benchmark: string;
  segments: Array<{
    name: string;
    value: number;
    colorInfo: (typeof PERSONA_COLORS)[0];
  }>;
}

const ChannelBar: React.FC<ChannelBarProps> = ({ icon, label, benchmark, segments }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={icon as any} size="size-4" className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-xs text-muted-foreground">{benchmark}</span>
      </div>
      <div className="flex h-8 w-full overflow-hidden rounded-md bg-background">
        {segments.map((seg, i) => {
          const width = (seg.value / total) * 100;
          return (
            <div
              key={seg.name}
              className={cn(
                'flex h-full items-center justify-center text-[10px] font-bold',
                seg.colorInfo.bg,
                i < 2 ? 'text-background' : 'text-white'
              )}
              style={{ width: `${width}%` }}
            >
              {seg.name.charAt(0)}: {seg.value}%
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LegendDot: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <div className={cn('size-2 rounded-full', color)} />
    <span className="text-[10px] text-muted-foreground">{label}</span>
  </div>
);

interface JourneyCardProps {
  journey: {
    name: string;
    type: string;
    cycle: string;
    color: (typeof PERSONA_COLORS)[0];
    steps: Array<{ step: number; label: string; final?: boolean }>;
  };
}

const JourneyCard: React.FC<JourneyCardProps> = ({ journey }) => (
  <div className="relative overflow-hidden rounded-lg border border-border bg-background p-4">
    <div className={cn('absolute left-0 top-0 h-full w-1', journey.color.bg)} />
    <div className="mb-3 flex justify-between">
      <span className={cn('text-xs font-bold uppercase', journey.color.text)}>
        {journey.name} ({journey.type})
      </span>
      <span className="text-[10px] text-muted-foreground">Ciclo: {journey.cycle}</span>
    </div>
    <div className="relative z-10 flex flex-col gap-3">
      {journey.steps.map((step, i) => (
        <React.Fragment key={step.step}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-6 items-center justify-center rounded-full text-[10px]',
                step.final
                  ? cn(journey.color.bg, 'font-bold text-background')
                  : 'bg-muted text-foreground'
              )}
            >
              {step.step}
            </div>
            <span
              className={cn(
                'text-xs',
                step.final ? 'font-bold text-foreground' : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
          </div>
          {i < journey.steps.length - 1 && <div className="ml-3 h-2 w-px bg-muted-foreground/30" />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default PersonasAnalytics;
