import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';
import { Symbol } from '../ui/symbol';
import { Stepper } from '../ui/stepper'; // New Import

const StatesSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Estados do Sistema</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Gerenciando a expectativa do usuário durante latência, ausência de dados e falhas.
        </p>
      </div>

      {/* --- SKELETONS EXPANDED --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Estruturas de Carregamento (Skeletons)</h3>
        
        <div className="grid grid-cols-1 gap-12">
            
            {/* 1. Dashboard Skeleton */}
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Dashboard & Analytics</p>
                <div className="border border-border rounded-xl p-6 space-y-6 bg-background">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-48" />
                        <div className="flex gap-2">
                            <Skeleton className="h-9 w-24" />
                            <Skeleton className="h-9 w-9" />
                        </div>
                    </div>
                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="p-4 space-y-3 bg-card">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-3 w-full" />
                            </Card>
                        ))}
                    </div>
                    {/* Main Chart Area */}
                    <Card className="p-6 h-64 flex flex-col justify-between bg-card">
                        <div className="flex justify-between mb-4">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                        <div className="flex items-end gap-2 h-full pb-2">
                            {[...Array(12)].map((_, i) => (
                                <Skeleton key={i} className="w-full rounded-t-sm" style={{ height: `${Math.random() * 60 + 20}%` }} />
                            ))}
                        </div>
                        <div className="border-t border-border mt-2 pt-2 flex justify-between">
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-3 w-8" />
                        </div>
                    </Card>
                </div>
            </div>

            {/* 2. Chat / AI Interaction Skeleton */}
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Interface de Chat (IA Thinking)</p>
                <Card className="p-6 max-w-2xl mx-auto bg-card">
                    <div className="space-y-6">
                        {/* User Message */}
                        <div className="flex justify-end">
                            <div className="bg-primary/10 rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                                <p className="text-sm font-medium">Crie uma estratégia de lançamento para um produto digital.</p>
                            </div>
                        </div>

                        {/* AI Thinking / Loading */}
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-10 rounded-full shrink-0" /> {/* Avatar */}
                            <div className="space-y-2 w-full">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <span className="text-xs text-muted-foreground animate-pulse">Pensando...</span>
                                </div>
                                <Skeleton className="h-4 w-[90%]" />
                                <Skeleton className="h-4 w-[95%]" />
                                <Skeleton className="h-4 w-[75%]" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 3. Detail Page / Article */}
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Página de Detalhes</p>
                <div className="border border-border rounded-xl overflow-hidden bg-card">
                    {/* Cover Image */}
                    <Skeleton className="h-48 w-full rounded-none" />
                    <div className="p-8 space-y-6">
                        {/* Title Section */}
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-3/4" />
                            <div className="flex gap-3">
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                        </div>
                        {/* Body Text */}
                        <div className="space-y-3 pt-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[92%]" />
                            <Skeleton className="h-4 w-[98%]" />
                            <Skeleton className="h-4 w-[60%]" />
                        </div>
                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* --- EMPTY STATES --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="box-open" /> Empty States (Vazios)
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Momentos em que não há dados para mostrar. Use para educar e incentivar a primeira ação.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Simple Empty State */}
            <div className="border border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 text-muted-foreground">
                    <Icon name="search" size="size-8" />
                </div>
                <h4 className="text-lg font-bold mb-2">Nenhum resultado encontrado</h4>
                <p className="text-sm text-muted-foreground max-w-xs mb-6 font-serif">
                    Não encontramos nada com os filtros selecionados. Tente ajustar sua busca.
                </p>
                <Button variant="outline">Limpar Filtros</Button>
            </div>

            {/* Call to Action Empty State */}
            <div className="border border-border rounded-xl p-12 flex flex-col items-center justify-center text-center bg-card shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary animate-pulse">
                    <Icon name="magic-wand" size="size-8" />
                </div>
                <h4 className="text-lg font-bold mb-2">Crie sua primeira Lenda</h4>
                <p className="text-sm text-muted-foreground max-w-xs mb-6 font-serif">
                    Você ainda não gerou nenhum conteúdo. Comece agora a usar a IA para potencializar seu trabalho.
                </p>
                <Button className="gap-2">
                    <Icon name="plus" size="size-4" /> Novo Projeto
                </Button>
            </div>

        </div>
      </section>

      {/* --- ERROR & MAINTENANCE --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="exclamation-triangle" /> Erros & Exceções
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 404 / Generic Error */}
            <Card className="overflow-hidden border-destructive/20 bg-card">
                <div className="h-2 bg-destructive/50 w-full"></div>
                <CardContent className="p-12 flex flex-col items-center text-center">
                    <div className="text-destructive mb-4">
                        <Icon name="cross-circle" size="size-10" />
                    </div>
                    <h4 className="text-2xl font-bold font-sans mb-2">Falha na Conexão</h4>
                    <p className="text-muted-foreground font-serif mb-6 max-w-sm">
                        Não foi possível sincronizar seus dados com o servidor neural. Verifique sua conexão e tente novamente.
                    </p>
                    <div className="flex gap-4">
                        <Button variant="ghost">Reportar</Button>
                        <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">Tentar Novamente</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Offline / Maintenance */}
            <Card className="bg-muted/10 border-none">
                <CardContent className="p-12 flex flex-col items-center text-center">
                    <Icon name="cloud-slash" className="text-muted-foreground mb-4 text-6xl opacity-20" />
                    <h4 className="text-xl font-bold font-sans mb-2 text-muted-foreground">Modo Offline</h4>
                    <p className="text-sm text-muted-foreground/70 font-serif mb-6 max-w-xs">
                        Você está navegando em uma versão em cache. Algumas funcionalidades de IA podem estar indisponíveis.
                    </p>
                    <Badge variant="outline" className="bg-background">Última sync: 14:30</Badge>
                </CardContent>
            </Card>

        </div>
      </section>

      {/* --- LOADERS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Loaders & Spinners</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Standard Spinner */}
            <Card className="flex flex-col items-center justify-center p-8 bg-card">
                <div className="animate-spin text-primary mb-4">
                    <Icon name="spinner" size="size-8" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Carregamento Padrão</p>
            </Card>

            {/* AI Generation Loader */}
            <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-card to-primary/5 border-primary/20">
                <div className="relative mb-4">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                    <Symbol name="infinity" className="text-4xl text-primary animate-spin-slow relative z-10" />
                </div>
                <p className="text-sm font-bold text-foreground animate-pulse">Gerando Lenda...</p>
                <p className="text-xs text-muted-foreground">Processando tokens neurais</p>
            </Card>

            {/* Progress Bar */}
            <Card className="flex flex-col justify-center p-8 space-y-4 bg-card">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                        <span>Upload</span>
                        <span>45%</span>
                    </div>
                    <Progress value={45} />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                        <span>Processamento</span>
                        <span>Indeterminado</span>
                    </div>
                    {/* Indeterminate simulated by full width + pulse */}
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2 animate-[shimmer_1.5s_infinite] rounded-full"></div>
                    </div>
                </div>
            </Card>
        </div>
      </section>

      {/* --- WIZARD / STEPPER --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2">Jornada em Etapas (Wizard)</h3>
        
        <div className="bg-card border border-border rounded-xl p-8 space-y-12">
            
            {/* Replaced manual stepper with Component */}
            <Stepper 
                currentStep={1} 
                steps={[
                    { id: 1, label: "Dados" },
                    { id: 2, label: "Configuração IA" },
                    { id: 3, label: "Revisão" },
                    { id: 4, label: "Pagamento" },
                ]} 
            />

            {/* Content Placeholder */}
            <div className="bg-muted/10 border border-dashed border-border rounded-lg h-32 flex items-center justify-center text-muted-foreground text-sm font-serif">
                Conteúdo do Passo 2: Configuração do Modelo Neural
            </div>
        </div>
      </section>

    </div>
  );
};

export default StatesSection;