
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { Progress } from '../../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { cn } from '../../../lib/utils';
import { FileUpload } from '../../ui/file-upload';

interface LessonEditorProps {
    onBack: () => void;
    courseSlug?: string;
    lessonId?: string;
}

// Studio color palette
const STUDIO_PRIMARY = "#538096";

const LessonEditor: React.FC<LessonEditorProps> = ({ onBack, courseSlug = "curso-exemplo", lessonId = "1.1" }) => {
    const [activeTab, setActiveTab] = useState("content");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarTab, setSidebarTab] = useState<'index' | 'audit'>('index');

    // Mock State for Lesson Content
    const [title, setTitle] = useState("3.1 - Pastas - Estrutura Minimalista que Funciona");
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [script, setScript] = useState(`**Fala, Lendário!**

Bem-vindo ao **Módulo 3: Organização Inteligente!**
Essa é uma das partes mais críticas do curso. Por quê?
**Porque 90% das pessoas que abandonam sistemas de segundo cérebro abandonam por causa de organização errada.**

Você já viveu isso? Começa super empolgado, cria pastas, subpastas, sub-subpastas... e depois de 2 meses, não encontra mais nada. Vira um caos. Você desiste.

**Não vai acontecer com você.** Porque nessa aula eu vou te ensinar a estrutura minimalista que **escala**.
Funciona com 50 notas. Funciona com 5.000 notas.
Vamos lá!

## 🎯 Objetivos da Aula

Ao final dessa aula, você vai:
✅ **Implementar** estrutura de pastas minimalista e escalável
✅ **Entender** quando usar pastas vs. tags vs. links
✅ **Evitar** anti-padrões que quebram sistemas
✅ **Organizar** 20+ notas na estrutura definitiva

## ❌ Os Erros Que Você NÃO Pode Cometer

Antes de mostrar o que fazer, deixa eu te mostrar o que **não fazer.**

### Erro #1: Organização Prematura

Você tem 5 notas e já cria:
\`\`\`
vault/
├── Trabalho/
│   ├── Projetos/
│   │   ├── 2024/
\`\`\``);
    const [status, setStatus] = useState(false);

    // Mock Data for Sidebar (Modules) - Matching the screenshot
    const modules = [
        {
            id: 4,
            title: "Conexões e Grafo",
            lessons: [
                { id: "4.1", title: "Links Internos - A Alma do Segundo Cérebro", active: false },
                { id: "4.3", title: "Canvas - Pensamento Visual", active: false },
                { id: "4.2", title: "O Grafo do Conhecimento", active: false },
            ]
        },
        {
            id: 5,
            title: "Superpoderes com IA",
            lessons: [
                { id: "5.2", title: "Integrando ChatGPT no Obsidian", active: false },
                { id: "5.4", title: "Templates Inteligentes com IA", active: false },
                { id: "5.1", title: "Plugins Essenciais da Comunidade", active: false },
                { id: "5.3", title: "Smart Connections - Converse com Seu Cérebro", active: false },
            ]
        },
        {
            id: 6,
            title: "Execução e Maestria",
            lessons: [
                { id: "6.3", title: "Importando de Outras Ferramentas", active: false },
                { id: "6.4", title: "Os 4 Níveis de Maestria e Próximos Passos", active: false },
                { id: "6.2", title: "Casos de Uso por Arquétipo", active: false },
                { id: "6.1", title: "Workflows Diários - Do Caos à Clareza", active: false },
            ]
        },
        {
            id: 1,
            title: "Fundamentos e Instalação",
            lessons: [
                { id: "1.4", title: "Configurações Essenciais e Interface", active: false },
                { id: "1.1", title: "Por Que Você Precisa de um Segundo Cérebro (Agora)", active: false },
                { id: "1.2", title: "Por Que Obsidian é a Escolha Definitiva", active: false },
                { id: "1.3", title: "Instalação Multi-Plataforma Completa", active: false },
            ]
        },
        {
            id: 2,
            title: "Escrita e Formatação",
            lessons: [
                { id: "2.2", title: "Tipos de Notas e Quando Usar Cada Uma", active: false },
                { id: "2.3", title: "Trabalhando com Arquivos e Anexos", active: false },
                { id: "2.1", title: "Markdown em 30 Minutos (O Essencial)", active: false },
            ]
        },
        {
            id: 3,
            title: "Organização Inteligente",
            lessons: [
                { id: "3.2", title: "Tags e Hierarquias de Tags", active: false },
                { id: "3.1", title: "Pastas - Estrutura Minimalista que Funciona", active: true },
                { id: "3.3", title: "Combinando Pastas + Tags + Links", active: false },
                { id: "3.4", title: "Migrando Conteúdo Existente", active: false },
            ]
        },
    ];

    // Mock Data for AI Audit
    const aiAudit = {
        hasAnalysis: false, // No analysis yet
        overallScore: null as number | null,
        metrics: [] as { label: string; score: number; status: string }[],
        suggestions: [] as string[]
    };

    // Sidebar width
    const sidebarWidth = sidebarCollapsed ? 'w-12' : 'w-72';

    return (
        <div className="flex flex-col h-screen bg-background animate-fade-in">

            {/* --- TOP BAR --- */}
            <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground gap-2">
                        <Icon name="arrow-left" size="size-4" /> Voltar
                    </Button>
                    <div className="h-5 w-px bg-border" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Editando Aula {lessonId}</span>
                        <span className="text-sm font-semibold text-foreground">Organização Inteligente</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
                        <span className="text-xs text-muted-foreground">{status ? "Publicado" : "Rascunho"}</span>
                        <Switch id="status-mode" checked={status} onCheckedChange={setStatus} className="scale-90" />
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Icon name="eye" size="size-4" /> Preview
                    </Button>
                    <Button
                        size="sm"
                        className="gap-2 text-white"
                        style={{ backgroundColor: STUDIO_PRIMARY }}
                    >
                        <Icon name="check" size="size-4" /> Salvar Alterações
                    </Button>
                </div>
            </header>

            {/* --- MAIN WORKSPACE --- */}
            <div className="flex flex-1 overflow-hidden">

                {/* UNIFIED LEFT SIDEBAR (Index + Audit) */}
                <div className={cn(
                    "border-r border-border bg-card/50 flex flex-col shrink-0 transition-all duration-300 ease-in-out",
                    sidebarWidth
                )}>
                    {/* Sidebar Header with Toggle */}
                    {!sidebarCollapsed ? (
                        <>
                            {/* Tab Switcher */}
                            <div className="flex border-b border-border">
                                <button
                                    onClick={() => setSidebarTab('index')}
                                    className={cn(
                                        "flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors",
                                        sidebarTab === 'index'
                                            ? "text-foreground border-b-2 border-[#538096]"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    Índice
                                </button>
                                <button
                                    onClick={() => setSidebarTab('audit')}
                                    className={cn(
                                        "flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5",
                                        sidebarTab === 'audit'
                                            ? "text-foreground border-b-2 border-[#538096]"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon name="sparkles" size="size-3" />
                                    Auditoria
                                </button>
                                <button
                                    onClick={() => setSidebarCollapsed(true)}
                                    className="px-3 py-3 text-muted-foreground hover:text-foreground transition-colors border-l border-border"
                                >
                                    <Icon name="angle-double-left" size="size-4" />
                                </button>
                            </div>

                            {/* Sidebar Content */}
                            <ScrollArea className="flex-1">
                                {sidebarTab === 'index' ? (
                                    /* INDEX TAB */
                                    <div className="p-3 space-y-3">
                                        {modules.map((mod) => (
                                            <div key={mod.id} className="space-y-1">
                                                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider flex justify-between items-center" style={{ color: STUDIO_PRIMARY }}>
                                                    <span className="truncate">{mod.title}</span>
                                                    <span className="text-muted-foreground font-mono font-normal text-[10px]">/{mod.lessons.length}</span>
                                                </div>
                                                {mod.lessons.map((lesson) => (
                                                    <button
                                                        key={lesson.id}
                                                        className={cn(
                                                            "w-full text-left px-2 py-2 rounded-lg text-xs transition-all flex items-start gap-2",
                                                            lesson.active
                                                                ? "bg-[#538096]/10 text-foreground font-medium"
                                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                        )}
                                                    >
                                                        <span className={cn(
                                                            "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                                                            lesson.active
                                                                ? "border-[#538096] bg-[#538096]"
                                                                : "border-muted-foreground/30"
                                                        )}>
                                                            {lesson.active && <Icon name="check" size="size-2" className="text-white" />}
                                                        </span>
                                                        <span className="leading-tight line-clamp-2">{lesson.title}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* AUDIT TAB */
                                    <div className="p-4 space-y-6">
                                        {!aiAudit.hasAnalysis ? (
                                            /* No Analysis State */
                                            <div className="text-center py-8">
                                                <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
                                                    <Icon name="sparkles" size="size-7" className="text-muted-foreground" />
                                                </div>
                                                <h4 className="font-semibold text-sm mb-2">Sem análise</h4>
                                                <p className="text-xs text-muted-foreground mb-6 px-4">
                                                    Esta lição ainda não foi analisada pelo sistema de auditoria didática.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="gap-2"
                                                    style={{ borderColor: `${STUDIO_PRIMARY}40`, color: STUDIO_PRIMARY }}
                                                >
                                                    <Icon name="sparkles" size="size-3" />
                                                    Analisar Conteúdo
                                                </Button>
                                                <p className="text-[10px] text-muted-foreground mt-4">
                                                    Funcionalidade em desenvolvimento
                                                </p>
                                            </div>
                                        ) : (
                                            /* Has Analysis */
                                            <div className="space-y-6">
                                                {/* Overall Score */}
                                                <div className="text-center p-4 bg-muted/20 rounded-xl border border-border">
                                                    <div className="relative w-20 h-20 mx-auto mb-2 flex items-center justify-center">
                                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                            <path className="text-muted" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                            <path style={{ color: STUDIO_PRIMARY }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${aiAudit.overallScore || 0}, 100`} />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                            <span className="text-2xl font-bold" style={{ color: STUDIO_PRIMARY }}>{aiAudit.overallScore}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Score de Fidelidade</p>
                                                </div>

                                                {/* Metrics */}
                                                <div className="space-y-3">
                                                    {aiAudit.metrics.map((metric, i) => (
                                                        <div key={i} className="space-y-1">
                                                            <div className="flex justify-between text-xs">
                                                                <span className="text-muted-foreground">{metric.label}</span>
                                                                <span className="font-medium">{metric.score}%</span>
                                                            </div>
                                                            <Progress value={metric.score} className="h-1" />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Suggestions */}
                                                {aiAudit.suggestions.length > 0 && (
                                                    <div className="space-y-2">
                                                        <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sugestões</h5>
                                                        {aiAudit.suggestions.map((sug, i) => (
                                                            <div key={i} className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs">
                                                                {sug}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <Button variant="outline" size="sm" className="w-full text-xs">
                                                    <Icon name="refresh" className="mr-2" size="size-3" /> Re-analisar
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ScrollArea>
                        </>
                    ) : (
                        /* COLLAPSED STATE */
                        <div className="flex flex-col items-center py-3 gap-2">
                            <button
                                onClick={() => setSidebarCollapsed(false)}
                                className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Icon name="angle-double-right" size="size-4" />
                            </button>
                            <div className="w-6 h-px bg-border my-1" />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => { setSidebarCollapsed(false); setSidebarTab('index'); }}
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                            sidebarTab === 'index' ? "bg-[#538096]/10 text-[#538096]" : "text-muted-foreground hover:bg-muted"
                                        )}
                                    >
                                        <Icon name="list" size="size-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">Índice do Curso</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => { setSidebarCollapsed(false); setSidebarTab('audit'); }}
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                            sidebarTab === 'audit' ? "bg-[#538096]/10 text-[#538096]" : "text-muted-foreground hover:bg-muted"
                                        )}
                                    >
                                        <Icon name="sparkles" size="size-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">Auditoria Didática</TooltipContent>
                            </Tooltip>
                        </div>
                    )}
                </div>

                {/* CENTER STAGE (Editor) - Now takes more space */}
                <div className="flex-1 flex flex-col min-w-0 bg-background overflow-y-auto">
                    <div className="max-w-4xl mx-auto w-full p-8 space-y-6">

                        {/* Title Input */}
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-2xl font-bold border-none shadow-none px-0 h-auto focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/50"
                            placeholder="Título da Aula"
                        />

                        {/* Metadata Row */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span><strong>Módulo:</strong> 3 - Organização Inteligente</span>
                            <span><strong>Duração:</strong> 40 minutos</span>
                            <span><strong>Tipo:</strong> Estratégico + Hands-on</span>
                        </div>

                        {/* Editor Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="flex items-center gap-4 border-b border-border">
                                <TabsList className="bg-transparent p-0 h-auto gap-1">
                                    <TabsTrigger
                                        value="content"
                                        className={cn(
                                            "rounded-lg px-4 py-2 text-sm data-[state=active]:bg-muted data-[state=active]:text-foreground",
                                            "data-[state=inactive]:text-muted-foreground"
                                        )}
                                    >
                                        <Icon name="eye" size="size-4" className="mr-2" />
                                        Visual
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="markdown"
                                        className={cn(
                                            "rounded-lg px-4 py-2 text-sm data-[state=active]:bg-muted data-[state=active]:text-foreground",
                                            "data-[state=inactive]:text-muted-foreground"
                                        )}
                                    >
                                        Markdown
                                    </TabsTrigger>
                                </TabsList>

                                {/* Formatting Toolbar */}
                                <div className="flex items-center gap-1 ml-auto">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="bold" size="size-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="italic" size="size-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="strikethrough" size="size-4" /></Button>
                                    <div className="w-px h-5 bg-border mx-1" />
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-semibold">H2</Button>
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-semibold">H3</Button>
                                    <div className="w-px h-5 bg-border mx-1" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="list" size="size-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="quote-left" size="size-4" /></Button>
                                    <div className="w-px h-5 bg-border mx-1" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="undo" size="size-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="redo" size="size-4" /></Button>
                                </div>
                            </div>

                            <TabsContent value="content" className="pt-6 animate-fade-in">
                                {/* App Icon/Logo (like ClickUp in screenshot) */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <Icon name="folder" size="size-8" className="text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">{title}</h1>
                                        <Badge variant="secondary" className="mt-1">ClickUp</Badge>
                                    </div>
                                </div>

                                {/* Rich Content Area */}
                                <div className="prose prose-invert max-w-none">
                                    <AutosizeTextarea
                                        value={script}
                                        onChange={(e) => setScript(e.target.value)}
                                        className="border-none focus-visible:ring-0 min-h-[500px] p-0 font-sans text-base leading-relaxed resize-none bg-transparent w-full"
                                        placeholder="Escreva o conteúdo da aula..."
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="markdown" className="pt-6 animate-fade-in">
                                <Card>
                                    <CardContent className="p-0">
                                        <AutosizeTextarea
                                            value={script}
                                            onChange={(e) => setScript(e.target.value)}
                                            className="border-none focus-visible:ring-0 min-h-[500px] p-6 font-mono text-sm leading-relaxed resize-none"
                                            placeholder="Escreva em Markdown..."
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LessonEditor;
