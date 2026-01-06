/**
 * LoginForm - Login form organism
 */

import React from 'react';
import { LuxuryInput, LuxuryButton, LuxuryLabel } from '../molecules';
import type { LoginFormProps } from '../types';

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  isLoading,
  isTransitioning,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onForgotPassword,
}) => {
  const formClasses = `
    space-y-6
    transition-all duration-300 ease-out
    ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
  `;

  return (
    <form onSubmit={onSubmit} className={formClasses}>
      <div>
        <LuxuryLabel htmlFor="email">Email</LuxuryLabel>
        <LuxuryInput
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={onEmailChange}
          icon="envelope"
          autoComplete="email"
          disabled={isLoading}
        />
      </div>
      <div>
        <LuxuryLabel
          htmlFor="password"
          extra={
            <button
              type="button"
              onClick={onForgotPassword}
              className="-mx-2 -my-2 flex min-h-[44px] items-center px-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-200 hover:text-primary active:text-primary/80 sm:text-[10px]"
            >
              Esqueci a Senha
            </button>
          }
        >
          Senha
        </LuxuryLabel>
        <LuxuryInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          value={password}
          onChange={onPasswordChange}
          icon="lock"
          autoComplete="current-password"
          showToggle
          onToggle={onTogglePassword}
          toggleState={showPassword}
          disabled={isLoading}
        />
      </div>
      <div className="pt-4">
        <LuxuryButton type="submit" isLoading={isLoading}>
          Entrar
        </LuxuryButton>
      </div>
    </form>
  );
};
