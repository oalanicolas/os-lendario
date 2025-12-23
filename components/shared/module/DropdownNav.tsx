import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

// Types inline para evitar dependência externa
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface NavSubCategory {
  label: string;
  items: NavItem[];
}

export interface NavCategory {
  label: string;
  icon: string;
  items?: NavItem[];
  subcategories?: NavSubCategory[];
}

export interface DropdownNavProps {
  categories: NavCategory[];
  primaryColor: string;
}

const DropdownNav: React.FC<DropdownNavProps> = ({ categories, primaryColor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const isActiveCategory = (category: NavCategory) => {
    if (category.items) {
      return category.items.some((item) => location.pathname === item.path);
    }
    if (category.subcategories) {
      return category.subcategories.some((sub) =>
        sub.items.some((item) => location.pathname === item.path)
      );
    }
    return false;
  };

  return (
    <nav className="hidden items-center md:flex">
      <div
        className="flex items-center gap-0.5 rounded-xl border p-1"
        style={{
          backgroundColor: `${primaryColor}08`,
          borderColor: `${primaryColor}20`,
        }}
      >
        {categories.map((category) => {
          const isActive = isActiveCategory(category);
          const isOpen = openDropdown === category.label;

          return (
            <div
              key={category.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  isActive ? 'bg-background shadow-sm' : `hover:bg-[${primaryColor}]/10`
                )}
                style={{
                  color: isActive ? primaryColor : 'inherit',
                  ...(!isActive && { ['--tw-bg-opacity' as string]: 0.1 }),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="flex items-center gap-1.5">
                  <Icon name={category.icon} size="size-3.5" />
                  <span className="hidden lg:inline">{category.label}</span>
                  <Icon
                    name="chevron-down"
                    size="size-2.5"
                    className={cn('opacity-50 transition-transform', isOpen && 'rotate-180')}
                  />
                </span>
              </button>

              {/* Dropdown with bridge */}
              {isOpen && (
                <div className="absolute left-0 top-full z-50 pt-2">
                  {/* Invisible bridge to prevent gap */}
                  <div className="absolute -top-2 left-0 right-0 h-4" />
                  <div className="min-w-[220px] rounded-lg border border-border bg-card py-2 shadow-xl">
                    {/* Simple items */}
                    {category.items &&
                      category.items.map((item) => {
                        const isItemActive = location.pathname === item.path;
                        return (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setOpenDropdown(null);
                            }}
                            className={cn(
                              'w-full px-4 py-2 text-left text-sm transition-colors',
                              isItemActive
                                ? 'bg-primary/10 font-medium text-primary'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                          >
                            {item.label}
                          </button>
                        );
                      })}

                    {/* Subcategories */}
                    {category.subcategories &&
                      category.subcategories.map((sub, subIdx) => (
                        <div key={sub.label}>
                          {subIdx > 0 && <div className="my-2 border-t border-border" />}
                          <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {sub.label}
                          </div>
                          {sub.items.map((item) => {
                            const isItemActive = location.pathname === item.path;
                            return (
                              <button
                                key={item.path}
                                onClick={() => {
                                  navigate(item.path);
                                  setOpenDropdown(null);
                                }}
                                className={cn(
                                  'w-full px-4 py-1.5 text-left text-sm transition-colors',
                                  isItemActive
                                    ? 'bg-primary/10 font-medium text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default DropdownNav;
