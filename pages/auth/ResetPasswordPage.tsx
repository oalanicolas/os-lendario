/**
 * ResetPasswordPage - Page to set new password after clicking reset link
 * Route: /auth/reset-password
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ResetPasswordForm } from '../../components/auth/standalone-login/organisms/ResetPasswordForm';

const logoUrl = '/logo-academialendaria.svg';

export const ResetPasswordPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background selection:bg-primary/30">
      {/* Warm gradient background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
        {/* Logo Section */}
        <div className="group mb-10 cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 scale-150 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            <img
              src={logoUrl}
              alt="Academia Lendaria"
              className="relative z-10 h-14 w-14 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Card */}
        <Card className="w-full overflow-hidden rounded-[2rem] border border-border bg-card/95 shadow-2xl backdrop-blur-3xl dark:shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
          {/* Inner glow border */}
          <div className="pointer-events-none absolute inset-[1px] rounded-[2rem] border border-border/30" />

          <CardHeader className="px-6 pb-4 pt-10 sm:px-8">
            <p className="mb-2 text-center text-xs font-black uppercase tracking-[0.4em] text-muted-foreground sm:text-[10px]">
              Recuperação de Senha
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-10 sm:px-8">
            {/* Error Message */}
            {error && (
              <div className="mb-8 animate-fade-in rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm font-light tracking-wide text-red-400/90">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-8 animate-fade-in rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm font-light tracking-wide text-green-400/90">
                {success}
              </div>
            )}

            <ResetPasswordForm setError={setError} setSuccess={setSuccess} />
          </CardContent>
        </Card>

        {/* Bottom Info */}
        <div className="mt-12 flex animate-pulse-slow items-center gap-4 text-[11px] font-black uppercase tracking-[0.35em] text-zinc-700 sm:text-[9px]">
          <Icon name="shield-check" size="size-4" className="text-zinc-700" />
          <span>Secured by Aurora</span>
          <div className="h-1 w-1 rounded-full bg-zinc-800" />
          <span className="opacity-60">v4.1.0</span>
        </div>

        {/* Back to Login */}
        <button
          onClick={() => navigate('/auth/login')}
          className="group -mx-4 mt-8 flex min-h-[44px] items-center gap-3 px-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 transition-colors duration-200 hover:text-zinc-400 active:text-zinc-300 sm:text-[10px]"
        >
          <Icon
            name="arrow-left"
            size="size-4"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span>Voltar para Login</span>
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
