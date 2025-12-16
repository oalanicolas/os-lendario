
import React, { useState } from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Select } from '../../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { cn } from '../../../lib/utils';

const SalesProductTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [period, setPeriod] = useState("30d");

  // Mock Data: Feature Requests
  const featureRequests = [
    { id: 1, label: "Integração WhatsApp Nativa", count: 87, roadmap: false },
    { id: 2, label: "Dashboard Financeiro Customizável", count: 64, roadmap: true },
    { id: 3, label: "App Mobile (iOS/Android)", count: 52, roadmap: false },
    { id: 4, label: "Relatórios Exportáveis em PDF", count: 45, roadmap: true },
    { id: 5, label: "Múltiplos Usuários (Permissions)", count: 30, roadmap: true },
  ];

  // Mock Data: Backlog
  const backlog = [
    { id: "B-101", title: "Integração WhatsApp API Oficial", score: 98, calls: 42, priority: "Crítica" },
    { id: "B-105", title: "Melhoria UX no Onboarding", score: 85, calls: 28, priority: "Alta" },
    { id: "B-112", title: "Dark Mode no App Cliente", score: 72, calls: 15, priority: "Média" },
  ];

  // Mock Data: Competitors
  const competitors = [
    { name: "Competidor X", context: "Preço menor (-30%)", freq: 45, sentiment: "negative" },
    { name: "SaaS Y", context: "Tem feature de chat", freq: 28, sentiment: "neutral" },
    { name: "Ferramenta Z", context: "UX considerada complexa", freq: 12, sentiment: "positive" },
  ];

  const maxFeatureCount = Math.max(...featureRequests.map(f => f.count));

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_PRODUCT} setSection={setSection} />

      <main className="p-6 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Painel Produto</h2>
                <div className="h-6 w-px bg-border hidden md:block"></div>
                <Select 
                    className="w-[180px]" 
                    placeholder="Todos os Produtos"
                    options={[
                        { label: "Todos os Produtos", value: "all" },
                        { label: "Comunidade", value: "community" },
                        { label: "Gestor IA", value: "manager" },
                        { label: "Formação", value: "course" },
                        { label: "Mastermind", value: "master" }
                    ]}
                />
            </div>
            
            <Tabs value={period} onValueChange={setPeriod} className="w-auto">
                <TabsList className="grid w-full grid-cols-3 h-9">
                    <TabsTrigger value="30d" className="text-xs">30d</TabsTrigger>
                    <TabsTrigger value="90d" className="text-xs">90d</TabsTrigger>
                    <TabsTrigger value="all" className="text-xs">Tudo</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        {/* --- ROW 1: METRICS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Card className="border-l-4 border-l-brand-blue bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                        Feature Requests
                        <Icon name="bulb" className="text-brand-blue" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-1 font-mono">142</div>
                    <p className="text-xs text-muted-foreground truncate" title="Top: Integração WhatsApp">
                        Top: <span className="font-semibold text-foreground">Integração WhatsApp</span>
                    </p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-destructive bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                        Frustrações
                        <Icon name="angry" className="text-destructive" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-1 font-mono">87</div>
                    <p className="text-xs text-muted-foreground truncate">
                        Principal: <span className="font-semibold text-foreground">Complexidade no Setup</span>
                    </p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-brand-green bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                        NPS Implícito (IA)
                        <Icon name="smile" className="text-brand-green" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-1 font-mono">68</div>
                    <p className="text-xs text-muted-foreground">
                        Baseado em sentimento de 1.2k calls
                    </p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-brand-purple bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                        Gaps de Funcionalidade
                        <Icon name="puzzle-piece" className="text-brand-purple" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-1 font-mono">12</div>
                    <p className="text-xs text-muted-foreground">
                        Funcionalidades críticas ausentes
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* --- ROW 2: BACKLOG SUGERIDO (NEW) --- */}
        <Card className="border-primary border shadow-md bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="py-4 px-6 border-b border-border flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-foreground">
                        <Icon name="sparkles" className="text-primary" /> Backlog Sugerido pela IA
                    </CardTitle>
                    <p className="text-[10px] text-muted-foreground">Priorização baseada em volume de pedidos × impacto na receita.</p>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-2 bg-background border-primary/30 text-primary hover:bg-primary/10">
                    <Icon name="download" size="size-3" /> Exportar CSV
                </Button>
            </CardHeader>
            <div className="p-0">
                <Table>
                    <TableHeader className="bg-muted/10">
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-xs font-bold w-[80px]">ID</TableHead>
                            <TableHead className="text-xs font-bold">Funcionalidade / Melhoria</TableHead>
                            <TableHead className="text-xs font-bold w-[120px]">Prioridade</TableHead>
                            <TableHead className="text-xs font-bold text-center w-[100px]">Score</TableHead>
                            <TableHead className="text-xs font-bold text-right w-[180px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {backlog.map((item) => (
                            <TableRow key={item.id} className="border-border hover:bg-muted/20 group">
                                <TableCell className="font-mono text-xs text-muted-foreground">{item.id}</TableCell>
                                <TableCell className="font-medium text-sm">
                                    {item.title}
                                    <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">Mencionado em {item.calls} calls recentes</span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.priority === 'Crítica' ? 'destructive' : item.priority === 'Alta' ? 'warning' : 'secondary'} className="text-[10px] h-5 px-1.5 font-bold uppercase">
                                        {item.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center font-mono font-bold text-sm text-primary">
                                    {item.score}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2">Ver Calls</Button>
                                        <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 gap-1 border-primary/30 hover:border-primary text-primary hover:bg-primary/10">
                                            <Icon name="plus" size="size-3" /> Notion
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>

        {/* --- ROW 3: SPLIT PANELS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Frustrations */}
            <Card className="flex flex-col h-[500px]">
                <CardHeader className="py-4 px-6 border-b border-border">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Icon name="frown" className="text-destructive" /> Frustrações e Atritos
                    </CardTitle>
                </CardHeader>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                    <Accordion type="single" collapsible className="space-y-2">
                        <AccordionItem value="onboarding" className="border border-border rounded-lg bg-card px-4">
                            <AccordionTrigger className="hover:no-underline py-3">
                                <div className="flex items-center gap-3">
                                    <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">8</Badge>
                                    <span className="text-sm font-semibold">Onboarding / Setup Inicial</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 space-y-3">
                                <div className="p-3 bg-muted/30 rounded text-xs font-serif italic text-muted-foreground border-l-2 border-destructive">
                                    "Achei muito confuso configurar a integração no começo, perdi 2 horas."
                                </div>
                                <div className="p-3 bg-muted/30 rounded text-xs font-serif italic text-muted-foreground border-l-2 border-destructive">
                                    "Não entendi onde coloco a chave de API, o tutorial estava desatualizado."
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="interface" className="border border-border rounded-lg bg-card px-4">
                            <AccordionTrigger className="hover:no-underline py-3">
                                <div className="flex items-center gap-3">
                                    <Badge variant="warning" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] text-black">5</Badge>
                                    <span className="text-sm font-semibold">Interface / UX</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 space-y-3">
                                <div className="p-3 bg-muted/30 rounded text-xs font-serif italic text-muted-foreground border-l-2 border-brand-yellow">
                                    "Muitos cliques para chegar no relatório final."
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="performance" className="border border-border rounded-lg bg-card px-4">
                            <AccordionTrigger className="hover:no-underline py-3">
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">3</Badge>
                                    <span className="text-sm font-semibold">Performance / Lentidão</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 space-y-3">
                                <div className="p-3 bg-muted/30 rounded text-xs font-serif italic text-muted-foreground">
                                    "O carregamento da lista de leads demora muito quando tem mais de 1000 itens."
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Card>

            {/* Right: Competitors */}
            <Card className="flex flex-col h-[500px]">
                <CardHeader className="py-4 px-6 border-b border-border">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Icon name="sword" className="text-brand-orange" /> Menções a Concorrentes
                    </CardTitle>
                </CardHeader>
                <div className="flex-1 p-0 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/10">
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="text-xs font-bold w-[120px]">Concorrente</TableHead>
                                <TableHead className="text-xs font-bold">Contexto Principal</TableHead>
                                <TableHead className="text-xs font-bold text-center w-[60px]">Freq.</TableHead>
                                <TableHead className="text-xs font-bold text-center w-[80px]">Sentimento</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {competitors.map((comp, i) => (
                                <TableRow key={i} className="border-border hover:bg-muted/20">
                                    <TableCell className="font-bold text-xs">{comp.name}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{comp.context}</TableCell>
                                    <TableCell className="text-center font-mono text-xs">{comp.freq}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={comp.sentiment === 'negative' ? 'destructive' : comp.sentiment === 'positive' ? 'success' : 'secondary'} className="text-[9px] h-5 px-1.5 uppercase">
                                            {comp.sentiment}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>

      </main>
    </div>
  );
};

export default SalesProductTemplate;
