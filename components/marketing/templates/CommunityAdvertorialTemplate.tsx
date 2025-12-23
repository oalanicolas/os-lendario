import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Symbol } from '../../ui/symbol';

const CommunityAdvertorialTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="w-full animate-fade-in bg-background pb-20 font-serif selection:bg-primary/30">
      {/* Top Bar (Fake News Site - "The Legendary Post") */}
      <div className="sticky top-0 z-40 mb-12 border-b border-border bg-card py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Icon name="menu-burger" className="cursor-pointer text-muted-foreground" />
            <span className="flex items-center gap-2 font-serif text-xl font-bold italic tracking-tighter md:text-2xl">
              <Symbol name="infinity" className="text-primary" />
              The <span className="text-primary">Legendary</span> Post
            </span>
          </div>
          <div className="hidden gap-6 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground md:flex">
            <span className="-mb-4 border-b-2 border-primary pb-4 text-foreground">Carreira</span>
            <span className="cursor-pointer hover:text-foreground">Tecnologia</span>
            <span className="cursor-pointer hover:text-foreground">Liderança</span>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="ghost" className="h-8 w-8">
              <Icon name="search" />
            </Button>
            <Button
              size="sm"
              className="hidden h-8 font-sans text-xs font-bold uppercase tracking-wider sm:flex"
            >
              Inscrever-se
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-12">
        {/* Main Content Column */}
        <main className="lg:col-span-8">
          {/* Article Header */}
          <header className="mb-8 space-y-6">
            <div className="flex items-center gap-2">
              <Badge
                variant="warning"
                className="rounded-sm border-brand-orange/20 bg-brand-orange/10 text-[10px] uppercase tracking-widest text-brand-orange"
              >
                Carreira
              </Badge>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Dezembro 2025 • 7 min de leitura
              </span>
            </div>

            <h1 className="font-serif text-3xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
              80% Dos Profissionais Experientes Estão Perdendo Horas Por Dia Em Tarefas Que IA
              Resolve Em Minutos
            </h1>

            <h2 className="border-l-4 border-primary pl-6 font-sans text-lg font-light italic leading-relaxed text-muted-foreground md:text-xl">
              Uma pesquisa com 150+ profissionais revelou por que décadas de experiência estão sendo
              desperdiçadas — e o sistema de 3 camadas que inverte isso.
            </h2>

            <div className="mt-8 flex items-center justify-between border-y border-border/50 py-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={alanAvatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div className="text-left font-sans">
                  <p className="text-sm font-bold text-foreground">Por Redação Lendária</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Especial Carreira 4.0
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-muted/20 hover:bg-brand-blue/10 hover:text-brand-blue"
                >
                  <Icon name="linkedin" type="brands" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-muted/20 hover:bg-brand-green/10 hover:text-brand-green"
                >
                  <Icon name="whatsapp" type="brands" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Image */}
          <figure className="mb-12">
            <div className="group relative aspect-video w-full overflow-hidden rounded-md bg-muted shadow-lg">
              <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1504384308090-c54be3852f9d?q=80&w=2070&auto=format&fit=crop"
                alt="Profissional sobrecarregado"
                className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-2 flex items-center justify-center gap-2 font-sans text-xs italic text-muted-foreground">
              <Icon name="camera" size="size-3" /> O paradoxo da produtividade: mais ferramentas,
              menos tempo. (Foto: Unsplash)
            </figcaption>
          </figure>

          {/* Body Content - KEEP FONT-SERIF */}
          <article className="prose dark:prose-invert prose-lg max-w-none font-serif leading-loose text-foreground/90">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-primary">
              Você construiu 15, 20, talvez 25 anos de carreira. Formação sólida. Experiência real.
              Resultados comprovados.
            </p>

            <p>
              E mesmo assim, acorda todo dia com a sensação de que está operando em 30% do seu
              potencial. <strong>Você não está imaginando coisas.</strong>
            </p>

            {/* STATS SECTION */}
            <div className="my-12">
              <h3 className="mb-6 flex items-center gap-2 font-sans text-2xl font-bold uppercase tracking-wide">
                <span className="block h-6 w-1 bg-destructive"></span> Os números que ninguém quer
                admitir
              </h3>
              <div className="space-y-6 rounded-xl border border-border bg-muted/10 p-8">
                <p className="mb-4 font-sans text-sm text-muted-foreground">
                  Uma pesquisa com 150+ profissionais em transição revelou o que todos sentem mas
                  poucos falam:
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="mb-1 text-4xl font-bold text-destructive">80%</div>
                    <p className="font-sans text-sm leading-snug">
                      têm seu tempo sugado por tarefas repetitivas que não geram resultado.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="mb-1 text-4xl font-bold text-destructive">65%</div>
                    <p className="font-sans text-sm leading-snug">
                      vivem no loop de "muitas ideias, pouca execução".
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="mb-1 text-4xl font-bold text-destructive">60%</div>
                    <p className="font-sans text-sm leading-snug">
                      estão em burnout declarado ou em desenvolvimento.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="mb-1 text-4xl font-bold text-destructive">55%</div>
                    <p className="font-sans text-sm leading-snug">têm renda estagnada há anos.</p>
                  </div>
                </div>
                <p className="mt-6 border-l-2 border-primary pl-4 text-base italic">
                  A média de idade? <strong>40 anos.</strong> Profissionais no auge da capacidade
                  intelectual. Desperdiçando energia em operacional enquanto jovens de 25 anos usam
                  IA para entregar em 2 horas o que você leva 2 dias.
                </p>
              </div>
            </div>

            <h3 className="mb-6 mt-12 font-sans text-2xl font-bold">O Inimigo tem Nome</h3>

            <p>
              Não é falta de inteligência. Você provou sua competência milhares de vezes. Não é
              falta de informação. Você consome mais conteúdo em uma semana do que seus pais em uma
              década.
            </p>

            <p>
              <strong>O inimigo é o sistema de incentivos do mercado digital.</strong>
            </p>

            <p>
              Cada guru vende novidade, não resultado. Cada ferramenta promete revolução, entrega
              distração. Cada "método" te puxa para uma direção diferente. O resultado? Energia
              diluída. Projetos inacabados. Ciclo de entusiasmo-frustração. E a sensação corrosiva
              de que talvez o problema seja você.
            </p>

            <p className="my-8 text-center text-xl font-bold text-primary">Não é.</p>

            {/* SOLUTION SECTION */}
            <h3 className="mb-6 mt-12 font-sans text-2xl font-bold uppercase tracking-wide">
              O que profissionais que saíram do loop têm em comum
            </h3>

            <p>
              Alan Nicolas — R$200+ milhões faturados, 20.000+ alunos em 40+ países — identificou um
              padrão depois de anos formando profissionais experientes. Quem consegue transformar
              experiência em vantagem competitiva com IA tem 3 coisas:
            </p>

            <div className="not-prose my-8 grid gap-6">
              <Card className="border-l-4 border-l-primary bg-card">
                <CardContent className="p-6">
                  <h4 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <Icon name="brain" className="text-primary" /> 1. Sistema único de organização
                    mental
                  </h4>
                  <p className="font-sans text-sm font-medium text-muted-foreground">
                    Não 47 apps. Um "Segundo Cérebro" que libera a mente para o que importa.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary bg-card">
                <CardContent className="p-6">
                  <h4 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <Icon name="target" className="text-primary" /> 2. Foco radical em uma direção
                  </h4>
                  <p className="font-sans text-sm font-medium text-muted-foreground">
                    Não 5 projetos simultâneos. Uma oferta clara que une experiência com demanda
                    real.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary bg-card">
                <CardContent className="p-6">
                  <h4 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <Icon name="users-alt" className="text-primary" /> 3. Comunidade de
                    accountability
                  </h4>
                  <p className="font-sans text-sm font-medium text-muted-foreground">
                    Não isolamento heroico. Pares que cobram execução, não aplaudem procrastinação.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* TESTIMONIALS GRID */}
            <div className="my-12 rounded-xl border border-border/50 bg-muted/10 p-8">
              <h3 className="mb-8 text-center font-sans text-xl font-bold">
                O que dizem os que aplicaram
              </h3>
              <div className="not-prose grid gap-4 md:grid-cols-2">
                {[
                  { text: 'Segundo cérebro foi fora de série.', author: 'KR' },
                  {
                    text: 'Sensação de pertencimento absurdo. Como se tivesse encontrado minha tribo.',
                    author: 'Lucas',
                  },
                  { text: 'Entrei pra aprender IA, aprendi sobre mim.', author: 'Rodrigo' },
                  { text: 'Entregam muito mais do que prometem.', author: 'Cristina' },
                  { text: 'PS destrava o que você está travado.', author: 'Raphael' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-background p-4 font-serif text-sm shadow-sm"
                  >
                    <p className="mb-2 italic text-muted-foreground">"{item.text}"</p>
                    <p className="font-sans font-bold text-foreground">— {item.author}</p>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="mb-6 mt-12 font-sans text-2xl font-bold">
              A pergunta que separa quem executa de quem só consome
            </h3>

            <p>
              Se profissionais como KR, Lucas, Rodrigo, Cristina e Raphael — pessoas com décadas de
              experiência que já tinham tentado de tudo — encontraram transformação real...
            </p>
            <p>
              Se a taxa de retenção nas primeiras 48 horas é de <strong>98%</strong>...
            </p>
            <p>Se 20.000+ alunos em 40+ países já passaram pelo sistema...</p>
            <p className="text-lg font-bold">O que falta para você?</p>
            <p>Não é mais informação. É o sistema certo.</p>

            {/* CHECKLIST */}
            <div className="not-prose my-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-brand-green/20 bg-brand-green/5 p-6">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-brand-green">
                  <Icon name="check-circle" /> Para quem funciona
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <Icon name="check" className="shrink-0 text-brand-green" /> Profissionais 35-55
                    anos com experiência real acumulada
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" className="shrink-0 text-brand-green" /> Quem já tentou de
                    tudo e sabe que o problema não é falta de conhecimento
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" className="shrink-0 text-brand-green" /> Quem quer construir
                    algo próprio antes que seja tarde demais
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" className="shrink-0 text-brand-green" /> Quem busca
                    comunidade de iguais, não mais um guru
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-destructive">
                  <Icon name="cross-circle" /> Não funciona para
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <Icon name="cross" className="shrink-0 text-destructive" /> Quem busca fórmula
                    mágica sem implementação
                  </li>
                  <li className="flex gap-2">
                    <Icon name="cross" className="shrink-0 text-destructive" /> Quem quer que façam
                    por ele
                  </li>
                  <li className="flex gap-2">
                    <Icon name="cross" className="shrink-0 text-destructive" /> Quem ainda acha que
                    IA é modinha
                  </li>
                </ul>
              </div>
            </div>

            {/* FINAL OFFER */}
            <Card className="not-prose relative my-12 overflow-hidden border-primary shadow-2xl">
              <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-primary via-brand-yellow to-primary"></div>
              <CardContent className="p-8 text-center md:p-12">
                <h3 className="mb-4 font-sans text-3xl font-bold">O Próximo Passo</h3>
                <p className="mx-auto mb-8 max-w-xl font-sans font-medium text-muted-foreground">
                  Alan Nicolas abriu vagas para a <strong>Comunidade Lendár[IA]</strong> — o
                  ecossistema completo de treinamento + ferramentas + comunidade.
                </p>

                <div className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-6 text-left sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                      Investimento
                    </p>
                    <p className="text-lg font-bold">12x de R$98</p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                      Garantia
                    </p>
                    <p className="text-lg font-bold">30 dias Anti-Tédio</p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">Bônus</p>
                    <p className="text-lg font-bold">Super Chat IA</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="h-16 w-full animate-pulse-slow px-12 text-lg font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(201,178,152,0.3)] md:w-auto"
                >
                  Quero Conhecer a Comunidade Lendária <Icon name="arrow-right" className="ml-2" />
                </Button>

                <p className="mt-4 text-xs text-muted-foreground opacity-70">
                  Inclui acesso a GPT-5, Claude Sonnet 4 e Grok 3 (Valor de R$8.400/ano).
                </p>
              </CardContent>
            </Card>

            <blockquote className="my-12 border-l-4 border-primary pl-6 text-lg italic text-foreground/80">
              "Não vou te transformar em expert em IA. Vou te ensinar a pensar com clareza
              suficiente para usar IA como extensão da sua genialidade, não muleta para sua
              mediocridade."
              <footer className="mt-2 font-sans font-bold not-italic text-primary">
                — Alan Nicolas
              </footer>
            </blockquote>
          </article>
        </main>

        {/* Sidebar Column */}
        <aside className="space-y-8 lg:col-span-4">
          {/* Author Bio */}
          <div className="sticky top-24 space-y-8">
            <div className="rounded-xl border border-border bg-card p-6 text-center shadow-md">
              <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary">
                <Avatar className="h-full w-full">
                  <AvatarImage src={alanAvatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
              </div>
              <h4 className="font-sans text-lg font-bold">Alan Nicolas</h4>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                Fundador
              </p>
              <p className="mb-6 font-sans text-sm font-medium leading-relaxed text-muted-foreground">
                Empresário com R$200M+ em vendas e mentor de 20.000 líderes. Sua missão é
                imortalizar o legado de profissionais experientes através da Inteligência
                Artificial.
              </p>
              <Button variant="outline" className="w-full text-xs">
                Seguir no LinkedIn
              </Button>
            </div>

            {/* Urgency Box */}
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-white shadow-xl">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <Symbol name="infinity" className="text-8xl" />
              </div>
              <div className="relative z-10 space-y-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span> Vagas
                  Abertas
                </p>
                <h4 className="font-sans text-xl font-bold leading-tight">
                  Não deixe sua experiência se tornar obsoleta.
                </h4>
                <p className="font-sans text-sm font-medium text-zinc-400">
                  A próxima turma da Comunidade Lendária começa em breve. Garanta sua condição
                  especial.
                </p>
                <Button className="w-full bg-white font-bold text-black hover:bg-zinc-200">
                  Ver Detalhes
                </Button>
              </div>
            </div>

            {/* Related */}
            <div className="space-y-4 border-t border-border pt-4">
              <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Leia Também
              </h5>
              <a href="#" className="group block">
                <h6 className="text-sm font-bold transition-colors group-hover:text-primary">
                  O fim das agências tradicionais?
                </h6>
                <p className="text-xs text-muted-foreground">Mercado • 4 min</p>
              </a>
              <a href="#" className="group block">
                <h6 className="text-sm font-bold transition-colors group-hover:text-primary">
                  3 Prompts para dobrar sua produtividade
                </h6>
                <p className="text-xs text-muted-foreground">Tática • 2 min</p>
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky Bottom CTA Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 p-4 backdrop-blur md:hidden">
        <Button className="w-full font-bold shadow-lg">Conhecer a Comunidade</Button>
      </div>
    </div>
  );
};

export default CommunityAdvertorialTemplate;
