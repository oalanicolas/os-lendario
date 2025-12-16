
import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Separator } from '../../ui/separator';

const SalesPageTemplate: React.FC = () => {
  return (
    <div className="space-y-0 animate-fade-in w-full max-w-full overflow-x-hidden font-sans">
      
      {/* --- URGENCY BAR --- */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-xs font-bold uppercase tracking-widest sticky top-0 z-50 shadow-md">
          🔥 Últimas 4 vagas com condição especial
      </div>

      {/* --- HERO / VSL SECTION --- */}
      <div className="bg-[#050505] py-16 md:py-24 text-center px-4 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-mono mb-4 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> AO VIVO
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Pare de perder tempo com tarefas que <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-yellow">uma IA faria em segundos.</span>
              </h1>
              
              <p className="font-sans font-medium text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                  Descubra o sistema exato para automatizar 80% do seu operacional e dobrar seus lucros em 90 dias, sem precisar contratar ninguém.
              </p>

              {/* VSL PLACEHOLDER */}
              <div className="aspect-video w-full max-w-4xl mx-auto bg-black border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(201,178,152,0.1)] relative group cursor-pointer overflow-hidden mt-8 ring-1 ring-white/5">
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-24 h-24 bg-primary/90 rounded-full flex items-center justify-center pl-2 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30 backdrop-blur-sm">
                          <Icon name="play" className="text-white text-4xl" type="solid" />
                      </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 z-20">
                      <div className="h-full bg-primary w-1/3"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              <div className="pt-8 flex flex-col items-center">
                  <Button size="lg" className="text-xl h-20 px-16 font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(201,178,152,0.4)] hover:shadow-[0_0_50px_rgba(201,178,152,0.6)] animate-button-shimmer bg-[linear-gradient(110deg,#C9B298,45%,#fff,55%,#C9B298)] bg-[length:200%_100%] transition-all hover:scale-105 border-0 text-black">
                      Quero Acesso ao Sistema <Icon name="arrow-right" className="ml-2" />
                  </Button>
                  <div className="flex gap-4 mt-6 text-xs text-zinc-500 font-mono uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Icon name="lock" size="size-3" /> Compra Segura</span>
                      <span className="flex items-center gap-2"><Icon name="check" size="size-3" /> Acesso Imediato</span>
                  </div>
              </div>
          </div>
      </div>

      {/* --- WHO IS THIS FOR (New) --- */}
      <section className="py-20 bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Para quem é este sistema?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-success/20 bg-success/5">
                      <CardHeader>
                          <CardTitle className="text-success flex items-center gap-2"><Icon name="check-circle" /> PARA VOCÊ SE...</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div className="flex gap-3"><Icon name="check" className="text-success shrink-0 mt-1" /> <span>Você é dono de agência ou consultoria.</span></div>
                          <div className="flex gap-3"><Icon name="check" className="text-success shrink-0 mt-1" /> <span>Sente que passa o dia apagando incêndios.</span></div>
                          <div className="flex gap-3"><Icon name="check" className="text-success shrink-0 mt-1" /> <span>Quer escalar mas tem medo de aumentar custos.</span></div>
                      </CardContent>
                  </Card>
                  <Card className="border-destructive/20 bg-destructive/5">
                      <CardHeader>
                          <CardTitle className="text-destructive flex items-center gap-2"><Icon name="cross-circle" /> NÃO É PARA VOCÊ SE...</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div className="flex gap-3"><Icon name="cross" className="text-destructive shrink-0 mt-1" /> <span>Procura dinheiro fácil sem trabalho.</span></div>
                          <div className="flex gap-3"><Icon name="cross" className="text-destructive shrink-0 mt-1" /> <span>Acha que IA é apenas "hype" passageiro.</span></div>
                          <div className="flex gap-3"><Icon name="cross" className="text-destructive shrink-0 mt-1" /> <span>Não está disposto a mudar processos antigos.</span></div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      </section>

      {/* --- THE STACK (Visual Improvement) --- */}
      <section className="py-24 bg-muted/10 relative">
          <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                  <Badge variant="outline" className="mb-4">O que você leva</Badge>
                  <h2 className="text-4xl font-bold">A oferta irresistível</h2>
                  <p className="text-muted-foreground mt-4">Tudo o que você precisa para sair do operacional.</p>
              </div>
              
              <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="bg-card border border-border p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-3xl">
                              <Icon name="brain" />
                          </div>
                          <div>
                              <h3 className="font-bold text-xl">Módulo 1: Fundamentos da IA</h3>
                              <p className="text-sm text-muted-foreground max-w-md">Domine a engenharia de prompt e os modelos de linguagem.</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <span className="text-xs text-destructive line-through font-bold">R$ 997</span>
                          <span className="block text-sm font-bold text-primary">Incluso</span>
                      </div>
                  </div>

                  {/* Item 2 - Highlight */}
                  <div className="bg-gradient-to-r from-card to-primary/5 border border-primary/30 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">CORE</div>
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-3xl shadow-lg shadow-primary/20">
                              <Icon name="rocket" />
                          </div>
                          <div>
                              <h3 className="font-bold text-xl">Módulo 2: Automação de Vendas</h3>
                              <p className="text-sm text-muted-foreground max-w-md">O funil automático que qualifica e vende 24/7.</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <span className="text-xs text-destructive line-through font-bold">R$ 1.997</span>
                          <span className="block text-sm font-bold text-primary">Incluso</span>
                      </div>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-card border border-border p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-3xl">
                              <Icon name="users-alt" />
                          </div>
                          <div>
                              <h3 className="font-bold text-xl">Módulo 3: Time Aumentado</h3>
                              <p className="text-sm text-muted-foreground max-w-md">Multiplique a produtividade da sua equipe em 5x.</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <span className="text-xs text-destructive line-through font-bold">R$ 997</span>
                          <span className="block text-sm font-bold text-primary">Incluso</span>
                      </div>
                  </div>

                  {/* Bonus */}
                  <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-lg text-center mt-8">
                      <p className="font-bold text-brand-gold-800 dark:text-brand-gold flex items-center justify-center gap-2">
                          <Icon name="gift" /> Bônus: Comunidade VIP + Calls Mensais (Valor Inestimável)
                      </p>
                  </div>
              </div>

              <div className="flex justify-between items-center mt-8 px-4 border-t border-border pt-8">
                  <span className="text-lg text-muted-foreground">Valor Total:</span>
                  <span className="text-2xl font-bold text-muted-foreground line-through decoration-destructive decoration-2">R$ 3.991</span>
              </div>
          </div>
      </section>

      {/* --- PRICING --- */}
      <section className="py-24 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-primary shadow-2xl relative overflow-hidden bg-card transform hover:scale-[1.01] transition-transform duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-12 py-1.5 rounded-b-xl font-bold text-sm uppercase tracking-widest shadow-lg">
                      Oferta Por Tempo Limitado
                  </div>
                  
                  <div className="p-8 md:p-16 grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-8 text-left">
                          <h3 className="text-3xl font-bold">Acesso Completo</h3>
                          <div className="space-y-4">
                              {[
                                  "Curso Completo (30h)", 
                                  "Biblioteca de 500+ Prompts", 
                                  "Comunidade de Networking", 
                                  "Certificado Oficial",
                                  "Suporte Prioritário"
                              ].map((item, i) => (
                                  <div key={i} className="flex items-center gap-3">
                                      <div className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0"><Icon name="check" size="size-3" /></div>
                                      <span className="text-base font-medium">{item}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                      
                      <div className="text-center space-y-6 bg-muted/20 p-8 rounded-2xl border border-border">
                          <p className="text-sm text-muted-foreground">De <span className="line-through">R$ 1.997</span> por apenas:</p>
                          <div className="space-y-1">
                              <p className="text-6xl font-bold font-sans text-primary tracking-tight">R$ 997</p>
                              <p className="text-sm text-muted-foreground font-bold">ou 12x de R$ 99,70</p>
                          </div>
                          <Button size="lg" className="w-full h-16 font-bold text-xl uppercase tracking-wider shadow-lg shadow-primary/20">
                              Comprar Agora
                          </Button>
                          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground opacity-70">
                              <Icon name="lock" size="size-3" /> Pagamento processado via Hotmart
                          </div>
                      </div>
                  </div>
              </Card>
          </div>
      </section>

      {/* --- GUARANTEE --- */}
      <section className="py-20 px-4 bg-muted/10 border-y border-border text-center">
          <div className="max-w-2xl mx-auto space-y-6">
              <div className="w-24 h-24 mx-auto bg-background border-4 border-primary rounded-full flex items-center justify-center text-primary mb-4 shadow-xl">
                  <Icon name="shield-check" className="text-5xl" />
              </div>
              <h3 className="text-3xl font-bold">Risco Zero Absoluto</h3>
              <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                  Entre, assista às aulas, use os prompts. Se em <strong>7 dias</strong> você não sentir que o valor entregue é 10x maior que o preço, nós devolvemos 100% do seu dinheiro. Sem perguntas, sem letras miúdas.
              </p>
          </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 max-w-3xl mx-auto px-4 space-y-12">
          <h2 className="text-3xl font-bold text-center">Dúvidas Frequentes</h2>
          <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="1" className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/30">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">O acesso é vitalício?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground font-sans font-medium">Sim! Você paga uma vez e tem acesso para sempre, incluindo futuras atualizações da plataforma.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2" className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/30">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">Tem suporte para dúvidas?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground font-sans font-medium">Temos um time de suporte dedicado dentro da plataforma e na comunidade exclusiva no Discord.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="3" className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/30">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">Serve para iniciantes?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground font-sans font-medium">Com certeza. O curso começa do zero absoluto e vai até níveis avançados de automação.</AccordionContent>
              </AccordionItem>
          </Accordion>
      </section>

      {/* Sticky Footer CTA (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-50">
          <Button size="lg" className="w-full font-bold shadow-lg">Quero minha vaga</Button>
      </div>

    </div>
  );
};

export default SalesPageTemplate;
