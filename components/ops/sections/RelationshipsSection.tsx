import React from 'react';
import { cn } from '../../../lib/utils';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { OPS_ACCENT } from '../ops-tokens';
import {
  RELATIONSHIPS_EXPLANATION,
  CORRELATION_METRICS,
  STATISTICAL_GUIDE,
  RELATIONSHIP_TYPES,
  RELATIONSHIPS_SCHEMA,
  EXAMPLE_RELATIONSHIPS,
  CORRELATION_MATRIX,
  DRIVER_CLUSTERS,
  INFERENCE_USE_CASES,
  RELATIONSHIPS_DIAGRAM,
  NETWORK_DIAGRAM
} from '../data/relationships-content';
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

// =============================================================================
// Helper: Correlation color based on value
// =============================================================================
function getCorrelationColor(r: number): string {
  const absR = Math.abs(r);
  if (absR >= 0.7) return '#4ecdc4';
  if (absR >= 0.5) return '#22d3ee';
  if (absR >= 0.3) return '#feca57';
  if (absR >= 0.1) return '#fb923c';
  return '#6b7280';
}

function getCorrelationBg(r: number): string {
  if (r > 0) return 'bg-emerald-500/20';
  if (r < 0) return 'bg-red-500/20';
  return 'bg-gray-500/20';
}

