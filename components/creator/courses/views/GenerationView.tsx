import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Progress } from '../../../ui/progress';
import { Separator } from '../../../ui/separator';
import { cn } from '../../../../lib/utils';
import { CoursesHeader } from '../../ui';
import { generationLog } from '../types';
import type { Course, GenerationLogEntry } from '../types';

// =============================================================================
// TYPES
// =============================================================================

export interface GenerationViewProps {
  course: Course | null;
  onBack: () => void;
  onLessonReady: () => void;
  /** Custom log data, defaults to mock generationLog */
  logData?: GenerationLogEntry[];
  /** Current progress percentage (0-100) */
  progress?: number;
  /** Estimated time remaining */
  estimatedTime?: string;
}

// =============================================================================
// LOG ENTRY COMPONENT
// =============================================================================

interface LogEntryProps {
  log: GenerationLogEntry;
}

const LogEntry: React.FC<LogEntryProps> = ({ log }) => (
  <Card
    className={cn(
      'border-l-4 transition-all',
      log.status === 'success'
        ? 'border-l-success bg-success/5'
        : log.status === 'retrying'
          ? 'border-l-brand-yellow bg-brand-yellow/5'
          : 'border-l-muted bg-muted/5 opacity-60'
    )}
  >
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        {log.status === 'success' ? (
          <Icon name="check-circle" className="text-success" />
        ) : log.status === 'retrying' ? (
          <Icon name="refresh" className="animate-spin text-brand-yellow" />
        ) : (
          <Icon name="circle" className="text-muted-foreground" />
        )}

        <div>
          <p className="text-sm font-bold">
            {log.id} - {log.title}
          </p>
          <p className="text-xs text-muted-foreground">{log.msg}</p>
        </div>
      </div>
      <div className="flex gap-4 font-mono text-xs">
        <div className="text-center">
          <span className="block text-[10px] uppercase text-muted-foreground">GPS Score</span>
          <span
            className={cn(
              'font-bold',
              log.gps > 70 ? 'text-success' : log.gps > 0 ? 'text-brand-yellow' : 'text-muted'
            )}
          >
            {log.gps > 0 ? log.gps : '-'}
          </span>
        </div>
        <div className="text-center">
          <span className="block text-[10px] uppercase text-muted-foreground">DL Score</span>
          <span
            className={cn(
              'font-bold',
              log.dl > 70 ? 'text-success' : log.dl > 0 ? 'text-brand-yellow' : 'text-muted'
            )}
          >
            {log.dl > 0 ? log.dl : '-'}
          </span>
        </div>
      </div>
    </div>
  </Card>
);

// =============================================================================
// PROGRESS SIDEBAR
// =============================================================================

interface ProgressSidebarProps {
  progress: number;
  estimatedTime: string;
  onSimulateComplete: () => void;
}

const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  progress,
  estimatedTime,
  onSimulateComplete,
}) => (
  <Card className="h-fit">
    <CardHeader>
      <CardTitle>Progresso Total</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="text-center">
        <div className="mb-2 font-mono text-4xl font-bold text-studio-primary">{progress}%</div>
        <Progress value={progress} className="h-2" />
        <p className="mt-2 text-xs text-muted-foreground">Estimativa: {estimatedTime}</p>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider">Quality Gate (Validacao)</h4>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Framework GPS</span>
          <span className="text-success font-bold">Pass</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Didatica Lendaria</span>
          <span className="text-success font-bold">Pass</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Voice Consistency</span>
          <span className="font-bold text-brand-yellow">Checking...</span>
        </div>
      </div>
      <Button className="w-full" variant="outline" onClick={onSimulateComplete}>
        Simular Finalizacao
      </Button>
    </CardContent>
  </Card>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const GenerationView: React.FC<GenerationViewProps> = ({
  course: _course,
  onBack,
  onLessonReady,
  logData = generationLog,
  progress = 35,
  estimatedTime = '4 min restantes',
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Gerando Aulas"
        breadcrumb="Geracao"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBack}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Log / Terminal */}
        <div className="space-y-4 lg:col-span-2">
          {logData.map((log) => (
            <LogEntry key={log.id} log={log} />
          ))}
        </div>

        {/* Progress Sidebar */}
        <ProgressSidebar
          progress={progress}
          estimatedTime={estimatedTime}
          onSimulateComplete={onLessonReady}
        />
      </div>
    </div>
  );
};

export default GenerationView;
