/**
 * Ops Studio - Design Tokens
 *
 * Uso consistente em todo o módulo Ops:
 * - OpsTopbar (header)
 * - OpsDBTemplate (database explorer)
 */

// =============================================================================
// CORES PRIMARIAS
// =============================================================================

/** Slate - Cor principal do Ops Studio */
export const OPS_PRIMARY = "#64748B";

/** Slate escuro - Cor secundária para hover/borders */
export const OPS_SECONDARY = "#475569";

/** Gold - Cor de acento para destaques (MMOS Brand Gold) */
export const OPS_ACCENT = "#C9B298";

/** Background accent (Dark Warm Gold) - Safe to keep hardcoded if used for specific accent BGs */
export const OPS_ACCENT_BG = "#2C2620";

// =============================================================================
// BACKGROUNDS
// =============================================================================

/** Fundo principal - Uses Theme Variable */
export const OPS_BG = "bg-background";

/** Fundo de cards - Uses Theme Variable */
export const OPS_CARD_BG = "bg-card";

/** Gradiente para cards - Subtle, professional (Adapts to theme) */
export const OPS_CARD_GRADIENT = "from-muted/50 to-muted/80";

// =============================================================================
// STATUS COLORS (para tabelas do banco)
// =============================================================================

export const OPS_STATUS = {
  /** Verde - OK / Populado */
  ok: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  /** Amarelo - Parcial (Using Brand Gold for consistency) */
  partial: {
    bg: "bg-[#C9B298]/10",
    text: "text-[#C9B298]",
    border: "border-[#C9B298]/20",
    dot: "bg-[#C9B298]",
  },
  /** Vermelho - Vazio / Critico */
  empty: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/20",
    dot: "bg-red-500",
  },
  /** Roxo - Proposto */
  proposed: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/20",
    dot: "bg-purple-500",
  },
} as const;

// =============================================================================
// PIPELINE PHASES
// =============================================================================

export const OPS_PHASES = {
  1: { label: "COLETA", color: "#64748B", bg: "bg-slate-500" }, // Neutral
  2: { label: "EXTRACAO", color: "#C9B298", bg: "bg-[#C9B298]" }, // Brand Gold
  3: { label: "INFERENCIA", color: "#38bdf8", bg: "bg-sky-400" }, // Blue (remains for logic, but softer)
  4: { label: "MAPEAMENTO", color: "#a3a3a3", bg: "bg-neutral-400" },
  5: { label: "PERFIL", color: "#C9B298", bg: "bg-[#C9B298]" }, // Brand Gold
  6: { label: "RECOMENDACAO", color: "#ffffff", bg: "bg-foreground" }, // White/Black depending on theme
} as const;

// =============================================================================
// HELPER CLASSES
// =============================================================================

/** Classes padrao para cards do Ops Studio - Clean, minimal borders */
export const OPS_CARD_CLASSES = "bg-card border-border/50 rounded-xl shadow-sm";

/** Classes padrao para KPI cards - Subtle gradient, no heavy borders */
export const OPS_KPI_CLASSES = "bg-card/50 border-border/40 rounded-xl";

/** Classes padrao para botoes primarios */
export const OPS_BUTTON_PRIMARY = "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm";

/** Classes padrao para botoes com accent (Gold) */
export const OPS_BUTTON_ACCENT = "bg-[#C9B298]/10 hover:bg-[#C9B298]/20 text-[#C9B298] border border-[#C9B298]/30";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export type OpsTableStatus = keyof typeof OPS_STATUS;

/** Retorna as cores de status para uma tabela */
export function getTableStatusColors(status: OpsTableStatus) {
  return OPS_STATUS[status] || OPS_STATUS.empty;
}

/** Retorna a config de fase */
export function getPhaseConfig(phase: number) {
  return OPS_PHASES[phase as keyof typeof OPS_PHASES] || OPS_PHASES[1];
}
