import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CodeBlock } from '../ui/code-block';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const TokensSection: React.FC = () => {
  const [density, setDensity] = useState<'compact' | 'default' | 'comfortable'>('default');

  return (
    <div className="animate-fade-in space-y-12 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-5">
          <Icon name="palette" className="-rotate-12 text-[12rem]" />
        </div>
        <div className="relative z-10 space-y-6 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/50 text-primary backdrop-blur-sm"
            >
              v2.0.0
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">Tailwind + Shadcn</span>
          </div>
          <h2 className="max-w-4xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
            Tokenização: <span className="text-primary">Guia Técnico</span>.
          </h2>
          <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
            Referência definitiva de implementação. Define a única fonte de verdade para cores,
            tipografia, layout e comportamento.
          </p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="principles"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="diamond" className="mr-2 size-4" /> Princípios & Code
          </TabsTrigger>
          <TabsTrigger
            value="foundation"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="palette" className="mr-2 size-4" /> Cores & Efeitos
          </TabsTrigger>
          <TabsTrigger
            value="layout"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="apps" className="mr-2 size-4" /> Layout & Spacing
          </TabsTrigger>
          <TabsTrigger
            value="components"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="cube" className="mr-2 size-4" /> Componentes & Estados
          </TabsTrigger>
          <TabsTrigger
            value="setup"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent bg-primary/5 px-6 py-3 font-bold text-primary data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="copy" className="mr-2 size-4" /> Setup & Copy
          </TabsTrigger>
        </TabsList>

        {/* --- ABA PRINCÍPIOS --- */}
        <TabsContent value="principles" className="animate-fade-in space-y-8">
          {/* Principles Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <Icon name="database" className="mb-2 size-6 text-primary" />
                <CardTitle className="text-base">Single Source</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Tokens definidos em UM lugar (globals.css). Nunca duplique valores.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Icon name="label" className="mb-2 size-6 text-brand-blue" />
                <CardTitle className="text-base">Semantic First</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use significado (<code>bg-primary</code>), não valor (<code>bg-gray-900</code>).
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Icon name="moon" className="mb-2 size-6 text-brand-indigo" />
                <CardTitle className="text-base">Theme Aware</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Toda cor deve ter variante light/dark. Estrutura é fixa.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Icon name="link" className="mb-2 size-6 text-brand-green" />
                <CardTitle className="text-base">Predictable Pairing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code>bg-primary</code> sempre exige <code>text-primary-foreground</code>.
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Class Order */}
            <Card>
              <CardHeader>
                <CardTitle>Ordem de Classes Tailwind</CardTitle>
                <CardDescription>Convenção obrigatória para consistência.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    '1. Layout (display, position, grid)',
                    '2. Sizing (width, height)',
                    '3. Spacing (margin, padding)',
                    '4. Typography (font, text)',
                    '5. Colors (bg, text, border)',
                    '6. Borders (rounded, width)',
                    '7. Effects (shadow, opacity)',
                    '8. Transitions',
                    '9. States (hover, focus)',
                    '10. Responsive (sm:, lg:)',
                  ].map((rule, i) => (
                    <div
                      key={i}
                      className="border-b border-border/50 pb-1 font-mono text-sm text-muted-foreground last:border-0"
                    >
                      {rule}
                    </div>
                  ))}
                </div>
                <Alert variant="destructive" className="mt-4">
                  <Icon name="cross-circle" className="size-4" />
                  <AlertTitle>ERRADO</AlertTitle>
                  <AlertDescription className="font-mono text-xs">
                    className="hover:bg-primary p-4 flex text-white"
                  </AlertDescription>
                </Alert>
                <Alert variant="success">
                  <Icon name="check-circle" className="size-4" />
                  <AlertTitle>CORRETO</AlertTitle>
                  <AlertDescription className="font-mono text-xs">
                    className="flex p-4 text-white hover:bg-primary"
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Utility CN */}
            <Card>
              <CardHeader>
                <CardTitle>Utilitário cn()</CardTitle>
                <CardDescription>Merge de classes obrigatório.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="tsx" title="lib/utils.ts">
                  {`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                </CodeBlock>
                <div className="space-y-2">
                  <p className="text-sm font-bold">Regras de Uso:</p>
                  <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                    <li>
                      <strong>Base primeiro:</strong> Estilos fixos vêm antes.
                    </li>
                    <li>
                      <strong>Condicionais no meio:</strong> Variantes e estados.
                    </li>
                    <li>
                      <strong>className por último:</strong> Permite override externo.
                    </li>
                    <li>
                      <strong>NUNCA concatenar:</strong> Use sempre <code>cn()</code>.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- ABA FOUNDATION (Colors, Effects, Type) --- */}
        <TabsContent value="foundation" className="animate-fade-in space-y-8">
          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Cores & Pareamento</CardTitle>
              <CardDescription>Sempre use o par Background + Foreground.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Background Token</TableHead>
                      <TableHead>Foreground Obrigatório</TableHead>
                      <TableHead className="text-right">Visualização</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { bg: 'bg-background', text: 'text-foreground', label: 'Page Base' },
                      { bg: 'bg-card', text: 'text-card-foreground', label: 'Card / Containers' },
                      {
                        bg: 'bg-primary',
                        text: 'text-primary-foreground',
                        label: 'Primary Actions',
                      },
                      {
                        bg: 'bg-secondary',
                        text: 'text-secondary-foreground',
                        label: 'Secondary Actions',
                      },
                      { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Muted / Disabled' },
                      { bg: 'bg-accent', text: 'text-accent-foreground', label: 'Hover / Active' },
                      {
                        bg: 'bg-destructive',
                        text: 'text-destructive-foreground',
                        label: 'Error / Delete',
                      },
                    ].map((pair, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <code className="rounded bg-muted px-1">{pair.bg}</code>
                        </TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-1">{pair.text}</code>
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={cn(
                              'inline-flex items-center rounded border border-border/20 px-3 py-1 text-xs font-bold',
                              pair.bg,
                              pair.text
                            )}
                          >
                            {pair.label}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Shadows */}
            <Card>
              <CardHeader>
                <CardTitle>Shadow Tokens</CardTitle>
                <CardDescription>Profundidade adaptativa (Dark Mode safe).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { token: 'shadow-sm', use: 'Cards simples, botões secundários' },
                  { token: 'shadow-md', use: 'Hover states, dropdowns pequenos' },
                  { token: 'shadow-lg', use: 'Popovers, Toasts' },
                  { token: 'shadow-xl', use: 'Modais, Dialogs' },
                ].map((shadow, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center justify-between rounded-lg border border-border bg-card p-4',
                      shadow.token
                    )}
                  >
                    <code className="text-xs font-bold">{shadow.token}</code>
                    <span className="text-xs text-muted-foreground">{shadow.use}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Animations */}
            <Card>
              <CardHeader>
                <CardTitle>Animation Tokens</CardTitle>
                <CardDescription>Tempo e curvas de movimento.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span>duration-fast</span> <span>150ms</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-muted">
                    <div
                      className="h-full w-full animate-[shimmer_1s_infinite] bg-primary"
                      style={{ animationDuration: '1000ms' }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span>duration-normal</span> <span>200ms</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-muted">
                    <div
                      className="h-full w-full animate-[shimmer_1.5s_infinite] bg-primary"
                      style={{ animationDuration: '1500ms' }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span>duration-slow</span> <span>300ms</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-muted">
                    <div
                      className="h-full w-full animate-[shimmer_2s_infinite] bg-primary"
                      style={{ animationDuration: '2000ms' }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Borders & Radius */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Radius</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">radius-md</span>{' '}
                  <span>6px (Default)</span>{' '}
                  <div className="h-8 w-8 rounded-md border border-primary"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>radius-lg</span> <span>8px (Cards)</span>{' '}
                  <div className="h-8 w-8 rounded-lg border border-border"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>radius-xl</span> <span>12px (Modals)</span>{' '}
                  <div className="h-8 w-8 rounded-xl border border-border"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>radius-full</span> <span>9999px (Pills)</span>{' '}
                  <div className="h-8 w-8 rounded-full border border-border"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- ABA LAYOUT --- */}
        <TabsContent value="layout" className="animate-fade-in space-y-8">
          {/* Spacing Scale */}
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale (4px Base)</CardTitle>
              <CardDescription>Nunca use valores arbitrários.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { token: '1', px: '4px', use: 'Gap ícone' },
                  { token: '2', px: '8px', use: 'Padding sm' },
                  { token: '3', px: '12px', use: 'Input pad' },
                  { token: '4', px: '16px', use: 'Padding md' },
                  { token: '6', px: '24px', use: 'Padding lg' },
                  { token: '8', px: '32px', use: 'Gap sections' },
                  { token: '12', px: '48px', use: 'Margin lg' },
                  { token: '16', px: '64px', use: 'Hero pad' },
                ].map((s) => (
                  <div
                    key={s.token}
                    className="rounded border border-border bg-card p-3 text-center"
                  >
                    <div className="text-lg font-bold text-primary">{s.token}</div>
                    <div className="font-mono text-xs text-muted-foreground">{s.px}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">{s.use}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Breakpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Breakpoints (Mobile First)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-12 font-mono font-bold">sm</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded bg-muted">
                    <div className="absolute left-0 h-full w-[640px] border-r border-primary bg-primary/20"></div>
                  </div>
                  <span className="font-mono text-xs">640px (Tablets Peq)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 font-mono font-bold">md</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded bg-muted">
                    <div className="absolute left-0 h-full w-[768px] border-r border-primary bg-primary/40"></div>
                  </div>
                  <span className="font-mono text-xs">768px (Tablets)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 font-mono font-bold">lg</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded bg-muted">
                    <div className="absolute left-0 h-full w-[1024px] border-r border-primary bg-primary/60"></div>
                  </div>
                  <span className="font-mono text-xs">1024px (Laptops)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 font-mono font-bold">xl</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded bg-muted">
                    <div className="absolute left-0 h-full w-[1280px] border-r border-primary bg-primary/80"></div>
                  </div>
                  <span className="font-mono text-xs">1280px (Desktops)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Containers & Z-Index */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Containers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span>max-w-prose</span>{' '}
                  <span className="text-muted-foreground">65ch (Texto)</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span>max-w-content</span>{' '}
                  <span className="text-muted-foreground">1024px (Padrão)</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span>max-w-wide</span>{' '}
                  <span className="text-muted-foreground">1280px (Amplo)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Z-Index</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span>base</span> <span className="text-muted-foreground">0</span>
                </div>
                <div className="flex justify-between">
                  <span>sticky</span> <span className="text-muted-foreground">100</span>
                </div>
                <div className="flex justify-between font-bold text-primary">
                  <span>modal</span> <span>400</span>
                </div>
                <div className="flex justify-between">
                  <span>popover</span> <span className="text-muted-foreground">500</span>
                </div>
                <div className="flex justify-between">
                  <span>toast</span> <span className="text-muted-foreground">700</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>max</span> <span>9999</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- ABA COMPONENTES --- */}
        <TabsContent value="components" className="animate-fade-in space-y-8">
          {/* States Rule */}
          <Card>
            <CardHeader>
              <CardTitle>Estados Interativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
                <div className="cursor-pointer rounded border border-border bg-card p-4 transition-colors hover:bg-primary/90 hover:text-white">
                  <p className="font-bold">Hover</p>
                  <code className="text-xs">hover:bg-primary/90</code>
                </div>
                <div className="cursor-pointer rounded border border-border bg-card p-4 transition-colors active:bg-primary/80 active:text-white">
                  <p className="font-bold">Active</p>
                  <code className="text-xs">active:bg-primary/80</code>
                </div>
                <div className="cursor-not-allowed rounded border border-border bg-card p-4 opacity-50">
                  <p className="font-bold">Disabled</p>
                  <code className="text-xs">disabled:opacity-50</code>
                </div>
                <div
                  className="rounded border border-border bg-card p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  tabIndex={0}
                >
                  <p className="font-bold">Focus</p>
                  <code className="text-xs">focus-visible:ring-2</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shadcn Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Mapeamento de Variantes (Shadcn)</CardTitle>
              <CardDescription>Button & Badge Presets</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variant</TableHead>
                    <TableHead>Tokens Usados</TableHead>
                    <TableHead>Visual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">default</TableCell>
                    <TableCell className="font-mono text-xs">
                      bg-primary text-primary-foreground
                    </TableCell>
                    <TableCell>
                      <Button size="sm">Button</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">secondary</TableCell>
                    <TableCell className="font-mono text-xs">
                      bg-secondary text-secondary-foreground
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="secondary">
                        Button
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">destructive</TableCell>
                    <TableCell className="font-mono text-xs">
                      bg-destructive text-destructive-foreground
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="destructive">
                        Button
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">outline</TableCell>
                    <TableCell className="font-mono text-xs">
                      border-input bg-background hover:bg-accent
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Button
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">ghost</TableCell>
                    <TableCell className="font-mono text-xs">
                      hover:bg-accent hover:text-accent-foreground
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        Button
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Density */}
          <Card>
            <CardHeader>
              <CardTitle>Densidade</CardTitle>
              <CardDescription>Adaptabilidade para diferentes contextos de uso.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex gap-4">
                <Button
                  variant={density === 'compact' ? 'default' : 'outline'}
                  onClick={() => setDensity('compact')}
                  size="sm"
                >
                  Compact
                </Button>
                <Button
                  variant={density === 'default' ? 'default' : 'outline'}
                  onClick={() => setDensity('default')}
                  size="sm"
                >
                  Default
                </Button>
                <Button
                  variant={density === 'comfortable' ? 'default' : 'outline'}
                  onClick={() => setDensity('comfortable')}
                  size="sm"
                >
                  Comfortable
                </Button>
              </div>

              <div
                className={cn(
                  'overflow-hidden rounded-lg border border-border transition-all',
                  density === 'compact' && 'text-xs',
                  density === 'default' && 'text-sm',
                  density === 'comfortable' && 'text-base'
                )}
              >
                <div
                  className={cn(
                    'border-b border-border bg-muted font-bold',
                    density === 'compact' && 'p-2',
                    density === 'default' && 'p-4',
                    density === 'comfortable' && 'p-6'
                  )}
                >
                  Header Exemplo ({density})
                </div>
                <div
                  className={cn(
                    'space-y-2',
                    density === 'compact' && 'p-2',
                    density === 'default' && 'p-4',
                    density === 'comfortable' && 'p-6'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>Item 1</span>
                    <Badge variant="outline">Ativo</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span>Item 2</span>
                    <Badge variant="outline">Pendente</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ABA SETUP & COPY --- */}
        <TabsContent value="setup" className="animate-fade-in space-y-8">
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Icon name="rocket" className="text-primary" /> Setup Instantâneo
                </CardTitle>
                <CardDescription>
                  Stack necessária: React + TypeScript + TailwindCSS.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* 0. DEPENDENCIES */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-lg font-bold">0. Install Dependencies</h3>
                <Badge variant="outline">Terminal</Badge>
              </div>
              <CodeBlock language="bash">
                npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
                date-fns
              </CodeBlock>
            </div>

            {/* 1. GLOBALS.CSS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-lg font-bold">1. globals.css</h3>
                <Badge variant="outline">CSS Variables</Badge>
              </div>
              <div className="mb-2 text-xs text-muted-foreground">
                Inclui reset de fontes (Inter + Source Serif) e variáveis do tema.
              </div>
              <CodeBlock language="css" title="src/app/globals.css">
                {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* === BACKGROUNDS === */
    --background: 0 0% 100%;           /* #FFFFFF */
    --foreground: 0 0% 9%;             /* #161616 */

    /* === CARDS & SURFACES === */
    --card: 0 0% 100%;                 /* #FFFFFF */
    --card-foreground: 0 0% 9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 9%;

    /* === PRIMARY/ACCENT - Gold #C9B298 === */
    --primary: 32 27% 69%;
    --primary-light: 32 27% 85%;       /* Lighter variant for gradients */
    --primary-foreground: 30 20% 11%;  /* #1F1B16 */
    --accent: 32 27% 69%;
    --accent-foreground: 30 20% 11%;
    --ring: 32 27% 69%;

    /* === SECONDARY === */
    --secondary: 0 0% 96%;             /* #F5F5F5 */
    --secondary-foreground: 0 0% 9%;

    /* === MUTED === */
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;      /* #737373 */

    /* === SEMANTIC COLORS === */
    --destructive: 4 100% 59%;         /* #FF3B30 */
    --destructive-foreground: 0 0% 100%;
    --success: 142 69% 49%;            /* #34C759 */
    --success-foreground: 0 0% 100%;
    --warning: 35 100% 50%;            /* #FF9500 */
    --warning-foreground: 30 20% 11%;
    --info: 211 100% 50%;              /* #007AFF */
    --info-foreground: 0 0% 100%;

    /* === UTILITIES === */
    --border: 0 0% 90%;                /* #E5E5E5 */
    --input: 0 0% 90%;

    /* === RADIUS - ROUNDED === */
    --radius: 0.75rem; /* Increased slightly to 12px for softer look */
  }

  .dark {
    /* === BACKGROUNDS === */
    --background: 240 5% 4%;             /* #0A0A0B - Richer Black */
    --foreground: 0 0% 98%;            /* #FAFAFA */

    /* === CARDS & SURFACES === */
    --card: 240 4% 8%;                   /* #141415 */
    --card-foreground: 0 0% 98%;
    --popover: 240 4% 8%;
    --popover-foreground: 0 0% 98%;

    /* === PRIMARY/ACCENT - Gold (mantém) === */
    --primary: 32 27% 69%;
    --primary-light: 32 27% 85%;
    --primary-foreground: 30 20% 11%;
    --accent: 32 27% 69%;
    --accent-foreground: 30 20% 11%;
    --ring: 32 27% 69%;

    /* === SECONDARY === */
    --secondary: 0 0% 15%;             /* #262626 */
    --secondary-foreground: 0 0% 98%;

    /* === MUTED === */
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 64%;      /* #A3A3A3 */

    /* === SEMANTIC COLORS (Dark variants) === */
    --destructive: 4 100% 62%;         /* #FF453A */
    --destructive-foreground: 0 0% 100%;
    --success: 142 76% 51%;            /* #30D158 */
    --success-foreground: 0 0% 100%;
    --warning: 37 100% 52%;            /* #FF9F0A */
    --warning-foreground: 30 20% 11%;
    --info: 211 100% 52%;              /* #0A84FF */
    --info-foreground: 0 0% 100%;

    /* === UTILITIES === */
    --border: 0 0% 16%;                
    --input: 0 0% 20%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-serif antialiased;
  }
  h1, h2, h3, h4, h5, h6, button, input, select, label {
    @apply font-sans;
  }
}`}
              </CodeBlock>
            </div>

            {/* 2. TAILWIND CONFIG */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-lg font-bold">2. tailwind.config.ts</h3>
                <Badge variant="outline">Configuration</Badge>
              </div>
              <div className="mb-2 text-xs text-muted-foreground">
                Contém TODA a paleta de cores da marca, keyframes personalizados e mapeamentos de
                fonte.
              </div>
              <CodeBlock language="tsx" title="tailwind.config.ts">
                {`import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        // Brand Palette - Guide
        "brand-gold": {
          50: "#F2EBE4", 100: "#E4D8CA", 200: "#D7C5B1", 300: "#C9B298", 
          400: "#BAA080", 500: "#AC8E68", 600: "#8D7556", 700: "#6F5D45", 
          800: "#534635", 900: "#383025", 950: "#1F1B16", DEFAULT: "#C9B298",
        },
        "brand-red": { DEFAULT: "#FF3B30", dark: "#FF453A" },
        "brand-orange": { DEFAULT: "#FF9500", dark: "#FF9F0A" },
        "brand-yellow": { DEFAULT: "#FFCC00", dark: "#FFD60A" },
        "brand-green": { DEFAULT: "#34C759", dark: "#30D158" },
        "brand-mint": { DEFAULT: "#00C7BE", dark: "#63E6E2" },
        "brand-teal": { DEFAULT: "#30B0C7", dark: "#40C8E0" },
        "brand-cyan": { DEFAULT: "#32ADE6", dark: "#64D2FF" },
        "brand-blue": { DEFAULT: "#007AFF", dark: "#0A84FF" },
        "brand-indigo": { DEFAULT: "#5856D6", dark: "#5E5CE6" },
        "brand-pink": { DEFAULT: "#FF2D55", dark: "#FF375F" },
        "brand-brown": { DEFAULT: "#A2845E", dark: "#AC8E68" },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E4D8CA 0%, #C9B298 50%, #8D7556 100%)',
        'gold-shimmer': 'linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 60%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "button-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        "spin-slow": {
          "from": { transform: "rotate(0deg)" },
          "to": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "button-shimmer": "button-shimmer 4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config`}
              </CodeBlock>
            </div>

            {/* 3. LIB UTILS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-lg font-bold">3. lib/utils.ts</h3>
                <Badge variant="outline">Helper Function</Badge>
              </div>
              <CodeBlock language="tsx" title="src/lib/utils.ts">
                {`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
              </CodeBlock>
            </div>
          </div>
        </TabsContent>

        {/* --- ABA EXTENSIBILIDADE --- */}
        <TabsContent value="extensibility" className="animate-fade-in space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionando Novos Tokens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal space-y-4 pl-4 text-sm text-muted-foreground">
                    <li>
                      <strong>Definir em globals.css:</strong>
                      <div className="mt-2 rounded border border-border bg-muted p-2 font-mono text-xs">
                        --brand-new: 270 50% 50%;
                        <br />
                        --brand-new-foreground: 0 0% 100%;
                      </div>
                    </li>
                    <li>
                      <strong>Adicionar ao tailwind.config.ts:</strong>
                      <div className="mt-2 rounded border border-border bg-muted p-2 font-mono text-xs">
                        colors: &#123;
                        <br />
                        &nbsp;&nbsp;brand: &#123;
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;DEFAULT: 'hsl(var(--brand-new))',
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;foreground: 'hsl(var(--brand-new-foreground))'
                        <br />
                        &nbsp;&nbsp;&#125;
                        <br />
                        &#125;
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regras de Dark Mode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Icon name="moon" className="size-4" />
                    <AlertTitle>NUNCA USE HARDCODED</AlertTitle>
                    <AlertDescription className="text-xs">
                      <code>bg-white</code> ou <code>text-black</code> quebram o tema escuro. Use
                      sempre tokens semânticos: <code>bg-background</code>,{' '}
                      <code>text-foreground</code>.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Contraste:</strong> Verifique sempre WCAG AA em ambos os modos.
                    </p>
                    <p>
                      <strong>Shadows:</strong> São automaticamente mais intensas no modo escuro via
                      variáveis CSS.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Checklist de Validação (IA)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Icon name="check" className="text-green-500" /> Usa token semântico?
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check" className="text-green-500" /> Cor de fundo tem foreground
                    pareado?
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check" className="text-green-500" /> Elemento interativo tem focus
                    ring?
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check" className="text-green-500" /> Funciona em dark mode?
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check" className="text-green-500" /> Spacing está na escala?
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="check" className="text-green-500" /> Usa cn() para merge?
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensSection;