// =============================================================================
// RelationshipsSection Component
// =============================================================================
export const RelationshipsSection: React.FC = () => {
  return (
    <OpsPage>
      {/* Definition */}
      <OpsCard>
        <OpsCardHeader title={RELATIONSHIPS_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="leading-relaxed md:text-base max-w-4xl mb-6">
            {RELATIONSHIPS_EXPLANATION.definition}
          </OpsText>
          <OpsGrid columns={2}>
            {RELATIONSHIPS_EXPLANATION.importance.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border/30">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm" style={{ backgroundColor: OPS_ACCENT, color: '#000' }}>
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground leading-snug pt-0.5">{item}</span>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Correlation Metrics */}
      <OpsCard>
        <OpsCardHeader title={CORRELATION_METRICS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-8 leading-relaxed max-w-4xl">{CORRELATION_METRICS.desc}</OpsText>

          <OpsGrid columns={2} className="mb-6">
            {CORRELATION_METRICS.metrics.map((metric, i) => (
              <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm" style={{ borderColor: metric.color }}>
                <div className="flex items-center gap-3 mb-3">
                  <OpsCode className="text-sm font-bold px-2 py-1 rounded" style={{ backgroundColor: `${metric.color}15`, color: metric.color }}>
                    {metric.symbol}
                  </OpsCode>
                  <span className="text-base font-medium text-foreground">{metric.metric}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{metric.desc}</p>
                <div className="flex justify-between items-end border-t border-border/30 pt-3">
                  <p className="text-xs text-muted-foreground/80 italic pr-4">{metric.interpretation}</p>
                  <div className="text-[10px] text-muted-foreground shrink-0 bg-muted/20 px-2 py-1 rounded">
                    Range: <OpsCode className="font-mono text-[10px] bg-transparent p-0">{metric.range}</OpsCode>
                  </div>
                </div>
              </div>
            ))}
          </OpsGrid>

          {/* Quality Tiers */}
          <div className="p-6 rounded-lg bg-muted/10 border border-border/40">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-muted-foreground/30 rounded-full"></span>
              Niveis de Qualidade da Evidencia
            </h5>
            <OpsGrid columns={4}>
              {CORRELATION_METRICS.qualityTiers.map((tier, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/20 text-center border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-lg font-bold mb-1" style={{ color: tier.color }}>
                    {tier.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono mb-2 px-2 py-0.5 rounded bg-muted/30 inline-block border border-white/5">
                    {tier.criteria}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight px-2">{tier.desc}</div>
                </div>
              ))}
            </OpsGrid>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Statistical Interpretation Guide */}
      <OpsCard>
        <OpsCardHeader title={STATISTICAL_GUIDE.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-8 leading-relaxed max-w-4xl">{STATISTICAL_GUIDE.desc}</OpsText>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {/* Strength Levels */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Escala de Força</h5>
              {STATISTICAL_GUIDE.strengthLevels.map((level, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 border border-transparent hover:border-border/30 transition-colors">
                  <OpsCode className="text-sm font-mono w-24 shrink-0 text-center py-1 rounded bg-muted/20" style={{ color: level.color }}>
                    {level.range}
                  </OpsCode>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-bold" style={{ color: level.color }}>{level.label}</span>
                      <OpsCode className="text-[10px] bg-muted/30 px-2 py-0.5 rounded text-muted-foreground hidden xl:block border border-white/5">
                        {level.example}
                      </OpsCode>
                    </div>
                    <span className="text-xs text-muted-foreground block truncate">{level.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direction */}
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Direcionalidade</h5>
              <div className="grid grid-cols-1 gap-4">
                {STATISTICAL_GUIDE.directionExplanation.map((dir, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: dir.color }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-muted/20 text-lg font-bold" style={{ color: dir.color }}>
                        {dir.symbol}
                      </div>
                      <span className="text-base font-medium text-foreground capitalize">{dir.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug mb-3">{dir.desc}</p>
                    <OpsCode className="text-xs bg-muted/30 px-2 py-1 rounded text-muted-foreground inline-block border border-white/5">
                      Ex: {dir.example}
                    </OpsCode>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Caveats */}
          <div className="p-5 rounded-lg bg-[#C9B298]/10 border border-[#C9B298]/20">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#C9B298] mb-3 flex items-center gap-2">
              <span className="text-lg">!</span>
              Cuidados na Interpretacao
            </h5>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {STATISTICAL_GUIDE.caveats.map((caveat, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-3 bg-muted/10 p-2 rounded">
                  <span className="text-[#C9B298] mt-0.5">•</span>
                  {caveat}
                </li>
              ))}
            </ul>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Relationship Types */}
      <OpsCard>
        <OpsCardHeader title={RELATIONSHIP_TYPES.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6 leading-relaxed max-w-4xl">{RELATIONSHIP_TYPES.desc}</OpsText>

          <OpsGrid columns={3}>
            {RELATIONSHIP_TYPES.types.map((type, i) => (
              <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 flex flex-col h-full shadow-sm" style={{ borderColor: type.color }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" style={{ color: type.color }}>{type.symbol}</span>
                  <span className="text-base font-bold" style={{ color: type.color }}>{type.label}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{type.desc}</p>
                <div className="mt-auto space-y-2">
                  <OpsCode className="text-xs bg-muted/30 px-2 py-1.5 rounded text-muted-foreground block border border-white/5 truncate" title={type.example}>
                    {type.example}
                  </OpsCode>
                  <p className="text-[10px] text-muted-foreground/70 italic px-1 pt-1 border-t border-border/30">
                    {type.useCase}
                  </p>
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Correlation Matrix Visualization */}
      <OpsCard>
        <OpsCardHeader title={CORRELATION_MATRIX.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6 leading-relaxed">{CORRELATION_MATRIX.desc}</OpsText>
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-sm border-separate border-spacing-1">
              <thead>
                <tr>
                  <th className="p-3"></th>
                  {CORRELATION_MATRIX.drivers.map((d, i) => (
                    <th key={i} className="p-2 text-center min-w-[80px]">
                      <div className="font-bold text-base" style={{ color: OPS_ACCENT }}>{d.abbrev}</div>
                      <div className="text-[10px] text-muted-foreground font-normal mt-1">{d.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CORRELATION_MATRIX.drivers.map((rowDriver, i) => (
                  <tr key={i}>
                    <td className="p-3 text-right sticky left-0 bg-card z-10">
                      <div className="font-bold whitespace-nowrap" style={{ color: OPS_ACCENT }}>{rowDriver.abbrev}</div>
                      <div className="text-[10px] text-muted-foreground ml-1 hidden sm:block">{rowDriver.name}</div>
                    </td>
                    {CORRELATION_MATRIX.matrix[i].map((r, j) => (
                      <td key={j} className="p-1 text-center">
                        <div
                          className={cn(
                            "h-10 flex items-center justify-center rounded font-mono text-xs transition-transform hover:scale-105 cursor-default",
                            i === j ? 'bg-muted/30 border border-white/5' : `${getCorrelationBg(r)} border border-transparent`
                          )}
                          style={{
                            color: i === j ? '#6b7280' : getCorrelationColor(r),
                            opacity: i === j ? 0.5 : 1
                          }}
                          title={`${rowDriver.name} x ${CORRELATION_MATRIX.drivers[j].name}: ${r.toFixed(2)}`}
                        >
                          {r === 1 ? '·' : r.toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-[10px] text-muted-foreground/70 px-4 py-2 bg-muted/20 rounded-full italic">
              Diagonal = 1.0 (auto-correlacao) • Verde = positiva • Vermelho = negativa • Cinza = neutra/baixa
            </p>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Example Relationships */}
      <OpsCard>
        <OpsCardHeader title={EXAMPLE_RELATIONSHIPS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6 leading-relaxed">{EXAMPLE_RELATIONSHIPS.desc}</OpsText>
          <div className="space-y-4">
            {EXAMPLE_RELATIONSHIPS.examples.map((ex, i) => (
              <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm hover:bg-muted/30 transition-colors" style={{ borderColor: getCorrelationColor(ex.r) }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <OpsCode className="text-sm font-bold bg-muted/20 px-2 py-1 rounded" style={{ color: OPS_ACCENT }}>{ex.driverA}</OpsCode>
                    <div className="flex flex-col items-center">
                      <span className={cn("text-base font-mono font-bold", ex.r > 0 ? 'text-emerald-400' : 'text-red-400')}>
                        {ex.r > 0 ? '+' : ''}{ex.r.toFixed(2)}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{ex.type}</span>
                    </div>
                    <OpsCode className="text-sm font-bold bg-muted/20 px-2 py-1 rounded" style={{ color: OPS_ACCENT }}>{ex.driverB}</OpsCode>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                    <span className="bg-muted/30 px-2 py-1 rounded text-muted-foreground border border-white/5">
                      k={ex.k}
                    </span>
                    <span className="bg-muted/30 px-2 py-1 rounded text-muted-foreground border border-white/5">
                      N={ex.n.toLocaleString()}
                    </span>
                    <span className="bg-muted/30 px-2 py-1 rounded text-muted-foreground border border-white/5">
                      CI [{ex.ci[0]}, {ex.ci[1]}]
                    </span>
                    <span className="px-2 py-1 rounded border" style={{
                      backgroundColor: ex.qualityTier === 'gold' ? '#CD7F3220' : '#c0c0c020', // Fixing gold logic to use brownish gold bg
                      borderColor: ex.qualityTier === 'gold' ? '#C9B298' : '#c0c0c0',
                      color: ex.qualityTier === 'gold' ? '#C9B298' : '#c0c0c0'
                    }}>
                      {ex.qualityTier.toUpperCase()}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3 mt-1">{ex.interpretation}</p>

                <div className="mt-3 flex justify-end">
                  <a
                    href={`https://doi.org/${ex.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    DOI: {ex.doi} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Driver Clusters / Network */}
      <OpsCard>
        <OpsCardHeader title={DRIVER_CLUSTERS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6 leading-relaxed max-w-4xl">{DRIVER_CLUSTERS.desc}</OpsText>

          {/* Network Diagram */}
          <div className="mb-8 p-4 rounded-xl bg-muted/20 border border-white/5">
            <MermaidDiagram chart={NETWORK_DIAGRAM} id="driver-network" />
          </div>

          {/* Cluster Cards */}
          <OpsGrid columns={3} className="mb-8">
            {DRIVER_CLUSTERS.clusters.map((cluster, i) => (
              <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm" style={{ borderColor: cluster.color }}>
                <h4 className="font-bold text-base mb-2 flex items-center gap-2" style={{ color: cluster.color }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cluster.color }}></span>
                  {cluster.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed h-10 overflow-hidden">{cluster.description}</p>
                <div className="space-y-1.5 bg-muted/10 p-3 rounded-lg">
                  {cluster.drivers.map((driver, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <code
                        className={cn(
                          "text-xs px-2 py-0.5 rounded transition-all",
                          driver.slug === cluster.coreDriver ? 'font-bold pl-2' : 'text-muted-foreground'
                        )}
                        style={driver.slug === cluster.coreDriver ? {
                          backgroundColor: `${cluster.color}20`,
                          color: cluster.color,
                          borderLeft: `2px solid ${cluster.color}`
                        } : {}}
                      >
                        {driver.slug}
                      </code>
                      {driver.r && (
                        <span className="text-[10px] font-mono text-muted-foreground/70">r={driver.r.toFixed(2)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </OpsGrid>

          {/* Inter-cluster relations */}
          <div className="mt-8 p-6 rounded-lg bg-muted/10 border border-border/40">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Relacoes Inter-Cluster Principais</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {DRIVER_CLUSTERS.interClusterRelations.map((rel, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors border-b border-border/20 last:border-0 md:border-b-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground font-medium">{rel.from}</span>
                    <span className="text-muted-foreground/30">↔</span>
                    <span className="text-muted-foreground font-medium">{rel.to}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("font-mono font-bold text-sm", rel.r > 0 ? 'text-emerald-400' : 'text-red-400')}>
                      {rel.r > 0 ? '+' : ''}{rel.r.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 italic text-right w-24 hidden sm:block truncate">{rel.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Inference Use Cases */}
      <OpsCard>
        <OpsCardHeader title={INFERENCE_USE_CASES.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-8 leading-relaxed max-w-4xl">{INFERENCE_USE_CASES.desc}</OpsText>

          {/* Use Cases */}
          <OpsGrid columns={2} className="mb-6">
            {INFERENCE_USE_CASES.useCases.map((useCase, i) => (
              <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm" style={{ borderColor: OPS_ACCENT }}>
                <h4 className="font-bold text-base mb-2" style={{ color: OPS_ACCENT }}>{useCase.name}</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[40px]">{useCase.desc}</p>

                <div className="p-3 rounded bg-muted/30 mb-4 border border-white/5">
                  <p className="text-xs text-muted-foreground/90 italic flex gap-2">
                    <span className="not-italic opacity-50">Ex:</span>
                    {useCase.example}
                  </p>
                </div>

                <div className="bg-muted/30 p-2 rounded mb-4 overflow-x-auto text-center">
                  <code className="text-xs font-mono text-emerald-400">
                    {useCase.formula}
                  </code>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-2 border-t border-border/30">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Peso:</span>
                  <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${useCase.weight * 100}%`, backgroundColor: OPS_ACCENT }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: OPS_ACCENT }}>{useCase.weight}</span>
                </div>
              </div>
            ))}
          </OpsGrid>

          {/* Confidence Adjustments */}
          <div className="p-6 rounded-lg bg-muted/10 border border-border/40">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Ajustes de Confianca por Fonte
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {INFERENCE_USE_CASES.confidenceAdjustments.map((adj, i) => (
                <div key={i} className="flex items-center gap-4 p-2 rounded hover:bg-white/5 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{adj.source}</span>
                      <span className="text-xs font-mono font-bold" style={{ color: getCorrelationColor(adj.baseConfidence) }}>
                        {adj.baseConfidence}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${adj.baseConfidence * 100}%`,
                          backgroundColor: getCorrelationColor(adj.baseConfidence)
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground block truncate">{adj.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Table Schema */}
      <OpsCard>
        <OpsCardHeader title={RELATIONSHIPS_SCHEMA.title} accentColor="text-muted-foreground" />
        <OpsCardContent className="p-0">
          <OpsText className="px-6 pt-6 pb-4 max-w-4xl leading-relaxed">{RELATIONSHIPS_SCHEMA.desc}</OpsText>

          {/* Columns Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-muted/20">
                  <th className="text-left py-3 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Coluna</th>
                  <th className="text-left py-3 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Tipo</th>
                  <th className="text-left py-3 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Descricao</th>
                </tr>
              </thead>
              <tbody>
                {RELATIONSHIPS_SCHEMA.columns.map((col, i) => (
                  <tr key={i} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-6 font-mono text-xs">
                      <span style={{ color: col.pk ? '#C9B298' : OPS_ACCENT, fontWeight: col.pk ? 'bold' : 'normal' }}>
                        {col.pk && '* '}{col.name}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <OpsCode className="text-xs text-muted-foreground bg-muted/20 px-1.5 py-0.5 rounded border border-white/5">{col.type}</OpsCode>
                    </td>
                    <td className="py-3 px-6 text-muted-foreground text-xs hidden md:table-cell leading-snug max-w-md">{col.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Constraints & Indexes Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-t border-border/30 bg-muted/5">
            {/* Constraints */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Constraints</h5>
              <div className="flex flex-wrap gap-2">
                {RELATIONSHIPS_SCHEMA.constraints.map((c, i) => (
                  <div key={i} className="text-[10px] bg-muted/20 px-3 py-1.5 rounded border border-white/5 flex items-center gap-2">
                    <span className="text-[#C9B298] font-bold">{c.type}:</span>
                    <OpsCode className="text-muted-foreground">{c.target}</OpsCode>
                  </div>
                ))}
              </div>
            </div>

            {/* Indexes */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Indexes</h5>
              <div className="space-y-2">
                {RELATIONSHIPS_SCHEMA.indexes.map((idx, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[10px] bg-muted/20 px-3 py-1.5 rounded border border-white/5">
                    <div className="flex items-center gap-2">
                      <code className="text-cyan-400 font-bold">{idx.name}</code>
                      <span className="text-muted-foreground text-[9px] uppercase">on</span>
                      <code className="text-muted-foreground bg-muted/20 px-1 rounded">{idx.columns}</code>
                    </div>
                    <span className="text-muted-foreground/50 hidden sm:inline">|</span>
                    <span className="text-muted-foreground/70 italic">{idx.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title={`${RELATIONSHIPS_SCHEMA.title} - Diagrama`} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={RELATIONSHIPS_DIAGRAM} id="relationships-er" />
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
