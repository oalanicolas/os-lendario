
import React, { useState } from 'react';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Progress } from '../../ui/progress';
import { Alert, AlertDescription } from '../../ui/alert';
import { cn } from '../../../lib/utils';

// --- TYPES ---
interface BriefData {
    dreamOutcome: string;
    targetAudience: string;
    painPoints: { id: number; text: string; intensity: number }[];
    prerequisites: string;
    uniqueValue: string;
    methodology: string;
    expectedResults: string;
    duration: string;
}

interface CourseBriefTemplateProps {
    setSection: (s: Section) => void;
    courseSlug: string;
    courseTitle: string;
    onBack: () => void;
    onNavigate: (view: 'overview' | 'research' | 'curriculum' | 'lessons' | 'validation') => void;
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
                                onClick={() => step.status !== 'pending' && onNavigate(step.key)}
                                disabled={step.status === 'pending'}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium ring-1 ring-primary/20"
                                        : step.status === 'pending'
                                            ? "text-muted-foreground/50 cursor-not-allowed"
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
                    <span>Auto-save ativo</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Última alteração: há 2 min</p>
            </div>
        </div>
    );
};

// --- BRIEF SECTIONS DATA ---
const briefSections = [
    { id: 1, key: 'dreamOutcome', title: 'Dream Outcome', description: 'Qual é a promessa principal do curso?', icon: 'star' },
    { id: 2, key: 'targetAudience', title: 'Público-Alvo (ICP)', description: 'Quem é o aluno ideal para este curso?', icon: 'users' },
    { id: 3, key: 'painPoints', title: 'Dores e Problemas', description: 'Quais problemas o curso resolve?', icon: 'heartbeat' },
    { id: 4, key: 'prerequisites', title: 'Pré-requisitos', description: 'O que o aluno precisa saber antes?', icon: 'list-check' },
    { id: 5, key: 'uniqueValue', title: 'Proposta de Valor Única', description: 'O que diferencia este curso?', icon: 'gem' },
    { id: 6, key: 'methodology', title: 'Metodologia', description: 'Como o conteúdo será ensinado?', icon: 'route' },
    { id: 7, key: 'expectedResults', title: 'Resultados Esperados', description: 'O que o aluno vai conseguir fazer?', icon: 'trophy' },
    { id: 8, key: 'duration', title: 'Duração e Formato', description: 'Estrutura geral do curso', icon: 'clock' },
];

