/**
 * useAuth - Hook para autenticação
 *
 * Re-export do AuthContext para conveniência.
 * Uso: import { useAuth } from '@/hooks/useAuth';
 */

export { useAuth, getAuthErrorMessage, AUTH_ERROR_MESSAGES } from '../lib/AuthContext';
export type { AuthUser } from '../lib/AuthContext';
