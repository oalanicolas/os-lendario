import React, { useState, useMemo } from 'react';
import { marked } from 'marked';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';
import {
  MindArtifact,
  MindArtifactsResult,
  categorizeArtifact,
  CATEGORY_LABELS,
  CATEGORY_ICONS
} from '../../../hooks/useMindArtifacts';
import { YamlViewer, isYamlContent } from '../ui/YamlViewer';

interface ArtifactsTabProps {
  artifactsData: MindArtifactsResult | null;
  loading: boolean;
}

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Helper: Convert markdown to HTML
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  try {
    return marked.parse(markdown, { async: false }) as string;
  } catch {
    return markdown;
  }
};

// Category order for display
const CATEGORY_ORDER = [
  'identity',
  'frameworks',
  'analysis',
  'style',
  'cases',
  'architecture',
  'influences',
  'other'
];

// Helper to get file type info
const getArtifactType = (filename: string | null) => {
  if (!filename) return { label: 'DOC', icon: 'document', color: 'text-zinc-400', bg: 'bg-zinc-400/10' };
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'yaml':
    case 'yml':
      return { label: 'YAML', icon: 'database', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
    case 'md':
    case 'markdown':
      return { label: 'MD', icon: 'file-text', color: 'text-blue-400', bg: 'bg-blue-400/10' };
    case 'json':
      return { label: 'JSON', icon: 'code', color: 'text-amber-400', bg: 'bg-amber-400/10' };
    default:
      return { label: ext?.toUpperCase() || 'FILE', icon: 'document', color: 'text-zinc-400', bg: 'bg-zinc-400/10' };
  }
};

