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
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans selection:bg-primary/30">
      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Symbol name="infinity" className="text-xl text-primary" />
            <span className="text-lg font-bold tracking-tight">
              Scale<span className="text-primary">AI</span>
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Funcionalidades
            </a>
            <a href="#method" className="transition-colors hover:text-foreground">
              Método
            </a>
            <a href="#testimonials" className="transition-colors hover:text-foreground">
              Depoimentos
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
            >
              Login
            </a>
            <Button size="sm" className="rounded-full px-6">
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden pb-32 pt-20">
          {/* Background Effects */}
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"></div>
          <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/5 px-4 py-1.5 text-sm uppercase tracking-widest text-primary backdrop-blur-sm"
            >
              <span className="relative mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Nova Turma Aberta
            </Badge>

            <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Escale sua operação <br />
              <span className="animate-shimmer bg-gradient-to-r from-primary via-brand-yellow to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                sem aumentar o time.
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-3xl font-sans text-xl font-medium leading-relaxed text-muted-foreground md:text-2xl">
              O sistema operacional completo para gestores que desejam implementar Inteligência
              Artificial e automatizar 80% da rotina.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 px-8 text-base shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-primary/30"
              >
                Quero Escalar Agora <Icon name="arrow-right" className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 bg-background/50 px-8 text-base backdrop-blur-sm"
              >
                <Icon name="play-circle" className="mr-2" /> Ver Demo de 2min
              </Button>
            </div>

            <div className="mx-auto mt-16 max-w-4xl border-t border-border/50 pt-8">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Empresas que já usam nosso método
              </p>
              <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale transition-all duration-500 hover:grayscale-0 md:gap-16">
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Icon name="google" type="brands" /> Google
                </div>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Icon name="microsoft" type="brands" /> Microsoft
                </div>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Icon name="spotify" type="brands" /> Spotify
                </div>
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Icon name="amazon" type="brands" /> Amazon
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROBLEM / AGITATION (Split) --- */}
        <section className="border-y border-border bg-card py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold md:text-4xl">
                  O "Caos Silencioso" que mata <br />
                  <span className="text-destructive underline decoration-destructive/30 decoration-wavy underline-offset-4">
                    agências e consultorias.
                  </span>
                </h2>
                <div className="space-y-6 font-serif text-lg leading-relaxed text-muted-foreground">
                  <p>
                    Você sente que trabalha 12h por dia, mas a empresa não sai do lugar? Sua equipe
                    está sempre ocupada, mas os lucros não aumentam?
                  </p>
                  <p>
                    O problema não é esforço. É{' '}
                    <strong className="text-foreground">ineficiência operacional</strong>. Enquanto
                    você perde tempo respondendo e-mails e gerenciando planilhas, seus concorrentes
                    estão usando IA para entregar 10x mais rápido.
                  </p>
                </div>
                <ul className="mt-4 space-y-3">
                  {[
                    'Falta de processos definidos',
                    'Dependência total do dono',
                    'Contratações erradas e caras',
                    'Clientes insatisfeitos com a demora',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <Icon name="cross-circle" className="text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-destructive/20 to-transparent blur-2xl"></div>
                <div className="relative rounded-2xl border border-border bg-background p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="h-2 w-1/3 rounded bg-muted"></div>
                    <div className="space-y-2">
                      <div className="flex h-12 w-full items-center gap-3 rounded border border-destructive/20 bg-destructive/10 px-4 text-sm font-bold text-destructive">
                        <Icon name="exclamation" /> Margem de Lucro: -15%
                      </div>
                      <div className="flex h-12 w-full items-center gap-3 rounded bg-muted/30 px-4 text-sm text-muted-foreground">
                        <Icon name="clock" /> Horas Extras: +40h/sem
                      </div>
                      <div className="flex h-12 w-full items-center gap-3 rounded bg-muted/30 px-4 text-sm text-muted-foreground">
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
            <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
              <Badge variant="secondary">O Novo Padrão</Badge>
              <h2 className="text-4xl font-bold md:text-5xl">
                O Sistema Operacional da <span className="text-primary">Era da IA</span>
              </h2>
              <p className="font-sans text-lg font-medium text-muted-foreground">
                Não é apenas uma ferramenta. É uma reestruturação completa de como seu negócio
                funciona.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Feature 1 - Large */}
              <Card className="group overflow-hidden border-primary/10 bg-gradient-to-br from-card to-muted/20 md:col-span-2">
                <CardContent className="flex flex-col items-center gap-8 p-8 md:flex-row md:p-12">
                  <div className="flex-1 space-y-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary transition-transform duration-500 group-hover:scale-110">
                      <Icon name="brain" />
                    </div>
                    <h3 className="text-2xl font-bold">Segundo Cérebro Organizacional</h3>
                    <p className="font-sans font-medium leading-relaxed text-muted-foreground">
                      Centralize todo o conhecimento da sua empresa em uma base vetorial. Seus
                      agentes de IA aprendem com seu histórico e tom de voz.
                    </p>
                  </div>
                  <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-background/50 shadow-inner md:w-1/2">
                    <div className="bg-grid-white/[0.02] absolute inset-0"></div>
                    <Icon name="network-cloud" className="text-6xl text-primary/20" />
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 - Tall */}
              <Card className="group overflow-hidden border-border bg-card md:row-span-2">
                <CardContent className="flex h-full flex-col p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-transform group-hover:rotate-12">
                    <Icon name="rocket" size="size-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Automação de Vendas</h3>
                  <p className="mb-8 flex-1 font-sans text-sm font-medium text-muted-foreground">
                    Scripts de qualificação e follow-up rodando 24/7. Nunca mais perca um lead por
                    demora na resposta.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3 text-xs">
                      <span>Lead Qualificado</span>
                      <Badge variant="success" className="h-5">
                        Auto
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3 text-xs">
                      <span>Reunião Agendada</span>
                      <Badge variant="success" className="h-5">
                        Auto
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3 text-xs">
                      <span>Proposta Enviada</span>
                      <Badge variant="success" className="h-5">
                        Auto
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="group border-border bg-card transition-colors hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon name="chart-histogram" size="size-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Analytics Preditivo</h3>
                  <p className="font-sans text-sm font-medium text-muted-foreground">
                    Saiba quanto você vai faturar mês que vem com base no comportamento atual.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="group border-border bg-card transition-colors hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink/10 text-brand-pink">
                    <Icon name="users-alt" size="size-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Clonagem de Gestão</h3>
                  <p className="font-sans text-sm font-medium text-muted-foreground">
                    Crie "gêmeos digitais" dos seus melhores funcionários para treinar os novatos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section id="testimonials" className="border-y border-border bg-muted/20 py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-16 text-center text-3xl font-bold">
              Quem aplica, <span className="text-primary">escala.</span>
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-none bg-background shadow-lg">
                  <CardContent className="flex h-full flex-col gap-6 p-8">
                    <div className="flex gap-1 text-brand-yellow">
                      <Icon name="star" type="solid" size="size-4" />
                      <Icon name="star" type="solid" size="size-4" />
                      <Icon name="star" type="solid" size="size-4" />
                      <Icon name="star" type="solid" size="size-4" />
                      <Icon name="star" type="solid" size="size-4" />
                    </div>
                    <p className="flex-1 font-serif italic text-muted-foreground">
                      "Simplesmente mudou o jogo da minha agência. Reduzi o custo operacional em 40%
                      e a equipe está mais feliz."
                    </p>
                    <div className="flex items-center gap-4 border-t border-border pt-4">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">Ricardo Silva</p>
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
        <section className="mx-auto max-w-3xl px-4 py-24">
          <h2 className="mb-12 text-center text-3xl font-bold">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">Preciso saber programar?</AccordionTrigger>
              <AccordionContent className="font-sans text-base font-medium text-muted-foreground">
                Não. Nosso método foca em ferramentas No-Code e Low-Code, acessíveis para qualquer
                gestor.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">
                Quanto tempo para implementar?
              </AccordionTrigger>
              <AccordionContent className="font-sans text-base font-medium text-muted-foreground">
                O setup inicial leva cerca de 7 dias. A otimização completa acontece ao longo de 4
                semanas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">Serve para minha empresa?</AccordionTrigger>
              <AccordionContent className="font-sans text-base font-medium text-muted-foreground">
                Se você vende serviços, infoprodutos ou consultoria e tem uma equipe (mesmo que
                pequena), sim.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="px-4 py-24">
          <div className="container mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-20 text-center text-background md:px-20">
              <div className="pointer-events-none absolute right-0 top-0 p-20 opacity-5">
                <Symbol name="infinity" className="text-[25rem]" />
              </div>

              <div className="relative z-10 mx-auto max-w-4xl space-y-8">
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                  O futuro não espera.
                </h2>
                <p className="mx-auto max-w-2xl font-sans text-xl font-medium text-zinc-400">
                  Garanta sua vantagem competitiva hoje mesmo.
                </p>
                <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-16 bg-primary px-12 text-lg text-primary-foreground shadow-2xl shadow-primary/20 hover:bg-primary/90"
                  >
                    Garantir Minha Vaga
                  </Button>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Garantia de 30 dias • Cancelamento Grátis
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-border bg-card py-12 text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Symbol name="infinity" className="text-primary" />
            <span className="font-bold text-foreground">Academia Lendária</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-primary">
              Termos
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Suporte
            </a>
          </div>
          <div className="flex gap-4">
            <Icon
              name="instagram"
              type="brands"
              className="cursor-pointer transition-colors hover:text-foreground"
            />
            <Icon
              name="linkedin"
              type="brands"
              className="cursor-pointer transition-colors hover:text-foreground"
            />
            <Icon
              name="youtube"
              type="brands"
              className="cursor-pointer transition-colors hover:text-foreground"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageTemplate;
