import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Progress } from '../ui/progress';
import { cn } from '../../lib/utils';
import { STUDIO_PRIMARY } from './studio-tokens';

// =============================================================================
// TYPES
// =============================================================================

export interface StudioLayoutProps {
  /** Componente de Topbar (ex: PRDTopbar, CreatorTopbar) */
  topbar: React.ReactNode;
  /** Componente de Sidebar (StudioSidebar) */
  sidebar?: React.ReactNode;
  /** Conteúdo principal */
  children: React.ReactNode;
  /** Classes adicionais para o container */
  className?: string;
}

export interface StudioHeaderProps {
  /** Título da página/fase */
  title: string;
  /** Descrição/subtítulo */
  description?: string;
  /** Porcentagem de progresso (0-100) */
  progress?: number;
  /** Mostrar botão de salvar */
  showSave?: boolean;
  /** Está salvando? */
  isSaving?: boolean;
  /** Callback do botão salvar */
  onSave?: () => void;
  /** Ações adicionais (direita) */
  actions?: React.ReactNode;
  /** Cor primária customizada */
  primaryColor?: string;
}

export interface StudioContentProps {
  /** Conteúdo principal */
  children: React.ReactNode;
  /** Largura máxima (default: max-w-4xl) */
  maxWidth?: string;
  /** Padding customizado */
  padding?: string;
  /** Classes adicionais */
  className?: string;
}

export interface StudioFooterProps {
  /** Conteúdo à esquerda */
  left?: React.ReactNode;
  /** Conteúdo central */
  center?: React.ReactNode;
  /** Conteúdo à direita */
  right?: React.ReactNode;
  /** Classes adicionais */
  className?: string;
}

// =============================================================================
// LAYOUT COMPONENT
// =============================================================================

export const StudioLayout: React.FC<StudioLayoutProps> = ({
  topbar,
  sidebar,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col min-h-screen bg-background font-sans", className)}>
      {topbar}
      <div className="flex flex-1 overflow-hidden">
        {sidebar}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// HEADER COMPONENT
// =============================================================================

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  title,
  description,
  progress,
  showSave = true,
  isSaving = false,
  onSave,
  actions,
  primaryColor = STUDIO_PRIMARY,
}) => {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        {progress !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Progresso:</span>
            <Progress value={progress} className="w-24 h-2" />
            <span className="font-mono text-xs">{progress}%</span>
          </div>
        )}
        {showSave && onSave && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Icon name="spinner" className="mr-2 size-4 animate-spin" />
            ) : (
              <Icon name="disk" className="mr-2 size-4" />
            )}
            Salvar
          </Button>
        )}
        {actions}
      </div>
    </div>
  );
};

// =============================================================================
// CONTENT COMPONENT
// =============================================================================

export const StudioContent: React.FC<StudioContentProps> = ({
  children,
  maxWidth = 'max-w-4xl',
  padding = 'p-8',
  className,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className={cn(maxWidth, 'mx-auto', padding, className)}>
        {children}
      </div>
    </div>
  );
};

// =============================================================================
// FOOTER COMPONENT
// =============================================================================

export const StudioFooter: React.FC<StudioFooterProps> = ({
  left,
  center,
  right,
  className,
}) => {
  return (
    <div className={cn("flex justify-between items-center pt-4 border-t border-border", className)}>
      <div>{left}</div>
      <div>{center}</div>
      <div>{right}</div>
    </div>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default StudioLayout;
