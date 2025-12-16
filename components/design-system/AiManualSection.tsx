import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Symbol } from '../ui/symbol';
import { CodeBlock } from '../ui/code-block';

const AiManualSection: React.FC = () => {
  const cursorRulesContent = `# ACADEMIA LENDÁRIA DESIGN SYSTEM INSTRUCTIONS

You are an expert Senior Frontend Engineer utilizing the "Academia Lendária" Design System.

## Tech Stack
- React 18+ (TypeScript)
- Tailwind CSS 3.4
- Radix UI Primitives
- Icons: Custom <Icon name="..." /> component (Flaticon UIcons wrapper). DO NOT use Lucide or FontAwesome directly.
- Fonts: 'Inter' (sans-serif) for UI/Headings, 'Source Serif 4' (serif) for body text and elegant details.

## Design Token Implementation
- Primary Color: "brand-gold" / hsl(var(--primary)) -> #C9B298.
- Border Radius: 'rounded-xl' for cards/containers, 'rounded-md' for small controls.
- Spacing: Use multiples of 4 (p-4, p-8, gap-6).
- Dark Mode: Agnostic 'dark:' classes support is mandatory.

## Component Usage Rules
1. **Buttons**: ALWAYS use \`import { Button } from '@/components/ui/button'\`. 
   - Primary: \`<Button>\` (Gold background)
   - Secondary: \`<Button variant="outline">\`
   - Ghost: \`<Button variant="ghost">\`
   
2. **Icons**: ALWAYS use \`import { Icon } from '@/components/ui/icon'\`.
   - Usage: \`<Icon name="home" size="size-5" />\`
   - Do NOT import SVGs manually.

3. **Typography Strategy**: 
   - **Headings (H1-H3)**: \`font-sans font-bold tracking-tight text-foreground\`
   - **Body/Paragraphs**: \`font-serif text-muted-foreground leading-relaxed\`
   - **Micro-copy/Labels**: \`font-sans font-semibold uppercase tracking-wider text-xs\`

4. **Card Pattern**:
   \`\`\`tsx
   <Card>
     <CardHeader>
       <CardTitle>Title (Sans)</CardTitle>
       <CardDescription>Subtitle (Serif)</CardDescription>
     </CardHeader>
     <CardContent>...</CardContent>
     <CardFooter>...</CardFooter>
   </Card>
   \`\`\`

## "Legendary" Aesthetic Principles
- **Minimalist Luxury**: High whitespace, subtle borders (\`border-border\`), low shadow usage.
- **8% Color Rule**: Use Gold (#C9B298) sparingly for high-value actions/accents. The rest is monochrome.
- **Corner Smoothing**: Always prefer rounded-xl or rounded-2xl for main containers.

## Behavioral Rules
- If creating a new component, check \`components/ui\` first.
- Always implement responsive design (mobile-first).
- Ensure accessibility (aria-labels) on interactive elements.`;

  const systemPromptContent = `Act as a Senior Frontend Engineer and Design System Specialist for Academia Lendária.
Your goal is to build interfaces that follow the Academia Lendária Design System strictly.

### CORE IDENTITY
- **Tone**: Professional, Elegant, "Legendary".
- **Visuals**: Clean, typographic-driven, Gold (#C9B298) accents only.

### TECHNICAL CONSTRAINTS
- **Framework**: React + Tailwind CSS.
- **Icons**: Use the custom <Icon name="icon-name" /> component (Flaticon wrapper).
- **Fonts**: 
  - Class 'font-sans' = Inter (Titles, UI Controls).
  - Class 'font-serif' = Source Serif 4 (Body text, Quotes, Descriptions).

### COMPONENT LIBRARY (SHADCN-LIKE)
Assume the existence of these components in 'components/ui':
- Button, Card, Input, Badge, Avatar, Separator, Tabs.
- All components support 'className' prop for Tailwind overrides.
- Use 'cn()' utility for class merging.

### STYLE GUIDE
1. **Backgrounds**: Use 'bg-background' (white/black) for pages, 'bg-card' for containers.
2. **Text Colors**: 'text-foreground' (primary), 'text-muted-foreground' (secondary).
3. **Borders**: 'border border-border'.
4. **Primary Action**: <Button> (Solid Gold).
5. **Secondary Action**: <Button variant="outline">.

### OUTPUT FORMAT
- Provide full React Functional Components.
- Use Lucide-react ONLY if the custom <Icon> component is not available in the context (but prefer <Icon>).
- Always include "use client" if using hooks.`;

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Visual Header */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Symbol name="infinity" className="text-[12rem] rotate-12" />
          </div>
          <div className="relative z-10 p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/50 text-primary">AI First Development</Badge>
                  <span className="text-xs font-mono text-muted-foreground">v4.1</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight max-w-4xl">
                Manual de Integração <span className="text-primary">IA</span>.
              </h2>
              <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  Configurações otimizadas para <strong>Cursor, Claude Code, Lovable e Google AI Studio</strong>.
                  <br/>
                  Copie os contextos abaixo para garantir que sua IA gere interfaces fiéis ao padrão da Academia Lendária.
              </p>
          </div>
          {/* Gradient Line */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="cursor" className="w-full">
        <TabsList className="mb-8 flex-wrap h-auto gap-2 bg-transparent p-0 border-b border-border w-full justify-start rounded-none">
            <TabsTrigger value="cursor" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="terminal" className="mr-2 size-4" /> Cursor Rules (.cursorrules)
            </TabsTrigger>
            <TabsTrigger value="aistudio" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="brain-circuit" className="mr-2 size-4" /> AI Studio & Claude
            </TabsTrigger>
            <TabsTrigger value="lovable" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="magic-wand" className="mr-2 size-4" /> Lovable & Visual
            </TabsTrigger>
             <TabsTrigger value="prompts" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="comment-alt-middle" className="mr-2 size-4" /> Engenharia de Prompt
            </TabsTrigger>
        </TabsList>

        {/* --- ABA CURSOR RULES --- */}
        <TabsContent value="cursor" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-sans flex items-center gap-2">
                             Arquivo .cursorrules
                        </h3>
                        <p className="text-muted-foreground font-serif">
                            Crie um arquivo chamado <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">.cursorrules</code> na raiz do seu projeto e cole o conteúdo abaixo. O Cursor lerá isso automaticamente em todos os prompts.
                        </p>
                    </div>

                    <CodeBlock title=".cursorrules" language="bash">
                        {cursorRulesContent}
                    </CodeBlock>
                </div>

                <div className="space-y-6">
                     <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Icon name="bolt" /> Por que usar .cursorrules?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm font-serif space-y-4 text-muted-foreground">
                            <p>
                                O Cursor usa esse arquivo para "calibrar" o modelo. Isso evita que ele sugira bibliotecas que não usamos (como Heroicons) ou cores fora da paleta (como botões azuis padrão).
                            </p>
                            <p>
                                Com isso, cada `Command+K` ou `Chat` já sabe que existe um componente <code>&lt;Icon /&gt;</code> e uma fonte Serif específica.
                            </p>
                        </CardContent>
                     </Card>
                </div>
            </div>
        </TabsContent>

        {/* --- ABA AI STUDIO / CLAUDE --- */}
        <TabsContent value="aistudio" className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-sans flex items-center gap-2">
                             System Instruction
                        </h3>
                        <p className="text-muted-foreground font-serif">
                            Ao usar o <strong>Google AI Studio</strong> ou iniciar um projeto no <strong>Claude Code</strong>, cole este texto no campo "System Instructions" ou no primeiro prompt.
                        </p>
                    </div>

                    <CodeBlock title="System Prompt" language="bash">
                        {systemPromptContent}
                    </CodeBlock>
                </div>
             </div>
        </TabsContent>

        {/* --- ABA LOVABLE / VISUAL --- */}
        <TabsContent value="lovable" className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8">
                 <div className="flex-1 space-y-6">
                     <div>
                        <h3 className="text-2xl font-bold font-sans">Ferramentas Visuais (Lovable, V0)</h3>
                        <p className="text-muted-foreground font-serif mt-2">
                            Ferramentas como Lovable leem o repositório. O segredo é instruí-las a <strong>reutilizar</strong> em vez de recriar.
                        </p>
                     </div>

                     <Card className="border-l-4 border-l-brand-blue">
                         <CardHeader>
                             <CardTitle>Prompt para Lovable</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <p className="font-mono text-sm bg-muted p-4 rounded-lg">
                                 "I want to create a new Dashboard page. Please check the `components/ui` folder and use the existing Card, Button, and Badge components. Do not create new CSS styles, use the Tailwind variables defined in global.css (like var(--primary)). Use the {'<Icon>'} component for icons."
                             </p>
                         </CardContent>
                     </Card>

                     <div className="space-y-4">
                         <h4 className="font-bold">O que verificar no Output Visual:</h4>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                             <li className="flex items-center gap-2"><Icon name="check" size="size-3" className="text-green-500" /> Se os botões estão usando a classe <code>bg-primary</code> (Gold) e não um amarelo genérico.</li>
                             <li className="flex items-center gap-2"><Icon name="check" size="size-3" className="text-green-500" /> Se a fonte serifada está sendo usada nos parágrafos (<code>font-serif</code>).</li>
                             <li className="flex items-center gap-2"><Icon name="check" size="size-3" className="text-green-500" /> Se o arredondamento dos cards é <code>rounded-xl</code>.</li>
                         </ul>
                     </div>
                 </div>
             </div>
        </TabsContent>

        {/* --- ABA ENGENHARIA DE PROMPT --- */}
        <TabsContent value="prompts" className="space-y-8 animate-fade-in">
             <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold font-sans">Como pedir Componentes</h3>
                        <p className="text-muted-foreground font-serif">Exemplos de inputs para obter resultados "Lendários".</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* BAD EXAMPLE */}
                    <Card className="border-destructive/30 bg-destructive/5">
                        <CardHeader>
                            <Badge variant="destructive" className="w-fit mb-2">Jeito Medíocre</Badge>
                            <CardTitle className="text-lg">O Pedido Vago</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-background rounded border border-border/50 text-sm font-mono text-muted-foreground">
                                "Crie um card de perfil para mim."
                            </div>
                            <div className="space-y-2 text-sm text-destructive font-medium">
                                <p className="flex items-center gap-2"><Icon name="cross" size="size-3" /> A IA vai escolher cores aleatórias.</p>
                                <p className="flex items-center gap-2"><Icon name="cross" size="size-3" /> Vai usar fontes padrão (Arial/Roboto).</p>
                                <p className="flex items-center gap-2"><Icon name="cross" size="size-3" /> Provavelmente ficará feio.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* GOOD EXAMPLE */}
                    <Card className="border-primary/30 bg-primary/5">
                        <CardHeader>
                            <Badge className="w-fit mb-2 bg-primary text-primary-foreground">Jeito Lendário</Badge>
                            <CardTitle className="text-lg">O Pedido Contextual</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-background rounded border border-border/50 text-sm font-mono text-muted-foreground">
                                "Crie um Card de Perfil seguindo o Design System. Use uma imagem redonda, nome em Inter Bold, bio em Source Serif e um botão outline 'Ver Detalhes'."
                            </div>
                            <div className="space-y-2 text-sm text-primary font-medium">
                                <p className="flex items-center gap-2"><Icon name="check" size="size-3" /> Segue a tipografia mista.</p>
                                <p className="flex items-center gap-2"><Icon name="check" size="size-3" /> Usa as variantes corretas de botão.</p>
                                <p className="flex items-center gap-2"><Icon name="check" size="size-3" /> Mantém a consistência visual.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>

      </Tabs>

    </div>
  );
};

export default AiManualSection;