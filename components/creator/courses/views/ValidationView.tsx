import React from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import type { Course } from '../types';

// =============================================================================
// TYPES
// =============================================================================

export interface ValidationViewProps {
  course: Course | null;
  onBack: () => void;
  onPublish: () => void;
  /** Stats to display - defaults to mock values */
  stats?: {
    lessons: number;
    duration: string;
    materials: string;
  };
}

// =============================================================================
// STAT CARD
// =============================================================================

interface StatItemProps {
  label: string;
  value: string | number;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className="mt-1 text-3xl font-bold">{value}</p>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ValidationView: React.FC<ValidationViewProps> = ({
  course: _course,
  onBack,
  onPublish,
  stats = {
    lessons: 12,
    duration: '2h 15m',
    materials: '5 PDFs',
  },
}) => {
  return (
    <div className="flex min-h-[60vh] animate-fade-in flex-col items-center justify-center space-y-8 text-center">
      <div className="bg-success/10 text-success mb-4 flex h-24 w-24 items-center justify-center rounded-full">
        <Icon name="check" size="size-10" />
      </div>

      <h1 className="font-sans text-4xl font-bold">Curso Pronto para Publicacao!</h1>

      <p className="max-w-2xl font-serif text-xl text-muted-foreground">
        Todas as licoes foram geradas, validadas pelos frameworks GPS e Didatica Lendaria, e
        aprovadas.
      </p>

      <div className="grid grid-cols-3 gap-8 rounded-xl border border-border bg-card p-8 text-left shadow-lg">
        <StatItem label="Aulas" value={stats.lessons} />
        <StatItem label="Duracao" value={stats.duration} />
        <StatItem label="Materiais" value={stats.materials} />
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Voltar ao Dashboard
        </Button>
        <Button size="lg" className="shadow-xl" onClick={onPublish}>
          Publicar Agora
        </Button>
      </div>
    </div>
  );
};

export default ValidationView;
