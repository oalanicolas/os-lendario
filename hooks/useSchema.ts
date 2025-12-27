import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SchemaColumn {
    name: string;
    type: string;
    is_nullable: boolean;
    default: string | null;
    is_pkey: boolean;
    foreign_key: {
        table: string;
        column: string;
    } | null;
}

export interface SchemaTable {
    table_name: string;
    description: string | null;
    estimated_rows: number;
    columns: SchemaColumn[];
}

export interface DbMetadata {
    migration_version: string;
    last_inspected_at: string;
    is_healthy: boolean;
    database_name: string;
}

export interface DbPolicy {
    policy_name: string;
    table_name: string;
    command: string;
    roles: string;
    using_expression: string | null;
    with_check_expression: string | null;
    is_enabled: boolean;
}

interface UseSchemaResult {
    tables: SchemaTable[];
    enums: Record<string, string[]>;
    policies: DbPolicy[];
    metadata: DbMetadata | null;
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}

export function useSchema(): UseSchemaResult {
    const [tables, setTables] = useState<SchemaTable[]>([]);
    const [enums, setEnums] = useState<Record<string, string[]>>({});
    const [policies, setPolicies] = useState<DbPolicy[]>([]);
    const [metadata, setMetadata] = useState<DbMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSchema = async () => {
        try {
            setLoading(true);

            // Parallel fetch
            const [schemaRes, enumRes, metaRes, policyRes] = await Promise.all([
                supabase.rpc('get_db_schema_overview'),
                supabase.rpc('get_db_enums'),
                supabase.rpc('get_db_metadata'),
                supabase.rpc('get_db_policies')
            ]);

            if (schemaRes.error) throw schemaRes.error;

            setTables((schemaRes.data as SchemaTable[]) || []);
            setEnums((enumRes.data as Record<string, string[]>) || {});
            setMetadata((metaRes.data as DbMetadata) || null);
            setPolicies((policyRes.data as DbPolicy[]) || []);
        } catch (err) {
            console.error('Failed to fetch schema metadata:', err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchema();
    }, []);

    return {
        tables,
        enums,
        policies,
        metadata,
        loading,
        error,
        refresh: fetchSchema
    };
}
