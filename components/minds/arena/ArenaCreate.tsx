// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Badge } from '../../ui/badge';
import { FRAMEWORKS } from './data';
import { MindCardSelect } from './MindCardSelect';
import { useToast } from '../../../hooks/use-toast';
import { usePublicMinds } from '../../../hooks/usePublicMinds';
import { DebateConfig } from './types';

interface ArenaCreateProps {
  onBack: () => void;
  onStart: (config: DebateConfig) => void;
}

export const ArenaCreate: React.FC<ArenaCreateProps> = ({ onBack, onStart }) => {
  const { toast } = useToast();
  const { minds, loading } = usePublicMinds();
  const [selectedClone1, setSelectedClone1] = useState<string | null>(null);
  const [selectedClone2, setSelectedClone2] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [framework, setFramework] = useState('oxford');
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');

  // Filter minds based on search
  const getFilteredMinds = (searchTerm: string) => {
    if (!searchTerm.trim()) return minds.slice(0, 4); // Show first 4 by default
    return minds.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.shortBio.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredMinds1 = useMemo(() => getFilteredMinds(search1), [minds, search1]);
  const filteredMinds2 = useMemo(() => getFilteredMinds(search2), [minds, search2]);

  // Get selected mind data
  const selectedMind1 = minds.find((m) => m.id === selectedClone1);
  const selectedMind2 = minds.find((m) => m.id === selectedClone2);

  const handleStart = () => {
    if (!selectedClone1 || !selectedClone2 || !topic) {
      toast({
        title: 'Configuração incompleta',
        description: 'Selecione dois clones e um tópico.',
        variant: 'destructive',
      });
      return;
    }
    if (selectedClone1 === selectedClone2) {
      toast({
        title: 'Erro',
        description: 'Um clone não pode debater consigo mesmo.',
        variant: 'destructive',
      });
      return;
    }

    onStart({
      clone1Id: selectedClone1,
      clone2Id: selectedClone2,
      topic,
      frameworkId: framework,
    });
  };

  return (
    <div className="mx-auto max-w-4xl animate-fade-in space-y-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <Icon name="arrow-left" />
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Configurar Batalha</h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Mind 1 Selector */}
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Proponente (Thesis)
          </h3>
          <Input
            placeholder="Buscar mente..."
            value={search1}
            onChange={(e) => setSearch1(e.target.value)}
            className="h-10 border-border bg-input"
            disabled={loading}
          />
          <div className="custom-scrollbar grid max-h-96 grid-cols-2 gap-4 overflow-y-auto pr-2">
            {loading ? (
              <div className="col-span-2 py-8 text-center text-muted-foreground">
                Carregando mentes...
              </div>
            ) : filteredMinds1.length > 0 ? (
              filteredMinds1.map((mind) => (
                <MindCardSelect
                  key={`c1-${mind.id}`}
                  id={mind.id}
                  slug={mind.slug}
                  name={mind.name}
                  shortBio={mind.shortBio}
                  avatar={mind.avatar}
                  apexScore={mind.apexScore}
                  selected={selectedClone1 === mind.id}
                  onClick={() => setSelectedClone1(mind.id)}
                />
              ))
            ) : (
              <div className="col-span-2 py-8 text-center text-muted-foreground">
                Nenhuma mente encontrada
              </div>
            )}
          </div>
          {selectedMind1 && (
            <div className="rounded-lg border border-primary bg-primary/10 p-3 text-sm text-foreground">
              ✓ {selectedMind1.name} selecionado
            </div>
          )}
        </div>

        {/* Mind 2 Selector */}
        <div className="space-y-4">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Oponente (Antithesis)
          </h3>
          <Input
            placeholder="Buscar mente..."
            value={search2}
            onChange={(e) => setSearch2(e.target.value)}
            className="h-10 border-border bg-input"
            disabled={loading}
          />
          <div className="custom-scrollbar grid max-h-96 grid-cols-2 gap-4 overflow-y-auto pr-2">
            {loading ? (
              <div className="col-span-2 py-8 text-center text-muted-foreground">
                Carregando mentes...
              </div>
            ) : filteredMinds2.length > 0 ? (
              filteredMinds2.map((mind) => (
                <MindCardSelect
                  key={`c2-${mind.id}`}
                  id={mind.id}
                  slug={mind.slug}
                  name={mind.name}
                  shortBio={mind.shortBio}
                  avatar={mind.avatar}
                  apexScore={mind.apexScore}
                  selected={selectedClone2 === mind.id}
                  onClick={() => setSelectedClone2(mind.id)}
                />
              ))
            ) : (
              <div className="col-span-2 py-8 text-center text-muted-foreground">
                Nenhuma mente encontrada
              </div>
            )}
          </div>
          {selectedMind2 && (
            <div className="rounded-lg border border-primary bg-primary/10 p-3 text-sm text-foreground">
              ✓ {selectedMind2.name} selecionado
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Settings */}
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Tópico do Debate</label>
          <Input
            placeholder="Ex: A Inteligência Artificial terá consciência?"
            className="h-12 border-border bg-input text-lg"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setTopic('O futuro do trabalho remoto')}
            >
              Futuro do Trabalho
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setTopic('Universal Basic Income')}
            >
              UBI
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => setTopic('Colonização de Marte')}
            >
              Marte
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Framework</label>
            <Select
              value={framework}
              onValueChange={setFramework}
              options={FRAMEWORKS.map((f) => ({ label: f.name, value: f.id }))}
              className="border-border bg-input"
            />
            <p className="text-xs text-muted-foreground">
              {FRAMEWORKS.find((f) => f.id === framework)?.desc}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Visibilidade</label>
            <Select
              defaultValue="public"
              options={[
                { label: 'Público', value: 'public' },
                { label: 'Privado', value: 'private' },
              ]}
              className="border-border bg-input"
            />
          </div>
        </div>

        <Button
          size="lg"
          className="mt-8 h-14 w-full bg-foreground text-lg font-bold text-background hover:bg-foreground/90"
          onClick={handleStart}
        >
          <Icon name="play" className="mr-2" /> Iniciar Debate
        </Button>
      </div>
    </div>
  );
};
