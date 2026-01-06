import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Section } from '../../types';
import ModuleTopbar from '../shared/ModuleTopbar';
import { TOPBAR_CONFIGS } from '../shared/topbar-config';

interface MarketingTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const MarketingTopbar: React.FC<MarketingTopbarProps> = ({ currentSection, setSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const config = TOPBAR_CONFIGS.marketing;

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

export default MarketingTopbar;
