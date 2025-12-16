/**
 * Design System - Design Tokens
 *
 * Uso consistente em todo o módulo Design System:
 * - DesignSystemRouter (navegação)
 * - DesignSystemTopbar (header)
 * - Sections (conteúdo)
 */

// =============================================================================
// CORES PRIMÁRIAS
// =============================================================================

/** Dourado - Cor principal do Design System */
export const DS_PRIMARY = "#D4AF37";

/** Dourado escuro - Cor secundária para hover/borders */
export const DS_SECONDARY = "#B8962E";

/** Background escuro - Cor de fundo para ícones/badges */
export const DS_ACCENT = "#1a1a1f";

/** Fundo escuro - Background principal */
export const DS_BACKGROUND = "#0A0A0F";

// =============================================================================
// BACKGROUNDS
// =============================================================================

/** Fundo principal escuro */
export const DS_BG = "#0A0A0F";

/** Fundo de cards */
export const DS_CARD_BG = "#111116";

/** Gradiente para cards */
export const DS_CARD_GRADIENT = "from-[#1a1a1f] to-[#0f0f12]";

// =============================================================================
// CATEGORY STYLES
// =============================================================================

export const DS_CATEGORIES = {
  overview: {
    icon: "home",
    label: "Visão Geral",
  },
  identity: {
    icon: "fingerprint",
    label: "Identidade & Marca",
  },
  tokens: {
    icon: "cube",
    label: "Tokens",
  },
  components: {
    icon: "layout-fluid",
    label: "Biblioteca UI",
  },
  templates: {
    icon: "browser",
    label: "Templates & Páginas",
  },
  docs: {
    icon: "book-alt",
    label: "Documentação",
  },
} as const;

// =============================================================================
// LAYOUT CONSTANTS
// =============================================================================

/** Largura máxima padrão do conteúdo (igual ao topbar) */
export const DS_MAX_WIDTH = "1400px";

/** Padding padrão do conteúdo */
export const DS_CONTENT_PADDING = "p-6 md:px-12 md:py-8";

// =============================================================================
// HELPER CLASSES
// =============================================================================

/** Classes padrão para cards do Design System */
export const DS_CARD_CLASSES = "bg-[#111116] border-border/30 rounded-xl";

/** Classes padrão para botões primários */
export const DS_BUTTON_PRIMARY = "bg-[#D4AF37] hover:bg-[#B8962E] text-[#0A0A0F]";

/** Classes padrão para botões outline */
export const DS_BUTTON_OUTLINE = "border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10";

// =============================================================================
// MODULE THEME (for generic components)
// =============================================================================

export const DS_THEME = {
  primary: DS_PRIMARY,
  secondary: DS_SECONDARY,
  accent: DS_ACCENT,
  background: DS_BACKGROUND,
  name: "Design System",
  icon: "palette",
} as const;
