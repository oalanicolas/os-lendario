import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface JobExecution {
    id: string;
    name: string;
    status: 'queued' | 'processing' | 'completed' | 'failed' | 'timeout' | 'cancelled';
    llm_provider: string;
    llm_model: string;
    tokens_prompt: number;
    tokens_completion: number;
    cost_usd: number;
    latency_ms: number;
    result: any;
    error: string | null;
    executed_at: string;
    created_at: string;
}

interface UseJobExecutionsResult {
    jobs: JobExecution[];
    loading: boolean;
    error: Error | null;
}

export function useJobExecutions(limit: number = 20): UseJobExecutionsResult {
    const [jobs, setJobs] = useState<JobExecution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchInitialJobs = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('job_executions')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(limit);

                if (fetchError) throw fetchError;
                if (isMounted) setJobs(data || []);
            } catch (err) {
                console.error('Error fetching job executions:', err);
                if (isMounted) setError(err as Error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchInitialJobs();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('job_executions_realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'job_executions'
                },
                (payload) => {
                    if (!isMounted) return;

                    setJobs((currentJobs) => {
                        if (payload.eventType === 'INSERT') {
                            return [payload.new as JobExecution, ...currentJobs].slice(0, limit);
                        } else if (payload.eventType === 'UPDATE') {
                            return currentJobs.map((job) =>
                                job.id === payload.new.id ? (payload.new as JobExecution) : job
                            );
                        } else if (payload.eventType === 'DELETE') {
                            return currentJobs.filter((job) => job.id !== payload.old.id);
                        }
                        return currentJobs;
                    });
                }
            )
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, [limit]);

    return { jobs, loading, error };
}
