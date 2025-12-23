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
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-md">
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-red font-display text-xl font-bold text-white shadow-[0_0_10px_rgba(255,59,48,0.2)]">
            SI
          </div>
          <div className="hidden leading-none md:block">
            <h1 className="font-display text-lg font-bold tracking-wider text-foreground">Sales</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-red">
              Intelligence
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => setPage(item.page)}
                className={cn(
                  'flex items-center gap-2 rounded-sm border border-transparent px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'border-brand-red/20 bg-brand-red/10 text-brand-red shadow-[0_0_10px_rgba(255,59,48,0.1)]'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
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
          <button className="relative p-2 text-muted-foreground transition-colors hover:text-brand-red">
            <Icon name="bell" size="size-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-brand-red"></span>
          </button>
          <button className="p-2 text-muted-foreground transition-colors hover:text-brand-red">
            <Icon name="search" size="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
