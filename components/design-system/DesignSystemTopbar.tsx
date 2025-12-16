import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../ui/icon';
import { DropdownNav, type NavCategory } from '../shared/module';
import { DS_PRIMARY, DS_ACCENT, DS_THEME } from './design-system-tokens';

// =============================================================================
// NAVIGATION STRUCTURE (mirrors Sidebar exactly)
// =============================================================================

const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Visão Geral',
    icon: 'home',
    items: [
      { label: 'Conceito', path: '/design/concept' },
    ],
  },
  {
    label: 'Identidade & Marca',
    icon: 'fingerprint',
    items: [
      { label: 'Identidade', path: '/design/identity' },
      { label: 'Lendário vs Medíocre', path: '/design/legendary-vs-mediocre' },
    ],
  },
  {
    label: 'Tokens',
    icon: 'cube',
    items: [
      { label: 'Cores & Temas', path: '/design/colors' },
      { label: 'Tipografia', path: '/design/typography' },
      { label: 'Espaçamentos', path: '/design/spacing' },
      { label: 'Ícones', path: '/design/icons' },
      { label: 'Motion', path: '/design/motion' },
    ],
  },
  {
    label: 'Biblioteca UI',
    icon: 'layout-fluid',
    items: [
      { label: 'Botões', path: '/design/buttons' },
      { label: 'Componentes Básicos', path: '/design/components' },
      { label: 'Cards & Boxes', path: '/design/cards' },
      { label: 'Formulários', path: '/design/forms' },
      { label: 'Tabelas', path: '/design/tables' },
      { label: 'Listas', path: '/design/lists' },
      { label: 'Estados & Loading', path: '/design/states' },
      { label: 'Feedback', path: '/design/feedback' },
      { label: 'Interações Avançadas', path: '/design/advanced' },
      { label: 'Grafos (Redes)', path: '/design/graphs' },
      { label: 'Charts (KPIs)', path: '/design/charts' },
    ],
  },
  {
    label: 'Templates & Páginas',
    icon: 'browser',
    subcategories: [
      {
        label: 'SaaS / App',
        items: [
          { label: 'CMS / Blog Manager', path: '/design/templates/cms' },
          { label: 'Kanban / Projetos', path: '/design/templates/kanban' },
          { label: 'Configurações / Perfil', path: '/design/templates/settings' },
          { label: 'Sidebar (Legacy)', path: '/design/templates/sidebar-legacy' },
        ],
      },
      {
        label: 'Marketing Templates',
        items: [
          { label: 'Guia de Copywriting', path: '/marketing/guide' },
          { label: 'Landing Page', path: '/marketing/landing' },
          { label: 'Advertorial', path: '/marketing/advertorial' },
          { label: 'Página de Vendas', path: '/marketing/sales-page' },
          { label: 'Baixar Ebook', path: '/marketing/ebook' },
          { label: 'Página VSL (Vídeo)', path: '/marketing/vsl' },
          { label: 'Registro Webinário', path: '/marketing/webinar' },
          { label: 'Obrigado / Upsell', path: '/marketing/thank-you' },
        ],
      },
      {
        label: 'Comunidade Lendária',
        items: [
          { label: 'Captura Comunidade', path: '/community/capture' },
          { label: 'Advertorial Comunidade', path: '/community/advertorial' },
          { label: 'PV Comunidade', path: '/community/sales' },
          { label: 'VSL Comunidade', path: '/community/vsl' },
          { label: 'Sequência de Emails', path: '/community/emails' },
        ],
      },
    ],
  },
  {
    label: 'Documentação',
    icon: 'book-alt',
    items: [
      { label: 'Tokens (CSS Variables)', path: '/docs/tokens' },
      { label: 'Docs Técnica', path: '/docs/general' },
      { label: 'Manual para IA', path: '/docs/ai-manual' },
    ],
  },
];

// =============================================================================
// COMPONENT
// =============================================================================

const DesignSystemTopbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Find current page label from categories
  const getCurrentLabel = (): string => {
    for (const category of NAV_CATEGORIES) {
      if (category.items) {
        const item = category.items.find(i => location.pathname === i.path);
        if (item) return item.label;
      }
      if (category.subcategories) {
        for (const sub of category.subcategories) {
          const item = sub.items.find(i => location.pathname === i.path);
          if (item) return item.label;
        }
      }
    }
    return DS_THEME.name;
  };

  return (
    <header className="h-16 border-b border-border/50 bg-[#0A0A0F]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full max-w-[1400px] mx-auto w-full px-6 md:px-12">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: DS_ACCENT,
              borderColor: `${DS_PRIMARY}30`,
              color: DS_PRIMARY
            }}
          >
            <Icon name={DS_THEME.icon} size="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none tracking-tight" style={{ color: DS_PRIMARY }}>
              {DS_THEME.name}
            </h1>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {getCurrentLabel()}
            </p>
          </div>
        </div>

        {/* Center: Navigation (using shared DropdownNav) */}
        <DropdownNav categories={NAV_CATEGORIES} primaryColor={DS_PRIMARY} />

        {/* Right: Home button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/design/concept')}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90 border"
            style={{
              borderColor: `${DS_PRIMARY}50`,
              color: DS_PRIMARY
            }}
          >
            <Icon name="home" size="size-3.5" />
            Início
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Icon name="menu-burger" size="size-5" />
        </button>
      </div>
    </header>
  );
};

export default DesignSystemTopbar;
