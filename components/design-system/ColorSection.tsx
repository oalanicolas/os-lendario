
import React, { useState } from 'react';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { THEMES, ThemeName } from '../../lib/theme';
import { cn } from '../../lib/utils';

interface Palette {
  name: string;
  main: string;
  dark: string;
  complements: string[];
  complementsDark?: string[];
  usageNote: string;
}

// Helper function to calculate color formats
const getColorFormats = (hex: string) => {
  // Remove hash
  const cleanHex = hex.replace('#', '');
  
  // Parse RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  // Calculate CMYK
  let c = 0, m = 0, y = 0, k = 0;
  
  // Normalize to [0, 1]
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  
  k = 1 - Math.max(rN, gN, bN);
  
  if (k < 1) {
    c = (1 - rN - k) / (1 - k);
    m = (1 - gN - k) / (1 - k);
    y = (1 - bN - k) / (1 - k);
  } else {
    c = 0; m = 0; y = 0; // Black
  }

  return {
    hex: `#${cleanHex.toUpperCase()}`,
    rgb: `${r}, ${g}, ${b}`,
    cmyk: `${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)}`
  };
}

// Helper to calculate brightness for sorting (0 to 255)
const getBrightness = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Reusable Component for Rendering a Palette Card
const PaletteCard: React.FC<{ palette: Palette; isDark: boolean }> = ({ palette, isDark }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

    // Color to display in the main swatch
    const mainColor = isDark ? palette.dark : palette.main;

    // Determine complements based on mode if available
    const rawComplements = (isDark && palette.complementsDark) ? palette.complementsDark : palette.complements;

    // Sort complements: Lightest to Darkest (High Brightness -> Low Brightness)
    const sortedComplements = [...rawComplements].sort((a, b) => getBrightness(b) - getBrightness(a));

    const handleCopy = (text: string, format: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling selection
        navigator.clipboard.writeText(text);
        setCopiedFormat(format);
        setTimeout(() => setCopiedFormat(null), 1500);
    };

    return (
    <div className="flex flex-col md:flex-row gap-0 border border-border rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
        
        {/* Left: Main Swatch Area */}
        <div className="w-full md:w-1/3 shrink-0 flex flex-col">
             <div 
                className="flex-1 min-h-[200px] p-8 flex flex-col justify-between text-white relative group rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden transition-all duration-300"
                style={{ backgroundColor: mainColor }}
            >
                <div className="relative z-10">
                    <h4 className="text-2xl font-bold font-sans drop-shadow-md">{palette.name}</h4>
                    <span className="opacity-90 font-mono text-xs uppercase tracking-widest drop-shadow-sm">
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                </div>
                
                <div className="relative z-20 flex items-end justify-between">
                    <span 
                        onClick={(e) => handleCopy(mainColor, 'main', e)}
                        className="font-mono text-xl font-bold tracking-wider drop-shadow-md cursor-pointer hover:underline decoration-white/50 underline-offset-4"
                        title="Clique para copiar"
                    >
                        {mainColor}
                    </span>
                    <button 
                        onClick={(e) => handleCopy(mainColor, 'main', e)}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer drop-shadow-md hover:scale-110 active:scale-95 bg-white/20 hover:bg-white/30 p-2 rounded-md backdrop-blur-sm"
                        title="Copiar código da cor"
                    >
                        {copiedFormat === 'main' ? (
                            <Icon name="check" size="size-5" className="text-white" />
                        ) : (
                            <Icon name="copy" size="size-5" className="text-white" />
                        )}
                    </button>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/10 pointer-events-none z-0"></div>
            </div>
        </div>

        {/* Right: Info & Complements */}
        <div className="flex-1 flex flex-col rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
            
            {/* Top: Usage Note */}
            <div className="p-8 flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs font-bold text-muted-foreground border-foreground/20">
                        <Icon name="info" size="size-3" className="mr-1" /> Nota de Uso
                    </Badge>
                </div>
                <p className="font-serif text-muted-foreground leading-relaxed text-sm">
                    {palette.usageNote}
                </p>
            </div>

            {/* Bottom: Separator & Complements */}
            <div className="border-t border-border bg-muted/10 p-6 rounded-b-2xl md:rounded-br-2xl md:rounded-bl-none">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Icon name="palette" size="size-3" /> Paleta Complementar
                    </h5>
                    <span className="text-[10px] text-muted-foreground font-mono opacity-50">
                        {selectedIndex !== null ? 'Selecione um formato para copiar' : 'Clique para ver códigos'}
                    </span>
                </div>
                
                {/* Complementary Colors Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 h-auto">
                    {sortedComplements.map((hex, i) => {
                        const formats = getColorFormats(hex);
                        const isSelected = selectedIndex === i;

                        return (
                            <div key={i} className="relative w-full aspect-square">
                                <div 
                                    onClick={() => setSelectedIndex(isSelected ? null : i)}
                                    className={cn(
                                        "h-full w-full rounded-md cursor-pointer border shadow-sm transition-all duration-200",
                                        isSelected 
                                            ? "border-primary ring-2 ring-primary ring-offset-2 scale-110 z-10" 
                                            : "border-transparent hover:scale-105 hover:shadow-md"
                                    )}
                                    style={{ backgroundColor: hex }}
                                ></div>
                                
                                {/* Detailed Tooltip (Rendered only if selected or hovered) */}
                                <div className={cn(
                                    "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-popover text-popover-foreground rounded-xl shadow-xl border border-border transition-all duration-200 z-50 overflow-hidden",
                                    isSelected 
                                        ? "opacity-100 pointer-events-auto scale-100 translate-y-0" 
                                        : "opacity-0 pointer-events-none scale-95 translate-y-2 group-hover:opacity-100"
                                )}>
                                    {/* Tooltip Header */}
                                    <div className="h-2 w-full" style={{ backgroundColor: hex }}></div>
                                    
                                    <div className="p-3 space-y-1">
                                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-border/50">
                                            <span className="text-xs font-bold font-sans">Copiar Código</span>
                                            {isSelected && (
                                                <button onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }} className="text-muted-foreground hover:text-foreground">
                                                    <Icon name="cross" size="size-3" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Copyable Rows */}
                                        {[
                                            { label: 'HEX', val: formats.hex },
                                            { label: 'RGB', val: formats.rgb },
                                            { label: 'CMYK', val: formats.cmyk }
                                        ].map((fmt) => (
                                            <button 
                                                key={fmt.label}
                                                onClick={(e) => handleCopy(fmt.val, `${fmt.label}-${i}`, e)}
                                                className="w-full flex justify-between items-center text-[10px] font-mono p-1.5 rounded hover:bg-muted transition-colors group/row text-left"
                                            >
                                                <span className="opacity-60 font-sans font-semibold">{fmt.label}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{fmt.val}</span>
                                                    {copiedFormat === `${fmt.label}-${i}` ? (
                                                        <Icon name="check" size="size-3" className="text-green-500" />
                                                    ) : (
                                                        <Icon name="copy" size="size-3" className="opacity-0 group-hover/row:opacity-100 text-primary transition-opacity" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {/* Arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-popover"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  );
};

const ColorSection: React.FC<{ isDark: boolean; currentTheme: ThemeName }> = ({ isDark, currentTheme }) => {

  const grayscale = [
    "#FFFFFF", "#F8F8F8", "#E8E8E8", "#D8D8D8", "#C8C8C8", 
    "#B8B8B8", "#A8A8A8", "#969696", "#888888", "#808080", 
    "#727272", "#646464", "#565656", "#484848", "#404040", 
    "#323232", "#242424", "#161616", "#000000"
  ];

  // System Colors (Static)
  const systemPalettes: Palette[] = [
    {
      name: "Red (Critical)",
      main: "#FF3B30",
      dark: "#FF453A",
      complements: ["#FF6650", "#FF8871", "#FFA793", "#FFC5B6", "#FFE2DA", "#D13529", "#A42E23", "#7A261C", "#511D16", "#2C140D"],
      usageNote: "Reservada para estados críticos — erros de validação, alertas destrutivos, ações irreversíveis. Usar com moderação."
    },
    {
      name: "Orange (Warning)",
      main: "#FF9500",
      dark: "#FF9F0A",
      complements: ["#FFA641", "#FFB869", "#FFC98E", "#FFDBB4", "#FFEDD9", "#D07B0D", "#A46112", "#794913", "#513211", "#2C1C0C"],
      usageNote: "Cor de atenção moderada — avisos não-críticos, lembretes de prazo, status \"pendente\"."
    },
    {
      name: "Yellow (Attention)",
      main: "#FFCC00",
      dark: "#FED60A",
      complements: [
        "#FFF6DC", "#FFEDB9", "#FFE596", "#FFDC72", "#FFD44A", 
        "#D0A711", "#A38317", "#796117", "#504015", "#2B230F"
      ],
      complementsDark: [
        "#FFF8DD", "#FFF1BB", "#FFEA98", "#FFE375", "#FFDC4D", 
        "#CFAF16", "#A38919", "#786519", "#504316", "#2B240F"
      ],
      usageNote: "Usado para avisos de baixa prioridade, estados de revisão e destaques que exigem atenção."
    },
    {
      name: "Green (Success)",
      main: "#34C759",
      dark: "#30D158",
      complements: ["#64D175", "#88DB90", "#A8E5AB", "#C5EEC7", "#E3F7E3", "#30A34B", "#2B803D", "#255F2F", "#1D4022", "#142315"],
      usageNote: "Exclusiva para feedback positivo — confirmações, status \"ativo\", métricas de crescimento."
    },
    {
      name: "Blue (Info/Links)",
      main: "#007AFF",
      dark: "#0A84FF",
      complements: ["#608EFF", "#89A3FF", "#ABB9FF", "#C9D0FF", "#E4E7FF", "#1B65D0", "#2150A2", "#213C77", "#1C2A4F", "#141829"],
      usageNote: "Cor universal e segura. Usada para links, informações neutras, elementos de ajuda e visualização de dados."
    },
  ];

  // Niche Colors Registry (Static Data for Reference)
  const nicheRegistry: Record<string, Palette> = {
    Gold: {
        name: "Dourado (Padrão)",
        main: "#C9B298",
        dark: "#C9B298",
        complements: ["#F2EBE4", "#E4D8CA", "#D7C5B1", "#C9B298", "#BAA080", "#AC8E68", "#8D7556", "#6F5D45", "#534635", "#383025"],
        usageNote: "Elegância e Sofisticação. A cor original da marca."
    },
    Mint: {
      name: "Menta",
      main: "#00C7BE",
      dark: "#63E6E2",
      complements: ["#58D1C9", "#82DAD3", "#A4E4DE", "#C4EDE9", "#E2F6F4", "#18A39B", "#1E807A", "#28605D", "#1A403D", "#132321"],
      usageNote: "Bem-estar, frescor e saúde. Transmite leveza."
    },
    Teal: {
      name: "Turquesa",
      main: "#30B0C7",
      dark: "#40C8E0",
      complements: ["#62BDD0", "#87CAD9", "#A7D7E3", "#C5E5EC", "#E2F6F4", "#2E90A3", "#2A7280", "#24555F", "#1D393F", "#142022"],
      usageNote: "Tom corporativo e profissional. Ideal para features B2B."
    },
    Cyan: {
      name: "Ciano",
      main: "#32ADE6",
      dark: "#64D2FF",
      complements: ["#67BAEA", "#8CC8EF", "#ABD5F3", "#C8E3F7", "#E4F1FB", "#308EBC", "#2C7093", "#26536C", "#1E3848", "#141F26"],
      usageNote: "Tecnologia, IA e inovação. Badges \"Gerado por IA\"."
    },
    Indigo: {
      name: "Índigo",
      main: "#5856D6",
      dark: "#5E5CE6",
      complements: ["#7B70DE", "#988BE5", "#B4A7EC", "#CEC4F3", "#E7E1F9", "#4B48AF", "#3E3A89", "#312D65", "#242044", "#171424"],
      usageNote: "Premium, exclusividade e criatividade."
    },
    Pink: {
      name: "Vermelho (Pink)",
      main: "#FF2D55",
      dark: "#FF375F",
      complements: ["#FF5F6F", "#FF848A", "#FFA4A6", "#FFC3C3", "#FFE1E0", "#D12B47", "#A42839", "#79222C", "#511B20", "#2C1313"],
      usageNote: "Alta energia. Trending, likes e social."
    },
    Brown: {
      name: "Marrom",
      main: "#A2845E",
      dark: "#AC8E68",
      complements: ["#B29777", "#C2AB91", "#D2C0AC", "#E1D4C7", "#F0E9E3", "#856D4E", "#69563F", "#4F4130", "#362D22", "#1E1A15"],
      usageNote: "Tradição e luxo discreto."
    }
  };

  // Determine Active Palette dynamically
  const activePalette = nicheRegistry[currentTheme] || nicheRegistry['Gold'];

  // Other niche palettes to show in the list (excluding the active one)
  const otherNichePalettes = Object.entries(nicheRegistry)
    .filter(([key]) => key !== currentTheme)
    .map(([, palette]) => palette);

  return (
    <div className="space-y-24 animate-fade-in pb-20">
      
      {/* Intro */}
      <section>
        <div className="mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight">Cores Lendárias.</h2>
            <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Simples. Preciso. Funcional. A cor aparece apenas onde faz sentido, guiando a experiência sem comprometer a estética minimalista.
            </p>
        </div>

        {/* 8% Rule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-8 border border-border rounded-2xl bg-card">
            <div className="flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full bg-secondary flex items-center justify-center border-4 border-muted">
                    <div className="absolute inset-0 rounded-full border-4 border-primary" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 30%, 50% 50%)', transform: 'rotate(-45deg)' }}></div>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold text-primary font-sans">8%</span>
                    </div>
                    <div className="absolute right-0 top-1/2 w-16 h-px bg-foreground -mr-16 translate-x-4 md:block hidden"></div>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold font-sans">A Regra dos 8%</h3>
                <p className="text-muted-foreground font-serif leading-relaxed">
                    <strong className="text-foreground">Nada em excesso. Nada sem motivo.</strong><br/>
                    8% é o máximo que a cor pode ocupar em uma Tela, Arte ou Aplicação. O restante deve ser respirado pelo background e tipografia.
                </p>
            </div>
        </div>
      </section>

      {/* Grayscale */}
      <section className="space-y-6">
        <h3 className="text-2xl font-sans font-bold flex items-center gap-2">
            <Icon name="palette" /> Escala Monocromática
        </h3>
        <p className="text-muted-foreground font-serif">Do branco ao preto, cada tom de cinza é calculado em múltiplos de 8.</p>
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex min-w-max gap-2">
                {grayscale.map((hex, index) => (
                    <div key={index} className="flex flex-col items-center group">
                         <div 
                            className="w-12 h-24 rounded-md border border-border relative transition-transform hover:z-10 hover:scale-110 hover:shadow-lg cursor-pointer"
                            style={{ backgroundColor: hex }}
                            title={hex}
                         />
                         <span className="text-[10px] font-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground uppercase">{hex}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* SECTION 1: ACTIVE PRIMARY COLOR */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
            <h3 className="text-3xl font-sans font-bold flex items-center gap-3">
                <Icon name="crown" className="text-primary" /> Cor Primária Ativa
            </h3>
            <Badge variant="outline" className="text-primary border-primary">Tema: {THEMES[currentTheme].label}</Badge>
        </div>
        <div className="grid grid-cols-1">
            <PaletteCard palette={activePalette} isDark={isDark} />
        </div>
      </section>

      {/* SECTION 2: SYSTEM COLORS */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
            <h3 className="text-2xl font-sans font-bold flex items-center gap-3">
                <Icon name="traffic-light" /> Cores do Sistema
            </h3>
            <span className="text-sm font-serif text-muted-foreground">Alertas, Avisos, Sucesso & Informação</span>
        </div>
        <div className="grid grid-cols-1 gap-8">
            {systemPalettes.map((palette) => (
                <PaletteCard key={palette.name} palette={palette} isDark={isDark} />
            ))}
        </div>
      </section>

      {/* SECTION 3: OTHER NICHE COLORS */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
             <h3 className="text-2xl font-sans font-bold flex items-center gap-3">
                <Icon name="apps" /> Outras Opções de Tema
            </h3>
            <span className="text-sm font-serif text-muted-foreground">Disponíveis no Seletor de Cores</span>
        </div>
        <div className="grid grid-cols-1 gap-8">
            {otherNichePalettes.map((palette) => (
                <PaletteCard key={palette.name} palette={palette} isDark={isDark} />
            ))}
        </div>
      </section>

      {/* --- GUIDELINES (DO'S & DON'TS) --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="text-2xl font-sans font-semibold flex items-center gap-2">
            <Icon name="check-circle" /> Diretrizes de Cores
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-brand-green/20 bg-brand-green/5">
                <CardHeader>
                    <CardTitle className="text-brand-green flex items-center gap-2">
                        <Icon name="check" /> O que fazer (Do)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-foreground">Regra dos 8%</span>
                        <p className="text-xs text-muted-foreground">Aplique a cor primária apenas em botões principais e elementos de destaque máximo.</p>
                    </div>
                    {/* ... other rules ... */}
                </CardContent>
            </Card>
            
            <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2">
                        <Icon name="cross" /> O que não fazer (Don't)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-destructive">Cores Vibrantes em Texto</span>
                        <p className="text-xs text-muted-foreground">Evite usar cores neon para texto corrido em fundo branco.</p>
                    </div>
                    {/* ... other rules ... */}
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="border-t border-border pt-8 mt-12">
        <div className="bg-card p-8 rounded-xl border border-dashed border-border flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <Icon name="exclamation" size="size-6" />
            </div>
            <div>
                <h4 className="text-lg font-bold font-sans mb-2">Atenção sobre Complementares</h4>
                <p className="font-serif text-muted-foreground leading-relaxed">
                    As cores complementares (shades) devem ser usadas estritamente para estados de interação (hover, active, focus). Elas <strong>nunca</strong> devem dominar a hierarquia visual.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ColorSection;
