/**
 * AuthCallback - Handler para callbacks de OAuth e Magic Link
 *
 * Processa tokens da URL e redireciona o usuário
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error in URL
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (errorParam) {
          setError(errorDescription || 'Erro na autenticação');
          return;
        }

        // Get the type of callback (recovery = password reset)
        const type = searchParams.get('type');

        // Supabase handles the token exchange automatically
        // when onAuthStateChange fires
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Erro ao processar autenticação');
          return;
        }

        if (session) {
          // Determine redirect destination
          const state = location.state as { from?: Location } | undefined;
          const from = state?.from?.pathname || '/';

          // If password recovery, redirect to settings
          if (type === 'recovery') {
            navigate('/settings', { replace: true });
            return;
          }

          // Otherwise redirect to original destination
          navigate(from, { replace: true });
        } else {
          // Wait a bit for the session to be established
          // (Supabase might still be processing)
          setTimeout(async () => {
            const {
              data: { session: retrySession },
            } = await supabase.auth.getSession();
            if (retrySession) {
              const state = location.state as { from?: Location } | undefined;
              const from = state?.from?.pathname || '/';
              navigate(from, { replace: true });
            } else {
              setError('Sessão não encontrada. Tente fazer login novamente.');
            }
          }, 2000);
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError('Erro inesperado na autenticação');
      }
    };

    handleCallback();
  }, [navigate, location, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive">Erro na autenticação</h2>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => navigate('/auth/login')}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Voltar para login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Processando autenticação...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
