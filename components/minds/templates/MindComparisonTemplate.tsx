import React, { useState } from 'react';
import MindsTopbar from '../MindsTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import RadarChart from '../ui/RadarChart';
import { getDiscTheme, getBigFiveColor } from '../../../utils/psychometrics';

interface MindComparisonProps {
    setSection: (s: Section) => void;
}

// --- MOCK DATA ---
const mindsData = [
    {
        id: 'mark-manson',
        name: 'Mark Manson',
        title: 'The Philosopher',
        avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_k6E7jSjX6K3y6n5x5o5f5q5z5x5o5f5q5z5x5o=s900-c-k-c0x00ffffff-no-rj', // Placeholder
        superpower: 'Traduzir complexidade em simplicidade vulgar memorável',
        kryptonite: 'Impaciência com processos lentos e burocracia',
        archetypes: { mbti: 'ENTP', enneagram: '8w7', disc: 'DI' },
        strat: 'IV-V',
        disc: { d: 85, i: 80, s: 25, c: 55 },
        bigFive: [92, 65, 78, 35, 45], // Open, Consc, Extro, Agree, Neuro
        darkTriad: { narc: 4, mach: 4, psych: 1 },
        radar: [
            { skillName: 'Abertura', level: 9 },
            { skillName: 'Consc.', level: 6 },
            { skillName: 'Extrov.', level: 8 },
            { skillName: 'Amabil.', level: 3 },
            { skillName: 'Neurot.', level: 4 }
        ]
    },
    {
        id: 'naval-ravikant',
        name: 'Naval Ravikant',
        title: 'The Sage',
        avatar: 'https://pbs.twimg.com/profile_images/1256841238298292232/ycqwh5u4_400x400.jpg',
        superpower: 'Síntese de complexidade em simplicidade (Tweets/Aforismos)',
        kryptonite: 'Impaciência com ineficiência e desperdício de tempo',
        archetypes: { mbti: 'INTJ', enneagram: '5w4', disc: 'DI/DC' },
        strat: 'VI-VII',
        disc: { d: 85, i: 55, s: 25, c: 65 },
        bigFive: [92, 75, 35, 45, 25], // Open, Consc, Extro, Agree, Neuro
        darkTriad: { narc: 2, mach: 4, psych: 2 },
        radar: [
            { skillName: 'Abertura', level: 9 },
            { skillName: 'Consc.', level: 8 },
            { skillName: 'Extrov.', level: 3 },
            { skillName: 'Amabil.', level: 4 },
            { skillName: 'Neurot.', level: 2 }
        ]
    },
    {
        id: 'steve-jobs',
        name: 'Steve Jobs',
        title: 'The Visionary',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
        superpower: 'Reality Distortion Field (fazer outros acreditarem no impossível)',
        kryptonite: 'Incapacidade de aceitar mediocridade (perfeccionismo tóxico)',
        archetypes: { mbti: 'INTJ', enneagram: '7w8', disc: 'DI' },
        strat: 'VI-VII',
        disc: { d: 85, i: 90, s: 15, c: 45 }, // High D due to assertiveness, High I for charisma/vision
        bigFive: [99, 45, 60, 15, 70], // Open, Consc (low due to chaos?), Extro, Agree (low), Neuro (high)
        darkTriad: { narc: 9, mach: 7, psych: 3 },
        radar: [
            { skillName: 'Abertura', level: 10 },
            { skillName: 'Consc.', level: 5 },
            { skillName: 'Extrov.', level: 6 },
            { skillName: 'Amabil.', level: 1 },
            { skillName: 'Neurot.', level: 7 }
        ]
    }
];

const bigFiveLabels = ['Abertura (Openness)', 'Conscienciosidade', 'Extroversão', 'Agradabilidade', 'Neuroticismo'];

