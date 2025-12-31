import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { AutosizeTextarea } from '../../../ui/autosize-textarea';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Separator } from '../../../ui/separator';
import { cn } from '../../../../lib/utils';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';
import { GoogleGenAI, Type } from '@google/genai';
import { useToast } from '../../../../hooks/use-toast';

// PersonaData type for AI-generated personas (before saving to DB)
export interface PersonaData {
  id: string;
  name: string;
  icon: string;
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

interface CreatePersonaProps {
  onCancel: () => void;
  onSave: (persona: PersonaData) => void;
}

type WizardStep = 'input' | 'processing' | 'review';

// Stepper Component
const Step = ({
  number,
  label,
  active,
  completed,
}: {
  number: string;
  label: string;
  active: boolean;
  completed: boolean;
}) => (
  <div className="z-10 flex flex-col items-center gap-2 bg-background px-2">
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-full font-bold transition-all',
        active
          ? 'bg-studio-primary text-white shadow-[0_0_15px_rgba(83,128,150,0.4)]'
          : completed
            ? 'bg-studio-primary/80 text-white'
            : 'border border-border bg-card text-muted-foreground'
      )}
    >
      {completed ? <Icon name="check" size="size-5" /> : number}
    </div>
    <span
      className={cn(
        'whitespace-nowrap text-sm font-medium',
        active
          ? 'text-studio-primary'
          : completed
            ? 'text-studio-primary/70'
            : 'text-muted-foreground'
      )}
    >
      {label}
    </span>
  </div>
);

