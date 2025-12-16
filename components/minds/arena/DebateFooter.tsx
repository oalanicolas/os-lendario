import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

interface DebateFooterProps {
  clone1Name: string;
  clone2Name: string;
  userVoted: boolean;
  onVote: (clone: 'c1' | 'c2') => void;
  onExit: () => void;
}

export const DebateFooter: React.FC<DebateFooterProps> = ({
  clone1Name,
  clone2Name,
  userVoted,
  onVote,
  onExit,
}) => {
  return (
    <div className="p-4 border-t border-border bg-card flex justify-between items-center">
      <Button variant="ghost" onClick={onExit} className="text-muted-foreground hover:text-foreground">
        <Icon name="arrow-left" className="mr-2" /> Sair
      </Button>
      <div className="flex gap-4">
        <Button
          variant={userVoted ? "outline" : "default"}
          className={cn(userVoted ? "opacity-50" : "bg-white text-background hover:bg-primary/90")}
          onClick={() => onVote('c1')}
          disabled={userVoted}
        >
          Vote {clone1Name}
        </Button>
        <Button
          variant={userVoted ? "outline" : "default"}
          className={cn(userVoted ? "opacity-50" : "bg-white text-background hover:bg-primary/90")}
          onClick={() => onVote('c2')}
          disabled={userVoted}
        >
          Vote {clone2Name}
        </Button>
      </div>
    </div>
  );
};
