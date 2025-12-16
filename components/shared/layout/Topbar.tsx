
import React from 'react';
import { Page } from '../../../types';
import { Icon } from '../../ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';

interface TopbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Topbar: React.FC<TopbarProps> = ({ currentPage, setPage }) => {

  const navItems = [
    { page: Page.DASHBOARD, icon: 'apps' },
    { page: Page.CALLS, icon: 'headset' },
    { page: Page.OBJECTIONS, icon: 'shield-exclamation' },
    { page: Page.MARKETING, icon: 'megaphone' },
    { page: Page.PRODUCT, icon: 'box' },
    { page: Page.SETTINGS, icon: 'settings' },
  ];

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-red rounded-sm flex items-center justify-center text-white font-bold font-display text-xl shadow-[0_0_10px_rgba(255,59,48,0.2)]">
            SI
          </div>
          <div className="leading-none hidden md:block">
            <h1 className="font-display font-bold text-lg tracking-wider text-foreground">Sales</h1>
            <p className="font-mono text-[10px] text-brand-red tracking-[0.2em] uppercase">Intelligence</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => setPage(item.page)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 border border-transparent",
                  isActive
                    ? "bg-brand-red/10 text-brand-red border-brand-red/20 shadow-[0_0_10px_rgba(255,59,48,0.1)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon name={item.icon} size="size-4" />
                <span className="font-display tracking-wide">{item.page}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <button className="relative p-2 text-muted-foreground hover:text-brand-red transition-colors">
                <Icon name="bell" size="size-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            </button>
            <button className="p-2 text-muted-foreground hover:text-brand-red transition-colors">
                <Icon name="search" size="size-5" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
