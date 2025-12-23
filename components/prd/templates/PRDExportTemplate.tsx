// @ts-nocheck
import React, { useState, useCallback, useMemo } from 'react';
import { PRDProject, EpicData, StoryData } from '../../../types/prd';
import {
  EXPORT_OPTIONS,
  ExportFormat,
  ExportOption,
  ExportResult,
  generateExport,
  downloadExport,
} from '../../../lib/prd/export-functions';
import { PRD_PRIMARY, PRD_STATUS } from '../prd-tokens';
import PRDEffortIndicator from '../PRDEffortIndicator';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface PRDExportTemplateProps {
  project: PRDProject;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface ExportOptionCardProps {
  option: ExportOption;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const ExportOptionCard: React.FC<ExportOptionCardProps> = ({
  option,
  selected,
  onSelect,
  disabled,
}) => {
  const isComingSoon = option.status === 'coming_soon';

  return (
    <button
      onClick={onSelect}
      disabled={disabled || isComingSoon}
      className={cn(
        'relative rounded-xl border-2 p-6 text-left transition-all',
        'hover:border-primary/50 hover:shadow-md',
        selected && 'border-primary bg-primary/5 shadow-md',
        !selected && 'border-muted-foreground/20',
        (disabled || isComingSoon) &&
          'cursor-not-allowed opacity-50 hover:border-muted-foreground/20 hover:shadow-none'
      )}
    >
      {/* Coming Soon Badge */}
      {isComingSoon && (
        <Badge className="absolute right-3 top-3 bg-muted text-xs text-muted-foreground">
          Em breve
        </Badge>
      )}

      {/* Icon */}
      <div
        className={cn(
          'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
          selected ? 'bg-primary/20' : 'bg-muted'
        )}
        style={{ backgroundColor: selected ? `${PRD_PRIMARY}20` : undefined }}
      >
        <Icon
          name={option.icon}
          className="size-6"
          style={{ color: selected ? PRD_PRIMARY : undefined }}
        />
      </div>

      {/* Content */}
      <h3 className="mb-1 text-lg font-bold">{option.label}</h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">{option.description}</p>

      {/* Output Format */}
      <div className="mt-3 flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {option.outputFormat === 'markdown'
            ? '.md'
            : option.outputFormat === 'zip'
              ? '.zip'
              : '.json'}
        </Badge>
      </div>

      {/* Selected Indicator */}
      {selected && (
        <div
          className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: PRD_PRIMARY }}
        >
          <Icon name="check" className="size-4 text-white" />
        </div>
      )}
    </button>
  );
};

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  format: ExportFormat;
  onDownload: () => void;
  onCopy: () => void;
}

const ExportPreviewModal: React.FC<ExportPreviewModalProps> = ({
  isOpen,
  onClose,
  content,
  format,
  onDownload,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[85vh] max-w-4xl flex-col" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="eye" className="size-5" />
            Preview - {EXPORT_OPTIONS.find((o) => o.key === format)?.label}
          </DialogTitle>
        </DialogHeader>

        {/* Content Preview */}
        <div className="flex-1 overflow-auto rounded-lg bg-muted/30 p-4 font-mono text-sm">
          <pre className="whitespace-pre-wrap break-words">{content}</pre>
        </div>

        <DialogFooter className="flex-shrink-0 gap-2">
          <Button variant="outline" onClick={handleCopy}>
            <Icon name={copied ? 'check' : 'copy'} className="mr-2 size-4" />
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
          <Button onClick={onDownload} style={{ backgroundColor: PRD_PRIMARY }}>
            <Icon name="download" className="mr-2 size-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDExportTemplate: React.FC<PRDExportTemplateProps> = ({ project }) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('lovable');
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const epics = useMemo(() => {
    return project.project_metadata?.epics || [];
  }, [project]);

  const stories = useMemo(() => {
    return project.project_metadata?.stories || [];
  }, [project]);

  const canExport = epics.length > 0;

  // Generate export
  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = generateExport(selectedFormat, project, epics, stories);
      setExportResult(result);
      setShowPreview(true);
    } catch (error) {
      console.error('[PRD-Export] Failed to generate:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [selectedFormat, project, epics, stories]);

  // Download file
  const handleDownload = useCallback(async () => {
    if (!exportResult) return;

    try {
      await downloadExport(exportResult, selectedFormat, project.slug);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('[PRD-Export] Download failed:', error);
    }
  }, [exportResult, selectedFormat, project.slug]);

  // Copy to clipboard
  const handleCopy = useCallback(() => {
    if (!exportResult?.content) return;
    navigator.clipboard.writeText(exportResult.content);
  }, [exportResult]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge className={cn(PRD_STATUS.exported.bg, PRD_STATUS.exported.text)}>Export</Badge>
            <PRDEffortIndicator human={100} ai={0} size="md" />
          </div>
          {showSuccess && (
            <Badge className="bg-emerald-500/20 text-emerald-500">
              <Icon name="check-circle" className="mr-1 size-3" />
              Download iniciado!
            </Badge>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          {/* Title */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Exportar PRD</h2>
            <p className="text-muted-foreground">
              Escolha um formato para exportar seu PRD e usar em outras ferramentas
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-2xl font-bold" style={{ color: PRD_PRIMARY }}>
                {epics.length}
              </div>
              <div className="text-sm text-muted-foreground">Épicos</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold" style={{ color: PRD_PRIMARY }}>
                {stories.length}
              </div>
              <div className="text-sm text-muted-foreground">Stories</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold" style={{ color: PRD_PRIMARY }}>
                {stories.filter((s) => s.isValid).length}
              </div>
              <div className="text-sm text-muted-foreground">Válidas</div>
            </Card>
          </div>

          {/* Export Options */}
          <div className="mb-8">
            <h3 className="mb-4 font-semibold">Formato de Export</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {EXPORT_OPTIONS.map((option) => (
                <ExportOptionCard
                  key={option.key}
                  option={option}
                  selected={selectedFormat === option.key}
                  onSelect={() => setSelectedFormat(option.key)}
                />
              ))}
            </div>
          </div>

          {/* Warning if no epics */}
          {!canExport && (
            <Card className="mb-8 border-amber-500/30 bg-amber-500/5 p-6">
              <div className="flex items-start gap-3">
                <Icon name="alert-triangle" className="mt-0.5 size-5 text-amber-500" />
                <div>
                  <h4 className="font-semibold text-amber-500">Épicos Necessários</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Gere épicos e stories antes de exportar o PRD
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!canExport || isGenerating}
              style={{ backgroundColor: canExport && !isGenerating ? PRD_PRIMARY : undefined }}
              className="px-8"
            >
              {isGenerating ? (
                <>
                  <Icon name="spinner" className="mr-2 size-5 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Icon name="download" className="mr-2 size-5" />
                  Gerar Export
                </>
              )}
            </Button>
          </div>

          {/* Format Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              {selectedFormat === 'lovable' && 'Prompt otimizado para criar apps com Lovable.dev'}
              {selectedFormat === 'claude_code' &&
                'Estrutura de arquivos para usar com Claude Code CLI'}
              {selectedFormat === 'generic' && 'Documento Markdown completo com todas as seções'}
            </p>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {exportResult && (
        <ExportPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          content={
            exportResult.content ||
            (exportResult.files ? JSON.stringify(exportResult.files, null, 2) : '')
          }
          format={selectedFormat}
          onDownload={handleDownload}
          onCopy={handleCopy}
        />
      )}
    </div>
  );
};

export default PRDExportTemplate;
