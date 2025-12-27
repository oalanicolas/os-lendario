import React from 'react';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { MIU_DIAGRAM } from '../data/diagrams';
import {
  MIU_EXPLANATION,
  MIU_VALIDATION,
  LINGUISTIC_MARKERS,
  MIU_VS_FRAGMENT,
  MIU_STATISTICS
} from '../data/miu-content';
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

export const MIUSection: React.FC = () => {
  return (
    <OpsPage>
      {/* Definition */}
      <OpsCard>
        <OpsCardHeader title={MIU_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">{MIU_EXPLANATION.definition}</OpsText>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <p className="text-sm text-amber-400 font-medium">{MIU_EXPLANATION.principle}</p>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Fields */}
      <OpsCard>
        <OpsCardHeader title="Campos do MIU" accentColor="text-muted-foreground" />
        <OpsCardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Campo</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {MIU_EXPLANATION.fields.map((field, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
                  <td className="py-3 px-4"><OpsCode className="text-xs font-mono" style={{ color: OPS_ACCENT }}>{field.name}</OpsCode></td>
                  <td className="py-3 px-4 text-muted-foreground">{field.desc}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">{field.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </OpsCardContent>
      </OpsCard>

      {/* Validation Pipeline */}
      <OpsCard>
        <OpsCardHeader title={MIU_VALIDATION.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-6">{MIU_VALIDATION.description}</OpsText>

          {/* Quality Gates */}
          <div className="mb-6">
            <OpsLabel className="mb-3">Quality Gates</OpsLabel>
            <OpsGrid columns={2}>
              {MIU_VALIDATION.qualityGates.map((gate, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={gate.icon} size="size-4" style={{ color: OPS_ACCENT }} />
                    <span className="font-medium text-foreground">{gate.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{gate.rule}</p>
                  <p className="text-xs text-muted-foreground/70 italic">{gate.reason}</p>
                </div>
              ))}
            </OpsGrid>
          </div>

          {/* Validation Statuses */}
          <div className="mb-6">
            <OpsLabel className="mb-3">Status de Validacao</OpsLabel>
            <div className="flex flex-wrap gap-2">
              {MIU_VALIDATION.statuses.map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: s.color === 'green' ? '#22c55e' :
                        s.color === 'red' ? '#ef4444' :
                          s.color === 'yellow' ? '#eab308' : '#f97316'
                    }}
                  />
                  <OpsCode className="text-xs font-mono" style={{ color: OPS_ACCENT }}>{s.status}</OpsCode>
                  <span className="text-xs text-muted-foreground">- {s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Rejections */}
          <div>
            <OpsLabel className="mb-3">Rejeicoes Comuns</OpsLabel>
            <div className="space-y-2">
              {MIU_VALIDATION.commonRejections.map((r, i) => (
                <div key={i} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <Badge variant="outline" className="text-[10px] text-red-400 border-red-400/30 w-fit">{r.reason}</Badge>
                    <span className="text-xs text-muted-foreground italic">{r.example}</span>
                  </div>
                  <p className="text-xs text-emerald-400 mt-2">Fix: {r.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Examples with status badges */}
      <OpsCard>
        <OpsCardHeader title="Exemplos de Extracao" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-4">
            {MIU_EXPLANATION.examples.map((ex, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg space-y-3 ${ex.status === 'rejected'
                  ? 'bg-red-500/10 border border-red-500/30'
                  : 'bg-muted/20'
                  }`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px]">{ex.context}</Badge>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${ex.status === 'validated'
                      ? 'text-emerald-400 border-emerald-400/30'
                      : 'text-red-400 border-red-400/30'
                      }`}
                  >
                    {ex.status}
                  </Badge>
                </div>
                <p
                  className="text-foreground italic border-l-2 pl-3"
                  style={{ borderColor: ex.status === 'rejected' ? '#ef4444' : OPS_ACCENT }}
                >
                  &quot;{ex.verbatim}&quot;
                </p>
                {ex.rejectionReason && (
                  <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                    Motivo da rejeicao: {ex.rejectionReason}
                  </p>
                )}
                <OpsGrid columns={4} className="gap-2 text-xs">
                  <div className="p-2 rounded bg-muted/20">
                    <span className="text-muted-foreground">pronouns:</span>
                    <span className="ml-1" style={{ color: OPS_ACCENT }}>{ex.analysis.pronouns.join(', ') || '-'}</span>
                  </div>
                  <div className="p-2 rounded bg-muted/20">
                    <span className="text-muted-foreground">verbs:</span>
                    <span className="ml-1" style={{ color: OPS_ACCENT }}>{ex.analysis.verbs.join(', ')}</span>
                  </div>
                  <div className="p-2 rounded bg-muted/20">
                    <span className="text-muted-foreground">modal:</span>
                    <span className="ml-1" style={{ color: OPS_ACCENT }}>{ex.analysis.modal.length > 0 ? ex.analysis.modal.join(', ') : '-'}</span>
                  </div>
                  <div className={`p-2 rounded col-span-2 md:col-span-1 ${ex.status === 'rejected' ? 'bg-red-500/10' : 'bg-emerald-500/10'
                    }`}>
                    <span className={ex.status === 'rejected' ? 'text-red-400' : 'text-emerald-400'}>
                      {ex.analysis.pattern}
                    </span>
                  </div>
                </OpsGrid>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Linguistic Markers Deep Dive */}
      <OpsCard>
        <OpsCardHeader title={LINGUISTIC_MARKERS.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-6">{LINGUISTIC_MARKERS.description}</OpsText>

          {/* Pronoun Patterns */}
          <div className="mb-6">
            <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.pronounPatterns.title}</h4>
            <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.pronounPatterns.subtitle}</p>
            <div className="space-y-2">
              {LINGUISTIC_MARKERS.pronounPatterns.patterns.map((p, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-2" style={{ borderColor: OPS_ACCENT }}>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <OpsCode className="text-sm font-mono font-bold" style={{ color: OPS_ACCENT }}>{p.pronoun}</OpsCode>
                    <span className="text-xs text-muted-foreground">- {p.indicates}</span>
                  </div>
                  <p className="text-xs text-foreground italic mb-1">{p.example}</p>
                  <p className="text-xs text-emerald-400">{p.insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Verb Tenses */}
          <div className="mb-6">
            <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.verbTenses.title}</h4>
            <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.verbTenses.subtitle}</p>
            <OpsGrid columns={3}>
              {LINGUISTIC_MARKERS.verbTenses.patterns.map((t, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20">
                  <div className="font-medium text-foreground mb-1">{t.tense}</div>
                  <p className="text-xs text-muted-foreground italic mb-2">{t.example}</p>
                  <p className="text-xs text-muted-foreground mb-1">{t.indicates}</p>
                  <p className="text-xs text-emerald-400">{t.insight}</p>
                </div>
              ))}
            </OpsGrid>
          </div>

          {/* Modal Verbs */}
          <div className="mb-6">
            <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.modalVerbs.title}</h4>
            <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.modalVerbs.subtitle}</p>
            <div className="space-y-2">
              {LINGUISTIC_MARKERS.modalVerbs.patterns.map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 flex flex-col md:flex-row gap-3">
                  <div className="md:w-1/4">
                    <OpsCode className="text-sm font-mono" style={{ color: OPS_ACCENT }}>{m.modal}</OpsCode>
                    <Badge variant="outline" className="ml-2 text-[9px]">{m.category}</Badge>
                  </div>
                  <div className="md:w-1/4">
                    <p className="text-xs text-muted-foreground italic">{m.example}</p>
                  </div>
                  <div className="md:w-2/4">
                    <p className="text-xs text-emerald-400">{m.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Negation Patterns */}
          <div>
            <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.negationPatterns.title}</h4>
            <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.negationPatterns.subtitle}</p>
            <div className="space-y-2">
              {LINGUISTIC_MARKERS.negationPatterns.patterns.map((n, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-2 border-red-500/50">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <OpsCode className="text-sm font-mono text-red-400">{n.pattern}</OpsCode>
                    <span className="text-xs text-muted-foreground">- {n.indicates}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{n.contrast}</p>
                  <p className="text-xs text-emerald-400">{n.insight}</p>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* MIU vs Fragment Comparison */}
      <OpsCard>
        <OpsCardHeader title={MIU_VS_FRAGMENT.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-6">{MIU_VS_FRAGMENT.description}</OpsText>

          {/* Source Text */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border mb-6">
            <p className="text-xs text-muted-foreground uppercase mb-2">Texto Fonte</p>
            <p className="text-foreground italic">{MIU_VS_FRAGMENT.comparisonExample.sourceText}</p>
          </div>

          {/* Side by Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* As MIU */}
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
              <h4 className="text-sm font-bold text-emerald-400 mb-3">{MIU_VS_FRAGMENT.comparisonExample.asMIU.label}</h4>

              <div className="space-y-2 mb-4">
                {Object.entries(MIU_VS_FRAGMENT.comparisonExample.asMIU.data).map(([key, value]) => (
                  <div key={key} className="flex text-xs">
                    <code className="text-muted-foreground w-28 shrink-0">{key}:</code>
                    <span style={{ color: OPS_ACCENT }}>
                      {Array.isArray(value) ? value.join(', ') || '[]' : String(value)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-emerald-500/20 pt-3">
                <p className="text-xs text-emerald-400 font-medium mb-2">Inclui:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {MIU_VS_FRAGMENT.comparisonExample.asMIU.whatsIncluded.map((item, i) => (
                    <li key={i}>+ {item}</li>
                  ))}
                </ul>
                <p className="text-xs text-emerald-400 font-medium mt-3 mb-2">Exclui (importante!):</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {MIU_VS_FRAGMENT.comparisonExample.asMIU.whatsExcluded.map((item, i) => (
                    <li key={i}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* As Fragment */}
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/30">
              <h4 className="text-sm font-bold text-red-400 mb-3">{MIU_VS_FRAGMENT.comparisonExample.asFragment.label}</h4>

              <div className="space-y-2 mb-4">
                {Object.entries(MIU_VS_FRAGMENT.comparisonExample.asFragment.data).map(([key, value]) => (
                  <div key={key} className="flex text-xs">
                    <code className="text-muted-foreground w-28 shrink-0">{key}:</code>
                    <span className="text-red-300">{String(value)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-red-500/20 pt-3">
                <p className="text-xs text-red-400 font-medium mb-2">Inclui:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {MIU_VS_FRAGMENT.comparisonExample.asFragment.whatsIncluded.map((item, i) => (
                    <li key={i}>+ {item}</li>
                  ))}
                </ul>
                <p className="text-xs text-red-400 font-medium mt-3 mb-2">Problemas:</p>
                <ul className="text-xs text-red-300 space-y-1">
                  {MIU_VS_FRAGMENT.comparisonExample.asFragment.problems.map((item, i) => (
                    <li key={i}>! {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Advantages Table */}
          <div className="mb-6">
            <OpsLabel className="mb-3">Comparacao por Aspecto</OpsLabel>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground">Aspecto</th>
                  <th className="text-left py-2 px-3 text-emerald-400">MIU</th>
                  <th className="text-left py-2 px-3 text-red-400">Fragment</th>
                </tr>
              </thead>
              <tbody>
                {MIU_VS_FRAGMENT.advantages.map((row, i) => (
                  <tr key={i} className="border-b border-border/30">
                    <td className="py-2 px-3 text-foreground font-medium">{row.aspect}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.miu}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.fragment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <p className="text-sm text-amber-400">{MIU_VS_FRAGMENT.bottomLine}</p>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Statistics Section */}
      <OpsCard>
        <OpsCardHeader title={MIU_STATISTICS.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-6">{MIU_STATISTICS.description}</OpsText>

          {/* MIUs per Hour */}
          <div className="mb-6">
            <OpsLabel className="mb-3">{MIU_STATISTICS.perHour.title}</OpsLabel>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3" style={{ color: OPS_ACCENT }}>Fonte</th>
                  <th className="text-left py-2 px-3 text-muted-foreground">Media MIUs</th>
                  <th className="text-left py-2 px-3 text-muted-foreground hidden md:table-cell">Observacao</th>
                </tr>
              </thead>
              <tbody>
                {MIU_STATISTICS.perHour.data.map((row, i) => (
                  <tr key={i} className="border-b border-border/30">
                    <td className="py-2 px-3 text-foreground">{row.source}</td>
                    <td className="py-2 px-3 font-mono" style={{ color: OPS_ACCENT }}>{row.avgMIUs}</td>
                    <td className="py-2 px-3 text-muted-foreground hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Validation Rates */}
          <div className="mb-6">
            <OpsLabel className="mb-3">{MIU_STATISTICS.validationRates.title}</OpsLabel>
            <div className="flex flex-wrap gap-4">
              {MIU_STATISTICS.validationRates.data.map((rate, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/20 text-center">
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{
                      color: rate.color === 'green' ? '#22c55e' :
                        rate.color === 'red' ? '#ef4444' : '#eab308'
                    }}
                  >
                    {rate.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{rate.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Patterns */}
          <div className="mb-6">
            <OpsLabel className="mb-3">{MIU_STATISTICS.commonPatterns.title}</OpsLabel>
            <OpsGrid columns={3}>
              {MIU_STATISTICS.commonPatterns.data.map((p, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/20 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{p.pattern}</span>
                  <span className="text-sm font-mono" style={{ color: OPS_ACCENT }}>{p.frequency}</span>
                </div>
              ))}
            </OpsGrid>
          </div>

          {/* Processing Time */}
          <div>
            <OpsLabel className="mb-3">{MIU_STATISTICS.processingTime.title}</OpsLabel>
            <OpsGrid columns={3}>
              <div className="p-3 rounded-lg bg-muted/20 border-l-2 border-blue-500">
                <div className="text-xs text-blue-400 uppercase mb-1">Manual</div>
                <div className="text-sm text-foreground">{MIU_STATISTICS.processingTime.manual}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/20 border-l-2 border-purple-500">
                <div className="text-xs text-purple-400 uppercase mb-1">AI-Assisted</div>
                <div className="text-sm text-foreground">{MIU_STATISTICS.processingTime.assisted}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/20 border-l-2" style={{ borderColor: OPS_ACCENT }}>
                <div className="text-xs uppercase mb-1" style={{ color: OPS_ACCENT }}>Automated</div>
                <div className="text-sm text-foreground">{MIU_STATISTICS.processingTime.automated}</div>
              </div>
            </OpsGrid>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={MIU_DIAGRAM} id="miu" />
        </OpsCardContent>
      </OpsCard>

      <div className="p-4 rounded-xl border-l-4" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
        <p className="text-sm mb-2"><strong>MIU vs Fragment:</strong></p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li><OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>mius</OpsCode> = Zero-inference, apenas observaveis (verbatim, pronomes, verbos)</li>
          <li><OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>fragments</OpsCode> = Legado, mistura observavel com inferencia (campo insight)</li>
        </ul>
        <p className="text-sm mt-3"><strong>Rastreabilidade:</strong> <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>miu_driver_evidence</OpsCode> conecta MIU {'→'} Driver com peso e reasoning</p>
      </div>
    </OpsPage>
  );
};
