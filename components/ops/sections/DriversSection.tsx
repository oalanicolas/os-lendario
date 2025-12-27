import React from 'react';
import { cn } from '../../../lib/utils';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { StatusBadge } from '../components/StatusBadge';
import { DRIVER_DIAGRAM } from '../data/diagrams';
import { DRIVER_TABLE } from '../data/tables';
import {
  DRIVER_EXPLANATION,
  DRIVER_INFERENCE,
  DRIVER_DOMAINS,
  DRIVER_INDICATORS,
  DRIVER_NETWORK
} from '../data/driver-content';
import { OPS_ACCENT } from '../ops-tokens';
import { Icon } from '../../ui/icon';
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

export const DriversSection: React.FC = () => {
  return (
    <OpsPage>
      {/* Definition */}
      <OpsCard>
        <OpsCardHeader title={DRIVER_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground max-w-4xl">{DRIVER_EXPLANATION.definition}</OpsText>
        </OpsCardContent>
      </OpsCard>

      {/* Types */}
      <OpsCard>
        <OpsCardHeader title="Tipos de Driver" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={3}>
            {DRIVER_EXPLANATION.types.map((t, i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/5 border-l-4 hover:bg-muted/10 transition-colors" style={{ borderColor: t.color }}>
                <h4 className="font-bold text-base mb-2 flex items-center gap-2" style={{ color: t.color }}>
                  {t.type}
                </h4>
                <OpsText className="text-sm mb-4">{t.desc}</OpsText>
                <div className="flex flex-wrap gap-2">
                  {t.examples.slice(0, 6).map((ex, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-mono px-2 py-1 rounded border opacity-90"
                      style={{
                        backgroundColor: `${t.color}10`,
                        color: t.color,
                        borderColor: `${t.color}20`
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                  {t.examples.length > 6 && (
                    <span className="text-[10px] px-2 py-1 text-muted-foreground">+ {t.examples.length - 6}</span>
                  )}
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Inference Process */}
      <OpsCard>
        <OpsCardHeader title={DRIVER_INFERENCE.title} />
        <OpsCardContent>
          <OpsText className="mb-8 max-w-4xl">{DRIVER_INFERENCE.overview}</OpsText>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Logic / Formula */}
            <OpsSection>
              <OpsLabel className="mb-4">Formula de Forca do Driver</OpsLabel>
              <div className="p-6 rounded-xl bg-muted/10 border border-border/20 font-mono text-sm leading-loose">
                <div className="text-muted-foreground mb-4 opacity-70">
                   // Calculo de confianca e intensidade
                </div>
                <span style={{ color: OPS_ACCENT }}>driver_strength</span> = f(
                <span className="text-emerald-500">miu_count</span>,
                <span className="text-blue-400">pattern_match</span>,
                <span className="text-purple-400">linguistic_intensity</span>
                )
              </div>

              <div className="space-y-4 shadow-sm animate-in fade-in duration-300">
                {DRIVER_INFERENCE.formula.components.map((comp, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/10">
                    <div className="flex items-center gap-3">
                      <code className={cn("text-xs font-bold px-2 py-1 rounded", i === 0 ? 'bg-emerald-500/10 text-emerald-500' : i === 1 ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400')}>{comp.var}</code>
                      <span className="text-xs text-muted-foreground">{comp.desc}</span>
                    </div>
                    <span className={cn("text-xs font-mono font-bold", i === 0 ? 'text-emerald-500' : i === 1 ? 'text-blue-400' : 'text-purple-400')}>peso: {comp.weight}</span>
                  </div>
                ))}
              </div>
            </OpsSection>

            {/* Steps Visualization */}
            <OpsSection>
              <OpsLabel className="mb-4">Acumulacao de Evidencias</OpsLabel>
              <div className="space-y-4 relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border/40 -z-10" />
                {DRIVER_INFERENCE.evidenceAccumulation.process.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-background border border-border shadow-sm flex-shrink-0 z-10" style={{ color: OPS_ACCENT }}>
                      {step.step}
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-muted/5 border border-border/10 hover:border-border/30 transition-all">
                      <h5 className="font-bold text-sm mb-2 text-foreground">{step.action}</h5>
                      <OpsCode className="text-xs text-muted-foreground bg-muted/10 px-2 py-1 rounded block w-fit border border-border/5">
                        {step.example}
                      </OpsCode>
                    </div>
                  </div>
                ))}
              </div>
            </OpsSection>
          </div>

          {/* Confidence Scoring */}
          <OpsSection className="mt-10">
            <OpsLabel className="mb-4">{DRIVER_INFERENCE.confidenceScoring.title}</OpsLabel>
            <OpsText className="mb-6 max-w-3xl">{DRIVER_INFERENCE.confidenceScoring.desc}</OpsText>
            <OpsGrid columns={4}>
              {DRIVER_INFERENCE.confidenceScoring.levels.map((level, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/5 text-center border border-border/10 hover:border-border/30 transition-colors">
                  <div className="font-bold text-sm mb-1" style={{ color: level.color }}>{level.level}</div>
                  <div className="text-[10px] text-muted-foreground mb-2">{level.range}</div>
                  <OpsCode className="font-bold px-2 py-1 rounded bg-muted/30 inline-block" style={{ color: level.color }}>{level.confidence}</OpsCode>
                </div>
              ))}
            </OpsGrid>
          </OpsSection>
        </OpsCardContent>
      </OpsCard>

      {/* Domains & Indicators Grid */}
      <OpsGrid columns={2}>
        {/* Left: Domains */}
        <OpsCard className="h-full">
          <OpsCardHeader title={DRIVER_DOMAINS.title} />
          <OpsCardContent>
            <OpsText className="mb-6">{DRIVER_DOMAINS.desc}</OpsText>
            <div className="space-y-4">
              {DRIVER_DOMAINS.domains.map((domain, i) => (
                <div key={i} className="group p-4 rounded-xl bg-muted/5 border border-border/10 hover:border-border/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/10 flex items-center justify-center">
                        {/* Fallback component icon as no specific icons in data */}
                        <Icon name="component" size="size-4" style={{ color: domain.color }} />
                      </div>
                      <h4 className="font-bold text-sm" style={{ color: domain.color }}>{domain.name}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/10 px-2 py-1 rounded">{domain.examples.length} exemplos</span>
                  </div>
                  <OpsText className="text-xs mb-3 pl-11">{domain.desc}</OpsText>

                  {/* Visual Bar */}
                  <div className="h-1.5 w-full bg-muted/10 rounded-full overflow-hidden pl-11 ml-11 w-[calc(100%-2.75rem)]">
                    <div className="h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30" style={{ backgroundColor: domain.color, width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          </OpsCardContent>
        </OpsCard>

        {/* Right: Indicators */}
        <OpsCard className="h-full">
          <OpsCardHeader title={DRIVER_INDICATORS.title} />
          <OpsCardContent>
            <OpsText className="mb-6">{DRIVER_INDICATORS.desc}</OpsText>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {DRIVER_INDICATORS.patterns.map((pattern, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/5 border border-border/10 hover:border-border/30 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{pattern.domain}</span>
                    <Icon name="arrow-right" size="size-3" className="opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <OpsCode className="text-foreground">{pattern.pattern}</OpsCode>
                    <Icon name="arrow-right" size="size-3" className="text-muted-foreground/50" />
                    <span className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{pattern.drivers[0]}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic pl-2 border-l-2 border-border/20">
                    "{pattern.interpretation}"
                  </p>
                </div>
              ))}
            </div>
          </OpsCardContent>
        </OpsCard>
      </OpsGrid>

      {/* Network / Graph */}
      <OpsCard>
        <OpsCardHeader title="Grafo de Relacionamentos (Mermaid)" />
        <OpsCardContent>
          <div className="p-4 rounded-xl bg-background/50 border border-border/10">
            <MermaidDiagram chart={DRIVER_DIAGRAM} id="drivers" />
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Network Clusters (Replaces Stats) */}
      <OpsCard>
        <OpsCardHeader title={DRIVER_NETWORK.title} />
        <OpsCardContent>
          <OpsText className="mb-6">{DRIVER_NETWORK.desc}</OpsText>
          <OpsGrid columns={3}>
            {DRIVER_NETWORK.clusters.map((cluster, i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/5 border-l-4" style={{ borderColor: cluster.color }}>
                <div className="text-lg font-bold mb-1" style={{ color: cluster.color }}>{cluster.name}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Core: {cluster.core}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{cluster.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {cluster.drivers.slice(0, 3).map((d, j) => (
                    <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-background/50 border border-border/10 text-muted-foreground">{d}</span>
                  ))}
                  {cluster.drivers.length > 3 && (
                    <span className="text-[9px] px-1.5 py-0.5 text-muted-foreground">+{cluster.drivers.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Drivers Table Status */}
      <OpsCard>
        <OpsCardHeader title="Tabelas do Sistema de Drivers" />
        <OpsCardContent>
          <div className="overflow-x-auto rounded-lg border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-muted/20">
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tabela</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Registros</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Descricao</th>
                </tr>
              </thead>
              <tbody>
                {DRIVER_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4"><OpsCode style={{ color: OPS_ACCENT }}>{row.table}</OpsCode></td>
                    <td className="py-3 px-4 font-mono font-bold text-foreground">{row.records}</td>
                    <td className="py-3 px-4"><StatusBadge status={row.status} /></td>
                    <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell leading-relaxed">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
