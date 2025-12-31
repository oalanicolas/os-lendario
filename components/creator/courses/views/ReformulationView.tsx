import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { CoursesHeader } from '../../ui';

// Course type for this view - minimal interface for what we need
interface Course {
  id: string | number;
  title: string;
  slug: string;
}

interface ReformulationViewProps {
  course: Course | null;
  onBack: () => void;
  onNext: () => void;
}

/**
 * ReformulationView - Checkpoint to review AI-suggested brief updates
 *
 * Shows side-by-side comparison of original brief vs AI-optimized version.
 * User can accept suggestions or keep original before generating curriculum.
 */
const ReformulationView: React.FC<ReformulationViewProps> = ({
  course: _course,
  onBack,
  onNext,
}) => {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <CoursesHeader
        title="Reformulacao do Brief"
        breadcrumb="Diff"
        showBackButton
        onBack={onBack}
        onBreadcrumbClick={onBack}
      />

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-2 gap-8">
        {/* Original Brief */}
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Seu Brief Original
          </h3>
          <Card className="border-dashed opacity-70">
            <CardContent className="p-6 font-serif text-sm">
              <p className="mb-2">
                <strong>Promessa:</strong> Ensinar vendas B2B.
              </p>
              <p>
                <strong>Publico:</strong> Vendedores.
              </p>
              <p>
                <strong>Diferencial:</strong> Minha experiencia.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI-Optimized Brief */}
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-studio-primary">
            Sugestao da IA (Baseada em Dados)
          </h3>
          <Card
            className="relative border-primary shadow-lg"
            style={{ backgroundColor: 'hsl(var(--primary-color) / 0.05)' }}
          >
            <Badge className="absolute -top-3 right-4 bg-primary text-primary-foreground">
              Otimizado
            </Badge>
            <CardContent className="p-6 font-serif text-sm">
              <p className="mb-2">
                <strong>Promessa:</strong>{' '}
                <span
                  className="rounded px-1"
                  style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}
                >
                  Dominar o ciclo de vendas B2B e fechar contratos High-Ticket em 30 dias.
                </span>
              </p>
              <p>
                <strong>Publico:</strong>{' '}
                <span
                  className="rounded px-1"
                  style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}
                >
                  Account Executives e SDRs buscando promocao.
                </span>
              </p>
              <p>
                <strong>Diferencial:</strong>{' '}
                <span
                  className="rounded px-1"
                  style={{ backgroundColor: 'hsl(var(--primary-color) / 0.2)' }}
                >
                  Unico com templates de IA e foco em Social Selling.
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-8">
        <Button variant="outline">Manter Original</Button>
        <Button onClick={onNext} className="shadow-xl">
          Aceitar & Gerar Curriculo <Icon name="check" className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ReformulationView;
