import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Database structure for mind_psychometrics
export interface MindPsychometricsDB {
  mind_id: string;
  // Queryable fields
  disc_pattern: string | null;
  mbti_type: string | null;
  enneagram_type: string | null;
  cognitive_stratum: string | null;
  // JSONB sections
  disc: {
    D: number;
    I: number;
    S: number;
    C: number;
    pattern: string;
    pattern_name?: string;
    natural_profile?: string;
    adapted_profile?: string;
    stress_profile?: string;
    specific_behaviors?: string[];
  } | null;
  enneagram: {
    type: string;
    type_name?: string;
    core_fear?: string;
    core_desire?: string;
    development_level?: string;
    stress_direction?: string;
    stress_behaviors?: string[];
    growth_direction?: string;
    growth_behaviors?: string;
    instinct_stack?: string;
    instinct_descriptions?: {
      self_preservation?: string;
      social?: string;
      sexual?: string;
    };
    behavioral_evidence?: string[];
  } | null;
  mbti: {
    type: string;
    type_name?: string;
    E_percentage?: number;
    N_percentage?: number;
    T_percentage?: number;
    J_percentage?: number;
    cognitive_stack?: {
      dominant?: { function: string; name?: string; manifestations?: string[] };
      auxiliary?: { function: string; name?: string; manifestations?: string[] };
      tertiary?: { function: string; name?: string; manifestations?: string[] };
      inferior?: { function: string; name?: string; manifestations?: string[] };
    };
  } | null;
  big_five: {
    openness?: { score: number; facets?: Record<string, number> };
    conscientiousness?: { score: number; facets?: Record<string, number> };
    extraversion?: { score: number; facets?: Record<string, number> };
    agreeableness?: { score: number; facets?: Record<string, number> };
    neuroticism?: { score: number; facets?: Record<string, number> };
    // Simple format fallback
    O?: number;
    C?: number;
    E?: number;
    A?: number;
    N?: number;
  } | null;
  dark_triad: {
    narcissism?: { score: number; evidence?: string[] };
    machiavellianism?: { score: number; evidence?: string[] };
    psychopathy?: { score: number; evidence?: string[] };
    // Simple format fallback
    N?: number;
    M?: number;
    P?: number;
  } | null;
  intelligence: {
    iq_estimated?: { range?: string; evidence?: string[] };
    eq_estimated?: { score?: number; components?: Record<string, number> };
    gardner_intelligences?: Record<string, number>;
  } | null;
  unique_characteristics: {
    superpower?: string[];
    kryptonite?: string[];
    statistical_rarity?: string;
  } | null;
  convergence_analysis: {
    powerful_alignments?: string[];
    productive_tensions?: string[];
    compound_limitations?: string[];
  } | null;
  additional_assessments: Record<string, unknown> | null;
  profile_metadata: {
    schema_version?: string;
    analysis_date?: string;
    confidence?: string;
    analyzer?: string;
  } | null;
  created_at: string;
  updated_at: string;
}

// Transformed format for UI components
export interface PsychometricData {
  // Core identifiers
  mbtiType: string | null;
  mbtiRole: string | null;
  mbtiStack: string[];
  enneagramType: string | null;
  enneagramWing: string | null;
  enneagramTriad: string | null;
  enneagramVariant: string | null;
  discPattern: string | null;
  cognitiveStratum: string | null;

  // DISC scores (0-100)
  disc: {
    d: number;
    i: number;
    s: number;
    c: number;
    patternName?: string;
    specificBehaviors?: string[];
  } | null;

  // Big Five scores (0-100)
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  } | null;

  // Dark Triad (1-7)
  darkTriad: {
    narcissism: number;
    machiavellianism: number;
    psychopathy: number;
  } | null;

  // Unique characteristics
  superpowers: string[];
  kryptonite: string[];

  // Enneagram details
  enneagramDetails: {
    coreFear?: string;
    coreDesire?: string;
    stressDirection?: string;
    growthDirection?: string;
    instinctStack?: string;
  } | null;

  // MBTI details
  mbtiDetails: {
    cognitiveStack?: {
      dominant?: { function: string; manifestations?: string[] };
      auxiliary?: { function: string; manifestations?: string[] };
      tertiary?: { function: string; manifestations?: string[] };
      inferior?: { function: string; manifestations?: string[] };
    };
  } | null;

  // Intelligence
  intelligence: {
    iqEstimated?: string;
    eqScore?: number;
  } | null;

  // Convergence
  convergence: {
    powerfulAlignments?: string[];
    productiveTensions?: string[];
  } | null;

  // Metadata
  analysisDate?: string;
  confidence?: string;
}

