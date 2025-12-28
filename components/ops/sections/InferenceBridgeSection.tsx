import React from 'react';
import { Icon } from '../../ui/icon';
import {
    OpsCard,
    OpsCardHeader,
    OpsCardContent,
    OpsSection,
    OpsText,
    OpsCode,
    OpsLabel,
    OpsBadge
} from '../ops-ui';
import { INFERENCE_BRIDGE, LAYER_TAXONOMY } from '../data/inference-bridge-content';

const OPS_PRIMARY = '#00d4ff';

export const InferenceBridgeSection: React.FC = () => {
    return (
        <OpsSection>
            {/* Header */}
            <OpsCard>
                <OpsCardHeader title={INFERENCE_BRIDGE.title} accentColor="text-cyan-400" />
                <OpsCardContent>
                    <OpsText className="text-lg">{INFERENCE_BRIDGE.subtitle}</OpsText>
                    <OpsText className="mt-2 text-muted-foreground">{INFERENCE_BRIDGE.overview.description}</OpsText>
                </OpsCardContent>
            </OpsCard>

            {/* 3-Layer Architecture */}
            <OpsCard>
                <OpsCardHeader title="Arquitetura em 3 Camadas" accentColor="text-muted-foreground" />
                <OpsCardContent>
                    <div className="space-y-6">
                        {INFERENCE_BRIDGE.overview.layers.map((layer, idx) => (
                            <div key={layer.id}>
                                {/* Layer Card */}
                                <div
                                    className="p-6 rounded-lg border-l-4 bg-muted/10"
                                    style={{ borderColor: layer.color }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="p-3 rounded-lg"
                                                style={{ backgroundColor: `${layer.color}20` }}
                                            >
                                                <Icon name={layer.icon} size="size-6" style={{ color: layer.color }} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-lg" style={{ color: layer.color }}>
                                                        {layer.name}
                                                    </h3>
                                                    <OpsBadge className="text-xs">{layer.count} registros</OpsBadge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{layer.subtitle}</p>
                                            </div>
                                        </div>
                                        <OpsCode className="text-xs">{layer.table}</OpsCode>
                                    </div>

                                    <OpsText className="mb-3">{layer.description}</OpsText>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {layer.examples.map((ex, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 rounded font-medium"
                                                style={{
                                                    backgroundColor: `${layer.color}15`,
                                                    color: layer.color
                                                }}
                                            >
                                                {ex}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Icon name="tag" size="size-3" />
                                        <span>Natureza: <span className="font-medium text-foreground">{layer.nature}</span></span>
                                    </div>
                                </div>

                                {/* Arrow between layers */}
                                {idx < INFERENCE_BRIDGE.overview.layers.length - 1 && (
                                    <div className="flex justify-center py-3">
                                        <div className="flex flex-col items-center gap-1">
                                            <Icon name="arrow-down" size="size-5" className="text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {idx === 0 ? 'medidos por' : 'recomendam/habilitam'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </OpsCardContent>
            </OpsCard>

            {/* Inference Flow */}
            <OpsCard>
                <OpsCardHeader title={INFERENCE_BRIDGE.inferenceFlow.title} accentColor="text-muted-foreground" />
                <OpsCardContent>
                    <OpsText className="mb-4">{INFERENCE_BRIDGE.inferenceFlow.description}</OpsText>

                    <div className="space-y-3">
                        {INFERENCE_BRIDGE.inferenceFlow.steps.map((step, idx) => (
                            <div key={step.step} className="flex gap-4">
                                <div
                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                    style={{ backgroundColor: OPS_PRIMARY, color: '#000' }}
                                >
                                    {step.step}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm mb-1" style={{ color: OPS_PRIMARY }}>
                                        {step.title}
                                    </h4>
                                    <OpsText className="text-xs mb-2">{step.description}</OpsText>
                                    <div className="p-2 rounded bg-muted/20 text-xs italic text-muted-foreground">
                                        💡 {step.example}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {step.tables.map((table, i) => (
                                            <OpsCode key={i} className="text-[10px]">{table}</OpsCode>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </OpsCardContent>
            </OpsCard>

            {/* Affinity Types */}
            <OpsCard>
                <OpsCardHeader title={INFERENCE_BRIDGE.affinityTypes.title} accentColor="text-muted-foreground" />
                <OpsCardContent>
                    <OpsText className="mb-4">{INFERENCE_BRIDGE.affinityTypes.description}</OpsText>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {INFERENCE_BRIDGE.affinityTypes.types.map((aff) => (
                            <div
                                key={aff.type}
                                className="p-4 rounded-lg border-l-4 bg-muted/10"
                                style={{ borderColor: aff.color }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon name={aff.icon} size="size-4" style={{ color: aff.color }} />
                                    <OpsCode style={{ color: aff.color }}>{aff.type}</OpsCode>
                                    <span className="text-xs text-muted-foreground">({aff.label})</span>
                                </div>
                                <OpsText className="text-xs mb-2">{aff.description}</OpsText>
                                <div className="p-2 rounded bg-muted/20 mb-2">
                                    <p className="text-xs font-medium" style={{ color: aff.color }}>
                                        {aff.example}
                                    </p>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic">
                                    {aff.rationale}
                                </p>
                            </div>
                        ))}
                    </div>
                </OpsCardContent>
            </OpsCard>

            {/* Real Example */}
            <OpsCard>
                <OpsCardHeader title={INFERENCE_BRIDGE.realExample.title} accentColor="text-muted-foreground" />
                <OpsCardContent>
                    <div className="space-y-6">
                        {/* Profile */}
                        <div>
                            <OpsLabel>1. Perfil Psicométrico</OpsLabel>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                                {INFERENCE_BRIDGE.realExample.profile.mappingResults.map((result, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-muted/20">
                                        <div className="text-xs text-muted-foreground mb-1">{result.system}</div>
                                        <div className="font-bold text-sm">{result.component}</div>
                                        <div className="text-lg font-bold" style={{ color: OPS_PRIMARY }}>
                                            {typeof result.score === 'number' ? `${result.score}/100` : result.score}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inferred Drivers */}
                        <div>
                            <OpsLabel>2. Drivers Inferidos</OpsLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                {INFERENCE_BRIDGE.realExample.inferredDrivers.map((driver, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-muted/20 flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-sm">{driver.driver}</div>
                                            <div className="text-xs text-muted-foreground">{driver.source}</div>
                                        </div>
                                        <div className="text-2xl font-bold" style={{ color: OPS_PRIMARY }}>
                                            {driver.strength}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Tools */}
                        <div>
                            <OpsLabel>3. Tools Recomendadas</OpsLabel>
                            <div className="space-y-3 mt-2">
                                {INFERENCE_BRIDGE.realExample.recommendedTools.map((rec, i) => (
                                    <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_PRIMARY }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-sm">{rec.tool}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">Fit Score:</span>
                                                <span className="text-lg font-bold" style={{ color: OPS_PRIMARY }}>
                                                    {(rec.fitScore * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            {rec.reasons.map((reason, j) => (
                                                <div key={j} className="flex items-start gap-2">
                                                    <Icon
                                                        name={reason.includes('WARNING') ? 'alert-triangle' : 'check'}
                                                        size="size-3"
                                                        className={reason.includes('WARNING') ? 'text-yellow-500' : 'text-green-500'}
                                                    />
                                                    <span className="text-xs text-muted-foreground">{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </OpsCardContent>
            </OpsCard>

            {/* Layer Taxonomies */}
            <OpsCard>
                <OpsCardHeader title={LAYER_TAXONOMY.title} accentColor="text-muted-foreground" />
                <OpsCardContent>
                    <OpsText className="mb-4">{LAYER_TAXONOMY.description}</OpsText>

                    <div className="space-y-4">
                        {LAYER_TAXONOMY.taxonomies.map((tax, idx) => (
                            <div key={idx} className="p-4 rounded-lg bg-muted/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <h4 className="font-bold text-sm" style={{ color: OPS_PRIMARY }}>{tax.layer}</h4>
                                    <span className="text-xs text-muted-foreground">→</span>
                                    <span className="text-xs text-muted-foreground">{tax.taxonomy}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {tax.categories.map((cat, i) => (
                                        <div key={i} className="p-2 rounded bg-muted/20">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold">{cat.name}</span>
                                                {(cat as any).count && <OpsBadge className="text-[10px]">{(cat as any).count}</OpsBadge>}
                                            </div>
                                            <p className="text-[10px] text-muted-foreground">{cat.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </OpsCardContent>
            </OpsCard>

            {/* Technical Details */}
            <OpsCard>
                <OpsCardHeader title={INFERENCE_BRIDGE.technicalDetails.title} accentColor="text-muted-foreground" />
                <OpsCardContent>
                    <div className="space-y-4">
                        <div>
                            <OpsLabel>{INFERENCE_BRIDGE.technicalDetails.algorithm.name}</OpsLabel>
                            <OpsText className="text-xs mb-2">{INFERENCE_BRIDGE.technicalDetails.algorithm.description}</OpsText>
                            <div className="p-3 rounded bg-muted/20 font-mono text-xs" style={{ color: OPS_PRIMARY }}>
                                {INFERENCE_BRIDGE.technicalDetails.algorithm.formula}
                            </div>
                        </div>

                        <div>
                            <OpsLabel>Passos do Algoritmo</OpsLabel>
                            <ol className="space-y-1 mt-2">
                                {INFERENCE_BRIDGE.technicalDetails.algorithm.steps.map((step, i) => (
                                    <li key={i} className="text-xs text-muted-foreground">{step}</li>
                                ))}
                            </ol>
                        </div>

                        <div>
                            <OpsLabel>Exemplo SQL</OpsLabel>
                            <pre className="p-3 rounded bg-black/50 text-xs overflow-x-auto mt-2">
                                <code className="text-green-400">{INFERENCE_BRIDGE.technicalDetails.sqlExample}</code>
                            </pre>
                        </div>
                    </div>
                </OpsCardContent>
            </OpsCard>
        </OpsSection>
    );
};
