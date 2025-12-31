/**
 * AuthContext - Sistema de autenticação centralizado
 *
 * Segue o padrão do ThemeContext.tsx
 * Suporta: Email/Senha, Google OAuth, Magic Link
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';

// ============================================================================
// Types
// ============================================================================

export interface AuthUser {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  mindId: string | null;
}

interface AuthContextType {
  // State
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Auth methods
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;

  // Utils
  refreshUser: () => Promise<void>;
}

// ============================================================================
// Error Messages (Portuguese)
// ============================================================================

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Email ou senha incorretos',
  'Email not confirmed': 'Por favor, confirme seu email antes de entrar',
  'User already registered': 'Este email já está cadastrado',
  'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres',
  'Unable to validate email address: invalid format': 'Formato de email inválido',
  'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos.',
  'Signup requires a valid password': 'Por favor, informe uma senha válida',
  default: 'Ocorreu um erro. Tente novamente.',
};

export function getAuthErrorMessage(error: AuthError | Error | null): string {
  if (!error) return '';
  const message = error.message || '';
  return AUTH_ERROR_MESSAGES[message] || AUTH_ERROR_MESSAGES['default'];
}

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Transform Supabase User to our AuthUser type
  const transformUser = useCallback(async (supabaseUser: User | null): Promise<AuthUser | null> => {
    if (!supabaseUser) return null;

    try {
      // Fetch user_profile to get mind_id and other data
      // Using type assertion since user_profiles may not be in generated types yet
      const { data: profile } = (await supabase
        .from('user_profiles' as 'minds') // Type workaround
        .select('full_name, avatar_url, mind_id')
        .eq('id', supabaseUser.id)
        .single()) as {
        data: { full_name?: string; avatar_url?: string; mind_id?: string } | null;
      };

      return {
        id: supabaseUser.id,
        email: supabaseUser.email ?? null,
        fullName: profile?.full_name ?? supabaseUser.user_metadata?.full_name ?? null,
        avatarUrl: profile?.avatar_url ?? supabaseUser.user_metadata?.avatar_url ?? null,
        mindId: profile?.mind_id ?? null,
      };
    } catch (error) {
      // If profile doesn't exist yet (first login), use metadata
      console.warn('Could not fetch user profile, using metadata:', error);
      return {
        id: supabaseUser.id,
        email: supabaseUser.email ?? null,
        fullName: supabaseUser.user_metadata?.full_name ?? null,
        avatarUrl: supabaseUser.user_metadata?.avatar_url ?? null,
        mindId: null,
      };
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Auth disabled.');
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const authUser = await transformUser(session.user);
        setUser(authUser);
      }
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      setSession(session);

      if (session?.user) {
        // Small delay to allow trigger to create user_profile/mind after signup
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Wait a bit for the DB trigger to create user_profile
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        const authUser = await transformUser(session.user);
        setUser(authUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [transformUser]);

  // ============================================================================
  // Auth Methods
  // ============================================================================

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });
    return { error };
  };

  const refreshUser = async () => {
    if (session?.user) {
      const authUser = await transformUser(session.user);
      setUser(authUser);
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithMagicLink,
        signOut,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
