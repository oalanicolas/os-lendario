import React from 'react';
import { Section } from '../../../types';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../../ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { MindProfile } from '../../../hooks/useMind';

interface MindHeroSectionProps {
  mind: MindProfile;
  avatarSrc: string;
  onImageError: () => void;
  onEditClick: () => void;
  onEditSettingsClick: () => void;
  onDeleteClick: () => void;
  setSection: (s: Section) => void;
}

const tierColors: Record<number, string> = {
  1: 'bg-brand-gold text-black border-brand-gold shadow-[0_0_15px_rgba(255,188,2,0.3)]',
  2: 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(14,165,233,0.3)]',
  3: 'bg-zinc-700 text-zinc-300 border-zinc-600'
};

const statusConfig = {
  production: { label: 'OPERATIONAL', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'activity' },
  progress: { label: 'TRAINING', color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20', icon: 'zap' },
  draft: { label: 'OFFLINE', color: 'text-zinc-500', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', icon: 'power' }
};

export const MindHeroSection: React.FC<MindHeroSectionProps> = ({
  mind,
  avatarSrc,
  onImageError,
  onEditClick,
  onEditSettingsClick,
  onDeleteClick,
  setSection
}) => {
  const status = statusConfig[mind.status || 'draft'];

  // Calculate specific metrics
  const topProficiency = mind.proficiencies?.sort((a, b) => b.level - a.level)[0];
  const totalObsessions = mind.obsessions?.length || 0;

  return (
    <div className="relative bg-[#0F0F13] border-b border-white/10 overflow-hidden">
      {/* Neural Data Stream Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,15,19,0.95),rgba(15,15,19,0.8)),url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      {/* Decorative Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 p-6 md:p-8">
        {/* Navigation & Status Header */}
        <div className="flex justify-between items-center mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setSection(Section.APP_MINDS_GALLERY)}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center gap-2 hover:scale-105 transform duration-200"
                >
                  <Icon name="grid" size="size-3" />
                  Galeria
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-zinc-700" />
              <BreadcrumbItem>
                <span className="font-semibold text-white tracking-wide">{mind.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* System Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${status.bg} ${status.border} backdrop-blur-md`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status.color.replace('text', 'bg')} animate-pulse`}></div>
            <span className={`text-[10px] font-bold tracking-widest ${status.color}`}>SYSTEM {status.label}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* LEFT: Avatar & Identity */}
          <div className="flex-1 flex gap-8 items-start min-w-[300px]">
            {/* Holographic Avatar Container */}
            <div className="relative group shrink-0">
              {/* Spinning Rings Effect */}
              <div className="absolute -inset-1 border border-brand-gold/30 rounded-full w-[136px] h-[136px] animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -inset-2 border border-primary/20 rounded-full w-[144px] h-[144px] animate-[spin_15s_linear_infinite_reverse] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative w-32 h-32 rounded-xl border border-white/10 overflow-hidden shadow-2xl bg-zinc-900 group-hover:border-brand-gold/50 transition-colors duration-500">
                <img
                  src={avatarSrc}
                  alt={mind.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  onError={onImageError}
                />
                {/* Glitch Overlay on Hover (simulated with gradient) */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur text-[9px] font-mono text-brand-gold px-2 py-0.5 rounded border border-brand-gold/20 uppercase tracking-widest whitespace-nowrap">
                ID: {mind.slug.substring(0, 6)}
              </div>
            </div>

            {/* Mind Identity Data */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                    {mind.name}
                  </h1>
                  <Badge className={`${tierColors[mind.tier]} font-black border uppercase tracking-widest text-[10px] px-2 py-0.5 rounded-sm`}>
                    Tier 0{mind.tier}
                  </Badge>
                </div>
                <p className="text-lg text-zinc-400 font-serif italic border-l-2 border-brand-gold/50 pl-4 py-1">
                  {mind.signatureSkill}
                </p>
              </div>

              {/* Active Obsessions Ticker */}
              {mind.obsessions && mind.obsessions.length > 0 && (
                <div className="flex items-center gap-2 overflow-hidden max-w-[400px]">
                  <Icon name="zap" size="size-3" className="text-brand-gold shrink-0" />
                  <div className="flex gap-2 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                    {mind.obsessions.slice(0, 3).map((obs, i) => (
                      <span key={i} className="hover:text-white transition-colors cursor-default whitespace-nowrap">
                        [{obs.name}]
                        {i < Math.min(mind.obsessions.length, 3) - 1 && <span className="mx-1 text-zinc-700">/</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Vital Signs (Metrics) */}
          <div className="flex gap-4 lg:w-auto w-full overflow-x-auto pb-2 lg:pb-0">
            {/* APEX Score Module */}
            <div className="bg-[#0A0A0E] border border-white/10 rounded-lg p-4 w-[160px] shrink-0 hover:border-brand-gold/30 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1.5 opacity-50">
                <Icon name="brain" size="size-3" className="text-zinc-600 group-hover:text-brand-gold" />
              </div>
              <div className="flex flex-col justify-end h-full">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Apex Score</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{mind.apexScore ? (mind.apexScore * 10).toFixed(1) : '--'}</span>
                  <span className="text-[10px] text-zinc-600 font-bold">/100</span>
                </div>
                {/* Mini Progress Bar */}
                <div className="w-full h-0.5 bg-zinc-800 mt-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-brand-gold" style={{ width: `${(mind.apexScore || 0) * 10}%` }}></div>
                </div>
              </div>
            </div>

            {/* Knowledge Module */}
            <div className="bg-[#0A0A0E] border border-white/10 rounded-lg p-4 w-[160px] shrink-0 hover:border-primary/30 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1.5 opacity-50">
                <Icon name="database" size="size-3" className="text-zinc-600 group-hover:text-primary" />
              </div>
              <div className="flex flex-col justify-end h-full">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Neural Data</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{mind.sourcesCount}</span>
                  <span className="text-[10px] text-zinc-600 font-bold">files</span>
                </div>
                <div className="w-full h-0.5 bg-zinc-800 mt-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: `${Math.min(mind.sourcesCount, 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Top Skill Module */}
            <div className="bg-[#0A0A0E] border border-white/10 rounded-lg p-4 w-[180px] shrink-0 hover:border-purple-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1.5 opacity-50">
                <Icon name="trophy" size="size-3" className="text-zinc-600 group-hover:text-purple-500" />
              </div>
              <div className="flex flex-col justify-end h-full">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Top Skill</span>
                <div className="text-md font-bold text-white leading-tight truncate" title={topProficiency?.skillName || "N/A"}>
                  {topProficiency?.skillName || "Learning..."}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (topProficiency ? Math.ceil(topProficiency.level / 2) : 0) ? 'bg-purple-500' : 'bg-zinc-800'}`}></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-purple-400">LVL {topProficiency?.level || 0}</span>
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            <div className="flex flex-col gap-2 ml-2 justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-white/20"
                  >
                    <Icon name="settings" size="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] bg-black border-white/10">
                  <DropdownMenuItem onClick={onEditSettingsClick} className="text-xs">
                    <Icon name="edit" className="mr-2 size-3" />
                    Editar Informações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onEditClick} className="text-xs">
                    <Icon name="image" className="mr-2 size-3" />
                    Alterar Avatar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={onDeleteClick}
                    className="text-red-500 focus:text-red-500 text-xs"
                  >
                    <Icon name="trash" className="mr-2 size-3" />
                    Deletar Mente
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="icon"
                className="h-8 w-8 bg-brand-gold text-black hover:bg-brand-gold/90 shadow-[0_0_10px_rgba(255,188,2,0.2)]"
              >
                <Icon name="play" size="size-4" type="solid" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindHeroSection;
