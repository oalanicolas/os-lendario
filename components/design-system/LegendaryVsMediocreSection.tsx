
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { CycleDiagram, CycleData } from '../ui'; // Updated to use Barrel File

const LegendaryVsMediocreSection: React.FC = () => {
  // Data Definition moved to the page level (Separation of Concerns)
  const legendaryData: CycleData = {
    title: "VIDA LENDÁRIA",
    subtitle: "Ciclo Virtuoso",
    center: "IA",
    nodes: [
        { label: "Clareza", x: 50, y: 0, align: "center" }, // Top
        { label: "FAZER", x: 95, y: 25, align: "left" }, // Top Right
        { label: "Realização\n& Propósito", x: 95, y: 75, align: "left" }, // Bottom Right
        { label: "TER", x: 50, y: 100, align: "center" }, // Bottom
        { label: "Liberdade", x: 5, y: 75, align: "right" }, // Bottom Left
        { label: "SER", x: 5, y: 25, align: "right" }, // Top Left
    ],
    triangle: [
        { label: "Inteligência\n& Autoconhecimento", x: 50, y: 28, align: "center" }, // Top
        { label: "Impacto\n& Arte", x: 78, y: 75, align: "center" }, // Right
        { label: "Inteligência\nArtificial", x: 22, y: 75, align: "center" }, // Left
    ]
  };

  const mediocreData: CycleData = {
    title: "VIDA MEDÍOCRE",
    subtitle: "Ciclo Vicioso",
    center: "AI",
    nodes: [
        { label: "Confusão", x: 50, y: 0, align: "center" }, // Top
        { label: "SER", x: 95, y: 25, align: "left" }, // Top Right
        { label: "Corrida\nde Ratos", x: 95, y: 75, align: "left" }, // Bottom Right
        { label: "FAZER", x: 50, y: 100, align: "center" }, // Bottom
        { label: "Frustração", x: 5, y: 75, align: "right" }, // Bottom Left
        { label: "TER", x: 5, y: 25, align: "right" }, // Top Left
    ],
    triangle: [
        { label: "Alienação\n& Ignorância", x: 50, y: 28, align: "center" }, // Top
        { label: "Automático\n& Insignificante", x: 80, y: 75, align: "center" }, // Right
        { label: "Ação\nImediatista", x: 20, y: 75, align: "center" }, // Left
    ]
  };

  const comparisons = [
    { l: "Usa IA (a cada 30min).", m: "Usa desculpas." },
    { l: "Assume responsabilidade.", m: "Culpa os outros." },
    { l: "Tem um segundo cérebro.", m: "Não anota, ou usa caderno." },
    { l: "Entrega sempre mais do que o esperado.", m: "Entrega o mínimo possível." },
    { l: "Tem iniciativa.", m: "Espera que outros tomem a iniciativa." },
    { l: "Assume riscos calculados.", m: "Evita qualquer tipo de risco." },
    { l: "É otimista e grato.", m: "É pessimista e ingrato." },
    { l: "Tem garra e perseverança.", m: "Desiste facilmente." },
    { l: "Sonha grande.", m: "Sonha pequeno." },
    { l: "É humilde e aberto a aprender.", m: "É arrogante e acha que sabe tudo." },
    { l: "Tem propósito claro.", m: "Vive sem direção." },
    { l: "Tem prazer em servir ao próximo.", m: "Pensa apenas no próprio umbigo." },
    { l: "Busca constante evolução.", m: "Fica estagnado na zona de conforto." },
    { l: "Deixa um legado positivo.", m: "Não se preocupa com o impacto que deixa." },
    { l: "Vive no modo \"ser\" para depois \"ter\".", m: "Tenta \"ter\" sem \"ser\" primeiro." },
    { l: "Pensa a longo prazo.", m: "É imediatista." },
    { l: "Vê oportunidades.", m: "Vê falhas." },
    { l: "Tem motivação intrínseca.", m: "Depende de motivação extrínseca." },
    { l: "Foca em criar impacto positivo.", m: "Foca apenas em prazer e distração." },
    { l: "Busca autoconhecimento.", m: "Ignora o autoconhecimento." },
    { l: "Cultiva hábitos saudáveis.", m: "Negligencia a saúde física e mental." },
    { l: "Aprende com os erros.", m: "Repete os mesmos erros." },
    { l: "Busca feedback construtivo.", m: "Evita críticas e feedback." },
    { l: "Age com integridade.", m: "Age de forma oportunista." },
    { l: "Investe em crescimento pessoal.", m: "Gasta tempo com atividades improdutivas." },
    { l: "Busca excelência, não perfeccionismo.", m: "Confunde perfeccionismo com qualidade." },
    { l: "Foca no essencial (0,8% que gera 51,2%).", m: "Dispersa-se em atividades pouco relevantes." },
    { l: "Gera resultados sem mimimi.", m: "Reclama mais do que age." },
    { l: "Cultiva relações transparentes e honestas.", m: "Engaja-se em fofocas e manipulações." },
    { l: "Abraça a mudança e a inovação.", m: "Resiste a mudanças e novas ideias." },
    { l: "Assume postura de dono.", m: "Age apenas como funcionário." },
    { l: "Espalha generosidade e gratidão.", m: "Age com egoísmo e ingratidão." },
    { l: "Se importa genuinamente.", m: "É indiferente ou apático." },
    { l: "Aprende e ensina constantemente.", m: "Guarda conhecimento para si." },
    { l: "Zela pela harmonia do time.", m: "Cria conflitos desnecessários." },
    { l: "Busca divertir-se no trabalho.", m: "Vê o trabalho como um fardo." },
    { l: "Tem alto desempenho.", m: "Tem baixo desempenho." },
    { l: "Faça o que eu faço.", m: "Faça o que eu digo, não o que eu faço." },
    { l: "É grato.", m: "É ingrata." },
  ];

  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* Intro Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight">Lendário <span className="text-muted-foreground font-serif text-2xl italic mx-2">vs</span> Medíocre</h2>
            <Badge variant="outline" className="w-fit text-sm py-1">Cultura de Gestão</Badge>
        </div>
        <div className="space-y-4 max-w-4xl">
             <p className="font-sans font-medium text-xl text-muted-foreground leading-relaxed">
                Para que nossa missão e visão possam acontecer, desenvolvemos uma cultura de gestão incomum, focada na <strong>excelência, liberdade e impacto</strong>.
            </p>
            <div className="p-6 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                <p className="font-sans text-lg font-medium text-foreground mb-2">"A clareza é a mãe da ação."</p>
                <p className="font-serif text-muted-foreground italic">
                    Nós, LENDÁRIOS, compreendemos que palavras vazias não movem montanhas. Nossa essência é moldada na AÇÃO e na EXECUÇÃO. Nossos líderes não se contentam com reuniões intermináveis; eles lideram pelo exemplo.
                </p>
            </div>
        </div>
      </div>

      {/* VISUAL CYCLE COMPARISON */}
      <section className="bg-[#0A0A0A] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative">
            {/* Divider */}
            <div className="absolute left-1/2 top-10 bottom-10 w-px bg-white/10 hidden lg:block"></div>
            
            {/* Use the new modular components */}
            <CycleDiagram data={legendaryData} variant="primary" />
            <CycleDiagram data={mediocreData} variant="muted" />
        </div>
        
        <div className="mt-12 text-center">
            <p className="font-serif text-zinc-500 italic max-w-2xl mx-auto text-sm">
                "Uma vida lendária é forjada na clareza e ação. Uma vida medíocre é aprisionada na confusão e inércia."
            </p>
        </div>
      </section>

      {/* 3 Pillars Detail - CHANGED: md:grid-cols-3 -> lg:grid-cols-3 */}
      <section className="space-y-8">
        <h3 className="text-2xl font-sans font-bold flex items-center gap-3">
            <Symbol name="infinity" className="text-primary" /> Detalhamento dos Pilares
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-primary/5 border-primary/20 hover:border-primary/50 transition-all">
                <CardHeader>
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
                        <Icon name="brain" size="size-6" />
                    </div>
                    <CardTitle className="text-xl">Inteligência & Autoconhecimento</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-sans font-medium leading-relaxed">
                        Buscamos pessoas capazes de resolver problemas complexos e que tenham fome de evolução pessoal. A busca pela Verdade gera impacto.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-brand-indigo/5 border-brand-indigo/20 hover:border-brand-indigo/50 transition-all">
                <CardHeader>
                    <div className="w-12 h-12 bg-brand-indigo/20 rounded-full flex items-center justify-center text-brand-indigo mb-4">
                        <Icon name="magic-wand" size="size-6" />
                    </div>
                    <CardTitle className="text-xl">Impacto e Arte</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-sans font-medium leading-relaxed">
                        Operamos na nossa <strong>Zona de Genialidade</strong>. Transformamos paixão em arte e trabalho em legado. Liberdade com responsabilidade para criar.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-brand-blue/5 border-brand-blue/20 hover:border-brand-blue/50 transition-all">
                <CardHeader>
                    <div className="w-12 h-12 bg-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue mb-4">
                        <Icon name="microchip" size="size-6" />
                    </div>
                    <CardTitle className="text-xl">Inteligência Artificial (AI First)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-sans font-medium leading-relaxed mb-3">
                        Só alcançaremos liberdade se tivermos mentalidade <strong>AI First</strong>. Amplificamos nossa arte e escalamos nosso impacto através do uso constante de IA.
                    </p>
                     <p className="text-xs text-brand-blue font-bold uppercase tracking-wider">
                        Congruência
                    </p>
                    <p className="text-xs text-muted-foreground font-sans font-medium">
                        Antes de tudo NÓS precisamos ser potencializados por IA. Vivemos o que acreditamos.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* The Battle: Legendary vs Mediocre */}
      <section className="space-y-8 pt-12 border-t border-border">
        <h3 className="text-3xl font-sans font-bold text-center mb-8">
            Checklist de Auto-Avaliação
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Todos nós somos uma mistura. Vence o lobo que alimentarmos mais.
        </p>

        <div className="border border-border rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-2 bg-muted/50 border-b border-border">
                <div className="p-4 md:p-6 text-center border-r border-border">
                    <h4 className="text-xl md:text-2xl font-bold text-brand-green flex items-center justify-center gap-2">
                        Lendário <Symbol name="infinity" />
                    </h4>
                </div>
                <div className="p-4 md:p-6 text-center bg-destructive/5">
                    <h4 className="text-xl md:text-2xl font-bold text-destructive flex items-center justify-center gap-2">
                        Medíocre 💩
                    </h4>
                </div>
            </div>

            {/* List */}
            <div className="divide-y divide-border">
                {comparisons.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 group hover:bg-muted/20 transition-colors">
                        <div className="p-4 md:px-8 md:py-4 flex items-start gap-3 border-r-0 sm:border-r border-border/50 border-b sm:border-b-0">
                            <Icon name="check-circle" className="text-brand-green shrink-0 mt-0.5" size="size-4" />
                            <span className="text-sm font-medium text-foreground/90">{item.l}</span>
                        </div>
                        <div className="p-4 md:px-8 md:py-4 flex items-start gap-3 bg-destructive/[0.02]">
                            <Icon name="cross-circle" className="text-destructive shrink-0 mt-0.5" size="size-4" />
                            <span className="text-sm font-sans font-medium text-muted-foreground">{item.m}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* RESTORED: The Warning: Mediocre Life */}
      <section className="space-y-12 pt-16 pb-8">
        <div className="relative rounded-3xl overflow-hidden bg-foreground text-background p-8 md:p-16">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Icon name="skull" className="text-9xl" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <Badge variant="destructive" className="mb-2">Evite a TODO Custo</Badge>
                    <h3 className="text-4xl font-sans font-bold text-destructive">Uma Vida Medíocre</h3>
                    <p className="font-serif text-lg leading-relaxed opacity-90">
                        É aquela vivida no piloto automático. Sem propósito, contentando-se com o mínimo. Uma existência caracterizada pela falta de crescimento e pela tendência de culpar os outros.
                    </p>
                    
                    <div className="grid gap-4 pt-4">
                        <div className="p-4 bg-background/5 rounded-lg border border-white/5 hover:bg-background/10 transition-colors">
                             <div className="flex items-center gap-2 mb-2 text-destructive">
                                <Icon name="eye-crossed" />
                                <span className="font-bold text-sm uppercase">1. Alienação e Ignorância</span>
                             </div>
                             <p className="text-xs font-sans font-medium opacity-80">
                                Pessoas medíocres evitam desafios intelectuais. São profundas no raso, contentam-se com a superficialidade e resistem à evolução pessoal.
                             </p>
                        </div>

                         <div className="p-4 bg-background/5 rounded-lg border border-white/5 hover:bg-background/10 transition-colors">
                             <div className="flex items-center gap-2 mb-2 text-destructive">
                                <Icon name="bolt" />
                                <span className="font-bold text-sm uppercase">2. Ação Imediatista</span>
                             </div>
                             <p className="text-xs font-sans font-medium opacity-80">
                                Agem por impulso, sem legado em mente. Escondem-se atrás de burocracias e regras rígidas, temendo a criatividade.
                             </p>
                        </div>

                         <div className="p-4 bg-background/5 rounded-lg border border-white/5 hover:bg-background/10 transition-colors">
                             <div className="flex items-center gap-2 mb-2 text-destructive">
                                <Icon name="refresh" />
                                <span className="font-bold text-sm uppercase">3. Automático (Corrida dos Ratos)</span>
                             </div>
                             <p className="text-xs font-sans font-medium opacity-80">
                                Resistem à mudança e novas ferramentas. Buscam TER antes de SER. O resultado é incongruência e estagnação.
                             </p>
                        </div>
                    </div>

                    <div className="p-6 bg-background/10 rounded-xl border border-white/10 mt-8">
                        <p className="font-serif italic text-sm">
                            "A confusão é a mãe da inação. Pessoas medíocres vivem em um estado de paralisia, onde falar substitui o agir."
                        </p>
                    </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border-4 border-destructive/20 shadow-2xl bg-[#0A0A0A] p-4">
                     {/* Reuse the generic component with specific data */}
                     <CycleDiagram data={mediocreData} variant="muted" />
                </div>
            </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-4">
            <Symbol name="star" className="text-4xl text-primary animate-pulse" />
            <p className="font-sans font-bold text-xl">
                É seu dever manter-se vigilante e forjar uma vida lendária.
            </p>
        </div>
      </section>

    </div>
  );
};

export default LegendaryVsMediocreSection;
