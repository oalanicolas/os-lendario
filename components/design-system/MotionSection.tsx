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
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'speaking' | 'processing'>(
    'idle'
  );

  const replay = () => setAnimateKey((prev) => prev + 1);

  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Motion & Animação</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          O movimento na Academia Lendária não é decorativo; é funcional. Ele guia a atenção,
          suaviza mudanças de estado e adiciona uma camada de polimento premium (o "toque
          lendário").
        </p>
      </div>

      {/* --- AI VOICE VISUALIZER (NEW) --- */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="flex items-center gap-2 font-sans text-xl font-semibold">
            <Icon name="microphone" /> Interface de Voz (AI Voice)
          </h3>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <Card className="border-zinc-800 bg-black text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon name="sparkles" className="text-brand-blue" /> Gemini Live Mode
                </CardTitle>
                <Badge variant="outline" className="border-zinc-700 bg-transparent text-zinc-400">
                  {voiceState.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-8 py-12">
              {/* The Visualizer */}
              <div className="flex h-24 items-center">
                <AudioVisualizer state={voiceState} barCount={7} className="text-brand-blue" />
              </div>

              <p className="max-w-xs text-center font-serif text-sm text-zinc-500">
                {voiceState === 'idle' && 'Aguardando entrada...'}
                {voiceState === 'listening' && 'Ouvindo você...'}
                {voiceState === 'processing' && 'Processando resposta...'}
                {voiceState === 'speaking' && 'A inteligência artificial está respondendo...'}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Simule os estados de interação por voz para validar o feedback visual.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={voiceState === 'idle' ? 'default' : 'outline'}
                onClick={() => setVoiceState('idle')}
              >
                <Icon name="pause" className="mr-2 size-4" /> Idle
              </Button>
              <Button
                variant={voiceState === 'listening' ? 'default' : 'outline'}
                onClick={() => setVoiceState('listening')}
              >
                <Icon name="microphone" className="mr-2 size-4" /> Listening
              </Button>
              <Button
                variant={voiceState === 'processing' ? 'default' : 'outline'}
                onClick={() => setVoiceState('processing')}
              >
                <Icon name="spinner" className="mr-2 size-4" /> Processing
              </Button>
              <Button
                variant={voiceState === 'speaking' ? 'default' : 'outline'}
                onClick={() => setVoiceState('speaking')}
              >
                <Icon name="volume" className="mr-2 size-4" /> Speaking
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIMING & EASING --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="flex items-center gap-2 font-sans text-xl font-semibold">
            <Icon name="time-fast" /> Tempo & Curvas (Easing)
          </h3>
          <Button size="sm" variant="outline" onClick={replay}>
            <Icon name="refresh" className="mr-2" /> Replay
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                <div className="h-4 overflow-hidden rounded bg-muted">
                  <div
                    key={`d1-${animateKey}`}
                    className="h-full w-full animate-[shimmer_0.1s_ease-out_forwards] bg-primary"
                    style={{ animationDuration: '100ms' }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Fast (200ms)</span>
                  <span>Tooltips, Fade In</span>
                </div>
                <div className="h-4 overflow-hidden rounded bg-muted">
                  <div
                    key={`d2-${animateKey}`}
                    className="h-full w-full animate-[shimmer_0.2s_ease-out_forwards] bg-brand-blue"
                    style={{ animationDuration: '200ms' }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Normal (300ms)</span>
                  <span>Modais, Panels, Slides</span>
                </div>
                <div className="h-4 overflow-hidden rounded bg-muted">
                  <div
                    key={`d3-${animateKey}`}
                    className="h-full w-full animate-[shimmer_0.3s_ease-out_forwards] bg-brand-green"
                    style={{ animationDuration: '300ms' }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Slow (500ms+)</span>
                  <span>Entry Pages, Complex Layouts</span>
                </div>
                <div className="h-4 overflow-hidden rounded bg-muted">
                  <div
                    key={`d4-${animateKey}`}
                    className="h-full w-full animate-[shimmer_0.5s_ease-out_forwards] bg-brand-indigo"
                    style={{ animationDuration: '500ms' }}
                  ></div>
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
              <div className="relative flex h-12 items-center border-b border-border/50">
                <div
                  key={`e1-${animateKey}`}
                  className="absolute left-0 h-8 w-8 animate-[slide-in-right_1s_linear_infinite] rounded-full bg-primary shadow-md"
                ></div>
                <span className="absolute right-0 text-xs text-muted-foreground">
                  Linear (Mecânico)
                </span>
              </div>
              <div className="relative flex h-12 items-center border-b border-border/50">
                <div
                  key={`e2-${animateKey}`}
                  className="absolute left-0 h-8 w-8 animate-[slide-in-right_1s_ease-out_infinite] rounded-full bg-brand-blue shadow-md"
                ></div>
                <span className="absolute right-0 text-xs text-muted-foreground">
                  Ease-Out (Natural/Entrada)
                </span>
              </div>
              <div className="relative flex h-12 items-center border-b border-border/50">
                <div
                  key={`e3-${animateKey}`}
                  className="absolute left-0 h-8 w-8 animate-[slide-in-right_1s_ease-in-out_infinite] rounded-full bg-brand-green shadow-md"
                ></div>
                <span className="absolute right-0 text-xs text-muted-foreground">
                  Ease-In-Out (Suave)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- ENTRY ANIMATIONS --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="enter" /> Animações de Entrada (Stagger)
        </h3>
        <p className="font-serif text-sm text-muted-foreground">
          Ao carregar listas ou grids, use um "stagger" (atraso sequencial) para criar uma sensação
          de cascata elegante.
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`${i}-${animateKey}`}
              className="flex h-32 animate-fade-in items-center justify-center rounded-xl border border-border bg-card opacity-0 shadow-sm"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              <span className="font-mono text-xs text-muted-foreground">Delay: {i * 100}ms</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- MICRO-INTERACTIONS --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="cursor-finger" /> Micro-interações
        </h3>

        <div className="flex flex-wrap justify-center gap-12 rounded-xl border border-dashed border-border bg-muted/10 p-12">
          {/* Scale Button */}
          <div className="space-y-2 text-center">
            <button className="rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
              Click Me
            </button>
            <p className="text-xs text-muted-foreground">Active Scale (95%)</p>
          </div>

          {/* Lift Card */}
          <div className="space-y-2 text-center">
            <div className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <Icon name="arrow-up" />
            </div>
            <p className="text-xs text-muted-foreground">Hover Lift (-8px)</p>
          </div>

          {/* Glow Icon */}
          <div className="space-y-2 text-center">
            <div className="group relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-zinc-900">
              <div className="absolute inset-0 rounded-full bg-brand-blue/50 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"></div>
              <Icon
                name="bolt"
                className="relative z-10 text-white transition-colors group-hover:text-brand-blue"
              />
            </div>
            <p className="text-xs text-muted-foreground">Glow Effect</p>
          </div>
        </div>
      </section>

      {/* --- UTILITY CLASSES --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
          <Icon name="tags" /> Utilitários CSS (Tailwind)
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">.animate-fade-in</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-xs text-muted-foreground">
                Entrada suave com leve deslocamento Y.
              </p>
              <div className="flex justify-center overflow-hidden rounded bg-muted p-4">
                <div
                  key={`u1-${animateKey}`}
                  className="h-8 w-8 animate-fade-in rounded bg-foreground"
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">.animate-accordion-down</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-xs text-muted-foreground">
                Expansão de altura (usado em Dropdowns/Accordions).
              </p>
              <div className="flex h-20 items-start justify-center overflow-hidden rounded bg-muted p-4">
                <div
                  key={`u2-${animateKey}`}
                  className="h-full w-full animate-accordion-down rounded bg-foreground"
                ></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">.animate-pulse-slow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-xs text-muted-foreground">
                Pulso suave para status ou loading states.
              </p>
              <div className="flex justify-center overflow-hidden rounded bg-muted p-4">
                <div className="h-8 w-8 animate-pulse-slow rounded-full bg-brand-red"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">.animate-float</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-xs text-muted-foreground">
                Flutuação contínua para elementos hero/decorativos.
              </p>
              <div className="flex h-20 items-center justify-center overflow-hidden rounded bg-muted p-4">
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
