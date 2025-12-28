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
  const [searchTerm, setSearchTerm] = useState('');

  // Categorias de Ícones UI (Iconoir)
  const uiIconCategories: Record<string, string[]> = {
    Navegação: [
      'home',
      'menu-burger',
      'apps',
      'angle-small-left',
      'angle-small-right',
      'angle-small-down',
      'angle-small-up',
      'arrow-right',
      'arrow-left',
      'sign-out-alt',
      'expand',
      'compress',
      'enter',
      'exit',
      'chevron-right',
      'chevron-down',
      'chevron-up',
      'chevron-left',
      'angle-double-right',
      'angle-double-left',
    ],
    'Ações & Edição': [
      'search',
      'plus',
      'plus-circle',
      'minus',
      'minus-circle',
      'cross',
      'cross-circle',
      'check',
      'check-circle',
      'pencil',
      'edit',
      'trash',
      'copy',
      'duplicate',
      'save',
      'redo',
      'undo',
      'download',
      'upload',
      'refresh',
      'filter',
      'filter-alt',
      'sort-alt',
      'settings-sliders',
      'clip',
      'eraser',
      'lock',
      'unlock',
      'eye',
      'eye-crossed',
      'share',
      'link',
    ],
    'Comunicação & Mídia': [
      'envelope',
      'comment-alt',
      'bell',
      'megaphone',
      'microphone',
      'picture',
      'image',
      'play',
      'pause',
      'volume',
      'camera',
      'video-camera',
      'photo-video',
      'music',
      'headset',
      'paper-plane',
      'inbox',
      'tag',
      'tags',
    ],
    'Interface & Layout': [
      'layout-fluid',
      'grid',
      'list',
      'list-ul',
      'list-ol',
      'table',
      'browser',
      'layers',
      'cube',
      'box',
      'zoom-in',
      'zoom-out',
      'palette',
      'sidebar',
      'cursor',
      'cursor-finger',
    ],
    'Negócios & Analytics': [
      'chart-histogram',
      'chart-line',
      'chart-line-down',
      'chart-pie',
      'stats',
      'briefcase',
      'building',
      'coins',
      'dollar',
      'credit-card',
      'shopping-cart',
      'receipt',
      'rocket',
      'target',
      'presentation',
    ],
    Desenvolvimento: [
      'code-simple',
      'terminal',
      'bug',
      'database',
      'cloud',
      'disk',
      'laptop',
      'mobile',
      'network',
      'sitemap',
      'wifi',
      'cpu',
      'microchip-ai',
    ],
    'Usuários & Pessoas': [
      'user',
      'users',
      'users-alt',
      'user-add',
      'user-time',
      'id-badge',
      'address-book',
      'portrait',
      'following',
      'circle-user',
    ],
    'Conhecimento & Educação': [
      'graduation-cap',
      'book',
      'book-stack',
      'book-alt',
      'book-open-cover',
      'library',
      'award',
      'medal',
      'trophy',
      'brain',
      'brain-circuit',
    ],
    'Geral & Objetos': [
      'calendar',
      'clock',
      'sun',
      'moon',
      'folder',
      'document',
      'shield-check',
      'shield',
      'magic-wand',
      'star',
      'heart',
      'diamond',
      'crown',
      'key',
      'gift',
      'route',
      'map-marker',
      'info',
      'exclamation',
      'exclamation-triangle',
      'interrogation',
      'circle-question',
      'zap',
      'bolt',
      'bulb',
      'lightbulb',
      'pen-nib',
      'robot',
    ],
  };

  // Lista de Ícones Sociais (Atualizada)
  const socialIcons: SocialIconName[] = [
    'github',
    'linkedin',
    'twitter',
    'instagram',
    'youtube',
    'facebook',
    'tiktok',
    'whatsapp',
    'discord',
    'telegram',
    'twitch',
    'spotify',
    'apple',
    'google',
    'slack',
    'dribbble',
    'behance',
  ];

  // Lógica de Filtro
  const filteredCategories = Object.entries(uiIconCategories).reduce(
    (acc, [category, icons]) => {
      const matches = icons.filter((icon) => icon.toLowerCase().includes(searchTerm.toLowerCase()));
      if (matches.length > 0) {
        acc[category] = matches;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  const hasResults = Object.keys(filteredCategories).length > 0;

  return (
    <div className="animate-fade-in space-y-20">
      {/* Header */}
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Ícones & Símbolos</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          A linguagem visual da Academia Lendária é composta por três camadas de iconografia. Cada
          uma tem um propósito semântico específico para manter a consistência e a performance.
        </p>
      </div>

      {/* --- GUIA DE USO (WHEN TO USE) --- */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="apps" className="text-primary" /> Iconoir (Interface)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-serif text-sm text-muted-foreground">
            <p>Ícones funcionais para navegação, botões de ação e status do sistema.</p>
            <div className="flex gap-2 pt-2">
              <Badge variant="outline" className="text-[10px]">
                Menus
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Botões
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Inputs
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-foreground bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="share" className="text-foreground" /> Social Icons (Brands)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-serif text-sm text-muted-foreground">
            <p>
              Logotipos de marcas externas. Devem respeitar a geometria original da marca (SVGs).
            </p>
            <div className="flex gap-2 pt-2">
              <Badge variant="outline" className="text-[10px]">
                Login Social
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Footer
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Links
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-muted-foreground bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Symbol name="infinity" className="text-muted-foreground" /> Símbolos (Unicode)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-serif text-sm text-muted-foreground">
            <p>
              Glifos de texto para decoração inline, listas e separadores. Carregam com a fonte.
            </p>
            <div className="flex gap-2 pt-2">
              <Badge variant="outline" className="text-[10px]">
                Listas
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Metadados
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Texto
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* --- 1. ICONOIR LIBRARY --- */}
      <section className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
              <Icon name="cube" /> Biblioteca UI (Iconoir)
            </h3>
            <Badge variant="secondary">SVG Based</Badge>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
              size="size-4"
            />
            <Input
              placeholder="Pesquisar ícone..."
              className="h-10 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {hasResults ? (
          <div className="grid animate-fade-in gap-8">
            {Object.entries(filteredCategories).map(([category, icons]) => (
              <div key={category} className="space-y-3">
                <h4 className="pl-1 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  {category}
                </h4>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
                  {icons.map((name) => (
                    <div
                      key={name}
                      className="group flex cursor-pointer flex-col items-center gap-2"
                      title={name}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card transition-all duration-200 group-hover:border-primary group-hover:bg-primary/5">
                        <Icon
                          name={name}
                          size="size-5"
                          className="text-muted-foreground transition-colors group-hover:text-primary"
                        />
                      </div>
                      <span className="w-full truncate text-center font-mono text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border py-12 text-center">
            <Icon
              name="search"
              className="mx-auto mb-4 text-6xl text-muted-foreground opacity-20"
            />
            <p className="font-serif text-muted-foreground">
              Nenhum ícone encontrado para "{searchTerm}"
            </p>
            <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2">
              Limpar busca
            </Button>
          </div>
        )}
      </section>

      <Separator />

      {/* --- 2. SOCIAL ICONS --- */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
            <Icon name="share" /> Redes & Marcas (Simple Icons)
          </h3>
          <Badge variant="secondary">SVG Paths</Badge>
        </div>

        <p className="font-serif text-muted-foreground">
          Ícones SVG vetoriais otimizados. Utilize o componente{' '}
          <code>{'<SocialIcon name="..." />'}</code>.
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {socialIcons.map((name) => (
            <Card
              key={name}
              className="group flex cursor-pointer flex-col items-center justify-center gap-4 p-6 transition-colors hover:border-foreground/50"
            >
              <SocialIcon
                name={name}
                size={28}
                className="text-muted-foreground transition-colors group-hover:text-foreground"
              />
              <span className="text-xs font-semibold capitalize">{name}</span>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* --- 3. UNICODE SYMBOLS --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Symbol name="infinity" /> Símbolos Tipográficos
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col items-center justify-center gap-4 border-dashed bg-muted/10 p-8">
            <Symbol name="infinity" className="text-5xl text-primary" />
            <div className="text-center">
              <span className="block font-mono text-sm font-bold">Brand Mark</span>
              <span className="text-xs text-muted-foreground">Logotipo, Conceito</span>
            </div>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-4 border-dashed bg-muted/10 p-8">
            <Symbol name="star" className="text-5xl text-foreground" />
            <div className="text-center">
              <span className="block font-mono text-sm font-bold">Star</span>
              <span className="text-xs text-muted-foreground">Destaque, Novo, Premium</span>
            </div>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-4 border-dashed bg-muted/10 p-8">
            <Symbol name="diamond" className="text-5xl text-foreground" />
            <div className="text-center">
              <span className="block font-mono text-sm font-bold">Diamond</span>
              <span className="text-xs text-muted-foreground">Listas, Tópicos</span>
            </div>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-4 border-dashed bg-muted/10 p-8">
            <Symbol name="bullet" className="text-5xl text-muted-foreground" />
            <div className="text-center">
              <span className="block font-mono text-sm font-bold">Bullet</span>
              <span className="text-xs text-muted-foreground">Separador Inline</span>
            </div>
          </Card>
        </div>
      </section>

      <Separator />

      {/* --- 4. REGRAS DE USO (DO'S & DON'TS) --- */}
      <section className="space-y-8">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Icon name="check-circle" /> Regras de Uso
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* DO'S */}
          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-green">
                <Icon name="check" /> O que fazer (Do)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-brand-green/20 bg-background p-3">
                <div className="flex gap-2">
                  <Icon name="home" />
                  <Icon name="user" />
                  <Icon name="settings" />
                </div>
                <div className="text-sm">
                  <span className="block font-bold text-brand-green">Consistência de Estilo</span>
                  <span className="text-xs text-muted-foreground">
                    Use sempre o estilo "Regular Rounded".
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-brand-green/20 bg-background p-3">
                <Button size="sm" className="gap-2">
                  <Icon name="download" size="size-3" /> Download
                </Button>
                <div className="text-sm">
                  <span className="block font-bold text-brand-green">Alinhamento Óptico</span>
                  <span className="text-xs text-muted-foreground">
                    Ícones centralizados verticalmente com o texto.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-brand-green/20 bg-background p-3">
                <Icon
                  name="trash"
                  className="cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
                />
                <div className="text-sm">
                  <span className="block font-bold text-brand-green">Feedback de Estado</span>
                  <span className="text-xs text-muted-foreground">
                    Mude a cor no hover para indicar interatividade.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DON'TS */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Icon name="cross" /> O que não fazer (Don't)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-destructive/20 bg-background p-3">
                <div className="flex items-end gap-2">
                  <Icon name="home" size="size-4" />
                  <Icon name="user" size="size-6" />
                  <Icon name="settings" size="size-8" />
                </div>
                <div className="text-sm">
                  <span className="block font-bold text-destructive">Tamanhos Inconsistentes</span>
                  <span className="text-xs text-muted-foreground">
                    Evite misturar escalas sem propósito hierárquico.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-destructive/20 bg-background p-3">
                <div className="flex gap-2">
                  <Icon name="home" /> {/* Regular */}
                  <Icon name="user" /> {/* Iconoir doesn't have "solid" attribute in our component yet */}
                </div>
                <div className="text-sm">
                  <span className="block font-bold text-destructive">Mistura de Famílias</span>
                  <span className="text-xs text-muted-foreground">
                    Não misture ícones de diferentes bibliotecas na mesma seção.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-destructive/20 bg-background p-3">
                <div className="flex gap-2 text-primary/30">
                  <Icon name="check" />
                </div>
                <div className="text-sm">
                  <span className="block font-bold text-destructive">Baixo Contraste</span>
                  <span className="text-xs text-muted-foreground">
                    Ícones funcionais devem ter contraste suficiente para leitura.
                  </span>
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
