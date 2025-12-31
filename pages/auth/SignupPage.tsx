/**
 * SignupPage - Página de cadastro /auth/signup
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { SignupForm } from '../../components/auth/SignupForm';
import { OAuthButtons } from '../../components/auth/OAuthButtons';
import { Card, CardContent } from '../../components/ui/card';

export const SignupPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthLayout title="Criar Conta" subtitle="Cadastre-se para começar">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Signup form */}
          <SignupForm onError={setError} />

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

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignupPage;
