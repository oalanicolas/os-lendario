/**
 * Shared Studio Design Tokens
 *
 * Tokens compartilhados entre Course Creator e PRD Studio.
 * Ambos os studios usam a mesma paleta base com variações por contexto.
 */

// =============================================================================
// CORES PRIMÁRIAS (Compartilhadas)
// =============================================================================

/** Azul Petróleo - Cor principal dos Studios */
export const STUDIO_PRIMARY = "#538096";

/** Azul escuro - Cor secundária para hover/borders */
export const STUDIO_SECONDARY = "#3D5A6C";

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
// STATUS COLORS (Genéricos)
// =============================================================================

export const STUDIO_STATUS = {
  /** Verde - Completo/Publicado */
  complete: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-500",
    icon: "check-circle",
  },
  /** Azul - Em progresso/Atual */
  current: {
    bg: "bg-[#538096]/20",
    text: "text-[#538096]",
    border: "border-[#538096]/30",
    dot: "bg-[#538096]",
    icon: "target",
  },
  /** Amarelo - Atenção/Warning */
  warning: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-500",
    icon: "exclamation-circle",
  },
  /** Cinza - Pendente/Rascunho */
  pending: {
    bg: "bg-muted/30",
    text: "text-muted-foreground",
    border: "border-border/50",
    dot: "bg-muted-foreground/40",
    icon: "circle",
  },
} as const;

export type StudioStatusKey = keyof typeof STUDIO_STATUS;

// =============================================================================
// PIPELINE STEP TYPE
// =============================================================================

export interface PipelineStep {
  key: string;
  label: string;
  icon: string;
  status: 'complete' | 'current' | 'pending';
}

// =============================================================================
// SECTION TYPE (para navegação interna)
// =============================================================================

export interface SectionItem {
  id: string | number;
  key: string;
  title: string;
  description?: string;
  icon: string;
  isComplete?: boolean;
}

// =============================================================================
// EFFORT INDICATOR TYPE
// =============================================================================

export interface EffortIndicator {
  human: number; // 0-100
  ai: number;    // 0-100
}

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

/** Classes padrão para sidebar */
export const STUDIO_SIDEBAR_CLASSES = "w-64 border-r border-border bg-card/50 flex flex-col shrink-0";

/** Classes padrão para header interno */
export const STUDIO_HEADER_CLASSES = "h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Retorna as cores de status */
export function getStatusConfig(status: StudioStatusKey) {
  return STUDIO_STATUS[status] || STUDIO_STATUS.pending;
}

/** Calcula progresso baseado em steps completados */
export function calculateProgress(steps: PipelineStep[]): number {
  const completed = steps.filter(s => s.status === 'complete').length;
  return Math.round((completed / steps.length) * 100);
}
