import React, { useState } from 'react';
import { useSchema, SchemaTable } from '../../../hooks/useSchema';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsCode, OpsLabel, OpsText } from '../ops-ui';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { MermaidDiagram } from './MermaidDiagram';
import { OPS_ACCENT } from '../ops-tokens';
export const SchemaBrowser: React.FC = () => {
    const { tables, enums, metadata, loading, error } = useSchema();
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [showGraph, setShowGraph] = useState(false);

    React.useEffect(() => {
        if (tables.length > 0 && !selectedTable) {
            setSelectedTable(tables[0].table_name);
        }
    }, [tables, selectedTable]);

    if (loading) {
        return (
            <OpsCard>
                <OpsCardContent className="py-12 text-center text-muted-foreground animate-pulse">
                    <Icon name="loader" className="animate-spin mb-2 mx-auto" size="size-6" />
                    <p>Analyzing Database Schema...</p>
                </OpsCardContent>
            </OpsCard>
        );
    }

    if (error) {
        return (
            <OpsCard accentColor="#ef4444" variant="highlight">
                <OpsCardHeader title="Schema Error" accentColor="#ef4444" />
                <OpsCardContent>
                    <p className="text-red-400 mb-2">Failed to load live schema.</p>
                    <OpsCode className="text-xs bg-red-500/10 text-red-300 border-red-500/20">
                        {error.message}
                    </OpsCode>
                    <p className="text-xs text-muted-foreground mt-4">
                        Ensure the <OpsCode>get_db_schema_overview</OpsCode> migration has been applied.
                    </p>
                </OpsCardContent>
            </OpsCard>
        );
    }

    const activeTable = tables.find(t => t.table_name === selectedTable);

    // Generate Mermaid Dependency Diagram
    const generateDependencyGraph = () => {
        let chart = "flowchart TD\n";
        chart += "  classDef tableNode fill:hsl(var(--card)),stroke:hsl(var(--border)),color:hsl(var(--foreground)),stroke-width:1px,rx:10,ry:10\n";
        chart += "  classDef highlightedNode fill:hsl(var(--primary)/0.1),stroke:hsl(var(--primary)),color:hsl(var(--primary)),stroke-width:2px\n\n";

        tables.forEach(t => {
            const isSelected = t.table_name === selectedTable;
            chart += `  ${t.table_name}["${t.table_name}"]\n`;
            if (isSelected) {
                chart += `  class ${t.table_name} highlightedNode\n`;
            } else {
                chart += `  class ${t.table_name} tableNode\n`;
            }

            t.columns.forEach(col => {
                if (col.foreign_key) {
                    chart += `  ${t.table_name} --> ${col.foreign_key.table}\n`;
                }
            });
        });

        return chart;
    };

    return (
        <div className="space-y-6">
            {/* System Status Banner */}
            {metadata && (
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-background border border-border/20 shadow-sm animate-in fade-in duration-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full animate-pulse", metadata.is_healthy ? "bg-emerald-500" : "bg-red-500")} />
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">System Live</span>
                        </div>
                        <div className="h-4 w-px bg-border/40 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Migration:</span>
                            <OpsCode className="text-[10px] bg-primary/5 text-primary border-primary/20">{metadata.migration_version}</OpsCode>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground">Last Inspected: {new Date(metadata.last_inspected_at).toLocaleTimeString()}</span>
                        <Badge variant="outline" className="text-[9px] bg-muted/30">DB: {metadata.database_name}</Badge>
                    </div>
                </div>
            )}
            {/* Enums Visualizer */}
            {Object.keys(enums).length > 0 && (
                <OpsCard className="border-dashed bg-muted/5">
                    <OpsCardHeader title="Dicionário de Enums" />
                    <OpsCardContent>
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(enums).map(([name, values]) => (
                                <div key={name} className="flex flex-col gap-1.5 p-3 rounded-lg bg-background border border-border/20 shadow-sm min-w-[200px]">
                                    <div className="flex items-center justify-between">
                                        <OpsCode className="text-xs text-primary">{name}</OpsCode>
                                        <Badge variant="outline" className="text-[10px]">{values.length} opções</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {values.map(val => (
                                            <span key={val} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground border border-border/10">
                                                {val}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </OpsCardContent>
                </OpsCard>
            )}
            {/* Dependency Graph Toggle */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowGraph(!showGraph)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border shadow-sm",
                        showGraph
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:bg-muted/10"
                    )}
                >
                    <Icon name={showGraph ? "eye-closed" : "eye"} size="size-4" />
                    {showGraph ? "Esconder Grafo de Dependências" : "Visualizar Grafo de Dependências"}
                </button>
            </div>

            {showGraph && (
                <OpsCard className="animate-in fade-in slide-in-from-top-2">
                    <OpsCardHeader title="Grafo de Relacionamentos (Live)" />
                    <OpsCardContent className="h-[500px] overflow-hidden">
                        <MermaidDiagram chart={generateDependencyGraph()} id="dependency-graph-live" />
                    </OpsCardContent>
                </OpsCard>
            )}

            {/* Table Selector */}
            <div className="flex flex-wrap gap-2">
                {tables.map(t => (
                    <button
                        key={t.table_name}
                        onClick={() => setSelectedTable(t.table_name)}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-2",
                            selectedTable === t.table_name
                                ? "bg-primary/10 text-primary border-primary"
                                : "bg-muted/30 text-muted-foreground border-transparent hover:border-border"
                        )}
                        style={selectedTable === t.table_name ? { borderColor: OPS_ACCENT, color: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}15` } : {}}
                    >
                        {t.table_name}
                        <span className="opacity-50 text-[10px] bg-black/10 px-1 rounded">{t.estimated_rows}</span>
                    </button>
                ))}
            </div>

            {
                activeTable && (
                    <OpsCard className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <OpsCardHeader
                            title={activeTable.table_name}
                            accentColor={OPS_ACCENT}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground normal-case font-normal mr-2">
                                    {activeTable.description || "No description"}
                                </span>
                                <Badge variant="outline" className="font-mono text-[10px] gap-1">
                                    {activeTable.columns.length} columns
                                </Badge>
                                <Badge variant="outline" className="font-mono text-[10px] gap-1">
                                    ~{activeTable.estimated_rows} rows
                                </Badge>
                            </div>
                        </OpsCardHeader>
                        <OpsCardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border/40 bg-muted/20">
                                            <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase w-10">#</th>
                                            <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Column</th>
                                            <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Type</th>
                                            <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Attributes</th>
                                            <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground uppercase">Default</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeTable.columns.map((col, i) => (
                                            <tr key={col.name} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                                                <td className="py-3 px-4 text-xs text-muted-foreground/50">{i + 1}</td>
                                                <td className="py-3 px-4 font-bold font-mono text-xs">{col.name}</td>
                                                <td className="py-3 px-4">
                                                    <OpsCode
                                                        className={cn(
                                                            "text-[10px] border-border/30",
                                                            enums[col.type] ? "text-primary bg-primary/5 border-primary/20" : "text-muted-foreground"
                                                        )}
                                                    >
                                                        {col.type}
                                                    </OpsCode>
                                                    {enums[col.type] && (
                                                        <div className="text-[9px] text-muted-foreground mt-1 italic">
                                                            Enum values available
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-1.5 flex-wrap">
                                                        {col.is_pkey && (
                                                            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[9px] px-1.5 h-5 hover:bg-amber-500/20">PK</Badge>
                                                        )}
                                                        {col.foreign_key && (
                                                            <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded px-1.5 h-5 text-[9px]">
                                                                <span>FK</span>
                                                                <Icon name="arrow-right" size="size-2" />
                                                                <span className="font-mono">{col.foreign_key.table}</span>
                                                            </div>
                                                        )}
                                                        {col.is_nullable ? (
                                                            <span className="text-[9px] text-muted-foreground/50 px-1">null</span>
                                                        ) : (
                                                            <span className="text-[9px] text-muted-foreground/70 px-1 font-medium">not null</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-xs text-muted-foreground font-mono truncate max-w-[150px]" title={col.default || ''}>
                                                    {col.default || '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </OpsCardContent>
                    </OpsCard>
                )
            }
        </div >
    );
};
