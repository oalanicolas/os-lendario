/**
 * GuiaEbookTemplate - AI-powered ebook generator
 * Integrates with Google Gemini API for content and cover generation
 * Exports to PDF using html2canvas + jsPDF
 */

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Symbol } from '@/components/ui/symbol';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DEFAULT_EBOOK_PROMPT, LOCAL_STORAGE_KEY } from './constants/default-prompt';
import { EbookPages } from './components/EbookPages';
import type { EbookData } from './types';

const GuiaEbookTemplate: React.FC = () => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [targetPages, setTargetPages] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [ebookData, setEbookData] = useState<EbookData | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Admin Prompt State
  const [currentSystemPrompt, setCurrentSystemPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    setCurrentSystemPrompt(saved || DEFAULT_EBOOK_PROMPT);
  }, []);

  const savePromptChanges = (newVal: string) => {
    setCurrentSystemPrompt(newVal);
    localStorage.setItem(LOCAL_STORAGE_KEY, newVal);
  };

  const resetPrompt = () => {
    if (window.confirm('Deseja restaurar o prompt padrão da Academia?')) {
      savePromptChanges(DEFAULT_EBOOK_PROMPT);
      toast({ title: 'Prompt Restaurado' });
    }
  };

  const printRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!inputText.trim() && !mainFile && !youtubeUrl.trim()) {
      toast({
        title: 'Atenção',
        description: 'Envie um material base, descreva o tema ou insira um link do YouTube.',
        variant: 'destructive',
      });
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      toast({
        title: 'Erro de Configuração',
        description: 'API Key do Gemini não configurada. Verifique VITE_GEMINI_API_KEY no .env.local',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(5);
    setEbookData(null);
    setCoverImageUrl(null);
    setLoadingMessage('Iniciando motores de IA...');

    try {
      const ai = new GoogleGenAI({ apiKey });

      // Use admin prompt if exists, else default
      const basePrompt = currentSystemPrompt || DEFAULT_EBOOK_PROMPT;
      const systemInstructions = basePrompt.replace(/{targetPages}/g, targetPages.toString());

      const parts: Array<{ inlineData?: { mimeType: string; data: string }; text?: string }> = [];

      if (mainFile) {
        const reader = new FileReader();
        const base64Data = await new Promise<string>((res) => {
          reader.onload = () => res((reader.result as string).split(',')[1]);
          reader.readAsDataURL(mainFile);
        });
        parts.push({ inlineData: { mimeType: 'application/pdf', data: base64Data } });
      }

      let mainPromptText = `Gere o manual completo de ${targetPages} páginas. `;

      if (inputText.trim()) {
        mainPromptText += `Tema: ${inputText}. `;
      }

      if (youtubeUrl.trim()) {
        mainPromptText += `FONTE OBRIGATÓRIA: Utilize o conteúdo e a transcrição deste vídeo do YouTube como base principal para o texto: ${youtubeUrl}. `;
      }

      mainPromptText +=
        'Priorize a densidade de 3 parágrafos de copy e a reflexão profunda no final de cada folha.';

      parts.push({ text: mainPromptText });

      setLoadingMessage('Extraindo dados e diagramando...');
      setProgress(20);

      const textResponse = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts },
        config: {
          systemInstruction: systemInstructions,
          responseMimeType: 'application/json',
          tools: [{ googleSearch: {} }],
          thinkingConfig: { thinkingBudget: 20000 },
        },
      });

      const parsed: EbookData = JSON.parse(textResponse.text || '{}');
      setEbookData(parsed);
      setProgress(60);
      setLoadingMessage('Forjando arte da capa...');

      const coverResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `High-end luxury industrial book cover: ${parsed.coverPrompt}. Obsidian black matte, 3D liquid gold elements, cinematic shadows, 8k.`,
            },
          ],
        },
        config: { imageConfig: { aspectRatio: '3:4' } },
      });

      for (const part of coverResponse.candidates?.[0]?.content?.parts || []) {
        if ((part as { inlineData?: { data: string } }).inlineData) {
          setCoverImageUrl(
            `data:image/png;base64,${(part as { inlineData: { data: string } }).inlineData.data}`
          );
        }
      }

      setProgress(100);
      toast({ title: 'Manual Forjado com Sucesso' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Erro na Geração', description: String(error), variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCaptureAndExport = async () => {
    if (!printRef.current || !ebookData || isCapturing) return;

    const html2canvas = (window as unknown as { html2canvas: typeof import('html2canvas').default })
      .html2canvas;
    const jspdfLib = (window as unknown as { jspdf: { jsPDF: typeof import('jspdf').jsPDF } }).jspdf;

    if (!html2canvas || !jspdfLib) {
      toast({
        title: 'Erro',
        description: 'Bibliotecas de exportação não carregadas. Verifique o index.html.',
        variant: 'destructive',
      });
      return;
    }

    setIsCapturing(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const pages = Array.from(printRef.current.querySelectorAll('.al-page'));
      const { jsPDF } = jspdfLib;
      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true });

      for (let i = 0; i < pages.length; i++) {
        const pageEl = pages[i] as HTMLElement;
        const canvas = await html2canvas(pageEl, { scale: 2, useCORS: true, backgroundColor: '#FFFFFF' });
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      pdf.save(`${ebookData.title.toLowerCase().replace(/\s+/g, '-')}-al-manual.pdf`);
      toast({ title: 'PDF Exportado com Sucesso' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Erro na Exportação', description: String(error), variant: 'destructive' });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] font-sans text-white selection:bg-primary/30">
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .al-page { page-break-after: always; flex-shrink: 0; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
                @media print { .al-page { margin: 0 !important; border: none !important; box-shadow: none !important; } }
            `,
        }}
      />

      {/* Hidden print container */}
      <div
        style={{ position: 'absolute', left: '-9999px', top: 0, pointerEvents: 'none', zIndex: -100, width: '210mm' }}
      >
        <div ref={printRef} style={{ width: '210mm' }}>
          {ebookData && <EbookPages ebookData={ebookData} coverImageUrl={coverImageUrl} isPrint />}
        </div>
      </div>

      {/* Loading Overlay */}
      {(isGenerating || isCapturing) && (
        <div className="fixed inset-0 z-[100] flex animate-fade-in flex-col items-center justify-center bg-[#050505]/95 p-8 backdrop-blur-xl">
          <Symbol name="infinity" className="mb-8 animate-spin text-8xl text-primary" />
          <h2 className="mb-4 text-3xl font-black uppercase tracking-[0.3em]">
            {isCapturing ? 'Exportando PDF' : 'IA Diagramando'}
          </h2>
          <p className="mb-12 max-w-sm text-center font-serif text-xl italic text-zinc-500">
            {loadingMessage || 'Processando geometria das páginas...'}
          </p>
          <div className="mb-10 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-white/5">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-[#0A0A0B] px-8">
        <div className="flex items-center gap-4">
          <Symbol name="infinity" className="text-3xl text-primary" />
          <h1 className="text-lg font-bold uppercase tracking-tight">
            Gu[IA] <span className="text-primary">Ebook</span>
          </h1>
        </div>
        {ebookData && (
          <Button
            onClick={handleCaptureAndExport}
            disabled={isCapturing}
            className="bg-primary font-black uppercase text-primary-foreground shadow-lg shadow-primary/20"
          >
            {isCapturing ? (
              <Icon name="spinner" className="mr-2 animate-spin" />
            ) : (
              <Icon name="file-pdf" className="mr-2" />
            )}
            Exportar PDF Final
          </Button>
        )}
      </header>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-12 overflow-hidden">
        {/* Sidebar */}
        <aside className="custom-scrollbar col-span-12 flex flex-col gap-8 overflow-y-auto border-r border-white/10 bg-[#0A0A0F] p-8 lg:col-span-4">
          <Accordion type="single" collapsible defaultValue="parametros" className="w-full">
            {/* SECTION 1: Generation Parameters */}
            <AccordionItem value="parametros" className="border-none">
              <AccordionTrigger className="py-4 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-primary hover:no-underline">
                <span className="flex items-center gap-2">
                  <Icon name="settings-sliders" size="size-4" /> Parâmetros da Forja
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pb-6 pt-2">
                <div className="space-y-4">
                  <Label className="text-xs font-bold uppercase text-zinc-500">Volume de Páginas</Label>
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-primary">{targetPages} Páginas</span>
                    </div>
                    <Slider
                      min={5}
                      max={50}
                      value={[targetPages]}
                      onValueChange={(value) => setTargetPages(value[0])}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase text-zinc-500">Núcleo Temático</Label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Sobre o que vamos forjar este manual de alta densidade?"
                    className="min-h-[120px] rounded-xl border-white/10 bg-background p-4 font-serif text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase text-zinc-500">
                    Transcrição YouTube (Link)
                  </Label>
                  <div className="relative">
                    <Icon
                      name="youtube"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500"
                      size="size-4"
                    />
                    <Input
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="h-11 rounded-xl border-white/10 bg-background pl-10"
                    />
                  </div>
                  <p className="font-mono text-[9px] italic text-zinc-500">
                    A IA acessará a transcrição do vídeo para compor o manual.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase text-zinc-500">Material de Suporte (PDF)</Label>
                  <FileUpload
                    onFileSelect={(f) => setMainFile(Array.isArray(f) ? f[0] : f)}
                    accept="application/pdf"
                    className="h-32 border-white/5 bg-[#050505]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 2: Prompt Engineering (Internal Admin) */}
            <AccordionItem value="engenharia" className="border-none">
              <AccordionTrigger className="py-4 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-primary hover:no-underline">
                <span className="flex items-center gap-2">
                  <Icon name="terminal" size="size-4" /> Engenharia Neural (Prompt)
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-6 pt-2">
                <div className="group relative">
                  <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 bg-black/40"
                      onClick={resetPrompt}
                      title="Resetar para o padrão"
                    >
                      <Icon name="refresh" size="size-3" />
                    </Button>
                  </div>
                  <Textarea
                    value={currentSystemPrompt}
                    onChange={(e) => savePromptChanges(e.target.value)}
                    className="min-h-[400px] rounded-xl border-white/5 bg-black p-4 font-mono text-[10px] leading-relaxed text-zinc-400 focus-visible:ring-primary/20"
                    placeholder="System Instructions..."
                  />
                </div>
                <p className="font-mono text-[9px] italic leading-snug text-zinc-600">
                  * Utilize {'{targetPages}'} para injetar dinamicamente o número de páginas. Alterar as
                  chaves do JSON quebrará a diagramação visual.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            className="mt-auto h-20 w-full rounded-xl bg-primary text-xl font-black uppercase text-primary-foreground shadow-2xl transition-transform hover:scale-[1.02]"
            onClick={handleGenerate}
            disabled={isGenerating || isCapturing}
          >
            {isGenerating ? 'Processando...' : 'Forjar Manual Completo'}
          </Button>
        </aside>

        {/* Preview Area */}
        <section className="custom-scrollbar col-span-12 overflow-y-auto bg-[#121214] bg-[radial-gradient(#ffffff03_1px,transparent_1px)] p-12 [background-size:32px_32px] lg:col-span-8">
          {ebookData ? (
            <div className="mx-auto flex max-w-4xl animate-fade-in flex-col items-center">
              <div className="origin-top scale-[0.4] transition-all sm:scale-[0.55] lg:scale-[0.7]">
                <EbookPages ebookData={ebookData} coverImageUrl={coverImageUrl} isPrint={false} />
              </div>
            </div>
          ) : (
            <div className="flex animate-pulse flex-col items-center justify-center py-40 text-center opacity-10">
              <Icon name="book-open-reader" className="mb-8 size-40 text-primary" />
              <h3 className="text-5xl font-black uppercase tracking-tighter">Aguardando Forja</h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GuiaEbookTemplate;
