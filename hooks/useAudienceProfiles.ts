// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { AudienceProfile } from '../types/database';

// Demographics structure from database
interface Demographics {
  age_range?: string;
  location?: string;
  education?: string;
  occupation?: string;
  income?: string;
}

// Psychographics structure from database
interface Psychographics {
  interests?: string[];
  values?: string[];
  pain_points?: string[];
  goals?: string[];
  fears?: string[];
  desires?: string[];
  mindset?: string;
}

// UI-friendly persona type that maps to PersonasTemplate expectations
export interface Persona {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string; // Icon name for the Icon component (never use emojis)
  isIcp: boolean;
  demographics: {
    age: string;
    role: string;
    income: string;
    location: string;
  };
  psychographics: {
    mindset: string;
    values: string[];
    fears: string[];
  };
  painPoints: {
    superficial: string;
    deep: string;
  }[];
  desires: {
    surface: string;
    hidden: string;
  }[];
  redFlags: string[];
  greenFlags: string[];
  definingQuote: string;
  technicalLevel: string | null;
  createdAt: string;
  updatedAt: string;
}

// Transform database record to UI persona
const transformToPersona = (profile: AudienceProfile, index: number): Persona => {
  const demographics = profile.demographics as Demographics | null;
  const psychographics = profile.psychographics as Psychographics | null;

  // Extract pain points - try to split into superficial/deep if possible
  const painPoints =
    psychographics?.pain_points?.map((pain, i) => ({
      superficial: pain,
      deep: psychographics?.goals?.[i] ? `Quer: ${psychographics.goals[i]}` : 'Busca solução',
    })) || [];

  // Extract desires
  const desires =
    psychographics?.goals?.map((goal, i) => ({
      surface: goal,
      hidden: psychographics?.desires?.[i] || 'Realização pessoal',
    })) || [];

  // Generate icon name based on occupation or name (never use emojis)
  const getIconName = (name: string, occupation?: string): string => {
    const nameLC = name.toLowerCase();
    const occLC = occupation?.toLowerCase() || '';

    if (occLC.includes('dev') || occLC.includes('engineer') || occLC.includes('programm'))
      return 'laptop-code';
    if (occLC.includes('design')) return 'palette';
    if (occLC.includes('empreend') || occLC.includes('founder') || occLC.includes('ceo'))
      return 'rocket';
    if (occLC.includes('market')) return 'chart-line';
    if (occLC.includes('content') || occLC.includes('creator') || occLC.includes('criador'))
      return 'sparkles';
    if (nameLC.includes('brain') || nameLC.includes('second brain')) return 'brain';
    if (nameLC.includes('iniciante') || nameLC.includes('beginner')) return 'seedling';
    return 'user';
  };

  // Generate a defining quote based on pain points or goals
  const getDefiningQuote = (psycho: Psychographics | null, name: string): string => {
    if (psycho?.pain_points?.[0]) {
      return `Meu maior desafio é ${psycho.pain_points[0].toLowerCase()}.`;
    }
    if (psycho?.goals?.[0]) {
      return `Quero ${psycho.goals[0].toLowerCase()}.`;
    }
    return `Busco evolução constante como ${name}.`;
  };

  return {
    id: profile.id,
    slug: profile.slug,
    name: profile.name,
    description: profile.description,
    icon: getIconName(profile.name, demographics?.occupation),
    isIcp: index === 0, // First one is ICP
    demographics: {
      age: demographics?.age_range || '--',
      role: demographics?.occupation || '--',
      income: demographics?.income || '--',
      location: demographics?.location || 'Brasil',
    },
    psychographics: {
      mindset: psychographics?.mindset || 'Em busca de crescimento',
      values: psychographics?.values || [],
      fears: psychographics?.fears || [],
    },
    painPoints,
    desires,
    redFlags: [], // Not in database, can be added later
    greenFlags: [], // Not in database, can be added later
    definingQuote: getDefiningQuote(psychographics, profile.name),
    technicalLevel: profile.technical_level,
    createdAt: new Date(profile.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    }),
    updatedAt: profile.updated_at,
  };
};

interface UseAudienceProfilesResult {
  personas: Persona[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  createPersona: (persona: Partial<AudienceProfile>) => Promise<Persona | null>;
  updatePersona: (id: string, updates: Partial<AudienceProfile>) => Promise<Persona | null>;
  deletePersona: (id: string) => Promise<boolean>;
}

export function useAudienceProfiles(): UseAudienceProfilesResult {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - no personas available');
      setPersonas([]);
      setLoading(false);
      return;
    }

    try {
      // @ts-ignore - Supabase query type inference issue
      const { data: profiles, error: fetchError } = await supabase
        .from('audience_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      const transformedPersonas = (profiles || []).map(transformToPersona);
      setPersonas(transformedPersonas);
    } catch (err) {
      console.error('Error fetching audience profiles:', err);
      setError(err as Error);
      setPersonas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPersona = useCallback(
    async (persona: Partial<AudienceProfile>): Promise<Persona | null> => {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured');
        return null;
      }

      try {
        const insertData = {
          slug: persona.slug || `persona-${Date.now()}`,
          name: persona.name || 'Nova Persona',
          description: persona.description || null,
          demographics: persona.demographics || null,
          psychographics: persona.psychographics || null,
          technical_level: persona.technical_level || null,
          learning_preferences: persona.learning_preferences || null,
        };

        // @ts-ignore - Supabase insert type inference issue
        const { data, error: insertError } = await supabase
          .from('audience_profiles')
          .insert(insertData as any)
          .select()
          .single();

        if (insertError) throw insertError;

        const newPersona = transformToPersona(data as AudienceProfile, personas.length);
        setPersonas((prev) => [newPersona, ...prev]);
        return newPersona;
      } catch (err) {
        console.error('Error creating persona:', err);
        setError(err as Error);
        return null;
      }
    },
    [personas.length]
  );

  const updatePersona = useCallback(
    async (id: string, updates: Partial<AudienceProfile>): Promise<Persona | null> => {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured');
        return null;
      }

      try {
        const updateData = {
          ...updates,
          updated_at: new Date().toISOString(),
        };

        // @ts-ignore - Supabase update type inference issue
        const { data, error: updateError } = await supabase
          .from('audience_profiles')
          .update(updateData as any)
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;

        const index = personas.findIndex((p) => p.id === id);
        const updatedPersona = transformToPersona(data as AudienceProfile, index >= 0 ? index : 0);

        setPersonas((prev) => prev.map((p) => (p.id === id ? updatedPersona : p)));
        return updatedPersona;
      } catch (err) {
        console.error('Error updating persona:', err);
        setError(err as Error);
        return null;
      }
    },
    [personas]
  );

  const deletePersona = useCallback(async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      return false;
    }

    try {
      const { error: deleteError } = await supabase.from('audience_profiles').delete().eq('id', id);

      if (deleteError) throw deleteError;

      setPersonas((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting persona:', err);
      setError(err as Error);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return {
    personas,
    loading,
    error,
    refetch: fetchProfiles,
    createPersona,
    updatePersona,
    deletePersona,
  };
}

export default useAudienceProfiles;
