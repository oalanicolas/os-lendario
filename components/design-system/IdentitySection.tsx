
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const ToneSlider: React.FC<{ left: string; right: string; value: number; description: string }> = ({ left, right, value, description }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-semibold font-sans">
      <span>{left}</span>
      <span>{right}</span>
    </div>
    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
      <div 
        className="absolute top-0 bottom-0 w-3 h-3 bg-primary rounded-full shadow-md -mt-0.5 transform -translate-x-1/2"
        style={{ left: `${(value / 10) * 100}%` }}
      />
      <div 
        className="absolute top-0 bottom-0 left-0 bg-primary/20"
        style={{ width: `${(value / 10) * 100}%` }}
      />
    </div>
    <p className="text-xs text-muted-foreground text-center font-sans font-medium italic">{description}</p>
  </div>
);

const IdentitySection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* HEADER v2.0 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-muted p-6 md:p-10 border border-border">
         <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">FIVU v2.0</Badge>
            <span className="text-xs font-mono text-muted-foreground">Corpus: 15.832 palavras</span>
         </div>
         <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4 tracking-tight">
            Identidade Verbal <span className="text-primary">Universal</span>
         </h2>
         <p className="font-sans font-medium text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            A voz da <strong className="text-foreground">Academia Lendár[IA]</strong>. Um framework vivo para comunicação institucional, fundamentado em documentos culturais, manifestos e princípios de liderança.
         </p>
         <div className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10">
             <div className="flex items-center gap-2 text-sm font-semibold">
                 <Icon name="user" className="text-primary" /> Founder: Alan Nicolas
             </div>
             <div className="flex items-center gap-2 text-sm font-semibold">
                 <Icon name="calendar" className="text-primary" /> Desde: 15/01/2020
             </div>
         </div>
         <Icon name="fingerprint" className="absolute -right-8 -bottom-8 text-[8rem] md:text-[12rem] text-primary/5 rotate-12" />
      </div>

      {/* 1. CORE IDENTITY */}
      <section className="space-y-8">
        <h3 className="text-2xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="diamond" /> 1. Núcleo Identitário
        </h3>
        
        {/* Mission / Vision / Positioning Cards - CHANGED: md:grid-cols-2 -> lg:grid-cols-3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-primary text-primary-foreground border-none relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                   <Icon name="target" className="text-9xl" />
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg relative z-10"><Icon name="target" /> Missão</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <p className="font-sans font-medium text-lg leading-relaxed">
                        "Unir e potencializar pessoas lendárias com IA para construírem soluções e negócios que <strong>imortalizam seu legado</strong>."
                    </p>
                </CardContent>
            </Card>
             <Card className="relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
                   <Icon name="eye" className="text-9xl" />
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg relative z-10"><Icon name="eye" /> Visão</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <p className="text-muted-foreground font-sans font-medium">
                        Ser referência global em educação de IA generativa aplicada a negócios, com um portfólio de startups de sucesso internacional.
                    </p>
                </CardContent>
            </Card>
             <Card className="relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
                   <Icon name="marker" className="text-9xl" />
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg relative z-10"><Icon name="marker" /> Posicionamento</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <p className="text-muted-foreground font-sans font-medium">
                        Somos um ecossistema de educação & inovação que potencializa pessoas e negócios com inteligência artificial generativa.
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* Archetypes with Hero Style Icons - CHANGED: md:grid-cols-3 to lg:grid-cols-3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            
            {/* Rebelde */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 group hover:border-primary transition-all duration-300 hover:shadow-lg">
                <div className="absolute -right-12 -bottom-12 text-[10rem] text-primary/10 rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                     <Icon name="flame" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                     <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                             <h4 className="text-3xl font-sans font-bold text-foreground">Rebelde</h4>
                             <Icon name="flame" className="text-primary md:hidden" size="size-6" />
                        </div>
                        <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-widest border border-primary/20">
                            Arquétipo Primário
                        </span>
                     </div>
                     <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Motivação</p>
                            <p className="text-sm font-medium leading-snug">Desafiar o status quo e recusar a mediocridade.</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Manifestação</p>
                            <p className="text-sm font-serif italic text-muted-foreground leading-snug">"Enquanto muitos os chamam de loucos, nós os reconhecemos como gênios."</p>
                        </div>
                     </div>
                </div>
            </div>

            {/* Mago */}
             <div className="relative overflow-hidden rounded-2xl border border-brand-indigo/20 bg-gradient-to-br from-card to-brand-indigo/5 p-8 group hover:border-brand-indigo transition-all duration-300 hover:shadow-lg">
                <div className="absolute -right-12 -bottom-12 text-[10rem] text-brand-indigo/10 rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                     <Icon name="magic-wand" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                     <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                             <h4 className="text-3xl font-sans font-bold text-foreground">Mago</h4>
                             <Icon name="magic-wand" className="text-brand-indigo md:hidden" size="size-6" />
                        </div>
                        <span className="inline-block bg-brand-indigo/10 text-brand-indigo px-2 py-1 rounded text-xs font-bold uppercase tracking-widest border border-brand-indigo/20">
                            Arquétipo Secundário
                        </span>
                     </div>
                     <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Motivação</p>
                            <p className="text-sm font-medium leading-snug">Transformar realidade e conhecimento em revolução.</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Manifestação</p>
                            <p className="text-sm font-serif italic text-muted-foreground leading-snug">"Alquimistas do conhecimento, arquitetos do impossível."</p>
                        </div>
                     </div>
                </div>
            </div>

            {/* Sábio */}
             <div className="relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-card to-brand-blue/5 p-8 group hover:border-brand-blue transition-all duration-300 hover:shadow-lg">
                <div className="absolute -right-12 -bottom-12 text-[10rem] text-brand-blue/10 rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                     <Icon name="book-alt" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                     <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                             <h4 className="text-3xl font-sans font-bold text-foreground">Sábio</h4>
                             <Icon name="book-alt" className="text-brand-blue md:hidden" size="size-6" />
                        </div>
                        <span className="inline-block bg-brand-blue/10 text-brand-blue px-2 py-1 rounded text-xs font-bold uppercase tracking-widest border border-brand-blue/20">
                            Arquétipo Terciário
                        </span>
                     </div>
                     <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Motivação</p>
                            <p className="text-sm font-medium leading-snug">Buscar a verdade através da transparência radical.</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Manifestação</p>
                            <p className="text-sm font-serif italic text-muted-foreground leading-snug">"Contexto, não controle. Verdade, bondade e utilidade."</p>
                        </div>
                     </div>
                </div>
            </div>

        </div>
      </section>

      {/* 2. PHILOSOPHY & VALUES */}
      <section className="space-y-8">
        <h3 className="text-2xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="columns" /> 2. Filosofia & Valores
        </h3>

        <Tabs defaultValue="beliefs" className="w-full">
            <TabsList className="mb-6 flex-wrap h-auto gap-2">
                <TabsTrigger value="beliefs" className="flex-1 min-w-[140px]">Crenças Fundamentais</TabsTrigger>
                <TabsTrigger value="enemies" className="flex-1 min-w-[140px]">Inimigos Conceituais</TabsTrigger>
                <TabsTrigger value="allies" className="flex-1 min-w-[140px]">Aliados Conceituais</TabsTrigger>
            </TabsList>
            
            <TabsContent value="beliefs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        "Pessoas acima de processos",
                        "Liberdade com responsabilidade",
                        "Excelência sem desculpas",
                        "AI First",
                        "Beneficiar a humanidade",
                        "Contexto, não controle",
                        "8 ou 80",
                        "Ser antes de Ter"
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-card border border-border rounded-lg flex items-start gap-3">
                            <Badge variant="outline" className="mt-0.5">{i+1}</Badge>
                            <span className="font-semibold text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </TabsContent>
            
            <TabsContent value="enemies">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        "Mediocridade", "Microgerenciamento", "Reuniões improdutivas", "Perfeccionismo paralisante",
                        "Zona de conforto", "Burocracia", "Fofoca e politicagem", "Resistência à IA"
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
                            <Icon name="cross-circle" size="size-4" />
                            <span className="font-semibold text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </TabsContent>

             <TabsContent value="allies">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        "Inovação constante", "Transparência radical", "Neurodivergência", 
                        "Generosidade e gratidão", "Zona de genialidade", "Comunicação assíncrona",
                        "Mentalidade de abundância", "Fail fast, learn faster", "Círculos de mastermind"
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-success/5 border border-success/20 rounded-lg flex items-center gap-3 text-success-foreground">
                            <Icon name="check-circle" size="size-4" />
                            <span className="font-semibold text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
      </section>

      {/* 3. LIDERANÇA & TIME (New) */}
      <section className="space-y-8">
         <h3 className="text-2xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="users-alt" /> 3. Pessoas & Cultura
        </h3>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            
            {/* LIDERANÇA */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold flex items-center gap-2"><Icon name="crown" className="text-primary" /> 15 Atributos do Líder</h4>
                    <Badge variant="outline">Sobre Nossos Líderes</Badge>
                </div>
                <div className="space-y-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {[
                        { title: "Amplificam o Coletivo", desc: "Iluminam o brilho da equipe, ego inversamente proporcional ao sucesso." },
                        { title: "Alquimistas de Desafios", desc: "Transformam problemas em oportunidades." },
                        { title: "Celebram Publicamente", desc: "Transformam conquistas em lendas inspiradoras." },
                        { title: "Nutrem Discretamente", desc: "Abordam desafios individuais com delicadeza." },
                        { title: "Elevam o Padrão", desc: "Buscam talentos que os desafiem e superem." },
                        { title: "Priorizam o Ecossistema", desc: "Removem elementos tóxicos, mesmo que produtivos." },
                        { title: "Donos da Narrativa", desc: "Assumem total responsabilidade por resultados." },
                        { title: "Inspiram, Não Intimidam", desc: "Metas como faróis de possibilidades." },
                        { title: "Celebram Overachievers", desc: "Extraordinário vira novo padrão." },
                        { title: "Impacto Transformador", desc: "Sucesso medido pela revolução causada." },
                        { title: "Lideram pelo Exemplo", desc: "Pavimentam o caminho com ações extraordinárias." },
                        { title: "Catalisam Inovação Disruptiva", desc: "Ideias ousadas esperadas e celebradas." },
                        { title: "Cultivam Autonomia Responsável", desc: "Empoderam com confiança, esperam resultados." },
                        { title: "Mestres da Adaptabilidade", desc: "Navegam mudanças com graça e visão." },
                        { title: "Pensamento Exponencial", desc: "Saltos quânticos, não melhorias incrementais." }
                    ].map((attr, i) => (
                        <div key={i} className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors group">
                            <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{i+1}. {attr.title}</p>
                            <p className="text-xs text-muted-foreground font-sans font-medium mt-1">{attr.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* TIME */}
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold flex items-center gap-2"><Icon name="shield-check" className="text-primary" /> 8 Virtudes do Time</h4>
                    <Badge variant="outline">Sobre Nosso Time</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: "Curiosidade Insaciável", icon: "search" },
                        { title: "Resiliência de Titã", icon: "shield" },
                        { title: "Altruísmo Revolucionário", icon: "heart" },
                        { title: "Bom Senso Visionário", icon: "bulb" },
                        { title: "Sinceridade Radical", icon: "comment-alt" },
                        { title: "Criatividade Disruptiva", icon: "rocket" },
                        { title: "Coragem Épica", icon: "sword" },
                        { title: "Autonomia Responsável", icon: "user-check" }
                    ].map((virtue, i) => (
                         <div key={i} className="p-4 border border-border rounded-lg bg-card flex flex-col items-center text-center gap-3 hover:bg-muted/50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Icon name={virtue.icon} size="size-5" />
                            </div>
                            <span className="font-bold text-sm">{virtue.title}</span>
                        </div>
                    ))}
                </div>
                
                {/* Tensions summary */}
                <div className="p-6 bg-muted/20 rounded-xl border border-dashed border-border mt-6">
                    <h5 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Tensões Produtivas</h5>
                    <div className="space-y-2 text-sm font-sans font-medium">
                        <div className="flex justify-between border-b border-border/50 pb-1"><span>Liberdade total</span> <span>Responsabilidade absoluta</span></div>
                        <div className="flex justify-between border-b border-border/50 pb-1"><span>Sonhar grande</span> <span>Começar pequeno</span></div>
                        <div className="flex justify-between border-b border-border/50 pb-1"><span>8 ou 80</span> <span>Líquidos no aprender</span></div>
                        <div className="flex justify-between pb-1"><span>Celebrar publicamente</span> <span>Nutrir discretamente</span></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. VOCABULARY & EXPRESSION */}
      <section className="space-y-8">
        <h3 className="text-2xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="comment-quote" /> 4. Expressão & Vocabulário
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Tones with Registers */}
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Matriz de Tons (Registros)</CardTitle>
                        <CardDescription>Adaptação por contexto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div>
                            <p className="text-sm font-bold mb-2 flex items-center gap-2"><Icon name="megaphone" size="size-3" /> Formal-Inspirador (Manifesto)</p>
                            <p className="text-xs italic text-muted-foreground border-l-2 border-primary pl-3 font-serif">"Este é um chamado aos inconformados. Àqueles que desafiam as tradições. Estes são os lendários."</p>
                        </div>
                         <div>
                            <p className="text-sm font-bold mb-2 flex items-center gap-2"><Icon name="briefcase" size="size-3" /> Profissional-Direto (Interno)</p>
                            <p className="text-xs italic text-muted-foreground border-l-2 border-primary pl-3 font-serif">"Líderes erram rápido, barato e diferente. Cultura lendária é inegociável."</p>
                        </div>
                         <div>
                            <p className="text-sm font-bold mb-2 flex items-center gap-2"><Icon name="lightning" size="size-3" /> Informal-Intenso (Chat)</p>
                            <p className="text-xs italic text-muted-foreground border-l-2 border-primary pl-3 font-serif">"Usa IA, porra! Antes de contratar, pergunta: dá pra automatizar isso?"</p>
                        </div>
                    </CardContent>
                </Card>

                 <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                     <h4 className="font-bold">Dimensões de Voz</h4>
                     <ToneSlider left="Engraçado" right="Sério" value={4} description="Sério com leveza" />
                     <ToneSlider left="Casual" right="Formal" value={4} description="Casual-profissional" />
                     <ToneSlider left="Irreverente" right="Respeitoso" value={6} description="Rebelde fundamentado" />
                     <ToneSlider left="Inspirador" right="Factual" value={8} description="Épico e convocatório" />
                 </div>
            </div>

            {/* Vocabulary Table & Metaphors */}
            <div className="space-y-8">
                <div className="rounded-xl border border-border overflow-hidden bg-card">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Termo (Proprietário)</TableHead>
                                <TableHead className="text-right text-destructive">Nunca Usar</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold text-primary">Lendário/a</TableCell>
                                <TableCell className="text-right text-muted-foreground line-through decoration-destructive">Usuário, Cliente</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-primary">AI First</TableCell>
                                <TableCell className="text-right text-muted-foreground line-through decoration-destructive">Automatização</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-primary">Forjando lendas</TableCell>
                                <TableCell className="text-right text-muted-foreground line-through decoration-destructive">Construindo equipes</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-bold text-primary">Catalisadores de grandeza</TableCell>
                                <TableCell className="text-right text-muted-foreground line-through decoration-destructive">Bons gestores</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-primary">Imortalizar seu legado</TableCell>
                                <TableCell className="text-right text-muted-foreground line-through decoration-destructive">Ter sucesso</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-base">Metáforas Recorrentes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm font-serif italic text-muted-foreground">
                        <p>• "Não apontam o caminho; eles o pavimentam"</p>
                        <p>• "Dança na chuva de desafios"</p>
                        <p>• "Vulnerabilidade é sua armadura"</p>
                        <p>• "Metas como faróis de possibilidades"</p>
                        <p>• "Saltos quânticos, não melhorias incrementais"</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* 5. ORGANISMOS (Templates) */}
      <section className="space-y-8">
          <h3 className="text-2xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="layout-fluid" /> 5. Organismos (Templates)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 border border-border rounded-xl bg-card">
                 <Badge className="mb-2">Manifesto</Badge>
                 <p className="text-sm text-muted-foreground font-sans font-medium leading-relaxed">
                     [CONTEXTO] Por 200 mil anos, fomos reféns da biologia... <br/>
                     [CHAMADO] Este é um chamado aos inconformados... <br/>
                     [DEFINIÇÃO] Estes são os lendários. <br/>
                     [FECHAMENTO] Movimento Lendário. Construindo o infinito, hoje.
                 </p>
             </div>
             <div className="p-6 border border-border rounded-xl bg-card">
                 <Badge className="mb-2">Princípio</Badge>
                 <p className="text-sm text-muted-foreground font-sans font-medium leading-relaxed">
                     [DEFINIÇÃO] Somos "a Apple das IAs"... <br/>
                     [EXPLICAÇÃO] Lembre-se: excelência ≠ perfeccionismo. <br/>
                     [PERGUNTAS-GUIA] Fiz meu melhor no tempo que eu tive? <br/>
                     [AÇÃO] Erre muito, mas sempre rápido.
                 </p>
             </div>
        </div>
      </section>

      {/* 6. MARKETING AUTÊNTICO (NEW) */}
      <section className="space-y-12 border-t-2 border-primary/20 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div>
                <h3 className="text-3xl font-sans font-bold flex items-center gap-3 mb-2">
                    <Icon name="megaphone" className="text-primary" size="size-8" /> 6. Marketing Autêntico
                </h3>
                <p className="font-serif text-xl text-muted-foreground italic">
                    "Vender sem esforço e sem mentir."
                </p>
            </div>
            <Badge variant="outline" className="text-sm py-1 border-primary text-primary">Filosofia Central</Badge>
        </div>

        {/* Definition - The "Manifesto" */}
        <div className="relative overflow-hidden rounded-xl bg-foreground text-background p-8 md:p-12 shadow-2xl">
            <Icon name="flame" className="absolute -right-10 -bottom-10 text-[12rem] text-primary/10 rotate-12" />
            <div className="relative z-10 space-y-8">
                 <h4 className="text-3xl font-bold font-sans text-primary">A Definição</h4>
                 <div className="space-y-6 font-serif text-lg md:text-xl leading-relaxed opacity-90 max-w-4xl">
                    <p>
                        Marketing Autêntico é o único tipo de marketing que <strong className="text-primary bg-primary/10 px-1 rounded">não reserva um lugar para você no inferno</strong>; ele se dedica a impulsionar mensagens autênticas e transparentes.
                    </p>
                    <p className="text-base text-background/70 font-sans">
                        Enquanto outros se escondem atrás de fachadas brilhantes e promessas vazias, criando um mundo superficial cheio de pessoas frustradas, o Marketing Autêntico se ergue como um farol de integridade.
                    </p>
                    <div className="pl-6 border-l-4 border-primary italic text-primary-foreground">
                        "Não é apenas uma estratégia; é uma revolução ética. Um chamado para rejeitarmos o que é superficial e abraçarmos o que é autêntico e humano."
                    </div>
                 </div>
            </div>
        </div>

        {/* Characteristics - Grid - CHANGED: md:grid-cols-2 -> lg:grid-cols-5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
             {[
                 { title: "Transparência", icon: "eye", desc: "Abertura total sobre práticas e origens." },
                 { title: "Autenticidade", icon: "fingerprint", desc: "Comunicação honesta, sem falsas promessas." },
                 { title: "Valor Real", icon: "diamond", desc: "Foco no cliente, não apenas na venda." },
                 { title: "Engajamento", icon: "users-alt", desc: "Criar comunidade, não apenas base de clientes." },
                 { title: "Responsabilidade", icon: "globe", desc: "Compromisso ético e sustentável." }
             ].map((item, i) => (
                 <div key={i} className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                         <Icon name={item.icon} size="size-5" />
                     </div>
                     <h5 className="font-bold text-sm mb-2">{item.title}</h5>
                     <p className="text-xs text-muted-foreground font-sans font-medium leading-snug">{item.desc}</p>
                 </div>
             ))}
        </div>

        {/* Values & Application - Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-brand-blue/20 bg-brand-blue/5">
                <CardHeader>
                    <CardTitle className="text-brand-blue flex items-center gap-2"><Icon name="refresh" /> Alinhamento de Valores</CardTitle>
                    <CardDescription>Como nossa filosofia se conecta com quem somos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { val: "Consciência & Sabedoria", desc: "Abordagem consciente e emocionalmente inteligente." },
                        { val: "Evolução (Progresso)", desc: "Melhoria contínua da marca e da experiência." },
                        { val: "Coerência", desc: "Alinhamento total entre a promessa e a entrega." },
                        { val: "Clareza", desc: "Comunicação direta é um pilar fundamental." },
                        { val: "Simplicidade", desc: "Mensagens simples, mas profundas e eficazes." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-brand-blue/10">
                            <Badge variant="outline" className="mt-0.5 border-brand-blue text-brand-blue">{i+1}</Badge>
                            <div>
                                <span className="font-bold text-sm block text-foreground">{item.val}</span>
                                <span className="text-xs text-muted-foreground font-sans font-medium">{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="border-brand-green/20 bg-brand-green/5">
                 <CardHeader>
                    <CardTitle className="text-brand-green flex items-center gap-2"><Icon name="rocket" /> Aplicações Práticas</CardTitle>
                    <CardDescription>Transformando filosofia em ação diária.</CardDescription>
                </CardHeader>
                 <CardContent className="grid gap-4">
                    <div className="p-4 bg-background rounded-lg border border-brand-green/10 flex gap-4 items-center">
                        <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0"><Icon name="book-alt" /></div>
                        <div>
                            <h5 className="font-bold text-sm">Storytelling Alinhado</h5>
                            <p className="text-xs text-muted-foreground font-sans font-medium">Sua missão de vida traduzida no negócio.</p>
                        </div>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-brand-green/10 flex gap-4 items-center">
                        <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0"><Icon name="share" /></div>
                        <div>
                            <h5 className="font-bold text-sm">Big Picture Content</h5>
                            <p className="text-xs text-muted-foreground font-sans font-medium">Estratégias que educam usando suas zonas de genialidade.</p>
                        </div>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-brand-green/10 flex gap-4 items-center">
                        <div className="bg-brand-green/10 p-3 rounded-full text-brand-green shrink-0"><Icon name="comment-alt" /></div>
                        <div>
                            <h5 className="font-bold text-sm">Comunidade de Valor</h5>
                            <p className="text-xs text-muted-foreground font-sans font-medium">Um espaço onde as pessoas se sentem realizadas.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

      </section>

      {/* QUICK REF CARD */}
      <section className="pt-8 border-t border-border">
         <div className="max-w-3xl mx-auto bg-foreground text-background rounded-xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Symbol name="infinity" className="text-9xl" />
             </div>
             
             <div className="relative z-10 space-y-6">
                 <div className="flex justify-between items-center border-b border-white/20 pb-4">
                     <h3 className="font-sans font-bold text-xl tracking-wider flex items-center gap-2"><Symbol name="infinity" /> LENDÁR[IA] QUICK REF v2.0</h3>
                     <Badge variant="outline" className="text-background border-background">Institucional</Badge>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                     <div>
                         <p className="font-bold mb-2 text-primary">MISSÃO</p>
                         <p className="font-sans font-medium opacity-80 leading-relaxed">Unir e potencializar pessoas lendárias com IA para imortalizar seu legado.</p>
                     </div>
                     <div>
                         <p className="font-bold mb-2 text-primary">ARQUÉTIPOS</p>
                         <p className="font-sans font-medium opacity-80">Rebelde + Mago + Sábio</p>
                     </div>
                 </div>

                 <div className="space-y-2">
                     <p className="font-bold text-sm text-primary">MANDAMENTOS DA COMUNICAÇÃO</p>
                     <ul className="space-y-1 text-sm font-sans font-medium opacity-80 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                         <li className="flex gap-2"><span>□</span> Usar "nós" e vocabulário proprietário</li>
                         <li className="flex gap-2"><span>□</span> Contrastar Lendário vs Medíocre</li>
                         <li className="flex gap-2"><span>□</span> Incluir chamada à ação clara</li>
                         <li className="flex gap-2"><span>□</span> Eliminar linguagem corporativa</li>
                         <li className="flex gap-2"><span>□</span> Elevar o tom (transformar "time" em "panteão")</li>
                         <li className="flex gap-2"><span>□</span> Inspirar sem ser vazio</li>
                     </ul>
                 </div>

                 <div className="pt-4 border-t border-white/20 text-center space-y-2">
                     <p className="font-sans font-bold text-lg italic">"Construindo o infinito, hoje."</p>
                     <p className="font-sans text-sm opacity-50">"Shaping Infinity, Today. ♾️"</p>
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
};

export default IdentitySection;
