import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { ContextMenu } from '../ui/context-menu';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { HoverCard } from '../ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Icon } from '../ui/icon';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { Menubar, MenubarGroup, MenubarItem, MenubarSeparator, MenubarLabel } from '../ui/menubar';
import { Dock, DockIcon, DockSeparator } from '../ui/dock';

const AdvancedUISection: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Interações Avançadas</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Componentes para fluxos de trabalho complexos, navegação profunda e alta densidade de
          informação.
        </p>
      </div>

      {/* --- MENU BAR (DESKTOP) --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="browser" /> Menubar (Desktop App)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Menu de topo clássico para aplicações desktop-like. Diferente da navegação do site, este
          foca em comandos.
        </p>

        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <Menubar>
            <MenubarGroup trigger="Arquivo">
              <MenubarItem shortcut="⌘N">Novo Projeto</MenubarItem>
              <MenubarItem shortcut="⌘O">Abrir...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem shortcut="⌘S">Salvar</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Imprimir</MenubarItem>
            </MenubarGroup>

            <MenubarGroup trigger="Editar">
              <MenubarItem shortcut="⌘Z">Desfazer</MenubarItem>
              <MenubarItem shortcut="⇧⌘Z">Refazer</MenubarItem>
              <MenubarSeparator />
              <MenubarLabel inset>IA Tools</MenubarLabel>
              <MenubarItem inset>Melhorar Texto</MenubarItem>
              <MenubarItem inset>Expandir</MenubarItem>
            </MenubarGroup>

            <MenubarGroup trigger="Ver">
              <MenubarItem inset>Sempre no Topo</MenubarItem>
              <MenubarItem inset>Tela Cheia</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Recarregar</MenubarItem>
            </MenubarGroup>

            <MenubarGroup trigger="Perfis">
              <MenubarLabel inset>Trocar Perfil</MenubarLabel>
              <MenubarItem inset>Alan Nicolas</MenubarItem>
              <MenubarItem inset>Admin</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Editar...</MenubarItem>
            </MenubarGroup>
          </Menubar>
          <div className="mt-2 flex h-32 items-center justify-center rounded border border-border bg-card font-mono text-sm text-muted-foreground">
            Área de Trabalho da Aplicação
          </div>
        </div>
      </section>

      {/* --- MEGA MENU (NAVIGATION) --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="menu-burger" /> Mega Menu (Website)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Navegação rica para sites de marketing ou portais de conteúdo.
        </p>

        <div className="flex h-[300px] items-start justify-center rounded-xl border border-border bg-background p-8 shadow-sm">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger value="getting-started">Começando</NavigationMenuTrigger>
                <NavigationMenuContent value="getting-started">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink
                        href="#"
                        className="group flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none transition-all hover:from-primary/10 hover:to-primary/5 focus:shadow-md"
                      >
                        <Icon
                          name="rocket"
                          className="h-6 w-6 text-primary transition-colors group-hover:text-primary/80"
                        />
                        <div className="mb-2 mt-4 text-lg font-medium text-foreground">
                          Introdução
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                          Fundamentos do ecossistema Lendário e primeiros passos com IA.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Instalação"
                        className="group block rounded p-2 hover:bg-muted"
                      >
                        <div className="text-sm font-medium group-hover:text-foreground">
                          Instalação
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground/80">
                          Como configurar o ambiente.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Primitivos"
                        className="group block rounded p-2 hover:bg-muted"
                      >
                        <div className="text-sm font-medium group-hover:text-foreground">
                          Primitivos
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground/80">
                          Design Tokens e base CSS.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        title="Componentes"
                        className="group block rounded p-2 hover:bg-muted"
                      >
                        <div className="text-sm font-medium group-hover:text-foreground">
                          Componentes
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground/80">
                          Galeria de elementos UI.
                        </p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger value="resources">Recursos</NavigationMenuTrigger>
                <NavigationMenuContent value="resources">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      { title: 'Prompt Engineering', desc: 'Guia avançado de prompts.' },
                      { title: 'Templates', desc: 'Copy e paste para seus projetos.' },
                      { title: 'Comunidade', desc: 'Acesse nosso Discord exclusivo.' },
                      { title: 'Blog', desc: 'Artigos sobre o futuro da IA.' },
                    ].map((component) => (
                      <li key={component.title}>
                        <NavigationMenuLink
                          href="#"
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none group-hover:text-accent-foreground">
                            {component.title}
                          </div>
                          {/* SOLUÇÃO MACRO: group-hover força a cor de contraste (accent-foreground) no texto de descrição */}
                          <p className="mt-1 line-clamp-2 font-serif text-xs leading-snug text-muted-foreground group-hover:text-accent-foreground">
                            {component.desc}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Link Direto
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </section>

      {/* --- DOCK (TOOLBAR) --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="apps" /> Dock (Toolbar Flutuante)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Barra de ferramentas flutuante com efeito de escala, ideal para ações principais em
          dashboards.
        </p>

        <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover opacity-10"></div>

          <Dock className="relative z-10">
            <DockIcon icon="home" label="Início" />
            <DockIcon icon="search" label="Busca" />
            <DockIcon icon="sparkles" label="Assistente IA" isActive />
            <DockIcon icon="folder" label="Projetos" />
            <DockSeparator />
            <DockIcon icon="settings" label="Ajustes" />
            <DockIcon icon="user" label="Perfil" />
          </Dock>
        </div>
      </section>

      {/* --- RESIZABLE PANELS --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="layout-fluid" /> Painéis Redimensionáveis (Resizable)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Essencial para interfaces de IDE, editores de código e chat com contexto lateral.
        </p>

        <div className="h-[400px] w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} className="min-w-[200px] bg-muted/20">
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Explorer</span>
                  <Icon name="menu-dots" />
                </div>
                <div className="space-y-1 font-mono text-sm">
                  <div className="flex cursor-pointer items-center gap-2 rounded bg-primary/10 px-2 py-1 text-primary">
                    <Icon name="file-code" size="size-3" /> App.tsx
                  </div>
                  <div className="flex cursor-pointer items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground">
                    <Icon name="file-code" size="size-3" /> global.css
                  </div>
                  <div className="flex cursor-pointer items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground">
                    <Icon name="folder" size="size-3" /> components/
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={80}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} className="bg-card p-6">
                  <h3 className="mb-4 font-sans text-lg font-bold">Editor de Código</h3>
                  <div className="space-y-2 font-mono text-sm text-muted-foreground">
                    <p>
                      <span className="text-brand-pink">import</span> React{' '}
                      <span className="text-brand-pink">from</span>{' '}
                      <span className="text-brand-green">'react'</span>;
                    </p>
                    <p>
                      <span className="text-brand-pink">const</span>{' '}
                      <span className="text-brand-yellow">App</span> = () ={'>'} {'{'}
                    </p>
                    <p className="pl-4">
                      <span className="text-brand-pink">return</span> (
                    </p>
                    <p className="pl-8 text-brand-blue">
                      {'<div className="p-4">Hello World</div>'}
                    </p>
                    <p className="pl-4">);</p>
                    <p>{'}'}</p>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle direction="vertical" />

                <ResizablePanel
                  defaultSize={30}
                  className="border-t border-border bg-background p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Icon name="terminal" size="size-3" /> Terminal
                  </div>
                  <div className="space-y-1 font-mono text-xs">
                    <p className="text-success">{'>'} build success in 420ms</p>
                    <p className="text-muted-foreground">{'>'} watching for file changes...</p>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 border-t border-border pt-12 md:grid-cols-2">
        {/* --- CONTEXT MENU --- */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
            <Icon name="cursor" /> Context Menu (Right Click)
          </h3>

          <ContextMenu
            trigger={
              <div className="flex h-64 cursor-context-menu flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/10 text-muted-foreground transition-colors hover:bg-muted/20">
                <span className="text-sm font-bold">Clique com botão direito aqui</span>
                <span className="text-xs">Para ver o menu de contexto</span>
              </div>
            }
          >
            <DropdownMenuLabel>Ações do Arquivo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon name="copy" className="mr-2 h-4 w-4" /> Copiar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="duplicate" className="mr-2 h-4 w-4" /> Duplicar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon name="share" className="mr-2 h-4 w-4" /> Compartilhar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>
              <Icon name="trash" className="mr-2 h-4 w-4" /> Deletar
            </DropdownMenuItem>
          </ContextMenu>
        </section>

        {/* --- HOVER CARD --- */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
            <Icon name="id-card-clip-alt" /> Hover Card
          </h3>
          <p className="text-sm text-muted-foreground">
            Passe o mouse para preview de links ou perfis.
          </p>

          <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-8">
            <span>Desenvolvido por</span>
            <HoverCard
              trigger={
                <span className="cursor-pointer font-bold text-primary hover:underline">
                  @academia_lendaria
                </span>
              }
            >
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={alanAvatar} />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Academia Lendária</h4>
                  <p className="text-sm text-muted-foreground">
                    O ecossistema de educação para negócios em IA.
                  </p>
                  <div className="flex items-center pt-2">
                    <Icon name="calendar" className="mr-2 h-4 w-4 opacity-70" />{' '}
                    <span className="text-xs text-muted-foreground">Desde 2020</span>
                  </div>
                </div>
              </div>
            </HoverCard>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdvancedUISection;
