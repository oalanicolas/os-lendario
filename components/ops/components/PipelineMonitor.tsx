import React from 'react';
import { useJobExecutions, JobExecution } from '../../../hooks/useJobExecutions';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsCode, OpsBadge, OpsProgressBar } from '../ops-ui';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { OPS_ACCENT } from '../ops-tokens';

export const PipelineMonitor: React.FC = () => {
    const { jobs, loading, error } = useJobExecutions(15);

    if (loading && jobs.length === 0) {
        return (
            <OpsCard>
                <OpsCardContent className="py-12 text-center text-muted-foreground animate-pulse">
                    <Icon name="activity" className="animate-spin mb-2 mx-auto" size="size-6" />
                    <p>Connecting to ETL Pipeline...</p>
                </OpsCardContent>
            </OpsCard>
        );
    }

    if (error && jobs.length === 0) {
        return (
            <OpsCard accentColor="#ef4444" variant="highlight">
                <OpsCardHeader title="Pipeline Error" accentColor="#ef4444" />
                <OpsCardContent>
                    <p className="text-red-400">Failed to connect to job_executions stream.</p>
                    <OpsCode className="text-xs bg-red-500/10 text-red-300 border-red-500/20 mt-2">
                        {error.message}
                    </OpsCode>
                </OpsCardContent>
            </OpsCard>
        );
    }

    const successRate = jobs.length > 0
        ? (jobs.filter(j => j.status === 'completed').length / jobs.length) * 100
        : 0;

    const avgLatency = jobs.length > 0
        ? jobs.reduce((acc, j) => acc + (j.latency_ms || 0), 0) / jobs.length
        : 0;

    const totalCost = jobs.reduce((acc, j) => acc + (j.cost_usd || 0), 0);

    return (
        <div className="space-y-6">
            {/* Live Stats Row */}
            <OpsGrid columns={4}>
                <OpsCard className="bg-emerald-500/5 border-emerald-500/10">
                    <OpsCardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Success Rate</span>
                            <Icon name="check-circle" className="text-emerald-500" size="size-4" />
                        </div>
                        <div className="text-2xl font-bold text-emerald-500">{successRate.toFixed(1)}%</div>
                        <OpsProgressBar value={successRate} color="#10b981" className="h-1 mt-3" />
                    </OpsCardContent>
                </OpsCard>

                <OpsCard className="bg-blue-500/5 border-blue-500/10">
                    <OpsCardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Avg Latency</span>
                            <Icon name="clock" className="text-blue-500" size="size-4" />
                        </div>
                        <div className="text-2xl font-bold text-blue-500">{(avgLatency / 1000).toFixed(2)}s</div>
                        <div className="text-[10px] text-muted-foreground mt-2">p95 optimization active</div>
                    </OpsCardContent>
                </OpsCard>

                <OpsCard className="bg-primary/5 border-primary/10">
                    <OpsCardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Session Cost</span>
                            <Icon name="dollar-sign" className="text-primary" size="size-4" />
                        </div>
                        <div className="text-2xl font-bold text-primary">${totalCost.toFixed(4)}</div>
                        <div className="text-[10px] text-muted-foreground mt-2">Last {jobs.length} executions</div>
                    </OpsCardContent>
                </OpsCard>

                <OpsCard className="relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2">
                        <div className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                    </div>
                    <OpsCardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pipeline Heartbeat</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">LIVE</div>
                        <div className="text-[10px] text-emerald-500 font-medium mt-2 flex items-center gap-1">
                            <Icon name="zap" size="size-3" />
                            Receiving real-time pulse
                        </div>
                    </OpsCardContent>
                </OpsCard>
            </OpsGrid>

            {/* Jobs Log Table */}
            <OpsCard>
                <OpsCardHeader
                    title="Real-time Execution Log"
                    accentColor={OPS_ACCENT}
                >
                    <div className="flex items-center gap-2">
                        <OpsBadge variant="outline" className="text-[10px]">
                            {jobs.length} events
                        </OpsBadge>
                    </div>
                </OpsCardHeader>
                <OpsCardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/20">
                                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Job Name</th>
                                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Model</th>
                                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Cost</th>
                                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Latency</th>
                                    <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id} className="border-b border-border/10 hover:bg-muted/10 transition-colors group">
                                        <td className="py-3 px-4 font-bold font-mono text-[11px] text-foreground">
                                            {job.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            <OpsBadge
                                                className={cn(
                                                    "text-[10px] px-2 py-0.5",
                                                    job.status === 'completed' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                                    job.status === 'processing' && "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse",
                                                    job.status === 'failed' && "bg-red-500/10 text-red-500 border-red-500/20",
                                                    job.status === 'queued' && "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                                )}
                                            >
                                                {job.status}
                                            </OpsBadge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-foreground font-medium">{job.llm_model}</span>
                                                <span className="text-[9px] text-muted-foreground uppercase">{job.llm_provider}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 font-mono text-[10px]">
                                            ${job.cost_usd?.toFixed(4) || '0.0000'}
                                        </td>
                                        <td className="py-3 px-4 font-mono text-[10px]">
                                            {((job.latency_ms || 0) / 1000).toFixed(2)}s
                                        </td>
                                        <td className="py-3 px-4 text-[10px] text-muted-foreground">
                                            {new Date(job.created_at).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </OpsCardContent>
            </OpsCard>
        </div>
    );
};
