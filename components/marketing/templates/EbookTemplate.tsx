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
    <div className="min-h-screen bg-background flex flex-col animate-fade-in relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Header */}
      <header className="p-6 md:p-10 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
              <Symbol name="infinity" className="text-primary text-2xl" />
              <span className="font-sans font-bold text-lg tracking-tight">Academia Lendár[IA]</span>
          </div>
          <a href="#" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Voltar para o site</a>
      </header>

      {/* Main Content Split */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 lg:p-12 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left: Copy & Benefits */}
          <div className="flex-1 space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                  <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 uppercase tracking-widest text-xs px-3 py-1">
                      Material Gratuito
                  </Badge>
                  
                  <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight leading-[1.1]">
                      O Guia Definitivo de <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-yellow">Engenharia de Prompt</span>
                  </h1>
                  
                  <p className="font-serif text-xl text-muted-foreground leading-relaxed max-w-xl">
                      Pare de "conversar" com a IA e comece a <strong>programá-la</strong>. Descubra os 5 frameworks que os especialistas usam para gerar resultados de alta precisão.
                  </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-border/50">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">O que você vai aprender:</h4>
                  <div className="grid gap-4">
                      {[
                          { title: "Framework C.O.R.E.", desc: "Contexto, Objetivo, Restrições e Exemplos." },
                          { title: "Biblioteca de Personas", desc: "30 personas prontas para copiar e colar." },
                          { title: "Automação de Fluxos", desc: "Como encadear prompts para tarefas complexas." }
                      ].map((item, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors border border-transparent hover:border-border/50">
                              <div className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mt-1 shrink-0">
                                  <Icon name="check" size="size-4" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-base">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground font-serif">{item.desc}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right: Book Mockup & Form */}
          <div className="flex-1 w-full max-w-md order-1 lg:order-2 perspective-1000">
              
              {/* Book 3D Effect CSS */}
              <style dangerouslySetInnerHTML={{__html: `
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
              `}} />

              {/* The Book */}
              <div className="book-container hidden md:block">
                  <div className="book">
                      <div className="book-front border-primary">
                          <Symbol name="infinity" className="text-primary text-6xl mb-6" />
                          <h3 className="text-3xl font-bold text-white font-sans uppercase tracking-widest">Prompt<br/>Master</h3>
                          <div className="w-12 h-1 bg-primary my-6"></div>
                          <p className="text-white/60 text-xs font-serif">Guia Oficial v4.1</p>
                      </div>
                      <div className="book-side"></div>
                  </div>
              </div>

              {/* The Form */}
              <Card className="relative bg-card border-border shadow-2xl overflow-hidden backdrop-blur-sm bg-card/90">
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary via-brand-yellow to-primary"></div>
                  <CardContent className="p-8 space-y-6">
                      <div className="text-center space-y-2">
                          <h3 className="font-bold text-2xl">Baixe Agora Gratuitamente</h3>
                          <p className="text-sm text-muted-foreground font-serif">Junte-se a +15.000 líderes lendários.</p>
                      </div>
                      
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                          <div className="space-y-2">
                              <Label htmlFor="name">Nome Completo</Label>
                              <Input id="name" placeholder="Seu nome" className="bg-background/50" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="email">Melhor Email</Label>
                              <Input id="email" type="email" placeholder="seu@email.com" className="bg-background/50" />
                          </div>
                          <Button className="w-full h-12 text-base font-bold uppercase tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                              Receber Material <Icon name="download" className="ml-2" />
                          </Button>
                      </form>
                      
                      <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                          <Icon name="lock" size="size-3" /> Seus dados estão 100% seguros.
                      </p>
                  </CardContent>
              </Card>
          </div>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border relative z-10">
          <p>© 2025 Academia Lendária. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
};

export default EbookTemplate;