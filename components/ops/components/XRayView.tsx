import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsCode, OpsLabel, OpsText, OpsBadge } from '../ops-ui';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { OPS_ACCENT } from '../ops-tokens';

interface XRayResult {
    found: boolean;
    table_name?: string;
    data?: any;
}

export const XRayView: React.FC = () => {
    const [targetId, setTargetId] = useState('');
    const [result, setResult] = useState<XRayResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetId.trim()) return;

        // Simple UUID validation
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(targetId.trim())) {
            setError('Identificador inválido. Use um formato UUID (ex: 550e8400-e29b-41d4-a716-446655440000).');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const { data, error: rpcError } = await (supabase as any).rpc('inspect_record', { target_id: targetId.trim() });

            if (rpcError) throw rpcError;

            setResult(data as XRayResult);
        } catch (err: any) {
            console.error('X-Ray search failed:', err);
            setError(err.message || 'Busca falhou. Verifique se a migração inspect_record foi aplicada.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <OpsCard className="bg-primary/5 border-dashed border-primary/30">
                <OpsCardContent className="p-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <OpsLabel className="text-primary font-bold">X-Ray Discovery</OpsLabel>
                            <OpsText className="text-xs text-muted-foreground">Cole um UUID para localizar o registro em qualquer tabela do sistema.</OpsText>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                                <input
                                    type="text"
                                    value={targetId}
                                    onChange={(e) => setTargetId(e.target.value)}
                                    placeholder="UUID do registro..."
                                    className="w-full bg-background border border-border/50 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading ? <Icon name="loader" className="animate-spin" size="size-4" /> : <Icon name="zap" size="size-4" />}
                                Inspect
                            </button>
                        </div>
                        {error && (
                            <div className="text-[10px] text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                                {error}
                            </div>
                        )}
                    </form>
                </OpsCardContent>
            </OpsCard>

            {result && result.found && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <OpsCard accentColor={OPS_ACCENT} variant="highlight">
                        <OpsCardHeader title={`Registro Encontrado: ${result.table_name}`}>
                            <div className="flex items-center gap-2">
                                <OpsBadge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">MATCH</OpsBadge>
                            </div>
                        </OpsCardHeader>
                        <OpsCardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <OpsLabel>Metadados do Registro</OpsLabel>
                                    <div className="space-y-2">
                                        {Object.entries(result.data).map(([key, value]) => {
                                            if (typeof value === 'object' || Array.isArray(value)) return null;
                                            return (
                                                <div key={key} className="flex flex-col gap-1 border-l-2 border-muted pl-3 py-1">
                                                    <span className="text-[10px] font-bold uppercase text-muted-foreground">{key}</span>
                                                    <span className="text-sm font-mono break-all">{String(value)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <OpsLabel>Estrutura Completa (JSON)</OpsLabel>
                                    <OpsCode className="text-[11px] p-4 max-h-[400px] overflow-auto block leading-relaxed whitespace-pre font-mono">
                                        {JSON.stringify(result.data, null, 2)}
                                    </OpsCode>
                                </div>
                            </div>
                        </OpsCardContent>
                    </OpsCard>
                </div>
            )}

            {result && !result.found && !loading && (
                <div className="p-12 text-center border-2 border-dashed border-border/20 rounded-xl animate-in fade-in">
                    <Icon name="search" className="size-12 mx-auto text-muted-foreground/20 mb-4" />
                    <OpsText className="text-muted-foreground">Nenhum registro encontrado para este ID nas tabelas mapeadas.</OpsText>
                </div>
            )}
        </div>
    );
};
