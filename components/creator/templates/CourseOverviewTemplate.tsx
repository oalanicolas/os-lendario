
import React, { useState } from 'react';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { cn } from '../../../lib/utils';

// --- TYPES ---
export interface CourseData {
    id: string;
    title: string;
    slug: string;
    icon: string;
    description?: string;
    instructor: {
        name: string;
        avatar: string;
        isMMOS: boolean;
    };
    lessonsCount: number;
    modulesCount: number;
    duration: string;
    type: 'Greenfield' | 'Brownfield';
    statusLabel: string;
    progress: number;
    score?: number;
    updatedAt: string;
    createdAt: string;
    pipeline: {
        brief: 'completed' | 'current' | 'pending';
        research: 'completed' | 'current' | 'pending';
        curriculum: 'completed' | 'current' | 'pending';
        lessons: 'completed' | 'current' | 'pending';
        validation: 'completed' | 'current' | 'pending';
    };
    stats?: {
        totalWords: number;
        avgLessonDuration: string;
        completedLessons: number;
        pendingLessons: number;
    };
}

interface CourseOverviewTemplateProps {
    setSection: (s: Section) => void;
    course: CourseData;
    onBack: () => void;
    onNavigate: (view: 'brief' | 'research' | 'curriculum' | 'lessons' | 'validation') => void;
}

// --- MOCK DATA ---
const mockCourse: CourseData = {
    id: 'course_002',
    title: 'Didática Lendária: Aulas que Engajam',
    slug: 'didatica-lendaria',
    icon: 'presentation',
    description: 'Aprenda a criar aulas que prendem a atenção do início ao fim usando o método GPS e técnicas avançadas de engajamento.',
    instructor: {
        name: 'Adriano de Marqui',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
        isMMOS: true
    },
    lessonsCount: 36,
    modulesCount: 5,
    duration: '5.3h',
    type: 'Brownfield',
    statusLabel: 'Em Produção (Lições)',
    progress: 65,
    score: 87,
    updatedAt: '09/12/2025',
    createdAt: '15/11/2025',
    pipeline: {
        brief: 'completed',
        research: 'completed',
        curriculum: 'completed',
        lessons: 'current',
        validation: 'pending'
    },
    stats: {
        totalWords: 24500,
        avgLessonDuration: '8 min',
        completedLessons: 24,
        pendingLessons: 12,
    }
};

// --- COMPONENTS ---
const PipelineStep = ({
    status,
    label,
    onClick,
    isClickable = true
}: {
    status: 'completed' | 'current' | 'pending';
    label: string;
    onClick?: () => void;
    isClickable?: boolean;
}) => {
    let iconName = "circle";
    let colorClass = "text-muted-foreground/40";
    let labelClass = "text-muted-foreground";
    let bgClass = "bg-muted/20";

    if (status === 'completed') {
        iconName = "check-circle";
        colorClass = "text-success";
        labelClass = "text-success";
        bgClass = "bg-success/10";
    } else if (status === 'current') {
        iconName = "target";
        colorClass = "text-primary";
        labelClass = "text-primary font-bold";
        bgClass = "bg-primary/10";
    }

    return (
        <button
            onClick={onClick}
            disabled={!isClickable || status === 'pending'}
            className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 min-w-[100px]",
                bgClass,
                isClickable && status !== 'pending' && "hover:scale-105 cursor-pointer",
                status === 'pending' && "opacity-50 cursor-not-allowed"
            )}
        >
            <Icon
                name={iconName}
                className={cn("size-6 transition-colors", colorClass)}
                type={status === 'completed' ? 'solid' : 'regular'}
            />
            <span className={cn("text-xs uppercase tracking-wider font-medium", labelClass)}>
                {label}
            </span>
        </button>
    );
};

const StatCard = ({ icon, label, value, subValue }: { icon: string; label: string; value: string | number; subValue?: string }) => (
    <Card className="bg-muted/10">
        <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon name={icon} size="size-5" />
            </div>
            <div className="flex-1">
                <p className="text-2xl font-bold font-mono">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
            {subValue && (
                <Badge variant="secondary" className="text-[10px]">{subValue}</Badge>
            )}
        </CardContent>
    </Card>
);

