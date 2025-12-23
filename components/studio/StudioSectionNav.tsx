import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { STUDIO_PRIMARY, type SectionItem } from './studio-tokens';

// =============================================================================
// TYPES
// =============================================================================

export interface StudioSectionNavProps {
  /** Título do navegador */
  title?: string;
  /** Lista de seções */
  sections: SectionItem[];
  /** ID/key da seção ativa */
  activeSection: string | number;
  /** Callback ao clicar em uma seção */
  onSectionClick: (sectionId: string | number) => void;
  /** Mostrar ícone de check para seções completas */
  showCompletedIcon?: boolean;
  /** Cor primária customizada */
  primaryColor?: string;
  /** Classes adicionais */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const StudioSectionNav: React.FC<StudioSectionNavProps> = ({
  title = 'Seções',
  sections,
  activeSection,
  onSectionClick,
  showCompletedIcon = true,
  primaryColor = STUDIO_PRIMARY,
  className,
}) => {
  return (
    <div className={cn('w-64 shrink-0', className)}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <nav className="space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id || activeSection === section.key;

              return (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-primary/10 font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                  style={isActive ? { color: primaryColor } : undefined}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Icon name={section.icon} size="size-3" className="shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </div>
                  {showCompletedIcon && section.isComplete && (
                    <Icon
                      name="check-circle"
                      className="size-3 shrink-0 text-emerald-500"
                      type="solid"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// SECTION CONTENT WRAPPER
// =============================================================================

export interface StudioSectionContentProps {
  /** Ícone da seção */
  icon: string;
  /** Título da seção */
  title: string;
  /** Descrição da seção */
  description?: string;
  /** Conteúdo da seção */
  children: React.ReactNode;
  /** Cor primária customizada */
  primaryColor?: string;
}

export const StudioSectionContent: React.FC<StudioSectionContentProps> = ({
  icon,
  title,
  description,
  children,
  primaryColor = STUDIO_PRIMARY,
}) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <Icon name={icon} size="size-5" style={{ color: primaryColor }} />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

// =============================================================================
// TWO-COLUMN LAYOUT (Nav + Content)
// =============================================================================

export interface StudioTwoColumnProps {
  /** Componente de navegação (StudioSectionNav) */
  navigation: React.ReactNode;
  /** Conteúdo principal */
  children: React.ReactNode;
  /** Gap entre colunas */
  gap?: string;
  /** Classes adicionais */
  className?: string;
}

export const StudioTwoColumn: React.FC<StudioTwoColumnProps> = ({
  navigation,
  children,
  gap = 'gap-8',
  className,
}) => {
  return (
    <div className={cn('flex', gap, className)}>
      {navigation}
      <div className="flex-1 space-y-6">{children}</div>
    </div>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default StudioSectionNav;
