
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '../ui/sheet';
import { Popover } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Symbol } from '../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from '../ui/command';
import { useToast } from '../../hooks/use-toast'; // Import real hook
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'; // Import real Tooltip

const FeedbackSection: React.FC = () => {
  // Existing States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDestructiveModalOpen, setIsDestructiveModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  
  // New Modal Variation States
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const { toast } = useToast(); // Use the hook
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Feedback & Overlays</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Interrupções controladas e mensagens passivas para guiar o usuário sem frustração.
        </p>
      </div>

      {/* --- COMMAND PALETTE --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="terminal" /> Command Palette (Cmd+K)
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Interface para power users. Acesso rápido a ações globais.
        </p>
        
        <div className="p-12 border border-border rounded-xl flex flex-col items-center justify-center bg-card shadow-sm">
            <p className="text-sm text-muted-foreground mb-4 font-serif">
                Pressione <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">⌘</span>J</kbd> ou clique abaixo.
            </p>
            <Button variant="outline" className="w-64 justify-between text-muted-foreground hover:text-foreground" onClick={() => setIsCommandOpen(true)}>
                <span className="flex items-center gap-2"><Icon name="search" size="size-3" /> Buscar comandos...</span>
                <span className="text-xs text-muted-foreground">Cmd+K</span>
            </Button>
        </div>

        <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
            <CommandInput placeholder="Digite um comando ou busca..." />
            <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Sugestões">
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                        <Icon name="calendar" className="mr-2" />
                        <span>Agendar Mentoria</span>
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                        <Icon name="rocket" className="mr-2" />
                        <span>Novo Projeto</span>
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                        <Icon name="magic-wand" className="mr-2" />
                        <span>Gerar com IA</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Configurações">
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                        <Icon name="user" className="mr-2" />
                        <span>Perfil</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                        <Icon name="credit-card" className="mr-2" />
                        <span>Faturamento</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                        <Icon name="settings" className="mr-2" />
                        <span>Preferências</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
      </section>

      {/* --- DRAWERS / SHEETS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="layout-fluid" /> Painéis Laterais (Sheets)
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Use Sheets para visualizar detalhes profundos, editar configurações complexas ou filtros, sem perder o contexto da página principal.
        </p>
        
        <div className="p-8 border border-border border-dashed rounded-xl bg-muted/10 flex flex-col items-center justify-center gap-4">
            <Button onClick={() => setIsSheetOpen(true)} className="gap-2">
                <Icon name="menu-burger" size="size-4" /> Abrir Detalhes do Prompt
            </Button>
            <p className="text-xs text-muted-foreground">Clica para ver o comportamento do drawer.</p>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Detalhes da Execução</SheetTitle>
                    <SheetDescription>
                        ID: #8392-AX • Criado em 24 Out, 14:30
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Input do Usuário</Label>
                        <div className="p-3 bg-muted rounded-md text-sm font-mono text-muted-foreground">
                            "Crie uma estratégia de marketing para uma marca de café premium focada em sustentabilidade."
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Configuração do Modelo</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-2 border border-border rounded text-xs">
                                <span className="text-muted-foreground block">Temperatura</span>
                                <span className="font-bold">0.7</span>
                            </div>
                            <div className="p-2 border border-border rounded text-xs">
                                <span className="text-muted-foreground block">Tokens</span>
                                <span className="font-bold">2048</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline">Marketing</Badge>
                            <Badge variant="outline">Copywriting</Badge>
                            <Badge variant="success">Sucesso</Badge>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={() => setIsSheetOpen(false)}>Fechar</Button>
                    <Button onClick={() => setIsSheetOpen(false)}>Re-executar</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
      </section>

      {/* --- POPOVERS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="comment-alt" /> Popovers & Menus
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Pequenas sobreposições para ações rápidas ou ajustes contextuais.
        </p>

        <div className="flex flex-wrap gap-8">
            
            {/* Popover 1: Settings */}
            <Popover 
                trigger={
                    <Button variant="outline" className="gap-2">
                        <Icon name="settings-sliders" size="size-4" /> Ajustes
                    </Button>
                }
                content={
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none text-sm">Dimensões</h4>
                            <p className="text-xs text-muted-foreground">Defina a largura do output.</p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="width">Width</Label>
                                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="height">Height</Label>
                                <Input id="height" defaultValue="Auto" className="col-span-2 h-8" />
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Popover 2: Profile */}
            <Popover 
                align="start"
                trigger={
                    <div className="flex items-center gap-3 p-2 rounded-full border border-border hover:bg-muted/50 cursor-pointer pr-4 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold overflow-hidden">
                            <Avatar>
                                <AvatarImage src={alanAvatar} />
                                <AvatarFallback>AL</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="text-xs font-medium">Academia Admin</div>
                    </div>
                }
                content={
                    <div className="space-y-1">
                        <div className="px-2 py-1.5 text-sm font-semibold border-b border-border mb-1">Minha Conta</div>
                        <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted flex items-center gap-2">
                            <Icon name="user" size="size-3" /> Perfil
                        </button>
                        <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted flex items-center gap-2">
                            <Icon name="credit-card" size="size-3" /> Faturamento
                        </button>
                        <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted flex items-center gap-2 text-destructive">
                            <Icon name="sign-out-alt" size="size-3" /> Sair
                        </button>
                    </div>
                }
            />

        </div>
      </section>

      {/* --- MODALS (Gallery) --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="copy" /> Galeria de Modais
        </h3>
        <p className="text-sm text-muted-foreground font-serif mb-6">
            Padrões comuns de diálogo para diferentes contextos da aplicação.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => setShowCookieModal(true)} variant="outline" className="h-24 flex flex-col gap-2">
                <Icon name="cookie" size="size-6" />
                <span>Cookies (Filled)</span>
            </Button>
            <Button onClick={() => setShowImageModal(true)} variant="outline" className="h-24 flex flex-col gap-2">
                <Icon name="picture" size="size-6" />
                <span>Image Top</span>
            </Button>
            <Button onClick={() => setShowNotificationModal(true)} variant="outline" className="h-24 flex flex-col gap-2">
                <Icon name="settings" size="size-6" />
                <span>Switch Settings</span>
            </Button>
            <Button onClick={() => setShowPaymentModal(true)} variant="outline" className="h-24 flex flex-col gap-2">
                <Icon name="credit-card" size="size-6" />
                <span>Transacional</span>
            </Button>
        </div>

        {/* 1. Cookie Modal */}
        <Dialog open={showCookieModal} onOpenChange={setShowCookieModal}>
            <DialogContent onClose={() => setShowCookieModal(false)} className="sm:max-w-sm text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4 text-4xl">
                    🍪
                </div>
                <DialogHeader className="text-center sm:text-center">
                    <DialogTitle className="text-xl">Usamos Cookies!</DialogTitle>
                    <DialogDescription>
                        Para melhorar sua experiência lendária, utilizamos cookies. Você aceita?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-3 mt-6">
                    <Button variant="ghost" className="flex-1" onClick={() => setShowCookieModal(false)}>Política</Button>
                    <Button className="flex-1" onClick={() => setShowCookieModal(false)}>Aceitar Tudo</Button>
                </div>
            </DialogContent>
        </Dialog>

        {/* 2. Image Top Modal (Feature/Upsell) */}
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
            <DialogContent onClose={() => setShowImageModal(false)} className="sm:max-w-sm p-0 overflow-hidden border-0 shadow-2xl">
                <div className="h-48 w-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    <button 
                        onClick={() => setShowImageModal(false)} 
                        className="absolute right-4 top-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 backdrop-blur-sm transition-colors"
                    >
                        <Icon name="cross" size="size-3" />
                    </button>
                </div>
                <div className="p-6 pt-2">
                    <DialogHeader className="text-left sm:text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Novo Recurso</span>
                        </div>
                        <DialogTitle className="text-2xl">Colaboração em Tempo Real</DialogTitle>
                        <DialogDescription className="mt-2">
                            Agora você pode convidar seu time para editar prompts simultaneamente. Aumente a produtividade da sua equipe.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-between items-center mt-8">
                        <Button variant="link" className="px-0 text-muted-foreground" onClick={() => setShowImageModal(false)}>Pular</Button>
                        <Button onClick={() => setShowImageModal(false)}>Explorar Agora</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        {/* 3. Settings/Toggle Modal */}
        <Dialog open={showNotificationModal} onOpenChange={setShowNotificationModal}>
            <DialogContent onClose={() => setShowNotificationModal(false)} className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Notificações</DialogTitle>
                    <DialogDescription>Gerencie como você recebe alertas do sistema.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="activity" className="text-sm font-medium leading-none">Atividade da Conta</Label>
                            <span className="text-xs text-muted-foreground">Segurança e logins suspeitos.</span>
                        </div>
                        <Switch id="activity" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="meetups" className="text-sm font-medium leading-none">Novos Cursos</Label>
                            <span className="text-xs text-muted-foreground">Lançamentos da Academia.</span>
                        </div>
                        <Switch id="meetups" />
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="marketing" className="text-sm font-medium leading-none">Marketing</Label>
                            <span className="text-xs text-muted-foreground">Ofertas e promoções.</span>
                        </div>
                        <Switch id="marketing" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNotificationModal(false)}>Cancelar</Button>
                    <Button onClick={() => {
                        setShowNotificationModal(false);
                        toast({ title: "Preferências Salvas", variant: "success" });
                    }}>Atualizar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* 4. Transactional/Simple Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
            <DialogContent onClose={() => setShowPaymentModal(false)} className="sm:max-w-md">
                <div className="flex flex-col items-center text-center p-4">
                    <div className="h-14 w-14 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mb-4">
                        <Icon name="credit-card" size="size-6" />
                    </div>
                    <DialogHeader className="mb-4">
                        <DialogTitle>Confirmar Assinatura Pro</DialogTitle>
                        <DialogDescription>
                            Você será cobrado <strong>R$ 97,00/mês</strong>. Cancele quando quiser.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="w-full bg-muted/30 p-4 rounded-lg border border-border mb-6 text-sm">
                        <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Plano</span>
                            <span className="font-semibold">Lendário Pro</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Ciclo</span>
                            <span className="font-semibold">Mensal</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 mt-2">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-primary">R$ 97,00</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <Button className="w-full" size="lg" onClick={() => setShowPaymentModal(false)}>
                            Confirmar Pagamento
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => setShowPaymentModal(false)}>
                            Agora não
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        {/* --- MODALS (Legacy / Functional Examples) --- */}
        <div className="border-t border-border mt-8 pt-8">
            <h4 className="text-sm font-bold text-muted-foreground uppercase mb-4">Exemplos Funcionais (Anteriores)</h4>
            <div className="flex flex-wrap gap-4">
                <Button onClick={() => setIsModalOpen(true)} variant="secondary">Informativo (Terms)</Button>
                <Button onClick={() => setIsFormModalOpen(true)} variant="secondary">Formulário (Edit)</Button>
                <Button onClick={() => setIsSuccessModalOpen(true)} variant="secondary">Sucesso (Action)</Button>
                <Button onClick={() => setIsDestructiveModalOpen(true)} variant="secondary">Crítico (Delete)</Button>
            </div>
        </div>

        {/* 1. Standard Modal (Terms) */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent onClose={() => setIsModalOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Atualização de Contrato</DialogTitle>
                    <DialogDescription>
                        Novas cláusulas foram adicionadas aos termos de uso da IA. Por favor, revise antes de continuar.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="p-4 bg-muted/30 rounded-md border border-border text-sm font-serif text-muted-foreground max-h-40 overflow-y-auto">
                        <p className="mb-2">1. O uso de IA generativa implica responsabilidade ética...</p>
                        <p className="mb-2">2. Dados sensíveis não devem ser compartilhados sem anonimização...</p>
                        <p>3. A Academia Lendária reserva-se o direito de auditoria...</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button onClick={() => setIsModalOpen(false)}>Aceitar Termos</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* 2. Form Modal (Edit Profile) */}
        <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
            <DialogContent onClose={() => setIsFormModalOpen(false)} className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                        Faça alterações no seu perfil público aqui. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input id="name" value="Alan Nicolas" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">Username</Label>
                        <Input id="username" value="@alannicolas" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsFormModalOpen(false)}>Cancelar</Button>
                    <Button type="submit" onClick={() => {
                        setIsFormModalOpen(false);
                        toast({ title: "Perfil Atualizado", description: "Suas alterações foram salvas.", variant: "success" });
                    }}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* 3. Success Modal */}
        <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
            <DialogContent onClose={() => setIsSuccessModalOpen(false)} className="sm:max-w-sm text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4 animate-accordion-down">
                    <Icon name="check" className="text-success" size="size-8" />
                </div>
                <DialogHeader className="text-center sm:text-center">
                    <DialogTitle className="text-xl">Projeto Criado!</DialogTitle>
                    <DialogDescription>
                        Seu novo projeto de IA foi inicializado com sucesso e está pronto para configuração.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center mt-6">
                    <Button className="w-full" onClick={() => setIsSuccessModalOpen(false)}>Ir para o Dashboard</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* 4. Destructive Modal */}
        <Dialog open={isDestructiveModalOpen} onOpenChange={setIsDestructiveModalOpen}>
            <DialogContent onClose={() => setIsDestructiveModalOpen(false)}>
                <DialogHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                        <Icon name="exclamation" className="text-red-600" size="size-6" />
                    </div>
                    <DialogTitle className="text-center">Deletar Projeto?</DialogTitle>
                    <DialogDescription className="text-center">
                        Esta ação não pode ser desfeita. Todos os prompts e históricos associados serão perdidos permanentemente.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center">
                    <Button variant="outline" onClick={() => setIsDestructiveModalOpen(false)}>Manter Projeto</Button>
                    <Button variant="destructive" onClick={() => {
                        setIsDestructiveModalOpen(false);
                        toast({ title: "Projeto Deletado", description: "O projeto foi removido permanentemente.", variant: "destructive" });
                    }}>Sim, Deletar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </section>

      {/* --- TOASTS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="bell" /> Toasts & Notificações
        </h3>
        <p className="text-sm text-muted-foreground font-serif">Mensagens transientes que aparecem nos cantos da tela. <strong>Clique para testar.</strong></p>
        
        <div className="bg-muted/10 p-8 rounded-xl border border-dashed border-border flex flex-wrap gap-4 justify-center">
            
            <Button variant="outline" onClick={() => {
                toast({
                    title: "Sucesso!",
                    description: "Seu arquivo foi enviado com segurança.",
                    variant: "success",
                })
            }}>
                Disparar Sucesso
            </Button>

            <Button variant="outline" onClick={() => {
                toast({
                    title: "Atenção",
                    description: "Sua sessão vai expirar em 5 minutos.",
                    variant: "warning",
                })
            }}>
                Disparar Aviso
            </Button>

            <Button variant="outline" onClick={() => {
                toast({
                    title: "Erro de Conexão",
                    description: "Não foi possível salvar as alterações.",
                    variant: "destructive",
                })
            }}>
                Disparar Erro
            </Button>

            <Button variant="outline" onClick={() => {
                toast({
                    title: "Atualização",
                    description: "Novos recursos disponíveis no sistema.",
                })
            }}>
                Disparar Padrão
            </Button>

        </div>
      </section>

      {/* --- TOOLTIPS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="info" /> Tooltips
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Dicas contextuais que aparecem ao passar o mouse. Utilize para desambiguação ou detalhes extras.
        </p>

        <div className="flex flex-wrap gap-12 items-center p-8 bg-muted/10 rounded-xl border border-dashed border-border">
            
            {/* 1. Simple Tooltip */}
            <Tooltip>
                <TooltipTrigger>
                    <Button variant="outline" size="icon"><Icon name="info" /></Button>
                </TooltipTrigger>
                <TooltipContent>
                    Mais informações
                </TooltipContent>
            </Tooltip>

            {/* 2. Text Link Tooltip */}
            <Tooltip>
                <TooltipTrigger>
                    <span className="text-muted-foreground underline decoration-dotted cursor-help text-sm">Termo Técnico</span>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[200px] whitespace-normal text-center">
                    Explicação detalhada sobre o termo técnico no contexto da IA.
                </TooltipContent>
            </Tooltip>

            {/* 3. Rich User Preview Tooltip */}
            <Tooltip>
                <TooltipTrigger>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar size="sm" className="ring-2 ring-transparent hover:ring-primary/50 transition-all">
                            <AvatarImage src={alanAvatar} />
                            <AvatarFallback>AN</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-semibold hover:text-primary transition-colors">Alan Nicolas</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="p-0 bg-transparent shadow-none border-none">
                    {/* Nested custom content inside Tooltip primitive if needed, or simply style TooltipContent */}
                    <div className="w-64 bg-card border border-border rounded-xl shadow-2xl p-4 text-left">
                        <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={alanAvatar} />
                                <AvatarFallback>AN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h5 className="font-bold text-sm text-foreground">Alan Nicolas</h5>
                                <p className="text-xs text-muted-foreground">Founder @ Academia Lendária</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground font-serif mt-3 leading-relaxed whitespace-normal">
                            Líder visionário focado em potencializar humanos com Inteligência Artificial.
                        </p>
                    </div>
                </TooltipContent>
            </Tooltip>

            {/* 4. Status Tooltip */}
            <Tooltip>
                <TooltipTrigger>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success cursor-help"></div>
                        <span className="text-sm">Sistema Online</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-zinc-900 text-white">
                    Uptime: 99.9% (Últimas 24h)
                </TooltipContent>
            </Tooltip>

        </div>
      </section>

    </div>
  );
};

export default FeedbackSection;
