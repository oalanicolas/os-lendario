import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { StarRating, FavoriteButton } from '../../shared';
import { cn } from '../../../lib/utils';

type LessonType = 'video' | 'text' | 'quiz';

interface LessonActionsBarProps {
  courseSlug: string;
  previousLessonId?: string | null;
  nextLessonId?: string | null;
  rating: number;
  onRate: (stars: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isTogglingFavorite: boolean;
  isCompleted: boolean;
  onMarkComplete: () => void;
  isMarkingComplete: boolean;
  interactionsLoading: boolean;
  lessonType: LessonType;
}

const LessonActionsBar: React.FC<LessonActionsBarProps> = ({
  courseSlug,
  previousLessonId,
  nextLessonId,
  rating,
  onRate,
  isFavorite,
  onToggleFavorite,
  isTogglingFavorite,
  isCompleted,
  onMarkComplete,
  isMarkingComplete,
  interactionsLoading,
  lessonType,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="gap-2 border-border text-foreground hover:bg-muted"
          disabled={!previousLessonId}
          onClick={() =>
            previousLessonId && navigate(`/lms/cursos/${courseSlug}/aula/${previousLessonId}`)
          }
        >
          <Icon name="angle-left" size="size-4" /> Anterior
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-border text-foreground hover:bg-muted"
          disabled={!nextLessonId}
          onClick={() => nextLessonId && navigate(`/lms/cursos/${courseSlug}/aula/${nextLessonId}`)}
        >
          Próxima <Icon name="angle-right" size="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {/* Star Rating System */}
        <div className="mr-4 flex h-8 items-center border-r border-border pr-4">
          <StarRating
            value={rating}
            onChange={onRate}
            interactive
            size="lg"
            disabled={interactionsLoading}
            label="Avalie:"
          />
        </div>

        {/* Favorite Button */}
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
          isLoading={isTogglingFavorite}
          disabled={interactionsLoading}
          variant="labeled"
        />

        {/* Complete Button */}
        <Button
          className={cn(
            'gap-2 font-bold shadow-lg transition-all',
            isCompleted
              ? 'bg-green-600 text-white shadow-green-600/20 hover:bg-green-700'
              : 'bg-primary text-primary-foreground shadow-primary/10 hover:bg-primary/90'
          )}
          onClick={onMarkComplete}
          disabled={isMarkingComplete || interactionsLoading}
        >
          {isMarkingComplete ? (
            <Icon name="refresh" size="size-4" className="animate-spin" />
          ) : (
            <Icon
              name={isCompleted ? 'check-circle' : 'check'}
              type={isCompleted ? 'solid' : 'regular'}
              size="size-4"
            />
          )}
          {isCompleted
            ? 'Concluída ✓'
            : lessonType === 'text'
              ? 'Marcar como Lida'
              : 'Marcar Concluída'}
        </Button>
      </div>
    </div>
  );
};

export default LessonActionsBar;
