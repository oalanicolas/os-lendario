import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'mind-avatars';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface UseMindAvatarUploadOptions {
  mindId: string;
  mindSlug: string;
  onSuccess?: (newAvatarUrl: string) => void;
  onError?: (error: string) => void;
}

interface UseMindAvatarUploadReturn {
  upload: (file: File) => Promise<void>;
  isUploading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useMindAvatarUpload({
  mindId,
  mindSlug,
  onSuccess,
  onError,
}: UseMindAvatarUploadOptions): UseMindAvatarUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Formato não suportado. Use JPG, PNG ou WebP.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Arquivo muito grande. Máximo 2MB.';
    }
    return null;
  };

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      setIsUploading(true);

      try {
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          onError?.(validationError);
          return;
        }

        // Generate unique filename
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const timestamp = Date.now();
        const filename = `${mindSlug}-${timestamp}.${ext}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filename, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          const errorMsg = `Erro no upload: ${uploadError.message}`;
          setError(errorMsg);
          onError?.(errorMsg);
          return;
        }

        // Get public URL
        const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);

        const publicUrl = urlData.publicUrl;

        // Update mind record in database
        // Note: avatar_url type will be added by Data Agent migration
        // Using type assertion to bypass strict typing until migration is applied
        // @ts-ignore - Supabase query type inference issue
        const { error: updateError } = await (
          supabase.from('minds') as ReturnType<typeof supabase.from>
        )
          .update({ avatar_url: publicUrl })
          .eq('id', mindId);

        if (updateError) {
          const errorMsg = `Erro ao atualizar perfil: ${updateError.message}`;
          setError(errorMsg);
          onError?.(errorMsg);
          return;
        }

        // Success
        onSuccess?.(publicUrl);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMsg);
        onError?.(errorMsg);
      } finally {
        setIsUploading(false);
      }
    },
    [mindId, mindSlug, onSuccess, onError]
  );

  return {
    upload,
    isUploading,
    error,
    clearError,
  };
}