const ActivityItem = ({ icon, title, time, type }: { icon: string; title: string; time: string; type: 'success' | 'info' | 'warning' }) => {
    const colorMap = {
        success: 'text-success bg-success/10',
        info: 'text-primary bg-primary/10',
        warning: 'text-brand-yellow bg-brand-yellow/10',
    };

    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", colorMap[type])}>
                <Icon name={icon} size="size-4" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{title}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
            </div>
        </div>
    );
};

const CourseOverviewTemplate: React.FC<CourseOverviewTemplateProps> = ({
    setSection,
    course = mockCourse,
    onBack,
    onNavigate
}) => {
    const [activeTab, setActiveTab] = useState('overview');

    const getPipelineLabel = (key: string) => {
        const labels: Record<string, string> = {
            brief: 'Brief',
            research: 'Research',
            curriculum: 'Currículo',
            lessons: 'Lições',
            validation: 'Validação'
        };
        return labels[key] || key;
    };

    const getNextStep = () => {
        const steps = ['brief', 'research', 'curriculum', 'lessons', 'validation'] as const;
        for (const step of steps) {
            if (course.pipeline[step] === 'current') {
                return step;
            }
        }
        return 'validation';
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans">
            <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

            <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-12 space-y-8 animate-fade-in">

                {/* --- HEADER --- */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex items-start gap-6">
                        {/* Back Button */}
                        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 mt-1">
                            <Icon name="arrow-left" size="size-5" />
                        </Button>

                        {/* Course Icon */}
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Icon name={course.icon} size="size-10" />
                        </div>

                        {/* Course Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Badge variant={course.type === 'Greenfield' ? 'success' : 'secondary'} className="text-[10px] uppercase">
                                    {course.type}
                                </Badge>
                                <span className="text-xs font-mono text-muted-foreground">/{course.slug}</span>
                            </div>
                            <h1 className="text-3xl font-bold font-sans tracking-tight">{course.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6 border border-border">
                                        <AvatarImage src={course.instructor.avatar} />
                                        <AvatarFallback>{course.instructor.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <span>{course.instructor.name}</span>
                                    {course.instructor.isMMOS && (
                                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">MMOS</Badge>
                                    )}
                                </div>
                                <span className="text-border">|</span>
                                <span>{course.modulesCount} módulos</span>
                                <span className="text-border">|</span>
                                <span>{course.lessonsCount} lições</span>
                                <span className="text-border">|</span>
                                <span>{course.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 lg:shrink-0">
                        <Button variant="outline" size="sm">
                            <Icon name="eye" className="mr-2 size-4" /> Preview
                        </Button>
                        <Button variant="outline" size="sm">
                            <Icon name="copy" className="mr-2 size-4" /> Duplicar
                        </Button>
                        <Button
                            onClick={() => onNavigate(getNextStep())}
                            className="bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        >
                            Continuar Edição <Icon name="arrow-right" className="ml-2 size-4" />
                        </Button>
                    </div>
                </div>

                {/* --- PIPELINE VISUAL --- */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Pipeline de Produção</h3>
                                <p className="text-xs text-muted-foreground mt-1">Clique em uma etapa para navegar</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-2xl font-bold font-mono">{course.progress}%</p>
                                    <p className="text-xs text-muted-foreground">Progresso Total</p>
                                </div>
                                {course.score && (
                                    <div className="text-right pl-4 border-l border-border">
                                        <p className="text-2xl font-bold font-mono text-primary">{course.score}</p>
                                        <p className="text-xs text-muted-foreground">Score</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Progress value={course.progress} className="h-2 mb-6" />

                        <div className="flex items-center justify-between gap-4">
                            {Object.entries(course.pipeline).map(([key, status], index, arr) => (
                                <React.Fragment key={key}>
                                    <PipelineStep
                                        status={status}
                                        label={getPipelineLabel(key)}
                                        onClick={() => onNavigate(key as any)}
                                        isClickable={status !== 'pending'}
                                    />
                                    {index < arr.length - 1 && (
                                        <div className={cn(
                                            "flex-1 h-0.5 max-w-[100px]",
                                            status === 'completed' ? "bg-success" : "bg-muted"
                                        )} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* --- TABS CONTENT --- */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-muted/30 p-1">
                        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                        <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
                        <TabsTrigger value="settings">Configurações</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                icon="document"
                                label="Lições Concluídas"
                                value={`${course.stats?.completedLessons || 0}/${course.lessonsCount}`}
                                subValue={`${Math.round(((course.stats?.completedLessons || 0) / course.lessonsCount) * 100)}%`}
                            />
                            <StatCard
                                icon="clock"
                                label="Duração Média"
                                value={course.stats?.avgLessonDuration || '-'}
                            />
                            <StatCard
                                icon="text"
                                label="Total de Palavras"
                                value={course.stats?.totalWords?.toLocaleString() || '-'}
                            />
                            <StatCard
                                icon="hourglass-end"
                                label="Pendentes"
                                value={course.stats?.pendingLessons || 0}
                                subValue="lições"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Quick Actions */}
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                                    <CardDescription>Acesse rapidamente as principais funções do curso</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <Button
                                        variant="outline"
                                        className="h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5"
                                        onClick={() => onNavigate('brief')}
                                    >
                                        <Icon name="file-edit" size="size-5" className="text-primary" />
                                        <span className="text-xs">Editar Brief</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5"
                                        onClick={() => onNavigate('research')}
                                    >
                                        <Icon name="search-alt" size="size-5" className="text-primary" />
                                        <span className="text-xs">Ver Research</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5"
                                        onClick={() => onNavigate('curriculum')}
                                    >
                                        <Icon name="sitemap" size="size-5" className="text-primary" />
                                        <span className="text-xs">Editar Currículo</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5"
                                        onClick={() => onNavigate('lessons')}
                                    >
                                        <Icon name="list" size="size-5" className="text-primary" />
                                        <span className="text-xs">Ver Lições</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5"
                                        onClick={() => onNavigate('validation')}
                                    >
                                        <Icon name="check-double" size="size-5" className="text-primary" />
                                        <span className="text-xs">Validação</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-auto py-4 flex-col gap-2 hover:border-primary/50 hover:bg-primary/5"
                                    >
                                        <Icon name="download" size="size-5" className="text-primary" />
                                        <span className="text-xs">Exportar</span>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Course Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Sobre o Curso</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {course.description || 'Nenhuma descrição adicionada.'}
                                    </p>
                                    <Separator />
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Criado em</span>
                                            <span className="font-medium">{course.createdAt}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Atualizado em</span>
                                            <span className="font-medium">{course.updatedAt}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Status</span>
                                            <Badge variant="outline">{course.statusLabel}</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-6 animate-fade-in">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Atividade Recente</CardTitle>
                                <CardDescription>Histórico de alterações e eventos do curso</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <ActivityItem
                                    icon="check"
                                    title="Lição 3.4 marcada como concluída"
                                    time="Há 2 horas"
                                    type="success"
                                />
                                <ActivityItem
                                    icon="pencil"
                                    title="Script da Lição 3.5 editado"
                                    time="Há 3 horas"
                                    type="info"
                                />
                                <ActivityItem
                                    icon="sparkles"
                                    title="IA gerou sugestões para Módulo 4"
                                    time="Há 5 horas"
                                    type="info"
                                />
                                <ActivityItem
                                    icon="exclamation-triangle"
                                    title="Score de validação abaixo de 80 na Lição 2.3"
                                    time="Ontem"
                                    type="warning"
                                />
                                <ActivityItem
                                    icon="check-double"
                                    title="Currículo aprovado"
                                    time="3 dias atrás"
                                    type="success"
                                />
                                <ActivityItem
                                    icon="search-alt"
                                    title="Research de mercado concluído"
                                    time="5 dias atrás"
                                    type="success"
                                />
                            </CardContent>
                            <CardFooter className="border-t border-border pt-4">
                                <Button variant="ghost" className="w-full text-xs text-muted-foreground">
                                    Ver histórico completo <Icon name="arrow-right" className="ml-2 size-3" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-6 animate-fade-in">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Configurações do Curso</CardTitle>
                                <CardDescription>Gerencie as configurações gerais do curso</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Título do Curso</label>
                                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                                            {course.title}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Slug (URL)</label>
                                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg font-mono">
                                            /{course.slug}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Instrutor</label>
                                        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={course.instructor.avatar} />
                                                <AvatarFallback>{course.instructor.name.substring(0,2)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{course.instructor.name}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Tipo de Curso</label>
                                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                                            {course.type}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-medium text-destructive">Zona de Perigo</h4>
                                        <p className="text-xs text-muted-foreground">Ações irreversíveis</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="text-muted-foreground">
                                            <Icon name="archive" className="mr-2 size-4" /> Arquivar
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                                            <Icon name="trash" className="mr-2 size-4" /> Excluir
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default CourseOverviewTemplate;
