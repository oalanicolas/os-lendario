import React from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { Persona } from '../../../../hooks/useAudienceProfiles';

export interface PersonaBaseProps {
  persona: Persona;
  onEdit?: () => void;
}

export const PersonaBase: React.FC<PersonaBaseProps> = ({ persona, onEdit }) => {
  return (
    <div className="grid animate-fade-in grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <InfoCard icon="user" title="Demografia" onEdit={onEdit}>
        <Row label="Idade" value={persona.demographics.age} />
        <Row label="Cargo" value={persona.demographics.role} />
        <Row label="Localidade" value={persona.demographics.location} />
        <Row label="Renda" value={persona.demographics.income} />
        <Row label="ICP?" value={persona.isIcp ? 'Sim' : 'Nao'} badge={persona.isIcp} />
      </InfoCard>

      <InfoCard icon="briefcase" title="Profissional" onEdit={onEdit}>
        <Row label="Cargo" value={persona.demographics.role} />
        <Row label="Nivel Tec." value={persona.technicalLevel || '--'} />
        <Row label="Decisor?" value={persona.isIcp ? 'Sim' : 'Nao'} badge={persona.isIcp} />
      </InfoCard>

      <DigitalProfileCard />

      <div
        className={cn(
          STUDIO_CARD_CLASSES,
          'flex flex-col border p-6 shadow-lg md:col-span-2 xl:col-span-3'
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Icon name="brain" size="size-6" className="text-studio-accent" />
            <h3>Nivel de Consciencia</h3>
          </div>
          <button
            onClick={onEdit}
            className="text-muted-foreground transition-colors hover:text-studio-accent"
          >
            <Icon name="edit" size="size-5" />
          </button>
        </div>
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="w-full flex-1">
            <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Inconsciente</span>
              <span className="text-studio-accent">Consciente da Solucao</span>
              <span>Totalmente Consciente</span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/30">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-studio-accent/30 to-studio-accent shadow-[0_0_10px_rgba(242,208,13,0.5)]"
                style={{ width: '70%' }}
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {persona.psychographics.mindset ||
                'Esta persona esta em busca de crescimento e evolucao constante.'}
            </p>
          </div>
          <div className="w-full rounded-lg border border-border bg-background/40 p-4 md:w-auto md:min-w-[300px]">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-studio-accent/80">
              Gatilhos de Compra
            </h4>
            <div className="flex flex-col gap-2">
              {persona.desires.slice(0, 3).map((desire, i) => (
                <TriggerItem key={i} text={desire.surface} />
              ))}
              {persona.desires.length === 0 && <TriggerItem text="Nenhum gatilho definido" />}
            </div>
          </div>
        </div>
      </div>
      <div className="h-10" />
    </div>
  );
};

interface InfoCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children, onEdit }) => (
  <div
    className={cn(
      STUDIO_CARD_CLASSES,
      'flex flex-col border p-6 shadow-lg transition-colors hover:border-muted-foreground/30'
    )}
  >
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2 text-lg font-bold text-foreground">
        <Icon name={icon} size="size-6" className="text-studio-accent" />
        <h3>{title}</h3>
      </div>
      <button
        onClick={onEdit}
        className="text-muted-foreground transition-colors hover:text-studio-accent"
      >
        <Icon name="edit" size="size-5" />
      </button>
    </div>
    <div className="flex flex-col gap-4 divide-y divide-border">{children}</div>
  </div>
);

interface RowProps {
  label: string;
  value: string;
  badge?: boolean;
}

const Row: React.FC<RowProps> = ({ label, value, badge }) => (
  <div className="grid grid-cols-[30%_1fr] items-center py-2 first:pt-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    {badge ? (
      <span className="inline-flex w-fit items-center gap-1.5 rounded bg-studio-accent/10 px-2 py-1 text-sm font-bold text-studio-accent">
        <Icon name="check-circle" size="size-4" /> {value}
      </span>
    ) : (
      <span className="text-sm font-medium text-foreground">{value}</span>
    )}
  </div>
);

interface TriggerItemProps {
  text: string;
}

const TriggerItem: React.FC<TriggerItemProps> = ({ text }) => (
  <div className="flex items-center gap-2">
    <Icon name="bolt" size="size-4" className="text-studio-accent" />
    <span className="text-sm text-foreground">{text}</span>
  </div>
);

const DigitalProfileCard: React.FC = () => (
  <div
    className={cn(
      STUDIO_CARD_CLASSES,
      'flex flex-col border p-6 shadow-lg transition-colors hover:border-muted-foreground/30'
    )}
  >
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2 text-lg font-bold text-foreground">
        <Icon name="laptop" size="size-6" className="text-studio-accent" />
        <h3>Perfil Digital</h3>
      </div>
      <button className="text-muted-foreground transition-colors hover:text-studio-accent">
        <Icon name="edit" size="size-5" />
      </button>
    </div>
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
          Redes Sociais Ativas
        </p>
        <div className="flex flex-wrap gap-2">
          <SocialBadge name="LinkedIn" icon="linkedin" />
          <SocialBadge name="YouTube" icon="play" />
          <SocialBadge name="Instagram" icon="camera" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
          Dispositivos Principais
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <DeviceItem icon="laptop" name="Desktop" active />
          <div className="h-8 w-px bg-border" />
          <DeviceItem icon="mobile" name="Mobile" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
          Consumo de Conteudo
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-foreground">
          <li>Newsletters e Email Marketing</li>
          <li>Videos e Cursos Online</li>
          <li>Podcasts e Audiobooks</li>
        </ul>
      </div>
    </div>
  </div>
);

interface SocialBadgeProps {
  name: string;
  icon: string;
}

const SocialBadge: React.FC<SocialBadgeProps> = ({ name, icon }) => (
  <div className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5">
    <Icon name={icon} size="size-4" className="text-muted-foreground" />
    <span className="text-sm text-muted-foreground">{name}</span>
  </div>
);

interface DeviceItemProps {
  icon: string;
  name: string;
  active?: boolean;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ icon, name, active }) => (
  <div className="flex flex-col items-center gap-1">
    <Icon
      name={icon}
      size="size-7"
      className={active ? 'text-studio-accent/80' : 'text-muted-foreground/50'}
    />
    <span className="text-xs">{name}</span>
  </div>
);

export default PersonaBase;
