import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import { DISCSelector, type DISCType } from '../ui/DISCSelector';
import { EnneagramSelector, type EnneagramType, type EnneagramWing } from '../ui/EnneagramSelector';
import type { Persona } from '../../../../hooks/useAudienceProfiles';

export interface PersonaAdvancedPsychographicsProps {
  persona: Persona;
}

export const PersonaAdvancedPsychographics: React.FC<PersonaAdvancedPsychographicsProps> = ({
  persona,
}) => {
  const [discType, setDiscType] = useState<DISCType>('D');
  const [enneagramType, setEnneagramType] = useState<EnneagramType>(3);
  const [enneagramWing, setEnneagramWing] = useState<EnneagramWing>('3w4');

  const powerKeywords = ['Eficiencia', 'Lideranca', 'Resultados', 'Otimizacao'];

  return (
    <div className="flex animate-fade-in flex-col gap-6 pb-20">
      {/* AI Banner */}
      <div className="flex items-center justify-between rounded-xl border border-studio-accent/20 bg-gradient-to-r from-studio-accent/10 to-card p-4 shadow-[0_0_15px_rgba(242,208,13,0.15)]">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-studio-accent/20 text-studio-accent">
            <Icon name="magic-wand" size="size-6" />
          </div>
          <div>
            <p className="text-base font-bold text-foreground">Analise de Comportamento IA</p>
            <p className="text-sm text-studio-accent/70">
              Baseado em {persona.painPoints.length + persona.desires.length} dados coletados da
              persona.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1">
          <span className="size-2 rounded-full bg-studio-accent" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Confianca: 85%
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN: Profile ID */}
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-7">
          {/* Behavioral ID Card */}
          <div
            className={cn(
              STUDIO_CARD_CLASSES,
              'group relative overflow-hidden border p-6 shadow-sm'
            )}
          >
            <div className="absolute right-0 top-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
              <Icon name="fingerprint" className="h-24 w-24 text-foreground" />
            </div>
            <div className="relative z-10 mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Perfil Comportamental</h3>
                <p className="mt-1 text-sm text-muted-foreground">Identificacao DISC e Eneagrama</p>
              </div>
              <span className="rounded border border-border bg-muted/20 px-2 py-1 font-mono text-xs text-muted-foreground">
                ID: #{persona.id.slice(0, 8).toUpperCase()}
              </span>
            </div>

            <div className="relative z-10 flex flex-col gap-8 md:flex-row">
              {/* DISC Section */}
              <div className="flex-1">
                <DISCSelector value={discType} onChange={setDiscType} suggested="D" />
              </div>

              {/* Vertical Divider */}
              <div className="hidden w-px bg-gradient-to-b from-transparent via-border to-transparent md:block" />

              {/* Enneagram Section */}
              <div className="flex-1">
                <EnneagramSelector
                  value={enneagramType}
                  wing={enneagramWing}
                  onChange={setEnneagramType}
                  onWingChange={setEnneagramWing}
                />
              </div>
            </div>
          </div>

          {/* Triggers Card */}
          <div className={cn(STUDIO_CARD_CLASSES, 'flex flex-1 flex-col border p-6 shadow-sm')}>
            <div className="mb-6 flex items-center gap-3">
              <Icon name="bolt" size="size-7" className="text-studio-accent" />
              <h3 className="text-lg font-bold text-foreground">Gatilhos Gerados</h3>
            </div>
            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-muted-foreground">
                  Palavras-Chave de Poder
                </h4>
                <div className="flex flex-wrap gap-2">
                  {powerKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-studio-accent/20 bg-studio-accent/10 px-3 py-1.5 text-sm font-medium text-studio-accent"
                    >
                      {keyword}
                    </span>
                  ))}
                  <span className="rounded-md border border-border bg-muted/20 px-3 py-1.5 text-sm text-muted-foreground">
                    Escalabilidade
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-muted-foreground">O que Evitar</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="cross-circle" size="size-5" className="mt-0.5 text-red-500" />
                    Textos longos sem estrutura
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="cross-circle" size="size-5" className="mt-0.5 text-red-500" />
                    Apelos excessivamente emocionais
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="cross-circle" size="size-5" className="mt-0.5 text-red-500" />
                    Falta de dados concretos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Relevance & Library */}
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-5">
          {/* Relevance Heatmap */}
          <div className={cn(STUDIO_CARD_CLASSES, 'border p-6 shadow-sm')}>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="chart-line" size="size-5" className="text-red-400" />
                <h3 className="text-lg font-bold text-foreground">Relevancia de Dores</h3>
              </div>
              <span className="rounded bg-muted/20 px-2 py-1 text-xs text-muted-foreground">
                Match c/ Perfil
              </span>
            </div>
            <div className="space-y-5">
              <RelevanceBar
                label="Falta de Tempo para Analise"
                percentage={98}
                level="Critico"
                color="from-red-500 to-studio-accent"
              />
              <RelevanceBar
                label="Dificuldade em Provar ROI"
                percentage={85}
                level="Alto"
                color="from-orange-500 to-amber-400"
              />
              <RelevanceBar
                label="Complexidade Tecnica"
                percentage={45}
                level="Medio"
                color="from-muted-foreground to-muted-foreground"
              />
            </div>
          </div>

          {/* Trigger Library */}
          <div
            className={cn(
              STUDIO_CARD_CLASSES,
              'flex flex-1 flex-col overflow-hidden border p-0 shadow-sm'
            )}
          >
            <div className="flex items-center justify-between border-b border-border bg-muted/5 p-6">
              <h3 className="text-lg font-bold text-foreground">Biblioteca de Gatilhos</h3>
              <button className="text-xs text-studio-accent hover:underline">Ver todos</button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <div className="flex flex-col gap-2">
                <TriggerLibraryItem
                  icon="brain"
                  iconBg="bg-blue-500/10"
                  iconColor="text-blue-400"
                  title="Vies de Autoridade"
                  description="Executivos lideres utilizam nossa solucao..."
                />
                <TriggerLibraryItem
                  icon="chart-line"
                  iconBg="bg-green-500/10"
                  iconColor="text-green-400"
                  title="Aversao a Perda"
                  description="Pare de perder 20% do orcamento mensalmente..."
                />
                <TriggerLibraryItem
                  icon="check-circle"
                  iconBg="bg-purple-500/10"
                  iconColor="text-purple-400"
                  title="Prova Social (Experts)"
                  description="Recomendado por Top Voices do setor..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <p className="text-sm italic text-muted-foreground">
          * As sugestoes sao geradas via GPT-4o com base no enriquecimento de dados da persona.
        </p>
      </div>
    </div>
  );
};

