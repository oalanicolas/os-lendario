import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../ui/icon';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { cn } from '../../../lib/utils';

type LessonType = 'video' | 'text' | 'quiz';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  type: LessonType;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseProgress {
  percentage: number;
  completedLessons: number;
  totalLessons: number;
}

interface LmsCourseSidebarProps {
  isOpen: boolean;
  progress: CourseProgress;
  modules: Module[];
  activeLessonId: string;
  courseSlug: string;
  onLessonSelect: (lessonId: string) => void;
}

const LmsCourseSidebar: React.FC<LmsCourseSidebarProps> = ({
  isOpen,
  progress,
  modules,
  activeLessonId,
  courseSlug,
  onLessonSelect,
}) => {
  const navigate = useNavigate();

  const handleLessonClick = (lessonId: string) => {
    onLessonSelect(lessonId);
    navigate(`/lms/cursos/${courseSlug}/aula/${lessonId}`);
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-l border-border bg-card transition-all duration-300',
        isOpen ? 'w-80 md:w-96' : 'w-0 overflow-hidden opacity-0'
      )}
    >
      <div className="flex flex-col gap-4 border-b border-border p-4">
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Seu Progresso
          </h3>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-mono font-bold text-foreground">{progress.percentage}%</span>
            <span className="text-xs text-muted-foreground">
              {progress.completedLessons}/{progress.totalLessons} Aulas
            </span>
          </div>
          <Progress
            value={progress.percentage}
            className={cn('h-1 bg-muted', progress.percentage === 100 && '[&>div]:bg-green-500')}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={['m1', 'm2']} className="w-full">
          {modules.map((module) => (
            <AccordionItem
              key={module.id}
              value={module.id}
              className="border-b border-border last:border-0"
            >
              <AccordionTrigger className="group px-4 py-4 text-left hover:bg-muted/30 hover:no-underline">
                <div className="flex-1">
                  <p className="text-sm font-bold text-muted-foreground transition-colors group-hover:text-foreground">
                    {module.title}
                  </p>
                  <p className="mt-0.5 text-xs font-normal text-muted-foreground/70">
                    {module.lessons.length} aulas
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-muted/10 p-0">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson.id)}
                    className={cn(
                      'flex w-full items-center gap-3 border-l-2 p-3 pl-6 text-left transition-colors hover:bg-muted/50',
                      activeLessonId === lesson.id
                        ? 'border-primary bg-muted/30'
                        : 'border-transparent'
                    )}
                  >
                    <div className="shrink-0">
                      {lesson.status === 'completed' ? (
                        <Icon name="check-circle" className="text-green-500" size="size-4" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-primary"></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          'truncate text-xs font-medium',
                          activeLessonId === lesson.id ? 'text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        {lesson.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-muted-foreground/60">
                        {lesson.type === 'video' && <Icon name="play-circle" size="size-3" />}
                        {lesson.type === 'text' && <Icon name="file-text" size="size-3" />}
                        <span className="font-mono text-xs">{lesson.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  );
};

export default LmsCourseSidebar;
