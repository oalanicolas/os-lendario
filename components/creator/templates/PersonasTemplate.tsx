import React, { useState, useEffect } from 'react';
import CreatorTopbar from '../CreatorTopbar';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { Separator } from '../../ui/separator';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { GoogleGenAI, Type } from "@google/genai";
import { useToast } from '../../../hooks/use-toast';
import { ScrollArea } from '../../ui/scroll-area';
import { Skeleton } from '../../ui/skeleton';
import { STUDIO_PRIMARY, STUDIO_GOLD, STUDIO_ACCENT } from '../studio-tokens';
import { useAudienceProfiles, Persona } from '../../../hooks/useAudienceProfiles';

// PersonaData type for AI-generated personas (before saving to DB)
interface PersonaData {
    id: string;
    name: string;
    icon: string; // Icon name for Icon component (never use emojis)
    demographics: {
        age: string;
        role: string;
        income: string;
        location: string;
    };
    psychographics: {
        mindset: string;
        values: string[];
        fears: string[];
    };
    painPoints: {
        superficial: string;
        deep: string;
    }[];
    desires: {
        surface: string;
        hidden: string;
    }[];
    redFlags: string[];
    greenFlags: string[];
    definingQuote: string;
    createdAt: string;
}

const PersonasTemplate: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => {
    const [view, setView] = useState<'list' | 'input' | 'processing' | 'result' | 'edit'>('list');
    const [inputText, setInputText] = useState('');
    const [currentPersona, setCurrentPersona] = useState<Persona | PersonaData | null>(null);
    const { toast } = useToast();

    // Fetch personas from database
    const { personas, loading, error, refetch, createPersona } = useAudienceProfiles();

    // --- ACTIONS ---

    const handleGenerate = async () => {
        if (!inputText.trim()) return;
        setView('processing');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const schema = {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    icon: { type: Type.STRING }, // Icon name: user, rocket, chart-line, laptop-code, sparkles, brain, etc.
                    demographics: {
                        type: Type.OBJECT,
                        properties: {
                            age: { type: Type.STRING },
                            role: { type: Type.STRING },
                            income: { type: Type.STRING },
                            location: { type: Type.STRING },
                        }
                    },
                    psychographics: {
                        type: Type.OBJECT,
                        properties: {
                            mindset: { type: Type.STRING },
                            values: { type: Type.ARRAY, items: { type: Type.STRING } },
                            fears: { type: Type.ARRAY, items: { type: Type.STRING } },
                        }
                    },
                    painPoints: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                superficial: { type: Type.STRING },
                                deep: { type: Type.STRING },
                            }
                        }
                    },
                    desires: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                surface: { type: Type.STRING },
                                hidden: { type: Type.STRING },
                            }
                        }
                    },
                    redFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    greenFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    definingQuote: { type: Type.STRING },
                }
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Crie uma Buyer Persona profunda baseada em: "${inputText}". Seja específico, criativo e use linguagem de marketing direto. Para o campo "icon", use um dos seguintes nomes: user, rocket, chart-line, laptop-code, sparkles, brain, briefcase, graduation-cap, lightbulb, target, star, users-alt.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                    temperature: 0.7,
                }
            });

            if (response.text) {
                const data = JSON.parse(response.text);
                // Hydrate with ID and Date
                const newPersona: PersonaData = {
                    ...data,
                    id: Date.now().toString(),
                    createdAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                };
                setCurrentPersona(newPersona);
                setView('result');
            } else {
                throw new Error("Resposta vazia");
            }

        } catch (error) {
            console.error(error);
            toast({ title: "Erro", description: "Falha ao gerar persona.", variant: "destructive" });
            setView('input');
        }
    };

    const handleSave = async () => {
        if (!currentPersona) return;

        try {
            // Convert to database format
            const dbData = {
                slug: currentPersona.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                name: currentPersona.name,
                description: currentPersona.definingQuote,
                demographics: {
                    age_range: currentPersona.demographics.age,
                    occupation: currentPersona.demographics.role,
                    income: currentPersona.demographics.income,
                    location: currentPersona.demographics.location,
                },
                psychographics: {
                    mindset: currentPersona.psychographics.mindset,
                    values: currentPersona.psychographics.values,
                    fears: currentPersona.psychographics.fears,
                    pain_points: currentPersona.painPoints.map(p => p.superficial),
                    goals: currentPersona.desires.map(d => d.surface),
                },
                technical_level: 'intermediate' as const,
            };

            const result = await createPersona(dbData);

            if (result) {
                toast({ title: "Persona Salva", description: "Dados salvos no banco de dados.", variant: "success" });
                await refetch();
                setView('list');
            } else {
                throw new Error('Failed to save');
            }
        } catch (err) {
            console.error('Error saving persona:', err);
            toast({ title: "Erro", description: "Falha ao salvar persona.", variant: "destructive" });
        }
    };

    const handleEditField = (path: string, value: any) => {
        if (!currentPersona) return;

        // Deep update helper (simplified for 2 levels)
        const keys = path.split('.');
        if (keys.length === 1) {
            setCurrentPersona({ ...currentPersona, [keys[0]]: value });
        } else if (keys.length === 2) {
            setCurrentPersona({
                ...currentPersona,
                [keys[0]]: {
                    ...((currentPersona as any)[keys[0]]),
                    [keys[1]]: value
                }
            });
        }
    };

    // --- RENDERERS ---

    const renderList = () => {
        // Calculate KPI stats
        const totalPersonas = personas.length;
        const icpCount = personas.filter(p => p.isIcp).length || (totalPersonas > 0 ? 1 : 0);
        const totalGreenFlags = personas.reduce((acc, p) => acc + p.greenFlags.length, 0);
        const totalRedFlags = personas.reduce((acc, p) => acc + p.redFlags.length, 0);
        const totalPainPoints = personas.reduce((acc, p) => acc + p.painPoints.length, 0);

        return (
            <div className="animate-fade-in space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold font-sans">Buyer Personas</h2>
                        <p className="text-muted-foreground text-sm">
                            Perfis psicográficos do seu público ideal para direcionar conteúdo e ofertas.
                        </p>
                    </div>
                    <Button
                        onClick={() => { setInputText(''); setView('input'); }}
                        className="gap-2 text-white shadow-lg transition-all hover:scale-105"
                        style={{ backgroundColor: STUDIO_PRIMARY, boxShadow: `0 10px 15px -3px ${STUDIO_PRIMARY}30` }}
                    >
                        <Icon name="sparkles" size="size-4" /> Gerar com IA
                    </Button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-[#1a2e35] to-[#0f1a1d] border-[#538096]/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#538096]/20 flex items-center justify-center">
                                    <Icon name="users-alt" size="size-5" style={{ color: STUDIO_PRIMARY }} />
                                </div>
                                <div>
                                    {loading ? (
                                        <Skeleton className="h-8 w-12" />
                                    ) : (
                                        <p className="text-2xl font-bold">{totalPersonas}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">Personas Criadas</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-[#2a2520] to-[#1a1815] border-[#C9B298]/20">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#C9B298]/20 flex items-center justify-center">
                                    <Icon name="target" size="size-5" style={{ color: STUDIO_GOLD }} />
                                </div>
                                <div>
                                    {loading ? (
                                        <Skeleton className="h-8 w-12" />
                                    ) : (
                                        <p className="text-2xl font-bold">{icpCount}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">ICP Principal</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-border/30">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <Icon name="check-circle" size="size-5" className="text-emerald-400" />
                                </div>
                                <div>
                                    {loading ? (
                                        <Skeleton className="h-8 w-12" />
                                    ) : (
                                        <p className="text-2xl font-bold">{totalGreenFlags || totalPainPoints}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">{totalGreenFlags > 0 ? 'Green Flags' : 'Pain Points'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-border/30">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                                    <Icon name="cross-circle" size="size-5" className="text-red-400" />
                                </div>
                                <div>
                                    {loading ? (
                                        <Skeleton className="h-8 w-12" />
                                    ) : (
                                        <p className="text-2xl font-bold">{totalRedFlags || personas.reduce((acc, p) => acc + p.desires.length, 0)}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">{totalRedFlags > 0 ? 'Red Flags' : 'Desejos'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <Card key={i} className="overflow-hidden">
                                <div className="h-1 w-full bg-muted" />
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Skeleton className="w-12 h-12 rounded-xl" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-10 w-full" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-5 w-16" />
                                        <Skeleton className="h-5 w-20" />
                                        <Skeleton className="h-5 w-14" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Icon name="cross-circle" size="size-6" className="text-destructive" />
                            <div>
                                <p className="font-medium">Erro ao carregar personas</p>
                                <p className="text-sm text-muted-foreground">{error.message}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-auto">
                                Tentar novamente
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Personas Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {personas.map((persona, index) => (
                            <Card
                                key={persona.id}
                                className="group hover:border-[#538096]/50 transition-all cursor-pointer overflow-hidden"
                                onClick={() => { setCurrentPersona(persona); setView('result'); }}
                            >
                                {/* Color Bar - first is gold (ICP), rest are primary */}
                                <div
                                    className="h-1 w-full"
                                    style={{ backgroundColor: persona.isIcp || index === 0 ? STUDIO_GOLD : STUDIO_PRIMARY }}
                                />
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner"
                                        style={{ backgroundColor: STUDIO_ACCENT, borderColor: `${STUDIO_PRIMARY}20` }}
                                    >
                                        <Icon name={persona.icon as any} size="size-6" style={{ color: STUDIO_PRIMARY }} />
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg truncate">{persona.name}</CardTitle>
                                            {(persona.isIcp || index === 0) && (
                                                <Badge
                                                    className="text-[10px] shrink-0"
                                                    style={{ backgroundColor: `${STUDIO_GOLD}20`, color: STUDIO_GOLD, borderColor: `${STUDIO_GOLD}30` }}
                                                >
                                                    ICP
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground font-mono">{persona.demographics.role}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p
                                        className="text-sm text-muted-foreground italic line-clamp-2 border-l-2 pl-3"
                                        style={{ borderColor: `${STUDIO_PRIMARY}30` }}
                                    >
                                        "{persona.definingQuote}"
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {persona.psychographics.values.slice(0, 3).map((v, i) => (
                                            <Badge key={i} variant="secondary" className="text-[10px]">{v}</Badge>
                                        ))}
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Icon name="flame" size="size-3" className="text-orange-400" />
                                                {persona.painPoints.length} dores
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Icon name="star" size="size-3" className="text-emerald-400" />
                                                {persona.desires.length} desejos
                                            </span>
                                        </div>
                                        <span className="group-hover:text-[#538096] font-medium transition-colors flex items-center gap-1">
                                            Ver <Icon name="arrow-right" size="size-3" />
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Create New Persona Card */}
                        <button
                            onClick={() => { setInputText(''); setView('input'); }}
                            className="group border border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center min-h-[280px] hover:border-[#538096]/50 hover:bg-[#538096]/5 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-muted/30 group-hover:bg-[#538096]/20 flex items-center justify-center text-muted-foreground group-hover:text-[#538096] transition-colors mb-4">
                                <Icon name="plus" size="size-8" />
                            </div>
                            <span className="font-bold text-sm text-muted-foreground group-hover:text-[#538096] tracking-wide uppercase">
                                Nova Persona
                            </span>
                            <span className="text-xs text-muted-foreground/60 mt-1">Gerar com IA</span>
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && personas.length === 0 && (
                    <Card className="border-dashed">
                        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                                <Icon name="users-alt" size="size-8" className="text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Nenhuma persona cadastrada</h3>
                            <p className="text-muted-foreground text-sm mb-6 max-w-md">
                                Crie sua primeira buyer persona para direcionar melhor seu conteúdo e ofertas.
                            </p>
                            <Button
                                onClick={() => setView('input')}
                                className="gap-2 text-white"
                                style={{ backgroundColor: STUDIO_PRIMARY }}
                            >
                                <Icon name="sparkles" size="size-4" /> Criar Primeira Persona
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    };

    const renderEdit = () => {
        if (!currentPersona) return null;
        return (
            <div className="animate-fade-in max-w-4xl mx-auto pb-20">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" onClick={() => setView('result')}>
                        <Icon name="arrow-left" className="mr-2" /> Cancelar
                    </Button>
                    <h2 className="text-xl font-bold">Editando Persona</h2>
                    <Button
                        onClick={handleSave}
                        className="text-[#0A0A0F]"
                        style={{ backgroundColor: STUDIO_GOLD }}
                    >
                        <Icon name="check" className="mr-2" size="size-4" /> Salvar Alterações
                    </Button>
                </div>

                <div className="grid gap-6">
                    {/* Identity */}
                    <Card>
                        <CardHeader><CardTitle className="text-base">Identidade</CardTitle></CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nome da Persona</Label>
                                <Input value={currentPersona.name} onChange={(e) => handleEditField('name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Ícone</Label>
                                <div className="flex flex-wrap gap-2">
                                    {['user', 'rocket', 'chart-line', 'laptop-code', 'sparkles', 'brain', 'briefcase', 'graduation-cap', 'lightbulb', 'target', 'star', 'users-alt'].map((iconName) => (
                                        <button
                                            key={iconName}
                                            type="button"
                                            onClick={() => handleEditField('icon', iconName)}
                                            className={cn(
                                                "w-10 h-10 rounded-lg flex items-center justify-center border transition-all",
                                                currentPersona.icon === iconName
                                                    ? "border-[#538096] bg-[#538096]/20"
                                                    : "border-border/50 hover:border-[#538096]/50 hover:bg-muted/30"
                                            )}
                                        >
                                            <Icon name={iconName as any} size="size-5" style={{ color: currentPersona.icon === iconName ? STUDIO_PRIMARY : undefined }} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Frase Definidora (Quote)</Label>
                                <Input value={currentPersona.definingQuote} onChange={(e) => handleEditField('definingQuote', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Demographics */}
                    <Card>
                        <CardHeader><CardTitle className="text-base">Demografia</CardTitle></CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Idade</Label>
                                <Input value={currentPersona.demographics.age} onChange={(e) => handleEditField('demographics.age', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Cargo / Ocupação</Label>
                                <Input value={currentPersona.demographics.role} onChange={(e) => handleEditField('demographics.role', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Renda Estimada</Label>
                                <Input value={currentPersona.demographics.income} onChange={(e) => handleEditField('demographics.income', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Localização</Label>
                                <Input value={currentPersona.demographics.location} onChange={(e) => handleEditField('demographics.location', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Psychographics (Simple Text Areas for Arrays simplification in this demo) */}
                    <Card>
                        <CardHeader><CardTitle className="text-base">Psicografia (Separar por vírgula para arrays)</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Mindset Dominante</Label>
                                <AutosizeTextarea value={currentPersona.psychographics.mindset} onChange={(e) => handleEditField('psychographics.mindset', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Valores (Array)</Label>
                                <Input
                                    value={currentPersona.psychographics.values.join(', ')}
                                    onChange={(e) => handleEditField('psychographics.values', e.target.value.split(',').map(s => s.trim()))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Medos (Array)</Label>
                                <Input
                                    value={currentPersona.psychographics.fears.join(', ')}
                                    onChange={(e) => handleEditField('psychographics.fears', e.target.value.split(',').map(s => s.trim()))}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
            <CreatorTopbar currentSection={Section.APP_CREATOR_PERSONAS} setSection={setSection} />

            <main className="p-6 md:p-12 w-full max-w-[1400px] mx-auto flex-1 flex flex-col">

                {/* --- VIEW SWITCHER --- */}
                {view === 'list' && renderList()}

                {view === 'edit' && renderEdit()}

                {/* --- INPUT VIEW --- */}
                {view === 'input' && (
                    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full animate-fade-in relative">
                        <Button variant="ghost" className="absolute top-0 left-0" onClick={() => setView('list')}>
                            <Icon name="arrow-left" className="mr-2" /> Voltar
                        </Button>

                        <div className="bg-card border border-border p-8 rounded-2xl shadow-xl w-full relative overflow-hidden group">
                            {/* Decorative Top Line */}
                            <div
                                className="absolute top-0 left-0 w-full h-1"
                                style={{ backgroundColor: STUDIO_PRIMARY }}
                            />

                            <div className="mb-6 flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}
                                >
                                    <Icon name="magic-wand" size="size-5" />
                                </div>
                                <h3 className="font-bold text-lg">Quem é seu cliente ideal?</h3>
                            </div>

                            <AutosizeTextarea
                                placeholder="Descreva seu cliente: idade, profissão, o que tira o sono dele, o que ele sonha..."
                                className="min-h-[150px] bg-muted/20 border-border/50 focus:border-[#538096]/50 text-base p-4 resize-none"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />

                            <div className="flex justify-between items-center mt-6">
                                <div className="flex gap-2">
                                    {['Executivos', 'Mães Solo', 'Freelancers', 'Gamers'].map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="cursor-pointer hover:bg-[#538096]/10 hover:text-[#538096] hover:border-[#538096]/30 transition-colors"
                                            onClick={() => setInputText(prev => prev + (prev ? " " : "") + tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <Button
                                    onClick={handleGenerate}
                                    disabled={!inputText.trim()}
                                    className="text-white shadow-lg transition-all hover:scale-105"
                                    style={{ backgroundColor: STUDIO_PRIMARY, boxShadow: `0 10px 15px -3px ${STUDIO_PRIMARY}30` }}
                                >
                                    <Icon name="sparkles" className="mr-2 size-4" /> Gerar Persona
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PROCESSING VIEW --- */}
                {view === 'processing' && (
                    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
                            <div
                                className="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin"
                                style={{ borderColor: `${STUDIO_PRIMARY} transparent transparent transparent` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icon name="brain" size="size-8" className="animate-pulse" style={{ color: STUDIO_PRIMARY }} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-sans mb-2">Criando Perfil Psicológico...</h3>
                        <p className="text-muted-foreground">A IA está analisando padrões comportamentais.</p>
                    </div>
                )}

                {/* --- RESULT VIEW (READ ONLY) --- */}
                {view === 'result' && currentPersona && (
                    <div className="animate-fade-in space-y-6">

                        {/* Header Profile */}
                        <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
                            <div
                                className="w-20 h-20 rounded-xl flex items-center justify-center border-2 shadow-inner"
                                style={{ backgroundColor: STUDIO_ACCENT, borderColor: `${STUDIO_PRIMARY}20` }}
                            >
                                <Icon name={currentPersona.icon as any} size="size-10" style={{ color: STUDIO_PRIMARY }} />
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <h2 className="text-2xl font-bold font-sans">{currentPersona.name}</h2>
                                    <Badge
                                        variant="outline"
                                        className="w-fit mx-auto md:mx-0"
                                        style={{ borderColor: `${STUDIO_PRIMARY}30`, color: STUDIO_PRIMARY, backgroundColor: `${STUDIO_PRIMARY}10` }}
                                    >
                                        ICP Principal
                                    </Badge>
                                </div>
                                <p
                                    className="text-muted-foreground italic text-lg leading-relaxed border-l-2 pl-4"
                                    style={{ borderColor: `${STUDIO_PRIMARY}30` }}
                                >
                                    "{currentPersona.definingQuote}"
                                </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Button variant="outline" size="sm" onClick={() => setView('list')}>
                                    <Icon name="arrow-left" className="mr-2 size-3"/> Voltar
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setView('edit')}>
                                    <Icon name="pencil" className="mr-2 size-3"/> Editar
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSave}
                                    className="text-[#0A0A0F]"
                                    style={{ backgroundColor: STUDIO_GOLD }}
                                >
                                    <Icon name="check" className="mr-2 size-3"/> Salvar
                                </Button>
                            </div>
                        </div>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Demographics */}
                            <Card className="h-full">
                                <CardHeader className="pb-2 border-b border-border bg-muted/5">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Icon name="id-card-clip-alt" size="size-4" /> Demografia
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-sm text-muted-foreground">Idade</span>
                                        <span className="font-semibold text-sm">{currentPersona.demographics.age}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-sm text-muted-foreground">Ocupação</span>
                                        <span className="font-semibold text-sm text-right max-w-[60%]">{currentPersona.demographics.role}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-sm text-muted-foreground">Renda</span>
                                        <span className="font-semibold text-sm">{currentPersona.demographics.income}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">Local</span>
                                        <span className="font-semibold text-sm">{currentPersona.demographics.location}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Psychographics */}
                            <Card className="h-full lg:col-span-2">
                                <CardHeader className="pb-2 border-b border-border bg-muted/5">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Icon name="brain" size="size-4" /> Psicografia & Mindset
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold uppercase" style={{ color: STUDIO_PRIMARY }}>Valores Core</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {currentPersona.psychographics.values.map((val, i) => (
                                                <Badge key={i} variant="secondary" className="bg-muted font-normal">{val}</Badge>
                                            ))}
                                        </div>
                                        <h4 className="text-xs font-bold uppercase mt-4" style={{ color: STUDIO_PRIMARY }}>Medos Secretos</h4>
                                        <ul className="space-y-1">
                                            {currentPersona.psychographics.fears.map((fear, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <Icon name="cross-circle" className="text-destructive mt-1 shrink-0" size="size-3" />
                                                    {fear}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div
                                        className="p-4 rounded-lg border"
                                        style={{ backgroundColor: `${STUDIO_PRIMARY}10`, borderColor: `${STUDIO_PRIMARY}20` }}
                                    >
                                        <h4 className="text-xs font-bold uppercase mb-2" style={{ color: STUDIO_PRIMARY }}>Pensamento Dominante (Loop)</h4>
                                        <p className="italic text-foreground/80 leading-relaxed">
                                            "{currentPersona.psychographics.mindset}"
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pain Points */}
                            <Card className="h-full border-t-4 border-t-orange-500">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-orange-500 flex items-center gap-2">
                                        <Icon name="flame" size="size-4" /> Dores (Inferno)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    {currentPersona.painPoints.map((pain, i) => (
                                        <div key={i} className="space-y-1">
                                            <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> {pain.superficial}
                                            </p>
                                            <p className="text-xs text-muted-foreground pl-3.5 border-l border-orange-500/20">
                                                ↳ {pain.deep}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Desires */}
                            <Card className="h-full border-t-4 border-t-emerald-500">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                        <Icon name="star" size="size-4" /> Desejos (Céu)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    {currentPersona.desires.map((desire, i) => (
                                        <div key={i} className="space-y-1">
                                            <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {desire.surface}
                                            </p>
                                            <p className="text-xs text-muted-foreground pl-3.5 border-l border-emerald-500/20">
                                                ↳ {desire.hidden}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Flags */}
                            <Card className="h-full bg-muted/10">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Icon name="flag" size="size-4" /> Sinais de Compra
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-destructive uppercase mb-2 flex items-center gap-1">
                                            <Icon name="cross-circle" size="size-3" /> Red Flags (Evitar)
                                        </h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            {currentPersona.redFlags.map((flag, i) => (
                                                <li key={i}>• {flag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h4 className="text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-1">
                                            <Icon name="check-circle" size="size-3" /> Green Flags (Focar)
                                        </h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            {currentPersona.greenFlags.map((flag, i) => (
                                                <li key={i}>• {flag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default PersonasTemplate;
