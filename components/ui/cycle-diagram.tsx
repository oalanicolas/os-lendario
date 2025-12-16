import React from 'react';
import { cn } from '../../lib/utils';

export interface CycleNode {
    label: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    align: string; // 'center' | 'left' | 'right'
}

export interface CycleData {
    title: string;
    subtitle: string;
    center: string;
    nodes: CycleNode[];
    triangle: CycleNode[];
}

interface CycleDiagramProps {
    data: CycleData;
    variant?: 'primary' | 'muted'; // Primary uses theme color, Muted uses gray
    className?: string;
}

export const CycleDiagram: React.FC<CycleDiagramProps> = ({ data, variant = 'primary', className }) => {
  const isPrimary = variant === 'primary';

  return (
    <div className={cn(
        "relative aspect-square md:aspect-[4/3] w-full max-w-md mx-auto select-none",
        isPrimary ? "text-primary" : "text-zinc-500",
        className
    )}>
       {/* Title */}
       <div className="text-center mb-8">
           <h4 className={cn(
               "font-sans font-bold text-xl tracking-widest",
               isPrimary ? "text-white" : "text-zinc-400"
           )}>
               {data.title}
           </h4>
       </div>

       {/* SVG Container for Arrows & Geometry */}
       <div className="relative w-full pb-[100%]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" overflow="visible">
             <defs>
                <marker id={`arrow-${variant}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill={isPrimary ? '#fff' : '#444'} />
                </marker>
             </defs>
             
             {/* Outer Cycle Arrows (Approximated Bezier Curves for Circle) */}
             <g fill="none" stroke={isPrimary ? '#fff' : '#444'} strokeWidth="0.5" markerEnd={`url(#arrow-${variant})`}>
                 {/* Top to Top-Right */}
                 <path d="M55,5 A 45,45 0 0 1 85,20" />
                 {/* Top-Right to Bottom-Right */}
                 <path d="M90,30 A 45,45 0 0 1 90,70" />
                 {/* Bottom-Right to Bottom */}
                 <path d="M85,80 A 45,45 0 0 1 55,95" />
                 {/* Bottom to Bottom-Left */}
                 <path d="M45,95 A 45,45 0 0 1 15,80" />
                 {/* Bottom-Left to Top-Left */}
                 <path d="M10,70 A 45,45 0 0 1 10,30" />
                 {/* Top-Left to Top */}
                 <path d="M15,20 A 45,45 0 0 1 45,5" />
             </g>

             {/* Central Triangle - Uses CurrentColor (Primary or Zinc) */}
             <g stroke="currentColor" strokeWidth="0.5" fill="none">
                 <path d="M50,35 L75,70 L25,70 Z" />
                 {/* Inner Arrows for Triangle (Flow) */}
                 <path d="M50,35 L70,65" strokeDasharray="1,1" strokeOpacity="0.5" />
                 <path d="M75,70 L30,70" strokeDasharray="1,1" strokeOpacity="0.5" />
                 <path d="M25,70 L45,40" strokeDasharray="1,1" strokeOpacity="0.5" />
             </g>
          </svg>

          {/* HTML Text Overlays for Accessibility & Styling */}
          {/* Outer Nodes */}
          {data.nodes.map((node, i) => (
              <div 
                key={i}
                className={cn(
                    "absolute font-serif text-[10px] md:text-xs font-bold leading-tight",
                    isPrimary ? "text-white" : "text-zinc-500",
                    node.align === 'center' && "-translate-x-1/2 text-center",
                    node.align === 'left' && "translate-x-2",
                    node.align === 'right' && "-translate-x-full -translate-x-2 text-right"
                )}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                  {node.label.split('\n').map((line, k) => <div key={k}>{line}</div>)}
              </div>
          ))}

          {/* Triangle Labels - Uses CurrentColor */}
          {data.triangle.map((node, i) => (
              <div 
                key={`tri-${i}`}
                className={cn(
                    "absolute font-sans text-[8px] md:text-[9px] font-medium leading-tight whitespace-pre text-currentColor",
                    !isPrimary && "text-zinc-600",
                    "-translate-x-1/2 -translate-y-1/2 text-center"
                )}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                  {node.label}
              </div>
          ))}

          {/* Center Label */}
          <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-bold text-xs",
              isPrimary ? "text-white" : "text-zinc-700 decoration-zinc-500 line-through"
          )}>
             {data.center}
          </div>
       </div>

       {/* Subtitle */}
       <div className="text-center mt-4">
           <h5 className={cn(
               "font-serif italic text-lg",
               isPrimary ? "text-white" : "text-zinc-500"
           )}>
               {data.subtitle}
           </h5>
       </div>
    </div>
  );
};
