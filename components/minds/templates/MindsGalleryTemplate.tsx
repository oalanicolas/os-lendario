
import React, { useState } from 'react';
import MindsTopbar from '../MindsTopbar';
import MindCard from '../ui/MindCard';
import { MindCardSkeleton } from '../ui/MindSkeletons';
import { Section } from '../../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { useMinds } from '../../../hooks/useMinds';

interface MindsGalleryProps {
  setSection: (s: Section) => void;
  onSelectMind?: (slug: string) => void;
}

const MindsGalleryTemplate: React.FC<MindsGalleryProps> = ({ setSection, onSelectMind }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'production' | 'progress'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { minds, loading, error, totalMinds } = useMinds();

  // Filter minds by status and search, then sort: with avatar first, then alphabetically
  const filteredMinds = minds
    .filter(mind => {
      const matchesStatus = statusFilter === 'all' || mind.status === statusFilter;
      const matchesSearch = !searchQuery ||
        mind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mind.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mind.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      // Prioritize minds with real avatar photos first
      if (a.hasRealAvatar && !b.hasRealAvatar) return -1;
      if (!a.hasRealAvatar && b.hasRealAvatar) return 1;

      // Then sort alphabetically by name
      return a.name.localeCompare(b.name, 'pt-BR');
    });

  const handleMindClick = (slug: string) => {
    if (onSelectMind) {
      onSelectMind(slug);
    } else {
      setSection(Section.APP_MINDS_PROFILE);
    }
  };

  const renderListView = () => (
    <div className="w-full bg-[#0A0A0C] border border-white/5 rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white/[0.02] border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
        <div className="col-span-3">Mente Sintética</div>
        <div className="col-span-2">Habilidade Assinatura</div>
        <div className="col-span-3">Resumo</div>
        <div className="col-span-2">Expertise</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Ações</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/5">
        {filteredMinds.map(mind => (
          <div key={mind.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.01] transition-colors group cursor-pointer" onClick={() => handleMindClick(mind.slug)}>
            {/* Name & Avatar */}
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden shrink-0">
                <img src={mind.avatar} alt={mind.name} className="w-full h-full object-cover" onError={(e) => {
                  // Fallback if image fails
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerText = mind.name.substring(0, 2).toUpperCase();
                  (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-zinc-500');
                }} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors truncate">{mind.name}</span>
                <span className="text-[10px] text-zinc-500 font-mono truncate">@{mind.slug}</span>
              </div>
            </div>

            {/* Signature Skill (Superpower) */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                {/* <Icon name="lightning" size="size-3" className="text-brand-gold" /> */}
                <span className="text-xs font-medium text-brand-gold/90">{mind.signatureSkill || 'Synthetic Mind'}</span>
              </div>
            </div>

            {/* Description (Truncated) */}
            <div className="col-span-3 pr-4">
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {mind.description}
              </p>
            </div>

            {/* Expertise */}
            <div className="col-span-2">
              {mind.expertise && mind.expertise.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <span className="inline-flex w-fit px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px] border border-white/5 whitespace-nowrap">
                    {mind.expertise[0]}
                  </span>
                  {mind.expertise.length > 1 && (
                    <span className="text-[10px] text-zinc-600 pl-1">+{mind.expertise.length - 1} áreas</span>
                  )}
                </div>
              ) : <span className="text-zinc-700 text-xs">-</span>}
            </div>

            {/* Status */}
            <div className="col-span-1">
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${mind.status === 'production'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>
                {mind.status === 'production' ? 'Ativo' : 'Criando'}
              </div>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full">
                <Icon name="arrow-right" size="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans pb-20">
      <MindsTopbar currentSection={Section.APP_MINDS_GALLERY} setSection={setSection} />

      <main className="p-6 space-y-8 flex-1 max-w-[1400px] mx-auto w-full">

        {/* --- FILTERS BAR --- */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-[#0A0A0C] border border-white/5 p-2 rounded-xl shadow-sm">

          {/* Search */}
          <div className="relative w-full xl:w-96">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size="size-4" />
            <Input
              placeholder="Buscar por nome, tag ou categoria..."
              className="pl-10 h-10 rounded-lg bg-transparent border-transparent hover:bg-white/5 focus:bg-white/5 focus:border-white/10 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap gap-2 w-full xl:w-auto items-center p-1">
            <Select
              placeholder="Categorias"
              options={[
                { label: 'Todas Categorias', value: 'all' },
                { label: 'Tecnologia', value: 'technology_innovation' },
                { label: 'Negócios', value: 'business_strategy' },
                { label: 'Filosofia', value: 'philosophy' },
              ]}
              className="w-[160px] h-9 text-xs bg-transparent border-white/5 hover:border-white/10"
            />

            <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as 'all' | 'production' | 'progress')} className="w-auto">
              <TabsList className="h-9 bg-white/5 rounded-lg p-1 border border-white/5">
                <TabsTrigger value="all" className="text-[10px] h-7 rounded-sm data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500">Todas</TabsTrigger>
                <TabsTrigger value="production" className="text-[10px] h-7 rounded-sm data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 text-zinc-500">Produção</TabsTrigger>
                <TabsTrigger value="progress" className="text-[10px] h-7 rounded-sm data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-400 text-zinc-500">Em Progresso</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="w-px h-6 bg-white/10 mx-2 hidden md:block"></div>

            <div className="flex bg-white/5 p-1 gap-1 rounded-lg border border-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Icon name="grid" size="size-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <Icon name="list" size="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- CONTENT --- */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white">Mentes</h2>
              <span className="text-xs text-zinc-500 font-mono translate-y-[-2px]">
                ({filteredMinds.length})
              </span>
            </div>
            <Button className="h-10 px-6 rounded-full bg-brand-gold text-black hover:bg-brand-gold/90 border-0 font-bold text-xs tracking-wide">
              <Icon name="plus" size="size-4" className="mr-2" /> NOVA MENTE
            </Button>
          </div>

          {/* Loading / Error / Empty States */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MindCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-xl text-center">
              <p className="text-red-400 text-sm">Erro ao carregar dados</p>
            </div>
          )}

          {!loading && !error && filteredMinds.length === 0 && (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-xl">
              <p className="text-zinc-500 text-sm">Nenhuma mente encontrada.</p>
            </div>
          )}

          {/* Content Rendering */}
          {!loading && !error && filteredMinds.length > 0 && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMinds.map((mind) => (
                    <MindCard
                      key={mind.id}
                      mind={mind}
                      onClick={() => handleMindClick(mind.slug)}
                    />
                  ))}

                  {/* Create New Mind Placeholder Card */}
                  <button className="group border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center h-full min-h-[320px] hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand-gold/20 flex items-center justify-center text-zinc-600 group-hover:text-brand-gold transition-colors mb-4">
                      <Icon name="plus" size="size-8" />
                    </div>
                    <span className="font-bold text-sm text-zinc-500 group-hover:text-brand-gold tracking-wide uppercase">Criar Nova Mente</span>
                  </button>
                </div>
              ) : (
                renderListView()
              )}
            </>
          )}
        </div>

      </main>
    </div>
  );
};

export default MindsGalleryTemplate;
