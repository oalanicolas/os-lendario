
import React, { useState } from 'react';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { SocialIcon, SocialIconName } from '../ui/social-icon';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const IconSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Categorias de Ícones UI (Flaticon)
  // Correções aplicadas: chart-line -> stats, server -> disk
  const uiIconCategories: Record<string, string[]> = {
    "Navegação": [
      "home", "menu-burger", "apps", "angle-small-left", "angle-small-right", 
      "angle-small-down", "angle-small-up", "arrow-right", "arrow-left", 
      "sign-out-alt", "expand", "compress", "arrow-small-up", "arrow-small-down",
      "angle-double-right", "angle-double-left"
    ],
    "Ações & Edição": [
      "search", "plus", "minus", "cross", "check", "pencil", 
      "trash", "copy", "share", "download", "upload", "refresh",
      "filter", "sort-alt", "settings-sliders", "clip", "duplicate",
      "edit", "eraser", "lock", "unlock", "eye", "eye-crossed"
    ],
    "Comunicação & Mídia": [
      "envelope", "comment-alt", "bell", "megaphone", "microphone", 
      "picture", "play", "pause", "volume", "camera", "video-camera",
      "music", "headset", "paper-plane"
    ],
    "Interface & Layout": [
      "layout-fluid", "grid", "list", "table", "browser", 
      "layers", "cube", "box", "zoom-in", "zoom-out", "palette",
      "sidebar", "cursor", "cursor-finger"
    ],
    "Negócios & Analytics": [
      "chart-histogram", "chart-pie", "stats", "briefcase", "building",
      "coins", "credit-card", "dollar", "shopping-cart", "receipt",
      "rocket", "target", "presentation"
    ],
    "Desenvolvimento": [
      "code-simple", "terminal", "bug", "file-code", "database",
      "cloud", "disk", "laptop", "mobile", "network", "wifi"
    ],
    "Usuários & Pessoas": [
      "user", "users-alt", "user-add", "user-time", "id-badge",
      "address-book", "portrait", "following"
    ],
    "Geral & Objetos": [
      "calendar", "clock", "folder", "document", "shield-check", 
      "magic-wand", "star", "heart", "diamond", "crown", "key",
      "gift", "map-marker", "info", "exclamation", "interrogation"
    ]
  };

  // Lista de Ícones Sociais (Atualizada)
  const socialIcons: SocialIconName[] = [
    'github', 'linkedin', 'twitter', 'instagram', 
    'youtube', 'facebook', 'tiktok', 'whatsapp',
    'discord', 'telegram', 'twitch', 'spotify',
    'apple', 'google', 'slack', 'dribbble', 'behance'
  ];

  // Lógica de Filtro
  const filteredCategories = Object.entries(uiIconCategories).reduce((acc, [category, icons]) => {
      const matches = icons.filter(icon => 
          icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matches.length > 0) {
          acc[category] = matches;
      }
      return acc;
  }, {} as Record<string, string[]>);

  const hasResults = Object.keys(filteredCategories).length > 0;

  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Ícones & Símbolos</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           A linguagem visual da Academia Lendária é composta por três camadas de iconografia. Cada uma tem um propósito semântico específico para manter a consistência e a performance.
        </p>
      </div>

      {/* --- GUIA DE USO (WHEN TO USE) --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="apps" className="text-primary" /> UIcons (Interface)
                  </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground font-serif space-y-2">
                  <p>Ícones funcionais para navegação, botões de ação e status do sistema.</p>
                  <div className="flex gap-2 pt-2">
                      <Badge variant="outline" className="text-[10px]">Menus</Badge>
                      <Badge variant="outline" className="text-[10px]">Botões</Badge>
                      <Badge variant="outline" className="text-[10px]">Inputs</Badge>
                  </div>
              </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-l-foreground">
              <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="share" className="text-foreground" /> Social Icons (Brands)
                  </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground font-serif space-y-2">
                  <p>Logotipos de marcas externas. Devem respeitar a geometria original da marca (SVGs).</p>
                  <div className="flex gap-2 pt-2">
                      <Badge variant="outline" className="text-[10px]">Login Social</Badge>
                      <Badge variant="outline" className="text-[10px]">Footer</Badge>
                      <Badge variant="outline" className="text-[10px]">Links</Badge>
                  </div>
              </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-l-muted-foreground">
              <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                      <Symbol name="infinity" className="text-muted-foreground" /> Símbolos (Unicode)
                  </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground font-serif space-y-2">
                  <p>Glifos de texto para decoração inline, listas e separadores. Carregam com a fonte.</p>
                  <div className="flex gap-2 pt-2">
                      <Badge variant="outline" className="text-[10px]">Listas</Badge>
                      <Badge variant="outline" className="text-[10px]">Metadados</Badge>
                      <Badge variant="outline" className="text-[10px]">Texto</Badge>
                  </div>
              </CardContent>
          </Card>
      </section>

      <Separator />

      {/* --- 1. UICONS LIBRARY --- */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
                    <Icon name="cube" /> Biblioteca UI (Flaticon)
                </h3>
                <Badge variant="secondary">fi-rr-*</Badge>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full md:w-64">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size="size-4" />
                <Input 
                    placeholder="Pesquisar ícone..." 
                    className="pl-10 h-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {hasResults ? (
            <div className="grid gap-8 animate-fade-in">
                {Object.entries(filteredCategories).map(([category, icons]) => (
                    <div key={category} className="space-y-3">
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-1">{category}</h4>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                            {icons.map((name) => (
                                <div key={name} className="flex flex-col items-center gap-2 group cursor-pointer" title={name}>
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-card border border-border group-hover:border-primary group-hover:bg-primary/5 transition-all duration-200">
                                        <Icon name={name} size="size-5" className="text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-mono text-muted-foreground truncate w-full text-center opacity-60 group-hover:opacity-100">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-xl">
                <Icon name="search" className="text-muted-foreground opacity-20 text-6xl mx-auto mb-4" />
                <p className="text-muted-foreground font-serif">Nenhum ícone encontrado para "{searchTerm}"</p>
                <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2">Limpar busca</Button>
            </div>
        )}
      </section>

      <Separator />

      {/* --- 2. SOCIAL ICONS --- */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
                <Icon name="share" /> Redes & Marcas (Simple Icons)
            </h3>
            <Badge variant="secondary">SVG Paths</Badge>
        </div>
        
        <p className="font-serif text-muted-foreground">
            Ícones SVG vetoriais otimizados. Utilize o componente <code>{'<SocialIcon name="..." />'}</code>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {socialIcons.map((name) => (
                <Card key={name} className="flex flex-col items-center justify-center p-6 gap-4 hover:border-foreground/50 transition-colors cursor-pointer group">
                    <SocialIcon name={name} size={28} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs font-semibold capitalize">{name}</span>
                </Card>
            ))}
        </div>
      </section>

      <Separator />

      {/* --- 3. UNICODE SYMBOLS --- */}
      <section className="space-y-8">
        <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
            <Symbol name="infinity" /> Símbolos Tipográficos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col items-center justify-center p-8 gap-4 bg-muted/10 border-dashed">
                 <Symbol name="infinity" className="text-5xl text-primary" />
                 <div className="text-center">
                    <span className="font-mono text-sm font-bold block">Brand Mark</span>
                    <span className="text-xs text-muted-foreground">Logotipo, Conceito</span>
                 </div>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 gap-4 bg-muted/10 border-dashed">
                 <Symbol name="star" className="text-5xl text-foreground" />
                 <div className="text-center">
                    <span className="font-mono text-sm font-bold block">Star</span>
                    <span className="text-xs text-muted-foreground">Destaque, Novo, Premium</span>
                 </div>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 gap-4 bg-muted/10 border-dashed">
                 <Symbol name="diamond" className="text-5xl text-foreground" />
                 <div className="text-center">
                    <span className="font-mono text-sm font-bold block">Diamond</span>
                    <span className="text-xs text-muted-foreground">Listas, Tópicos</span>
                 </div>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 gap-4 bg-muted/10 border-dashed">
                 <Symbol name="bullet" className="text-5xl text-muted-foreground" />
                 <div className="text-center">
                    <span className="font-mono text-sm font-bold block">Bullet</span>
                    <span className="text-xs text-muted-foreground">Separador Inline</span>
                 </div>
            </Card>
        </div>
      </section>

      <Separator />

      {/* --- 4. REGRAS DE USO (DO'S & DON'TS) --- */}
      <section className="space-y-8">
        <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
            <Icon name="check-circle" /> Regras de Uso
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* DO'S */}
            <Card className="border-brand-green/20 bg-brand-green/5">
                <CardHeader>
                    <CardTitle className="text-brand-green flex items-center gap-2">
                        <Icon name="check" /> O que fazer (Do)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-brand-green/20">
                        <div className="flex gap-2">
                            <Icon name="home" />
                            <Icon name="user" />
                            <Icon name="settings" />
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-brand-green block">Consistência de Estilo</span>
                            <span className="text-muted-foreground text-xs">Use sempre o estilo "Regular Rounded".</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-brand-green/20">
                        <Button size="sm" className="gap-2">
                            <Icon name="download" size="size-3" /> Download
                        </Button>
                        <div className="text-sm">
                            <span className="font-bold text-brand-green block">Alinhamento Óptico</span>
                            <span className="text-muted-foreground text-xs">Ícones centralizados verticalmente com o texto.</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-brand-green/20">
                        <Icon name="trash" className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer" />
                        <div className="text-sm">
                            <span className="font-bold text-brand-green block">Feedback de Estado</span>
                            <span className="text-muted-foreground text-xs">Mude a cor no hover para indicar interatividade.</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* DON'TS */}
            <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2">
                        <Icon name="cross" /> O que não fazer (Don't)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-destructive/20">
                        <div className="flex gap-2 items-end">
                            <Icon name="home" size="size-4" />
                            <Icon name="user" size="size-6" />
                            <Icon name="settings" size="size-8" />
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-destructive block">Tamanhos Inconsistentes</span>
                            <span className="text-muted-foreground text-xs">Evite misturar escalas sem propósito hierárquico.</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-destructive/20">
                        <div className="flex gap-2">
                            <Icon name="home" /> {/* Regular */}
                            <Icon name="user" type="solid" /> {/* Solid */}
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-destructive block">Mistura de Famílias</span>
                            <span className="text-muted-foreground text-xs">Não misture ícones Outline com Solid na mesma seção.</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-destructive/20">
                        <div className="flex gap-2 text-primary/30">
                            <Icon name="check" />
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-destructive block">Baixo Contraste</span>
                            <span className="text-muted-foreground text-xs">Ícones funcionais devem ter contraste suficiente para leitura.</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
      </section>

    </div>
  );
};

export default IconSection;
