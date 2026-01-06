import React, { useState, useMemo } from 'react';
import { Input } from '../../ui/input';
import { Button, buttonVariants } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Select } from '../../ui/select';
import { Symbol } from '../../ui/symbol';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../ui/sheet';
import { Label } from '../../ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useJobTracking } from '@/hooks/useJobTracking';
import { useCuratorStorage, CuratorFormat } from '@/hooks/useCuratorStorage';
import { curatorSearch, curatorGenerate } from '@/services/gemini';
import { Section } from '@/types';
import MarketingTopbar from '../MarketingTopbar';
import { MyContentsDrawer } from '../shared/MyContentsDrawer';

import { NewsItem, AngleData, DateRange, ContentFormat } from './types';
import {
  getDynamicDate,
  formatRelativeTime,
  cleanUrl,
  getCategoryStyles,
  getPlatformIcon,
  getPlatformColor,
  getCurrentDate,
} from './utils';

interface CuratorTemplateProps {
  setSection: (section: Section) => void;
}

const CONTENT_FORMATS: ContentFormat[] = [
  { id: 'reels', label: 'Roteiro Reels', icon: 'video-camera' },
  { id: 'youtube', label: 'YouTube', icon: 'youtube', type: 'brands' },
  { id: 'carousel', label: 'Carrossel', icon: 'image' },
  { id: 'twitter', label: 'Thread X', icon: 'twitter', type: 'brands' },
  { id: 'email', label: 'Email / News', icon: 'envelope' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', type: 'brands' },
];

const CuratorTemplate: React.FC<CuratorTemplateProps> = ({ setSection }) => {
  const { toast } = useToast();
  const { trackJob } = useJobTracking();
  const {
    saveCuratorContent,
    curatorContents,
    listCuratorContents,
    deleteCuratorContent,
    loading: contentsLoading,
    error: contentsError,
  } = useCuratorStorage();

  // Search & Generation State
  const [nicheTerm, setNicheTerm] = useState('');
  const [themeTerm, setThemeTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [allItems, setAllItems] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  // Save State
  const [showSaveSheet, setShowSaveSheet] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastUsedFormat, setLastUsedFormat] = useState<CuratorFormat>('reels');
  const [lastUsedAngle, setLastUsedAngle] = useState<AngleData | null>(null);

  // Contents Drawer State
  const [showContentsDrawer, setShowContentsDrawer] = useState(false);

  // Filtering logic
  const filteredItems = useMemo(() => {
    let maxMinutes = Infinity;
    if (dateRange === '24h') maxMinutes = 60 * 24;
    if (dateRange === '3d') maxMinutes = 60 * 24 * 3;
    if (dateRange === '7d') maxMinutes = 60 * 24 * 7;

    return allItems.filter((item) => item.minutesAgo <= maxMinutes);
  }, [allItems, dateRange]);

  // Search handler using Gemini with Google Search grounding (via Edge Function)
  const handleSearch = async () => {
    if (!nicheTerm.trim()) {
      toast({
        title: 'Campo vazio',
        description: 'Digite um nicho para buscar.',
        variant: 'warning',
      });
      return;
    }

    setIsSearching(true);
    setSelectedNews(null);
    setGeneratedContent('');

    try {
      const audience = themeTerm.trim() || 'Empreendedores e Líderes';
      const startTime = Date.now();

      // Call Edge Function via service
      const responseText = await curatorSearch(nicheTerm, audience);
      const latencyMs = Date.now() - startTime;

      const cleanJsonStr = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      const newsData = JSON.parse(cleanJsonStr);

      const newItems: NewsItem[] = newsData.map((item: NewsItem, index: number) => ({
        ...item,
        id: Date.now() + index,
        url: cleanUrl(item.url),
        fullDate: getDynamicDate(item.minutesAgo || 60),
        time: formatRelativeTime(item.minutesAgo || 0),
      }));

      // Track LLM job
      await trackJob({
        name: 'curator_search',
        model: 'gemini-2.0-flash',
        inputParams: { niche: nicheTerm, audience, newsCount: 12 },
        outputResult: { newsFound: newItems.length },
        latencyMs,
      });

      setAllItems(newItems);
      if (newItems.length > 0) setSelectedNews(newItems[0]);
      toast({
        title: 'Busca Concluída',
        description: `${newItems.length} notícias encontradas com links diretos.`,
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro na Busca',
        description: 'Não foi possível buscar as notícias. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Content generation handler (via Edge Function)
  const handleGenerate = async (format: string, specificAngle?: AngleData) => {
    if (!selectedNews) return;
    setIsGenerating(true);

    // Map format string to CuratorFormat
    const formatMap: Record<string, CuratorFormat> = {
      reels: 'reels',
      youtube: 'youtube',
      carousel: 'carousel',
      twitter: 'twitter',
      email: 'email',
      linkedin: 'linkedin',
      'Instagram Reels': 'reels',
      YouTube: 'youtube',
      TikTok: 'reels',
      'Twitter/X': 'twitter',
      LinkedIn: 'linkedin',
    };
    const curatorFormat = formatMap[format] || 'reels';
    setLastUsedFormat(curatorFormat);
    setLastUsedAngle(specificAngle || null);

    try {
      const audience = themeTerm || 'minha audiência';
      const startTime = Date.now();

      // Call Edge Function via service
      const responseText = await curatorGenerate(selectedNews.title, audience, format);
      const latencyMs = Date.now() - startTime;

      // Track LLM job
      await trackJob({
        name: 'curator_generate',
        model: 'gemini-2.0-flash',
        inputParams: {
          newsTitle: selectedNews.title,
          format: curatorFormat,
          audience,
          angle: specificAngle?.title,
        },
        outputResult: { contentLength: responseText.length },
        latencyMs,
      });

      setGeneratedContent(responseText);
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro ao Gerar', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setNicheTerm('');
    setThemeTerm('');
    setAllItems([]);
    setSelectedNews(null);
    setGeneratedContent('');
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({ title: 'Copiado!', description: 'Conteúdo copiado para a área de transferência.' });
  };

  // Open save sheet with suggested title
  const handleOpenSaveSheet = () => {
    const suggestedTitle = lastUsedAngle?.title || selectedNews?.title || 'Conteúdo Gerado';
    setSaveTitle(suggestedTitle);
    setShowSaveSheet(true);
  };

  // Save content to database
  const handleSaveContent = async () => {
    if (!selectedNews || !generatedContent || !saveTitle.trim()) {
      toast({
        title: 'Erro',
        description: 'Título é obrigatório.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      // Use the first angle if no specific angle was used
      const angleToUse = lastUsedAngle || selectedNews.angles[0];

      const contentId = await saveCuratorContent({
        title: saveTitle.trim(),
        content: generatedContent,
        format: lastUsedFormat,
        sourceNews: selectedNews,
        angleUsed: angleToUse,
        generationParams: {
          niche: nicheTerm,
          audience: themeTerm || 'Empreendedores e Líderes',
        },
      });

      if (contentId) {
        toast({
          title: 'Conteúdo Salvo!',
          description: 'Seu rascunho foi salvo com sucesso.',
          variant: 'success',
        });
        setShowSaveSheet(false);
        setSaveTitle('');
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao Salvar',
        description: 'Não foi possível salvar o conteúdo. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans selection:bg-primary/30">
      {/* Marketing Topbar */}
      <MarketingTopbar currentSection={Section.CURATOR} setSection={setSection} />

      {/* Search Bar */}
      <div className="shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <div className="w-[160px] shrink-0">
            <Select
              placeholder="Período"
              value={dateRange}
              onValueChange={(v) => setDateRange(v as DateRange)}
              options={[
                { label: 'Todas as Datas', value: 'all' },
                { label: 'Últimas 24h', value: '24h' },
                { label: 'Últimos 3 dias', value: '3d' },
                { label: 'Última Semana', value: '7d' },
              ]}
            />
          </div>
          <div className="group relative flex-1">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary"
            />
            <Input
              value={nicheTerm}
              onChange={(e) => setNicheTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="h-11 rounded-xl border-border bg-muted/30 pl-11 transition-all duration-300 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-muted-foreground focus:border-primary/30"
              placeholder="NICHO..."
            />
          </div>
          <div className="group relative flex-1">
            <Icon
              name="users"
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary"
            />
            <Input
              value={themeTerm}
              onChange={(e) => setThemeTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="h-11 rounded-xl border-border bg-muted/30 pl-11 transition-all duration-300 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-muted-foreground focus:border-primary/30"
              placeholder="AUDIÊNCIA..."
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="h-11 rounded-xl px-6 text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/20 transition-all duration-300 active:scale-[0.98]"
          >
            {isSearching ? (
              <Icon name="spinner" className="mr-2 size-4 animate-spin" />
            ) : (
              <Icon name="globe" className="mr-2 size-4" />
            )}
            Varrer
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-11 rounded-xl px-4 text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:text-foreground"
            onClick={handleReset}
          >
            <Icon name="refresh" className="mr-2 size-3.5" /> Reset
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-11 rounded-xl border-primary/20 px-4 text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:bg-primary/10"
            onClick={() => setShowContentsDrawer(true)}
          >
            <Icon name="folder-open" className="mr-2 size-3.5" /> Meus Conteúdos
          </Button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid min-h-0 flex-1 grid-cols-12 divide-x divide-border">
        {/* COL 1: NEWS FEED */}
        <div className="col-span-4 flex h-full min-w-[300px] flex-col overflow-hidden bg-card lg:col-span-3">
          <div className="flex shrink-0 items-center justify-between border-b border-border p-5">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Feed de Notícias
            </span>
            <Badge
              variant="outline"
              className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-[9px] font-black text-primary"
            >
              {filteredItems.length}
            </Badge>
          </div>

          <ScrollArea className="flex-1">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center space-y-6 p-12">
                <Symbol name="infinity" className="animate-spin text-4xl text-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Varrendo a Internet...
                </p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <Icon name="filter" className="mx-auto mb-4 size-10 opacity-30" />
                <p className="font-serif text-sm italic">Nenhuma notícia encontrada.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredItems.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => {
                      setSelectedNews(news);
                      setGeneratedContent('');
                    }}
                    className={cn(
                      'group cursor-pointer border-l-2 border-transparent p-5 transition-all duration-300 hover:bg-white/[0.03]',
                      selectedNews?.id === news.id ? 'border-l-primary bg-primary/5' : ''
                    )}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <Badge
                        variant="outline"
                        className={cn(
                          'h-5 rounded-full border-none px-2.5 text-[8px] font-black uppercase tracking-[0.15em]',
                          getCategoryStyles(news.category)
                        )}
                      >
                        {news.category}
                      </Badge>
                      <span className="font-mono text-[9px] text-muted-foreground">
                        {news.time}
                      </span>
                    </div>
                    <h4
                      className={cn(
                        'mb-3 line-clamp-2 text-sm font-bold leading-snug transition-colors duration-300',
                        selectedNews?.id === news.id
                          ? 'text-primary'
                          : 'text-foreground group-hover:text-foreground/80'
                      )}
                    >
                      {news.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                      <Icon name="globe" className="size-3" />
                      <span className="font-serif italic">{news.source}</span>
                      <span className="text-white/10">|</span>
                      <span className="font-black text-primary">{news.relevance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* COL 2: AI ANALYSIS */}
        <div className="relative col-span-8 flex h-full flex-col overflow-hidden bg-background lg:col-span-5">
          {/* Radial gradient sutil */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.04),transparent_60%)]" />

          {selectedNews ? (
            <ScrollArea className="relative z-10 flex-1">
              <div className="mx-auto max-w-2xl space-y-10 p-8 pb-24 md:p-10">
                {/* Header da notícia */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-full border-white/10 bg-white/5 px-3 py-1 font-serif text-[9px] italic text-muted-foreground"
                    >
                      {selectedNews.source}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1.5 rounded-full border-white/10 bg-white/5 px-3 py-1 text-[9px] text-muted-foreground"
                    >
                      <Icon name="calendar" className="size-3" /> {selectedNews.fullDate}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        'rounded-full px-3 text-[8px] font-black uppercase tracking-[0.15em]',
                        getCategoryStyles(selectedNews.category)
                      )}
                    >
                      {selectedNews.category}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold leading-[0.95] tracking-tight text-foreground md:text-4xl">
                    {selectedNews.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <a
                      href={selectedNews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'h-10 gap-2 rounded-xl border-primary/20 bg-primary/5 text-[9px] font-black uppercase tracking-[0.15em] text-primary no-underline transition-all duration-300 hover:border-primary/40 hover:bg-primary/10'
                      )}
                    >
                      Ler Original
                      <Icon name="external-link" className="size-3" />
                    </a>
                    <span className="font-mono text-[9px] text-muted-foreground/50">
                      #{selectedNews.id}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Card de Impacto - Glassmorphism */}
                <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-8 backdrop-blur-xl">
                  {/* Aura glow */}
                  <div className="absolute -inset-4 rounded-3xl bg-primary/10 opacity-50 blur-3xl" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                        <Icon name="sparkles" className="size-4" /> Impacto para Você
                      </h3>
                      <p className="font-serif text-base italic leading-relaxed text-foreground/90">
                        {selectedNews.analysis.whyItMatters}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                        <h4 className="mb-2 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-green-500">
                          <Icon name="trend-up" className="size-3.5" /> Oportunidade
                        </h4>
                        <p className="font-serif text-xs italic leading-relaxed text-muted-foreground">
                          {selectedNews.analysis.opportunity}
                        </p>
                      </div>
                      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                        <h4 className="mb-2 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-red-500">
                          <Icon name="shield-exclamation" className="size-3.5" /> Risco
                        </h4>
                        <p className="font-serif text-xs italic leading-relaxed text-muted-foreground">
                          {selectedNews.analysis.risk}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ângulos de Conteúdo */}
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                      Ângulos de Conteúdo
                    </h3>
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-[9px] font-black text-primary"
                    >
                      {selectedNews.angles.length} ideias
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {selectedNews.angles.map((angle, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/30"
                      >
                        {/* Linha lateral que aparece no hover */}
                        <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-transparent transition-colors duration-300 group-hover:bg-primary" />
                        {/* Aura glow no hover */}
                        <div className="absolute -inset-2 rounded-2xl bg-primary/0 opacity-0 blur-xl transition-all duration-500 group-hover:bg-primary/5 group-hover:opacity-100" />

                        <div className="relative z-10">
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-3">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'h-5 rounded-full px-2.5 text-[8px] font-black uppercase tracking-[0.1em]',
                                    getPlatformColor(angle.bestPlatform)
                                  )}
                                >
                                  <Icon
                                    name={getPlatformIcon(angle.bestPlatform)}
                                    type="brands"
                                    className="mr-1.5 size-3"
                                  />
                                  {angle.bestPlatform}
                                </Badge>
                                <span className="text-[9px] font-black text-primary">
                                  {angle.successRate}%
                                </span>
                              </div>
                              <span className="block text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                                {angle.title}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 p-0 text-primary shadow-lg shadow-primary/0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-primary/20 active:scale-95"
                              onClick={() => handleGenerate(angle.bestPlatform, angle)}
                            >
                              <Icon name="magic-wand" className="size-4" />
                            </Button>
                          </div>
                          <p className="font-serif text-xs italic leading-relaxed text-muted-foreground">
                            &quot;{angle.description}&quot;
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-muted/20">
                <Icon name="cursor-finger" className="size-10 opacity-30" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Selecione uma notícia
              </h3>
              <p className="mt-3 max-w-xs font-serif text-sm italic text-muted-foreground/60">
                Escolha um item do feed ao lado para ver a análise da IA.
              </p>
            </div>
          )}
        </div>

        {/* COL 3: STUDIO */}
        <div className="col-span-12 flex h-full flex-col overflow-hidden border-l border-border bg-card lg:col-span-4">
          <div className="flex shrink-0 items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-3">
              <Symbol name="star" className="text-2xl text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
                Estúdio Criativo
              </span>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-8 p-6 pb-24">
              {!selectedNews ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <Symbol name="infinity" className="mb-4 text-4xl text-muted-foreground/20" />
                  <p className="font-serif text-sm italic text-muted-foreground/40">
                    Aguardando seleção...
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-5">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                      Formato de Saída
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {CONTENT_FORMATS.map((fmt) => (
                        <Button
                          key={fmt.id}
                          variant="outline"
                          className="group flex h-24 flex-col gap-3 rounded-2xl border-border bg-muted/20 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/5"
                          onClick={() => handleGenerate(fmt.id)}
                        >
                          <Icon
                            name={fmt.icon}
                            type={fmt.type as 'brands' | undefined}
                            className="size-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                          />
                          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                            {fmt.label}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {isGenerating ? (
                    <div className="animate-pulse rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-10 text-center">
                      <Symbol
                        name="infinity"
                        className="mx-auto mb-4 animate-spin text-3xl text-primary"
                      />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                        Escrevendo roteiro...
                      </span>
                    </div>
                  ) : (
                    generatedContent && (
                      <div className="flex animate-fade-in flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                            Rascunho Gerado
                          </label>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-lg transition-colors duration-300 hover:bg-white/5"
                              onClick={handleCopyContent}
                            >
                              <Icon name="copy" className="size-3.5 text-muted-foreground" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-lg transition-colors duration-300 hover:bg-red-500/10"
                              onClick={() => setGeneratedContent('')}
                            >
                              <Icon
                                name="trash"
                                className="size-3.5 text-muted-foreground hover:text-red-500"
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto whitespace-pre-wrap rounded-2xl border border-border bg-muted/20 p-5 font-mono text-sm leading-relaxed text-foreground/80">
                          {generatedContent}
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="h-14 flex-1 rounded-xl border-primary/30 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/10"
                            onClick={handleOpenSaveSheet}
                          >
                            <Icon name="bookmark" className="mr-2 size-4" /> Salvar Rascunho
                          </Button>
                          <Button className="h-14 flex-1 rounded-xl bg-primary text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 active:scale-[0.98]">
                            <Icon name="check" className="mr-2 size-4" /> Finalizar
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Save Content Sheet */}
      <Sheet open={showSaveSheet} onOpenChange={setShowSaveSheet}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon name="bookmark" className="size-5 text-primary" />
              Salvar Rascunho
            </SheetTitle>
            <SheetDescription>
              Salve este conteúdo para acessar depois em &quot;Meus Conteúdos&quot;.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="saveTitle"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground"
              >
                Título do Conteúdo
              </Label>
              <Input
                id="saveTitle"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                placeholder="Digite um título..."
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Formato:</span>
                <Badge variant="outline" className="rounded-full">
                  {CONTENT_FORMATS.find((f) => f.id === lastUsedFormat)?.label || lastUsedFormat}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Fonte:</span>
                <span className="max-w-[200px] truncate font-medium text-foreground">
                  {selectedNews?.source}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Nicho:</span>
                <span className="font-medium text-foreground">{nicheTerm || '-'}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="h-12 flex-1 rounded-xl"
                onClick={() => setShowSaveSheet(false)}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button
                className="h-12 flex-1 rounded-xl"
                onClick={handleSaveContent}
                disabled={isSaving || !saveTitle.trim()}
              >
                {isSaving ? (
                  <>
                    <Icon name="spinner" className="mr-2 size-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Icon name="check" className="mr-2 size-4" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* My Contents Drawer */}
      <MyContentsDrawer
        open={showContentsDrawer}
        onOpenChange={setShowContentsDrawer}
        mode="curator"
        contents={curatorContents.map((c) => ({
          id: c.id,
          title: c.title,
          contentType: c.contentType,
          status: c.status,
          createdAt: c.createdAt,
          content: c.content,
          metadata: c.curatorMetadata as unknown as Record<string, unknown>,
        }))}
        loading={contentsLoading}
        error={contentsError}
        onRefresh={listCuratorContents}
        onDelete={deleteCuratorContent}
      />
    </div>
  );
};

export default CuratorTemplate;
