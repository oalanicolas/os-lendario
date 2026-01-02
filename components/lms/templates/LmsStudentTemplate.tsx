import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import {
  useLmsCourse,
  useLmsLesson,
  useLessonInteractions,
  useCourseProgress,
} from '../../../hooks/lms';
import type { VideoProgress } from '../ui/VideoPlayer';
import LessonContextTabs from '../views/LessonContextTabs';
import LessonContentView from '../views/LessonContentView';
import LmsCourseSidebar from '../views/LmsCourseSidebar';
import LessonActionsBar from '../views/LessonActionsBar';

type LessonType = 'video' | 'text' | 'quiz';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  type: LessonType;
}

// Module interface inlined in courseData type

export default function LmsStudentTemplate() {
  const navigate = useNavigate();
  const { slug, lessonId } = useParams();

  // Fetch real data
  const { course: realCourse } = useLmsCourse(slug);
  const { lesson: realLesson, loading: lessonLoading } = useLmsLesson(slug, lessonId);

  // Lesson interactions (complete, favorite, rating, watch progress)
  const {
    interactions: lessonInteractions,
    isLoading: interactionsLoading,
    toggleFavorite,
    markComplete,
    markIncomplete,
    rateLesson,
    updateWatchProgress,
  } = useLessonInteractions(realLesson?.id || '');

  // Course progress
  const { progress: courseProgress, refetch: refetchProgress } = useCourseProgress(
    realCourse?.id || ''
  );

  // State for Active Lesson
  const [activeLessonId, setActiveLessonId] = useState(lessonId || '');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Loading states for UI feedback
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  // Resume playback state
  const [resumeTime, setResumeTime] = useState<number>(0);
  const [showResumeBanner, setShowResumeBanner] = useState(false);

  // Check for saved progress when interactions load
  useEffect(() => {
    if (lessonInteractions?.watchProgress && !lessonInteractions.isCompleted) {
      const savedTime = lessonInteractions.watchProgress.currentTime;
      const percentage = lessonInteractions.watchProgress.percentage;
      // Only show resume if watched between 5% and 90%
      if (savedTime > 10 && percentage < 90 && percentage > 5) {
        setResumeTime(savedTime);
        setShowResumeBanner(true);
      }
    }
  }, [lessonInteractions]);

  // Reset resume state when lesson changes
  useEffect(() => {
    setResumeTime(0);
    setShowResumeBanner(false);
  }, [realLesson?.id]);

  // Video progress tracking handlers
  const handleVideoProgress = useCallback(
    (progress: VideoProgress) => {
      updateWatchProgress(progress.currentTime, progress.duration);
    },
    [updateWatchProgress]
  );

  const handleVideoEnded = useCallback(async () => {
    if (!lessonInteractions?.isCompleted) {
      setIsMarkingComplete(true);
      try {
        await markComplete();
        refetchProgress();
      } catch (error) {
        console.error('Failed to mark lesson complete:', error);
      } finally {
        setIsMarkingComplete(false);
      }
    }
  }, [lessonInteractions?.isCompleted, markComplete, refetchProgress]);

  // Update activeLessonId when lessonId from URL changes
  useEffect(() => {
    if (lessonId) setActiveLessonId(lessonId);
  }, [lessonId]);

  // Fallback mock data
  const fallbackCourseData = {
    title: 'Vibecoding - Apps Sem Código',
    progress: 35,
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: Fundamentos',
        lessons: [
          {
            id: 'l1',
            title: 'Boas Vindas & Mindset',
            duration: '10:05',
            status: 'completed' as const,
            type: 'video' as const,
          },
          {
            id: 'l2',
            title: 'Manifesto No-Code (Leitura)',
            duration: '5 min',
            status: 'completed' as const,
            type: 'text' as const,
          },
          {
            id: 'l3',
            title: 'Configurando o Ambiente',
            duration: '12:10',
            status: 'completed' as const,
            type: 'video' as const,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Módulo 2: Banco de Dados',
        lessons: [
          {
            id: 'l4',
            title: 'Estrutura Relacional',
            duration: '25:00',
            status: 'current' as const,
            type: 'video' as const,
          },
          {
            id: 'l5',
            title: 'Guia de Tipos de Dados',
            duration: '10 min',
            status: 'locked' as const,
            type: 'text' as const,
          },
          {
            id: 'l6',
            title: 'Tabelas e Conexões',
            duration: '32:10',
            status: 'locked' as const,
            type: 'video' as const,
          },
        ],
      },
    ],
  };

  // Transform real data or use fallback
  const courseData = realCourse
    ? {
        title: realCourse.title,
        progress: realCourse.progress.percentage,
        modules: realCourse.modules.map((m) => ({
          id: m.id,
          title: m.title,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            status: l.status,
            type: l.type,
          })),
        })),
      }
    : fallbackCourseData;

  // Set initial activeLessonId if not set
  useEffect(() => {
    if (!activeLessonId && courseData.modules.length > 0) {
      const firstLesson = courseData.modules[0]?.lessons[0];
      if (firstLesson) setActiveLessonId(firstLesson.id);
    }
  }, [courseData, activeLessonId]);

  // Handlers
  const handleToggleFavorite = async () => {
    if (isTogglingFavorite || interactionsLoading) return;
    setIsTogglingFavorite(true);
    try {
      await toggleFavorite();
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleMarkComplete = async () => {
    if (isMarkingComplete || interactionsLoading) return;
    setIsMarkingComplete(true);
    try {
      if (lessonInteractions?.isCompleted) {
        await markIncomplete();
      } else {
        await markComplete();
      }
      // Refetch course progress after marking
      await refetchProgress();
    } catch (err) {
      console.error('Failed to mark complete:', err);
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const handleRate = async (stars: number) => {
    try {
      await rateLesson(stars);
    } catch (err) {
      console.error('Failed to rate lesson:', err);
    }
  };

  // Find active lesson data from sidebar
  const getActiveLessonData = () => {
    for (const mod of courseData.modules) {
      const lesson = mod.lessons.find((l) => l.id === activeLessonId);
      if (lesson) return { ...lesson, moduleTitle: mod.title };
    }
    return {
      id: 'l4',
      title: 'Estrutura Relacional',
      duration: '25:00',
      status: 'current',
      type: 'video' as LessonType,
      moduleTitle: 'Módulo 2',
    };
  };

  const activeLesson = getActiveLessonData();

  // Determine content type for layout
  const hasVideo = !!realLesson?.videoUrl;

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* --- MAIN CONTENT (PLAYER) --- */}
      <div className="relative flex h-full flex-1 flex-col">
        {/* Top Navigation */}
        <header className="z-20 h-16 shrink-0 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate(`/lms/cursos/${slug}`)}
              >
                <Icon name="arrow-left" size="size-4" />
              </Button>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {courseData.title}
                </span>
                <h1 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  {activeLesson.title}
                  <Icon name="angle-small-right" className="text-muted-foreground" size="size-3" />
                  <span className="font-normal text-muted-foreground">
                    {activeLesson.moduleTitle}
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2 text-muted-foreground hover:text-foreground',
                  !sidebarOpen && 'text-primary'
                )}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Icon name={sidebarOpen ? 'expand' : 'compress'} size="size-4" />
                {sidebarOpen ? 'Modo Foco' : 'Mostrar Menu'}
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area (Scrollable) */}
        <div className="custom-scrollbar flex-1 overflow-y-auto bg-muted/20">
          <div
            className={cn(
              'mx-auto w-full p-6 md:p-8',
              activeLesson.type === 'text' ? 'max-w-5xl' : 'max-w-6xl'
            )}
          >
            {/* Dynamic Content Renderer */}
            <LessonContentView
              loading={lessonLoading}
              videoUrl={realLesson?.videoUrl}
              title={realLesson?.title || activeLesson.title}
              duration={realLesson?.duration}
              content={realLesson?.content || ''}
              resumeTime={resumeTime}
              showResumeBanner={showResumeBanner}
              onDismissResume={() => setShowResumeBanner(false)}
              onResumeFromStart={() => {
                setShowResumeBanner(false);
                setResumeTime(0);
              }}
              onVideoProgress={handleVideoProgress}
              onVideoEnded={handleVideoEnded}
            />

            {/* Footer / Context (Below Content) */}
            <div className="mx-auto mt-8 max-w-3xl space-y-8">
              {/* Lesson Actions */}
              <LessonActionsBar
                courseSlug={slug || ''}
                previousLessonId={realLesson?.previousLessonId}
                nextLessonId={realLesson?.nextLessonId}
                rating={lessonInteractions?.rating || 0}
                onRate={handleRate}
                isFavorite={lessonInteractions?.isFavorite || false}
                onToggleFavorite={handleToggleFavorite}
                isTogglingFavorite={isTogglingFavorite}
                isCompleted={lessonInteractions?.isCompleted || false}
                onMarkComplete={handleMarkComplete}
                isMarkingComplete={isMarkingComplete}
                interactionsLoading={interactionsLoading}
                lessonType={activeLesson.type}
              />

              {/* Additional Context Tabs */}
              <LessonContextTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDEBAR (CURRICULUM) --- */}
      <LmsCourseSidebar
        isOpen={sidebarOpen}
        progress={courseProgress}
        modules={courseData.modules}
        activeLessonId={activeLessonId}
        courseSlug={slug || ''}
        onLessonSelect={setActiveLessonId}
      />
    </div>
  );
}
