/**
 * Course Creator - Shared Types
 *
 * Types and mock data shared across course view components.
 */

// =============================================================================
// VIEW STATE
// =============================================================================

export type ViewState =
  | 'list'
  | 'new'
  | 'brief'
  | 'research_loading' // Agent Running: Market Research
  | 'research_results' // Checkpoint: Review Market Data
  | 'reformulation' // Checkpoint: Review Brief Updates
  | 'curriculum' // Checkpoint: Approve Structure
  | 'generation' // Agent Running: Lesson Gen + GPS/DL Validation
  | 'lesson' // Manual: Review Lesson
  | 'validation'; // Final QA

// =============================================================================
// PIPELINE STATE
// =============================================================================

export type PipelineStepStatus = 'completed' | 'current' | 'pending';

export interface PipelineState {
  brief: PipelineStepStatus;
  research: PipelineStepStatus;
  curriculum: PipelineStepStatus;
  lessons: PipelineStepStatus;
  validation: PipelineStepStatus;
}

// =============================================================================
// COURSE TYPES
// =============================================================================

export interface CourseInstructor {
  name: string;
  avatar: string;
  isMMOS: boolean;
}

export interface CourseAlert {
  type: 'warning' | 'error';
  message: string;
}

export interface Course {
  id: string | number;
  title: string;
  slug: string;
  icon: string;
  category: string;
  instructor: CourseInstructor;
  // Content counts
  lessonsCount: number;
  modulesCount: number;
  researchCount: number;
  assessmentsCount: number;
  duration: string;
  // Metadata
  type: 'Greenfield' | 'Brownfield';
  frameworks: string[]; // e.g., ['GPS', 'Didatica Lendaria']
  fidelityScore: number | null; // Average fidelity score (0-100)
  // Status
  statusLabel: string;
  progress: number;
  updatedAt: string;
  // Alerts
  alerts?: CourseAlert[];
  pipeline: PipelineState;
}

// =============================================================================
// CURRICULUM TYPES
// =============================================================================

export interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
}

export interface CurriculumModule {
  id: number;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

// =============================================================================
// GENERATION LOG TYPES
// =============================================================================

export type GenerationLogStatus = 'success' | 'retrying' | 'pending';

export interface GenerationLogEntry {
  id: string;
  title: string;
  gps: number;
  dl: number;
  status: GenerationLogStatus;
  msg: string;
}

// =============================================================================
// MOCK DATA - Didatica Lendaria Curriculum
// =============================================================================

export const didaticaCurriculum: CurriculumModule[] = [
  {
    id: 1,
    title: 'O Desafio do Engajamento',
    description: 'Por que 70% dos alunos abandonam cursos.',
    lessons: [
      { id: '1.1', title: 'Introducao ao Desafio', duration: '8 min' },
      { id: '1.2', title: 'A Curva da Atencao', duration: '7 min' },
      { id: '1.3', title: 'Erros Comuns', duration: '8 min' },
      { id: '1.4', title: 'Case de Sucesso', duration: '7 min' },
    ],
  },
  {
    id: 2,
    title: 'Metodo GPS',
    description: 'Dominar Destino + Origem + Rota.',
    lessons: [
      { id: '2.1', title: 'Destino Claro', duration: '10 min' },
      { id: '2.2', title: 'Origem (Empatia)', duration: '8 min' },
      { id: '2.3', title: 'Rota Otimizada', duration: '9 min' },
      { id: '2.4', title: 'Workshop GPS', duration: '8 min' },
    ],
  },
  {
    id: 3,
    title: 'Didatica para o Aluno Lendario',
    description: 'Adaptar para o ICP da Academia.',
    lessons: [
      { id: '3.1', title: 'Perfil do Aluno', duration: '10 min' },
      { id: '3.2', title: 'Linguagem e Tom', duration: '8 min' },
      { id: '3.3', title: 'Exemplos Praticos', duration: '12 min' },
      { id: '3.4', title: 'Andragogia', duration: '10 min' },
      { id: '3.5', title: 'Gamificacao', duration: '10 min' },
      { id: '3.6', title: 'Feedback Loop', duration: '5 min' },
      { id: '3.7', title: 'Conclusao do Modulo', duration: '5 min' },
    ],
  },
  {
    id: 4,
    title: 'Semiotica da Imagem',
    description: 'Transformar conceitos em imagens mentais.',
    lessons: [
      { id: '4.1', title: 'Fundamentos da Semiotica', duration: '10 min' },
      { id: '4.2', title: 'Metaforas Visuais', duration: '10 min' },
      { id: '4.3', title: 'Storytelling Visual', duration: '10 min' },
      { id: '4.4', title: 'Exercicio Pratico', duration: '10 min' },
    ],
  },
  {
    id: 5,
    title: 'Estrutura de Aula Completa',
    description: 'As 7 partes de uma aula perfeita.',
    lessons: [
      { id: '5.1', title: 'O Hook (Gancho)', duration: '8 min' },
      { id: '5.2', title: 'Desenvolvimento', duration: '12 min' },
      { id: '5.3', title: 'Climax', duration: '8 min' },
      { id: '5.4', title: 'Call to Action', duration: '7 min' },
      { id: '5.5', title: 'Revisao', duration: '10 min' },
    ],
  },
];

// =============================================================================
// MOCK DATA - Generation Log
// =============================================================================

export const generationLog: GenerationLogEntry[] = [
  { id: '1.1', title: 'Introducao', gps: 92, dl: 85, status: 'success', msg: 'Hook validado' },
  { id: '1.2', title: 'Mindset', gps: 88, dl: 78, status: 'success', msg: 'Historia adicionada' },
  {
    id: '1.3',
    title: 'Diagnostico',
    gps: 45,
    dl: 82,
    status: 'retrying',
    msg: 'GPS: Destino pouco claro. Regenerando...',
  },
  { id: '2.1', title: 'Pomodoro', gps: 0, dl: 0, status: 'pending', msg: 'Aguardando...' },
];
