/**
 * SignupForm - Formulário de cadastro
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Icon } from '../ui/icon';
import { useAuth, getAuthErrorMessage } from '../../lib/AuthContext';

interface SignupFormProps {
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onError, onSuccess }) => {
  const { signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Password strength indicator
  const getPasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score, label: 'Fraca', color: 'bg-destructive' };
    if (score <= 2) return { score, label: 'Razoável', color: 'bg-yellow-500' };
    if (score <= 3) return { score, label: 'Boa', color: 'bg-blue-500' };
    return { score, label: 'Forte', color: 'bg-green-500' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!name || !email || !password || !confirmPassword) {
      const msg = 'Por favor, preencha todos os campos';
      setError(msg);
      onError?.(msg);
      return;
    }

    if (password.length < 6) {
      const msg = 'A senha deve ter pelo menos 6 caracteres';
      setError(msg);
      onError?.(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'As senhas não coincidem';
      setError(msg);
      onError?.(msg);
      return;
    }

    setIsLoading(true);
    try {
      const { error: authError } = await signUpWithEmail(email, password, name);

      if (authError) {
        const msg = getAuthErrorMessage(authError);
        setError(msg);
        onError?.(msg);
      } else {
        setSuccess(true);
        onSuccess?.();
      }
    } catch (err) {
      const msg = 'Erro inesperado. Tente novamente.';
      setError(msg);
      onError?.(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Icon name="check-circle" size="size-8" className="text-primary" />
        </div>
        <h3 className="text-lg font-medium text-foreground">Conta criada!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Enviamos um email de confirmação para <strong>{email}</strong>. Por favor, verifique sua
          caixa de entrada e clique no link para ativar sua conta.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/auth/login')}>
          Voltar para login
        </Button>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="signup-name">Nome completo</Label>
        <div className="relative">
          <Icon
            name="user"
            size="size-4"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="signup-name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            autoComplete="name"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Icon
            name="envelope"
            size="size-4"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="signup-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Senha</Label>
        <div className="relative">
          <Icon
            name="lock"
            size="size-4"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name={showPassword ? 'eye-crossed' : 'eye'} size="size-4" />
          </button>
        </div>
        {password && (
          <div className="space-y-1">
            <div className="flex h-1 gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-full flex-1 rounded-full transition-colors ${
                    i <= passwordStrength.score ? passwordStrength.color : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Força da senha: {passwordStrength.label}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm">Confirmar senha</Label>
        <div className="relative">
          <Icon
            name="lock"
            size="size-4"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="signup-confirm"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
            className="pl-10"
          />
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-xs text-destructive">As senhas não coincidem</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          'Criar conta'
        )}
      </Button>
    </form>
  );
};

export default SignupForm;
