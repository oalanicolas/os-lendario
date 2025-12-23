import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// --- SVG CHART COMPONENTS (Dependency Free) ---

const BarChart = () => {
  const data = [45, 70, 30, 85, 50, 95, 60];
  const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const max = 100;

  return (
    <div className="flex h-64 w-full items-end justify-between gap-2 pt-6">
      {data.map((value, i) => (
        <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="relative flex h-full w-full items-end justify-center">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 rounded bg-foreground px-2 py-1 font-mono text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
              {value}
            </div>
            {/* Bar */}
            <div
              className="relative w-full max-w-[40px] overflow-hidden rounded-t-sm border-t-2 border-primary bg-primary/20 transition-all duration-300 group-hover:bg-primary/40"
              style={{ height: `${(value / max) * 100}%` }}
            >
              {/* Pattern/Fill */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/10"></div>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase text-muted-foreground">
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
};

const LineChart = () => {
  const data = [20, 45, 30, 80, 55, 90, 70];
  const width = 100;
  const height = 50;
  const max = 100;

  // Create points string
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (val / max) * height;
      return `${x},${y}`;
    })
    .join(' ');

  // Fill area path (close the loop)
  const fillPath = `${points} ${width},${height} 0,${height}`;

  return (
    <div className="relative aspect-[2/1] w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Grid Lines */}
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          className="stroke-dasharray-2 stroke-border stroke-[0.5]"
        />
        <line
          x1="0"
          y1="25"
          x2="100"
          y2="25"
          className="stroke-dasharray-2 stroke-border stroke-[0.5]"
        />
        <line x1="0" y1="50" x2="100" y2="50" className="stroke-border stroke-[0.5]" />

        {/* Area Fill */}
        <polygon points={fillPath} className="fill-primary/10" />

        {/* Line Stroke */}
        <polyline
          points={points}
          fill="none"
          className="vector-effect-non-scaling-stroke stroke-primary stroke-[1]"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - (val / max) * height;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              className="hover:r-3 cursor-pointer fill-background stroke-primary stroke-[0.5] transition-all"
            >
              <title>{val}</title>
            </circle>
          );
        })}
      </svg>
    </div>
  );
};

const DonutChart = () => {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius; // ~100

  // Data: [Value, ColorClass]
  const segments = [
    { value: 40, color: 'text-primary' },
    { value: 25, color: 'text-brand-blue' },
    { value: 20, color: 'text-brand-green' },
    { value: 15, color: 'text-muted' },
  ];

  let accumulatedOffset = 25; // Start at top (25% offset)

  return (
    <div className="relative mx-auto h-48 w-48">
      <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90 transform">
        {segments.map((seg, i) => {
          const dashArray = `${seg.value} ${100 - seg.value}`;
          const offset = accumulatedOffset;
          accumulatedOffset -= seg.value; // Move backwards for next segment

          return (
            <circle
              key={i}
              cx="20"
              cy="20"
              r={radius}
              fill="transparent"
              strokeWidth="5"
              strokeDasharray={dashArray}
              strokeDashoffset={offset}
              className={`${seg.color} hover:stroke-width-6 cursor-pointer stroke-current transition-all`}
            />
          );
        })}
        {/* Center Text */}
        <text
          x="20"
          y="20"
          dy="0.3em"
          textAnchor="middle"
          className="rotate-90 transform fill-foreground font-sans text-[0.4rem] font-bold"
        >
          TOTAL
        </text>
      </svg>
    </div>
  );
};

const ChartsSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Visualização de Dados (Charts)</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Gráficos de negócio otimizados para rápida leitura. Utilizam SVG nativo para performance
          máxima e zero dependências.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* BAR CHART */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Receita Semanal</CardTitle>
                <CardDescription>Comparativo últimos 7 dias</CardDescription>
              </div>
              <Badge variant="outline" className="border-primary bg-primary/5 text-primary">
                +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        {/* LINE CHART */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Crescimento de Usuários</CardTitle>
                <CardDescription>Curva de adoção mensal</CardDescription>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center text-xs text-muted-foreground">
                  <div className="mr-1 h-2 w-2 rounded-full bg-primary"></div> Pro
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center">
              <LineChart />
            </div>
          </CardContent>
        </Card>

        {/* DONUT CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Tráfego</CardTitle>
            <CardDescription>Fontes de aquisição</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <DonutChart />
              <div className="w-full space-y-4 md:w-auto">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-primary"></div> Orgânico
                  </div>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-brand-blue"></div> Social
                  </div>
                  <span className="font-bold">25%</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-brand-green"></div> Ads
                  </div>
                  <span className="font-bold">20%</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-muted"></div> Direto
                  </div>
                  <span className="font-bold">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col justify-center border-primary/20 bg-gradient-to-br from-card to-primary/5 p-6">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Churn Rate
            </div>
            <div className="font-sans text-4xl font-bold text-foreground">1.2%</div>
            <div className="mt-2 flex items-center gap-1 text-xs text-brand-green">
              <Icon name="arrow-down" size="size-3" /> -0.4% vs mês anterior
            </div>
          </Card>
          <Card className="flex flex-col justify-center p-6">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              LTV Médio
            </div>
            <div className="font-sans text-4xl font-bold text-foreground">R$ 890</div>
            <div className="mt-2 flex items-center gap-1 text-xs text-brand-green">
              <Icon name="arrow-up" size="size-3" /> +5.2% vs mês anterior
            </div>
          </Card>
          <Card className="col-span-2 flex items-center justify-between bg-foreground p-6 text-background">
            <div>
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                Meta Anual
              </div>
              <div className="font-sans text-3xl font-bold">82%</div>
            </div>
            <div className="h-2 w-1/2 overflow-hidden rounded-full bg-background/20">
              <div className="h-full w-[82%] bg-primary"></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
