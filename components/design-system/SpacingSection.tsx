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
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Espaçamentos</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
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
              className="bg-primary/50 dark:bg-primary/30 rounded-md transition-all duration-500"
              style={{ width: `${space.px}px`, height: '32px' }}
            ></div>
             <div className="text-xs text-muted-foreground font-sans hidden sm:block font-semibold">
                {space.tw}
             </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-muted/30 rounded-lg border border-dashed border-border">
        <h3 className="font-sans font-semibold mb-6">Exemplo de Aplicação</h3>
        <div className="flex flex-wrap gap-8">
            <div className="bg-card p-8 shadow-sm border border-border rounded-lg">
                <div className="w-16 h-16 bg-primary mb-4 rounded-lg"></div>
                <div className="h-4 w-32 bg-muted rounded-md mb-2"></div>
                <div className="h-4 w-24 bg-muted rounded-md"></div>
                <p className="mt-4 text-xs font-mono text-primary">p-8 (32px)</p>
            </div>
            <div className="bg-card p-6 shadow-sm border border-border rounded-lg">
                <div className="w-16 h-16 bg-primary mb-4 rounded-lg"></div>
                <div className="h-4 w-32 bg-muted rounded-md mb-2"></div>
                <div className="h-4 w-24 bg-muted rounded-md"></div>
                <p className="mt-4 text-xs font-mono text-primary">p-6 (24px)</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpacingSection;