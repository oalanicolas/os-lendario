/**
 * ResetPasswordForm - Form to set new password after clicking reset link
 */

import React from 'react';
import { LuxuryInput, LuxuryButton, LuxuryLabel } from '../molecules';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import { Icon } from '@/components/ui/icon';

interface ResetPasswordFormProps {
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ setError, setSuccess }) => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleResetPassword,
    passwordStrength,
  } = useResetPasswordForm({ setError, setSuccess });

  return (
    <form onSubmit={handleResetPassword} className="space-y-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground">Definir Nova Senha</h2>
        <p className="mt-2 text-sm text-zinc-500">Escolha uma senha segura para sua conta</p>
      </div>

      {/* Password Field */}
      <div>
        <LuxuryLabel htmlFor="password">Nova Senha</LuxuryLabel>
        <LuxuryInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="lock"
          showToggle
          onToggle={() => setShowPassword(!showPassword)}
          toggleState={showPassword}
          disabled={isLoading}
        />
      </div>

      {/* Password Strength Indicators */}
      {password && (
        <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">
            Requisitos da Senha
          </p>
          <StrengthIndicator met={passwordStrength.hasMinLength} label="Mínimo 6 caracteres" />
          <StrengthIndicator met={passwordStrength.hasUpperCase} label="Uma letra maiúscula" />
          <StrengthIndicator met={passwordStrength.hasNumber} label="Um número" />
        </div>
      )}

      {/* Confirm Password Field */}
      <div>
        <LuxuryLabel htmlFor="confirmPassword">Confirmar Senha</LuxuryLabel>
        <LuxuryInput
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon="lock"
          disabled={isLoading}
        />
      </div>

      {/* Password Match Indicator */}
      {confirmPassword && (
        <div className="flex items-center gap-2 text-sm">
          {password === confirmPassword ? (
            <>
              <Icon name="check" size="size-4" className="text-emerald-500" />
              <span className="text-emerald-500">Senhas coincidem</span>
            </>
          ) : (
            <>
              <Icon name="xmark" size="size-4" className="text-red-500" />
              <span className="text-red-500">Senhas não coincidem</span>
            </>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <LuxuryButton type="submit" isLoading={isLoading}>
          Definir Nova Senha
        </LuxuryButton>
      </div>

      {/* Back to Login Link */}
      <div className="pt-2 text-center">
        <a
          href="/auth/login"
          className="inline-flex min-h-[44px] items-center px-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-200 hover:text-primary active:text-primary/80 sm:text-[10px]"
        >
          Voltar para Login
        </a>
      </div>
    </form>
  );
};

// Helper component for password strength indicators
const StrengthIndicator: React.FC<{ met: boolean; label: string }> = ({ met, label }) => (
  <div className="flex items-center gap-2">
    {met ? (
      <Icon name="check" size="size-3" className="text-emerald-500" />
    ) : (
      <Icon name="xmark" size="size-3" className="text-zinc-600" />
    )}
    <span className={`text-xs ${met ? 'text-emerald-500' : 'text-zinc-500'}`}>{label}</span>
  </div>
);

export default ResetPasswordForm;
