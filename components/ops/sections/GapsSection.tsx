import React from 'react';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { GAPS_DIAGRAM } from '../data/diagrams';
import {
  GAPS_TABLE,
  GAP_IMPACTS,
  RESOLUTION_ROADMAP,
  QUICK_WINS,
  PROPOSED_TABLES,
} from '../data/tables';
import { OPS_ACCENT } from '../ops-tokens';
import type { OpsStats } from '../../../hooks/useOpsStats';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode,
  OpsBadge,
  OpsProgressBar,
  OpsLabel,
  OpsSection
} from '../ops-ui';

interface GapsSectionProps {
  stats?: OpsStats;
  loading?: boolean;
}

// =============================================================================
// DEPENDENCY CHAIN DIAGRAM
// =============================================================================

const DEPENDENCY_CHAIN_DIAGRAM = `
flowchart LR
    subgraph INICIO[DISPONIVEL]
        C[(contents)]
        D[(drivers)]
        T[(tools)]
    end

    subgraph GAP1[GAP CRITICO 1]
        M[(mius = 0)]
    end

    subgraph GAP2[GAP CRITICO 2]
        MD[(mind_drivers = 0)]
    end

    subgraph GAP3[GAP CRITICO 3]
        TDA[(tool_driver_affinities = 0)]
    end

    subgraph GAP4[GAP CRITICO 4]
        MCS[(mind_component_scores = 0)]
    end

    subgraph FIM[RESULTADO FINAL]
        RECO[/Recomendacoes/]
        FIT[/Fit Score/]
        PROF[/Perfil Completo/]
    end

    C -->|BLOQUEADO| M
    M -->|BLOQUEADO| MD
    D -->|BLOQUEADO| MD
    MD -->|BLOQUEADO| MCS
    MD -->|BLOQUEADO| TDA
    T -->|BLOQUEADO| TDA
    TDA -->|BLOQUEADO| FIT
    MCS -->|BLOQUEADO| PROF
    MD & TDA -->|BLOQUEADO| RECO

    style M fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style MD fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style TDA fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style MCS fill:#ff6b6b,stroke:#ff6b6b,color:#fff
    style RECO fill:#64748b,stroke:#64748b,color:#fff
    style FIT fill:#64748b,stroke:#64748b,color:#fff
    style PROF fill:#64748b,stroke:#64748b,color:#fff
`;

