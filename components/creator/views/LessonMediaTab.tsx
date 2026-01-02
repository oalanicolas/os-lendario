import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { FileUpload } from '../../ui/file-upload';
import { STUDIO_PRIMARY } from '../studio-tokens';

interface LessonMediaTabProps {
  videoUrl: string | null;
  onVideoUrlChange: (url: string | null) => void;
}

const LessonMediaTab: React.FC<LessonMediaTabProps> = ({ videoUrl, onVideoUrlChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-1 text-xl font-semibold">Mídia & Materiais</h2>
        <p className="text-sm text-muted-foreground">
          Adicione vídeos e materiais de apoio para esta aula.
        </p>
      </div>

      {/* Video Section */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-opacity-10">
              <Icon name="video" size="size-5" style={{ color: STUDIO_PRIMARY }} />
            </div>
            <div>
              <h4 className="font-medium">Vídeo da Aula</h4>
              <p className="text-xs text-muted-foreground">YouTube, Vimeo ou upload direto</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Cole o link do YouTube ou Vimeo..."
              value={videoUrl || ''}
              onChange={(e) => onVideoUrlChange(e.target.value || null)}
              className="flex-1"
            />
            <Button variant="outline" size="sm" className="shrink-0">
              <Icon name="upload" className="mr-2" size="size-4" /> Upload
            </Button>
          </div>
          {videoUrl && (
            <div className="flex aspect-video items-center justify-center rounded-lg border border-border bg-muted">
              <div className="text-center">
                <Icon name="play-circle" size="size-12" className="mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Preview do vídeo</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Materials Section */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-opacity-10">
              <Icon name="folder-open" size="size-5" style={{ color: STUDIO_PRIMARY }} />
            </div>
            <div>
              <h4 className="font-medium">Materiais de Apoio</h4>
              <p className="text-xs text-muted-foreground">PDFs, documentos, templates, etc.</p>
            </div>
          </div>
          <FileUpload className="h-32" accept=".pdf,.doc,.docx,.zip,.xlsx,.pptx" />
          <div className="py-4 text-center text-sm text-muted-foreground">
            <Icon name="inbox" size="size-6" className="mx-auto mb-2 opacity-50" />
            Nenhum material anexado
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonMediaTab;
