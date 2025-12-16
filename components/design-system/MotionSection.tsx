import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../../lib/utils';
import { AudioVisualizer } from '../ui/audio-visualizer';

const MotionSection: React.FC = () => {
  const [animateKey, setAnimateKey] = useState(0);
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'speaking' | 'processing'>('idle');

  const replay = () => setAnimateKey(prev => prev + 1);

  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Motion & Animação</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           O movimento na Academia Lendária não é decorativo; é funcional. Ele guia a atenção, suaviza mudanças de estado e adiciona uma camada de polimento premium (o "toque lendário").
        </p>
      </div>

      {/* --- AI VOICE VISUALIZER (NEW) --- */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-2">
             <h3 className="text-xl font-sans font-semibold flex items-center gap-2">
                <Icon name="microphone" /> Interface de Voz (AI Voice)
            </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Card className="bg-black text-white border-zinc-800">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Icon name="sparkles" className="text-brand-blue" /> Gemini Live Mode
                        </CardTitle>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 bg-transparent">
                            {voiceState.toUpperCase()}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 gap-8">
                    {/* The Visualizer */}
                    <div className="h-24 flex items-center">
                        <AudioVisualizer state={voiceState} barCount={7} className="text-brand-blue" />
                    </div>
                    
                    <p className="text-zinc-500 font-serif text-sm text-center max-w-xs">
                        {voiceState === 'idle' && "Aguardando entrada..."}
                        {voiceState === 'listening' && "Ouvindo você..."}
                        {voiceState === 'processing' && "Processando resposta..."}
                        {voiceState === 'speaking' && "A inteligência artificial está respondendo..."}
                    </p>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Simule os estados de interação por voz para validar o feedback visual.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant={voiceState === 'idle' ? 'default' : 'outline'} onClick={() => setVoiceState('idle')}>
                        <Icon name="pause" className="mr-2 size-4" /> Idle
                    </Button>
                    <Button variant={voiceState === 'listening' ? 'default' : 'outline'} onClick={() => setVoiceState('listening')}>
                        <Icon name="microphone" className="mr-2 size-4" /> Listening
                    </Button>
                    <Button variant={voiceState === 'processing' ? 'default' : 'outline'} onClick={() => setVoiceState('processing')}>
                        <Icon name="spinner" className="mr-2 size-4" /> Processing
                    </Button>
                    <Button variant={voiceState === 'speaking' ? 'default' : 'outline'} onClick={() => setVoiceState('speaking')}>
                        <Icon name="volume" className="mr-2 size-4" /> Speaking
                    </Button>
                </div>
            </div>
        </div>
      </section>

      {/* --- TIMING & EASING --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <div className="flex items-center justify-between border-b border-border pb-2">
             <h3 className="text-xl font-sans font-semibold flex items-center gap-2">
                <Icon name="time-fast" /> Tempo & Curvas (Easing)
            </h3>
            <Button size="sm" variant="outline" onClick={replay}><Icon name="refresh" className="mr-2" /> Replay</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Durações Padrão</CardTitle>
                    <CardDescription>Consistência temporal é vital.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Instant (100ms)</span>
                            <span>Hover, Toggles</span>
                        </div>
                        <div className="h-4 bg-muted rounded overflow-hidden">
                            <div key={`d1-${animateKey}`} className="h-full bg-primary w-full animate-[shimmer_0.1s_ease-out_forwards]" style={{ animationDuration: '100ms' }}></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Fast (200ms)</span>
                            <span>Tooltips, Fade In</span>
                        </div>
                        <div className="h-4 bg-muted rounded overflow-hidden">
                            <div key={`d2-${animateKey}`} className="h-full bg-brand-blue w-full animate-[shimmer_0.2s_ease-out_forwards]" style={{ animationDuration: '200ms' }}></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Normal (300ms)</span>
                            <span>Modais, Panels, Slides</span>
                        </div>
                        <div className="h-4 bg-muted rounded overflow-hidden">
                            <div key={`d3-${animateKey}`} className="h-full bg-brand-green w-full animate-[shimmer_0.3s_ease-out_forwards]" style={{ animationDuration: '300ms' }}></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Slow (500ms+)</span>
                            <span>Entry Pages, Complex Layouts</span>
                        </div>
                        <div className="h-4 bg-muted rounded overflow-hidden">
                            <div key={`d4-${animateKey}`} className="h-full bg-brand-indigo w-full animate-[shimmer_0.5s_ease-out_forwards]" style={{ animationDuration: '500ms' }}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Curvas de Aceleração</CardTitle>
                    <CardDescription>Personalidade do movimento.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 py-8">
                    <div className="relative h-12 flex items-center border-b border-border/50">
                        <div key={`e1-${animateKey}`} className="absolute w-8 h-8 bg-primary rounded-full shadow-md animate-[slide-in-right_1s_linear_infinite] left-0"></div>
                        <span className="absolute right-0 text-xs text-muted-foreground">Linear (Mecânico)</span>
                    </div>
                    <div className="relative h-12 flex items-center border-b border-border/50">
                        <div key={`e2-${animateKey}`} className="absolute w-8 h-8 bg-brand-blue rounded-full shadow-md animate-[slide-in-right_1s_ease-out_infinite] left-0"></div>
                        <span className="absolute right-0 text-xs text-muted-foreground">Ease-Out (Natural/Entrada)</span>
                    </div>
                    <div className="relative h-12 flex items-center border-b border-border/50">
                        <div key={`e3-${animateKey}`} className="absolute w-8 h-8 bg-brand-green rounded-full shadow-md animate-[slide-in-right_1s_ease-in-out_infinite] left-0"></div>
                        <span className="absolute right-0 text-xs text-muted-foreground">Ease-In-Out (Suave)</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* --- ENTRY ANIMATIONS --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="enter" /> Animações de Entrada (Stagger)
        </h3>
        <p className="text-sm text-muted-foreground font-serif">
            Ao carregar listas ou grids, use um "stagger" (atraso sequencial) para criar uma sensação de cascata elegante.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
                <div 
                    key={`${i}-${animateKey}`}
                    className="h-32 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm opacity-0 animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                >
                    <span className="font-mono text-xs text-muted-foreground">Delay: {i * 100}ms</span>
                </div>
            ))}
        </div>
      </section>

      {/* --- MICRO-INTERACTIONS --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="cursor-finger" /> Micro-interações
        </h3>
        
        <div className="flex flex-wrap gap-12 justify-center p-12 border border-border border-dashed rounded-xl bg-muted/10">
            
            {/* Scale Button */}
            <div className="text-center space-y-2">
                <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg transition-transform active:scale-95 hover:scale-105 shadow-lg shadow-primary/20">
                    Click Me
                </button>
                <p className="text-xs text-muted-foreground">Active Scale (95%)</p>
            </div>

            {/* Lift Card */}
            <div className="text-center space-y-2">
                <div className="w-32 h-32 bg-card border border-border rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex items-center justify-center cursor-pointer">
                    <Icon name="arrow-up" />
                </div>
                <p className="text-xs text-muted-foreground">Hover Lift (-8px)</p>
            </div>

            {/* Glow Icon */}
            <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group cursor-pointer relative">
                    <div className="absolute inset-0 bg-brand-blue/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Icon name="bolt" className="text-white relative z-10 transition-colors group-hover:text-brand-blue" />
                </div>
                <p className="text-xs text-muted-foreground">Glow Effect</p>
            </div>

        </div>
      </section>

      {/* --- UTILITY CLASSES --- */}
      <section className="space-y-8">
        <h3 className="text-xl font-sans font-semibold border-b border-border pb-2 flex items-center gap-2">
            <Icon name="tags" /> Utilitários CSS (Tailwind)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-mono">.animate-fade-in</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">Entrada suave com leve deslocamento Y.</p>
                    <div className="p-4 bg-muted rounded flex justify-center overflow-hidden">
                        <div key={`u1-${animateKey}`} className="w-8 h-8 bg-foreground rounded animate-fade-in"></div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-mono">.animate-accordion-down</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">Expansão de altura (usado em Dropdowns/Accordions).</p>
                    <div className="p-4 bg-muted rounded flex justify-center overflow-hidden h-20 items-start">
                        <div key={`u2-${animateKey}`} className="w-full bg-foreground rounded animate-accordion-down h-full"></div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-mono">.animate-pulse-slow</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">Pulso suave para status ou loading states.</p>
                    <div className="p-4 bg-muted rounded flex justify-center overflow-hidden">
                        <div className="w-8 h-8 bg-brand-red rounded-full animate-pulse-slow"></div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-mono">.animate-float</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">Flutuação contínua para elementos hero/decorativos.</p>
                    <div className="p-4 bg-muted rounded flex justify-center overflow-hidden h-20 items-center">
                        <Icon name="rocket" size="size-6" className="animate-float text-primary" />
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>

    </div>
  );
};

export default MotionSection;
