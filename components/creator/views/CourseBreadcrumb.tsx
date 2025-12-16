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

const CourseBreadcrumb: React.FC<CourseBreadcrumbProps> = ({
  items,
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="flex items-center justify-between mb-8 animate-fade-in">
      <div>
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Icon name="angle-small-right" size="size-3" />}
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="text-3xl font-sans font-bold text-foreground tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
};

export default CourseBreadcrumb;
