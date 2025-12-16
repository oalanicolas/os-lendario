
import React, { useState } from 'react';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Progress } from '../../ui/progress';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { Checkbox } from '../../ui/checkbox';
import { cn } from '../../../lib/utils';

// --- TYPES ---
interface ValidationItem {
    id: string;
    category: string;
    title: string;
    description: string;
    status: 'passed' | 'failed' | 'warning' | 'pending';
    autoCheck: boolean;
    details?: string;
}

interface QualityMetric {
    label: string;
    score: number;
    maxScore: number;
    status: 'success' | 'warning' | 'error';
}

interface CourseValidationTemplateProps {
    setSection: (s: Section) => void;
    courseSlug: string;
    courseTitle: string;
    onBack: () => void;
    onNavigate: (view: 'overview' | 'brief' | 'research' | 'curriculum' | 'lessons') => void;
    onPublish?: () => void;
}

// --- SIDEBAR NAV COMPONENT ---
const CourseSidebar = ({
    courseTitle,
    currentStep,
    pipeline,
    onNavigate
}: {
    courseTitle: string;
    currentStep: string;
    pipeline: { key: string; label: string; status: 'completed' | 'current' | 'pending' }[];
    onNavigate: (view: any) => void;
}) => {
    return (
        <div className="w-64 border-r border-border bg-card/50 flex flex-col shrink-0 h-[calc(100vh-64px)]">
            <div className="p-4 border-b border-border">
                <button
                    onClick={() => onNavigate('overview')}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
                >
                    <Icon name="arrow-left" size="size-3" />
                    <span>Voltar ao curso</span>
                </button>
                <h3 className="font-bold text-foreground truncate">{courseTitle}</h3>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Pipeline</p>
                    {pipeline.map((step) => {
                        let iconName = "circle";
                        let colorClass = "text-muted-foreground/40";

                        if (step.status === 'completed') {
                            iconName = "check-circle";
                            colorClass = "text-success";
                        } else if (step.status === 'current') {
                            iconName = "target";
                            colorClass = "text-primary";
                        }

                        const isActive = currentStep === step.key;

                        return (
                            <button
                                key={step.key}
                                onClick={() => onNavigate(step.key)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium ring-1 ring-primary/20"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon
                                    name={iconName}
                                    size="size-4"
                                    className={colorClass}
                                    type={step.status === 'completed' ? 'solid' : 'regular'}
                                />
                                <span>{step.label}</span>
                            </button>
                        );
                    })}
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-border bg-muted/20">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Icon name="clock" size="size-3" />
                    <span>Última validação</span>
                </div>
                <p className="text-[10px] text-muted-foreground">09/12/2025 às 14:32</p>
            </div>
        </div>
    );
};

// --- MOCK DATA ---
const mockValidationItems: ValidationItem[] = [
    // Conteúdo
    { id: 'v1', category: 'Conteúdo', title: 'Todas as lições têm conteúdo', description: 'Verificar se nenhuma lição está vazia', status: 'passed', autoCheck: true },
    { id: 'v2', category: 'Conteúdo', title: 'Scripts com mínimo de 500 palavras', description: 'Garantir densidade de conteúdo', status: 'passed', autoCheck: true, details: '36/36 lições aprovadas' },
    { id: 'v3', category: 'Conteúdo', title: 'Sem erros ortográficos graves', description: 'Revisão automática de gramática', status: 'warning', autoCheck: true, details: '3 sugestões encontradas' },
    { id: 'v4', category: 'Conteúdo', title: 'Links funcionando', description: 'Verificar links externos e internos', status: 'passed', autoCheck: true },

    // Estrutura
    { id: 'v5', category: 'Estrutura', title: 'Ordem lógica dos módulos', description: 'Progressão de dificuldade coerente', status: 'passed', autoCheck: false },
    { id: 'v6', category: 'Estrutura', title: 'Duração adequada por lição', description: 'Entre 5-15 minutos recomendado', status: 'passed', autoCheck: true, details: 'Média: 8.5 min' },
    { id: 'v7', category: 'Estrutura', title: 'Materiais de apoio inclusos', description: 'PDFs, templates ou recursos', status: 'warning', autoCheck: true, details: '2 lições sem material' },

    // GPS Framework
    { id: 'v8', category: 'GPS Framework', title: 'Score GPS acima de 70', description: 'Todas as lições validadas pelo GPS', status: 'passed', autoCheck: true, details: 'Média: 85/100' },
    { id: 'v9', category: 'GPS Framework', title: 'Destino claro em cada aula', description: 'Objetivo definido no início', status: 'passed', autoCheck: true },
    { id: 'v10', category: 'GPS Framework', title: 'Origem mapeada (empatia)', description: 'Conexão com dores do aluno', status: 'passed', autoCheck: true },

    // Didática Lendária
    { id: 'v11', category: 'Didática Lendária', title: 'Score DL acima de 70', description: 'Todas as lições validadas pelo DL', status: 'passed', autoCheck: true, details: 'Média: 82/100' },
    { id: 'v12', category: 'Didática Lendária', title: 'Hook presente em todas as aulas', description: 'Gancho inicial para engajamento', status: 'passed', autoCheck: true },
    { id: 'v13', category: 'Didática Lendária', title: 'Call to Action definido', description: 'Próximo passo claro para o aluno', status: 'failed', autoCheck: true, details: '4 lições sem CTA' },

    // Mídia
    { id: 'v14', category: 'Mídia', title: 'Vídeos carregados', description: 'Todos os vídeos presentes', status: 'pending', autoCheck: true },
    { id: 'v15', category: 'Mídia', title: 'Qualidade de áudio OK', description: 'Sem ruídos ou distorções', status: 'pending', autoCheck: false },
    { id: 'v16', category: 'Mídia', title: 'Thumbnails gerados', description: 'Imagens de capa para lições', status: 'pending', autoCheck: true },
];

const mockQualityMetrics: QualityMetric[] = [
    { label: 'Score GPS Médio', score: 85, maxScore: 100, status: 'success' },
    { label: 'Score DL Médio', score: 82, maxScore: 100, status: 'success' },
    { label: 'Cobertura de Conteúdo', score: 100, maxScore: 100, status: 'success' },
    { label: 'Materiais de Apoio', score: 94, maxScore: 100, status: 'warning' },
    { label: 'Consistência de Voz', score: 88, maxScore: 100, status: 'success' },
];

const CourseValidationTemplate: React.FC<CourseValidationTemplateProps> = ({
    setSection,
    courseSlug,
    courseTitle,
    onBack,
    onNavigate,
    onPublish
}) => {
    const [validationItems, setValidationItems] = useState<ValidationItem[]>(mockValidationItems);
    const [isValidating, setIsValidating] = useState(false);
    const [manualChecks, setManualChecks] = useState<Record<string, boolean>>({});

    const pipeline = [
        { key: 'brief', label: 'Brief', status: 'completed' as const },
        { key: 'research', label: 'Research', status: 'completed' as const },
        { key: 'curriculum', label: 'Currículo', status: 'completed' as const },
        { key: 'lessons', label: 'Lições', status: 'completed' as const },
        { key: 'validation', label: 'Validação', status: 'current' as const },
    ];

    // Group items by category
    const categories = Array.from(new Set(validationItems.map(item => item.category)));

    // Statistics
    const stats = {
        passed: validationItems.filter(i => i.status === 'passed').length,
        failed: validationItems.filter(i => i.status === 'failed').length,
        warning: validationItems.filter(i => i.status === 'warning').length,
        pending: validationItems.filter(i => i.status === 'pending').length,
        total: validationItems.length
    };

    const overallScore = Math.round(
        ((stats.passed + stats.warning * 0.5) / stats.total) * 100
    );

    const canPublish = stats.failed === 0 && stats.pending === 0;

    const handleRunValidation = () => {
        setIsValidating(true);
        setTimeout(() => {
            setValidationItems(prev => prev.map(item =>
                item.status === 'pending'
                    ? { ...item, status: Math.random() > 0.3 ? 'passed' : 'warning' as any }
                    : item
            ));
            setIsValidating(false);
        }, 2500);
    };

    const toggleManualCheck = (itemId: string) => {
        setManualChecks(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const getStatusIcon = (status: ValidationItem['status']) => {
        switch (status) {
            case 'passed': return { icon: 'check-circle', color: 'text-success', bg: 'bg-success/10' };
            case 'failed': return { icon: 'times-circle', color: 'text-destructive', bg: 'bg-destructive/10' };
            case 'warning': return { icon: 'exclamation-triangle', color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' };
            default: return { icon: 'clock', color: 'text-muted-foreground', bg: 'bg-muted/10' };
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-success';
        if (score >= 60) return 'text-brand-yellow';
        return 'text-destructive';
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans">
            <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <CourseSidebar
                    courseTitle={courseTitle}
                    currentStep="validation"
                    pipeline={pipeline}
                    onNavigate={onNavigate}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
                        <div>
                            <h1 className="text-lg font-bold">Validação Final</h1>
                            <p className="text-xs text-muted-foreground">Checklist de qualidade antes da publicação</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRunValidation}
                                disabled={isValidating}
                            >
                                {isValidating ? (
                                    <>
                                        <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                                        Validando...
                                    </>
                                ) : (
                                    <>
                                        <Icon name="refresh" className="mr-2 size-4" />
                                        Re-validar
                                    </>
                                )}
                            </Button>
                            <Button
                                onClick={onPublish}
                                disabled={!canPublish}
                                className={cn(
                                    "shadow-lg",
                                    canPublish
                                        ? "bg-success hover:bg-success/90 text-white shadow-success/20"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                <Icon name="rocket" className="mr-2 size-4" />
                                Publicar Curso
                            </Button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <ScrollArea className="flex-1">
                        <div className="max-w-5xl mx-auto p-8 space-y-8">

                            {/* Overall Score Card */}
                            <Card className={cn(
                                "border-2",
                                canPublish ? "border-success/30 bg-success/5" : "border-brand-yellow/30 bg-brand-yellow/5"
                            )}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className={cn(
                                                "w-20 h-20 rounded-full flex items-center justify-center",
                                                canPublish ? "bg-success/20" : "bg-brand-yellow/20"
                                            )}>
                                                <span className={cn("text-3xl font-bold", canPublish ? "text-success" : "text-brand-yellow")}>
                                                    {overallScore}
                                                </span>
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold">
                                                    {canPublish ? 'Pronto para Publicar!' : 'Ajustes Necessários'}
                                                </h2>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {stats.passed} aprovados, {stats.warning} avisos, {stats.failed} falhas, {stats.pending} pendentes
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="text-center p-3 bg-success/10 rounded-lg">
                                                <p className="text-2xl font-bold text-success">{stats.passed}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Aprovados</p>
                                            </div>
                                            <div className="text-center p-3 bg-brand-yellow/10 rounded-lg">
                                                <p className="text-2xl font-bold text-brand-yellow">{stats.warning}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Avisos</p>
                                            </div>
                                            <div className="text-center p-3 bg-destructive/10 rounded-lg">
                                                <p className="text-2xl font-bold text-destructive">{stats.failed}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Falhas</p>
                                            </div>
                                            <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                <p className="text-2xl font-bold text-muted-foreground">{stats.pending}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Pendentes</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quality Metrics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Métricas de Qualidade</CardTitle>
                                    <CardDescription>Scores automáticos baseados nos frameworks GPS e Didática Lendária</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-5 gap-4">
                                        {mockQualityMetrics.map((metric, index) => (
                                            <div key={index} className="text-center p-4 bg-muted/20 rounded-lg">
                                                <p className={cn("text-2xl font-bold font-mono", getScoreColor(metric.score))}>
                                                    {metric.score}
                                                </p>
                                                <Progress
                                                    value={metric.score}
                                                    className="h-1.5 mt-2"
                                                    indicatorClassName={
                                                        metric.status === 'success' ? 'bg-success' :
                                                        metric.status === 'warning' ? 'bg-brand-yellow' : 'bg-destructive'
                                                    }
                                                />
                                                <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">{metric.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Failed/Warning Items Alert */}
                            {(stats.failed > 0 || stats.warning > 0) && (
                                <Alert className={stats.failed > 0 ? "border-destructive/30 bg-destructive/5" : "border-brand-yellow/30 bg-brand-yellow/5"}>
                                    <Icon name={stats.failed > 0 ? "times-circle" : "exclamation-triangle"} className={cn("size-4", stats.failed > 0 ? "text-destructive" : "text-brand-yellow")} />
                                    <AlertTitle>{stats.failed > 0 ? 'Correções Obrigatórias' : 'Atenção'}</AlertTitle>
                                    <AlertDescription>
                                        {stats.failed > 0
                                            ? `${stats.failed} item(s) falharam na validação e precisam ser corrigidos antes da publicação.`
                                            : `${stats.warning} item(s) têm avisos. Recomendamos revisar antes de publicar.`
                                        }
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Validation Checklist by Category */}
                            {categories.map(category => {
                                const categoryItems = validationItems.filter(i => i.category === category);
                                return (
                                    <Card key={category}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                                {category}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            {categoryItems.map((item, index) => {
                                                const statusInfo = getStatusIcon(item.status);
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={cn(
                                                            "flex items-center gap-4 p-4 border-b border-border last:border-0",
                                                            item.status === 'failed' && "bg-destructive/5"
                                                        )}
                                                    >
                                                        {/* Status Icon */}
                                                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", statusInfo.bg)}>
                                                            <Icon
                                                                name={statusInfo.icon}
                                                                className={statusInfo.color}
                                                                size="size-5"
                                                                type={item.status === 'passed' ? 'solid' : 'regular'}
                                                            />
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-sm">{item.title}</span>
                                                                {item.autoCheck && (
                                                                    <Badge variant="outline" className="text-[9px] px-1.5 py-0">Auto</Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">{item.description}</p>
                                                            {item.details && (
                                                                <p className={cn("text-xs mt-1 font-medium", statusInfo.color)}>{item.details}</p>
                                                            )}
                                                        </div>

                                                        {/* Manual Check (for non-auto items) */}
                                                        {!item.autoCheck && item.status !== 'passed' && (
                                                            <div className="flex items-center gap-2">
                                                                <Checkbox
                                                                    id={`check-${item.id}`}
                                                                    checked={manualChecks[item.id] || false}
                                                                    onCheckedChange={() => toggleManualCheck(item.id)}
                                                                />
                                                                <label htmlFor={`check-${item.id}`} className="text-xs text-muted-foreground cursor-pointer">
                                                                    Verificado
                                                                </label>
                                                            </div>
                                                        )}

                                                        {/* Action Button for Failed Items */}
                                                        {item.status === 'failed' && (
                                                            <Button variant="outline" size="sm" className="shrink-0">
                                                                <Icon name="arrow-right" className="mr-2 size-3" />
                                                                Corrigir
                                                            </Button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </CardContent>
                                    </Card>
                                );
                            })}

                            {/* Final Actions */}
                            <div className="flex justify-between items-center pt-8 border-t border-border">
                                <Button variant="outline" onClick={() => onNavigate('lessons')}>
                                    <Icon name="arrow-left" className="mr-2 size-4" />
                                    Voltar às Lições
                                </Button>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline">
                                        <Icon name="download" className="mr-2 size-4" />
                                        Exportar Relatório
                                    </Button>
                                    <Button
                                        onClick={onPublish}
                                        disabled={!canPublish}
                                        size="lg"
                                        className={cn(
                                            "shadow-lg min-w-[180px]",
                                            canPublish
                                                ? "bg-success hover:bg-success/90 text-white shadow-success/20"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        <Icon name="rocket" className="mr-2 size-5" />
                                        {canPublish ? 'Publicar Curso' : 'Correções Pendentes'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default CourseValidationTemplate;
