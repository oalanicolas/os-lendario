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
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="min-h-screen bg-background font-sans animate-fade-in flex flex-col overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="p-6 md:p-8 flex justify-between items-center relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
              <Symbol name="infinity" className="text-primary text-2xl" />
              <span className="font-sans font-bold text-lg tracking-tight">Academia Lendár[IA]</span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">Material Gratuito</span>
      </header>

      {/* Main Content Split */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 md:px-8 py-8 lg:py-16 gap-16 lg:gap-24 relative z-10">
          
          {/* Left: Copy & Benefits */}
          <div className="flex-1 space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                  <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 uppercase tracking-widest text-xs px-3 py-1 mb-2">
                      Guia Oficial 2025
                  </Badge>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                      O Framework <span className="text-primary">"Segundo Cérebro"</span> Que Libera Profissionais Experientes Das Tarefas Que Sugam Seu Tempo
                  </h1>
                  
                  <p className="font-serif text-xl text-muted-foreground leading-relaxed max-w-xl border-l-4 border-primary pl-4">
                      Guia gratuito com o sistema que resolve o problema que 80% dos profissionais enfrentam: saber muito, mas executar pouco.
                  </p>
              </div>

              {/* Creator Note */}
              <div className="bg-muted/10 p-6 rounded-xl border border-border/50">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <Icon name="comment-quote" /> Por que estou dando isso de graça?
                  </h4>
                  <p className="text-sm font-serif text-foreground/90 leading-relaxed mb-4">
                      Depois de formar 20.000+ alunos em 40+ países, percebi que profissionais experientes travam no básico: não sabem como usar IA de forma prática para o que realmente importa.
                  </p>
                  <p className="text-sm font-serif text-foreground/90 leading-relaxed mb-4">
                      Este guia resolve isso. Se fizer sentido, você vai querer ir mais fundo. Se não fizer, pelo menos sai com clareza. Funciona para nós dois.
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
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">O que você vai descobrir:</h4>
                  <div className="space-y-4">
                      {[
                          "Por que 80% dos profissionais têm tempo sugado por tarefas repetitivas — e o sistema de 3 camadas que inverte isso.",
                          "O framework 'Segundo Cérebro' que libera sua mente para que você pare de ser o profissional que 'sabe muito mas não executa'.",
                          "Por que 65% vivem no loop 'muitas ideias, pouca execução' — e como sair disso usando IA como extensão do cérebro.",
                          "O erro que 60% cometem que transforma IA em mais uma distração em vez de ferramenta de resultado."
                      ].map((item, i) => (
                          <div key={i} className="flex items-start gap-4">
                              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5 shrink-0">
                                  <Icon name="check" size="size-3" />
                              </div>
                              <p className="text-sm text-muted-foreground font-medium leading-snug">{item}</p>
                          </div>
                      ))}
                      {/* Bonus Item */}
                      <div className="flex items-start gap-4 bg-brand-yellow/10 p-3 rounded-lg border border-brand-yellow/20">
                          <div className="w-6 h-6 rounded-full bg-brand-yellow text-black flex items-center justify-center mt-0.5 shrink-0">
                              <Icon name="star" type="solid" size="size-3" />
                          </div>
                          <p className="text-sm text-foreground font-bold leading-snug">
                              BÔNUS: Checklist para identificar sua "Zona de Genialidade" — onde sua experiência encontra demanda real.
                          </p>
                      </div>
                  </div>
              </div>

              {/* Who Is It For */}
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                  <div>
                      <h5 className="font-bold text-brand-green mb-3 flex items-center gap-2"><Icon name="check-circle" /> PARA QUEM É</h5>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                          <li>• Profissionais 35-55 anos com experiência.</li>
                          <li>• Quem sente que opera abaixo do potencial.</li>
                          <li>• Quem quer construir algo próprio.</li>
                      </ul>
                  </div>
                  <div>
                      <h5 className="font-bold text-destructive mb-3 flex items-center gap-2"><Icon name="cross-circle" /> PARA QUEM NÃO É</h5>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                          <li>• Quem busca fórmula mágica.</li>
                          <li>• Quem acha que IA é modinha passageira.</li>
                          <li>• Quem não está disposto a aplicar.</li>
                      </ul>
                  </div>
              </div>
          </div>

          {/* Right: Book Mockup & Form */}
          <div className="flex-1 w-full max-w-md order-1 lg:order-2 flex flex-col items-center">
              
              {/* CSS 3D Book */}
              <div className="perspective-1000 mb-10 w-[240px] h-[340px] relative group hover:scale-105 transition-transform duration-500 hidden md:block">
                  <div className="absolute w-full h-full bg-zinc-900 border-2 border-primary rounded-r-lg shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transform rotate-y-[-20deg] rotate-x-[10deg] flex flex-col items-center justify-center text-center p-6 z-20 backface-hidden">
                      <div className="absolute top-4 right-4"><Symbol name="infinity" className="text-primary text-2xl" /></div>
                      <h3 className="text-3xl font-bold text-white font-sans uppercase tracking-widest leading-none mb-2">Segundo<br/><span className="text-primary">Cérebro</span></h3>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8">Framework Oficial</p>
                      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-8"></div>
                      <p className="text-white/40 text-[10px] font-serif">Edição Limitada • 2025</p>
                  </div>
                  {/* Book Spine/Pages Effect */}
                  <div className="absolute top-[3px] left-[-15px] w-[20px] h-[334px] bg-primary transform rotate-y-[-110deg] rotate-x-[10deg] z-10 rounded-l-sm"></div>
                  <div className="absolute top-[8px] left-[10px] w-[230px] h-[325px] bg-white transform translate-z-[-5px] rotate-y-[-20deg] rotate-x-[10deg] rounded-r-lg z-0 shadow-inner"></div>
              </div>

              {/* The Form Card */}
              <Card className="w-full relative overflow-hidden border-2 border-primary shadow-2xl bg-card">
                  <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-primary via-brand-yellow to-primary animate-shimmer bg-[length:200%_100%]"></div>
                  <CardHeader className="text-center pb-2">
                      <h3 className="font-bold text-2xl">Baixe o Guia Gratuito</h3>
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
                                  <Icon name="envelope" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size="size-4" />
                                  <Input id="email" type="email" placeholder="seu@email.com" className="h-11 pl-10 bg-muted/20" />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
                              <div className="relative">
                                  <Icon name="whatsapp" type="brands" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size="size-4" />
                                  <Input id="whatsapp" placeholder="(XX) 9XXXX-XXXX" className="h-11 pl-10 bg-muted/20" />
                              </div>
                          </div>
                          <Button className="w-full h-14 text-base font-bold uppercase tracking-wide shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform">
                              Quero o Guia Gratuito <Icon name="arrow-right" className="ml-2" />
                          </Button>
                      </form>
                      
                      <div className="text-center space-y-2 pt-2">
                          <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                              <Icon name="lock" size="size-3" /> Seus dados estão 100% seguros. Zero Spam.
                          </p>
                      </div>
                  </CardContent>
              </Card>
          </div>

      </main>

      {/* Social Proof Footer */}
      <footer className="bg-muted/30 border-t border-border py-8 mt-auto relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
              <div>
                  <p className="text-3xl font-bold font-sans text-foreground">20.000+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Profissionais Formados</p>
              </div>
              <div className="hidden md:block w-px h-8 bg-border"></div>
              <div>
                  <p className="text-3xl font-bold font-sans text-foreground">40+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Países</p>
              </div>
              <div className="hidden md:block w-px h-8 bg-border"></div>
              <div>
                  <p className="text-3xl font-bold font-sans text-foreground text-primary">98%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Retenção nas primeiras 48h</p>
              </div>
          </div>
          <div className="text-center mt-8 text-[10px] text-muted-foreground opacity-60">
              © 2025 The Legends & Co. Todos os direitos reservados.
          </div>
      </footer>

    </div>
  );
};

export default CommunityCaptureTemplate;