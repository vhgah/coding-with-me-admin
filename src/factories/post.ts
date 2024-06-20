import type { Post } from '@/types/post'

export const postFactory = (post: Partial<Post> = {}): Post => {
  return {
    id: post.id || null,
    title: post.title || '',
    summary: post.summary || '',
    content: post.content || '',
    status: post.status || null,
    published_at: post.published_at || '',
    created_at: post.created_at || '',
    updated_at: post.updated_at || '',
  }
}