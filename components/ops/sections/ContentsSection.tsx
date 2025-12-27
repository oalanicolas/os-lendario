import React from 'react';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { OPS_ACCENT, OPS_STATUS } from '../ops-tokens';
import {
  CONTENTS_EXPLANATION,
  CONTENT_PROJECTS_EXPLANATION,
  CONTENT_TYPES,
  CONTENT_STATUSES,
  FRAGMENTS_EXPLANATION,
  INGESTION_PIPELINE,
  EXTRACTION_EXAMPLE,
  CONTENT_STATISTICS,
  CONTENT_FLOW_DIAGRAM,
  CONTENT_ER_DIAGRAM,
} from '../data/contents-content';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode,
  OpsLabel,
  OpsSection
} from '../ops-ui';

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

const StatusBadge: React.FC<{ status: string; color: 'gray' | 'yellow' | 'green' | 'red' }> = ({ status, color }) => {
  const colorMap = {
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    yellow: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    green: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <Badge variant="outline" className={`text-[10px] ${colorMap[color]}`}>
      {status}
    </Badge>
  );
};

const MiuDensityBadge: React.FC<{ density: 'high' | 'medium' | 'low' }> = ({ density }) => {
  const colorMap = {
    high: 'bg-emerald-500/20 text-emerald-400',
    medium: 'bg-amber-500/20 text-amber-400',
    low: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded ${colorMap[density]}`}>
      {density === 'high' ? 'Alta' : density === 'medium' ? 'Media' : 'Baixa'}
    </span>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ContentsSection: React.FC = () => {
  return (
    <OpsPage>
      {/* Content Flow Diagram */}
      <OpsCard>
        <OpsCardHeader title="Content Pipeline - Visao Geral" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={CONTENT_FLOW_DIAGRAM} id="content-flow" />
        </OpsCardContent>
      </OpsCard>

      {/* Quick Summary */}
      <div className="p-6 rounded-xl border-l-4 bg-muted/5" style={{ borderColor: OPS_ACCENT }}>
        <p className="text-base mb-4 leading-relaxed"><strong>O Pipeline de Conteudo transforma fontes brutas em conhecimento estruturado:</strong></p>
        <div className="space-y-3 text-sm md:text-base leading-relaxed text-muted-foreground">
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>content_projects</OpsCode>
            {' '}agrupa conteudos relacionados (serie de podcast, livro, etc.)
          </p>
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>contents</OpsCode>
            {' '}armazena cada peca de conteudo (episodio, capitulo, artigo)
          </p>
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>mius</OpsCode>
            {' '}extrai unidades minimas interpretaveis (zero-inference)
          </p>
          <p>
            <OpsCode style={{ color: OPS_ACCENT }}>fragments</OpsCode>
            {' '}sistema legado com insight embutido (sendo substituido)
          </p>
        </div>
      </div>

      {/* Contents Table Definition */}
      <OpsCard>
        <OpsCardHeader title={CONTENTS_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground max-w-4xl mb-6">{CONTENTS_EXPLANATION.definition}</OpsText>
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-6">
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium tracking-wide">{CONTENTS_EXPLANATION.principle}</p>
          </div>

          {/* Key Columns */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Colunas Principais</h4>
            <div className="overflow-x-auto rounded-lg border border-border/20">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20 bg-muted/20">
                    <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Coluna</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tipo</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTENTS_EXPLANATION.keyColumns.map((col, i) => (
                    <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4">
                        <OpsCode style={{ color: OPS_ACCENT }}>{col.name}</OpsCode>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{col.type}</td>
                      <td className="py-3 px-4 text-muted-foreground leading-relaxed">{col.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Relationships */}
          <OpsGrid columns={2}>
            <div className="p-5 rounded-lg bg-muted/10 border border-border/20">
              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Has Many</h4>
              {CONTENTS_EXPLANATION.relationships.hasMany.map((rel, i) => (
                <div key={i} className="text-sm mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></div>
                  <code style={{ color: OPS_ACCENT }}>{rel.table}</code>
                  <span className="text-muted-foreground text-xs">via {rel.via}</span>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-lg bg-muted/10 border border-border/20">
              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Many to Many</h4>
              {CONTENTS_EXPLANATION.relationships.manyToMany.map((rel, i) => (
                <div key={i} className="text-sm mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></div>
                  <code style={{ color: OPS_ACCENT }}>{rel.table}</code>
                  <span className="text-muted-foreground text-xs">via {rel.via}</span>
                </div>
              ))}
            </div>
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Content Projects */}
      <OpsCard>
        <OpsCardHeader title={CONTENT_PROJECTS_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-6">{CONTENT_PROJECTS_EXPLANATION.definition}</OpsText>

          {/* Project Types Grid */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Tipos de Projeto</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(CONTENT_PROJECTS_EXPLANATION.projectTypes).map(([category, types]) => (
                <div key={category} className="p-4 rounded-lg bg-muted/20 border border-border/40 hover:border-border/60 transition-colors">
                  <div className="text-xs font-bold uppercase mb-3 flex items-center gap-2" style={{ color: OPS_ACCENT }}>
                    <span className="w-1 h-3 rounded-full bg-current"></span>
                    {category}
                  </div>
                  <div className="space-y-2">
                    {types.map((type, i) => (
                      <div key={i} className="text-xs text-muted-foreground pl-3 border-l-2 border-border/20">
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Project */}
          <div className="p-5 rounded-lg bg-muted/20 border border-border/40 shadow-sm">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Exemplo de Projeto</h4>
            <div className="mb-4 flex items-center gap-3">
              <OpsCode className="text-base">
                {CONTENT_PROJECTS_EXPLANATION.example.projectName}
              </OpsCode>
              <Badge variant="outline" className="text-xs px-2 py-0.5 border-border/40">
                {CONTENT_PROJECTS_EXPLANATION.example.projectType}
              </Badge>
            </div>
            <div className="space-y-3 pl-4 border-l-2 border-border/20">
              {CONTENT_PROJECTS_EXPLANATION.example.contents.map((content, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: OPS_ACCENT }} />
                  <span className="text-foreground">{content.title}</span>
                  <Badge variant="outline" className="text-[10px] opacity-70 border-border/30">{content.contentType}</Badge>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Section Divider */}
      <div className="flex items-center gap-6 py-8">
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Tipos de Conteudo</span>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      {/* Content Types */}
      <OpsCard>
        <OpsCardHeader title="Content Types - Densidade de MIU" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6 max-w-3xl">
            Diferentes tipos de conteudo produzem densidades diferentes de MIUs.
            Conteudo em primeira pessoa (entrevistas, podcasts) tem maior densidade.
          </OpsText>

          <div className="overflow-x-auto rounded-lg border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-muted/20">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Tipo</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Categoria</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">MIU</th>
                </tr>
              </thead>
              <tbody>
                {CONTENT_TYPES.map((ct, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4">
                      <OpsCode className="bg-muted/10" style={{ color: OPS_ACCENT }}>{ct.type}</OpsCode>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">
                      <Badge variant="outline" className="text-[10px]">{ct.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs leading-relaxed">{ct.description}</td>
                    <td className="py-3 px-4">
                      <MiuDensityBadge density={ct.miuDensity} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Status Workflow */}
      <OpsCard>
        <OpsCardHeader title="Status Workflow" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-muted/10 rounded-xl border border-border/20">
            {CONTENT_STATUSES.map((s, i) => (
              <React.Fragment key={s.status}>
                <StatusBadge status={s.status} color={s.color} />
                {i < CONTENT_STATUSES.length - 1 && (
                  <Icon name="arrow-right" size="size-3" className="text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>

          <OpsGrid>
            {CONTENT_STATUSES.map((s, i) => (
              <div
                key={i}
                className={`p-5 rounded-lg border flex flex-col justify-between transition-all hover:-translate-y-0.5 ${s.color === 'gray' ? 'bg-gray-500/5 border-gray-500/10' :
                  s.color === 'yellow' ? 'bg-amber-500/5 border-amber-500/10' :
                    s.color === 'green' ? 'bg-emerald-500/5 border-emerald-500/10' :
                      'bg-red-500/5 border-red-500/10'
                  }`}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge status={s.status} color={s.color} />
                  </div>
                  <span className="text-sm text-foreground font-medium block mb-1">{s.description}</span>
                </div>
                <div className="pt-3 border-t border-black/10 dark:border-white/5 mt-auto">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground/80">Proxima acao:</strong> {s.nextAction}
                  </p>
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Section Divider */}
      <div className="flex items-center gap-6 py-8">
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Pipeline de Ingestao</span>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      {/* Ingestion Pipeline Steps */}
      <OpsCard>
        <OpsCardHeader title="Etapas de Ingestao" />
        <OpsCardContent>
          <div className="space-y-8 pl-2">
            {INGESTION_PIPELINE.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Connector Line */}
                {index < INGESTION_PIPELINE.length - 1 && (
                  <div
                    className="absolute left-[1.15rem] top-10 w-0.5 h-[calc(100%+1.5rem)] opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: OPS_ACCENT }}
                  />
                )}

                <div className="flex gap-6">
                  {/* Step Number */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg z-10 relative"
                    style={{ backgroundColor: OPS_ACCENT, color: '#000' }}
                  >
                    {step.step}
                  </div>

                  <div className="flex-1 pb-4">
                    <h4 className="font-bold text-base mb-2 flex items-center gap-3" style={{ color: OPS_ACCENT }}>
                      {step.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-3xl">{step.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
                      <div className="p-3 rounded bg-muted/10 border border-border/20">
                        <span className="text-muted-foreground font-bold tracking-wide block mb-1">INPUT</span>
                        <span className="text-foreground">{step.input}</span>
                      </div>
                      <div className="p-3 rounded bg-emerald-500/5 border border-emerald-500/10">
                        <span className="text-emerald-400 font-bold tracking-wide block mb-1">OUTPUT</span>
                        <span className="text-foreground">{step.output}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {step.tables.map((table, i) => (
                        <code
                          key={i}
                          className="text-[10px] bg-muted/30 px-2 py-1 rounded border border-white/5"
                          style={{ color: OPS_ACCENT }}
                        >
                          {table}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Section Divider */}
      <div className="flex items-center gap-6 py-8">
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Fragments vs MIUs</span>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      {/* Fragments (Legacy) */}
      <OpsCard>
        <OpsCardHeader title={FRAGMENTS_EXPLANATION.title} accentColor="#fbbf24" /> {/* text-amber-400 */}
        <OpsCardContent>
          <OpsText className="text-foreground mb-6">{FRAGMENTS_EXPLANATION.definition}</OpsText>

          <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase text-red-400">Problema Identificado</span>
            </div>
            <p className="text-sm text-red-300/90 leading-relaxed">{FRAGMENTS_EXPLANATION.problem}</p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-lg border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-muted/20">
                  <th className="text-left py-3 px-4 text-muted-foreground font-bold uppercase text-xs">Aspecto</th>
                  <th className="text-left py-3 px-4 text-red-400 font-bold uppercase text-xs">Fragments</th>
                  <th className="text-left py-3 px-4 text-emerald-400 font-bold uppercase text-xs">MIUs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/10">
                  <td className="py-3 px-4 text-foreground font-medium">Abordagem</td>
                  <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.fragments.approach}</td>
                  <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.mius.approach}</td>
                </tr>
                <tr className="border-b border-border/10">
                  <td className="py-3 px-4 text-foreground font-medium">Rastreabilidade</td>
                  <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.fragments.traceability}</td>
                  <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.mius.traceability}</td>
                </tr>
                <tr className="border-b border-border/10">
                  <td className="py-3 px-4 text-foreground font-medium">Reproducibilidade</td>
                  <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.fragments.reproducibility}</td>
                  <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.mius.reproducibility}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Extraction Example */}
      <OpsCard>
        <OpsCardHeader title={EXTRACTION_EXAMPLE.title} />
        <OpsCardContent>
          {/* Source Content */}
          <div className="p-6 rounded-xl bg-muted/10 border border-border/30 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className="text-xs">{EXTRACTION_EXAMPLE.sourceContent.contentType}</Badge>
              <StatusBadge status={EXTRACTION_EXAMPLE.sourceContent.status} color="green" />
            </div>
            <h4 className="font-medium text-lg text-foreground mb-4">{EXTRACTION_EXAMPLE.sourceContent.title}</h4>
            <div className="relative pl-6 border-l-2" style={{ borderColor: OPS_ACCENT }}>
              <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
                &quot;{EXTRACTION_EXAMPLE.sourceContent.excerpt}&quot;
              </p>
            </div>
          </div>

          {/* Side by Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* As Fragment */}
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 flex flex-col h-full">
              <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 pb-2 border-b border-red-500/10">Como Fragment (Legado)</h4>

              <div className="space-y-4 text-sm flex-1">
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <code className="text-muted-foreground text-xs">type:</code>
                  <span className="text-red-300 font-mono text-xs">{EXTRACTION_EXAMPLE.asFragment.type}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <code className="text-muted-foreground text-xs">content:</code>
                  <span className="text-red-300 truncate font-mono text-xs" title={EXTRACTION_EXAMPLE.asFragment.content}>{EXTRACTION_EXAMPLE.asFragment.content}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <code className="text-muted-foreground text-xs">insight:</code>
                  <span className="text-red-300 italic">{EXTRACTION_EXAMPLE.asFragment.insight}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/10">
                <p className="text-xs text-red-300 font-medium flex gap-2">
                  <Icon name="exclamation-triangle" size="size-3" className="text-red-400" /> {EXTRACTION_EXAMPLE.asFragment.problem}
                </p>
              </div>
            </div>

            {/* As MIUs */}
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col h-full">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 pb-2 border-b border-emerald-500/10">Como MIUs (Zero-Inference)</h4>

              <div className="space-y-4 flex-1">
                {EXTRACTION_EXAMPLE.asMIUs.map((miu, i) => (
                  <div key={i} className="p-3 rounded bg-muted/20 text-sm border border-emerald-500/10">
                    <p className="text-foreground italic mb-2 leading-relaxed">&quot;{miu.verbatim}&quot;</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        pronouns: {miu.pronouns.join(', ') || '[]'}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        verbs: {miu.verbs.length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advantage */}
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Icon name="check" size="size-4" className="text-emerald-400" />
            </div>
            <p className="text-sm md:text-base text-emerald-400 font-medium">{EXTRACTION_EXAMPLE.advantage}</p>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Statistics */}
      <OpsCard>
        <OpsCardHeader title={CONTENT_STATISTICS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          {/* Average per Mind */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">{CONTENT_STATISTICS.avgPerMind.title}</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTENT_STATISTICS.avgPerMind.data.map((stat, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/10 border border-border/20 text-center hover:border-border/40 transition-colors">
                  <div className="text-2xl font-bold mb-1" style={{ color: OPS_ACCENT }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* By Content Type */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">{CONTENT_STATISTICS.byContentType.title}</h4>
            <div className="overflow-x-auto rounded-lg border border-border/20">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20 bg-muted/20">
                    <th className="text-left py-3 px-4" style={{ color: OPS_ACCENT }}>Tipo</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Palavras</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">MIUs</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Qualidade</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTENT_STATISTICS.byContentType.data.map((row, i) => (
                    <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4 text-foreground font-medium">{row.type}</td>
                      <td className="py-3 px-4 font-mono text-xs" style={{ color: OPS_ACCENT }}>{row.words}</td>
                      <td className="py-3 px-4 font-mono text-xs" style={{ color: OPS_ACCENT }}>{row.mius}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{row.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Processing Metrics */}
          <div>
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">{CONTENT_STATISTICS.processingMetrics.title}</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTENT_STATISTICS.processingMetrics.data.map((metric, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/10 border border-border/20">
                  <div className="text-xl font-bold mb-2" style={{ color: OPS_ACCENT }}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-foreground font-medium mb-1">{metric.metric}</div>
                  <div className="text-[10px] text-muted-foreground/70 leading-normal">{metric.notes}</div>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={CONTENT_ER_DIAGRAM} id="content-er" />
        </OpsCardContent>
      </OpsCard>

      {/* Key Takeaway */}
      <div className="p-6 rounded-xl border-l-4 bg-muted/5 shadow-sm" style={{ borderColor: OPS_ACCENT }}>
        <p className="text-base font-bold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></span>
          Resumo do Pipeline de Conteudo
        </p>
        <ul className="text-sm md:text-base space-y-3 text-muted-foreground leading-relaxed pl-4 border-l border-border/20 ml-1">
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>content_projects</OpsCode>
            {' '}organiza fontes em projetos (podcast series, livro, etc.)
          </li>
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>contents</OpsCode>
            {' '}armazena o texto completo com metadados e status
          </li>
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>content_minds</OpsCode>
            {' '}vincula conteudo a quem participou (host, guest, author)
          </li>
          <li>
            <OpsCode className="bg-muted/30 border-white/5" style={{ color: OPS_ACCENT }}>mius</OpsCode>
            {' '}extrai unidades minimas sem inferencia - base para todo o resto
          </li>
        </ul>
        <p className="text-sm mt-4 pt-4 border-t border-border/10 font-medium text-foreground">
          Quanto mais conteudo em primeira pessoa, maior a qualidade dos MIUs extraidos.
        </p>
      </div>
    </OpsPage>
  );
};
