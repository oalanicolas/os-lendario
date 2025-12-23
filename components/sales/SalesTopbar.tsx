import React from 'react';
import { Section } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface SalesTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const SalesTopbar: React.FC<SalesTopbarProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { label: 'Dashboard', icon: 'apps', section: Section.TEMPLATE_SALES_DASHBOARD },
    { label: 'Calls', icon: 'headset', section: Section.TEMPLATE_SALES_CALLS },
    { label: 'Objeções', icon: 'shield-exclamation', section: Section.TEMPLATE_SALES_OBJECTIONS },
    { label: 'Marketing', icon: 'megaphone', section: Section.TEMPLATE_SALES_MARKETING },
    { label: 'Produto', icon: 'box', section: Section.TEMPLATE_SALES_PRODUCT },
    { label: 'Configurações', icon: 'settings', section: Section.TEMPLATE_SALES_SETTINGS },
  ];

  return (
    <div className="sticky top-0 z-40 h-16 w-full border-b border-border bg-card font-sans shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-red font-bold text-white shadow-[0_0_10px_rgba(255,59,48,0.2)]">
              <Icon name="chart-histogram" size="size-4" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold leading-none tracking-tight">Sales Intelligence</h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Enterprise
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
                      ? 'bg-brand-red/10 text-brand-red'
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

        {/* Right: Actions (User moved to Sidebar) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-muted-foreground transition-colors hover:text-brand-red">
              <Icon name="bell" size="size-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-card bg-brand-red"></span>
            </button>
            <button className="p-2 text-muted-foreground transition-colors hover:text-brand-red">
              <Icon name="search" size="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTopbar;
