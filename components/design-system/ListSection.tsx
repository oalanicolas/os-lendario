import React from 'react';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

// --- HELPER COMPONENTS ---

type CheckStyle = 'standard' | 'white' | 'soft' | 'soft-outlined' | 'solid' | 'outlined';
type ColorVariant = 'dark' | 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'light' | 'primary';
type Shape = 'rounded' | 'circle';

interface ListItemProps {
  style?: CheckStyle;
  color?: ColorVariant;
  shape?: Shape;
  label: React.ReactNode;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ style = 'standard', color = 'dark', shape = 'circle', label, className }) => {
  
  // Mapping Colors
  const colorMap: Record<ColorVariant, { 
    text: string; 
    bg: string; 
    border: string; 
    iconColor: string;
    bgSolid: string;
  }> = {
    dark: { text: 'text-foreground', bg: 'bg-foreground/10', border: 'border-foreground', iconColor: 'text-foreground', bgSolid: 'bg-foreground' },
    gray: { text: 'text-muted-foreground', bg: 'bg-muted', border: 'border-muted-foreground/30', iconColor: 'text-muted-foreground', bgSolid: 'bg-muted-foreground' },
    green: { text: 'text-brand-green', bg: 'bg-brand-green/10', border: 'border-brand-green', iconColor: 'text-brand-green', bgSolid: 'bg-brand-green' },
    blue: { text: 'text-brand-blue', bg: 'bg-brand-blue/10', border: 'border-brand-blue', iconColor: 'text-brand-blue', bgSolid: 'bg-brand-blue' },
    red: { text: 'text-brand-red', bg: 'bg-brand-red/10', border: 'border-brand-red', iconColor: 'text-brand-red', bgSolid: 'bg-brand-red' },
    yellow: { text: 'text-brand-yellow', bg: 'bg-brand-yellow/10', border: 'border-brand-yellow', iconColor: 'text-brand-yellow-dark', bgSolid: 'bg-brand-yellow' },
    light: { text: 'text-foreground', bg: 'bg-white/10', border: 'border-white/30', iconColor: 'text-white', bgSolid: 'bg-white' }, 
    primary: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary', iconColor: 'text-primary', bgSolid: 'bg-primary' },
  };

  const colors = colorMap[color];
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  // Define Icon Container Styles
  let iconContainerClass = "";
  let checkIconClass = "";

  switch (style) {
    case 'standard':
      iconContainerClass = cn("w-5 h-5 flex items-center justify-center shrink-0");
      checkIconClass = colors.text;
      break;
    case 'white':
      iconContainerClass = cn("w-5 h-5 flex items-center justify-center bg-card border border-border shadow-sm shrink-0", radius);
      checkIconClass = colors.text;
      break;
    case 'soft':
      iconContainerClass = cn("w-5 h-5 flex items-center justify-center shrink-0", colors.bg, radius);
      checkIconClass = colors.iconColor;
      break;
    case 'soft-outlined':
        iconContainerClass = cn("w-5 h-5 flex items-center justify-center border shrink-0", colors.bg, colors.border, radius);
        checkIconClass = colors.iconColor;
        break;
    case 'solid':
        iconContainerClass = cn("w-5 h-5 flex items-center justify-center shrink-0", colors.bgSolid, radius);
        // Contrast logic for solid backgrounds
        checkIconClass = (color === 'yellow' || color === 'primary') ? 'text-black' : 'text-white dark:text-black'; 
        if (color === 'dark') checkIconClass = 'text-background';
        break;
    case 'outlined':
        iconContainerClass = cn("w-5 h-5 flex items-center justify-center border bg-transparent shrink-0", colors.border, radius);
        checkIconClass = colors.text;
        break;
  }

  return (
    <div className={cn("flex items-start gap-3", className)}>
        <div className={cn(iconContainerClass, "mt-0.5")}>
            <Icon name="check" className={cn("w-3 h-3", checkIconClass)} />
        </div>
        <span className="text-sm text-foreground/90 font-medium leading-tight">{label}</span>
    </div>
  );
};

const ListSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-8">
        <div>
            <h2 className="text-4xl font-serif font-light mb-4">Listas & Checklist</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Componentes essenciais para exibir recursos, passos, comparações e metadados.
            Projetados para legibilidade e escaneabilidade.
            </p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="h-8">v4.1 System</Badge>
        </div>
      </div>

      {/* --- SECTION 1: REAL WORLD CONTEXT (HERO) --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold flex items-center gap-2">
            <Icon name="layout-fluid" className="text-primary" /> Aplicação Real
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* USE CASE: PRICING CARD (Solid/Primary) */}
            <Card className="border-primary/20 bg-gradient-to-b from-card to-primary/5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Icon name="crown" className="text-8xl -rotate-12" />
                </div>
                <CardHeader>
                    <Badge className="w-fit mb-2">Recomendado</Badge>
                    <CardTitle className="text-2xl">Lendário Pro</CardTitle>
                    <CardDescription>Para quem busca o topo.</CardDescription>
                    <div className="pt-4 flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-primary">R$ 97</span>
                        <span className="text-muted-foreground">/mês</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Separator className="bg-primary/20" />
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">O que está incluso:</p>
                    <div className="space-y-3">
                        <ListItem label="Acesso Ilimitado à IA" style="solid" color="primary" shape="circle" />
                        <ListItem label="Templates de Alta Conversão" style="solid" color="primary" shape="circle" />
                        <ListItem label="Suporte Prioritário 24/7" style="solid" color="primary" shape="circle" />
                        <ListItem label="Comunidade Exclusiva" style="solid" color="primary" shape="circle" />
                        <ListItem label="Certificação Oficial" style="solid" color="primary" shape="circle" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full shadow-lg shadow-primary/20">Assinar Agora</Button>
                </CardFooter>
            </Card>

            {/* USE CASE: FEATURE BREAKDOWN (Soft/Blue) */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Icon name="settings" /> Configuração do Projeto
                    </CardTitle>
                    <CardDescription>Checklist de lançamento.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <ListItem label="Definição de Domínio" style="soft" color="blue" shape="rounded" />
                            <ListItem label="Configuração de DNS" style="soft" color="blue" shape="rounded" />
                            <ListItem label="Instalação de Certificado SSL" style="soft" color="blue" shape="rounded" />
                        </div>
                        <Separator />
                        <div className="space-y-3 opacity-60">
                            <ListItem label="Integração de Pagamento" style="outlined" color="gray" shape="rounded" />
                            <ListItem label="Testes de Carga" style="outlined" color="gray" shape="rounded" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">Gerenciar</Button>
                </CardFooter>
            </Card>

            {/* USE CASE: PROS & CONS (Semantic) */}
            <Card>
                <CardHeader>
                    <CardTitle>Análise Comparativa</CardTitle>
                    <CardDescription>Pontos fortes e fracos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="text-sm font-bold text-success mb-3 flex items-center gap-2"><Icon name="thumbs-up" /> Vantagens</h4>
                        <div className="space-y-2">
                            <ListItem label="Alta Performance" style="standard" color="green" />
                            <ListItem label="Escalabilidade Infinita" style="standard" color="green" />
                            <ListItem label="Custo Benefício" style="standard" color="green" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-destructive mb-3 flex items-center gap-2"><Icon name="thumbs-down" /> Desvantagens</h4>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <Icon name="cross" className="w-4 h-4 text-destructive mt-0.5" />
                                <span className="text-sm">Curva de aprendizado</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Icon name="cross" className="w-4 h-4 text-destructive mt-0.5" />
                                <span className="text-sm">Requer internet ativa</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
      </section>

      {/* --- SECTION 2: THE MATRIX (STYLES & COLORS) --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <div className="space-y-2">
            <h3 className="text-xl font-sans font-semibold">Galeria de Estilos</h3>
            <p className="text-sm text-muted-foreground font-serif">
                Matriz de combinações visuais para diferentes hierarquias de informação.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* SOLID - High Emphasis */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Solid (High Emphasis)</h4>
                <div className="space-y-3">
                    <ListItem label="Primary Feature" style="solid" color="primary" />
                    <ListItem label="Success State" style="solid" color="green" />
                    <ListItem label="Alert / Critical" style="solid" color="red" />
                    <ListItem label="Info Highlight" style="solid" color="blue" />
                    <ListItem label="Neutral / Dark" style="solid" color="dark" />
                </div>
            </div>

            {/* SOFT - Medium Emphasis */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Soft (Balanced)</h4>
                <div className="space-y-3">
                    <ListItem label="Primary Feature" style="soft" color="primary" />
                    <ListItem label="Success State" style="soft" color="green" />
                    <ListItem label="Alert / Critical" style="soft" color="red" />
                    <ListItem label="Info Highlight" style="soft" color="blue" />
                    <ListItem label="Neutral / Gray" style="soft" color="gray" />
                </div>
            </div>

            {/* OUTLINED - Low Emphasis */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Outlined (Subtle)</h4>
                <div className="space-y-3">
                    <ListItem label="Primary Feature" style="outlined" color="primary" />
                    <ListItem label="Success State" style="outlined" color="green" />
                    <ListItem label="Alert / Critical" style="outlined" color="red" />
                    <ListItem label="Info Highlight" style="outlined" color="blue" />
                    <ListItem label="Neutral / Gray" style="outlined" color="gray" />
                </div>
            </div>

            {/* MINIMAL - Clean */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Minimal (Clean)</h4>
                <div className="space-y-3">
                    <ListItem label="Standard Check" style="standard" color="primary" />
                    <ListItem label="Green Check" style="standard" color="green" />
                    <div className="flex items-start gap-3">
                        <Icon name="check" className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm text-muted-foreground line-through">Disabled / Completed</span>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* --- SECTION 3: SHAPES & VARIANTS --- */}
      <section className="space-y-8 border-t border-border pt-12">
         <h3 className="text-xl font-sans font-semibold">Formas & Variações</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="bg-muted/10 border-dashed">
                 <CardHeader>
                     <CardTitle className="text-base">Rounded (Square)</CardTitle>
                     <CardDescription>Para listas mais técnicas ou modernas.</CardDescription>
                 </CardHeader>
                 <CardContent className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <ListItem label="Soft Rounded" style="soft" color="blue" shape="rounded" />
                        <ListItem label="Solid Rounded" style="solid" color="blue" shape="rounded" />
                    </div>
                    <div className="space-y-2">
                        <ListItem label="Outlined Rounded" style="outlined" color="blue" shape="rounded" />
                        <ListItem label="White Rounded" style="white" color="blue" shape="rounded" />
                    </div>
                 </CardContent>
             </Card>

             <Card className="bg-muted/10 border-dashed">
                 <CardHeader>
                     <CardTitle className="text-base">Circle (Pill)</CardTitle>
                     <CardDescription>O padrão amigável e orgânico.</CardDescription>
                 </CardHeader>
                 <CardContent className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <ListItem label="Soft Circle" style="soft" color="primary" shape="circle" />
                        <ListItem label="Solid Circle" style="solid" color="primary" shape="circle" />
                    </div>
                    <div className="space-y-2">
                        <ListItem label="Outlined Circle" style="outlined" color="primary" shape="circle" />
                        <ListItem label="White Circle" style="white" color="primary" shape="circle" />
                    </div>
                 </CardContent>
             </Card>
         </div>
      </section>

      {/* --- SECTION 4: TYPOGRAPHY & METADATA --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="text-xl font-sans font-semibold">Tipografia & Metadados</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Standard HTML Lists */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Listas de Texto</h4>
                <div className="p-6 bg-card border border-border rounded-xl space-y-6">
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground marker:text-primary">
                        <li>Item de lista padrão</li>
                        <li>Marcador com cor primária</li>
                        <li>Texto serifado para leitura</li>
                    </ul>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground marker:text-foreground marker:font-bold">
                        <li>Passo ordenado um</li>
                        <li>Passo ordenado dois</li>
                        <li>Passo ordenado três</li>
                    </ol>
                </div>
            </div>

            {/* Inline Separators */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Separadores Inline (Breadcrumbs/Meta)</h4>
                <div className="p-6 bg-card border border-border rounded-xl space-y-4 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 text-sm items-center justify-center">
                        <span className="text-foreground">Home</span>
                        <Icon name="angle-small-right" className="text-muted-foreground opacity-50" size="size-3" />
                        <span className="text-foreground">Settings</span>
                        <Icon name="angle-small-right" className="text-muted-foreground opacity-50" size="size-3" />
                        <span className="font-semibold text-primary">Billing</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs items-center justify-center text-muted-foreground">
                        <span>Admin</span>
                        <Symbol name="bullet" />
                        <span>2h atrás</span>
                        <Symbol name="bullet" />
                        <span>Editado</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm items-center justify-center">
                        <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
                        <span className="text-border">|</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
                        <span className="text-border">|</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Support</span>
                    </div>
                </div>
            </div>

            {/* Icon Metadata List */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Metadados com Ícones</h4>
                <div className="p-6 bg-card border border-border rounded-xl space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            <Icon name="envelope" size="size-4" />
                        </div>
                        <span className="text-muted-foreground">contato@academialendaria.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            <Icon name="marker" size="size-4" />
                        </div>
                        <span className="text-muted-foreground">São Paulo, SP - Brasil</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            <Icon name="globe" size="size-4" />
                        </div>
                        <span className="text-primary hover:underline cursor-pointer">www.academialendaria.com</span>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* --- SECTION 5: LIST GROUPS (Advanced) --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                 <h3 className="text-2xl font-sans font-bold">List Groups & Menus</h3>
                 <p className="text-sm text-muted-foreground">
                     Padrões de navegação vertical e horizontal com estados interativos.
                 </p>
            </div>
        </div>

        {/* 1. Basic Shapes & States */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Usage */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Basic Usage</h4>
                <div className="border border-border rounded-xl overflow-hidden bg-card">
                    <div className="px-4 py-3 text-sm font-medium border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
                        Profile
                    </div>
                    <div className="px-4 py-3 text-sm font-medium border-b border-border bg-primary/5 text-primary cursor-pointer">
                        Active
                    </div>
                    <div className="px-4 py-3 text-sm font-medium border-b border-border bg-muted cursor-pointer">
                        Hover
                    </div>
                    <div className="px-4 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60">
                        Disabled
                    </div>
                </div>
            </div>

            {/* Flush (No outer border radius conceptually, usually inside a card) */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Flush</h4>
                <div className="bg-card">
                    <div className="px-0 py-3 text-sm font-medium border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
                        Profile
                    </div>
                    <div className="px-0 py-3 text-sm font-medium border-b border-border text-primary cursor-pointer">
                        Active
                    </div>
                    <div className="px-0 py-3 text-sm font-medium border-b border-border bg-muted/30 cursor-pointer">
                        Hover
                    </div>
                    <div className="px-0 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60">
                        Disabled
                    </div>
                </div>
            </div>

            {/* No Gutters (Tight) */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No Gutters</h4>
                <div className="border-y border-border bg-card">
                    <div className="px-4 py-2 text-sm font-medium border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
                        Profile
                    </div>
                    <div className="px-4 py-2 text-sm font-medium border-b border-border text-primary cursor-pointer">
                        Active
                    </div>
                    <div className="px-4 py-2 text-sm font-medium border-b border-border bg-muted/30 cursor-pointer">
                        Hover
                    </div>
                    <div className="px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60">
                        Disabled
                    </div>
                </div>
            </div>
        </div>

        {/* 2. Complex Variations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* List Group */}
            <Card className="overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    List Group
                </div>
                <div className="divide-y divide-border">
                    <button className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                        Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                        Settings
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                        Newsletter
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-50">
                        Team
                    </button>
                </div>
            </Card>

            {/* Icons */}
            <Card className="overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    Icons & Badges
                </div>
                <div className="divide-y divide-border">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                        <Icon name="user" className="text-muted-foreground" size="size-4" />
                        Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                        <Icon name="settings" className="text-muted-foreground" size="size-4" />
                        Settings
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Icon name="bell" className="text-muted-foreground" size="size-4" />
                            Newsletter
                        </div>
                        <Badge variant="outline" className="text-[10px] h-5 px-1.5">New</Badge>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors text-primary">
                        <div className="flex items-center gap-3">
                            <Icon name="users-alt" size="size-4" />
                            Team
                        </div>
                        <Badge className="bg-primary text-primary-foreground h-5 px-1.5 text-[10px]">99+</Badge>
                    </button>
                </div>
            </Card>

            {/* Striped */}
            <Card className="overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    Striped
                </div>
                <div className="flex flex-col">
                    <div className="px-4 py-3 text-sm font-medium flex items-center gap-3">
                        <Icon name="user" className="text-muted-foreground" size="size-4" /> Profile
                    </div>
                    <div className="px-4 py-3 text-sm font-medium flex items-center justify-between bg-muted/40">
                        <div className="flex items-center gap-3">
                            <Icon name="settings" className="text-muted-foreground" size="size-4" /> Settings
                        </div>
                        <Badge variant="secondary" className="text-[10px]">New</Badge>
                    </div>
                    <div className="px-4 py-3 text-sm font-medium flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Icon name="bell" className="text-muted-foreground" size="size-4" /> Newsletter
                        </div>
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">2</div>
                    </div>
                    <div className="px-4 py-3 text-sm font-medium flex items-center justify-between bg-muted/40">
                        <div className="flex items-center gap-3">
                            <Icon name="users-alt" className="text-muted-foreground" size="size-4" /> Team
                        </div>
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">9+</div>
                    </div>
                </div>
            </Card>

            {/* Striped with Border */}
            <Card className="overflow-hidden border-2 border-border/60">
                <div className="bg-muted/50 px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    Striped + Border
                </div>
                <div className="flex flex-col divide-y divide-border">
                    <div className="px-4 py-3 text-sm font-medium flex items-center gap-3">
                        <Icon name="user" className="text-muted-foreground" size="size-4" /> Profile
                    </div>
                    <div className="px-4 py-3 text-sm font-medium flex items-center gap-3 bg-muted/30">
                        <Icon name="settings" className="text-muted-foreground" size="size-4" /> Settings
                    </div>
                    <div className="px-4 py-3 text-sm font-medium flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Icon name="bell" className="text-muted-foreground" size="size-4" /> Newsletter
                        </div>
                        <div className="w-5 h-5 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-bold">5</div>
                    </div>
                    <div className="px-4 py-3 text-sm font-medium flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-3">
                            <Icon name="users-alt" className="text-muted-foreground" size="size-4" /> Team
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">99+</div>
                    </div>
                </div>
            </Card>

        </div>

        {/* 3. Horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Horizontal</h4>
                <div className="border border-border rounded-lg p-1 flex overflow-x-auto bg-card">
                    <button className="flex-1 px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors whitespace-nowrap">
                        <Icon name="user" className="inline-block mr-2 text-muted-foreground" size="size-3" /> Profile
                    </button>
                    <div className="w-px bg-border my-1"></div>
                    <button className="flex-1 px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors whitespace-nowrap">
                        <Icon name="settings" className="inline-block mr-2 text-muted-foreground" size="size-3" /> Settings
                    </button>
                    <div className="w-px bg-border my-1"></div>
                    <button className="flex-1 px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors whitespace-nowrap">
                        <Icon name="bell" className="inline-block mr-2 text-muted-foreground" size="size-3" /> Newsletter
                    </button>
                    <div className="w-px bg-border my-1"></div>
                    <button className="flex-1 px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors whitespace-nowrap">
                        <Icon name="users-alt" className="inline-block mr-2 text-muted-foreground" size="size-3" /> Team
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mixed Horizontal</h4>
                <div className="border border-border rounded-lg overflow-hidden flex bg-card divide-x divide-border">
                    <button className="flex-1 px-4 py-3 text-sm font-medium hover:bg-muted/50 text-primary bg-primary/5">
                        <Icon name="user" className="inline-block mr-2" size="size-3" /> Profile
                    </button>
                    <button className="flex-1 px-4 py-3 text-sm font-medium hover:bg-muted/50 flex items-center justify-center gap-2">
                        Settings 
                        <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">2</span>
                    </button>
                    <button className="flex-1 px-4 py-3 text-sm font-medium hover:bg-muted/50 flex items-center justify-center gap-2">
                        Newsletter
                    </button>
                    <button className="flex-1 px-4 py-3 text-sm font-medium bg-muted/20 text-muted-foreground flex items-center justify-center gap-2 cursor-not-allowed">
                        Team
                        <span className="bg-primary/50 text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full">5</span>
                    </button>
                </div>
            </div>
        </div>

      </section>

    </div>
  );
};

export default ListSection;