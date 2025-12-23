import React from 'react';
import { cn } from '../../lib/utils';

// Mapeamento de tamanho size-* para text-*
const sizeMap: Record<string, string> = {
  'size-3': 'text-xs', // 12px
  'size-4': 'text-sm', // 14px
  'size-5': 'text-base', // 16px
  'size-6': 'text-lg', // 18px
  'size-7': 'text-xl', // 20px
  'size-8': 'text-2xl', // 24px
  'size-9': 'text-3xl', // 30px
  'size-10': 'text-4xl', // 36px
};

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** Nome do ícone UIcons (sem prefixo) */
  name: string;
  /** Tamanho usando classes Tailwind size-* ou text-* */
  size?: keyof typeof sizeMap | string;
  /** Texto acessível para screen readers */
  label?: string;
  /** Tipo de ícone: 'regular' (default), 'solid', ou 'brands' */
  type?: 'regular' | 'solid' | 'brands';
  className?: string;
}

export function Icon({
  name,
  size = 'size-5',
  className,
  label,
  type = 'regular',
  ...props
}: IconProps) {
  // Converte size-* para text-* se necessário
  const sizeClass = sizeMap[size as string] || size;

  // Determina o prefixo da classe baseado no tipo
  let prefix = 'fi-rr'; // Regular Rounded (Default)
  if (type === 'solid') prefix = 'fi-sr'; // Solid Rounded
  if (type === 'brands') prefix = 'fi-brands'; // Brands

  return (
    <>
      <i
        className={cn(`fi ${prefix}-${name}`, sizeClass, className)}
        aria-hidden={label ? undefined : 'true'}
        aria-label={label}
        role={label ? 'img' : undefined}
        {...props}
      />
      {label && <span className="sr-only">{label}</span>}
    </>
  );
}
