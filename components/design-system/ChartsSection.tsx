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
        <div className="w-full h-64 flex items-end justify-between gap-2 pt-6">
            {data.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="relative w-full flex justify-center items-end h-full">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs px-2 py-1 rounded font-mono">
                            {value}
                        </div>
                        {/* Bar */}
                        <div 
                            className="w-full max-w-[40px] bg-primary/20 border-t-2 border-primary rounded-t-sm group-hover:bg-primary/40 transition-all duration-300 relative overflow-hidden"
                            style={{ height: `${(value / max) * 100}%` }}
                        >
                            {/* Pattern/Fill */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/10"></div>
                        </div>
                    </div>
                    <span className="text-[10px] uppercase text-muted-foreground font-semibold">{labels[i]}</span>
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
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (val / max) * height;
        return `${x},${y}`;
    }).join(' ');

    // Fill area path (close the loop)
    const fillPath = `${points} ${width},${height} 0,${height}`;

    return (
        <div className="w-full aspect-[2/1] relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="0" x2="100" y2="0" className="stroke-border stroke-[0.5] stroke-dasharray-2" />
                <line x1="0" y1="25" x2="100" y2="25" className="stroke-border stroke-[0.5] stroke-dasharray-2" />
                <line x1="0" y1="50" x2="100" y2="50" className="stroke-border stroke-[0.5]" />

                {/* Area Fill */}
                <polygon points={fillPath} className="fill-primary/10" />
                
                {/* Line Stroke */}
                <polyline 
                    points={points} 
                    fill="none" 
                    className="stroke-primary stroke-[1] vector-effect-non-scaling-stroke"
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
                            cx={x} cy={y} r="1.5" 
                            className="fill-background stroke-primary stroke-[0.5] hover:r-3 transition-all cursor-pointer"
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
        { value: 40, color: "text-primary" },
        { value: 25, color: "text-brand-blue" },
        { value: 20, color: "text-brand-green" },
        { value: 15, color: "text-muted" },
    ];

    let accumulatedOffset = 25; // Start at top (25% offset)

    return (
        <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 40 40" className="w-full h-full transform -rotate-90">
                {segments.map((seg, i) => {
                    const dashArray = `${seg.value} ${100 - seg.value}`;
                    const offset = accumulatedOffset;
                    accumulatedOffset -= seg.value; // Move backwards for next segment

                    return (
                        <circle
                            key={i}
                            cx="20" cy="20" r={radius}
                            fill="transparent"
                            strokeWidth="5"
                            strokeDasharray={dashArray}
                            strokeDashoffset={offset}
                            className={`${seg.color} stroke-current transition-all hover:stroke-width-6 cursor-pointer`}
                        />
                    );
                })}
                {/* Center Text */}
                <text x="20" y="20" dy="0.3em" textAnchor="middle" className="text-[0.4rem] font-bold fill-foreground transform rotate-90 font-sans">
                    TOTAL
                </text>
            </svg>
        </div>
    );
};


const ChartsSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-fade-in">
      <div>
        <h2 className="text-4xl font-serif font-light mb-4">Visualização de Dados (Charts)</h2>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
           Gráficos de negócio otimizados para rápida leitura. Utilizam SVG nativo para performance máxima e zero dependências.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* BAR CHART */}
          <Card>
              <CardHeader>
                  <div className="flex items-center justify-between">
                      <div>
                          <CardTitle>Receita Semanal</CardTitle>
                          <CardDescription>Comparativo últimos 7 dias</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary bg-primary/5">+12.5%</Badge>
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
                          <span className="flex items-center text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-primary mr-1"></div> Pro</span>
                      </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <div className="h-64 flex items-center">
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
                  <div className="flex flex-col md:flex-row items-center gap-8">
                      <DonutChart />
                      <div className="space-y-4 w-full md:w-auto">
                          <div className="flex items-center justify-between gap-4 text-sm">
                              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary"></div> Orgânico</div>
                              <span className="font-bold">40%</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-sm">
                              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-blue"></div> Social</div>
                              <span className="font-bold">25%</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-sm">
                              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-green"></div> Ads</div>
                              <span className="font-bold">20%</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-sm">
                              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-muted"></div> Direto</div>
                              <span className="font-bold">15%</span>
                          </div>
                      </div>
                  </div>
              </CardContent>
          </Card>

          {/* KPI CARDS */}
          <div className="grid grid-cols-2 gap-4">
              <Card className="flex flex-col justify-center p-6 bg-gradient-to-br from-card to-primary/5 border-primary/20">
                  <div className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">Churn Rate</div>
                  <div className="text-4xl font-bold font-sans text-foreground">1.2%</div>
                  <div className="text-xs text-brand-green flex items-center gap-1 mt-2">
                      <Icon name="arrow-down" size="size-3" /> -0.4% vs mês anterior
                  </div>
              </Card>
              <Card className="flex flex-col justify-center p-6">
                  <div className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-2">LTV Médio</div>
                  <div className="text-4xl font-bold font-sans text-foreground">R$ 890</div>
                  <div className="text-xs text-brand-green flex items-center gap-1 mt-2">
                      <Icon name="arrow-up" size="size-3" /> +5.2% vs mês anterior
                  </div>
              </Card>
              <Card className="col-span-2 p-6 flex items-center justify-between bg-foreground text-background">
                  <div>
                      <div className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Meta Anual</div>
                      <div className="text-3xl font-bold font-sans">82%</div>
                  </div>
                  <div className="w-1/2 h-2 bg-background/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[82%]"></div>
                  </div>
              </Card>
          </div>

      </div>
    </div>
  );
};

export default ChartsSection;
