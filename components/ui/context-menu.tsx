import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface ContextMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ trigger, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div onContextMenu={handleContextMenu} className="w-full h-full">
      {trigger}
      {visible && (
        <div
          ref={menuRef}
          className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-accordion-down"
          style={{ top: position.y, left: position.x }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { ContextMenu };
