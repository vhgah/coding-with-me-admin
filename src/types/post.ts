export interface Post {
  id: number | null
  slug: string
  title: string
  summary: string
  content: string
  status: number | null
  publishedAt: string
  createdAt: string
  updatedAt: string
}