const MindComparisonTemplate: React.FC<MindComparisonProps> = ({ setSection }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const renderGridView = () => (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* --- 1. MINDS CARDS ROW --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mindsData.map((mind, idx) => {
                    const discTheme = getDiscTheme(mind.archetypes.disc);

                    return (
                        <Card key={mind.id} className={`bg-[#0A0A0C] border-white/5 overflow-hidden relative group hover:border-white/10 transition-all duration-300 ${idx === 1 ? 'scale-[1.02] shadow-2xl border-indigo-500/30 ring-1 ring-indigo-500/20 z-10' : 'opacity-90 hover:opacity-100'}`}>
                            <div className={`absolute top-0 left-0 w-full h-1 ${idx === 1 ? 'bg-indigo-500' : idx === 0 ? 'bg-brand-gold' : 'bg-zinc-500'} opacity-50`}></div>
                            <CardHeader className="text-center pt-8 pb-4 relative z-10">
                                <div className="absolute top-4 right-4 text-zinc-600 text-[10px] font-mono">{idx + 1}</div>
                                <div className="w-20 h-20 mx-auto rounded-full p-1 border border-white/10 bg-black mb-3 group-hover:scale-110 transition-transform duration-500">
                                    <img src={mind.avatar} alt={mind.name} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <CardTitle className="text-xl text-white mb-1">{mind.name}</CardTitle>
                                <Badge variant="outline" className="mx-auto border-white/5 text-zinc-500 text-[10px] uppercase tracking-wider">{mind.title}</Badge>
                            </CardHeader>
                            <CardContent className="space-y-6 pb-8">
                                <div className="h-[200px] w-full flex items-center justify-center -my-4">
                                    <RadarChart
                                        data={mind.radar}
                                        size={220}
                                        colors={{
                                            stroke: idx === 0 ? "#D4AF37" : idx === 1 ? "#6366f1" : "#e4e4e7",
                                            fill: idx === 0 ? "rgba(212, 175, 55, 0.2)" : idx === 1 ? "rgba(99, 102, 241, 0.2)" : "rgba(228, 228, 231, 0.1)",
                                            text: "fill-zinc-500",
                                            grid: "rgba(255,255,255,0.05)"
                                        }}
                                    />
                                </div>

                                <div className="space-y-3 text-center px-4">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Superpower</p>
                                        <p className="text-xs text-zinc-300 italic font-serif leading-relaxed">"{mind.superpower}"</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Kryptonite</p>
                                        <p className="text-xs text-zinc-500 leading-relaxed">{mind.kryptonite}</p>
                                    </div>
                                </div>
                            </CardContent>

                            {/* Footer / Quick Stats */}
                            <div className="grid grid-cols-3 border-t border-white/5 bg-white/[0.02]">
                                <div className="p-3 text-center border-r border-white/5">
                                    <div className="text-lg font-bold text-white leading-none">{mind.archetypes.mbti}</div>
                                    <div className="text-[9px] text-zinc-600 uppercase mt-1">MBTI</div>
                                </div>
                                <div className="p-3 text-center border-r border-white/5">
                                    <div className="text-lg font-bold text-white leading-none">{mind.archetypes.enneagram}</div>
                                    <div className="text-[9px] text-zinc-600 uppercase mt-1">Eneagrama</div>
                                </div>
                                <div className="p-3 text-center">
                                    <div className={`text-lg font-bold leading-none ${discTheme.color}`}>{mind.archetypes.disc}</div>
                                    <div className="text-[9px] text-zinc-600 uppercase mt-1">DISC</div>
                                </div>
                            </div>
                            <div className="text-center py-2 bg-black/40 border-t border-white/5">
                                <span className="text-[10px] text-zinc-500 font-mono tracking-wider">ESTRATO COGNITIVO: <span className="text-zinc-300 font-bold">{mind.strat}</span></span>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* --- 2. DISC COMPARISON --- */}
            <div className="p-8 rounded-3xl bg-[#0A0A0C] border border-white/5 space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded bg-white/5"><Icon name="pie-chart" className="text-white" /></div>
                    <h3 className="text-lg font-bold text-white">DISC - Comportamento Observável</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Labels */}
                    <div className="space-y-8 md:pt-8 hidden md:block">
                        <div className="flex items-center gap-2 text-sm text-zinc-400 font-mono h-[8px]"><span className="w-1 h-1 bg-red-500 rounded-full"></span> Dominância (D)</div>
                        <div className="flex items-center gap-2 text-sm text-zinc-400 font-mono h-[8px]"><span className="w-1 h-1 bg-yellow-500 rounded-full"></span> Influência (I)</div>
                        <div className="flex items-center gap-2 text-sm text-zinc-400 font-mono h-[8px]"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Estabilidade (S)</div>
                        <div className="flex items-center gap-2 text-sm text-zinc-400 font-mono h-[8px]"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> Conformidade (C)</div>
                    </div>

                    {/* Mind Columns */}
                    {mindsData.map(mind => (
                        <div key={mind.id} className="space-y-8">
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex justify-between">
                                <span>{mind.name}</span>
                                <span className="text-white">{mind.archetypes.disc}</span>
                            </div>

                            {[
                                { val: mind.disc.d, color: 'bg-red-500' },
                                { val: mind.disc.i, color: 'bg-yellow-500' },
                                { val: mind.disc.s, color: 'bg-emerald-500' },
                                { val: mind.disc.c, color: 'bg-blue-500' }
                            ].map((metric, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex justify-between mb-1 text-[10px] text-zinc-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 w-full">
                                        <span>{metric.val}/100</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.val}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 3. BIG FIVE COMPARISON --- */}
            <div className="p-8 rounded-3xl bg-[#0A0A0C] border border-white/5 space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded bg-white/5"><Icon name="bar-chart-alt" className="text-white" /></div>
                    <h3 className="text-lg font-bold text-white">Big Five (OCEAN)</h3>
                </div>

                <div className="space-y-8">
                    {bigFiveLabels.map((trait, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center group hover:bg-white/[0.02] p-2 rounded-lg transition-colors">
                            <div className="md:col-span-3 text-sm text-zinc-400 font-medium uppercase tracking-wider">{trait}</div>
                            <div className="md:col-span-9 grid grid-cols-3 gap-8">
                                {mindsData.map((mind, idx) => {
                                    const val = mind.bigFive[i];
                                    const colorClass = idx === 0 ? 'bg-brand-gold' : idx === 1 ? 'bg-indigo-500' : 'bg-zinc-500';
                                    return (
                                        <div key={mind.id} className="relative">
                                            <div className="flex justify-between text-[10px] text-zinc-500 mb-1 font-mono">
                                                <span className="opacity-50">{mind.name.split(' ')[0]}</span>
                                                <span className={idx === 0 ? 'text-brand-gold' : idx === 1 ? 'text-indigo-400' : 'text-zinc-300'}>{val}/100</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${val}%` }}></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 4. DARK TRIAD (Footer Alert) --- */}
            <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/5 mt-8">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                    <Icon name="shield-check" className="text-red-500" /> Dark Triad Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {mindsData.map(mind => (
                        <div key={mind.id} className="flex flex-col gap-2">
                            <span className="text-xs text-zinc-400 font-bold uppercase">{mind.name}</span>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] text-red-400/70 font-mono">
                                    <span>Narcisismo</span> <span>{mind.darkTriad.narc}/7</span>
                                </div>
                                <div className="h-1 bg-red-500/10 rounded-full w-full">
                                    <div className="h-full bg-red-500/50 rounded-full" style={{ width: `${(mind.darkTriad.narc / 7) * 100}%` }}></div>
                                </div>

                                <div className="flex justify-between text-[10px] text-red-400/70 font-mono">
                                    <span>Maquiavelismo</span> <span>{mind.darkTriad.mach}/7</span>
                                </div>
                                <div className="h-1 bg-red-500/10 rounded-full w-full">
                                    <div className="h-full bg-red-500/50 rounded-full" style={{ width: `${(mind.darkTriad.mach / 7) * 100}%` }}></div>
                                </div>

                                <div className="flex justify-between text-[10px] text-red-400/70 font-mono">
                                    <span>Psicopatia</span> <span>{mind.darkTriad.psych}/7</span>
                                </div>
                                <div className="h-1 bg-red-500/10 rounded-full w-full">
                                    <div className="h-full bg-red-500/50 rounded-full" style={{ width: `${(mind.darkTriad.psych / 7) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderListView = () => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-x-auto">
            <Card className="bg-[#0A0A0C] border-white/5 rounded-2xl overflow-hidden min-w-[800px]">
                <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.02]">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-4">Critério Comparativo</div>
                        {mindsData.map((mind, idx) => (
                            <div key={mind.id} className="flex items-center gap-3 pl-4 border-l border-white/5">
                                <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                                    <img src={mind.avatar} className="w-full h-full object-cover" alt={mind.name} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white">{mind.name}</span>
                                    <span className="text-[10px] text-zinc-500 uppercase">{mind.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Row: Superpower */}
                    <div className="grid grid-cols-4 gap-4 py-6 border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <div className="px-6 flex items-center">
                            <div className="flex items-center gap-2 text-brand-gold">
                                <Icon name="lightning" size="size-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Superpoder</span>
                            </div>
                        </div>
                        {mindsData.map(mind => (
                            <div key={mind.id} className="px-6 border-l border-white/5 text-sm text-zinc-300 italic font-serif">
                                "{mind.superpower}"
                            </div>
                        ))}
                    </div>

                    {/* Row: Kryptonite */}
                    <div className="grid grid-cols-4 gap-4 py-6 border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <div className="px-6 flex items-center">
                            <div className="flex items-center gap-2 text-red-400">
                                <Icon name="shield-check" size="size-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Kryptonita</span>
                            </div>
                        </div>
                        {mindsData.map(mind => (
                            <div key={mind.id} className="px-6 border-l border-white/5 text-sm text-zinc-400">
                                {mind.kryptonite}
                            </div>
                        ))}
                    </div>

                    {/* Row: Archetypes */}
                    <div className="grid grid-cols-4 gap-4 py-6 border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <div className="px-6 flex items-center">
                            <div className="flex items-center gap-2 text-blue-400">
                                <Icon name="layout" size="size-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Arquétipos</span>
                            </div>
                        </div>
                        {mindsData.map(mind => {
                            const theme = getDiscTheme(mind.archetypes.disc);
                            return (
                                <div key={mind.id} className="px-6 border-l border-white/5 space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-zinc-500">MBTI</span>
                                        <Badge variant="outline" className="border-white/10 text-white font-mono">{mind.archetypes.mbti}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-zinc-500">Eneagrama</span>
                                        <Badge variant="outline" className="border-white/10 text-white font-mono">{mind.archetypes.enneagram}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-zinc-500">DISC</span>
                                        <Badge variant="outline" className={`border-white/10 font-mono ${theme.color}`}>{mind.archetypes.disc}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs pt-1 border-t border-white/5">
                                        <span className="text-zinc-600 uppercase text-[10px]">Estrato</span>
                                        <span className="text-zinc-300 font-bold font-mono">{mind.strat}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Section: Big Five Table */}
                    <div className="bg-black/20">
                        <div className="px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            Detalhamento Big Five (0-100)
                        </div>
                        {bigFiveLabels.map((trait, i) => (
                            <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                <div className="px-6 text-xs text-zinc-400 font-medium uppercase tracking-wider flex items-center">{trait}</div>
                                {mindsData.map(mind => (
                                    <div key={mind.id} className="px-6 border-l border-white/5 flex items-center gap-2">
                                        <span className="text-xs font-mono font-bold text-white w-8">{mind.bigFive[i]}</span>
                                        <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500/50" style={{ width: `${mind.bigFive[i]}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
            <MindsTopbar currentSection={Section.APP_MINDS_MATRIX} setSection={setSection} />

            {/* HERO HEADER */}
            <div className="relative border-b border-white/5 p-10 overflow-hidden bg-[#050507]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050507] to-[#050507] opacity-60"></div>
                <div className="max-w-[1400px] mx-auto relative z-10 text-center space-y-4">
                    <Badge variant="outline" className="border-white/10 text-zinc-400 uppercase tracking-widest text-[10px]">High-Level Analysis</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">DNA Mental</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-serif italic">
                        Análise comparativa profunda dos modelos mentais, motivações e comportamentos de três mentes lendárias.
                    </p>

                    <div className="flex justify-center gap-2 pt-4">
                        <Badge
                            onClick={() => setViewMode('grid')}
                            className={`cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'bg-transparent text-zinc-500 border border-white/10 hover:text-white hover:bg-white/5'}`}
                        >
                            Abas (Focado)
                        </Badge>
                        <Badge
                            onClick={() => setViewMode('list')}
                            className={`cursor-pointer transition-all ${viewMode === 'list' ? 'bg-white/20 text-white' : 'bg-transparent text-zinc-500 border border-white/10 hover:text-white hover:bg-white/5'}`}
                        >
                            Lista (Relatório)
                        </Badge>
                    </div>
                </div>
            </div>

            <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
                {viewMode === 'grid' ? renderGridView() : renderListView()}
            </main>
        </div>
    );
};

export default MindComparisonTemplate;
