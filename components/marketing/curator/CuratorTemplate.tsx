import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Input } from '../../ui/input';
import { Button, buttonVariants } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Select } from '../../ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Section } from '@/types';

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
  setSection?: (section: Section) => void;
}

const CONTENT_FORMATS: ContentFormat[] = [
  { id: 'reels', label: 'Roteiro Reels', icon: 'video-camera' },
  { id: 'youtube', label: 'YouTube', icon: 'youtube', type: 'brands' },
  { id: 'carousel', label: 'Carrossel', icon: 'image' },
  { id: 'twitter', label: 'Thread X', icon: 'twitter', type: 'brands' },
  { id: 'email', label: 'Email / News', icon: 'envelope' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', type: 'brands' },
];

const CuratorTemplate: React.FC<CuratorTemplateProps> = () => {
  const { toast } = useToast();
  const [nicheTerm, setNicheTerm] = useState('');
  const [themeTerm, setThemeTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>('all');

  const [allItems, setAllItems] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  // Filtering logic
  const filteredItems = useMemo(() => {
    let maxMinutes = Infinity;
    if (dateRange === '24h') maxMinutes = 60 * 24;
    if (dateRange === '3d') maxMinutes = 60 * 24 * 3;
    if (dateRange === '7d') maxMinutes = 60 * 24 * 7;

    return allItems.filter((item) => item.minutesAgo <= maxMinutes);
  }, [allItems, dateRange]);

  // Search handler using Gemini with Google Search grounding
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
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key do Gemini não configurada');
      }

      const ai = new GoogleGenAI({ apiKey });
      const audience = themeTerm.trim() || 'Empreendedores e Líderes';

      const prompt = `
            Você é um Curador de Notícias de Elite da Academia Lendária.
            Tarefa: Busque na internet as 12 notícias mais recentes e impactantes sobre o nicho: "${nicheTerm}".

            Contexto da Audiência: A análise e os ângulos de conteúdo devem ser focados especificamente para impactar: "${audience}".

            Requisitos Obrigatórios:
            1. Use a ferramenta de busca do Google para encontrar notícias REAIS e ATUAIS (preferencialmente últimas 48h).
            2. Classifique cada notícia prioritariamente entre estas 3 categorias: "Investimento", "Mercado" ou "Tecnologia".
            3. EXTRAIA A URL DIRETA: O campo "url" deve conter obrigatoriamente o link direto do site da notícia (ex: g1.globo.com, exame.com, techcrunch.com).
            4. IMPORTANTE: NÃO retorne links de redirecionamento do Google (google.com/url?q=...). Busque o link canônico final.
            5. Analise o impacto especificamente para a audiência citada.
            6. Gere pelo menos 4 ângulos de conteúdo (ideias de posts) para essa audiência por notícia.

            Retorne APENAS um JSON válido com esta estrutura:
            [
              {
                "title": "Título da Notícia",
                "source": "Nome do Veículo",
                "minutesAgo": numero,
                "relevance": numero,
                "category": "Investimento" | "Mercado" | "Tecnologia",
                "summary": "Resumo curto.",
                "impact": "high" | "medium" | "low",
                "url": "https://link-direto-da-fonte",
                "analysis": {
                   "whyItMatters": "Por que importa para ${audience}?",
                   "opportunity": "Oportunidade para ${audience}",
                   "risk": "Risco para ${audience}"
                },
                "angles": [
                   { "title": "Titulo do post", "description": "Breve descrição", "bestPlatform": "LinkedIn" | "Instagram Reels" | "YouTube" | "Twitter/X", "successRate": 80-99 }
                ]
              }
            ]
            `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.1,
        },
      });

      const responseText = response.text || '';
      const cleanJsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const newsData = JSON.parse(cleanJsonStr);

      const newItems: NewsItem[] = newsData.map((item: NewsItem, index: number) => ({
        ...item,
        id: Date.now() + index,
        url: cleanUrl(item.url),
        fullDate: getDynamicDate(item.minutesAgo || 60),
        time: formatRelativeTime(item.minutesAgo || 0),
      }));

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
        description: 'Não foi possível buscar as notícias. Verifique a API Key.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Content generation handler
  const handleGenerate = async (format: string, _specificAngle?: AngleData) => {
    if (!selectedNews) return;
    setIsGenerating(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key do Gemini não configurada');
      }

      const ai = new GoogleGenAI({ apiKey });
      const audience = themeTerm || 'minha audiência';

      let formatInstruction = '';
      if (format === 'carousel' || format.includes('Carrossel') || format.includes('LinkedIn')) {
        formatInstruction = `Crie um ROTEIRO PARA CARROSSEL (Slide a Slide) otimizado para retenção.`;
      } else if (format === 'reels' || format.includes('TikTok') || format.includes('Shorts')) {
        formatInstruction = `Crie um ROTEIRO DE VÍDEO CURTO (Reels/TikTok) de 60 segundos com hooks visuais.`;
      } else if (format === 'twitter' || format.includes('Thread')) {
        formatInstruction = `Crie uma THREAD viral para o Twitter/X.`;
      } else if (format === 'email' || format.includes('Newsletter')) {
        formatInstruction = `Escreva uma NEWSLETTER de alta conversão.`;
      } else {
        formatInstruction = `Crie um ROTEIRO PARA YOUTUBE (Deep Dive).`;
      }

      const prompt = `
            Atue como um Copywriter Expert da Academia Lendária.
            DADOS DA NOTÍCIA: ${selectedNews.title}.
            PÚBLICO: ${audience}.
            MISSÃO: ${formatInstruction}

            REGRAS OBRIGATÓRIAS DE OUTPUT:
            1. Retorne APENAS o texto final do conteúdo/roteiro.
            2. NÃO inclua saudações, introduções (como "Com certeza!", "Aqui está seu roteiro") ou qualquer explicação meta-conversacional.
            3. O texto deve começar diretamente no conteúdo.
            `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      setGeneratedContent(response.text || '');
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

  return (
    <div className="flex flex-col h-screen bg-background font-sans overflow-hidden">
      {/* TOP BAR */}
      <header className="h-20 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_10px_rgba(201,178,152,0.2)]">
            <Icon name="search-alt" className="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-sans leading-none tracking-tight">Curador[IA]</h1>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
              {getCurrentDate()} &bull; LIVE FEED
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-4xl mx-8 relative flex gap-4 items-center">
          <div className="w-[180px] shrink-0">
            <Select
              placeholder="Período da Busca"
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
          <div className="flex-1">
            <Input
              value={nicheTerm}
              onChange={(e) => setNicheTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-background/50"
              placeholder="Nicho (ex: Inteligência Artificial)..."
            />
          </div>
          <div className="flex-1">
            <Input
              value={themeTerm}
              onChange={(e) => setThemeTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-background/50"
              placeholder="Quem impacta? (Ex: Agências)"
            />
          </div>
          <Button onClick={handleSearch} disabled={isSearching} className="w-32">
            {isSearching ? (
              <Icon name="spinner" className="animate-spin mr-2" />
            ) : (
              <Icon name="globe" className="mr-2" />
            )}
            Varredura
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" className="h-8" onClick={handleReset}>
            <Icon name="refresh" className="size-3 mr-2" /> Reset
          </Button>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="flex-1 grid grid-cols-12 min-h-0 divide-x divide-border">
        {/* COL 1: NEWS FEED */}
        <div className="col-span-4 lg:col-span-3 flex flex-col bg-muted/5 min-w-[300px] h-full overflow-hidden">
          <div className="p-4 border-b border-border bg-card flex justify-between items-center shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Feed de Notícias
            </span>
            <span className="text-[10px] text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-full">
              {filteredItems.length}
            </span>
          </div>

          <ScrollArea className="flex-1">
            {isSearching ? (
              <div className="p-8 flex flex-col items-center justify-center space-y-4">
                <Icon name="spinner" className="animate-spin text-primary size-8" />
                <p className="text-xs text-muted-foreground">Varrendo a Internet...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Icon name="filter" className="size-8 mb-2 opacity-50 mx-auto" />
                <p className="text-sm">Nenhuma notícia encontrada.</p>
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
                      'p-4 cursor-pointer hover:bg-muted/50 transition-all border-l-2 border-transparent',
                      selectedNews?.id === news.id ? 'bg-white/5 border-l-primary' : ''
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[9px] h-5 uppercase font-bold border-none',
                          getCategoryStyles(news.category)
                        )}
                      >
                        {news.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono">{news.time}</span>
                    </div>
                    <h4
                      className={cn(
                        'text-sm font-bold leading-snug mb-2 transition-colors line-clamp-2',
                        selectedNews?.id === news.id ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {news.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Icon name="globe" className="size-3" /> {news.source}
                      <span className="text-border">|</span>
                      <span className="font-bold text-foreground">{news.relevance}% Rel.</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* COL 2: AI ANALYSIS */}
        <div className="col-span-8 lg:col-span-5 flex flex-col bg-background relative h-full overflow-hidden">
          {selectedNews ? (
            <ScrollArea className="flex-1">
              <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8 pb-20">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="rounded-sm text-xs font-mono">
                      {selectedNews.source}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="rounded-sm text-xs text-muted-foreground flex gap-1 items-center"
                    >
                      <Icon name="calendar" className="size-3" /> {selectedNews.fullDate}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        'rounded-sm text-xs uppercase font-bold',
                        getCategoryStyles(selectedNews.category)
                      )}
                    >
                      {selectedNews.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-sans leading-tight text-foreground">
                    {selectedNews.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <a
                      href={selectedNews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'gap-2 border-primary/30 text-primary hover:border-primary no-underline'
                      )}
                    >
                      Ler Matéria Original
                      <Icon name="external-link" className="size-3" />
                    </a>
                    <span className="text-xs text-muted-foreground font-mono">ID: {selectedNews.id}</span>
                  </div>
                </div>

                <Separator />

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Icon name="sparkles" className="size-4" /> IMPACTO PARA VOCÊ:
                      </h3>
                      <p className="text-sm text-foreground/90 font-serif leading-relaxed">
                        {selectedNews.analysis.whyItMatters}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/60 p-3 rounded-lg border border-primary/10">
                        <h4 className="text-xs font-bold text-brand-green uppercase mb-1 flex items-center gap-1">
                          <Icon name="trend-up" className="size-3" /> Oportunidade
                        </h4>
                        <p className="text-xs text-muted-foreground font-serif leading-snug">
                          {selectedNews.analysis.opportunity}
                        </p>
                      </div>
                      <div className="bg-background/60 p-3 rounded-lg border border-primary/10">
                        <h4 className="text-xs font-bold text-destructive uppercase mb-1 flex items-center gap-1">
                          <Icon name="shield-exclamation" className="size-3" /> Risco
                        </h4>
                        <p className="text-xs text-muted-foreground font-serif leading-snug">
                          {selectedNews.analysis.risk}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      Ângulos de Conteúdo Sugeridos
                    </h3>
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">
                      {selectedNews.angles.length} ideias
                    </span>
                  </div>
                  <div className="space-y-4">
                    {selectedNews.angles.map((angle, index) => (
                      <div
                        key={index}
                        className="p-4 border border-border rounded-xl bg-card hover:border-primary/30 transition-all group relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary transition-colors"></div>
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-[9px] px-1.5 h-5 font-bold uppercase',
                                  getPlatformColor(angle.bestPlatform)
                                )}
                              >
                                <Icon
                                  name={getPlatformIcon(angle.bestPlatform)}
                                  type="brands"
                                  className="size-3 mr-1"
                                />
                                {angle.bestPlatform}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                Score: {angle.successRate}%
                              </span>
                            </div>
                            <span className="font-bold text-sm block text-foreground">{angle.title}</span>
                          </div>
                          <Button
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full shrink-0 bg-primary/10 text-primary hover:bg-primary"
                            onClick={() => handleGenerate(angle.bestPlatform, angle)}
                          >
                            <Icon name="magic-wand" className="size-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground font-serif leading-relaxed">
                          &quot;{angle.description}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Icon name="cursor-finger" className="size-8 opacity-50" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Selecione uma notícia</h3>
              <p className="text-sm max-w-xs mt-2">
                Escolha um item do feed ao lado para ver a análise da IA.
              </p>
            </div>
          )}
        </div>

        {/* COL 3: STUDIO */}
        <div className="col-span-12 lg:col-span-4 flex flex-col bg-card border-l border-border h-full overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Icon name="magic-wand" className="text-brand-purple" />
              <span className="font-bold text-sm uppercase tracking-wider">Estúdio Criativo</span>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 flex flex-col gap-6 pb-20">
              {!selectedNews ? (
                <div className="p-8 flex items-center justify-center opacity-30 text-sm">
                  Aguardando seleção...
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-muted-foreground uppercase">
                      Formato de Saída Rápido
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {CONTENT_FORMATS.map((fmt) => (
                        <Button
                          key={fmt.id}
                          variant="outline"
                          className="h-20 flex flex-col gap-2 hover:border-primary"
                          onClick={() => handleGenerate(fmt.id)}
                        >
                          <Icon name={fmt.icon} type={fmt.type as 'brands' | undefined} className="size-5" />
                          <span className="text-[10px] uppercase font-bold">{fmt.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {isGenerating ? (
                    <div className="p-8 bg-muted/10 rounded-xl border border-dashed border-border animate-pulse text-center">
                      <Icon name="spinner" className="animate-spin text-primary mb-3 mx-auto size-6" />
                      <span className="text-sm font-medium">Escrevendo roteiro...</span>
                    </div>
                  ) : (
                    generatedContent && (
                      <div className="flex flex-col gap-2 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-muted-foreground uppercase">
                            Rascunho Gerado
                          </label>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={handleCopyContent}
                            >
                              <Icon name="copy" className="size-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => setGeneratedContent('')}
                            >
                              <Icon name="trash" className="size-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30 border border-border rounded-lg text-sm font-mono whitespace-pre-wrap max-h-[400px] overflow-y-auto text-foreground/80 leading-relaxed shadow-inner">
                          {generatedContent}
                        </div>
                        <Button className="w-full shadow-lg shadow-primary/20 mt-2">
                          <Icon name="check" className="size-4 mr-2" /> FINALIZAR NO EDITOR
                        </Button>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CuratorTemplate;
