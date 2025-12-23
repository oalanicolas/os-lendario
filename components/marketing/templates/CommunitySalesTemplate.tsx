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
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Separator } from '../../ui/separator';

const CommunitySalesTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="w-full animate-fade-in bg-background pb-20 font-sans selection:bg-primary/30">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#050505] to-[#121212] px-4 py-20 text-white md:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"></div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-10 text-center">
          {/* Promise Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-primary backdrop-blur-sm">
            <Icon name="sparkles" size="size-4" />
            <span>A Janela de Oportunidade Está Fechando</span>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              Sua Experiência de 20 Anos É <br />
              <span className="bg-gradient-to-r from-primary via-brand-yellow to-primary bg-clip-text text-transparent">
                Vantagem Competitiva
              </span>
            </h1>
            <p className="mx-auto max-w-3xl font-serif text-xl leading-relaxed text-zinc-400 md:text-2xl">
              Se você souber usar IA para multiplicá-la. O ecossistema que 20.000+ profissionais
              usaram para transformar décadas de bagagem em resultado real.
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="group relative mx-auto aspect-video max-w-4xl cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_50px_rgba(201,178,152,0.1)] ring-1 ring-white/5">
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/90 pl-2 shadow-lg shadow-primary/30 backdrop-blur-sm transition-transform group-hover:scale-110">
                <Icon name="play" className="text-4xl text-white" type="solid" />
              </div>
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              className="h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
              alt="Video Thumbnail"
            />
          </div>

          {/* Primary CTA */}
          <div className="pt-4">
            <Button
              size="lg"
              className="h-20 animate-pulse-slow px-12 text-xl font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(201,178,152,0.3)]"
            >
              Quero Entrar na Comunidade Lendária <Icon name="arrow-right" className="ml-2" />
            </Button>
            <p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">
              Acesso Imediato • 30 Dias de Garantia • Cancelamento Grátis
            </p>
          </div>
        </div>
      </section>

      {/* --- DIAGNOSIS CHECKLIST --- */}
      <section className="border-b border-border bg-muted/5 px-4 py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Você se reconhece?</h2>
            <p className="font-serif text-lg text-muted-foreground">
              Se você marcar 3 ou mais, este sistema foi feito para você.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Tem 15-20+ anos de experiência, mas sente que está operando em fração do seu potencial',
              'Já comprou dezenas de cursos. Nenhum gerou resultado consistente.',
              'Começa projetos empolgado. Abandona antes de ver resultado.',
              'Trabalha demais. Renda estagnada há anos.',
              'O tempo está passando. Você não está construindo nada próprio.',
              'Medo real de ser substituído por alguém 20 anos mais novo usando IA básica.',
              'Quer sair do CLT mas tem medo de destruir o padrão de vida da família.',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-primary text-primary">
                  <Icon name="check" size="size-3" />
                </div>
                <p className="font-medium text-foreground/90">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATISTICS GRID --- */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mx-auto mb-12 max-w-2xl text-center text-3xl font-bold">
            Os dados que provam que <span className="text-destructive">você não está sozinho</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none bg-muted/10 text-center shadow-none">
              <CardContent className="pt-6">
                <div className="mb-2 text-5xl font-bold text-destructive">80%</div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tempo Sugado
                </p>
                <p className="mt-2 font-serif text-xs text-muted-foreground">
                  por tarefas repetitivas
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/10 text-center shadow-none">
              <CardContent className="pt-6">
                <div className="mb-2 text-5xl font-bold text-destructive">65%</div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Loop Infinito
                </p>
                <p className="mt-2 font-serif text-xs text-muted-foreground">
                  muitas ideias, pouca execução
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/10 text-center shadow-none">
              <CardContent className="pt-6">
                <div className="mb-2 text-5xl font-bold text-destructive">60%</div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Burnout
                </p>
                <p className="mt-2 font-serif text-xs text-muted-foreground">
                  declarado ou em desenvolvimento
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/10 text-center shadow-none">
              <CardContent className="pt-6">
                <div className="mb-2 text-5xl font-bold text-destructive">60%</div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Caos Mental
                </p>
                <p className="mt-2 font-serif text-xs text-muted-foreground">
                  conhecimento desorganizado
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/10 text-center shadow-none">
              <CardContent className="pt-6">
                <div className="mb-2 text-5xl font-bold text-destructive">55%</div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Renda Estagnada
                </p>
                <p className="mt-2 font-serif text-xs text-muted-foreground">
                  há anos sem crescimento real
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-muted/10 text-center shadow-none">
              <CardContent className="pt-6">
                <div className="mb-2 text-5xl font-bold text-destructive">50%</div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Medo
                </p>
                <p className="mt-2 font-serif text-xs text-muted-foreground">de ficar obsoleto</p>
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-r-lg border-l-4 border-primary bg-primary/5 p-6">
            <p className="font-serif text-lg italic text-muted-foreground">
              "O problema não é você. É o sistema que você está usando. Ou a falta dele.
              Profissionais qualificados, experientes, mas travados pela complexidade."
            </p>
          </div>
        </div>
      </section>

      {/* --- AUTHORITY --- */}
      <section className="border-y border-white/10 bg-zinc-900 px-4 py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-primary shadow-2xl">
              <img src={alanAvatar} className="h-full w-full object-cover" alt="Alan Nicolas" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-lg font-bold">Alan Nicolas</p>
                <p className="text-xs uppercase tracking-widest text-zinc-300">Fundador</p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl font-bold md:text-4xl">Por que me ouvir?</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-primary">R$ 200M+</p>
                <p className="text-xs text-zinc-400">Faturados</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-primary">20.000+</p>
                <p className="text-xs text-zinc-400">Alunos Formados</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-primary">40+</p>
                <p className="text-xs text-zinc-400">Países</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-xs text-zinc-400">Retenção Inicial</p>
              </div>
            </div>

            <div className="space-y-4 font-serif leading-relaxed text-zinc-300">
              <p>
                <strong>O que eu não sou:</strong> Não sou dev. Não sou técnico de formação. Não sou
                guru de palco vendendo fórmula mágica.
              </p>
              <p>
                <strong>O que eu sou:</strong> Criador do conceito "Segundo Cérebro com IA" no
                Brasil. O cara que usa IA a cada 30 minutos — não como modinha, mas como extensão do
                cérebro.
              </p>
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm italic text-primary-foreground">
                "Eu também era o cara travado. TDAH. Milhões de ideias. Execução fragmentada. Criei
                o sistema para mim antes de ensinar para outros. Isso não é teoria. É o que me
                salvou."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE SOLUTION (MODULES) --- */}
      <section className="bg-background px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 space-y-4 text-center">
            <Badge variant="outline" className="border-primary text-primary">
              O Ecossistema Completo
            </Badge>
            <h2 className="text-4xl font-bold md:text-5xl">Comunidade Lendár[IA]</h2>
            <p className="mx-auto max-w-2xl font-serif text-xl text-muted-foreground">
              Treinamento Estruturado + Ferramentas Premium + Tribo de Executores.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: 'brain',
                title: 'Fluência em IA',
                desc: 'Fundamentos que 99% ignora. Entenda IA de verdade, sem tecniquês.',
              },
              {
                icon: 'layers',
                title: 'Segundo Cérebro',
                desc: 'Sistema de organização que libera sua mente. Chega de guardar tudo na cabeça.',
              },
              {
                icon: 'terminal',
                title: 'Engenharia de Prompt',
                desc: 'A diferença entre prompts genéricos e comandos que geram dinheiro.',
              },
              {
                icon: 'briefcase',
                title: 'Negócios com IA',
                desc: 'Estratégias de monetização e novos modelos de receita.',
              },
              {
                icon: 'code-simple',
                title: 'VibeCoding',
                desc: 'Crie aplicativos e automações sem saber uma linha de código.',
              },
              {
                icon: 'rocket',
                title: 'Prospecção & Vendas',
                desc: 'Automatize sua máquina de vendas e multiplique conversões.',
              },
              {
                icon: 'target',
                title: 'Zona de Genialidade',
                desc: 'Identifique sua área de maior impacto e escale seu talento.',
              },
              {
                icon: 'shield-check',
                title: 'Mente Lendária',
                desc: 'Mentalidade para era da IA. Navegue mudanças sem perder o rumo.',
              },
              {
                icon: 'users-alt',
                title: 'Clones IA Express',
                desc: 'Crie versões de você que trabalham 24/7. Escala sem burnout.',
              },
            ].map((mod, i) => (
              <Card key={i} className="group transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon name={mod.icon} size="size-6" />
                  </div>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                    {mod.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- TOOLS STACK (Value Anchor) --- */}
      <section className="border-y border-border bg-muted/10 px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-10 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ferramentas Premium Inclusas</h2>
            <p className="font-serif text-muted-foreground">
              Acesso ao nosso <strong>Super Chat</strong> com as 9 IAs mais poderosas do mundo.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              'GPT-5',
              'GPT-4o',
              'Claude 3.5',
              'Grok 3',
              'Gemini Pro',
              'Llama 3',
              'Mistral',
              'Perplexity',
              'R1',
            ].map((ai, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-xl border border-border bg-card p-4 text-sm font-bold shadow-sm"
              >
                {ai}
              </div>
            ))}
          </div>

          <div className="inline-block rotate-1 transform rounded-2xl border border-border bg-background p-6 shadow-lg transition-transform duration-300 hover:rotate-0">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Valor se contratado separado
            </p>
            <p className="text-4xl font-black text-foreground line-through decoration-destructive/30 decoration-4">
              R$ 8.400<span className="text-lg font-normal text-muted-foreground">/ano</span>
            </p>
            <p className="mt-2 text-xs font-bold text-primary">
              Você recebe incluso na assinatura.
            </p>
          </div>
        </div>
      </section>

      {/* --- PRICING & OFFER --- */}
      <section className="relative overflow-hidden px-4 py-24">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[100px]"></div>

        <div className="mx-auto max-w-4xl space-y-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Seu Investimento Hoje</h2>

          <Card className="relative overflow-hidden border-2 border-primary bg-card shadow-2xl">
            <div className="absolute top-0 h-2 w-full bg-gradient-to-r from-primary via-brand-yellow to-primary"></div>
            <CardContent className="space-y-8 p-10 md:p-16">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground line-through">
                  Valor de Referência: R$ 8.400/ano
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl font-black tracking-tighter text-foreground md:text-8xl">
                    12x R$ 98
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">ou R$ 1.176 à vista</p>
              </div>

              <Button
                size="lg"
                className="h-16 w-full max-w-md animate-pulse-slow text-xl font-bold uppercase tracking-wide shadow-xl shadow-primary/25"
              >
                Quero Entrar na Comunidade Lendária
              </Button>

              <div className="flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground md:flex-row">
                <span className="flex items-center gap-2">
                  <Icon name="check-circle" className="text-success" /> Acesso Imediato
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="shield-check" className="text-success" /> Garantia de 30 Dias
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="lock" className="text-success" /> Pagamento Seguro
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Guarantee */}
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 rounded-xl border border-border bg-muted/5 p-6 md:flex-row">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background text-3xl shadow-sm">
              🛡️
            </div>
            <div className="space-y-2 text-left">
              <h4 className="text-lg font-bold">Garantia Anti-Tédio de 30 Dias</h4>
              <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                Entre. Use. Aplique. Se em 30 dias você não sentir que valeu, pede o dinheiro de
                volta. 100%. Sem perguntas. Sem burocracia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ / OBJECTIONS --- */}
      <section className="bg-muted/10 px-4 py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <h2 className="text-center text-3xl font-bold">Perguntas Frequentes</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="1" className="rounded-lg border border-border bg-card px-4">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                R$ 98/mês é muito para testar?
              </AccordionTrigger>
              <AccordionContent className="font-serif text-muted-foreground">
                R$ 3 por dia. Menos que um café. Para acesso a 9 IAs premium (valor R$ 8.400/ano) +
                treinamento completo + comunidade. Além disso: garantia de 30 dias. Se não valer,
                pede o dinheiro de volta.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2" className="rounded-lg border border-border bg-card px-4">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Não tenho tempo.
              </AccordionTrigger>
              <AccordionContent className="font-serif text-muted-foreground">
                80% dos profissionais têm tempo sugado por tarefas repetitivas. O Segundo Cérebro
                foi criado para resolver exatamente isso. O sistema libera tempo — não consome.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3" className="rounded-lg border border-border bg-card px-4">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                IA é complexo para minha idade?
              </AccordionTrigger>
              <AccordionContent className="font-serif text-muted-foreground">
                95% dos membros não têm background técnico. Temos membros de 56 a 69 anos.
                Experiência + IA = vantagem, não desvantagem.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="4" className="rounded-lg border border-border bg-card px-4">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Posso aprender sozinho?
              </AccordionTrigger>
              <AccordionContent className="font-serif text-muted-foreground">
                Pode. Vai levar 3-5 anos. Sem sistema. Sem accountability. Ou pode acessar o que
                20.000+ alunos já validaram agora.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* --- STICKY FOOTER CTA (Mobile) --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 md:hidden">
        <Button className="w-full font-bold shadow-lg" size="lg">
          Quero Participar
        </Button>
      </div>
    </div>
  );
};

export default CommunitySalesTemplate;
