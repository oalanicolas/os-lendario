import React, { useMemo, useState } from 'react';
import YAML from 'yaml';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';

interface YamlViewerProps {
  content: string;
  className?: string;
}

// Check if content looks like YAML
export const isYamlContent = (content: string, sourceFile?: string | null): boolean => {
  if (sourceFile) {
    const ext = sourceFile.split('.').pop()?.toLowerCase();
    if (ext === 'yaml' || ext === 'yml') return true;
  }

  if (!content || content.length > 50000) return false; // Safety limit
  const trimmed = content.trim();

  // Must have YAML structure indicators
  const hasYamlStructure = /^[\w-]+:\s/m.test(trimmed) || /^-\s/m.test(trimmed);
  if (!hasYamlStructure) return false;

  const yamlPatterns = [
    /^---\s*$/m,
    /^[\w-]+:\s*$/m,
    /^[\w-]+:\s+[|><]/m, // Block scalars
  ];

  return yamlPatterns.some(pattern => pattern.test(trimmed));
};

const formatKey = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/([A-Z])/g, ' $1') // Space before caps
    .replace(/^./, str => str.toUpperCase())
    .trim();
};


// --- NEURAL TREE COMPONENTS ---

const TreeLine: React.FC<{ isLast?: boolean }> = ({ isLast }) => (
  <div className={cn(
    "absolute left-0 top-0 bottom-0 border-l border-white/5 w-px", // Subtle line
    isLast && "h-[18px]" // Stop line exactly at connector
  )} />
);

const Connector: React.FC = () => (
  <div className="absolute left-0 top-[18px] w-4 border-t border-white/5 h-px" />
);

const ExpandButton: React.FC<{ expanded: boolean; onClick: () => void }> = ({ expanded, onClick }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="absolute -left-[5px] top-[13px] z-10 w-[11px] h-[11px] flex items-center justify-center rounded-[2px] bg-[#0F0F11] border border-white/10 hover:border-brand-gold/50 transition-all opacity-0 group-hover/node:opacity-100"
  >
    <Icon name={expanded ? "minus" : "plus"} size="size-[6px]" className="text-zinc-500" />
  </button>
);

const KeyLabel: React.FC<{ label: string; icon?: string }> = ({ label, icon }) => (
  <span className="flex items-center gap-2 text-sm text-zinc-400 font-medium select-none group-hover/node:text-zinc-200 transition-colors">
    {icon && <Icon name={icon} size="size-3" className="opacity-40 group-hover/node:opacity-80 transition-opacity" />}
    <span className="opacity-90">{formatKey(label)}</span>
  </span>
);

const ValueBadge: React.FC<{ value: string | number }> = ({ value }) => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-zinc-400 border border-white/5">
    {value}
  </span>
);

// Recursive Tree Node
// ... (TreeNode component remains similar but with updated styling hooks)

