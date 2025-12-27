import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';
import { PSYCHOMETRIC_DOMAINS } from '../data/assessment-systems-content';
import { useOpsStats } from '../../../hooks/useOpsStats';
import {
    OpsPage,
    OpsSection,
    OpsCard,
    OpsCardHeader,
    OpsCardContent,
    OpsGrid,
    OpsText,
    OpsCode,
    OpsLabel,
    OpsBadge
} from '../ops-ui';

export const AssessmentSystemsSection: React.FC = () => {
    const { stats, loading } = useOpsStats();

    // Database reality metrics
    const dbMetrics = {
        systems: stats.systems,
        components: stats.systemComponents,
        drivers: stats.drivers,
        mappings: stats.compMaps,
        coverage: stats.compMaps > 0 && stats.systemComponents > 0
            ? Math.round((stats.compMaps / stats.systemComponents) * 100)
            : 0
    };

    return (
        <OpsPage>
            {/* Database Reality Card */}
            <OpsCard className="border-primary/20 bg-primary/5">
                <OpsCardContent className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Icon name="database" size="size-4" className="text-primary" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Database Reality</span>
                        </div>
                        <div className="flex flex-wrap gap-6 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Systems:</span>
                                <span className="font-mono font-bold text-foreground">{loading ? '...' : dbMetrics.systems}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Components:</span>
                                <span className="font-mono font-bold text-foreground">{loading ? '...' : dbMetrics.components}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Drivers:</span>
                                <span className="font-mono font-bold text-foreground">{loading ? '...' : dbMetrics.drivers}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Mapped:</span>
                                <span className={cn(
                                    "font-mono font-bold",
                                    dbMetrics.coverage >= 50 ? "text-green-500" : dbMetrics.coverage >= 25 ? "text-yellow-500" : "text-red-400"
                                )}>
                                    {loading ? '...' : `${dbMetrics.mappings} (${dbMetrics.coverage}%)`}
                                </span>
                            </div>
                        </div>
                    </div>
                </OpsCardContent>
            </OpsCard>

            <OpsCard>
                <OpsCardHeader title="Assessment Systems: Psychometric Domains" />
                <OpsCardContent>
                    <OpsText className="leading-relaxed md:text-base max-w-4xl text-muted-foreground">
                        Mapping Systems are psychometric instruments that measure internal psychological states.
                        They are organized into six domains based on their theoretical origin and what aspect of
                        the person they measure. Each domain produces components that map to conceptual drivers.
                    </OpsText>
                </OpsCardContent>
            </OpsCard>

            <OpsGrid columns={2} className="md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PSYCHOMETRIC_DOMAINS.map((tier) => (
                    <div
                        key={tier.tier}
                        className="flex flex-col h-full rounded-xl bg-card border border-border/40 overflow-hidden shadow-lg transition-all hover:border-border/80 hover:bg-muted/5 group"
                    >
                        {/* Tier Header */}
                        <div className="p-5 border-b border-border/20 bg-muted/10">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                                        Tier 0{tier.tier}
                                    </span>
                                    <OpsBadge
                                        variant={tier.role === 'Analyzer' ? 'info' : tier.role === 'Synthesizer' ? 'success' : 'warning'}
                                        className="text-[8px] h-4"
                                    >
                                        {tier.role}
                                    </OpsBadge>
                                </div>
                                <span
                                    className="font-mono text-xl font-black text-foreground/20 group-hover:text-foreground/40 transition-colors"
                                >
                                    0{tier.tier}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold leading-tight" style={{ color: tier.color }}>
                                {tier.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <div className="p-5 flex-1 flex flex-col space-y-6">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {tier.description}
                            </p>

                            <div className="space-y-3">
                                <OpsLabel className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider block">
                                    Assessment Systems
                                </OpsLabel>
                                <div className="flex flex-wrap gap-2">
                                    {tier.artifacts.map((artifact, i) => (
                                        <OpsCode
                                            key={i}
                                            className="text-[10px] px-2 py-1 rounded-md bg-muted/20 border border-white/5 transition-colors group-hover:border-white/10"
                                            style={{ color: tier.color }}
                                        >
                                            {artifact}
                                        </OpsCode>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <OpsLabel className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider block">
                                    {tier.role === 'Synthesizer' ? 'Matched by Drivers' : 'Populates Drivers'}
                                </OpsLabel>
                                <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-muted-foreground/80 lowercase italic">
                                    {tier.driverExamples.map((driver, i) => (
                                        <span key={i} className="after:content-[','] last:after:content-['']">
                                            {driver}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Accent Footer */}
                        <div className="h-1 w-full opacity-50 transition-opacity group-hover:opacity-100" style={{ backgroundColor: tier.color }} />
                    </div>
                ))}
            </OpsGrid>

            {/* Inference Bridge Section */}
            <OpsSection className="mt-12 pt-12 border-t border-border/40">
                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                    <h2 className="text-xl font-bold italic tracking-wider uppercase text-primary">The Inference Bridge</h2>
                    <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                        Conceptual Drivers are the universal language of the MMOS engine.
                        They act as the transition layer between psychometric measurements and cognitive application.
                    </p>
                </div>

                <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-0">
                    {/* Input Side */}
                    <div className="flex-1 p-6 rounded-l-xl bg-muted/10 border border-border/20 border-r-0 relative group hover:bg-muted/20 transition-all">
                        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-background/20 hidden md:block"></div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Phase 1: Measurement</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                    <Icon name="chart-pie" size="size-4" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] font-bold">Analyzers (Tiers 1-5)</div>
                                    <div className="text-[9px] text-muted-foreground">Extract raw scores from mental artifacts</div>
                                </div>
                            </div>
                            <div className="p-3 rounded bg-background/40 border border-border/10">
                                <OpsCode className="text-[9px] block mb-1">Big Five: Conscientiousness = 0.85</OpsCode>
                                <OpsCode className="text-[9px] block">Kolbe: Fact Finder = High</OpsCode>
                            </div>
                        </div>
                    </div>

                    {/* The Bridge (Drivers) */}
                    <div className="z-10 w-full md:w-80 p-8 bg-card border-x-2 border-primary/40 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 ring-1 ring-primary/20">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground animate-pulse">
                            <Icon name="bolt" size="size-6" className="text-primary" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Conceptual Drivers</h4>
                            <p className="text-[10px] text-muted-foreground mt-2 italic font-serif">"The Core Language"</p>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-[9px] font-mono text-primary/80">Analytical_Thinking</span>
                            <span className="text-[9px] font-mono text-primary/80">Need_for_Closure</span>
                            <span className="text-[9px] font-mono text-primary/80">Risk_Appetite</span>
                        </div>
                    </div>

                    {/* Output Side */}
                    <div className="flex-1 p-6 rounded-r-xl bg-muted/10 border border-border/20 border-l-0 relative group hover:bg-muted/20 transition-all text-right">
                        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-background/20 hidden md:block"></div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Phase 2: Synthesis</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 justify-end">
                                <div className="text-right">
                                    <div className="text-[10px] font-bold">Synthesizers (Tier 6)</div>
                                    <div className="text-[9px] text-muted-foreground">Match best artifacts to driver profile</div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                    <Icon name="sparkles" size="size-4" />
                                </div>
                            </div>
                            <div className="p-3 rounded bg-background/40 border border-border/10">
                                <OpsCode className="text-[9px] block mb-1">Recommended: Stoic Physics</OpsCode>
                                <OpsCode className="text-[9px] block">Recommended: OODA Loop</OpsCode>
                            </div>
                        </div>
                    </div>
                </div>
            </OpsSection>

            <OpsCard className="border-dashed border-primary/20 bg-primary/5">
                <OpsCardContent className="flex items-center justify-center py-10">
                    <div className="text-center space-y-2 max-w-md">
                        <h4 className="text-sm font-bold text-primary italic uppercase tracking-widest">Cross-Tier Inference</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            The database mapping logic allows for traits from Tier 1 (e.g., Big Five Openness) to be
                            projected onto Tier 6 lenses (e.g., Stoic Barbell Approach) through validated conceptual drivers.
                        </p>
                    </div>
                </OpsCardContent>
            </OpsCard>
        </OpsPage>
    );
};
