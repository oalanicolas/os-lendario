
import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

// DiceBear fallback for missing images
const getDiceBearUrl = (slug: string): string => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};

import type { PsychometricProfile } from '../../../types/psychometrics';

export interface MindData {
    id: string;
    name: string;
    slug: string;
    avatar: string;
    hasRealAvatar: boolean;
    description: string;
    status: 'production' | 'progress' | 'draft';
    completion?: string; // Deprecated but kept for type compat if needed
    score?: number; // Deprecated
    signatureSkill: string;
    expertise: string[];
    differentials: string[];
    taxonomy: {
        category: string;
        roles: string[];
    };
    progressPercent?: number;
    psychometrics?: PsychometricProfile;
}

interface MindCardProps {
    mind: MindData;
    onClick?: () => void;
}

const MindCard: React.FC<MindCardProps> = ({ mind, onClick }) => {
    const [imgError, setImgError] = useState(false);

    // Card Opacity/Style based on Status
    const isDraft = mind.status === 'draft';
    const isProgress = mind.status === 'progress';

    // Use avatar, fallback to DiceBear if image fails to load
    const avatarSrc = imgError ? getDiceBearUrl(mind.slug) : mind.avatar;

    // Status Colors
    const statusColors = {
        production: { border: "border-brand-gold/30", text: "text-brand-gold", bg: "bg-brand-gold/10" },
        progress: { border: "border-brand-teal/30", text: "text-brand-teal", bg: "bg-brand-teal/10" },
        draft: { border: "border-zinc-700/30", text: "text-zinc-500", bg: "bg-zinc-800/10" }
    };

    const statusStyle = statusColors[mind.status] || statusColors.draft;

    return (
        <Card
            className={cn(
                "group relative overflow-hidden rounded-xl border border-white/5 bg-[#0A0A0C] hover:border-brand-gold/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:bg-black/40 h-full flex flex-col",
                isDraft && "opacity-60 grayscale-[0.8]"
            )}
            onClick={onClick}
        >
            {/* Background Gradient Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <CardContent className="p-0 flex flex-col h-full relative z-10">

                {/* 1. HEADER & AVATAR */}
                <div className="p-6 pb-0 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        {/* Avatar Ring */}
                        <div className={cn(
                            "w-20 h-20 rounded-full p-1 border transition-all duration-500",
                            mind.status === 'production' ? "border-brand-gold/20 group-hover:border-brand-gold/60" : "border-white/10"
                        )}>
                            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                                <img
                                    src={avatarSrc}
                                    alt={mind.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={() => setImgError(true)}
                                />
                            </div>
                        </div>
                        {/* Status Dot (Absolute) */}
                        <div className={cn(
                            "absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-[#0A0A0C]",
                            mind.status === 'production' ? "bg-emerald-500" : mind.status === 'progress' ? "bg-amber-500 animate-pulse" : "bg-zinc-600"
                        )} />
                    </div>

                    <h3 className="font-bold font-sans text-lg text-white mb-1 group-hover:text-brand-gold transition-colors">
                        {mind.name}
                    </h3>

                    {/* Integrated Signature Skill */}
                    <div className="mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/5 text-zinc-400 border border-white/5 group-hover:border-brand-gold/20 group-hover:text-brand-gold/80 transition-all">
                            {mind.signatureSkill || 'Synthetic Mind'}
                        </span>
                    </div>

                    {/* Psychometric Badges (Conditional) */}
                    {mind.psychometrics && (
                        <div className="flex gap-2 mb-2">
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-purple-500/20 bg-purple-500/10 text-[9px] font-mono text-purple-400" title={`MBTI: ${mind.psychometrics.mbti.role}`}>
                                {mind.psychometrics.mbti.type}
                            </div>
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-blue-500/20 bg-blue-500/10 text-[9px] font-mono text-blue-400" title={`Enneagram: ${mind.psychometrics.enneagram.triad}`}>
                                {mind.psychometrics.enneagram.type}
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. DESCRIPTION (Simplified) */}
                <div className="px-6 pb-6 flex-1">
                    <p className="text-xs text-zinc-500 text-center leading-relaxed line-clamp-3 font-serif italic">
                        "{mind.description}"
                    </p>
                </div>

                {/* 3. FOOTER (Expertise & Status) */}
                <div className="mt-auto border-t border-white/5 bg-white/[0.01] p-4 flex items-center justify-between group-hover:bg-white/[0.03] transition-colors gap-4">

                    {/* LEFT: Expertise Tags (Now always visible) */}
                    <div className="flex items-center gap-1.5 overflow-hidden">
                        {mind.expertise?.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-[9px] font-medium px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/5 text-zinc-400 whitespace-nowrap group-hover:text-zinc-300 group-hover:border-white/10 transition-colors">
                                {skill}
                            </span>
                        ))}
                        {(mind.expertise?.length || 0) > 3 && (
                            <span className="text-[9px] text-zinc-600">+{mind.expertise.length - 3}</span>
                        )}
                    </div>

                    {/* RIGHT: Status or Action */}
                    <div className="shrink-0">
                        {isProgress && mind.progressPercent ? (
                            <div className="flex items-center gap-2" title="Em progresso">
                                <div className="h-1 w-8 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-teal" style={{ width: `${mind.progressPercent}%` }} />
                                </div>
                                <span className="text-[9px] text-brand-teal font-mono">{mind.progressPercent}%</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-brand-gold/20 transition-all">
                                <Icon name="arrow-right" size="size-3" />
                            </div>
                        )}
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};

export default MindCard;
