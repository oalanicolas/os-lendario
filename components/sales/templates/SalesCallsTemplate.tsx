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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '../../ui/pagination';
import { Progress } from '../../ui/progress';
import { cn } from '../../../lib/utils';

// Mock Data
const callsData = [
  {
    id: '1',
    date: '24/10 14:30',
    duration: '42m',
    rep: 'Amanda L.',
    repAvatar: 'https://i.pravatar.cc/150?u=1',
    lead: 'TechCorp SA',
    type: 'Discovery',
    objections: 2,
    fitScore: 88,
    status: 'Qualified',
    processing: 'done',
  },
  {
    id: '2',
    date: '24/10 13:15',
    duration: '15m',
    rep: 'Roberto F.',
    repAvatar: 'https://i.pravatar.cc/150?u=2',
    lead: 'Varejo Bom',
    type: 'Demo',
    objections: 5,
    fitScore: 32,
    status: 'Lost',
    processing: 'done',
  },
  {
    id: '3',
    date: '24/10 11:00',
    duration: '55m',
    rep: 'Amanda L.',
    repAvatar: 'https://i.pravatar.cc/150?u=1',
    lead: 'Startup One',
    type: 'Closing',
    objections: 0,
    fitScore: 95,
    status: 'Won',
    processing: 'done',
  },
  {
    id: '4',
    date: '23/10 16:45',
    duration: '28m',
    rep: 'Carla M.',
    repAvatar: 'https://i.pravatar.cc/150?u=3',
    lead: 'LogiTransport',
    type: 'Follow-up',
    objections: 1,
    fitScore: 65,
    status: 'Scheduled',
    processing: 'processing',
  },
  {
    id: '5',
    date: '23/10 15:20',
    duration: '33m',
    rep: 'Roberto F.',
    repAvatar: 'https://i.pravatar.cc/150?u=2',
    lead: 'FinGroup',
    type: 'Discovery',
    objections: 3,
    fitScore: 78,
    status: 'Negotiation',
    processing: 'done',
  },
  {
    id: '6',
    date: '23/10 10:00',
    duration: '21m',
    rep: 'Carla M.',
    repAvatar: 'https://i.pravatar.cc/150?u=3',
    lead: 'AgroTech',
    type: 'Discovery',
    objections: 0,
    fitScore: 45,
    status: 'Lost',
    processing: 'error',
  },
  {
    id: '7',
    date: '22/10 14:00',
    duration: '60m',
    rep: 'Amanda L.',
    repAvatar: 'https://i.pravatar.cc/150?u=1',
    lead: 'HealthPlus',
    type: 'Demo',
    objections: 1,
    fitScore: 92,
    status: 'Negotiation',
    processing: 'done',
  },
  {
    id: '8',
    date: '22/10 09:30',
    duration: '12m',
    rep: 'Roberto F.',
    repAvatar: 'https://i.pravatar.cc/150?u=2',
    lead: 'EduSystem',
    type: 'Cold Call',
    objections: 4,
    fitScore: 20,
    status: 'Lost',
    processing: 'done',
  },
];

const SalesCallsTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const getProcessingBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return (
          <Badge
            variant="outline"
            className="animate-pulse border-brand-yellow/20 bg-brand-yellow/10 text-[10px] text-brand-yellow"
          >
            Processando
          </Badge>
        );
      case 'error':
        return (
          <Badge
            variant="outline"
            className="border-destructive/20 bg-destructive/10 text-[10px] text-destructive"
          >
            Erro
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-success/10 text-success border-success/20 text-[10px]"
          >
            Concluído
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    let className = 'text-[10px] h-5 px-1.5 uppercase font-bold border-transparent';

    if (s === 'won') className += ' bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20';
    else if (s === 'lost') className += ' bg-muted text-muted-foreground border-border';
    else if (s === 'qualified') className += ' bg-success/10 text-success border-success/20';
    else className += ' bg-brand-blue/10 text-brand-blue border-brand-blue/20'; // Scheduled/Negotiation

    return (
      <Badge variant="outline" className={className}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_CALLS} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Calls Capturadas</h2>
            <Badge variant="secondary" className="rounded-sm px-2 font-mono text-xs">
              1,284
            </Badge>
          </div>
          <Button
            variant={filtersExpanded ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="gap-2"
          >
            <Icon name="filter" size="size-4" />
            {filtersExpanded ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
        </div>

        {/* --- FILTER BAR --- */}
        {filtersExpanded && (
          <Card className="animate-accordion-down rounded-sm border-border shadow-sm">
            <div className="space-y-4 p-4">
              <div className="flex flex-col items-end gap-4 lg:flex-row lg:items-center">
                {/* Period */}
                <div className="w-full space-y-1.5 lg:w-48">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Período
                  </span>
                  <Select
                    placeholder="Últimos 7 dias"
                    options={[
                      { label: 'Hoje', value: 'today' },
                      { label: 'Últimos 7 dias', value: '7d' },
                      { label: 'Este Mês', value: 'month' },
                    ]}
                  />
                </div>

                {/* Consultant */}
                <div className="w-full space-y-1.5 lg:w-48">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Consultor
                  </span>
                  <Select
                    placeholder="Todos"
                    options={[
                      { label: 'Todos', value: 'all' },
                      { label: 'Amanda L.', value: 'amanda' },
                      { label: 'Roberto F.', value: 'roberto' },
                    ]}
                  />
                </div>

                {/* Type Toggle */}
                <div className="flex-1 space-y-1.5">
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Tipo de Call
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      Discovery
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      Demo
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      Closing
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      Follow-up
                    </Badge>
                  </div>
                </div>

                {/* Search & Actions */}
                <div className="mt-2 flex w-full gap-2 lg:mt-0 lg:w-auto">
                  <div className="relative flex-1 lg:w-64">
                    <Icon
                      name="search"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      size="size-4"
                    />
                    <Input
                      placeholder="Buscar por Lead ou Empresa..."
                      className="h-10 rounded-sm bg-background pl-10"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-muted-foreground hover:text-destructive"
                  >
                    <Icon name="trash" size="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* --- DATA TABLE --- */}
        <Card className="overflow-hidden rounded-sm border-border shadow-sm">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="group w-[140px] cursor-pointer text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Data/Hora{' '}
                  <Icon
                    name="sort-alt"
                    className="ml-1 inline opacity-50 group-hover:opacity-100"
                    size="size-3"
                  />
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Consultor
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Lead / Empresa
                </TableHead>
                <TableHead className="w-[100px] text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Proc.
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Tipo
                </TableHead>
                <TableHead className="w-[100px] text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Objeções
                </TableHead>
                <TableHead className="w-[180px] text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Fit Score
                </TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callsData.map((call) => (
                <TableRow
                  key={call.id}
                  className="group h-16 cursor-pointer transition-colors hover:bg-muted/20"
                  onClick={() => setSection(Section.TEMPLATE_SALES_CALL_DETAILS)}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {call.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" className="h-6 w-6">
                        <AvatarImage src={call.repAvatar} />
                        <AvatarFallback>{call.rep.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{call.rep}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-bold text-foreground">{call.lead}</span>
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs">
                    {getProcessingBadge(call.processing)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-sm bg-background/50 font-normal">
                      {call.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {call.objections > 0 ? (
                      <Badge
                        variant="destructive"
                        className="h-5 cursor-pointer px-1.5 hover:bg-destructive/80"
                      >
                        {call.objections}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/30">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={call.fitScore} className="h-2" />
                      <span
                        className={cn(
                          'w-8 text-right font-mono text-xs font-bold',
                          call.fitScore > 80
                            ? 'text-success'
                            : call.fitScore < 50
                              ? 'text-destructive'
                              : 'text-brand-yellow'
                        )}
                      >
                        {call.fitScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{getStatusBadge(call.status)}</TableCell>
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
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border bg-card/50 p-4 sm:flex-row">
            <div className="text-xs text-muted-foreground">
              Mostrando <strong>1-8</strong> de <strong>1,284</strong> calls
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  Itens por página:
                </span>
                <Select
                  placeholder="10"
                  options={[
                    { label: '10', value: '10' },
                    { label: '20', value: '20' },
                    { label: '50', value: '50' },
                  ]}
                  className="h-8 w-[70px] text-xs"
                />
              </div>

              <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" size="sm" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive size="sm">
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" size="sm">
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" size="sm">
                      3
                    </PaginationLink>
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
