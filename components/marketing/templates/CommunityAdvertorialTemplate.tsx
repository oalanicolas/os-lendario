
import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Symbol } from '../../ui/symbol';

const CommunityAdvertorialTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="w-full bg-background animate-fade-in pb-20 font-serif selection:bg-primary/30">
      
      {/* Top Bar (Fake News Site - "The Legendary Post") */}
      <div className="border-b border-border py-4 mb-12 bg-card sticky top-0 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                  <Icon name="menu-burger" className="text-muted-foreground cursor-pointer" />
                  <span className="font-serif font-bold text-xl md:text-2xl tracking-tighter italic flex items-center gap-2">
                      <Symbol name="infinity" className="text-primary" />
                      The <span className="text-primary">Legendary</span> Post
                  </span>
              </div>
              <div className="hidden md:flex gap-6 text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="text-foreground border-b-2 border-primary pb-4 -mb-4">Carreira</span>
                  <span className="hover:text-foreground cursor-pointer">Tecnologia</span>
                  <span className="hover:text-foreground cursor-pointer">Liderança</span>
              </div>
              <div className="flex items-center gap-4">
                  <Button size="sm" variant="ghost" className="h-8 w-8"><Icon name="search" /></Button>
                  <Button size="sm" className="hidden sm:flex h-8 text-xs font-sans uppercase font-bold tracking-wider">Inscrever-se</Button>
              </div>
          </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <main className="lg:col-span-8">
              {/* Article Header */}
              <header className="space-y-6 mb-8">
                  <div className="flex gap-2 items-center">
                      <Badge variant="warning" className="uppercase tracking-widest text-[10px] rounded-sm bg-brand-orange/10 text-brand-orange border-brand-orange/20">Carreira</Badge>
                      <span className="text-xs font-sans font-bold text-muted-foreground uppercase tracking-widest">Dezembro 2025 • 7 min de leitura</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
                      80% Dos Profissionais Experientes Estão Perdendo Horas Por Dia Em Tarefas Que IA Resolve Em Minutos
                  </h1>
                  
                  <h2 className="text-lg md:text-xl text-muted-foreground font-sans font-light leading-relaxed border-l-4 border-primary pl-6 italic">
                      Uma pesquisa com 150+ profissionais revelou por que décadas de experiência estão sendo desperdiçadas — e o sistema de 3 camadas que inverte isso.
                  </h2>
                  
                  <div className="flex items-center justify-between py-6 border-y border-border/50 mt-8">
                      <div className="flex items-center gap-3">
                          <Avatar>
                              <AvatarImage src={alanAvatar} />
                              <AvatarFallback>AN</AvatarFallback>
                          </Avatar>
                          <div className="text-left font-sans">
                              <p className="text-sm font-bold text-foreground">Por Redação Lendária</p>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Especial Carreira 4.0</p>
                          </div>
                      </div>
                      <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full bg-muted/20 hover:bg-brand-blue/10 hover:text-brand-blue"><Icon name="linkedin" type="brands" /></Button>
                          <Button variant="ghost" size="icon" className="rounded-full bg-muted/20 hover:bg-brand-green/10 hover:text-brand-green"><Icon name="whatsapp" type="brands" /></Button>
                      </div>
                  </div>
              </header>

              {/* Main Image */}
              <figure className="mb-12">
                  <div className="aspect-video w-full bg-muted rounded-md overflow-hidden relative shadow-lg group">
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1504384308090-c54be3852f9d?q=80&w=2070&auto=format&fit=crop" 
                        alt="Profissional sobrecarregado" 
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                      />
                  </div>
                  <figcaption className="text-xs text-muted-foreground mt-2 font-sans italic flex items-center gap-2 justify-center">
                      <Icon name="camera" size="size-3" /> O paradoxo da produtividade: mais ferramentas, menos tempo. (Foto: Unsplash)
                  </figcaption>
              </figure>

              {/* Body Content - KEEP FONT-SERIF */}
              <article className="prose dark:prose-invert prose-lg max-w-none font-serif text-foreground/90 leading-loose">
                  <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                      Você construiu 15, 20, talvez 25 anos de carreira. Formação sólida. Experiência real. Resultados comprovados.
                  </p>
                  
                  <p>
                      E mesmo assim, acorda todo dia com a sensação de que está operando em 30% do seu potencial. <strong>Você não está imaginando coisas.</strong>
                  </p>

                  {/* STATS SECTION */}
                  <div className="my-12">
                      <h3 className="font-sans font-bold text-2xl mb-6 flex items-center gap-2 uppercase tracking-wide">
                          <span className="w-1 h-6 bg-destructive block"></span> Os números que ninguém quer admitir
                      </h3>
                      <div className="bg-muted/10 border border-border rounded-xl p-8 space-y-6">
                          <p className="font-sans text-sm text-muted-foreground mb-4">
                              Uma pesquisa com 150+ profissionais em transição revelou o que todos sentem mas poucos falam:
                          </p>
                          <div className="grid sm:grid-cols-2 gap-6">
                              <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                                  <div className="text-4xl font-bold text-destructive mb-1">80%</div>
                                  <p className="text-sm font-sans leading-snug">têm seu tempo sugado por tarefas repetitivas que não geram resultado.</p>
                              </div>
                              <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                                  <div className="text-4xl font-bold text-destructive mb-1">65%</div>
                                  <p className="text-sm font-sans leading-snug">vivem no loop de "muitas ideias, pouca execução".</p>
                              </div>
                              <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                                  <div className="text-4xl font-bold text-destructive mb-1">60%</div>
                                  <p className="text-sm font-sans leading-snug">estão em burnout declarado ou em desenvolvimento.</p>
                              </div>
                              <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                                  <div className="text-4xl font-bold text-destructive mb-1">55%</div>
                                  <p className="text-sm font-sans leading-snug">têm renda estagnada há anos.</p>
                              </div>
                          </div>
                          <p className="text-base italic border-l-2 border-primary pl-4 mt-6">
                              A média de idade? <strong>40 anos.</strong> Profissionais no auge da capacidade intelectual. Desperdiçando energia em operacional enquanto jovens de 25 anos usam IA para entregar em 2 horas o que você leva 2 dias.
                          </p>
                      </div>
                  </div>

                  <h3 className="font-sans font-bold text-2xl mt-12 mb-6">O Inimigo tem Nome</h3>
                  
                  <p>
                      Não é falta de inteligência. Você provou sua competência milhares de vezes. Não é falta de informação. Você consome mais conteúdo em uma semana do que seus pais em uma década.
                  </p>
                  
                  <p>
                      <strong>O inimigo é o sistema de incentivos do mercado digital.</strong>
                  </p>

                  <p>
                      Cada guru vende novidade, não resultado. Cada ferramenta promete revolução, entrega distração. Cada "método" te puxa para uma direção diferente. O resultado? Energia diluída. Projetos inacabados. Ciclo de entusiasmo-frustração. E a sensação corrosiva de que talvez o problema seja você.
                  </p>

                  <p className="text-xl font-bold text-primary text-center my-8">Não é.</p>

                  {/* SOLUTION SECTION */}
                  <h3 className="font-sans font-bold text-2xl mt-12 mb-6 uppercase tracking-wide">
                      O que profissionais que saíram do loop têm em comum
                  </h3>

                  <p>
                      Alan Nicolas — R$200+ milhões faturados, 20.000+ alunos em 40+ países — identificou um padrão depois de anos formando profissionais experientes. Quem consegue transformar experiência em vantagem competitiva com IA tem 3 coisas:
                  </p>

                  <div className="grid gap-6 my-8 not-prose">
                      <Card className="border-l-4 border-l-primary bg-card">
                          <CardContent className="p-6">
                              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                  <Icon name="brain" className="text-primary" /> 1. Sistema único de organização mental
                              </h4>
                              <p className="text-sm text-muted-foreground font-sans font-medium">Não 47 apps. Um "Segundo Cérebro" que libera a mente para o que importa.</p>
                          </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-primary bg-card">
                          <CardContent className="p-6">
                              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                  <Icon name="target" className="text-primary" /> 2. Foco radical em uma direção
                              </h4>
                              <p className="text-sm text-muted-foreground font-sans font-medium">Não 5 projetos simultâneos. Uma oferta clara que une experiência com demanda real.</p>
                          </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-primary bg-card">
                          <CardContent className="p-6">
                              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                  <Icon name="users-alt" className="text-primary" /> 3. Comunidade de accountability
                              </h4>
                              <p className="text-sm text-muted-foreground font-sans font-medium">Não isolamento heroico. Pares que cobram execução, não aplaudem procrastinação.</p>
                          </CardContent>
                      </Card>
                  </div>

                  {/* TESTIMONIALS GRID */}
                  <div className="bg-muted/10 p-8 rounded-xl my-12 border border-border/50">
                      <h3 className="font-sans font-bold text-xl text-center mb-8">O que dizem os que aplicaram</h3>
                      <div className="grid md:grid-cols-2 gap-4 not-prose">
                          {[
                              { text: "Segundo cérebro foi fora de série.", author: "KR" },
                              { text: "Sensação de pertencimento absurdo. Como se tivesse encontrado minha tribo.", author: "Lucas" },
                              { text: "Entrei pra aprender IA, aprendi sobre mim.", author: "Rodrigo" },
                              { text: "Entregam muito mais do que prometem.", author: "Cristina" },
                              { text: "PS destrava o que você está travado.", author: "Raphael" }
                          ].map((item, i) => (
                              <div key={i} className="bg-background p-4 rounded-lg border border-border shadow-sm text-sm font-serif">
                                  <p className="italic text-muted-foreground mb-2">"{item.text}"</p>
                                  <p className="font-bold text-foreground font-sans">— {item.author}</p>
                              </div>
                          ))}
                      </div>
                  </div>

                  <h3 className="font-sans font-bold text-2xl mt-12 mb-6">A pergunta que separa quem executa de quem só consome</h3>

                  <p>
                      Se profissionais como KR, Lucas, Rodrigo, Cristina e Raphael — pessoas com décadas de experiência que já tinham tentado de tudo — encontraram transformação real...
                  </p>
                  <p>
                      Se a taxa de retenção nas primeiras 48 horas é de <strong>98%</strong>...
                  </p>
                  <p>
                      Se 20.000+ alunos em 40+ países já passaram pelo sistema...
                  </p>
                  <p className="text-lg font-bold">O que falta para você?</p>
                  <p>Não é mais informação. É o sistema certo.</p>

                  {/* CHECKLIST */}
                  <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
                      <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-6">
                          <h4 className="font-bold text-brand-green mb-4 flex items-center gap-2"><Icon name="check-circle" /> Para quem funciona</h4>
                          <ul className="space-y-3 text-sm">
                              <li className="flex gap-2"><Icon name="check" className="text-brand-green shrink-0" /> Profissionais 35-55 anos com experiência real acumulada</li>
                              <li className="flex gap-2"><Icon name="check" className="text-brand-green shrink-0" /> Quem já tentou de tudo e sabe que o problema não é falta de conhecimento</li>
                              <li className="flex gap-2"><Icon name="check" className="text-brand-green shrink-0" /> Quem quer construir algo próprio antes que seja tarde demais</li>
                              <li className="flex gap-2"><Icon name="check" className="text-brand-green shrink-0" /> Quem busca comunidade de iguais, não mais um guru</li>
                          </ul>
                      </div>
                      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                          <h4 className="font-bold text-destructive mb-4 flex items-center gap-2"><Icon name="cross-circle" /> Não funciona para</h4>
                          <ul className="space-y-3 text-sm">
                              <li className="flex gap-2"><Icon name="cross" className="text-destructive shrink-0" /> Quem busca fórmula mágica sem implementação</li>
                              <li className="flex gap-2"><Icon name="cross" className="text-destructive shrink-0" /> Quem quer que façam por ele</li>
                              <li className="flex gap-2"><Icon name="cross" className="text-destructive shrink-0" /> Quem ainda acha que IA é modinha</li>
                          </ul>
                      </div>
                  </div>

                  {/* FINAL OFFER */}
                  <Card className="my-12 border-primary shadow-2xl relative overflow-hidden not-prose">
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-brand-yellow to-primary"></div>
                      <CardContent className="p-8 md:p-12 text-center">
                          <h3 className="text-3xl font-bold font-sans mb-4">O Próximo Passo</h3>
                          <p className="text-muted-foreground font-sans font-medium mb-8 max-w-xl mx-auto">
                              Alan Nicolas abriu vagas para a <strong>Comunidade Lendár[IA]</strong> — o ecossistema completo de treinamento + ferramentas + comunidade.
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-2xl mx-auto mb-10">
                              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Investimento</p>
                                  <p className="font-bold text-lg">12x de R$98</p>
                              </div>
                              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Garantia</p>
                                  <p className="font-bold text-lg">30 dias Anti-Tédio</p>
                              </div>
                              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Bônus</p>
                                  <p className="font-bold text-lg">Super Chat IA</p>
                              </div>
                          </div>

                          <Button size="lg" className="w-full md:w-auto text-lg h-16 px-12 uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(201,178,152,0.3)] animate-pulse-slow">
                              Quero Conhecer a Comunidade Lendária <Icon name="arrow-right" className="ml-2" />
                          </Button>
                          
                          <p className="text-xs text-muted-foreground mt-4 opacity-70">
                              Inclui acesso a GPT-5, Claude Sonnet 4 e Grok 3 (Valor de R$8.400/ano).
                          </p>
                      </CardContent>
                  </Card>

                  <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-foreground/80 my-12">
                      "Não vou te transformar em expert em IA. Vou te ensinar a pensar com clareza suficiente para usar IA como extensão da sua genialidade, não muleta para sua mediocridade."
                      <footer className="mt-2 font-bold font-sans not-italic text-primary">— Alan Nicolas</footer>
                  </blockquote>

              </article>
          </main>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
              
              {/* Author Bio */}
              <div className="sticky top-24 space-y-8">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-md text-center">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary mb-4 relative">
                          <Avatar className="w-full h-full">
                              <AvatarImage src={alanAvatar} />
                              <AvatarFallback>AN</AvatarFallback>
                          </Avatar>
                      </div>
                      <h4 className="font-bold font-sans text-lg">Alan Nicolas</h4>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Fundador</p>
                      <p className="text-sm text-muted-foreground font-sans font-medium mb-6 leading-relaxed">
                          Empresário com R$200M+ em vendas e mentor de 20.000 líderes. Sua missão é imortalizar o legado de profissionais experientes através da Inteligência Artificial.
                      </p>
                      <Button variant="outline" className="w-full text-xs">Seguir no LinkedIn</Button>
                  </div>

                  {/* Urgency Box */}
                  <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white p-6 rounded-xl border border-white/10 shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Symbol name="infinity" className="text-8xl" />
                      </div>
                      <div className="relative z-10 space-y-4">
                          <p className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span> Vagas Abertas
                          </p>
                          <h4 className="text-xl font-bold font-sans leading-tight">
                              Não deixe sua experiência se tornar obsoleta.
                          </h4>
                          <p className="text-sm text-zinc-400 font-sans font-medium">
                              A próxima turma da Comunidade Lendária começa em breve. Garanta sua condição especial.
                          </p>
                          <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
                              Ver Detalhes
                          </Button>
                      </div>
                  </div>

                  {/* Related */}
                  <div className="space-y-4 pt-4 border-t border-border">
                      <h5 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Leia Também</h5>
                      <a href="#" className="block group">
                          <h6 className="font-bold text-sm group-hover:text-primary transition-colors">O fim das agências tradicionais?</h6>
                          <p className="text-xs text-muted-foreground">Mercado • 4 min</p>
                      </a>
                      <a href="#" className="block group">
                          <h6 className="font-bold text-sm group-hover:text-primary transition-colors">3 Prompts para dobrar sua produtividade</h6>
                          <p className="text-xs text-muted-foreground">Tática • 2 min</p>
                      </a>
                  </div>
              </div>
          </aside>

      </div>
      
      {/* Sticky Bottom CTA Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur border-t border-border md:hidden z-50">
          <Button className="w-full font-bold shadow-lg">Conhecer a Comunidade</Button>
      </div>

    </div>
  );
};

export default CommunityAdvertorialTemplate;
