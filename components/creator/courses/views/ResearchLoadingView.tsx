import React from 'react';
import { Icon } from '../../../ui/icon';

interface ResearchLoadingViewProps {
  onComplete: () => void;
}

/**
 * ResearchLoadingView - Agent running state for market research
 *
 * Shows animated loading UI while the research agent is processing.
 * Displays simulated terminal output for user feedback.
 */
const ResearchLoadingView: React.FC<ResearchLoadingViewProps> = ({ onComplete }) => {
  // Auto-complete after animation (simulating agent work)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex min-h-[60vh] animate-fade-in flex-col items-center justify-center space-y-8 text-center">
      {/* Spinning loader with search icon */}
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <Icon
          name="search-alt"
          className="absolute inset-0 m-auto size-10 animate-pulse text-studio-primary"
        />
      </div>

      {/* Status text */}
      <div className="space-y-2">
        <h3 className="font-sans text-2xl font-bold">Agente de Pesquisa Ativo</h3>
        <p className="font-serif text-muted-foreground">
          Analisando concorrentes, identificando gaps e buscando diferenciais...
        </p>

        {/* Simulated terminal output */}
        <div className="space-y-1 pt-4 font-mono text-xs text-muted-foreground">
          <p className="text-success">GET /udemy/top-courses... 200 OK</p>
          <p className="text-success">ANALYZING reviews... DONE</p>
          <p className="animate-pulse">EXTRACTING gaps... PROCESSING</p>
        </div>
      </div>
    </div>
  );
};

export default ResearchLoadingView;
