import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Section } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { STUDIO_PRIMARY, STUDIO_ACCENT } from './studio-tokens';

interface CreatorTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const CreatorTopbar: React.FC<CreatorTopbarProps> = ({ currentSection, setSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Cursos',
      icon: 'graduation-cap',
      section: Section.APP_CREATOR_COURSES,
      path: '/creator/cursos',
    },
    {
      label: 'Pipeline',
      icon: 'sitemap',
      section: Section.APP_CREATOR_CONTENT,
      path: '/creator/pipeline',
    },
    {
      label: 'Personas',
      icon: 'users-alt',
      section: Section.APP_CREATOR_PERSONAS,
      path: '/creator/personas',
    },
    {
      label: 'Frameworks',
      icon: 'layer-group',
      section: Section.APP_CREATOR_FRAMEWORKS,
      path: '/creator/frameworks',
    },
    {
      label: 'Performance',
      icon: 'chart-histogram',
      section: Section.APP_CREATOR_PERFORMANCE,
      path: '/creator/performance',
    },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.section) {
      setSection(item.section);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border/50 bg-[#0A0A0F]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-12">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: STUDIO_ACCENT,
              borderColor: `${STUDIO_PRIMARY}30`,
              color: STUDIO_PRIMARY,
            }}
          >
            <Icon name="graduation-cap" size="size-5" />
          </div>
          <div>
            <h1
              className="text-sm font-bold leading-none tracking-tight"
              style={{ color: STUDIO_ACCENT }}
            >
              Course Creator <span style={{ color: STUDIO_PRIMARY }}>Studio</span>
            </h1>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Gestão de Conteúdo Educacional
            </p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden items-center md:flex">
          <div
            className="flex items-center rounded-xl border p-1.5"
            style={{
              backgroundColor: `${STUDIO_PRIMARY}10`,
              borderColor: `${STUDIO_PRIMARY}30`,
            }}
          >
            {navItems.map((item, index) => {
              const isActive =
                currentSection === item.section || location.pathname.startsWith(item.path || '');
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  disabled={!item.section}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                    isActive ? 'bg-background shadow-sm' : 'hover:bg-studio-primary/20',
                    !item.section && 'cursor-not-allowed opacity-50'
                  )}
                  style={{ color: STUDIO_PRIMARY }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/creator/cursos/novo')}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: STUDIO_PRIMARY,
              boxShadow: `0 10px 15px -3px ${STUDIO_PRIMARY}30`,
            }}
          >
            <Icon name="plus" size="size-4" />
            Novo Curso
          </button>
        </div>
      </div>
    </header>
  );
};

export default CreatorTopbar;
