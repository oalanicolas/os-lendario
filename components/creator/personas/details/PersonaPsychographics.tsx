import React from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { Persona } from '../../../../hooks/useAudienceProfiles';

export interface PersonaPsychographicsProps {
  persona: Persona;
  onViewChange?: (view: string) => void;
}

export const PersonaPsychographics: React.FC<PersonaPsychographicsProps> = ({ persona }) => {
  return (
    <div className="grid animate-fade-in grid-cols-1 gap-6 pb-20 md:grid-cols-2 xl:grid-cols-4">
      <PsychCard
        title="Dificuldades"
        count={String(persona.painPoints.length).padStart(2, '0')}
        icon="warning"
        color="text-red-400"
      >
        {persona.painPoints.map((pain, i) => (
          <ListItem key={i} text={pain.superficial} tag="Manual" tagIcon="edit" />
        ))}
        {persona.painPoints.length === 0 && (
          <ListItem text="Nenhuma dificuldade mapeada" tag="Pendente" tagIcon="clock" />
        )}
      </PsychCard>

      <PsychCard
        title="Medos"
        count={String(persona.psychographics.fears.length).padStart(2, '0')}
        icon="shield"
        color="text-purple-400"
      >
        {persona.psychographics.fears.map((fear, i) => (
          <ListItem
            key={i}
            text={fear}
            tag="IA Gerado"
            tagIcon="robot"
            tagColor="text-blue-400"
            bg="bg-blue-400/10"
          />
        ))}
        {persona.psychographics.fears.length === 0 && (
          <ListItem text="Nenhum medo mapeado" tag="Pendente" tagIcon="clock" />
        )}
      </PsychCard>

      <PsychCard
        title="Desejos"
        count={String(persona.desires.length).padStart(2, '0')}
        icon="diamond"
        color="text-green-400"
      >
        {persona.desires.map((desire, i) => (
          <ListItem key={i} text={desire.surface} tag="Manual" tagIcon="edit" />
        ))}
        {persona.desires.length === 0 && (
          <ListItem text="Nenhum desejo mapeado" tag="Pendente" tagIcon="clock" />
        )}
      </PsychCard>

      <PsychCard
        title="Valores"
        count={String(persona.psychographics.values.length).padStart(2, '0')}
        icon="heart"
        color="text-orange-400"
      >
        {persona.psychographics.values.map((value, i) => (
          <ListItem
            key={i}
            text={value}
            tag="IA Gerado"
            tagIcon="robot"
            tagColor="text-blue-400"
            bg="bg-blue-400/10"
          />
        ))}
        {persona.psychographics.values.length === 0 && (
          <ListItem text="Nenhum valor mapeado" tag="Pendente" tagIcon="clock" />
        )}
      </PsychCard>

      <PsychCard title="Pensamentos ao Deitar" count="03" icon="moon" color="text-indigo-400">
        <ListItem
          text="Sera que escolhi o nicho certo?"
          tag="IA Gerado"
          tagIcon="robot"
          tagColor="text-blue-400"
          bg="bg-blue-400/10"
        />
        <ListItem text="Preciso me organizar melhor amanha." tag="Manual" tagIcon="edit" />
        <ListItem
          text="O mercado esta mudando e eu preciso acompanhar."
          tag="IA Gerado"
          tagIcon="robot"
          tagColor="text-blue-400"
          bg="bg-blue-400/10"
        />
      </PsychCard>

      <PsychCard
        title="Historias Constrangedoras"
        count="01"
        icon="exclamation"
        color="text-pink-400"
      >
        <ListItem
          text="Investiu em um curso que nao entregou o prometido."
          tag="Manual"
          tagIcon="edit"
        />
      </PsychCard>
    </div>
  );
};

interface PsychCardProps {
  title: string;
  count: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}

const PsychCard: React.FC<PsychCardProps> = ({ title, count, icon, color, children }) => (
  <div className={cn(STUDIO_CARD_CLASSES, 'flex h-fit flex-col overflow-hidden border')}>
    <div className="flex items-center justify-between border-b border-border/50 bg-muted/5 p-5">
      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
        <Icon name={icon} size="size-5" className={color} />
        {title}
      </h3>
      <span className="font-mono text-xs text-muted-foreground">{count}</span>
    </div>
    <div className="flex flex-col gap-3 p-4">{children}</div>
    <div className="grid grid-cols-2 gap-2 border-t border-border/50 p-3">
      <button className="flex items-center justify-center gap-1.5 rounded px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground">
        <Icon name="plus" size="size-4" /> Adicionar
      </button>
      <button className="flex items-center justify-center gap-1.5 rounded px-3 py-2 text-xs font-semibold text-studio-accent transition-colors hover:bg-studio-accent/10">
        <Icon name="magic-wand" size="size-4" /> Gerar IA
      </button>
    </div>
  </div>
);

interface ListItemProps {
  text: string;
  tag: string;
  tagIcon: string;
  tagColor?: string;
  bg?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  text,
  tag,
  tagIcon,
  tagColor = 'text-studio-accent/70',
  bg = 'bg-muted/20',
}) => (
  <div className="group relative rounded-lg border border-transparent bg-background/40 p-3 transition-all hover:border-border">
    <p className="pr-6 text-sm leading-relaxed text-muted-foreground">{text}</p>
    <div className="mt-2 flex items-center gap-2">
      <span
        className={cn(
          'flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
          tagColor,
          bg
        )}
      >
        <Icon name={tagIcon} size="size-3" /> {tag}
      </span>
    </div>
    <button className="absolute right-2 top-2 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100">
      <Icon name="menu-dots-h" size="size-4" />
    </button>
  </div>
);

export default PersonaPsychographics;
