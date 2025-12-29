/**
 * PRD Studio Types - Simplified Model
 *
 * Pipeline: upload → brief → prd → plan → export (5 phases)
 *
 * Types for the simplified PRD Studio flow.
 */

// ============================================
// ENUMS
// ============================================

/** Pipeline phases (5 total) */
export type PRDPhase = 'upload' | 'brief' | 'prd' | 'plan' | 'export';

/** Project lifecycle status */
export type PRDProjectStatus = 'draft' | 'active' | 'completed';

/** MoSCoW categorization for requirements */
export type RequirementCategory = 'must' | 'should' | 'nice';

/** Requirement approval status */
export type RequirementStatus = 'pending' | 'approved' | 'rejected';

/** Story point values (Fibonacci-ish) */
export type StoryPoints = 1 | 2 | 3 | 5 | 8;

// ============================================
// CORE DOMAIN TYPES
// ============================================

/** Uploaded file reference */
export interface PRDFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

/** Brief - Problem/Solution/Scope definition */
export interface PRDBrief {
  problem: string;
  solution: string;
  scopeIn: string; // Can be markdown list
  scopeOut: string; // Can be markdown list
}

/** Requirement with MoSCoW and approval */
export interface PRDRequirement {
  id: string;
  text: string;
  category: RequirementCategory;
  status: RequirementStatus;
  createdAt: string;
  updatedAt: string;
}

/** User Story within an Epic */
export interface PRDStory {
  id: string;
  title: string;
  description: string; // "Como [persona], quero [ação], para [benefício]"
  criteria: string[]; // Acceptance criteria
  techNotes: string; // Technical implementation notes
  points: StoryPoints; // Story points (1, 2, 3, 5, 8)
  createdAt: string;
  updatedAt: string;
}

