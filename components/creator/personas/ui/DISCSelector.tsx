import React from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';

export type DISCType = 'D' | 'I' | 'S' | 'C';

export interface DISCSelectorProps {
  value?: DISCType;
  onChange?: (type: DISCType) => void;
  suggested?: DISCType;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const discLabels: Record<DISCType, string> = {
  D: 'Dominante',
  I: 'Influente',
  S: 'Estável',
  C: 'Conforme',
};

const discDescriptions: Record<DISCType, string> = {
  D: 'Focado em resultados, direto e decisivo. Valoriza eficiência e ROI imediato.',
  I: 'Comunicativo, entusiasta e otimista. Valoriza relacionamentos e reconhecimento.',
  S: 'Paciente, confiável e colaborativo. Valoriza estabilidade e harmonia.',
  C: 'Analítico, preciso e sistemático. Valoriza qualidade e processos bem definidos.',
};

const sizeClasses = {
  sm: 'size-12 text-base',
  md: 'size-16 text-xl',
  lg: 'size-20 text-2xl',
};

export const DISCSelector: React.FC<DISCSelectorProps> = ({
  value,
  onChange,
  suggested,
  readOnly = false,
  size = 'md',
}) => {
  const types: DISCType[] = ['D', 'I', 'S', 'C'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-studio-accent/80">
          Metodologia DISC
        </h4>
        {suggested && (
          <span className="flex items-center gap-1 text-xs text-studio-accent">
            <Icon name="magic-wand" size="size-3" /> Sugerido
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        {types.map((type) => {
          const isSelected = value === type;
          const isSuggested = suggested === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => !readOnly && onChange?.(type)}
              disabled={readOnly}
              className={cn(
                'aspect-square rounded-lg font-bold transition-all',
                'flex flex-col items-center justify-center',
                sizeClasses[size],
                isSelected
                  ? 'border-2 border-studio-accent bg-studio-accent text-background shadow-[0_0_15px_rgba(242,208,13,0.3)]'
                  : 'border border-border bg-muted/20 text-muted-foreground',
                !readOnly &&
                  !isSelected &&
                  'hover:border-muted-foreground/50 hover:text-foreground',
                isSuggested &&
                  !isSelected &&
                  'ring-2 ring-studio-accent/30 ring-offset-2 ring-offset-background'
              )}
            >
              {type}
              <span className="mt-1 text-[10px] font-normal uppercase opacity-75">
                {discLabels[type]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Description */}
      {value && (
        <div className="mt-3 text-xs leading-relaxed text-muted-foreground">
          <span className="font-bold text-foreground">Perfil {discLabels[value]}:</span>{' '}
          {discDescriptions[value]}
        </div>
      )}
    </div>
  );
};

export default DISCSelector;
