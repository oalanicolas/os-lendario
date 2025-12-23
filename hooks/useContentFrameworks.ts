import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface FrameworkStep {
  name: string;
  description: string;
  duration?: string;
}

export interface Framework {
  id: string;
  code: string;
  name: string;
  description: string;
  frameworkType: 'pedagogical' | 'marketing' | 'content_structure' | 'storytelling';
  color: string;
  icon: string;
  steps: FrameworkStep[];
  isActive: boolean;
  bestFor?: string[];
  useCases?: string[];
}

// Default enrichment data for known frameworks
const FRAMEWORK_ENRICHMENT: Record<string, Partial<Framework>> = {
  gps: {
    color: '#8B5CF6',
    icon: 'compass',
    steps: [
      { name: 'Goal', description: 'Define o objetivo claro de aprendizado', duration: '10%' },
      { name: 'Position', description: 'Avalia a posição atual do aluno', duration: '20%' },
      { name: 'Steps', description: 'Estrutura o caminho passo a passo', duration: '70%' },
    ],
    bestFor: ['Cursos técnicos', 'Treinamentos corporativos', 'Tutoriais'],
    useCases: [
      'Estruturar módulos de curso',
      'Criar roadmaps de aprendizado',
      'Definir objetivos mensuráveis',
    ],
  },
  aida: {
    color: '#F59E0B',
    icon: 'target',
    steps: [
      { name: 'Attention', description: 'Captura a atenção do público', duration: '20%' },
      { name: 'Interest', description: 'Gera interesse no conteúdo', duration: '25%' },
      { name: 'Desire', description: 'Cria desejo pela solução', duration: '30%' },
      { name: 'Action', description: 'Conduz à ação desejada', duration: '25%' },
    ],
    bestFor: ['Landing pages', 'Copy de vendas', 'Campanhas de marketing'],
    useCases: [
      'Estruturar páginas de captura',
      'Criar sequências de email',
      'Desenvolver pitches de vendas',
    ],
  },
  pas: {
    color: '#EF4444',
    icon: 'alert-triangle',
    steps: [
      { name: 'Problem', description: 'Identifica a dor do público', duration: '30%' },
      { name: 'Agitate', description: 'Amplifica a dor e suas consequências', duration: '35%' },
      { name: 'Solve', description: 'Apresenta a solução', duration: '35%' },
    ],
    bestFor: ['Storytelling', 'Conteúdo emocional', 'Vídeos de vendas'],
    useCases: [
      'Criar narrativas persuasivas',
      'Desenvolver estudos de caso',
      'Estruturar webinars',
    ],
  },
  bloom_taxonomy: {
    color: '#10B981',
    icon: 'layers',
    steps: [
      { name: 'Remember', description: 'Relembrar fatos e conceitos básicos', duration: '10%' },
      { name: 'Understand', description: 'Explicar ideias e conceitos', duration: '15%' },
      { name: 'Apply', description: 'Usar informação em novas situações', duration: '20%' },
      { name: 'Analyze', description: 'Estabelecer conexões entre ideias', duration: '20%' },
      { name: 'Evaluate', description: 'Justificar decisões e posições', duration: '15%' },
      { name: 'Create', description: 'Produzir trabalho novo e original', duration: '20%' },
    ],
    bestFor: ['Educação formal', 'Desenvolvimento de competências', 'Avaliações'],
    useCases: [
      'Criar objetivos de aprendizagem',
      'Desenvolver avaliações',
      'Estruturar progressão de curso',
    ],
  },
};

// Default values for unknown frameworks
const DEFAULT_ENRICHMENT: Partial<Framework> = {
  color: '#6B7280',
  icon: 'grid',
  steps: [
    { name: 'Step 1', description: 'First step of the framework' },
    { name: 'Step 2', description: 'Second step of the framework' },
    { name: 'Step 3', description: 'Third step of the framework' },
  ],
  bestFor: ['General content'],
  useCases: ['Content structuring'],
};

interface UseContentFrameworksResult {
  frameworks: Framework[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useContentFrameworks(): UseContentFrameworksResult {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFrameworks = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase not configured'));
      setLoading(false);
      return;
    }

    try {
      // @ts-ignore - Supabase query type inference issue
      const { data, error: fetchError } = await supabase.from('toolbox').select('*').order('name');

      if (fetchError) {
        throw fetchError;
      }

      // Transform and enrich the data
      const enrichedFrameworks: Framework[] = (data || []).map((row: any) => {
        const enrichment = FRAMEWORK_ENRICHMENT[row.code] || DEFAULT_ENRICHMENT;

        return {
          id: String(row.id),
          code: row.code,
          name: row.name,
          description: row.description || '',
          frameworkType: (row.type || 'pedagogical') as Framework['frameworkType'],
          color: enrichment.color || DEFAULT_ENRICHMENT.color!,
          icon: enrichment.icon || DEFAULT_ENRICHMENT.icon!,
          steps: enrichment.steps || DEFAULT_ENRICHMENT.steps!,
          isActive: true,
          bestFor: enrichment.bestFor || DEFAULT_ENRICHMENT.bestFor,
          useCases: enrichment.useCases || DEFAULT_ENRICHMENT.useCases,
        };
      });

      setFrameworks(enrichedFrameworks);
    } catch (err) {
      console.error('Error fetching frameworks:', err);
      setError(err as Error);
      setFrameworks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFrameworks();
  }, [fetchFrameworks]);

  return {
    frameworks,
    loading,
    error,
    refetch: fetchFrameworks,
  };
}

export default useContentFrameworks;
