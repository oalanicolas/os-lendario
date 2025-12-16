import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const VSLTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="min-h-screen bg-background font-sans animate-fade-in flex flex-col">
      
      {/* Top Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20 text-center py-2 px-4">
          <p className="text-xs font-bold text-destructive uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse"></span>
              Atenção: Este vídeo sairá do ar em breve.
          </p>
      </div>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12 space-y-12">
          
          {/* Header & Headline */}
          <div className="text-center space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  A <span className="text-destructive">Única Coisa</span> que te impede de escalar sua operação hoje.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
                  Assista a este vídeo curto para descobrir o método de 3 passos que gestores de elite estão usando para dobrar lucros sem contratar mais ninguém.
              </p>
          </div>

          {/* Video Player Wrapper */}
          <div className="relative aspect-video bg-black rounded-xl border border-zinc-800 shadow-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30 backdrop-blur-sm">
                      <Icon name="play" className="text-white text-3xl" type="solid" />
                  </div>
              </div>
              {/* Fake Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 z-20">
                  <div className="h-full bg-primary w-[0%] group-hover:w-[15%] transition-all duration-1000"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
                alt="Thumbnail"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-xs font-bold">
                  🔊 Ligue o som
              </div>
          </div>

          {/* Delayed CTA Section (Simulated visible for wireframe) */}
          <div className="space-y-8 pt-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl max-w-2xl mx-auto space-y-6">
                  <h3 className="text-2xl font-bold">Pronto para o próximo nível?</h3>
                  <Button size="lg" className="w-full md:w-auto h-16 text-lg px-12 uppercase tracking-wide shadow-xl shadow-primary/20 animate-pulse-slow">
                      Quero Acessar o Método Agora <Icon name="arrow-right" className="ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                      <Icon name="lock" size="size-3" /> Compra 100% Segura • Garantia de 30 Dias
                  </p>
              </div>

              {/* What you will discover */}
              <div className="max-w-2xl mx-auto text-left space-y-6 pt-8">
                  <h4 className="font-bold text-lg text-center uppercase tracking-widest text-muted-foreground mb-6">Neste vídeo você vai descobrir:</h4>
                  <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                          <span className="font-mono text-primary font-bold">01:45</span>
                          <p className="text-sm font-serif">O erro número 1 que 90% dos empresários cometem ao tentar delegar.</p>
                      </div>
                      <div className="flex gap-4 items-start">
                          <span className="font-mono text-primary font-bold">05:20</span>
                          <p className="text-sm font-serif">A "Matriz de Liberdade": como identificar o que automatizar primeiro.</p>
                      </div>
                      <div className="flex gap-4 items-start">
                          <span className="font-mono text-primary font-bold">12:10</span>
                          <p className="text-sm font-serif">O framework exato para contratar IA por 1/10 do custo de um humano.</p>
                      </div>
                  </div>
              </div>

              {/* Author Bio (Mini) */}
              <div className="flex items-center gap-6 max-w-xl mx-auto bg-card p-6 rounded-xl border border-border text-left mt-12">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarImage src={alanAvatar} />
                      <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Apresentado por</p>
                      <h5 className="font-bold text-lg">Alan Nicolas</h5>
                      <p className="text-sm text-muted-foreground font-serif">Fundador da Academia Lendária e mentor de +5.000 líderes.</p>
                  </div>
              </div>

              {/* Testimonials Ticker */}
              <div className="pt-8 border-t border-border mt-12">
                  <div className="flex flex-col md:flex-row gap-6 justify-center text-left">
                      <div className="bg-muted/10 p-4 rounded-lg text-sm font-serif max-w-xs">
                          <div className="flex text-brand-yellow mb-2"><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /></div>
                          "A melhor aula que já assisti sobre gestão. Direto ao ponto."
                          <p className="font-bold text-xs mt-2 not-italic font-sans">- Ricardo M.</p>
                      </div>
                      <div className="bg-muted/10 p-4 rounded-lg text-sm font-serif max-w-xs">
                          <div className="flex text-brand-yellow mb-2"><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /><Icon name="star" type="solid" size="size-3" /></div>
                          "Implementei a dica do minuto 8 e economizei 10h na semana."
                          <p className="font-bold text-xs mt-2 not-italic font-sans">- Sofia L.</p>
                      </div>
                  </div>
              </div>

          </div>

      </main>

      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border">
          <div className="flex justify-center gap-4 mb-4">
              <a href="#" className="hover:text-foreground">Termos de Uso</a>
              <a href="#" className="hover:text-foreground">Privacidade</a>
          </div>
          <p>© 2025 Academia Lendária. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
};

export default VSLTemplate;