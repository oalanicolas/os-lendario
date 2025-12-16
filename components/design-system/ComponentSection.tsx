
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AvatarGroup } from '../ui/avatar-group'; // New Import
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from '../ui/breadcrumb';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { ScrollArea } from '../ui/scroll-area';
import { Spotlight } from '../ui/spotlight';

const ComponentSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* HERO SECTION EXAMPLE */}
      <section className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white shadow-2xl">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
         {/* Gradient Gradient to ensure text readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
         
         <div className="relative p-6 md:p-12 lg:p-24 flex flex-col items-center text-center space-y-8 z-10">
            <Badge variant="outline" className="text-primary-foreground border-primary/50 bg-primary/20 backdrop-blur-md px-4 py-1.5 animate-fade-in">
                <Symbol name="star" className="mr-2" />
                Academia Lendária v4.1
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight text-white max-w-4xl drop-shadow-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
                Crie o <span className="text-gradient-brand">Lendário</span>.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-300 font-serif max-w-2xl leading-relaxed drop-shadow-md animate-fade-in" style={{ animationDelay: '200ms' }}>
                Um ecossistema de design feito para escalar com elegância, precisão e performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Button size="lg" className="text-lg h-14 px-8 shadow-xl shadow-primary/10 w-full sm:w-auto">
                    Começar Agora
                </Button>
                {/* Fixed Button: Added bg-transparent to override light mode default, and hover:bg-white hover:text-black for contrast */}
                <Button size="lg" variant="outline" className="bg-transparent text-lg h-14 px-8 border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                    <Icon name="play" className="mr-2" /> Demo
                </Button>
            </div>
         </div>
      </section>

      {/* --- NEW LEGENDARY SHOWCASE --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="diamond" className="text-primary" /> Elementos "Lendários" (Spotlight & Liquid)
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Estes componentes carregam a assinatura visual da marca: profundidade, interação e textura.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Spotlight Card 1 */}
            <Spotlight className="rounded-xl border border-border bg-card shadow-sm h-full">
                <div className="p-8 flex flex-col h-full space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon name="microchip" size="size-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2">IA Generativa</h4>
                        <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                            Mova o mouse sobre este card. O efeito "Spotlight" revela uma luz sutil, criando a sensação de que a interface está viva e atenta.
                        </p>
                    </div>
                    <Button variant="link" className="mt-auto px-0 justify-start">Explorar <Icon name="arrow-right" className="ml-2" size="size-3" /></Button>
                </div>
            </Spotlight>

            {/* Spotlight Card 2 */}
            <Spotlight className="rounded-xl border border-border bg-card shadow-sm h-full" color="rgba(0, 199, 190, 0.15)">
                <div className="p-8 flex flex-col h-full space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-mint/10 flex items-center justify-center text-brand-mint">
                        <Icon name="stats" size="size-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2">Analytics em Tempo Real</h4>
                        <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                            Este card usa uma cor de spotlight diferente (Mint). Ideal para categorizar visualmente recursos sem sobrecarregar a tela.
                        </p>
                    </div>
                    <Button variant="link" className="mt-auto px-0 justify-start text-brand-mint">Ver Dados <Icon name="arrow-right" className="ml-2" size="size-3" /></Button>
                </div>
            </Spotlight>

            {/* Liquid Button Showcase */}
            <Card className="flex flex-col justify-center items-center p-8 bg-zinc-900 border-zinc-800">
                <div className="space-y-6 text-center">
                    <h4 className="text-white font-bold">Botão "Liquid Gold"</h4>
                    <p className="text-xs text-zinc-400 max-w-[200px] mx-auto">
                        O novo padrão <code className="bg-zinc-800 px-1 rounded">variant="default"</code> agora possui um brilho especular animado no hover.
                    </p>
                    <Button size="lg" className="w-full">
                        <Icon name="star" className="mr-2" /> Ação Lendária
                    </Button>
                    <Button variant="glowing" size="lg" className="w-full">
                        <Icon name="bolt" className="mr-2" /> Glowing Border
                    </Button>
                </div>
            </Card>
        </div>
      </section>

      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Componentes de Interface</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Elementos estruturais e de navegação para aplicações complexas.
        </p>
      </div>

      {/* Avatars (Existing & New Group) */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Avatares & Grupos</h3>
        <div className="flex flex-wrap items-center gap-12 p-8 bg-muted/30 rounded-xl">
           <div className="flex flex-wrap items-end gap-6">
               <div className="flex flex-col items-center gap-2">
                  <Avatar size="xl">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-primary text-primary-foreground">AL</AvatarFallback>
                  </Avatar>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
               </div>
           </div>

           {/* Avatar Group Showcase */}
           <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-muted-foreground">Times:</span>
                    <AvatarGroup limit={3}>
                        <Avatar><AvatarImage src="https://i.pravatar.cc/150?u=1" /><AvatarFallback>U1</AvatarFallback></Avatar>
                        <Avatar><AvatarImage src="https://i.pravatar.cc/150?u=2" /><AvatarFallback>U2</AvatarFallback></Avatar>
                        <Avatar><AvatarImage src="https://i.pravatar.cc/150?u=3" /><AvatarFallback>U3</AvatarFallback></Avatar>
                        <Avatar><AvatarFallback>U4</AvatarFallback></Avatar>
                        <Avatar><AvatarFallback>U5</AvatarFallback></Avatar>
                    </AvatarGroup>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-muted-foreground">Online:</span>
                    <AvatarGroup limit={4} size="sm">
                        <Avatar><AvatarFallback className="bg-green-100 text-green-700">A</AvatarFallback></Avatar>
                        <Avatar><AvatarFallback className="bg-blue-100 text-blue-700">B</AvatarFallback></Avatar>
                        <Avatar><AvatarFallback className="bg-purple-100 text-purple-700">C</AvatarFallback></Avatar>
                        <Avatar><AvatarFallback className="bg-orange-100 text-orange-700">D</AvatarFallback></Avatar>
                        <Avatar><AvatarFallback>E</AvatarFallback></Avatar>
                    </AvatarGroup>
                </div>
           </div>
        </div>
      </section>

      {/* ACCORDION SECTION */}
      <section className="space-y-12 border-t border-border pt-12">
        <div className="flex items-end justify-between">
             <h3 className="text-2xl font-sans font-semibold">Elementos Colapsáveis (Accordion)</h3>
             <Badge variant="secondary">FAQ & Módulos</Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Perguntas Frequentes</CardTitle>
                        <CardDescription>Estilo padrão para FAQs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>O que é a Academia Lendária?</AccordionTrigger>
                                <AccordionContent>
                                    É um ecossistema de educação focado em unir Inteligência Artificial Generativa com mentalidade de alta performance para criar negócios e carreiras à prova de futuro.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Posso acessar offline?</AccordionTrigger>
                                <AccordionContent>
                                    Sim, através do nosso aplicativo mobile você pode baixar aulas para assistir quando estiver sem conexão.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Qual a política de reembolso?</AccordionTrigger>
                                <AccordionContent>
                                    Oferecemos garantia incondicional de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu investimento.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Estrutura de Curso</CardTitle>
                        <CardDescription>Estilo para módulos de aula.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="space-y-2">
                            <AccordionItem value="mod-1" className="border border-border rounded-lg px-4 border-b">
                                <AccordionTrigger className="hover:no-underline py-3">
                                    <div className="flex flex-col items-start text-left">
                                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Módulo 01</span>
                                        <span>Fundamentos da IA</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer">
                                            <Icon name="play-circle" size="size-4" className="text-primary" />
                                            <span>Aula 1: O que é LLM?</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer">
                                            <Icon name="play-circle" size="size-4" className="text-primary" />
                                            <span>Aula 2: Engenharia de Prompt</span>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="mod-2" className="border border-border rounded-lg px-4 border-b">
                                <AccordionTrigger className="hover:no-underline py-3">
                                    <div className="flex flex-col items-start text-left">
                                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Módulo 02</span>
                                        <span>Aplicações de Negócio</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer">
                                            <Icon name="lock" size="size-4" className="text-muted-foreground" />
                                            <span className="text-muted-foreground">Conteúdo Bloqueado</span>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* SCROLL AREA SECTION */}
      <section className="space-y-12 border-t border-border pt-12">
        <h3 className="text-2xl font-sans font-semibold">Áreas de Rolagem (Scroll Area)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Termos de Uso</CardTitle>
                    <CardDescription>Conteúdo longo em espaço limitado.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] w-full rounded-md border border-border p-4 bg-muted/10">
                        <div className="space-y-4 text-sm font-serif text-muted-foreground">
                            <h4 className="font-bold text-foreground">1. Introdução</h4>
                            <p>Bem-vindo à Academia Lendária. Ao acessar este sistema, você concorda com...</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h4 className="font-bold text-foreground">2. Propriedade Intelectual</h4>
                            <p>Todo o conteúdo disponibilizado, incluindo textos, vídeos e códigos, é propriedade exclusiva...</p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <h4 className="font-bold text-foreground">3. Responsabilidades</h4>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Tags</CardTitle>
                    <CardDescription>Lista vertical compacta.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] w-full">
                        <div className="space-y-2 pr-4">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-2 border border-border rounded bg-card">
                                    <span className="text-sm font-medium">Tag #{i + 1}</span>
                                    <Badge variant="outline">{100 + i} itens</Badge>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* Badges (Expanded) */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Badges & Tags</h3>
        
        <div className="grid gap-6">
            {/* Semantic */}
            <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Semânticos</p>
                <div className="flex flex-wrap gap-4 items-center p-6 border border-border rounded-xl bg-card">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
            </div>

            {/* Roles */}
            <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Papéis (Roles)</p>
                <div className="flex flex-wrap gap-4 items-center p-6 border border-border rounded-xl bg-card">
                    <Badge variant="admin">Admin</Badge>
                    <Badge variant="editor">Editor</Badge>
                    <Badge variant="viewer">Viewer</Badge>
                </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                <div className="flex flex-wrap gap-4 items-center p-6 border border-border rounded-xl bg-card">
                    <Badge variant="active">Active</Badge>
                    <Badge variant="pending">Pending</Badge>
                    <Badge variant="inactive">Inactive</Badge>
                </div>
            </div>

             {/* Sizes */}
             <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tamanhos</p>
                <div className="flex flex-wrap items-center gap-4 p-6 border border-border rounded-xl bg-card">
                    <Badge size="sm" variant="outline">Small</Badge>
                    <Badge size="default" variant="outline">Default</Badge>
                    <Badge size="lg" variant="outline">Large</Badge>
                </div>
            </div>
        </div>
      </section>

      {/* Alerts (Updated) */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Alertas</h3>
        <div className="space-y-6">
            
            <Alert>
              <div className="relative z-10">
                <AlertTitle>
                    <Icon name="rocket" size="size-5" /> Informação do Sistema
                </AlertTitle>
                <AlertDescription>
                    Atualização do Sistema Lendário v4.1 disponível para download com novos recursos de IA.
                </AlertDescription>
              </div>
              {/* Watermark */}
              <Icon name="rocket" className="absolute -right-4 -bottom-4 text-7xl opacity-5 -rotate-12 pointer-events-none" />
            </Alert>

            <Alert variant="destructive">
               <div className="relative z-10">
                  <AlertTitle>
                      <Icon name="exclamation" size="size-5" /> Erro Crítico
                  </AlertTitle>
                  <AlertDescription>
                      Falha ao conectar com o servidor neural. Verifique suas credenciais de API.
                  </AlertDescription>
               </div>
               {/* Watermark */}
               <Icon name="exclamation" className="absolute -right-4 -bottom-4 text-7xl opacity-5 -rotate-12 pointer-events-none" />
            </Alert>

             <Alert variant="success">
               <div className="relative z-10">
                  <AlertTitle>
                      <Icon name="check-circle" size="size-5" /> Sucesso
                  </AlertTitle>
                  <AlertDescription>
                      Transação completada com êxito. O recibo foi enviado por email.
                  </AlertDescription>
               </div>
               {/* Watermark */}
               <Icon name="check-circle" className="absolute -right-4 -bottom-4 text-7xl opacity-5 -rotate-12 pointer-events-none" />
            </Alert>
        </div>
      </section>

      {/* Cards (Existing) */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Standard Shadcn Card */}
            <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardHeader>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
                        <Icon name="brain" size="size-5" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Conceito Lendário</CardTitle>
                    <CardDescription>Minimalismo estrutural.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Componentes isolados com responsabilidade única e estilo encapsulado.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="px-0">
                        Saiba mais <Icon name="arrow-right" className="ml-2" size="size-3" />
                    </Button>
                </CardFooter>
            </Card>

            {/* Feature Card */}
             <Card className="border-primary">
                <CardHeader>
                    <Badge className="w-fit mb-2">
                        <Symbol name="star" className="mr-1" />
                        Novo
                    </Badge>
                    <CardTitle>Inteligência Artificial</CardTitle>
                    <CardDescription>Módulo avançado disponível.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Icon name="clock" size="size-4" />
                            120h
                        </span>
                        <span className="flex items-center gap-1">
                            <Icon name="chart-histogram" size="size-4" />
                            Avançado
                        </span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Inscrever-se</Button>
                </CardFooter>
            </Card>
        </div>
      </section>

      {/* --- GUIDELINES --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
            <Icon name="check-circle" /> Diretrizes de Componentes
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* DO'S */}
            <Card className="border-brand-green/20 bg-brand-green/5">
                <CardHeader>
                    <CardTitle className="text-brand-green flex items-center gap-2">
                        <Icon name="check" /> O que fazer (Do)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-foreground">Hierarquia de Botões</span>
                        <p className="text-xs text-muted-foreground">Use apenas <strong>um</strong> botão primário (Gold) por seção ou card. Use variantes 'Secondary', 'Outline' ou 'Ghost' para ações secundárias.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-foreground">Rótulos Claros</span>
                        <p className="text-xs text-muted-foreground">Use verbos de ação nos botões (ex: "Salvar", "Criar", "Enviar"). Evite termos vagos como "Ok" ou "Sim".</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-foreground">Badges Semânticas</span>
                        <p className="text-xs text-muted-foreground">Use Badges para status (Ativo/Pendente) ou categorias. Não use para botões clicáveis.</p>
                    </div>
                </CardContent>
            </Card>

            {/* DON'TS */}
            <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2">
                        <Icon name="cross" /> O que não fazer (Don't)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-destructive">Excesso de Primários</span>
                        <p className="text-xs text-muted-foreground">Não coloque vários botões 'Default' (Gold) lado a lado. O usuário não saberá onde clicar.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-destructive">Ícones Isolados</span>
                        <p className="text-xs text-muted-foreground">Em botões com texto, o ícone deve servir de apoio, não substituir o rótulo (exceto em toolbars).</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-destructive">Tamanhos Misturados</span>
                        <p className="text-xs text-muted-foreground">Não misture botões de tamanho 'sm' e 'lg' na mesma linha de ação.</p>
                    </div>
                </CardContent>
            </Card>

        </div>
      </section>

    </div>
  );
};

export default ComponentSection;
