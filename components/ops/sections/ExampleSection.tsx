import React from 'react';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { PhaseBadge } from '../components/PhaseBadge';
import { SEQUENCE_DIAGRAM } from '../data/diagrams';
import { EXAMPLE_PIPELINE, EXAMPLE_MIUS, EXAMPLE_TOOLS } from '../data/example-content';
import { OPS_ACCENT } from '../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsSection
} from '../ops-ui';

export const ExampleSection: React.FC = () => {
  return (
    <OpsSection>
      <div className="p-4 rounded-xl" style={{ backgroundColor: `${OPS_ACCENT}10`, borderLeft: `4px solid ${OPS_ACCENT}` }}>
        <h3 className="font-bold mb-2" style={{ color: OPS_ACCENT }}>Caso: Maria Silva - Gestora de Projetos</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          10 reunioes gravadas <Icon name="arrow-right" size="size-3" /> 847 MIUs <Icon name="arrow-right" size="size-3" /> 23 drivers <Icon name="arrow-right" size="size-3" /> 15 tools recomendados
        </p>
      </div>

      {/* Pipeline Steps */}
      <OpsCard>
        <OpsCardHeader title="Fluxo Completo" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-3">
            {EXAMPLE_PIPELINE.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/20">
                <PhaseBadge phase={step.phase} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{step.input}</span>
                    <Icon name="arrow-right" size="size-3" style={{ color: OPS_ACCENT }} />
                    <span className="font-medium">{step.output}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Sample MIUs */}
      <OpsCard>
        <OpsCardHeader title="Amostra de MIUs Extraidos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-3">
            {EXAMPLE_MIUS.map((miu, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20">
                <OpsText className="text-sm italic text-foreground">"{miu.verbatim}"</OpsText>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-[10px]">pronouns: {miu.pronouns.join(', ')}</Badge>
                  <Badge variant="outline" className="text-[10px]">verbs: {miu.verbs.join(', ')}</Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">{miu.driver} ({miu.strength}/10)</Badge>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Recommended Tools */}
      <OpsCard>
        <OpsCardHeader title="Tools Recomendados (Top 4)" accentColor="text-muted-foreground" />
        <OpsCardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tool</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tipo</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Fit</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Razao</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_TOOLS.map((tool, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium" style={{ color: OPS_ACCENT }}>{tool.tool}</td>
                  <td className="py-3 px-4"><Badge variant="outline" className="text-[10px]">{tool.type}</Badge></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${tool.fit * 100}%` }} />
                      </div>
                      <span className="font-mono text-xs">{(tool.fit * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">{tool.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </OpsCardContent>
      </OpsCard>

      {/* Recommendation Query Flow */}
      <OpsCard>
        <OpsCardHeader title="Query Flow - Recommendation Engine" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={SEQUENCE_DIAGRAM} id="sequence" />
        </OpsCardContent>
      </OpsCard>
    </OpsSection>
  );
};
