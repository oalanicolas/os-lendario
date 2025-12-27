import React from 'react';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { MermaidDiagram } from '../components/MermaidDiagram';
import {
  JOB_EXECUTIONS_EXPLANATION,
  INGESTION_BATCHES_EXPLANATION,
  PROCESSING_QUEUE_EXPLANATION,
  JOB_LIFECYCLE,
  COST_TRACKING,
  EXAMPLE_JOB_EXECUTION,
  JOB_ENTITY_RELATIONSHIPS,
  ERROR_HANDLING,
  JOB_METRICS,
  JOBS_DIAGRAM,
  JOB_LIFECYCLE_DIAGRAM,
  JOB_ER_DIAGRAM,
} from '../data/jobs-content';
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
  OpsSection
} from '../ops-ui';

// =============================================================================
// STATUS BADGE COMPONENT
// =============================================================================

interface StatusBadgeProps {
  status: string;
  color: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color }) => (
  <div
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
    style={{ backgroundColor: `${color}20`, color }}
  >
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    {status}
  </div>
);

// =============================================================================
// FIELD TABLE COMPONENT
// =============================================================================

interface FieldTableProps {
  fields: { name: string; type?: string; desc: string; example?: string }[];
  showType?: boolean;
}

const FieldTable: React.FC<FieldTableProps> = ({ fields, showType = true }) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-border">
        <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Campo</th>
        {showType && <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tipo</th>}
        <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
        <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Exemplo</th>
      </tr>
    </thead>
    <tbody>
      {fields.map((field, i) => (
        <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
          <td className="py-3 px-4"><OpsCode className="text-xs font-mono" style={{ color: OPS_ACCENT }}>{field.name}</OpsCode></td>
          {showType && <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{field.type}</td>}
          <td className="py-3 px-4 text-muted-foreground text-xs">{field.desc}</td>
          <td className="py-3 px-4 text-xs text-muted-foreground hidden lg:table-cell">{field.example || '-'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// =============================================================================
// COST BREAKDOWN CARD
// =============================================================================

const CostBreakdownCard: React.FC = () => {
  const { costBreakdown, job } = EXAMPLE_JOB_EXECUTION;

  return (
    <OpsCard>
      <OpsCardHeader title="Breakdown de Custo - Exemplo Real" />
      <OpsCardContent>
        {/* Job Info */}
        <OpsGrid columns={3}>
          <div className="p-3 rounded-lg bg-muted/20 flex flex-col items-center justify-center text-center space-y-2 border border-border/40">
            <div className="text-xs text-muted-foreground uppercase mb-1">Provider</div>
            <div className="text-sm font-medium text-foreground">{job.llm_provider}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20">
            <div className="text-xs text-muted-foreground uppercase mb-1">Modelo</div>
            <div className="text-sm font-medium text-foreground">{job.llm_model.split('-').slice(0, 3).join('-')}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20">
            <div className="text-xs text-muted-foreground uppercase mb-1">Latencia</div>
            <div className="text-sm font-medium text-foreground">{(job.latency_ms / 1000).toFixed(2)}s</div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10">
            <div className="text-xs text-emerald-400 uppercase mb-1">Status</div>
            <div className="text-sm font-medium text-emerald-400">{job.status}</div>
          </div>
        </OpsGrid>

        {/* Token Breakdown */}
        <div className="p-4 rounded-lg bg-muted/20 border border-border/50 mt-4">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Tokens & Custo</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Prompt Tokens</span>
                <span className="font-mono" style={{ color: OPS_ACCENT }}>{costBreakdown.promptTokens.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">@ $3.00/1M</span>
                <span className="font-mono text-foreground">${costBreakdown.promptCost.toFixed(4)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Completion Tokens</span>
                <span className="font-mono" style={{ color: OPS_ACCENT }}>{costBreakdown.completionTokens.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">@ $15.00/1M</span>
                <span className="font-mono text-foreground">${costBreakdown.completionCost.toFixed(4)}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-xs text-emerald-400 uppercase mb-1">Total</div>
              <div className="text-lg font-bold text-emerald-400">${costBreakdown.totalCost.toFixed(4)}</div>
              <div className="text-[10px] text-muted-foreground mt-1">
                ${costBreakdown.costPerMIU.toFixed(4)} por MIU
              </div>
            </div>
          </div>
        </div>

        {/* Result Summary */}
        <OpsGrid columns={4} className="mt-4">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-center">
            <div className="text-2xl font-bold text-emerald-400">{job.result.mius_extracted}</div>
            <div className="text-xs text-muted-foreground">MIUs Extraidos</div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-center">
            <div className="text-2xl font-bold text-emerald-400">{job.result.validation_passed}</div>
            <div className="text-xs text-muted-foreground">Validados</div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 text-center">
            <div className="text-2xl font-bold text-red-400">{job.result.validation_failed}</div>
            <div className="text-xs text-muted-foreground">Rejeitados</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20 text-center">
            <div className="text-2xl font-bold text-foreground">{job.result.processing_time_s}s</div>
            <div className="text-xs text-muted-foreground">Tempo Total</div>
          </div>
        </OpsGrid>

        {/* Linked Entities */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Entidades Vinculadas</h4>
          <div className="space-y-1.5">
            {EXAMPLE_JOB_EXECUTION.linkedEntities.map((entity, i) => (
              <div key={i} className="flex items-center gap-3 text-xs p-2 rounded bg-muted/10">
                <OpsCode className="font-mono px-1.5 py-0.5 rounded bg-muted/30" style={{ color: OPS_ACCENT }}>
                  {entity.entity}
                </OpsCode>
                <span className="text-muted-foreground">{entity.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const JobsSection: React.FC = () => {
  return (
    <OpsPage>
      {/* Overview Diagram */}
      <OpsCard>
        <OpsCardHeader title="Sistema de Jobs - Visao Geral" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={JOBS_DIAGRAM} id="jobs-overview" />
        </OpsCardContent>
      </OpsCard>

      {/* Quick Summary */}
      <div className="p-4 rounded-xl border-l-4" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
        <div className="space-y-3 text-sm">
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>job_executions</OpsCode>
            <strong>= Registro de cada chamada LLM</strong> com tokens, custo, latencia e resultado
          </p>
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>ingestion_batches</OpsCode>
            <strong>= Agrupa operacoes em lotes</strong> para imports em massa
          </p>
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>processing_queue</OpsCode>
            <strong>= Fila de tarefas</strong> com prioridade e retry automatico
          </p>
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>generation_execution_id</OpsCode>
            <strong>= FK em fragments/mius/contents</strong> <Icon name="arrow-right" size="size-3" className="inline-block" /> rastreia qual job gerou cada entidade
          </p>
        </div>
      </div>

      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Tabelas do Sistema</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* job_executions Table */}
      <OpsCard>
        <OpsCardHeader title={JOB_EXECUTIONS_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">{JOB_EXECUTIONS_EXPLANATION.description}</OpsText>

          {/* Key Insights */}
          <div className="space-y-2 mb-4">
            {JOB_EXECUTIONS_EXPLANATION.keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: OPS_ACCENT }} />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          {/* Fields Table */}
          <div className="overflow-x-auto">
            <FieldTable fields={JOB_EXECUTIONS_EXPLANATION.fields} />
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ingestion_batches Table */}
      <OpsCard>
        <OpsCardHeader title={INGESTION_BATCHES_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">{INGESTION_BATCHES_EXPLANATION.description}</OpsText>

          <div className="space-y-2 mb-4">
            {INGESTION_BATCHES_EXPLANATION.keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-500" />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <FieldTable fields={INGESTION_BATCHES_EXPLANATION.fields} />
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* processing_queue Table */}
      <OpsCard>
        <OpsCardHeader title={PROCESSING_QUEUE_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">{PROCESSING_QUEUE_EXPLANATION.description}</OpsText>

          <div className="space-y-2 mb-4">
            {PROCESSING_QUEUE_EXPLANATION.keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500" />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <FieldTable fields={PROCESSING_QUEUE_EXPLANATION.fields} />
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Ciclo de Vida do Job</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Job Lifecycle */}
      <OpsCard>
        <OpsCardHeader title="Estados e Transicoes" accentColor="text-muted-foreground" />
        <OpsCardContent>
          {/* State Diagram */}
          <div className="mb-6">
            <MermaidDiagram chart={JOB_LIFECYCLE_DIAGRAM} id="job-lifecycle" />
          </div>

          {/* Status Cards */}
          <OpsGrid columns={3}>
            {JOB_LIFECYCLE.map((state) => (
              <div
                key={state.status}
                className="p-3 rounded-lg text-center"
                style={{ backgroundColor: `${state.color}15`, borderColor: `${state.color}30`, borderWidth: 1 }}
              >
                <StatusBadge status={state.label} color={state.color} />
                <p className="text-[10px] text-muted-foreground mt-2 leading-tight">{state.description}</p>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Custo e Metricas</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Cost Breakdown Example */}
      <CostBreakdownCard />

      {/* Pricing Reference */}
      <OpsCard>
        <OpsCardHeader title={COST_TRACKING.pricingReference.title} />
        <OpsCardContent>
          {COST_TRACKING.pricingReference.providers.map((provider, i) => (
            <div key={i} className="space-y-2 mb-4 last:mb-0">
              <h4 className="text-sm font-bold text-foreground">{provider.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {provider.models.map((model, j) => (
                  <div key={j} className="p-3 rounded-lg bg-muted/20 text-xs">
                    <div className="font-mono font-medium text-foreground mb-2">{model.model}</div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Prompt:</span>
                      <span className="font-mono">${model.promptPrice.toFixed(2)}/1M</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Completion:</span>
                      <span className="font-mono">${model.completionPrice.toFixed(2)}/1M</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </OpsCardContent>
      </OpsCard>

      {/* Aggregation Queries */}
      <OpsCard>
        <OpsCardHeader title="Agregacoes de Custo" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={3}>
            {COST_TRACKING.aggregations.map((agg, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="font-medium text-foreground text-sm mb-1">{agg.metric}</div>
                <OpsCode className="text-[10px] text-muted-foreground font-mono">{agg.query}</OpsCode>
                <p className="text-xs text-muted-foreground mt-2">{agg.insight}</p>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Rastreabilidade e Erros</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Entity Relationships */}
      <OpsCard>
        <OpsCardHeader title={JOB_ENTITY_RELATIONSHIPS.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-4">{JOB_ENTITY_RELATIONSHIPS.description}</OpsText>

          {/* Linked Tables */}
          <OpsGrid columns={2} className="mb-4">
            {JOB_ENTITY_RELATIONSHIPS.linkedTables.map((table, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-2" style={{ borderColor: OPS_ACCENT }}>
                <div className="flex items-center gap-2 mb-2">
                  <OpsCode className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{table.table}</OpsCode>
                  <Badge variant="outline" className="text-[10px]">{table.field}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{table.desc}</p>
                <p className="text-xs text-foreground mt-1 italic">{table.example}</p>
              </div>
            ))}
          </OpsGrid>

          {/* Use Cases */}
          <div>
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Casos de Uso</h4>
            <div className="space-y-2">
              {JOB_ENTITY_RELATIONSHIPS.useCases.map((uc, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/10 border border-border/30">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm">{uc.name}</span>
                    <OpsCode className="text-[10px] text-muted-foreground bg-muted/20">
                      {uc.query}
                    </OpsCode>
                  </div>
                  <p className="text-xs text-emerald-400">{uc.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Error Handling */}
      <OpsCard>
        <OpsCardHeader title={ERROR_HANDLING.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-6">{ERROR_HANDLING.description}</OpsText>

          {/* Retry Strategy */}
          <div className="p-4 rounded-lg bg-muted/20 border border-border/50 mb-6">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Estrategia de Retry</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.maxAttempts}</div>
                <div className="text-[10px] text-muted-foreground">Max Tentativas</div>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.initialDelay}ms</div>
                <div className="text-[10px] text-muted-foreground">Delay Inicial</div>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.backoffMultiplier}x</div>
                <div className="text-[10px] text-muted-foreground">Backoff</div>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.maxDelay / 1000}s</div>
                <div className="text-[10px] text-muted-foreground">Max Delay</div>
              </div>
            </div>
          </div>

          {/* Error Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Categorias de Erro</h4>
            <OpsGrid columns={2}>
              {ERROR_HANDLING.errorCategories.map((cat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: cat.recoverable ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                    borderColor: cat.recoverable ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-foreground text-sm">{cat.category}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${cat.recoverable ? 'text-emerald-400 border-emerald-400/30' : 'text-red-400 border-red-400/30'}`}
                    >
                      {cat.recoverable ? 'Recuperavel' : 'Permanente'}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {cat.examples.join(', ')}
                  </div>
                  <p className="text-xs" style={{ color: cat.recoverable ? '#22c55e' : '#ef4444' }}>
                    Acao: {cat.action}
                  </p>
                </div>
              ))}
            </OpsGrid>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Metricas Operacionais</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Key Metrics */}
      <OpsCard>
        <OpsCardHeader title={JOB_METRICS.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-4">{JOB_METRICS.description}</OpsText>

          <OpsGrid columns={3}>
            {JOB_METRICS.keyMetrics.map((metric, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="font-medium text-foreground text-sm mb-2">{metric.name}</div>
                <div className="text-xs text-muted-foreground font-mono mb-2">{metric.formula}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-400">Target: {metric.target}</span>
                  <span className="text-red-400">Alert: {metric.alert}</span>
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Dashboard Queries */}
      <OpsCard>
        <OpsCardHeader title="Queries para Dashboard" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-4">
            {JOB_METRICS.dashboardQueries.map((query, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20">
                <h4 className="text-sm font-medium text-foreground mb-2">{query.title}</h4>
                <pre className="text-xs font-mono text-muted-foreground bg-muted/30 p-3 rounded overflow-x-auto">
                  {query.sql}
                </pre>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={JOB_ER_DIAGRAM} id="jobs-er" />
        </OpsCardContent>
      </OpsCard>

      {/* Key Insight Box */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <h4 className="text-sm font-bold text-emerald-400 mb-2">Insight Chave: Rastreabilidade Completa</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Cada entidade gerada (MIU, fragment, content) pode ser rastreada ate o job que a criou,
          incluindo qual modelo foi usado, quanto custou, e quanto tempo levou. Isso permite:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="font-bold text-emerald-400">Auditoria</div>
            <div className="text-muted-foreground">Validar qualidade por modelo</div>
          </div>
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="font-bold text-emerald-400">Otimizacao</div>
            <div className="text-muted-foreground">Identificar gargalos de custo</div>
          </div>
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="font-bold text-emerald-400">Rollback</div>
            <div className="text-muted-foreground">Reverter dados problematicos</div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="p-4 rounded-xl border-l-4" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
        <p className="text-sm mb-2"><strong>Sistema de Jobs:</strong></p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>job_executions</OpsCode>
            = Cada chamada LLM com metricas de custo/performance
          </li>
          <li>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>ingestion_batches</OpsCode>
            = Agrupa operacoes de import em lotes
          </li>
          <li>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>processing_queue</OpsCode>
            = Fila com prioridade e retry automatico
          </li>
          <li>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>generation_execution_id</OpsCode>
            = FK que conecta entidades geradas ao job (Rastreabilidade)
          </li>
        </ul>
      </div>
    </OpsPage>
  );
};
