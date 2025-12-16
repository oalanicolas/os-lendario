import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Select } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../../ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '../../ui/pagination';

const CmsTemplate: React.FC = () => {
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  // Mock Data
  const articles = [
    { id: 1, title: "O Futuro da IA Generativa", author: "Alan Nicolas", status: "published", views: "12.5k", date: "24 Out, 2023", thumb: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop", avatar: alanAvatar },
    { id: 2, title: "5 Prompts para Vendas", author: "Sarah Lee", status: "draft", views: "-", date: "23 Out, 2023", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=Sarah Lee" },
    { id: 3, title: "Liderança na Era Digital", author: "Marcos Paulo", status: "review", views: "-", date: "22 Out, 2023", thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=Marcos Paulo" },
    { id: 4, title: "Automação de Email Marketing", author: "Alan Nicolas", status: "published", views: "8.2k", date: "20 Out, 2023", thumb: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&auto=format&fit=crop", avatar: alanAvatar },
    { id: 5, title: "Guia de Ferramentas No-Code", author: "Julia Dias", status: "archived", views: "4.1k", date: "15 Set, 2023", thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?u=Julia Dias" },
  ];

  const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "default" | "secondary" }> = {
      published: { label: "Publicado", variant: "success" },
      draft: { label: "Rascunho", variant: "secondary" },
      review: { label: "Em Revisão", variant: "warning" },
      archived: { label: "Arquivado", variant: "default" }, // Using default as neutral/dark
  };

  return (
    <div className="flex flex-col space-y-8 animate-fade-in font-sans">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>Dashboard</span>
                  <Icon name="angle-small-right" size="size-3" />
                  <span className="text-foreground">Conteúdo</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciador de Artigos</h1>
              <p className="text-muted-foreground font-serif">Visualize, edite e publique conteúdo para o blog.</p>
          </div>
          <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                  <Icon name="settings" size="size-4" /> Configurações
              </Button>
              <Button className="gap-2 shadow-md shadow-primary/20">
                  <Icon name="plus" size="size-4" /> Novo Artigo
              </Button>
          </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
              <CardContent className="p-6 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Artigos</p>
                      <p className="text-2xl font-bold mt-1">128</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon name="document" size="size-5" />
                  </div>
              </CardContent>
          </Card>
          <Card>
              <CardContent className="p-6 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visualizações</p>
                      <p className="text-2xl font-bold mt-1">45.2k</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                      <Icon name="eye" size="size-5" />
                  </div>
              </CardContent>
          </Card>
          <Card>
              <CardContent className="p-6 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Rascunhos</p>
                      <p className="text-2xl font-bold mt-1">12</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                      <Icon name="pencil" size="size-5" />
                  </div>
              </CardContent>
          </Card>
          <Card>
              <CardContent className="p-6 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Agendados</p>
                      <p className="text-2xl font-bold mt-1">3</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Icon name="calendar" size="size-5" />
                  </div>
              </CardContent>
          </Card>
      </div>

      {/* --- CONTENT AREA --- */}
      <Card className="border border-border shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-border flex flex-col lg:flex-row gap-4 justify-between items-center bg-card/50">
              <div className="relative w-full lg:w-96">
                  <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size="size-4" />
                  <Input placeholder="Buscar por título..." className="pl-10" />
              </div>
              <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                  <Select 
                      placeholder="Status"
                      options={[
                          { label: 'Todos', value: 'all' },
                          { label: 'Publicado', value: 'published' },
                          { label: 'Rascunho', value: 'draft' },
                      ]}
                      className="w-[140px]"
                  />
                  <Select 
                      placeholder="Autor"
                      options={[
                          { label: 'Todos', value: 'all' },
                          { label: 'Alan Nicolas', value: 'an' },
                          { label: 'Equipe', value: 'team' },
                      ]}
                      className="w-[140px]"
                  />
                  <div className="h-10 w-px bg-border mx-2"></div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Icon name="grid" size="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-muted text-foreground">
                      <Icon name="list" size="size-4" />
                  </Button>
              </div>
          </div>

          {/* Table */}
          <Table>
              <TableHeader className="bg-muted/30">
                  <TableRow>
                      <TableHead className="w-[400px]">Artigo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {articles.map((article) => (
                      <TableRow key={article.id} className="hover:bg-muted/20 transition-colors group">
                          <TableCell>
                              <div className="flex items-center gap-4">
                                  <div className="h-12 w-16 rounded overflow-hidden bg-muted flex-shrink-0 border border-border">
                                      <img src={article.thumb} alt="" className="h-full w-full object-cover" />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                      <span className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">{article.title}</span>
                                      <span className="text-xs text-muted-foreground font-serif">Slug: /blog/{article.id}-post</span>
                                  </div>
                              </div>
                          </TableCell>
                          <TableCell>
                              <Badge variant={statusConfig[article.status].variant} className="font-normal">
                                  {statusConfig[article.status].label}
                              </Badge>
                          </TableCell>
                          <TableCell>
                              <div className="flex items-center gap-2">
                                  <Avatar size="sm" className="h-6 w-6">
                                      <AvatarImage src={article.avatar} />
                                      <AvatarFallback>{article.author.substring(0,2)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{article.author}</span>
                              </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground font-mono text-xs">
                              {article.date}
                          </TableCell>
                          <TableCell className="text-right text-sm font-mono">
                              {article.views}
                          </TableCell>
                          <TableCell>
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
                                      <Icon name="pencil" className="mr-2 h-4 w-4" /> Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                      <Icon name="eye" className="mr-2 h-4 w-4" /> Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                      <Icon name="duplicate" className="mr-2 h-4 w-4" /> Duplicar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem destructive>
                                      <Icon name="trash" className="mr-2 h-4 w-4" /> Excluir
                                  </DropdownMenuItem>
                              </DropdownMenu>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>

          {/* Footer / Pagination */}
          <div className="p-4 border-t border-border bg-card/50 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Mostrando <strong>5</strong> de <strong>128</strong> resultados</span>
              
              <Pagination className="justify-end w-auto mx-0">
                  <PaginationContent>
                      <PaginationItem>
                          <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                          <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                          <PaginationNext href="#" />
                      </PaginationItem>
                  </PaginationContent>
              </Pagination>
          </div>
      </Card>

    </div>
  );
};

export default CmsTemplate;