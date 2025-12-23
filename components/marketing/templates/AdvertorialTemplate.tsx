import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';

const AdvertorialTemplate: React.FC = () => {
  return (
    <div className="w-full animate-fade-in bg-background pb-20 font-serif">
      {/* Top Bar (Fake News Site) */}
      <div className="sticky top-0 z-40 mb-8 border-b border-border bg-card py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Icon name="menu-burger" className="cursor-pointer text-muted-foreground" />
            <span className="font-serif text-2xl font-bold italic tracking-tighter">
              The <span className="text-primary">Daily</span> Tech
            </span>
          </div>
          <div className="hidden gap-6 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground md:flex">
            <span className="-mb-4 border-b-2 border-primary pb-4 text-foreground">Negócios</span>
            <span className="cursor-pointer hover:text-foreground">Mercado</span>
            <span className="cursor-pointer hover:text-foreground">Inovação</span>
            <span className="cursor-pointer hover:text-foreground">Startups</span>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="ghost" className="h-8 w-8">
              <Icon name="search" />
            </Button>
            <Button size="sm" className="hidden h-8 font-sans text-xs sm:flex">
              Assinar
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-12">
        {/* Main Content Column */}
        <main className="lg:col-span-8">
          {/* Article Header */}
          <header className="mb-8 space-y-6">
            <div className="flex gap-2">
              <Badge
                variant="destructive"
                className="rounded-sm text-[10px] uppercase tracking-widest"
              >
                Hot Topic
              </Badge>
              <span className="mt-0.5 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
                5 min de leitura
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
              O "Fim" dos Gestores Tradicionais: Como a IA criou uma nova classe de Super-Líderes
            </h1>

            <h2 className="border-l-4 border-primary pl-4 font-sans text-xl font-light leading-relaxed text-muted-foreground">
              Enquanto muitos temem a substituição, um grupo seleto de empresários está usando a
              tecnologia para multiplicar sua produtividade em 10x.
            </h2>

            <div className="flex items-center justify-between border-y border-border/50 py-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-left font-sans">
                  <p className="text-sm font-bold text-foreground">Por Júlia Dias</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Editora de Tecnologia
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-muted/20 hover:bg-brand-blue/10 hover:text-brand-blue"
                >
                  <Icon name="facebook" type="brands" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-muted/20 hover:bg-brand-green/10 hover:text-brand-green"
                >
                  <Icon name="whatsapp" type="brands" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-muted/20 hover:bg-black/10 hover:text-foreground"
                >
                  <Icon name="twitter" type="brands" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Image */}
          <figure className="mb-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531297461136-82lw8z1a?q=80&w=2070&auto=format&fit=crop"
                alt="IA Workspace"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <figcaption className="mt-2 flex items-center gap-2 font-sans text-xs italic text-muted-foreground">
              <Icon name="camera" size="size-3" /> Escritórios modernos mudam com agentes autônomos.
              (Foto: Unsplash)
            </figcaption>
          </figure>

          {/* Body Content - KEEP FONT-SERIF */}
          <article className="prose dark:prose-invert prose-lg max-w-none font-serif leading-loose text-foreground/90">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-foreground">
              São Paulo — O cenário corporativo está passando por sua maior transformação desde a
              invenção da internet. Mas, ao contrário do que pregam os profetas do apocalipse, os
              robôs não estão aqui para roubar seu emprego — eles estão aqui para eliminar a parte
              chata dele.
            </p>

            <p>
              Um novo estudo da <em>Academia Lendária</em> revelou que empresas que adotaram uma
              mentalidade "AI First" no último ano viram um aumento de{' '}
              <strong>40% na margem de lucro líquido</strong>, simplesmente por eliminar
              ineficiências operacionais.
            </p>

            <h3 className="mb-6 mt-12 flex items-center gap-2 font-sans text-2xl font-bold">
              <span className="block h-8 w-1 bg-primary"></span> A Era da Mediocridade acabou
            </h3>

            <p>
              "O mercado não tolera mais o mediano," afirma Alan Nicolas, fundador do movimento.
              "Você tem acesso às ferramentas mais poderosas da história da humanidade por uma
              fração do custo de um estagiário. Se você não está usando isso, você está escolhendo
              ficar para trás."
            </p>

            {/* Pull Quote */}
            <div className="relative my-10 border-y-2 border-primary/20 bg-card p-8 text-center">
              <Icon name="quote-right" className="absolute left-4 top-4 text-4xl text-primary/10" />
              <p className="relative z-10 text-2xl font-bold italic text-foreground">
                "Não é sobre trabalhar mais. É sobre ter um exército de agentes trabalhando enquanto
                você dorme. Isso é a verdadeira liberdade."
              </p>
              <cite className="mt-4 block font-sans text-sm font-bold uppercase not-italic text-primary">
                — Alan Nicolas
              </cite>
            </div>

            <p>
              A chave não está na tecnologia em si, mas na <strong>metodologia</strong>. Ferramentas
              como ChatGPT e Claude são inúteis sem um framework de pensamento claro. É aqui que
              muitos falham: tentam automatizar o caos.
            </p>

            <h3 className="mb-6 mt-12 flex items-center gap-2 font-sans text-2xl font-bold">
              <span className="block h-8 w-1 bg-primary"></span> Como dar o primeiro passo?
            </h3>

            <p>
              Especialistas recomendam começar pequeno. Identifique gargalos repetitivos — resposta
              de e-mails, agendamento, análise de dados básicos — e implemente soluções pontuais. O
              efeito composto dessas pequenas automações é avassalador ao longo de um ano.
            </p>

            {/* Native Ad Block / CTA */}
            <Card className="my-12 overflow-hidden border-primary/30 bg-primary/5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-2 border-b border-primary/10 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Icon name="bolt" /> Oferta Especial para Leitores
              </div>
              <CardContent className="items-center gap-8 p-8 md:flex">
                <div className="flex-1 space-y-4">
                  <h4 className="font-sans text-2xl font-bold leading-tight">
                    Quer dominar essa nova era?
                  </h4>
                  <p className="font-sans text-sm font-medium text-muted-foreground">
                    A Academia Lendária liberou um treinamento gratuito de introdução à Gestão com
                    IA. Aprenda a criar seu primeiro "funcionário digital" em menos de 1 hora.
                  </p>
                  <Button
                    size="lg"
                    className="h-12 w-full text-sm font-bold shadow-lg shadow-primary/20 md:w-auto"
                  >
                    Acessar Treinamento Gratuito <Icon name="arrow-right" className="ml-2" />
                  </Button>
                </div>
                <div className="hidden w-32 shrink-0 md:block">
                  <div className="flex aspect-square animate-pulse-slow items-center justify-center rounded-full bg-primary/20 text-4xl text-primary">
                    <Icon name="gift" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <p>
              O futuro pertence aos que constroem pontes entre a criatividade humana e a velocidade
              da máquina. A pergunta que fica é: de que lado da história você vai estar?
            </p>
          </article>

          <Separator className="my-12" />

          {/* Comments Section (Social Proof) */}
          <div className="space-y-8 rounded-xl border border-border bg-muted/10 p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-lg font-bold">Comentários (3)</h3>
              <Button variant="outline" size="sm">
                Escrever comentário
              </Button>
            </div>

            <div className="space-y-6">
              {/* Comment 1 */}
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="bg-brand-blue text-white">MP</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="rounded-lg rounded-tl-none border border-border bg-card p-4 shadow-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-sans text-sm font-bold">Marcos Paulo</span>
                      <span className="text-xs text-muted-foreground">25 min atrás</span>
                    </div>
                    <p className="font-sans text-sm font-medium text-foreground/80">
                      Incrível a leitura. Implementei o que o Alan ensina e minha agência parou de
                      sangrar caixa. Recomendo demais.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pl-2 font-sans text-xs font-bold text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Icon name="thumbs-up" size="size-3" /> Curtir (42)
                    </button>
                    <button className="hover:text-primary">Responder</button>
                  </div>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="bg-brand-pink text-white">RL</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="rounded-lg rounded-tl-none border border-border bg-card p-4 shadow-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-sans text-sm font-bold">Renata Lima</span>
                      <span className="text-xs text-muted-foreground">1h atrás</span>
                    </div>
                    <p className="font-sans text-sm font-medium text-foreground/80">
                      Finalmente alguém falando a verdade sobre IA sem aquele hype desnecessário. É
                      sobre gestão, não sobre robôs.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pl-2 font-sans text-xs font-bold text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Icon name="thumbs-up" size="size-3" /> Curtir (15)
                    </button>
                    <button className="hover:text-primary">Responder</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar Column */}
        <aside className="space-y-8 lg:col-span-4">
          {/* Sticky Container */}
          <div className="sticky top-24 space-y-8">
            {/* Ad Box */}
            <div className="group relative space-y-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center text-white shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Publicidade
              </p>
              <h4 className="font-sans text-2xl font-bold leading-tight">
                Pare de perder tempo com tarefas manuais.
              </h4>
              <div className="mx-auto h-1 w-16 bg-primary"></div>
              <p className="font-sans text-sm font-medium text-zinc-300">
                Assista à aula magna gratuita e descubra o método.
              </p>
              <Button className="w-full bg-white font-bold text-black hover:bg-zinc-200">
                Assistir Agora
              </Button>
            </div>

            {/* Related News */}
            <div className="space-y-4">
              <h4 className="border-b border-border pb-2 font-sans text-lg font-bold">
                Mais Lidas
              </h4>
              <div className="group flex cursor-pointer items-start gap-4">
                <span className="text-3xl font-bold text-muted-foreground/30 transition-colors group-hover:text-primary">
                  1
                </span>
                <div>
                  <h5 className="font-sans text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                    Como criar um agente de IA para responder seus e-mails.
                  </h5>
                  <p className="mt-1 text-xs text-muted-foreground">Tech • 4min</p>
                </div>
              </div>
              <div className="group flex cursor-pointer items-start gap-4">
                <span className="text-3xl font-bold text-muted-foreground/30 transition-colors group-hover:text-primary">
                  2
                </span>
                <div>
                  <h5 className="font-sans text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                    O prompt secreto que economiza 10h por semana.
                  </h5>
                  <p className="mt-1 text-xs text-muted-foreground">Produtividade • 3min</p>
                </div>
              </div>
              <div className="group flex cursor-pointer items-start gap-4">
                <span className="text-3xl font-bold text-muted-foreground/30 transition-colors group-hover:text-primary">
                  3
                </span>
                <div>
                  <h5 className="font-sans text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                    Gestão 4.0: O guia definitivo.
                  </h5>
                  <p className="mt-1 text-xs text-muted-foreground">Negócios • 8min</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <Icon name="envelope" className="mb-2 text-2xl text-primary" />
              <h4 className="mb-2 font-sans text-base font-bold">Receba nossa curadoria</h4>
              <p className="mb-4 font-sans text-xs font-medium text-muted-foreground">
                As notícias mais importantes sobre IA e negócios, toda manhã.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded border border-input bg-background px-3 py-1 text-sm"
                />
                <Button size="sm" variant="outline">
                  <Icon name="arrow-right" />
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky Bottom Bar Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-border bg-background/90 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] backdrop-blur-md md:hidden">
        <div className="font-sans text-sm font-bold">
          <span className="block text-[10px] uppercase text-muted-foreground">Aula Gratuita</span>
          Dominando a IA
        </div>
        <Button size="sm" className="font-bold">
          Acessar Agora
        </Button>
      </div>
    </div>
  );
};

export default AdvertorialTemplate;
