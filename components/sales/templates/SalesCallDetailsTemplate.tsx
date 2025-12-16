
import React from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Progress } from '../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { cn } from '../../../lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../../ui/breadcrumb';

const SalesCallDetailsTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  
  // Mock Transcription Data
  const transcription = [
    { time: '00:15', speaker: 'rep', text: 'Bom dia, Carlos. Tudo bem? Aqui é a Amanda da Academia Lendária.' },
    { time: '00:22', speaker: 'lead', text: 'Oi Amanda, tudo certo. Estava aguardando seu contato.' },
    { time: '00:45', speaker: 'rep', text: 'Ótimo. O objetivo hoje é entender como podemos escalar sua operação de vendas. Me conta um pouco do cenário atual?' },
    { time: '01:30', speaker: 'lead', text: 'Então, hoje temos 5 vendedores, mas o processo é muito manual.', highlight: 'pain' },
    { time: '02:15', speaker: 'lead', text: 'Eu sinto que perdemos muito tempo preenchendo CRM em vez de vender.', highlight: 'pain' },
    { time: '02:40', speaker: 'rep', text: 'Entendo perfeitamente. Esse "caos silencioso" é comum. Se pudéssemos automatizar 80% disso, como seria?', highlight: 'solution' },
    { time: '03:10', speaker: 'lead', text: 'Seria um sonho, mas... quanto custa isso? Tenho receio de ser muito caro para o momento.', highlight: 'objection' },
    { time: '03:45', speaker: 'rep', text: 'Vamos falar de valor. Se seus vendedores ganhassem 2h por dia, quanto isso traria de receita extra?' },
    { time: '04:20', speaker: 'lead', text: 'Hm, faz sentido. Acho que uns R$ 50k a mais por mês.', highlight: 'value' },
    { time: '05:00', speaker: 'lead', text: 'Mas preciso ver se integra com o ActiveCampaign.', highlight: 'objection' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_CALL_DETAILS} setSection={setSection} />

      <main className="p-6 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
        
        {/* --- HEADER --- */}
        <div className="space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => setSection(Section.TEMPLATE_SALES_CALLS)}>Calls</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <span className="font-bold text-foreground">Call #C-8921</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        TechCorp SA <span className="text-muted-foreground font-light">| Carlos Silva</span>
                    </h1>
                    <div className="flex flex-wrap gap-3 items-center">
                        <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">Discovery</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
                            <Icon name="clock" size="size-3" /> 42m 15s
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
                            <Icon name="calendar" size="size-3" /> 24 Out, 14:30
                        </div>
                        <div className="h-4 w-px bg-border"></div>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                                <AvatarFallback>AL</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Amanda L.</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Icon name="play-circle" size="size-4" /> Ouvir Gravação
                    </Button>
                    <Button variant="ghost" size="icon" className="border border-border">
                        <Icon name="download" size="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="border border-border">
                        <Icon name="share" size="size-4" />
                    </Button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* --- LEFT COLUMN (60%) --- */}
            <div className="lg:col-span-7 space-y-6">
                
                {/* AI SUMMARY */}
                <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Icon name="sparkles" className="text-primary" /> Resumo da IA
                            </CardTitle>
                            <Badge variant="success" className="font-mono text-[10px]">Confiança: Alta</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-foreground/90 leading-relaxed font-serif">
                            O lead demonstra <strong>alta intenção de compra</strong>, motivado principalmente por dores operacionais (processo manual). Mencionou preocupação com preço (budget) e integração técnica. O decisor parece ser o próprio Carlos. A consultora Amanda contornou bem a objeção de preço focando em ROI.
                        </p>
                    </CardContent>
                </Card>

                {/* TRANSCRIPTION */}
                <Card className="flex flex-col h-[600px] border-border">
                    <CardHeader className="pb-4 border-b border-border bg-muted/10 flex flex-row justify-between items-center">
                        <CardTitle className="text-base font-bold uppercase tracking-widest">Transcrição</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-7 text-xs"><Icon name="search" size="size-3" className="mr-1"/> Buscar</Button>
                        </div>
                    </CardHeader>
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-6">
                            {transcription.map((line, i) => (
                                <div key={i} className={cn("flex gap-4 group", line.speaker === 'rep' ? "flex-row-reverse" : "")}>
                                    <div className="flex flex-col items-center gap-1 shrink-0">
                                        <Avatar className="h-8 w-8 mt-1 border border-border">
                                            {line.speaker === 'rep' ? (
                                                <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                                            ) : (
                                                <div className="w-full h-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">CS</div>
                                            )}
                                        </Avatar>
                                        <span className="text-[10px] font-mono text-muted-foreground">{line.time}</span>
                                    </div>
                                    <div className={cn(
                                        "flex flex-col max-w-[80%]",
                                        line.speaker === 'rep' ? "items-end" : "items-start"
                                    )}>
                                        <div className={cn(
                                            "p-3 rounded-2xl text-sm font-serif leading-relaxed relative",
                                            line.speaker === 'rep' 
                                                ? "bg-primary/10 text-foreground rounded-tr-sm" 
                                                : "bg-muted/30 text-foreground rounded-tl-sm",
                                            line.highlight === 'objection' && "border border-destructive/30 bg-destructive/5",
                                            line.highlight === 'pain' && "border border-brand-orange/30 bg-brand-orange/5",
                                            line.highlight === 'value' && "border border-brand-green/30 bg-brand-green/5"
                                        )}>
                                            {line.text}
                                            
                                            {/* Highlight Badge */}
                                            {line.highlight && (
                                                <div className="absolute -top-2.5 right-2">
                                                    {line.highlight === 'objection' && <Badge variant="destructive" className="h-5 text-[9px] px-1.5 shadow-sm">Objeção</Badge>}
                                                    {line.highlight === 'pain' && <Badge variant="warning" className="h-5 text-[9px] px-1.5 shadow-sm">Dor</Badge>}
                                                    {line.highlight === 'value' && <Badge variant="success" className="h-5 text-[9px] px-1.5 shadow-sm">Valor</Badge>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>

            </div>

            {/* --- RIGHT COLUMN (40%) --- */}
            <div className="lg:col-span-5 space-y-6">
                
                {/* OBJECTIONS CARD */}
                <Card>
                    <CardHeader className="py-4 border-b border-border">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Icon name="shield-exclamation" className="text-destructive" /> Objeções Identificadas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            <div className="p-4 hover:bg-muted/20 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">Preço / Budget</span>
                                    <Badge variant="destructive" className="text-[10px] h-5">Alta</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground italic line-clamp-2">"Tenho receio de ser muito caro para o momento."</p>
                                <div className="mt-2 flex items-center gap-1 text-[10px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon name="play" size="size-3" /> Ver na transcrição (03:10)
                                </div>
                            </div>
                            <div className="p-4 hover:bg-muted/20 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">Integração Técnica</span>
                                    <Badge variant="warning" className="text-[10px] h-5">Média</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground italic line-clamp-2">"Preciso ver se integra com o ActiveCampaign."</p>
                                <div className="mt-2 flex items-center gap-1 text-[10px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon name="play" size="size-3" /> Ver na transcrição (05:00)
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PRODUCT FIT */}
                <Card>
                    <CardHeader className="py-4 border-b border-border">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Icon name="target" className="text-brand-blue" /> Fit com Produtos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Plano Enterprise</span>
                                <span className="font-mono font-bold text-brand-green">95%</span>
                            </div>
                            <Progress value={95} className="h-2" />
                            <p className="text-xs text-muted-foreground">Match por: Tamanho equipe, Necessidade customização.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Plano Pro</span>
                                <span className="font-mono font-bold text-brand-yellow">40%</span>
                            </div>
                            <Progress value={40} className="h-2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Consultoria Avulsa</span>
                                <span className="font-mono font-bold text-muted-foreground">15%</span>
                            </div>
                            <Progress value={15} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                {/* NEXT STEPS */}
                <Card>
                    <CardHeader className="py-4 border-b border-border">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Icon name="list-check" className="text-brand-green" /> Próximos Passos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            <div className="p-4 flex items-start gap-3">
                                <div className="mt-0.5 w-4 h-4 border-2 border-muted-foreground rounded-sm"></div>
                                <div>
                                    <p className="text-sm font-medium">Enviar documentação API</p>
                                    <p className="text-xs text-muted-foreground mt-1 font-mono text-brand-orange">Até: Hoje, 18:00</p>
                                </div>
                            </div>
                            <div className="p-4 flex items-start gap-3">
                                <div className="mt-0.5 w-4 h-4 border-2 border-muted-foreground rounded-sm"></div>
                                <div>
                                    <p className="text-sm font-medium">Agendar reunião técnica</p>
                                    <p className="text-xs text-muted-foreground mt-1">Sugerido: CTO</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PAIN POINTS */}
                <Card>
                    <CardHeader className="py-4 border-b border-border">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Icon name="pulse" className="text-brand-orange" /> Dores do Cliente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="px-3 py-1 text-xs">Processo Manual <span className="ml-1 opacity-50 text-[10px]">x3</span></Badge>
                            <Badge variant="secondary" className="px-3 py-1 text-xs">Perda de Tempo</Badge>
                            <Badge variant="secondary" className="px-3 py-1 text-xs">Falta de Visibilidade</Badge>
                            <Badge variant="secondary" className="px-3 py-1 text-xs">Silos de Dados</Badge>
                            <Badge variant="secondary" className="px-3 py-1 text-xs">Equipe Ociosa</Badge>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>

      </main>

      {/* --- FOOTER ACTIONS --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40 md:pl-64 transition-all duration-300">
          <div className="max-w-[1920px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <a href="#" className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-2 transition-colors">
                      <Icon name="flag" size="size-3" /> Reportar erro na transcrição
                  </a>
              </div>
              <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                      <Icon name="check-square" size="size-4" /> Criar Task (Asana)
                  </Button>
                  <Button className="gap-2 shadow-lg shadow-primary/20">
                      <Icon name="refresh" size="size-4" /> Atualizar CRM
                  </Button>
              </div>
          </div>
      </footer>

    </div>
  );
};

export default SalesCallDetailsTemplate;
