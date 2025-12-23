import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Symbol } from '../ui/symbol';
import { CodeBlock } from '../ui/code-block'; // Updated import

const DocsSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-12">
      {/* Technical Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-5">
          <Icon name="book-alt" className="-rotate-12 text-[12rem]" />
        </div>
        <div className="relative z-10 space-y-6 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/50 text-primary backdrop-blur-sm"
            >
              v4.1.0
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">Build: Production Ready</span>
          </div>
          <h2 className="max-w-4xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
            Documentação <span className="text-primary">Técnica</span>.
          </h2>
          <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
            Arquitetura, padrões de código, tokens de design e configurações de ambiente para o
            ecossistema da Academia Lendária.
          </p>
        </div>
        {/* Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="architecture"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="folder-tree" className="mr-2 size-4" /> Arquitetura & Estrutura
          </TabsTrigger>
          <TabsTrigger
            value="tokens"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="palette" className="mr-2 size-4" /> Design Tokens (CSS)
          </TabsTrigger>
          <TabsTrigger
            value="conventions"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="check-circle" className="mr-2 size-4" /> Padrões de Código
          </TabsTrigger>
        </TabsList>

        {/* --- ABA 1: ARQUITETURA --- */}
        <TabsContent value="architecture" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            {/* 1. Directory Tree */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Árvore de Diretórios</CardTitle>
                <CardDescription>
                  Organização lógica do diretório{' '}
                  <code className="font-mono text-primary">src</code>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-full space-y-1 overflow-auto rounded-lg bg-[#1e1e1e] p-6 font-mono text-sm text-[#d4d4d4] shadow-inner">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Icon name="folder" /> src/
                  </div>
                  <div className="space-y-1 border-l border-white/10 pl-6">
                    {/* Components */}
                    <div className="flex items-center gap-2 text-primary">
                      <Icon name="folder" /> components/
                    </div>
                    <div className="space-y-1 border-l border-white/10 pl-6">
                      <div className="flex items-center gap-2 text-brand-gold">
                        <Icon name="folder" /> ui/{' '}
                        <span className="ml-2 font-sans text-xs italic text-zinc-500">
                          // Atomic (Radix/Shadcn)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="document" /> Sidebar.tsx{' '}
                        <span className="ml-2 font-sans text-xs italic text-zinc-500">
                          // Navigation Logic
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="document" /> [Sections].tsx{' '}
                        <span className="ml-2 font-sans text-xs italic text-zinc-500">
                          // Feature Pages
                        </span>
                      </div>
                    </div>

                    {/* Lib */}
                    <div className="flex items-center gap-2 pt-2 text-primary">
                      <Icon name="folder" /> lib/
                    </div>
                    <div className="space-y-1 border-l border-white/10 pl-6">
                      <div className="flex items-center gap-2">
                        <Icon name="document" /> utils.ts{' '}
                        <span className="ml-2 font-sans text-xs italic text-zinc-500">
                          // Tailwind Merge Helper
                        </span>
                      </div>
                    </div>

                    {/* Root Files */}
                    <div className="flex items-center gap-2 pt-2">
                      <Icon name="document" /> App.tsx{' '}
                      <span className="ml-2 font-sans text-xs italic text-zinc-500">
                        // Root Layout & State
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="document" /> types.ts{' '}
                      <span className="ml-2 font-sans text-xs italic text-zinc-500">
                        // Global Enums & Interfaces
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Routing Strategy */}
            <div className="space-y-6">
              <Card className="border-dashed bg-muted/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="road" /> Estratégia de Roteamento (SPA)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Este projeto não utiliza <code>react-router-dom</code>. O roteamento é
                    gerenciado através de um estado central no componente raiz <code>App.tsx</code>.
                  </p>
                  <CodeBlock title="App.tsx State" language="tsx">
                    {`const [currentSection, setCurrentSection] = useState<Section>(Section.CONCEPT);
// ...
{renderContent()}`}
                  </CodeBlock>
                  <div className="rounded border border-border bg-card p-3 text-xs text-muted-foreground">
                    <strong className="text-primary">Vantagem:</strong> Elimina dependências
                    externas pesadas e simplifica a estrutura para deploy estático (GH Pages,
                    Vercel) sem problemas de reescrita de URL.
                  </div>
                </CardContent>
              </Card>

              {/* 3. Theme Engine */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="settings-sliders" /> Motor de Temas (Runtime)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    A troca de cores (Gold, Blue, Red...) não requer recompilação do CSS. O React
                    injeta valores HSL diretamente no <code>:root</code> do documento via
                    JavaScript.
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <div className="rounded border border-border bg-background p-2">
                      --primary: 32 27% 69%;
                    </div>
                    <div className="rounded border border-border bg-background p-2 opacity-50">
                      --primary: 211 100% 50%;
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- ABA 2: TOKENS --- */}
        <TabsContent value="tokens" className="animate-fade-in space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Variáveis CSS</CardTitle>
              <CardDescription>
                O "motor" de temas do sistema. Definido em <code>index.html</code> (style tag) ou{' '}
                <code>global.css</code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col items-start gap-8 md:flex-row">
                <div className="flex-1 space-y-4">
                  <p className="font-serif text-sm text-muted-foreground">
                    Utilizamos variáveis CSS nativas para permitir troca de temas em tempo de
                    execução (Runtime Theming) sem re-compilação do Tailwind. Os valores usam o
                    formato HSL sem vírgulas para compatibilidade com o modificador de opacidade do
                    Tailwind.
                  </p>
                  <CodeBlock title=":root (Theme Definition)" language="css">
                    {`:root {
  /* Base format: H S% L% */
  --primary: 32 27% 69%;      /* #C9B298 */
  --primary-foreground: 30 20% 11%;

  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
}

.dark {
  --background: 0 0% 0%;
  --foreground: 0 0% 98%;
}`}
                  </CodeBlock>
                </div>

                {/* Visual Token Representation */}
                <div className="w-full rounded-xl border border-border bg-muted/20 p-6 md:w-1/3">
                  <h5 className="mb-4 text-sm font-bold">Mapeamento Visual</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs">bg-background</span>
                      <div className="h-6 w-24 rounded border border-border bg-background"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs">bg-card</span>
                      <div className="h-6 w-24 rounded border border-border bg-card shadow-sm"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs">bg-primary</span>
                      <div className="h-6 w-24 rounded bg-primary"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs">bg-muted</span>
                      <div className="h-6 w-24 rounded bg-muted"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs">bg-destructive</span>
                      <div className="h-6 w-24 rounded bg-destructive"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ABA 3: PADRÕES (Conventions) --- */}
        <TabsContent value="conventions" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-lg font-bold">1. Importação de Ícones</h3>
              <p className="text-sm text-muted-foreground">
                Não importamos ícones SVG individualmente. Usamos um componente wrapper que mapeia
                para a fonte de ícones Flaticon.
              </p>
              <div className="space-y-2">
                <div className="rounded-md border border-red-200 bg-red-50 p-3 font-mono text-xs text-red-600 dark:border-red-900 dark:bg-red-900/10 dark:text-red-400">
                  <span className="font-bold">ERRADO:</span> import &#123; Home &#125; from
                  'lucide-react';
                </div>
                <div className="rounded-md border border-green-200 bg-green-50 p-3 font-mono text-xs text-green-600 dark:border-green-900 dark:bg-green-900/10 dark:text-green-400">
                  <span className="font-bold">CORRETO:</span> import &#123; Icon &#125; from
                  './ui/icon';
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold">2. Utilitário cn()</h3>
              <p className="text-sm text-muted-foreground">
                Sempre use a função <code>cn()</code> para classes condicionais ou mesclagem de
                props. Ela combina <code>clsx</code> e <code>tailwind-merge</code>.
              </p>
              <CodeBlock language="tsx">
                {`<div className={cn(
  "flex items-center p-4",
  isActive ? "bg-primary text-white" : "bg-muted",
  className // Prop externa
)} />`}
              </CodeBlock>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold">3. Nomenclatura de Eventos</h3>
              <p className="text-sm text-muted-foreground">
                Para props de componentes, use o prefixo <code>on</code> (ex:{' '}
                <code>onValueChange</code>). Para handlers internos, use <code>handle</code> (ex:{' '}
                <code>handleChange</code>).
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold">4. Performance</h3>
              <p className="text-sm text-muted-foreground">
                Use <code>useMemo</code> para cálculos pesados em gráficos e tabelas. Evite
                re-renders desnecessários em componentes de UI simples (Buttons, Badges) mantendo-os
                "burros" (stateless) sempre que possível.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocsSection;