const CourseBriefTemplate: React.FC<CourseBriefTemplateProps> = ({
    setSection,
    courseSlug,
    courseTitle,
    onBack,
    onNavigate
}) => {
    const [activeSection, setActiveSection] = useState(1);
    const [briefData, setBriefData] = useState<BriefData>({
        dreamOutcome: '',
        targetAudience: '',
        painPoints: [{ id: 1, text: '', intensity: 5 }],
        prerequisites: '',
        uniqueValue: '',
        methodology: '',
        expectedResults: '',
        duration: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    const pipeline = [
        { key: 'brief', label: 'Brief', status: 'current' as const },
        { key: 'research', label: 'Research', status: 'pending' as const },
        { key: 'curriculum', label: 'Currículo', status: 'pending' as const },
        { key: 'lessons', label: 'Lições', status: 'pending' as const },
        { key: 'validation', label: 'Validação', status: 'pending' as const },
    ];

    const currentSectionData = briefSections.find(s => s.id === activeSection);
    const completedSections = briefSections.filter((_, index) => index < activeSection - 1).length;
    const progressPercent = Math.round((completedSections / briefSections.length) * 100);

    const handleInputChange = (key: keyof BriefData, value: any) => {
        setBriefData(prev => ({ ...prev, [key]: value }));
    };

    const addPainPoint = () => {
        setBriefData(prev => ({
            ...prev,
            painPoints: [...prev.painPoints, { id: Date.now(), text: '', intensity: 5 }]
        }));
    };

    const removePainPoint = (id: number) => {
        setBriefData(prev => ({
            ...prev,
            painPoints: prev.painPoints.filter(p => p.id !== id)
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
    };

    const handleNext = () => {
        if (activeSection < briefSections.length) {
            setActiveSection(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (activeSection > 1) {
            setActiveSection(prev => prev - 1);
        }
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 1: // Dream Outcome
                return (
                    <div className="space-y-4">
                        <Label>Qual é a promessa principal do curso?</Label>
                        <Textarea
                            placeholder="Ex: Dominar vendas B2B e fechar contratos de alto valor em 30 dias..."
                            className="min-h-[120px]"
                            value={briefData.dreamOutcome}
                            onChange={(e) => handleInputChange('dreamOutcome', e.target.value)}
                        />
                        <Alert>
                            <Icon name="lightbulb-on" className="size-4" />
                            <AlertDescription className="text-xs">
                                <strong>Dica GPS:</strong> Use a fórmula "Conseguir [resultado específico] em [tempo definido] sem [objeção comum]"
                            </AlertDescription>
                        </Alert>
                    </div>
                );

            case 2: // Target Audience
                return (
                    <div className="space-y-4">
                        <Label>Descreva seu aluno ideal (ICP)</Label>
                        <Textarea
                            placeholder="Ex: Gestores de vendas B2B com equipe de 5+ pessoas, buscando aumentar conversão em 30%..."
                            className="min-h-[120px]"
                            value={briefData.targetAudience}
                            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs">Cargo típico</Label>
                                <Input placeholder="Ex: Gerente de Vendas" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Experiência</Label>
                                <Input placeholder="Ex: 3-5 anos" />
                            </div>
                        </div>
                    </div>
                );

            case 3: // Pain Points
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Principais dores do público</Label>
                            <Button variant="outline" size="sm" onClick={addPainPoint}>
                                <Icon name="plus" className="mr-2 size-3" /> Adicionar
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {briefData.painPoints.map((point, index) => (
                                <div key={point.id} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg border border-border">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold shrink-0">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1 space-y-3">
                                        <Input
                                            placeholder="Descreva a dor..."
                                            value={point.text}
                                            onChange={(e) => {
                                                const newPoints = [...briefData.painPoints];
                                                newPoints[index].text = e.target.value;
                                                handleInputChange('painPoints', newPoints);
                                            }}
                                        />
                                        <div className="flex items-center gap-4">
                                            <Label className="text-xs text-muted-foreground">Intensidade:</Label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={point.intensity}
                                                className="flex-1 accent-primary"
                                                onChange={(e) => {
                                                    const newPoints = [...briefData.painPoints];
                                                    newPoints[index].intensity = Number(e.target.value);
                                                    handleInputChange('painPoints', newPoints);
                                                }}
                                            />
                                            <Badge variant="outline" className="font-mono">{point.intensity}/10</Badge>
                                        </div>
                                    </div>
                                    {briefData.painPoints.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-destructive shrink-0"
                                            onClick={() => removePainPoint(point.id)}
                                        >
                                            <Icon name="trash" size="size-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 4: // Prerequisites
                return (
                    <div className="space-y-4">
                        <Label>O que o aluno precisa saber/ter antes?</Label>
                        <Textarea
                            placeholder="Ex: Conhecimento básico de Excel, acesso a CRM, disposição para aplicar..."
                            className="min-h-[120px]"
                            value={briefData.prerequisites}
                            onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                        />
                        <Alert className="bg-brand-yellow/5 border-brand-yellow/20">
                            <Icon name="exclamation-triangle" className="size-4 text-brand-yellow" />
                            <AlertDescription className="text-xs">
                                Se não houver pré-requisitos, deixe claro que é para iniciantes absolutos.
                            </AlertDescription>
                        </Alert>
                    </div>
                );

            case 5: // Unique Value
                return (
                    <div className="space-y-4">
                        <Label>O que diferencia este curso dos concorrentes?</Label>
                        <Textarea
                            placeholder="Ex: Único curso que combina IA com técnicas de Social Selling, incluindo 50+ templates prontos..."
                            className="min-h-[120px]"
                            value={briefData.uniqueValue}
                            onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                        />
                        <div className="grid grid-cols-3 gap-3">
                            {['Metodologia Própria', 'Templates Práticos', 'Comunidade', 'Certificado', 'Suporte 1:1', 'Case Studies'].map((tag) => (
                                <Button key={tag} variant="outline" size="sm" className="text-xs justify-start">
                                    <Icon name="plus" className="mr-2 size-3" /> {tag}
                                </Button>
                            ))}
                        </div>
                    </div>
                );

            case 6: // Methodology
                return (
                    <div className="space-y-4">
                        <Label>Como o conteúdo será ensinado?</Label>
                        <Textarea
                            placeholder="Ex: Método GPS (Definir Destino → Mapear Origem → Traçar Rota) aplicado em cada módulo..."
                            className="min-h-[120px]"
                            value={briefData.methodology}
                            onChange={(e) => handleInputChange('methodology', e.target.value)}
                        />
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <h4 className="text-sm font-bold text-primary mb-2">Framework GPS Sugerido</h4>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <Icon name="target" size="size-3" className="text-primary" />
                                    <strong>Destino:</strong> Onde o aluno quer chegar
                                </li>
                                <li className="flex items-center gap-2">
                                    <Icon name="location-arrow" size="size-3" className="text-primary" />
                                    <strong>Origem:</strong> Onde o aluno está hoje
                                </li>
                                <li className="flex items-center gap-2">
                                    <Icon name="route" size="size-3" className="text-primary" />
                                    <strong>Rota:</strong> O caminho otimizado
                                </li>
                            </ul>
                        </div>
                    </div>
                );

            case 7: // Expected Results
                return (
                    <div className="space-y-4">
                        <Label>O que o aluno vai conseguir fazer ao final?</Label>
                        <Textarea
                            placeholder="Ex: 1. Prospectar via LinkedIn com taxa de resposta de 40%+, 2. Conduzir calls de descoberta, 3. Fechar contratos acima de R$10k..."
                            className="min-h-[120px]"
                            value={briefData.expectedResults}
                            onChange={(e) => handleInputChange('expectedResults', e.target.value)}
                        />
                        <Alert>
                            <Icon name="check-circle" className="size-4 text-success" />
                            <AlertDescription className="text-xs">
                                <strong>Dica:</strong> Liste resultados mensuráveis e específicos. "Vai saber vender" é vago, "Vai fechar 3 contratos em 30 dias" é específico.
                            </AlertDescription>
                        </Alert>
                    </div>
                );

            case 8: // Duration
                return (
                    <div className="space-y-4">
                        <Label>Estrutura geral do curso</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs">Duração Total Estimada</Label>
                                <Input
                                    placeholder="Ex: 8 horas"
                                    value={briefData.duration}
                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Número de Módulos</Label>
                                <Input placeholder="Ex: 6 módulos" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Duração Média por Aula</Label>
                                <Input placeholder="Ex: 8-12 minutos" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Formato Principal</Label>
                                <Input placeholder="Ex: Vídeo + PDF" />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans">
            <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <CourseSidebar
                    courseTitle={courseTitle}
                    currentStep="brief"
                    pipeline={pipeline}
                    onNavigate={onNavigate}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
                        <div>
                            <h1 className="text-lg font-bold">Briefing Estratégico</h1>
                            <p className="text-xs text-muted-foreground">Defina a base do seu curso</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">Progresso:</span>
                                <Progress value={progressPercent} className="w-24 h-2" />
                                <span className="font-mono text-xs">{progressPercent}%</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                                ) : (
                                    <Icon name="disk" className="mr-2 size-4" />
                                )}
                                Salvar
                            </Button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto p-8">
                            <div className="flex gap-8">
                                {/* Section Navigator */}
                                <div className="w-64 shrink-0">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                Seções do Brief
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-2">
                                            <nav className="space-y-1">
                                                {briefSections.map((section) => (
                                                    <button
                                                        key={section.id}
                                                        onClick={() => setActiveSection(section.id)}
                                                        className={cn(
                                                            "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors text-left gap-2",
                                                            activeSection === section.id
                                                                ? "bg-primary/10 text-primary font-medium"
                                                                : "text-muted-foreground hover:bg-muted"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Icon name={section.icon} size="size-3" />
                                                            <span className="truncate">{section.title}</span>
                                                        </div>
                                                        {activeSection > section.id && (
                                                            <Icon name="check-circle" className="text-success size-3 shrink-0" type="solid" />
                                                        )}
                                                    </button>
                                                ))}
                                            </nav>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Form Content */}
                                <div className="flex-1 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                    <Icon name={currentSectionData?.icon || 'document'} size="size-5" />
                                                </div>
                                                <div>
                                                    <CardTitle>{currentSectionData?.title}</CardTitle>
                                                    <CardDescription>{currentSectionData?.description}</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {renderSectionContent()}
                                        </CardContent>
                                    </Card>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between pt-4 border-t border-border">
                                        <Button
                                            variant="outline"
                                            onClick={handlePrevious}
                                            disabled={activeSection === 1}
                                        >
                                            <Icon name="arrow-left" className="mr-2 size-4" />
                                            Anterior
                                        </Button>

                                        {activeSection < briefSections.length ? (
                                            <Button onClick={handleNext}>
                                                Próxima Seção
                                                <Icon name="arrow-right" className="ml-2 size-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => onNavigate('research')}
                                                className="bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            >
                                                Concluir Brief e Iniciar Research
                                                <Icon name="search-alt" className="ml-2 size-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseBriefTemplate;
