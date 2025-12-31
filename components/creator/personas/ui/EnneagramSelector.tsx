import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import { Button } from '../../../ui/button';

export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EnneagramWing = `${EnneagramType}w${number}`;

export interface EnneagramSelectorProps {
  value?: EnneagramType;
  wing?: EnneagramWing;
  onChange?: (type: EnneagramType) => void;
  onWingChange?: (wing: EnneagramWing) => void;
  readOnly?: boolean;
}

const enneagramTypes: Record<EnneagramType, { name: string; description: string }> = {
  1: { name: 'O Perfeccionista', description: 'Racional, idealista, princípios fortes.' },
  2: { name: 'O Prestativo', description: 'Generoso, empático, busca agradar.' },
  3: { name: 'O Realizador', description: 'Motivado por sucesso e reconhecimento.' },
  4: { name: 'O Individualista', description: 'Criativo, sensível, busca autenticidade.' },
  5: { name: 'O Investigador', description: 'Analítico, inovador, busca conhecimento.' },
  6: { name: 'O Leal', description: 'Comprometido, seguro, busca estabilidade.' },
  7: { name: 'O Entusiasta', description: 'Espontâneo, versátil, busca experiências.' },
  8: { name: 'O Desafiador', description: 'Assertivo, protetor, busca controle.' },
  9: { name: 'O Pacificador', description: 'Receptivo, harmonioso, busca paz.' },
};

const wingDescriptions: Record<string, string> = {
  '3w2': 'Charmoso - Mais orientado a pessoas',
  '3w4': 'Profissional - Mais introspectivo e criativo',
  '1w9': 'Idealista - Mais pacífico e flexível',
  '1w2': 'Advogado - Mais empático e prestativo',
};

export const EnneagramSelector: React.FC<EnneagramSelectorProps> = ({
  value,
  wing,
  onChange,
  onWingChange,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedType = value ? enneagramTypes[value] : null;

  // Calculate possible wings
  const possibleWings: EnneagramWing[] = value
    ? [
        `${value}w${value === 1 ? 9 : value - 1}` as EnneagramWing,
        `${value}w${value === 9 ? 1 : value + 1}` as EnneagramWing,
      ]
    : [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-studio-accent/80">
          Eneagrama
        </h4>
        {!readOnly && (
          <span className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
            Editar Manualmente
          </span>
        )}
      </div>

      {/* Selector Button */}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => !readOnly && setIsOpen(!isOpen)}
          disabled={readOnly}
          className={cn(
            'h-12 w-full justify-between px-4',
            'border-studio-accent/50 bg-muted/20 hover:bg-muted/30',
            isOpen && 'ring-2 ring-studio-accent/30'
          )}
        >
          <div className="flex items-center gap-3">
            {value ? (
              <>
                <div className="flex size-6 items-center justify-center rounded bg-studio-accent text-sm font-bold text-background">
                  {value}
                </div>
                <span className="text-sm font-medium">{selectedType?.name}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Selecionar tipo...</span>
            )}
          </div>
          <Icon name="angle-small-down" size="size-4" className="text-muted-foreground" />
        </Button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-card p-2 shadow-xl">
            <div className="max-h-64 overflow-y-auto">
              {(Object.keys(enneagramTypes) as unknown as EnneagramType[]).map((type) => {
                const numType = Number(type) as EnneagramType;
                const typeInfo = enneagramTypes[numType];
                const isSelected = value === numType;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      onChange?.(numType);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
                      isSelected ? 'bg-studio-accent/20 text-studio-accent' : 'hover:bg-muted/50'
                    )}
                  >
                    <div
                      className={cn(
                        'flex size-6 items-center justify-center rounded text-sm font-bold',
                        isSelected
                          ? 'bg-studio-accent text-background'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {numType}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{typeInfo.name}</p>
                      <p className="text-xs text-muted-foreground">{typeInfo.description}</p>
                    </div>
                    {isSelected && (
                      <Icon name="check" size="size-4" className="text-studio-accent" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Wing Selector */}
      {value && possibleWings.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Asa Principal (Wing)</span>
            <span className="font-bold text-foreground">{wing || 'Não definida'}</span>
          </div>

          <div className="flex gap-2">
            {possibleWings.map((w) => (
              <Button
                key={w}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onWingChange?.(w)}
                disabled={readOnly}
                className={cn(
                  'flex-1',
                  wing === w
                    ? 'border-studio-accent bg-studio-accent/20 text-studio-accent'
                    : 'border-border'
                )}
              >
                {w}
              </Button>
            ))}
          </div>

          {wing && wingDescriptions[wing] && (
            <p className="text-xs text-muted-foreground">{wingDescriptions[wing]}</p>
          )}
        </div>
      )}

      {/* Motivation */}
      {value && (
        <p className="text-xs text-muted-foreground">
          {value === 3 &&
            'Motivado por sucesso e reconhecimento. Teme o fracasso ou parecer incompetente.'}
          {value === 1 && 'Motivado por fazer o certo. Teme ser corrupto ou imperfeito.'}
          {value === 6 && 'Motivado por segurança. Teme ser abandonado ou sem suporte.'}
        </p>
      )}
    </div>
  );
};

export default EnneagramSelector;
