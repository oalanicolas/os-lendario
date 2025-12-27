import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type TableStatus = 'ok' | 'partial' | 'empty' | 'proposed';

export interface TableCount {
  table: string;
  count: number;
  status: TableStatus;
}

interface UseTableCountsResult {
  counts: Record<string, TableCount>;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Tables that don't exist yet (proposed)
const PROPOSED_TABLES = ['miu_driver_evidence', 'miu_component_evidence'];

// Thresholds for determining status
const PARTIAL_THRESHOLD = 50; // Less than 50 records = partial

/**
 * Hook to fetch dynamic table counts from Supabase
 * @param tableNames - Array of table names to fetch counts for
 * @returns Object with counts, loading state, error, and refetch function
 */
export function useTableCounts(tableNames: string[]): UseTableCountsResult {
  const [counts, setCounts] = useState<Record<string, TableCount>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Initialize with proposed tables
    const initialCounts: Record<string, TableCount> = {};
    tableNames.forEach(table => {
      if (PROPOSED_TABLES.includes(table)) {
        initialCounts[table] = { table, count: 0, status: 'proposed' };
      }
    });

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - table counts unavailable');
      tableNames.forEach(table => {
        if (!initialCounts[table]) {
          initialCounts[table] = { table, count: 0, status: 'empty' };
        }
      });
      setCounts(initialCounts);
      setLoading(false);
      return;
    }

    try {
      // Filter out proposed tables (they don't exist in DB)
      const existingTables = tableNames.filter(t => !PROPOSED_TABLES.includes(t));

      // Fetch all counts in parallel
      const results = await Promise.all(
        existingTables.map(async (tableName) => {
          try {
            const { count, error: queryError } = await supabase
              .from(tableName as never)
              .select('*', { count: 'exact', head: true });

            if (queryError) {
              console.warn(`Error fetching count for ${tableName}:`, queryError.message);
              return { table: tableName, count: 0, status: 'empty' as TableStatus };
            }

            const actualCount = count ?? 0;
            let status: TableStatus = 'ok';

            if (actualCount === 0) {
              status = 'empty';
            } else if (actualCount < PARTIAL_THRESHOLD) {
              status = 'partial';
            }

            return { table: tableName, count: actualCount, status };
          } catch (err) {
            console.warn(`Exception fetching count for ${tableName}:`, err);
            return { table: tableName, count: 0, status: 'empty' as TableStatus };
          }
        })
      );

      // Combine results with initial counts
      const finalCounts = { ...initialCounts };
      results.forEach(result => {
        finalCounts[result.table] = result;
      });

      setCounts(finalCounts);
    } catch (err) {
      console.error('Error fetching table counts:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [tableNames.join(',')]); // Dependency on joined string to avoid array reference issues

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return {
    counts,
    loading,
    error,
    refetch: fetchCounts,
  };
}

export default useTableCounts;