const TreeNode: React.FC<{
  nodeKey: string;
  value: any;
  depth?: number;
  isLast?: boolean;
  parentExpanded?: boolean;
}> = ({ nodeKey, value, depth = 0, isLast = false, parentExpanded = true }) => {
  const [expanded, setExpanded] = useState(true);

  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray(value);
  // Only expandable if it has actual content
  const hasContent = isObject ? Object.keys(value).length > 0 : (isArray ? value.length > 0 : false);
  const isExpandable = hasContent && (isObject || (isArray && !value.every((i: any) => typeof i !== 'object')));

  // Identify if array is a simple list of strings/numbers (render as badges)
  const isSimpleArray = isArray && value.every((i: any) => typeof i === 'string' || typeof i === 'number');

  if (!parentExpanded) return null;

  return (
    <div className="relative pl-6 select-none">
      {/* Indentation Lines */}
      {depth > 0 && <TreeLine isLast={isLast} />}
      {depth > 0 && <Connector />}

      {/* Node Header/Content */}
      <div className="py-1 relative group/node">
        {/* Toggle Button for Complex Objects */}
        {isExpandable && (
          <ExpandButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
        )}

        <div
          className={cn(
            "flex flex-col gap-1 py-0.5 px-1 rounded-sm -ml-1 transition-colors",
            isExpandable && "cursor-pointer hover:bg-white/5"
          )}
          onClick={(e) => {
            if (isExpandable) {
              e.stopPropagation();
              setExpanded(!expanded);
            }
          }}
        >
          {/* Key + Value Row */}
          <div className="flex items-start gap-2 min-h-[24px]">
            <KeyLabel label={nodeKey} />

            {/* If simple primitive value, show inline */}
            {!isObject && !isArray && (
              <span className="text-sm text-zinc-500 font-mono pt-[1px]">
                {String(value).length > 60 ? (
                  <span className="block mt-1 p-2 bg-black/40 rounded border border-white/5 text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">
                    {String(value)}
                  </span>
                ) : (
                  <span className="text-brand-gold/80">{String(value)}</span>
                )}
              </span>
            )}

            {/* If Simple Array, show Badges */}
            {isSimpleArray && (
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {(value as any[]).map((item, i) => (
                  <Badge key={i} variant="secondary" className="bg-zinc-900 border-zinc-800 text-zinc-400 font-mono text-[10px] px-1.5 h-5 rounded-md">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Children (Nested Objects) */}
        {expanded && isObject && (
          <div className="relative">
            {Object.entries(value).map(([childKey, childValue], i, arr) => (
              <TreeNode
                key={childKey}
                nodeKey={childKey}
                value={childValue}
                depth={depth + 1}
                isLast={i === arr.length - 1}
              />
            ))}
          </div>
        )}

        {/* Children (Array of Objects) */}
        {expanded && isArray && !isSimpleArray && (
          <div className="relative">
            {(value as any[]).map((item, i, arr) => (
              <TreeNode
                key={i}
                nodeKey={`${nodeKey.replace(/s$/, '')} ${i + 1}`}
                value={item}
                depth={depth + 1}
                isLast={i === arr.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// Helper to render markdown fallback
// Check if content looks like JSON
export const isJsonContent = (content: string, sourceFile?: string | null): boolean => {
  if (sourceFile) {
    const ext = sourceFile.split('.').pop()?.toLowerCase();
    if (ext === 'json') return true;
  }

  if (!content || content.length > 50000) return false;
  const trimmed = content.trim();
  return (trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'));
};

const MarkdownFallback: React.FC<{ content: string; error?: string }> = ({ content, error }) => {
  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-xs font-mono">
          <Icon name="warning" size="size-3" />
          <span>Falha ao processar estrutura de dados. Exibindo texto bruto.</span>
        </div>
      )}
      <pre className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 text-sm text-zinc-400 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
        {content}
      </pre>
    </div>
  );
};

// Generic Tree Viewer Component (reused by YAML and JSON wrappers)
const NeuralTreeViewer: React.FC<{ data: any }> = ({ data }) => {
  if (data === null || typeof data !== 'object') {
    return (
      <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 text-zinc-300 font-mono text-sm break-all">
        {String(data)}
      </div>
    );
  }

  return (
    <div className="font-mono text-sm leading-relaxed -ml-4">
      {Object.entries(data).map(([key, value], i, arr) => (
        <TreeNode
          key={key}
          nodeKey={key}
          value={value}
          isLast={i === arr.length - 1}
        />
      ))}
    </div>
  );
};

export const YamlViewer: React.FC<YamlViewerProps> = ({ content, className }) => {
  const [parseError, setParseError] = React.useState<string | null>(null);
  const [parsedData, setParsedData] = React.useState<any>(null);

  React.useEffect(() => {
    try {
      if (!content) {
        setParsedData(null);
        setParseError(null);
        return;
      }
      // Basic YAML safety check
      if (content.length > 200000) throw new Error("File too large to parse");

      // Handle multi-document YAML (e.g. from Jekyll/Frontmatter)
      // Split by --- and find the first valid YAML object
      const documents = content.split(/^---$/m).filter(doc => doc.trim().length > 0);

      let data = null;
      if (documents.length > 0) {
        try {
          data = YAML.parse(documents[0]);
        } catch (e) {
          // If first doc fails, try the second (common in frontmatter files where first part is empty)
          if (documents.length > 1) {
            data = YAML.parse(documents[1]);
          } else {
            throw e;
          }
        }
      } else {
        data = YAML.parse(content);
      }

      setParsedData(data);
      setParseError(null);
    } catch (e: any) {
      console.warn('YAML Parse Warning:', e);
      setParseError(e.message || 'Unknown parsing error');
      setParsedData(null);
    }
  }, [content]);

  if (parseError) {
    return <MarkdownFallback content={content} error={parseError} />;
  }

  if (!parsedData) {
    return <div className="text-muted-foreground italic text-xs">Vazio ou carregando...</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <NeuralTreeViewer data={parsedData} />
    </div>
  );
};

export const JsonViewer: React.FC<YamlViewerProps> = ({ content, className }) => {
  const [parseError, setParseError] = React.useState<string | null>(null);
  const [parsedData, setParsedData] = React.useState<any>(null);

  React.useEffect(() => {
    try {
      if (!content) {
        setParsedData(null);
        setParseError(null);
        return;
      }
      const data = JSON.parse(content);
      setParsedData(data);
      setParseError(null);
    } catch (e: any) {
      console.warn('JSON Parse Warning:', e);
      setParseError(e.message || 'Unknown parsing error');
      setParsedData(null);
    }
  }, [content]);

  if (parseError) {
    return <MarkdownFallback content={content} error={parseError} />;
  }

  if (!parsedData) {
    return <div className="text-muted-foreground italic text-xs">Vazio ou carregando...</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <NeuralTreeViewer data={parsedData} />
    </div>
  );
};
