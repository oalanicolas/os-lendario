
import React from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../../ui/dropdown-menu';

interface Props {
    setSection: (section: Section) => void;
}

const SalesDashboardTemplate: React.FC<Props> = ({ setSection }) => {
  // Mock Data
  const recentCalls = [
    { id: '1', time: '10:42', rep: 'Amanda L.', lead: 'TechCorp SA', type: 'Discovery', status: 'qualified', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', time: '10:15', rep: 'Roberto F.', lead: 'Varejo Bom', type: 'Demo', status: 'lost', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', time: '09:50', rep: 'Amanda L.', lead: 'Startup One', type: 'Closing', status: 'won', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '4', time: '09:10', rep: 'Carla M.', lead: 'LogiTransport', type: 'Follow-up', status: 'scheduled', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '5', time: '08:45', rep: 'Roberto F.', lead: 'FinGroup', type: 'Discovery', status: 'qualified', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '6', time: '08:30', rep: 'Carla M.', lead: 'AgroTech', type: 'Demo', status: 'negotiation', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '7', time: 'Ontem', rep: 'Amanda L.', lead: 'HealthPlus', type: 'Closing', status: 'won', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '8', time: 'Ontem', rep: 'Roberto F.', lead: 'EduSystem', type: 'Discovery', status: 'lost', avatar: 'https://i.pravatar.cc/150?u=2' },
  ];

  const topObjections = [
    { label: "Preço muito alto", count: 45, color: "bg-destructive" },
    { label: "Já tenho solução", count: 32, color: "bg-brand-orange" },
    { label: "Preciso falar com sócio", count: 28, color: "bg-brand-blue" },
    { label: "Sem budget agora", count: 15, color: "bg-muted-foreground" },
    { label: "Curiosidade apenas", count: 10, color: "bg-muted" },
  ];

  const timelineEvents = [
    { time: '10:45', icon: 'check-circle', color: 'text-success', text: 'Call finalizada com TechCorp (Qualificado)' },
    { time: '10:42', icon: 'shield-exclamation', color: 'text-brand-orange', text: 'Objeção detectada: Concorrente X' },
    { time: '10:30', icon: 'play-circle', color: 'text-primary', text: 'Roberto iniciou demo com Varejo Bom' },
    { time: '10:15', icon: 'envelope', color: 'text-muted-foreground', text: 'Email de follow-up enviado para LogiTransport' },
    { time: '09:55', icon: 'trophy', color: 'text-brand-indigo', text: 'Oportunidade ganha: Startup One (R$ 15k)' },
  ];

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'qualified': return <Badge variant="success" className="h-5 text-[10px]">Qualificado</Badge>;
          case 'lost': return <Badge variant="destructive" className="h-5 text-[10px]">Perdido</Badge>;
          case 'won': return <Badge variant="default" className="h-5 text-[10px] bg-brand-indigo hover:bg-brand-indigo/90">Ganho</Badge>;
          case 'negotiation': return <Badge variant="warning" className="h-5 text-[10px]">Negociação</Badge>;
          default: return <Badge variant="outline" className="h-5 text-[10px]">Agendado</Badge>;
      }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_DASHBOARD} setSection={setSection} />
      
      <main className="p-6 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Visão Geral</h2>
                <p className="text-muted-foreground font-serif">Acompanhamento em tempo real da operação.</p>
            </div>
            <div className="flex gap-2">
                <DropdownMenu 
                    trigger={
                        <Button variant="outline" size="sm" className="gap-2">
                            <Icon name="calendar" size="size-3" /> Hoje <Icon name="angle-small-down" size="size-3" />
                        </Button>
                    }
                    align="right"
                >
                    <DropdownMenuLabel>Período</DropdownMenuLabel>
                    <DropdownMenuItem>Hoje</DropdownMenuItem>
                    <DropdownMenuItem>Últimos 7 dias</DropdownMenuItem>
                    <DropdownMenuItem>Últimos 30 dias</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Personalizado...</DropdownMenuItem>
                </DropdownMenu>

                <Button size="sm" className="gap-2">
                    <Icon name="download" size="size-3" /> Exportar
                </Button>
            </div>
        </div>

        {/* --- KPI ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <Tooltip className="w-full">
                <TooltipTrigger className="w-full">
                    <Card className="border-border shadow-sm hover:border-primary/50 transition-colors cursor-help text-left w-full">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Calls Hoje</span>
                                <Icon name="headset" className="text-primary" size="size-4" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-foreground">124</span>
                                <Badge variant="success" className="h-5 text-[10px] px-1.5">+12%</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>Total de ligações realizadas hoje vs média.</TooltipContent>
            </Tooltip>

            {/* KPI 2 */}
            <Tooltip className="w-full">
                <TooltipTrigger className="w-full">
                    <Card className="border-border shadow-sm hover:border-primary/50 transition-colors cursor-help text-left w-full">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Taxa de Captura</span>
                                <Icon name="target" className="text-brand-blue" size="size-4" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-foreground">85%</span>
                                <span className="text-xs text-muted-foreground mb-1">Status: Bom</span>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>Leads qualificados sobre total de leads.</TooltipContent>
            </Tooltip>

            {/* KPI 3 */}
            <Tooltip className="w-full">
                <TooltipTrigger className="w-full">
                    <Card className="border-border shadow-sm hover:border-primary/50 transition-colors cursor-help text-left w-full">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Tempo Médio</span>
                                <Icon name="clock" className="text-brand-orange" size="size-4" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-foreground">4m 30s</span>
                                <span className="text-xs text-muted-foreground mb-1">Meta: 5m</span>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>Tempo médio de processamento por call.</TooltipContent>
            </Tooltip>

            {/* KPI 4 */}
            <Tooltip className="w-full">
                <TooltipTrigger className="w-full">
                    <Card className="border-border shadow-sm hover:border-primary/50 transition-colors cursor-help text-left w-full">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Objeções (Semana)</span>
                                <Icon name="shield-exclamation" className="text-destructive" size="size-4" />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-3xl font-bold text-foreground">34</span>
                                <div className="flex gap-1">
                                    <Badge variant="outline" className="text-[9px] h-4 px-1">Preço</Badge>
                                    <Badge variant="outline" className="text-[9px] h-4 px-1">Tempo</Badge>
                                    <Badge variant="outline" className="text-[9px] h-4 px-1">Concorrente</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>Total de objeções detectadas na semana.</TooltipContent>
            </Tooltip>
        </div>

        {/* --- MIDDLE SECTION (50/50) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT: Recent Calls */}
            <Card className="border-border flex flex-col h-[400px]">
                <CardHeader className="py-4 px-6 border-b border-border flex flex-row items-center justify-between shrink-0">
                    <CardTitle className="text-base font-bold uppercase tracking-widest flex items-center gap-2">
                        <Icon name="phone-call" className="text-primary" /> Calls Recentes
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setSection(Section.TEMPLATE_SALES_CALLS)}>Ver Todas</Button>
                </CardHeader>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    <div className="space-y-1">
                        {recentCalls.map((call) => (
                            <div 
                                key={call.id} 
                                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-border/50"
                                onClick={() => setSection(Section.TEMPLATE_SALES_CALL_DETAILS)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-muted-foreground w-10">{call.time}</span>
                                    <Avatar size="sm" className="h-8 w-8">
                                        <AvatarImage src={call.avatar} />
                                        <AvatarFallback>{call.rep.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{call.lead}</span>
                                        <span className="text-[10px] text-muted-foreground">{call.rep} • {call.type}</span>
                                    </div>
                                </div>
                                <div>
                                    {getStatusBadge(call.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* RIGHT: Top Objections */}
            <Card className="border-border flex flex-col h-[400px]">
                <CardHeader className="py-4 px-6 border-b border-border flex flex-row items-center justify-between shrink-0">
                    <CardTitle className="text-base font-bold uppercase tracking-widest flex items-center gap-2">
                        <Icon name="chart-histogram" className="text-brand-indigo" /> Top Objeções
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setSection(Section.TEMPLATE_SALES_OBJECTIONS)}>Detalhes</Button>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center p-6 gap-6">
                    {topObjections.map((obj, i) => {
                        const max = Math.max(...topObjections.map(o => o.count));
                        const width = (obj.count / max) * 100;
                        
                        return (
                            <div key={i} className="group cursor-pointer">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">{obj.label}</span>
                                    <span className="font-mono font-bold text-muted-foreground">{obj.count}</span>
                                </div>
                                <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${obj.color} rounded-full transition-all duration-500 ease-out group-hover:opacity-80`} 
                                      style={{ width: `${width}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>

        {/* --- BOTTOM: TIMELINE --- */}
        <Card className="border-border">
            <CardHeader className="py-4 px-6 border-b border-border">
                <CardTitle className="text-base font-bold uppercase tracking-widest flex items-center gap-2">
                    <Icon name="activity" className="text-brand-blue" /> Timeline de Atividade
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="relative pl-4 border-l border-border space-y-8">
                    {timelineEvents.map((event, i) => (
                        <div key={i} className="relative group">
                            {/* Dot */}
                            <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-background ${event.color.replace('text-', 'bg-')} ring-2 ring-transparent group-hover:ring-primary/20 transition-all`}></div>
                            
                            <div className="flex items-start gap-4">
                                <span className="text-xs font-mono text-muted-foreground mt-0.5 w-10">{event.time}</span>
                                <div className="flex items-start gap-2">
                                    <Icon name={event.icon} className={`mt-0.5 size-4 ${event.color}`} />
                                    <p className="text-sm text-foreground">{event.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default SalesDashboardTemplate;
