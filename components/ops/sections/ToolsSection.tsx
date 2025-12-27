import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { StatusBadge } from '../components/StatusBadge';
import { TOOLS_DIAGRAM } from '../data/diagrams';
import { TOOLS_TABLE } from '../data/tables';
import {
  TOOL_EXPLANATION,
  TOOL_CATALOG,
  TOOL_RELATIONS,
  AFFINITY_ALGORITHM,
  RECOMMENDATION_FLOW,
  AXIS_EXAMPLES,
  TOOL_STACKS
} from '../data/tool-content';
import { OPS_PRIMARY, OPS_ACCENT } from '../ops-tokens';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsLabel,
  OpsCode,
  OpsSection
} from '../ops-ui';


const AxisVisual: React.FC<{ axis: typeof AXIS_EXAMPLES.axes[0] }> = ({ axis }) => {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <div className="space-y-12 py-10 px-4 relative">
      {/* Axis Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8">
        <div>
          <h4 className="font-bold text-base tracking-tight" style={{ color: OPS_ACCENT }}>{axis.name}</h4>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-70">{axis.description}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="block text-[9px] font-bold text-muted-foreground/50 uppercase">Min</span>
            <span className="text-xs font-medium text-muted-foreground">{axis.low.label}</span>
          </div>
          <div className="h-8 w-px bg-border/20" />
          <div>
            <span className="block text-[9px] font-bold text-muted-foreground/50 uppercase">Max</span>
            <span className="text-xs font-medium text-muted-foreground">{axis.high.label}</span>
          </div>
        </div>
      </div>

      {/* The Instrument Track */}
      <div className="relative h-20 flex items-center">
        {/* Background Track with Gradient and Glow */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-muted/20 border border-white/5 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 blur-sm"
            style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${OPS_ACCENT})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${OPS_ACCENT})` }}
          />
        </div>

        {/* Ticks */}
        <div className="absolute inset-x-0 flex justify-between px-0.5 pointer-events-none">
          {[...Array(11)].map((_, i) => (
            <div key={i} className={cn(
              "w-px bg-foreground/10 transition-all duration-500",
              i % 5 === 0 ? "h-4" : "h-2",
              i === 0 || i === 10 ? "opacity-40" : "opacity-20"
            )} />
          ))}
        </div>

        {/* Tools Dots and Labels */}
        {axis.tools.map((tool, j) => {
          const position = ((tool.score - 1) / 9) * 100;
          const isStaggered = j % 2 === 0;
          const isHovered = hoveredTool === j;

          return (
            <div
              key={j}
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `${position}%`, zIndex: isHovered ? 50 : 10 }}
              onMouseEnter={() => setHoveredTool(j)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              {/* Vertical Guide */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-px transition-all duration-500",
                  isStaggered ? "bottom-2 h-8" : "top-2 h-8",
                  isHovered ? "bg-primary opacity-100" : "bg-foreground/10 opacity-30"
                )}
              />

              {/* Dot */}
              <div
                className={cn(
                  "relative w-3 h-3 rounded-full border-2 border-background transition-all duration-300 cursor-pointer shadow-lg",
                  isHovered ? "scale-150 ring-4 ring-primary/20" : "hover:scale-125"
                )}
                style={{ backgroundColor: isHovered ? OPS_PRIMARY : OPS_ACCENT }}
              />

              {/* Label */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none",
                  isStaggered ? "bottom-12" : "top-12",
                  isHovered ? "opacity-100 scale-105" : "opacity-70 scale-100"
                )}
              >
                <span className={cn(
                  "text-[9px] font-bold px-2 py-0.5 rounded border transition-colors",
                  isHovered
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/30 text-muted-foreground border-white/5"
                )}>
                  {tool.name}
                </span>
              </div>

              {/* Tooltip (Rationale) */}
              {isHovered && (
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-48 p-2 rounded-lg bg-card border border-border shadow-2xl z-50 animate-in zoom-in-95 duration-200",
                    isStaggered ? "bottom-20" : "top-20"
                  )}
                >
                  <p className="text-[10px] text-foreground font-medium leading-tight">
                    {tool.reason}
                  </p>
                  <div
                    className="mt-1.5 pt-1.5 border-t border-border/40 text-[8px] text-muted-foreground italic"
                  >
                    Score: {tool.score}/10
                  </div>
                  {/* Tooltip Arrow */}
                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card border-border border-r border-b",
                      isStaggered ? "top-full -mt-1" : "bottom-full -mb-1 rotate-[-135deg]"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Axis Footer Desc */}
      <div className="flex justify-between items-start gap-10 pt-4 border-t border-border/10">
        <div className="max-w-[200px]">
          <span className="block text-[8px] font-bold text-muted-foreground/30 uppercase mb-1">Low Range</span>
          <p className="text-[10px] text-muted-foreground/60 leading-tight italic">{axis.low.desc}</p>
        </div>
        <div className="max-w-[200px] text-right">
          <span className="block text-[8px] font-bold text-muted-foreground/30 uppercase mb-1">High Range</span>
          <p className="text-[10px] text-muted-foreground/60 leading-tight italic">{axis.high.desc}</p>
        </div>
      </div>
    </div>
  );
};

export const ToolsSection: React.FC = () => {
  const [selectedCatalogType, setSelectedCatalogType] = useState<string>('mental_model');
  const [expandedStack, setExpandedStack] = useState<string | null>(null);

  const catalogTypes = Object.keys(TOOL_CATALOG) as Array<keyof typeof TOOL_CATALOG>;
  const selectedCatalog = TOOL_CATALOG[selectedCatalogType as keyof typeof TOOL_CATALOG];

  return (
    <OpsPage>
      {/* Definition */}
      <OpsCard>
        <OpsCardHeader title={TOOL_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground">{TOOL_EXPLANATION.definition}</OpsText>
        </OpsCardContent>
      </OpsCard>

      {/* Types */}
      <OpsCard>
        <OpsCardHeader title="Tipos de Tool" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={3}>
            {TOOL_EXPLANATION.types.map((t, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={t.icon} size="size-4" style={{ color: OPS_ACCENT }} />
                  <h4 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>{t.type}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {t.examples.map((ex, j) => (
                    <span key={j} className="text-[10px] bg-muted/30 px-1.5 py-0.5 rounded text-foreground">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Tool Catalog Deep Dive */}
      <OpsCard>
        <OpsCardHeader title="Catalogo de Tools - Deep Dive" accentColor="text-muted-foreground" />
        <OpsCardContent>
          {/* Type Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            {catalogTypes.map((type) => {
              const catalog = TOOL_CATALOG[type];
              const isSelected = type === selectedCatalogType;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedCatalogType(type)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isSelected
                    ? 'bg-opacity-100 text-white'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                    }`}
                  style={isSelected ? { backgroundColor: OPS_ACCENT } : {}}
                >
                  <Icon name={catalog.icon} size="size-3" />
                  {type.replace('_', ' ')}
                </button>
              );
            })}
          </div>

          {/* Selected Type Content */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/10 border-l-4" style={{ borderColor: OPS_ACCENT }}>
              <h4 className="font-bold text-sm mb-1" style={{ color: OPS_ACCENT }}>{selectedCatalog.title}</h4>
              <p className="text-xs text-muted-foreground">{selectedCatalog.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {selectedCatalog.examples.map((tool, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 space-y-2">
                  <div className="flex items-start justify-between">
                    <h5 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>{tool.name}</h5>
                    <span className="text-[10px] text-muted-foreground bg-muted/20 px-1.5 py-0.5 rounded">{tool.origin}</span>
                  </div>
                  <p className="text-xs text-foreground">{tool.description}</p>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground">
                      <span className="font-medium">Quando usar:</span> {tool.useCase}
                    </p>
                    <p className="text-[10px] italic" style={{ color: OPS_PRIMARY }}>
                      <span className="font-medium">Exemplo:</span> {tool.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Tool Relations */}
      <OpsCard>
        <OpsCardHeader title={TOOL_RELATIONS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-4">{TOOL_RELATIONS.description}</OpsText>

          <div className="space-y-4">
            {TOOL_RELATIONS.relationTypes.map((rel, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: rel.color }}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={rel.icon} size="size-4" style={{ color: rel.color }} />
                  <OpsCode className="text-xs font-bold" style={{ color: rel.color }}>{rel.type}</OpsCode>
                  <span className="text-xs text-muted-foreground">- {rel.description}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  {rel.examples.map((ex, j) => (
                    <div key={j} className="p-2 rounded bg-muted/20">
                      <p className="text-xs text-foreground">
                        {'tool' in ex && 'derivedFrom' in ex && (
                          <><span className="font-medium">{ex.tool}</span> ← {ex.derivedFrom}</>
                        )}
                        {'tool' in ex && 'requires' in ex && (
                          <><span className="font-medium">{ex.tool}</span> ← {ex.requires}</>
                        )}
                        {'tools' in ex && (
                          <span className="font-medium">{(ex as { tools: string[] }).tools.join(' + ')}</span>
                        )}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">{ex.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Axes */}
      <OpsCard>
        <OpsCardHeader title="Eixos de Classificacao" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-4">
            {TOOL_EXPLANATION.axes.map((axis, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: OPS_ACCENT }}>{axis.name}</span>
                  <span className="text-[10px] text-muted-foreground">{axis.example}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-32 text-right">{axis.low}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${OPS_ACCENT})` }} />
                  <span className="text-xs text-muted-foreground w-32">{axis.high}</span>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Axis Classification Examples */}
      <OpsCard>
        <OpsCardHeader title={`${AXIS_EXAMPLES.title} - Instrumentos de Precisao`} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-8 opacity-80">{AXIS_EXAMPLES.description}</OpsText>

          <div className="space-y-4 divide-y divide-border/20">
            {AXIS_EXAMPLES.axes.map((axis, i) => (
              <AxisVisual key={i} axis={axis} />
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Affinities */}
      <OpsCard>
        <OpsCardHeader title="Tipos de Afinidade (tool_driver_affinities)" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-4">{TOOL_EXPLANATION.affinities.desc}</OpsText>
          <OpsGrid columns={2}>
            {TOOL_EXPLANATION.affinities.types.map((aff, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: aff.color }}>
                <div className="flex items-center gap-2 mb-1">
                  <OpsCode className="text-xs font-bold" style={{ color: aff.color }}>{aff.type}</OpsCode>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{aff.desc}</p>
                <p className="text-[10px] italic" style={{ color: aff.color }}>{aff.example}</p>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Affinity Algorithm Deep Dive */}
      <OpsCard>
        <OpsCardHeader title={`${AFFINITY_ALGORITHM.title} - Deep Dive`} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-4">{AFFINITY_ALGORITHM.description}</OpsText>

          {/* Formula */}
          <div className="p-4 rounded-lg bg-muted/20 mb-4">
            <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>{AFFINITY_ALGORITHM.formula.title}</h4>
            <OpsCode className="block text-xs bg-muted/30 p-3 rounded font-mono text-foreground mb-3">
              {AFFINITY_ALGORITHM.formula.equation}
            </OpsCode>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {AFFINITY_ALGORITHM.formula.components.map((comp, i) => (
                <div key={i} className="text-xs">
                  <OpsCode className="font-bold" style={{ color: OPS_ACCENT }}>{comp.name}</OpsCode>
                  <span className="text-muted-foreground"> - {comp.desc}</span>
                  <span className="block text-[10px] italic text-muted-foreground mt-0.5">ex: {comp.example}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Example Calculation */}
          <div className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_ACCENT }}>
            <h4 className="font-bold text-sm mb-3" style={{ color: OPS_ACCENT }}>{AFFINITY_ALGORITHM.example.title}</h4>

            {/* Profile */}
            <div className="mb-3">
              <span className="text-xs font-medium text-muted-foreground">Perfil de {AFFINITY_ALGORITHM.example.profile.name}:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {AFFINITY_ALGORITHM.example.profile.drivers.map((d, i) => (
                  <span key={i} className="text-[10px] bg-muted/20 px-2 py-1 rounded">
                    {d.driver}: <span className="font-bold">{d.value}</span> <span className="text-muted-foreground">({d.source})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Tool Affinities */}
            <div className="mb-3">
              <span className="text-xs font-medium text-muted-foreground">Afinidades do GTD:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {AFFINITY_ALGORITHM.example.toolAffinities.map((a, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 rounded"
                    style={{
                      backgroundColor: a.direction === 1 ? '#10b98130' : '#ef444430',
                      color: a.direction === 1 ? '#10b981' : '#ef4444'
                    }}
                  >
                    {a.driver}: {a.type} (w={a.weight})
                  </span>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            <div className="mb-3">
              <span className="text-xs font-medium text-muted-foreground">Calculo:</span>
              <div className="mt-1 space-y-1">
                {AFFINITY_ALGORITHM.example.calculation.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <OpsCode className="font-mono bg-muted/20 px-2 py-0.5 rounded text-foreground">{c.step}</OpsCode>
                    <span className="text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="p-2 rounded bg-muted/30">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Resultado:</span>
                <span className="text-sm font-bold" style={{ color: OPS_ACCENT }}>
                  {AFFINITY_ALGORITHM.example.result.score.toFixed(3)}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{AFFINITY_ALGORITHM.example.result.interpretation}</p>
            </div>
          </div>

          {/* Aggregation Methods */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
            {AFFINITY_ALGORITHM.aggregationMethods.map((m, i) => (
              <div key={i} className="p-2 rounded bg-muted/20 text-xs">
                <OpsCode className="font-bold" style={{ color: OPS_ACCENT }}>{m.method}</OpsCode>
                <p className="text-muted-foreground text-[10px] mt-1">{m.desc}</p>
                <p className="text-[10px] italic" style={{ color: OPS_PRIMARY }}>Uso: {m.useCase}</p>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Recommendation Flow */}
      <OpsCard>
        <OpsCardHeader title={RECOMMENDATION_FLOW.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-4">{RECOMMENDATION_FLOW.description}</OpsText>

          {/* Flow Steps */}
          <div className="flex flex-col md:flex-row gap-2 mb-6 overflow-x-auto pb-2">
            {RECOMMENDATION_FLOW.steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex-shrink-0 w-40 p-3 rounded-lg bg-muted/20 border" style={{ borderColor: OPS_ACCENT + '40' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: OPS_ACCENT }}>
                      {s.step}
                    </span>
                    <Icon name={s.icon} size="size-3" style={{ color: OPS_ACCENT }} />
                  </div>
                  <h5 className="text-xs font-bold mb-1">{s.title}</h5>
                  <p className="text-[9px] text-muted-foreground">{s.description}</p>
                  <OpsCode className="block text-[8px] bg-muted/20 p-1 rounded mt-1 text-muted-foreground">{s.data}</OpsCode>
                </div>
                {i < RECOMMENDATION_FLOW.steps.length - 1 && (
                  <Icon name="arrow-right" size="size-4" className="mx-1 flex-shrink-0 hidden md:block" style={{ color: OPS_PRIMARY }} />
                )}
              </div>
            ))}
          </div>

          {/* Example Output */}
          <div className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_ACCENT }}>
            <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
              Exemplo: Recomendacoes para {RECOMMENDATION_FLOW.exampleOutput.mind}
            </h4>
            <div className="space-y-2">
              {RECOMMENDATION_FLOW.exampleOutput.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded bg-muted/20">
                  <span className="text-xs font-bold w-6 text-center" style={{ color: OPS_ACCENT }}>#{i + 1}</span>
                  <div className="flex-1">
                    <span className="text-xs font-medium">{rec.tool}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">{rec.reason}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-1.5 rounded-full bg-muted/30 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${rec.score * 100}%`, backgroundColor: OPS_ACCENT }}
                      />
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: OPS_ACCENT }}>{rec.score.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Tool Stacks */}
      <OpsCard>
        <OpsCardHeader title={TOOL_STACKS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-4">{TOOL_STACKS.description}</OpsText>

          <OpsGrid columns={3}>
            {TOOL_STACKS.stacks.map((stack, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-muted/20 border-l-4 cursor-pointer transition-all hover:bg-muted/30"
                style={{ borderColor: stack.color }}
                onClick={() => setExpandedStack(expandedStack === stack.name ? null : stack.name)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={stack.icon} size="size-4" style={{ color: stack.color }} />
                  <h4 className="font-bold text-sm" style={{ color: stack.color }}>{stack.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{stack.subtitle}</p>

                <div className="text-[10px] text-muted-foreground mb-2">
                  <span className="font-medium">Perfil ideal:</span> {stack.idealProfile}
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {stack.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: stack.color + '30', color: stack.color }}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>

                {expandedStack === stack.name && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <div>
                      <span className="text-[10px] font-medium text-muted-foreground">Funcao de cada tool:</span>
                      <div className="mt-1 space-y-1">
                        {stack.tools.map((tool, j) => (
                          <div key={j} className="text-[10px]">
                            <span className="font-medium">{tool.name}:</span>
                            <span className="text-muted-foreground ml-1">{tool.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-muted-foreground">Sinergia:</span>
                      <p className="text-[10px] text-foreground mt-0.5">{stack.synergy}</p>
                    </div>
                    <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/30">
                      <span className="text-[10px] font-medium text-yellow-500">Atencao:</span>
                      <p className="text-[10px] text-yellow-400/80 mt-0.5">{stack.warning}</p>
                    </div>
                  </div>
                )}

                <div className="text-[9px] text-muted-foreground mt-2 text-right">
                  {expandedStack === stack.name ? 'Clique para fechar' : 'Clique para expandir'}
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={TOOLS_DIAGRAM} id="tools" />
        </OpsCardContent>
      </OpsCard>

      {/* Table Status */}
      <OpsCard>
        <OpsCardHeader title="Status das Tabelas" accentColor="text-muted-foreground" />
        <OpsCardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tabela</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Registros</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Descricao</th>
              </tr>
            </thead>
            <tbody>
              {TOOLS_TABLE.map((row, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
                  <td className="py-3 px-4"><OpsCode className="text-xs" style={{ color: OPS_ACCENT }}>{row.table}</OpsCode></td>
                  <td className="py-3 px-4 font-mono">{row.records}</td>
                  <td className="py-3 px-4"><StatusBadge status={row.status} /></td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
