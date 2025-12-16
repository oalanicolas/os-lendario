
import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';

const AdvertorialTemplate: React.FC = () => {
  return (
    <div className="w-full bg-background animate-fade-in pb-20 font-serif">
      
      {/* Top Bar (Fake News Site) */}
      <div className="border-b border-border py-3 mb-8 bg-card sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                  <Icon name="menu-burger" className="text-muted-foreground cursor-pointer" />
                  <span className="font-serif font-bold text-2xl tracking-tighter italic">The <span className="text-primary">Daily</span> Tech</span>
              </div>
              <div className="hidden md:flex gap-6 text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="text-foreground border-b-2 border-primary pb-4 -mb-4">Negócios</span>
                  <span className="hover:text-foreground cursor-pointer">Mercado</span>
                  <span className="hover:text-foreground cursor-pointer">Inovação</span>
                  <span className="hover:text-foreground cursor-pointer">Startups</span>
              </div>
              <div className="flex items-center gap-4">
                  <Button size="sm" variant="ghost" className="h-8 w-8"><Icon name="search" /></Button>
                  <Button size="sm" className="hidden sm:flex h-8 text-xs font-sans">Assinar</Button>
              </div>
          </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <main className="lg:col-span-8">
              {/* Article Header */}
              <header className="space-y-6 mb-8">
                  <div className="flex gap-2">
                      <Badge variant="destructive" className="uppercase tracking-widest text-[10px] rounded-sm">Hot Topic</Badge>
                      <span className="text-xs font-sans font-bold text-muted-foreground uppercase tracking-widest mt-0.5">5 min de leitura</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
                      O "Fim" dos Gestores Tradicionais: Como a IA criou uma nova classe de Super-Líderes
                  </h1>
                  
                  <h2 className="text-xl text-muted-foreground font-sans font-light leading-relaxed border-l-4 border-primary pl-4">
                      Enquanto muitos temem a substituição, um grupo seleto de empresários está usando a tecnologia para multiplicar sua produtividade em 10x.
                  </h2>
                  
                  <div className="flex items-center justify-between py-6 border-y border-border/50">
                      <div className="flex items-center gap-3">
                          <Avatar>
                              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                              <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="text-left font-sans">
                              <p className="text-sm font-bold text-foreground">Por Júlia Dias</p>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Editora de Tecnologia</p>
                          </div>
                      </div>
                      <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full bg-muted/20 hover:bg-brand-blue/10 hover:text-brand-blue"><Icon name="facebook" type="brands" /></Button>
                          <Button variant="ghost" size="icon" className="rounded-full bg-muted/20 hover:bg-brand-green/10 hover:text-brand-green"><Icon name="whatsapp" type="brands" /></Button>
                          <Button variant="ghost" size="icon" className="rounded-full bg-muted/20 hover:bg-black/10 hover:text-foreground"><Icon name="twitter" type="brands" /></Button>
                      </div>
                  </div>
              </header>

              {/* Main Image */}
              <figure className="mb-10">
                  <div className="aspect-video w-full bg-muted rounded-md overflow-hidden relative shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1531297461136-82lw8z1a?q=80&w=2070&auto=format&fit=crop" 
                        alt="IA Workspace" 
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                      />
                  </div>
                  <figcaption className="text-xs text-muted-foreground mt-2 font-sans italic flex items-center gap-2">
                      <Icon name="camera" size="size-3" /> Escritórios modernos mudam com agentes autônomos. (Foto: Unsplash)
                  </figcaption>
              </figure>

              {/* Body Content - KEEP FONT-SERIF */}
              <article className="prose dark:prose-invert prose-lg max-w-none font-serif text-foreground/90 leading-loose">
                  <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-foreground first-letter:mr-3 first-letter:float-left">
                      São Paulo — O cenário corporativo está passando por sua maior transformação desde a invenção da internet. Mas, ao contrário do que pregam os profetas do apocalipse, os robôs não estão aqui para roubar seu emprego — eles estão aqui para eliminar a parte chata dele.
                  </p>
                  
                  <p>
                      Um novo estudo da <em>Academia Lendária</em> revelou que empresas que adotaram uma mentalidade "AI First" no último ano viram um aumento de <strong>40% na margem de lucro líquido</strong>, simplesmente por eliminar ineficiências operacionais.
                  </p>

                  <h3 className="font-sans font-bold text-2xl mt-12 mb-6 flex items-center gap-2">
                      <span className="w-1 h-8 bg-primary block"></span> A Era da Mediocridade acabou
                  </h3>
                  
                  <p>
                      "O mercado não tolera mais o mediano," afirma Alan Nicolas, fundador do movimento. "Você tem acesso às ferramentas mais poderosas da história da humanidade por uma fração do custo de um estagiário. Se você não está usando isso, você está escolhendo ficar para trás."
                  </p>

                  {/* Pull Quote */}
                  <div className="my-10 p-8 bg-card border-y-2 border-primary/20 text-center relative">
                      <Icon name="quote-right" className="absolute top-4 left-4 text-primary/10 text-4xl" />
                      <p className="text-2xl italic font-bold text-foreground relative z-10">
                          "Não é sobre trabalhar mais. É sobre ter um exército de agentes trabalhando enquanto você dorme. Isso é a verdadeira liberdade."
                      </p>
                      <cite className="block mt-4 text-sm font-sans font-bold text-primary uppercase not-italic">— Alan Nicolas</cite>
                  </div>

                  <p>
                      A chave não está na tecnologia em si, mas na <strong>metodologia</strong>. Ferramentas como ChatGPT e Claude são inúteis sem um framework de pensamento claro. É aqui que muitos falham: tentam automatizar o caos.
                  </p>

                  <h3 className="font-sans font-bold text-2xl mt-12 mb-6 flex items-center gap-2">
                      <span className="w-1 h-8 bg-primary block"></span> Como dar o primeiro passo?
                  </h3>

                  <p>
                      Especialistas recomendam começar pequeno. Identifique gargalos repetitivos — resposta de e-mails, agendamento, análise de dados básicos — e implemente soluções pontuais. O efeito composto dessas pequenas automações é avassalador ao longo de um ano.
                  </p>

                  {/* Native Ad Block / CTA */}
                  <Card className="my-12 bg-primary/5 border-primary/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-primary/10 px-4 py-2 text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 border-b border-primary/10">
                          <Icon name="bolt" /> Oferta Especial para Leitores
                      </div>
                      <CardContent className="p-8 md:flex gap-8 items-center">
                          <div className="flex-1 space-y-4">
                              <h4 className="text-2xl font-sans font-bold leading-tight">Quer dominar essa nova era?</h4>
                              <p className="text-sm text-muted-foreground font-sans font-medium">
                                  A Academia Lendária liberou um treinamento gratuito de introdução à Gestão com IA. Aprenda a criar seu primeiro "funcionário digital" em menos de 1 hora.
                              </p>
                              <Button size="lg" className="w-full md:w-auto font-bold text-sm h-12 shadow-lg shadow-primary/20">
                                  Acessar Treinamento Gratuito <Icon name="arrow-right" className="ml-2" />
                              </Button>
                          </div>
                          <div className="hidden md:block w-32 shrink-0">
                              <div className="aspect-square rounded-full bg-primary/20 flex items-center justify-center text-primary text-4xl animate-pulse-slow">
                                  <Icon name="gift" />
                              </div>
                          </div>
                      </CardContent>
                  </Card>

                  <p>
                      O futuro pertence aos que constroem pontes entre a criatividade humana e a velocidade da máquina. A pergunta que fica é: de que lado da história você vai estar?
                  </p>
              </article>

              <Separator className="my-12" />

              {/* Comments Section (Social Proof) */}
              <div className="space-y-8 bg-muted/10 p-8 rounded-xl border border-border">
                  <div className="flex items-center justify-between">
                      <h3 className="font-sans font-bold text-lg">Comentários (3)</h3>
                      <Button variant="outline" size="sm">Escrever comentário</Button>
                  </div>
                  
                  <div className="space-y-6">
                      {/* Comment 1 */}
                      <div className="flex gap-4">
                          <Avatar>
                              <AvatarFallback className="bg-brand-blue text-white">MP</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2 flex-1">
                              <div className="bg-card p-4 rounded-lg rounded-tl-none border border-border shadow-sm">
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="font-bold text-sm font-sans">Marcos Paulo</span>
                                      <span className="text-xs text-muted-foreground">25 min atrás</span>
                                  </div>
                                  <p className="text-sm text-foreground/80 font-sans font-medium">
                                      Incrível a leitura. Implementei o que o Alan ensina e minha agência parou de sangrar caixa. Recomendo demais.
                                  </p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground pl-2 font-sans font-bold">
                                  <button className="flex items-center gap-1 hover:text-primary"><Icon name="thumbs-up" size="size-3" /> Curtir (42)</button>
                                  <button className="hover:text-primary">Responder</button>
                              </div>
                          </div>
                      </div>
                      
                      {/* Comment 2 */}
                      <div className="flex gap-4">
                          <Avatar>
                              <AvatarFallback className="bg-brand-pink text-white">RL</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2 flex-1">
                              <div className="bg-card p-4 rounded-lg rounded-tl-none border border-border shadow-sm">
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="font-bold text-sm font-sans">Renata Lima</span>
                                      <span className="text-xs text-muted-foreground">1h atrás</span>
                                  </div>
                                  <p className="text-sm text-foreground/80 font-sans font-medium">
                                      Finalmente alguém falando a verdade sobre IA sem aquele hype desnecessário. É sobre gestão, não sobre robôs.
                                  </p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground pl-2 font-sans font-bold">
                                  <button className="flex items-center gap-1 hover:text-primary"><Icon name="thumbs-up" size="size-3" /> Curtir (15)</button>
                                  <button className="hover:text-primary">Responder</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </main>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
              
              {/* Sticky Container */}
              <div className="sticky top-24 space-y-8">
                  {/* Ad Box */}
                  <div className="bg-zinc-900 text-white p-6 rounded-xl text-center space-y-4 shadow-xl border border-zinc-800 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Publicidade</p>
                      <h4 className="text-2xl font-sans font-bold leading-tight">Pare de perder tempo com tarefas manuais.</h4>
                      <div className="w-16 h-1 bg-primary mx-auto"></div>
                      <p className="text-sm text-zinc-300 font-sans font-medium">Assista à aula magna gratuita e descubra o método.</p>
                      <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold">Assistir Agora</Button>
                  </div>

                  {/* Related News */}
                  <div className="space-y-4">
                      <h4 className="font-sans font-bold text-lg border-b border-border pb-2">Mais Lidas</h4>
                      <div className="flex gap-4 items-start group cursor-pointer">
                          <span className="text-3xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">1</span>
                          <div>
                              <h5 className="font-sans font-bold text-sm leading-snug group-hover:text-primary transition-colors">Como criar um agente de IA para responder seus e-mails.</h5>
                              <p className="text-xs text-muted-foreground mt-1">Tech • 4min</p>
                          </div>
                      </div>
                      <div className="flex gap-4 items-start group cursor-pointer">
                          <span className="text-3xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">2</span>
                          <div>
                              <h5 className="font-sans font-bold text-sm leading-snug group-hover:text-primary transition-colors">O prompt secreto que economiza 10h por semana.</h5>
                              <p className="text-xs text-muted-foreground mt-1">Produtividade • 3min</p>
                          </div>
                      </div>
                      <div className="flex gap-4 items-start group cursor-pointer">
                          <span className="text-3xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">3</span>
                          <div>
                              <h5 className="font-sans font-bold text-sm leading-snug group-hover:text-primary transition-colors">Gestão 4.0: O guia definitivo.</h5>
                              <p className="text-xs text-muted-foreground mt-1">Negócios • 8min</p>
                          </div>
                      </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-muted/30 p-6 rounded-xl border border-border">
                      <Icon name="envelope" className="text-2xl mb-2 text-primary" />
                      <h4 className="font-sans font-bold text-base mb-2">Receba nossa curadoria</h4>
                      <p className="text-xs text-muted-foreground mb-4 font-sans font-medium">As notícias mais importantes sobre IA e negócios, toda manhã.</p>
                      <div className="flex gap-2">
                          <input type="email" placeholder="Email" className="bg-background border border-input rounded px-3 py-1 text-sm w-full" />
                          <Button size="sm" variant="outline"><Icon name="arrow-right" /></Button>
                      </div>
                  </div>
              </div>
          </aside>

      </div>
      
      {/* Sticky Bottom Bar Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border p-4 md:hidden flex justify-between items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div className="text-sm font-bold font-sans">
              <span className="block text-[10px] text-muted-foreground uppercase">Aula Gratuita</span>
              Dominando a IA
          </div>
          <Button size="sm" className="font-bold">Acessar Agora</Button>
      </div>

    </div>
  );
};

export default AdvertorialTemplate;
