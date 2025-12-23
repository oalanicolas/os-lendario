import React from 'react';
import { TypeScale } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Icon } from '../ui/icon';

const TypographySection: React.FC = () => {
  const typeScales: TypeScale[] = [
    { label: 'Hero / Display', size: 'text-7xl md:text-8xl', px: 96, weight: 'Bold' },
    { label: 'H1', size: 'text-5xl md:text-6xl', px: 60, weight: 'Bold' },
    { label: 'H2', size: 'text-4xl', px: 36, weight: 'Bold' },
    { label: 'H3', size: 'text-3xl', px: 30, weight: 'Bold' },
    { label: 'H4', size: 'text-2xl', px: 24, weight: 'SemiBold' },
    { label: 'UI Large', size: 'text-lg', px: 18, weight: 'SemiBold' },
    { label: 'Body / UI Base', size: 'text-base', px: 16, weight: 'SemiBold' },
    { label: 'Small', size: 'text-sm', px: 14, weight: 'SemiBold' },
    { label: 'Caption', size: 'text-xs', px: 12, weight: 'SemiBold' },
  ];

  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Tipografia</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Uma dupla tipográfica projetada para máxima legibilidade.{' '}
          <strong className="font-sans text-primary">Inter</strong> para UI (padrão SemiBold),{' '}
          <strong className="font-serif text-primary">Source Serif 4</strong> para textos longos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="rounded-lg border border-border p-8">
          <span className="mb-4 block font-sans text-8xl font-bold">Aa</span>
          <h3 className="mb-2 font-sans text-2xl font-semibold">Inter</h3>
          <p className="font-sans text-muted-foreground">
            Títulos, UI & Chamadas de Ação.
            <br />
            Peso padrão para UI: <span className="font-bold text-foreground">SemiBold (600)</span>
          </p>
        </div>
        <div className="rounded-lg border border-border p-8">
          <span className="mb-4 block font-serif text-8xl font-normal">Aa</span>
          <h3 className="mb-2 font-serif text-2xl font-semibold">Source Serif 4</h3>
          <p className="font-serif text-muted-foreground">
            Textos longos, parágrafos e citações.
            <br />
            Fluidez e leitura suave.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <h3 className="border-b border-border pb-4 font-sans text-xl font-semibold">
          Escala Tipográfica
        </h3>

        <div className="space-y-8">
          {typeScales.map((type) => (
            <div
              key={type.px}
              className="flex flex-col gap-4 border-b border-border pb-8 last:border-0 md:flex-row md:items-baseline md:gap-12"
            >
              <div className="w-48 shrink-0">
                <span className="block font-sans text-sm font-semibold text-primary">
                  {type.label}
                </span>
                <span className="mt-1 block font-mono text-xs text-muted-foreground">
                  {type.px}px / {type.weight}
                </span>
              </div>
              <div
                className={`overflow-hidden text-ellipsis whitespace-nowrap font-sans leading-tight ${type.size} ${type.weight === 'Bold' ? 'font-bold' : type.weight === 'SemiBold' ? 'font-semibold' : type.weight === 'Medium' ? 'font-medium' : 'font-normal'}`}
              >
                Academia Lendária
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- GUIDELINES --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Icon name="check-circle" /> Diretrizes de Tipografia
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* DO'S */}
          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-green">
                <Icon name="check" /> O que fazer (Do)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Hierarquia Clara</span>
                <p className="text-xs text-muted-foreground">
                  Use variações de tamanho e peso (H1 {'>'} H2 {'>'} H3) para guiar o olho do
                  usuário pela página.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Mistura de Fontes</span>
                <p className="text-xs text-muted-foreground">
                  Use <strong>Inter</strong> para botões, menus e títulos curtos. Use{' '}
                  <strong>Source Serif</strong> para parágrafos longos e descrições.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Legibilidade</span>
                <p className="text-xs text-muted-foreground">
                  Mantenha linhas de texto entre 50-75 caracteres de largura para conforto de
                  leitura.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* DON'TS */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Icon name="cross" /> O que não fazer (Don't)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Tudo em Caixa Alta</span>
                <p className="text-xs text-muted-foreground">
                  Evite usar ALL CAPS em frases longas. Dificulta a leitura. Use apenas para Badges
                  ou Labels curtos.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Centralizar Texto Longo</span>
                <p className="text-xs text-muted-foreground">
                  Não centralize parágrafos com mais de 3 linhas. Use alinhamento à esquerda para
                  legibilidade.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Muitos Pesos</span>
                <p className="text-xs text-muted-foreground">
                  Evite usar Thin (100) ou Black (900) em tamanhos pequenos. O padrão é SemiBold
                  (600) para UI.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TypographySection;
