/**
 * Course Creator Studio - Design Tokens
 *
 * Uso consistente em todo o módulo Creator:
 * - CoursesTemplate (lista de cursos)
 * - CourseOverview (dashboard do curso)
 * - CourseCurriculum (editor de currículo)
 * - CourseLesson (editor de aula)
 */

// =============================================================================
// CORES PRIMÁRIAS
// =============================================================================

/** Azul Petróleo - Cor principal do Studio */
export const STUDIO_PRIMARY = "#538096";

/** Dourado - Cor de acento para destaques e CTAs premium */
export const STUDIO_GOLD = "#C9B298";

/** Creme/Bege - Cor secundária clara */
export const STUDIO_ACCENT = "#F2EBE4";

// =============================================================================
// BACKGROUNDS
// =============================================================================

/** Fundo principal escuro */
export const STUDIO_BG = "#0A0A0F";

/** Fundo de cards */
export const STUDIO_CARD_BG = "#111116";

/** Gradiente para KPI cards */
export const STUDIO_CARD_GRADIENT = "from-[#1a2e35] to-[#0f1a1d]";

/** Gradiente para cards com destaque gold */
export const STUDIO_GOLD_GRADIENT = "from-[#2a2520] to-[#1a1815]";

// =============================================================================
// STATUS COLORS
// =============================================================================

export const STUDIO_STATUS = {
  /** Verde - Completo/Publicado */
  complete: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  /** Azul - Em progresso/Produzindo */
  progress: {
    bg: "bg-[#538096]/20",
    text: "text-[#538096]",
    border: "border-[#538096]/30",
    dot: "bg-[#538096]",
  },
  /** Amarelo - Atenção/Validação */
  warning: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-500",
  },
  /** Cinza - Rascunho/Pendente */
  draft: {
    bg: "bg-muted/30",
    text: "text-muted-foreground",
    border: "border-border/50",
    dot: "bg-muted-foreground",
  },
} as const;

// =============================================================================
// PIPELINE STAGES
// =============================================================================

export const PIPELINE_STAGES = [
  { key: "briefing", label: "Briefing", icon: "document" },
  { key: "pesquisa", label: "Pesquisa", icon: "search" },
  { key: "curriculo", label: "Currículo", icon: "list" },
  { key: "geracao", label: "Geração", icon: "magic-wand" },
  { key: "validacao", label: "Validação", icon: "check-circle" },
  { key: "producao", label: "Produção", icon: "copy" },
  { key: "publicado", label: "Publicado", icon: "check" },
] as const;

// =============================================================================
// CATEGORY COLORS (para badges de categoria)
// =============================================================================

export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "dev-no-code": { bg: "bg-violet-500/20", text: "text-violet-400" },
  "ia-generativa": { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  "produtividade": { bg: "bg-amber-500/20", text: "text-amber-400" },
  "soft-skills": { bg: "bg-pink-500/20", text: "text-pink-400" },
  "marketing": { bg: "bg-orange-500/20", text: "text-orange-400" },
  "negocios": { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  "default": { bg: "bg-muted/30", text: "text-muted-foreground" },
};

export function getCategoryColor(category: string) {
  const key = category?.toLowerCase().replace(/\s+/g, "-") || "default";
  return CATEGORY_COLORS[key] || CATEGORY_COLORS.default;
}

// =============================================================================
// CONTENT TYPE ICONS
// =============================================================================

export const CONTENT_TYPE_ICONS: Record<string, string> = {
  aulas: "play-alt",
  planejamento: "calendar",
  recursos: "folder",
  quizzes: "list-check",
  assessments: "clipboard-check",
  pesquisas: "search",
  default: "document",
};

// =============================================================================
// HELPER CLASSES
// =============================================================================

/** Classes padrão para cards do Studio */
export const STUDIO_CARD_CLASSES = "bg-[#111116] border-border/30 rounded-xl";

/** Classes padrão para KPI cards */
export const STUDIO_KPI_CLASSES = `bg-gradient-to-br ${STUDIO_CARD_GRADIENT} border-[#538096]/20 rounded-xl`;

/** Classes padrão para botões primários */
export const STUDIO_BUTTON_PRIMARY = "bg-[#538096] hover:bg-[#4a7285] text-white";

/** Classes padrão para botões com gold */
export const STUDIO_BUTTON_GOLD = "bg-[#C9B298] hover:bg-[#b8a189] text-[#0A0A0F]";
