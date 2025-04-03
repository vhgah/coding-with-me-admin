import type { Category } from '@/types/category'

export const categoryFactory = (category: Partial<Category> = {}): Category => {
  return {
    id: category.id || null,
    name: category.name || '',
    slug: category.slug || '',
    position: category.position || 0,
    createdAt: category.createdAt || '',
    updatedAt: category.updatedAt || ''
  }
}