export const ArtifactsTab: React.FC<ArtifactsTabProps> = ({ artifactsData, loading }) => {
  const [selectedArtifact, setSelectedArtifact] = useState<MindArtifact | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['identity', 'frameworks']));
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter artifacts based on search
  const filteredArtifacts = useMemo(() => {
    if (!artifactsData?.artifacts) return [];
    if (!searchQuery) return artifactsData.artifacts;

    const lowerQuery = searchQuery.toLowerCase();
    return artifactsData.artifacts.filter(art =>
      art.title.toLowerCase().includes(lowerQuery) ||
      art.content.toLowerCase().includes(lowerQuery)
    );
  }, [artifactsData?.artifacts, searchQuery]);

  // Group filtered artifacts by category
  const categorizedArtifacts = useMemo(() => {
    const grouped: Record<string, MindArtifact[]> = {};

    filteredArtifacts.forEach(artifact => {
      const category = categorizeArtifact(artifact);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(artifact);
    });

    // Sort artifacts within each category by title
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    });

    return grouped;
  }, [filteredArtifacts]);

  // Get sorted categories that have artifacts
  const sortedCategories = useMemo(() => {
    return CATEGORY_ORDER.filter(cat => categorizedArtifacts[cat]?.length > 0);
  }, [categorizedArtifacts]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Select first artifact on initial load (only in list mode if nothing selected)
  React.useEffect(() => {
    if (viewMode === 'list' && !selectedArtifact && sortedCategories.length > 0 && !searchQuery) {
      const firstCategory = sortedCategories[0];
      const firstArtifact = categorizedArtifacts[firstCategory]?.[0];
      if (firstArtifact) {
        setSelectedArtifact(firstArtifact);
        setExpandedCategories(prev => new Set([...prev, firstCategory]));
      }
    }
  }, [sortedCategories, categorizedArtifacts, selectedArtifact, viewMode, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!artifactsData || artifactsData.artifacts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Icon name="box" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Nenhum artefato disponível para esta mente.</p>
      </div>
    );
  }

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
      {sortedCategories.map(category => (
        <React.Fragment key={category}>
          <div className="col-span-full mt-4 mb-2 flex items-center gap-2 border-b border-white/5 pb-2">
            <Icon name={CATEGORY_ICONS[category]} className="text-brand-gold" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {CATEGORY_LABELS[category]}
            </span>
          </div>
          {categorizedArtifacts[category]?.map(artifact => {
            const typeInfo = getArtifactType(artifact.sourceFile);

            return (
              <Card
                key={artifact.id}
                className="group relative overflow-hidden border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-brand-gold/30 transition-all cursor-pointer flex flex-col h-[180px]"
                onClick={() => {
                  setSelectedArtifact(artifact);
                  setViewMode('list');
                }}
              >
                <CardHeader className="pb-2 flex-none">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-medium line-clamp-2 leading-relaxed flex-1">
                      {artifact.title}
                    </CardTitle>
                    <Badge variant="outline" className={cn("text-[10px] h-5 px-1.5 shrink-0 border-0", typeInfo.bg, typeInfo.color)}>
                      {typeInfo.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    {artifact.sourceFile && (
                      <span className="truncate max-w-[150px] opacity-70">
                        {artifact.sourceFile.split('/').pop()}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden relative">
                  <div className="text-xs text-muted-foreground/60 font-mono leading-relaxed h-full mask-linear-fade">
                    {artifact.content.slice(0, 300)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-900/90 to-transparent" />
                </CardContent>
              </Card>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 h-full min-h-[600px]">
      {/* Toolbox Header */}
      <div className="flex items-center justify-between gap-4 p-1 bg-muted/20 rounded-lg border border-white/5">
        <div className="relative flex-1 max-w-md">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Buscar nos arquivos neurais..."
            className="pl-9 h-9 bg-black/20 border-transparent focus:border-brand-gold/30 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-black/40 rounded-md p-1 border border-white/5">
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-7 px-2"
          >
            <Icon name="columns" size="size-3" className="mr-1.5" /> Split
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-7 px-2"
          >
            <Icon name="grid" size="size-3" className="mr-1.5" /> Grid
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <GridView />
      ) : (
        <div className="flex gap-6 h-[calc(100vh-350px)] min-h-[500px]">
          {/* Sidebar */}
          <Card className="w-80 shrink-0 rounded-xl border-border bg-card/50 flex flex-col">
            <CardHeader className="py-3 px-4 border-b border-border">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="folder" size="size-4" className="text-primary" />
                  Índice
                </span>
                <Badge variant="secondary" className="text-xs font-mono">
                  {filteredArtifacts.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {sortedCategories.length === 0 && (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Nenhum arquivo encontrado.
                  </div>
                )}
                {sortedCategories.map(category => (
                  <div key={category} className="mb-1">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors text-left group"
                    >
                      <Icon
                        name={expandedCategories.has(category) ? 'angle-down' : 'angle-right'}
                        size="size-3"
                        className="text-muted-foreground opacity-70"
                      />
                      <Icon
                        name={CATEGORY_ICONS[category] || 'folder'}
                        size="size-3"
                        className={cn(
                          "transition-colors",
                          expandedCategories.has(category) ? "text-brand-gold" : "text-muted-foreground group-hover:text-brand-gold/70"
                        )}
                      />
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground flex-1">
                        {CATEGORY_LABELS[category] || category}
                      </span>
                      <span className="text-[10px] text-muted-foreground/40 font-mono">
                        {categorizedArtifacts[category]?.length}
                      </span>
                    </button>

                    {/* Category Items */}
                    {expandedCategories.has(category) && (
                      <div className="ml-2 pl-2 border-l border-white/5 mt-0.5 space-y-0.5">
                        {categorizedArtifacts[category]?.map(artifact => {
                          const typeInfo = getArtifactType(artifact.sourceFile);
                          return (
                            <button
                              key={artifact.id}
                              onClick={() => setSelectedArtifact(artifact)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-md text-xs transition-all relative overflow-hidden group/item flex items-center gap-2",
                                selectedArtifact?.id === artifact.id
                                  ? "bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/15 font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                              )}
                            >
                              {selectedArtifact?.id === artifact.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-gold" />
                              )}

                              <span className="line-clamp-1 flex-1">{artifact.title}</span>

                              <Badge variant="outline" className={cn("text-[8px] h-4 px-1 leading-none border-0 shrink-0 opacity-50 grayscale group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all", typeInfo.bg, typeInfo.color)}>
                                {typeInfo.label}
                              </Badge>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Content Viewer */}
          <Card className="flex-1 rounded-xl border-border bg-[#0a0a0c] overflow-hidden flex flex-col">
            {selectedArtifact ? (
              <>
                <div className="py-3 px-5 border-b border-border/50 bg-black/20 flex items-start justify-between shrink-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                      <Icon name={CATEGORY_ICONS[categorizeArtifact(selectedArtifact)]} size="size-3" />
                      <span>{CATEGORY_LABELS[categorizeArtifact(selectedArtifact)]}</span>
                      {selectedArtifact.sourceFile && (
                        <>
                          <span className="opacity-30">|</span>
                          <span className={cn(getArtifactType(selectedArtifact.sourceFile).color)}>
                            {getArtifactType(selectedArtifact.sourceFile).label}
                          </span>
                          <span className="opacity-70 ml-1">{selectedArtifact.sourceFile.split('/').pop()}</span>
                        </>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold text-white/90">
                      {selectedArtifact.title}
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-xs hover:text-brand-gold hover:bg-brand-gold/10">
                      <Icon name="copy" size="size-3" className="mr-1.5" /> Copy
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <CardContent className="pt-6 pb-20 max-w-4xl mx-auto">
                    {isYamlContent(selectedArtifact.content || '', selectedArtifact.sourceFile) ? (
                      <YamlViewer content={selectedArtifact.content || ''} />
                    ) : (
                      <article
                        className="prose prose-invert prose-sm max-w-none
                          prose-headings:text-foreground prose-headings:font-semibold
                          prose-h1:text-2xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-2 prose-h1:mb-6 prose-h1:mt-2
                          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-brand-gold/90
                          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-white/80
                          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                          prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-white prose-strong:font-semibold
                          prose-code:text-brand-gold/90 prose-code:bg-brand-gold/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                          prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4
                          prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                          prose-li:marker:text-brand-gold/50
                          prose-blockquote:border-l-brand-gold/50 prose-blockquote:bg-brand-gold/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r prose-blockquote:text-muted-foreground prose-blockquote:italic
                          prose-hr:border-white/10"
                        dangerouslySetInnerHTML={{ __html: markdownToHtml(selectedArtifact.content || '') }}
                      />
                    )}
                  </CardContent>
                </ScrollArea>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <Icon name="fingerprint" size="size-8" className="opacity-30" />
                  </div>
                  <p className="text-sm font-medium text-white/50">Selecione um arquivo neural para decodificar</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};


export default ArtifactsTab;
