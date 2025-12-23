import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';

const EbookTemplate: React.FC = () => {
  return (
    <div className="relative flex min-h-screen animate-fade-in flex-col overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="pointer-events-none absolute right-0 top-0 h-[50vw] w-[50vw] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[150px]"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-10">
        <div className="flex items-center gap-2">
          <Symbol name="infinity" className="text-2xl text-primary" />
          <span className="font-sans text-lg font-bold tracking-tight">Academia Lendár[IA]</span>
        </div>
        <a
          href="#"
          className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          Voltar para o site
        </a>
      </header>

      {/* Main Content Split */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-16 p-4 lg:flex-row lg:gap-24 lg:p-12">
        {/* Left: Copy & Benefits */}
        <div className="order-2 flex-1 space-y-10 lg:order-1">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-primary/50 bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary"
            >
              Material Gratuito
            </Badge>

            <h1 className="font-sans text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
              O Guia Definitivo de <br />
              <span className="bg-gradient-to-r from-primary to-brand-yellow bg-clip-text text-transparent">
                Engenharia de Prompt
              </span>
            </h1>

            <p className="max-w-xl font-serif text-xl leading-relaxed text-muted-foreground">
              Pare de "conversar" com a IA e comece a <strong>programá-la</strong>. Descubra os 5
              frameworks que os especialistas usam para gerar resultados de alta precisão.
            </p>
          </div>

          <div className="space-y-6 border-t border-border/50 pt-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              O que você vai aprender:
            </h4>
            <div className="grid gap-4">
              {[
                { title: 'Framework C.O.R.E.', desc: 'Contexto, Objetivo, Restrições e Exemplos.' },
                {
                  title: 'Biblioteca de Personas',
                  desc: '30 personas prontas para copiar e colar.',
                },
                {
                  title: 'Automação de Fluxos',
                  desc: 'Como encadear prompts para tarefas complexas.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-border/50 hover:bg-muted/30"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <Icon name="check" size="size-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold">{item.title}</h4>
                    <p className="font-serif text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Book Mockup & Form */}
        <div className="perspective-1000 order-1 w-full max-w-md flex-1 lg:order-2">
          {/* Book 3D Effect CSS */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .book-container {
                    perspective: 1000px;
                }
                .book {
                    width: 260px;
                    height: 350px;
                    position: relative;
                    transform-style: preserve-3d;
                    transform: rotateY(-25deg) rotateX(10deg);
                    transition: transform 0.5s;
                    box-shadow: 20px 20px 50px rgba(0,0,0,0.3);
                    margin: 0 auto 40px auto;
                }
                .book:hover {
                    transform: rotateY(-15deg) rotateX(5deg) scale(1.05);
                }
                .book-front {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
                    border: 2px solid #C9B298;
                    border-radius: 4px 10px 10px 4px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 20px;
                    backface-visibility: hidden;
                    z-index: 2;
                }
                .book-side {
                    position: absolute;
                    left: 0;
                    width: 40px;
                    height: 100%;
                    background: #C9B298;
                    transform: rotateY(-90deg) translateZ(20px);
                    border-radius: 2px;
                }
              `,
            }}
          />

          {/* The Book */}
          <div className="book-container hidden md:block">
            <div className="book">
              <div className="book-front border-primary">
                <Symbol name="infinity" className="mb-6 text-6xl text-primary" />
                <h3 className="font-sans text-3xl font-bold uppercase tracking-widest text-white">
                  Prompt
                  <br />
                  Master
                </h3>
                <div className="my-6 h-1 w-12 bg-primary"></div>
                <p className="font-serif text-xs text-white/60">Guia Oficial v4.1</p>
              </div>
              <div className="book-side"></div>
            </div>
          </div>

          {/* The Form */}
          <Card className="relative overflow-hidden border-border bg-card bg-card/90 shadow-2xl backdrop-blur-sm">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-brand-yellow to-primary"></div>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold">Baixe Agora Gratuitamente</h3>
                <p className="font-serif text-sm text-muted-foreground">
                  Junte-se a +15.000 líderes lendários.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Seu nome" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Melhor Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-background/50"
                  />
                </div>
                <Button className="h-12 w-full text-base font-bold uppercase tracking-wide shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
                  Receber Material <Icon name="download" className="ml-2" />
                </Button>
              </form>

              <p className="flex items-center justify-center gap-1 text-center text-[10px] text-muted-foreground">
                <Icon name="lock" size="size-3" /> Seus dados estão 100% seguros.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center text-xs text-muted-foreground">
        <p>© 2025 Academia Lendária. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default EbookTemplate;
