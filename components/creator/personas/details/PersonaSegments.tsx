import React from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../ui/icon';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import type { Persona } from '../../../../hooks/useAudienceProfiles';

export interface PersonaSegmentsProps {
  persona: Persona;
  onViewChange?: (view: string) => void;
}

export const PersonaSegments: React.FC<PersonaSegmentsProps> = ({ persona, onViewChange }) => {
  const positiveKeywords = [
    '+software de gestao',
    '+crm vendas',
    '+automacao marketing',
    '"plataforma b2b"',
    '[ferramenta growth]',
  ];
  const negativeKeywords = ['-gratis', '-open source', '-barato', '-curso', '-download crack'];

  return (
    <div className="grid animate-fade-in grid-cols-1 gap-6 pb-20 xl:grid-cols-3">
      {/* Winners */}
      <div className="flex flex-col gap-6 xl:col-span-2">
        <div className={cn(STUDIO_CARD_CLASSES, 'flex flex-col overflow-hidden border')}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-2">
              <div className="rounded bg-green-900/20 p-1.5 text-green-500">
                <Icon name="check-circle" size="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Segmentacoes que FUNCIONARAM</h3>
            </div>
            <button className="text-muted-foreground transition-colors hover:text-foreground">
              <Icon name="menu-dots-h" size="size-5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-muted/20 text-xs font-semibold uppercase">
                <tr>
                  <th className="px-6 py-4">Nome do Segmento</th>
                  <th className="px-6 py-4">Plataforma</th>
                  <th className="px-6 py-4">CPA Medio</th>
                  <th className="px-6 py-4">Conversao</th>
                  <th className="px-6 py-4">Data Teste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <TableRow
                  name="Interesses: SaaS & B2B Software"
                  sub="Expansao de lookalike 1%"
                  icon="globe"
                  iconColor="text-blue-400"
                  plat="LinkedIn Ads"
                  cpa="R$ 12,50"
                  conv="4.2%"
                  date="12 Out 2023"
                />
                <TableRow
                  name="Cargo: Diretor de Marketing"
                  sub="Segmentacao direta"
                  icon="chart-line"
                  iconColor="text-blue-500"
                  plat="Meta Ads"
                  cpa="R$ 8,90"
                  conv="3.8%"
                  date="05 Nov 2023"
                />
                <TableRow
                  name="Intencao: 'Software de Gestao'"
                  sub="In-market audiences"
                  icon="search"
                  iconColor="text-red-400"
                  plat="Google Ads"
                  cpa="R$ 15,20"
                  conv="5.1%"
                  date="10 Set 2023"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Losers */}
        <div className={cn(STUDIO_CARD_CLASSES, 'flex flex-col overflow-hidden border')}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-2">
              <div className="rounded bg-red-900/20 p-1.5 text-red-500">
                <Icon name="cross-circle" size="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Segmentacoes que NAO funcionaram
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-muted/20 text-xs font-semibold uppercase">
                <tr>
                  <th className="px-6 py-4">Nome do Segmento</th>
                  <th className="px-6 py-4">Motivo / Alerta</th>
                  <th className="px-6 py-4">CPA Medio</th>
                  <th className="px-6 py-4">Data Teste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="group transition-colors hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium text-foreground">
                    Interesses: Startups Gerais
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-orange-400">
                      <Icon name="exclamation" size="size-5" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Publico muito amplo
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">R$ 45,00</td>
                  <td className="px-6 py-4">15 Out 2023</td>
                </tr>
                <tr className="group transition-colors hover:bg-muted/20">
                  <td className="px-6 py-4 font-medium text-foreground">
                    Cargo: Estagiario de Marketing
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-red-400">
                      <Icon name="chart-line-down" size="size-5" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Baixa intencao de compra
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">R$ 18,00</td>
                  <td className="px-6 py-4">22 Out 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="flex flex-col gap-6 xl:col-span-1">
        <div className={cn(STUDIO_CARD_CLASSES, 'flex h-full flex-col overflow-hidden border')}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-2">
              <div className="rounded bg-blue-900/20 p-1.5 text-blue-500">
                <Icon name="search" size="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Palavras-chave (Google Ads)</h3>
            </div>
            <button className="text-studio-accent transition-colors hover:text-foreground">
              <Icon name="edit" size="size-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-8 p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-400">
                  <Icon name="thumbs-up" size="size-4" /> Positivas
                </h4>
                <span className="text-xs text-muted-foreground">Alto volume de conv.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {positiveKeywords.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center rounded border border-green-900/30 bg-green-900/10 px-2.5 py-1 text-xs font-medium text-green-200"
                  >
                    {k}
                  </span>
                ))}
                <button className="inline-flex items-center rounded border border-dashed border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground">
                  + Adicionar
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-400">
                  <Icon name="thumbs-down" size="size-4" /> Negativas
                </h4>
                <span className="text-xs text-muted-foreground">Evita desperdicio</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {negativeKeywords.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center rounded border border-red-900/30 bg-red-900/10 px-2.5 py-1 text-xs font-medium text-red-200"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-auto border-t border-studio-accent/20 bg-studio-accent/5 p-4">
            <div className="flex gap-3">
              <Icon name="lightbulb" size="size-6" className="text-studio-accent" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">Dica de Otimizacao</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Adicione palavras-chave de concorrentes diretos para capturar demanda qualificada
                  de fundo de funil.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => onViewChange?.('ai-preview')}
          className={cn(
            STUDIO_CARD_CLASSES,
            'group relative flex cursor-pointer flex-col gap-3 overflow-hidden border-studio-accent/30 bg-gradient-to-br from-card to-studio-accent/10 p-5'
          )}
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-studio-accent/20 blur-3xl transition-all group-hover:bg-studio-accent/30" />
          <h3 className="z-10 font-bold text-foreground">Expandir Segmentacao?</h3>
          <p className="z-10 text-sm text-muted-foreground">
            Nossa IA pode analisar seus dados de CRM e sugerir novos publicos lookalike.
          </p>
          <button className="z-10 mt-2 w-full rounded-lg border border-studio-accent/30 bg-card py-2 text-sm font-bold text-studio-accent transition-all hover:bg-studio-accent hover:text-background">
            Analisar Oportunidades
          </button>
        </div>
      </div>
    </div>
  );
};

interface TableRowProps {
  name: string;
  sub: string;
  icon: string;
  iconColor: string;
  plat: string;
  cpa: string;
  conv: string;
  date: string;
}

const TableRow: React.FC<TableRowProps> = ({
  name,
  sub,
  icon,
  iconColor,
  plat,
  cpa,
  conv,
  date,
}) => (
  <tr className="group transition-colors hover:bg-muted/20">
    <td className="px-6 py-4 font-medium text-foreground">
      {name}
      <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Icon name={icon} size="size-5" className={iconColor} />
        {plat}
      </div>
    </td>
    <td className="px-6 py-4 text-foreground">{cpa}</td>
    <td className="px-6 py-4 font-bold text-green-400">{conv}</td>
    <td className="px-6 py-4">{date}</td>
  </tr>
);

export default PersonaSegments;
