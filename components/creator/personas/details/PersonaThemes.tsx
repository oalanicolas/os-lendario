import React from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { Persona } from '../../../../hooks/useAudienceProfiles';

export interface PersonaThemesProps {
  persona: Persona;
}

export const PersonaThemes: React.FC<PersonaThemesProps> = ({ persona }) => {
  return (
    <div className="grid max-w-[1200px] animate-fade-in grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      <ThemeCard
        title="Baseados em Perguntas"
        icon="interrogation"
        color="text-purple-400"
        bg="bg-purple-500/10"
      >
        <ThemeItem
          icon="chat-bubble"
          text="Como estruturar um time de growth com pouco budget?"
          tag="IA Generated"
        />
        <ThemeItem
          icon="chat-bubble"
          text="Qual a melhor ferramenta de CRM para B2B Enterprise?"
          tag="Manual"
          tagColor="bg-muted-foreground"
        />
        <ThemeItem
          icon="chat-bubble"
          text="Como alinhar marketing e vendas para reduzir o CAC?"
          tag="IA Generated"
        />
      </ThemeCard>

      <ThemeCard
        title="Baseados em Historias"
        icon="book"
        color="text-blue-400"
        bg="bg-blue-500/10"
        action="+ Adicionar nova historia"
      >
        <ThemeItem
          icon="quote"
          text="O dia que perdi 30% do budget trimestral em uma campanha errada."
          tag="IA Generated"
        />
        <ThemeItem
          icon="quote"
          text="Licao aprendida: contratacao de CMO sem fit cultural."
          tag="Manual"
          tagColor="bg-muted-foreground"
        />
      </ThemeCard>

      <ThemeCard
        title="Contraintuitivos"
        icon="brain"
        color="text-orange-400"
        bg="bg-orange-500/10"
      >
        <ThemeItem
          icon="lightbulb"
          text="Por que investir em Branding agora e perda de dinheiro."
          tag="IA Generated"
        />
        <ThemeItem
          icon="lightbulb"
          text="Pare de postar todo dia: a falacia da consistencia cega."
          tag="IA Generated"
        />
        <ThemeItem
          icon="lightbulb"
          text="Sua persona nao quer conteudo educativo, quer atalhos."
          tag="IA Generated"
        />
      </ThemeCard>

      <div className={cn(STUDIO_CARD_CLASSES, 'flex h-full flex-col gap-4 border p-5 shadow-lg')}>
        <div className="flex items-center justify-between border-b border-border/50 pb-2">
          <div className="flex items-center gap-2 text-foreground">
            <span className="rounded-md bg-green-500/10 p-1.5">
              <Icon name="chart-line" size="size-5" className="text-green-400" />
            </span>
            <h3 className="text-base font-bold">Nivel de Consciencia</h3>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <Icon name="menu-dots-h" size="size-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <AwarenessLevel
            letter="U"
            color="text-zinc-400"
            bg="bg-zinc-800"
            title="Unaware"
            sub="Totalmente inconsciente"
            count="5"
          />
          <AwarenessLevel
            letter="P"
            color="text-red-400"
            bg="bg-red-900/30"
            title="Problem Aware"
            sub="Consciente do problema"
            count="3"
          />
          <AwarenessLevel
            letter="S"
            color="text-yellow-400"
            bg="bg-yellow-900/30"
            title="Solution Aware"
            sub="Consciente da solucao"
            count="8"
          />
        </div>
        <button className="group mt-auto w-full rounded-lg border border-border bg-card py-2.5 text-sm font-bold text-studio-accent/70 transition-all hover:bg-muted/20 hover:text-foreground">
          Ver todos os niveis{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
};

interface ThemeCardProps {
  title: string;
  icon: string;
  color: string;
  bg: string;
  children: React.ReactNode;
  action?: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ title, icon, color, bg, children, action }) => (
  <div
    className={cn(
      STUDIO_CARD_CLASSES,
      'group flex flex-col gap-4 border p-5 shadow-lg transition-colors hover:border-border/80'
    )}
  >
    <div className="flex items-center justify-between border-b border-border/50 pb-2">
      <div className="flex items-center gap-2 text-foreground">
        <span className={cn('rounded-md p-1.5', bg)}>
          <Icon name={icon} size="size-5" className={color} />
        </span>
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      <button className="text-muted-foreground hover:text-foreground">
        <Icon name="menu-dots-h" size="size-5" />
      </button>
    </div>
    <ul className="flex flex-col gap-2">{children}</ul>
    {action && (
      <button className="mt-auto w-full rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground transition-colors hover:border-studio-accent/50 hover:text-studio-accent">
        {action}
      </button>
    )}
  </div>
);

interface ThemeItemProps {
  icon: string;
  text: string;
  tag: string;
  tagColor?: string;
}

const ThemeItem: React.FC<ThemeItemProps> = ({
  icon,
  text,
  tag,
  tagColor = 'bg-studio-accent',
}) => (
  <li className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3 transition-colors hover:border-studio-accent/30">
    <Icon name={icon} size="size-4" className="mt-0.5 text-studio-accent/70" />
    <div className="flex flex-col gap-1">
      <p className="text-sm leading-snug text-muted-foreground">{text}</p>
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <span className={cn('size-1.5 rounded-full', tagColor)} /> {tag}
      </span>
    </div>
  </li>
);

interface AwarenessLevelProps {
  letter: string;
  color: string;
  bg: string;
  title: string;
  sub: string;
  count: string;
}

const AwarenessLevel: React.FC<AwarenessLevelProps> = ({
  letter,
  color,
  bg,
  title,
  sub,
  count,
}) => (
  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-3">
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex size-8 items-center justify-center rounded-full text-xs font-bold',
          bg,
          color
        )}
      >
        {letter}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground">{sub}</span>
      </div>
    </div>
    <span className="rounded bg-muted/30 px-2 py-1 text-xs font-medium text-foreground">
      {count} Temas
    </span>
  </div>
);

export default PersonaThemes;
