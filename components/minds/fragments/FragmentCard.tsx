import React from 'react';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Progress } from '../../ui/progress';
import { cn } from '../../../lib/utils';
import {
  getRelevanceColor,
  getConfidenceColor,
  confidenceToPercent,
} from '../../../lib/fragment-utils';
import {
  MindFragment,
  FRAGMENT_TYPE_LABELS,
  FRAGMENT_TYPE_ICONS,
  FRAGMENT_TYPE_COLORS,
} from '../../../hooks/useMindFragments';

interface FragmentCardProps {
  fragment: MindFragment;
  isSelected: boolean;
  onClick: () => void;
  relationshipCount?: number;
}

export const FragmentCard: React.FC<FragmentCardProps> = ({
  fragment,
  isSelected,
  onClick,
  relationshipCount = 0,
}) => {
  const confidencePercent = confidenceToPercent(fragment.confidence);

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all relative overflow-hidden group",
        "border border-transparent",
        isSelected
          ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:border-border"
      )}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-gold" />
      )}

      {/* Header row: Icon + Content preview + Relevance badge */}
      <div className="flex items-start gap-2 mb-2">
        <Icon
          name={FRAGMENT_TYPE_ICONS[fragment.type] || 'file'}
          size="size-3.5"
          className={cn(
            "mt-0.5 shrink-0",
            isSelected
              ? "text-brand-gold"
              : FRAGMENT_TYPE_COLORS[fragment.type] || 'text-muted-foreground'
          )}
        />
        <span className="line-clamp-2 flex-1 leading-relaxed">
          {fragment.content.slice(0, 100)}
          {fragment.content.length > 100 && '...'}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] h-5 px-1.5 leading-none shrink-0 font-mono border",
            getRelevanceColor(fragment.relevance)
          )}
        >
          {fragment.relevance}
        </Badge>
      </div>

      {/* Confidence bar */}
      {fragment.confidence !== undefined && fragment.confidence > 0 && (
        <div className="mb-2">
          <Progress
            value={confidencePercent}
            max={100}
            className="h-1 bg-muted/30"
            indicatorClassName={getConfidenceColor(fragment.confidence)}
          />
        </div>
      )}

      {/* Footer: Type badge + Relationship count */}
      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className={cn(
            "text-[9px] h-4 px-1.5 leading-none bg-muted/30 border-0",
            FRAGMENT_TYPE_COLORS[fragment.type] || 'text-zinc-400'
          )}
        >
          {FRAGMENT_TYPE_LABELS[fragment.type] || fragment.type}
        </Badge>

        {relationshipCount > 0 && (
          <Badge
            variant="outline"
            className="text-[9px] h-4 px-1.5 leading-none gap-1 border-border text-muted-foreground"
          >
            <Icon name="link" size="size-2.5" />
            {relationshipCount}
          </Badge>
        )}

        {/* Confidence percentage - shown on hover */}
        {fragment.confidence !== undefined && fragment.confidence > 0 && (
          <span className="ml-auto text-[9px] text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
            {Math.round(confidencePercent)}%
          </span>
        )}
      </div>
    </button>
  );
};

export default FragmentCard;
