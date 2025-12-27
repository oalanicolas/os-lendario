import React from 'react';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { Icon } from '../../ui/icon';
import { PipelineMonitor } from '../components/PipelineMonitor';
import { PhaseBadge } from '../components/PhaseBadge';
import { PIPELINE_DIAGRAM } from '../data/diagrams';
import { PHASE_DETAILS, DATA_FLOW_EXAMPLE } from '../data/pipeline-content';
import { OPS_ACCENT, getPhaseConfig } from '../ops-tokens';
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
// PHASE DETAIL CARD COMPONENT
// =============================================================================

interface PhaseDetailCardProps {
  phase: number;
  name: string;
  title: string;
  description: string;
  keyPoints: string[];
  tables: { name: string; role: string }[];
}

const PhaseDetailCard: React.FC<PhaseDetailCardProps> = ({
  phase,
  name,
  title,
  description,
  keyPoints,
  tables,
}) => {
  const config = getPhaseConfig(phase);

  return (
    <OpsCard>
      <OpsCardHeader
        title={
          <div className="flex items-center gap-3">
            <PhaseBadge phase={phase} />
            <span style={{ color: config.color }}>{name}: {title}</span>
          </div>
        }
      />
      <OpsCardContent>
        <OpsText className="leading-relaxed mb-4">{description}</OpsText>

        {/* Key Points */}
        <div className="space-y-2 mb-4">
          <OpsLabel>Pontos Chave</OpsLabel>
          <ul className="space-y-1.5">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: config.color }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tables Involved */}
        <div className="p-3 rounded-lg bg-muted/20">
          <OpsLabel className="mb-2">Tabelas Envolvidas</OpsLabel>
          <div className="space-y-1.5">
            {tables.map((table, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <OpsCode className="px-1.5 py-0.5 rounded" style={{ color: OPS_ACCENT }}>
                  {table.name}
                </OpsCode>
                <span className="text-muted-foreground">{table.role}</span>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

// =============================================================================
// DATA FLOW STEP COMPONENT
// =============================================================================

interface DataFlowStepProps {
  step: {
    phase: number;
    phaseName: string;
    input: string;
    process: string;
    output: string;
    tables: string[];
  };
  isLast: boolean;
}

const DataFlowStep: React.FC<DataFlowStepProps> = ({ step, isLast }) => {
  const config = getPhaseConfig(step.phase);

  return (
    <div className="relative">
      {/* Connector Line */}
      {!isLast && (
        <div
          className="absolute left-4 top-12 w-0.5 h-[calc(100%-1rem)]"
          style={{ backgroundColor: `${config.color}40` }}
        />
      )}

      <div className="flex gap-4">
        {/* Phase indicator */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: config.color, color: step.phase === 1 || step.phase === 5 ? '#fff' : '#000' }}
        >
          {step.phase}
        </div>

        <div className="flex-1 pb-6">
          <h4 className="font-bold text-sm mb-2" style={{ color: config.color }}>
            FASE {step.phase}: {step.phaseName}
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-muted/40">
              <span className="text-muted-foreground font-bold">INPUT: </span>
              <span className="text-foreground font-medium">{step.input}</span>
            </div>

            <div className="p-2 rounded bg-muted/30 border-l-2" style={{ borderColor: config.color }}>
              <span className="text-muted-foreground font-bold">PROCESSO: </span>
              <span className="text-foreground font-medium">{step.process}</span>
            </div>

            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">OUTPUT: </span>
              <span className="text-foreground font-medium">{step.output}</span>
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
              {step.tables.map((table, i) => (
                <OpsCode
                  key={i}
                  className="text-[10px] bg-muted/30 px-1.5 py-0.5 rounded"
                  style={{ color: OPS_ACCENT }}
                >
                  {table}
                </OpsCode>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PipelineSection: React.FC = () => {
  return (
    <OpsPage>
      {/* Live Pipeline Monitor */}
      <OpsSection>
        <PipelineMonitor />
      </OpsSection>

      {/* Complete Pipeline Diagram */}
      <OpsCard>
        <OpsCardHeader title="Complete Data Pipeline - 6 Fases" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={PIPELINE_DIAGRAM} id="pipeline" />
        </OpsCardContent>
      </OpsCard>

      {/* Quick Summary */}
      <div className="p-4 rounded-xl border-l-4" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
        <div className="space-y-3 text-sm">
          <p><PhaseBadge phase={1} /><strong>COLETA:</strong> ETL de fontes brutas (podcasts, artigos, tweets) <Icon name="arrow-right" size="size-3" className="inline-block mx-1" /> <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>contents</OpsCode></p>
          <p><PhaseBadge phase={2} /><strong>EXTRACAO:</strong> InnerLens extrai <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>mius</OpsCode> (zero-inference) com validacao</p>
          <p><PhaseBadge phase={3} /><strong>INFERENCIA:</strong> Motor psicologico infere <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>mind_drivers</OpsCode> usando <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>driver_relationships</OpsCode></p>
          <p><PhaseBadge phase={4} /><strong>MAPEAMENTO:</strong> Drivers <Icon name="arrow-right" size="size-3" className="inline-block mx-1" /> Componentes via <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>component_driver_map</OpsCode> <Icon name="arrow-right" size="size-3" className="inline-block mx-1" /> Scores</p>
          <p><PhaseBadge phase={5} /><strong>PERFIL:</strong> Agregacao em <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>minds</OpsCode> com obsessoes e valores</p>
          <p><PhaseBadge phase={6} /><strong>RECOMENDACAO:</strong> Match tools via <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>tool_driver_affinities</OpsCode> <Icon name="arrow-right" size="size-3" className="inline-block mx-1" /> Stack personalizado</p>
        </div>
      </div>

      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Detalhes por Fase</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Phase Details Grid */}
      <OpsGrid columns={2}>
        {PHASE_DETAILS.map((phase) => (
          <PhaseDetailCard
            key={phase.phase}
            phase={phase.phase}
            name={phase.name}
            title={phase.title}
            description={phase.description}
            keyPoints={phase.keyPoints}
            tables={phase.tables}
          />
        ))}
      </OpsGrid>

      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Exemplo Concreto de Transformacao</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Data Flow Example */}
      <OpsCard>
        <OpsCardHeader title="Jornada de um Dado pelo Pipeline" />
        <OpsCardContent>
          {/* Original Input */}
          <div className="mb-6 p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_ACCENT }}>
            <div className="text-xs text-muted-foreground mb-1">INPUT ORIGINAL ({DATA_FLOW_EXAMPLE.context})</div>
            <p className="text-foreground font-medium italic">"{DATA_FLOW_EXAMPLE.originalInput}"</p>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {DATA_FLOW_EXAMPLE.steps.map((step, index) => (
              <DataFlowStep
                key={step.phase}
                step={step}
                isLast={index === DATA_FLOW_EXAMPLE.steps.length - 1}
              />
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Key Insight Box */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <h4 className="text-sm font-bold text-emerald-400 mb-2">Insight Chave: Rastreabilidade Total</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Cada recomendacao de ferramenta pode ser rastreada ate a fala original que a justifica.
          Isso permite explicabilidade total: "Por que GTD foi recomendado?" pode ser respondido
          com evidencias concretas extraidas do conteudo original.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-muted/30 text-foreground">
            <code style={{ color: OPS_ACCENT }}>mind_tools</code> {'<-'} <code style={{ color: OPS_ACCENT }}>tool_driver_affinities</code>
          </span>
          <span className="px-2 py-1 rounded bg-muted/30 text-foreground">
            {'<-'} <code style={{ color: OPS_ACCENT }}>mind_drivers</code>
          </span>
          <span className="px-2 py-1 rounded bg-muted/30 text-foreground">
            {'<-'} <code style={{ color: OPS_ACCENT }}>miu_driver_evidence</code>
          </span>
          <span className="px-2 py-1 rounded bg-muted/30 text-foreground">
            {'<-'} <code style={{ color: OPS_ACCENT }}>mius</code>
          </span>
          <span className="px-2 py-1 rounded bg-muted/30 text-foreground">
            {'<-'} <code style={{ color: OPS_ACCENT }}>contents</code>
          </span>
        </div>
      </div>

      {/* Algorithm Formula */}
      <OpsCard>
        <OpsCardHeader title="Formula de Recomendacao" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="p-4 rounded-lg bg-muted/20 font-mono text-sm">
            <div className="text-muted-foreground mb-2">// Para cada ferramenta candidata:</div>
            <div className="text-foreground">
              fit_score = <span style={{ color: OPS_ACCENT }}>Sum</span>(
            </div>
            <div className="pl-4 text-foreground">
              affinity.<span style={{ color: OPS_ACCENT }}>strength</span> *
            </div>
            <div className="pl-4 text-foreground">
              mind_driver.<span style={{ color: OPS_ACCENT }}>strength</span> *
            </div>
            <div className="pl-4 text-foreground">
              <span style={{ color: OPS_ACCENT }}>match_weight</span>(affinity.type)
            </div>
            <div className="text-foreground">)</div>
            <div className="mt-4 text-xs text-muted-foreground">
              // match_weight: amplifies=1.0, requires=0.8, conflicts=-0.5
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">AMPLIFIES</div>
              <div className="text-muted-foreground font-bold">+1.0x</div>
              <div className="text-[10px] mt-1 leading-tight">Tool potencializa o driver</div>
            </div>
            <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="text-amber-600 dark:text-amber-400 font-bold">REQUIRES</div>
              <div className="text-muted-foreground font-bold">+0.8x</div>
              <div className="text-[10px] mt-1 leading-tight">Tool requer o driver</div>
            </div>
            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-center">
              <div className="text-red-600 dark:text-red-400 font-bold">CONFLICTS</div>
              <div className="text-muted-foreground font-bold">-0.5x</div>
              <div className="text-[10px] mt-1 leading-tight">Tool conflita com driver</div>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