export const GapsSection: React.FC<GapsSectionProps> = ({ stats, loading }) => {
  const totalEffortHours = RESOLUTION_ROADMAP.reduce((acc, step) => acc + step.effortHours, 0);
  const automatableSteps = RESOLUTION_ROADMAP.filter(s => s.automatable).length;
  const readySteps = RESOLUTION_ROADMAP.filter(s => s.status === 'ready').length;

  // Dynamic gap counts from stats
  const gapCounts = {
    critical: 3, // Hardcoded for now based on critical blocks
    affinities: stats?.toolAffinities ?? 0,
    mius: stats?.contents ?? 0,
    fragments: stats?.fragments ?? 0,
    mindDrivers: stats?.mindDrivers ?? 0,
    drivers: stats?.drivers ?? 0,
    tools: stats?.tools ?? 0,
    driverRels: stats?.driverRels ?? 0,
    compMaps: stats?.compMaps ?? 0,
  };

  return (
    <OpsPage>
      {/* Critical Gaps Overview */}
      <OpsCard style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
        <OpsCardHeader title="Critical Gaps - Blocking Full Pipeline" accentColor="#f87171" />
        <OpsCardContent>
          <MermaidDiagram chart={GAPS_DIAGRAM} id="gaps" />
        </OpsCardContent>
      </OpsCard>

      {/* Quick Stats */}
      <OpsGrid columns={4}>
        <OpsCard>
          <OpsCardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{GAPS_TABLE.filter(g => g.priority === 'P0').length}</div>
            <OpsLabel>Gaps P0 (Criticos)</OpsLabel>
          </OpsCardContent>
        </OpsCard>
        <OpsCard>
          <OpsCardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">{totalEffortHours}h</div>
            <OpsLabel>Esforco Total Estimado</OpsLabel>
          </OpsCardContent>
        </OpsCard>
        <OpsCard>
          <OpsCardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">{automatableSteps}/{RESOLUTION_ROADMAP.length}</div>
            <OpsLabel>Steps Automatizaveis</OpsLabel>
          </OpsCardContent>
        </OpsCard>
        <OpsCard>
          <OpsCardContent className="p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: OPS_ACCENT }}>{readySteps}</div>
            <OpsLabel>Steps Prontos para Iniciar</OpsLabel>
          </OpsCardContent>
        </OpsCard>
      </OpsGrid>

      {/* Gaps Summary Table */}
      <OpsCard>
        <OpsCardHeader title="Resumo dos Gaps" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="overflow-x-auto rounded-lg border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-muted/20">
                  <th className="text-left py-3 px-4 text-xs font-bold text-red-400 uppercase">Gap</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Impacto</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Solucao</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">P</th>
                </tr>
              </thead>
              <tbody>
                {GAPS_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4"><OpsCode className="bg-red-500/10 text-red-400">{row.gap}</OpsCode></td>
                    <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell leading-relaxed">{row.impact}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs hidden lg:table-cell leading-relaxed">{row.solution}</td>
                    <td className="py-3 px-4">
                      <OpsBadge
                        variant={row.priority === 'P0' ? 'error' : 'warning'}
                        className="px-2 py-0.5"
                      >
                        {row.priority}
                      </OpsBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Dependency Chain Visualization */}
      <OpsCard style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
        <OpsCardHeader title="Efeito Domino - Cadeia de Dependencias" accentColor="#f87171">
          <Icon name="arrow-right" size="size-4" className="text-red-400 mr-2" />
        </OpsCardHeader>
        <OpsCardContent>
          <OpsText className="mb-6 max-w-4xl">
            Cada gap critico bloqueia os proximos. A raiz do problema e <OpsCode className="text-red-400 bg-red-500/10">mius = 0</OpsCode>.
            Sem MIUs extraidos, todo o pipeline fica travado.
          </OpsText>
          <MermaidDiagram chart={DEPENDENCY_CHAIN_DIAGRAM} id="dependency-chain" />
        </OpsCardContent>
      </OpsCard>

      {/* Gap Impact Analysis - Detailed Cards */}
      <OpsCard>
        <OpsCardHeader title="Analise de Impacto por Gap" />
        <OpsCardContent>
          <div className="space-y-6">
            {GAP_IMPACTS.map((gap, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border-l-4 shadow-sm"
                style={{
                  borderColor: gap.currentCount === 0 ? '#ef4444' : '#f59e0b',
                  backgroundColor: gap.currentCount === 0 ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <OpsCode className="text-base text-red-400 bg-red-500/10 px-2 py-1">{gap.table}</OpsCode>
                    <span className="text-sm text-foreground/80 font-medium">= {gap.currentCount} registros</span>
                  </div>
                  <div className="flex gap-2">
                    <OpsBadge variant={gap.automatable ? 'success' : 'warning'} className="px-2 py-0.5">
                      {gap.automatable ? 'Automatizavel' : 'Manual'}
                    </OpsBadge>
                    <OpsBadge variant="info" className="px-2 py-0.5">{gap.effortEstimate}</OpsBadge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <OpsLabel>Causa Raiz</OpsLabel>
                    <OpsText className="text-foreground">{gap.rootCause}</OpsText>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                      <h5 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Bloqueado Por
                      </h5>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {gap.blockedBy.map((b, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <code className="text-xs bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">{b}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-500/5 p-4 rounded-lg border border-amber-500/10">
                      <h5 className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Bloqueando
                      </h5>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {gap.blocking.map((b, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <code className="text-xs bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">{b}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h5 className="text-xs font-bold text-emerald-400 uppercase mb-2">Passos para Resolucao</h5>
                    <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/10">
                      <ol className="text-sm text-foreground/90 space-y-2 list-decimal list-inside marker:text-emerald-500/70">
                        {gap.resolutionSteps.map((step, j) => (
                          <li key={j} className="leading-relaxed">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Current Data Status */}
      <OpsCard>
        <OpsCardHeader title="Status dos Dados Atuais" />
        <OpsCardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="text-2xl font-bold text-foreground mb-1">
                {loading ? <span className="animate-pulse">...</span> : stats?.contents ?? 0}
              </div>
              <OpsLabel>Total Contents</OpsLabel>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="text-2xl font-bold text-emerald-400 mb-1">
                {loading ? <span className="animate-pulse">...</span> : stats?.contentsWithTranscription ?? 0}
              </div>
              <OpsLabel>Com Texto</OpsLabel>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="text-2xl font-bold text-amber-400 mb-1">
                {loading ? <span className="animate-pulse">...</span> : gapCounts.drivers}
              </div>
              <OpsLabel>Drivers</OpsLabel>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
              <div className="text-2xl font-bold mb-1" style={{ color: OPS_ACCENT }}>
                {loading ? <span className="animate-pulse">...</span> : gapCounts.fragments}
              </div>
              <OpsLabel>Fragments (MIUs)</OpsLabel>
            </div>
          </div>

          {stats && stats.contents > 0 && (
            <div className="space-y-3 bg-muted/5 p-4 rounded-lg border border-border/10">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-muted-foreground">Contents com Texto</span>
                <span style={{ color: OPS_ACCENT }}>
                  {Math.round((stats.contentsWithTranscription / stats.contents) * 100)}%
                </span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(stats.contentsWithTranscription / stats.contents) * 100}%`,
                    backgroundColor: OPS_ACCENT
                  }}
                />
              </div>
            </div>
          )}
        </OpsCardContent>
      </OpsCard>

      {/* Resolution Roadmap */}
      <OpsCard>
        <OpsCardHeader title="Roadmap de Resolucao" />
        <OpsCardContent>
          <div className="space-y-4">
            {RESOLUTION_ROADMAP.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-lg border transition-all hover:bg-muted/5"
                style={{
                  borderColor: step.status === 'ready' ? OPS_ACCENT : step.status === 'blocked' ? '#64748b' : '#22c55e',
                  backgroundColor: step.status === 'ready' ? `${OPS_ACCENT}08` : 'transparent'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
                      style={{
                        backgroundColor: step.status === 'ready' ? OPS_ACCENT : step.status === 'blocked' ? '#64748b' : '#22c55e',
                        color: step.status === 'ready' ? '#000' : '#fff'
                      }}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground">{step.action}</h4>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{step.phase}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={`px-2 py-0.5 border ${step.status === 'ready' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : step.status === 'blocked' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                    >
                      {step.status === 'ready' ? 'Pronto' : step.status === 'blocked' ? 'Bloqueado' : 'Concluido'}
                    </Badge>
                    <Badge variant="outline" className={`px-2 py-0.5 border ${step.automatable ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {step.automatable ? 'Auto' : 'Manual'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-border/10 text-xs">
                  <div>
                    <span className="text-muted-foreground block mb-1 font-medium">Input</span>
                    <OpsCode className="bg-muted/20 text-foreground">{step.input}</OpsCode>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1 font-medium">Output</span>
                    <OpsCode className="bg-muted/20" style={{ color: OPS_ACCENT }}>{step.output}</OpsCode>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1 font-medium">Esforco</span>
                    <span className="text-purple-400 font-bold">{step.effort} (~{step.effortHours}h)</span>
                  </div>
                </div>

                {step.blockedBy.length > 0 && (
                  <div className="mt-3 bg-red-500/5 p-2 rounded border border-red-500/10 inline-block">
                    <p className="text-xs text-red-400 font-medium">
                      ⚠️ Depende de: {step.blockedBy.map(s => `Step ${s}`).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Quick Wins */}
      <OpsCard style={{ borderColor: 'rgba(34,211,238,0.3)' }}>
        <OpsCardHeader title="Quick Wins - Comece Por Aqui" accentColor={OPS_ACCENT} />
        <OpsCardContent>
          <OpsText className="mb-6">
            Acoes de alto impacto que podem ser executadas rapidamente para validar o pipeline:
          </OpsText>
          <div className="space-y-4">
            {QUICK_WINS.map((win) => (
              <div
                key={win.rank}
                className="p-5 rounded-lg border-l-4 shadow-sm transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: win.roi === 'Alto' ? '#22c55e' : win.roi === 'Medio' ? '#f59e0b' : '#64748b',
                  backgroundColor: win.roi === 'Alto' ? 'rgba(34,197,94,0.05)' : 'transparent'
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md"
                      style={{ backgroundColor: OPS_ACCENT, color: '#000' }}
                    >
                      {win.rank}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground">{win.action}</h4>
                      <code className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded font-mono">{win.gap}</code>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={`px-2 py-0.5 border ${win.roi === 'Alto' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : win.roi === 'Medio' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}
                    >
                      ROI {win.roi}
                    </Badge>
                    <Badge variant="outline" className="px-2 py-0.5 border bg-purple-500/10 text-purple-400 border-purple-500/20">{win.effort}</Badge>
                  </div>
                </div>
                <p className="text-sm text-foreground mb-2 pl-12">{win.impact}</p>
                <p className="text-xs text-muted-foreground italic pl-12 border-l-2 border-border/20 ml-2">{win.reasoning}</p>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Proposed Tables */}
      <OpsCard style={{ borderColor: 'rgba(168,85,247,0.3)' }}>
        <OpsCardHeader title="Tabelas Propostas - Schema Preview" accentColor="#c084fc" />
        <OpsCardContent>
          <div className="space-y-8">
            {PROPOSED_TABLES.map((table, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <OpsCode className="text-base text-purple-400 bg-purple-500/10 px-2.5 py-1">{table.name}</OpsCode>
                  <Badge variant="outline" className={`px-2.5 py-0.5 border ${table.priority === 'Alta' ? 'bg-red-500/10 text-red-400 border-red-500/20' : table.priority === 'Media' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}
                  >
                    Prioridade {table.priority}
                  </Badge>
                </div>

                <p className="text-sm md:text-base text-foreground mb-6 leading-relaxed max-w-4xl">{table.purpose}</p>

                <div className="mb-6 bg-background/50 p-4 rounded-lg border border-border/10">
                  <h5 className="text-xs font-bold text-purple-400 uppercase mb-3 flex items-center gap-2">
                    <Icon name="check" size="size-3" className="text-purple-400" />
                    O que essa tabela habilita:
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-2 pl-1">
                    {table.enablesWhat.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-purple-400 uppercase mb-3">Schema:</h5>
                  <div className="overflow-x-auto rounded-lg border border-purple-500/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-500/20 bg-purple-500/5">
                          <th className="text-left py-3 px-4 text-purple-400 text-xs font-bold uppercase">Coluna</th>
                          <th className="text-left py-3 px-4 text-purple-400 text-xs font-bold uppercase">Tipo</th>
                          <th className="text-left py-3 px-4 text-purple-400 text-xs font-bold uppercase hidden md:table-cell">Descricao</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.schema.map((col, j) => (
                          <tr key={j} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                            <td className="py-3 px-4"><code className="text-foreground bg-muted/20 px-1.5 py-0.5 rounded text-xs">{col.column}</code></td>
                            <td className="py-3 px-4 text-muted-foreground text-xs font-mono">{col.type}</td>
                            <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell leading-relaxed">{col.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Fit Score Formula */}
      <div className="p-6 rounded-xl border-l-4 shadow-sm" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
        <p className="text-sm font-bold uppercase tracking-wider mb-3 text-foreground/80">Fit Score Formula</p>
        <div className="bg-muted/20 p-4 rounded-lg border border-white/5 mb-3">
          <code className="text-sm font-mono block text-center" style={{ color: OPS_ACCENT }}>
            fit_score = Sum(tool_driver_affinity.strength x mind_driver.strength / 10)
          </code>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="text-amber-400 font-bold">Nota:</span>
          Para calcular fit_score, precisamos de <code className="text-red-400 bg-red-500/10 px-1 rounded">mind_drivers</code> + <code className="text-red-400 bg-red-500/10 px-1 rounded">tool_driver_affinities</code> populados.
        </p>
      </div>

      {/* Summary Box */}
      <OpsCard>
        <OpsCardContent className="p-6">
          <h4 className="text-base font-bold text-foreground mb-4 uppercase tracking-wider border-b border-border/20 pb-2">Resumo Executivo</h4>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p className="flex gap-3">
              <Icon name="exclamation-triangle" size="size-5" className="text-red-400 mt-1" />
              <span>
                <strong className="text-red-400 block mb-1">Problema Principal</strong>
                O pipeline esta bloqueado porque nenhum MIU foi extraido ainda.
                A extracao e o primeiro passo e desbloqueia todo o resto.
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="bolt" size="size-5" style={{ color: OPS_ACCENT }} className="mt-1" />
              <span>
                <strong style={{ color: OPS_ACCENT }} className="block mb-1">Acao Imediata</strong>
                Rodar InnerLens em pelo menos 1 mind completo (4h de trabalho)
                para validar o fluxo end-to-end.
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="refresh" size="size-5" className="text-purple-400 mt-1" />
              <span>
                <strong className="text-purple-400 block mb-1">Paralelizavel</strong>
                Step 4 (tool_driver_affinities) pode ser executado em paralelo
                com Steps 1-3, ja que nao depende de MIUs.
              </span>
            </p>
          </div>
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
