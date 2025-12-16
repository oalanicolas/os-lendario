import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Separator } from '../../ui/separator';

const CommunitySalesTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="w-full bg-background animate-fade-in pb-20 font-sans selection:bg-primary/30">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-b from-[#050505] to-[#121212] text-white py-20 px-4 md:px-8 relative overflow-hidden border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-10">
              {/* Promise Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold tracking-wide">
                  <Icon name="sparkles" size="size-4" />
                  <span>A Janela de Oportunidade Está Fechando</span>
              </div>

              {/* Headline */}
              <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                      Sua Experiência de 20 Anos É <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand-yellow to-primary">Vantagem Competitiva</span>
                  </h1>
                  <p className="font-serif text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                      Se você souber usar IA para multiplicá-la. O ecossistema que 20.000+ profissionais usaram para transformar décadas de bagagem em resultado real.
                  </p>
              </div>

              {/* Video Placeholder */}
              <div className="max-w-4xl mx-auto aspect-video bg-black rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(201,178,152,0.1)] relative group cursor-pointer overflow-hidden ring-1 ring-white/5">
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-24 h-24 bg-primary/90 rounded-full flex items-center justify-center pl-2 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30 backdrop-blur-sm">
                          <Icon name="play" className="text-white text-4xl" type="solid" />
                      </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" alt="Video Thumbnail" />
              </div>

              {/* Primary CTA */}
              <div className="pt-4">
                  <Button size="lg" className="h-20 px-12 text-xl font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(201,178,152,0.3)] animate-pulse-slow">
                      Quero Entrar na Comunidade Lendária <Icon name="arrow-right" className="ml-2" />
                  </Button>
                  <p className="text-xs text-zinc-500 mt-4 uppercase tracking-widest">
                      Acesso Imediato • 30 Dias de Garantia • Cancelamento Grátis
                  </p>
              </div>
          </div>
      </section>

      {/* --- DIAGNOSIS CHECKLIST --- */}
      <section className="py-20 px-4 bg-muted/5 border-b border-border">
          <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Você se reconhece?</h2>
                  <p className="text-muted-foreground font-serif text-lg">Se você marcar 3 ou mais, este sistema foi feito para você.</p>
              </div>

              <div className="space-y-4">
                  {[
                      "Tem 15-20+ anos de experiência, mas sente que está operando em fração do seu potencial",
                      "Já comprou dezenas de cursos. Nenhum gerou resultado consistente.",
                      "Começa projetos empolgado. Abandona antes de ver resultado.",
                      "Trabalha demais. Renda estagnada há anos.",
                      "O tempo está passando. Você não está construindo nada próprio.",
                      "Medo real de ser substituído por alguém 20 anos mais novo usando IA básica.",
                      "Quer sair do CLT mas tem medo de destruir o padrão de vida da família."
                  ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                          <div className="w-6 h-6 rounded border-2 border-primary flex items-center justify-center shrink-0 mt-0.5 text-primary">
                              <Icon name="check" size="size-3" />
                          </div>
                          <p className="text-foreground/90 font-medium">{item}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- STATISTICS GRID --- */}
      <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 max-w-2xl mx-auto">
                  Os dados que provam que <span className="text-destructive">você não está sozinho</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-muted/10 border-none shadow-none text-center">
                      <CardContent className="pt-6">
                          <div className="text-5xl font-bold text-destructive mb-2">80%</div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tempo Sugado</p>
                          <p className="text-xs text-muted-foreground mt-2 font-serif">por tarefas repetitivas</p>
                      </CardContent>
                  </Card>
                  <Card className="bg-muted/10 border-none shadow-none text-center">
                      <CardContent className="pt-6">
                          <div className="text-5xl font-bold text-destructive mb-2">65%</div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Loop Infinito</p>
                          <p className="text-xs text-muted-foreground mt-2 font-serif">muitas ideias, pouca execução</p>
                      </CardContent>
                  </Card>
                  <Card className="bg-muted/10 border-none shadow-none text-center">
                      <CardContent className="pt-6">
                          <div className="text-5xl font-bold text-destructive mb-2">60%</div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Burnout</p>
                          <p className="text-xs text-muted-foreground mt-2 font-serif">declarado ou em desenvolvimento</p>
                      </CardContent>
                  </Card>
                  <Card className="bg-muted/10 border-none shadow-none text-center">
                      <CardContent className="pt-6">
                          <div className="text-5xl font-bold text-destructive mb-2">60%</div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Caos Mental</p>
                          <p className="text-xs text-muted-foreground mt-2 font-serif">conhecimento desorganizado</p>
                      </CardContent>
                  </Card>
                  <Card className="bg-muted/10 border-none shadow-none text-center">
                      <CardContent className="pt-6">
                          <div className="text-5xl font-bold text-destructive mb-2">55%</div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Renda Estagnada</p>
                          <p className="text-xs text-muted-foreground mt-2 font-serif">há anos sem crescimento real</p>
                      </CardContent>
                  </Card>
                  <Card className="bg-muted/10 border-none shadow-none text-center">
                      <CardContent className="pt-6">
                          <div className="text-5xl font-bold text-destructive mb-2">50%</div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Medo</p>
                          <p className="text-xs text-muted-foreground mt-2 font-serif">de ficar obsoleto</p>
                      </CardContent>
                  </Card>
              </div>

              <div className="mt-12 p-6 border-l-4 border-primary bg-primary/5 rounded-r-lg max-w-3xl mx-auto">
                  <p className="font-serif text-lg italic text-muted-foreground">
                      "O problema não é você. É o sistema que você está usando. Ou a falta dele. Profissionais qualificados, experientes, mas travados pela complexidade."
                  </p>
              </div>
          </div>
      </section>

      {/* --- AUTHORITY --- */}
      <section className="py-20 px-4 bg-zinc-900 text-white border-y border-white/10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/3">
                  <div className="aspect-square relative rounded-2xl overflow-hidden border-2 border-primary shadow-2xl">
                      <img src={alanAvatar} className="w-full h-full object-cover" alt="Alan Nicolas" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="font-bold text-lg">Alan Nicolas</p>
                          <p className="text-xs text-zinc-300 uppercase tracking-widest">Fundador</p>
                      </div>
                  </div>
              </div>
              <div className="flex-1 space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold">Por que me ouvir?</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-2xl font-bold text-primary">R$ 200M+</p>
                          <p className="text-xs text-zinc-400">Faturados</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-2xl font-bold text-primary">20.000+</p>
                          <p className="text-xs text-zinc-400">Alunos Formados</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-2xl font-bold text-primary">40+</p>
                          <p className="text-xs text-zinc-400">Países</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-2xl font-bold text-primary">98%</p>
                          <p className="text-xs text-zinc-400">Retenção Inicial</p>
                      </div>
                  </div>

                  <div className="space-y-4 text-zinc-300 font-serif leading-relaxed">
                      <p>
                          <strong>O que eu não sou:</strong> Não sou dev. Não sou técnico de formação. Não sou guru de palco vendendo fórmula mágica.
                      </p>
                      <p>
                          <strong>O que eu sou:</strong> Criador do conceito "Segundo Cérebro com IA" no Brasil. O cara que usa IA a cada 30 minutos — não como modinha, mas como extensão do cérebro.
                      </p>
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm italic text-primary-foreground">
                          "Eu também era o cara travado. TDAH. Milhões de ideias. Execução fragmentada. Criei o sistema para mim antes de ensinar para outros. Isso não é teoria. É o que me salvou."
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- THE SOLUTION (MODULES) --- */}
      <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                  <Badge variant="outline" className="border-primary text-primary">O Ecossistema Completo</Badge>
                  <h2 className="text-4xl md:text-5xl font-bold">Comunidade Lendár[IA]</h2>
                  <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
                      Treinamento Estruturado + Ferramentas Premium + Tribo de Executores.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                      { icon: "brain", title: "Fluência em IA", desc: "Fundamentos que 99% ignora. Entenda IA de verdade, sem tecniquês." },
                      { icon: "layers", title: "Segundo Cérebro", desc: "Sistema de organização que libera sua mente. Chega de guardar tudo na cabeça." },
                      { icon: "terminal", title: "Engenharia de Prompt", desc: "A diferença entre prompts genéricos e comandos que geram dinheiro." },
                      { icon: "briefcase", title: "Negócios com IA", desc: "Estratégias de monetização e novos modelos de receita." },
                      { icon: "code-simple", title: "VibeCoding", desc: "Crie aplicativos e automações sem saber uma linha de código." },
                      { icon: "rocket", title: "Prospecção & Vendas", desc: "Automatize sua máquina de vendas e multiplique conversões." },
                      { icon: "target", title: "Zona de Genialidade", desc: "Identifique sua área de maior impacto e escale seu talento." },
                      { icon: "shield-check", title: "Mente Lendária", desc: "Mentalidade para era da IA. Navegue mudanças sem perder o rumo." },
                      { icon: "users-alt", title: "Clones IA Express", desc: "Crie versões de você que trabalham 24/7. Escala sem burnout." },
                  ].map((mod, i) => (
                      <Card key={i} className="group hover:border-primary/50 transition-colors">
                          <CardHeader>
                              <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center text-foreground group-hover:text-primary transition-colors mb-4">
                                  <Icon name={mod.icon} size="size-6" />
                              </div>
                              <CardTitle className="text-lg">{mod.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                                  {mod.desc}
                              </p>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>

      {/* --- TOOLS STACK (Value Anchor) --- */}
      <section className="py-20 px-4 bg-muted/10 border-y border-border">
          <div className="max-w-4xl mx-auto text-center space-y-10">
              <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Ferramentas Premium Inclusas</h2>
                  <p className="text-muted-foreground font-serif">
                      Acesso ao nosso <strong>Super Chat</strong> com as 9 IAs mais poderosas do mundo.
                  </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {['GPT-5', 'GPT-4o', 'Claude 3.5', 'Grok 3', 'Gemini Pro', 'Llama 3', 'Mistral', 'Perplexity', 'R1'].map((ai, i) => (
                      <div key={i} className="bg-card border border-border p-4 rounded-xl shadow-sm flex items-center justify-center font-bold text-sm">
                          {ai}
                      </div>
                  ))}
              </div>

              <div className="inline-block bg-background border border-border p-6 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Valor se contratado separado</p>
                  <p className="text-4xl font-black text-foreground decoration-destructive/30 line-through decoration-4">R$ 8.400<span className="text-lg font-normal text-muted-foreground">/ano</span></p>
                  <p className="text-xs text-primary font-bold mt-2">Você recebe incluso na assinatura.</p>
              </div>
          </div>
      </section>

      {/* --- PRICING & OFFER --- */}
      <section className="py-24 px-4 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[100px] -z-10"></div>

          <div className="max-w-4xl mx-auto text-center space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Seu Investimento Hoje</h2>
              
              <Card className="border-2 border-primary shadow-2xl relative bg-card overflow-hidden">
                  <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-primary via-brand-yellow to-primary"></div>
                  <CardContent className="p-10 md:p-16 space-y-8">
                      <div className="space-y-2">
                          <p className="text-lg text-muted-foreground line-through">Valor de Referência: R$ 8.400/ano</p>
                          <div className="flex items-center justify-center gap-2">
                              <span className="text-6xl md:text-8xl font-black text-foreground tracking-tighter">12x R$ 98</span>
                          </div>
                          <p className="text-sm text-muted-foreground">ou R$ 1.176 à vista</p>
                      </div>

                      <Button size="lg" className="w-full max-w-md h-16 text-xl font-bold uppercase tracking-wide shadow-xl shadow-primary/25 animate-pulse-slow">
                          Quero Entrar na Comunidade Lendária
                      </Button>

                      <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2"><Icon name="check-circle" className="text-success" /> Acesso Imediato</span>
                          <span className="flex items-center gap-2"><Icon name="shield-check" className="text-success" /> Garantia de 30 Dias</span>
                          <span className="flex items-center gap-2"><Icon name="lock" className="text-success" /> Pagamento Seguro</span>
                      </div>
                  </CardContent>
              </Card>

              {/* Guarantee */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 border border-border bg-muted/5 rounded-xl max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center border-2 border-foreground shrink-0 text-3xl shadow-sm">
                      🛡️
                  </div>
                  <div className="text-left space-y-2">
                      <h4 className="font-bold text-lg">Garantia Anti-Tédio de 30 Dias</h4>
                      <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                          Entre. Use. Aplique. Se em 30 dias você não sentir que valeu, pede o dinheiro de volta. 100%. Sem perguntas. Sem burocracia.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* --- FAQ / OBJECTIONS --- */}
      <section className="py-20 px-4 bg-muted/10">
          <div className="max-w-3xl mx-auto space-y-12">
              <h2 className="text-3xl font-bold text-center">Perguntas Frequentes</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="1" className="border border-border rounded-lg bg-card px-4">
                      <AccordionTrigger className="hover:no-underline text-base font-semibold">R$ 98/mês é muito para testar?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-serif">
                          R$ 3 por dia. Menos que um café. Para acesso a 9 IAs premium (valor R$ 8.400/ano) + treinamento completo + comunidade. Além disso: garantia de 30 dias. Se não valer, pede o dinheiro de volta.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2" className="border border-border rounded-lg bg-card px-4">
                      <AccordionTrigger className="hover:no-underline text-base font-semibold">Não tenho tempo.</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-serif">
                          80% dos profissionais têm tempo sugado por tarefas repetitivas. O Segundo Cérebro foi criado para resolver exatamente isso. O sistema libera tempo — não consome.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="3" className="border border-border rounded-lg bg-card px-4">
                      <AccordionTrigger className="hover:no-underline text-base font-semibold">IA é complexo para minha idade?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-serif">
                          95% dos membros não têm background técnico. Temos membros de 56 a 69 anos. Experiência + IA = vantagem, não desvantagem.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="4" className="border border-border rounded-lg bg-card px-4">
                      <AccordionTrigger className="hover:no-underline text-base font-semibold">Posso aprender sozinho?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-serif">
                          Pode. Vai levar 3-5 anos. Sem sistema. Sem accountability. Ou pode acessar o que 20.000+ alunos já validaram agora.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </div>
      </section>

      {/* --- STICKY FOOTER CTA (Mobile) --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-50">
          <Button className="w-full font-bold shadow-lg" size="lg">Quero Participar</Button>
      </div>

    </div>
  );
};

export default CommunitySalesTemplate;