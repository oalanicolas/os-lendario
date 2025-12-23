import React from 'react';

const SpacingSection: React.FC = () => {
  const spacers = [
    { px: 4, tw: 'p-1 / gap-1' },
    { px: 8, tw: 'p-2 / gap-2' },
    { px: 16, tw: 'p-4 / gap-4' },
    { px: 24, tw: 'p-6 / gap-6' },
    { px: 32, tw: 'p-8 / gap-8' },
    { px: 40, tw: 'p-10 / gap-10' },
    { px: 48, tw: 'p-12 / gap-12' },
    { px: 64, tw: 'p-16 / gap-16' },
    { px: 80, tw: 'p-20 / gap-20' },
    { px: 96, tw: 'p-24 / gap-24' },
    { px: 128, tw: 'p-32 / gap-32' },
  ];

  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Espaçamentos</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          A consistência visual nasce da precisão matemática. Utilizamos um grid de 8px.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {spacers.map((space) => (
          <div key={space.px} className="flex items-center gap-6">
            <div className="w-32 text-right font-mono text-sm text-muted-foreground">
              {space.px}px
            </div>
            <div
              className="rounded-md bg-primary/50 transition-all duration-500 dark:bg-primary/30"
              style={{ width: `${space.px}px`, height: '32px' }}
            ></div>
            <div className="hidden font-sans text-xs font-semibold text-muted-foreground sm:block">
              {space.tw}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8">
        <h3 className="mb-6 font-sans font-semibold">Exemplo de Aplicação</h3>
        <div className="flex flex-wrap gap-8">
          <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 h-16 w-16 rounded-lg bg-primary"></div>
            <div className="mb-2 h-4 w-32 rounded-md bg-muted"></div>
            <div className="h-4 w-24 rounded-md bg-muted"></div>
            <p className="mt-4 font-mono text-xs text-primary">p-8 (32px)</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 h-16 w-16 rounded-lg bg-primary"></div>
            <div className="mb-2 h-4 w-32 rounded-md bg-muted"></div>
            <div className="h-4 w-24 rounded-md bg-muted"></div>
            <p className="mt-4 font-mono text-xs text-primary">p-6 (24px)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacingSection;
