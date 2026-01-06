/**
 * GuiaEbookTemplate - AI-powered ebook generator
 * Integrates with Google Gemini API for content and cover generation
 * Exports to PDF using html2canvas + jsPDF
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { useJobTracking } from '@/hooks/useJobTracking';
import { useEbookStorage } from '@/hooks/useEbookStorage';
import { generateStructuredContent, generateEbookCover } from '@/services/gemini';
import { MyContentsDrawer } from '../shared/MyContentsDrawer';
import { Symbol } from '@/components/ui/symbol';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/types';
import MarketingTopbar from '../MarketingTopbar';
import { DEFAULT_EBOOK_PROMPT, LOCAL_STORAGE_KEY } from './constants/default-prompt';
import { EbookPages } from './components/EbookPages';
import type { EbookData } from './types';

interface GuiaEbookTemplateProps {
  setSection: (s: Section) => void;
}

const GuiaEbookTemplate: React.FC<GuiaEbookTemplateProps> = ({ setSection }) => {
  const { toast } = useToast();
  const { trackJob } = useJobTracking();
  const {
    saveEbookProject,
    ebookProjects,
    listEbookProjects,
    deleteEbookProject,
    loading: projectsLoading,
    error: projectsError,
  } = useEbookStorage();

  // Generation State
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

  // Save State
  const [isSaving, setIsSaving] = useState(false);
  const [contentJobId, setContentJobId] = useState<string | null>(null);
  const [coverJobId, setCoverJobId] = useState<string | null>(null);

  // Projects Drawer State
  const [showProjectsDrawer, setShowProjectsDrawer] = useState(false);

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

    // PDF upload not yet supported via Edge Function
    if (mainFile) {
      toast({
        title: 'Funcionalidade em desenvolvimento',
        description: 'Upload de PDF será suportado em breve. Use texto ou YouTube por enquanto.',
        variant: 'warning',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(5);
    setEbookData(null);
    setCoverImageUrl(null);
    setLoadingMessage('Iniciando motores de IA...');

    try {
      // Use admin prompt if exists, else default
      const basePrompt = currentSystemPrompt || DEFAULT_EBOOK_PROMPT;
      const systemInstructions = basePrompt.replace(/{targetPages}/g, targetPages.toString());

      let mainPromptText = `Gere o manual completo de ${targetPages} páginas. `;

      if (inputText.trim()) {
        mainPromptText += `Tema: ${inputText}. `;
      }

      if (youtubeUrl.trim()) {
        mainPromptText += `FONTE OBRIGATÓRIA: Utilize o conteúdo e a transcrição deste vídeo do YouTube como base principal para o texto: ${youtubeUrl}. `;
      }

      mainPromptText +=
        'Priorize a densidade de 3 parágrafos de copy e a reflexão profunda no final de cada folha.';

      setLoadingMessage('Extraindo dados e diagramando...');
      setProgress(20);

      // Call Edge Function for content generation
      const contentStartTime = Date.now();
      const contentResponse = await generateStructuredContent({
        prompt: mainPromptText,
        systemInstruction: systemInstructions,
        useGrounding: true,
        thinkingBudget: 20000,
      });
      const contentLatency = Date.now() - contentStartTime;

      const parsed: EbookData = JSON.parse(contentResponse.text || '{}');
      setEbookData(parsed);

      // Track content generation job
      const contentJob = await trackJob({
        name: 'ebook_generate',
        model: 'gemini-2.0-flash',
        inputParams: {
          targetPages,
          hasYoutubeUrl: !!youtubeUrl.trim(),
          hasFile: false,
          inputLength: inputText.length,
        },
        outputResult: {
          chaptersCount: parsed.chapters?.length || 0,
          title: parsed.title,
        },
        latencyMs: contentLatency,
      });
      setContentJobId(contentJob);

      setProgress(60);
      setLoadingMessage('Forjando arte da capa...');

      // Call Edge Function for cover generation
      const coverStartTime = Date.now();
      const generatedCoverUrl = await generateEbookCover(parsed.coverPrompt);
      const coverLatency = Date.now() - coverStartTime;

      setCoverImageUrl(generatedCoverUrl);

      // Track cover generation job
      const coverJob = await trackJob({
        name: 'ebook_cover',
        model: 'imagen-3.0-generate-002',
        inputParams: { coverPrompt: parsed.coverPrompt },
        outputResult: { success: !!generatedCoverUrl },
        latencyMs: coverLatency,
      });
      setCoverJobId(coverJob);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2canvas = (window as any).html2canvas;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jspdfLib = (window as any).jspdf;

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
        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#FFFFFF',
        });
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

  // Save project to database
  const handleSaveProject = async () => {
    if (!ebookData) {
      toast({
        title: 'Erro',
        description: 'Nenhum ebook gerado para salvar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      const projectId = await saveEbookProject({
        ebookData,
        coverImageUrl,
        generationParams: {
          targetPages,
          youtubeUrl: youtubeUrl.trim() || undefined,
          inputText: inputText.trim() || undefined,
          systemPrompt:
            currentSystemPrompt !== DEFAULT_EBOOK_PROMPT ? currentSystemPrompt : undefined,
        },
        contentGenerationJobId: contentJobId,
        coverGenerationJobId: coverJobId,
      });

      if (projectId) {
        toast({
          title: 'Projeto Salvo!',
          description: 'Seu ebook foi salvo com sucesso.',
          variant: 'success',
        });
      } else {
        throw new Error('Falha ao salvar projeto');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao Salvar',
        description: 'Não foi possível salvar o projeto. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
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
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          pointerEvents: 'none',
          zIndex: -100,
          width: '210mm',
        }}
      >
        <div ref={printRef} style={{ width: '210mm' }}>
          {ebookData && <EbookPages ebookData={ebookData} coverImageUrl={coverImageUrl} isPrint />}
        </div>
      </div>

      {/* Loading Overlay */}
      {(isGenerating || isCapturing) && (
        <div className="fixed inset-0 z-[100] flex animate-fade-in flex-col items-center justify-center bg-background/95 p-8 backdrop-blur-xl">
          <Symbol name="infinity" className="mb-8 animate-spin text-8xl text-primary" />
          <h2 className="mb-4 text-3xl font-black uppercase tracking-[0.3em] text-foreground">
            {isCapturing ? 'Exportando PDF' : 'IA Diagramando'}
          </h2>
          <p className="mb-12 max-w-sm text-center font-serif text-xl italic text-muted-foreground">
            {loadingMessage || 'Processando geometria das páginas...'}
          </p>
          <div className="mb-10 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Topbar */}
      <MarketingTopbar currentSection={Section.APP_GUIA_EBOOK} setSection={setSection} />

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 pb-20 md:p-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar - Configuration Panel */}
          <aside className="lg:col-span-4">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Configurar Ebook</CardTitle>
                    <CardDescription>Defina os parâmetros de geração</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowProjectsDrawer(true)}
                      size="sm"
                      variant="ghost"
                      className="gap-2"
                    >
                      <Icon name="folder-open" size="size-4" />
                      Meus Ebooks
                    </Button>
                    {ebookData && (
                      <>
                        <Button
                          onClick={handleSaveProject}
                          disabled={isSaving || isCapturing}
                          size="sm"
                          variant="outline"
                          className="gap-2"
                        >
                          {isSaving ? (
                            <Icon name="spinner" className="animate-spin" size="size-4" />
                          ) : (
                            <Icon name="cloud-upload" size="size-4" />
                          )}
                          Salvar
                        </Button>
                        <Button
                          onClick={handleCaptureAndExport}
                          disabled={isCapturing || isSaving}
                          size="sm"
                          className="gap-2"
                        >
                          {isCapturing ? (
                            <Icon name="spinner" className="animate-spin" size="size-4" />
                          ) : (
                            <Icon name="file-pdf" size="size-4" />
                          )}
                          Exportar PDF
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible defaultValue="parametros" className="w-full">
                  {/* SECTION 1: Generation Parameters */}
                  <AccordionItem value="parametros" className="border-none">
                    <AccordionTrigger className="py-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:no-underline">
                      <span className="flex items-center gap-2">
                        <Icon name="settings-sliders" size="size-4" /> Parâmetros da Forja
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-5 pb-4 pt-2">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          Volume de Páginas
                        </Label>
                        <div className="rounded-xl border border-border bg-muted/30 p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <span className="font-mono text-2xl font-bold text-primary">
                              {targetPages}
                            </span>
                            <span className="text-sm text-muted-foreground">páginas</span>
                          </div>
                          <Slider
                            min={5}
                            max={50}
                            value={targetPages}
                            onChange={(e) => setTargetPages(parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          Núcleo Temático
                        </Label>
                        <Textarea
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="Sobre o que vamos forjar este manual?"
                          className="min-h-[100px] rounded-xl border-border bg-muted/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          YouTube (Transcrição)
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
                            className="h-11 rounded-xl border-border bg-muted/30 pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          Material de Suporte (PDF)
                        </Label>
                        <FileUpload
                          onFileSelect={(f) => setMainFile(Array.isArray(f) ? f[0] : f)}
                          accept="application/pdf"
                          className="h-24 border-border bg-muted/20"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* SECTION 2: Prompt Engineering */}
                  <AccordionItem value="engenharia" className="border-none">
                    <AccordionTrigger className="py-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:no-underline">
                      <span className="flex items-center gap-2">
                        <Icon name="terminal" size="size-4" /> Prompt (Admin)
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pb-4 pt-2">
                      <div className="group relative">
                        <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 bg-background/60"
                            onClick={resetPrompt}
                            title="Resetar para o padrão"
                          >
                            <Icon name="refresh" size="size-3" />
                          </Button>
                        </div>
                        <Textarea
                          value={currentSystemPrompt}
                          onChange={(e) => savePromptChanges(e.target.value)}
                          className="min-h-[300px] rounded-xl border-border bg-background font-mono text-[10px] leading-relaxed text-muted-foreground"
                          placeholder="System Instructions..."
                        />
                      </div>
                      <p className="font-mono text-[9px] italic text-muted-foreground/60">
                        Use {'{targetPages}'} para o número de páginas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  className="h-14 w-full rounded-xl text-base font-black uppercase"
                  onClick={handleGenerate}
                  disabled={isGenerating || isCapturing}
                >
                  {isGenerating ? 'Processando...' : 'Forjar Manual'}
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Preview Area */}
          <section className="lg:col-span-8">
            <Card className="min-h-[600px] overflow-hidden">
              <CardHeader className="border-b border-border pb-4">
                <CardTitle className="text-lg">Preview</CardTitle>
                <CardDescription>Visualização do ebook gerado</CardDescription>
              </CardHeader>
              <CardContent className="bg-muted/20 bg-[radial-gradient(hsl(var(--border)/0.3)_1px,transparent_1px)] p-8 [background-size:24px_24px]">
                {ebookData ? (
                  <div className="flex justify-center">
                    <div className="origin-top scale-[0.35] transition-all sm:scale-[0.45] lg:scale-[0.55]">
                      <EbookPages
                        ebookData={ebookData}
                        coverImageUrl={coverImageUrl}
                        isPrint={false}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
                    <Icon name="book-open-reader" className="mb-6 size-24 text-primary" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">
                      Aguardando Forja
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Configure os parâmetros e clique em "Forjar Manual"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* My Projects Drawer */}
      <MyContentsDrawer
        open={showProjectsDrawer}
        onOpenChange={setShowProjectsDrawer}
        mode="ebook"
        contents={ebookProjects.map((p) => ({
          id: p.id,
          title: p.name,
          contentType: 'ebook',
          status: p.status,
          createdAt: p.createdAt,
          chapterCount: p.chapterCount,
          coverUrl: p.coverUrl,
          metadata: p.metadata as unknown as Record<string, unknown>,
        }))}
        loading={projectsLoading}
        error={projectsError}
        onRefresh={listEbookProjects}
        onDelete={deleteEbookProject}
      />
    </div>
  );
};

export default GuiaEbookTemplate;
