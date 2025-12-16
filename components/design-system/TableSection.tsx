import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';

const TableSection: React.FC = () => {
  return (
    <div className="space-y-24 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Sistema de Tabelas</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Estruturas de dados otimizadas para leitura e comparação. Contrastes ajustados para clareza máxima em Light e Dark mode.
        </p>
      </div>

      {/* --- 1. TABELA DE RANKING (CLÁSSICA) --- */}
      <section className="space-y-6">
        <h3 className="text-xl font-sans font-semibold">Tabela de Ranking (Clássica)</h3>
        <p className="text-sm text-muted-foreground">Utilizada para gamificação, com destaque visual para posições e métricas.</p>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] font-bold text-xs uppercase tracking-wider text-muted-foreground">Pos.</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Contribuidor</TableHead>
                <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground">Prompts Aprovados</TableHead>
                <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground">Score Médio</TableHead>
                <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-muted-foreground">Visitas</TableHead>
                <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-muted-foreground">Favoritos</TableHead>
                <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-muted-foreground">Avaliações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Row 1 - Gold */}
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-medium">
                  {/* Position Box: Explicit text-black for contrast on yellow */}
                  <div className="w-8 h-8 rounded-lg bg-brand-yellow text-black flex items-center justify-center font-bold shadow-sm border border-brand-yellow/50">
                    1º
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue border border-brand-blue/10">
                      <AvatarFallback className="font-bold">DC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">Day Cavalcanti</div>
                      <div className="text-xs text-muted-foreground font-serif">Engenheira de Prompts Sr</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-medium">5</TableCell>
                <TableCell className="text-center">
                    <Badge variant="info" className="font-mono text-sm px-3 rounded-md">220</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="eye" size="size-3" /> 264</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="heart" size="size-3" /> 5</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="comment-alt" size="size-3" /> 3</span>
                </TableCell>
              </TableRow>

              {/* Row 2 - Silver/Neutral */}
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-medium">
                   {/* Position Box: Neutral color compatible with dark/light */}
                   <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100 flex items-center justify-center font-bold border border-border">
                    2º
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                     <Avatar className="bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue border border-brand-blue/10">
                      <AvatarFallback className="font-bold">LC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">Lucas Charão</div>
                      <div className="text-xs text-muted-foreground font-serif">Analista de Experiência Educacional</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-medium">6</TableCell>
                <TableCell className="text-center">
                    <Badge variant="info" className="font-mono text-sm px-3 rounded-md">164</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="eye" size="size-3" /> 200</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="heart" size="size-3" /> 2</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="comment-alt" size="size-3" /> 0</span>
                </TableCell>
              </TableRow>

               {/* Row 3 - Bronze */}
               <TableRow className="hover:bg-muted/20">
                <TableCell className="font-medium">
                   {/* Position Box: Explicit text-white for orange background */}
                   <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center font-bold shadow-sm border border-brand-orange/50">
                    3º
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                     <Avatar className="bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue border border-brand-blue/10">
                      <AvatarFallback className="font-bold">AN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">Alan Nicolas</div>
                      <div className="text-xs text-muted-foreground font-serif">CEO & Chief Strategist</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-medium">4</TableCell>
                <TableCell className="text-center">
                    <Badge variant="info" className="font-mono text-sm px-3 rounded-md">125</Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="eye" size="size-3" /> 166</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="heart" size="size-3" /> 1</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-xs font-mono">
                    <span className="flex items-center justify-end gap-1"><Icon name="comment-alt" size="size-3" /> 0</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- 2. HISTÓRICO FINANCEIRO --- */}
      <section className="space-y-6">
        <h3 className="text-xl font-sans font-semibold">Histórico Financeiro</h3>
        <p className="text-sm text-muted-foreground">Tabela otimizada para dados numéricos, alinhamento à direita para moedas e status.</p>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableCaption className="mb-4">Lista das últimas transações do sistema.</TableCaption>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[100px] text-muted-foreground">Fatura</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Método</TableHead>
                <TableHead className="text-right text-muted-foreground">Data</TableHead>
                <TableHead className="text-right text-muted-foreground">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-mono font-medium text-foreground">INV001</TableCell>
                <TableCell><Badge variant="success" className="font-normal rounded-sm px-2">Pago</Badge></TableCell>
                <TableCell className="flex items-center gap-2">
                   <Icon name="credit-card" size="size-3" className="text-muted-foreground" /> 
                   <span className="text-sm">Cartão de Crédito</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground font-mono text-xs">22/10/2023</TableCell>
                <TableCell className="text-right font-mono font-medium text-foreground">R$ 250,00</TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-mono font-medium text-foreground">INV002</TableCell>
                <TableCell><Badge variant="warning" className="font-normal rounded-sm px-2">Pendente</Badge></TableCell>
                <TableCell className="flex items-center gap-2">
                   <Icon name="university" size="size-3" className="text-muted-foreground" /> 
                   <span className="text-sm">PIX</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground font-mono text-xs">23/10/2023</TableCell>
                <TableCell className="text-right font-mono font-medium text-foreground">R$ 1.500,00</TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-mono font-medium text-foreground">INV003</TableCell>
                <TableCell><Badge variant="destructive" className="font-normal rounded-sm px-2">Cancelado</Badge></TableCell>
                <TableCell className="flex items-center gap-2">
                   <Icon name="document" size="size-3" className="text-muted-foreground" /> 
                   <span className="text-sm">Boleto</span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground font-mono text-xs">15/10/2023</TableCell>
                <TableCell className="text-right font-mono font-medium text-muted-foreground line-through decoration-destructive/50">R$ 50,00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className="bg-muted/20 border-t border-border">
                <TableRow className="hover:bg-transparent border-none">
                    <TableCell colSpan={4} className="text-right font-sans text-sm font-medium text-muted-foreground">Total Processado</TableCell>
                    <TableCell className="text-right font-mono font-bold text-lg text-foreground">R$ 1.750,00</TableCell>
                </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>

      {/* --- 3. GRID LAYOUTS (User List & Specs) --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Tabela Básica */}
        <section className="space-y-6">
            <h3 className="text-xl font-sans font-semibold">Lista de Usuários</h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="text-muted-foreground">Usuário</TableHead>
                            <TableHead className="w-[100px] text-muted-foreground">Status</TableHead>
                            <TableHead className="text-right text-muted-foreground">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-muted/20">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm">
                                        <AvatarImage src="https://i.pravatar.cc/150?u=js" />
                                        <AvatarFallback>JS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm text-foreground">João Silva</div>
                                        <div className="text-xs text-muted-foreground">joao@example.com</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="active" className="font-normal text-[10px] px-2">Ativo</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu 
                                    align="right"
                                    trigger={
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <Icon name="menu-dots-vertical" size="size-4" />
                                        </Button>
                                    }
                                >
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <Icon name="user" className="mr-2 h-4 w-4" /> Ver Perfil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Icon name="pencil" className="mr-2 h-4 w-4" /> Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem destructive>
                                        <Icon name="trash" className="mr-2 h-4 w-4" /> Excluir
                                    </DropdownMenuItem>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/20">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm">
                                        <AvatarImage src="https://i.pravatar.cc/150?u=ms" />
                                        <AvatarFallback>MS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm text-foreground">Maria Santos</div>
                                        <div className="text-xs text-muted-foreground">maria@example.com</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="inactive" className="font-normal text-[10px] px-2">Offline</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu 
                                    align="right"
                                    trigger={
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <Icon name="menu-dots-vertical" size="size-4" />
                                        </Button>
                                    }
                                >
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <Icon name="user" className="mr-2 h-4 w-4" /> Ver Perfil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Icon name="pencil" className="mr-2 h-4 w-4" /> Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem destructive>
                                        <Icon name="trash" className="mr-2 h-4 w-4" /> Excluir
                                    </DropdownMenuItem>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>

        {/* Especificações Técnicas (Key Value) */}
        <section className="space-y-6">
            <h3 className="text-xl font-sans font-semibold">Especificações Técnicas</h3>
            <Card className="rounded-xl overflow-hidden border border-border bg-card">
                <Table>
                    <TableBody>
                        <TableRow className="hover:bg-transparent">
                            <TableCell className="font-medium text-muted-foreground w-1/3 bg-muted/20 border-r border-border">Versão do Sistema</TableCell>
                            <TableCell className="font-mono text-foreground">v4.1.0-alpha</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-transparent">
                            <TableCell className="font-medium text-muted-foreground w-1/3 bg-muted/20 border-r border-border">Status do Servidor</TableCell>
                            <TableCell className="flex items-center gap-2 text-success font-semibold">
                                <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span> Operacional
                            </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-transparent">
                            <TableCell className="font-medium text-muted-foreground w-1/3 bg-muted/20 border-r border-border">Framework</TableCell>
                            <TableCell className="text-foreground">React 19 + TailwindCSS</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-transparent">
                            <TableCell className="font-medium text-muted-foreground w-1/3 bg-muted/20 border-r border-border">Licença</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-foreground">
                                    <Icon name="lock" size="size-3" className="text-muted-foreground" />
                                    Proprietária (Enterprise)
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-transparent border-0">
                            <TableCell className="font-medium text-muted-foreground w-1/3 bg-muted/20 border-r border-border">Último Backup</TableCell>
                            <TableCell className="text-muted-foreground text-xs italic">Hoje, 14:30h</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </section>
      </div>

      {/* --- 4. GESTÃO DE TIMES (DASHBOARD) --- */}
      <section className="space-y-6 border-t border-border pt-12">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                 <h3 className="text-2xl font-sans font-bold">Gestão de Times</h3>
                 <p className="text-sm text-muted-foreground">Layout administrativo completo adaptado ao Design System (Cards & Tabela).</p>
            </div>
         </div>

         {/* 1. KPIs Cards (System Colors) */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Card className="border-border bg-card">
                 <CardContent className="p-6 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow dark:text-brand-yellow-dark shrink-0">
                         <Icon name="users-alt" size="size-6" />
                     </div>
                     <div>
                         <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Com Time Atribuído</p>
                         <p className="text-3xl font-bold font-sans text-foreground">110</p>
                     </div>
                 </CardContent>
             </Card>
             <Card className="border-border bg-card">
                 <CardContent className="p-6 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                         <Icon name="check" size="size-6" />
                     </div>
                     <div>
                         <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Check Ins Realizados</p>
                         <p className="text-3xl font-bold font-sans text-foreground">93</p>
                     </div>
                 </CardContent>
             </Card>
             <Card className="border-border bg-card">
                 <CardContent className="p-6 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
                         <Icon name="user-delete" size="size-6" />
                     </div>
                     <div>
                         <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Sem Time</p>
                         <p className="text-[10px] text-muted-foreground/70 mb-1">Com check-in realizado</p>
                         <p className="text-3xl font-bold font-sans text-foreground">0</p>
                     </div>
                 </CardContent>
             </Card>
         </div>

         {/* 2. Filters & Actions */}
         <div className="bg-card border border-border rounded-xl p-4 flex flex-col lg:flex-row gap-4 justify-between items-center shadow-sm">
             <div className="relative w-full lg:w-96">
                 <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                 <Input className="pl-10" placeholder="Buscar por nome ou email..." />
             </div>
             <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                 <Select 
                    placeholder="Todas as permissões"
                    options={[{label: 'Admin', value: 'admin'}, {label: 'Mentor', value: 'mentor'}, {label: 'Participante', value: 'participant'}]}
                    className="w-48"
                 />
                 <Select 
                    placeholder="Todos os times"
                    options={[{label: 'Time 09', value: 't9'}, {label: 'Time 16', value: 't16'}]}
                    className="w-40"
                 />
                 <Select 
                    placeholder="Todos"
                    options={[{label: 'Ativos', value: 'active'}, {label: 'Inativos', value: 'inactive'}]}
                    className="w-32"
                 />
             </div>
         </div>

         {/* 3. Main Table */}
         <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
                <Table className="whitespace-nowrap">
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="w-[50px]"><Checkbox /></TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Especialidade</TableHead>
                            <TableHead>Skills Principais</TableHead>
                            <TableHead>Permissão</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Row 1 */}
                        <TableRow className="hover:bg-muted/20">
                            <TableCell><Checkbox /></TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm" className="bg-brand-pink text-white">
                                        <AvatarFallback>AG</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm">Abel Gheller</span>
                                        <span className="text-[10px] bg-brand-green/10 text-brand-green px-1.5 rounded w-fit flex items-center gap-1 mt-0.5"><Icon name="user" size="size-3" /></span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">Balneário Camboriú, SC</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="font-normal">Estratégico</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground w-fit">Data Analysis</span>
                                    <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground w-fit">Business Knowledge</span>
                                </div>
                            </TableCell>
                            <TableCell><Badge variant="outline" className="text-muted-foreground font-normal gap-1"><Icon name="graduation-cap" size="size-3" /> Participante</Badge></TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                    <Icon name="users-alt" size="size-3" /> Time 09
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu 
                                    align="right"
                                    trigger={
                                        <Button variant="ghost" size="icon"><Icon name="menu-dots" /></Button>
                                    }
                                >
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                    <DropdownMenuItem destructive>Remover</DropdownMenuItem>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>

                         {/* Row 2 */}
                         <TableRow className="hover:bg-muted/20">
                            <TableCell><Checkbox /></TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm" className="bg-brand-indigo text-white">
                                        <AvatarFallback>AT</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-sm">Adavio Tittoni</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">Brasil</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="font-normal">Estratégico</Badge>
                            </TableCell>
                            <TableCell>
                                <span className="text-xs text-muted-foreground italic">Sem skills</span>
                            </TableCell>
                            <TableCell><Badge className="bg-brand-blue text-white hover:bg-brand-blue/90 gap-1"><Icon name="badge-check" size="size-3" /> Mentor</Badge></TableCell>
                            <TableCell>
                                 <div className="flex items-center gap-2 text-sm opacity-50">
                                    <Icon name="user-delete" size="size-3" /> Sem time
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu 
                                    align="right"
                                    trigger={
                                        <Button variant="ghost" size="icon"><Icon name="menu-dots" /></Button>
                                    }
                                >
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                    <DropdownMenuItem destructive>Remover</DropdownMenuItem>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>

                        {/* Row 3 - Admin */}
                        <TableRow className="hover:bg-muted/20">
                            <TableCell><Checkbox /></TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm" className="bg-brand-cyan text-white">
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-sm">Admin</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">Floripa</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="font-normal">Estratégico</Badge>
                            </TableCell>
                            <TableCell>
                                <span className="text-xs text-muted-foreground italic">Sem skills</span>
                            </TableCell>
                            <TableCell><Badge variant="destructive" className="gap-1"><Icon name="shield-check" size="size-3" /> Admin</Badge></TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-sm opacity-50">
                                    <Icon name="user-delete" size="size-3" /> Sem time
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu 
                                    align="right"
                                    trigger={
                                        <Button variant="ghost" size="icon"><Icon name="menu-dots" /></Button>
                                    }
                                >
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                    <DropdownMenuItem destructive>Remover</DropdownMenuItem>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>

                         {/* Row 4 */}
                        <TableRow className="hover:bg-muted/20">
                            <TableCell><Checkbox /></TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar size="sm" className="bg-brand-red text-white">
                                        <AvatarFallback>AS</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm">Adriano Rogowski</span>
                                         <span className="text-[10px] bg-brand-green/10 text-brand-green px-1.5 rounded w-fit flex items-center gap-1 mt-0.5"><Icon name="user" size="size-3" /></span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">Antônio Carlos, SC</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="font-normal">Técnico</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground w-fit">Prompt Engineering</span>
                                    <div className="flex gap-1">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground w-fit">Programming</span>
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground w-fit">Market Analysis</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell><Badge variant="outline" className="text-muted-foreground font-normal gap-1"><Icon name="graduation-cap" size="size-3" /> Participante</Badge></TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                    <Icon name="users-alt" size="size-3" /> Time 16
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu 
                                    align="right"
                                    trigger={
                                        <Button variant="ghost" size="icon"><Icon name="menu-dots" /></Button>
                                    }
                                >
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                    <DropdownMenuItem destructive>Remover</DropdownMenuItem>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
             </div>
         </div>
      </section>

      {/* --- 5. RANKING DE PERFORMANCE (ADAPTADO) --- */}
      <section className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                 <h3 className="text-2xl font-sans font-bold">Ranking de Performance</h3>
                 <p className="text-sm text-muted-foreground">Layout de alta densidade visual, adaptado para as variáveis semânticas do sistema.</p>
            </div>
            <Badge variant="outline" className="w-fit border-primary text-primary">System Adapted</Badge>
         </div>
         
         {/* Container agora usa bg-card e border-border para respeitar tema claro/escuro */}
         <div className="rounded-xl overflow-hidden shadow-2xl bg-card text-card-foreground border border-border font-sans">
             <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                     <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider font-semibold border-b border-border">
                         <tr>
                             <th className="px-6 py-4 text-left w-16">#</th>
                             <th className="px-6 py-4 text-left">Time</th>
                             <th className="px-4 py-4 text-center">Fontes</th>
                             <th className="px-4 py-4 text-center">DNA</th>
                             <th className="px-4 py-4 text-center">Artefatos</th>
                             <th className="px-4 py-4 text-center">Q&A</th>
                             <th className="px-4 py-4 text-center">Prompt</th>
                             <th className="px-4 py-4 text-center text-muted-foreground/60">Ship</th>
                             <th className="px-6 py-4 text-right text-primary font-bold">TOTAL</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                         {[
                             { id: 1, name: 'David Allen', tag: '#32', avatar: 'https://i.pravatar.cc/150?u=da', scores: [100, 100, 100, 100, 100], total: 100 },
                             { id: 2, name: 'Richard Feynman', tag: '#05', avatar: 'https://i.pravatar.cc/150?u=rf', scores: [100, 100, 100, 100, 100], total: 100 },
                             { id: 3, name: 'Epictetus', tag: '#12', avatar: 'https://i.pravatar.cc/150?u=ep', scores: [100, 100, 100, 100, 100], total: 100 },
                             { id: 4, name: 'Tim Ferriss', tag: '#28', avatar: 'https://i.pravatar.cc/150?u=tf', scores: [100, 100, 100, 100, 100], total: 100 },
                             { id: 5, name: 'Naval Ravikant', tag: '#18', avatar: 'https://i.pravatar.cc/150?u=nr', scores: [100, 100, 100, 100, 100], total: 100 },
                         ].map((row, index) => (
                             <tr key={row.id} className="hover:bg-muted/30 transition-colors group">
                                 <td className="px-6 py-4 text-muted-foreground font-mono">{row.id}</td>
                                 <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                         <Avatar size="sm" className="ring-2 ring-background group-hover:ring-primary/50 transition-all">
                                             <AvatarImage src={row.avatar} />
                                             <AvatarFallback className="text-foreground bg-muted">{row.name.substring(0,2)}</AvatarFallback>
                                         </Avatar>
                                         <div>
                                             <span className="font-semibold text-foreground block">{row.name}</span>
                                             <span className="text-xs text-muted-foreground font-mono">{row.tag}</span>
                                         </div>
                                     </div>
                                 </td>
                                 {/* Score Columns - Using Primary variables for colors */}
                                 {row.scores.map((score, sIndex) => (
                                     <td key={sIndex} className="px-4 py-4 text-center">
                                         <div className="inline-flex items-center justify-center px-3 py-1 rounded border border-primary text-primary font-bold font-mono bg-primary/10 min-w-[50px]">
                                             {score}
                                         </div>
                                     </td>
                                 ))}
                                 <td className="px-4 py-4 text-center text-muted-foreground">—</td>
                                 <td className="px-6 py-4 text-right font-bold text-xl text-foreground">
                                     {row.total}
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </div>
      </section>

    </div>
  );
};

export default TableSection;