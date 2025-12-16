import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Section } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { PRD_PRIMARY, PRD_ACCENT } from './prd-tokens';

interface PRDTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const PRDTopbar: React.FC<PRDTopbarProps> = ({ currentSection, setSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Projetos', icon: 'folder', section: Section.STUDIO_PRD_DASHBOARD, path: '/prd' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.section) {
      setSection(item.section);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  // Check if we're on the "novo" page to hide the button
  const isNewProjectPage = location.pathname === '/prd/novo';

  return (
    <header className="h-16 border-b border-border/50 bg-[#0A0A0F]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full max-w-[1400px] mx-auto w-full px-6 md:px-12">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: PRD_ACCENT,
              borderColor: `${PRD_PRIMARY}30`,
              color: PRD_PRIMARY
            }}
          >
            <Icon name="clipboard-list" size="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none tracking-tight" style={{ color: PRD_ACCENT }}>
              PRD <span style={{ color: PRD_PRIMARY }}>Studio</span>
            </h1>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Documentos de Requisitos
            </p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center">
          <div
            className="flex items-center rounded-xl p-1.5 border"
            style={{
              backgroundColor: `${PRD_PRIMARY}10`,
              borderColor: `${PRD_PRIMARY}30`
            }}
          >
            {navItems.map((item, index) => {
              const isActive = currentSection === item.section ||
                (item.path === '/prd' && location.pathname === '/prd');
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  disabled={!item.section}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-background shadow-sm"
                      : "hover:bg-[#538096]/20",
                    !item.section && "opacity-50 cursor-not-allowed"
                  )}
                  style={{ color: PRD_PRIMARY }}
                >
                  <span className="flex items-center gap-2">
                    <Icon name={item.icon} size="size-4" />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {!isNewProjectPage && (
            <button
              onClick={() => navigate('/prd/novo')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: PRD_PRIMARY,
                boxShadow: `0 10px 15px -3px ${PRD_PRIMARY}30`
              }}
            >
              <Icon name="plus" size="size-4" />
              <span className="hidden sm:inline">Novo Projeto</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Icon name="menu-burger" size="size-5" />
        </button>
      </div>
    </header>
  );
};

export default PRDTopbar;
