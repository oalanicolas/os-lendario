import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const CommunityVSLTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="flex min-h-screen animate-fade-in flex-col overflow-x-hidden bg-[#0a0a0a] font-sans text-white selection:bg-primary/30 selection:text-black">
      {/* --- HERO SECTION --- */}
      <section className="relative px-4 py-12 text-center md:py-20">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[150px]"></div>

        <div className="mx-auto max-w-5xl space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              80% Dos Profissionais Experientes Estão{' '}
              <span className="text-red-500">Perdendo Para Jovens de 25 Anos.</span>
            </h1>
            <h2 className="mx-auto max-w-3xl font-serif text-lg text-zinc-400 md:text-2xl">
              Assista e descubra por que sua experiência de 20 anos pode ser vantagem — ou
              irrelevância.
            </h2>
          </div>

          {/* Video Player Wrapper */}
          <div className="group relative mx-auto mt-8 aspect-video w-full max-w-4xl cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_50px_rgba(220,38,38,0.1)] ring-1 ring-white/5">
            {/* Play Button Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 pl-1 shadow-xl backdrop-blur-md transition-transform group-hover:scale-110">
                <Icon name="play" className="text-3xl text-white" type="solid" />
              </div>
            </div>

            {/* Thumbnail Image (Simulated) */}
            <div className="absolute relative inset-0 flex items-center justify-center overflow-hidden bg-zinc-900">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

              {/* Fake Chart Graphic */}
              <svg
                className="absolute bottom-0 left-0 h-1/2 w-full text-red-600 opacity-20"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 L20,5 L40,10 L60,15 L80,18 L100,20 L100,20 L0,20 Z"
                  fill="currentColor"
                />
              </svg>

              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-2xl md:text-6xl">
                  80% Estão <span className="text-red-500">Perdendo</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 font-serif text-sm italic text-zinc-500">
            <Icon name="info" size="size-3" /> 98% dos membros ficam nas primeiras 48 horas.
            Descubra o porquê.
          </div>
        </div>
      </section>

      {/* --- TIMESTAMPS --- */}
      <section className="border-y border-white/5 bg-zinc-900/50 py-12">
        <div className="mx-auto max-w-2xl px-4">
          <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-zinc-500">
            O que você vai descobrir
          </h3>
          <div className="space-y-4">
            {[
              {
                time: '00:00',
                text: 'O dado alarmante: 80% têm tempo sugado por tarefas que IA resolve em minutos',
              },
              {
                time: '03:00',
                text: "Por que 65% vivem no loop 'muitas ideias, pouca execução' — e como sair",
              },
              { time: '06:00', text: "O 'Segundo Cérebro' — sistema que libera sua mente" },
              { time: '09:00', text: 'Por que experiência é vantagem (se você souber usar)' },
              { time: '12:00', text: 'O caminho que 20.000+ alunos já fizeram' },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex cursor-pointer gap-4 rounded-lg p-3 transition-colors hover:bg-white/5"
              >
                <span className="font-mono text-sm font-bold text-primary transition-colors group-hover:text-white">
                  {item.time}
                </span>
                <p className="text-sm text-zinc-300 transition-colors group-hover:text-white">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DELAYED OFFER SECTION (Simulated Visible) --- */}
      <section
        className="relative animate-fade-in overflow-hidden px-4 py-20"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-[100px]"></div>

        <div className="mx-auto max-w-3xl space-y-12 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">Pronto para sair do loop?</h2>

            <Card className="group relative overflow-hidden border-primary/30 bg-zinc-900 shadow-2xl transition-colors hover:border-primary/50">
              <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <CardContent className="space-y-8 p-8 md:p-12">
                <div className="space-y-2">
                  <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                    Acesso Completo
                  </p>
                  <h3 className="text-4xl font-bold text-white">Comunidade Lendária</h3>
                </div>

                <Button
                  size="lg"
                  className="h-16 w-full animate-pulse-slow text-lg font-bold uppercase tracking-wide shadow-[0_0_20px_rgba(201,178,152,0.2)]"
                >
                  Quero Conhecer a Comunidade <Icon name="arrow-right" className="ml-2" />
                </Button>

                <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Icon name="shield-check" className="text-green-500" /> Garantia 30 dias
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="credit-card" className="text-primary" /> 12x R$98
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="microchip" className="text-blue-400" /> 9 IAs premium incluídas
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Authority */}
          <div className="flex flex-col items-center gap-8 rounded-2xl border border-white/5 bg-zinc-900/50 p-8 text-left md:flex-row">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={alanAvatar} />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">Quem é Alan Nicolas</h4>
              <p className="font-serif text-sm leading-relaxed text-zinc-400">
                R$200+ milhões faturados. 20.000+ alunos. 40+ países. 98% de retenção nas primeiras
                48 horas. Criador do "Segundo Cérebro com IA". Usa IA a cada 30 minutos como
                extensão do cérebro.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid gap-4 text-left md:grid-cols-3">
            {[
              { quote: 'Segundo cérebro foi fora de série.', author: 'KR' },
              {
                quote: 'Sensação de pertencimento absurdo. Como se tivesse encontrado minha tribo.',
                author: 'Lucas',
              },
              { quote: 'Entrei pra aprender IA, aprendi sobre mim.', author: 'Rodrigo' },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/5 bg-zinc-900/50 p-4 font-serif text-sm"
              >
                <p className="mb-2 italic text-zinc-300">"{t.quote}"</p>
                <p className="font-sans font-bold not-italic text-primary">— {t.author}</p>
              </div>
            ))}
          </div>

          <Button variant="link" className="text-zinc-500 hover:text-white">
            Quero Entrar
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CommunityVSLTemplate;
