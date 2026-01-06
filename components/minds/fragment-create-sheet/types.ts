import type { FragmentCreate, MindFragment } from '../../../hooks/useMindFragments';

// Re-export types from useMindFragments
export type { FragmentCreate, MindFragment };

// ============================================================================
// Props Types
// ============================================================================

export interface FragmentCreateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mindId: string;
  onCreate: (data: FragmentCreate) => Promise<MindFragment | null>;
}

// ============================================================================
// Form Types
// ============================================================================

export interface FragmentFormValues {
  type: string;
  content: string;
  context: string;
  insight: string;
  location: string;
  relevance: number;
  confidence: number;
  tags: string[];
}
