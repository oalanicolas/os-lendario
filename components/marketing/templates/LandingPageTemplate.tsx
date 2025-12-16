
import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const LandingPageTemplate: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in selection:bg-primary/30">
      
      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Symbol name="infinity" className="text-primary text-xl" />
                <span className="font-bold text-lg tracking-tight">Scale<span className="text-primary">AI</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <a href="#features" className="hover:text-foreground transition-colors">Funcionalidades</a>
                <a href="#method" className="hover:text-foreground transition-colors">Método</a>
                <a href="#testimonials" className="hover:text-foreground transition-colors">Depoimentos</a>
            </nav>
            <div className="flex items-center gap-4">
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">Login</a>
                <Button size="sm" className="rounded-full px-6">Começar Agora</Button>
            </div>
        </div>
      </header>

      <main className="flex-1">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] -z-10"></div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 py-1.5 px-4 text-sm uppercase tracking-widest backdrop-blur-sm">
                    <span className="mr-2 relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Nova Turma Aberta
                </Badge>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
                    Escale sua operação <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand-yellow to-primary animate-shimmer bg-[length:200%_auto]">sem aumentar o time.</span>
                </h1>
                
                <p className="font-sans font-medium text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                    O sistema operacional completo para gestores que desejam implementar Inteligência Artificial e automatizar 80% da rotina.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                        Quero Escalar Agora <Icon name="arrow-right" className="ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm">
                        <Icon name="play-circle" className="mr-2" /> Ver Demo de 2min
                    </Button>
                </div>

                <div className="mt-16 pt-8 border-t border-border/50 max-w-4xl mx-auto">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Empresas que já usam nosso método</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 text-xl font-bold"><Icon name="google" type="brands" /> Google</div>
                        <div className="flex items-center gap-2 text-xl font-bold"><Icon name="microsoft" type="brands" /> Microsoft</div>
                        <div className="flex items-center gap-2 text-xl font-bold"><Icon name="spotify" type="brands" /> Spotify</div>
                        <div className="flex items-center gap-2 text-xl font-bold"><Icon name="amazon" type="brands" /> Amazon</div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- PROBLEM / AGITATION (Split) --- */}
        <section className="py-24 bg-card border-y border-border">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            O "Caos Silencioso" que mata <br/>
                            <span className="text-destructive decoration-destructive/30 underline decoration-wavy underline-offset-4">agências e consultorias.</span>
                        </h2>
                        <div className="space-y-6 font-serif text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Você sente que trabalha 12h por dia, mas a empresa não sai do lugar? Sua equipe está sempre ocupada, mas os lucros não aumentam?
                            </p>
                            <p>
                                O problema não é esforço. É <strong className="text-foreground">ineficiência operacional</strong>. Enquanto você perde tempo respondendo e-mails e gerenciando planilhas, seus concorrentes estão usando IA para entregar 10x mais rápido.
                            </p>
                        </div>
                        <ul className="space-y-3 mt-4">
                            {[
                                "Falta de processos definidos",
                                "Dependência total do dono",
                                "Contratações erradas e caras",
                                "Clientes insatisfeitos com a demora"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <Icon name="cross-circle" className="text-destructive" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-destructive/20 to-transparent rounded-2xl blur-2xl"></div>
                        <div className="bg-background border border-border p-8 rounded-2xl shadow-2xl relative">
                            <div className="space-y-4">
                                <div className="h-2 w-1/3 bg-muted rounded"></div>
                                <div className="space-y-2">
                                    <div className="h-12 w-full bg-destructive/10 rounded border border-destructive/20 flex items-center px-4 text-destructive text-sm font-bold gap-3">
                                        <Icon name="exclamation" /> Margem de Lucro: -15%
                                    </div>
                                    <div className="h-12 w-full bg-muted/30 rounded flex items-center px-4 text-muted-foreground text-sm gap-3">
                                        <Icon name="clock" /> Horas Extras: +40h/sem
                                    </div>
                                    <div className="h-12 w-full bg-muted/30 rounded flex items-center px-4 text-muted-foreground text-sm gap-3">
                                        <Icon name="user-delete" /> Churn Rate: Alto Risco
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- SOLUTION (Bento Grid) --- */}
        <section id="features" className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <Badge variant="secondary">O Novo Padrão</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold">O Sistema Operacional da <span className="text-primary">Era da IA</span></h2>
                    <p className="font-sans font-medium text-lg text-muted-foreground">Não é apenas uma ferramenta. É uma reestruturação completa de como seu negócio funciona.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1 - Large */}
                    <Card className="md:col-span-2 bg-gradient-to-br from-card to-muted/20 border-primary/10 overflow-hidden group">
                        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                            <div className="space-y-6 flex-1">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:scale-110 transition-transform duration-500">
                                    <Icon name="brain" />
                                </div>
                                <h3 className="text-2xl font-bold">Segundo Cérebro Organizacional</h3>
                                <p className="font-sans font-medium text-muted-foreground leading-relaxed">
                                    Centralize todo o conhecimento da sua empresa em uma base vetorial. Seus agentes de IA aprendem com seu histórico e tom de voz.
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 aspect-video bg-background/50 rounded-xl border border-border/50 shadow-inner flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
                                <Icon name="network-cloud" className="text-6xl text-primary/20" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 2 - Tall */}
                    <Card className="md:row-span-2 bg-card border-border overflow-hidden group">
                        <CardContent className="p-8 h-full flex flex-col">
                            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 group-hover:rotate-12 transition-transform">
                                <Icon name="rocket" size="size-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Automação de Vendas</h3>
                            <p className="font-sans font-medium text-sm text-muted-foreground mb-8 flex-1">
                                Scripts de qualificação e follow-up rodando 24/7. Nunca mais perca um lead por demora na resposta.
                            </p>
                            <div className="space-y-2">
                                <div className="p-3 bg-muted/30 rounded-lg text-xs flex justify-between items-center">
                                    <span>Lead Qualificado</span>
                                    <Badge variant="success" className="h-5">Auto</Badge>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg text-xs flex justify-between items-center">
                                    <span>Reunião Agendada</span>
                                    <Badge variant="success" className="h-5">Auto</Badge>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg text-xs flex justify-between items-center">
                                    <span>Proposta Enviada</span>
                                    <Badge variant="success" className="h-5">Auto</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 3 */}
                    <Card className="bg-card border-border group hover:border-primary/30 transition-colors">
                        <CardContent className="p-8">
                            <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                                <Icon name="chart-histogram" size="size-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Analytics Preditivo</h3>
                            <p className="font-sans font-medium text-sm text-muted-foreground">
                                Saiba quanto você vai faturar mês que vem com base no comportamento atual.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Feature 4 */}
                    <Card className="bg-card border-border group hover:border-primary/30 transition-colors">
                        <CardContent className="p-8">
                            <div className="w-12 h-12 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-4">
                                <Icon name="users-alt" size="size-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Clonagem de Gestão</h3>
                            <p className="font-sans font-medium text-sm text-muted-foreground">
                                Crie "gêmeos digitais" dos seus melhores funcionários para treinar os novatos.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section id="testimonials" className="py-24 bg-muted/20 border-y border-border">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16">Quem aplica, <span className="text-primary">escala.</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="bg-background border-none shadow-lg">
                            <CardContent className="p-8 flex flex-col gap-6 h-full">
                                <div className="flex text-brand-yellow gap-1">
                                    <Icon name="star" type="solid" size="size-4" />
                                    <Icon name="star" type="solid" size="size-4" />
                                    <Icon name="star" type="solid" size="size-4" />
                                    <Icon name="star" type="solid" size="size-4" />
                                    <Icon name="star" type="solid" size="size-4" />
                                </div>
                                <p className="font-serif text-muted-foreground flex-1 italic">
                                    "Simplesmente mudou o jogo da minha agência. Reduzi o custo operacional em 40% e a equipe está mais feliz."
                                </p>
                                <div className="flex items-center gap-4 pt-4 border-t border-border">
                                    <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                        <AvatarFallback>U{i}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm">Ricardo Silva</p>
                                        <p className="text-xs text-muted-foreground">CEO @ GrowthAds</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-24 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg">Preciso saber programar?</AccordionTrigger>
                    <AccordionContent className="text-base font-sans font-medium text-muted-foreground">
                        Não. Nosso método foca em ferramentas No-Code e Low-Code, acessíveis para qualquer gestor.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg">Quanto tempo para implementar?</AccordionTrigger>
                    <AccordionContent className="text-base font-sans font-medium text-muted-foreground">
                        O setup inicial leva cerca de 7 dias. A otimização completa acontece ao longo de 4 semanas.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg">Serve para minha empresa?</AccordionTrigger>
                    <AccordionContent className="text-base font-sans font-medium text-muted-foreground">
                        Se você vende serviços, infoprodutos ou consultoria e tem uma equipe (mesmo que pequena), sim.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-foreground text-background px-6 py-20 md:px-20 text-center">
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <Symbol name="infinity" className="text-[25rem]" />
                    </div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                            O futuro não espera.
                        </h2>
                        <p className="font-sans font-medium text-xl text-zinc-400 max-w-2xl mx-auto">
                            Garanta sua vantagem competitiva hoje mesmo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button size="lg" className="h-16 px-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/20">
                                Garantir Minha Vaga
                            </Button>
                        </div>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                            Garantia de 30 dias • Cancelamento Grátis
                        </p>
                    </div>
                </div>
            </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-border bg-card py-12 text-muted-foreground text-sm">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                  <Symbol name="infinity" className="text-primary" />
                  <span className="font-bold text-foreground">Academia Lendária</span>
              </div>
              <div className="flex gap-6">
                  <a href="#" className="hover:text-primary transition-colors">Termos</a>
                  <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
                  <a href="#" className="hover:text-primary transition-colors">Suporte</a>
              </div>
              <div className="flex gap-4">
                  <Icon name="instagram" type="brands" className="hover:text-foreground cursor-pointer transition-colors" />
                  <Icon name="linkedin" type="brands" className="hover:text-foreground cursor-pointer transition-colors" />
                  <Icon name="youtube" type="brands" className="hover:text-foreground cursor-pointer transition-colors" />
              </div>
          </div>
      </footer>
    </div>
  );
};

export default LandingPageTemplate;
