import React from 'react';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { StatusBadge } from '../components/StatusBadge';
import { MAPPING_DIAGRAM } from '../data/diagrams';
import { MAPPING_TABLE } from '../data/tables';
import { SchemaBrowser } from '../components/SchemaBrowser';
import { XRayView } from '../components/XRayView';
import { MAPPING_EXPLANATION } from '../data/mapping-content';
import { OPS_ACCENT } from '../ops-tokens';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsLabel,
  OpsCode,
  OpsBadge,
  OpsProgressBar,
  OpsSection
} from '../ops-ui';

// Helper to render star ratings
const StarRating: React.FC<{ value: number; max?: number }> = ({ value, max = 5 }) => (
  <div className="flex gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className={cn('text-xs', i < value ? 'text-amber-400' : 'text-muted-foreground/30')}>
        <Icon
          name="star"
          size="size-3"
          className={cn(i < value ? 'text-amber-400' : 'text-muted-foreground/30')}
        />
      </span>
    ))}
  </div>
);

// Helper to render a progress bar
const ProgressBar: React.FC<{ value: number; max?: number; color?: string; label?: string }> = ({
  value,
  max = 100,
  color = OPS_ACCENT,
  label
}) => (
  <div className="flex items-center gap-3">
    <div className="flex-1 h-2.5 bg-muted/30 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
    {label && <span className="text-xs text-muted-foreground w-12 text-right font-mono">{label}</span>}
  </div>
);