interface RelevanceBarProps {
  label: string;
  percentage: number;
  level: string;
  color: string;
}

const RelevanceBar: React.FC<RelevanceBarProps> = ({ label, percentage, level, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-sm">
      <span
        className={cn('font-medium', percentage > 80 ? 'text-foreground' : 'text-muted-foreground')}
      >
        {label}
      </span>
      <span
        className={cn(
          'font-bold',
          percentage > 90
            ? 'text-studio-accent'
            : percentage > 70
              ? 'text-amber-400'
              : 'text-muted-foreground'
        )}
      >
        {percentage}% {level}
      </span>
    </div>
    <div className="h-2 w-full rounded-full bg-muted/20">
      <div
        className={cn('h-full rounded-full bg-gradient-to-r', color)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

interface TriggerLibraryItemProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const TriggerLibraryItem: React.FC<TriggerLibraryItemProps> = ({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}) => (
  <div className="group cursor-pointer rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/20">
    <div className="mb-1 flex items-center gap-3">
      <div className={cn('flex size-8 items-center justify-center rounded', iconBg)}>
        <Icon name={icon} size="size-4" className={iconColor} />
      </div>
      <p className="text-sm font-bold text-muted-foreground transition-colors group-hover:text-studio-accent">
        {title}
      </p>
    </div>
    <p className="pl-11 text-xs text-muted-foreground">&quot;{description}&quot;</p>
  </div>
);

export default PersonaAdvancedPsychographics;
