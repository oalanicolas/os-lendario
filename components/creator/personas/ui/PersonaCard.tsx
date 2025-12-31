import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Icon, type IconName } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import { STUDIO_CARD_CLASSES } from '../../studio-tokens';

export interface PersonaCardProps {
  id: string;
  name: string;
  role: string;
  icon?: IconName;
  imageUrl?: string;
  tag?: string;
  tagColor?: 'primary' | 'blue' | 'emerald' | 'purple' | 'orange';
  isIcp?: boolean;
  demographics: {
    location?: string;
    age?: string;
    income?: string;
  };
  consciousness?: {
    level: 'Muito Alta' | 'Alta' | 'Média' | 'Baixa';
    percentage: number;
  };
  definingQuote?: string;
  values?: string[];
  painPointsCount?: number;
  desiresCount?: number;
  onClick?: () => void;
}

const tagColorMap = {
  primary: 'text-studio-accent border-studio-accent/30 bg-studio-accent/10',
  blue: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  emerald: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  purple: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  orange: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
};

const consciousnessColorMap = {
  'Muito Alta': 'bg-purple-500',
  Alta: 'bg-studio-accent',
  Média: 'bg-blue-400',
  Baixa: 'bg-emerald-400',
};

export const PersonaCard: React.FC<PersonaCardProps> = ({
  name,
  role,
  icon = 'user',
  imageUrl,
  tag,
  tagColor = 'primary',
  isIcp = false,
  demographics,
  consciousness,
  definingQuote,
  values = [],
  painPointsCount = 0,
  desiresCount = 0,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        STUDIO_CARD_CLASSES,
        'group cursor-pointer overflow-hidden transition-all duration-300',
        'hover:border-studio-accent/50 hover:shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]'
      )}
    >
      {/* Header with gradient background */}
      <div className="relative h-28 bg-gradient-to-r from-card to-background">
        <div className="absolute inset-0 bg-black/20" />

        {/* Avatar */}
        {imageUrl ? (
          <div
            className="absolute -bottom-6 left-5 size-14 rounded-xl border-4 border-card bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
        ) : (
          <div className="absolute -bottom-6 left-5 flex size-14 items-center justify-center rounded-xl border-4 border-card bg-studio-accent/10 shadow-lg">
            <Icon name={icon} size="size-7" className="text-studio-accent" />
          </div>
        )}

        {/* Tag */}
        {tag && (
          <div className="absolute right-3 top-3">
            <span
              className={cn(
                'rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider',
                'bg-black/60 backdrop-blur-md',
                tagColorMap[tagColor]
              )}
            >
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-8">
        {/* Name & Role */}
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="truncate text-lg transition-colors group-hover:text-studio-accent">
              {name}
            </CardTitle>
            {isIcp && (
              <Badge className="shrink-0 border-studio-accent/30 bg-studio-accent/10 text-[10px] text-studio-accent">
                ICP
              </Badge>
            )}
          </div>
          <p className="font-mono text-sm text-studio-accent">{role}</p>
        </div>

        {/* Quote */}
        {definingQuote && (
          <p className="line-clamp-2 border-l-2 border-studio-accent/30 pl-3 text-sm italic text-muted-foreground">
            "{definingQuote}"
          </p>
        )}

        {/* Demographics */}
        <div className="flex flex-col gap-2">
          {demographics.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="marker" size="size-4" />
              <span>{demographics.location}</span>
            </div>
          )}
          {demographics.age && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="calendar" size="size-4" />
              <span>{demographics.age}</span>
            </div>
          )}
          {demographics.income && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="wallet" size="size-4" />
              <span>{demographics.income}</span>
            </div>
          )}
        </div>

        {/* Values */}
        {values.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {values.slice(0, 3).map((v, i) => (
              <Badge key={i} variant="secondary" className="text-[10px]">
                {v}
              </Badge>
            ))}
          </div>
        )}

        {/* Consciousness Bar */}
        {consciousness && (
          <div className="mt-2 border-t border-border pt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Consciência
              </span>
              <span className="text-xs font-bold text-foreground">{consciousness.level}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className={cn('h-full rounded-full', consciousnessColorMap[consciousness.level])}
                style={{ width: `${consciousness.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Icon name="flame" size="size-3" className="text-orange-400" />
              {painPointsCount} dores
            </span>
            <span className="flex items-center gap-1">
              <Icon name="star" size="size-3" className="text-emerald-400" />
              {desiresCount} desejos
            </span>
          </div>
          <span className="flex items-center gap-1 font-medium transition-colors group-hover:text-studio-accent">
            Ver <Icon name="arrow-right" size="size-3" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonaCard;
