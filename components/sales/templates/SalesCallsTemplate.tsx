
import React, { useState } from 'react';
import SalesTopbar from '../SalesTopbar';
import { Section } from '../../../types';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Select } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '../../ui/pagination';
import { Progress } from '../../ui/progress';
import { cn } from '../../../lib/utils';

// Mock Data
const callsData = [
  { id: '1', date: '24/10 14:30', duration: '42m', rep: 'Amanda L.', repAvatar: 'https://i.pravatar.cc/150?u=1', lead: 'TechCorp SA', type: 'Discovery', objections: 2, fitScore: 88, status: 'Qualified', processing: 'done' },
  { id: '2', date: '24/10 13:15', duration: '15m', rep: 'Roberto F.', repAvatar: 'https://i.pravatar.cc/150?u=2', lead: 'Varejo Bom', type: 'Demo', objections: 5, fitScore: 32, status: 'Lost', processing: 'done' },
  { id: '3', date: '24/10 11:00', duration: '55m', rep: 'Amanda L.', repAvatar: 'https://i.pravatar.cc/150?u=1', lead: 'Startup One', type: 'Closing', objections: 0, fitScore: 95, status: 'Won', processing: 'done' },
  { id: '4', date: '23/10 16:45', duration: '28m', rep: 'Carla M.', repAvatar: 'https://i.pravatar.cc/150?u=3', lead: 'LogiTransport', type: 'Follow-up', objections: 1, fitScore: 65, status: 'Scheduled', processing: 'processing' },
  { id: '5', date: '23/10 15:20', duration: '33m', rep: 'Roberto F.', repAvatar: 'https://i.pravatar.cc/150?u=2', lead: 'FinGroup', type: 'Discovery', objections: 3, fitScore: 78, status: 'Negotiation', processing: 'done' },
  { id: '6', date: '23/10 10:00', duration: '21m', rep: 'Carla M.', repAvatar: 'https://i.pravatar.cc/150?u=3', lead: 'AgroTech', type: 'Discovery', objections: 0, fitScore: 45, status: 'Lost', processing: 'error' },
  { id: '7', date: '22/10 14:00', duration: '60m', rep: 'Amanda L.', repAvatar: 'https://i.pravatar.cc/150?u=1', lead: 'HealthPlus', type: 'Demo', objections: 1, fitScore: 92, status: 'Negotiation', processing: 'done' },
  { id: '8', date: '22/10 09:30', duration: '12m', rep: 'Roberto F.', repAvatar: 'https://i.pravatar.cc/150?u=2', lead: 'EduSystem', type: 'Cold Call', objections: 4, fitScore: 20, status: 'Lost', processing: 'done' },
];

const SalesCallsTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const getProcessingBadge = (status: string) => {
      switch(status) {
          case 'processing': 
            return <Badge variant="outline" className="text-[10px] bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20 animate-pulse">Processando</Badge>;
          case 'error':
            return <Badge variant="outline" className="text-[10px] bg-destructive/10 text-destructive border-destructive/20">Erro</Badge>;
          default:
            return <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">Concluído</Badge>;
      }
  }

  const getStatusBadge = (status: string) => {
      const s = status.toLowerCase();
      let className = "text-[10px] h-5 px-1.5 uppercase font-bold border-transparent";
      
      if (s === 'won') className += " bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20";
      else if (s === 'lost') className += " bg-muted text-muted-foreground border-border";
      else if (s === 'qualified') className += " bg-success/10 text-success border-success/20";
      else className += " bg-brand-blue/10 text-brand-blue border-brand-blue/20"; // Scheduled/Negotiation

      return <Badge variant="outline" className={className}>{status}</Badge>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_CALLS} setSection={setSection} />

      <main className="p-6 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Calls Capturadas</h2>
                <Badge variant="secondary" className="font-mono rounded-sm px-2 text-xs">1,284</Badge>
            </div>
            <Button 
                variant={filtersExpanded ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="gap-2"
            >
                <Icon name="filter" size="size-4" />
                {filtersExpanded ? "Ocultar Filtros" : "Mostrar Filtros"}
            </Button>
        </div>

        {/* --- FILTER BAR --- */}
        {filtersExpanded && (
            <Card className="border-border shadow-sm rounded-sm animate-accordion-down">
                <div className="p-4 space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-center">
                        
                        {/* Period */}
                        <div className="w-full lg:w-48 space-y-1.5">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Período</span>
                            <Select 
                                placeholder="Últimos 7 dias"
                                options={[
                                    {label: 'Hoje', value: 'today'},
                                    {label: 'Últimos 7 dias', value: '7d'},
                                    {label: 'Este Mês', value: 'month'},
                                ]}
                            />
                        </div>

                        {/* Consultant */}
                        <div className="w-full lg:w-48 space-y-1.5">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Consultor</span>
                            <Select 
                                placeholder="Todos"
                                options={[
                                    {label: 'Todos', value: 'all'},
                                    {label: 'Amanda L.', value: 'amanda'},
                                    {label: 'Roberto F.', value: 'roberto'},
                                ]}
                            />
                        </div>

                        {/* Type Toggle */}
                        <div className="space-y-1.5 flex-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Tipo de Call</span>
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">Discovery</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">Demo</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">Closing</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">Follow-up</Badge>
                            </div>
                        </div>

                        {/* Search & Actions */}
                        <div className="flex gap-2 w-full lg:w-auto mt-2 lg:mt-0">
                            <div className="relative flex-1 lg:w-64">
                                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                                <Input placeholder="Buscar por Lead ou Empresa..." className="pl-10 h-10 rounded-sm bg-background" />
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-destructive">
                                <Icon name="trash" size="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        )}

        {/* --- DATA TABLE --- */}
        <Card className="border-border rounded-sm overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[140px] font-bold text-xs uppercase tracking-wider text-muted-foreground cursor-pointer group">
                            Data/Hora <Icon name="sort-alt" className="inline ml-1 opacity-50 group-hover:opacity-100" size="size-3" />
                        </TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Consultor</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Lead / Empresa</TableHead>
                        <TableHead className="w-[100px] font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">Proc.</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Tipo</TableHead>
                        <TableHead className="w-[100px] font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">Objeções</TableHead>
                        <TableHead className="w-[180px] font-bold text-xs uppercase tracking-wider text-muted-foreground">Fit Score</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {callsData.map((call) => (
                        <TableRow 
                            key={call.id} 
                            className="hover:bg-muted/20 transition-colors group h-16 cursor-pointer" 
                            onClick={() => setSection(Section.TEMPLATE_SALES_CALL_DETAILS)}
                        >
                            <TableCell className="font-mono text-xs text-muted-foreground">
                                {call.date}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar size="sm" className="h-6 w-6">
                                        <AvatarImage src={call.repAvatar} />
                                        <AvatarFallback>{call.rep.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{call.rep}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-bold text-sm text-foreground">{call.lead}</span>
                            </TableCell>
                            <TableCell className="text-center font-mono text-xs">
                                {getProcessingBadge(call.processing)}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="font-normal bg-background/50 rounded-sm">
                                    {call.type}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                                {call.objections > 0 ? (
                                    <Badge variant="destructive" className="h-5 px-1.5 cursor-pointer hover:bg-destructive/80">
                                        {call.objections}
                                    </Badge>
                                ) : (
                                    <span className="text-muted-foreground/30">-</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Progress value={call.fitScore} className="h-2" />
                                    <span className={cn(
                                        "text-xs font-mono font-bold w-8 text-right",
                                        call.fitScore > 80 ? "text-success" : call.fitScore < 50 ? "text-destructive" : "text-brand-yellow"
                                    )}>{call.fitScore}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                {getStatusBadge(call.status)}
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSection(Section.TEMPLATE_SALES_CALL_DETAILS);
                                    }}
                                >
                                    <Icon name="eye" size="size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* --- FOOTER PAGINATION --- */}
            <div className="p-4 border-t border-border bg-card/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground">
                    Mostrando <strong>1-8</strong> de <strong>1,284</strong> calls
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground hidden sm:inline">Itens por página:</span>
                        <Select 
                            placeholder="10" 
                            options={[{label: '10', value: '10'}, {label: '20', value: '20'}, {label: '50', value: '50'}]}
                            className="w-[70px] h-8 text-xs"
                        />
                    </div>
                    
                    <Pagination className="justify-end w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" size="sm" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive size="sm">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" size="sm">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" size="sm">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" size="sm" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </Card>

      </main>
    </div>
  );
};

export default SalesCallsTemplate;
