import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const VSLTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans">
      {/* Top Banner */}
      <div className="border-b border-destructive/20 bg-destructive/10 px-4 py-2 text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-destructive">
          <span className="h-2 w-2 animate-pulse rounded-full bg-destructive"></span>
          Atenção: Este vídeo sairá do ar em breve.
        </p>
      </div>

      <main className="container mx-auto max-w-4xl flex-1 space-y-12 px-4 py-12">
        {/* Header & Headline */}
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            A <span className="text-destructive">Única Coisa</span> que te impede de escalar sua
            operação hoje.
          </h1>
          <p className="mx-auto max-w-2xl font-serif text-lg text-muted-foreground md:text-xl">
            Assista a este vídeo curto para descobrir o método de 3 passos que gestores de elite
            estão usando para dobrar lucros sem contratar mais ninguém.
          </p>
        </div>

        {/* Video Player Wrapper */}
        <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-2xl">
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 pl-1 shadow-lg shadow-primary/30 backdrop-blur-sm transition-transform group-hover:scale-110">
              <Icon name="play" className="text-3xl text-white" type="solid" />
            </div>
          </div>
          {/* Fake Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-zinc-800">
            <div className="h-full w-[0%] bg-primary transition-all duration-1000 group-hover:w-[15%]"></div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            className="h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
            alt="Thumbnail"
          />
          <div className="absolute right-4 top-4 rounded bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur">
            🔊 Ligue o som
          </div>
        </div>

        {/* Delayed CTA Section (Simulated visible for wireframe) */}
        <div
          className="animate-fade-in space-y-8 pt-8 text-center"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="mx-auto max-w-2xl space-y-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="text-2xl font-bold">Pronto para o próximo nível?</h3>
            <Button
              size="lg"
              className="h-16 w-full animate-pulse-slow px-12 text-lg uppercase tracking-wide shadow-xl shadow-primary/20 md:w-auto"
            >
              Quero Acessar o Método Agora <Icon name="arrow-right" className="ml-2" />
            </Button>
            <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Icon name="lock" size="size-3" /> Compra 100% Segura • Garantia de 30 Dias
            </p>
          </div>

          {/* What you will discover */}
          <div className="mx-auto max-w-2xl space-y-6 pt-8 text-left">
            <h4 className="mb-6 text-center text-lg font-bold uppercase tracking-widest text-muted-foreground">
              Neste vídeo você vai descobrir:
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="font-mono font-bold text-primary">01:45</span>
                <p className="font-serif text-sm">
                  O erro número 1 que 90% dos empresários cometem ao tentar delegar.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono font-bold text-primary">05:20</span>
                <p className="font-serif text-sm">
                  A "Matriz de Liberdade": como identificar o que automatizar primeiro.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono font-bold text-primary">12:10</span>
                <p className="font-serif text-sm">
                  O framework exato para contratar IA por 1/10 do custo de um humano.
                </p>
              </div>
            </div>
          </div>

          {/* Author Bio (Mini) */}
          <div className="mx-auto mt-12 flex max-w-xl items-center gap-6 rounded-xl border border-border bg-card p-6 text-left">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={alanAvatar} />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                Apresentado por
              </p>
              <h5 className="text-lg font-bold">Alan Nicolas</h5>
              <p className="font-serif text-sm text-muted-foreground">
                Fundador da Academia Lendária e mentor de +5.000 líderes.
              </p>
            </div>
          </div>

          {/* Testimonials Ticker */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-col justify-center gap-6 text-left md:flex-row">
              <div className="max-w-xs rounded-lg bg-muted/10 p-4 font-serif text-sm">
                <div className="mb-2 flex text-brand-yellow">
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                </div>
                "A melhor aula que já assisti sobre gestão. Direto ao ponto."
                <p className="mt-2 font-sans text-xs font-bold not-italic">- Ricardo M.</p>
              </div>
              <div className="max-w-xs rounded-lg bg-muted/10 p-4 font-serif text-sm">
                <div className="mb-2 flex text-brand-yellow">
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                  <Icon name="star" type="solid" size="size-3" />
                </div>
                "Implementei a dica do minuto 8 e economizei 10h na semana."
                <p className="mt-2 font-sans text-xs font-bold not-italic">- Sofia L.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <div className="mb-4 flex justify-center gap-4">
          <a href="#" className="hover:text-foreground">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-foreground">
            Privacidade
          </a>
        </div>
        <p>© 2025 Academia Lendária. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default VSLTemplate;
