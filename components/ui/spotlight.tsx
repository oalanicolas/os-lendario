import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: number;
  strength?: number;
  color?: string;
}

/**
 * Spotlight
 * A wrapper component that adds a "flashlight" effect following the mouse.
 * Creates a sense of depth and interactivity.
 */
export const Spotlight: React.FC<SpotlightProps> = ({ 
  children, 
  className, 
  size = 300, 
  strength = 0.15,
  color = "rgba(255, 255, 255, 0.2)",
  ...props 
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -size, y: -size });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {/* The Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};
