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
    <div className="space-y-12 animate-fade-in">
      
      {/* Technical Header */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Icon name="book-alt" className="text-[12rem] -rotate-12" />
          </div>
          <div className="relative z-10 p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/50 text-primary">v4.1.0</Badge>
                  <span className="text-xs font-mono text-muted-foreground">Build: Production Ready</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight max-w-4xl">
                Documentação <span className="text-primary">Técnica</span>.
              </h2>
              <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  Arquitetura, padrões de código, tokens de design e configurações de ambiente para o ecossistema da Academia Lendária.
              </p>
          </div>
          {/* Gradient Line */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="mb-8 flex-wrap h-auto gap-2 bg-transparent p-0 border-b border-border w-full justify-start rounded-none">
            <TabsTrigger value="architecture" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="folder-tree" className="mr-2 size-4" /> Arquitetura & Estrutura
            </TabsTrigger>
            <TabsTrigger value="tokens" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="palette" className="mr-2 size-4" /> Design Tokens (CSS)
            </TabsTrigger>
             <TabsTrigger value="conventions" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="check-circle" className="mr-2 size-4" /> Padrões de Código
            </TabsTrigger>
        </TabsList>

        {/* --- ABA 1: ARQUITETURA --- */}
        <TabsContent value="architecture" className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* 1. Directory Tree */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Árvore de Diretórios</CardTitle>
                        <CardDescription>Organização lógica do diretório <code className="font-mono text-primary">src</code></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="font-mono text-sm space-y-1 bg-[#1e1e1e] text-[#d4d4d4] p-6 rounded-lg shadow-inner h-full overflow-auto">
                            <div className="flex items-center gap-2 text-white font-bold"><Icon name="folder" /> src/</div>
                            <div className="pl-6 border-l border-white/10 space-y-1">
                                
                                {/* Components */}
                                <div className="flex items-center gap-2 text-primary"><Icon name="folder" /> components/</div>
                                <div className="pl-6 border-l border-white/10 space-y-1">
                                     <div className="flex items-center gap-2 text-brand-gold"><Icon name="folder" /> ui/ <span className="text-zinc-500 text-xs font-sans italic ml-2">// Atomic (Radix/Shadcn)</span></div>
                                     <div className="flex items-center gap-2"><Icon name="document" /> Sidebar.tsx <span className="text-zinc-500 text-xs font-sans italic ml-2">// Navigation Logic</span></div>
                                     <div className="flex items-center gap-2"><Icon name="document" /> [Sections].tsx <span className="text-zinc-500 text-xs font-sans italic ml-2">// Feature Pages</span></div>
                                </div>
                                
                                {/* Lib */}
                                <div className="flex items-center gap-2 text-primary pt-2"><Icon name="folder" /> lib/</div>
                                <div className="pl-6 border-l border-white/10 space-y-1">
                                     <div className="flex items-center gap-2"><Icon name="document" /> utils.ts <span className="text-zinc-500 text-xs font-sans italic ml-2">// Tailwind Merge Helper</span></div>
                                </div>
                                
                                {/* Root Files */}
                                <div className="flex items-center gap-2 pt-2"><Icon name="document" /> App.tsx <span className="text-zinc-500 text-xs font-sans italic ml-2">// Root Layout & State</span></div>
                                <div className="flex items-center gap-2"><Icon name="document" /> types.ts <span className="text-zinc-500 text-xs font-sans italic ml-2">// Global Enums & Interfaces</span></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Routing Strategy */}
                <div className="space-y-6">
                    <Card className="bg-muted/10 border-dashed">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Icon name="road" /> Estratégia de Roteamento (SPA)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <p className="text-sm text-muted-foreground">
                                Este projeto não utiliza <code>react-router-dom</code>. O roteamento é gerenciado através de um estado central no componente raiz <code>App.tsx</code>.
                             </p>
                             <CodeBlock title="App.tsx State" language="tsx">
                                 {`const [currentSection, setCurrentSection] = useState<Section>(Section.CONCEPT);
// ...
{renderContent()}`}
                             </CodeBlock>
                             <div className="text-xs text-muted-foreground bg-card p-3 rounded border border-border">
                                 <strong className="text-primary">Vantagem:</strong> Elimina dependências externas pesadas e simplifica a estrutura para deploy estático (GH Pages, Vercel) sem problemas de reescrita de URL.
                             </div>
                        </CardContent>
                    </Card>

                    {/* 3. Theme Engine */}
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2"><Icon name="settings-sliders" /> Motor de Temas (Runtime)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <p className="text-sm text-muted-foreground">
                                A troca de cores (Gold, Blue, Red...) não requer recompilação do CSS. O React injeta valores HSL diretamente no <code>:root</code> do documento via JavaScript.
                             </p>
                             <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                 <div className="p-2 bg-background rounded border border-border">
                                     --primary: 32 27% 69%;
                                 </div>
                                 <div className="p-2 bg-background rounded border border-border opacity-50">
                                     --primary: 211 100% 50%;
                                 </div>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>

        {/* --- ABA 2: TOKENS --- */}
        <TabsContent value="tokens" className="space-y-8 animate-fade-in">
             <Card>
                <CardHeader>
                    <CardTitle>Sistema de Variáveis CSS</CardTitle>
                    <CardDescription>O "motor" de temas do sistema. Definido em <code>index.html</code> (style tag) ou <code>global.css</code>.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1 space-y-4">
                             <p className="text-sm text-muted-foreground font-serif">
                                Utilizamos variáveis CSS nativas para permitir troca de temas em tempo de execução (Runtime Theming) sem re-compilação do Tailwind. Os valores usam o formato HSL sem vírgulas para compatibilidade com o modificador de opacidade do Tailwind.
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
                        <div className="w-full md:w-1/3 bg-muted/20 p-6 rounded-xl border border-border">
                            <h5 className="font-bold text-sm mb-4">Mapeamento Visual</h5>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-background</span>
                                    <div className="w-24 h-6 rounded bg-background border border-border"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-card</span>
                                    <div className="w-24 h-6 rounded bg-card border border-border shadow-sm"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-primary</span>
                                    <div className="w-24 h-6 rounded bg-primary"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-muted</span>
                                    <div className="w-24 h-6 rounded bg-muted"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono">bg-destructive</span>
                                    <div className="w-24 h-6 rounded bg-destructive"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        {/* --- ABA 3: PADRÕES (Conventions) --- */}
        <TabsContent value="conventions" className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                     <h3 className="text-lg font-bold">1. Importação de Ícones</h3>
                     <p className="text-sm text-muted-foreground">
                         Não importamos ícones SVG individualmente. Usamos um componente wrapper que mapeia para a fonte de ícones Flaticon.
                     </p>
                     <div className="space-y-2">
                         <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-md text-xs font-mono text-red-600 dark:text-red-400">
                             <span className="font-bold">ERRADO:</span> import &#123; Home &#125; from 'lucide-react';
                         </div>
                         <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 rounded-md text-xs font-mono text-green-600 dark:text-green-400">
                             <span className="font-bold">CORRETO:</span> import &#123; Icon &#125; from './ui/icon';
                         </div>
                     </div>
                 </div>

                 <div className="space-y-6">
                     <h3 className="text-lg font-bold">2. Utilitário cn()</h3>
                     <p className="text-sm text-muted-foreground">
                         Sempre use a função <code>cn()</code> para classes condicionais ou mesclagem de props. Ela combina <code>clsx</code> e <code>tailwind-merge</code>.
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
                         Para props de componentes, use o prefixo <code>on</code> (ex: <code>onValueChange</code>). Para handlers internos, use <code>handle</code> (ex: <code>handleChange</code>).
                     </p>
                 </div>

                 <div className="space-y-6">
                     <h3 className="text-lg font-bold">4. Performance</h3>
                     <p className="text-sm text-muted-foreground">
                         Use <code>useMemo</code> para cálculos pesados em gráficos e tabelas. Evite re-renders desnecessários em componentes de UI simples (Buttons, Badges) mantendo-os "burros" (stateless) sempre que possível.
                     </p>
                 </div>
             </div>
        </TabsContent>

      </Tabs>

    </div>
  );
};

export default DocsSection;
