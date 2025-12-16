import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

interface WritingStylesTabProps {
    profile: any;
}

const ToneBar = ({ label, value, leftLabel, rightLabel, color = "brand-gold" }: { label: string, value: number, leftLabel: string, rightLabel: string, color?: string }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500">
            <span>{leftLabel}</span>
            <span className="text-white">{label}</span>
            <span>{rightLabel}</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden relative">
            <div
                className={cn(
                    "absolute top-0 bottom-0 w-2 h-full rounded-full shadow-[0_0_10px_currentColor]",
                    color === "red" ? "bg-red-500 text-red-500" : "bg-brand-gold text-brand-gold"
                )}
                style={{ left: `${value}%` }}
            ></div>
            <div className={cn(
                "w-full h-full bg-gradient-to-r from-transparent to-transparent opacity-50",
                color === "red" ? "via-red-500/20" : "via-brand-gold/20"
            )} style={{ transform: `translateX(${value - 50}%)` }}></div>
        </div>
    </div>
);

type SidebarSection = 'overview' | 'semantics' | 'examples' | 'catchphrases' | 'prompts';

export const WritingStylesTab: React.FC<WritingStylesTabProps> = ({ profile }) => {
    const [activeSection, setActiveSection] = useState<SidebarSection>('overview');
    const [writeChannel, setWriteChannel] = useState("twitter");

    const psycho = profile.psycholinguistics || { traits: [], archetype: "Desconhecido" };
    const arsenal = profile.rhetoricalArsenal || [];
    const contextMatrix = profile.contextualMatrix || [];
    const systemPrompts = profile.systemPrompts || [];
    const catchphrases = profile.catchphrases || [];
    const semantics = profile.semantics || { tier1: {}, tier2: {}, tier3: {} };
    const behavioralOS = profile.behavioralOS || { traits: [] };
    const linguistics = profile.linguistics || { punctuation: [], antiPatterns: [] };

    // --- SUB-COMPONENTS / RENDERERS ---

    const renderOverview = () => (
        <div className="space-y-8 animate-fade-in">
            {/* HERO: ARCHETYPE & DNA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="bg-[#0a0a0a] border-white/10 lg:col-span-8">
                    <CardHeader className="border-b border-white/5 pb-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <Icon name="waveform" className="text-brand-cyan" /> DNA Cirúrgico
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <ToneBar label="Nível de Provocação" value={profile.voiceDNA.provocationActivity || 85} leftLabel="Conforto" rightLabel="Crise" color="red" />
                            <ToneBar label="Temperatura da Verdade" value={profile.voiceDNA.truthTemperature || 95} leftLabel="Aconselhamento" rightLabel="Humilhação" />
                            <ToneBar label="Validar vs. Desafiar" value={profile.voiceDNA.validationVsChallenge || 30} leftLabel="Validar" rightLabel="Desafiar" />
                            <ToneBar label="Densidade" value={profile.voiceDNA.density || 40} leftLabel="Conciso" rightLabel="Detalhado" />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Power Words</span>
                                    <Button
                                        variant="link"
                                        className="text-[10px] text-brand-gold p-0 h-auto"
                                        onClick={() => setActiveSection('semantics')}
                                    >
                                        Ver Arsenal &rarr;
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {profile.voiceDNA.keywords.slice(0, 6).map((kw: string, i: number) => (
                                        <Badge key={i} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white transition-colors">{kw}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Punctuation Signature */}
                            <div>
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Assinatura de Pontuação</span>
                                <div className="flex gap-3">
                                    {linguistics.punctuation?.map((p: any, i: number) => (
                                        <div key={i} className="flex items-center gap-2 group cursor-help relative">
                                            <Badge variant="outline" className="font-mono text-brand-gold bg-brand-gold/5 border-brand-gold/20 w-8 h-8 flex items-center justify-center text-lg">{p.char}</Badge>

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-20 w-48 bg-black border border-white/20 p-2 rounded text-xs text-zinc-300 shadow-xl pointer-events-none text-center">
                                                {p.desc}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-[#0a0a0a] to-brand-gold/10 border-brand-gold/20 lg:col-span-4 flex flex-col justify-center items-center text-center p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                        <Badge variant="outline" className="border-brand-gold/30 text-brand-gold bg-brand-gold/5 text-[10px] uppercase font-bold tracking-wider">
                            {psycho.rule || "Verdade > Empatia"}
                        </Badge>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4 text-brand-gold ring-4 ring-brand-gold/5">
                        <Icon name="cpu" size="size-8" />
                    </div>
                    <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Modo Operacional</h3>
                    <h2 className="text-xl font-black text-white glow-text-gold">{behavioralOS.archetype || "Instalação de SO Mental"}</h2>
                    <p className="text-xs text-zinc-400 mt-2 font-serif italic">"{behavioralOS.role}"</p>
                </Card>
            </div>

            {/* SECTION: BEHAVIORAL OS */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Icon name="activity" className="text-blue-400" /> Sistema Operacional Comportamental
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {behavioralOS.traits?.map((trait: any, i: number) => (
                        <Card key={i} className={cn("bg-[#0a0a0a] border-white/5 hover:bg-white/[0.02] transition-colors group", trait.color ? "border-red-500/20" : "")}>
                            <CardHeader className="p-4 pb-2">
                                <div className="flex justify-between items-start mb-2">
                                    <Icon name={trait.icon as any} className={cn("text-zinc-500", trait.color || "group-hover:text-blue-400")} size="size-5" />
                                    <Badge variant="outline" className={cn("text-[9px]", trait.color ? "border-red-500/30 text-red-500" : "border-white/10 text-zinc-500")}>{trait.value}</Badge>
                                </div>
                                <CardTitle className="text-sm font-bold text-zinc-200">{trait.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-xs text-zinc-500 leading-snug">{trait.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* SECTION: THE ARSENAL (Rhetorical Devices) */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Icon name="swords" className="text-red-400" /> Arsenal Retórico
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {arsenal.map((item: any, i: number) => (
                        <Card key={i} className="bg-[#0a0a0a] border-white/5 group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Badge variant="outline" className="text-[9px] border-white/10 text-zinc-500">{item.frequency}</Badge>
                            </div>
                            <CardContent className="p-5 pt-8 space-y-3">
                                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed min-h-[40px]">{item.desc}</p>
                                <div className="bg-zinc-900/50 p-2 rounded border border-white/5 text-xs text-zinc-300 font-serif italic border-l-2 border-l-red-500/50">
                                    "{item.example}"
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSemantics = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Icon name="book-alt" className="text-brand-gold" /> Campo Semântico
                    </h3>
                    <p className="text-zinc-500 mt-1">O vocabulário cirúrgico dividido por intenção de impacto.</p>
                </div>
            </div>

            {/* 3 COLUMNS OF POWER WORDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TIER 1: MANTRAS */}
                <Card className="bg-[#0a0a0a] border-brand-gold/20">
                    <CardHeader className="border-b border-white/5 pb-3">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-2">
                            <Icon name="flame" size="size-3" /> {semantics.tier1?.label || "Tier 1: Mantras"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        {semantics.tier1?.words?.map((word: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm p-2 hover:bg-white/5 rounded transition-colors group">
                                <div className="w-1 h-1 bg-brand-gold rounded-full group-hover:scale-150 transition-transform"></div>
                                {word}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* TIER 2: MENTAL MODELS */}
                <Card className="bg-[#0a0a0a] border-blue-500/20">
                    <CardHeader className="border-b border-white/5 pb-3">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                            <Icon name="box" size="size-3" /> {semantics.tier2?.label || "Tier 2: Frameworks"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        {semantics.tier2?.words?.map((word: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm p-2 hover:bg-white/5 rounded transition-colors group">
                                <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                {word}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* TIER 3: CONTEXTUAL */}
                <Card className="bg-[#0a0a0a] border-purple-500/20">
                    <CardHeader className="border-b border-white/5 pb-3">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-2">
                            <Icon name="git-merge" size="size-3" /> {semantics.tier3?.label || "Tier 3: Contextual"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        {semantics.tier3?.words?.map((word: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm p-2 hover:bg-white/5 rounded transition-colors group">
                                <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                {word}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* ANTI-PATTERNS (FORBIDDEN PHRASES) */}
            {linguistics.antiPatterns?.length > 0 && (
                <div className="mt-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                        <Icon name="ban" size="size-3" /> Anti-Patterns (Nunca Dizer)
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {linguistics.antiPatterns.map((phrase: string, i: number) => (
                            <Badge key={i} variant="outline" className="border-red-900/50 bg-red-950/10 text-red-400 hover:bg-red-950/20 transition-colors strike-through decoration-red-500/50 decoration-1 line-through">
                                "{phrase}"
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            <Card className="bg-[#0a0a0a] border-white/10">
                <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <Icon name="comment-quote" className="text-brand-cyan" /> Aplicação em Contexto
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Badge variant="outline" className="border-red-500/20 text-red-500 bg-red-500/10 text-[10px]">Antes (Passivo)</Badge>
                        </div>
                        <p className="text-sm text-zinc-500 font-serif italic border-l-2 border-red-500/20 pl-3">
                            "Nossa plataforma ajuda usuários a automatizar tarefas para terem mais sucesso."
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Icon name="arrow-down" className="text-zinc-700" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <Badge variant="outline" className="border-brand-gold/20 text-brand-gold bg-brand-gold/10 text-[10px]">Depois (High Agency)</Badge>
                                <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 text-[9px]">Regra: Verdade &gt; Empatia</Badge>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-200 font-serif border-l-2 border-brand-gold/50 pl-3">
                            "Nosso <span className="text-brand-cyan">ecossistema</span> potencializa <span className="text-brand-cyan">Lendários</span> com uma mentalidade <span className="text-brand-cyan">AI First</span> para <span className="text-brand-cyan">imortalizar seu legado</span>."
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderExamples = () => {
        const currentSample = profile.writingSamples[writeChannel];
        const blueprint = currentSample.blueprint || [];

        return (
            <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Icon name="pencil" className="text-brand-gold" /> Engenharia Reversa
                        </h3>
                        <p className="text-zinc-500 mt-1">Dissecação tática de peças de conteúdo reais.</p>
                    </div>
                </div>

                <Tabs value={writeChannel} onValueChange={setWriteChannel} className="w-full">
                    <div className="mb-6 border-b border-white/10">
                        <TabsList className="bg-transparent p-0 h-auto gap-4 flex-wrap w-full justify-start">
                            {['twitter', 'linkedin', 'newsletter', 'whatsapp'].map(ch => (
                                <TabsTrigger
                                    key={ch}
                                    value={ch}
                                    className="capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-brand-cyan data-[state=active]:text-brand-cyan pb-2 px-1 text-zinc-500 hover:text-white"
                                >
                                    {ch === 'twitter' ? 'X (Twitter)' : ch}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* TIMELINE BLUEPRINT */}
                    {blueprint.length > 0 && (
                        <div className="mb-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Blueprint Estrutural</h4>
                            <div className="flex gap-1 h-20 w-full rounded-lg overflow-hidden border border-white/10">
                                {blueprint.map((phase: any, i: number) => (
                                    <div key={i} className="flex-1 bg-zinc-900 hover:bg-zinc-800 transition-colors relative group border-r border-black/50 last:border-0 p-3 flex flex-col justify-center items-center text-center">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 text-white/50 text-[10px] font-bold mb-1 border border-white/5">{i + 1}</div>
                                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">{phase.phase.split('(')[0]}</span>

                                        {/* Tooltip */}
                                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-20 w-48 bg-black border border-white/20 p-2 rounded text-xs text-zinc-300 shadow-xl pointer-events-none">
                                            {phase.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px]">

                        {/* Left: The Example (Visual) */}
                        <div className="relative">
                            <div className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold text-zinc-500 uppercase tracking-wider z-10">Peça de Conteúdo</div>
                            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 overflow-hidden relative flex flex-col justify-center min-h-[400px]">
                                {/* Render logic simplified for brevity, assuming standard mock structure */}
                                <div className="whitespace-pre-wrap font-sans text-sm text-zinc-200 leading-relaxed">
                                    {writeChannel === 'whatsapp' && <p className="text-zinc-500 text-xs mb-2 italic">Audio Transcript:</p>}
                                    {currentSample.content}
                                </div>
                            </div>
                        </div>

                        {/* Right: The Breakdown (Analytical) */}
                        <div className="space-y-6">
                            <Card className="bg-[#0a0a0a] border-white/10 h-full">
                                <CardHeader>
                                    <CardTitle className="text-base font-bold text-white flex justify-between">
                                        <span>Táticas Identificadas</span>
                                        <Badge variant="outline" className="text-brand-gold border-brand-gold/30">{currentSample.framework}</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {currentSample.analysis.map((item: any, i: number) => (
                                        <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                                            <div className="mt-1">
                                                <Badge className="bg-zinc-800 text-zinc-300 group-hover:bg-brand-cyan/20 group-hover:text-brand-cyan min-w-[100px] justify-center text-[10px] uppercase font-bold tracking-wider">{item.type}</Badge>
                                            </div>
                                            <div>
                                                <p className="text-sm text-zinc-300 leading-relaxed font-mono text-xs">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </Tabs>
            </div>
        );
    };

    const renderCatchphrases = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Icon name="quote" className="text-brand-gold" /> Matriz de Catchphrases
                    </h3>
                    <p className="text-zinc-500 mt-1">Âncoras cognitivas para instalação de novos sistemas mentais.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catchphrases.map((phrase: any, i: number) => (
                    <Card key={i} className="bg-[#0a0a0a] border-white/10 hover:border-brand-gold/50 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-100 transition-opacity">
                            <Icon name="quote" className="text-white/20 w-8 h-8" type="solid" />
                        </div>
                        <CardHeader className="pb-2">
                            <Badge variant="outline" className="w-fit text-[9px] border-white/10 text-zinc-500 mb-2 uppercase tracking-widest">{phrase.tag}</Badge>
                        </CardHeader>
                        <CardContent>
                            <h4 className="text-lg font-bold text-white leading-tight mb-3 font-serif">"{phrase.text}"</h4>
                            <p className="text-xs text-zinc-500">{phrase.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    const renderPrompts = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Icon name="terminal" className="text-brand-gold" /> System Prompts
                    </h3>
                    <p className="text-zinc-500 mt-1">Instruções prontas para calibrar sua própria LLM com este estilo.</p>
                </div>
            </div>

            <div className="space-y-6">
                {systemPrompts.map((prompt: any, i: number) => (
                    <Card key={i} className="bg-[#0a0a0a] border-white/10 group">
                        <CardHeader className="border-b border-white/5 pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-base font-bold text-white mb-1">{prompt.title}</CardTitle>
                                    <p className="text-xs text-zinc-500">{prompt.desc}</p>
                                </div>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-brand-gold">
                                    <Icon name="copy" size="size-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="bg-zinc-950/50 p-6 font-mono text-xs text-zinc-400 relative overflow-hidden group-hover:text-zinc-300 transition-colors">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold/20 group-hover:bg-brand-gold transition-colors"></div>
                                <p className="whitespace-pre-wrap leading-relaxed">{prompt.content}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    const menuItems = [
        { id: 'overview', label: 'Visão Geral', icon: 'layout-grid' },
        { id: 'semantics', label: 'Campo Semântico', icon: 'book-alt' },
        { id: 'examples', label: 'Exemplos', icon: 'pencil' },
        { id: 'catchphrases', label: 'Catchphrases', icon: 'quote' },
        { id: 'prompts', label: 'Prompts', icon: 'terminal' },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-20">

            {/* SIDEBAR NAVIGATION */}
            <div className="w-full lg:w-[240px] shrink-0">
                <div className="sticky top-4 space-y-2">
                    {menuItems.map(item => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3 h-10 font-normal",
                                activeSection === item.id ? "bg-white/10 text-white font-medium" : "text-zinc-500 hover:text-white"
                            )}
                            onClick={() => setActiveSection(item.id as SidebarSection)}
                        >
                            <Icon name={item.icon as any} size="size-4" /> {item.label}
                        </Button>
                    ))}

                    <div className="pt-4 mt-4 border-t border-white/5 px-3">
                        <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider mb-2">Qualidade</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            Voz Ativa
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">
                {activeSection === 'overview' && renderOverview()}
                {activeSection === 'semantics' && renderSemantics()}
                {activeSection === 'examples' && renderExamples()}
                {activeSection === 'catchphrases' && renderCatchphrases()}
                {activeSection === 'prompts' && renderPrompts()}
            </div>
        </div>
    );
};
