
import React from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';

interface ChatMessageProps { 
    user: string;
    text: string;
    time: string; 
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ user, text, time }) => (
  <div className="flex gap-3 text-sm animate-fade-in">
    <Avatar className="w-6 h-6 border border-border">
      <AvatarFallback className="bg-muted text-[9px] text-muted-foreground">
        {user.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div>
      <div className="flex items-center gap-2 mb-0.5">
        <span className="font-bold text-foreground text-xs">{user}</span>
        <span className="text-[10px] text-muted-foreground">{time}</span>
      </div>
      <p className="text-muted-foreground leading-snug">{text}</p>
    </div>
  </div>
);
