import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  duration?: number;
  content?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  curriculum: Lesson[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  isLoading: boolean;
  isEditing: boolean;
  error: Error | null;
}

export interface UseCousesHook {
  // State
  courses: Course[];
  selectedCourse: Course | null;
  isLoading: boolean;
  isEditing: boolean;
  error: Error | null;

  // Setters
  setSelectedCourse: (course: Course | null) => void;
  setIsEditing: (editing: boolean) => void;
  setError: (error: Error | null) => void;

  // Actions
  createCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  publishCourse: (id: string) => Promise<void>;
  addLesson: (courseId: string, lesson: Omit<Lesson, 'id'>) => Promise<void>;
  updateLesson: (courseId: string, lessonId: string, updates: Partial<Lesson>) => Promise<void>;
  removeLesson: (courseId: string, lessonId: string) => Promise<void>;
  reorderLessons: (courseId: string, lessons: Lesson[]) => Promise<void>;
}

export const useCourses = (): UseCousesHook => {
  const { toast } = useToast();

  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Actions
  const createCourse = useCallback(
    async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
      setIsLoading(true);
      try {
        const newCourse: Course = {
          ...courseData,
          id: `course_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCourses((prev) => [...prev, newCourse]);
        setSelectedCourse(newCourse);
        toast({ title: 'Curso criado com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create course');
        setError(error);
        toast({ title: 'Erro ao criar curso', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [toast],
  );

  const updateCourse = useCallback(
    async (id: string, updates: Partial<Course>) => {
      setIsLoading(true);
      try {
        setCourses((prev) =>
          prev.map((course) =>
            course.id === id ? { ...course, ...updates, updatedAt: new Date().toISOString() } : course,
          ),
        );
        if (selectedCourse?.id === id) {
          setSelectedCourse({ ...selectedCourse, ...updates, updatedAt: new Date().toISOString() });
        }
        toast({ title: 'Curso atualizado com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update course');
        setError(error);
        toast({ title: 'Erro ao atualizar curso', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCourse, toast],
  );

  const deleteCourse = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        setCourses((prev) => prev.filter((course) => course.id !== id));
        if (selectedCourse?.id === id) {
          setSelectedCourse(null);
        }
        toast({ title: 'Curso deletado com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to delete course');
        setError(error);
        toast({ title: 'Erro ao deletar curso', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCourse, toast],
  );

  const publishCourse = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        setCourses((prev) =>
          prev.map((course) =>
            course.id === id ? { ...course, status: 'published', updatedAt: new Date().toISOString() } : course,
          ),
        );
        if (selectedCourse?.id === id) {
          setSelectedCourse({ ...selectedCourse, status: 'published', updatedAt: new Date().toISOString() });
        }
        toast({ title: 'Curso publicado com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to publish course');
        setError(error);
        toast({ title: 'Erro ao publicar curso', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCourse, toast],
  );

  const addLesson = useCallback(
    async (courseId: string, lessonData: Omit<Lesson, 'id'>) => {
      setIsLoading(true);
      try {
        const newLesson: Lesson = {
          ...lessonData,
          id: `lesson_${Date.now()}`,
        };
        setCourses((prev) =>
          prev.map((course) =>
            course.id === courseId ? { ...course, curriculum: [...course.curriculum, newLesson] } : course,
          ),
        );
        if (selectedCourse?.id === courseId) {
          setSelectedCourse({ ...selectedCourse, curriculum: [...selectedCourse.curriculum, newLesson] });
        }
        toast({ title: 'Aula adicionada com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to add lesson');
        setError(error);
        toast({ title: 'Erro ao adicionar aula', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCourse, toast],
  );

  const updateLesson = useCallback(
    async (courseId: string, lessonId: string, updates: Partial<Lesson>) => {
      setIsLoading(true);
      try {
        setCourses((prev) =>
          prev.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  curriculum: course.curriculum.map((lesson) =>
                    lesson.id === lessonId ? { ...lesson, ...updates } : lesson,
                  ),
                }
              : course,
          ),
        );
        if (selectedCourse?.id === courseId) {
          setSelectedCourse({
            ...selectedCourse,
            curriculum: selectedCourse.curriculum.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, ...updates } : lesson,
            ),
          });
        }
        toast({ title: 'Aula atualizada com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update lesson');
        setError(error);
        toast({ title: 'Erro ao atualizar aula', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCourse, toast],
  );

  const removeLesson = useCallback(
    async (courseId: string, lessonId: string) => {
      setIsLoading(true);
      try {
        setCourses((prev) =>
          prev.map((course) =>
            course.id === courseId
              ? { ...course, curriculum: course.curriculum.filter((lesson) => lesson.id !== lessonId) }
              : course,
          ),
        );
        if (selectedCourse?.id === courseId) {
          setSelectedCourse({
            ...selectedCourse,
            curriculum: selectedCourse.curriculum.filter((lesson) => lesson.id !== lessonId),
          });
        }
        toast({ title: 'Aula removida com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to remove lesson');
        setError(error);
        toast({ title: 'Erro ao remover aula', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCourse, toast],
  );

  const reorderLessons = useCallback(
    async (courseId: string, lessons: Lesson[]) => {
      setIsLoading(true);
      try {
        setCourses((prev) =>
          prev.map((course) => (course.id === courseId ? { ...course, curriculum: lessons } : course)),
        );
        if (selectedCourse?.id === courseId) {
          setSelectedCourse({ ...selectedCourse, curriculum: lessons });
        }
        toast({ title: 'Aulas reordenadas com sucesso!' });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to reorder lessons');
        setError(error);
        toast({ title: 'Erro ao reordenar aulas', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCourse, toast],
  );

  return {
    courses,
    selectedCourse,
    isLoading,
    isEditing,
    error,
    setSelectedCourse,
    setIsEditing,
    setError,
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    addLesson,
    updateLesson,
    removeLesson,
    reorderLessons,
  };
};
