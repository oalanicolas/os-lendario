/**
 * HOOK RETURN TYPES
 *
 * Centralized type definitions for all custom hooks.
 * This ensures consistency across the application and helps AI understand
 * what each hook returns.
 *
 * Standard Pattern:
 * - data/content: The actual data the hook fetches
 * - isLoading: true while fetching (always use this name)
 * - error: Error | null (error object if fetch failed)
 * - refetch?: Optional function to manually refetch
 */

// ============================================================================
// GENERIC/BASE TYPES
// ============================================================================

/**
 * Generic async hook return type for data fetching
 * Use this as base for similar hooks
 */
export interface UseAsyncReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Generic async hook return type for arrays
 */
export interface UseAsyncArrayReturn<T> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

// ============================================================================
// MIND HOOKS
// ============================================================================

/**
 * Return type for useMind hook
 * Fetches a single mind profile by ID
 */
export interface UseMindReturn {
  mind: any; // MindProfile | null
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useMinds hook
 * Fetches a list of minds
 */
export interface UseMindsSreturn {
  minds: any[]; // MindProfile[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for usePublicMinds hook
 * Fetches publicly available minds
 */
export interface UsePublicMindsReturn {
  minds: any[]; // MindProfile[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useMindContents hook
 * Fetches content associated with a mind
 */
export interface UseMindContentsReturn {
  contents: any[]; // ContentItem[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useMindHistory hook
 * Fetches historical data for a mind
 */
export interface UseMindHistoryReturn {
  history: any[]; // HistoryEntry[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useMindArtifacts hook
 * Fetches artifacts generated for a mind
 */
export interface UseMindArtifactsReturn {
  artifacts: any[]; // Artifact[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useMindAvatarUpload hook
 * Handles avatar upload for a mind profile
 */
export interface UseMindAvatarUploadReturn {
  isUploading: boolean;
  error: Error | null;
  uploadAvatar: (file: File) => Promise<string>;
}

/**
 * Return type for useMindPsychometrics hook
 * Fetches psychometric profile data for a mind
 */
export interface UseMindPsychometricsReturn {
  psychometrics: any; // PsychometricProfile | null
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

// ============================================================================
// COURSE HOOKS
// ============================================================================

/**
 * Return type for useCourse hook
 * Fetches a single course by ID
 */
export interface UseCourseReturn {
  course: any; // Course | null
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useCourses hook
 * Fetches a list of courses
 */
export interface UseCoursesReturn {
  courses: any[]; // Course[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useCourseContents hook
 * Fetches content/lessons for a course
 */
export interface UseCourseContentsReturn {
  contents: any[]; // CourseContent[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useLesson hook
 * Fetches a single lesson by ID
 */
export interface UseLessonReturn {
  lesson: any; // Lesson | null
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

// ============================================================================
// CONTENT FRAMEWORK HOOKS
// ============================================================================

/**
 * Return type for useContentFrameworks hook
 * Fetches available content frameworks/templates
 */
export interface UseContentFrameworksReturn {
  frameworks: any[]; // Framework[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for useAudienceProfiles hook
 * Fetches audience/user profile data
 */
export interface UseAudienceProfilesReturn {
  profiles: any[]; // AudienceProfile[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

// ============================================================================
// DEBATE HOOKS
// ============================================================================

/**
 * Return type for useDebates hook
 * Fetches a list of debates
 */
export interface UseDebatesReturn {
  debates: any[]; // Debate[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

// ============================================================================
// ACTIVITY HOOKS
// ============================================================================

/**
 * Return type for useRecentActivities hook
 * Fetches recent activity log
 */
export interface UseRecentActivitiesReturn {
  activities: any[]; // Activity[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

// ============================================================================
// ARENA HOOK
// ============================================================================

/**
 * Return type for useArena hook
 * Manages arena/debate comparison state
 */
export interface UseArenaReturn {
  selectedMinds: string[];
  addMind: (mindId: string) => void;
  removeMind: (mindId: string) => void;
  clearSelection: () => void;
  isLoading: boolean;
  error: Error | null;
}

// ============================================================================
// PRD HOOKS
// ============================================================================

/**
 * Return type for usePRDProjects hook
 * Fetches list of PRD projects
 */
export interface UsePRDProjectsReturn {
  projects: any[]; // PRDProject[]
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for usePRDProject hook
 * Fetches a single PRD project by ID
 */
export interface UsePRDProjectReturn {
  project: any; // PRDProject | null
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<void>;
}

/**
 * Return type for usePRDAI hook
 * Handles AI-powered PRD generation
 */
export interface UsePRDAIReturn {
  isGenerating: boolean;
  error: Error | null;
  generate: (prompt: string) => Promise<void>;
  result: any; // GeneratedPRD | null
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Return type for useToast hook
 * Manages toast notifications
 */
export interface UseToastReturn {
  toast: (options: ToastOptions) => void;
  dismiss: (id?: string) => void;
}

/**
 * Toast notification options
 */
export interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'destructive';
}

/**
 * Return type for useClipboard hook
 * Manages clipboard copy functionality
 */
export interface UseClipboardReturn {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}
