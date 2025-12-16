import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface MindCardSelectProps {
  id: string;
  name: string;
  shortBio: string;
  avatar: string;
  apexScore: number | null;
  selected: boolean;
  onClick: () => void;
}

export const MindCardSelect: React.FC<MindCardSelectProps> = ({
  name,
  shortBio,
  avatar,
  apexScore,
  selected,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={cn(
      "p-4 rounded-xl border cursor-pointer transition-all duration-300 relative group overflow-hidden",
      selected
        ? "bg-primary/10 border-primary"
        : "bg-card border-border hover:border-primary/50"
    )}
  >
    {selected && (
      <div className="absolute top-2 right-2 text-primary">
        <Icon name="check-circle" type="solid" />
      </div>
    )}
    <div className="flex flex-col items-center text-center gap-3">
      <Avatar className={cn("w-16 h-16 border-2", selected ? "border-primary" : "border-transparent")}>
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-muted font-bold">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-bold text-foreground text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{shortBio}</p>
      </div>
      {apexScore && (
        <div className="flex gap-2 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="crown" size="size-3" /> {Math.round(apexScore * 100)}%
          </span>
        </div>
      )}
    </div>
  </div>
);
