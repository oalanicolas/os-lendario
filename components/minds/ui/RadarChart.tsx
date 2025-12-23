import React from 'react';

interface RadarChartProps {
  data: { skillName: string; level: number }[];
  size?: number;
  showLabels?: boolean;
  colors?: {
    stroke: string;
    fill: string;
    text: string;
    grid: string;
  };
}

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 300,
  showLabels = true,
  colors = {
    stroke: 'hsl(var(--primary))',
    fill: 'rgba(var(--primary-rgb), 0.2)',
    text: 'fill-zinc-400',
    grid: 'rgba(255,255,255,0.05)',
  },
}) => {
  if (!data || !data.length) return null;

  const center = size / 2;
  const radius = size * 0.3; // 30% of size to leave room for labels
  const total = data.length;

  // Calculate points for the data polygon
  const points = data
    .map((d, i) => {
      const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
      const val = (d.level / 10) * radius;
      const x = center + val * Math.cos(angle);
      const y = center + val * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  // Calculate background grid (levels 2, 4, 6, 8, 10)
  const levels = [2, 4, 6, 8, 10];
  const gridPolygons = levels.map((level) => {
    return data
      .map((_, i) => {
        const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
        const val = (level / 10) * radius;
        const x = center + val * Math.cos(angle);
        const y = center + val * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  });

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Grid */}
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full overflow-visible">
          {gridPolygons.map((poly, i) => (
            <polygon
              key={i}
              points={poly}
              fill={i === levels.length - 1 ? 'rgba(255,255,255,0.02)' : 'none'}
              stroke={colors.grid}
              strokeWidth="1"
            />
          ))}
          {/* Axes */}
          {data.map((_, i) => {
            const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={colors.grid}
                strokeWidth="1"
              />
            );
          })}

          {/* Data Polygon */}
          <polygon
            points={points}
            fill={colors.fill}
            stroke={colors.stroke}
            strokeWidth="2"
            className="animate-pulse-slow drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
            const val = (d.level / 10) * radius;
            const x = center + val * Math.cos(angle);
            const y = center + val * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={colors.stroke}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Labels */}
          {showLabels &&
            data.map((d, i) => {
              const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
              // Push label out a bit further than radius
              const labelRadius = radius + 25;
              const x = center + labelRadius * Math.cos(angle);
              const y = center + labelRadius * Math.sin(angle);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`font-mono text-[10px] font-bold uppercase tracking-wider ${colors.text}`}
                  style={{
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  }}
                >
                  {d.skillName.split(' ')[0]}
                </text>
              );
            })}
        </svg>
      </div>
    </div>
  );
};

export default RadarChart;
