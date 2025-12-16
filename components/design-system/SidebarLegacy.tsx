
import React, { useState, useEffect } from 'react';
import { Section, Language } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { THEMES, ThemeName } from '../../lib/theme';
import { Popover } from '../ui/popover'; 

interface SidebarLegacyProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  currentThemeName: ThemeName;
  setThemeName: (t: ThemeName) => void;
  currentLanguage: Language;
  setLanguage: (l: Language) => void;
  isMobileOpen: boolean;
  closeMobileMenu: () => void;
  className?: string; // Added for demo positioning
}

interface NavItem {
  key: string; // Translation key
  icon?: string; // Optional for deeper levels
  section?: Section;
  children?: NavItem[];
}

const SidebarLegacy: React.FC<SidebarLegacyProps> = ({ 
    currentSection, 
    setSection, 
    isDark, 
    toggleTheme, 
    isCollapsed, 
    toggleCollapse,
    currentThemeName,
    setThemeName,
    currentLanguage,
    setLanguage,
    isMobileOpen,
    closeMobileMenu,
    className
}) => {
  // Default expanded menus - Empty by default now
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Translation Dictionary
  const translations: Record<Language, Record<string, string>> = {
    pt: {
        // Main Menu Items
        'app_culture': 'Cultura Lendária',
        'app_challenges': 'Desafios',
        'app_minds': 'Mentes Sintéticas',
        'app_prompt_ops': 'Prompt Ops',
        'app_creator': 'Course Creator',
        'app_finance': 'Central de Custos',
        'app_comms': 'Central de Comunicação',
        'app_sales': 'Sales Intelligence',
        'design_system_root': 'Design System',
        
        // Course Creator
        'creator_courses': 'Cursos (LMS)',
        'creator_cms': 'Blog & Conteúdo',

        // Design System Subgroups
        'ds_overview': 'Visão Geral',
        'ds_identity': 'Identidade & Marca',
        'ds_foundations': 'Fundamentos (Tokens)',
        'ds_components': 'Biblioteca UI',
        'ds_templates': 'Templates & Páginas',
        'ds_docs': 'Documentação',

        // Items
        'overview': 'Conceito',
        'verbal_identity': 'Identidade Verbal',
        'identity': 'Identidade',
        'legendary_vs_mediocre': 'Lendário vs Medíocre',
        'colors': 'Cores & Temas',
        'typography': 'Tipografia',
        'spacing': 'Espaçamentos',
        'icons': 'Ícones',
        'lists': 'Listas',
        'motion': 'Motion',
        'graphs': 'Grafos (Redes)',
        'charts': 'Charts (KPIs)',
        'components': 'Componentes Básicos',
        'buttons': 'Botões',
        'advanced': 'Interações Avançadas',
        'feedback': 'Feedback',
        'states': 'Estados & Loading',
        'cards': 'Cards & Boxes',
        'forms': 'Formulários',
        'tables': 'Tabelas',
        'marketing_kit': 'Marketing Studio',
        'community_kit': 'Comunidade Lendária',
        'templates_app': 'SaaS / App',
        'tpl_app_cms': 'CMS / Blog Manager',
        'tpl_app_kanban': 'Kanban / Projetos',
        'tpl_app_settings': 'Configurações / Perfil',
        'tpl_landing': 'Landing Page',
        'tpl_advertorial': 'Advertorial',
        'tpl_sales': 'Página de Vendas',
        'tpl_ebook': 'Baixar Ebook',
        'tpl_vsl': 'Página VSL (Vídeo)',
        'tpl_webinar': 'Registro Webinário',
        'tpl_thankyou': 'Obrigado / Upsell',
        'tpl_emails': 'Sequência de Emails',
        'tpl_comm_adv': 'Advertorial Comunidade',
        'tpl_comm_sales': 'PV Comunidade',
        'tpl_comm_capture': 'Captura Comunidade',
        'tpl_comm_vsl': 'VSL Comunidade',
        'marketing_guide': 'Guia de Copywriting',
        'tokens': 'Tokens (CSS Variables)',
        'technical': 'Docs Técnica',
        'ai_manual': 'Manual para IA',
        'lang_select': 'Selecionar Idioma',
        'theme_select': 'Selecionar Cor'
    },
    en: {
        'app_culture': 'Legendary Culture',
        'app_challenges': 'Challenges',
        'app_minds': 'Synthetic Minds',
        'app_prompt_ops': 'Prompt Ops',
        'app_creator': 'Course Creator',
        'app_finance': 'Cost Center',
        'app_comms': 'Communication Hub',
        'app_sales': 'Sales Intelligence',
        'creator_courses': 'Courses (LMS)',
        'creator_cms': 'Blog & Content',
        'design_system_root': 'Design System',
        'ds_overview': 'Overview',
        'ds_identity': 'Identity & Brand',
        'ds_foundations': 'Foundations',
        'ds_components': 'UI Library',
        'ds_templates': 'Templates',
        'ds_docs': 'Documentation',
        'overview': 'Concept',
        'verbal_identity': 'Verbal Identity',
        'identity': 'Identity',
        'legendary_vs_mediocre': 'Legendary vs Mediocre',
        'colors': 'Colors & Themes',
        'typography': 'Typography',
        'spacing': 'Spacing',
        'icons': 'Icons',
        'lists': 'Lists',
        'motion': 'Motion',
        'graphs': 'Graphs (Network)',
        'charts': 'Charts (KPIs)',
        'components': 'Basic Components',
        'buttons': 'Buttons',
        'advanced': 'Advanced Interactions',
        'feedback': 'Feedback',
        'states': 'States & Loading',
        'cards': 'Cards & Boxes',
        'forms': 'Forms',
        'tables': 'Tables',
        'marketing_kit': 'Marketing Studio',
        'community_kit': 'Legendary Community',
        'templates_app': 'SaaS / App',
        'tpl_app_cms': 'CMS / Blog Manager',
        'tpl_app_kanban': 'Kanban / Projects',
        'tpl_app_settings': 'Settings / Profile',
        'tpl_landing': 'Landing Page',
        'tpl_advertorial': 'Advertorial',
        'tpl_sales': 'Sales Page',
        'tpl_ebook': 'Download Ebook',
        'tpl_vsl': 'VSL Page (Video)',
        'tpl_webinar': 'Webinar Reg.',
        'tpl_thankyou': 'Thank You / Upsell',
        'tpl_emails': 'Email Sequence',
        'tpl_comm_adv': 'Comm. Advertorial',
        'tpl_comm_sales': 'Comm. Sales Page',
        'tpl_comm_capture': 'Comm. Capture',
        'tpl_comm_vsl': 'Comm. VSL',
        'marketing_guide': 'Copywriting Guide',
        'tokens': 'Tokens',
        'technical': 'Technical Docs',
        'ai_manual': 'AI Manual',
        'lang_select': 'Select Language',
        'theme_select': 'Select Color'
    },
    es: {
        'app_culture': 'Cultura Legendaria',
        'app_challenges': 'Desafíos',
        'app_minds': 'Mentes Sintéticas',
        'app_prompt_ops': 'Prompt Ops',
        'app_creator': 'Course Creator',
        'app_finance': 'Central de Costos',
        'app_comms': 'Central de Comunicación',
        'app_sales': 'Sales Intelligence',
        'creator_courses': 'Cursos (LMS)',
        'creator_cms': 'Blog y Contenido',
        'design_system_root': 'Design System',
        'ds_overview': 'Visión General',
        'ds_identity': 'Identidad y Marca',
        'ds_foundations': 'Fundamentos',
        'ds_components': 'Biblioteca UI',
        'ds_templates': 'Plantillas',
        'ds_docs': 'Documentación',
        'overview': 'Concepto',
        'verbal_identity': 'Identidad Verbal',
        'identity': 'Identidad',
        'legendary_vs_mediocre': 'Legendario vs Mediocre',
        'colors': 'Colores y Temas',
        'typography': 'Tipografía',
        'spacing': 'Espaciado',
        'icons': 'Iconos',
        'lists': 'Listas',
        'motion': 'Movimiento',
        'graphs': 'Grafos (Redes)',
        'charts': 'Gráficos (KPIs)',
        'components': 'Componentes Básicos',
        'buttons': 'Botones',
        'advanced': 'Interacciones Avanzadas',
        'feedback': 'Feedback',
        'states': 'Estados y Carga',
        'cards': 'Tarjetas y Cajas',
        'forms': 'Formularios',
        'tables': 'Tablas',
        'marketing_kit': 'Marketing Studio',
        'community_kit': 'Comunidad Legendaria',
        'templates_app': 'SaaS / App',
        'tpl_app_cms': 'CMS / Blog Manager',
        'tpl_app_kanban': 'Kanban / Proyectos',
        'tpl_app_settings': 'Configuración / Perfil',
        'tpl_landing': 'Landing Page',
        'tpl_advertorial': 'Advertorial',
        'tpl_sales': 'Página de Ventas',
        'tpl_ebook': 'Descargar Ebook',
        'tpl_vsl': 'Página VSL (Video)',
        'tpl_webinar': 'Registro Webinario',
        'tpl_thankyou': 'Gracias / Upsell',
        'tpl_emails': 'Secuencia de Correos',
        'tpl_comm_adv': 'Advertorial Com.',
        'tpl_comm_sales': 'Ventas Com.',
        'tpl_comm_capture': 'Captura Com.',
        'tpl_comm_vsl': 'VSL Com.',
        'marketing_guide': 'Guía de Copywriting',
        'tokens': 'Tokens',
        'technical': 'Documentación Técnica',
        'ai_manual': 'Manual IA',
        'lang_select': 'Seleccionar Idioma',
        'theme_select': 'Seleccionar Color'
    }
  };

  const t = (key: string) => translations[currentLanguage][key] || key;

  // Updated Navigation Structure
  const navStructure: NavItem[] = [
    // ... (previous items)
    // 1. Cultura Lendária
    { 
        key: 'app_culture', 
        icon: 'crown', 
        section: Section.LEGENDARY_VS_MEDIOCRE 
    },
    // 2. Desafios
    {
        key: 'app_challenges',
        icon: 'trophy',
        section: Section.EXTERNAL_CHALLENGES
    },
    // 3. Mentes Sintéticas
    { 
        key: 'app_minds', 
        icon: 'brain', 
        section: Section.APP_MINDS_GALLERY 
    },
    // 4. Prompt Ops
    {
        key: 'app_prompt_ops',
        icon: 'terminal',
        section: Section.EXTERNAL_PROMPT_OPS
    },
    // 5. Course Creator
    { 
        key: 'app_creator', 
        icon: 'magic-wand',
        section: Section.APP_CREATOR_COURSES
    },
    // 6. Central de Custos
    { 
        key: 'app_finance', 
        icon: 'coins', 
        section: Section.CHARTS 
    },
    // 7. Central de Comunicação
    { 
        key: 'app_comms', 
        icon: 'comment-alt', 
        section: Section.TEMPLATE_COMMUNITY_EMAILS 
    },
    // 8. Sales Intelligence
    { 
        key: 'app_sales', 
        icon: 'chart-histogram', 
        section: Section.TEMPLATE_SALES_DASHBOARD 
    },
    
    // 9. Design System (Hub Completo)
    {
        key: 'design_system_root',
        icon: 'layout-fluid',
        children: [
            // Visão Geral
            { 
                key: 'ds_overview', 
                icon: 'home',
                children: [
                    { key: 'overview', section: Section.CONCEPT },
                ]
            },
            // Identidade
            { 
                key: 'ds_identity', 
                icon: 'fingerprint', 
                children: [
                    { key: 'identity', section: Section.IDENTITY },
                    { key: 'legendary_vs_mediocre', section: Section.LEGENDARY_VS_MEDIOCRE },
                ]
            },
            // Fundamentos
            { 
                key: 'ds_foundations', 
                icon: 'cube', 
                children: [
                    { key: 'colors', section: Section.COLORS },
                    { key: 'typography', section: Section.TYPOGRAPHY },
                    { key: 'spacing', section: Section.SPACING },
                    { key: 'icons', section: Section.ICONS },
                    { key: 'motion', section: Section.MOTION },
                ]
            },
            // Componentes
            {
                key: 'ds_components',
                icon: 'layout-fluid',
                children: [
                    { key: 'buttons', section: Section.BUTTONS },
                    { key: 'components', section: Section.COMPONENTS },
                    { key: 'cards', section: Section.CARDS },
                    { key: 'forms', section: Section.FORMS },
                    { key: 'tables', section: Section.TABLES },
                    { key: 'lists', section: Section.LISTS },
                    { key: 'states', section: Section.STATES },
                    { key: 'feedback', section: Section.FEEDBACK },
                    { key: 'advanced', section: Section.ADVANCED },
                    { key: 'graphs', section: Section.GRAPHS },
                    { key: 'charts', section: Section.CHARTS },
                ]
            },
            // Templates
            {
                key: 'ds_templates',
                icon: 'browser',
                children: [
                    { 
                        key: 'templates_app', 
                        children: [
                            { key: 'tpl_app_cms', section: Section.TEMPLATE_APP_CMS },
                            { key: 'tpl_app_kanban', section: Section.TEMPLATE_APP_KANBAN },
                            { key: 'tpl_app_settings', section: Section.TEMPLATE_APP_SETTINGS },
                        ]
                    },
                    { 
                        key: 'marketing_kit', 
                        children: [
                            { key: 'marketing_guide', section: Section.MARKETING_GUIDE },
                            { key: 'tpl_landing', section: Section.TEMPLATE_LANDING },
                            { key: 'tpl_advertorial', section: Section.TEMPLATE_ADVERTORIAL },
                            { key: 'tpl_sales', section: Section.TEMPLATE_SALES },
                            { key: 'tpl_ebook', section: Section.TEMPLATE_EBOOK },
                            { key: 'tpl_vsl', section: Section.TEMPLATE_VSL },
                            { key: 'tpl_webinar', section: Section.TEMPLATE_WEBINAR },
                            { key: 'tpl_thankyou', section: Section.TEMPLATE_THANKYOU },
                        ]
                    },
                    {
                        key: 'community_kit',
                        children: [
                            { key: 'tpl_comm_capture', section: Section.TEMPLATE_COMMUNITY_CAPTURE },
                            { key: 'tpl_comm_adv', section: Section.TEMPLATE_COMMUNITY_ADVERTORIAL },
                            { key: 'tpl_comm_sales', section: Section.TEMPLATE_COMMUNITY_SALES },
                            { key: 'tpl_comm_vsl', section: Section.TEMPLATE_COMMUNITY_VSL },
                            { key: 'tpl_emails', section: Section.TEMPLATE_COMMUNITY_EMAILS },
                        ]
                    },
                ]
            },
            // Documentação
            { 
                key: 'ds_docs', 
                icon: 'book-alt', 
                children: [
                    { key: 'tokens', section: Section.TOKENS },
                    { key: 'technical', section: Section.DOCS },
                    { key: 'ai_manual', section: Section.AI_MANUAL },
                ]
            },
        ]
    }
  ];

  // Logic to auto-expand Design System if visiting an internal page
  useEffect(() => {
    const isDesignSystemPage = Object.values(Section).some(s => s === currentSection) && 
        navStructure.find(n => n.key === 'design_system_root')?.children?.some(group => 
            group.children?.some(child => child.section === currentSection) || 
            group.children?.some(subgroup => subgroup.children?.some(item => item.section === currentSection))
        );

    if (isDesignSystemPage) {
        setExpandedMenus(prev => {
            if (!prev.includes('design_system_root')) {
                return [...prev, 'design_system_root'];
            }
            return prev;
        });
    }
  }, [currentSection]);

  const toggleSubmenu = (key: string) => {
    if (isCollapsed) {
        toggleCollapse(); // Auto-expand sidebar if trying to open submenu
        setExpandedMenus([...expandedMenus, key]);
    } else {
        setExpandedMenus(prev => 
            prev.includes(key) 
                ? prev.filter(l => l !== key) 
                : [...prev, key]
        );
    }
  };

  // Recursive check for active state
  const isSubmenuActive = (item: NavItem): boolean => {
    if (item.section === currentSection) return true;
    
    // SPECIAL CASE: If in any sales template, "Sales Intelligence" parent should be active
    if (item.key === 'app_sales' && currentSection.startsWith('template_sales')) return true;
    
    // SPECIAL CASE: If in any minds template, "Mentes Sintéticas" parent should be active
    if (item.key === 'app_minds' && currentSection.startsWith('app_minds')) return true;

    // SPECIAL CASE: Course Creator active
    if (item.key === 'app_creator' && currentSection.startsWith('app_creator')) return true;

    if (item.children) {
        return item.children.some(child => isSubmenuActive(child));
    }
    return false;
  };

  const handleSectionClick = (section: Section) => {
      setSection(section);
      closeMobileMenu(); 
  };

  // Recursive Render Function for Nav Items
  const renderNavItem = (item: NavItem, depth = 0) => {
      const hasChildren = item.children && item.children.length > 0;
      
      // Active Logic
      const isSalesAppActive = item.key === 'app_sales' && currentSection.startsWith('template_sales');
      const isMindsAppActive = item.key === 'app_minds' && currentSection.startsWith('app_minds');
      const isCreatorAppActive = item.key === 'app_creator' && currentSection.startsWith('app_creator');
      const isActive = item.section === currentSection || isSalesAppActive || isMindsAppActive || isCreatorAppActive;
      
      const isExpanded = expandedMenus.includes(item.key);
      const isParentActive = isSubmenuActive(item); // Highlight parent if child is active
      const label = t(item.key);

      // Alignment Logic
      const paddingLeftClass = depth === 0 ? 'px-3' : `pl-${3 + (depth * 3)}`; 
      const alignmentClass = isCollapsed ? 'justify-center px-2' : `justify-between ${paddingLeftClass}`;

      // Styling for Root vs Nested
      const isRootItem = depth === 0;

      if (hasChildren) {
          return (
              <li key={item.key} className="mb-1">
                  <button
                      onClick={() => toggleSubmenu(item.key)}
                      className={cn(
                          "w-full flex items-center py-2.5 rounded-lg text-sm transition-all duration-200 group relative",
                          alignmentClass,
                          isRootItem ? "font-semibold text-foreground hover:bg-muted/50" : "text-sm text-muted-foreground hover:text-foreground",
                          // Active logic for parent groups
                          isParentActive && !isExpanded && !isRootItem
                              ? "text-primary font-medium" 
                              : "",
                          // Root item active logic (e.g. Design System root when inside)
                          isRootItem && isParentActive 
                              ? "bg-muted/30"
                              : ""
                      )}
                      title={isCollapsed ? label : undefined}
                  >
                      <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "gap-3")}>
                          {item.icon && (
                              <Icon 
                                  name={item.icon} 
                                  size={isRootItem ? "size-5" : "size-4"} 
                                  className={cn(
                                      isParentActive && isRootItem ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                  )} 
                              />
                          )}
                          {!isCollapsed && <span>{label}</span>}
                      </div>
                      {!isCollapsed && (
                          <Icon 
                              name="angle-small-down" 
                              className={cn(
                                  "transition-transform duration-200 opacity-50 size-4", 
                                  isExpanded ? "rotate-180" : ""
                              )} 
                          />
                      )}
                  </button>
                  
                  <div 
                      className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-in-out",
                          isExpanded && !isCollapsed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                  >
                      <div className="overflow-hidden">
                          <ul className={cn("space-y-1 pb-1", isRootItem && "mt-1")}>
                              {item.children!.map(child => renderNavItem(child, depth + 1))}
                          </ul>
                      </div>
                  </div>
              </li>
          );
      }

      // Leaf Item (Link)
      return (
          <li key={item.key} className="mb-1">
              <button
                  onClick={() => item.section && handleSectionClick(item.section)}
                  className={cn(
                      "w-full text-left py-2 rounded-lg text-sm transition-all duration-200 flex items-center",
                      isCollapsed ? "justify-center px-2" : `gap-3 ${paddingLeftClass}`,
                      
                      // ROOT ITEMS
                      isRootItem && isActive 
                          ? "bg-primary text-primary-foreground shadow-sm font-bold" 
                          : isRootItem 
                              ? "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                              
                      // NESTED ITEMS
                          : isActive 
                              ? "text-primary font-medium bg-primary/5 border-r-2 border-primary rounded-r-none"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                  title={isCollapsed ? label : undefined}
              >
                  {item.icon ? (
                      <Icon 
                          name={item.icon} 
                          size={isRootItem ? "size-5" : "size-4"} 
                          className={cn(
                              isRootItem && isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                              !isRootItem && isActive && "text-primary"
                          )}
                      />
                  ) : (
                      // Bullet for items without icon (deep nested)
                      <div className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0", 
                          !isCollapsed && "ml-1.5 mr-1", 
                          isActive ? "bg-primary" : "bg-border group-hover:bg-muted-foreground"
                      )} />
                  )}
                  
                  {!isCollapsed && label}
              </button>
          </li>
      );
  };

  // Language Options
  const languages: { code: Language; label: string; flag: string }[] = [
      { code: 'pt', label: 'Português', flag: '🇧🇷' },
      { code: 'en', label: 'English', flag: '🇺🇸' },
      { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <>
    {/* Overlay for Mobile */}
    {isMobileOpen && (
        <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden animate-fade-in"
            onClick={closeMobileMenu}
        />
    )}

    <aside 
        className={cn(
            "fixed left-0 top-0 h-full border-r border-border bg-card z-50 transition-all duration-300 flex flex-col shadow-2xl md:shadow-none overflow-visible",
            // Desktop Widths
            isCollapsed ? "md:w-20" : "md:w-64",
            // Mobile Width & Visibility
            "w-64", 
            isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            className // Added className prop merge
        )}
    >
      {/* Header */}
      <div className={cn("flex-none h-16 flex items-center transition-all duration-300 border-b border-border bg-card relative", isCollapsed ? "justify-center px-2" : "justify-between px-4")}>
          <div className={cn("flex items-center gap-2 overflow-hidden whitespace-nowrap", isCollapsed ? "justify-center w-full" : "")}>
             <img 
               src={isDark ? "https://academialendaria.ai/wp-content/uploads/2025/11/Silhueta-AL-32.svg" : "https://academialendaria.ai/wp-content/uploads/2025/12/Silhueta-AL-32-Black.svg"} 
               alt="Academia Lendária" 
               className={cn("object-contain transition-all duration-300 h-8 w-8 shrink-0")} 
             />
             <div className={cn("transition-all duration-300 font-sans font-bold text-xl tracking-tight leading-none flex", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                Lendár<span className="text-primary">[IA]</span>OS
             </div>
          </div>
          <button onClick={closeMobileMenu} className="md:hidden text-muted-foreground hover:text-foreground absolute right-4">
             <Icon name="cross" size="size-4" />
          </button>

          {!isCollapsed && (
             <button onClick={toggleCollapse} className="hidden md:block text-muted-foreground hover:text-foreground absolute right-4">
                <Icon name="angle-small-left" size="size-5" />
             </button>
          )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
          <ul className="space-y-1">
            {navStructure.map((item) => renderNavItem(item))}
          </ul>
      </nav>

      {/* Footer Controls */}
      <div className="flex-none p-4 border-t border-border bg-card">
        {isCollapsed ? (
            <div className="flex flex-col items-center gap-4">
                 <button onClick={toggleCollapse} className="hidden md:block p-2 rounded-md hover:bg-muted text-muted-foreground">
                    <Icon name="angle-double-right" size="size-4" />
                </button>
                 
                 {/* Mini Theme Selector */}
                 <Popover
                    side="right"
                    align="end"
                    trigger={
                        <button className="w-5 h-5 rounded-full border border-border shadow-sm transition-transform hover:scale-110" style={{ backgroundColor: THEMES[currentThemeName].hex }} title="Mudar Tema" />
                    }
                    content={
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(THEMES).map(([key, themeVal]) => (
                                <button
                                    key={key}
                                    onClick={() => setThemeName(key as ThemeName)}
                                    className={cn("w-6 h-6 rounded-full border border-border transition-transform hover:scale-110", currentThemeName === key && "ring-2 ring-primary ring-offset-2")}
                                    style={{ backgroundColor: themeVal.hex }}
                                    title={themeVal.label}
                                />
                            ))}
                        </div>
                    }
                 />

                 {/* Mini Language Selector */}
                 <Popover
                    side="right"
                    align="end"
                    trigger={
                        <button className="text-[10px] font-bold font-mono text-muted-foreground hover:text-foreground uppercase border border-border rounded w-6 h-6 flex items-center justify-center">
                            {currentLanguage}
                        </button>
                    }
                    content={
                        <div className="grid gap-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors w-full",
                                        currentLanguage === lang.code ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <span>{lang.flag}</span>
                                    <span>{lang.code.toUpperCase()}</span>
                                </button>
                            ))}
                        </div>
                    }
                 />
                 
                 <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                    <Icon name={isDark ? "sun" : "moon"} size="size-4" />
                </button>
            </div>
        ) : (
            <div className="flex items-center justify-between w-full gap-2">
                
                {/* 1. Left: Language Selector */}
                <Popover
                    side="top"
                    align="start"
                    className="w-40 p-2"
                    trigger={
                        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground group border border-transparent hover:border-border h-9" title={t('lang_select')}>
                            <Icon name="globe" size="size-3" />
                            <span className="text-xs font-bold font-mono uppercase">{currentLanguage}</span>
                            <Icon name="angle-small-up" className="opacity-50 shrink-0 group-hover:opacity-100 transition-opacity ml-auto" size="size-3" />
                        </button>
                    }
                    content={
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">{t('lang_select')}</p>
                            <div className="grid grid-cols-1 gap-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code)}
                                        className={cn(
                                            "flex items-center gap-3 w-full px-2 py-1.5 rounded-md transition-colors text-sm",
                                            currentLanguage === lang.code ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <span className="text-base">{lang.flag}</span>
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                />

                {/* Divider */}
                <div className="h-4 w-px bg-border shrink-0"></div>

                {/* 2. Right: Appearance Group (Dark Mode + Theme) */}
                <div className="flex items-center gap-1">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors shrink-0"
                        title={isDark ? 'Light Mode' : 'Dark Mode'}
                    >
                        <Icon name={isDark ? "sun" : "moon"} size="size-4" />
                    </button>

                    {/* Theme Selector (End) */}
                    <Popover
                        side="top"
                        align="end"
                        className="w-56 p-2"
                        trigger={
                            <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors group" title={t('theme_select')}>
                                <div className="w-4 h-4 rounded-full border border-border/50 shadow-sm shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: THEMES[currentThemeName].hex }} />
                            </button>
                        }
                        content={
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">{t('theme_select')}</p>
                                <div className="grid grid-cols-1 gap-1">
                                    {Object.entries(THEMES).map(([key, themeVal]) => (
                                        <button
                                            key={key}
                                            onClick={() => setThemeName(key as ThemeName)}
                                            className={cn(
                                                "flex items-center gap-3 w-full px-2 py-1.5 rounded-md transition-colors text-sm",
                                                currentThemeName === key ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <div className="w-3 h-3 rounded-full shrink-0 border border-border/20" style={{ backgroundColor: themeVal.hex }} />
                                            {themeVal.label}
                                            {currentThemeName === key && <Icon name="check" className="ml-auto w-3 h-3 text-primary" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        )}
      </div>
    </aside>
    </>
  );
};

export default SidebarLegacy;
