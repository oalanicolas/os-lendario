
import React, { useState } from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Select } from '../../ui/select';
import { Input } from '../../ui/input';
import { Switch } from '../../ui/switch';
import { Textarea } from '../../ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { cn } from '../../../lib/utils';

const SalesSettingsTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [activeTab, setActiveTab] = useState("integrations");

  // Mock Data: Integrations
  const integrations = [
    { name: "Bluedot", status: "connected", lastSync: "2 min atrás", icon: "microphone" },
    { name: "N8N", status: "connected", lastSync: "15 min atrás", icon: "network-cloud" },
    { name: "Gemini", status: "connected", lastSync: "5 min atrás", icon: "sparkles" },
    { name: "Supabase", status: "connected", lastSync: "Agora", icon: "database" },
    { name: "ActiveCampaign", status: "error", lastSync: "2 dias atrás", icon: "envelope" },
    { name: "ClickUp", status: "connected", lastSync: "1 hora atrás", icon: "check-square" },
    { name: "Notion", status: "pending", lastSync: "-", icon: "document" },
  ];

  // Mock Data: Team
  const team = [
    { name: "Alan Nicolas", email: "alan@legends.co", calls: 142, active: true },
    { name: "Amanda L.", email: "amanda@legends.co", calls: 98, active: true },
    { name: "Roberto F.", email: "roberto@legends.co", calls: 85, active: true },
    { name: "Carla M.", email: "carla@legends.co", calls: 0, active: false },
  ];

  // Mock Data: Logs
  const logs = [
    { time: "14:32:01", type: "info", msg: "Webhook recebido de Bluedot." },
    { time: "14:32:05", type: "info", msg: "Transcrição processada. 423 tokens." },
    { time: "14:32:10", type: "warning", msg: "ActiveCampaign timeout. Retrying..." },
    { time: "14:35:00", type: "error", msg: "Falha ao atualizar contato ID #992." },
  ];

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'connected': return "text-success border-success/20 bg-success/10";
          case 'error': return "text-destructive border-destructive/20 bg-destructive/10";
          case 'pending': return "text-muted-foreground border-border bg-muted/10";
          default: return "text-muted-foreground";
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_SETTINGS} setSection={setSection} />

      <main className="p-6 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
        
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Configurações</h2>
                <p className="text-muted-foreground font-serif">Gerencie as conexões e o comportamento da IA.</p>
            </div>
            <div className="flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
                <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                </div>
                <div className="text-sm">
                    <p className="font-bold leading-none">Sistema Operacional</p>
                    <p className="text-[10px] text-muted-foreground">Uptime: 99.9%</p>
                </div>
            </div>
        </div>

        {/* --- MAIN TABS --- */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card border border-border p-1 h-auto w-full justify-start overflow-x-auto">
                <TabsTrigger value="integrations" className="gap-2"> <Icon name="plug" size="size-4"/> Integrações</TabsTrigger>
                <TabsTrigger value="ai" className="gap-2"> <Icon name="brain" size="size-4"/> Classificação & Prompts</TabsTrigger>
                <TabsTrigger value="distribution" className="gap-2"> <Icon name="share" size="size-4"/> Distribuição</TabsTrigger>
                <TabsTrigger value="team" className="gap-2"> <Icon name="users-alt" size="size-4"/> Time</TabsTrigger>
                <TabsTrigger value="objections" className="gap-2"> <Icon name="shield-exclamation" size="size-4"/> Categorias</TabsTrigger>
                <TabsTrigger value="logs" className="gap-2"> <Icon name="terminal" size="size-4"/> Logs</TabsTrigger>
            </TabsList>

            {/* 1. INTEGRATIONS */}
            <TabsContent value="integrations" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {integrations.map((app, i) => (
                        <Card key={i} className="flex flex-col justify-between">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                            <Icon name={app.icon} size="size-5" />
                                        </div>
                                        <CardTitle className="text-base">{app.name}</CardTitle>
                                    </div>
                                    <Badge variant="outline" className={cn("capitalize font-mono text-[10px]", getStatusColor(app.status))}>
                                        {app.status === 'connected' ? 'Conectado' : app.status === 'error' ? 'Erro' : 'Pendente'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground mb-4 font-mono">Última sync: {app.lastSync}</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="w-full text-xs h-8">Testar</Button>
                                    <Button variant="ghost" size="sm" className="w-full text-xs h-8 text-muted-foreground hover:text-foreground">Reconfigurar</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            {/* 2. AI & PROMPTS */}
            <TabsContent value="ai" className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-base">Prompt do Analista</CardTitle>
                                    <Select 
                                        className="w-[140px] h-8 text-xs" 
                                        options={[
                                            { label: 'Gemini 1.5 Pro', value: 'gemini' },
                                            { label: 'GPT-4 Turbo', value: 'gpt4' },
                                            { label: 'Claude 3.5 Sonnet', value: 'claude' }
                                        ]}
                                        value="gemini"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea 
                                    className="font-mono text-xs h-96 bg-muted/20 resize-none leading-relaxed"
                                    defaultValue={`You are an expert Sales Analyst AI. Your goal is to extract key insights from sales calls.

Output Format: JSON
{
  "summary": "3 sentences summary",
  "sentiment": "positive" | "neutral" | "negative",
  "score": 0-100,
  "objections": [
    { "type": "price", "snippet": "..." }
  ],
  "next_steps": ["..."]
}

Constraints:
- Be concise.
- Focus on commercial intent.
- Ignore small talk.`}
                                />
                                <div className="flex justify-between">
                                    <Button variant="outline" size="sm"><Icon name="refresh" className="mr-2 size-3"/> Restaurar Padrão</Button>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm"><Icon name="play" className="mr-2 size-3"/> Testar com Exemplo</Button>
                                        <Button size="sm">Salvar Alterações</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle className="text-sm">Métricas do Modelo</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Precisão Estimada</span>
                                    <span className="font-bold text-success">94.2%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Custo Médio / Call</span>
                                    <span className="font-mono">R$ 0,12</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Latência Média</span>
                                    <span className="font-mono">4.2s</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="text-sm">Histórico de Versões</CardTitle></CardHeader>
                            <div className="px-2">
                                <Accordion type="single" collapsible className="w-full">
                                    {[1, 2, 3].map((v) => (
                                        <AccordionItem key={v} value={`v${v}`} className="border-border">
                                            <AccordionTrigger className="text-xs py-2 px-2 hover:bg-muted/50 rounded">
                                                <div className="flex justify-between w-full pr-4">
                                                    <span>v1.{5-v} (Atual)</span>
                                                    <span className="text-muted-foreground font-mono">24 Out</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-xs text-muted-foreground px-2">
                                                Alteração no prompt de objeções para capturar nuances de preço.
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            {/* 3. AUTOMATIC DISTRIBUTION */}
            <TabsContent value="distribution" className="animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Regras de Distribuição</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 divide-y divide-border">
                        
                        {/* ActiveCampaign */}
                        <div className="pt-6 first:pt-0 flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Icon name="envelope" className="text-primary" />
                                    <h4 className="font-bold text-sm">ActiveCampaign</h4>
                                </div>
                                <p className="text-xs text-muted-foreground max-w-md">
                                    Atualiza campos personalizados do contato e adiciona tags baseadas no status da call.
                                </p>
                                <div className="mt-2 text-xs font-mono bg-muted/30 p-2 rounded border border-border inline-block">
                                    Campos: ai_score, ai_summary, last_call_sentiment
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>

                        {/* ClickUp */}
                        <div className="pt-6 flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Icon name="check-square" className="text-brand-purple" />
                                    <h4 className="font-bold text-sm">ClickUp</h4>
                                </div>
                                <p className="text-xs text-muted-foreground max-w-md">
                                    Cria tarefas automáticas para o time de marketing quando "Objeção de Conteúdo" é detectada.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs">Lista de Destino:</span>
                                    <Select 
                                        className="w-[180px] h-7 text-xs" 
                                        options={[{label: 'Marketing / Conteúdo', value: 'mkt'}]}
                                        value="mkt"
                                    />
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>

                        {/* Notion */}
                        <div className="pt-6 flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Icon name="document" className="text-foreground" />
                                    <h4 className="font-bold text-sm">Notion</h4>
                                </div>
                                <p className="text-xs text-muted-foreground max-w-md">
                                    Salva o resumo e transcrição em uma base de conhecimento.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs">Database:</span>
                                    <Select 
                                        className="w-[180px] h-7 text-xs" 
                                        options={[{label: 'Sales Calls Knowledge', value: 'db'}]}
                                        value="db"
                                    />
                                </div>
                            </div>
                            <Switch />
                        </div>

                    </CardContent>
                </Card>
            </TabsContent>

            {/* 4. SALES TEAM */}
            <TabsContent value="team" className="animate-fade-in">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Consultores Ativos</CardTitle>
                        <Button size="sm" className="gap-2"><Icon name="plus" size="size-3"/> Adicionar Consultor</Button>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Consultor</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Calls (Mês)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {team.map((member, i) => (
                                <TableRow key={i}>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                            <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-sm">{member.name}</span>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{member.email}</TableCell>
                                    <TableCell className="font-mono text-sm">{member.calls}</TableCell>
                                    <TableCell>
                                        <Switch checked={member.active} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="pencil" size="size-3"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>

            {/* 5. CATEGORIES (Drag n Drop Sim) */}
            <TabsContent value="objections" className="animate-fade-in">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Categorias de Objeção</CardTitle>
                        <Button size="sm" variant="outline" className="gap-2"><Icon name="plus" size="size-3"/> Nova Categoria</Button>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            { name: "Preço / Budget", desc: "Cliente acha caro ou não tem verba." },
                            { name: "Concorrência", desc: "Cliente cita competidor direto." },
                            { name: "Autoridade / Confiança", desc: "Cliente não conhece a marca." },
                            { name: "Timing", desc: "Cliente quer deixar para depois." },
                            { name: "Decisor", desc: "Precisa falar com sócio/diretor." }
                        ].map((cat, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors group">
                                <Icon name="menu-burger" className="text-muted-foreground cursor-grab opacity-50 hover:opacity-100" size="size-4" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{cat.name}</p>
                                    <p className="text-xs text-muted-foreground">{cat.desc}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="pencil" size="size-3"/></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Icon name="trash" size="size-3"/></Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* 6. LOGS */}
            <TabsContent value="logs" className="animate-fade-in">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between py-4">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="cursor-pointer bg-muted">All</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Info</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Warning</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Error</Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 gap-2"><Icon name="download" size="size-3"/> Exportar CSV</Button>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Timestamp</TableHead>
                                <TableHead className="w-[100px]">Tipo</TableHead>
                                <TableHead>Mensagem</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log, i) => (
                                <TableRow key={i} className="font-mono text-xs">
                                    <TableCell className="text-muted-foreground">{log.time}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "uppercase font-bold",
                                            log.type === 'info' ? "text-blue-400" : 
                                            log.type === 'warning' ? "text-yellow-400" : "text-red-400"
                                        )}>
                                            {log.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>{log.msg}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>

        </Tabs>

      </main>
    </div>
  );
};

export default SalesSettingsTemplate;
