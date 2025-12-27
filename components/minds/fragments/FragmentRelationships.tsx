import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Spinner } from '../../ui/spinner';
import { cn } from '../../../lib/utils';
import { FRAGMENT_TYPE_ICONS, FRAGMENT_TYPE_COLORS } from '../../../hooks/useMindFragments';

interface RelatedFragment {
  id: string;
  type: string;
  content: string;
  relationshipType: string;
  direction: 'from' | 'to';
}

interface FragmentRelationshipsProps {
  fragmentId: string;
  onNavigate: (fragmentId: string) => void;
}

// Relationship type labels
const RELATIONSHIP_TYPE_LABELS: Record<string, string> = {
  related: 'Relacionado',
  supports: 'Suporta',
  contradicts: 'Contradiz',
  refines: 'Refina',
  duplicates: 'Duplica',
  causes: 'Causa',
  explains: 'Explica',
};

// Relationship type icons
const RELATIONSHIP_TYPE_ICONS: Record<string, string> = {
  related: 'link',
  supports: 'arrow-up',
  contradicts: 'exchange-alt',
  refines: 'filter',
  duplicates: 'copy',
  causes: 'arrow-right',
  explains: 'info-circle',
};

export const FragmentRelationships: React.FC<FragmentRelationshipsProps> = ({
  fragmentId,
  onNavigate,
}) => {
  const [relationships, setRelationships] = useState<RelatedFragment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchRelationships = async () => {
      if (!fragmentId || !isSupabaseConfigured()) {
        setRelationships([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Fetch relationships where this fragment is either from or to
        const [fromResult, toResult] = await Promise.all([
          supabase
            .from('fragment_relationships')
            .select(`
              to_fragment_id,
              relationship_type,
              fragments:to_fragment_id (id, type, content)
            `)
            .eq('from_fragment_id', fragmentId),
          supabase
            .from('fragment_relationships')
            .select(`
              from_fragment_id,
              relationship_type,
              fragments:from_fragment_id (id, type, content)
            `)
            .eq('to_fragment_id', fragmentId),
        ]);

        const related: RelatedFragment[] = [];

        // Process "from" relationships (this fragment points to others)
        if (fromResult.data) {
          fromResult.data.forEach((r: Record<string, unknown>) => {
            const frag = r.fragments as { id: string; type: string; content: string } | null;
            if (frag) {
              related.push({
                id: frag.id,
                type: frag.type,
                content: frag.content,
                relationshipType: r.relationship_type as string,
                direction: 'to',
              });
            }
          });
        }

        // Process "to" relationships (others point to this fragment)
        if (toResult.data) {
          toResult.data.forEach((r: Record<string, unknown>) => {
            const frag = r.fragments as { id: string; type: string; content: string } | null;
            if (frag) {
              related.push({
                id: frag.id,
                type: frag.type,
                content: frag.content,
                relationshipType: r.relationship_type as string,
                direction: 'from',
              });
            }
          });
        }

        setRelationships(related);
      } catch (err) {
        console.error('Error fetching relationships:', err);
        setRelationships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelationships();
  }, [fragmentId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
        <Spinner size="sm" />
        Carregando relações...
      </div>
    );
  }

  if (relationships.length === 0) {
    return null;
  }

  const visibleRelationships = expanded ? relationships : relationships.slice(0, 3);

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <Icon name="project-diagram" size="size-3" />
        Relações
        <Badge variant="secondary" className="text-[9px] h-4 px-1.5 leading-none">
          {relationships.length}
        </Badge>
      </h4>

      <div className="space-y-1">
        {visibleRelationships.map((rel) => (
          <button
            key={`${rel.id}-${rel.direction}`}
            onClick={() => onNavigate(rel.id)}
            className="w-full flex items-center gap-2 p-2 rounded-md bg-muted/20 hover:bg-muted/30 transition-colors text-left group"
          >
            {/* Relationship direction indicator */}
            <div className="flex items-center gap-1 shrink-0">
              <Icon
                name={RELATIONSHIP_TYPE_ICONS[rel.relationshipType] || 'link'}
                size="size-3"
                className={cn(
                  "text-muted-foreground",
                  rel.direction === 'from' && "rotate-180"
                )}
              />
            </div>

            {/* Type icon */}
            <Icon
              name={FRAGMENT_TYPE_ICONS[rel.type] || 'file'}
              size="size-3"
              className={FRAGMENT_TYPE_COLORS[rel.type] || 'text-muted-foreground'}
            />

            {/* Content preview */}
            <span className="text-xs text-muted-foreground group-hover:text-foreground line-clamp-1 flex-1">
              {rel.content.slice(0, 60)}...
            </span>

            {/* Relationship type badge */}
            <Badge
              variant="outline"
              className="text-[9px] h-4 px-1.5 leading-none border-border text-muted-foreground shrink-0"
            >
              {RELATIONSHIP_TYPE_LABELS[rel.relationshipType] || rel.relationshipType}
            </Badge>

            {/* Navigate icon */}
            <Icon
              name="arrow-right"
              size="size-3"
              className="text-muted-foreground/30 group-hover:text-brand-gold shrink-0"
            />
          </button>
        ))}
      </div>

      {/* Show more/less button */}
      {relationships.length > 3 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          {expanded ? (
            <>
              <Icon name="angle-up" size="size-3" className="mr-1" />
              Mostrar menos
            </>
          ) : (
            <>
              <Icon name="angle-down" size="size-3" className="mr-1" />
              Ver mais {relationships.length - 3}
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default FragmentRelationships;
