
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
    <div className="h-16 border-b border-border bg-card sticky top-0 z-40 shadow-sm font-sans w-full">
      <div className="flex items-center justify-between px-6 h-full max-w-[1400px] mx-auto w-full">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-brand-red rounded-sm flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(255,59,48,0.2)]">
               <Icon name="chart-histogram" size="size-4" />
             </div>
             <div className="hidden md:block">
               <h1 className="text-sm font-bold leading-none tracking-tight">Sales Intelligence</h1>
               <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Enterprise</p>
             </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = currentSection === item.section;
              return (
                <button
                  key={index}
                  onClick={() => item.section && setSection(item.section)}
                  disabled={!item.section}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-brand-red/10 text-brand-red" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    !item.section && "opacity-50 cursor-not-allowed"
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
              <button className="p-2 text-muted-foreground hover:text-brand-red transition-colors relative">
                  <Icon name="bell" size="size-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full border-2 border-card"></span>
              </button>
              <button className="p-2 text-muted-foreground hover:text-brand-red transition-colors">
                  <Icon name="search" size="size-5" />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTopbar;
