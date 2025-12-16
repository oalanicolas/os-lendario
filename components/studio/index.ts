/**
 * Shared Studio Components
 *
 * Componentes reutilizáveis para Course Creator e PRD Studio.
 */

// Tokens
export * from './studio-tokens';

// Layout Components
export { StudioLayout, StudioHeader, StudioContent, StudioFooter } from './StudioLayout';
export type { StudioLayoutProps, StudioHeaderProps, StudioContentProps, StudioFooterProps } from './StudioLayout';

// Sidebar
export { StudioSidebar } from './StudioSidebar';
export type { StudioSidebarProps } from './StudioSidebar';

// Section Navigation
export { StudioSectionNav, StudioSectionContent, StudioTwoColumn } from './StudioSectionNav';
export type { StudioSectionNavProps, StudioSectionContentProps, StudioTwoColumnProps } from './StudioSectionNav';
