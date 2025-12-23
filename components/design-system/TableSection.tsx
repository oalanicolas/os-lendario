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
} from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

const TableSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-24">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Sistema de Tabelas</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Estruturas de dados otimizadas para leitura e comparação. Contrastes ajustados para
          clareza máxima em Light e Dark mode.
        </p>
      </div>

      {/* --- 1. TABELA DE RANKING (CLÁSSICA) --- */}
      <section className="space-y-6">
        <h3 className="font-sans text-xl font-semibold">Tabela de Ranking (Clássica)</h3>
        <p className="text-sm text-muted-foreground">
          Utilizada para gamificação, com destaque visual para posições e métricas.
        </p>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Pos.
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Contribuidor
                </TableHead>
                <TableHead className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Prompts Aprovados
                </TableHead>
                <TableHead className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Score Médio
                </TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Visitas
                </TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Favoritos
                </TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Avaliações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Row 1 - Gold */}
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-medium">
                  {/* Position Box: Explicit text-black for contrast on yellow */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-yellow/50 bg-brand-yellow font-bold text-black shadow-sm">
                    1º
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="border border-brand-blue/10 bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue">
                      <AvatarFallback className="font-bold">DC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">Day Cavalcanti</div>
                      <div className="font-serif text-xs text-muted-foreground">
                        Engenheira de Prompts Sr
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-medium">5</TableCell>
                <TableCell className="text-center">
                  <Badge variant="info" className="rounded-md px-3 font-mono text-sm">
                    220
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="eye" size="size-3" /> 264
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="heart" size="size-3" /> 5
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="comment-alt" size="size-3" /> 3
                  </span>
                </TableCell>
              </TableRow>

              {/* Row 2 - Silver/Neutral */}
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-medium">
                  {/* Position Box: Neutral color compatible with dark/light */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-slate-200 font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                    2º
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="border border-brand-blue/10 bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue">
                      <AvatarFallback className="font-bold">LC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">Lucas Charão</div>
                      <div className="font-serif text-xs text-muted-foreground">
                        Analista de Experiência Educacional
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-medium">6</TableCell>
                <TableCell className="text-center">
                  <Badge variant="info" className="rounded-md px-3 font-mono text-sm">
                    164
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="eye" size="size-3" /> 200
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="heart" size="size-3" /> 2
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="comment-alt" size="size-3" /> 0
                  </span>
                </TableCell>
              </TableRow>

              {/* Row 3 - Bronze */}
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-medium">
                  {/* Position Box: Explicit text-white for orange background */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-orange/50 bg-brand-orange font-bold text-white shadow-sm">
                    3º
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="border border-brand-blue/10 bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-blue">
                      <AvatarFallback className="font-bold">AN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">Alan Nicolas</div>
                      <div className="font-serif text-xs text-muted-foreground">
                        CEO & Chief Strategist
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-medium">4</TableCell>
                <TableCell className="text-center">
                  <Badge variant="info" className="rounded-md px-3 font-mono text-sm">
                    125
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="eye" size="size-3" /> 166
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="heart" size="size-3" /> 1
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <Icon name="comment-alt" size="size-3" /> 0
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- 2. HISTÓRICO FINANCEIRO --- */}
      <section className="space-y-6">
        <h3 className="font-sans text-xl font-semibold">Histórico Financeiro</h3>
        <p className="text-sm text-muted-foreground">
          Tabela otimizada para dados numéricos, alinhamento à direita para moedas e status.
        </p>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
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
                <TableCell>
                  <Badge variant="success" className="rounded-sm px-2 font-normal">
                    Pago
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Icon name="credit-card" size="size-3" className="text-muted-foreground" />
                  <span className="text-sm">Cartão de Crédito</span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  22/10/2023
                </TableCell>
                <TableCell className="text-right font-mono font-medium text-foreground">
                  R$ 250,00
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-mono font-medium text-foreground">INV002</TableCell>
                <TableCell>
                  <Badge variant="warning" className="rounded-sm px-2 font-normal">
                    Pendente
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Icon name="university" size="size-3" className="text-muted-foreground" />
                  <span className="text-sm">PIX</span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  23/10/2023
                </TableCell>
                <TableCell className="text-right font-mono font-medium text-foreground">
                  R$ 1.500,00
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/20">
                <TableCell className="font-mono font-medium text-foreground">INV003</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="rounded-sm px-2 font-normal">
                    Cancelado
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Icon name="document" size="size-3" className="text-muted-foreground" />
                  <span className="text-sm">Boleto</span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  15/10/2023
                </TableCell>
                <TableCell className="text-right font-mono font-medium text-muted-foreground line-through decoration-destructive/50">
                  R$ 50,00
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className="border-t border-border bg-muted/20">
              <TableRow className="border-none hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="text-right font-sans text-sm font-medium text-muted-foreground"
                >
                  Total Processado
                </TableCell>
                <TableCell className="text-right font-mono text-lg font-bold text-foreground">
                  R$ 1.750,00
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>

      {/* --- 3. GRID LAYOUTS (User List & Specs) --- */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {/* Tabela Básica */}
        <section className="space-y-6">
          <h3 className="font-sans text-xl font-semibold">Lista de Usuários</h3>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
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
                        <div className="text-sm font-medium text-foreground">João Silva</div>
                        <div className="text-xs text-muted-foreground">joao@example.com</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="active" className="px-2 text-[10px] font-normal">
                      Ativo
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="right"
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
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
                        <div className="text-sm font-medium text-foreground">Maria Santos</div>
                        <div className="text-xs text-muted-foreground">maria@example.com</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="inactive" className="px-2 text-[10px] font-normal">
                      Offline
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="right"
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
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
          <h3 className="font-sans text-xl font-semibold">Especificações Técnicas</h3>
          <Card className="overflow-hidden rounded-xl border border-border bg-card">
            <Table>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="w-1/3 border-r border-border bg-muted/20 font-medium text-muted-foreground">
                    Versão do Sistema
                  </TableCell>
                  <TableCell className="font-mono text-foreground">v4.1.0-alpha</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="w-1/3 border-r border-border bg-muted/20 font-medium text-muted-foreground">
                    Status do Servidor
                  </TableCell>
                  <TableCell className="text-success flex items-center gap-2 font-semibold">
                    <span className="bg-success h-2 w-2 animate-pulse rounded-full"></span>{' '}
                    Operacional
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="w-1/3 border-r border-border bg-muted/20 font-medium text-muted-foreground">
                    Framework
                  </TableCell>
                  <TableCell className="text-foreground">React 19 + TailwindCSS</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="w-1/3 border-r border-border bg-muted/20 font-medium text-muted-foreground">
                    Licença
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-foreground">
                      <Icon name="lock" size="size-3" className="text-muted-foreground" />
                      Proprietária (Enterprise)
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="border-0 hover:bg-transparent">
                  <TableCell className="w-1/3 border-r border-border bg-muted/20 font-medium text-muted-foreground">
                    Último Backup
                  </TableCell>
                  <TableCell className="text-xs italic text-muted-foreground">
                    Hoje, 14:30h
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>

      {/* --- 4. GESTÃO DE TIMES (DASHBOARD) --- */}
      <section className="space-y-6 border-t border-border pt-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-sans text-2xl font-bold">Gestão de Times</h3>
            <p className="text-sm text-muted-foreground">
              Layout administrativo completo adaptado ao Design System (Cards & Tabela).
            </p>
          </div>
        </div>

        {/* 1. KPIs Cards (System Colors) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/10 text-brand-yellow dark:text-brand-yellow-dark">
                <Icon name="users-alt" size="size-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Com Time Atribuído
                </p>
                <p className="font-sans text-3xl font-bold text-foreground">110</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <Icon name="check" size="size-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Check Ins Realizados
                </p>
                <p className="font-sans text-3xl font-bold text-foreground">93</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-pink/10 text-brand-pink">
                <Icon name="user-delete" size="size-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sem Time
                </p>
                <p className="mb-1 text-[10px] text-muted-foreground/70">Com check-in realizado</p>
                <p className="font-sans text-3xl font-bold text-foreground">0</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2. Filters & Actions */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm lg:flex-row">
          <div className="relative w-full lg:w-96">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size="size-4"
            />
            <Input className="pl-10" placeholder="Buscar por nome ou email..." />
          </div>
          <div className="flex w-full gap-4 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
            <Select
              placeholder="Todas as permissões"
              options={[
                { label: 'Admin', value: 'admin' },
                { label: 'Mentor', value: 'mentor' },
                { label: 'Participante', value: 'participant' },
              ]}
              className="w-48"
            />
            <Select
              placeholder="Todos os times"
              options={[
                { label: 'Time 09', value: 't9' },
                { label: 'Time 16', value: 't16' },
              ]}
              className="w-40"
            />
            <Select
              placeholder="Todos"
              options={[
                { label: 'Ativos', value: 'active' },
                { label: 'Inativos', value: 'inactive' },
              ]}
              className="w-32"
            />
          </div>
        </div>

        {/* 3. Main Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table className="whitespace-nowrap">
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
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
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="bg-brand-pink text-white">
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Abel Gheller</span>
                        <span className="mt-0.5 flex w-fit items-center gap-1 rounded bg-brand-green/10 px-1.5 text-[10px] text-brand-green">
                          <Icon name="user" size="size-3" />
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    Balneário Camboriú, SC
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      Estratégico
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="inline-block w-fit rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        Data Analysis
                      </span>
                      <span className="inline-block w-fit rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        Business Knowledge
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1 font-normal text-muted-foreground">
                      <Icon name="graduation-cap" size="size-3" /> Participante
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="users-alt" size="size-3" /> Time 09
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="right"
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Icon name="menu-dots" />
                        </Button>
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
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="bg-brand-indigo text-white">
                        <AvatarFallback>AT</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold">Adavio Tittoni</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">Brasil</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      Estratégico
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs italic text-muted-foreground">Sem skills</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="gap-1 bg-brand-blue text-white hover:bg-brand-blue/90">
                      <Icon name="badge-check" size="size-3" /> Mentor
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm opacity-50">
                      <Icon name="user-delete" size="size-3" /> Sem time
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="right"
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Icon name="menu-dots" />
                        </Button>
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
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="bg-brand-cyan text-white">
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold">Admin</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">Floripa</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      Estratégico
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs italic text-muted-foreground">Sem skills</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="gap-1">
                      <Icon name="shield-check" size="size-3" /> Admin
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm opacity-50">
                      <Icon name="user-delete" size="size-3" /> Sem time
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="right"
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Icon name="menu-dots" />
                        </Button>
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
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="bg-brand-red text-white">
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Adriano Rogowski</span>
                        <span className="mt-0.5 flex w-fit items-center gap-1 rounded bg-brand-green/10 px-1.5 text-[10px] text-brand-green">
                          <Icon name="user" size="size-3" />
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    Antônio Carlos, SC
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      Técnico
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="inline-block w-fit rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        Prompt Engineering
                      </span>
                      <div className="flex gap-1">
                        <span className="inline-block w-fit rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          Programming
                        </span>
                        <span className="inline-block w-fit rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          Market Analysis
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1 font-normal text-muted-foreground">
                      <Icon name="graduation-cap" size="size-3" /> Participante
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="users-alt" size="size-3" /> Time 16
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="right"
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Icon name="menu-dots" />
                        </Button>
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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-sans text-2xl font-bold">Ranking de Performance</h3>
            <p className="text-sm text-muted-foreground">
              Layout de alta densidade visual, adaptado para as variáveis semânticas do sistema.
            </p>
          </div>
          <Badge variant="outline" className="w-fit border-primary text-primary">
            System Adapted
          </Badge>
        </div>

        {/* Container agora usa bg-card e border-border para respeitar tema claro/escuro */}
        <div className="overflow-hidden rounded-xl border border-border bg-card font-sans text-card-foreground shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-16 px-6 py-4 text-left">#</th>
                  <th className="px-6 py-4 text-left">Time</th>
                  <th className="px-4 py-4 text-center">Fontes</th>
                  <th className="px-4 py-4 text-center">DNA</th>
                  <th className="px-4 py-4 text-center">Artefatos</th>
                  <th className="px-4 py-4 text-center">Q&A</th>
                  <th className="px-4 py-4 text-center">Prompt</th>
                  <th className="px-4 py-4 text-center text-muted-foreground/60">Ship</th>
                  <th className="px-6 py-4 text-right font-bold text-primary">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    id: 1,
                    name: 'David Allen',
                    tag: '#32',
                    avatar: 'https://i.pravatar.cc/150?u=da',
                    scores: [100, 100, 100, 100, 100],
                    total: 100,
                  },
                  {
                    id: 2,
                    name: 'Richard Feynman',
                    tag: '#05',
                    avatar: 'https://i.pravatar.cc/150?u=rf',
                    scores: [100, 100, 100, 100, 100],
                    total: 100,
                  },
                  {
                    id: 3,
                    name: 'Epictetus',
                    tag: '#12',
                    avatar: 'https://i.pravatar.cc/150?u=ep',
                    scores: [100, 100, 100, 100, 100],
                    total: 100,
                  },
                  {
                    id: 4,
                    name: 'Tim Ferriss',
                    tag: '#28',
                    avatar: 'https://i.pravatar.cc/150?u=tf',
                    scores: [100, 100, 100, 100, 100],
                    total: 100,
                  },
                  {
                    id: 5,
                    name: 'Naval Ravikant',
                    tag: '#18',
                    avatar: 'https://i.pravatar.cc/150?u=nr',
                    scores: [100, 100, 100, 100, 100],
                    total: 100,
                  },
                ].map((row, index) => (
                  <tr key={row.id} className="group transition-colors hover:bg-muted/30">
                    <td className="px-6 py-4 font-mono text-muted-foreground">{row.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          size="sm"
                          className="ring-2 ring-background transition-all group-hover:ring-primary/50"
                        >
                          <AvatarImage src={row.avatar} />
                          <AvatarFallback className="bg-muted text-foreground">
                            {row.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="block font-semibold text-foreground">{row.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">{row.tag}</span>
                        </div>
                      </div>
                    </td>
                    {/* Score Columns - Using Primary variables for colors */}
                    {row.scores.map((score, sIndex) => (
                      <td key={sIndex} className="px-4 py-4 text-center">
                        <div className="inline-flex min-w-[50px] items-center justify-center rounded border border-primary bg-primary/10 px-3 py-1 font-mono font-bold text-primary">
                          {score}
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center text-muted-foreground">—</td>
                    <td className="px-6 py-4 text-right text-xl font-bold text-foreground">
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
