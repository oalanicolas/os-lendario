import React from 'react';
import { Section } from '../../types';
import ModuleTopbar from '../shared/ModuleTopbar';
import { TOPBAR_CONFIGS } from '../shared/topbar-config';

interface SalesTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const SalesTopbar: React.FC<SalesTopbarProps> = ({ currentSection, setSection }) => {
  const config = TOPBAR_CONFIGS.sales;

  return (
    <ModuleTopbar
      title={config.title}
      subtitle={config.subtitle}
      icon={config.icon}
      navItems={config.navItems}
      currentSection={currentSection as unknown as string}
      setSection={(section) => setSection(section as Section)}
      primaryColor={config.primaryColor}
      accentColor={config.accentColor}
      variant={config.variant}
    />
  );
};

export default SalesTopbar;
