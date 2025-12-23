import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './icon';
import { Button } from './button';

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileSelect?: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in bytes
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ className, onFileSelect, accept, maxSize, ...props }, ref) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    };

    const handleFile = (file: File) => {
      if (maxSize && file.size > maxSize) {
        alert('Arquivo muito grande!');
        return;
      }
      setFile(file);
      onFileSelect?.(file);
    };

    const removeFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFile(null);
      onFileSelect?.(null);
      if (inputRef.current) inputRef.current.value = '';
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex min-h-[160px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:bg-muted/30',
          file ? 'border-solid border-border bg-card' : '',
          className
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />

        {file ? (
          <div className="flex w-full items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name="document" size="size-6" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-sans text-sm font-semibold">{file.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Icon name="trash" size="size-4" />
            </Button>
          </div>
        ) : (
          <div className="flex cursor-pointer flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Icon name="cloud-upload" className="text-muted-foreground" size="size-6" />
            </div>
            <p className="mb-1 font-sans text-sm font-semibold">
              <span className="text-primary hover:underline">Clique para upload</span> ou arraste e
              solte
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              SVG, PNG, JPG ou GIF (max. 800x400px)
            </p>
          </div>
        )}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';

export { FileUpload };
