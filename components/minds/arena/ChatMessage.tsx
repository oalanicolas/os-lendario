import React from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';

interface ChatMessageProps {
  user: string;
  text: string;
  time: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ user, text, time }) => (
  <div className="flex animate-fade-in gap-3 text-sm">
    <Avatar className="h-6 w-6 border border-border">
      <AvatarFallback className="bg-muted text-[9px] text-muted-foreground">
        {user.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div>
      <div className="mb-0.5 flex items-center gap-2">
        <span className="text-xs font-bold text-foreground">{user}</span>
        <span className="text-[10px] text-muted-foreground">{time}</span>
      </div>
      <p className="leading-snug text-muted-foreground">{text}</p>
    </div>
  </div>
);