export const CreatePersona: React.FC<CreatePersonaProps> = ({ onCancel, onSave }) => {
  const [step, setStep] = useState<WizardStep>('input');
  const [inputText, setInputText] = useState('');
  const [generatedPersona, setGeneratedPersona] = useState<PersonaData | null>(null);
  const { toast } = useToast();

  // Quick tags for common personas
  const quickTags = ['Executivos', 'Maes Solo', 'Freelancers', 'Gamers', 'Startups', 'Professores'];

  // --- GENERATION LOGIC ---
  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setStep('processing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const schema = {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          icon: { type: Type.STRING },
          demographics: {
            type: Type.OBJECT,
            properties: {
              age: { type: Type.STRING },
              role: { type: Type.STRING },
              income: { type: Type.STRING },
              location: { type: Type.STRING },
            },
          },
          psychographics: {
            type: Type.OBJECT,
            properties: {
              mindset: { type: Type.STRING },
              values: { type: Type.ARRAY, items: { type: Type.STRING } },
              fears: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
          painPoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                superficial: { type: Type.STRING },
                deep: { type: Type.STRING },
              },
            },
          },
          desires: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                surface: { type: Type.STRING },
                hidden: { type: Type.STRING },
              },
            },
          },
          redFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          greenFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          definingQuote: { type: Type.STRING },
        },
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Crie uma Buyer Persona profunda baseada em: "${inputText}". Seja especifico, criativo e use linguagem de marketing direto. Para o campo "icon", use um dos seguintes nomes: user, rocket, chart-line, laptop-code, sparkles, brain, briefcase, graduation-cap, lightbulb, target, star, users-alt.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature: 0.7,
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        const newPersona: PersonaData = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        };
        setGeneratedPersona(newPersona);
        setStep('review');
      } else {
        throw new Error('Resposta vazia');
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Erro', description: 'Falha ao gerar persona.', variant: 'destructive' });
      setStep('input');
    }
  };

  // --- EDIT HANDLERS ---
  const handleEditField = (path: string, value: any) => {
    if (!generatedPersona) return;

    const keys = path.split('.');
    if (keys.length === 1) {
      setGeneratedPersona({ ...generatedPersona, [keys[0]]: value });
    } else if (keys.length === 2) {
      setGeneratedPersona({
        ...generatedPersona,
        [keys[0]]: {
          ...(generatedPersona as any)[keys[0]],
          [keys[1]]: value,
        },
      });
    }
  };

  // --- SAVE HANDLER ---
  const handleSave = () => {
    if (generatedPersona) {
      onSave(generatedPersona);
    }
  };

  // --- REGENERATE ---
  const handleRegenerate = () => {
    setStep('input');
  };

  // Get step progress
  const getStepNumber = () => {
    switch (step) {
      case 'input':
        return 1;
      case 'processing':
        return 2;
      case 'review':
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = getStepNumber();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/50 px-8 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-studio-primary/10 text-studio-primary">
            <Icon name="user" size="size-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Persona Studio</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="cross" size="size-5" />
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-start px-4 py-8 md:py-12">
        {/* Stepper */}
        <div className="mb-12 w-full max-w-4xl">
          <div className="relative flex w-full items-center justify-between">
            <div className="absolute left-0 top-5 -z-10 h-0.5 w-full rounded-full bg-border"></div>
            <div
              className="absolute left-0 top-5 -z-10 h-0.5 rounded-full bg-studio-primary transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>

            <Step
              number="1"
              label="Descrever"
              active={step === 'input'}
              completed={currentStep > 1}
            />
            <Step
              number="2"
              label="Processar"
              active={step === 'processing'}
              completed={currentStep > 2}
            />
            <Step number="3" label="Revisar" active={step === 'review'} completed={false} />
          </div>
        </div>

        {/* --- INPUT STEP --- */}
        {step === 'input' && (
          <div className="flex w-full max-w-2xl animate-fade-in flex-col gap-8">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">Criar Nova Persona</h1>
              <p className="text-lg font-medium text-studio-primary/70">
                Descreva seu cliente ideal e a IA criara um perfil completo.
              </p>
            </div>

            <Card className={cn(STUDIO_CARD_CLASSES, 'overflow-hidden')}>
              {/* Decorative Top Line */}
              <div className="h-1 w-full bg-studio-primary" />

              <CardContent className="flex flex-col gap-6 p-6 md:p-8">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-studio-accent/20 text-studio-primary">
                    <Icon name="magic-wand" size="size-5" />
                  </div>
                  <h3 className="text-lg font-bold">Quem e seu cliente ideal?</h3>
                </div>

                <AutosizeTextarea
                  placeholder="Descreva seu cliente: idade, profissao, o que tira o sono dele, o que ele sonha..."
                  className="min-h-[150px] resize-none border-border/50 bg-muted/20 p-4 text-base focus:border-studio-primary/50"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                {/* Quick Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="mr-2 text-sm text-muted-foreground">Sugestoes:</span>
                  {quickTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer transition-colors hover:border-studio-primary/30 hover:bg-studio-primary/10 hover:text-studio-primary"
                      onClick={() => setInputText((prev) => prev + (prev ? ' ' : '') + tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between pb-10 pt-4">
              <Button
                variant="ghost"
                onClick={onCancel}
                className="text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!inputText.trim()}
                className="gap-2 bg-studio-primary text-white shadow-lg shadow-studio-primary/20 transition-all hover:scale-105 hover:bg-studio-primary/90"
              >
                <Icon name="magic-wand" size="size-4" />
                <span>Gerar com IA</span>
                <Icon name="arrow-right" size="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* --- PROCESSING STEP --- */}
        {step === 'processing' && (
          <div className="flex flex-1 animate-fade-in flex-col items-center justify-center py-20">
            <div className="relative mb-8 h-24 w-24">
              <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-studio-primary border-t-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="brain" size="size-8" className="animate-pulse text-studio-primary" />
              </div>
            </div>
            <h3 className="mb-2 font-sans text-xl font-bold">Criando Perfil Psicologico...</h3>
            <p className="text-muted-foreground">A IA esta analisando padroes comportamentais.</p>
          </div>
        )}

        {/* --- REVIEW STEP --- */}
        {step === 'review' && generatedPersona && (
          <div className="w-full max-w-4xl animate-fade-in space-y-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">Revisar Persona</h1>
              <p className="text-lg font-medium text-studio-primary/70">
                Confira os dados e edite se necessario antes de salvar.
              </p>
            </div>

            {/* Header Profile Card */}
            <Card className={cn(STUDIO_CARD_CLASSES, 'overflow-hidden')}>
              <div className="h-1 w-full bg-studio-primary" />
              <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-studio-primary/20 bg-studio-accent/10 shadow-inner">
                  <Icon
                    name={generatedPersona.icon as any}
                    size="size-10"
                    className="text-studio-primary"
                  />
                </div>
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <Input
                      value={generatedPersona.name}
                      onChange={(e) => handleEditField('name', e.target.value)}
                      className="h-auto border-none bg-transparent p-0 text-2xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Badge
                      variant="outline"
                      className="mx-auto w-fit border-studio-primary/30 bg-studio-primary/10 text-studio-primary md:mx-0"
                    >
                      ICP Principal
                    </Badge>
                  </div>
                  <div className="border-l-2 border-studio-primary/30 pl-4">
                    <Input
                      value={generatedPersona.definingQuote}
                      onChange={(e) => handleEditField('definingQuote', e.target.value)}
                      className="h-auto border-none bg-transparent p-0 italic text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Demographics */}
              <Card className={cn(STUDIO_CARD_CLASSES, 'h-full')}>
                <CardHeader className="border-b border-border bg-muted/5 pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="id-badge" size="size-4" /> Demografia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Idade</Label>
                    <Input
                      value={generatedPersona.demographics.age}
                      onChange={(e) => handleEditField('demographics.age', e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Ocupacao</Label>
                    <Input
                      value={generatedPersona.demographics.role}
                      onChange={(e) => handleEditField('demographics.role', e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Renda</Label>
                    <Input
                      value={generatedPersona.demographics.income}
                      onChange={(e) => handleEditField('demographics.income', e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Localizacao</Label>
                    <Input
                      value={generatedPersona.demographics.location}
                      onChange={(e) => handleEditField('demographics.location', e.target.value)}
                      className="h-9"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Psychographics */}
              <Card className={cn(STUDIO_CARD_CLASSES, 'h-full lg:col-span-2')}>
                <CardHeader className="border-b border-border bg-muted/5 pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="brain" size="size-4" /> Psicografia & Mindset
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-studio-primary">
                        Valores Core
                      </Label>
                      <Input
                        value={generatedPersona.psychographics.values.join(', ')}
                        onChange={(e) =>
                          handleEditField(
                            'psychographics.values',
                            e.target.value.split(',').map((s) => s.trim())
                          )
                        }
                        placeholder="Separar por virgula"
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-studio-primary">
                        Medos Secretos
                      </Label>
                      <Input
                        value={generatedPersona.psychographics.fears.join(', ')}
                        onChange={(e) =>
                          handleEditField(
                            'psychographics.fears',
                            e.target.value.split(',').map((s) => s.trim())
                          )
                        }
                        placeholder="Separar por virgula"
                        className="h-9"
                      />
                    </div>
                  </div>
                  <div className="rounded-lg border border-studio-primary/20 bg-studio-primary/10 p-4">
                    <Label className="mb-2 block text-xs font-bold uppercase text-studio-primary">
                      Pensamento Dominante
                    </Label>
                    <AutosizeTextarea
                      value={generatedPersona.psychographics.mindset}
                      onChange={(e) => handleEditField('psychographics.mindset', e.target.value)}
                      className="border-none bg-transparent p-0 italic focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pain Points */}
              <Card className={cn(STUDIO_CARD_CLASSES, 'h-full border-t-4 border-t-orange-500')}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500">
                    <Icon name="flame" size="size-4" /> Dores (Inferno)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {generatedPersona.painPoints.map((pain, i) => (
                    <div key={i} className="space-y-1">
                      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                        {pain.superficial}
                      </p>
                      <p className="border-l border-orange-500/20 pl-3.5 text-xs text-muted-foreground">
                        {pain.deep}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Desires */}
              <Card className={cn(STUDIO_CARD_CLASSES, 'h-full border-t-4 border-t-emerald-500')}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500">
                    <Icon name="star" size="size-4" /> Desejos (Ceu)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {generatedPersona.desires.map((desire, i) => (
                    <div key={i} className="space-y-1">
                      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {desire.surface}
                      </p>
                      <p className="border-l border-emerald-500/20 pl-3.5 text-xs text-muted-foreground">
                        {desire.hidden}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Flags */}
              <Card className={cn(STUDIO_CARD_CLASSES, 'h-full bg-muted/10')}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    <Icon name="flag" size="size-4" /> Sinais de Compra
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div>
                    <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-destructive">
                      <Icon name="cross-circle" size="size-3" /> Red Flags (Evitar)
                    </h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {generatedPersona.redFlags.map((flag, i) => (
                        <li key={i}>- {flag}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase text-emerald-500">
                      <Icon name="check-circle" size="size-3" /> Green Flags (Focar)
                    </h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {generatedPersona.greenFlags.map((flag, i) => (
                        <li key={i}>- {flag}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Icon Selector */}
            <Card className={cn(STUDIO_CARD_CLASSES)}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  <Icon name="palette" size="size-4" /> Icone da Persona
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    'user',
                    'rocket',
                    'chart-line',
                    'laptop-code',
                    'sparkles',
                    'brain',
                    'briefcase',
                    'graduation-cap',
                    'lightbulb',
                    'target',
                    'star',
                    'users-alt',
                  ].map((iconName) => (
                    <Button
                      key={iconName}
                      type="button"
                      variant="ghost"
                      onClick={() => handleEditField('icon', iconName)}
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-lg border p-0 transition-all',
                        generatedPersona.icon === iconName
                          ? 'border-studio-primary bg-studio-primary/20 text-studio-primary'
                          : 'border-border/50 hover:border-studio-primary/50 hover:bg-muted/30'
                      )}
                    >
                      <Icon name={iconName as any} size="size-6" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between pb-10 pt-4">
              <Button
                variant="ghost"
                onClick={handleRegenerate}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="refresh" size="size-4" />
                Gerar Novamente
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="gap-2 bg-studio-accent text-studio-bg shadow-lg hover:opacity-90"
                >
                  <Icon name="check" size="size-4" />
                  Salvar Persona
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreatePersona;