export const MappingSection: React.FC = () => {
  const { systems, componentDriverMap, scoring, comparison, visualExample } = MAPPING_EXPLANATION;

  return (
    <OpsPage>
      {/* Definition */}
      <OpsCard>
        <OpsCardHeader title={MAPPING_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="leading-relaxed md:text-base max-w-4xl">{MAPPING_EXPLANATION.definition}</OpsText>
        </OpsCardContent>
      </OpsCard>

      {/* Systems Overview */}
      <OpsCard>
        <OpsCardHeader title="Sistemas Psicometricos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={2}>
            {systems.map((sys, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-muted/20 border-l-4 space-y-4 shadow-sm"
                style={{ borderColor: sys.color }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-muted/20">
                      <Icon name={sys.icon} size="size-5" style={{ color: sys.color }} />
                    </div>
                    <h4 className="font-bold text-base" style={{ color: sys.color }}>{sys.name}</h4>
                  </div>
                  <span className={cn(
                    'text-[10px] px-2.5 py-1 rounded-full border border-transparent font-medium uppercase tracking-wide',
                    sys.scientificValidity === 'alta' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                    sys.scientificValidity === 'media' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                    sys.scientificValidity === 'baixa' && 'bg-red-500/10 text-red-400 border-red-500/20'
                  )}>
                    Validade: {sys.scientificValidity}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{sys.desc}</p>

                <div className="flex items-center gap-6 text-xs text-muted-foreground bg-muted/10 p-2 rounded">
                  <span><strong className="text-foreground">{sys.dimensions}</strong> dimensoes</span>
                  <span className="w-px h-3 bg-white/10"></span>
                  <span>{sys.granularity}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {sys.components.slice(0, 8).map((comp, j) => (
                    <OpsCode
                      key={j}
                      className="text-[10px] bg-muted/20 px-2 py-1 rounded border border-white/5"
                      style={{ color: sys.color }}
                    >
                      {comp}
                    </OpsCode>
                  ))}
                  {sys.components.length > 8 && (
                    <span className="text-[10px] text-muted-foreground self-center px-1">+{sys.components.length - 8}</span>
                  )}
                </div>

                <div className="text-xs pt-2 border-t border-border/20 flex justify-between items-center">
                  <span className="text-muted-foreground">Driver overlap</span>
                  <span className="text-foreground font-mono font-bold" style={{ color: sys.color }}>{sys.driverOverlap}</span>
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Component Driver Map */}
      <OpsCard>
        <OpsCardHeader title={componentDriverMap.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="text-sm text-muted-foreground leading-relaxed max-w-4xl mb-6">{componentDriverMap.desc}</OpsText>

          {/* Relevance Types Legend */}
          <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-muted/10 border border-border/20 mb-4">
            {componentDriverMap.relevanceTypes.map((rel, i) => (
              <div key={i} className="flex items-center gap-3 bg-muted/20 px-3 py-1.5 rounded-full">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: rel.color, boxShadow: `0 0 8px ${rel.color}` }}
                />
                <span className="text-xs">
                  <strong style={{ color: rel.color }}>{rel.type}</strong>
                  <span className="text-muted-foreground ml-1.5 hidden sm:inline border-l border-white/10 pl-1.5 max-w-md">{rel.desc}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Driver Mapping Examples */}
          <div className="space-y-4">
            {componentDriverMap.examples.map((ex, i) => (
              <div key={i} className="p-5 rounded-lg bg-muted/20 border border-transparent hover:border-border/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></div>
                  <OpsCode className="text-sm font-bold bg-muted/20 px-2 py-1 rounded" style={{ color: OPS_ACCENT }}>{ex.driver}</OpsCode>
                  <span className="text-[10px] px-2 py-1 rounded bg-muted text-muted-foreground uppercase tracking-wider font-medium">{ex.driverType}</span>
                </div>
                <OpsGrid columns={3} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ex.mappings.map((map, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between p-3 rounded-md bg-muted/20 border-l-4 transition-all hover:translate-x-1"
                      style={{
                        borderColor: componentDriverMap.relevanceTypes.find(r => r.type === map.relevance)?.color
                      }}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider block mb-0.5">{map.system}</span>
                        <span className="text-sm text-foreground truncate block font-medium">{map.component}</span>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          'text-xs font-mono font-bold bg-muted/30 px-1.5 py-0.5 rounded',
                          map.weight > 0 ? 'text-emerald-400' : 'text-red-400'
                        )}>
                          {map.weight > 0 ? '+' : ''}{map.weight.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </OpsGrid>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Scoring Algorithm */}
      <OpsCard>
        <OpsCardHeader title={scoring.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="text-sm text-muted-foreground leading-relaxed max-w-4xl mb-6">{scoring.desc}</OpsText>

          <div className="space-y-6 relative">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-muted/20"></div>
            {scoring.steps.map((step, i) => (
              <div
                key={i}
                className="relative pl-10"
              >
                <div
                  className="absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-card"
                  style={{ backgroundColor: OPS_ACCENT, color: '#000' }}
                >
                  {step.step}
                </div>
                <div className="space-y-3 bg-muted/10 p-4 rounded-lg border border-border/20">
                  <h4 className="font-bold text-base" style={{ color: OPS_ACCENT }}>{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

                  {step.formula && (
                    <div className="p-3 rounded bg-muted/30 font-mono text-xs overflow-x-auto border-l-2" style={{ borderColor: OPS_ACCENT, color: '#e5e7eb' }}>
                      {step.formula}
                    </div>
                  )}

                  {step.example && (
                    <div className="text-xs text-muted-foreground/80 italic pl-2 border-l-2 border-muted">
                      Ex: <code className="text-foreground not-italic">{step.example}</code>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* System Comparison Table */}
      <OpsCard>
        <OpsCardHeader title={comparison.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-4xl">{comparison.desc}</OpsText>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead>
                <tr>
                  {comparison.headers.map((h, i) => (
                    <th key={i} className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap bg-muted/20 first:rounded-l last:rounded-r">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                {comparison.systems.map((sys, i) => {
                  const systemData = systems.find(s => s.shortName === sys.system || s.name.includes(sys.system));
                  const color = systemData?.color || OPS_ACCENT;

                  return (
                    <tr key={i} className="hover:bg-muted/10 transition-colors group">
                      <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 rounded-l border-y border-l border-white/5">
                        <span className="font-bold flex items-center gap-2" style={{ color }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                          {sys.system}
                        </span>
                      </td>
                      <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                        <StarRating value={sys.scientificValidity} />
                      </td>
                      <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                        <StarRating value={sys.practicalUtility} />
                      </td>
                      <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                        <span className={cn(
                          'text-[10px] px-2.5 py-1 rounded-full border',
                          sys.granularity === 'facetas' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                          sys.granularity === 'dimensoes' && 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                          sys.granularity === 'tipos' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                          sys.granularity === 'partes' && 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        )}>
                          {sys.granularity}
                        </span>
                      </td>
                      <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                        <span className={cn(
                          'text-xs font-medium',
                          sys.replicability === 'alta' && 'text-emerald-400',
                          sys.replicability === 'media' && 'text-amber-400',
                          sys.replicability === 'baixa' && 'text-red-400'
                        )}>
                          {sys.replicability}
                        </span>
                      </td>
                      <td className="py-4 px-4 min-w-[140px] bg-muted/10 group-hover:bg-muted/20 rounded-r border-y border-r border-white/5">
                        <ProgressBar value={sys.driverCoverage} color={color} label={`${sys.driverCoverage}%`} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Visual Example */}
      <OpsCard>
        <OpsCardHeader title={visualExample.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="text-sm text-muted-foreground leading-relaxed max-w-4xl mb-6">{visualExample.desc}</OpsText>

          {/* Mind Name */}
          <div className="p-4 rounded-lg bg-muted/20 flex items-center gap-4 w-fit border border-border/20 mb-6">
            <div className="p-2 bg-muted/20 rounded-full">
              <Icon name="user" size="size-5" style={{ color: OPS_ACCENT }} />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Exemplo</div>
              <span className="font-mono text-base font-bold" style={{ color: OPS_ACCENT }}>{visualExample.mindName}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Input Drivers */}
            <div className="flex-1 space-y-4">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Icon name="arrow-right" size="size-3" />
                Drivers de Entrada (Input)
              </h5>
              <div className="grid grid-cols-1 gap-3">
                {visualExample.drivers.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/10 hover:border-border/40 hover:bg-background/60 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <OpsCode className="text-xs font-bold" style={{ color: OPS_ACCENT }}>{d.driver}</OpsCode>
                      <OpsBadge variant="outline" className="text-[9px] px-1.5 py-0.5 rounded opacity-70">{d.type}</OpsBadge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end w-24">
                        <OpsProgressBar
                          value={d.score * 10}
                          max={10}
                          color="#10b981"
                          showValue={false}
                          className="h-1.5"
                        />
                        <span className="text-[10px] font-mono text-emerald-600 font-bold mt-1">+{d.score.toFixed(2)}</span>
                      </div>
                      <OpsBadge variant="default" className="text-[10px] w-12 text-center bg-muted/30">
                        {Math.round(d.confidence * 100)}%
                      </OpsBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow & Processing */}
            <div className="flex lg:flex-col justify-center items-center py-2 gap-2 text-muted-foreground/30">
              <div className="h-full w-px bg-current hidden lg:block"></div>
              <Icon name="arrow-right" size="size-6" className="transform rotate-90 lg:rotate-0 text-muted-foreground/50" />
              <div className="h-full w-px bg-current hidden lg:block"></div>
            </div>

            {/* Results Grid */}
            <div className="flex-[1.5] space-y-4">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Icon name="check-circle" size="size-3" />
                Resultados Mapeados (Output)
              </h5>
              <OpsGrid columns={2} className="md:grid-cols-2 lg:grid-cols-2 gap-4">
                {/* Big Five Result */}
                <div className="p-5 rounded-lg bg-muted/20 border-t-4 shadow-sm" style={{ borderColor: '#10b981' }}>
                  <h5 className="text-xs font-bold uppercase mb-4 flex justify-between items-center" style={{ color: '#10b981' }}>
                    Big Five (OCEAN)
                    <Icon name="chart-pie" size="size-3" />
                  </h5>
                  <div className="space-y-4">
                    {Object.entries(visualExample.bigFiveResult).map(([key, val]) => (
                      <OpsProgressBar
                        key={key}
                        label={`${key} - ${val.label}`}
                        value={val.score}
                        max={1}
                        color="#10b981"
                        className="h-1.5"
                      />
                    ))}
                  </div>
                </div>

                {/* MBTI Result */}
                <div className="p-5 rounded-lg bg-background/40 border border-border/10 border-t-4 shadow-sm" style={{ borderTopColor: '#f59e0b' }}>
                  <h5 className="text-xs font-bold uppercase mb-2 flex justify-between items-center" style={{ color: '#d97706' }}>
                    MBTI
                    <Icon name="users" size="size-3" />
                  </h5>
                  <div className="text-center mb-4 py-2 bg-amber-500/5 rounded border border-amber-500/10">
                    <span className="text-3xl font-bold tracking-widest" style={{ color: '#d97706' }}>{visualExample.mbtiResult.type}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">Confidence: {Math.round(visualExample.mbtiResult.confidence * 100)}%</p>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(visualExample.mbtiResult.breakdown).map(([key, val]) => (
                      <OpsProgressBar
                        key={key}
                        label={key}
                        value={val * 100}
                        color="#f59e0b"
                        className="h-1.5"
                      />
                    ))}
                  </div>
                </div>

                {/* Enneagram Result */}
                <div className="p-5 rounded-lg bg-background/40 border border-border/10 border-t-4 shadow-sm md:col-span-2 lg:col-span-2" style={{ borderTopColor: '#ec4899' }}>
                  <h5 className="text-xs font-bold uppercase mb-4 flex justify-between items-center" style={{ color: '#be185d' }}>
                    Enneagram
                    <Icon name="star" size="size-3" />
                  </h5>
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold" style={{ color: '#be185d' }}>{visualExample.enneagramResult.primaryType}</span>
                        <span className="text-xl text-muted-foreground lowercase">w</span>
                        <span className="text-2xl font-bold text-muted-foreground">{visualExample.enneagramResult.wing}</span>
                      </div>
                      <OpsBadge variant="outline" className="mt-1 bg-pink-500/5 text-pink-600 border-pink-500/10">
                        Confidence: {Math.round(visualExample.enneagramResult.confidence * 100)}%
                      </OpsBadge>
                    </div>
                    <div className="text-center sm:text-left max-w-xs">
                      <p className="text-sm font-bold text-foreground">{visualExample.enneagramResult.label}</p>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        Caracterizado por um forte desejo de ser util e competente, buscando validacao externa e evitando o fracasso.
                      </p>
                    </div>
                  </div>
                </div>
              </OpsGrid>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title={`${MAPPING_EXPLANATION.title} - Diagrama`} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={MAPPING_DIAGRAM} id="mapping" />
        </OpsCardContent>
      </OpsCard>


      {/* X-Ray Section */}
      <OpsSection>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap px-4">Deep Record Inspection (X-Ray)</span>
          <div className="flex-1 h-px bg-border/40" />
        </div>
        <XRayView />
      </OpsSection>

      {/* Dynamic Schema Browser */}
      <OpsCard>
        <OpsCardHeader title="Explorador de Esquema (Schema Browser)" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="text-sm text-muted-foreground mb-4">
            Visualizacao em tempo real da estrutura do banco de dados, extraida diretamente do
            <OpsCode className="mx-1">information_schema</OpsCode>.
          </OpsText>
          <SchemaBrowser />
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
