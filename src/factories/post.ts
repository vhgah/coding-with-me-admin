import type { Post } from '@/types/post'

export const postFactory = (post: Partial<Post> = {}): Post => {
  return {
    id: post.id || null,
    title: post.title || '',
    slug: post.slug || '',
    summary: post.summary || '',
    content: post.content || '',
    status: post.status || null,
    publishedAt: post.publishedAt || '',
    createdAt: post.createdAt || '',
    updatedAt: post.updatedAt || '',
  }
}