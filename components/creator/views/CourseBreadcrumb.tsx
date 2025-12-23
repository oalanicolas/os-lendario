import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../ui/icon';
import { Button } from '../../ui/button';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CourseBreadcrumbProps {
  items: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const CourseBreadcrumb: React.FC<CourseBreadcrumbProps> = ({ items, title, subtitle, actions }) => {
  return (
    <div className="mb-8 flex animate-fade-in items-center justify-between">
      <div>
        <nav className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Icon name="angle-small-right" size="size-3" />}
              {item.href ? (
                <Link to={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
};

export default CourseBreadcrumb;
