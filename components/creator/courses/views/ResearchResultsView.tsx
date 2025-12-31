import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { Alert, AlertDescription, AlertTitle } from '../../../ui/alert';
import { CoursesHeader } from '../../ui';

// Course type for this view - minimal interface for what we need
interface Course {
  id: string | number;
  title: string;
  slug: string;
}

interface ResearchResultsViewProps {
  course: Course | null;
  onBack: () => void;
  onNext: () => void;
}

/**
 * ResearchResultsView - Checkpoint to review market research data
 *
 * Displays competitor analysis, market insights, and identified gaps.
 * User reviews data before proceeding to brief reformulation.
 */
const ResearchResultsView: React.FC<ResearchResultsViewProps> = ({
  course: _course,
  onBack,
  onNext,
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Inteligencia de Mercado"
        breadcrumb="Pesquisa"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBack}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Competitor Analysis Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analise de Concorrencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Insight Alert */}
            <Alert>
              <Icon name="info" className="size-4" />
              <AlertTitle>Insight Principal</AlertTitle>
              <AlertDescription>
                90% dos cursos focam em teoria. A maior reclamacao e falta de templates praticos.
              </AlertDescription>
            </Alert>

            {/* Competitor List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded border bg-muted/10 p-3">
                <span>Curso A (Lider)</span>
                <Badge variant="outline">Muito Teorico</Badge>
              </div>
              <div className="flex items-center justify-between rounded border bg-muted/10 p-3">
                <span>Curso B</span>
                <Badge variant="outline">Desatualizado (2022)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities Card */}
        <Card className="border-studio-primary/20 bg-studio-primary/5">
          <CardHeader>
            <CardTitle className="text-studio-primary">Oportunidades (Gaps)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Incluir modulo sobre IA aplicada</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Fornecer scripts prontos (Copy & Paste)</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="check-circle" className="mt-1 size-4 text-studio-primary" />
              <span className="text-sm">Focar em Mobile-First learning</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end border-t border-border pt-4">
        <Button onClick={onNext} size="lg" className="shadow-lg">
          Ver Sugestao de Reformulacao <Icon name="arrow-right" className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ResearchResultsView;
