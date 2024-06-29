import type { File } from '@/types/file'

export const fileFactory = (file: Partial<File> = {}) => {
  return {
    id: file.id || null,
    url: file.url || '',
    name: file.name || '',
    mime_type: file.mime_type || '',
    size: file.size || 0,
    created_at: file.created_at || ''
  }
}
