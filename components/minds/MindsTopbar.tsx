import React from 'react';
import { Section } from '../../types';
import ModuleTopbar from '../shared/ModuleTopbar';
import { TOPBAR_CONFIGS } from '../shared/topbar-config';

interface MindsTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const MindsTopbar: React.FC<MindsTopbarProps> = ({ currentSection, setSection }) => {
  const config = TOPBAR_CONFIGS.minds;

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

export default MindsTopbar;
