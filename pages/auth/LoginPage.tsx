/**
 * LoginPage - Página de login /auth/login
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { LoginForm } from '../../components/auth/LoginForm';
import { OAuthButtons } from '../../components/auth/OAuthButtons';
import { MagicLinkForm } from '../../components/auth/MagicLinkForm';
import { Card, CardContent } from '../../components/ui/card';
import { Icon } from '../../components/ui/icon';

type LoginMode = 'password' | 'magic-link';

export const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<LoginMode>('password');
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthLayout title="Entrar" subtitle="Acesse sua conta para continuar">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Tab switcher */}
          <div className="mb-6 flex rounded-lg bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => setMode('password')}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === 'password'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Email e Senha
            </button>
            <button
              type="button"
              onClick={() => setMode('magic-link')}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === 'magic-link'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Magic Link
            </button>
          </div>

          {/* Form based on mode */}
          {mode === 'password' ? (
            <LoginForm onError={setError} />
          ) : (
            <MagicLinkForm onError={setError} />
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou continue com</span>
            </div>
          </div>

          {/* OAuth buttons */}
          <OAuthButtons onError={setError} />

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/auth/signup" className="font-medium text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
