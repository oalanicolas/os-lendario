/**
 * AuthLayout - Layout wrapper para páginas de autenticação
 *
 * Centraliza o conteúdo e adiciona fundo com gradiente sutil
 */

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="bg-primary/3 absolute -bottom-1/2 right-0 h-[600px] w-[600px] rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">MMOS</h1>
          {title && <h2 className="mt-2 text-xl font-semibold text-foreground">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        {children}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            Ao continuar, você concorda com nossos{' '}
            <a href="/termos" className="underline hover:text-foreground">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="/privacidade" className="underline hover:text-foreground">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
