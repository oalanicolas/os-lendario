/**
 * Course Creator Views
 *
 * Extracted view components from CoursesTemplate for better modularity.
 */

// List View
export { CoursesListView, type CoursesListViewProps } from './CoursesListView';
export type { Course } from '../types';

// Workflow Views
export { CurriculumView } from './CurriculumView';
export type { CurriculumViewProps } from './CurriculumView';

export { GenerationView } from './GenerationView';
export type { GenerationViewProps } from './GenerationView';

export { ValidationView } from './ValidationView';
export type { ValidationViewProps } from './ValidationView';

// Wizard Views
export { default as NewCourseWizard } from './NewCourseWizard';
export { default as BriefEditorView } from './BriefEditorView';
export { default as ResearchLoadingView } from './ResearchLoadingView';
export { default as ResearchResultsView } from './ResearchResultsView';
export { default as ReformulationView } from './ReformulationView';
