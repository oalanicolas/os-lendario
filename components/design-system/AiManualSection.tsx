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
    <div className="animate-fade-in space-y-12">
      {/* Visual Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-5">
          <Symbol name="infinity" className="rotate-12 text-[12rem]" />
        </div>
        <div className="relative z-10 space-y-6 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/50 text-primary backdrop-blur-sm"
            >
              AI First Development
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">v4.1</span>
          </div>
          <h2 className="max-w-4xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
            Manual de Integração <span className="text-primary">IA</span>.
          </h2>
          <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
            Configurações otimizadas para{' '}
            <strong>Cursor, Claude Code, Lovable e Google AI Studio</strong>.
            <br />
            Copie os contextos abaixo para garantir que sua IA gere interfaces fiéis ao padrão da
            Academia Lendária.
          </p>
        </div>
        {/* Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="cursor" className="w-full">
        <TabsList className="mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="cursor"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="terminal" className="mr-2 size-4" /> Cursor Rules (.cursorrules)
          </TabsTrigger>
          <TabsTrigger
            value="aistudio"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="brain-circuit" className="mr-2 size-4" /> AI Studio & Claude
          </TabsTrigger>
          <TabsTrigger
            value="lovable"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="magic-wand" className="mr-2 size-4" /> Lovable & Visual
          </TabsTrigger>
          <TabsTrigger
            value="prompts"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="comment-alt-middle" className="mr-2 size-4" /> Engenharia de Prompt
          </TabsTrigger>
        </TabsList>

        {/* --- ABA CURSOR RULES --- */}
        <TabsContent value="cursor" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-sans text-2xl font-bold">
                  Arquivo .cursorrules
                </h3>
                <p className="font-serif text-muted-foreground">
                  Crie um arquivo chamado{' '}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    .cursorrules
                  </code>{' '}
                  na raiz do seu projeto e cole o conteúdo abaixo. O Cursor lerá isso
                  automaticamente em todos os prompts.
                </p>
              </div>

              <CodeBlock title=".cursorrules" language="bash">
                {cursorRulesContent}
              </CodeBlock>
            </div>

            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="bolt" /> Por que usar .cursorrules?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 font-serif text-sm text-muted-foreground">
                  <p>
                    O Cursor usa esse arquivo para "calibrar" o modelo. Isso evita que ele sugira
                    bibliotecas que não usamos (como Heroicons) ou cores fora da paleta (como botões
                    azuis padrão).
                  </p>
                  <p>
                    Com isso, cada `Command+K` ou `Chat` já sabe que existe um componente{' '}
                    <code>&lt;Icon /&gt;</code> e uma fonte Serif específica.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- ABA AI STUDIO / CLAUDE --- */}
        <TabsContent value="aistudio" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-sans text-2xl font-bold">
                  System Instruction
                </h3>
                <p className="font-serif text-muted-foreground">
                  Ao usar o <strong>Google AI Studio</strong> ou iniciar um projeto no{' '}
                  <strong>Claude Code</strong>, cole este texto no campo "System Instructions" ou no
                  primeiro prompt.
                </p>
              </div>

              <CodeBlock title="System Prompt" language="bash">
                {systemPromptContent}
              </CodeBlock>
            </div>
          </div>
        </TabsContent>

        {/* --- ABA LOVABLE / VISUAL --- */}
        <TabsContent value="lovable" className="animate-fade-in space-y-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="font-sans text-2xl font-bold">Ferramentas Visuais (Lovable, V0)</h3>
                <p className="mt-2 font-serif text-muted-foreground">
                  Ferramentas como Lovable leem o repositório. O segredo é instruí-las a{' '}
                  <strong>reutilizar</strong> em vez de recriar.
                </p>
              </div>

              <Card className="border-l-4 border-l-brand-blue">
                <CardHeader>
                  <CardTitle>Prompt para Lovable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="rounded-lg bg-muted p-4 font-mono text-sm">
                    "I want to create a new Dashboard page. Please check the `components/ui` folder
                    and use the existing Card, Button, and Badge components. Do not create new CSS
                    styles, use the Tailwind variables defined in global.css (like var(--primary)).
                    Use the {'<Icon>'} component for icons."
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h4 className="font-bold">O que verificar no Output Visual:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="check" size="size-3" className="text-green-500" /> Se os botões
                    estão usando a classe <code>bg-primary</code> (Gold) e não um amarelo genérico.
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" size="size-3" className="text-green-500" /> Se a fonte
                    serifada está sendo usada nos parágrafos (<code>font-serif</code>).
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" size="size-3" className="text-green-500" /> Se o
                    arredondamento dos cards é <code>rounded-xl</code>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- ABA ENGENHARIA DE PROMPT --- */}
        <TabsContent value="prompts" className="animate-fade-in space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
              <div>
                <h3 className="font-sans text-2xl font-bold">Como pedir Componentes</h3>
                <p className="font-serif text-muted-foreground">
                  Exemplos de inputs para obter resultados "Lendários".
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* BAD EXAMPLE */}
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <Badge variant="destructive" className="mb-2 w-fit">
                    Jeito Medíocre
                  </Badge>
                  <CardTitle className="text-lg">O Pedido Vago</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded border border-border/50 bg-background p-3 font-mono text-sm text-muted-foreground">
                    "Crie um card de perfil para mim."
                  </div>
                  <div className="space-y-2 text-sm font-medium text-destructive">
                    <p className="flex items-center gap-2">
                      <Icon name="cross" size="size-3" /> A IA vai escolher cores aleatórias.
                    </p>
                    <p className="flex items-center gap-2">
                      <Icon name="cross" size="size-3" /> Vai usar fontes padrão (Arial/Roboto).
                    </p>
                    <p className="flex items-center gap-2">
                      <Icon name="cross" size="size-3" /> Provavelmente ficará feio.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* GOOD EXAMPLE */}
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <Badge className="mb-2 w-fit bg-primary text-primary-foreground">
                    Jeito Lendário
                  </Badge>
                  <CardTitle className="text-lg">O Pedido Contextual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded border border-border/50 bg-background p-3 font-mono text-sm text-muted-foreground">
                    "Crie um Card de Perfil seguindo o Design System. Use uma imagem redonda, nome
                    em Inter Bold, bio em Source Serif e um botão outline 'Ver Detalhes'."
                  </div>
                  <div className="space-y-2 text-sm font-medium text-primary">
                    <p className="flex items-center gap-2">
                      <Icon name="check" size="size-3" /> Segue a tipografia mista.
                    </p>
                    <p className="flex items-center gap-2">
                      <Icon name="check" size="size-3" /> Usa as variantes corretas de botão.
                    </p>
                    <p className="flex items-center gap-2">
                      <Icon name="check" size="size-3" /> Mantém a consistência visual.
                    </p>
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
