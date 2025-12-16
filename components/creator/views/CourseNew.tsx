import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { cn } from '../../../lib/utils';
import CreatorTopbar from '../CreatorTopbar';
import CourseBreadcrumb from './CourseBreadcrumb';
import { STUDIO_PRIMARY, STUDIO_GOLD, STUDIO_ACCENT } from '../studio-tokens';

interface CourseNewProps {
  setSection: (s: Section) => void;
}

const CourseNew: React.FC<CourseNewProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'greenfield' | 'brownfield' | null>(null);
  const [slug, setSlug] = useState('');
  const [persona, setPersona] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCourse = () => {
    if (!slug || !mode) return;
    setIsCreating(true);
    // TODO: Create course in Supabase
    setTimeout(() => {
      setIsCreating(false);
      navigate(`/creator/cursos/${slug}/brief`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="w-full mx-auto p-6 md:p-12 max-w-[1400px]">
        <CourseBreadcrumb
          items={[
            { label: 'Cursos', href: '/creator/cursos' },
            { label: 'Novo Curso' },
          ]}
          title="Novo Curso"
          actions={
            <Button variant="outline" onClick={() => navigate('/creator/cursos')}>
              <Icon name="angle-left" className="mr-2 size-4" /> Voltar
            </Button>
          }
        />

        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-sans">Como você quer criar seu curso?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Greenfield Card */}
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                  mode === 'greenfield'
                    ? "bg-[#538096]/10"
                    : "border-border hover:border-[#538096]/50"
                )}
                style={mode === 'greenfield' ? { borderColor: STUDIO_PRIMARY } : {}}
                onClick={() => setMode('greenfield')}
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                      style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}
                    >
                      <Icon name="seedling" size="size-6" />
                    </div>
                    {mode === 'greenfield' && (
                      <Icon name="check-circle" size="size-6" type="solid" style={{ color: STUDIO_PRIMARY }} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Greenfield (Do Zero)</h4>
                    <p className="text-xs font-mono uppercase tracking-wider" style={{ color: STUDIO_PRIMARY }}>
                      Recomendado
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Crie uma estrutura pedagógica perfeita (GPS + Didática Lendária) sem vícios antigos.
                  </p>
                </CardContent>
              </Card>

              {/* Brownfield Card */}
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                  mode === 'brownfield'
                    ? "bg-[#538096]/10"
                    : "border-border hover:border-[#538096]/50"
                )}
                style={mode === 'brownfield' ? { borderColor: STUDIO_PRIMARY } : {}}
                onClick={() => setMode('brownfield')}
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                      style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_GOLD }}
                    >
                      <Icon name="file-import" size="size-6" />
                    </div>
                    {mode === 'brownfield' && (
                      <Icon name="check-circle" size="size-6" type="solid" style={{ color: STUDIO_PRIMARY }} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Brownfield (Existente)</h4>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      Migração
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Importe um curso existente e aprimore com IA e frameworks pedagógicos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6 transition-opacity duration-500" style={{ opacity: mode ? 1 : 0.3, pointerEvents: mode ? 'auto' : 'none' }}>
            <h3 className="text-xl font-bold font-sans">Configuração Inicial</h3>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug do Curso</label>
                    <Input
                      placeholder="ex: vendas-b2b-avancado"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instrutor / Persona</label>
                    <Select
                      placeholder="Selecione um instrutor..."
                      value={persona}
                      onValueChange={setPersona}
                      options={[{ label: "MMOS: Alan Nicolas", value: "an" }]}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 pt-8 border-t border-border">
            <Button variant="ghost" onClick={() => navigate('/creator/cursos')}>Cancelar</Button>
            <Button
              onClick={handleCreateCourse}
              disabled={!mode || !slug}
              className="min-w-[140px] text-white"
              style={{ backgroundColor: STUDIO_PRIMARY }}
            >
              {isCreating ? (
                <Icon name="spinner" className="mr-2 animate-spin" />
              ) : (
                <>Criar Curso <Icon name="arrow-right" className="ml-2" /></>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseNew;