function transformPsychometrics(db: MindPsychometricsDB): PsychometricData {
  // Extract MBTI stack from cognitive_stack
  const mbtiStack: string[] = [];
  if (db.mbti?.cognitive_stack) {
    const stack = db.mbti.cognitive_stack;
    if (stack.dominant?.function) mbtiStack.push(stack.dominant.function);
    if (stack.auxiliary?.function) mbtiStack.push(stack.auxiliary.function);
    if (stack.tertiary?.function) mbtiStack.push(stack.tertiary.function);
    if (stack.inferior?.function) mbtiStack.push(stack.inferior.function);
  }

  // Extract Big Five scores
  let bigFive: PsychometricData['bigFive'] = null;
  if (db.big_five) {
    const bf = db.big_five;
    bigFive = {
      openness: bf.openness?.score ?? bf.openness?.total ?? bf.O ?? 0,
      conscientiousness: bf.conscientiousness?.score ?? bf.conscientiousness?.total ?? bf.C ?? 0,
      extraversion: bf.extraversion?.score ?? bf.extraversion?.total ?? bf.E ?? 0,
      agreeableness: bf.agreeableness?.score ?? bf.agreeableness?.total ?? bf.A ?? 0,
      neuroticism: bf.neuroticism?.score ?? bf.neuroticism?.total ?? bf.N ?? 0,
    };
  }

  // Extract Dark Triad scores
  let darkTriad: PsychometricData['darkTriad'] = null;
  if (db.dark_triad) {
    const dt = db.dark_triad;
    darkTriad = {
      narcissism: dt.narcissism?.score ?? dt.N ?? 0,
      machiavellianism: dt.machiavellianism?.score ?? dt.M ?? 0,
      psychopathy: dt.psychopathy?.score ?? dt.P ?? 0,
    };
  }

  // Extract DISC scores
  let disc: PsychometricData['disc'] = null;
  if (db.disc) {
    disc = {
      d: db.disc.D ?? 0,
      i: db.disc.I ?? 0,
      s: db.disc.S ?? 0,
      c: db.disc.C ?? 0,
      patternName: db.disc.pattern_name,
      specificBehaviors: db.disc.specific_behaviors,
    };
  }

  // Parse enneagram type for wing
  let enneagramWing: string | null = null;
  let enneagramTriad: string | null = null;
  if (db.enneagram?.type) {
    enneagramWing = db.enneagram.type; // e.g., "5w4"
    const baseType = parseInt(db.enneagram.type.charAt(0));
    if ([8, 9, 1].includes(baseType)) enneagramTriad = 'Gut';
    else if ([2, 3, 4].includes(baseType)) enneagramTriad = 'Heart';
    else if ([5, 6, 7].includes(baseType)) enneagramTriad = 'Head';
  }

  return {
    mbtiType: db.mbti_type || db.mbti?.type || null,
    mbtiRole: db.mbti?.type_name || null,
    mbtiStack,
    enneagramType: db.enneagram?.type || db.enneagram_type || null,
    enneagramWing,
    enneagramTriad,
    enneagramVariant: db.enneagram?.instinct_stack || null,
    discPattern: db.disc_pattern || db.disc?.pattern || null,
    cognitiveStratum: db.cognitive_stratum || null,

    disc,
    bigFive,
    darkTriad,

    superpowers: db.unique_characteristics?.superpower || [],
    kryptonite: db.unique_characteristics?.kryptonite || [],

    enneagramDetails: db.enneagram ? {
      coreFear: db.enneagram.core_fear,
      coreDesire: db.enneagram.core_desire,
      stressDirection: db.enneagram.stress_direction,
      growthDirection: db.enneagram.growth_direction,
      instinctStack: db.enneagram.instinct_stack,
    } : null,

    mbtiDetails: db.mbti?.cognitive_stack ? {
      cognitiveStack: db.mbti.cognitive_stack,
    } : null,

    intelligence: db.intelligence ? {
      iqEstimated: db.intelligence.iq_estimated?.range,
      eqScore: db.intelligence.eq_estimated?.score,
    } : null,

    convergence: db.convergence_analysis ? {
      powerfulAlignments: db.convergence_analysis.powerful_alignments,
      productiveTensions: db.convergence_analysis.productive_tensions,
    } : null,

    analysisDate: db.profile_metadata?.analysis_date,
    confidence: db.profile_metadata?.confidence,
  };
}

interface UseMindPsychometricsResult {
  data: PsychometricData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useMindPsychometrics(mindId: string | null): UseMindPsychometricsResult {
  const [data, setData] = useState<PsychometricData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!mindId) {
      setData(null);
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured()) {
      setError(new Error('Supabase not configured'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: psychData, error: psychError } = await supabase
        .from('mind_psychometrics')
        .select('*')
        .eq('mind_id', mindId)
        .single();

      if (psychError) {
        // No data is not an error, just means no psychometrics available
        if (psychError.code === 'PGRST116') {
          setData(null);
        } else {
          throw psychError;
        }
      } else if (psychData) {
        setData(transformPsychometrics(psychData as MindPsychometricsDB));
      }
    } catch (err) {
      console.error('Error fetching psychometrics:', err);
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [mindId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export default useMindPsychometrics;
