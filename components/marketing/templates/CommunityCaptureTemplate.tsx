import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const CommunityCaptureTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="flex min-h-screen animate-fade-in flex-col overflow-x-hidden bg-background font-sans">
      {/* Background Decor */}
      <div className="pointer-events-none fixed right-[-10%] top-[-20%] z-0 h-[50vw] w-[50vw] rounded-full bg-primary/5 blur-[120px]"></div>

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-2">
          <Symbol name="infinity" className="text-2xl text-primary" />
          <span className="font-sans text-lg font-bold tracking-tight">Academia Lendár[IA]</span>
        </div>
        <span className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:block">
          Material Gratuito
        </span>
      </header>

      {/* Main Content Split */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-4 py-8 md:px-8 lg:flex-row lg:gap-24 lg:py-16">
        {/* Left: Copy & Benefits */}
        <div className="order-2 flex-1 space-y-10 lg:order-1">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="mb-2 border-primary/50 bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary"
            >
              Guia Oficial 2025
            </Badge>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              O Framework <span className="text-primary">"Segundo Cérebro"</span> Que Libera
              Profissionais Experientes Das Tarefas Que Sugam Seu Tempo
            </h1>

            <p className="max-w-xl border-l-4 border-primary pl-4 font-serif text-xl leading-relaxed text-muted-foreground">
              Guia gratuito com o sistema que resolve o problema que 80% dos profissionais
              enfrentam: saber muito, mas executar pouco.
            </p>
          </div>

          {/* Creator Note */}
          <div className="rounded-xl border border-border/50 bg-muted/10 p-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <Icon name="comment-quote" /> Por que estou dando isso de graça?
            </h4>
            <p className="mb-4 font-serif text-sm leading-relaxed text-foreground/90">
              Depois de formar 20.000+ alunos em 40+ países, percebi que profissionais experientes
              travam no básico: não sabem como usar IA de forma prática para o que realmente
              importa.
            </p>
            <p className="mb-4 font-serif text-sm leading-relaxed text-foreground/90">
              Este guia resolve isso. Se fizer sentido, você vai querer ir mais fundo. Se não fizer,
              pelo menos sai com clareza. Funciona para nós dois.
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-primary/30">
                <AvatarImage src={alanAvatar} />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <p className="font-bold text-foreground">Alan Nicolas</p>
                <p className="text-muted-foreground">Fundador</p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-6 pt-4">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              O que você vai descobrir:
            </h4>
            <div className="space-y-4">
              {[
                'Por que 80% dos profissionais têm tempo sugado por tarefas repetitivas — e o sistema de 3 camadas que inverte isso.',
                "O framework 'Segundo Cérebro' que libera sua mente para que você pare de ser o profissional que 'sabe muito mas não executa'.",
                "Por que 65% vivem no loop 'muitas ideias, pouca execução' — e como sair disso usando IA como extensão do cérebro.",
                'O erro que 60% cometem que transforma IA em mais uma distração em vez de ferramenta de resultado.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name="check" size="size-3" />
                  </div>
                  <p className="text-sm font-medium leading-snug text-muted-foreground">{item}</p>
                </div>
              ))}
              {/* Bonus Item */}
              <div className="flex items-start gap-4 rounded-lg border border-brand-yellow/20 bg-brand-yellow/10 p-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-black">
                  <Icon name="star" type="solid" size="size-3" />
                </div>
                <p className="text-sm font-bold leading-snug text-foreground">
                  BÔNUS: Checklist para identificar sua "Zona de Genialidade" — onde sua experiência
                  encontra demanda real.
                </p>
              </div>
            </div>
          </div>

          {/* Who Is It For */}
          <div className="grid gap-6 pt-6 md:grid-cols-2">
            <div>
              <h5 className="mb-3 flex items-center gap-2 font-bold text-brand-green">
                <Icon name="check-circle" /> PARA QUEM É
              </h5>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Profissionais 35-55 anos com experiência.</li>
                <li>• Quem sente que opera abaixo do potencial.</li>
                <li>• Quem quer construir algo próprio.</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 flex items-center gap-2 font-bold text-destructive">
                <Icon name="cross-circle" /> PARA QUEM NÃO É
              </h5>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Quem busca fórmula mágica.</li>
                <li>• Quem acha que IA é modinha passageira.</li>
                <li>• Quem não está disposto a aplicar.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Book Mockup & Form */}
        <div className="order-1 flex w-full max-w-md flex-1 flex-col items-center lg:order-2">
          {/* CSS 3D Book */}
          <div className="perspective-1000 group relative mb-10 hidden h-[340px] w-[240px] transition-transform duration-500 hover:scale-105 md:block">
            <div className="rotate-y-[-20deg] rotate-x-[10deg] backface-hidden absolute z-20 flex h-full w-full transform flex-col items-center justify-center rounded-r-lg border-2 border-primary bg-zinc-900 p-6 text-center shadow-[20px_20px_60px_rgba(0,0,0,0.5)]">
              <div className="absolute right-4 top-4">
                <Symbol name="infinity" className="text-2xl text-primary" />
              </div>
              <h3 className="mb-2 font-sans text-3xl font-bold uppercase leading-none tracking-widest text-white">
                Segundo
                <br />
                <span className="text-primary">Cérebro</span>
              </h3>
              <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-white/50">
                Framework Oficial
              </p>
              <div className="mb-8 h-1 w-16 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <p className="font-serif text-[10px] text-white/40">Edição Limitada • 2025</p>
            </div>
            {/* Book Spine/Pages Effect */}
            <div className="rotate-y-[-110deg] rotate-x-[10deg] absolute left-[-15px] top-[3px] z-10 h-[334px] w-[20px] transform rounded-l-sm bg-primary"></div>
            <div className="translate-z-[-5px] rotate-y-[-20deg] rotate-x-[10deg] absolute left-[10px] top-[8px] z-0 h-[325px] w-[230px] transform rounded-r-lg bg-white shadow-inner"></div>
          </div>

          {/* The Form Card */}
          <Card className="relative w-full overflow-hidden border-2 border-primary bg-card shadow-2xl">
            <div className="absolute top-0 h-1.5 w-full animate-shimmer bg-gradient-to-r from-primary via-brand-yellow to-primary bg-[length:200%_100%]"></div>
            <CardHeader className="pb-2 text-center">
              <h3 className="text-2xl font-bold">Baixe o Guia Gratuito</h3>
              <p className="text-sm text-muted-foreground">Preencha para receber no seu email.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="name">Seu nome</Label>
                  <Input id="name" placeholder="Nome completo" className="h-11 bg-muted/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Melhor email</Label>
                  <div className="relative">
                    <Icon
                      name="envelope"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
                      size="size-4"
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="h-11 bg-muted/20 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
                  <div className="relative">
                    <Icon
                      name="whatsapp"
                      type="brands"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
                      size="size-4"
                    />
                    <Input
                      id="whatsapp"
                      placeholder="(XX) 9XXXX-XXXX"
                      className="h-11 bg-muted/20 pl-10"
                    />
                  </div>
                </div>
                <Button className="h-14 w-full text-base font-bold uppercase tracking-wide shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]">
                  Quero o Guia Gratuito <Icon name="arrow-right" className="ml-2" />
                </Button>
              </form>

              <div className="space-y-2 pt-2 text-center">
                <p className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                  <Icon name="lock" size="size-3" /> Seus dados estão 100% seguros. Zero Spam.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Social Proof Footer */}
      <footer className="relative z-10 mt-auto border-t border-border bg-muted/30 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-4 text-center md:flex-row md:gap-16">
          <div>
            <p className="font-sans text-3xl font-bold text-foreground">20.000+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Profissionais Formados
            </p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block"></div>
          <div>
            <p className="font-sans text-3xl font-bold text-foreground">40+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Países
            </p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block"></div>
          <div>
            <p className="font-sans text-3xl font-bold text-foreground text-primary">98%</p>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Retenção nas primeiras 48h
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-[10px] text-muted-foreground opacity-60">
          © 2025 The Legends & Co. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default CommunityCaptureTemplate;