/** Epic containing stories */
export interface PRDEpic {
  id: string;
  title: string;
  description?: string;
  stories: PRDStory[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// PROJECT TYPE (Main Entity)
// ============================================

/** Full PRD Project */
export interface PRDProject {
  // Identity
  id: string;
  slug: string;
  name: string;

  // Status
  status: PRDProjectStatus;
  pipelineStep: PRDPhase;

  // Phase 1: Upload
  files: PRDFile[];
  uploadContent: string; // Text content from upload

  // Phase 2: Brief
  brief: PRDBrief;

  // Phase 3: PRD (Requirements)
  requirements: PRDRequirement[];

  // Phase 4: Plan (Epics + Stories)
  epics: PRDEpic[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// ============================================
// METADATA TYPE (for Supabase JSON column)
// ============================================

/**
 * This is stored in content_projects.project_metadata
 * Maps to database schema
 */
export interface PRDProjectMetadata {
  pipelineStep: PRDPhase;

  // Phase 1
  upload: {
    content: string;
    files: PRDFile[];
    completedAt?: string;
  };

  // Phase 2
  brief: PRDBrief & {
    completedAt?: string;
  };

  // Phase 3 - Requirements stored here (not in contents table)
  requirements: PRDRequirement[];

  // Phase 4 - Epics/Stories summary (full data in contents table)
  plan: {
    totalEpics: number;
    totalStories: number;
    totalPoints: number;
    completedAt?: string;
  };

  // Phase 5
  export?: {
    format: string;
    exportedAt: string;
    fileUrl?: string;
  };
}

// ============================================
// INPUT TYPES (for mutations)
// ============================================

export interface CreateProjectInput {
  name: string;
}

export interface UpdateUploadInput {
  content?: string;
  files?: PRDFile[];
}

export interface UpdateBriefInput {
  problem?: string;
  solution?: string;
  scopeIn?: string;
  scopeOut?: string;
}

export interface CreateRequirementInput {
  text: string;
  category: RequirementCategory;
}

export interface UpdateRequirementInput {
  text?: string;
  category?: RequirementCategory;
  status?: RequirementStatus;
}

export interface CreateEpicInput {
  title: string;
  description?: string;
}

export interface CreateStoryInput {
  epicId: string;
  title: string;
  description: string;
  criteria: string[];
  techNotes?: string;
  points: StoryPoints;
}

export interface UpdateStoryInput {
  title?: string;
  description?: string;
  criteria?: string[];
  techNotes?: string;
  points?: StoryPoints;
}

// ============================================
// COMPUTED TYPES
// ============================================

export interface PRDMetrics {
  totalRequirements: number;
  approvedRequirements: number;
  rejectedRequirements: number;
  pendingRequirements: number;
  requirementsByCategory: {
    must: number;
    should: number;
    nice: number;
  };
  totalEpics: number;
  totalStories: number;
  totalPoints: number;
  completionPercentage: number;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface PhaseValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completionPercent: number;
}

export interface ProjectValidation {
  upload: PhaseValidation;
  brief: PhaseValidation;
  prd: PhaseValidation;
  plan: PhaseValidation;
  export: PhaseValidation;
  canAdvance: boolean;
  currentPhase: PRDPhase;
  nextPhase: PRDPhase | null;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Get next phase in pipeline */
export function getNextPhase(current: PRDPhase): PRDPhase | null {
  const order: PRDPhase[] = ['upload', 'brief', 'prd', 'plan', 'export'];
  const index = order.indexOf(current);
  return index < order.length - 1 ? order[index + 1] : null;
}

/** Get previous phase in pipeline */
export function getPreviousPhase(current: PRDPhase): PRDPhase | null {
  const order: PRDPhase[] = ['upload', 'brief', 'prd', 'plan', 'export'];
  const index = order.indexOf(current);
  return index > 0 ? order[index - 1] : null;
}

/** Get phase index (0-4) */
export function getPhaseIndex(phase: PRDPhase): number {
  const order: PRDPhase[] = ['upload', 'brief', 'prd', 'plan', 'export'];
  return order.indexOf(phase);
}

/** Get progress percentage (0-100) */
export function getPhaseProgress(phase: PRDPhase): number {
  const index = getPhaseIndex(phase);
  return Math.round((index / 4) * 100);
}

/** Calculate project metrics */
export function calculateMetrics(project: PRDProject): PRDMetrics {
  const requirements = project.requirements;
  const epics = project.epics;

  const approved = requirements.filter((r) => r.status === 'approved').length;
  const rejected = requirements.filter((r) => r.status === 'rejected').length;
  const pending = requirements.filter((r) => r.status === 'pending').length;

  const totalStories = epics.reduce((sum, e) => sum + e.stories.length, 0);
  const totalPoints = epics.reduce(
    (sum, e) => sum + e.stories.reduce((s, st) => s + st.points, 0),
    0
  );

  // Completion based on approved requirements
  const completionPercent =
    requirements.length > 0 ? Math.round((approved / requirements.length) * 100) : 0;

  return {
    totalRequirements: requirements.length,
    approvedRequirements: approved,
    rejectedRequirements: rejected,
    pendingRequirements: pending,
    requirementsByCategory: {
      must: requirements.filter((r) => r.category === 'must').length,
      should: requirements.filter((r) => r.category === 'should').length,
      nice: requirements.filter((r) => r.category === 'nice').length,
    },
    totalEpics: epics.length,
    totalStories,
    totalPoints,
    completionPercentage: completionPercent,
  };
}

/** Generate unique ID */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/** Create empty project */
export function createEmptyProject(name: string, slug: string): PRDProject {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    slug,
    name,
    status: 'draft',
    pipelineStep: 'upload',
    files: [],
    uploadContent: '',
    brief: {
      problem: '',
      solution: '',
      scopeIn: '',
      scopeOut: '',
    },
    requirements: [],
    epics: [],
    createdAt: now,
    updatedAt: now,
  };
}

/** Create empty requirement */
export function createRequirement(text: string, category: RequirementCategory): PRDRequirement {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    text,
    category,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
}

/** Create empty epic */
export function createEpic(title: string, description?: string): PRDEpic {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title,
    description,
    stories: [],
    createdAt: now,
    updatedAt: now,
  };
}

/** Create empty story */
export function createStory(
  title: string,
  description: string,
  criteria: string[],
  points: StoryPoints = 3,
  techNotes: string = ''
): PRDStory {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title,
    description,
    criteria,
    techNotes,
    points,
    createdAt: now,
    updatedAt: now,
  };
}
