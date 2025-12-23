import React from 'react';
import { Section } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface MindsTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const MindsTopbar: React.FC<MindsTopbarProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { label: 'Mentes', icon: 'grid', section: Section.APP_MINDS_GALLERY },
    { label: 'Arena', icon: 'bolt', section: Section.APP_MINDS_ARENA },
    { label: 'Pipeline', icon: 'process', section: Section.APP_MINDS_PROFILE },
    { label: 'DNA Mental', icon: 'scale', section: Section.APP_MINDS_MATRIX },
  ];

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-card font-sans shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/20 font-bold text-primary shadow-[0_0_10px_rgba(48,176,199,0.2)]">
              <Icon name="brain" size="size-5" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold leading-none tracking-tight">Mentes Sintéticas</h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Cognitive Core
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => {
              const isActive = currentSection === item.section;
              return (
                <button
                  key={index}
                  onClick={() => item.section && setSection(item.section)}
                  disabled={!item.section}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    !item.section && 'cursor-not-allowed opacity-50'
                  )}
                >
                  <Icon name={item.icon} size="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
              <Icon name="bell" size="size-5" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindsTopbar;
