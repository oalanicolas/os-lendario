/**
 * Hook for reset password form (after clicking email link)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getAuthErrorMessage } from '@/lib/AuthContext';

interface UseResetPasswordFormOptions {
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

export function useResetPasswordForm({ setError, setSuccess }: UseResetPasswordFormOptions) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!password || !confirmPassword) {
      setError('Preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('A senha deve conter pelo menos uma letra maiúscula');
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError('A senha deve conter pelo menos um número');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(getAuthErrorMessage(updateError));
      } else {
        setSuccess('Senha alterada com sucesso!');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/auth/login', {
            replace: true,
            state: { message: 'Senha alterada. Faça login com sua nova senha.' },
          });
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? getAuthErrorMessage(err) : 'Erro inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength validation
  const passwordStrength = {
    hasMinLength: password.length >= 6,
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordValid =
    passwordStrength.hasMinLength && passwordStrength.hasUpperCase && passwordStrength.hasNumber;

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleResetPassword,
    passwordStrength,
    isPasswordValid,
  };
}
