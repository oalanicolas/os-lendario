import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Separator } from '../../ui/separator';

const SalesPageTemplate: React.FC = () => {
  return (
    <div className="w-full max-w-full animate-fade-in space-y-0 overflow-x-hidden font-sans">
      {/* --- URGENCY BAR --- */}
      <div className="sticky top-0 z-50 bg-primary py-2 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md">
        🔥 Últimas 4 vagas com condição especial
      </div>

      {/* --- HERO / VSL SECTION --- */}
      <div className="relative overflow-hidden bg-[#050505] px-4 py-16 text-center md:py-24">
        {/* Background Elements */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span> AO VIVO
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Pare de perder tempo com tarefas que <br />
            <span className="bg-gradient-to-r from-primary to-brand-yellow bg-clip-text text-transparent">
              uma IA faria em segundos.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl font-sans text-xl font-medium leading-relaxed text-zinc-400">
            Descubra o sistema exato para automatizar 80% do seu operacional e dobrar seus lucros em
            90 dias, sem precisar contratar ninguém.
          </p>

          {/* VSL PLACEHOLDER */}
          <div className="group relative mx-auto mt-8 aspect-video w-full max-w-4xl cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_50px_rgba(201,178,152,0.1)] ring-1 ring-white/5">
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/90 pl-2 shadow-lg shadow-primary/30 backdrop-blur-sm transition-transform group-hover:scale-110">
                <Icon name="play" className="text-4xl text-white" type="solid" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-zinc-800">
              <div className="h-full w-1/3 bg-primary"></div>
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
              className="h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
            />
          </div>

          <div className="flex flex-col items-center pt-8">
            <Button
              size="lg"
              className="h-20 animate-button-shimmer border-0 bg-[linear-gradient(110deg,#C9B298,45%,#fff,55%,#C9B298)] bg-[length:200%_100%] px-16 text-xl font-bold uppercase tracking-wider text-black shadow-[0_0_30px_rgba(201,178,152,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(201,178,152,0.6)]"
            >
              Quero Acesso ao Sistema <Icon name="arrow-right" className="ml-2" />
            </Button>
            <div className="mt-6 flex gap-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
              <span className="flex items-center gap-2">
                <Icon name="lock" size="size-3" /> Compra Segura
              </span>
              <span className="flex items-center gap-2">
                <Icon name="check" size="size-3" /> Acesso Imediato
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- WHO IS THIS FOR (New) --- */}
      <section className="border-b border-border bg-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Para quem é este sistema?</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-success/20 bg-success/5">
              <CardHeader>
                <CardTitle className="text-success flex items-center gap-2">
                  <Icon name="check-circle" /> PARA VOCÊ SE...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Icon name="check" className="text-success mt-1 shrink-0" />{' '}
                  <span>Você é dono de agência ou consultoria.</span>
                </div>
                <div className="flex gap-3">
                  <Icon name="check" className="text-success mt-1 shrink-0" />{' '}
                  <span>Sente que passa o dia apagando incêndios.</span>
                </div>
                <div className="flex gap-3">
                  <Icon name="check" className="text-success mt-1 shrink-0" />{' '}
                  <span>Quer escalar mas tem medo de aumentar custos.</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Icon name="cross-circle" /> NÃO É PARA VOCÊ SE...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Icon name="cross" className="mt-1 shrink-0 text-destructive" />{' '}
                  <span>Procura dinheiro fácil sem trabalho.</span>
                </div>
                <div className="flex gap-3">
                  <Icon name="cross" className="mt-1 shrink-0 text-destructive" />{' '}
                  <span>Acha que IA é apenas "hype" passageiro.</span>
                </div>
                <div className="flex gap-3">
                  <Icon name="cross" className="mt-1 shrink-0 text-destructive" />{' '}
                  <span>Não está disposto a mudar processos antigos.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- THE STACK (Visual Improvement) --- */}
      <section className="relative bg-muted/10 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">
              O que você leva
            </Badge>
            <h2 className="text-4xl font-bold">A oferta irresistível</h2>
            <p className="mt-4 text-muted-foreground">
              Tudo o que você precisa para sair do operacional.
            </p>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50 md:flex-row">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-3xl text-primary">
                  <Icon name="brain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Módulo 1: Fundamentos da IA</h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Domine a engenharia de prompt e os modelos de linguagem.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-destructive line-through">R$ 997</span>
                <span className="block text-sm font-bold text-primary">Incluso</span>
              </div>
            </div>

            {/* Item 2 - Highlight */}
            <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-card to-primary/5 p-6 shadow-md md:flex-row">
              <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                CORE
              </div>
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-3xl text-primary-foreground shadow-lg shadow-primary/20">
                  <Icon name="rocket" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Módulo 2: Automação de Vendas</h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    O funil automático que qualifica e vende 24/7.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-destructive line-through">R$ 1.997</span>
                <span className="block text-sm font-bold text-primary">Incluso</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50 md:flex-row">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-3xl text-primary">
                  <Icon name="users-alt" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Módulo 3: Time Aumentado</h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Multiplique a produtividade da sua equipe em 5x.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-destructive line-through">R$ 997</span>
                <span className="block text-sm font-bold text-primary">Incluso</span>
              </div>
            </div>

            {/* Bonus */}
            <div className="mt-8 rounded-lg border border-brand-gold/30 bg-brand-gold/10 p-4 text-center">
              <p className="text-brand-gold-800 flex items-center justify-center gap-2 font-bold dark:text-brand-gold">
                <Icon name="gift" /> Bônus: Comunidade VIP + Calls Mensais (Valor Inestimável)
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border px-4 pt-8">
            <span className="text-lg text-muted-foreground">Valor Total:</span>
            <span className="text-2xl font-bold text-muted-foreground line-through decoration-destructive decoration-2">
              R$ 3.991
            </span>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section className="bg-background px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <Card className="relative transform overflow-hidden border-2 border-primary bg-card shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl bg-primary px-12 py-1.5 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
              Oferta Por Tempo Limitado
            </div>

            <div className="grid items-center gap-12 p-8 md:grid-cols-2 md:p-16">
              <div className="space-y-8 text-left">
                <h3 className="text-3xl font-bold">Acesso Completo</h3>
                <div className="space-y-4">
                  {[
                    'Curso Completo (30h)',
                    'Biblioteca de 500+ Prompts',
                    'Comunidade de Networking',
                    'Certificado Oficial',
                    'Suporte Prioritário',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-success/10 text-success flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        <Icon name="check" size="size-3" />
                      </div>
                      <span className="text-base font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 rounded-2xl border border-border bg-muted/20 p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  De <span className="line-through">R$ 1.997</span> por apenas:
                </p>
                <div className="space-y-1">
                  <p className="font-sans text-6xl font-bold tracking-tight text-primary">R$ 997</p>
                  <p className="text-sm font-bold text-muted-foreground">ou 12x de R$ 99,70</p>
                </div>
                <Button
                  size="lg"
                  className="h-16 w-full text-xl font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
                >
                  Comprar Agora
                </Button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground opacity-70">
                  <Icon name="lock" size="size-3" /> Pagamento processado via Hotmart
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* --- GUARANTEE --- */}
      <section className="border-y border-border bg-muted/10 px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary bg-background text-primary shadow-xl">
            <Icon name="shield-check" className="text-5xl" />
          </div>
          <h3 className="text-3xl font-bold">Risco Zero Absoluto</h3>
          <p className="font-serif text-lg leading-relaxed text-muted-foreground">
            Entre, assista às aulas, use os prompts. Se em <strong>7 dias</strong> você não sentir
            que o valor entregue é 10x maior que o preço, nós devolvemos 100% do seu dinheiro. Sem
            perguntas, sem letras miúdas.
          </p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="mx-auto max-w-3xl space-y-12 px-4 py-24">
        <h2 className="text-center text-3xl font-bold">Dúvidas Frequentes</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="1"
            className="rounded-lg border border-border px-4 data-[state=open]:bg-muted/30"
          >
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              O acesso é vitalício?
            </AccordionTrigger>
            <AccordionContent className="font-sans text-base font-medium text-muted-foreground">
              Sim! Você paga uma vez e tem acesso para sempre, incluindo futuras atualizações da
              plataforma.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="2"
            className="rounded-lg border border-border px-4 data-[state=open]:bg-muted/30"
          >
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              Tem suporte para dúvidas?
            </AccordionTrigger>
            <AccordionContent className="font-sans text-base font-medium text-muted-foreground">
              Temos um time de suporte dedicado dentro da plataforma e na comunidade exclusiva no
              Discord.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="3"
            className="rounded-lg border border-border px-4 data-[state=open]:bg-muted/30"
          >
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              Serve para iniciantes?
            </AccordionTrigger>
            <AccordionContent className="font-sans text-base font-medium text-muted-foreground">
              Com certeza. O curso começa do zero absoluto e vai até níveis avançados de automação.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Sticky Footer CTA (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 md:hidden">
        <Button size="lg" className="w-full font-bold shadow-lg">
          Quero minha vaga
        </Button>
      </div>
    </div>
  );
};

export default SalesPageTemplate;
