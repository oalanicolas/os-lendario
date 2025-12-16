import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const CommunityVSLTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans animate-fade-in flex flex-col overflow-x-hidden selection:bg-primary/30 selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-12 px-4 md:py-20 text-center">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="max-w-5xl mx-auto space-y-8">
              
              {/* Headline */}
              <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                      80% Dos Profissionais Experientes Estão <span className="text-red-500">Perdendo Para Jovens de 25 Anos.</span>
                  </h1>
                  <h2 className="text-lg md:text-2xl text-zinc-400 font-serif max-w-3xl mx-auto">
                      Assista e descubra por que sua experiência de 20 anos pode ser vantagem — ou irrelevância.
                  </h2>
              </div>

              {/* Video Player Wrapper */}
              <div className="relative aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl border border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.1)] overflow-hidden group cursor-pointer ring-1 ring-white/5 mt-8">
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform border border-white/20 shadow-xl">
                          <Icon name="play" className="text-white text-3xl" type="solid" />
                      </div>
                  </div>
                  
                  {/* Thumbnail Image (Simulated) */}
                  <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80"></div>
                      
                      {/* Fake Chart Graphic */}
                      <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 text-red-600" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <path d="M0,0 L20,5 L40,10 L60,15 L80,18 L100,20 L100,20 L0,20 Z" fill="currentColor" />
                      </svg>

                      <div className="relative z-10 flex flex-col items-center">
                          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
                              80% Estão <span className="text-red-500">Perdendo</span>
                          </h3>
                      </div>
                  </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 font-serif italic">
                  <Icon name="info" size="size-3" /> 98% dos membros ficam nas primeiras 48 horas. Descubra o porquê.
              </div>
          </div>
      </section>

      {/* --- TIMESTAMPS --- */}
      <section className="py-12 bg-zinc-900/50 border-y border-white/5">
          <div className="max-w-2xl mx-auto px-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 text-center">O que você vai descobrir</h3>
              <div className="space-y-4">
                  {[
                      { time: "00:00", text: "O dado alarmante: 80% têm tempo sugado por tarefas que IA resolve em minutos" },
                      { time: "03:00", text: "Por que 65% vivem no loop 'muitas ideias, pouca execução' — e como sair" },
                      { time: "06:00", text: "O 'Segundo Cérebro' — sistema que libera sua mente" },
                      { time: "09:00", text: "Por que experiência é vantagem (se você souber usar)" },
                      { time: "12:00", text: "O caminho que 20.000+ alunos já fizeram" }
                  ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                          <span className="font-mono text-primary font-bold text-sm group-hover:text-white transition-colors">{item.time}</span>
                          <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">{item.text}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- DELAYED OFFER SECTION (Simulated Visible) --- */}
      <section className="py-20 px-4 animate-fade-in relative overflow-hidden" style={{ animationDelay: '0.5s' }}>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

          <div className="max-w-3xl mx-auto text-center space-y-12">
              <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Pronto para sair do loop?</h2>
                  
                  <Card className="bg-zinc-900 border-primary/30 shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                      <CardContent className="p-8 md:p-12 space-y-8">
                          <div className="space-y-2">
                              <p className="text-sm text-zinc-400 uppercase tracking-wider font-bold">Acesso Completo</p>
                              <h3 className="text-4xl font-bold text-white">Comunidade Lendária</h3>
                          </div>
                          
                          <Button size="lg" className="w-full h-16 text-lg font-bold uppercase tracking-wide shadow-[0_0_20px_rgba(201,178,152,0.2)] animate-pulse-slow">
                              Quero Conhecer a Comunidade <Icon name="arrow-right" className="ml-2" />
                          </Button>

                          <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-400 font-medium">
                              <span className="flex items-center gap-1"><Icon name="shield-check" className="text-green-500" /> Garantia 30 dias</span>
                              <span className="flex items-center gap-1"><Icon name="credit-card" className="text-primary" /> 12x R$98</span>
                              <span className="flex items-center gap-1"><Icon name="microchip" className="text-blue-400" /> 9 IAs premium incluídas</span>
                          </div>
                      </CardContent>
                  </Card>
              </div>

              {/* Authority */}
              <div className="text-left bg-zinc-900/50 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
                  <Avatar className="w-24 h-24 border-2 border-primary">
                      <AvatarImage src={alanAvatar} />
                      <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white">Quem é Alan Nicolas</h4>
                      <p className="text-sm text-zinc-400 font-serif leading-relaxed">
                          R$200+ milhões faturados. 20.000+ alunos. 40+ países. 98% de retenção nas primeiras 48 horas.
                          Criador do "Segundo Cérebro com IA". Usa IA a cada 30 minutos como extensão do cérebro.
                      </p>
                  </div>
              </div>

              {/* Testimonials */}
              <div className="grid md:grid-cols-3 gap-4 text-left">
                  {[
                      { quote: "Segundo cérebro foi fora de série.", author: "KR" },
                      { quote: "Sensação de pertencimento absurdo. Como se tivesse encontrado minha tribo.", author: "Lucas" },
                      { quote: "Entrei pra aprender IA, aprendi sobre mim.", author: "Rodrigo" },
                  ].map((t, i) => (
                      <div key={i} className="bg-zinc-900/50 p-4 rounded-lg border border-white/5 text-sm font-serif">
                          <p className="text-zinc-300 italic mb-2">"{t.quote}"</p>
                          <p className="text-primary font-bold font-sans not-italic">— {t.author}</p>
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