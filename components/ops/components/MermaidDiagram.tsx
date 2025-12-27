import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid once
let mermaidInitialized = false;

const initMermaid = () => {
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base', // Use base to allow variable overrides, or 'default' which acts better in light mode
      securityLevel: 'loose',
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
      themeVariables: {
        primaryColor: '#c9b298', // OPS_ACCENT
        primaryTextColor: '#666', // muted-foreground equivalent
        primaryBorderColor: '#c9b298',
        lineColor: '#c9b298',
        secondaryColor: '#f4f4f5', // zinc-100 (light muted)
        tertiaryColor: '#ffffff',
        mainBkg: '#ffffff',
        nodeBorder: '#c9b298'
      }
    });
    mermaidInitialized = true;
  }
};

interface MermaidDiagramProps {
  chart: string;
  id: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    initMermaid();
    setLoading(true);

    const renderDiagram = async () => {
      try {
        // Generate unique ID to avoid conflicts
        const uniqueId = `mermaid-${id}-${Date.now()}`;
        const { svg: renderedSvg } = await mermaid.render(uniqueId, chart);
        setSvg(renderedSvg);
        setError('');
      } catch (e) {
        console.error('Mermaid render error:', e);
        setError(`Erro ao renderizar diagrama: ${String(e)}`);
      } finally {
        setLoading(false);
      }
    };

    renderDiagram();
  }, [chart, id]);

  if (loading) {
    return (
      <div className="bg-black/30 rounded-xl p-8 flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Carregando diagrama...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm whitespace-pre-wrap">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-muted/10 border border-border/20 rounded-xl p-4 overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
