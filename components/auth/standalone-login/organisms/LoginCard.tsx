/**
 * LoginCard - Main card container organism
 */

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { LoginCardProps } from '../types';

export const LoginCard: React.FC<LoginCardProps> = ({
  view,
  error,
  success,
  children,
  onViewChange,
}) => {
  return (
    <Card className="w-full overflow-hidden rounded-[2rem] border border-border bg-card/95 shadow-2xl backdrop-blur-3xl dark:shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
      {/* Inner glow border */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[2rem] border border-border/30" />

      <CardHeader className="px-6 pb-4 pt-10 sm:px-8">
        <p className="mb-2 text-center text-xs font-black uppercase tracking-[0.4em] text-muted-foreground sm:text-[10px]">
          Lendar[IA] OS
        </p>
      </CardHeader>

      <CardContent className="px-6 pb-4 sm:px-8">
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

        {children}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 px-6 pb-10 pt-6 sm:px-8">
        <div className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground sm:gap-3 sm:text-[11px]">
          {view === 'login' ? (
            <>
              <span>Novo aqui?</span>
              <button
                onClick={() => onViewChange('register')}
                className="-mx-1 flex min-h-[44px] items-center px-3 text-primary transition-colors duration-200 hover:text-primary/80 active:text-primary/70"
              >
                Criar conta
              </button>
            </>
          ) : (
            <>
              <span>Ja tem conta?</span>
              <button
                onClick={() => onViewChange('login')}
                className="-mx-1 flex min-h-[44px] items-center px-3 text-primary transition-colors duration-200 hover:text-primary/80 active:text-primary/70"
              >
                Fazer login
              </button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
